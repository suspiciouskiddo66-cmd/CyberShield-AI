import React from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Crown, 
  Star 
} from 'lucide-react';

export const Leaderboard = () => {
  const hunters = [
    { rank: 1, name: 'Alex Cyber (You)', points: 4850, verifiedThreats: 142, streak: '24 Days', tier: 'Grandmaster Hunter', avatar: 'A', isUser: true },
    { rank: 2, name: 'VortexZero', points: 4320, verifiedThreats: 128, streak: '19 Days', tier: 'Master Hunter', avatar: 'V', isUser: false },
    { rank: 3, name: 'CyberKitsune', points: 3980, verifiedThreats: 115, streak: '14 Days', tier: 'Master Hunter', avatar: 'C', isUser: false },
    { rank: 4, name: 'ByteSentinel', points: 3450, verifiedThreats: 98, streak: '12 Days', tier: 'Elite Hunter', avatar: 'B', isUser: false },
    { rank: 5, name: 'NullPointer', points: 2980, verifiedThreats: 84, streak: '8 Days', tier: 'Senior Hunter', avatar: 'N', isUser: false },
    { rank: 6, name: 'PhishCatcher99', points: 2410, verifiedThreats: 69, streak: '6 Days', tier: 'Hunter Level 2', avatar: 'P', isUser: false },
    { rank: 7, name: 'DarkTrace_Operative', points: 1950, verifiedThreats: 52, streak: '5 Days', tier: 'Hunter Level 1', avatar: 'D', isUser: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Trophy className="w-7 h-7 text-amber-400" />
          <span>Global Threat Hunter Leaderboard</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Rankings of top security analysts, threat hunters, and community contributors fighting cybercrime.
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* 2nd Place */}
        <div className="cyber-card p-6 text-center space-y-3 md:order-1 order-2 border-slate-700">
          <div className="inline-flex p-3 rounded-2xl bg-slate-800 text-slate-300 border border-slate-600">
            <Medal className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">#2 RANK</span>
            <h3 className="font-bold text-sm text-slate-100 mt-1">{hunters[1].name}</h3>
            <p className="text-xs font-mono text-cyan-400 font-bold">{hunters[1].points} Points</p>
          </div>
          <div className="text-[11px] text-slate-400">
            {hunters[1].verifiedThreats} Threats Neutralized
          </div>
        </div>

        {/* 1st Place */}
        <div className="cyber-card p-6 text-center space-y-3 md:order-2 order-1 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-gradient-to-b from-[#141829] to-[#0a0f1d]">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <Crown className="w-10 h-10" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">#1 TOP HUNTER</span>
            <h3 className="font-extrabold text-base text-slate-100 mt-1">{hunters[0].name}</h3>
            <p className="text-sm font-mono text-amber-400 font-extrabold">{hunters[0].points} Points</p>
          </div>
          <div className="text-xs text-slate-300 flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{hunters[0].streak} Active Streak</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="cyber-card p-6 text-center space-y-3 md:order-3 order-3 border-slate-700">
          <div className="inline-flex p-3 rounded-2xl bg-orange-950/30 text-orange-400 border border-orange-500/30">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-950/50 text-orange-300">#3 RANK</span>
            <h3 className="font-bold text-sm text-slate-100 mt-1">{hunters[2].name}</h3>
            <p className="text-xs font-mono text-cyan-400 font-bold">{hunters[2].points} Points</p>
          </div>
          <div className="text-[11px] text-slate-400">
            {hunters[2].verifiedThreats} Threats Neutralized
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="cyber-card overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Live Global Hunter Rankings
          </h3>
          <span className="text-xs font-mono text-cyan-400">Season 4 Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3">Rank</th>
                <th className="px-5 py-3">Hunter Profile</th>
                <th className="px-4 py-3">Reputation Tier</th>
                <th className="px-4 py-3">Threats Logged</th>
                <th className="px-4 py-3">Streak</th>
                <th className="px-5 py-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {hunters.map((h) => (
                <tr
                  key={h.rank}
                  className={`hover:bg-slate-800/40 transition-colors ${h.isUser ? 'bg-cyan-950/20 border-l-4 border-cyan-400' : ''}`}
                >
                  <td className="px-5 py-3 font-bold text-slate-200">
                    {h.rank === 1 ? '🥇 #1' : h.rank === 2 ? '🥈 #2' : h.rank === 3 ? '🥉 #3' : `#${h.rank}`}
                  </td>
                  <td className="px-5 py-3 font-sans">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 font-bold flex items-center justify-center text-xs">
                        {h.avatar}
                      </div>
                      <span className={`font-bold ${h.isUser ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {h.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {h.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{h.verifiedThreats} Neutralized</td>
                  <td className="px-4 py-3 text-orange-400 font-bold">{h.streak}</td>
                  <td className="px-5 py-3 text-right font-extrabold text-cyan-400">{h.points.toLocaleString()} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
