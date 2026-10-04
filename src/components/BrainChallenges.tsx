import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  RotateCcw,
  Volume2,
  ChevronRight,
  Check
} from 'lucide-react';
import { AgeTier, BrainPuzzleEntity, PillarId } from '../types/afrobox';
import { AFROBOX_BRAIN_PUZZLES } from '../data/brainPuzzles';
import { afroboxStorage } from '../services/afroboxStorage';
import { analyticsService } from '../services/analyticsService';

interface BrainChallengesProps {
  onNavigatePillar: (pillar: PillarId) => void;
  onPlayVoice: (text: string) => void;
  ageTier: AgeTier;
}

export const BrainChallenges: React.FC<BrainChallengesProps> = ({
  onNavigatePillar,
  onPlayVoice,
  ageTier
}) => {
  const [activePuzzleIndex, setActivePuzzleIndex] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const puzzle: BrainPuzzleEntity =
    AFROBOX_BRAIN_PUZZLES[activePuzzleIndex] || AFROBOX_BRAIN_PUZZLES[0];
  const items = puzzle.payload.items || [];
  const targets = puzzle.payload.targets || [];

  const handleSelectItem = (id: string) => {
    if (isCompleted || matchedPairs[id]) return;
    setSelectedItemId(id);
  };

  const handleSelectTarget = (targetId: string) => {
    if (!selectedItemId || isCompleted) return;

    // Check if item's matchId corresponds to this targetId
    const item = items.find((it) => it.id === selectedItemId);
    if (item && item.matchId === targetId) {
      const newMatches = { ...matchedPairs, [item.id]: targetId };
      setMatchedPairs(newMatches);
      setSelectedItemId(null);

      // Check if all items are matched
      if (Object.keys(newMatches).length === items.length) {
        setIsCompleted(true);
        afroboxStorage.recordSolvedBrainPuzzle(puzzle.id);
        analyticsService.trackPuzzleCompleted(puzzle.id, puzzle.title, puzzle.type);
        onPlayVoice(`Splendid work! You solved ${puzzle.title}!`);
      } else {
        onPlayVoice(`Match found! ${item.label}`);
      }
    } else {
      // Wrong match
      onPlayVoice('Not quite this one. Try matching with another item!');
      setSelectedItemId(null);
    }
  };

  const handleResetPuzzle = () => {
    setSelectedItemId(null);
    setMatchedPairs({});
    setIsCompleted(false);
  };

  const handleNextPuzzle = () => {
    handleResetPuzzle();
    setActivePuzzleIndex((prev) => (prev + 1) % AFROBOX_BRAIN_PUZZLES.length);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DCBF] pb-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-[#2A729A] flex items-center gap-1.5">
            <Brain className="w-4 h-4" />
            <span>Pillar 4: African Geography, Languages & Logic</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#23211E] font-['Urbanist'] mt-1">
            Brain Challenges
          </h1>
          <p className="text-xs sm:text-sm text-[#7C4728] mt-0.5">
            Solve interactive matching puzzles that weave together places, words, and ecosystems.
          </p>
        </div>

        {/* Puzzle Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F0E8D0] p-1.5 rounded-2xl border border-[#E0D4B2] max-w-full">
          {AFROBOX_BRAIN_PUZZLES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                handleResetPuzzle();
                setActivePuzzleIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePuzzleIndex === idx
                  ? 'bg-[#2A729A] text-white shadow-xs'
                  : 'text-[#23211E] hover:text-[#2A729A] hover:bg-white/60'
              }`}
            >
              Challenge {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Challenge Board */}
      <div className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-md p-6 sm:p-10 space-y-8">
        {/* Title, Instructions & Voice Guidance */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DCBF]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#2A729A]/15 text-[#2A729A]">
                {puzzle.region}
              </span>
              <span className="text-xs font-semibold text-[#7C4728]">
                Ages {puzzle.ageTier}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#23211E] font-['Urbanist'] mt-2">
              {puzzle.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#7C4728] font-medium mt-1">
              {puzzle.instruction}
            </p>
          </div>

          <button
            onClick={() => onPlayVoice(`${puzzle.title}. ${puzzle.instruction}`)}
            className="p-3 rounded-2xl bg-[#E6DCBF] hover:bg-[#2A729A] hover:text-white text-[#23211E] transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
            title="Hear Challenge Instructions"
          >
            <Volume2 className="w-5 h-5" />
            <span className="text-xs font-bold hidden sm:inline">Hear</span>
          </button>
        </div>

        {/* Dual Interactive Matching Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Items */}
          <div className="space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728] flex items-center justify-between">
              <span>1. Tap an item</span>
              {selectedItemId && (
                <span className="text-xs font-bold text-[#E25822]">Selected! Now tap its match →</span>
              )}
            </div>

            <div className="space-y-2.5">
              {items.map((item) => {
                const isMatched = !!matchedPairs[item.id];
                const isSelected = selectedItemId === item.id;

                let cardStyle =
                  'bg-white hover:bg-[#F0E8D0] border-[#E6DCBF] text-[#23211E]';
                if (isMatched) {
                  cardStyle =
                    'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold opacity-90 cursor-default';
                } else if (isSelected) {
                  cardStyle =
                    'bg-[#2A729A] border-[#2A729A] text-white shadow-md -translate-y-0.5';
                }

                return (
                  <button
                    key={item.id}
                    id={`match-item-${item.id}`}
                    onClick={() => handleSelectItem(item.id)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between shadow-2xs ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon || '📍'}</span>
                      <span className="text-sm font-bold">{item.label}</span>
                    </div>

                    {isMatched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : isSelected ? (
                      <span className="text-xs font-extrabold bg-white/30 px-2 py-0.5 rounded-md">
                        Ready
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Targets */}
          <div className="space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
              2. Tap the matching partner
            </div>

            <div className="space-y-2.5">
              {targets.map((target) => {
                // Check if any item matched with this target
                const isMatched = Object.values(matchedPairs).includes(target.id);

                return (
                  <button
                    key={target.id}
                    id={`match-target-${target.id}`}
                    onClick={() => handleSelectTarget(target.id)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between shadow-2xs ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold opacity-90 cursor-default'
                        : selectedItemId
                        ? 'bg-white hover:bg-sky-50 border-[#2A729A]/50 hover:border-[#2A729A] text-[#23211E]'
                        : 'bg-white/80 border-[#E6DCBF] text-[#23211E]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{target.icon || '🎯'}</span>
                      <span className="text-sm font-medium">{target.label}</span>
                    </div>

                    {isMatched && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Completion Celebration Panel */}
        {isCompleted && (
          <div className="pt-6 border-t border-[#E6DCBF] space-y-4 animate-in fade-in">
            <div className="p-5 rounded-3xl bg-emerald-100 border-2 border-emerald-400 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2.5 font-extrabold text-base sm:text-lg">
                <Award className="w-6 h-6 text-emerald-700" />
                <span>Brilliant Brain Power! Challenge Solved!</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                {puzzle.payload.explanation}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleResetPuzzle}
                className="py-3 px-5 rounded-2xl bg-white border border-[#E6DCBF] text-xs font-bold text-[#7C4728] hover:bg-[#F0E8D0] flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>

              <button
                onClick={handleNextPuzzle}
                className="py-3 px-6 rounded-2xl bg-[#2A729A] hover:bg-[#1D3E2F] text-white font-bold text-sm shadow-xs flex items-center gap-2"
              >
                <span>Next Brain Challenge</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Loop to other worlds */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigatePillar('EXPLORE')}
                  className="py-2.5 px-4 rounded-xl bg-white border border-[#E6DCBF] text-xs font-bold text-[#1D3E2F] hover:bg-[#F0E8D0]"
                >
                  🌍 Explore Africa
                </button>
                <button
                  onClick={() => onNavigatePillar('MY_BOX')}
                  className="py-2.5 px-4 rounded-xl bg-[#D9822B] text-white text-xs font-bold shadow-xs hover:bg-[#C85A32]"
                >
                  🎁 View in My Box
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
