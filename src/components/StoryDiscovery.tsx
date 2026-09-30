import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Sparkles,
  BookOpen,
  Clock,
  ShieldCheck,
  Globe,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Layers,
  X,
  Plus,
  Palette
} from 'lucide-react';
import { Story, AfricanRegion, StoryType } from '../types/story';
import { StoryIllustration } from './StoryIllustration';
import { CulturalLoreExplorer } from './CulturalLoreExplorer';

interface StoryDiscoveryProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  savedStoryIds: string[];
  onToggleSave: (storyId: string) => void;
  initialSubTab?: 'DISCOVER' | 'HERITAGE_LORE' | 'BY_PLACE' | 'BY_THEME' | 'BY_AGE' | 'BY_LANGUAGE';
  onOpenStudio?: () => void;
}

export const StoryDiscovery: React.FC<StoryDiscoveryProps> = ({
  stories,
  onSelectStory,
  savedStoryIds,
  onToggleSave,
  initialSubTab = 'DISCOVER',
  onOpenStudio
}) => {
  const [subTab, setSubTab] = useState<
    'DISCOVER' | 'HERITAGE_LORE' | 'BY_PLACE' | 'BY_THEME' | 'BY_AGE' | 'BY_LANGUAGE'
  >(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedStoryType, setSelectedStoryType] = useState<string>('ALL');
  const [selectedAge, setSelectedAge] = useState<string>('ALL');
  const [selectedTheme, setSelectedTheme] = useState<string>('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');

  // Extract unique regions, themes, languages, etc.
  const regions: AfricanRegion[] = [
    'West Africa',
    'East Africa',
    'Southern Africa',
    'North Africa',
    'Central Africa'
  ];

  const themes = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => s.themes.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [stories]);

  const languages = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => set.add(s.languageOfOrigin));
    return Array.from(set);
  }, [stories]);

  // Filtered stories logic
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(q);
        const matchesDesc = story.shortDescription.toLowerCase().includes(q);
        const matchesCountry = story.country.toLowerCase().includes(q);
        const matchesTradition = story.culturalTradition.toLowerCase().includes(q);
        const matchesChar = story.characterNames.some((c) => c.toLowerCase().includes(q));
        const matchesLang = story.languageOfOrigin.toLowerCase().includes(q);
        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesCountry &&
          !matchesTradition &&
          !matchesChar &&
          !matchesLang
        ) {
          return false;
        }
      }

      // Region Filter
      if (selectedRegion !== 'ALL' && story.region !== selectedRegion) {
        return false;
      }

      // Story Type Filter
      if (selectedStoryType !== 'ALL' && story.storyType !== selectedStoryType) {
        return false;
      }

      // Age Range Filter
      if (selectedAge !== 'ALL' && !story.ageRange.includes(selectedAge)) {
        return false;
      }

      // Theme Filter
      if (selectedTheme !== 'ALL' && !story.themes.includes(selectedTheme)) {
        return false;
      }

      // Language Filter
      if (selectedLanguage !== 'ALL' && story.languageOfOrigin !== selectedLanguage) {
        return false;
      }

      // Difficulty Filter
      if (selectedDifficulty !== 'ALL' && story.difficulty !== selectedDifficulty) {
        return false;
      }

      // Country Filter (Uganda Spotlight)
      if (selectedCountry !== 'ALL' && story.country.toLowerCase() !== selectedCountry.toLowerCase()) {
        return false;
      }

      // Verification Status Filter
      if (selectedVerification !== 'ALL' && story.verificationStatus !== selectedVerification) {
        return false;
      }

      return true;
    });
  }, [
    stories,
    searchQuery,
    selectedCountry,
    selectedRegion,
    selectedStoryType,
    selectedAge,
    selectedTheme,
    selectedLanguage,
    selectedDifficulty,
    selectedVerification
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('ALL');
    setSelectedRegion('ALL');
    setSelectedStoryType('ALL');
    setSelectedAge('ALL');
    setSelectedTheme('ALL');
    setSelectedLanguage('ALL');
    setSelectedDifficulty('ALL');
    setSelectedVerification('ALL');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCountry !== 'ALL' ||
    selectedRegion !== 'ALL' ||
    selectedStoryType !== 'ALL' ||
    selectedAge !== 'ALL' ||
    selectedTheme !== 'ALL' ||
    selectedLanguage !== 'ALL' ||
    selectedDifficulty !== 'ALL' ||
    selectedVerification !== 'ALL';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Exploration Hero */}
      <div className="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800 rounded-3xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden">
        {/* Subtle background ring ornaments */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-xs text-amber-200 text-xs font-bold mb-3 border border-amber-300/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>African Children's Adventure Library</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Urbanist'] tracking-tight">
            Explore Storylands
          </h1>

          <p className="mt-2 text-amber-100 text-sm sm:text-base leading-relaxed font-medium">
            Immerse yourself in authentic stories rooted in the diverse geographies, languages,
            peoples, and living traditions of Africa.
          </p>
        </div>

        {/* Search Bar & Studio Trigger */}
        <div className="mt-6 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-amber-700 absolute left-4 pointer-events-none" />
            <input
              id="story-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by story title, country, tradition, character, or theme..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white text-stone-900 placeholder:text-stone-400 text-sm font-medium shadow-lg border-2 border-transparent focus:border-amber-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setSubTab('HERITAGE_LORE')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 touch-manipulation cursor-pointer"
          >
            <span>📜</span>
            <span>Origin Legends, Gods & Lore</span>
          </button>

          {onOpenStudio && (
            <button
              id="open-story-studio-hero-btn"
              onClick={onOpenStudio}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#1D3E2F] hover:bg-[#142B21] text-[#FBF7EE] font-extrabold text-sm shadow-lg border border-emerald-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 touch-manipulation cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#F4B32A]" />
              <span>Add Story</span>
            </button>
          )}
        </div>
      </div>

      {/* Uganda Heritage Spotlight Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 rounded-2xl p-3.5 border border-amber-300/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🇺🇬</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs sm:text-sm text-stone-900 font-['Urbanist']">
                Uganda Heritage Spotlight
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-stone-950 shadow-2xs">
                Developed in Uganda
              </span>
            </div>
            <p className="text-xs text-stone-700">
              Living tribal legends of the <span className="font-bold text-amber-900">Chewzi / Bachwezi</span>, <span className="font-bold text-amber-900">Baganda</span>, <span className="font-bold text-amber-900">Lango</span>, and <span className="font-bold text-amber-900">Bamasaba / Gisu</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (selectedCountry === 'Uganda') {
                setSelectedCountry('ALL');
              } else {
                setSelectedCountry('Uganda');
                if (subTab === 'HERITAGE_LORE') setSubTab('DISCOVER');
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCountry === 'Uganda'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white hover:bg-amber-100 text-stone-900 border border-amber-300'
            }`}
          >
            <span>🇺🇬</span>
            <span>
              {selectedCountry === 'Uganda'
                ? 'Showing Uganda Stories'
                : `Filter Uganda Stories (${stories.filter((s) => s.country === 'Uganda').length})`}
            </span>
          </button>

          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-[#1D3E2F] hover:bg-[#142B21] text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Open the Afro Box Content Ingestion Pipeline"
            >
              <span>🔄 Content Pipeline</span>
            </button>
          )}
        </div>
      </div>

      {/* Section 12: Sub-Navigation inside Storylands */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200 pb-3">
        <div className="flex flex-wrap items-center gap-1 bg-amber-100/60 p-1 rounded-2xl border border-amber-200 max-w-full">
          {[
            { id: 'HERITAGE_LORE', label: '📜 Origins, Gods & Names' },
            { id: 'DISCOVER', label: 'All Stories & Folktales' },
            { id: 'BY_PLACE', label: 'By Place (Regions)' },
            { id: 'BY_THEME', label: 'By Theme' },
            { id: 'BY_AGE', label: 'By Age' },
            { id: 'BY_LANGUAGE', label: 'By Language' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`storylands-subtab-${tab.id.toLowerCase()}`}
              onClick={() => {
                setSubTab(tab.id as any);
                if (tab.id === 'DISCOVER') resetFilters();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                subTab === tab.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-700 hover:text-amber-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onOpenStudio && (
            <button
              id="open-story-studio-subnav-btn"
              onClick={onOpenStudio}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-600 text-white hover:bg-amber-700 shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Story</span>
            </button>
          )}

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 underline underline-offset-4 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Selectors for specific sub-tabs */}
      {subTab === 'BY_PLACE' && (
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200">
          <div className="text-xs font-bold uppercase text-amber-800 mb-2">Select an African Region</div>
          <div className="flex flex-wrap gap-2">
            {['ALL', ...regions].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRegion === reg
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white border border-amber-200 text-stone-700 hover:bg-amber-100'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      )}

      {subTab === 'BY_THEME' && (
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200">
          <div className="text-xs font-bold uppercase text-amber-800 mb-2">Select a Story Theme</div>
          <div className="flex flex-wrap gap-2">
            {['ALL', ...themes].map((th) => (
              <button
                key={th}
                onClick={() => setSelectedTheme(th)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTheme === th
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white border border-amber-200 text-stone-700 hover:bg-amber-100'
                }`}
              >
                {th}
              </button>
            ))}
          </div>
        </div>
      )}

      {subTab === 'BY_AGE' && (
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200">
          <div className="text-xs font-bold uppercase text-amber-800 mb-2">Select Target Age Range</div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ALL', label: 'All Ages' },
              { id: '4-7', label: 'Ages 4-7 (Picture Stories)' },
              { id: '6-9', label: 'Ages 6-9 (Chapter Adventures)' },
              { id: '7-10', label: 'Ages 7-10 (Epic Retellings)' }
            ].map((age) => (
              <button
                key={age.id}
                onClick={() => setSelectedAge(age.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedAge === age.id
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white border border-amber-200 text-stone-700 hover:bg-amber-100'
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {subTab === 'BY_LANGUAGE' && (
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200">
          <div className="text-xs font-bold uppercase text-amber-800 mb-2">
            Select Indigenous Language of Origin
          </div>
          <div className="flex flex-wrap gap-2">
            {['ALL', ...languages].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLanguage === lang
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-white border border-amber-200 text-stone-700 hover:bg-amber-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}

      {subTab === 'HERITAGE_LORE' ? (
        <CulturalLoreExplorer
          onSelectStoryById={(id) => {
            const found = stories.find((s) => s.id === id);
            if (found) onSelectStory(found);
          }}
        />
      ) : (
        <>
          {/* Comprehensive Filter Bar (Section 8: scaling to thousands) */}
          <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-2xs flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 font-bold text-amber-900 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

        {/* Region */}
        <select
          id="filter-region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-amber-50 border border-amber-300 rounded-xl px-2.5 py-1.5 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="ALL">All Regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Story Type */}
        <select
          id="filter-story-type"
          value={selectedStoryType}
          onChange={(e) => setSelectedStoryType(e.target.value)}
          className="bg-amber-50 border border-amber-300 rounded-xl px-2.5 py-1.5 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="ALL">All Story Types</option>
          <option value="ANIMAL_TRICKSTER">Animal Trickster</option>
          <option value="TRADITIONAL_FOLKTALE">Traditional Folktale</option>
          <option value="LEGEND">Legend</option>
          <option value="MYTH_ORIGIN">Myth Origin</option>
          <option value="CONTEMPORARY">Contemporary</option>
        </select>

        {/* Verification Status (Requirement from Section 10 & 7) */}
        <select
          id="filter-verification"
          value={selectedVerification}
          onChange={(e) => setSelectedVerification(e.target.value)}
          className="bg-amber-50 border border-amber-300 rounded-xl px-2.5 py-1.5 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="ALL">All Verification Statuses</option>
          <option value="VERIFIED">Verified Provenance</option>
          <option value="RESEARCH_IN_PROGRESS">Research Draft</option>
          <option value="DEMO_PLACEHOLDER">Demo Placeholder</option>
        </select>

        {/* Difficulty */}
        <select
          id="filter-difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-amber-50 border border-amber-300 rounded-xl px-2.5 py-1.5 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="ALL">All Difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="CHALLENGING">Challenging</option>
        </select>

        <div className="ml-auto text-stone-500 font-semibold">
          Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
        </div>
      </div>

      {/* Story Grid */}
      {filteredStories.length === 0 ? (
        <div className="bg-amber-50 rounded-3xl p-12 text-center border-2 border-dashed border-amber-300">
          <BookOpen className="w-12 h-12 text-amber-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-amber-950 font-['Urbanist']">No Stories Found</h3>
          <p className="text-stone-600 text-sm mt-1 max-w-md mx-auto">
            We couldn't find any stories matching your current search or filters. Try resetting
            the filters to browse our library.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition-colors shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => {
            const isSaved = savedStoryIds.includes(story.id);

            return (
              <div
                key={story.id}
                id={`story-card-${story.id}`}
                className="bg-white rounded-3xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => onSelectStory(story)}
              >
                {/* Illustration Card Top - African Storybook Drawing */}
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <StoryIllustration
                    story={story}
                    aspectRatio="aspect-16/10"
                    showBadge={true}
                    showCaption={false}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Bookmark Button */}
                  <button
                    id={`bookmark-btn-${story.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(story.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-xs transition-all ${
                      isSaved
                        ? 'bg-amber-500 text-white'
                        : 'bg-black/40 text-white/80 hover:bg-black/60 hover:text-white'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save story'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  {/* Country & Region Pill */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-bold">
                    <span className="px-2.5 py-1 rounded-full bg-amber-600/90 shadow-2xs backdrop-blur-xs">
                      {story.country}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-xs">
                      {story.region}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Cultural Tradition and Verification */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="text-xs font-bold text-amber-800 line-clamp-1">
                        {story.culturalTradition}
                      </div>

                      {story.verificationStatus === 'VERIFIED' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : story.verificationStatus === 'DEMO_PLACEHOLDER' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                          Demo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
                          Research
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-amber-950 font-['Urbanist'] group-hover:text-amber-700 transition-colors leading-snug">
                      {story.title}
                    </h3>

                    <p className="mt-2 text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {story.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500 font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        {story.estimatedReadingTime} min
                      </span>
                      <span>Ages {story.ageRange}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-700 font-bold group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
        </>
      )}
    </div>
  );
};
