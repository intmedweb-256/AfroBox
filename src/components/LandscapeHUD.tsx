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
  Rocket,
  Sliders,
  Star,
  BarChart3
} from 'lucide-react';
import { PillarId, AgeTier } from '../types/afrobox';
import { gamificationService, LevelInfo } from '../services/gamificationService';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { useSchoolMode } from '../context/SchoolModeContext';
import { profileService } from '../services/profileService';
import { LearnerProfile } from '../types/profile';

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
  onOpenVoiceSettings?: () => void;
  onOpenProfiles?: () => void;
  onOpenMetrics?: () => void;
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
  onOpenDeployment,
  onOpenVoiceSettings,
  onOpenProfiles,
  onOpenMetrics
}) => {
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(gamificationService.getLevelInfo());
  const [continentProgress, setContinentProgress] = useState(gamificationService.getContinentalProgress());
  const [discoveredWordsCount, setDiscoveredWordsCount] = useState<number>(0);
  const [hasFamilyVoices, setHasFamilyVoices] = useState<boolean>(false);
  const [activeProfile, setActiveProfile] = useState<LearnerProfile>(profileService.getActiveProfile());

  const { isSchoolMode, setIsCurriculumOpen, toggleFullscreen } = useSchoolMode();

  useEffect(() => {
    updateStats();
    const unsubscribeGamification = gamificationService.subscribe(() => {
      updateStats();
    });
    const unsubscribeProfile = profileService.subscribe(() => {
      setActiveProfile(profileService.getActiveProfile());
      updateStats();
    });
    return () => {
      unsubscribeGamification();
      unsubscribeProfile();
    };
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

      {/* 2. Center: Sleek Unified Learner & Level Capsule (Zero Horizontal Scroll on all screens) */}
      <div className="flex items-center justify-center shrink-0">
        <button
          onClick={onOpenProfiles}
          className="group flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-amber-50 border border-[#E6DCBF] shadow-2xs hover:shadow-xs transition-all hover:scale-101 cursor-pointer"
          title={`Learner: ${activeProfile.name} • Level ${levelInfo.level} (${levelInfo.title}). Tap to switch profiles, view stars, or backup.`}
        >
          {/* Avatar with cultural color accent */}
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center text-base shadow-2xs shrink-0 ring-1 ring-amber-300"
            style={{ backgroundColor: `${activeProfile.avatarColor}25` }}
          >
            {activeProfile.avatar}
          </div>

          {/* Child Name & Level */}
          <div className="flex flex-col text-left leading-none">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#23211E] tracking-tight">{activeProfile.name}</span>
              <span className="text-[10px] font-black text-[#C85A32] bg-amber-100/90 px-1.5 py-0.5 rounded-md">
                Lvl {levelInfo.level}
              </span>
            </div>
            <span className="text-[9px] font-extrabold text-[#7C4728] mt-0.5 hidden sm:inline">
              {activeProfile.schoolGrade || `Ages ${activeProfile.ageTier}`} • {levelInfo.title}
            </span>
          </div>

          {/* Stars Count Pill */}
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/90 text-[11px] font-black text-amber-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{activeProfile.stars || 100}</span>
          </div>
        </button>
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

        {/* Voice Narrator Tone & Voice Settings */}
        {onOpenVoiceSettings && (
          <button
            onClick={onOpenVoiceSettings}
            className="p-2 rounded-xl border border-[#E6DCBF] bg-[#FBF7EE] hover:bg-[#F0E8D0] text-[#7C4728] shadow-2xs transition-colors"
            title="Choose Narrator Voice, Tone & Reading Pace"
          >
            <Sliders className="w-4 h-4 text-[#C85A32]" />
          </button>
        )}

        {/* Audience & Advertiser Analytics */}
        {onOpenMetrics && (
          <button
            onClick={onOpenMetrics}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-black shadow-2xs transition-colors"
            title="View Audience Engagement, Pillar Traffic & Advertiser Deck"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden xl:inline">Analytics</span>
          </button>
        )}

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
