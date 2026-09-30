import React, { useState, useEffect } from 'react';
import {
  Brain,
  HelpCircle,
  Sparkles,
  Compass,
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Challenge,
  ChallengeType,
  RepresentationMode,
  ThinkingSkill,
  RiddleBrainFilter
} from '../types/riddleBrain';
import { AgeTier, PillarId } from '../types/afrobox';
import { riddleBrainService } from '../services/riddleBrainService';
import { ChallengePlaygroundCard } from './riddleBrain/ChallengePlaygroundCard';
import { ThinkingSkillsRadar } from './riddleBrain/ThinkingSkillsRadar';

interface RiddleBrainWorldProps {
  onNavigatePillar: (pillar: PillarId, contextId?: string) => void;
  onPlayVoice?: (text: string) => void;
  ageTier: AgeTier;
  initialChallengeId?: string;
  initialType?: ChallengeType;
}

const CHALLENGE_TYPE_CONFIG: Record<
  ChallengeType,
  { label: string; icon: string; tagline: string; countBadge?: number }
> = {
  TRADITIONAL_RIDDLE: {
    label: 'Traditional Riddles',
    icon: '❓',
    tagline: 'Culturally sourced oral riddles with verified provenance'
  },
  LANGUAGE_RIDDLE: {
    label: 'Language & Wordplay',
    icon: '🗣️',
    tagline: 'Tones, translation, proverbs and auditory wordplay'
  },
  LOGIC: {
    label: 'Logic & Deduction',
    icon: '🛶',
    tagline: 'River crossings, market trades and multi-step reasoning'
  },
  VISUAL_REASONING: {
    label: 'Visual Reasoning',
    icon: '👁️',
    tagline: 'Great Zimbabwe masonry, Adinkra symmetry & patterns'
  },
  PATTERN: {
    label: 'Patterns & Geometry',
    icon: '🌀',
    tagline: 'Chokwe sand drawings, 12/8 bell math & sequences'
  },
  AFRICA_CONTEXT: {
    label: 'African Inventions',
    icon: '🏛️',
    tagline: 'Lalibela rock architecture & termite bio-cooling'
  },
  NATURAL_WORLD: {
    label: 'Natural Wonders',
    icon: '🌊',
    tagline: 'Victoria Falls rainforest mist & the Okavango delta'
  }
};

