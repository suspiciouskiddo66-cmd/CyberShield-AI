import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Download, 
  Trash2, 
  Filter, 
  FileSpreadsheet, 
  FileCode, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { clearScanHistory, deleteScan } from '../services/scanStorage';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const History = () => {
  const { scans, refreshData, setSelectedScan } = useSecurity();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = scans.filter(item => {
    const matchQuery = item.url.toLowerCase().includes(search.toLowerCase()) ||
                       item.domain.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || item.status.toUpperCase() === statusFilter;
    return matchQuery && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedScans = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to permanently clear all scan records?")) {
      clearScanHistory();
      refreshData();
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "URL", "Domain", "Status", "Risk Score", "Scan Time", "Summary"];
    const rows = filtered.map(s => [
      s.id,
      `"${s.url.replace(/"/g, '""')}"`,
      s.domain,
      s.status,
      s.risk_score,
      s.scan_time,
      `"${s.summary.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `threat_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filtered, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `threat_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("CyberShield AI - Complete Threat History Log", 14, 15);
    doc.setFontSize(9);
    doc.text(`Generated on ${new Date().toLocaleString()} | Total Records: ${filtered.length}`, 14, 22);

    const tableData = filtered.map(s => [
      s.domain,
      s.status,
      `${s.risk_score}%`,
      new Date(s.scan_time).toLocaleDateString(),
      s.threat_type
    ]);

    doc.autoTable({
      startY: 28,
      head: [['Domain', 'Status', 'Risk', 'Date', 'Threat Category']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [6, 182, 212] }
    });

    doc.save(`cyber_threat_history_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <HistoryIcon className="w-7 h-7 text-cyan-400" />
            <span>Scan History & Audit Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Archived logs of inspected URLs, detected signatures, and threat analytics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportCSV}
            className="cyber-btn-secondary !text-xs !py-1.5"
            title="Download CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportJSON}
            className="cyber-btn-secondary !text-xs !py-1.5"
            title="Download JSON"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={exportPDF}
            className="cyber-btn-secondary !text-xs !py-1.5"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handleClearAll}
            className="cyber-btn-danger !text-xs !py-1.5"
            title="Clear all logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="cyber-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by URL, domain, or ID..."
            className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Statuses ({scans.length})</option>
            <option value="SAFE">Safe</option>
            <option value="PHISHING">Phishing</option>
            <option value="MALWARE">Malware</option>
            <option value="SUSPICIOUS">Suspicious</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="cyber-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Scanned Target</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Risk Score</th>
                <th className="px-4 py-3.5">Threat Category</th>
                <th className="px-4 py-3.5">Timestamp (UTC)</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedScans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-slate-400 font-sans">
                    No log records match your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedScans.map((scan) => (
                  <tr
                    key={scan.id}
                    onClick={() => setSelectedScan(scan)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5 max-w-xs truncate text-slate-200">
                      <div>{scan.url}</div>
                      <div className="text-[10px] text-slate-400">{scan.domain}</div>
                    </td>
                    <td className="px-4 py-3.5 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        scan.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-300' :
                        scan.status === 'Phishing' ? 'bg-orange-500/20 text-orange-300' :
                        scan.status === 'Malware' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {scan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`font-bold ${
                        scan.risk_score > 70 ? 'text-red-400' : scan.risk_score > 30 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {scan.risk_score}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300 truncate max-w-xs font-sans text-[11px]">
                      {scan.threat_type}
                    </td>
                    <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                      {new Date(scan.scan_time).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right font-sans">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedScan(scan);
                        }}
                        className="text-cyan-400 hover:underline text-xs font-semibold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing page <span className="font-bold text-slate-200">{currentPage}</span> of <span className="font-bold text-slate-200">{totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
