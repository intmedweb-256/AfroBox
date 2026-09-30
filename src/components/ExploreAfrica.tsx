import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  Layers,
  LayoutGrid,
  Map as MapIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  Filter,
  Search,
  CheckCircle2,
  X,
  GraduationCap,
  Music,
  ChevronDown
} from 'lucide-react';
import { AgeTier, PillarId } from '../types/afrobox';
import {
  MapPinItem,
  MAP_PINS,
  MapPinCategory,
  AfricanRegion,
  MAP_REGIONS
} from '../data/mapData';
import { AfricaMapCanvas } from './map/AfricaMapCanvas';
import { DiscoveryCardDrawer } from './map/DiscoveryCardDrawer';
import { ScavengerHuntModal } from './map/ScavengerHuntModal';
import { SoundPavilionModal } from './audio/SoundPavilionModal';
import { CurriculumGuideModal } from './school/CurriculumGuideModal';
import { useSchoolMode } from '../context/SchoolModeContext';
import { afroboxStorage } from '../services/afroboxStorage';
import { audioEngine } from '../services/audioEngine';

interface ExploreAfricaProps {
  onNavigatePillar: (pillar: PillarId, contextId?: string) => void;
  onPlayVoice: (text: string) => void;
  ageTier: AgeTier;
  initialSelectedEntityId?: string | null;
}

const CATEGORY_CONFIG: Array<{ id: MapPinCategory; label: string; icon: string }> = [
  { id: 'ALL', label: 'All Wonders', icon: '✨' },
  { id: 'NATURAL_FEATURE', label: 'Waters & Mountains', icon: '🌊' },
  { id: 'ANIMAL', label: 'Animals', icon: '🪶' },
  { id: 'LANDMARK', label: 'Ancient Cities', icon: '🏛️' },
  { id: 'CITY', label: 'Capitals', icon: '🏙️' },
  { id: 'FOOD', label: 'Foods & Feasts', icon: '🍲' },
  { id: 'INSTRUMENT', label: 'Music', icon: '🎵' },
  { id: 'LANGUAGE', label: 'Languages', icon: '🗣️' },
  { id: 'SECRET', label: 'Hidden Secrets', icon: '🤫' }
];