export const RiddleBrainWorld: React.FC<RiddleBrainWorldProps> = ({
  onNavigatePillar,
  onPlayVoice,
  ageTier,
  initialChallengeId,
  initialType
}) => {
  const [selectedType, setSelectedType] = useState<ChallengeType | 'ALL'>(initialType || 'ALL');
  const [selectedRepMode, setSelectedRepMode] = useState<RepresentationMode | 'ALL'>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<ThinkingSkill | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChallengeId, setActiveChallengeId] = useState<string>('');
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [mobileView, setMobileView] = useState<'STAGE' | 'BROWSE'>('STAGE');
  const [showSkillsRadar, setShowSkillsRadar] = useState<boolean>(false);

  // Load challenges matching filter
  const filter: Partial<RiddleBrainFilter> = {
    type: selectedType,
    representationMode: selectedRepMode,
    skill: selectedSkill,
    searchQuery
  };

  const filteredChallenges = riddleBrainService.getChallenges(filter);
  const allChallenges = riddleBrainService.getChallenges();

  useEffect(() => {
    // Pick initial challenge
    if (initialChallengeId && riddleBrainService.getChallengeById(initialChallengeId)) {
      setActiveChallengeId(initialChallengeId);
    } else if (filteredChallenges.length > 0 && !activeChallengeId) {
      setActiveChallengeId(filteredChallenges[0].id);
    } else if (filteredChallenges.length > 0 && !filteredChallenges.some((c) => c.id === activeChallengeId)) {
      setActiveChallengeId(filteredChallenges[0].id);
    }
  }, [initialChallengeId, selectedType, selectedRepMode, selectedSkill, searchQuery]);

  const activeChallenge =
    filteredChallenges.find((c) => c.id === activeChallengeId) ||
    filteredChallenges[0] ||
    allChallenges[0];

  const currentChallengeIndex = filteredChallenges.findIndex((c) => c.id === activeChallenge?.id);

  const handlePrevChallenge = () => {
    if (filteredChallenges.length <= 1) return;
    const prevIdx = (currentChallengeIndex - 1 + filteredChallenges.length) % filteredChallenges.length;
    setActiveChallengeId(filteredChallenges[prevIdx].id);
  };

  const handleNextChallenge = () => {
    if (filteredChallenges.length <= 1) return;
    const nextIdx = (currentChallengeIndex + 1) % filteredChallenges.length;
    setActiveChallengeId(filteredChallenges[nextIdx].id);
  };

  const handleChallengeCompleted = (challengeId: string) => {
    setCompletedCount((c) => c + 1);
  };

  const stats = riddleBrainService.getStats();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* World Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 border-b border-[#E6DCBF] pb-5 sm:pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#E25822] flex items-center gap-1.5 bg-[#E25822]/10 px-3 py-1 rounded-full border border-[#E25822]/20">
              <Brain className="w-3.5 h-3.5" />
              <span>Thinking & Problem-Solving World</span>
            </span>
            <span className="text-xs font-bold text-[#1D3E2F] bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Playground for Thinking
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#23211E] font-['Urbanist'] tracking-tight">
            Riddle & <span className="text-[#E25822]">Brain</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5C4033] max-w-2xl mt-1 leading-relaxed">
            Where African wisdom, traditional oral riddles, mathematical patterns, and everyday logic ignite reasoning, deduction, and creative curiosity.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border-2 border-[#E6DCBF] shadow-xs shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E25822] to-[#C85A32] flex items-center justify-center text-white font-extrabold shadow-sm">
            <Award className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#7C4728] uppercase">Your Mastered Riddles</div>
            <div className="text-lg font-extrabold text-[#23211E]">
              {stats.totalSolved} of {allChallenges.length} Solved
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible 9 Thinking Skills Radar Constellation */}
      <div className="bg-[#FAF3E0] rounded-2xl border border-[#D8C7A3] overflow-hidden">
        <button
          onClick={() => setShowSkillsRadar(!showSkillsRadar)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#F5EBD0] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#E25822]" />
            <span className="text-xs font-black text-[#23211E] uppercase tracking-wider">
              Thinking Skills Constellation
            </span>
            {selectedSkill !== 'ALL' && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E25822] text-white">
                Filtered: {selectedSkill}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C4728]">
            <span>{showSkillsRadar ? 'Hide Skills Radar' : 'View Skills Radar'}</span>
            {showSkillsRadar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showSkillsRadar && (
          <div className="p-3 sm:p-4 border-t border-[#D8C7A3]">
            <ThinkingSkillsRadar
              activeSkill={selectedSkill}
              onSelectSkill={(s) => setSelectedSkill(s)}
            />
          </div>
        )}
      </div>

      {/* Primary Category Selector: 7 Core Content Types */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wider font-extrabold text-[#7C4728] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#E25822]" />
            <span>Select Challenge World Realm</span>
          </h2>
          <span className="text-xs text-[#7C4728]">
            Showing {filteredChallenges.length} challenges
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-1">
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              selectedType === 'ALL'
                ? 'bg-[#23211E] text-white shadow-md'
                : 'bg-white text-[#5C4033] border border-[#E6DCBF] hover:bg-[#FAF3E0]'
            }`}
          >
            <span>🌟</span>
            <span>All Challenge Types</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
              {allChallenges.length}
            </span>
          </button>

          {(Object.keys(CHALLENGE_TYPE_CONFIG) as ChallengeType[]).map((typeKey) => {
            const config = CHALLENGE_TYPE_CONFIG[typeKey];
            const isSelected = selectedType === typeKey;
            const count = allChallenges.filter((c) => c.type === typeKey).length;

            return (
              <button
                key={typeKey}
                onClick={() => setSelectedType(typeKey)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#E25822] text-white shadow-md shadow-[#E25822]/20'
                    : 'bg-white text-[#5C4033] border border-[#E6DCBF] hover:border-[#E25822] hover:bg-[#FAF3E0]'
                }`}
                title={config.tagline}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/30 text-white' : 'bg-[#F0E8D0] text-[#7C4728]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Representation Mode & Search Filters */}
      <div className="p-4 rounded-2xl bg-[#F0E8D0] border border-[#E0D4B2] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#7C4728] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search riddles, countries, topics..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#D8C7A3] text-xs font-medium text-[#23211E] placeholder:text-[#9B8268] focus:outline-none focus:ring-2 focus:ring-[#E25822]"
          />
        </div>

        {/* Representation Mode Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-[#7C4728] shrink-0">Provenance Filter:</span>
          <select
            value={selectedRepMode}
            onChange={(e) => setSelectedRepMode(e.target.value as RepresentationMode | 'ALL')}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-white border border-[#D8C7A3] text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#E25822]"
          >
            <option value="ALL">All Provenance Modes</option>
            <option value="COMMUNITY_TRADITION">🌿 Community Oral Traditions</option>
            <option value="LANGUAGE_TRADITION">🗣️ Language & Wordplay Traditions</option>
            <option value="NATURAL_FEATURE">🌊 Natural Feature Challenges</option>
            <option value="ENVIRONMENT">🌳 African Environmental Science</option>
            <option value="CONTEMPORARY_CONTEXT">🏘️ Contemporary African Context</option>
            <option value="ORIGINAL_PUZZLE">💡 Original Educational Puzzles</option>
          </select>
        </div>
      </div>

      {/* Mobile View Segmented Switcher (Visible on small & medium screens) */}
      <div className="flex lg:hidden items-center justify-center p-1 bg-[#F0E8D0] rounded-2xl border border-[#E0D4B2] gap-1">
        <button
          onClick={() => setMobileView('STAGE')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all touch-manipulation ${
            mobileView === 'STAGE'
              ? 'bg-[#E25822] text-white shadow-xs'
              : 'text-[#5C4033] hover:bg-white/50'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Active Challenge</span>
        </button>
        <button
          onClick={() => setMobileView('BROWSE')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all touch-manipulation ${
            mobileView === 'BROWSE'
              ? 'bg-[#23211E] text-white shadow-xs'
              : 'text-[#5C4033] hover:bg-white/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Browse All ({filteredChallenges.length})</span>
        </button>
      </div>

      {/* Playground Layout: Challenge Picker Carousel + Active Challenge Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Challenge Selector / Browse List: Hidden on mobile unless BROWSE tab is active, always visible on lg */}
        <div
          className={`space-y-3 lg:col-span-4 ${
            mobileView === 'BROWSE' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
              All Challenges ({filteredChallenges.length})
            </span>
            {(selectedType !== 'ALL' || selectedRepMode !== 'ALL' || selectedSkill !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedType('ALL');
                  setSelectedRepMode('ALL');
                  setSelectedSkill('ALL');
                  setSearchQuery('');
                }}
                className="text-[11px] font-bold text-[#C85A32] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filteredChallenges.map((ch) => {
              const isActive = ch.id === activeChallenge?.id;
              const isSolved = riddleBrainService.isSolved(ch.id);
              const rep = riddleBrainService.getRepresentationMeta(ch.representationMode);

              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChallengeId(ch.id);
                    setMobileView('STAGE');
                  }}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex flex-col gap-1.5 touch-manipulation ${
                    isActive
                      ? 'bg-white border-[#E25822] shadow-md ring-2 ring-[#E25822]/20'
                      : 'bg-white/80 hover:bg-white border-[#E6DCBF] hover:border-[#D8C7A3]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#7C4728] truncate">
                      {ch.type.replace('_', ' ')}
                    </span>
                    {isSolved && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Done</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-[#23211E] leading-snug font-['Urbanist'] line-clamp-1">
                    {ch.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-[#7C4728] pt-1 border-t border-[#F0E8D0]">
                    <span className="truncate">📍 {ch.country}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${rep.colorClass}`}>
                      {rep.isTraditional ? 'Oral Archive' : 'Educational'}
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredChallenges.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-white border border-[#E6DCBF] space-y-2">
                <HelpCircle className="w-8 h-8 text-[#C85A32] mx-auto opacity-70" />
                <p className="text-xs font-bold text-[#7C4728]">No challenges match this filter.</p>
                <button
                  onClick={() => {
                    setSelectedType('ALL');
                    setSelectedRepMode('ALL');
                    setSelectedSkill('ALL');
                    setSearchQuery('');
                  }}
                  className="text-xs font-extrabold text-[#E25822] underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Playground Stage: Hidden on mobile unless STAGE tab is active, always visible on lg */}
        <div
          className={`space-y-4 lg:col-span-8 ${
            mobileView === 'STAGE' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Mobile Quick Prev / Next Navigator */}
          {filteredChallenges.length > 1 && (
            <div className="flex items-center justify-between bg-white px-3 sm:px-4 py-2.5 rounded-2xl border border-[#E6DCBF] shadow-xs">
              <button
                onClick={handlePrevChallenge}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF3E0] hover:bg-[#F0E8D0] text-xs font-bold text-[#7C4728] transition-colors touch-manipulation"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-extrabold text-[#5C4033]">
                Challenge {currentChallengeIndex + 1} of {filteredChallenges.length}
              </span>

              <button
                onClick={handleNextChallenge}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF3E0] hover:bg-[#F0E8D0] text-xs font-bold text-[#7C4728] transition-colors touch-manipulation"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeChallenge ? (
            <ChallengePlaygroundCard
              key={activeChallenge.id}
              challenge={activeChallenge}
              onNavigatePillar={onNavigatePillar}
              onPlayVoice={onPlayVoice}
              onChallengeCompleted={handleChallengeCompleted}
            />
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white border-2 border-[#E6DCBF]">
              <Brain className="w-12 h-12 text-[#E25822] mx-auto mb-3 animate-bounce" />
              <h3 className="text-lg font-bold text-[#23211E]">Select a challenge to begin thinking!</h3>
            </div>
          )}

          {/* Quick Browse button on mobile */}
          <div className="block lg:hidden pt-2 text-center">
            <button
              onClick={() => {
                setMobileView('BROWSE');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF3E0] border border-[#D8C7A3] text-xs font-extrabold text-[#7C4728] hover:bg-[#F0E8D0] transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#E25822]" />
              <span>Browse All {filteredChallenges.length} Challenges</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
