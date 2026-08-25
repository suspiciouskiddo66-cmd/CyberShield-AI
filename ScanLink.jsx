import React, { useState } from 'react';
import { 
  ScanSearch, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Download, 
  ExternalLink,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { scanUrlAPI, batchScanUrlsAPI } from '../services/api';
import { useSecurity } from '../context/SecurityContext';

export const ScanLink = () => {
  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'batch'
  const [singleUrl, setSingleUrl] = useState('');
  const [batchUrls, setBatchUrls] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [batchResults, setBatchResults] = useState([]);
  const [error, setError] = useState('');
  const { refreshData, setSelectedScan } = useSecurity();

  const handleSingleScan = async (e) => {
    e.preventDefault();
    if (!singleUrl.trim()) return;

    setError('');
    setIsScanning(true);
    setScanResult(null);

    try {
      const result = await scanUrlAPI(singleUrl.trim());
      setScanResult(result);
      refreshData();
    } catch (err) {
      setError(err.message || 'Scan error occurred.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleBatchScan = async (e) => {
    e.preventDefault();
    const urls = batchUrls
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.length > 0);

    if (urls.length === 0) {
      setError('Please provide at least one URL to scan.');
      return;
    }

    setError('');
    setIsScanning(true);
    setBatchResults([]);

    try {
      const results = await batchScanUrlsAPI(urls);
      setBatchResults(results);
      refreshData();
    } catch (err) {
      setError(err.message || 'Batch scan failed.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <ScanSearch className="w-7 h-7 text-cyan-400" />
            <span>AI Deep Link Threat Scanner</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Perform in-depth multi-layered neural inspection on suspicious URLs and batch endpoints.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'single'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Single URL Scan
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'batch'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Batch URL Scan
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Single Scan Mode */}
      {activeTab === 'single' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 cyber-card p-6">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Enter Suspicious URL Target
            </h3>

            <form onSubmit={handleSingleScan} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={singleUrl}
                  onChange={(e) => setSingleUrl(e.target.value)}
                  placeholder="https://example-suspicious-bank-login.xyz/auth.php"
                  className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-400 font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-400 font-mono">
                  Engine: <span className="text-cyan-400">Lexical + Typosquatting + Shannon Entropy</span>
                </div>
                <button
                  type="submit"
                  disabled={isScanning}
                  className="cyber-btn-primary"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing Threat Vectors...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Execute Deep AI Scan</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Radar Scanning Visualizer */}
            {isScanning && (
              <div className="mt-8 p-6 rounded-xl bg-[#080d19] border border-cyan-500/30 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-24 h-24 rounded-full border-2 border-cyan-500/40 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent radar-sweep origin-bottom-right" />
                  <div className="w-16 h-16 rounded-full border border-cyan-500/20" />
                  <div className="w-8 h-8 rounded-full border border-cyan-500/40" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-cyan-300">
                    NEURAL THREAT MATRIX IN PROGRESS
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Inspecting domain age, IP spoofing, punycode & lexical features...
                  </div>
                </div>
              </div>
            )}

            {/* Scan Output Overview */}
            {scanResult && !isScanning && (
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Inspection Result
                  </span>
                  <button
                    onClick={() => setSelectedScan(scanResult)}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Open Detailed Threat Inspector</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Target:</span>
                    <span className="text-xs font-mono text-cyan-300 truncate max-w-sm">{scanResult.url}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Threat Verdict:</span>
                    <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      scanResult.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}>
                      {scanResult.status} ({scanResult.risk_score}/100 Risk)
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="font-bold text-cyan-400">AI Diagnostic: </span>
                    {scanResult.summary}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Info / Quick Reference */}
          <div className="cyber-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Inspection Vectors</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-cyan-300 mb-1">1. Lexical URL Features</div>
                <p className="text-slate-400 text-[11px]">
                  Analyzes URL length, digit ratio, token entropy, path depth, and special character abuse (@, //).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-cyan-300 mb-1">2. Homoglyph & Typosquatting</div>
                <p className="text-slate-400 text-[11px]">
                  Detects punycode exploits (xn--) and character lookalikes masquerading as reputable financial/tech brands.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-cyan-300 mb-1">3. TLD & IP Address Check</div>
                <p className="text-slate-400 text-[11px]">
                  Cross-references high-risk TLDs (.xyz, .top, .tk) and identifies raw IP hosted malicious payloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Batch Scan Mode */
        <div className="cyber-card p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
              Batch URL Analysis (Up to 50 URLs)
            </h3>
            <p className="text-xs text-slate-400">
              Paste one URL per line to perform concurrent neural threat classification.
            </p>
          </div>

          <form onSubmit={handleBatchScan} className="space-y-4">
            <textarea
              rows={6}
              value={batchUrls}
              onChange={(e) => setBatchUrls(e.target.value)}
              placeholder="https://paypal-security.top&#10;https://google.com&#10;http://185.220.101.5/file.exe&#10;https://github.com"
              className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl p-4 text-xs font-mono text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isScanning}
                className="cyber-btn-primary"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Batch...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4" />
                    <span>Scan Batch URLs</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Batch Results Table */}
          {batchResults.length > 0 && (
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Batch Scan Verdicts ({batchResults.length})
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="px-4 py-2.5">URL Target</th>
                      <th className="px-4 py-2.5">Status</th>
                      <th className="px-4 py-2.5">Risk Score</th>
                      <th className="px-4 py-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {batchResults.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="px-4 py-2.5 max-w-sm truncate text-slate-200">{item.url}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Safe' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-300">{item.risk_score}%</td>
                        <td className="px-4 py-2.5 text-right">
                          <button
                            onClick={() => setSelectedScan(item)}
                            className="text-cyan-400 hover:underline text-[11px]"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
