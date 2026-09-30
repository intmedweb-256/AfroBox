import React, { useRef, useState, useEffect } from 'react';
import { MapPinItem, MAP_PINS, AfricanRegion, MAP_REGIONS } from '../../data/mapData';
import { audioEngine } from '../../services/audioEngine';

interface AfricaMapCanvasProps {
  currentZoom: number;
  panX: number;
  panY: number;
  onPanChange: (x: number, y: number) => void;
  onZoomChange: (zoom: number) => void;
  selectedPin: MapPinItem | null;
  onSelectPin: (pin: MapPinItem) => void;
  activeCategory: string;
  searchQuery: string;
  highlightedRegion: AfricanRegion | null;
  onSelectRegion: (region: AfricanRegion) => void;
  discoveredPinIds: string[];
  className?: string;
}

export const AfricaMapCanvas: React.FC<AfricaMapCanvasProps> = ({
  currentZoom,
  panX,
  panY,
  onPanChange,
  onZoomChange,
  selectedPin,
  onSelectPin,
  activeCategory,
  searchQuery,
  highlightedRegion,
  onSelectRegion,
  discoveredPinIds,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredRegion, setHoveredRegion] = useState<AfricanRegion | null>(null);

  // Filter pins based on active category and search
  const visiblePins = MAP_PINS.filter((pin) => {
    if (activeCategory !== 'ALL' && pin.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = pin.name.toLowerCase().includes(q);
      const matchCountry = pin.country.toLowerCase().includes(q);
      const matchLocal = pin.localName?.toLowerCase().includes(q);
      const matchTagline = pin.tagline.toLowerCase().includes(q);
      const matchCity = pin.city?.toLowerCase().includes(q);
      if (!matchName && !matchCountry && !matchLocal && !matchTagline && !matchCity) {
        return false;
      }
    }
    return true;
  });

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag if left click or touch
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Constrain panning within reasonable bounds based on zoom
    const maxPan = (currentZoom - 1) * 450 + 200;
    const constrainedX = Math.max(-maxPan, Math.min(maxPan, newX));
    const constrainedY = Math.max(-maxPan, Math.min(maxPan, newY));

    onPanChange(constrainedX, constrainedY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.25 : -0.25;
    const newZoom = Math.min(4.2, Math.max(1.0, currentZoom + zoomDelta));
    if (newZoom !== currentZoom) {
      audioEngine.playSoundEffect('zoom');
      onZoomChange(newZoom);
    }
  };

  // Double click / Double tap to zoom in
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentZoom < 3.2) {
      audioEngine.playSoundEffect('zoom');
      onZoomChange(Math.min(4.0, currentZoom + 1.2));
    } else {
      audioEngine.playSoundEffect('zoom');
      onZoomChange(1.0);
      onPanChange(0, 0);
    }
  };

  const handlePinClick = (e: React.MouseEvent, pin: MapPinItem) => {
    e.stopPropagation();
    audioEngine.playSoundEffect(pin.soundType || 'chime');
    onSelectPin(pin);
  };

  const handleRegionClick = (e: React.MouseEvent, region: AfricanRegion) => {
    e.stopPropagation();
    audioEngine.playSoundEffect('zoom');
    onSelectRegion(region);
  };

  return (
    <div
      ref={containerRef}
      id="africa-map-viewport"
      className={`relative w-full ${className || 'h-[580px] sm:h-[680px] md:h-[750px]'} bg-gradient-to-b from-[#A3D0E8] via-[#B8E1F2] to-[#88BFDD] rounded-3xl overflow-hidden shadow-inner select-none cursor-grab active:cursor-grabbing border-4 border-[#E0D4B2]`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
    >
      {/* Animated Surrounding Ocean Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        {/* Atlantic waves */}
        <div className="absolute top-[35%] left-[8%] animate-pulse">
          <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
            <path d="M0 15 Q25 5 50 15 T100 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute top-[65%] left-[12%] animate-pulse" style={{ animationDelay: '1.2s' }}>
          <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
            <path d="M0 15 Q30 5 60 15 T120 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        {/* Indian Ocean waves */}
        <div className="absolute top-[48%] right-[8%] animate-pulse" style={{ animationDelay: '0.8s' }}>
          <svg width="110" height="30" viewBox="0 0 110 30" fill="none">
            <path d="M0 15 Q27 5 55 15 T110 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute top-[75%] right-[16%] animate-pulse" style={{ animationDelay: '1.7s' }}>
          <svg width="90" height="30" viewBox="0 0 90 30" fill="none">
            <path d="M0 15 Q22 5 45 15 T90 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Floating Ocean Life: Swimming Whale */}
      <div
        className="absolute top-[82%] right-[10%] pointer-events-none transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translate(${panX * 0.2}px, ${panY * 0.2}px)`
        }}
      >
        <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity animate-bounce" style={{ animationDuration: '4s' }}>
          <span className="text-3xl filter drop-shadow-md">🐋</span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-900 bg-white/70 px-2 py-0.5 rounded-full shadow-2xs">
            Humpback Whale
          </span>
        </div>
      </div>

      {/* Floating Ocean Life: Playful Dolphin */}
      <div
        className="absolute top-[32%] left-[4%] pointer-events-none transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translate(${panX * 0.2}px, ${panY * 0.2}px)`
        }}
      >
        <div className="flex items-center gap-1 opacity-80 animate-pulse" style={{ animationDuration: '3s' }}>
          <span className="text-2xl filter drop-shadow-md">🐬</span>
          <span className="text-[9px] font-extrabold text-blue-900 bg-white/60 px-1.5 py-0.5 rounded-full">
            Atlantic Dolphin
          </span>
        </div>
      </div>

      {/* Animated Clouds drifting across the sky */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[15%] opacity-70 animate-pulse" style={{ animationDuration: '7s' }}>
          <span className="text-4xl filter drop-shadow-xs">☁️</span>
        </div>
        <div className="absolute top-28 right-[20%] opacity-60 animate-pulse" style={{ animationDuration: '9s' }}>
          <span className="text-5xl filter drop-shadow-xs">☁️</span>
        </div>
        <div className="absolute bottom-20 left-[25%] opacity-50 animate-pulse" style={{ animationDuration: '8s' }}>
          <span className="text-4xl filter drop-shadow-xs">☁️</span>
        </div>
      </div>

      {/* Primary SVG Africa Map Plane */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out origin-center"
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${currentZoom})`
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full max-w-[560px] sm:max-w-[680px] lg:max-w-[760px] h-auto max-h-[85vh] aspect-square overflow-visible filter drop-shadow-2xl"
        >
          <defs>
            {/* Sahara Desert Gradient */}
            <linearGradient id="saharaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D076" />
              <stop offset="50%" stopColor="#E6B450" />
              <stop offset="100%" stopColor="#D99B38" />
            </linearGradient>

            {/* West Africa Savanna Gradient */}
            <linearGradient id="westGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9B25F" />
              <stop offset="60%" stopColor="#7E9F45" />
              <stop offset="100%" stopColor="#467B34" />
            </linearGradient>

            {/* Congo Rainforest Gradient */}
            <linearGradient id="congoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#255A2C" />
              <stop offset="50%" stopColor="#1B4920" />
              <stop offset="100%" stopColor="#133617" />
            </linearGradient>

            {/* East Africa Savannah & Rift Gradient */}
            <linearGradient id="eastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C99E52" />
              <stop offset="50%" stopColor="#A88B42" />
              <stop offset="100%" stopColor="#6C8436" />
            </linearGradient>

            {/* Southern Africa Gradient */}
            <linearGradient id="southGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B7F43" />
              <stop offset="60%" stopColor="#5B7E48" />
              <stop offset="100%" stopColor="#3B5A33" />
            </linearGradient>

            {/* Madagascar Gradient */}
            <linearGradient id="madagascarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C85A32" />
              <stop offset="100%" stopColor="#8A4A28" />
            </linearGradient>

            {/* River Flow Animation Pattern */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ocean Shadow / Shoreline Outline */}
          <path
            d="M 230 180 
               C 300 130, 480 110, 560 140 
               C 620 160, 720 140, 790 190 
               C 830 220, 835 270, 780 320 
               C 760 350, 820 400, 880 440 
               C 920 480, 870 540, 810 540 
               C 780 580, 760 640, 750 710 
               C 730 780, 680 870, 640 920 
               C 600 960, 540 965, 500 930 
               C 460 880, 470 780, 450 700 
               C 430 640, 420 590, 360 550 
               C 280 530, 190 530, 160 480 
               C 130 430, 120 370, 160 320 
               C 190 280, 180 230, 230 180 Z"
            fill="#80B8D6"
            opacity="0.4"
            transform="scale(1.025) translate(-12, -10)"
          />

          {/* ============================================================ */}
          {/* CONTINENTAL REGIONAL SECTORS (Interactive Tap & Hover Zones) */}
          {/* ============================================================ */}

          {/* 1. NORTH AFRICA (Sahara, Nile, Atlas, Mediterranean) */}
          <g
            id="region-north-africa"
            className="cursor-pointer transition-all duration-300 group"
            onClick={(e) => handleRegionClick(e, 'North Africa')}
            onMouseEnter={() => setHoveredRegion('North Africa')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 230 180 
                 C 300 130, 480 110, 560 140 
                 C 620 160, 720 140, 790 190 
                 C 830 220, 835 270, 780 320 
                 C 740 350, 680 370, 600 370 
                 C 500 370, 380 360, 280 350 
                 C 190 340, 180 250, 230 180 Z"
              fill="url(#saharaGrad)"
              stroke={
                highlightedRegion === 'North Africa' || hoveredRegion === 'North Africa'
                  ? '#FFFFFF'
                  : '#B88B2A'
              }
              strokeWidth={highlightedRegion === 'North Africa' ? '5' : '2.5'}
              className="transition-all"
            />
            {/* Sahara Dune Ripples (Decorative) */}
            <path
              d="M 320 220 Q 380 205 450 225 M 480 230 Q 550 215 620 235 M 360 260 Q 430 245 510 265 M 540 270 Q 610 255 690 275"
              stroke="#D89A2B"
              strokeWidth="1.8"
              fill="none"
              opacity="0.6"
            />
            {/* Atlas Mountain Peaks */}
            <path
              d="M 250 185 L 265 165 L 280 185 L 295 168 L 310 185"
              stroke="#8B572A"
              strokeWidth="2"
              fill="#A76D38"
            />
          </g>

          {/* 2. WEST AFRICA (Senegal to Nigeria, Niger Basin) */}
          <g
            id="region-west-africa"
            className="cursor-pointer transition-all duration-300 group"
            onClick={(e) => handleRegionClick(e, 'West Africa')}
            onMouseEnter={() => setHoveredRegion('West Africa')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 160 320 
                 C 200 330, 280 350, 420 370 
                 C 440 430, 450 490, 440 540 
                 C 380 545, 290 540, 190 520 
                 C 140 470, 120 400, 160 320 Z"
              fill="url(#westGrad)"
              stroke={
                highlightedRegion === 'West Africa' || hoveredRegion === 'West Africa'
                  ? '#FFFFFF'
                  : '#4F7C32'
              }
              strokeWidth={highlightedRegion === 'West Africa' ? '5' : '2.5'}
              className="transition-all"
            />
            {/* Coastal Palm Grove Icons */}
            <text x="210" y="490" fontSize="16" className="pointer-events-none opacity-80">🌴</text>
            <text x="330" y="520" fontSize="16" className="pointer-events-none opacity-80">🌴</text>
          </g>

          {/* 3. CENTRAL AFRICA (Congo Basin & Rainforest) */}
          <g
            id="region-central-africa"
            className="cursor-pointer transition-all duration-300 group"
            onClick={(e) => handleRegionClick(e, 'Central Africa')}
            onMouseEnter={() => setHoveredRegion('Central Africa')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 420 370 
                 C 500 370, 580 380, 620 420 
                 C 630 480, 640 550, 620 620 
                 C 550 630, 480 640, 450 660 
                 C 430 580, 435 480, 420 370 Z"
              fill="url(#congoGrad)"
              stroke={
                highlightedRegion === 'Central Africa' || hoveredRegion === 'Central Africa'
                  ? '#FFFFFF'
                  : '#163E19'
              }
              strokeWidth={highlightedRegion === 'Central Africa' ? '5' : '2.5'}
              className="transition-all"
            />
            {/* Rainforest Canopy Tree Textures */}
            <text x="480" y="460" fontSize="18" className="pointer-events-none opacity-70">🌳</text>
            <text x="540" y="510" fontSize="18" className="pointer-events-none opacity-70">🌳</text>
            <text x="500" y="560" fontSize="18" className="pointer-events-none opacity-70">🌴</text>
          </g>

          {/* 4. EAST AFRICA (Horn of Africa, Great Lakes, Rift Valley) */}
          <g
            id="region-east-africa"
            className="cursor-pointer transition-all duration-300 group"
            onClick={(e) => handleRegionClick(e, 'East Africa')}
            onMouseEnter={() => setHoveredRegion('East Africa')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 600 370 
                 C 680 370, 740 350, 780 320 
                 C 810 360, 850 410, 880 440 
                 C 920 480, 870 540, 810 540 
                 C 780 580, 760 630, 740 670 
                 C 670 670, 630 650, 620 620 
                 C 640 550, 630 480, 620 420 
                 C 615 390, 610 380, 600 370 Z"
              fill="url(#eastGrad)"
              stroke={
                highlightedRegion === 'East Africa' || hoveredRegion === 'East Africa'
                  ? '#FFFFFF'
                  : '#8C6E2D'
              }
              strokeWidth={highlightedRegion === 'East Africa' ? '5' : '2.5'}
              className="transition-all"
            />
            {/* Acacia Savanna Tree */}
            <text x="740" y="470" fontSize="16" className="pointer-events-none opacity-80">🦒</text>
            <text x="790" y="520" fontSize="15" className="pointer-events-none opacity-80">🦓</text>
          </g>

          {/* 5. SOUTHERN AFRICA (Zambezi, Kalahari, Drakensberg, Cape) */}
          <g
            id="region-southern-africa"
            className="cursor-pointer transition-all duration-300 group"
            onClick={(e) => handleRegionClick(e, 'Southern Africa')}
            onMouseEnter={() => setHoveredRegion('Southern Africa')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 450 660 
                 C 480 640, 550 630, 620 620 
                 C 630 650, 670 670, 740 670 
                 C 730 740, 680 840, 640 920 
                 C 600 960, 540 965, 500 930 
                 C 460 880, 470 780, 450 700 Z"
              fill="url(#southGrad)"
              stroke={
                highlightedRegion === 'Southern Africa' || hoveredRegion === 'Southern Africa'
                  ? '#FFFFFF'
                  : '#3F5927'
              }
              strokeWidth={highlightedRegion === 'Southern Africa' ? '5' : '2.5'}
              className="transition-all"
            />
            {/* Southern Wildlife & Baobab */}
            <text x="530" y="760" fontSize="16" className="pointer-events-none opacity-80">🌳</text>
            <text x="590" y="820" fontSize="16" className="pointer-events-none opacity-80">🦁</text>
          </g>

          {/* 6. MADAGASCAR (The Red Island) */}
          <g
            id="region-madagascar"
            className="cursor-pointer transition-all duration-300 group"
            onClick={(e) => handleRegionClick(e, 'Southern Africa')}
          >
            <path
              d="M 830 680 
                 C 860 670, 875 730, 870 800 
                 C 860 840, 840 880, 820 860 
                 C 805 840, 810 780, 820 720 Z"
              fill="url(#madagascarGrad)"
              stroke={hoveredRegion === 'Southern Africa' ? '#FFFFFF' : '#68321B'}
              strokeWidth="2.5"
            />
            <text x="825" y="770" fontSize="14" className="pointer-events-none">🐒</text>
            <text
              x="840"
              y="885"
              fontSize="11"
              fill="#23211E"
              fontWeight="bold"
              textAnchor="middle"
              className="pointer-events-none"
            >
              Madagascar
            </text>
          </g>

          {/* ============================================================ */}
          {/* THE GREAT RIVERS (Animated Flowing Blue Arteries)            */}
          {/* ============================================================ */}

          {/* The Great River Nile: From Lake Victoria to Mediterranean */}
          <path
            d="M 685 540 
               C 670 480, 680 420, 690 360 
               C 700 310, 715 260, 720 200 
               C 725 180, 710 160, 730 150"
            stroke="#2A729A"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="8 4"
            className="animate-[dash_20s_linear_infinite]"
          />

          {/* The Congo River Arc */}
          <path
            d="M 610 600 
               C 560 520, 520 480, 480 500 
               C 440 520, 430 570, 410 610"
            stroke="#2A729A"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 3"
          />

          {/* The Niger River Curve */}
          <path
            d="M 210 440 
               C 250 400, 310 390, 350 410 
               C 380 430, 410 470, 415 540"
            stroke="#2A729A"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* The Zambezi River to Victoria Falls */}
          <path
            d="M 520 680 
               C 570 700, 600 715, 660 720 
               C 700 725, 730 710, 745 700"
            stroke="#2A729A"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================ */}
          {/* THE GREAT LAKES (Glistening Freshwater Inland Seas)          */}
          {/* ============================================================ */}

          {/* Lake Victoria (Heart of East Africa) */}
          <g className="cursor-pointer" onClick={(e) => {
            const pin = MAP_PINS.find(p => p.id === 'pin-lake-victoria');
            if (pin) handlePinClick(e, pin);
          }}>
            <ellipse
              cx="685"
              cy="540"
              rx="32"
              ry="24"
              fill="#2A729A"
              stroke="#E0F2FE"
              strokeWidth="2"
              className="hover:scale-110 transition-transform"
            />
            {/* Shimmering wave glints inside Lake Victoria */}
            <path
              d="M 665 538 Q 675 534 685 538 T 705 538"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              fill="none"
              opacity="0.8"
              className="animate-pulse"
            />
            <path
              d="M 670 545 Q 682 542 695 545"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              fill="none"
              opacity="0.7"
            />
          </g>

          {/* Lake Tanganyika (Long Rift Lake) */}
          <path
            d="M 650 560 C 645 600, 640 640, 638 670"
            stroke="#2A729A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lake Malawi (Nyasa) */}
          <path
            d="M 685 680 C 690 710, 692 740, 690 760"
            stroke="#2A729A"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lake Chad (Sahel) */}
          <ellipse cx="490" cy="390" rx="14" ry="10" fill="#2A729A" opacity="0.8" />

          {/* Animated Boats on Waters */}
          {/* Nile Felucca */}
          <g transform="translate(710, 240)" className="pointer-events-none">
            <text fontSize="14">⛵</text>
          </g>
          {/* Zanzibar Dhow in Indian Ocean */}
          <g
            transform="translate(775, 615)"
            className="cursor-pointer hover:scale-125 transition-transform"
            onClick={(e) => {
              const pin = MAP_PINS.find(p => p.id === 'pin-secret-zanzibar-dhow');
              if (pin) handlePinClick(e, pin);
            }}
          >
            <text fontSize="18">⛵</text>
          </g>

          {/* Mount Kilimanjaro Mountain Icon with Snowy Peak */}
          <g transform="translate(715, 595)" className="cursor-pointer" onClick={(e) => {
            const pin = MAP_PINS.find(p => p.id === 'pin-kilimanjaro');
            if (pin) handlePinClick(e, pin);
          }}>
            <path d="M 0 15 L 14 -8 L 28 15 Z" fill="#4B382A" />
            <path d="M 9 0 L 14 -8 L 19 0 Z" fill="#FFFFFF" />
          </g>

          {/* Great Pyramids of Giza */}
          <g transform="translate(705, 195)" className="cursor-pointer" onClick={(e) => {
            const pin = MAP_PINS.find(p => p.id === 'pin-pyramids-giza');
            if (pin) handlePinClick(e, pin);
          }}>
            <polygon points="0,16 12,-4 24,16" fill="#D9822B" stroke="#B86D1E" strokeWidth="1" />
            <polygon points="18,16 28,2 38,16" fill="#F5C065" stroke="#B86D1E" strokeWidth="1" />
          </g>

          {/* ============================================================ */}
          {/* DYNAMIC PINS LAYER (Zoom & Discover Signature Mechanic)       */}
          {/* ============================================================ */}
          {visiblePins.map((pin) => {
            const isDiscovered = discoveredPinIds.includes(pin.id);
            const isSelected = selectedPin?.id === pin.id;
            const isVisibleAtZoom = currentZoom >= pin.minZoom;

            // If zoomed out, either hide or show as tiny curiosity beacon if nearby threshold
            if (!isVisibleAtZoom) {
              // If within 0.6 zoom from revealing, show a tiny pulsing curiosity sparkle!
              if (currentZoom >= pin.minZoom - 0.7) {
                return (
                  <g
                    key={`sparkle-${pin.id}`}
                    transform={`translate(${pin.x}, ${pin.y})`}
                    className="cursor-pointer animate-pulse"
                    onClick={() => {
                      onZoomChange(Math.min(4.0, pin.minZoom + 0.3));
                      onPanChange(500 - pin.x, 500 - pin.y);
                      audioEngine.playSoundEffect('zoom');
                    }}
                  >
                    <circle r="4" fill="#FFFFFF" opacity="0.9" />
                    <circle r="8" fill={pin.badgeBg} opacity="0.4" className="animate-ping" />
                  </g>
                );
              }
              return null;
            }

            // Size scales inversely with zoom so pins remain pleasant & legible without overwhelming
            const pinScale = Math.max(0.75, Math.min(1.2, 1.4 / Math.sqrt(currentZoom)));

            return (
              <g
                key={pin.id}
                id={`map-pin-${pin.id}`}
                transform={`translate(${pin.x}, ${pin.y}) scale(${pinScale})`}
                className="cursor-pointer group transition-all duration-300"
                onClick={(e) => handlePinClick(e, pin)}
              >
                {/* Active Selection Glow Ring */}
                {isSelected && (
                  <circle
                    r="26"
                    fill="none"
                    stroke="#E25822"
                    strokeWidth="4"
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ animationDuration: '8s' }}
                  />
                )}

                {/* Pin Shadow */}
                <ellipse cx="0" cy="18" rx="14" ry="5" fill="#000000" opacity="0.25" />

                {/* Main Illustrated Badge Pill */}
                <g className="transition-transform group-hover:scale-125 group-active:scale-95 duration-200">
                  <circle
                    r="18"
                    fill={pin.badgeBg}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="filter drop-shadow-md"
                  />

                  {/* Pin Emoji / Icon */}
                  <text
                    x="0"
                    y="6"
                    fontSize="18"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {pin.icon}
                  </text>

                  {/* Discovered Checkmark Badge */}
                  {isDiscovered && (
                    <circle cx="12" cy="-12" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  )}
                  {isDiscovered && (
                    <text
                      x="12"
                      y="-9"
                      fontSize="8"
                      fill="#FFFFFF"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      ✓
                    </text>
                  )}

                  {/* Secret Marker Sparkle */}
                  {pin.isSecret && (
                    <circle cx="-12" cy="-12" r="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  )}
                  {pin.isSecret && (
                    <text
                      x="-12"
                      y="-9"
                      fontSize="7"
                      fill="#FFFFFF"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      ★
                    </text>
                  )}
                </g>

                {/* Friendly Label Pill (Appears clearly on medium/high zoom or on hover) */}
                <g
                  transform="translate(0, 28)"
                  className={`${
                    currentZoom >= 2.0 || isSelected
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-200 pointer-events-none`}
                >
                  <rect
                    x="-45"
                    y="0"
                    width="90"
                    height="18"
                    rx="9"
                    fill="#23211E"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="12"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill="#FFFFFF"
                    textAnchor="middle"
                    className="font-['Urbanist']"
                  >
                    {pin.name.split('(')[0].trim().slice(0, 14)}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Exploration Level Indicator Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#FBF7EE]/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#E0D4B2] shadow-sm text-xs font-bold text-[#23211E]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E25822] animate-ping" />
        <span>
          {currentZoom < 1.6
            ? 'Level 1: Continental View 🌍'
            : currentZoom < 2.5
            ? 'Level 2: Regional View 🗺️'
            : 'Level 3: Deep Discovery 🔍'}
        </span>
        <span className="text-[#7C4728] font-normal hidden sm:inline">
          (Zoom: {currentZoom.toFixed(1)}x)
        </span>
      </div>
    </div>
  );
};
