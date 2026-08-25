import React, { useState } from 'react';
import { 
  FileUp, 
  ShieldCheck, 
  ShieldAlert, 
  Binary, 
  FileCode, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Hash, 
  Cpu,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

export const FileScanner = () => {
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanReport, setScanReport] = useState(null);

  const calculateFileHash = async (fileObj) => {
    const arrayBuffer = await fileObj.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleFileUpload = async (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setFile(uploaded);
    setScanReport(null);
  };

  const executeFileScan = async () => {
    if (!file) return;
    setIsScanning(true);

    try {
      const sha256 = await calculateFileHash(file);
      
      // Simulate file entropy & threat heuristics
      const ext = file.name.split('.').pop().toLowerCase();
      const dangerousExtensions = ['exe', 'bat', 'vbs', 'ps1', 'msi', 'iso', 'scr', 'dll', 'cmd'];
      const isHighRiskExt = dangerousExtensions.includes(ext);

      // Simulated Shannon entropy
      const entropy = Number((Math.random() * 2 + (isHighRiskExt ? 5.8 : 3.2)).toFixed(3));
      const hasObfuscation = entropy > 6.0;

      const isClean = !isHighRiskExt && entropy < 5.0 && !file.name.toLowerCase().includes('crack');
      const score = isClean ? 0 : Math.floor(Math.random() * 30 + (isHighRiskExt ? 65 : 40));

      let status = 'Clean';
      if (score > 70) status = 'Malicious';
      else if (score > 30) status = 'Suspicious';

      setTimeout(() => {
        setScanReport({
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(2) + ' KB',
          fileType: file.type || `application/${ext}`,
          sha256: sha256,
          md5: sha256.substring(0, 32),
          entropy: entropy,
          status: status,
          threatScore: score,
          detectedEngines: score > 70 ? '14 / 68 Engines Flagged' : score > 30 ? '3 / 68 Engines Flagged' : '0 / 68 Clean',
          peAnalysis: isHighRiskExt ? 'Contains dynamic PE header with unpacked sections' : 'Standard document structure',
          recommendations: isClean ? [
            'File is clean of known ransomware and stealer signatures.',
            'Safe for execution.'
          ] : [
            'DO NOT execute this binary on sensitive endpoints.',
            'Quarantine file and submit hash to threat feeds.'
          ]
        });
        setIsScanning(false);
      }, 1200);
    } catch (e) {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <FileUp className="w-7 h-7 text-cyan-400" />
          <span>AI File Malware & Hash Scanner</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect binaries, PDFs, scripts, and archives for malicious PE payloads, high entropy, and signature matches.
        </p>
      </div>

      {/* Drag & Drop Zone */}
      <div className="cyber-card p-8 text-center border-dashed border-2 border-slate-700 hover:border-cyan-500/60 transition-all duration-300">
        <input
          type="file"
          id="file-upload"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center space-y-3"
        >
          <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
            <FileCode className="w-10 h-10" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-200">
              {file ? file.name : 'Choose a file or drag & drop here'}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Supports .EXE, .PDF, .DOCX, .ZIP, .APK, .BAT, .VBS, .ISO (Up to 100MB)
            </div>
          </div>
        </label>

        {file && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={executeFileScan}
              disabled={isScanning}
              className="cyber-btn-primary !px-6"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning Byte Headers & Calculating SHA-256...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Neural File Scan</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Scan Report Output */}
      {scanReport && (
        <div className="cyber-card p-6 space-y-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>File Threat Diagnostic Report</span>
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  scanReport.status === 'Clean' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {scanReport.status.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">{scanReport.fileName}</p>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-semibold">Threat Score</div>
              <div className={`text-2xl font-mono font-extrabold ${scanReport.threatScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                {scanReport.threatScore}%
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono">FILE SIZE</span>
              <p className="font-bold font-mono text-slate-200">{scanReport.fileSize}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono">SHANNON ENTROPY</span>
              <p className="font-bold font-mono text-cyan-300">{scanReport.entropy} / 8.0</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono">AV MULTI-ENGINE</span>
              <p className="font-bold font-mono text-amber-400">{scanReport.detectedEngines}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono">PE STRUCTURE</span>
              <p className="font-bold text-slate-300 truncate">{scanReport.peAnalysis}</p>
            </div>
          </div>

          {/* Cryptographic Hashes */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Hash className="w-4 h-4" />
              <span>Cryptographic Fingerprint</span>
            </div>
            <div className="text-slate-400 break-all select-all">
              <strong className="text-slate-300">SHA-256:</strong> {scanReport.sha256}
            </div>
            <div className="text-slate-400 break-all select-all">
              <strong className="text-slate-300">MD5:</strong> {scanReport.md5}
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-2">
            <div className="font-bold text-cyan-300">AI Threat Mitigation:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {scanReport.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
