import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Compass,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { MapPinCategory, MAP_REGIONS, AfricanRegion } from '../../data/mapData';
import { audioEngine } from '../../services/audioEngine';

interface MapControlsProps {
  currentZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  activeCategory: MapPinCategory;
  onSelectCategory: (category: MapPinCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeRegion: AfricanRegion | null;
  onSelectRegion: (region: AfricanRegion) => void;
  totalDiscoveredCount: number;
  totalPinsCount: number;
  onOpenMissions: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  currentZoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeRegion,
  onSelectRegion,
  totalDiscoveredCount,
  totalPinsCount,
  onOpenMissions
}) => {
  const categoryFilters: Array<{ id: MapPinCategory; label: string; icon: string }> = [
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

  return (
    <div className="space-y-3.5">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#F0E8D0]/80 p-3 rounded-2xl border border-[#E0D4B2]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#7C4728] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="map-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search any place, animal, food, kora, or language (e.g., Lake Victoria, Jollof)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs sm:text-sm text-[#23211E] placeholder:text-[#7C4728]/60 focus:outline-none focus:ring-2 focus:ring-[#1D3E2F]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7C4728] hover:text-[#23211E]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Wonder Trails & Scavenger Quests Action Button */}
        <div className="flex items-center gap-2">
          <button
            id="open-missions-btn"
            onClick={() => {
              audioEngine.playSoundEffect('chime');
              onOpenMissions();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E25822] to-[#D9822B] text-white text-xs font-extrabold shadow-sm hover:brightness-105 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Explorer Missions</span>
          </button>

          {/* Progress Tracker Pill */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs font-bold text-[#23211E]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {totalDiscoveredCount} / {totalPinsCount} Discovered
            </span>
          </div>
        </div>
      </div>

      {/* Regional Quick Navigation Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7C4728] shrink-0">
          Jump to Region:
        </span>

        <button
          onClick={() => {
            audioEngine.playSoundEffect('zoom');
            onResetView();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            activeRegion === null
              ? 'bg-[#1D3E2F] text-white shadow-xs'
              : 'bg-white/80 hover:bg-white text-[#23211E] border border-[#E6DCBF]'
          }`}
        >
          <span>🌍</span>
          <span>All Africa</span>
        </button>

        {MAP_REGIONS.map((region) => {
          const isActive = activeRegion === region.id;
          return (
            <button
              key={region.id}
              onClick={() => {
                audioEngine.playSoundEffect('zoom');
                onSelectRegion(region.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1D3E2F] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#23211E] border border-[#E6DCBF]'
              }`}
            >
              <span>{region.icon}</span>
              <span>{region.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categoryFilters.map((cat) => {
          const isCurrent = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`filter-pill-${cat.id}`}
              onClick={() => {
                audioEngine.playSoundEffect('chime');
                onSelectCategory(cat.id);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                isCurrent
                  ? 'bg-[#E25822] text-white shadow-xs'
                  : 'bg-[#F0E8D0] hover:bg-white text-[#7C4728] border border-[#E0D4B2]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
