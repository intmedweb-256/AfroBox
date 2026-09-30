import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import {
  localAccentEngine,
  AccentRegion,
  AfricanWordPronunciation
} from '../../services/localAccentEngine';

interface LocalAccentPronunciationCardProps {
  wordOrId: string;
  defaultAccent?: AccentRegion;
  compact?: boolean;
  className?: string;
  onPronounceStart?: () => void;
  onPronounceEnd?: () => void;
}

const ACCENT_OPTIONS: Array<{
  id: AccentRegion;
  label: string;
  flag: string;
  region: string;
  cadenceDescription: string;
}> = [
  {
    id: 'west-african',
    label: 'West African',
    flag: '🇬🇭',
    region: 'Nigeria, Ghana, Senegal',
    cadenceDescription: 'Syllable-timed rhythmic cadence & bright bounce'
  },
  {
    id: 'east-african',
    label: 'East African',
    flag: '🇺🇬',
    region: 'Uganda, Kenya, Tanzania',
    cadenceDescription: 'Warm melodic Swahili lilt & open vowels'
  },
  {
    id: 'southern-african',
    label: 'Southern African',
    flag: '🇿🇼',
    region: 'Zimbabwe, South Africa',
    cadenceDescription: 'Crisp rhythmic clarity & dental resonance'
  },
  {
    id: 'north-african',
    label: 'North African',
    flag: '🇲🇦',
    region: 'Morocco, Egypt',
    cadenceDescription: 'Melodic desert contours & gentle touches'
  }
];

