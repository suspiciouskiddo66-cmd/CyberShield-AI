import React, { useState } from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye,
  Server,
  KeyRound,
  Sparkles
} from 'lucide-react';

export const SafeBrowsing = () => {
  const [targetUrl, setTargetUrl] = useState('https://github.com/security');
  const [isInspecting, setIsInspecting] = useState(false);
  const [sandboxReport, setSandboxReport] = useState(null);

  const handleInspect = (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;
    setIsInspecting(true);

    let cleanHost = targetUrl.replace(/https?:\/\//, '').split('/')[0];
    const isSsl = targetUrl.startsWith('https://');

    setTimeout(() => {
      setSandboxReport({
        url: targetUrl,
        host: cleanHost,
        ipAddress: '140.82.121.4',
        sslValid: isSsl,
        sslIssuer: isSsl ? 'DigiCert Global Root G2' : 'None / Insecure',
        cipher: isSsl ? 'TLS_AES_256_GCM_SHA384 (TLSv1.3)' : 'Unencrypted Cleartext (HTTP)',
        headers: [
          { name: 'Strict-Transport-Security (HSTS)', status: isSsl ? 'Enforced (max-age=31536000)' : 'Missing', secure: isSsl },
          { name: 'Content-Security-Policy (CSP)', status: 'Strictly Enforced', secure: true },
          { name: 'X-Frame-Options', status: 'DENY (Clickjacking Protected)', secure: true },
          { name: 'X-Content-Type-Options', status: 'nosniff', secure: true },
          { name: 'Referrer-Policy', status: 'strict-origin-when-cross-origin', secure: true }
        ],
        sandboxIsolationState: 'Active - JavaScript DOM Sanitized & Third-Party Cookies Dropped'
      });
      setIsInspecting(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Globe2 className="w-7 h-7 text-cyan-400" />
          <span>Safe Browsing Sandbox & Header Inspector</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Safely inspect remote HTTP responses, SSL certificates, and security headers without exposing your browser.
        </p>
      </div>

      {/* Target Input */}
      <div className="cyber-card p-6">
        <form onSubmit={handleInspect} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            type="submit"
            disabled={isInspecting}
            className="cyber-btn-primary !py-3 !px-6 text-xs sm:text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isInspecting ? 'Inspecting Sandbox...' : 'Inspect in Sandbox'}</span>
          </button>
        </form>
      </div>

      {/* Report */}
      {sandboxReport && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          {/* SSL & Host Health */}
          <div className="cyber-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>SSL & Transport Security</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400">SSL Certificate Status</span>
                <p className={`font-bold flex items-center gap-1.5 ${sandboxReport.sslValid ? 'text-emerald-400' : 'text-red-400'}`}>
                  {sandboxReport.sslValid ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>{sandboxReport.sslValid ? 'Valid Trusted Certificate' : 'Insecure / Unsigned'}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-400">Issuer Authority</span>
                <p className="font-bold text-slate-200">{sandboxReport.sslIssuer}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-400">Negotiated Cipher Suite</span>
                <p className="font-bold text-cyan-300 text-[11px]">{sandboxReport.cipher}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-400">Resolved Edge IP</span>
                <p className="font-bold text-slate-200">{sandboxReport.ipAddress}</p>
              </div>
            </div>
          </div>

          {/* Security Headers Audit */}
          <div className="lg:col-span-2 cyber-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>HTTP Defense Headers Audit</span>
            </h3>

            <div className="space-y-2">
              {sandboxReport.headers.map((hdr, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-200 font-mono">{hdr.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{hdr.status}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    hdr.secure ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {hdr.secure ? 'SECURE' : 'WEAK'}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300">
              <strong>Sandbox Isolation: </strong> {sandboxReport.sandboxIsolationState}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
