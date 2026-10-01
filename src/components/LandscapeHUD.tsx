import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Globe,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  PanelRight,
  PanelRightClose,
  Users,
  Compass,
  GraduationCap,
  Music,
  HelpCircle,
  Rocket
} from 'lucide-react';
import { PillarId, AgeTier } from '../types/afrobox';
import { gamificationService, LevelInfo } from '../services/gamificationService';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { useSchoolMode } from '../context/SchoolModeContext';

interface LandscapeHUDProps {
  currentPillar: PillarId | 'HOME' | 'LAUNCHER';
  onSelectPillar: (pillar: PillarId | 'HOME' | 'LAUNCHER') => void;
  isSidePanelOpen: boolean;
  onToggleSidePanel: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  ageTier: AgeTier;
  onOpenTour?: () => void;
  onOpenDeployment?: () => void;
}

export const LandscapeHUD: React.FC<LandscapeHUDProps> = ({
  currentPillar,
  onSelectPillar,
  isSidePanelOpen,
  onToggleSidePanel,
  voiceEnabled,
  onToggleVoice,
  ageTier,
  onOpenTour,
  onOpenDeployment
}) => {
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(gamificationService.getLevelInfo());
  const [continentProgress, setContinentProgress] = useState(gamificationService.getContinentalProgress());
  const [discoveredWordsCount, setDiscoveredWordsCount] = useState<number>(0);
  const [hasFamilyVoices, setHasFamilyVoices] = useState<boolean>(false);

  const { isSchoolMode, setIsCurriculumOpen, toggleFullscreen } = useSchoolMode();

  useEffect(() => {
    updateStats();
    const unsubscribe = gamificationService.subscribe(() => {
      updateStats();
    });
    return () => unsubscribe();
  }, []);

  const updateStats = () => {
    setLevelInfo(gamificationService.getLevelInfo());
    setContinentProgress(gamificationService.getContinentalProgress());
    const progress = storageService.getProgress();
    setDiscoveredWordsCount(progress.discoveredWords?.length || 0);

    const casts = storageService.getAllFamilyStoryCasts();
    const totalScenesRecorded = Object.values(casts).reduce(
      (acc, c) => acc + Object.keys(c.sceneRecordings || {}).length,
      0
    );
    setHasFamilyVoices(totalScenesRecorded > 0);
  };

  const handleSoundCheck = () => {
    audioEngine.playSoundEffect('kora');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF7EE]/95 backdrop-blur-md border-b border-[#E6DCBF] px-3 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-xs">
      {/* 1. Left: Official AfroBox Logo & Mission Setup Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={() => onSelectPillar('HOME')}
          className="flex items-center gap-2 group text-left focus:outline-none"
          title="Return to AfroBox Hub"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-[#1D3E2F] border border-[#E6DCBF] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/afrobox-logo.png"
              alt="AfroBox Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-base sm:text-lg text-[#23211E] font-['Urbanist']">
                Afro <span className="text-[#E25822]">Box</span> <span className="text-[#1D3E2F]">Web</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-200/80 text-amber-900">
                BETA
              </span>
              <span className="hidden lg:inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full border border-amber-300">
                <span>🇺🇬</span>
                <span>Uganda Edition</span>
              </span>
            </div>
            <div className="text-[10px] text-[#7C4728] font-bold tracking-tight mt-0.5">
              African Stories, Origins & Living Heritage
            </div>
          </div>
        </button>

        {/* Quick Mission Options Setup Launcher Button */}
        <button
          onClick={() => onSelectPillar('LAUNCHER')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all shadow-2xs ${
            currentPillar === 'LAUNCHER'
              ? 'bg-[#1D3E2F] text-white border-[#1D3E2F]'
              : 'bg-amber-50 hover:bg-amber-100 text-[#C85A32] border-amber-300'
          }`}
          title="Open Journey Options & Mission Setup"
        >
          <Zap className="w-3.5 h-3.5 text-[#E25822]" />
          <span className="hidden md:inline">Mission Setup</span>
        </button>
      </div>

      {/* 2. Center: Gamified HUD Meters (Level, XP Progress Bar & Continental Radar) */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-0.5">
        {/* Level Badge & XP Progress Bar */}
        <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-2xl border border-[#E6DCBF] shadow-2xs shrink-0">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E25822] to-[#C85A32] text-white flex items-center justify-center text-xs font-black shrink-0">
            {levelInfo.badgeEmoji}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-[#23211E] gap-2">
              <span className="text-[#C85A32]">LVL {levelInfo.level}</span>
              <span className="text-[#7C4728] hidden sm:inline">{levelInfo.title}</span>
            </div>
            {/* Animated XP Meter */}
            <div className="w-20 sm:w-28 h-2 rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E25822] to-[#F4B32A] rounded-full transition-all duration-500"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Continental Radar Meter */}
        <div className="hidden lg:flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-2xl border border-[#E6DCBF] shadow-2xs shrink-0">
          <Globe className="w-4 h-4 text-[#1D3E2F] shrink-0" />
          <div className="flex flex-col">
            <div className="text-[10px] font-extrabold text-[#23211E] flex items-center justify-between gap-2">
              <span>Continent Radar</span>
              <span className="text-emerald-700 font-black">{continentProgress.overallPercent}%</span>
            </div>
            {/* 5-segment African region meter */}
            <div className="flex items-center gap-1">
              {continentProgress.regions.map((reg, rIdx) => (
                <div
                  key={rIdx}
                  className={`w-3.5 h-1.5 rounded-xs transition-all ${
                    reg.percent >= 50
                      ? 'bg-emerald-600'
                      : reg.percent > 0
                      ? 'bg-amber-400'
                      : 'bg-stone-200'
                  }`}
                  title={`${reg.region}: ${reg.percent}%`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Words Chest Gem Counter */}
        <div
          onClick={() => onSelectPillar('MY_BOX')}
          className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-2xl border border-[#E6DCBF] shadow-2xs cursor-pointer hover:bg-[#F0E8D0] transition-colors shrink-0"
          title="Discovered Indigenous Words"
        >
          <span className="text-sm">💎</span>
          <div className="text-[11px] font-extrabold text-[#23211E]">
            <span>{discoveredWordsCount}</span>
            <span className="hidden sm:inline text-[#7C4728] ml-1">Words</span>
          </div>
        </div>

        {/* Family Voice Cast Status Indicator */}
        {hasFamilyVoices && (
          <div className="hidden xl:flex items-center gap-1 bg-emerald-50 px-2.5 py-1.5 rounded-2xl border border-emerald-300 text-[11px] font-black text-emerald-950 shrink-0">
            <Users className="w-3.5 h-3.5 text-emerald-700" />
            <span>Family Voice Cast Active</span>
          </div>
        )}
      </div>

      {/* 3. Right: Control Toggles (Kora Sound FX, Curriculum, Fullscreen & Side Panel Toggle) */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Sound FX Button */}
        <button
          onClick={handleSoundCheck}
          className="p-2 rounded-xl bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#C85A32] shadow-2xs transition-colors"
          title="Play African Kora Harp Chime"
        >
          <Music className="w-4 h-4" />
        </button>

        {/* Voice Narrator Toggle */}
        <button
          onClick={onToggleVoice}
          className={`p-2 rounded-xl border shadow-2xs transition-colors ${
            voiceEnabled
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
              : 'bg-stone-100 text-stone-500 border-stone-300'
          }`}
          title={voiceEnabled ? 'Voice Narrator: Active' : 'Voice Narrator: Muted'}
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Beta Testing & Roadmap Suite */}
        {onOpenDeployment && (
          <button
            id="hud-deployment-btn"
            onClick={onOpenDeployment}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs font-black shadow-2xs transition-colors"
            title="AfroBox Web Beta Testing & Roadmap"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden xl:inline">Beta Version</span>
          </button>
        )}

        {/* Interface Navigation Guide Tour */}
        {onOpenTour && (
          <button
            onClick={onOpenTour}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C85A32] border border-amber-300 text-xs font-extrabold shadow-2xs transition-colors"
            title="How to navigate AfroBox"
          >
            <HelpCircle className="w-4 h-4 text-[#E25822]" />
            <span className="hidden lg:inline">Tour</span>
          </button>
        )}

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#23211E] shadow-2xs transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Companion Side Panel Dock Toggle */}
        <button
          onClick={onToggleSidePanel}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black shadow-2xs transition-all ${
            isSidePanelOpen
              ? 'bg-[#1D3E2F] text-white border-[#1D3E2F]'
              : 'bg-white hover:bg-[#F0E8D0] text-[#23211E] border-[#E6DCBF]'
          }`}
          title={isSidePanelOpen ? 'Collapse Side Panel' : 'Expand Side Companion Panel'}
        >
          {isSidePanelOpen ? (
            <PanelRightClose className="w-4 h-4" />
          ) : (
            <PanelRight className="w-4 h-4 text-[#C85A32]" />
          )}
          <span className="hidden sm:inline">
            {isSidePanelOpen ? 'Hide Panel' : 'Side Panel'}
          </span>
        </button>
      </div>
    </header>
  );
};
