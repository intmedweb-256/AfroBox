import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Globe,
  Brain,
  Music,
  Users,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Compass,
  Zap,
  Volume2,
  Headphones
} from 'lucide-react';
import { PillarId } from '../types/afrobox';
import { Story } from '../types/story';
import { gamificationService } from '../services/gamificationService';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';
import { BannerAd } from './BannerAd';

interface CompanionSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPillar: PillarId | 'HOME' | 'LAUNCHER';
  selectedStory?: Story | null;
  selectedEntityId?: string | null;
  onSelectStory?: (story: Story) => void;
  onNavigatePillar: (pillar: PillarId | 'HOME') => void;
  onOpenFamilyStudio?: () => void;
}

export const CompanionSidePanel: React.FC<CompanionSidePanelProps> = ({
  isOpen,
  onClose,
  currentPillar,
  selectedStory,
  selectedEntityId,
  onSelectStory,
  onNavigatePillar,
  onOpenFamilyStudio
}) => {
  const [activeTab, setActiveTab] = useState<'CONTEXT' | 'SOUNDS' | 'QUESTS'>('CONTEXT');

  if (!isOpen) return null;

  const dailyQuests = gamificationService.getDailyQuests();
  const continent = gamificationService.getContinentalProgress();
  const familyCast = selectedStory ? storageService.getStoryFamilyCast(selectedStory.id) : null;
  const progress = storageService.getProgress();

  const playInstrument = (inst: string) => {
    audioEngine.playSoundEffect(inst);
  };

  return (
    <aside className="w-80 sm:w-96 h-full bg-[#FBF7EE] border-l border-[#E6DCBF] flex flex-col shadow-xl animate-in slide-in-from-right duration-200 shrink-0 overflow-hidden">
      {/* Header */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-[#E6DCBF] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#C85A32]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-[#23211E] uppercase tracking-wider font-['Urbanist']">
              Companion Panel
            </div>
            <div className="text-[10px] text-[#7C4728] font-semibold">
              {currentPillar === 'EXPLORE'
                ? 'Tactile Map & Heritage Details'
                : currentPillar === 'STORYLANDS'
                ? 'Story Provenance & Voices'
                : currentPillar === 'RIDDLE' || currentPillar === 'BRAIN'
                ? 'Riddle Clues & Multipliers'
                : 'Daily Quests & Quick Tools'}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl hover:bg-[#F0E8D0] text-[#7C4728] transition-colors"
          title="Close Side Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sub-Tab Navigation Bar inside Side Panel */}
      <div className="flex items-center bg-[#F0E8D0] p-1 border-b border-[#E6DCBF] text-xs font-extrabold shrink-0">
        <button
          onClick={() => setActiveTab('CONTEXT')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
            activeTab === 'CONTEXT'
              ? 'bg-[#1D3E2F] text-white shadow-2xs'
              : 'text-[#7C4728] hover:text-[#23211E]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('SOUNDS')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
            activeTab === 'SOUNDS'
              ? 'bg-[#1D3E2F] text-white shadow-2xs'
              : 'text-[#7C4728] hover:text-[#23211E]'
          }`}
        >
          Instruments
        </button>
        <button
          onClick={() => setActiveTab('QUESTS')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
            activeTab === 'QUESTS'
              ? 'bg-[#1D3E2F] text-white shadow-2xs'
              : 'text-[#7C4728] hover:text-[#23211E]'
          }`}
        >
          Quests ({dailyQuests.filter((q) => q.completed).length}/{dailyQuests.length})
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: CONTEXTUAL CONTENT */}
        {activeTab === 'CONTEXT' && (
          <>
            {/* Storylands Mode */}
            {currentPillar === 'STORYLANDS' && selectedStory ? (
              <div className="space-y-3.5">
                {/* Story Provenance Badge */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6DCBF] space-y-2 shadow-2xs">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#C85A32]">
                    Living Folktale Provenance
                  </div>
                  <div className="font-black text-sm text-[#23211E]">{selectedStory.title}</div>
                  <div className="text-xs text-[#7C4728]">
                    📍 {selectedStory.country} • {selectedStory.culturalTradition}
                  </div>
                  <p className="text-xs text-[#23211E] leading-relaxed bg-[#FBF7EE] p-2.5 rounded-xl border border-[#E6DCBF]">
                    {selectedStory.shortDescription}
                  </p>
                </div>

                {/* Family Cast Voice Track Status */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6DCBF] space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#1D3E2F]">
                      Family Voice Track
                    </span>
                    {familyCast && familyCast.sceneRecordings && Object.keys(familyCast.sceneRecordings).length > 0 && (
                      <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold">
                        {Object.keys(familyCast.sceneRecordings).length} Scenes
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#7C4728]">
                    {familyCast && familyCast.sceneRecordings && Object.keys(familyCast.sceneRecordings).length > 0
                      ? 'Your family voice recordings replace the default narrator when playing scenes!'
                      : 'Record yourself as narrator, and have your wife and son voice characters!'}
                  </p>

                  <button
                    onClick={onOpenFamilyStudio}
                    className="w-full py-2 px-3 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Users className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Open Family Voice Studio</span>
                  </button>
                </div>

                {/* Reflection Prompt */}
                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#C85A32]">
                    <Lightbulb className="w-4 h-4" />
                    <span>Think About It Question</span>
                  </div>
                  <p className="text-xs text-[#23211E] font-medium leading-relaxed">
                    "{selectedStory.thinkAboutIt.question}"
                  </p>
                </div>
              </div>
            ) : currentPillar === 'EXPLORE' ? (
              /* Explore Mode */
              <div className="space-y-3.5">
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6DCBF] space-y-2 shadow-2xs">
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Continental Explorer Mode</span>
                  </div>
                  <div className="text-xs text-[#23211E] leading-relaxed">
                    Click any marker on the African continent to inspect landmarks, sacred lakes,
                    river ecosystems, and wildlife reserves right here without page scrolling.
                  </div>
                </div>

                {/* Continental Segments Progress */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6DCBF] space-y-2.5 shadow-2xs">
                  <div className="text-xs font-extrabold text-[#23211E]">5 Regions of Africa:</div>
                  <div className="space-y-2">
                    {continent.regions.map((reg, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#23211E]">{reg.region}</span>
                          <span className="font-black text-[#C85A32]">{reg.percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#C85A32] to-[#F4B32A] rounded-full"
                            style={{ width: `${reg.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Default / Riddle / Hub Mode */
              <div className="space-y-3.5">
                {/* Word Chest highlights */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#E6DCBF] space-y-2 shadow-2xs">
                  <div className="text-xs font-extrabold text-[#23211E] flex items-center justify-between">
                    <span>💎 Word Chest</span>
                    <span className="text-[#C85A32] font-black">
                      {progress.discoveredWords.length} Collected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {progress.discoveredWords.length > 0 ? (
                      progress.discoveredWords.map((word, wIdx) => (
                        <span
                          key={wIdx}
                          className="px-2.5 py-1 rounded-xl bg-amber-50 text-[#C85A32] border border-amber-200 text-xs font-bold"
                        >
                          {word}
                        </span>
                      ))
                    ) : (
                      <div className="text-xs text-[#7C4728]">
                        Click underlined vocabulary words in any story to collect them into your chest!
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Link to Storylands */}
                <button
                  onClick={() => onNavigatePillar('STORYLANDS')}
                  className="w-full p-3 rounded-2xl bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-left flex items-center justify-between shadow-2xs transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-5 h-5 text-[#C85A32]" />
                    <div>
                      <div className="text-xs font-black text-[#23211E]">Storylands Library</div>
                      <div className="text-[11px] text-[#7C4728]">Browse all African tales</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#7C4728]" />
                </button>
              </div>
            )}
          </>
        )}

        {/* TAB 2: AUTHENTIC AFRICAN INSTRUMENTS SOUNDBOARD */}
        {activeTab === 'SOUNDS' && (
          <div className="space-y-3">
            <div className="text-xs font-extrabold text-[#23211E]">
              Tactile Instruments Soundboard
            </div>
            <p className="text-[11px] text-[#7C4728]">
              Tap any instrument to hear authentic acoustic synthesis:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => playInstrument('kora')}
                className="p-3 rounded-2xl bg-white hover:bg-amber-50 border border-[#E6DCBF] text-left space-y-1 shadow-2xs active:scale-95 transition-all"
              >
                <div className="text-2xl">🪕</div>
                <div className="font-extrabold text-xs text-[#23211E]">Kora Harp</div>
                <div className="text-[10px] text-[#7C4728]">West Africa 21-string harp</div>
              </button>

              <button
                onClick={() => playInstrument('mbira')}
                className="p-3 rounded-2xl bg-white hover:bg-amber-50 border border-[#E6DCBF] text-left space-y-1 shadow-2xs active:scale-95 transition-all"
              >
                <div className="text-2xl">🎹</div>
                <div className="font-extrabold text-xs text-[#23211E]">Mbira Thumb Piano</div>
                <div className="text-[10px] text-[#7C4728]">Shona iron-tine chime</div>
              </button>

              <button
                onClick={() => playInstrument('drum')}
                className="p-3 rounded-2xl bg-white hover:bg-amber-50 border border-[#E6DCBF] text-left space-y-1 shadow-2xs active:scale-95 transition-all"
              >
                <div className="text-2xl">🪘</div>
                <div className="font-extrabold text-xs text-[#23211E]">Talking Drum</div>
                <div className="text-[10px] text-[#7C4728]">Pitch-bending drum</div>
              </button>

              <button
                onClick={() => playInstrument('balafon')}
                className="p-3 rounded-2xl bg-white hover:bg-amber-50 border border-[#E6DCBF] text-left space-y-1 shadow-2xs active:scale-95 transition-all"
              >
                <div className="text-2xl">🪵</div>
                <div className="font-extrabold text-xs text-[#23211E]">Balafon Xylophone</div>
                <div className="text-[10px] text-[#7C4728]">Calabash gourd resonator</div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: DAILY QUESTS */}
        {activeTab === 'QUESTS' && (
          <div className="space-y-3">
            <div className="text-xs font-extrabold text-[#23211E]">Today's African Quests</div>
            <p className="text-[11px] text-[#7C4728]">Complete quests to earn bonus XP & level up:</p>

            <div className="space-y-2.5">
              {dailyQuests.map((q) => (
                <div
                  key={q.id}
                  className={`p-3 rounded-2xl border flex items-start gap-2.5 transition-all ${
                    q.completed
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-white border-[#E6DCBF] text-[#23211E]'
                  }`}
                >
                  <span className="text-xl shrink-0">{q.icon}</span>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold leading-tight">{q.title}</span>
                      {q.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="text-[10px] font-black text-[#C85A32] bg-amber-50 px-1.5 py-0.2 rounded-full border border-amber-200 shrink-0">
                          +{q.rewardXP} XP
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Non-intrusive Sponsor Banner slot */}
        <div className="pt-2">
          <BannerAd slot="side_panel" />
        </div>
      </div>
    </aside>
  );
};
