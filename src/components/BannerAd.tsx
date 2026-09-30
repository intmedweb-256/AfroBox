import React, { useState } from 'react';
import { Sparkles, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { useSchoolMode } from '../context/SchoolModeContext';

interface BannerAdProps {
  slot?: 'bottom_dock' | 'side_panel';
}

export const BannerAd: React.FC<BannerAdProps> = ({ slot = 'bottom_dock' }) => {
  const { isSchoolMode } = useSchoolMode();
  const [isDismissed, setIsDismissed] = useState(false);

  // In School/Education mode or if dismissed, hide banner ads to ensure an ad-free classroom environment
  if (isSchoolMode || isDismissed) {
    return null;
  }

  if (slot === 'side_panel') {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-3 relative shadow-2xs text-left">
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className="text-[9px] font-black uppercase tracking-wider text-amber-800/70 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#E25822]" />
            <span>Community Sponsor</span>
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-stone-400 hover:text-stone-600 p-0.5 rounded-md text-xs"
            title="Dismiss sponsor message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        <div className="text-xs font-bold text-[#23211E] leading-snug">
          African Heritage & Children's Library Initiative
        </div>
        <div className="text-[11px] text-[#7C4728] mt-0.5 leading-tight">
          Support authentic storytelling & book donation programs across schools.
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-extrabold text-[#C85A32]">
          <span>Learn More</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  // Default: Bottom docked slim perimeter banner (never overlaps canvas controls)
  return (
    <aside
      aria-label="Sponsorship Banner"
      className="w-full bg-[#FAF5E6] border-t border-[#E6DCBF] px-3 py-1.5 flex items-center justify-between gap-3 text-xs z-30 shrink-0 select-none shadow-xs"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="px-1.5 py-0.5 rounded-sm bg-amber-200 text-amber-950 font-black text-[9px] uppercase tracking-wide shrink-0">
          SPONSOR
        </span>
        <span className="font-extrabold text-[#23211E] truncate">
          AfroBox Heritage Library
        </span>
        <span className="hidden sm:inline text-[#7C4728] truncate text-[11px]">
          • Authentic African oral folktales, tactile geography & brain quests
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden md:flex items-center gap-1 text-[10px] font-bold text-emerald-800">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          Family-Safe
        </span>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-stone-400 hover:text-[#23211E] rounded-md transition-colors"
          title="Minimize Banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
