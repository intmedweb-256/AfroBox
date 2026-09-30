import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Mic,
  Trash2,
  Play,
  ShieldCheck,
  Calendar,
  Clock,
  BookOpen,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Story, ChildRecording } from '../types/story';
import { StoryIllustration } from './StoryIllustration';
import { storageService } from '../services/storageService';

interface MyStoriesScreenProps {
  savedStories: Story[];
  onSelectStory: (story: Story) => void;
  onRemoveSaved: (storyId: string) => void;
  onGoToStorylands: () => void;
}

export const MyStoriesScreen: React.FC<MyStoriesScreenProps> = ({
  savedStories,
  onSelectStory,
  onRemoveSaved,
  onGoToStorylands
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'SAVED' | 'RECORDINGS'>('SAVED');
  const [recordings, setRecordings] = useState<ChildRecording[]>([]);

  useEffect(() => {
    setRecordings(storageService.getPrivateRecordings());
  }, []);

  const handleDeleteRecording = (id: string) => {
    const updated = storageService.deleteRecording(id);
    setRecordings(updated);
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Personal Reading Journal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-['Urbanist']">
            My Stories & Voice Recordings
          </h1>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-amber-100/70 p-1 rounded-2xl border border-amber-200">
          <button
            id="my-stories-tab-saved"
            onClick={() => setActiveSubTab('SAVED')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'SAVED'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-950'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Stories ({savedStories.length})</span>
          </button>

          <button
            id="my-stories-tab-recordings"
            onClick={() => setActiveSubTab('RECORDINGS')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'RECORDINGS'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-amber-950'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>My Voice Recordings ({recordings.length})</span>
          </button>
        </div>
      </div>

      {/* SAVED STORIES TAB */}
      {activeSubTab === 'SAVED' && (
        <div>
          {savedStories.length === 0 ? (
            <div className="bg-amber-50 rounded-3xl p-12 text-center border-2 border-dashed border-amber-300">
              <Bookmark className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-amber-950 font-['Urbanist']">
                No Saved Stories Yet
              </h3>
              <p className="text-stone-600 text-sm mt-1 max-w-md mx-auto">
                While browsing Storylands, tap the bookmark icon on any story to save it here for
                quick bedtime reading or classroom practice.
              </p>
              <button
                onClick={onGoToStorylands}
                className="mt-4 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition-colors shadow-xs"
              >
                Browse Storylands Library
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-3xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group cursor-pointer"
                  onClick={() => onSelectStory(story)}
                >
                  <div className="relative aspect-16/9 w-full overflow-hidden">
                    <StoryIllustration
                      story={story}
                      aspectRatio="aspect-16/9"
                      showBadge={true}
                      showCaption={false}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-amber-950 font-['Urbanist'] group-hover:text-amber-700 transition-colors">
                        {story.title}
                      </h3>
                      <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {story.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveSaved(story.id);
                        }}
                        className="text-stone-400 hover:text-rose-600 transition-colors font-medium"
                      >
                        Remove
                      </button>

                      <span className="font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MY VOICE RECORDINGS TAB */}
      {activeSubTab === 'RECORDINGS' && (
        <div className="space-y-6">
          {/* Privacy Protection Notice */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed font-medium">
              <span className="font-bold">Child Privacy & Safety Notice:</span> All voice practice
              recordings are stored privately on this browser. They are never transmitted to public
              servers, never exposed on the web, and strictly never used for AI voice training or
              cloning.
            </div>
          </div>

          {recordings.length === 0 ? (
            <div className="bg-amber-50 rounded-3xl p-12 text-center border-2 border-dashed border-amber-300">
              <Mic className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-amber-950 font-['Urbanist']">
                No Voice Recordings Yet
              </h3>
              <p className="text-stone-600 text-sm mt-1 max-w-md mx-auto">
                Select any story, switch to the "Read it yourself" mode, and tap "Record My Voice" to
                practice your storytelling reading. Your recordings will appear here privately!
              </p>
              <button
                onClick={onGoToStorylands}
                className="mt-4 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 transition-colors shadow-xs"
              >
                Start a Reading Session
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recordings.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                        <span>Story Practice</span>
                      </div>
                      <h4 className="text-base font-bold text-amber-950 font-['Urbanist'] mt-0.5">
                        {rec.storyTitle}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleDeleteRecording(rec.id)}
                      className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete recording"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      {formatDuration(rec.durationSeconds)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      {new Date(rec.recordedAt).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Private Device Audio
                    </span>
                  </div>

                  {/* Playback Control */}
                  <div className="pt-2 border-t border-amber-100">
                    <audio src={rec.audioBlobUrl} controls className="w-full h-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
