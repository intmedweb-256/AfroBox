import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Brain,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Users,
  ShieldCheck,
  ChevronRight,
  Check,
  Award,
  Zap,
  Globe,
  Sun,
  Flame,
  Star
} from 'lucide-react';
import { AgeTier, PillarId } from '../types/afrobox';
import { gamificationService, LevelInfo } from '../services/gamificationService';
import { audioEngine } from '../services/audioEngine';
import { profileService } from '../services/profileService';

interface QuestLandingLauncherProps {
  onLaunchQuest: (pillar: PillarId, options: { ageTier: AgeTier; soundEnabled: boolean }) => void;
  currentAgeTier: AgeTier;
  onChangeAgeTier: (tier: AgeTier) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  totalDiscoveriesCount: number;
  onOpenProfiles?: () => void;
}

export const QuestLandingLauncher: React.FC<QuestLandingLauncherProps> = ({
  onLaunchQuest,
  currentAgeTier,
  onChangeAgeTier,
  voiceEnabled,
  onToggleVoice,
  totalDiscoveriesCount,
  onOpenProfiles
}) => {
  const activeProfile = profileService.getActiveProfile();
  // Option 1: Explorer Persona / Focus
  const [selectedPersona, setSelectedPersona] = useState<string>('griot');

  // Option 2: Primary Realm destination
  const [selectedRealm, setSelectedRealm] = useState<PillarId>('EXPLORE');

  // Option 3: Sound & Music Ambience
  const [instrumentFx, setInstrumentFx] = useState<boolean>(true);

  // Gamification Level info
  const levelInfo: LevelInfo = gamificationService.getLevelInfo();
  const dailyQuests = gamificationService.getDailyQuests();
  const continentProgress = gamificationService.getContinentalProgress();

  const personas = [
    {
      id: 'scout',
      name: 'Savanna Wildlife Scout',
      emoji: '🦁',
      recommendedRealm: 'EXPLORE' as PillarId,
      tagline: 'Spot Great Rift animals, rivers, lakes & baobab trees',
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 'griot',
      name: 'Village Griot Storyteller',
      emoji: '🪘',
      recommendedRealm: 'STORYLANDS' as PillarId,
      tagline: 'Oral traditions, living wisdom & record family voices',
      color: 'from-[#C85A32] to-[#7C4728]'
    },
    {
      id: 'riddle_master',
      name: 'Trickster Riddle Master',
      emoji: '🧠',
      recommendedRealm: 'RIDDLE' as PillarId,
      tagline: 'Crack ancient African riddles, logic & river crossings',
      color: 'from-orange-600 to-orange-800'
    },
    {
      id: 'cartographer',
      name: 'Continental Explorer',
      emoji: '🌍',
      recommendedRealm: 'EXPLORE' as PillarId,
      tagline: '54 nations, biomes, kingdoms & cultural heritage',
      color: 'from-emerald-700 to-emerald-900'
    }
  ];

  const realms: { id: PillarId; title: string; icon: string; desc: string }[] = [
    {
      id: 'EXPLORE',
      title: 'Explore Africa Map',
      icon: '🌍',
      desc: 'Tactile interactive map of biomes, mountains, rivers & landmarks'
    },
    {
      id: 'STORYLANDS',
      title: 'Storylands Folktales',
      icon: '📖',
      desc: 'Authentic illustrated stories, family voice casts & moral reflections'
    },
    {
      id: 'RIDDLE',
      title: 'Riddle & Brain Quests',
      icon: '🧠',
      desc: 'African oral riddles, logic games & thinking challenges'
    },
    {
      id: 'BRAIN',
      title: 'Logic & Puzzles',
      icon: '🧩',
      desc: 'River crossings, math patterns & visual problem solving'
    }
  ];

  const handleSelectPersona = (pId: string, realm: PillarId) => {
    setSelectedPersona(pId);
    setSelectedRealm(realm);
    audioEngine.playSoundEffect('collect');
  };

  const handleStartMission = () => {
    audioEngine.playSoundEffect('kora');
    onLaunchQuest(selectedRealm, {
      ageTier: currentAgeTier,
      soundEnabled: voiceEnabled
    });
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-col justify-between overflow-y-auto">
      {/* Top Gamification Bar & Status Badge */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#E6DCBF] shadow-xs flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Left: Player Persona & Level Meter */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E25822] to-[#C85A32] text-white flex items-center justify-center text-2xl shadow-md shrink-0">
            {levelInfo.badgeEmoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-[#C85A32] tracking-wider">
                Level {levelInfo.level}
              </span>
              <span className="text-xs font-black text-[#23211E]">• {levelInfo.title}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-32 sm:w-48 h-2.5 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E25822] to-[#F4B32A] rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-extrabold text-[#7C4728]">
                {levelInfo.currentXP} XP
              </span>
            </div>
          </div>
        </div>

        {/* Center: Continental Exploration Meter */}
        <div className="hidden lg:flex items-center gap-3 bg-[#FBF7EE] px-4 py-2 rounded-2xl border border-[#E6DCBF]">
          <Globe className="w-5 h-5 text-[#1D3E2F]" />
          <div>
            <div className="text-[11px] font-bold text-[#7C4728]">Continental Exploration</div>
            <div className="text-xs font-black text-[#1D3E2F]">
              {continentProgress.overallPercent}% of Africa Discovered
            </div>
          </div>
        </div>

        {/* Active Learner Profile Badge */}
        {onOpenProfiles && (
          <div className="flex items-center gap-2 bg-[#FBF7EE] pl-2 pr-3 py-1.5 rounded-2xl border border-[#E6DCBF] shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-lg shadow-2xs"
              style={{ backgroundColor: `${activeProfile.avatarColor}20` }}
            >
              {activeProfile.avatar}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-[#23211E]">{activeProfile.name}</span>
              <span className="text-[10px] font-bold text-[#7C4728]">
                {activeProfile.schoolGrade || `Ages ${activeProfile.ageTier}`}
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenProfiles}
              className="ml-2 text-xs font-black text-[#C85A32] hover:text-[#b04a25] underline decoration-amber-300 cursor-pointer"
            >
              Switch
            </button>
          </div>
        )}

        {/* Right: Daily Quest status pill */}
        <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-2xl border border-amber-200">
          <Zap className="w-4 h-4 text-[#E25822]" />
          <div className="text-xs font-bold text-[#23211E]">
            <span className="text-[#C85A32] font-black">
              {dailyQuests.filter((q) => q.completed).length} / {dailyQuests.length}
            </span>{' '}
            Daily Quests Ready
          </div>
        </div>
      </div>

      {/* Main Mission Setup Stage: Landscape Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
        {/* Step 1: Persona / Quest Role (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#E6DCBF] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-[#C85A32] tracking-wider">
              Step 1: Choose Role
            </span>
            <span className="text-[11px] font-bold text-[#7C4728]">Select Persona</span>
          </div>

          <div className="space-y-2">
            {personas.map((p) => {
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPersona(p.id, p.recommendedRealm)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    isSelected
                      ? 'bg-[#1D3E2F] text-white border-[#1D3E2F] shadow-sm scale-[1.01]'
                      : 'bg-[#FBF7EE] hover:bg-[#F0E8D0] text-[#23211E] border-[#E6DCBF]'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1 rounded-xl bg-black/10">{p.emoji}</span>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="font-black text-sm">{p.name}</div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-300 shrink-0" />}
                    </div>
                    <div
                      className={`text-xs mt-0.5 leading-snug ${
                        isSelected ? 'text-emerald-100' : 'text-[#7C4728]'
                      }`}
                    >
                      {p.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Age Tier Selector Bar */}
          <div className="pt-3 border-t border-[#E6DCBF] space-y-1.5">
            <div className="text-xs font-extrabold text-[#23211E]">Target Learning Stage:</div>
            <div className="grid grid-cols-3 gap-1.5 bg-[#FBF7EE] p-1 rounded-2xl border border-[#E6DCBF]">
              {(['6-8', '9-10', '11+'] as AgeTier[]).map((tier) => (
                <button
                  key={tier}
                  onClick={() => onChangeAgeTier(tier)}
                  className={`py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    currentAgeTier === tier
                      ? 'bg-[#C85A32] text-white shadow-2xs'
                      : 'text-[#7C4728] hover:text-[#23211E]'
                  }`}
                >
                  {tier === '6-8' ? 'Ages 6-8' : tier === '9-10' ? 'Ages 9-10' : 'Ages 11+'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Destination Realm & Atmosphere (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#E6DCBF] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-[#C85A32] tracking-wider">
              Step 2: Choose Destination
            </span>
            <span className="text-[11px] font-bold text-[#7C4728]">Primary Realm</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {realms.map((realm) => {
              const isSelected = selectedRealm === realm.id;
              return (
                <button
                  key={realm.id}
                  onClick={() => {
                    setSelectedRealm(realm.id);
                    audioEngine.playSoundEffect('collect');
                  }}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-[#C85A32] shadow-xs ring-2 ring-[#C85A32]/30'
                      : 'bg-[#FBF7EE] hover:bg-[#F0E8D0] border-[#E6DCBF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{realm.icon}</span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-[#C85A32] text-white text-[10px] font-black">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-[#23211E]">{realm.title}</div>
                    <div className="text-[11px] text-[#7C4728] leading-tight mt-0.5">
                      {realm.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Audio Ambience & Sound Preferences */}
          <div className="pt-3 border-t border-[#E6DCBF] space-y-2">
            <div className="text-xs font-extrabold text-[#23211E]">Sound & Narrator Settings:</div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onToggleVoice}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  voiceEnabled
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                    : 'bg-stone-100 text-stone-600 border-stone-300'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{voiceEnabled ? 'Voice Narrator: ON' : 'Voice Narrator: OFF'}</span>
              </button>

              <button
                onClick={() => {
                  setInstrumentFx(!instrumentFx);
                  audioEngine.playSoundEffect('mbira');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  instrumentFx
                    ? 'bg-amber-100 text-amber-950 border-amber-300'
                    : 'bg-stone-100 text-stone-600 border-stone-300'
                }`}
              >
                <Music className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>{instrumentFx ? 'African Instruments: ON' : 'African Instruments: OFF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Launch Mission Card (3 cols) */}
        <div className="lg:col-span-3 bg-gradient-to-br from-[#1D3E2F] via-[#152e23] to-[#0d1f17] text-white rounded-3xl p-5 border-2 border-emerald-900 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Mission Summary</span>
            </div>
            <h3 className="text-xl font-black font-['Urbanist'] mt-1">Ready to Explore</h3>
            <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
              Experience Africa through landscape design, side panel guides, zero-scroll navigation, and authentic multi-voice retellings.
            </p>

            {/* Quick Checklist */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-100 bg-white/10 px-3 py-1.5 rounded-xl">
                <span>Selected Realm:</span>
                <span className="font-extrabold text-white">{selectedRealm}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-100 bg-white/10 px-3 py-1.5 rounded-xl">
                <span>Learner Tier:</span>
                <span className="font-extrabold text-white">Ages {currentAgeTier}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-100 bg-white/10 px-3 py-1.5 rounded-xl">
                <span>Side Panel Companion:</span>
                <span className="font-extrabold text-emerald-300">Docked (Zero-Scroll)</span>
              </div>
            </div>
          </div>

          {/* Giant Launch Button */}
          <button
            onClick={handleStartMission}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E25822] via-[#C85A32] to-[#D9822B] hover:brightness-110 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <span>🚀 Launch Your Quest</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
