import React from 'react';
import { ShieldCheck, MapPin, Globe, BookMarked, Languages, Info, FileText } from 'lucide-react';
import { Story } from '../types/story';

interface CulturalProvenanceCardProps {
  story: Story;
}

export const CulturalProvenanceCard: React.FC<CulturalProvenanceCardProps> = ({ story }) => {
  const getVerificationBadge = () => {
    switch (story.verificationStatus) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Provenance
          </span>
        );
      case 'RESEARCH_IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            Research Draft
          </span>
        );
      case 'DEMO_PLACEHOLDER':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <BookMarked className="w-3.5 h-3.5 text-amber-600" />
            Demonstration Story (Demo)
          </span>
        );
    }
  };

  const getStoryTypeDisplay = (type: string) => {
    switch (type) {
      case 'ANIMAL_TRICKSTER':
        return 'Animal Trickster Tale';
      case 'TRADITIONAL_FOLKTALE':
        return 'Traditional Folktale';
      case 'LEGEND':
        return 'Historical Legend';
      case 'MYTH_ORIGIN':
        return 'Origin Narrative (Myth)';
      case 'CONTEMPORARY':
        return 'Contemporary Story';
      case 'ADAPTED_TRADITIONAL':
        return 'Adapted Traditional Narrative';
      default:
        return type;
    }
  };

  return (
    <section
      id="cultural-provenance-section"
      className="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-sm transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200/60">
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>Cultural Provenance & Source Knowledge</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Urbanist'] mt-0.5">
            Where does this story come from?
          </h3>
        </div>
        <div>{getVerificationBadge()}</div>
      </div>

      {/* Grid of Provenance Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <div className="bg-white/80 rounded-2xl p-3.5 border border-amber-200/60 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>Country & Region</span>
          </div>
          <div className="font-bold text-amber-950 text-sm">{story.country}</div>
          <div className="text-xs text-amber-800 font-medium">{story.region}</div>
        </div>

        <div className="bg-white/80 rounded-2xl p-3.5 border border-amber-200/60 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>Community & Tradition</span>
          </div>
          <div className="font-bold text-amber-950 text-sm">{story.culturalTradition}</div>
          <div className="text-xs text-stone-600 line-clamp-1">{story.community}</div>
        </div>

        <div className="bg-white/80 rounded-2xl p-3.5 border border-amber-200/60 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1">
            <Languages className="w-3.5 h-3.5 text-amber-700" />
            <span>Language of Origin</span>
          </div>
          <div className="font-bold text-amber-950 text-sm">{story.languageOfOrigin}</div>
          <div className="text-xs text-stone-600">{story.storyType ? getStoryTypeDisplay(story.storyType) : ''}</div>
        </div>

        <div className="bg-white/80 rounded-2xl p-3.5 border border-amber-200/60 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-1">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>Rights & Adaptation</span>
          </div>
          <div className="font-bold text-amber-950 text-xs truncate" title={story.rightsStatus}>
            {story.rightsStatus.replace(/_/g, ' ')}
          </div>
          <div className="text-xs text-stone-600 line-clamp-1">{story.adaptationStatus}</div>
        </div>
      </div>

      {/* Retelling and Variant Note */}
      <div className="mt-5 p-4 rounded-2xl bg-amber-100/60 border border-amber-200 text-xs leading-relaxed text-amber-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 mb-0.5">Note on Traditional Retellings</div>
          <p className="italic font-medium">{story.variantNotes}</p>
          {story.sourceAuthorOrCollector && (
            <p className="mt-2 text-[11px] text-amber-800/90 not-italic">
              <span className="font-bold">Archival Source / Documentation:</span> {story.sourceAuthorOrCollector}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
