import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  ShieldAlert, 
  Bell, 
  Key, 
  Sliders, 
  CheckCircle2, 
  Database, 
  Lock, 
  Radio, 
  Eye, 
  RefreshCw,
  Server,
  Palette,
  Sparkles,
  Moon,
  Sun,
  Check
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { getAuditLogs } from '../services/auditService';

export const Settings = () => {
  const { isSystemActive, toggleSystemActive } = useSecurity();
  const [theme, setTheme] = useState(() => localStorage.getItem('cybershield_bg_theme') || 'network-grid');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [sensitivity, setSensitivity] = useState('strict');
  
  // API Keys
  const [fastApiUrl, setFastApiUrl] = useState(() => localStorage.getItem('cybershield_api_url') || 'http://127.0.0.1:8000');
  const [googleSafeBrowsingKey, setGoogleSafeBrowsingKey] = useState(() => localStorage.getItem('cybershield_gsb_key') || '');
  const [virusTotalKey, setVirusTotalKey] = useState(() => localStorage.getItem('cybershield_vt_key') || '');
  
  // Firebase Config Modal / JSON State
  const [customFirebaseConfig, setCustomFirebaseConfig] = useState(() => localStorage.getItem('cybershield_custom_firebase_config') || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Security Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => getAuditLogs());

  const themeOptions = [
    { id: 'network-grid', label: 'Network Grid', category: 'Cyber Tactical', color: '#06b6d4', desc: 'Connected cyan laser mesh' },
    { id: 'matrix-rain', label: 'Matrix Code Rain', category: 'Cyber Tactical', color: '#10b981', desc: 'Digital cascading glyph rain' },
    { id: 'pulse-radar', label: 'Pulse Radar', category: 'Cyber Tactical', color: '#3b82f6', desc: 'Concentric radar threat sweep' },
    { id: 'neon-wave', label: 'Neon Cyber Waves', category: 'Cyber Tactical', color: '#a855f7', desc: 'Undulating cyber visualizer waves' },
    { id: 'red-alert', label: 'Red Alert War Room', category: 'Cyber Tactical', color: '#ef4444', desc: 'High-threat perimeter defense' },
    { id: 'hex-matrix', label: 'Quantum Hex Grid', category: 'Cyber Tactical', color: '#6366f1', desc: 'Honeycomb tactical mesh' },
    { id: 'crt-terminal', label: 'Hacker CRT Amber', category: 'Cyber Tactical', color: '#f59e0b', desc: 'Phosphor terminal scanlines' },
    { id: 'acid-hazard', label: 'Acid Biohazard Lime', category: 'Cyber Tactical', color: '#84cc16', desc: 'Electric plasma filaments' },
    { id: 'plain-black', label: 'Plain Stealth Black (OLED)', category: 'Minimalist', color: '#000000', desc: 'Deep #000000 Pitch Black Mode' },
    { id: 'plain-white', label: 'Plain Clean White (Light)', category: 'Minimalist', color: '#f8fafc', desc: 'Enterprise Clean Light Mode' },
  ];

  const handleThemeChange = (tId) => {
    setTheme(tId);
    localStorage.setItem('cybershield_bg_theme', tId);
    window.dispatchEvent(new Event('cybershield_theme_updated'));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('cybershield_api_url', fastApiUrl);
    localStorage.setItem('cybershield_gsb_key', googleSafeBrowsingKey);
    localStorage.setItem('cybershield_vt_key', virusTotalKey);
    if (customFirebaseConfig.trim()) {
      localStorage.setItem('cybershield_custom_firebase_config', customFirebaseConfig);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const refreshLogs = () => {
    setAuditLogs(getAuditLogs());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-cyan-400" />
          <span>System Settings & Visual Customization</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize cybersecurity background themes, plain black/white modes, detection sensitivity, and view security audit logs.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings successfully committed to configuration registry.</span>
        </div>
      )}

      {/* Cyber & Plain Theme Selector Card */}
      <div className="cyber-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>Visual Cyber & Minimalist Themes (10 Themes)</span>
        </h3>
        <p className="text-xs text-slate-400">
          Choose between immersive animated cybersecurity graphics, OLED stealth black, or enterprise clean white mode.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {themeOptions.map((t) => (
            <div
              key={t.id}
              onClick={() => handleThemeChange(t.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-2 ${
                theme === t.id
                  ? 'bg-cyan-500/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="font-bold text-xs text-slate-200 truncate">{t.label}</span>
                </div>
                {theme === t.id && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
              </div>
              <p className="text-[10px] text-slate-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System & Defense Preferences */}
        <div className="cyber-card p-6 space-y-5">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Detection Engine Preferences</span>
          </h3>

          {/* System Active Switch */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${isSystemActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Real-Time Protection ("System Active")</div>
                <div className="text-[11px] text-slate-400">
                  {isSystemActive ? 'Perimeter defense actively classifying ingress links' : 'Real-time interceptor paused'}
                </div>
              </div>
            </div>
            <button
              onClick={toggleSystemActive}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                isSystemActive ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                  isSystemActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Detection Sensitivity */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Heuristic Classifier Strictness
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {['standard', 'strict', 'ultra'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSensitivity(lvl)}
                  className={`p-2.5 rounded-lg border text-center uppercase font-bold transition-all ${
                    sensitivity === lvl 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Notification Alert */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold text-slate-200">Threat Audio Alerts</div>
                <div className="text-[11px] text-slate-400">Play alert sound when malware is detected</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={soundAlerts}
              onChange={(e) => setSoundAlerts(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
          </div>
        </div>

        {/* API & Backend Configurations */}
        <div className="cyber-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>Threat Intelligence API Integration</span>
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                FastAPI ML Backend Service URL
              </label>
              <div className="relative">
                <Server className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fastApiUrl}
                  onChange={(e) => setFastApiUrl(e.target.value)}
                  placeholder="http://127.0.0.1:8000"
                  className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Google Safe Browsing API Key (Optional)
              </label>
              <input
                type="password"
                value={googleSafeBrowsingKey}
                onChange={(e) => setGoogleSafeBrowsingKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                VirusTotal Intelligence API Key (Optional)
              </label>
              <input
                type="password"
                value={virusTotalKey}
                onChange={(e) => setVirusTotalKey(e.target.value)}
                placeholder="vt_api_key_..."
                className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Custom Firebase Credentials JSON (Optional)
              </label>
              <textarea
                rows={2}
                value={customFirebaseConfig}
                onChange={(e) => setCustomFirebaseConfig(e.target.value)}
                placeholder='{"apiKey": "...", "projectId": "..."}'
                className="w-full bg-[#070b14] border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="cyber-btn-primary w-full text-xs"
            >
              <span>Save Configuration</span>
            </button>
          </form>
        </div>
      </div>

      {/* Security & Login Attempts Audit Log */}
      <div className="cyber-card overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Operator Login Audit & Security Monitoring
              </h3>
              <p className="text-xs text-slate-400">
                Encrypted audit trail of authentication attempts & brute-force monitors.
              </p>
            </div>
          </div>

          <button
            onClick={refreshLogs}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            title="Refresh Audit Logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3">Timestamp (UTC)</th>
                <th className="px-4 py-3">Account Email</th>
                <th className="px-4 py-3">Auth Verdict</th>
                <th className="px-4 py-3">Client IP Address</th>
                <th className="px-5 py-3">Event Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-6 text-center text-slate-400 font-sans">
                    No login attempts recorded yet.
                  </td>
                </tr>
              ) : (
                auditLogs.slice(0, 10).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30">
                    <td className="px-5 py-3 text-slate-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-cyan-300 font-sans">{log.email}</td>
                    <td className="px-4 py-3 font-sans">
                      {log.success ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          SUCCESS
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          FAILED
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{log.ip}</td>
                    <td className="px-5 py-3 text-slate-300 font-sans text-[11px]">{log.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