export const LocalAccentPronunciationCard: React.FC<LocalAccentPronunciationCardProps> = ({
  wordOrId,
  defaultAccent,
  compact = false,
  className = '',
  onPronounceStart,
  onPronounceEnd
}) => {
  const [wordData, setWordData] = useState<AfricanWordPronunciation | undefined>(undefined);
  const [selectedAccent, setSelectedAccent] = useState<AccentRegion>('west-african');
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [activeSyllableIdx, setActiveSyllableIdx] = useState<number>(-1);
  const [showTip, setShowTip] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  useEffect(() => {
    const found =
      localAccentEngine.getWordById(wordOrId) || localAccentEngine.findMatchingWord(wordOrId);
    setWordData(found);
    if (found) {
      setSelectedAccent(defaultAccent || found.defaultAccent);
    } else if (defaultAccent) {
      setSelectedAccent(defaultAccent);
    }
  }, [wordOrId, defaultAccent]);

  const handlePlayFull = () => {
    if (isPlayingFull) {
      localAccentEngine.stopSpeaking();
      setIsPlayingFull(false);
      setActiveSyllableIdx(-1);
      return;
    }

    setIsPlayingFull(true);
    onPronounceStart?.();

    localAccentEngine.playFullPronunciation(
      wordData ? wordData.id : wordOrId,
      selectedAccent,
      () => {
        setIsPlayingFull(false);
        setActiveSyllableIdx(-1);
        onPronounceEnd?.();
      }
    );
  };

  const handleTapSyllable = (index: number, spokenPhonetic: string) => {
    setActiveSyllableIdx(index);
    localAccentEngine.playSyllable(spokenPhonetic, selectedAccent, () => {
      // Keep highlighted for a brief moment then clear
      setTimeout(() => {
        setActiveSyllableIdx((prev) => (prev === index ? -1 : prev));
      }, 400);
    });
  };

  const handlePlaySlowPractice = () => {
    setIsPlayingFull(true);
    onPronounceStart?.();

    localAccentEngine.playSlowSyllablePractice(
      wordData ? wordData.id : wordOrId,
      selectedAccent,
      (currentIdx) => {
        setActiveSyllableIdx(currentIdx);
      },
      () => {
        setIsPlayingFull(false);
        setActiveSyllableIdx(-1);
        onPronounceEnd?.();
      }
    );
  };

  const currentAccentConfig =
    ACCENT_OPTIONS.find((a) => a.id === selectedAccent) || ACCENT_OPTIONS[0];

  const syllables = wordData?.syllables || [
    { text: wordOrId, phoneticSpoken: wordOrId, isStressed: true }
  ];

  if (compact) {
    return (
      <div
        id={`compact-accent-${wordOrId}`}
        className={`flex items-center gap-2 p-2 rounded-xl bg-[#F7F4EB] border border-[#E6DCBF] ${className}`}
      >
        <button
          type="button"
          onClick={handlePlayFull}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
            isPlayingFull
              ? 'bg-[#E25822] text-white animate-pulse'
              : 'bg-[#1D3E2F] hover:bg-[#2A5C43] text-[#F7F4EB]'
          }`}
          title={`Pronounce in ${currentAccentConfig.label} Accent`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Hear Accent</span>
          <span className="text-[10px] opacity-80">{currentAccentConfig.flag}</span>
        </button>

        <div className="flex items-center gap-1 flex-wrap">
          {syllables.map((syl, i) => (
            <button
              key={syl.text + i}
              type="button"
              onClick={() => handleTapSyllable(i, syl.phoneticSpoken)}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
                activeSyllableIdx === i
                  ? 'bg-[#E25822] text-white font-bold scale-105 shadow-sm'
                  : 'bg-white border border-[#E6DCBF] text-[#23211E] hover:bg-[#ECE5D0]'
              }`}
            >
              {syl.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      id={`accent-card-${wordOrId}`}
      className={`rounded-2xl p-4 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F3ECD8] border-2 border-[#E6DCBF] shadow-sm space-y-3.5 ${className}`}
    >
      {/* Header: Title, Language & Accent Selector */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E25822]" />
              Local Accent & Pronunciation
            </span>
            {wordData && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1D3E2F]/10 text-[#1D3E2F]">
                {wordData.language}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl sm:text-2xl font-black text-[#23211E] font-['Urbanist'] tracking-tight">
              {wordData?.word || wordOrId}
            </span>
            {wordData?.indigenousScript && (
              <span className="text-lg font-bold text-[#E25822] opacity-90">
                ({wordData.indigenousScript})
              </span>
            )}
            <span className="text-xs font-mono text-[#7C4728] font-bold">
              /{wordData?.phoneticDisplay || wordOrId}/
            </span>
          </div>
        </div>

        {/* Accent Selector Badge */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAccentPicker(!showAccentPicker)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-[#F3ECD8] border border-[#D9CEB0] text-[#23211E] transition-all shadow-xs"
            title="Change African regional accent"
          >
            <span className="text-sm">{currentAccentConfig.flag}</span>
            <span className="hidden sm:inline">{currentAccentConfig.label}</span>
            <span className="text-[10px] text-[#7C4728] font-mono">▼</span>
          </button>

          {showAccentPicker && (
            <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-white border-2 border-[#E6DCBF] shadow-lg p-1.5 z-30 space-y-1">
              <div className="text-[10px] font-black uppercase text-[#7C4728] px-2 py-1">
                Choose Accent Cadence
              </div>
              {ACCENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedAccent(opt.id);
                    setShowAccentPicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    selectedAccent === opt.id
                      ? 'bg-[#1D3E2F] text-white font-bold'
                      : 'hover:bg-[#F7F4EB] text-[#23211E]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{opt.flag}</span>
                    <div>
                      <div className="leading-tight">{opt.label}</div>
                      <div className="text-[10px] opacity-70 leading-tight">{opt.region}</div>
                    </div>
                  </div>
                  {selectedAccent === opt.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Syllable Tap Exploration Bar */}
      <div className="p-3 rounded-xl bg-white/90 border border-[#E6DCBF]/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#7C4728]">
          <span>Tap each syllable to practice:</span>
          <span className="text-[10px] font-normal text-stone-500 hidden sm:inline">
            Listen & repeat each sound
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {syllables.map((syl, idx) => {
            const isActive = activeSyllableIdx === idx;
            return (
              <button
                key={syl.text + idx}
                type="button"
                id={`syllable-btn-${idx}`}
                onClick={() => handleTapSyllable(idx, syl.phoneticSpoken)}
                className={`group relative px-3 py-2 rounded-xl text-sm font-black font-mono transition-all transform active:scale-95 ${
                  isActive
                    ? 'bg-[#E25822] text-white scale-110 shadow-md ring-2 ring-[#E25822]/40 ring-offset-1'
                    : syl.isStressed
                    ? 'bg-[#F9EFE6] hover:bg-[#F3DFCD] text-[#A63C11] border-2 border-[#E25822]/30'
                    : 'bg-[#F7F4EB] hover:bg-[#ECE5D0] text-[#23211E] border border-[#E6DCBF]'
                }`}
              >
                <span>{syl.text}</span>
                {syl.isStressed && (
                  <span className="absolute -top-1.5 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E25822] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E25822]"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pronunciation Controls */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {/* Play Full Word */}
        <button
          type="button"
          id={`play-accent-full-${wordOrId}`}
          onClick={handlePlayFull}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
            isPlayingFull && activeSyllableIdx === -1
              ? 'bg-[#E25822] text-white ring-2 ring-[#E25822]/50 animate-pulse'
              : 'bg-[#1D3E2F] hover:bg-[#2A5C43] text-[#F7F4EB] active:scale-[0.98]'
          }`}
        >
          <Volume2 className="w-4 h-4 text-[#F3ECD8]" />
          <span>{isPlayingFull ? 'Speaking...' : 'Hear in Local Accent'}</span>
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
            {currentAccentConfig.flag}
          </span>
        </button>

        {/* Slow Syllable-by-Syllable Practice */}
        <button
          type="button"
          id={`play-accent-slow-${wordOrId}`}
          onClick={handlePlaySlowPractice}
          disabled={isPlayingFull}
          className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-white hover:bg-[#F3ECD8] border border-[#D9CEB0] text-[#23211E] transition-all disabled:opacity-50"
          title="Break down into slow syllables with highlights"
        >
          <span>🐢</span>
          <span>Slow Practice</span>
        </button>

        {/* Cultural Tip Toggle */}
        {wordData?.pronunciationTip && (
          <button
            type="button"
            onClick={() => setShowTip(!showTip)}
            className={`p-2.5 rounded-xl border transition-colors ${
              showTip
                ? 'bg-[#E25822]/10 border-[#E25822] text-[#E25822]'
                : 'bg-white border-[#D9CEB0] text-stone-600 hover:bg-[#F3ECD8]'
            }`}
            title="Pronunciation tip"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Cultural Meaning & Pronunciation Guide Tip */}
      {(showTip || wordData?.meaning) && (
        <div className="p-2.5 rounded-xl bg-white/80 border border-[#E6DCBF] text-xs space-y-1">
          {wordData?.meaning && (
            <div className="text-stone-700">
              <span className="font-bold text-[#1D3E2F]">Meaning: </span>
              {wordData.meaning}
            </div>
          )}
          {wordData?.pronunciationTip && (
            <div className="text-[#7C4728] flex items-start gap-1.5 pt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E25822] shrink-0 mt-0.5" />
              <span>
                <strong>Accent Tip:</strong> {wordData.pronunciationTip}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
