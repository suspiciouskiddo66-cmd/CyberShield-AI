import React from 'react';
import { Menu, ShieldAlert, Sparkles, Bell, Globe2 } from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';
import { useLang } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ThemeAndAccessHUD } from './ThemeAndAccessHUD';

export const Navbar = ({ setIsMobileOpen, onOpenTour }) => {
  const { isSystemActive, stats } = useSecurity();
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0a0f1d]/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSystemActive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isSystemActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </span>
          <span className="text-slate-400">DEFENSE GRID:</span>
          <span className={isSystemActive ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
            {isSystemActive ? "OPERATIONAL (LIVE)" : "STANDBY"}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">AI MODEL:</span>
          <span className="text-cyan-400 font-medium">CYBER-HEURISTIC V2.4</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {stats.blockedCount > 0 && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{stats.blockedCount} {t('blockedThreats')}</span>
          </div>
        )}

        {/* Live Theme & Language HUD */}
        <ThemeAndAccessHUD onOpenTour={onOpenTour} />

        <Link
          to="/scan"
          className="cyber-btn-primary !py-1.5 !px-3 text-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('scanLink')}</span>
        </Link>
      </div>
    </header>
  );
};
