import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSecurity } from '../context/SecurityContext';
import { ShieldCheck, AlertCircle } from 'lucide-react';

const COLORS = {
  Safe: '#10b981',       // Emerald Green
  Malware: '#ef4444',    // Crimson Red
  Phishing: '#f97316',   // Orange
  Suspicious: '#f59e0b', // Amber Yellow
};

export const RiskChart = () => {
  const { stats } = useSecurity();

  const data = [
    { name: 'Safe', value: stats.safeCount || 0, color: COLORS.Safe },
    { name: 'Malware', value: stats.malwareCount || 0, color: COLORS.Malware },
    { name: 'Phishing', value: stats.phishingCount || 0, color: COLORS.Phishing },
    { name: 'Suspicious', value: stats.suspiciousCount || 0, color: COLORS.Suspicious },
  ].filter(d => d.value > 0);

  const displayData = data.length > 0 ? data : [{ name: 'No Data', value: 1, color: '#334155' }];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const pct = stats.totalScans > 0 ? Math.round((item.value / stats.totalScans) * 100) : 0;
      return (
        <div className="bg-[#0b1120] border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs">
          <div className="font-semibold text-slate-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.payload.color }} />
            {item.name}
          </div>
          <div className="text-slate-400 mt-1">
            Count: <span className="font-mono text-white font-bold">{item.value}</span> ({pct}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="cyber-card p-5 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Risk Overview
          </h3>
          <p className="text-xs text-slate-400">Threat category distribution</p>
        </div>
        <div className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
          {stats.totalScans} URLs
        </div>
      </div>

      <div className="relative h-56 my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              stroke="#0a0f1d"
              strokeWidth={3}
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Threat % Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold font-mono text-slate-100">
            {stats.threatRatio}%
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Threat Rate
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="text-slate-300">Safe:</span>
          <span className="font-mono font-bold text-emerald-400 ml-auto">{stats.safeCount}</span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
          <span className="text-slate-300">Malware:</span>
          <span className="font-mono font-bold text-red-400 ml-auto">{stats.malwareCount}</span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
          <span className="text-slate-300">Phishing:</span>
          <span className="font-mono font-bold text-orange-400 ml-auto">{stats.phishingCount}</span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
          <span className="text-slate-300">Suspicious:</span>
          <span className="font-mono font-bold text-amber-400 ml-auto">{stats.suspiciousCount}</span>
        </div>
      </div>
    </div>
  );
};
