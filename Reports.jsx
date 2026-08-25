import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldAlert, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  PieChart as PieIcon,
  Printer
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const Reports = () => {
  const { scans, stats } = useSecurity();
  const [reportType, setReportType] = useState('full'); // 'full' | 'threats_only'
  const [timeRange, setTimeRange] = useState('all');

  const filteredScans = scans.filter(s => {
    if (reportType === 'threats_only') {
      return s.status !== 'Safe';
    }
    return true;
  });

  const highRiskScans = scans.filter(s => s.risk_score >= 60);

  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Background header band
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');

    // Title & Branding
    doc.setTextColor(6, 182, 212);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text("CYBERSHIELD AI", 14, 18);

    doc.setFontSize(11);
    doc.setTextColor(226, 232, 240);
    doc.text("EXECUTIVE THREAT INTELLIGENCE & AUDIT REPORT", 14, 27);

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${new Date().toUTCString()} | Classification: CONFIDENTIAL`, 14, 34);

    // Summary Metrics Table
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("1. Security Operations Summary", 14, 50);

    doc.autoTable({
      startY: 54,
      head: [['Total Inspected', 'Malware Detected', 'Phishing Attempts', 'Suspicious Links', 'Safe Verified', 'Threat Block Rate']],
      body: [[
        stats.totalScans.toString(),
        stats.malwareCount.toString(),
        stats.phishingCount.toString(),
        stats.suspiciousCount.toString(),
        stats.safeCount.toString(),
        `${stats.threatRatio}%`
      ]],
      theme: 'grid',
      headStyles: { fillColor: [6, 182, 212], textColor: [15, 23, 42], fontStyle: 'bold' },
      styles: { halign: 'center', fontSize: 10 }
    });

    // High Risk Threat Table
    const nextY = doc.lastAutoTable.finalY + 12;
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("2. Critical Threats & Malicious URL Signatures", 14, nextY);

    const threatRows = filteredScans.map(s => [
      s.domain,
      s.status,
      `${s.risk_score}%`,
      s.threat_type,
      new Date(s.scan_time).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: nextY + 4,
      head: [['Host / Domain', 'Verdict', 'Risk Score', 'Threat Signature', 'Date Logged']],
      body: threatRows.length > 0 ? threatRows : [['No data recorded', '-', '-', '-', '-']],
      theme: 'striped',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
      styles: { fontSize: 8, cellPadding: 3 }
    });

    // Recommendations footer
    const finalY = doc.lastAutoTable.finalY + 12;
    if (finalY < 260) {
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("3. Recommended Security Posture", 14, finalY);
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("- Maintain active perimeter blocking on flagged malicious TLDs (.xyz, .top, .tk).", 14, finalY + 7);
      doc.text("- Enforce email gateway authentication (DMARC, DKIM, SPF) against domain impersonation.", 14, finalY + 13);
      doc.text("- Regularly sync firewall rules with CyberShield AI automated blacklist updates.", 14, finalY + 19);
    }

    doc.save(`CyberShield_Threat_Report_${Date.now()}.pdf`);
  };

  const generateCSVReport = () => {
    const headers = ["Domain", "Target URL", "Status", "Risk Score", "Threat Type", "Scan Time"];
    const rows = filteredScans.map(s => [
      s.domain,
      `"${s.url.replace(/"/g, '""')}"`,
      s.status,
      s.risk_score,
      s.threat_type,
      s.scan_time
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encoded;
    a.download = `threat_report_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-cyan-400" />
            <span>Threat Intelligence Reports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate executive compliance and operational reports in PDF and CSV formats.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={generateCSVReport}
            className="cyber-btn-secondary !text-xs !py-2"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
          <button
            onClick={generatePDFReport}
            className="cyber-btn-primary !text-xs !py-2"
          >
            <Download className="w-4 h-4" />
            <span>Generate Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Report Configuration & Scope Card */}
      <div className="cyber-card p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Report Scope
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="full">All Scanned Links ({scans.length} records)</option>
            <option value="threats_only">Threats Only ({stats.blockedCount} records)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Audit Period
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Available Historical Data</option>
            <option value="today">Last 24 Hours</option>
            <option value="week">Past 7 Days</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Compliance Standard
          </label>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
            NIST SP 800-83 / MITRE ATT&CK
          </div>
        </div>
      </div>

      {/* Report Preview Preview Canvas */}
      <div className="cyber-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100">Live Report Preview</h3>
            <p className="text-xs text-slate-400">Previewing document layout and compiled threat metrics</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            {filteredScans.length} Entries Included
          </span>
        </div>

        {/* Metric Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Audited</div>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{stats.totalScans}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Neutralized</div>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1">{stats.blockedCount}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Clean Traffic</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{stats.safeCount}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Threat Rate</div>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{stats.threatRatio}%</div>
          </div>
        </div>

        {/* High Risk Entities Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>High Risk Targets Identified ({highRiskScans.length})</span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Domain</th>
                  <th className="px-4 py-2.5">Threat Class</th>
                  <th className="px-4 py-2.5">Risk Score</th>
                  <th className="px-4 py-2.5">Observed Heuristic Markers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {highRiskScans.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-center text-slate-400 font-sans">
                      No high-risk URLs in current log.
                    </td>
                  </tr>
                ) : (
                  highRiskScans.map(item => (
                    <tr key={item.id} className="hover:bg-slate-800/40">
                      <td className="px-4 py-2.5 text-cyan-300 font-bold">{item.domain}</td>
                      <td className="px-4 py-2.5 text-red-400">{item.threat_type}</td>
                      <td className="px-4 py-2.5 font-bold text-red-400">{item.risk_score}%</td>
                      <td className="px-4 py-2.5 text-slate-400 text-[11px] truncate max-w-xs font-sans">
                        {item.summary}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
