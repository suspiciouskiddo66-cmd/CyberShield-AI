import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  Sparkles, 
  Lock, 
  Info, 
  Copy, 
  Check, 
  X, 
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Flame
} from 'lucide-react';
import { MALICIOUS_EXAMPLES } from '../data/maliciousExamples';
import { scanUrlAPI } from '../services/api';
import { useSecurity } from '../context/SecurityContext';

export const MaliciousExamples = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // 'ALL' | 'phishing' | 'malware' | 'suspicious' | 'fake_offer'
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isScanningUrl, setIsScanningUrl] = useState(false);

  const { refreshData, setSelectedScan } = useSecurity();
  const navigate = useNavigate();
  const itemsPerPage = 12;

  // Filtered dataset
  const filteredLinks = MALICIOUS_EXAMPLES.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      item.url.toLowerCase().includes(searchLower) ||
      item.brand.toLowerCase().includes(searchLower) ||
      item.attackVector.toLowerCase().includes(searchLower) ||
      item.threatDescription.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage) || 1;
  const paginatedLinks = filteredLinks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'phishing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Phishing (Red)
          </span>
        );
      case 'malware':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" /> Malware (Orange)
          </span>
        );
      case 'suspicious':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Suspicious (Yellow)
          </span>
        );
      case 'fake_offer':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Fake Offers (Green)
          </span>
        );
      default:
        return null;
    }
  };

  const handleCopyDefanged = (e, item) => {
    e.stopPropagation();
    // Defang the link for security e.g. hxxps://
    const defanged = item.url.replace('http://', 'hxxp://').replace('https://', 'hxxps://');
    navigator.clipboard.writeText(defanged);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleScanInAIScanner = async (url) => {
    setIsScanningUrl(true);
    try {
      const result = await scanUrlAPI(url);
      refreshData();
      setActiveModalItem(null);
      setSelectedScan(result);
    } catch (err) {
      console.error("Test scan failed:", err);
    } finally {
      setIsScanningUrl(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Prominent Educational Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#120f26]/90 via-[#181133]/90 to-[#0c0a1a]/90 border border-amber-500/30 p-6 sm:p-8 overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.12)] backdrop-blur-md">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>FOR EDUCATIONAL PURPOSES ONLY • 100 THREAT VECTORS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Malicious Link Examples & Threat Catalog
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Examine real-world signatures of cyber threats to train your security awareness. 
            All simulated and archived URLs in this catalog are <strong className="text-amber-300">strictly neutralized & disabled</strong> — clicking them opens a safe threat anatomy diagnostic instead of redirecting.
          </p>

          {/* Color-Coded Category Legend */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-400">Color-Coded Classification:</span>
            <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold">
              Red = Phishing (25)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/40 text-[11px] font-bold">
              Orange = Malware (25)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
              Yellow = Suspicious (25)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              Green = Fake Offers / Ecommerce (25)
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="cyber-card p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
            }`}
          >
            All Examples ({MALICIOUS_EXAMPLES.length})
          </button>
          <button
            onClick={() => {
              setSelectedCategory('phishing');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'phishing'
                ? 'bg-red-500/20 text-red-300 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                : 'text-slate-400 hover:text-red-300 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Phishing (Red)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('malware');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'malware'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 shadow-[0_0_12px_rgba(249,115,22,0.25)]'
                : 'text-slate-400 hover:text-orange-300 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Malware (Orange)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('suspicious');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'suspicious'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'text-slate-400 hover:text-amber-300 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Suspicious (Yellow)
          </button>
          <button
            onClick={() => {
              setSelectedCategory('fake_offer');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'fake_offer'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                : 'text-slate-400 hover:text-emerald-300 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Fake Offers (Green)
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search brand, URL, or attack vector..."
            className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Examples Grid / Table View */}
      <div className="cyber-card overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Educational Catalog Records ({filteredLinks.length} Matches)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Live Redirection Disabled
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#090e1c] text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Threat Scenario / Brand</th>
                <th className="px-4 py-3.5">Category Tag</th>
                <th className="px-4 py-3.5">Disabled Link Vector (Safe Preview)</th>
                <th className="px-4 py-3.5">Attack Vector</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {paginatedLinks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-slate-400 font-sans">
                    No threat examples match your search filter.
                  </td>
                </tr>
              ) : (
                paginatedLinks.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setActiveModalItem(item)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors duration-150 group"
                  >
                    <td className="px-5 py-3.5 font-sans whitespace-nowrap">
                      <div className="font-bold text-slate-200 group-hover:text-cyan-300 flex items-center gap-2">
                        <span>{item.brand}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        Score: <span className="font-mono text-amber-400 font-bold">{item.riskScore}%</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap font-sans">
                      {getCategoryBadge(item.category)}
                    </td>

                    <td className="px-4 py-3.5 max-w-xs sm:max-w-md truncate">
                      {/* Clicking link is strictly disabled and opens safe educational preview */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalItem(item);
                        }}
                        className="text-left truncate font-mono text-xs text-slate-300 hover:text-cyan-300 hover:underline flex items-center gap-1.5 select-all"
                        title="Click to view educational threat anatomy (Redirection disabled)"
                      >
                        <Lock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                        <span className="truncate">{item.url}</span>
                      </button>
                    </td>

                    <td className="px-4 py-3.5 font-sans text-slate-300 text-[11px] max-w-xs truncate">
                      {item.attackVector}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap font-sans">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleCopyDefanged(e, item)}
                          title="Copy Safe Defanged Link"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-slate-700 transition-colors"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="cyber-btn-secondary !text-xs !py-1 !px-2.5 flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => handleScanInAIScanner(item.url)}
                          className="cyber-btn-primary !text-xs !py-1 !px-2.5 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Test in AI</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing page <span className="font-bold text-slate-200">{currentPage}</span> of <span className="font-bold text-slate-200">{totalPages}</span> (100 total vectors)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Educational Threat Anatomy Preview Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0a0f1d] border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-[#18122c] to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-100">{activeModalItem.brand}</h2>
                    {getCategoryBadge(activeModalItem.category)}
                  </div>
                  <p className="text-[11px] font-mono text-amber-300">FOR EDUCATIONAL PURPOSES ONLY • SAFE PLACEHOLDER</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto font-sans">
              {/* Neutralized Disabled URL Display */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Target Threat Link (Neutralized):</span>
                  <span className="text-[10px] text-amber-400 font-bold">LIVE REDIRECTION BLOCKED</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 break-all select-all border border-slate-800 flex items-center justify-between gap-2">
                  <span>{activeModalItem.url}</span>
                  <button
                    onClick={(e) => handleCopyDefanged(e, activeModalItem)}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white flex-shrink-0 text-[10px] px-2 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy Defanged
                  </button>
                </div>
              </div>

              {/* Threat Mechanism Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="cyber-card p-3.5 space-y-1">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Attack Classification</span>
                  <p className="font-bold text-slate-200">{activeModalItem.attackVector}</p>
                </div>
                <div className="cyber-card p-3.5 space-y-1">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Estimated Threat Score</span>
                  <p className="font-bold font-mono text-red-400 text-lg">{activeModalItem.riskScore} <span className="text-xs text-slate-400">/ 100</span></p>
                </div>
              </div>

              {/* Threat Description */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">How This Attack Works:</h4>
                <p className="text-slate-300 leading-relaxed">{activeModalItem.threatDescription}</p>
              </div>

              {/* Red Flags Observed */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2 text-xs">
                <h4 className="font-bold text-red-400 uppercase tracking-wider text-[11px]">Key Red Flags to Identify:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {activeModalItem.redFlags.map((flag, idx) => (
                    <li key={idx}><strong className="text-slate-200">{flag}</strong></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#080d19] border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="cyber-btn-secondary !text-xs !py-1.5"
              >
                Close Safe Viewer
              </button>

              <button
                type="button"
                disabled={isScanningUrl}
                onClick={() => handleScanInAIScanner(activeModalItem.url)}
                className="cyber-btn-primary !text-xs !py-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isScanningUrl ? 'Running AI Scan...' : 'Analyze with CyberShield AI Engine'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
