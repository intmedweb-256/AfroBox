import React, { useState } from 'react';
import { BookOpen, Compass, Bookmark, Award, Globe, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'storylands' | 'saved' | 'progress';
  onSelectTab: (tab: 'home' | 'storylands' | 'saved' | 'progress') => void;
  savedCount: number;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  completedCount
}) => {
  const [showWorldMenu, setShowWorldMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & World Selector */}
          <div className="flex items-center gap-3">
            <button
              id="header-brand-button"
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-amber-100" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-amber-950 font-['Urbanist']">
                    Afro<span className="text-amber-600">Box</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-800">
                    BETA
                  </span>
                </div>
                <div className="text-xs font-semibold text-amber-800/80 flex items-center gap-1">
                  <span>World 1: Storylands</span>
                </div>
              </div>
            </button>

            {/* World Switcher Dropdown (Extensibility principle) */}
            <div className="relative hidden md:block">
              <button
                id="world-switcher-toggle"
                onClick={() => setShowWorldMenu(!showWorldMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-900/70 bg-amber-100/60 hover:bg-amber-100 rounded-full border border-amber-300/50 transition-colors"
                title="Switch AfroBox learning worlds"
              >
                <Globe className="w-3.5 h-3.5 text-amber-700" />
                <span>All Worlds</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showWorldMenu && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-amber-200 p-3 z-50 text-xs">
                  <div className="font-bold text-amber-950 px-2 py-1 mb-1 flex items-center justify-between">
                    <span>AfroBox Universe</span>
                    <span className="text-[10px] text-amber-600 font-medium">Modular Worlds</span>
                  </div>
                  <div className="space-y-1">
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-300/80 font-medium text-amber-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-bold">Storylands</span>
                      </div>
                      <span className="text-[10px] bg-amber-200/80 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                        Active Beta
                      </span>
                    </div>

                    <div className="p-2 rounded-xl opacity-60 hover:opacity-80 transition-opacity flex items-center justify-between">
                      <span>Numbers & Mathlands</span>
                      <span className="text-[10px] text-stone-500">Planned</span>
                    </div>

                    <div className="p-2 rounded-xl opacity-60 hover:opacity-80 transition-opacity flex items-center justify-between">
                      <span>AfroScience Lab</span>
                      <span className="text-[10px] text-stone-500">Planned</span>
                    </div>

                    <div className="p-2 rounded-xl opacity-60 hover:opacity-80 transition-opacity flex items-center justify-between">
                      <span>Ancient Kingdoms</span>
                      <span className="text-[10px] text-stone-500">Planned</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-amber-100 text-[11px] text-stone-500 px-2 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Respecting cultural origins & verified provenance</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              id="nav-btn-home"
              onClick={() => onSelectTab('home')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                currentTab === 'home'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-amber-100/70 hover:text-amber-950'
              }`}
            >
              <span>Home</span>
            </button>

            <button
              id="nav-btn-storylands"
              onClick={() => onSelectTab('storylands')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                currentTab === 'storylands'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-amber-100/70 hover:text-amber-950'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Storylands</span>
            </button>

            <button
              id="nav-btn-saved"
              onClick={() => onSelectTab('saved')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                currentTab === 'saved'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-amber-100/70 hover:text-amber-950'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">My Stories</span>
              <span className="sm:hidden">Saved</span>
              {savedCount > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                    currentTab === 'saved' ? 'bg-amber-700 text-white' : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </button>

            <button
              id="nav-btn-progress"
              onClick={() => onSelectTab('progress')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                currentTab === 'progress'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 hover:bg-amber-100/70 hover:text-amber-950'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Progress</span>
              {completedCount > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                    currentTab === 'progress' ? 'bg-amber-700 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {completedCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
