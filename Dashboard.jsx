import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanSearch, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  Loader2, 
  Zap, 
  AlertTriangle,
  Play,
  BookOpen,
  Lock,
  Eye,
  Info
} from 'lucide-react';
import { StatsBar } from '../components/StatsBar';
import { RiskChart } from '../components/RiskChart';
import { RecentScansTable } from '../components/RecentScansTable';
import { scanUrlAPI } from '../services/api';
import { useSecurity } from '../context/SecurityContext';
import { MALICIOUS_EXAMPLES } from '../data/maliciousExamples';

export const Dashboard = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedDemoItem, setSelectedDemoItem] = useState(null);
  const { refreshData, setSelectedScan } = useSecurity();

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    setError('');
    setIsScanning(true);
    setScanResult(null);

    try {
      const result = await scanUrlAPI(urlInput.trim());
      setScanResult(result);
      refreshData();
    } catch (err) {
      setError(err.message || 'Scan failed. Please check network connectivity.');
    } finally {
      setIsScanning(false);
    }
  };

  const runQuickTest = async (testUrl) => {
    setUrlInput(testUrl);
    setError('');
    setIsScanning(true);
    setScanResult(null);

    try {
      const result = await scanUrlAPI(testUrl);
      setScanResult(result);
      refreshData();
    } catch (err) {
      setError(err.message || 'Test scan failed.');
    } finally {
      setIsScanning(false);
    }
  };

  // 4 Featured Examples (1 from each category) for the Dashboard Demo Section
  const featuredExamples = [
    MALICIOUS_EXAMPLES.find(e => e.category === 'phishing'),
    MALICIOUS_EXAMPLES.find(e => e.category === 'malware'),
    MALICIOUS_EXAMPLES.find(e => e.category === 'suspicious'),
    MALICIOUS_EXAMPLES.find(e => e.category === 'fake_offer'),
  ].filter(Boolean);

  const getTagStyle = (cat) => {
    switch (cat) {
      case 'phishing':
        return 'bg-red-500/20 text-red-300 border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.25)]';
      case 'malware':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40 shadow-[0_0_8px_rgba(249,115,22,0.25)]';
      case 'suspicious':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.25)]';
      case 'fake_offer':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.25)]';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'phishing': return 'Phishing (Red)';
      case 'malware': return 'Malware (Orange)';
      case 'suspicious': return 'Suspicious (Yellow)';
      case 'fake_offer': return 'Fake Offer (Green)';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Cyber Threat Hunting Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0a1124]/90 via-[#0d1a38]/90 to-[#070e1e]/90 border border-cyan-500/30 p-6 sm:p-8 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.12)] backdrop-blur-md">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Neural Threat Hunter • Live Perimeter</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            AI Malicious Link Detector & Security Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Detect credential harvesting, typosquatting lookalikes, rogue IP nodes, and obfuscated payload links in real-time.
          </p>

          {/* Quick Scanner Search Bar */}
          <form onSubmit={handleScan} className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <ScanSearch className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter or paste any suspicious URL (e.g. http://paypal-verify.top/login)..."
                className="w-full bg-[#050811]/90 border border-cyan-500/40 rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="cyber-btn-primary w-full sm:w-auto !py-3.5 !px-6 text-sm flex-shrink-0"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Inspecting Target...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Scan Target URL</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Test Vectors */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Quick Test Samples:</span>
            <button
              type="button"
              onClick={() => runQuickTest('https://paypal-security-verification.top/auth/login.php')}
              className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <Play className="w-3 h-3" /> Phishing Sample
            </button>
            <button
              type="button"
              onClick={() => runQuickTest('http://185.220.101.5:8080/update_patch.exe')}
              className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/30 transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <Play className="w-3 h-3" /> Malware IP Node
            </button>
            <button
              type="button"
              onClick={() => runQuickTest('https://github.com/security/advisories')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <Play className="w-3 h-3" /> Safe Target
            </button>
          </div>
        </div>
      </div>

      {/* Instant Scan Result Banner */}
      {scanResult && (
        <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ${
          scanResult.status === 'Safe' 
            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
            : scanResult.status === 'Phishing'
            ? 'bg-orange-950/40 border-orange-500/50 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
            : scanResult.status === 'Malware'
            ? 'bg-red-950/40 border-red-500/50 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
            : 'bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700">
              {scanResult.status === 'Safe' ? (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-red-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-100">Scan Complete:</span>
                <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-slate-900 font-extrabold">
                  {scanResult.status} ({scanResult.risk_score}/100 Risk)
                </span>
                <span className="text-xs text-slate-400">Confidence: {Math.round(scanResult.confidence * 100)}%</span>
              </div>
              <p className="text-xs text-slate-200 mt-1 max-w-xl truncate">
                {scanResult.summary}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedScan(scanResult)}
            className="cyber-btn-secondary !text-xs !py-1.5 whitespace-nowrap"
          >
            <span>View Deep Threat Inspector</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Statistics Bar */}
      <StatsBar />

      {/* DEMO SECTION: Malicious Link Examples */}
      <div className="cyber-card p-6 border-amber-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">Malicious Link Examples</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  For Educational Purposes Only
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Representative threat links categorized by risk vector. Direct redirection is neutralized for security.
              </p>
            </div>
          </div>

          <Link
            to="/threat-examples"
            className="cyber-btn-secondary !text-xs !py-1.5 !px-3 self-start sm:self-auto flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200"
          >
            <span>Explore All 100 Examples</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Featured Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {featuredExamples.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDemoItem(item)}
              className="p-4 rounded-xl bg-[#090e1c]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer space-y-2.5 group hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTagStyle(item.category)}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Score: {item.riskScore}%</span>
                </div>

                <div className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 truncate">
                  {item.brand}
                </div>

                {/* Disabled Safe Link Preview */}
                <div className="p-2 rounded-lg bg-black/60 font-mono text-[11px] text-slate-400 truncate flex items-center gap-1 border border-slate-800/80">
                  <Lock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span className="truncate select-none">{item.url}</span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.threatDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:underline">
                <span>View Threat Anatomy</span>
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts & Threat Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Overview Circular Chart */}
        <div className="lg:col-span-1">
          <RiskChart />
        </div>

        {/* Recent Scans Table */}
        <div className="lg:col-span-2">
          <RecentScansTable limit={6} />
        </div>
      </div>

      {/* Threat Preview Modal for Dashboard */}
      {selectedDemoItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0a0f1d] border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100">{selectedDemoItem.brand}</h3>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold border ${getTagStyle(selectedDemoItem.category)}`}>
                  {getCategoryLabel(selectedDemoItem.category)}
                </span>
              </div>
              <button
                onClick={() => setSelectedDemoItem(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-amber-300 break-all select-all flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{selectedDemoItem.url}</span>
            </div>

            <div className="text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-cyan-300">How the attack works:</div>
              <p className="leading-relaxed text-slate-300">{selectedDemoItem.threatDescription}</p>

              <div className="font-semibold text-red-400 pt-1">Red Flags:</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                {selectedDemoItem.redFlags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedDemoItem(null)}
                className="cyber-btn-secondary !text-xs !py-1.5"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const u = selectedDemoItem.url;
                  setSelectedDemoItem(null);
                  runQuickTest(u);
                }}
                className="cyber-btn-primary !text-xs !py-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Test in AI Scanner</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
