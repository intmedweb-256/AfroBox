import React, { useState } from 'react';
import { Lightbulb, Compass, Palette, CheckCircle2, XCircle, MapPin, Sparkles, Send } from 'lucide-react';
import { LearningConnection } from '../types/story';

interface LearningJourneyProps {
  connections: LearningConnection[];
  storyTitle: string;
}

export const LearningJourney: React.FC<LearningJourneyProps> = ({ connections, storyTitle }) => {
  const [activeStep, setActiveStep] = useState<'THINK' | 'EXPLORE' | 'CREATE'>('THINK');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [hasAnsweredQuiz, setHasAnsweredQuiz] = useState<boolean>(false);
  const [creativeText, setCreativeText] = useState<string>('');
  const [creativeSaved, setCreativeSaved] = useState<boolean>(false);

  const currentItem = connections.find((c) => c.step === activeStep) || connections[0];

  const handleQuizSelect = (index: number) => {
    if (hasAnsweredQuiz) return;
    setSelectedQuizAnswer(index);
    setHasAnsweredQuiz(true);
  };

  const handleSaveCreative = () => {
    if (!creativeText.trim()) return;
    setCreativeSaved(true);
    setTimeout(() => setCreativeSaved(false), 3000);
  };

  return (
    <section id="learning-journey-section" className="bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-amber-100">
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-amber-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Storylands Learning Journey</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Urbanist']">
            Connect & Learn Beyond the Story
          </h3>
        </div>

        {/* 3 Step Indicator: THINK -> EXPLORE -> CREATE */}
        <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-2xl border border-amber-200">
          <button
            id="journey-tab-think"
            onClick={() => setActiveStep('THINK')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStep === 'THINK'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-950'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>1. Think</span>
          </button>

          <button
            id="journey-tab-explore"
            onClick={() => setActiveStep('EXPLORE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStep === 'EXPLORE'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-950'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>2. Explore</span>
          </button>

          <button
            id="journey-tab-create"
            onClick={() => setActiveStep('CREATE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStep === 'CREATE'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-amber-950'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>3. Create</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {currentItem && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {currentItem.learningArea}
            </span>
            <span className="text-xs text-stone-500">• {currentItem.description}</span>
          </div>

          <h4 className="text-lg sm:text-xl font-bold text-amber-950 mb-4 font-['Urbanist']">
            {currentItem.title}
          </h4>

          {/* STEP 1: THINK (Comprehension & Reflection Quiz) */}
          {activeStep === 'THINK' && (
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80">
              {currentItem.payload.question && (
                <p className="font-bold text-amber-950 text-base mb-4">
                  {currentItem.payload.question}
                </p>
              )}

              {currentItem.payload.options && (
                <div className="space-y-2.5">
                  {currentItem.payload.options.map((option, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = idx === currentItem.payload.correctIndex;
                    let style =
                      'bg-white border-amber-200 hover:border-amber-400 text-stone-800';

                    if (hasAnsweredQuiz) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        style = 'bg-rose-50 border-rose-400 text-rose-950';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizSelect(idx)}
                        disabled={hasAnsweredQuiz}
                        className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between text-sm ${style}`}
                      >
                        <span>{option}</span>
                        {hasAnsweredQuiz && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {hasAnsweredQuiz && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {hasAnsweredQuiz && currentItem.payload.explanation && (
                <div className="mt-4 p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs text-emerald-950 leading-relaxed font-medium">
                  <div className="font-bold mb-0.5">Why this matters:</div>
                  {currentItem.payload.explanation}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: EXPLORE (Geography, Ecology & Cultural Living Knowledge) */}
          {activeStep === 'EXPLORE' && currentItem.payload.mapLocation && (
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-amber-600 rounded-2xl text-white shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase text-amber-800">
                    Geographic Location
                  </div>
                  <h5 className="text-lg font-bold text-amber-950">
                    {currentItem.payload.mapLocation.coordinatesName}
                  </h5>
                  <div className="text-xs font-semibold text-stone-600">
                    {currentItem.payload.mapLocation.country} • {currentItem.payload.mapLocation.region}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 mb-1">Ecosystem & Habitat</div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {currentItem.payload.mapLocation.ecosystem}
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 mb-1">Natural Science Fact</div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {currentItem.payload.mapLocation.fact}
                  </p>
                </div>
              </div>

              {currentItem.payload.culturalDetails && (
                <div className="mt-4 p-4 rounded-xl bg-amber-100/70 border border-amber-200 text-xs text-amber-950">
                  <div className="font-bold text-amber-900 mb-1">Cultural Insights</div>
                  <ul className="list-disc list-inside space-y-1 text-amber-900/90 font-medium">
                    {currentItem.payload.culturalDetails.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: CREATE (Creative Writing, Drawing & Expression Prompt) */}
          {activeStep === 'CREATE' && (
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80">
              <p className="text-sm font-bold text-amber-950 mb-3">
                {currentItem.payload.creativeTask}
              </p>

              <div className="relative">
                <textarea
                  id="creative-journal-input"
                  rows={4}
                  value={creativeText}
                  onChange={(e) => setCreativeText(e.target.value)}
                  placeholder="Type your creative thoughts, story response, or invention here..."
                  className="w-full p-3.5 rounded-2xl bg-white border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-stone-800 placeholder:text-stone-400"
                />

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Your creative notes are saved privately on your device.
                  </span>
                  <button
                    id="save-creative-response-btn"
                    onClick={handleSaveCreative}
                    disabled={!creativeText.trim()}
                    className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{creativeSaved ? 'Saved in Journal!' : 'Save Response'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
