import React, { useState } from 'react';
import { 
  Palette, 
  Languages, 
  Eye, 
  GraduationCap, 
  Sparkles, 
  Sliders, 
  Check, 
  Radio,
  Contrast,
  Volume2,
  ShieldAlert,
  Terminal,
  Layers,
  Moon,
  Sun,
  Flame,
  Zap
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export const ThemeAndAccessHUD = ({ onOpenTour }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('cybershield_bg_theme') || 'network-grid');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('cybershield_contrast') === 'true');
  const { lang, changeLanguage, availableLanguages } = useLang();

  const cyberThemes = [
    { id: 'network-grid', label: 'Network Grid', color: 'bg-cyan-500' },
    { id: 'matrix-rain', label: 'Matrix Code Rain', color: 'bg-emerald-500' },
    { id: 'pulse-radar', label: 'Pulse Radar', color: 'bg-blue-500' },
    { id: 'neon-wave', label: 'Neon Cyber Waves', color: 'bg-purple-500' },
    { id: 'red-alert', label: 'Red Alert War Room', color: 'bg-red-500' },
    { id: 'hex-matrix', label: 'Quantum Hex Grid', color: 'bg-indigo-500' },
    { id: 'crt-terminal', label: 'Hacker CRT Amber', color: 'bg-amber-500' },
    { id: 'acid-hazard', label: 'Acid Biohazard Lime', color: 'bg-lime-500' },
  ];

  const plainThemes = [
    { id: 'plain-black', label: 'Plain Stealth Black (OLED)', icon: Moon, desc: 'Pure #000000 Pitch Black' },
    { id: 'plain-white', label: 'Plain Clean White (Light)', icon: Sun, desc: 'Enterprise Clean Light Mode' },
  ];

  const handleThemeSelect = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('cybershield_bg_theme', themeId);
    window.dispatchEvent(new Event('cybershield_theme_updated'));
  };

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem('cybershield_contrast', next ? 'true' : 'false');
    document.documentElement.classList.toggle('high-contrast', next);
  };

  const languageLabels = {
    en: 'English (EN)',
    es: 'Español (ES)',
    fr: 'Français (FR)',
    de: 'Deutsch (DE)',
    ja: '日本語 (JA)',
    hi: 'हिन्दी (HI)'
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5">
        {/* Academy Tour Button */}
        <button
          onClick={onOpenTour}
          className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          title="Open Interactive Security Academy"
        >
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Academy Tour</span>
        </button>

        {/* Theme Palette Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
          title="Cyber Theme & Language HUD"
        >
          <Palette className="w-4 h-4 text-cyan-400" />
          <span className="hidden md:inline font-mono uppercase text-[11px] font-bold">{lang}</span>
        </button>
      </div>

      {/* Popover Controls Menu */}
      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-80 cyber-card p-4 border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] space-y-4 animate-in fade-in max-h-[85vh] overflow-y-auto">
          {/* Cyber Animated Themes */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cyber Tactical Themes</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
              {cyberThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeSelect(t.id)}
                  className={`p-2 rounded-lg text-left transition-all border text-[11px] flex items-center gap-2 ${
                    currentTheme === t.id
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/60 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${t.color} flex-shrink-0`} />
                  <span className="truncate">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Minimalist Plain Black & Plain White Themes */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>Minimalist Plain Themes</span>
            </label>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              {plainThemes.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleThemeSelect(t.id)}
                    className={`p-2.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      currentTheme === t.id
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/60 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="font-semibold text-xs">{t.label}</div>
                        <div className="text-[10px] text-slate-400">{t.desc}</div>
                      </div>
                    </div>
                    {currentTheme === t.id && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selector */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span>System Language (i18n)</span>
            </label>
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              {availableLanguages.map((l) => (
                <option key={l} value={l}>
                  {languageLabels[l] || l.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* High Contrast */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Contrast className="w-4 h-4 text-cyan-400" />
              <span>High Contrast Filter</span>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={toggleContrast}
              className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
