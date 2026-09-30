import React, { useState } from 'react';
import {
  PackageOpen,
  Globe,
  Compass,
  BookOpen,
  HelpCircle,
  Brain,
  Award,
  Mic,
  Volume2,
  Trash2,
  Play,
  Pause,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { AgeTier, PillarId } from '../types/afrobox';
import { ChildRecording } from '../types/story';
import { afroboxStorage } from '../services/afroboxStorage';
import { storageService } from '../services/storageService';
import { AFROBOX_ENTITIES } from '../data/entities';
import { SAMPLE_STORIES } from '../data/sampleStories';

interface MyBoxProps {
  onNavigatePillar: (pillar: PillarId, contextId?: string) => void;
  onPlayVoice: (text: string) => void;
  ageTier: AgeTier;
}

export const MyBox: React.FC<MyBoxProps> = ({
  onNavigatePillar,
  onPlayVoice,
  ageTier
}) => {
  const [activeTab, setActiveTab] = useState<
    'DISCOVERIES' | 'PASSPORT' | 'RECORDINGS' | 'STICKERS'
  >('DISCOVERIES');
  const [playingRecordingId, setPlayingRecordingId] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<ChildRecording[]>(
    storageService.getPrivateRecordings()
  );

  const myBoxState = afroboxStorage.getMyBoxState();
  const progress = storageService.getProgress();
  const totalCount = afroboxStorage.getTotalDiscoveriesCount();

  // Categorize discoveries
  const placeDiscoveries = myBoxState.discoveries.filter(
    (d) => d.entityType === 'NATURAL_FEATURE' || d.entityType === 'LANDMARK'
  );
  const natureDiscoveries = myBoxState.discoveries.filter(
    (d) => d.entityType === 'ANIMAL' || d.entityType === 'PLANT'
  );
  const foodDiscoveries = myBoxState.discoveries.filter((d) => d.entityType === 'FOOD');
  const languageDiscoveries = myBoxState.discoveries.filter((d) => d.entityType === 'LANGUAGE');

  const handleDeleteRecording = (id: string) => {
    const updated = storageService.deleteRecording(id);
    setRecordings(updated);
  };

  const handlePlayRecording = (recording: ChildRecording) => {
    if (playingRecordingId === recording.id) {
      setPlayingRecordingId(null);
    } else {
      setPlayingRecordingId(recording.id);
      const audio = new Audio(recording.audioBlobUrl);
      audio.onended = () => setPlayingRecordingId(null);
      audio.play().catch(() => setPlayingRecordingId(null));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Emotional Center Banner (Section 11 & 12: Discovery Progression & Scrapbook) */}
      <section className="bg-gradient-to-r from-[#D9822B] via-[#C85A32] to-[#7C4728] rounded-3xl p-6 sm:p-10 text-white shadow-lg border-2 border-[#E08A5E]/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-xs font-extrabold flex items-center gap-1.5 border border-white/20">
              <PackageOpen className="w-4 h-4 text-[#F4B32A]" />
              <span>The AfroBox Collection Scrapbook</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Urbanist'] tracking-tight">
            You've discovered {totalCount} wonders about Africa!
          </h1>
          <p className="mt-2 text-white/90 text-sm sm:text-base leading-relaxed font-medium">
            Every story read, place explored, riddle solved, and voice recorded is tucked safely inside
            your personal Box. This is your living journey across the continent.
          </p>

          {/* Quick Category Counters (Section 12) */}
          <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-4">
            <div className="px-3.5 py-2 rounded-xl bg-black/30 backdrop-blur-xs border border-white/20 text-center">
              <div className="text-base sm:text-lg font-extrabold">🏛️ {placeDiscoveries.length + 2}</div>
              <div className="text-[11px] text-white/80 font-semibold">Places</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-black/30 backdrop-blur-xs border border-white/20 text-center">
              <div className="text-base sm:text-lg font-extrabold">🐘 {natureDiscoveries.length + 2}</div>
              <div className="text-[11px] text-white/80 font-semibold">Nature</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-black/30 backdrop-blur-xs border border-white/20 text-center">
              <div className="text-base sm:text-lg font-extrabold">🍲 {foodDiscoveries.length + 1}</div>
              <div className="text-[11px] text-white/80 font-semibold">Foods</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-black/30 backdrop-blur-xs border border-white/20 text-center">
              <div className="text-base sm:text-lg font-extrabold">🗣️ {languageDiscoveries.length + 2}</div>
              <div className="text-[11px] text-white/80 font-semibold">Languages</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-black/30 backdrop-blur-xs border border-white/20 text-center">
              <div className="text-base sm:text-lg font-extrabold">📖 {myBoxState.completedStoryIds.length}</div>
              <div className="text-[11px] text-white/80 font-semibold">Stories</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-black/30 backdrop-blur-xs border border-white/20 text-center">
              <div className="text-base sm:text-lg font-extrabold">❓ {myBoxState.solvedRiddleIds.length}</div>
              <div className="text-[11px] text-white/80 font-semibold">Riddles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Discoveries | Passport & Badges | My Voice Recordings */}
      <div className="flex items-center gap-2 border-b border-[#E6DCBF] pb-2 overflow-x-auto">
        <button
          id="mybox-tab-discoveries"
          onClick={() => setActiveTab('DISCOVERIES')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'DISCOVERIES'
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'text-[#23211E] hover:bg-[#F0E8D0]'
          }`}
        >
          ✨ Collected Items ({myBoxState.discoveries.length})
        </button>

        <button
          id="mybox-tab-passport"
          onClick={() => setActiveTab('PASSPORT')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'PASSPORT'
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'text-[#23211E] hover:bg-[#F0E8D0]'
          }`}
        >
          🌍 African Passport & Badges ({progress.earnedBadges.length})
        </button>

        <button
          id="mybox-tab-recordings"
          onClick={() => setActiveTab('RECORDINGS')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'RECORDINGS'
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'text-[#23211E] hover:bg-[#F0E8D0]'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>My Voice Recordings ({recordings.length})</span>
        </button>
      </div>

      {/* TAB 1: COLLECTED DISCOVERIES */}
      {activeTab === 'DISCOVERIES' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist']">
              Your Collected African Cards
            </h3>
            <span className="text-xs text-[#7C4728] font-semibold">
              Tap any discovery to view details
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myBoxState.discoveries.map((discovery) => (
              <div
                key={discovery.entityId}
                className="bg-[#FBF7EE] p-5 rounded-3xl border-2 border-[#E6DCBF] hover:border-[#D9822B] transition-all shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{discovery.icon}</span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#E6DCBF] text-[#7C4728]">
                    {discovery.region}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-extrabold text-[#23211E] font-['Urbanist']">
                    {discovery.entityName}
                  </h4>
                  <div className="text-xs text-[#7C4728] font-medium mt-0.5">
                    {discovery.country || discovery.region}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E6DCBF] flex items-center justify-between text-xs font-bold text-[#E25822]">
                  <button
                    onClick={() =>
                      onPlayVoice(`${discovery.entityName} in ${discovery.region}`)
                    }
                    className="flex items-center gap-1 hover:text-[#C85A32]"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hear Name</span>
                  </button>

                  <button
                    onClick={() => onNavigatePillar('EXPLORE', discovery.entityId)}
                    className="hover:text-[#C85A32] flex items-center gap-0.5"
                  >
                    <span>View Map</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PASSPORT & BADGES */}
      {activeTab === 'PASSPORT' && (
        <div className="space-y-8">
          {/* African Continental Passport */}
          <div className="bg-[#FBF7EE] p-6 sm:p-8 rounded-3xl border-2 border-[#E6DCBF] shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#1D3E2F]" />
              <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist']">
                AfroBox Continental Travel Passport
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { name: 'East Africa', stamp: '🇰🇪 🇺🇬 🇹🇿', icon: '🌊' },
                { name: 'West Africa', stamp: '🇬🇭 🇳🇬 🇸🇳', icon: '🌴' },
                { name: 'Southern Africa', stamp: '🇿🇼 🇿🇦 🇧🇼', icon: '🪨' },
                { name: 'North Africa', stamp: '🇪🇬 🇲🇦 🇸🇩', icon: '☀️' },
                { name: 'Central Africa', stamp: '🇨🇩 🇨🇲 🇬🇦', icon: '🌿' }
              ].map((reg) => {
                const isVisited = myBoxState.regionsVisited.includes(reg.name as any);
                return (
                  <div
                    key={reg.name}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      isVisited
                        ? 'bg-white border-[#1D3E2F] shadow-xs'
                        : 'bg-[#F0E8D0]/40 border-dashed border-[#E0D4B2] opacity-60'
                    }`}
                  >
                    <div className="text-3xl mb-1">{reg.icon}</div>
                    <div className="text-xs font-extrabold text-[#23211E]">{reg.name}</div>
                    <div className="text-[10px] text-[#7C4728] mt-1 font-mono">{reg.stamp}</div>
                    <div className="mt-2 text-[10px] font-extrabold">
                      {isVisited ? (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Stamped ✓
                        </span>
                      ) : (
                        <span className="text-[#7C4728]">Awaiting visit</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Earned Badges (Section 13: Collectible, not addictive) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#E6DCBF] shadow-xs space-y-5">
            <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist'] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E25822]" />
              <span>Curiosity & Discovery Badges</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {progress.earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 rounded-2xl bg-[#FBF7EE] border border-[#E6DCBF] flex items-start gap-3.5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E25822] text-white flex items-center justify-center text-xl shrink-0 shadow-xs">
                    🏅
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#23211E]">{badge.title}</h4>
                    <p className="text-xs text-[#7C4728] mt-0.5 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHILD VOICE RECORDINGS (Layer C: Child's Voice & Privacy) */}
      {activeTab === 'RECORDINGS' && (
        <div className="bg-[#FBF7EE] p-6 sm:p-8 rounded-3xl border-2 border-[#E6DCBF] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DCBF] pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist'] flex items-center gap-2">
                <Mic className="w-5 h-5 text-[#C85A32]" />
                <span>My Voice Story Recordings</span>
              </h3>
              <p className="text-xs text-[#7C4728] mt-1">
                Your practice audio is saved strictly on this device and kept completely private.
              </p>
            </div>

            <button
              onClick={() => onNavigatePillar('STORYLANDS')}
              className="py-2.5 px-4 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#B84B24] transition-colors"
            >
              📖 Open a Story to Record
            </button>
          </div>

          {recordings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-4xl">🎙️</div>
              <h4 className="text-base font-bold text-[#23211E]">No voice recordings yet!</h4>
              <p className="text-xs text-[#7C4728] max-w-md mx-auto">
                Open any story in Storylands, scroll to "My Voice Practice", and record yourself
                reading in your own voice!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recordings.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-white border border-[#E6DCBF] flex items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePlayRecording(rec)}
                      className="w-10 h-10 rounded-xl bg-[#E25822] hover:bg-[#C85A32] text-white flex items-center justify-center transition-colors shadow-2xs"
                    >
                      {playingRecordingId === rec.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <div className="font-extrabold text-sm text-[#23211E]">{rec.storyTitle}</div>
                      <div className="text-[11px] text-[#7C4728]">
                        Duration: {rec.durationSeconds}s • Recorded:{' '}
                        {new Date(rec.recordedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteRecording(rec.id)}
                    className="p-2 rounded-xl hover:bg-rose-50 text-[#7C4728] hover:text-rose-600 transition-colors"
                    title="Delete recording"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
