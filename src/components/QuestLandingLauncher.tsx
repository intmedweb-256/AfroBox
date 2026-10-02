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
  Star,
  Layers,
  ArrowRight
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
  const [selectedRealm, setSelectedRealm] = useState<PillarId>('EXPLORE');

  // Gamification Level info
  const levelInfo: LevelInfo = gamificationService.getLevelInfo();
  const dailyQuests = gamificationService.getDailyQuests();
  const continentProgress = gamificationService.getContinentalProgress();

  const realms: {
    id: PillarId;
    title: string;
    subtitle: string;
    icon: string;
    desc: string;
    badge: string;
    themeColor: string;
    accentColor: string;
    ringColor: string;
  }[] = [
    {
      id: 'EXPLORE',
      title: 'Explore Africa Map',
      subtitle: 'Living Cultural & Wildlife Atlas',
      icon: '🌍',
      desc: 'Interactive map of 54 nations, Great Rift biomes, Serengeti wildlife, and ancient kingdoms.',
      badge: 'Interactive Atlas',
      themeColor: 'from-emerald-800 via-[#1D3E2F] to-emerald-950',
      accentColor: 'text-emerald-300',
      ringColor: 'ring-emerald-600'
    },
    {
      id: 'STORYLANDS',
      title: 'Storylands Folktales',
      subtitle: 'Living Oral Traditions & Morals',
      icon: '📖',
      desc: 'Illustrated African folktales, Anansi adventures, village parables, and family voice recordings.',
      badge: 'Oral Tales',
      themeColor: 'from-[#C85A32] via-[#9B3D1B] to-[#5C210C]',
      accentColor: 'text-amber-200',
      ringColor: 'ring-[#C85A32]'
    },
    {
      id: 'RIDDLE',
      title: 'Riddle & Wisdom Quests',
      subtitle: 'African Metaphors & Wit',
      icon: '🧠',
      desc: 'Ancient folklore riddles, lateral thinking challenges, trickster wit, and cultural wisdom.',
      badge: 'Wit & Lore',
      themeColor: 'from-amber-700 via-orange-800 to-amber-950',
      accentColor: 'text-amber-300',
      ringColor: 'ring-amber-600'
    },
    {
      id: 'BRAIN',
      title: 'Logic & Brain Puzzles',
      subtitle: 'River Crossings & Math Patterns',
      icon: '🧩',
      desc: 'African problem-solving games, strategy boards, river navigation, and pattern reasoning.',
      badge: 'Logic Quest',
      themeColor: 'from-[#2A4D69] via-[#1F3A52] to-[#122333]',
      accentColor: 'text-sky-300',
      ringColor: 'ring-sky-600'
    }
  ];

  const handleLaunch = (realmId: PillarId) => {
    setSelectedRealm(realmId);
    audioEngine.playSoundEffect('kora');
    onLaunchQuest(realmId, {
      ageTier: currentAgeTier,
      soundEnabled: voiceEnabled
    });
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex flex-col justify-between overflow-hidden">
      {/* 1. TOP HEADER: Learner Profile, Level Status & Learning Stage (Zero Scroll) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-[#E6DCBF] shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Left: Active Learner Profile Card with Instant Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xs ring-2 ring-amber-300 shrink-0"
            style={{ backgroundColor: `${activeProfile.avatarColor}25` }}
          >
            {activeProfile.avatar}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-[#23211E] font-['Urbanist']">
                {activeProfile.name}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#C85A32] font-black text-[11px] border border-amber-300">
                Level {levelInfo.level} • {levelInfo.title}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              {/* Compact XP bar */}
              <div className="w-24 sm:w-32 h-2 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E25822] to-[#F4B32A] rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-[#7C4728]">
                {levelInfo.currentXP} XP
              </span>

              {/* Stars Badge */}
              <span className="flex items-center gap-0.5 text-[11px] font-black text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                {activeProfile.stars || 100}
              </span>
            </div>
          </div>

          {onOpenProfiles && (
            <button
              onClick={onOpenProfiles}
              className="ml-1 sm:ml-2 px-2.5 py-1.5 rounded-xl bg-[#FBF7EE] hover:bg-[#F0E8D0] text-[#C85A32] border border-[#E6DCBF] text-xs font-black transition-all hover:scale-102 cursor-pointer shadow-2xs"
              title="Switch child profile or manage learners"
            >
              Switch Profile
            </button>
          )}
        </div>

        {/* Center: Learning Stage (Ages 6-8, 9-10, 11+) */}
        <div className="flex items-center gap-1.5 bg-[#FBF7EE] p-1 rounded-2xl border border-[#E6DCBF]">
          <span className="text-[11px] font-black text-[#7C4728] px-2 hidden md:inline">
            Learning Stage:
          </span>
          {(['6-8', '9-10', '11+'] as AgeTier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => {
                onChangeAgeTier(tier);
                audioEngine.playSoundEffect('collect');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                currentAgeTier === tier
                  ? 'bg-[#C85A32] text-white shadow-2xs scale-102'
                  : 'text-[#7C4728] hover:text-[#23211E] hover:bg-white/60'
              }`}
            >
              {tier === '6-8' ? 'Ages 6-8' : tier === '9-10' ? 'Ages 9-10' : 'Ages 11+'}
            </button>
          ))}
        </div>

        {/* Right: Quick Stats Indicators */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Continent Discovered */}
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-950 px-2.5 py-1 rounded-xl border border-emerald-200 text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{continentProgress.overallPercent}% Explored</span>
          </div>

          {/* Daily Quests */}
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-950 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {dailyQuests.filter((q) => q.completed).length}/{dailyQuests.length} Quests
            </span>
          </div>
        </div>
      </div>

      {/* 2. CENTER STAGE: 4 Streamlined Realm Expedition Portals (Zero-Scroll Grid) */}
      <div className="my-2 sm:my-3 flex-1 flex flex-col justify-center">
        <div className="text-center mb-2">
          <h2 className="text-lg sm:text-2xl font-black text-[#23211E] font-['Urbanist']">
            Select Your Destination Realm
          </h2>
          <p className="text-xs text-[#7C4728] max-w-xl mx-auto">
            Choose where to begin today. All realms adapt to {activeProfile.name}'s level and age tier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {realms.map((realm) => {
            const isSelected = selectedRealm === realm.id;
            return (
              <div
                key={realm.id}
                onClick={() => setSelectedRealm(realm.id)}
                className={`group relative rounded-3xl p-4 sm:p-5 flex flex-col justify-between text-left transition-all duration-300 cursor-pointer border-2 overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br ${realm.themeColor} text-white border-transparent shadow-xl scale-[1.02] ring-4 ${realm.ringColor}`
                    : 'bg-white hover:bg-stone-50 text-[#23211E] border-[#E6DCBF] shadow-xs hover:border-[#C85A32]/40 hover:shadow-md'
                }`}
              >
                {/* Background decorative glow */}
                {isSelected && (
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
                )}

                {/* Top Badge & Realm Icon */}
                <div className="flex items-start justify-between gap-2 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 ${
                      isSelected ? 'bg-white/15' : 'bg-[#FBF7EE] border border-[#E6DCBF]'
                    }`}
                  >
                    {realm.icon}
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-100 text-[#C85A32] border border-amber-200'
                    }`}
                  >
                    {realm.badge}
                  </span>
                </div>

                {/* Realm Title & Description */}
                <div className="my-3 space-y-1 relative z-10">
                  <h3
                    className={`text-base sm:text-lg font-black font-['Urbanist'] leading-tight ${
                      isSelected ? 'text-white' : 'text-[#23211E]'
                    }`}
                  >
                    {realm.title}
                  </h3>
                  <div
                    className={`text-[11px] font-bold ${
                      isSelected ? realm.accentColor : 'text-[#C85A32]'
                    }`}
                  >
                    {realm.subtitle}
                  </div>
                  <p
                    className={`text-xs leading-relaxed line-clamp-3 ${
                      isSelected ? 'text-stone-200' : 'text-[#7C4728]'
                    }`}
                  >
                    {realm.desc}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2 border-t relative z-10 border-white/10 flex items-center justify-between">
                  <span
                    className={`text-xs font-black flex items-center gap-1 ${
                      isSelected ? 'text-amber-300' : 'text-[#C85A32] group-hover:underline'
                    }`}
                  >
                    <span>{isSelected ? 'Ready to Enter' : 'Choose Realm'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunch(realm.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all shadow-xs ${
                      isSelected
                        ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-black'
                        : 'bg-[#1D3E2F] hover:bg-[#152e23] text-white'
                    }`}
                  >
                    Enter →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM EXPEDITION LAUNCH BAR (Zero Scroll) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-[#E6DCBF] shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Audio & Narrator Quick Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleVoice}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${
              voiceEnabled
                ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                : 'bg-stone-100 text-stone-600 border-stone-300'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            <span>{voiceEnabled ? 'Voice Narrator: ON' : 'Voice Narrator: OFF'}</span>
          </button>

          <button
            onClick={() => audioEngine.playSoundEffect('kora')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold transition-all shadow-2xs"
            title="Test African Kora Harp sound"
          >
            <Music className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="hidden sm:inline">Kora Chime</span>
          </button>
        </div>

        {/* Selected Realm confirmation & Big Launch Button */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-[#7C4728]">Selected Expedition:</div>
            <div className="text-xs font-black text-[#23211E]">
              {realms.find((r) => r.id === selectedRealm)?.title} (Ages {currentAgeTier})
            </div>
          </div>

          <button
            onClick={() => handleLaunch(selectedRealm)}
            className="px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#E25822] via-[#C85A32] to-[#D9822B] hover:brightness-110 text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>🚀 Launch Expedition</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
