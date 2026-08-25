import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Radio, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Play, 
  Pause, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';

export const LiveMonitor = () => {
  const { isSystemActive, toggleSystemActive } = useSecurity();
  const [stream, setStream] = useState([]);
  const [interceptedCount, setInterceptedCount] = useState(0);

  const sampleThreatStreams = [
    { proto: 'HTTPS', url: 'https://paypal-security-verification.top/auth', threat: 'Phishing', risk: 96, action: 'BLOCKED' },
    { proto: 'HTTPS', url: 'https://github.com/torvalds/linux', threat: 'Clean', risk: 0, action: 'ALLOWED' },
    { proto: 'HTTP', url: 'http://185.220.101.5:8080/patch.exe', threat: 'Malware', risk: 99, action: 'BLOCKED' },
    { proto: 'HTTPS', url: 'https://google.com/search?q=cybersecurity', threat: 'Clean', risk: 0, action: 'ALLOWED' },
    { proto: 'HTTPS', url: 'https://appleid-recover-account.xyz/manage', threat: 'Phishing', risk: 94, action: 'BLOCKED' },
    { proto: 'HTTPS', url: 'https://bit.ly/3xY9kL2?redirect=http://crypto.xyz', threat: 'Suspicious', risk: 68, action: 'QUARANTINED' },
    { proto: 'HTTPS', url: 'https://microsoft.com/en-us/security', threat: 'Clean', risk: 0, action: 'ALLOWED' },
    { proto: 'HTTP', url: 'http://194.26.29.122:4444/beacon.bin', threat: 'Malware', risk: 100, action: 'BLOCKED' },
  ];

  useEffect(() => {
    if (!isSystemActive) return;

    const interval = setInterval(() => {
      const randomItem = sampleThreatStreams[Math.floor(Math.random() * sampleThreatStreams.length)];
      const packet = {
        id: 'pkt_' + Date.now() + '_' + Math.floor(Math.random() * 100),
        time: new Date().toLocaleTimeString(),
        ...randomItem
      };

      setStream(prev => [packet, ...prev.slice(0, 15)]);
      if (packet.threat !== 'Clean') {
        setInterceptedCount(c => c + 1);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isSystemActive]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Activity className="w-7 h-7 text-cyan-400" />
            <span>Real-Time Ingress Link Interceptor</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulates real-time perimeter gateway packet sniffing, clipboard interceptors, and automated firewall drops.
          </p>
        </div>

        {/* Global Toggle */}
        <div className="flex items-center gap-3 cyber-card p-2 px-4">
          <span className="text-xs font-mono text-slate-300">INTERCEPTOR STATUS:</span>
          <button
            onClick={toggleSystemActive}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              isSystemActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}
          >
            {isSystemActive ? <Radio className="w-3.5 h-3.5 animate-pulse" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isSystemActive ? 'LISTENING (LIVE)' : 'STANDBY'}</span>
          </button>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cyber-card p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase">Packets Inspected</span>
          <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">{stream.length * 8 + 42}</div>
        </div>
        <div className="cyber-card p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase">Live Intercepts Dropped</span>
          <div className="text-2xl font-mono font-bold text-red-400 mt-1">{interceptedCount}</div>
        </div>
        <div className="cyber-card p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase">Inspection Latency</span>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">1.4ms</div>
        </div>
      </div>

      {/* Stream Terminal */}
      <div className="cyber-card overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>REAL-TIME PACKET INTERCEPT FEED</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
            ● FEED CONNECTED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-4 py-3">Protocol</th>
                <th className="px-4 py-3">Inspected Ingress Destination</th>
                <th className="px-4 py-3">Threat Matrix</th>
                <th className="px-4 py-3">Risk Score</th>
                <th className="px-5 py-3 text-right">Firewall Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {stream.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-slate-400 font-sans">
                    Waiting for network packets... Ensure Interceptor status is LIVE above.
                  </td>
                </tr>
              ) : (
                stream.map((pkt) => (
                  <tr key={pkt.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3 text-slate-400 text-[11px]">{pkt.time}</td>
                    <td className="px-4 py-3 text-cyan-300 font-bold">{pkt.proto}</td>
                    <td className="px-4 py-3 max-w-sm truncate text-slate-200">{pkt.url}</td>
                    <td className="px-4 py-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pkt.threat === 'Clean' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {pkt.threat}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-300">{pkt.risk}%</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pkt.action === 'BLOCKED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {pkt.action}
                      </span>
                    </td>
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
