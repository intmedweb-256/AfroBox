import React, { useState, useEffect } from 'react';
import {
  Award,
  Compass,
  Gem,
  MapPin,
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Mic,
  Star
} from 'lucide-react';
import { ReaderProgress, VocabularyWord } from '../types/story';
import { storageService } from '../services/storageService';
import { SAMPLE_STORIES } from '../data/sampleStories';

export const ProgressScreen: React.FC = () => {
  const [progress, setProgress] = useState<ReaderProgress>(storageService.getProgress());

  useEffect(() => {
    setProgress(storageService.getProgress());
  }, []);

  // Collect all vocab words from sample stories that match discovered words
  const discoveredVocabList = SAMPLE_STORIES.flatMap((s) => s.vocabulary).filter(
    (v, i, self) =>
      progress.discoveredWords.includes(v.word) &&
      self.findIndex((other) => other.word === v.word) === i
  );

  const handlePronounce = (word: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const allRegions = ['West Africa', 'East Africa', 'Southern Africa', 'North Africa', 'Central Africa'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Explorer Passport & Milestones</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-['Urbanist'] mt-0.5">
          Your Storylands Passport & Progress
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Track the African regions you have journeyed through, words you have gathered, and badges
          you have earned.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-950 font-['Urbanist']">
              {progress.completedStoryIds.length}
            </div>
            <div className="text-xs font-semibold text-stone-500">Stories Completed</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Gem className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-950 font-['Urbanist']">
              {progress.discoveredWords.length}
            </div>
            <div className="text-xs font-semibold text-stone-500">Words in Word Chest</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-950 font-['Urbanist']">
              {progress.regionsVisited.length} / 5
            </div>
            <div className="text-xs font-semibold text-stone-500">African Regions Visited</div>
          </div>
        </div>
      </div>

      {/* Continental Passport Section */}
      <section className="bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-amber-100 pb-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
              Regional Exploration
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Urbanist']">
              Storylands Continental Passport
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-semibold">
            Complete stories to stamp regions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {allRegions.map((region) => {
            const isStamped = progress.regionsVisited.includes(region);

            return (
              <div
                key={region}
                className={`rounded-2xl p-4 border-2 transition-all flex flex-col justify-between h-36 ${
                  isStamped
                    ? 'bg-amber-50/80 border-amber-400 shadow-2xs'
                    : 'bg-stone-50/60 border-stone-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-amber-900">
                    {region}
                  </span>
                  {isStamped && (
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs shadow-xs">
                      ✓
                    </span>
                  )}
                </div>

                <div className="my-auto">
                  {isStamped ? (
                    <div className="text-center font-['Urbanist'] font-extrabold text-amber-950 text-sm border-2 border-dashed border-amber-300 rounded-xl py-2 px-1 rotate-[-2deg]">
                      STAMPED PASSPORT
                    </div>
                  ) : (
                    <div className="text-center text-stone-400 text-xs italic font-medium">
                      Unexplored region
                    </div>
                  )}
                </div>

                <div className="text-[10px] font-semibold text-stone-500 text-center">
                  {isStamped ? 'Explored via Stories' : 'Read a story here to unlock'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Discovered Indigenous Words Chest */}
      <section className="bg-amber-50/70 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-amber-200 pb-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800 flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5 text-amber-600" />
              <span>Linguistic & Cultural Heritage</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Urbanist']">
              Your Indigenous Word Chest
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-900">
            {discoveredVocabList.length} words collected
          </span>
        </div>

        {discoveredVocabList.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-amber-200">
            <p className="text-stone-600 text-sm font-medium">
              You haven't added any words to your chest yet. Click any underlined word while reading
              a story to learn its meaning and tap "Save to Word Chest"!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoveredVocabList.map((vocab, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      {vocab.language || 'Indigenous'}
                    </span>
                    <h4 className="text-lg font-bold text-amber-950 font-['Urbanist'] mt-1">
                      {vocab.word}
                    </h4>
                  </div>
                  <button
                    onClick={() => handlePronounce(vocab.word)}
                    className="p-1.5 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200"
                    title="Hear word"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {vocab.phonetic && (
                  <div className="text-xs font-mono text-stone-500">/{vocab.phonetic}/</div>
                )}

                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {vocab.definition}
                </p>

                {vocab.culturalContext && (
                  <p className="text-[11px] text-amber-900/80 italic pt-1 border-t border-amber-100">
                    {vocab.culturalContext}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Earned Badges Section */}
      <section className="bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-amber-100 pb-4">
          <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
            Adventure Milestones
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Urbanist']">
            Earned Badges
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {progress.earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 shadow-2xs"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Star className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950 font-['Urbanist']">
                  {badge.title}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed font-medium">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
