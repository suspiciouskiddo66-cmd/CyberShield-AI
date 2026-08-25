import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScanSearch, 
  History, 
  FileText, 
  Bookmark, 
  Settings, 
  Power, 
  LogOut, 
  ShieldCheck, 
  ShieldAlert, 
  Radio, 
  Cpu, 
  Activity, 
  Terminal, 
  Sparkles, 
  Zap, 
  BookOpen,
  FileUp,
  Globe2,
  KeyRound,
  Radar,
  Users,
  Trophy,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSecurity } from '../context/SecurityContext';
import { useLang } from '../context/LanguageContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const { isSystemActive, toggleSystemActive, stats } = useSecurity();
  const { t } = useLang();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navSections = [
    {
      heading: 'CORE OPERATIONS',
      items: [
        { name: t('dashboard'), path: '/', icon: LayoutDashboard, badge: null },
        { name: t('scanLink'), path: '/scan', icon: ScanSearch, badge: 'AI ML' },
      ]
    },
    {
      heading: 'SECURITY TOOLS',
      items: [
        { name: t('fileScanner'), path: '/file-scanner', icon: FileUp, badge: 'NEW' },
        { name: t('safeBrowsing'), path: '/safe-browsing', icon: Globe2, badge: null },
        { name: t('passwordChecker'), path: '/password-checker', icon: KeyRound, badge: null },
        { name: t('darkWeb'), path: '/dark-web', icon: Radar, badge: null },
        { name: t('liveMonitor'), path: '/live-monitor', icon: Activity, badge: 'LIVE' },
      ]
    },
    {
      heading: 'INTELLIGENCE & DATABASE',
      items: [
        // Clean "Threat Examples" with NO badge as requested
        { name: t('threatExamples'), path: '/threat-examples', icon: BookOpen, badge: null },
        { name: t('threatHistory'), path: '/history', icon: History, count: stats.totalScans },
        { name: t('reports'), path: '/reports', icon: FileText, badge: 'PDF' },
        { name: t('rulesBookmarks'), path: '/bookmarks', icon: Bookmark, badge: null },
      ]
    },
    {
      heading: 'COMMUNITY & CHALLENGES',
      items: [
        { name: t('community'), path: '/community', icon: Users, badge: null },
        { name: t('leaderboard'), path: '/leaderboard', icon: Trophy, badge: null },
        { name: t('challenges'), path: '/challenges', icon: Award, badge: 'QUIZ' },
      ]
    },
    {
      heading: 'SYSTEM CONTROLS',
      items: [
        { name: t('settings'), path: '/settings', icon: Settings, badge: null },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#070c18]/95 backdrop-blur-xl border-r border-cyan-500/20 flex flex-col transition-all duration-300 ease-in-out shadow-[0_0_40px_rgba(0,0,0,0.8)]
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Glowing Top Cyber Accent Line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-slate-800/80 bg-gradient-to-b from-[#0d162d]/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-[#0e2246] to-blue-600/20 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] group">
              <ShieldCheck className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSystemActive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isSystemActive ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'}`}></span>
              </span>
            </div>
            <div>
              <div className="font-black tracking-wider text-base bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent flex items-center gap-1.5">
                <span>CYBERSHIELD</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              </div>
              <div className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>AI DEFENSE GRID</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 py-4 px-3 space-y-4 overflow-y-auto custom-scrollbar">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase flex items-center gap-2">
                <span>{section.heading}</span>
                <div className="flex-1 h-px bg-slate-800/80" />
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) => `
                      relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-blue-600/10 text-cyan-200 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 hover:border hover:border-slate-700/50'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1 bottom-1 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                        )}

                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                          <span className="tracking-wide truncate">{item.name}</span>
                        </div>

                        {item.badge && (
                          <span className={`px-1.5 py-0.2 text-[9px] font-mono font-bold rounded border ${
                            item.badge === 'LIVE' ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          }`}>
                            {item.badge}
                          </span>
                        )}

                        {item.count !== undefined && item.count > 0 && (
                          <span className="px-1.5 py-0.2 text-[10px] font-mono rounded-md bg-slate-800/90 text-cyan-300 border border-slate-700">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}

          {/* Real-time Defense Telemetry HUD Box */}
          <div className="p-3 rounded-xl bg-gradient-to-b from-[#0d162a]/90 to-[#080f1e]/90 border border-cyan-500/30 shadow-inner space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>REAL-TIME ENGINE</span>
              </span>
              <span className={`px-1.5 py-0.2 rounded font-bold ${isSystemActive ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                {isSystemActive ? 'ENGAGED' : 'PAUSED'}
              </span>
            </div>

            {/* Quick Threat Metric Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Threat Block Rate</span>
                <span className="text-cyan-300 font-bold">{stats.threatRatio}%</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-red-500 transition-all duration-500" 
                  style={{ width: `${Math.max(5, stats.threatRatio)}%` }}
                />
              </div>
            </div>

            {/* System Active Power Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] font-semibold text-slate-200">
                {t('activeGuard')}
              </div>
              <button
                onClick={toggleSystemActive}
                className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isSystemActive ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]' : 'bg-slate-700'
                }`}
                role="switch"
                aria-checked={isSystemActive}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isSystemActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="p-3 border-t border-slate-800/90 bg-[#060a14]/90 backdrop-blur-md">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-xs text-white uppercase shadow-[0_0_10px_rgba(6,182,212,0.3)] flex-shrink-0">
                  {user?.displayName ? user.displayName.charAt(0) : user?.email?.charAt(0) || 'O'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#060a14]" />
              </div>
              <div className="truncate text-left">
                <div className="text-xs font-bold text-slate-200 truncate flex items-center gap-1">
                  <span>{user?.displayName || 'Security Operator'}</span>
                </div>
                <div className="text-[10px] font-mono text-cyan-400/80 truncate">
                  SecOps Level 3
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
