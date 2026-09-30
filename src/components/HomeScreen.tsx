import React from 'react';
import {
  Compass,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Mic,
  Languages,
  Award,
  Bookmark
} from 'lucide-react';
import { Story } from '../types/story';
import { StoryIllustration } from './StoryIllustration';

interface HomeScreenProps {
  onEnterStorylands: (subTab?: 'DISCOVER' | 'BY_PLACE' | 'BY_THEME' | 'BY_AGE' | 'BY_LANGUAGE') => void;
  onSelectStory: (story: Story) => void;
  featuredStory: Story;
  recentStories: Story[];
  savedStories: Story[];
  discoveredWordsCount: number;
  completedStoriesCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onEnterStorylands,
  onSelectStory,
  featuredStory,
  recentStories,
  savedStories,
  discoveredWordsCount,
  completedStoriesCount
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Welcome Banner */}
      <div className="relative bg-gradient-to-br from-amber-700 via-orange-700 to-amber-900 rounded-3xl p-6 sm:p-12 text-white shadow-lg overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-amber-200 text-xs font-bold border border-amber-300/20 mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>AfroBox • Pillar 1: Storylands</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Urbanist'] tracking-tight leading-tight">
            Where African Knowledge Becomes a Children's Adventure
          </h1>

          <p className="mt-4 text-amber-100 text-sm sm:text-lg leading-relaxed font-medium">
            Step inside a warm children’s library of authentic stories, rich indigenous languages,
            living geography, and multi-voice narration from across the diverse African continent.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              id="hero-start-exploring-btn"
              onClick={() => onEnterStorylands('DISCOVER')}
              className="py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all duration-200 active:scale-95"
            >
              <BookOpen className="w-5 h-5 text-amber-900" />
              <span>Enter Storylands Library</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              id="hero-explore-by-place-btn"
              onClick={() => onEnterStorylands('BY_PLACE')}
              className="py-3.5 px-6 rounded-2xl bg-black/25 hover:bg-black/40 text-white font-bold text-sm sm:text-base flex items-center gap-2 border border-white/20 transition-all duration-200"
            >
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>Explore by Region</span>
            </button>
          </div>
        </div>

        {/* Quick Explorer Stats Pill Bar */}
        <div className="relative z-10 mt-10 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 text-amber-100">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Verified Cultural Origins</span>
          </div>
          <div className="flex items-center gap-2 text-amber-100">
            <Mic className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Community & Child Voices</span>
          </div>
          <div className="flex items-center gap-2 text-amber-100">
            <Languages className="w-4 h-4 text-sky-300 shrink-0" />
            <span>Indigenous Languages</span>
          </div>
          <div className="flex items-center gap-2 text-amber-100">
            <Award className="w-4 h-4 text-yellow-300 shrink-0" />
            <span>
              {completedStoriesCount} Stories Read • {discoveredWordsCount} Words Collected
            </span>
          </div>
        </div>
      </div>

      {/* Featured Story Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
              Featured Traditional Retelling
            </div>
            <h2 className="text-2xl font-extrabold text-amber-950 font-['Urbanist']">
              Today's Adventure Spotlight
            </h2>
          </div>
          <button
            onClick={() => onEnterStorylands('DISCOVER')}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>View All Stories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          id="featured-story-card"
          onClick={() => onSelectStory(featuredStory)}
          className="bg-white rounded-3xl border border-amber-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
        >
          <div className="lg:col-span-7 relative aspect-video lg:aspect-auto w-full overflow-hidden">
            <StoryIllustration
              story={featuredStory}
              aspectRatio="aspect-video lg:h-full lg:aspect-auto"
              showBadge={true}
              showCaption={false}
              className="w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-extrabold uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  {featuredStory.storyType.replace(/_/g, ' ')}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Provenance
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-amber-950 font-['Urbanist'] group-hover:text-amber-700 transition-colors">
                {featuredStory.title}
              </h3>

              <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                {featuredStory.shortDescription}
              </p>

              {/* Provenance highlights */}
              <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                <div>
                  <span className="font-bold">Language of Origin:</span>{' '}
                  {featuredStory.languageOfOrigin}
                </div>
                <div>
                  <span className="font-bold">Original Community:</span>{' '}
                  {featuredStory.community}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500">
                ~{featuredStory.estimatedReadingTime} min • Ages {featuredStory.ageRange}
              </span>
              <button className="py-2.5 px-4 rounded-xl bg-amber-600 group-hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors">
                <span>Start Reading</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Africa's Diverse Regions (Non-stereotypical representations) */}
      <section className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
            Continental Diversity
          </div>
          <h2 className="text-2xl font-extrabold text-amber-950 font-['Urbanist']">
            Explore by African Landscapes & Regions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Africa is home to bustling coastal cities, deep rainforest canopies, volcanic mountain
            springs, and ancient river deltas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              region: 'West Africa',
              headline: 'Forest Canopies & River Estuaries',
              traditions: 'Akan, Efik-Ibibio, Wolof',
              description: 'Tales of the spider Ananse, the wide Atlantic ports, and Cross River tides.',
              icon: '🌴'
            },
            {
              region: 'East Africa',
              headline: 'Misty Mountains & Coastal Springs',
              traditions: 'Swahili, Coastal Bantu, Taita',
              description: 'Adventures of Sungura the hare beneath Mount Kilimanjaro and the Indian Ocean coast.',
              icon: '⛰️'
            },
            {
              region: 'Southern Africa',
              headline: 'Granite Kopjes & Highveld Skies',
              traditions: 'Shona, Matobo traditions',
              description: 'Legends of the polka-dotted guineafowl and the bright Morning Star.',
              icon: '✨'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onEnterStorylands('BY_PLACE')}
              className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs font-extrabold uppercase text-amber-800">
                  {item.region}
                </div>
                <h3 className="text-lg font-bold text-amber-950 font-['Urbanist'] group-hover:text-amber-700 transition-colors mt-0.5">
                  {item.headline}
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-900 line-clamp-1">{item.traditions}</span>
                <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Saved / Recent shelf if available */}
      {savedStories.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-amber-950 font-['Urbanist'] flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-700" />
              <span>Your Saved Stories</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedStories.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="bg-white rounded-2xl p-4 border border-amber-200 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-amber-200">
                  <StoryIllustration
                    story={story}
                    aspectRatio="aspect-square"
                    showBadge={false}
                    showCaption={false}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-amber-950 group-hover:text-amber-700 transition-colors truncate">
                    {story.title}
                  </h4>
                  <div className="text-xs text-stone-500 truncate">
                    {story.country} • {story.culturalTradition}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-700 shrink-0" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pedagogical Principles for Parents & Teachers */}
      <div className="bg-amber-100/60 rounded-3xl p-6 sm:p-8 border border-amber-200 flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Sparkles className="w-6 h-6 text-amber-200" />
        </div>
        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          <h3 className="font-bold text-amber-950 text-base mb-1">
            The AfroBox Storylands Pledge
          </h3>
          <p>
            We do not invent fictional "African folklore" and present it as authentic material.
            Every traditional story traces its source, community, and language of origin, while
            clearly distinguishing between verified retellings, research drafts, and demo
            content.
          </p>
        </div>
      </div>
    </div>
  );
};