export const ExploreAfrica: React.FC<ExploreAfricaProps> = ({
  onNavigatePillar,
  onPlayVoice,
  ageTier,
  initialSelectedEntityId
}) => {
  // Map Camera State
  const [currentZoom, setCurrentZoom] = useState<number>(1.1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);

  // Discovery & Selection State
  const [selectedPin, setSelectedPin] = useState<MapPinItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<MapPinCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedRegion, setHighlightedRegion] = useState<AfricanRegion | null>(null);

  // View Mode: 'MAP' (Interactive illustrated map) or 'GRID' (Card Index)
  const [viewMode, setViewMode] = useState<'MAP' | 'GRID'>('MAP');

  // Animated Menus / Overlays
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMissionsOpen, setIsMissionsOpen] = useState<boolean>(false);
  const [isSoundPavilionOpen, setIsSoundPavilionOpen] = useState<boolean>(false);

  const { setIsCurriculumOpen, isSchoolMode } = useSchoolMode();

  // Discovered pins saved in storage
  const [discoveredPinIds, setDiscoveredPinIds] = useState<string[]>([]);

  // Load discoveries from afroboxStorage
  useEffect(() => {
    const refreshDiscoveries = () => {
      const allDiscovered = afroboxStorage.getAllDiscoveries().map((d) => d.entityId);
      setDiscoveredPinIds(allDiscovered);
    };
    refreshDiscoveries();
  }, [selectedPin]);

  // Handle initialSelectedEntityId passed from stories or other pillars
  useEffect(() => {
    if (initialSelectedEntityId) {
      const match = MAP_PINS.find(
        (p) => p.id === initialSelectedEntityId || p.connectedStoryId === initialSelectedEntityId
      );
      if (match) {
        setSelectedPin(match);
        centerOnPin(match);
      }
    }
  }, [initialSelectedEntityId]);

  // Center camera smoothly onto a target pin
  const centerOnPin = (pin: MapPinItem) => {
    const targetZoom = Math.max(2.4, pin.minZoom + 0.3);
    setCurrentZoom(targetZoom);
    setPanX(500 - pin.x);
    setPanY(500 - pin.y);
    setSelectedPin(pin);
  };

  // Zoom controls
  const handleZoomIn = () => {
    const nextZoom = Math.min(4.2, currentZoom + 0.5);
    setCurrentZoom(nextZoom);
    audioEngine.playSoundEffect('zoom');
  };

  const handleZoomOut = () => {
    const nextZoom = Math.max(1.0, currentZoom - 0.5);
    setCurrentZoom(nextZoom);
    audioEngine.playSoundEffect('zoom');
    if (nextZoom <= 1.2) {
      setPanX(0);
      setPanY(0);
    }
  };

  const handleResetView = () => {
    setCurrentZoom(1.1);
    setPanX(0);
    setPanY(0);
    setHighlightedRegion(null);
    audioEngine.playSoundEffect('zoom');
  };

  // Quick jump to an African region
  const handleSelectRegion = (regionName: AfricanRegion | null) => {
    setHighlightedRegion(regionName);
    setIsFilterMenuOpen(false);
    if (!regionName) {
      handleResetView();
      return;
    }
    const regionDef = MAP_REGIONS.find((r) => r.id === regionName);
    if (regionDef) {
      setCurrentZoom(regionDef.targetZoom);
      setPanX(500 - regionDef.centerX);
      setPanY(500 - regionDef.centerY);
      audioEngine.playSoundEffect('zoom');
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    audioEngine.playSoundEffect('zoom');
    if (index === 0) {
      handleResetView();
    } else if (index === 1 && selectedPin) {
      handleSelectRegion(selectedPin.region);
    } else if (selectedPin) {
      centerOnPin(selectedPin);
    }
  };

  const handleSelectPin = (pin: MapPinItem) => {
    setSelectedPin(pin);
    if (currentZoom < pin.minZoom) {
      centerOnPin(pin);
    }
  };

  const activeCategoryObj = CATEGORY_CONFIG.find((c) => c.id === activeCategory);

  return (
    <div
      id="explore-africa-stage"
      className="relative w-full h-[calc(100dvh-4.2rem)] md:h-[calc(100dvh-5rem)] flex flex-col bg-[#FBF7EE] overflow-hidden select-none"
    >
      {/* Sleek Floating Top HUD Bar (Fits completely on screen without page scroll) */}
      <header className="z-30 bg-[#FBF7EE]/95 backdrop-blur-md border-b border-[#E6DCBF] px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 shrink-0">
        {/* Left: Module Title & Region Filter Badge */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#1D3E2F] to-[#2D5A43] flex items-center justify-center text-white shrink-0 shadow-2xs">
            <Compass className="w-4 h-4 text-[#FBF7EE]" />
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-[#23211E] font-['Urbanist'] truncate">
                Explore Africa
              </span>
              {isSchoolMode && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold border border-emerald-300">
                  <span>🏫</span>
                  <span>School Edition</span>
                </span>
              )}
            </div>

            {/* Subtitle / Active Region Quick Selector */}
            <div className="flex items-center gap-1 text-[11px] text-[#7C4728] font-bold truncate">
              <span>Region:</span>
              <button
                onClick={() => setIsFilterMenuOpen(true)}
                className="text-[#E25822] hover:underline flex items-center gap-0.5 truncate"
                title="Change Region"
              >
                <span>{highlightedRegion || 'All Africa (Whole Continent)'}</span>
                <ChevronDown className="w-3 h-3 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Center / Right: Action Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
              isSearchOpen || searchQuery
                ? 'bg-[#1D3E2F] text-white border-[#1D3E2F]'
                : 'bg-white hover:bg-[#F0E8D0] text-[#23211E] border-[#E6DCBF]'
            }`}
            title="Search Places & Wonders"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Animated Filter Drawer Trigger Button */}
          <button
            onClick={() => setIsFilterMenuOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
              activeCategory !== 'ALL'
                ? 'bg-[#E25822] text-white border-[#E25822] shadow-xs'
                : 'bg-white hover:bg-[#F0E8D0] text-[#23211E] border-[#E6DCBF]'
            }`}
            title="Filter by Categories & Regions"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {activeCategory !== 'ALL' ? activeCategoryObj?.label : 'Filter Wonders'}
            </span>
            <span className="sm:hidden">{activeCategoryObj?.icon || '✨'}</span>
          </button>

          {/* Scavenger Quests / Explorer Missions Button */}
          <button
            onClick={() => {
              audioEngine.playSoundEffect('chime');
              setIsMissionsOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E25822] to-[#D9822B] text-white text-xs font-extrabold shadow-2xs hover:brightness-105 transition-all"
            title="Explorer Missions"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Missions</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full font-black">
              {discoveredPinIds.length}/{MAP_PINS.length}
            </span>
          </button>

          {/* Instruments & Accents Sound Studio */}
          <button
            onClick={() => {
              setIsSoundPavilionOpen(true);
              audioEngine.playSoundEffect('kora');
            }}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#23211E] text-xs font-extrabold transition-all"
            title="African Instruments & Voice Accents"
          >
            <span className="text-sm">🎵</span>
            <span className="hidden lg:inline ml-1.5">Instruments</span>
          </button>

          {/* Teacher & Curriculum Notes for Schools */}
          <button
            onClick={() => setIsCurriculumOpen(true)}
            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold transition-all"
            title="Classroom Lesson Alignment & Teacher Notes"
          >
            <GraduationCap className="w-4 h-4" />
          </button>

          {/* View Switcher: Map vs Grid */}
          <div className="flex items-center bg-[#F0E8D0] p-0.5 rounded-xl border border-[#E0D4B2]">
            <button
              onClick={() => {
                setViewMode('MAP');
                audioEngine.playSoundEffect('zoom');
              }}
              className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
                viewMode === 'MAP'
                  ? 'bg-[#1D3E2F] text-white shadow-2xs'
                  : 'text-[#7C4728] hover:text-[#23211E]'
              }`}
              title="Interactive Map View"
            >
              <MapIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setViewMode('GRID');
                audioEngine.playSoundEffect('chime');
              }}
              className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
                viewMode === 'GRID'
                  ? 'bg-[#1D3E2F] text-white shadow-2xs'
                  : 'text-[#7C4728] hover:text-[#23211E]'
              }`}
              title="Card Index Explorer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Animated Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-14 inset-x-3 sm:inset-x-6 z-40 bg-[#FBF7EE] border-2 border-[#E6DCBF] rounded-2xl p-2.5 shadow-xl animate-in slide-in-from-top duration-200 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#7C4728] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search African landmarks, rivers, animals, music (e.g. Nile, Gorilla, Kora)..."
            className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-[#23211E] placeholder:text-[#7C4728]/70 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#7C4728] hover:text-[#23211E] px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg hover:bg-stone-200 text-[#7C4728]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {viewMode === 'MAP' ? (
          <div className="relative w-full h-full">
            {/* SVG Map Canvas (Fills entire stage) */}
            <AfricaMapCanvas
              currentZoom={currentZoom}
              panX={panX}
              panY={panY}
              onPanChange={(x, y) => {
                setPanX(x);
                setPanY(y);
              }}
              onZoomChange={setCurrentZoom}
              selectedPin={selectedPin}
              onSelectPin={handleSelectPin}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              highlightedRegion={highlightedRegion}
              onSelectRegion={handleSelectRegion}
              discoveredPinIds={discoveredPinIds}
              className="w-full h-full rounded-none border-none"
            />

            {/* Floating Tactile Zoom HUD (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col items-center gap-1.5 bg-[#FBF7EE]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#E0D4B2] shadow-lg">
              <button
                id="map-zoom-in-btn"
                onClick={handleZoomIn}
                className="p-2 rounded-xl bg-white hover:bg-[#F0E8D0] text-[#23211E] shadow-2xs transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="text-[10px] font-mono font-bold text-[#7C4728] py-0.5">
                {currentZoom.toFixed(1)}x
              </div>

              <button
                id="map-zoom-out-btn"
                onClick={handleZoomOut}
                className="p-2 rounded-xl bg-white hover:bg-[#F0E8D0] text-[#23211E] shadow-2xs transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="w-3.5 border-t border-[#E0D4B2]" />

              <button
                id="map-reset-btn"
                onClick={handleResetView}
                className="p-2 rounded-xl bg-white hover:bg-[#F0E8D0] text-[#7C4728] hover:text-[#23211E] shadow-2xs transition-colors"
                title="Reset to Full Continent"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Classroom / Touch Interaction Tip (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-2 bg-[#FBF7EE]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E0D4B2] text-[11px] font-semibold text-[#7C4728] shadow-xs pointer-events-none">
              <span>💡 Touch or drag map to pan • Pinch or double-tap to zoom in</span>
            </div>

            {/* ====================================================================== */}
            {/* ZERO-SCROLL DISCOVERY CARD OVERLAY                                      */}
            {/* Desktop: Smooth Right-Side Overlay Drawer                               */}
            {/* Mobile: Smooth Slide-Up Bottom Sheet with Dimmed Backdrop               */}
            {/* ====================================================================== */}
            {selectedPin && (
              <>
                {/* Mobile Backdrop (Click to dismiss) */}
                <div
                  className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
                  onClick={() => setSelectedPin(null)}
                />

                {/* Overlay Container: Never pushes or scrolls the screen! */}
                <div className="fixed inset-x-0 bottom-0 z-50 lg:absolute lg:inset-auto lg:top-3 lg:right-3 lg:bottom-3 lg:w-[450px] lg:max-w-[calc(100%-2rem)]">
                  <DiscoveryCardDrawer
                    pin={selectedPin}
                    onClose={() => setSelectedPin(null)}
                    onNavigatePillar={onNavigatePillar}
                    onSelectPin={handleSelectPin}
                    onBreadcrumbClick={handleBreadcrumbClick}
                    onPlayVoice={onPlayVoice}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          /* Accessible Card Index View (Self-contained scroll inside stage) */
          <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
              <span>Showing all {MAP_PINS.length} wonders across Africa</span>
              <span>Tap any card to view location</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {MAP_PINS.map((pin) => {
                const isDiscovered = discoveredPinIds.includes(pin.id);
                return (
                  <button
                    key={pin.id}
                    onClick={() => {
                      setSelectedPin(pin);
                      setViewMode('MAP');
                      centerOnPin(pin);
                      audioEngine.playSoundEffect(pin.soundType);
                    }}
                    className="p-3.5 rounded-2xl bg-white hover:bg-[#FBF7EE] border-2 border-[#E6DCBF] hover:border-[#1D3E2F] text-left transition-all shadow-2xs hover:shadow-md group flex flex-col justify-between h-44"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl filter drop-shadow-2xs"
                        style={{ backgroundColor: pin.badgeBg }}
                      >
                        {pin.icon}
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#F0E8D0] text-[#7C4728]">
                        {pin.region}
                      </span>
                    </div>

                    <div>
                      <div className="font-extrabold text-sm text-[#23211E] font-['Urbanist'] group-hover:text-[#1D3E2F] truncate">
                        {pin.name}
                      </div>
                      <div className="text-[11px] text-[#7C4728] font-medium line-clamp-1 mt-0.5">
                        {pin.country} • {pin.tagline}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-[#1D3E2F] pt-2 border-t border-[#F0E8D0] w-full">
                      <span>View on map 🧭</span>
                      {isDiscovered && <span className="text-emerald-700">✓ Saved</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================================== */}
      {/* ANIMATED FILTER OVERLAY MODAL / SHEET                                   */}
      {/* Lets user jump to region or filter categories without cluttering layout */}
      {/* ======================================================================== */}
      {isFilterMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsFilterMenuOpen(false)}
        >
          <div
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-lg w-full p-5 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6DCBF] pb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#E25822]" />
                <h3 className="font-extrabold text-base text-[#23211E] font-['Urbanist']">
                  Filter Wonders & Jump to Region
                </h3>
              </div>
              <button
                onClick={() => setIsFilterMenuOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-200 text-[#23211E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Region Quick Jump */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
                Select African Region:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleSelectRegion(null)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5 ${
                    highlightedRegion === null
                      ? 'bg-[#1D3E2F] text-white shadow-xs'
                      : 'bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#23211E]'
                  }`}
                >
                  <span>🌍</span>
                  <span>All Africa</span>
                </button>
                {MAP_REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRegion(r.id)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5 ${
                      highlightedRegion === r.id
                        ? 'bg-[#1D3E2F] text-white shadow-xs'
                        : 'bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#23211E]'
                    }`}
                  >
                    <span>{r.icon}</span>
                    <span className="truncate">{r.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
                Filter by Wonder Type:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORY_CONFIG.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsFilterMenuOpen(false);
                      audioEngine.playSoundEffect('chime');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5 ${
                      activeCategory === cat.id
                        ? 'bg-[#E25822] text-white shadow-xs'
                        : 'bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#23211E]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset All */}
            <div className="pt-2 border-t border-[#E6DCBF] flex justify-end">
              <button
                onClick={() => {
                  setActiveCategory('ALL');
                  setHighlightedRegion(null);
                  handleResetView();
                  setIsFilterMenuOpen(false);
                }}
                className="text-xs font-bold text-[#E25822] hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explorer Missions Scavenger Hunt Modal */}
      {isMissionsOpen && (
        <ScavengerHuntModal
          onClose={() => setIsMissionsOpen(false)}
          onLocatePin={(targetPin) => {
            setViewMode('MAP');
            centerOnPin(targetPin);
          }}
          discoveredPinIds={discoveredPinIds}
        />
      )}

      {/* Instruments & Accents Sound Pavilion Modal */}
      <SoundPavilionModal
        isOpen={isSoundPavilionOpen}
        onClose={() => setIsSoundPavilionOpen(false)}
      />

      {/* School Curriculum & Teacher Guide Modal */}
      <CurriculumGuideModal />
    </div>
  );
};
