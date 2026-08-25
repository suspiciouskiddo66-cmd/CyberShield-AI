import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Globe, Activity } from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';

export const StatsBar = () => {
  const { stats } = useSecurity();

  const cards = [
    {
      title: 'Total Scans',
      value: stats.totalScans,
      subtitle: 'URLs analyzed',
      icon: Globe,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]'
    },
    {
      title: 'Blocked Risk Links',
      value: stats.blockedCount,
      subtitle: `${stats.malwareCount} Malware, ${stats.phishingCount} Phishing`,
      icon: ShieldAlert,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
    },
    {
      title: 'Suspicious Links',
      value: stats.suspiciousCount,
      subtitle: 'Anomalies flagged',
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
    },
    {
      title: 'Safe URLs',
      value: stats.safeCount,
      subtitle: 'Clean destinations',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`cyber-card p-5 group transition-all duration-300 ${card.border} ${card.glow}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </p>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-100 mt-1 font-mono">
                  {card.value}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  {card.subtitle}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${card.bg} border ${card.border} ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
