import React from 'react';
import { Volume2, X, BookmarkCheck, Gem, Sparkles } from 'lucide-react';
import { VocabularyWord } from '../types/story';
import { localAccentEngine } from '../services/localAccentEngine';
import { audioEngine } from '../services/audioEngine';

interface VocabularyModalProps {
  word: VocabularyWord | null;
  onClose: () => void;
  onCollectWord: (word: VocabularyWord) => void;
  isCollected: boolean;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  word,
  onClose,
  onCollectWord,
  isCollected
}) => {
  if (!word) return null;

  const handlePronounce = () => {
    // 1. If remote or embedded audio pronunciation URL exists, play it first
    if (word.audioPronunciation) {
      audioEngine.playAudioUrl(
        word.audioPronunciation,
        undefined,
        () => {
          // Fallback to local accent engine
          localAccentEngine.playFullPronunciation(word.word);
        }
      );
      return;
    }

    // 2. Fallback to African pronunciation engine (uses African native voices & phonetic cadence)
    localAccentEngine.playFullPronunciation(word.word);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="vocabulary-detail-card"
        className="bg-amber-50 rounded-3xl border-2 border-amber-300 shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
      >
        {/* Decorative corner ornament */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200/50 rounded-full blur-lg pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{word.language || 'Indigenous Language'}</span>
            </div>
            <div className="flex items-center gap-2.5 mt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-['Urbanist']">
                {word.word}
              </h3>
              <button
                id="pronounce-word-btn"
                onClick={handlePronounce}
                className="p-1.5 rounded-full bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors"
                title="Hear pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            {word.phonetic && (
              <div className="text-xs font-semibold text-stone-500 mt-0.5">
                Sounds like: <span className="font-mono text-amber-800">/{word.phonetic}/</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meaning */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/90 border border-amber-200 text-stone-800">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
            Meaning
          </div>
          <p className="text-sm font-medium leading-relaxed">{word.definition}</p>
        </div>

        {/* Cultural Context */}
        {word.culturalContext && (
          <div className="mt-3 p-3.5 rounded-2xl bg-amber-100/60 border border-amber-200 text-xs leading-relaxed text-amber-950">
            <div className="font-bold text-amber-900 mb-0.5 flex items-center gap-1">
              <Gem className="w-3 h-3 text-amber-700" />
              <span>Cultural Insight</span>
            </div>
            <p className="font-medium text-amber-900/90">{word.culturalContext}</p>
          </div>
        )}

        {/* Action button: Add to Word Chest */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            id="collect-word-btn"
            onClick={() => onCollectWord(word)}
            disabled={isCollected}
            className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isCollected
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isCollected ? (
              <>
                <BookmarkCheck className="w-4 h-4" />
                <span>Saved in Word Chest!</span>
              </>
            ) : (
              <>
                <Gem className="w-4 h-4" />
                <span>Save to Word Chest</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-2xl font-bold text-sm bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
