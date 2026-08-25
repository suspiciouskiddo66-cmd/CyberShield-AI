import React from 'react';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  ExternalLink, 
  Bookmark, 
  Ban, 
  Shield, 
  Download 
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { addToWhitelist, addToBlacklist, toggleBookmark } from '../services/scanStorage';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const UrlDetailModal = () => {
  const { selectedScan, setSelectedScan, refreshData, bookmarks } = useSecurity();

  if (!selectedScan) return null;

  const isBookmarked = bookmarks.some(b => b.id === selectedScan.id || b.url === selectedScan.url);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Safe':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">SAFE</span>;
      case 'Phishing':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">PHISHING</span>;
      case 'Malware':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">MALWARE</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">SUSPICIOUS</span>;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleWhitelist = () => {
    addToWhitelist(selectedScan.domain);
    refreshData();
  };

  const handleBlacklist = () => {
    addToBlacklist(selectedScan.domain);
    refreshData();
  };

  const handleBookmarkToggle = () => {
    toggleBookmark(selectedScan);
    refreshData();
  };

  const downloadPdfReport = () => {
    const doc = new jsPDF();
    doc.setFillColor(10, 15, 29);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(6, 182, 212);
    doc.setFontSize(18);
    doc.text("CYBERSHIELD AI - THREAT INSPECTION REPORT", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${new Date().toUTCString()}`, 14, 28);

    doc.autoTable({
      startY: 35,
      head: [['Attribute', 'Inspection Detail']],
      body: [
        ['Target URL', selectedScan.url],
        ['Domain', selectedScan.domain],
        ['Verdict Status', selectedScan.status],
        ['Risk Score', `${selectedScan.risk_score} / 100`],
        ['Confidence', `${Math.round(selectedScan.confidence * 100)}%`],
        ['Threat Type', selectedScan.threat_type],
        ['IP Address Flag', selectedScan.indicators?.is_ip_address ? 'YES' : 'NO'],
        ['Homoglyph / Typosquatting', selectedScan.indicators?.homoglyph_attack_detected ? 'YES' : 'NO'],
        ['Shannon Entropy', `${selectedScan.indicators?.shannon_entropy || 0}`],
        ['Suspicious Keywords', (selectedScan.indicators?.suspicious_keywords_found || []).join(', ') || 'None'],
        ['Summary', selectedScan.summary]
      ],
      theme: 'grid',
      headStyles: { fillColor: [6, 182, 212], textColor: [10, 15, 29] },
      styles: { fontSize: 9, cellPadding: 4 }
    });

    doc.save(`scan_report_${selectedScan.domain}.pdf`);
  };

  const indicators = selectedScan.indicators || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0a0f1d] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-[#0e172a] to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">URL Threat Inspector</h2>
              <p className="text-xs text-slate-400 font-mono">ID: {selectedScan.id}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedScan(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Target URL Display */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
            <div className="truncate font-mono text-xs text-cyan-300 select-all">
              {selectedScan.url}
            </div>
            <button
              onClick={() => copyToClipboard(selectedScan.url)}
              title="Copy URL"
              className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded-md transition-colors flex-shrink-0"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Verdict Overview Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="cyber-card p-4 text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">Verdict</div>
              <div className="mt-2">{getStatusBadge(selectedScan.status)}</div>
            </div>
            <div className="cyber-card p-4 text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">Risk Score</div>
              <div className={`mt-1 text-2xl font-mono font-extrabold ${
                selectedScan.risk_score > 70 ? 'text-red-400' : selectedScan.risk_score > 30 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {selectedScan.risk_score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
            </div>
            <div className="cyber-card p-4 text-center">
              <div className="text-xs text-slate-400 font-semibold uppercase">AI Confidence</div>
              <div className="mt-1 text-2xl font-mono font-extrabold text-cyan-400">
                {Math.round((selectedScan.confidence || 0.95) * 100)}%
              </div>
            </div>
          </div>

          {/* Machine Learning Probability Breakdown */}
          {selectedScan.ml_probabilities && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                AI Classification Probabilities
              </div>
              <div className="space-y-2">
                {Object.entries(selectedScan.ml_probabilities).map(([key, val]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">{key}</span>
                      <span className="text-slate-200">{Math.round(val * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          key === 'Safe' ? 'bg-emerald-500' : key === 'Phishing' ? 'bg-orange-500' : key === 'Malware' ? 'bg-red-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.round(val * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Heuristic Checks & Threat Markers */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Deep Heuristic Feature Checks
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Raw IP in Host:</span>
                {indicators.is_ip_address ? (
                  <span className="text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Detected</span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Clean</span>
                )}
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Homoglyph / Typosquatting:</span>
                {indicators.homoglyph_attack_detected ? (
                  <span className="text-red-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Flagged</span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Normal</span>
                )}
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Suspicious TLD:</span>
                {indicators.suspicious_tld ? (
                  <span className="text-amber-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> High Risk</span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Standard</span>
                )}
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Shannon Entropy:</span>
                <span className="font-mono text-cyan-300">{indicators.shannon_entropy || 'N/A'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Shortener Redirect:</span>
                {indicators.shortener_service ? (
                  <span className="text-amber-400 font-medium">Yes</span>
                ) : (
                  <span className="text-slate-400">No</span>
                )}
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">URL Length:</span>
                <span className="font-mono text-slate-300">{indicators.url_length || selectedScan.url.length} chars</span>
              </div>
            </div>
          </div>

          {/* AI Summary & Recommendations */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-2">
            <div className="font-bold text-cyan-300">AI Threat Summary:</div>
            <p className="text-slate-300 leading-relaxed">{selectedScan.summary}</p>
            {selectedScan.recommendations?.length > 0 && (
              <div className="pt-2 border-t border-cyan-500/20">
                <div className="font-semibold text-cyan-400 mb-1">Recommended Actions:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedScan.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#080d19] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkToggle}
              className={`cyber-btn-secondary !text-xs !py-1.5 ${isBookmarked ? 'text-amber-400 border-amber-500/50' : ''}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <button
              onClick={handleWhitelist}
              className="cyber-btn-secondary !text-xs !py-1.5 hover:text-emerald-400 hover:border-emerald-500/50"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Whitelist Domain</span>
            </button>
            <button
              onClick={handleBlacklist}
              className="cyber-btn-secondary !text-xs !py-1.5 hover:text-red-400 hover:border-red-500/50"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Blacklist Domain</span>
            </button>
          </div>

          <button
            onClick={downloadPdfReport}
            className="cyber-btn-primary !text-xs !py-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
