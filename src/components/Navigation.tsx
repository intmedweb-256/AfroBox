import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Brain,
  PackageOpen,
  Volume2,
  VolumeX,
  ChevronDown,
  Sparkles,
  MapPin,
  Globe,
  Layers,
  X,
  GraduationCap,
  Maximize2,
  Rocket
} from 'lucide-react';
import { AgeTier, PillarId } from '../types/afrobox';
import { useSchoolMode } from '../context/SchoolModeContext';

interface NavigationProps {
  currentPillar: PillarId | 'HOME';
  onSelectPillar: (pillar: PillarId | 'HOME') => void;
  ageTier: AgeTier;
  onChangeAgeTier: (tier: AgeTier) => void;
  totalDiscoveriesCount: number;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onOpenDeployment?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPillar,
  onSelectPillar,
  ageTier,
  onChangeAgeTier,
  totalDiscoveriesCount,
  voiceEnabled,
  onToggleVoice,
  onOpenDeployment
}) => {
  const [showDiscoverMenu, setShowDiscoverMenu] = useState(false);
  const [showAgeMenu, setShowAgeMenu] = useState(false);

  const pillarsList = [
    {
      id: 'EXPLORE' as PillarId,
      name: 'Explore Africa',
      icon: '🌍',
      tagline: 'Interactive landscapes, rivers, mountains & landmarks',
      color: 'bg-emerald-50 text-emerald-950 border-emerald-300'
    },
    {
      id: 'STORYLANDS' as PillarId,
      name: 'Storylands',
      icon: '📖',
      tagline: 'Authentic retellings, multi-track audio & cultural origins',
      color: 'bg-amber-50 text-amber-950 border-amber-300'
    },
    {
      id: 'RIDDLE' as PillarId,
      name: 'Riddle & Brain',
      icon: '🧠',
      tagline: 'Thinking playground: African riddles, logic & deduction',
      color: 'bg-orange-50 text-orange-950 border-orange-300'
    },
    {
      id: 'BRAIN' as PillarId,
      name: 'Logic & Puzzles',
      icon: '🧩',
      tagline: 'River crossings, visual reasoning, math & patterns',
      color: 'bg-sky-50 text-sky-950 border-sky-300'
    }
  ];

  const { isSchoolMode, setIsSchoolMode, setIsCurriculumOpen, toggleFullscreen } = useSchoolMode();

  return (
    <header className="sticky top-0 z-40 bg-[#FBF7EE]/95 backdrop-blur-md border-b border-[#E6DCBF] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Hub Logo */}
          <div className="flex items-center gap-3">
            <button
              id="nav-logo-btn"
              onClick={() => onSelectPillar('HOME')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-[#1D3E2F] border border-[#E6DCBF] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                <img
                  src="/afrobox-logo.png"
                  alt="AfroBox Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to compass if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#23211E] font-['Urbanist']">
                    Afro<span className="text-[#E25822]">Box</span>
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-[#7C4728] hidden sm:block">
                  African Stories, Geography & Brain Quests
                </div>
              </div>
            </button>
          </div>

          {/* Persistent Center Navigation: Home | Discover | My Box */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F0E8D0] p-1.5 rounded-2xl border border-[#E0D4B2]">
            <button
              id="nav-home-btn"
              onClick={() => onSelectPillar('HOME')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                currentPillar === 'HOME'
                  ? 'bg-[#E25822] text-white shadow-xs'
                  : 'text-[#23211E] hover:text-[#E25822] hover:bg-[#FBF7EE]/60'
              }`}
            >
              Home
            </button>

            {/* Discover Dropdown */}
            <div className="relative">
              <button
                id="nav-discover-dropdown"
                onClick={() => setShowDiscoverMenu(!showDiscoverMenu)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  ['EXPLORE', 'STORYLANDS', 'BRAIN', 'RIDDLE'].includes(currentPillar)
                    ? 'bg-[#1D3E2F] text-white shadow-xs'
                    : 'text-[#23211E] hover:text-[#1D3E2F] hover:bg-[#FBF7EE]/60'
                }`}
              >
                <span>Discover Worlds</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showDiscoverMenu ? 'rotate-180' : ''}`} />
              </button>

              {showDiscoverMenu && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#FBF7EE] rounded-3xl shadow-xl border-2 border-[#E6DCBF] p-3 z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
                    Explore the Pillars
                  </div>
                  <div className="space-y-1.5 mt-1">
                    {pillarsList.map((p) => (
                      <button
                        key={p.id}
                        id={`pillar-select-${p.id.toLowerCase()}`}
                        onClick={() => {
                          onSelectPillar(p.id);
                          setShowDiscoverMenu(false);
                        }}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                          currentPillar === p.id
                            ? 'bg-[#E6DCBF] border-[#C85A32]'
                            : 'bg-white hover:bg-[#F0E8D0] border-[#E6DCBF]'
                        }`}
                      >
                        <span className="text-2xl shrink-0 mt-0.5">{p.icon}</span>
                        <div>
                          <div className="font-extrabold text-sm text-[#23211E] font-['Urbanist']">
                            {p.name}
                          </div>
                          <div className="text-xs text-[#7C4728] leading-tight mt-0.5 line-clamp-1">
                            {p.tagline}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* My Box Persistent Button */}
            <button
              id="nav-mybox-btn"
              onClick={() => onSelectPillar('MY_BOX')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                currentPillar === 'MY_BOX'
                  ? 'bg-[#D9822B] text-white shadow-xs'
                  : 'text-[#23211E] hover:text-[#D9822B] hover:bg-[#FBF7EE]/60'
              }`}
            >
              <PackageOpen className="w-4 h-4" />
              <span>My Box</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/40 text-[#23211E] font-extrabold">
                {totalDiscoveriesCount}
              </span>
            </button>
          </nav>

          {/* Right Action Tools: School Mode + Smartboard Fullscreen + Age Tier + Audio Voice Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Launch & Beta Testing Suite Button */}
            {onOpenDeployment && (
              <button
                id="deployment-guide-nav-btn"
                onClick={onOpenDeployment}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs font-extrabold transition-all shadow-2xs"
                title="Launch Steps & Beta Testing Suite (Target: Sept 27th)"
              >
                <Rocket className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden lg:inline">Launch Sept 27</span>
              </button>
            )}

            {/* School & Curriculum Guide Button */}
            <button
              id="school-curriculum-nav-btn"
              onClick={() => setIsCurriculumOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold transition-all shadow-2xs"
              title="Classroom Lesson Plans & Curriculum Standards"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span className="hidden xl:inline">Schools Guide</span>
            </button>

            {/* Smartboard / Projector Fullscreen Toggle */}
            <button
              id="smartboard-fullscreen-btn"
              onClick={toggleFullscreen}
              className="hidden sm:flex items-center gap-1 p-2 rounded-xl bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#23211E] text-xs font-bold transition-all shadow-2xs"
              title="Fullscreen for Smartboard or Projector"
            >
              <Maximize2 className="w-4 h-4 text-[#7C4728]" />
            </button>

            {/* Age Tier Switcher */}
            <div className="relative">
              <button
                id="age-tier-toggle-btn"
                onClick={() => setShowAgeMenu(!showAgeMenu)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] text-xs font-bold text-[#23211E] hover:bg-[#F0E8D0] transition-colors shadow-2xs"
                title="Select Age Experience"
              >
                <span className="w-2 h-2 rounded-full bg-[#E25822]"></span>
                <span>Ages {ageTier}</span>
                <ChevronDown className="w-3 h-3 text-[#7C4728]" />
              </button>

              {showAgeMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#FBF7EE] rounded-2xl shadow-xl border border-[#E6DCBF] p-2 z-50 text-xs animate-in fade-in">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase text-[#7C4728]">
                    Adjust Child Age Tier
                  </div>
                  {(['6-8', '9-10', '11-12'] as AgeTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        onChangeAgeTier(tier);
                        setShowAgeMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between transition-colors ${
                        ageTier === tier
                          ? 'bg-[#E25822] text-white'
                          : 'text-[#23211E] hover:bg-[#F0E8D0]'
                      }`}
                    >
                      <span>Ages {tier}</span>
                      <span className="text-[10px] font-normal opacity-80">
                        {tier === '6-8' ? 'Visual & Audio' : tier === '9-10' ? 'Puzzles & Clues' : 'Deep Context'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Narrator Voice Guidance Button */}
            <button
              id="narrator-voice-toggle"
              onClick={onToggleVoice}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs ${
                voiceEnabled
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                  : 'bg-white border-[#E6DCBF] text-[#7C4728] hover:bg-[#F0E8D0]'
              }`}
              title={voiceEnabled ? 'AfroBox Narrator Voice: ON' : 'AfroBox Narrator Voice: OFF'}
            >
              {voiceEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-700" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#7C4728]" />
              )}
            </button>

            {/* Mobile My Box shortcut */}
            <button
              id="mobile-mybox-header-btn"
              onClick={() => onSelectPillar('MY_BOX')}
              className="md:hidden p-2 rounded-xl bg-[#D9822B] text-white font-bold relative"
              title="My Box"
            >
              <PackageOpen className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E25822] text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white">
                {totalDiscoveriesCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
