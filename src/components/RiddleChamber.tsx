import React, { useState } from 'react';
import {
  HelpCircle,
  Volume2,
  Sparkles,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  Award,
  PackageOpen,
  RotateCcw
} from 'lucide-react';
import { AgeTier, PillarId, RiddleEntity } from '../types/afrobox';
import { AFROBOX_RIDDLES } from '../data/riddles';
import { afroboxStorage } from '../services/afroboxStorage';
import { analyticsService } from '../services/analyticsService';

interface RiddleChamberProps {
  onNavigatePillar: (pillar: PillarId, contextId?: string) => void;
  onPlayVoice: (text: string) => void;
  ageTier: AgeTier;
}

export const RiddleChamber: React.FC<RiddleChamberProps> = ({
  onNavigatePillar,
  onPlayVoice,
  ageTier
}) => {
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [revealedClues, setRevealedClues] = useState<number>(1);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);

  const riddle = AFROBOX_RIDDLES[currentRiddleIndex] || AFROBOX_RIDDLES[0];
  const myBoxState = afroboxStorage.getMyBoxState();
  const isSolved = myBoxState.solvedRiddleIds.includes(riddle.id);

  const handleReadRiddle = () => {
    onPlayVoice(`${riddle.title}. ${riddle.riddleText}`);
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === riddle.correctAnswerIndex;
    analyticsService.trackRiddleAttempt(
      riddle.id,
      riddle.title,
      isCorrect,
      riddle.options[idx] || String(idx),
      1,
      revealedClues > 1
    );

    if (isCorrect) {
      afroboxStorage.recordSolvedRiddle(riddle.id);
      analyticsService.trackRiddleSolved(riddle.id, riddle.title, 1, revealedClues > 1);
      setCelebrationMessage(`🎉 Splendid! You solved "${riddle.title}" and earned the "${riddle.rewardBadge}" sticker!`);
      onPlayVoice(`Correct! ${riddle.explanation}`);
    } else {
      onPlayVoice("Good try! Read the clues carefully or reveal another clue.");
    }
  };

  const handleNextRiddle = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setRevealedClues(1);
    setCelebrationMessage(null);
    setCurrentRiddleIndex((prev) => (prev + 1) % AFROBOX_RIDDLES.length);
  };

  const handleRevealNextClue = () => {
    if (revealedClues < riddle.clues.length) {
      setRevealedClues((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DCBF] pb-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-[#D9822B] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Pillar 3: Mysteries, Clues & African Riddles</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#23211E] font-['Urbanist'] mt-1">
            The Riddle Chamber
          </h1>
          <p className="text-xs sm:text-sm text-[#7C4728] mt-0.5">
            Can you guess the creature, tree, mountain, or ancient hero from the clues?
          </p>
        </div>

        {/* Riddle Progress Tracker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#7C4728]">
            Riddle {currentRiddleIndex + 1} of {AFROBOX_RIDDLES.length}
          </span>
          <div className="flex gap-1">
            {AFROBOX_RIDDLES.map((r, i) => (
              <span
                key={r.id}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentRiddleIndex
                    ? 'bg-[#D9822B]'
                    : myBoxState.solvedRiddleIds.includes(r.id)
                    ? 'bg-emerald-500'
                    : 'bg-[#E6DCBF]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Riddle Card (Savannah Cream Surface + Ochre Accents) */}
      <div className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-md p-6 sm:p-10 space-y-7">
        {/* Riddle Title + Audio Listen Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DCBF]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#D9822B]/20 text-[#D9822B]">
                {riddle.region}
              </span>
              <span className="text-xs font-semibold text-[#7C4728]">
                Ages {riddle.ageTier}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23211E] font-['Urbanist'] mt-2">
              {riddle.title}
            </h2>
          </div>

          <button
            id="read-riddle-audio-btn"
            onClick={handleReadRiddle}
            className="p-3 rounded-2xl bg-[#E6DCBF] hover:bg-[#D9822B] hover:text-white text-[#23211E] transition-colors shadow-xs flex items-center gap-2 shrink-0"
            title="Read Riddle Aloud"
          >
            <Volume2 className="w-5 h-5" />
            <span className="text-xs font-bold hidden sm:inline">Listen</span>
          </button>
        </div>

        {/* Riddle Text (Large, friendly, poetic typography) */}
        <div className="bg-white/90 rounded-2xl p-6 border border-[#E6DCBF] text-base sm:text-xl font-medium text-[#23211E] leading-relaxed italic">
          "{riddle.riddleText}"
        </div>

        {/* Progressive Clue Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728] flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-[#E25822]" />
              <span>Clues ({revealedClues} of {riddle.clues.length} revealed)</span>
            </span>

            {revealedClues < riddle.clues.length && (
              <button
                id="reveal-clue-btn"
                onClick={handleRevealNextClue}
                className="text-xs font-bold text-[#D9822B] hover:text-[#B84B24] underline underline-offset-4"
              >
                Reveal Next Clue
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {riddle.clues.slice(0, revealedClues).map((clue, cIdx) => (
              <div
                key={cIdx}
                className="p-3.5 rounded-xl bg-[#F0E8D0] border border-[#E0D4B2] text-xs font-medium text-[#23211E] leading-relaxed animate-in fade-in"
              >
                <div className="font-bold text-[#7C4728] mb-0.5">Clue {cIdx + 1}</div>
                {clue}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Guess Options (Section 2: See + Interact) */}
        <div className="space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
            Can you guess who or what I am?
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {riddle.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === riddle.correctAnswerIndex;
              let btnStyle =
                'bg-white hover:bg-[#F0E8D0] border-[#E6DCBF] text-[#23211E]';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                }
              }

              return (
                <button
                  key={idx}
                  id={`riddle-option-${idx}`}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all flex items-center justify-between shadow-2xs ${btnStyle}`}
                >
                  <span>{option}</span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result & Educational Explanation */}
        {hasAnswered && (
          <div className="space-y-4 pt-2 animate-in fade-in">
            {celebrationMessage && (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{celebrationMessage}</span>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-[#F0E8D0] border border-[#E0D4B2] text-xs sm:text-sm text-[#23211E] leading-relaxed">
              <div className="font-bold text-[#7C4728] mb-1">Curious Insight:</div>
              {riddle.explanation}
            </div>

            {/* Next Riddle Button */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-3">
              <button
                onClick={handleNextRiddle}
                className="py-3 px-6 rounded-2xl bg-[#D9822B] hover:bg-[#C85A32] text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Next African Riddle</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Connected Ecosystem Bridges (Section 8) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigatePillar('EXPLORE')}
                  className="py-2.5 px-4 rounded-xl bg-white border border-[#E6DCBF] text-xs font-bold text-[#1D3E2F] hover:bg-[#F0E8D0] transition-colors"
                >
                  🌍 Find in Explore Africa
                </button>

                <button
                  onClick={() => onNavigatePillar('STORYLANDS')}
                  className="py-2.5 px-4 rounded-xl bg-white border border-[#E6DCBF] text-xs font-bold text-[#C85A32] hover:bg-[#F0E8D0] transition-colors"
                >
                  📖 Read Related Story
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
