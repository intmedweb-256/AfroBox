import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  PackagePlus,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Brain,
  ChevronRight,
  X,
  MapPin,
  Compass,
  ArrowRight,
  GraduationCap,
  Music,
  Lightbulb,
  Maximize2
} from 'lucide-react';
import { MapPinItem, MAP_PINS } from '../../data/mapData';
import { PillarId } from '../../types/afrobox';
import { afroboxStorage } from '../../services/afroboxStorage';
import { analyticsService } from '../../services/analyticsService';
import { audioEngine } from '../../services/audioEngine';
import { InstrumentSoundPlayer } from '../audio/InstrumentSoundPlayer';
import { LocalAccentPronunciationCard } from '../audio/LocalAccentPronunciationCard';

interface DiscoveryCardDrawerProps {
  pin: MapPinItem;
  onClose: () => void;
  onNavigatePillar: (pillar: PillarId, contextId?: string) => void;
  onSelectPin: (pin: MapPinItem) => void;
  onBreadcrumbClick: (index: number) => void;
  onPlayVoice: (text: string) => void;
}

type DrawerTab = 'OVERVIEW' | 'FACTS' | 'SOUNDS' | 'CLASSROOM' | 'NEARBY';

export const DiscoveryCardDrawer: React.FC<DiscoveryCardDrawerProps> = ({
  pin,
  onClose,
  onNavigatePillar,
  onSelectPin,
  onBreadcrumbClick,
  onPlayVoice
}) => {
  const [activeTab, setActiveTab] = useState<DrawerTab>('OVERVIEW');
  const [justCollected, setJustCollected] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imageFit, setImageFit] = useState<'cover' | 'contain'>('cover');
  const [showLightbox, setShowLightbox] = useState(false);

  // Reset img error, image fit and tab on pin change
  React.useEffect(() => {
    setImgError(false);
    setImageFit('cover');
    setShowLightbox(false);
    setActiveTab('OVERVIEW');
  }, [pin.id]);

  const isCollected = afroboxStorage.isEntityDiscovered(pin.id);

  const handleCollect = () => {
    afroboxStorage.addDiscovery({
      id: pin.id,
      name: pin.name,
      type: pin.type,
      tagline: pin.tagline,
      description: pin.description,
      illustrationUrl: pin.illustrationUrl,
      icon: pin.icon,
      region: pin.region,
      country: pin.country,
      funFact: pin.curiousFact,
      relatedEntityIds: [],
      ageTier: '6-8'
    });
    audioEngine.playSoundEffect('collect');
    analyticsService.trackDiscoveryUnlocked(pin.id, pin.name, pin.type);
    setJustCollected(true);
    setTimeout(() => setJustCollected(false), 3000);
  };

  // Find 3 nearby discoveries in the same region or country
  const nearbyPins = MAP_PINS.filter(
    (p) => p.id !== pin.id && (p.country === pin.country || p.region === pin.region)
  ).slice(0, 4);

  return (
    <div
      id="discovery-card-drawer"
      className="bg-[#FBF7EE] text-[#23211E] rounded-t-3xl lg:rounded-3xl border-2 border-[#E6DCBF] shadow-2xl flex flex-col h-full max-h-[85vh] lg:max-h-[calc(100vh-8.5rem)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Mobile drag handle */}
      <div className="lg:hidden w-12 h-1.5 bg-[#D8C7A3] rounded-full mx-auto mt-2.5 shrink-0" />

      {/* Top Header Bar: Breadcrumbs & Actions */}
      <div className="p-3.5 sm:p-4 border-b border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-between gap-2 shrink-0">
        {/* Exploration Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-1 text-[11px] sm:text-xs font-bold text-[#7C4728] overflow-hidden">
          <span className="text-sm">🧭</span>
          {pin.hierarchyPath.slice(-3).map((crumb, idx, arr) => {
            const isLast = idx === arr.length - 1;
            return (
              <React.Fragment key={crumb}>
                <span
                  className={`truncate max-w-[110px] ${
                    isLast ? 'text-[#E25822] font-extrabold' : ''
                  }`}
                >
                  {crumb}
                </span>
                {!isLast && <ChevronRight className="w-3 h-3 text-[#C85A32] shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Top Control Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Narrate Voice Button */}
          <button
            id="narrate-wonder-btn"
            onClick={() => {
              audioEngine.playSoundEffect(pin.soundType);
              onPlayVoice(
                pin.audioPronunciationText ||
                  `${pin.name}. ${pin.localName ? 'Known locally as ' + pin.localName : ''}. ${pin.description}`
              );
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-[#E25822] hover:text-white text-[#23211E] border border-[#E0D4B2] transition-colors shadow-2xs"
            title="Read Aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Quick Collect Star Button */}
          <button
            onClick={handleCollect}
            className={`p-1.5 sm:p-2 rounded-xl border transition-colors shadow-2xs ${
              isCollected
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-white hover:bg-[#1D3E2F] hover:text-white text-[#1D3E2F] border-[#E0D4B2]'
            }`}
            title={isCollected ? 'Collected in My Box' : 'Collect into My Box'}
          >
            {isCollected ? <CheckCircle2 className="w-4 h-4" /> : <PackagePlus className="w-4 h-4" />}
          </button>

          {/* Close Overlay Drawer Button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-stone-200 text-[#23211E] border border-[#E0D4B2] transition-colors shadow-2xs"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Break Content Into Animated Tabs to Fit On Screen Without Tiring Scroll */}
      <div className="flex items-center bg-[#EDE3C8] px-3 py-1.5 border-b border-[#E0D4B2] overflow-x-auto scrollbar-none gap-1 shrink-0">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'OVERVIEW'
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'text-[#7C4728] hover:text-[#23211E]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('FACTS')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'FACTS'
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'text-[#7C4728] hover:text-[#23211E]'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Facts & Words</span>
        </button>

        {(pin.type === 'INSTRUMENT' || pin.instrumentType || pin.greetings) && (
          <button
            onClick={() => setActiveTab('SOUNDS')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeTab === 'SOUNDS'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Music & Voice</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('CLASSROOM')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'CLASSROOM'
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'text-[#7C4728] hover:text-[#23211E]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Classroom Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('NEARBY')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
            activeTab === 'NEARBY'
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'text-[#7C4728] hover:text-[#23211E]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Nearby ({nearbyPins.length})</span>
        </button>
      </div>

      {/* Tab Panels: Scrollable inner container that fits neatly inside the drawer */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Visual Hero */}
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-950 shadow-xs flex items-center justify-center group">
              {imgError || !pin.illustrationUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1D3E2F] via-[#2D1B0F] to-[#C85A32] text-amber-50 p-4 text-center">
                  <span className="text-4xl mb-1">{pin.icon}</span>
                  <span className="font-extrabold text-sm tracking-wide">{pin.name}</span>
                  <span className="text-[11px] text-amber-200/90">{pin.country} • {pin.region}</span>
                </div>
              ) : (
                <img
                  src={pin.illustrationUrl}
                  alt={pin.name}
                  className={`w-full h-full ${imageFit === 'contain' ? 'object-contain bg-stone-950 p-1' : 'object-cover object-center'} transition-all duration-300`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              )}
              {imageFit !== 'contain' && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              )}

              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap z-10">
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#1D3E2F] text-white shadow-xs">
                  {pin.region}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#23211E]">
                  {pin.country}
                </span>
              </div>

              {/* Fit Mode Toggle & Lightbox Zoom */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                {pin.illustrationUrl && !imgError && (
                  <>
                    <button
                      onClick={() => setImageFit((prev) => (prev === 'cover' ? 'contain' : 'cover'))}
                      className="text-[11px] font-bold px-2 py-1 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors shadow-xs"
                      title={imageFit === 'cover' ? 'View Full Image (Uncropped)' : 'Fill Card'}
                    >
                      {imageFit === 'cover' ? '🔍 Full Image' : '🔲 Fill'}
                    </button>
                    <button
                      onClick={() => setShowLightbox(true)}
                      className="p-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors shadow-xs"
                      title="Enlarge Photo"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              <div className="absolute bottom-2.5 right-2.5 text-2xl p-1.5 rounded-xl bg-white/90 shadow-md z-10">
                {pin.icon}
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#1D3E2F]">
                {pin.category.replace(/_/g, ' ')}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#23211E] font-['Urbanist'] mt-0.5">
                {pin.name}
              </h2>

              {pin.localName && (
                <div className="text-xs font-bold text-[#7C4728] mt-0.5">
                  Local name: {pin.localName}
                </div>
              )}

              <p className="mt-2 text-xs sm:text-sm text-[#23211E] font-semibold leading-relaxed">
                {pin.tagline}
              </p>
              <p className="mt-1 text-xs text-[#7C4728] leading-relaxed">
                {pin.description}
              </p>
            </div>

            {/* Quick Did You Know callout */}
            <div className="p-3.5 rounded-2xl bg-[#F0E8D0]/80 border border-[#E0D4B2] text-xs flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#E25822] shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-[#7C4728]">Did you know?</span>{' '}
                <span className="text-[#23211E]">{pin.curiousFact}</span>
              </div>
            </div>

            {/* Bridge: Read Connected Story */}
            {pin.connectedStoryId && (
              <button
                onClick={() => onNavigatePillar('STORYLANDS')}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-300 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#C85A32] text-white flex items-center justify-center text-lg shadow-2xs">
                    📖
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold text-[#C85A32] uppercase tracking-wider">
                      Oral Literature Connection
                    </div>
                    <div className="text-xs font-black text-[#23211E] group-hover:text-[#C85A32]">
                      Read the Story set around here
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C85A32] group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Collector Button */}
            <button
              onClick={handleCollect}
              className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                isCollected
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1D3E2F] hover:bg-[#152e23] text-white'
              }`}
            >
              {isCollected ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Collected in My Scrapbook</span>
                </>
              ) : (
                <>
                  <PackagePlus className="w-4 h-4" />
                  <span>Collect Wonder into My Box</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* TAB 2: FACTS & WORDS */}
        {activeTab === 'FACTS' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Cultural & Scientific Depth */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-2">
              <div className="text-xs font-black text-[#1D3E2F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E25822]" />
                <span>Geographic & Cultural Significance</span>
              </div>
              <p className="text-xs text-[#23211E] leading-relaxed">
                {pin.curiousFact}
              </p>
              {pin.pronunciation && (
                <div className="text-xs font-mono text-[#7C4728] pt-2 border-t border-stone-100">
                  Phonetic guide: <span className="font-bold text-[#1D3E2F]">/{pin.pronunciation}/</span>
                </div>
              )}
            </div>

            {/* Greetings in Local Dialects */}
            {pin.greetings && pin.greetings.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-2.5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
                  Local Greetings & Phrases
                </div>
                <div className="space-y-2">
                  {pin.greetings.map((g) => (
                    <button
                      key={g.phrase}
                      onClick={() => audioEngine.speakLocalAccent(g.phrase, pin.accentRegion)}
                      className="w-full p-2.5 rounded-xl bg-[#FBF7EE] hover:bg-[#F0E8D0] border border-[#E6DCBF] text-left transition-all flex items-center justify-between group active:scale-98"
                    >
                      <div>
                        <div className="font-extrabold text-xs text-[#23211E]">{g.phrase}</div>
                        <div className="text-[10px] text-[#7C4728] font-mono">{g.phonetic}</div>
                        <div className="text-[10px] text-[#1D3E2F] font-semibold">{g.meaning}</div>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white group-hover:bg-[#1D3E2F] text-[#7C4728] group-hover:text-white flex items-center justify-center shadow-2xs">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Accent Pronunciation Card */}
            {(pin.pronunciationWordId || pin.localName) && (
              <LocalAccentPronunciationCard
                wordOrId={pin.pronunciationWordId || pin.localName || pin.name}
                defaultAccent={pin.accentRegion}
              />
            )}
          </div>
        )}

        {/* TAB 3: MUSIC & VOICE */}
        {activeTab === 'SOUNDS' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {(pin.type === 'INSTRUMENT' || pin.instrumentType) ? (
              <InstrumentSoundPlayer
                instrument={
                  pin.instrumentType ||
                  (pin.id.includes('mbira')
                    ? 'mbira'
                    : pin.id.includes('drum')
                    ? 'talking-drum'
                    : pin.id.includes('balafon')
                    ? 'balafon'
                    : 'kora')
                }
              />
            ) : (
              <div className="p-4 rounded-2xl bg-white border border-[#E6DCBF] text-center space-y-3">
                <div className="text-4xl">🎵</div>
                <h4 className="font-extrabold text-sm text-[#23211E]">
                  Regional Sounds of {pin.region}
                </h4>
                <p className="text-xs text-[#7C4728]">
                  Listen to traditional music and atmospheric soundscapes inspired by {pin.country}.
                </p>
                <button
                  onClick={() => audioEngine.playSoundEffect(pin.soundType || 'kora')}
                  className="px-4 py-2 rounded-xl bg-[#E25822] text-white text-xs font-bold shadow-xs hover:brightness-105"
                >
                  Play Regional Soundscape
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CLASSROOM GUIDE */}
        {activeTab === 'CLASSROOM' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
              <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>Classroom Discussion & Inquiry</span>
              </div>
              <p className="text-xs text-emerald-900 mt-1.5 leading-relaxed font-medium">
                "How does the geography of {pin.name} shape daily life, trade, or stories for people in {pin.country}?"
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-1.5">
              <div className="text-xs font-extrabold text-[#7C4728] uppercase tracking-wider">
                Curriculum Integration
              </div>
              <p className="text-xs text-[#23211E] leading-relaxed">
                Connects with Social Studies, African Geography, Environmental Science, and Global Cultures.
              </p>
            </div>

            {pin.connectedRiddleId && (
              <button
                onClick={() => onNavigatePillar('RIDDLE')}
                className="w-full p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-[#D9822B] uppercase">Brain Challenge</div>
                  <div className="text-xs font-extrabold text-[#23211E]">Solve related African riddle</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D9822B]" />
              </button>
            )}
          </div>
        )}

        {/* TAB 5: NEARBY WONDERS */}
        {activeTab === 'NEARBY' && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728] px-1">
              Wonders in {pin.region}
            </div>
            {nearbyPins.map((nearby) => (
              <button
                key={nearby.id}
                onClick={() => {
                  audioEngine.playSoundEffect(nearby.soundType);
                  onSelectPin(nearby);
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {nearby.icon}
                  </span>
                  <div>
                    <div className="text-xs font-extrabold text-[#23211E] group-hover:text-[#1D3E2F]">
                      {nearby.name}
                    </div>
                    <div className="text-[11px] text-[#7C4728]">
                      {nearby.country} • {nearby.tagline}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7C4728] group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Full Non-Cropped Image Viewing */}
      {showLightbox && pin.illustrationUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              title="Close Fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={pin.illustrationUrl}
              alt={pin.name}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-3 text-center text-white">
              <h3 className="font-bold text-lg font-['Urbanist']">{pin.name}</h3>
              <p className="text-xs text-white/70">{pin.country} • {pin.tagline}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
