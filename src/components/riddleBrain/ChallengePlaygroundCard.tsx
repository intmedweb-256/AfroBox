import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Volume2,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Compass,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Challenge } from '../../types/riddleBrain';
import { PillarId } from '../../types/afrobox';
import { riddleBrainService } from '../../services/riddleBrainService';
import { RiverCrossingSimulator } from './RiverCrossingSimulator';
import { CulturalProvenanceInspector } from './CulturalProvenanceInspector';

interface ChallengePlaygroundCardProps {
  challenge: Challenge;
  onNavigatePillar: (pillar: PillarId, contextId?: string) => void;
  onPlayVoice?: (text: string) => void;
  onChallengeCompleted?: (challengeId: string) => void;
}

export const ChallengePlaygroundCard: React.FC<ChallengePlaygroundCardProps> = ({
  challenge,
  onNavigatePillar,
  onPlayVoice,
  onChallengeCompleted
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [revealedCluesCount, setRevealedCluesCount] = useState<number>(0);
  const [showSolutionSteps, setShowSolutionSteps] = useState<boolean>(false);
  const [showProvenanceModal, setShowProvenanceModal] = useState<boolean>(false);
  const [callResponseState, setCallResponseState] = useState<'IDLE' | 'CALL_PLAYED' | 'ACCEPTED'>('IDLE');

  const isSolved = riddleBrainService.isSolved(challenge.id);
  const repMeta = riddleBrainService.getRepresentationMeta(challenge.representationMode);

  // Reset local state when challenge changes
  useEffect(() => {
    setSelectedOptionIndex(null);
    setHasAnswered(false);
    setRevealedCluesCount(0);
    setShowSolutionSteps(false);
    setCallResponseState('IDLE');
  }, [challenge.id]);

  const handleHearQuestion = () => {
    onPlayVoice?.(`${challenge.title}. ${challenge.question}`);
  };

  const handleCallAndResponse = () => {
    if (challenge.traditionalContext?.openingFormula) {
      onPlayVoice?.(challenge.traditionalContext.openingFormula);
      setCallResponseState('CALL_PLAYED');
    }
  };

  const handleAcceptResponse = () => {
    if (challenge.traditionalContext?.responseFormula) {
      onPlayVoice?.(challenge.traditionalContext.responseFormula);
      setCallResponseState('ACCEPTED');
    }
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIndex(idx);
    setHasAnswered(true);

    if (idx === challenge.correctAnswerIndex) {
      riddleBrainService.recordSolvedChallenge(challenge.id, revealedCluesCount);
      onChallengeCompleted?.(challenge.id);
      onPlayVoice?.(`Correct! Splendid deduction. ${challenge.explanation}`);
    } else {
      onPlayVoice?.('Good try! Observe carefully or reveal a starlight hint!');
    }
  };

  const handleSimulatorSuccess = () => {
    if (!hasAnswered) {
      setSelectedOptionIndex(challenge.correctAnswerIndex);
      setHasAnswered(true);
      riddleBrainService.recordSolvedChallenge(challenge.id, 0);
      onChallengeCompleted?.(challenge.id);
    }
  };

  const handleResetChallenge = () => {
    setSelectedOptionIndex(null);
    setHasAnswered(false);
    setRevealedCluesCount(0);
    setShowSolutionSteps(false);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-[#E6DCBF] shadow-lg overflow-hidden space-y-6">
      {/* Top Banner: Category, Provenance Badge, & Actions */}
      <div className="bg-[#F0E8D0] px-3.5 sm:px-6 py-3 sm:py-4 border-b border-[#E0D4B2] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Challenge Type Badge */}
          <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wide uppercase bg-[#7C4728] text-white shadow-xs">
            {challenge.type.replace('_', ' ')}
          </span>

          {/* Honest Representation Mode Badge */}
          <button
            onClick={() => setShowProvenanceModal(true)}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border transition-colors hover:scale-105 touch-manipulation ${repMeta.colorClass}`}
            title="Click to view cultural provenance & rights"
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate max-w-[150px] sm:max-w-none">{repMeta.badgeLabel}</span>
          </button>

          {/* Age Tier */}
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-white text-[#5C4033] border border-[#E0D4B2]">
            Ages {challenge.ageTier}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {isSolved && (
            <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Solved</span>
            </span>
          )}

          <button
            onClick={handleHearQuestion}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white text-[#7C4728] border border-[#E0D4B2] hover:bg-[#FAF3E0] text-[11px] sm:text-xs font-bold transition-colors shadow-xs touch-manipulation"
            title="Listen to challenge read aloud"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#E25822]" />
            <span>Read</span>
          </button>

          <button
            onClick={() => setShowProvenanceModal(true)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white text-[#1D3E2F] border border-[#E0D4B2] hover:bg-[#FAF3E0] text-[11px] sm:text-xs font-bold transition-colors shadow-xs touch-manipulation"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#1D3E2F]" />
            <span>Provenance</span>
          </button>
        </div>
      </div>

      <div className="px-3.5 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Title & Regional Origin */}
        <div>
          <div className="text-[11px] sm:text-xs font-bold text-[#C85A32] flex flex-wrap items-center gap-1.5 uppercase tracking-wider mb-1">
            <span>📍 {challenge.country}</span>
            <span>•</span>
            <span>{challenge.community}</span>
            <span>•</span>
            <span>{challenge.language}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#23211E] font-['Urbanist'] tracking-tight">
            {challenge.title}
          </h2>
        </div>

        {/* Traditional Call-and-Response Chant Box (if present) */}
        {challenge.traditionalContext && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF3E0] border border-[#E6DCBF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#7C4728] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
                <span>Oral Tradition Opening Formula</span>
              </span>
              <p className="text-xs text-[#5C4033]">
                {challenge.traditionalContext.performanceSetting ||
                  'Traditional evening call-and-response chant'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                onClick={handleCallAndResponse}
                className="px-3 py-2 min-h-[40px] rounded-xl bg-white border border-[#D8C7A3] text-xs font-bold text-[#E25822] hover:bg-[#F0E8D0] active:scale-95 transition-all shadow-xs touch-manipulation text-center"
              >
                📣 "{challenge.traditionalContext.openingFormula}"
              </button>

              <button
                onClick={handleAcceptResponse}
                className={`px-3 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-all shadow-xs touch-manipulation text-center ${
                  callResponseState === 'CALL_PLAYED'
                    ? 'bg-[#1D3E2F] text-white animate-pulse'
                    : 'bg-white border border-[#D8C7A3] text-[#1D3E2F] hover:bg-[#F0E8D0]'
                }`}
              >
                🤝 Reply: "{challenge.traditionalContext.responseFormula}"
              </button>
            </div>
          </div>
        )}

        {/* Question Body */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#FBF7EE] border border-[#E6DCBF] text-[#23211E] text-base sm:text-lg font-medium leading-relaxed whitespace-pre-line shadow-xs">
          {challenge.question}
        </div>

        {/* Specialized Interactive Tool: River Crossing Simulator */}
        {challenge.interactivePayload?.kind === 'RIVER_CROSSING' && (
          <RiverCrossingSimulator
            onSuccess={handleSimulatorSuccess}
            onPlayVoice={onPlayVoice}
          />
        )}

        {/* Answer Options Grid */}
        <div className="space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728] flex items-center justify-between">
            <span>Choose Your Solution:</span>
            {hasAnswered && (
              <button
                onClick={handleResetChallenge}
                className="flex items-center gap-1 text-[11px] font-bold text-[#C85A32] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Try again</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {challenge.answerOptions.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === challenge.correctAnswerIndex;

              let btnStyle = 'bg-white border-[#E6DCBF] text-[#23211E] hover:border-[#E25822] hover:bg-[#FAF3E0]';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-red-50 border-red-400 text-red-950';
                } else {
                  btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`p-4 rounded-2xl border-2 text-left text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#E0D4B2]/60 text-[#7C4728] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{option}</span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback / Explanation Box */}
        {hasAnswered && (
          <div
            className={`p-5 rounded-3xl border-2 animate-in fade-in space-y-3 ${
              selectedOptionIndex === challenge.correctAnswerIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2">
              {selectedOptionIndex === challenge.correctAnswerIndex ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span className="text-base font-extrabold">
                    Brilliant Deduction! You solved it!
                  </span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                  <span className="text-base font-extrabold">
                    A valuable learning moment! Read the wisdom below:
                  </span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed text-[#23211E]">
              {challenge.explanation}
            </p>

            {/* Toggle Solution Steps */}
            <div className="pt-2 border-t border-black/10 flex items-center justify-between">
              <button
                onClick={() => setShowSolutionSteps(!showSolutionSteps)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#7C4728] hover:text-[#23211E]"
              >
                <span>How a Thinker Solves This Step-by-Step</span>
                {showSolutionSteps ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {showSolutionSteps && (
              <div className="p-4 rounded-2xl bg-white/80 border border-black/10 space-y-2 text-xs text-[#23211E] animate-in fade-in">
                <div className="font-extrabold uppercase tracking-wider text-[#7C4728] text-[11px]">
                  Logical Deduction Trail:
                </div>
                <ol className="space-y-1.5 list-decimal list-inside leading-relaxed">
                  {challenge.solutionSteps.map((step, sIdx) => (
                    <li key={sIdx} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Starlight Clues & Hints */}
        {!hasAnswered && (
          <div className="p-4 rounded-2xl bg-[#FBF7EE] border border-[#E6DCBF] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#D9822B]" />
              <span className="text-xs font-extrabold text-[#7C4728] uppercase tracking-wide">
                Need a thinking clue?
              </span>
            </div>
            {revealedCluesCount === 0 ? (
              <button
                onClick={() => {
                  setRevealedCluesCount(1);
                  onPlayVoice?.(challenge.hint);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D8C7A3] text-xs font-bold text-[#E25822] hover:bg-[#FAF3E0] transition-colors shadow-xs"
              >
                ✨ Reveal Starlight Hint
              </button>
            ) : (
              <p className="text-xs text-[#5C4033] font-medium bg-white px-3 py-1.5 rounded-xl border border-[#D8C7A3]">
                💡 {challenge.hint}
              </p>
            )}
          </div>
        )}

        {/* Ecosystem Connections: Explore Africa & Storylands */}
        {challenge.connectedWorldLinks && (
          <div className="pt-2 border-t border-[#E6DCBF] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-extrabold text-[#7C4728] uppercase tracking-wider">
              Connected AfroBox Worlds:
            </span>

            <div className="flex items-center gap-2">
              {challenge.connectedWorldLinks.explorePinId && (
                <button
                  onClick={() =>
                    onNavigatePillar('EXPLORE', challenge.connectedWorldLinks?.explorePinId)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D8C7A3] text-xs font-bold text-[#1D3E2F] hover:bg-[#FAF3E0] transition-colors shadow-xs"
                >
                  <Compass className="w-3.5 h-3.5 text-[#1D3E2F]" />
                  <span>View on Africa Map</span>
                </button>
              )}

              {challenge.connectedWorldLinks.storyId && (
                <button
                  onClick={() =>
                    onNavigatePillar('STORYLANDS', challenge.connectedWorldLinks?.storyId)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D8C7A3] text-xs font-bold text-[#C85A32] hover:bg-[#FAF3E0] transition-colors shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Read in Storylands</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cultural Provenance Transparency Modal */}
      <CulturalProvenanceInspector
        challenge={challenge}
        isOpen={showProvenanceModal}
        onClose={() => setShowProvenanceModal(false)}
        onPlayVoice={onPlayVoice}
      />
    </div>
  );
};
