import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  Hash, 
  AlertCircle 
} from 'lucide-react';

export const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Calculate deep entropy & crack time
  const analyzePassword = (pwd) => {
    if (!pwd) return null;

    const len = pwd.length;
    let poolSize = 0;
    if (/[a-z]/.test(pwd)) poolSize += 26;
    if (/[A-Z]/.test(pwd)) poolSize += 26;
    if (/[0-9]/.test(pwd)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;

    // Entropy = L * log2(poolSize)
    const entropy = poolSize > 0 ? Math.round(len * Math.log2(poolSize)) : 0;

    // Estimated crack time assuming 100 billion attempts/sec (high-end GPU cluster)
    const combinations = Math.pow(poolSize, len);
    const secondsToCrack = combinations / (100 * 1000 * 1000 * 1000 * 0.5);

    let crackTimeText = 'Instantly';
    if (secondsToCrack > 31536000 * 1000000) crackTimeText = '300+ Million Years';
    else if (secondsToCrack > 31536000 * 1000) crackTimeText = '10,000+ Years';
    else if (secondsToCrack > 31536000 * 10) crackTimeText = '85 Years';
    else if (secondsToCrack > 31536000) crackTimeText = '2.5 Years';
    else if (secondsToCrack > 86400 * 30) crackTimeText = '4 Months';
    else if (secondsToCrack > 86400) crackTimeText = '3 Days';
    else if (secondsToCrack > 3600) crackTimeText = '4 Hours';
    else if (secondsToCrack > 60) crackTimeText = '15 Minutes';

    const hasCommonPattern = /password|123456|admin|qwerty|welcome|letmein|iloveyou/i.test(pwd);

    let score = 0;
    if (len >= 8) score += 20;
    if (len >= 14) score += 20;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 20;
    if (hasCommonPattern) score = Math.max(10, score - 40);
    score = Math.min(100, score);

    return {
      entropy,
      crackTimeText,
      hasCommonPattern,
      score,
      checks: [
        { label: 'Minimum 12 characters length', valid: len >= 12 },
        { label: 'Contains Uppercase letters (A-Z)', valid: /[A-Z]/.test(pwd) },
        { label: 'Contains Lowercase letters (a-z)', valid: /[a-z]/.test(pwd) },
        { label: 'Contains Numerical digits (0-9)', valid: /[0-9]/.test(pwd) },
        { label: 'Contains Special Symbols (!@#$%)', valid: /[^a-zA-Z0-9]/.test(pwd) },
        { label: 'No predictable dictionary words', valid: !hasCommonPattern }
      ]
    };
  };

  const analysis = analyzePassword(password);

  const generateStrongPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let generated = '';
    const array = new Uint32Array(18);
    crypto.getRandomValues(array);
    for (let i = 0; i < 18; i++) {
      generated += chars[array[i] % chars.length];
    }
    setPassword(generated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <KeyRound className="w-7 h-7 text-cyan-400" />
          <span>Credential Entropy & Brute-Force Auditor</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Evaluate cryptographic password entropy, calculate estimated brute-force crack resistance, and check dictionary vulnerabilities.
        </p>
      </div>

      {/* Input Box */}
      <div className="cyber-card p-6 space-y-4">
        <div className="relative">
          <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type or generate a password to audit..."
            className="w-full bg-[#070b14] border border-slate-700/80 rounded-xl pl-10 pr-24 py-3.5 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={generateStrongPassword}
              className="cyber-btn-secondary !text-xs !py-1 !px-2.5"
              title="Generate Cryptographic Password"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate</span>
            </button>
          </div>
        </div>

        {/* Dynamic Entropy Gauge */}
        {analysis && (
          <div className="space-y-4 pt-3 border-t border-slate-800 animate-in fade-in">
            {/* Score & Crack Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Entropy Rating</span>
                <div className="text-2xl font-mono font-extrabold text-cyan-400 mt-1">
                  {analysis.entropy} <span className="text-xs text-slate-400">bits</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Brute-Force Crack Time</span>
                <div className={`text-2xl font-mono font-extrabold mt-1 ${
                  analysis.score > 70 ? 'text-emerald-400' : analysis.score > 40 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {analysis.crackTimeText}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Defense Strength</span>
                <div className={`text-2xl font-mono font-extrabold mt-1 ${
                  analysis.score > 70 ? 'text-emerald-400' : analysis.score > 40 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {analysis.score}%
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-2">
                NIST SP 800-63B Credential Audit Requirements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysis.checks.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {c.valid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                    <span className={c.valid ? 'text-slate-200' : 'text-slate-400'}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
