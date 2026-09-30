import React, { useState } from 'react';
import { Story } from '../types/story';

export type DrawingStyleId =
  | 'ANANSE_FOREST'
  | 'BAOBAB_SUNSET'
  | 'LAKE_VICTORIA_MIST'
  | 'RIFT_VALLEY_STORM'
  | 'VILLAGE_FIRESIDE'
  | 'MARKETPLACE_COLORS'
  | 'DESERT_CARAVAN'
  | 'COASTAL_DHOW'
  // UGANDAN SPOTLIGHT STYLES
  | 'CHWEZI_CRATER_LAKE'
  | 'GANDA_KASUBI_DOME'
  | 'KINTU_NAMBI_LADDER'
  | 'LANGO_OTUKE_SAVANNA'
  | 'GISU_ELGON_KADODI'
  // PAN-AFRICAN TRADITIONS
  | 'YORUBA_ILE_IFE'
  | 'ZULU_DRAKENSBERG'
  | 'KIKUYU_KIRINYAGA'
  | 'ASHANTI_GOLDEN_STOOL';

export interface DrawingStyleMeta {
  id: DrawingStyleId;
  name: string;
  description: string;
  palette: string;
  region: string;
  tradition: string;
}

export const DRAWING_STYLES: DrawingStyleMeta[] = [
  // Ugandan Traditions
  {
    id: 'CHWEZI_CRATER_LAKE',
    name: 'Bachwezi Emerald Crater Lake',
    description: 'Misty volcanic crater lake of Kitara, ancient royal earthworks, and grazing pearl-horned Ankole cattle.',
    palette: 'Emerald, Turquoise & Copper',
    region: 'East Africa',
    tradition: 'Bachwezi / Empire of Kitara (Uganda)'
  },
  {
    id: 'GANDA_KASUBI_DOME',
    name: 'Buganda Royal Kasubi Dome',
    description: 'Towering reed-thatched dome of Muzibu-Azaala-Mpanga with barkcloth motifs and royal leopard insignias.',
    palette: 'Ochre, Barkcloth Brown & Royal Amber',
    region: 'East Africa',
    tradition: 'Baganda Kingdom (Uganda)'
  },
  {
    id: 'KINTU_NAMBI_LADDER',
    name: 'Kintu & Nambi Celestial Descent',
    description: 'Golden heavenly clouds, sacred ladder to earth, Kintu’s solitary cow, and the maiden of stars.',
    palette: 'Golden Sky, Verdant Green & Ivory',
    region: 'East Africa',
    tradition: 'Buganda Genesis (Uganda)'
  },
  {
    id: 'LANGO_OTUKE_SAVANNA',
    name: 'Lango Otuke Hills & Crested Crane',
    description: 'Granite boulders of Otuke, sacred iron spear of Olum, flying Crested Crane, and the communal hunt.',
    palette: 'Granite Red, Savanna Gold & Crane Crest',
    region: 'East Africa',
    tradition: 'Lango Tradition (Uganda)'
  },
  {
    id: 'GISU_ELGON_KADODI',
    name: 'Bamasaba Mount Elgon & Kadodi',
    description: 'Cascading Sipi Falls on Mount Masaba, terraced bamboo ridges, and ecstatic Imbalu ceremonial drums.',
    palette: 'Caldera Indigo, Alpine Green & Drum Ochre',
    region: 'East Africa',
    tradition: 'Bamasaba / Bagisu (Uganda)'
  },
  // Pan-African Origins & Stories
  {
    id: 'YORUBA_ILE_IFE',
    name: 'Oduduwa & Golden Chain of Ife',
    description: 'Golden chain descending from celestial clouds, sacred five-toed rooster, and magic earth shell.',
    palette: 'Primordial Azure, Radiant Gold & Terracotta',
    region: 'West Africa',
    tradition: 'Yoruba (Nigeria & Benin)'
  },
  {
    id: 'ZULU_DRAKENSBERG',
    name: 'Unkulunkulu & Drakensberg Swamplands',
    description: 'Towering basalt amphitheatre of the Drakensberg, swaying green reed beds, and beehive homesteads.',
    palette: 'Drakensberg Emerald, Slate & Reed Yellow',
    region: 'Southern Africa',
    tradition: 'AmaZulu (South Africa)'
  },
  {
    id: 'KIKUYU_KIRINYAGA',
    name: 'Mount Kenya & Sacred Fig Tree',
    description: 'Snow-capped twin peaks of Kirinyaga, sacred Mukuyu tree of life, and Gikuyu & Mumbi.',
    palette: 'Glacial White, Mountain Cobalt & Fig Green',
    region: 'East Africa',
    tradition: 'Agikuyu (Kenya)'
  },
  {
    id: 'ASHANTI_GOLDEN_STOOL',
    name: 'Asante Sika Dwa Kofi Descent',
    description: 'Golden stool descending through thunderclouds onto Kumasi forest, with Okomfo Anokye’s staff.',
    palette: 'Kente Gold, Midnight Indigo & Bronze',
    region: 'West Africa',
    tradition: 'Asante / Akan (Ghana)'
  },
  // Classic Folktale Styles
  {
    id: 'BAOBAB_SUNSET',
    name: 'Savanna Baobab Sunset',
    description: 'Golden twilight over the African savanna with an ancient baobab and soaring birds.',
    palette: 'Amber, Terracotta & Ochre',
    region: 'Pan-African',
    tradition: 'Savanna Folklore'
  },
  {
    id: 'ANANSE_FOREST',
    name: 'Ashanti Canopy & Spider Web',
    description: 'Deep rainforest foliage, golden spider web geometry, and Ananse’s clay wisdom pot.',
    palette: 'Emerald, Forest Green & Gold',
    region: 'West Africa',
    tradition: 'Akan / Ashanti'
  },
  {
    id: 'LAKE_VICTORIA_MIST',
    name: 'Nalubaale Mist & Stone Legend',
    description: 'Indigo waters of Lake Victoria with papyrus reeds and the legendary stone monolith.',
    palette: 'Indigo, Deep Cyan & Copper',
    region: 'East Africa',
    tradition: 'Great Lakes / Luo'
  },
  {
    id: 'RIFT_VALLEY_STORM',
    name: 'Rift Valley Rainmaker',
    description: 'Towering volcanic escarpments, rolling rain spirals, and golden savanna acacias.',
    palette: 'Sky Blue, Terracotta & Gold',
    region: 'East Africa',
    tradition: 'Rift Valley'
  },
  {
    id: 'VILLAGE_FIRESIDE',
    name: 'Evening Fireside Gathering',
    description: 'Warm village hearth fire under a starry African night sky and crescent moon.',
    palette: 'Midnight Navy, Ochre & Crimson',
    region: 'Pan-African',
    tradition: 'Village Hearth'
  },
  {
    id: 'MARKETPLACE_COLORS',
    name: 'Vibrant Village Market',
    description: 'Clay pottery, woven baskets, and geometric cloth patterns in sunny morning light.',
    palette: 'Warm Gold, Turquoise & Coral',
    region: 'West Africa',
    tradition: 'Sahel & Coast'
  },
  {
    id: 'DESERT_CARAVAN',
    name: 'Sahara & Sahel Oasis Dunes',
    description: 'Rolling sand dunes, date palms around a fresh spring, and starlit caravan path.',
    palette: 'Sand Ochre, Sunset Amber & Date Palm',
    region: 'North & West Africa',
    tradition: 'Sahara & Sahel'
  },
  {
    id: 'COASTAL_DHOW',
    name: 'Swahili Coast & Ocean Sail',
    description: 'Turquoise ocean waves, coconut palm silhouettes, and a wooden dhow under sail.',
    palette: 'Turquoise, Coral Pink & White Sand',
    region: 'East Africa',
    tradition: 'Swahili Maritime'
  }
];

interface StoryIllustrationProps {
  story?: Story;
  drawingStyle?: DrawingStyleId | string;
  className?: string;
  aspectRatio?: string;
  showBadge?: boolean;
  showCaption?: boolean;
  interactive?: boolean;
  allowPhotoView?: boolean;
}

export const StoryIllustration: React.FC<StoryIllustrationProps> = ({
  story,
  drawingStyle,
  className = '',
  aspectRatio = 'aspect-16/10',
  showBadge = true,
  showCaption = false,
  interactive = false,
  allowPhotoView = true
}) => {
  // Check if photo is available and user toggles between art & documentary photo
  const hasPhoto = Boolean(story?.illustration?.url && story.illustration.url.startsWith('http'));
  const [viewMode, setViewMode] = useState<'ART' | 'PHOTO'>('ART');

  // Determine effective drawing style
  const resolveStyle = (): DrawingStyleId => {
    if (drawingStyle && DRAWING_STYLES.some((s) => s.id === drawingStyle)) {
      return drawingStyle as DrawingStyleId;
    }
    if (story?.illustration?.drawingStyle && DRAWING_STYLES.some((s) => s.id === story.illustration.drawingStyle)) {
      return story.illustration.drawingStyle as DrawingStyleId;
    }

    const id = story?.id?.toLowerCase() || '';
    const title = story?.title?.toLowerCase() || '';
    const tradition = story?.culturalTradition?.toLowerCase() || '';
    const community = story?.community?.toLowerCase() || '';
    const country = story?.country?.toLowerCase() || '';

    // 1. UGANDAN TRADITIONS
    // Bachwezi / Kitara / Crater Lakes
    if (
      id.includes('chewzi') ||
      id.includes('chwezi') ||
      id.includes('bachwezi') ||
      id.includes('kitara') ||
      id.includes('wamala') ||
      id.includes('wamara') ||
      id.includes('crater') ||
      title.includes('bachwezi') ||
      title.includes('crater lake') ||
      tradition.includes('chwezi') ||
      community.includes('crater')
    ) {
      return 'CHWEZI_CRATER_LAKE';
    }

    // Baganda / Kintu & Nambi / Genesis
    if (
      id.includes('kintu') ||
      id.includes('nambi') ||
      id.includes('walumbe') ||
      title.includes('kintu') ||
      title.includes('nambi') ||
      id.includes('ganda-genesis') ||
      title.includes('genesis of the buganda')
    ) {
      return 'KINTU_NAMBI_LADDER';
    }

    // Baganda / Kasubi / Royal Dynasty
    if (
      id.includes('kasubi') ||
      id.includes('ganda') ||
      id.includes('buganda') ||
      tradition.includes('ganda') ||
      tradition.includes('buganda') ||
      title.includes('kasubi') ||
      title.includes('kabaka')
    ) {
      return 'GANDA_KASUBI_DOME';
    }

    // Lango / Olum / Otuke / Dwar
    if (
      id.includes('lango') ||
      id.includes('olum') ||
      id.includes('otuke') ||
      id.includes('dwar') ||
      id.includes('kyoga') ||
      title.includes('lango') ||
      title.includes('olum') ||
      title.includes('sacred spear') ||
      tradition.includes('lango')
    ) {
      return 'LANGO_OTUKE_SAVANNA';
    }

    // Bamasaba / Bagisu / Mount Elgon / Imbalu
    if (
      id.includes('gisu') ||
      id.includes('masaba') ||
      id.includes('mundu') ||
      id.includes('sera') ||
      id.includes('imbalu') ||
      id.includes('elgon') ||
      id.includes('sipi') ||
      id.includes('kadodi') ||
      title.includes('bamasaba') ||
      title.includes('masaba') ||
      title.includes('imbalu') ||
      tradition.includes('gisu') ||
      tradition.includes('masaba')
    ) {
      return 'GISU_ELGON_KADODI';
    }

    // 2. PAN-AFRICAN TRADITIONS
    // Yoruba / Oduduwa / Ile-Ife
    if (
      id.includes('oduduwa') ||
      id.includes('ile-ife') ||
      id.includes('yoruba') ||
      title.includes('oduduwa') ||
      title.includes('ile-ife') ||
      tradition.includes('yoruba')
    ) {
      return 'YORUBA_ILE_IFE';
    }

    // Zulu / Unkulunkulu / Drakensberg
    if (
      id.includes('unkulunkulu') ||
      id.includes('zulu') ||
      id.includes('drakensberg') ||
      title.includes('unkulunkulu') ||
      tradition.includes('zulu')
    ) {
      return 'ZULU_DRAKENSBERG';
    }

    // Kikuyu / Kirinyaga / Mount Kenya
    if (
      id.includes('gikuyu') ||
      id.includes('mumbi') ||
      id.includes('kikuyu') ||
      id.includes('kirinyaga') ||
      title.includes('gikuyu') ||
      title.includes('mumbi') ||
      tradition.includes('kikuyu')
    ) {
      return 'KIKUYU_KIRINYAGA';
    }

    // Ashanti / Golden Stool / Okomfo Anokye
    if (
      id.includes('golden-stool') ||
      id.includes('asante') ||
      id.includes('ashanti') ||
      id.includes('anokye') ||
      title.includes('golden stool') ||
      title.includes('sika dwa')
    ) {
      return 'ASHANTI_GOLDEN_STOOL';
    }

    // 3. CLASSIC FOLKTALES
    if (id.includes('ananse') || title.includes('ananse') || title.includes('spider')) {
      return 'ANANSE_FOREST';
    }
    if (id.includes('luanda') || title.includes('luanda') || title.includes('stone warrior')) {
      return 'LAKE_VICTORIA_MIST';
    }
    if (id.includes('rainmaker') || title.includes('rain') || id.includes('rift')) {
      return 'RIFT_VALLEY_STORM';
    }
    if (story?.themes?.includes('Music') || title.includes('drum') || title.includes('fire')) {
      return 'VILLAGE_FIRESIDE';
    }
    if (story?.themes?.includes('Market') || country === 'ghana' || country === 'nigeria') {
      return 'MARKETPLACE_COLORS';
    }
    if (story?.region === 'North Africa' || story?.themes?.includes('Desert')) {
      return 'DESERT_CARAVAN';
    }
    if (story?.region === 'East Africa' || story?.themes?.includes('Water') || story?.themes?.includes('Ocean')) {
      return 'COASTAL_DHOW';
    }

    // Fallbacks
    if (country === 'uganda') return 'CHWEZI_CRATER_LAKE';
    if (story?.region === 'West Africa') return 'ANANSE_FOREST';
    if (story?.region === 'Southern Africa') return 'ZULU_DRAKENSBERG';

    return 'BAOBAB_SUNSET';
  };

  const styleId = resolveStyle();
  const currentStyleMeta = DRAWING_STYLES.find((s) => s.id === styleId) || DRAWING_STYLES[0];

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden select-none bg-[#231A12] group ${className}`}
    >
      {/* RENDER PHOTO VIEW (IF TOGGLED AND PHOTO AVAILABLE) */}
      {viewMode === 'PHOTO' && hasPhoto ? (
        <div className="w-full h-full relative">
          <img
            src={story?.illustration?.url}
            alt={story?.illustration?.alt || story?.title || 'Story landscape'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      ) : (
        /* RENDER HAND-CRAFTED AFRICAN STORYBOOK SVG ARTWORK */
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] will-change-transform"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="savannaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D9531E" />
              <stop offset="35%" stopColor="#E8832B" />
              <stop offset="70%" stopColor="#F4B32A" />
              <stop offset="100%" stopColor="#F9D976" />
            </linearGradient>

            <linearGradient id="forestSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B2316" />
              <stop offset="40%" stopColor="#143D27" />
              <stop offset="75%" stopColor="#1F5838" />
              <stop offset="100%" stopColor="#417D49" />
            </linearGradient>

            <linearGradient id="lakeSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0E1A2B" />
              <stop offset="45%" stopColor="#16324F" />
              <stop offset="80%" stopColor="#2A6282" />
              <stop offset="100%" stopColor="#58A4B0" />
            </linearGradient>

            <linearGradient id="chweziSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#062828" />
              <stop offset="40%" stopColor="#0F4C47" />
              <stop offset="75%" stopColor="#1C756B" />
              <stop offset="100%" stopColor="#48B8A6" />
            </linearGradient>

            <linearGradient id="gandaKasubiSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1A0D07" />
              <stop offset="35%" stopColor="#3E1C0A" />
              <stop offset="70%" stopColor="#8C4419" />
              <stop offset="100%" stopColor="#D9822B" />
            </linearGradient>

            <linearGradient id="kintuHeavenSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#120A2A" />
              <stop offset="30%" stopColor="#3A1C68" />
              <stop offset="65%" stopColor="#8338EC" />
              <stop offset="85%" stopColor="#FB5607" />
              <stop offset="100%" stopColor="#FFBE0B" />
            </linearGradient>

            <linearGradient id="langoOtukeSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1F0D09" />
              <stop offset="35%" stopColor="#5E1D13" />
              <stop offset="70%" stopColor="#B33E1C" />
              <stop offset="100%" stopColor="#F9A03F" />
            </linearGradient>

            <linearGradient id="elgonCalderaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A1826" />
              <stop offset="35%" stopColor="#153243" />
              <stop offset="70%" stopColor="#284B63" />
              <stop offset="100%" stopColor="#7FB069" />
            </linearGradient>

            <linearGradient id="yorubaPrimordialSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#07192F" />
              <stop offset="40%" stopColor="#103B64" />
              <stop offset="75%" stopColor="#1F6FB2" />
              <stop offset="100%" stopColor="#64DFDF" />
            </linearGradient>

            <linearGradient id="drakensbergSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0D1F18" />
              <stop offset="45%" stopColor="#1C3D2E" />
              <stop offset="80%" stopColor="#3F6B4F" />
              <stop offset="100%" stopColor="#A3C9A8" />
            </linearGradient>

            <linearGradient id="kirinyagaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A1931" />
              <stop offset="40%" stopColor="#153E75" />
              <stop offset="70%" stopColor="#0077B6" />
              <stop offset="100%" stopColor="#90E0EF" />
            </linearGradient>

            <linearGradient id="asanteThunderSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#100C1A" />
              <stop offset="40%" stopColor="#251B38" />
              <stop offset="70%" stopColor="#58315C" />
              <stop offset="100%" stopColor="#D4A373" />
            </linearGradient>

            <linearGradient id="riftSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1B2A4A" />
              <stop offset="40%" stopColor="#43506C" />
              <stop offset="70%" stopColor="#C86D51" />
              <stop offset="100%" stopColor="#E9B872" />
            </linearGradient>

            <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080D1A" />
              <stop offset="50%" stopColor="#121D36" />
              <stop offset="85%" stopColor="#2B213A" />
              <stop offset="100%" stopColor="#59302B" />
            </linearGradient>

            <linearGradient id="marketSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A7B9B" />
              <stop offset="40%" stopColor="#EDC126" />
              <stop offset="80%" stopColor="#E06A3B" />
              <stop offset="100%" stopColor="#C44536" />
            </linearGradient>

            <linearGradient id="desertSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#17223B" />
              <stop offset="35%" stopColor="#6B4D57" />
              <stop offset="70%" stopColor="#D97D54" />
              <stop offset="100%" stopColor="#F4B860" />
            </linearGradient>

            <linearGradient id="coastSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F4C5C" />
              <stop offset="45%" stopColor="#2A9D8F" />
              <stop offset="75%" stopColor="#E9C46A" />
              <stop offset="100%" stopColor="#F4A261" />
            </linearGradient>

            {/* Sun Glow Filter */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF275" stopOpacity="1" />
              <stop offset="40%" stopColor="#FFA62B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E55934" stopOpacity="0" />
            </radialGradient>

            {/* Golden Spirit Glow */}
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE066" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#D4A373" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#CCD5AE" stopOpacity="0" />
            </radialGradient>

            {/* Celestial Rainbow Gradient */}
            <linearGradient id="celestialRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFBE0B" />
              <stop offset="30%" stopColor="#FB5607" />
              <stop offset="60%" stopColor="#FF006E" />
              <stop offset="85%" stopColor="#8338EC" />
              <stop offset="100%" stopColor="#3A86FF" />
            </linearGradient>

            {/* Folk Texture Pattern */}
            <pattern id="folkTexture" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0,20 L 20,0 L 40,20 L 20,40 Z" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.04)" />
            </pattern>
          </defs>

          {/* ========================================================= */}
          {/* 1. SCENE: BACHWEZI EMERALD CRATER LAKES & ANKOLE CATTLE   */}
          {/* ========================================================= */}
          {styleId === 'CHWEZI_CRATER_LAKE' && (
            <g id="illustration-chwezi-crater-lake">
              <rect width="800" height="500" fill="url(#chweziSky)" />
              {/* Caldera Rim Ridge Lines */}
              <path d="M 0,220 C 140,160 260,240 400,180 C 540,120 680,210 800,160 L 800,500 L 0,500 Z" fill="#093630" />
              <path d="M 0,260 C 180,220 320,290 480,230 C 640,180 720,250 800,220 L 800,500 L 0,500 Z" fill="#0F473E" />

              {/* Glowing Crater Lake Mirror Surface */}
              <ellipse cx="400" cy="390" rx="380" ry="120" fill="#145E54" />
              <ellipse cx="400" cy="400" rx="320" ry="85" fill="#1D786B" />
              <ellipse cx="400" cy="405" rx="240" ry="55" fill="#2DA896" opacity="0.8" />

              {/* Swirling Spirit Mist Rising from Lake Wamala / Kasenda */}
              <path d="M 120,380 Q 240,320 360,370 T 600,340 T 780,360" stroke="#75E6DA" strokeWidth="4" fill="none" opacity="0.4" strokeDasharray="12,8" />
              <path d="M 60,410 Q 200,350 380,390 T 680,380" stroke="#B8FFF9" strokeWidth="3" fill="none" opacity="0.3" />

              {/* Majestic Long-Horned Enyambo Ankole Cow on Ridge */}
              <g transform="translate(180, 260) scale(0.85)">
                {/* Cow Body */}
                <ellipse cx="60" cy="60" rx="55" ry="32" fill="#5A2A18" />
                <ellipse cx="10" cy="48" rx="22" ry="24" fill="#6B331E" />
                {/* Legs */}
                <rect x="25" y="85" width="8" height="35" rx="4" fill="#421C0E" />
                <rect x="42" y="85" width="8" height="35" rx="4" fill="#36170B" />
                <rect x="85" y="85" width="8" height="35" rx="4" fill="#421C0E" />
                <rect x="98" y="85" width="8" height="35" rx="4" fill="#36170B" />
                {/* Majestic Arched White Horns (Signature of Ankole) */}
                <path d="M 0,40 C -30,10 -50,-50 -20,-85 C -5,-100 10,-85 5,-70 C -15,-35 -10,0 5,30" fill="#FBF7EE" stroke="#DCD3BE" strokeWidth="2" />
                <path d="M 15,40 C 45,10 65,-50 35,-85 C 20,-100 5,-85 10,-70 C 30,-35 25,0 10,30" fill="#FBF7EE" stroke="#DCD3BE" strokeWidth="2" />
              </g>

              {/* Ancient Kitara Royal Drums (Empango) & Copper Spears */}
              <g transform="translate(620, 310)">
                {/* Sacred Royal Drum */}
                <ellipse cx="0" cy="50" rx="36" ry="14" fill="#8C4419" stroke="#E25822" strokeWidth="2" />
                <path d="M -36,50 L -28,110 Q 0,130 28,110 L 36,50 Z" fill="#5E2B0C" stroke="#3D1805" strokeWidth="2" />
                <ellipse cx="0" cy="110" rx="28" ry="10" fill="#3D1805" />
                {/* Woven Cowrie Belt Band */}
                <path d="M -32,70 Q 0,82 32,70" stroke="#FBF7EE" strokeWidth="4" strokeDasharray="6,4" fill="none" />
                {/* Copper Spear of Kitara */}
                <line x1="45" y1="130" x2="45" y2="-20" stroke="#B87333" strokeWidth="4" />
                <polygon points="45,-40 37,-15 53,-15" fill="#E59866" stroke="#B87333" strokeWidth="1.5" />
              </g>

              {/* Floating Ethereal Stars / Spirit Lights */}
              <circle cx="280" cy="190" r="3" fill="#B8FFF9" opacity="0.9" />
              <circle cx="450" cy="140" r="4" fill="#FFE066" opacity="0.9" />
              <circle cx="580" cy="200" r="2.5" fill="#B8FFF9" opacity="0.8" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 2. SCENE: BUGANDA ROYAL KASUBI THATCHED DOME PALACE       */}
          {/* ========================================================= */}
          {styleId === 'GANDA_KASUBI_DOME' && (
            <g id="illustration-ganda-kasubi">
              <rect width="800" height="500" fill="url(#gandaKasubiSky)" />
              {/* Crescent Moon & Stars over Buganda */}
              <circle cx="680" cy="90" r="32" fill="#FFEAA7" opacity="0.85" />
              <circle cx="692" cy="85" r="28" fill="#3E1C0A" />

              {/* Hilltop Ridge of Kasubi */}
              <path d="M 0,380 Q 400,310 800,380 L 800,500 L 0,500 Z" fill="#2B1408" />
              <path d="M 0,420 Q 400,370 800,420 L 800,500 L 0,500 Z" fill="#1A0A04" />

              {/* Muzibu-Azaala-Mpanga Colossal Thatched Dome Palace */}
              <g transform="translate(400, 360)">
                {/* Massive Curved Thatched Dome */}
                <path
                  d="M -220,50 C -200,-150 -120,-240 0,-260 C 120,-240 200,-150 220,50 Z"
                  fill="#7A3E1D"
                  stroke="#4E230E"
                  strokeWidth="4"
                />
                {/* Thatch Stepped Rings (Kisasi Spear Grass Weave) */}
                <path d="M -195,-20 C -150,-180 0,-220 195,-20" stroke="#9E5429" strokeWidth="8" fill="none" opacity="0.85" />
                <path d="M -160,-80 C -120,-190 0,-215 160,-80" stroke="#BD6B38" strokeWidth="7" fill="none" opacity="0.85" />
                <path d="M -110,-150 C -70,-220 0,-235 110,-150" stroke="#DC864C" strokeWidth="6" fill="none" opacity="0.9" />

                {/* Grand Arched Palace Entrance with Golden Lantern Glow */}
                <path d="M -45,50 C -45,-30 45,-30 45,50 Z" fill="#140702" stroke="#BD6B38" strokeWidth="3" />
                <ellipse cx="0" cy="20" rx="30" ry="25" fill="#FFA502" opacity="0.8" />
                <circle cx="0" cy="15" r="14" fill="#FFF275" />

                {/* Royal Barkcloth Pillars (Olubugo Fabric Motif) */}
                <rect x="-180" y="30" width="16" height="40" rx="2" fill="#A04000" stroke="#6E2C00" strokeWidth="1.5" />
                <rect x="-110" y="30" width="16" height="40" rx="2" fill="#A04000" stroke="#6E2C00" strokeWidth="1.5" />
                <rect x="94" y="30" width="16" height="40" rx="2" fill="#A04000" stroke="#6E2C00" strokeWidth="1.5" />
                <rect x="164" y="30" width="16" height="40" rx="2" fill="#A04000" stroke="#6E2C00" strokeWidth="1.5" />
              </g>

              {/* Royal Buganda Shields (Engabu) & Royal Drums in Foreground */}
              <g transform="translate(140, 410) scale(0.85)">
                {/* Traditional Buganda Oval Shield with Reed Boss */}
                <ellipse cx="0" cy="0" rx="26" ry="55" fill="#E25822" stroke="#2B1408" strokeWidth="3" />
                <ellipse cx="0" cy="0" rx="14" ry="40" fill="#2B1408" />
                <line x1="0" y1="-55" x2="0" y2="55" stroke="#FBF7EE" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="#FFEAA7" />
              </g>
              <g transform="translate(660, 410) scale(0.85)">
                <ellipse cx="0" cy="0" rx="26" ry="55" fill="#E25822" stroke="#2B1408" strokeWidth="3" />
                <ellipse cx="0" cy="0" rx="14" ry="40" fill="#2B1408" />
                <line x1="0" y1="-55" x2="0" y2="55" stroke="#FBF7EE" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="#FFEAA7" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 3. SCENE: KINTU & NAMBI CELESTIAL DESCENT TO EARTH        */}
          {/* ========================================================= */}
          {styleId === 'KINTU_NAMBI_LADDER' && (
            <g id="illustration-kintu-nambi">
              <rect width="800" height="500" fill="url(#kintuHeavenSky)" />

              {/* Celestial Clouds of Ggulu */}
              <ellipse cx="200" cy="80" rx="180" ry="70" fill="#5F27CD" opacity="0.6" />
              <ellipse cx="600" cy="90" rx="220" ry="85" fill="#48278E" opacity="0.7" />
              <ellipse cx="400" cy="50" rx="260" ry="80" fill="#FF9F43" opacity="0.8" />
              <ellipse cx="400" cy="40" rx="180" ry="50" fill="#FECA57" opacity="0.9" />

              {/* Radiant Celestial Golden Ladder from Heaven to Earth */}
              <g transform="translate(400, 20)">
                <line x1="-35" y1="30" x2="-80" y2="380" stroke="#FFD32A" strokeWidth="4" opacity="0.85" />
                <line x1="35" y1="30" x2="80" y2="380" stroke="#FFD32A" strokeWidth="4" opacity="0.85" />
                {/* Ladder Rungs */}
                {[60, 100, 140, 180, 220, 260, 300, 340].map((y, idx) => (
                  <line
                    key={idx}
                    x1={-35 - idx * 5.5}
                    y1={y}
                    x2={35 + idx * 5.5}
                    y2={y}
                    stroke="#FFF200"
                    strokeWidth="3.5"
                    opacity={0.8}
                  />
                ))}
              </g>

              {/* Fertile Green Hills of Buganda with Banana Plantain Groves */}
              <path d="M 0,380 Q 250,330 500,370 Q 700,390 800,350 L 800,500 L 0,500 Z" fill="#10AC84" />
              <path d="M 0,420 Q 300,380 600,410 Q 750,420 800,400 L 800,500 L 0,500 Z" fill="#0A7E60" />

              {/* Kintu Standing Beside his Single Faithful Cow */}
              <g transform="translate(180, 350)">
                {/* Single Cow of Kintu */}
                <ellipse cx="50" cy="50" rx="42" ry="24" fill="#D2B48C" stroke="#8B5A2B" strokeWidth="2" />
                <ellipse cx="10" cy="40" rx="16" ry="18" fill="#C49A6C" />
                {/* Legs */}
                <rect x="25" y="70" width="6" height="25" fill="#8B5A2B" />
                <rect x="38" y="70" width="6" height="25" fill="#8B5A2B" />
                <rect x="70" y="70" width="6" height="25" fill="#8B5A2B" />
                <rect x="80" y="70" width="6" height="25" fill="#8B5A2B" />
                {/* Cow Horns */}
                <path d="M 5,30 Q -15,10 0,-5" stroke="#FBF7EE" strokeWidth="3" fill="none" />
                <path d="M 15,30 Q 35,10 20,-5" stroke="#FBF7EE" strokeWidth="3" fill="none" />

                {/* Kintu Silhouette looking up in Wonder */}
                <g transform="translate(110, -20)">
                  <circle cx="0" cy="0" r="14" fill="#2E1C12" />
                  <path d="M -8,14 L 8,14 L 14,80 L -14,80 Z" fill="#2E1C12" />
                  {/* Holding Herder Staff */}
                  <line x1="20" y1="-10" x2="20" y2="85" stroke="#D35400" strokeWidth="3" />
                </g>
              </g>

              {/* Nambi Descending with Calabash of Seeds */}
              <g transform="translate(490, 160)">
                <circle cx="0" cy="0" r="12" fill="#E67E22" />
                <path d="M -8,12 C -20,40 -15,70 0,85 C 15,70 20,40 8,12 Z" fill="#F39C12" />
                {/* Sacred Plantain Shoots (Matooke) */}
                <path d="M 12,30 Q 30,15 40,25" stroke="#2ECC71" strokeWidth="3" fill="none" />
                <circle cx="15" cy="45" r="8" fill="#F1C40F" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 4. SCENE: LANGO OTUKE HILLS, CRESTED CRANE & COMMUNAL DWAR */}
          {/* ========================================================= */}
          {styleId === 'LANGO_OTUKE_SAVANNA' && (
            <g id="illustration-lango-otuke">
              <rect width="800" height="500" fill="url(#langoOtukeSky)" />

              {/* Rising Sun of Lake Kyoga */}
              <circle cx="580" cy="180" r="80" fill="url(#sunGlow)" />
              <circle cx="580" cy="180" r="50" fill="#FFF275" />

              {/* Towering Granite Otuke Hills (Got Otuke) */}
              <path d="M 0,320 L 120,210 L 260,260 L 380,170 L 520,310 L 800,280 L 800,500 L 0,500 Z" fill="#6E2C00" />
              <path d="M 40,340 L 160,250 L 320,320 L 460,240 L 600,340 L 800,310 L 800,500 L 0,500 Z" fill="#4A1C00" />

              {/* Savanna Plains & Wetlands of Lake Kyoga */}
              <path d="M 0,390 Q 350,350 800,380 L 800,500 L 0,500 Z" fill="#784212" />
              <path d="M 0,430 Q 400,410 800,430 L 800,500 L 0,500 Z" fill="#3E1F07" />

              {/* Woven Granaries of Lango (Otogo) on Stilts */}
              <g transform="translate(680, 360) scale(0.9)">
                <ellipse cx="0" cy="0" rx="30" ry="24" fill="#B9770E" stroke="#7E5109" strokeWidth="2" />
                <polygon points="0,-45 -36,-5 36,-5" fill="#D68910" stroke="#7E5109" strokeWidth="2" />
                {/* Stilts */}
                <line x1="-22" y1="20" x2="-22" y2="60" stroke="#4A2810" strokeWidth="3" />
                <line x1="-5" y1="22" x2="-5" y2="60" stroke="#4A2810" strokeWidth="3" />
                <line x1="12" y1="22" x2="12" y2="60" stroke="#4A2810" strokeWidth="3" />
                <line x1="24" y1="20" x2="24" y2="60" stroke="#4A2810" strokeWidth="3" />
              </g>

              {/* The Crested Crane in Soaring Flight (Uganda National Bird) */}
              <g transform="translate(340, 130) scale(0.95)">
                {/* Wings Outspread */}
                <path d="M 0,0 Q -40,-50 -100,-30 Q -60,-15 0,0 Q 60,-15 100,-30 Q 40,-50 0,0" fill="#2C3E50" stroke="#BDC3C7" strokeWidth="1.5" />
                <path d="M -70,-25 Q -40,-10 0,5 Q 40,-10 70,-25" fill="#BDC3C7" />
                {/* White & Golden Feathers */}
                <ellipse cx="0" cy="5" rx="16" ry="10" fill="#ECF0F1" />
                {/* Slender Graceful Neck & Head */}
                <path d="M 12,5 Q 35,0 45,-15" stroke="#2C3E50" strokeWidth="4" fill="none" />
                <circle cx="47" cy="-17" r="5" fill="#C0392B" />
                {/* Golden Bristled Crown Plume */}
                <path d="M 45,-21 L 40,-35 M 46,-22 L 46,-37 M 49,-21 L 54,-35" stroke="#F1C40F" strokeWidth="2.5" />
              </g>

              {/* Olum with the Sacred Iron Spear Leading the Communal Hunt */}
              <g transform="translate(180, 390)">
                {/* Hunter Silhouette */}
                <circle cx="0" cy="-35" r="11" fill="#1C1008" />
                <path d="M -10,-24 L 10,-24 L 14,35 L -14,35 Z" fill="#1C1008" />
                {/* Buffalo Hide Shield */}
                <ellipse cx="-20" cy="0" rx="14" ry="32" fill="#935116" stroke="#1C1008" strokeWidth="2" />
                {/* Sacred Iron Spear of Otuke */}
                <line x1="15" y1="35" x2="35" y2="-65" stroke="#BDC3C7" strokeWidth="3.5" />
                <polygon points="38,-78 30,-58 44,-58" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 5. SCENE: BAMASABA MOUNT ELGON, SIPI FALLS & KADODI DRUMS */}
          {/* ========================================================= */}
          {styleId === 'GISU_ELGON_KADODI' && (
            <g id="illustration-gisu-elgon">
              <rect width="800" height="500" fill="url(#elgonCalderaSky)" />

              {/* Snow and Cloud Shrouded Peaks of Mount Masaba (Mount Elgon) */}
              <polygon points="400,60 180,300 620,300" fill="#1B384F" />
              <polygon points="400,60 340,140 460,140" fill="#E8F8F5" opacity="0.9" />
              <polygon points="260,130 100,320 420,320" fill="#122A3B" />
              <polygon points="560,110 380,320 740,320" fill="#163246" />

              {/* Spectacular Sipi Falls Cascading down Basalt Cliff */}
              <g transform="translate(240, 220)">
                {/* Tumbling Ribbon of White Water */}
                <path d="M 0,0 L -5,180 L 15,180 L 8,0 Z" fill="#E8F8F5" opacity="0.9" />
                <path d="M 2,10 L 0,170" stroke="#76D7C4" strokeWidth="3" />
                {/* Water Mist Plume at the Base */}
                <ellipse cx="5" cy="180" rx="45" ry="18" fill="#A3E4D7" opacity="0.6" />
                <ellipse cx="5" cy="175" rx="30" ry="12" fill="#E8F8F5" opacity="0.8" />
              </g>

              {/* Lush Volcanic Terraces with Bamboo & Arabica Coffee */}
              <path d="M 0,360 Q 200,330 450,370 Q 650,390 800,350 L 800,500 L 0,500 Z" fill="#1E8449" />
              <path d="M 0,410 Q 300,380 600,420 Q 720,430 800,400 L 800,500 L 0,500 Z" fill="#145A32" />

              {/* Kadodi Drummers with Traditional Double-Headed Imbalu Drums */}
              <g transform="translate(540, 370)">
                {/* Lead Kadodi Drummer */}
                <g transform="translate(0, 0)">
                  <circle cx="0" cy="-30" r="10" fill="#211206" />
                  <path d="M -8,-20 L 8,-20 L 12,30 L -12,30 Z" fill="#211206" />
                  {/* Upraised Drumsticks (Ecilil) */}
                  <line x1="8" y1="-15" x2="26" y2="-38" stroke="#D35400" strokeWidth="3" />
                  <line x1="-8" y1="-15" x2="-26" y2="-38" stroke="#D35400" strokeWidth="3" />
                  {/* Kadodi Drum slung around shoulder */}
                  <ellipse cx="0" cy="15" rx="22" ry="10" fill="#D35400" stroke="#873600" strokeWidth="2" />
                  <rect x="-22" y="15" width="44" height="28" fill="#A04000" stroke="#5E2B0C" strokeWidth="2" />
                  <ellipse cx="0" cy="43" rx="22" ry="10" fill="#5E2B0C" />
                  {/* Cadence Sparkles */}
                  <circle cx="28" cy="-40" r="3" fill="#F1C40F" />
                  <circle cx="-28" cy="-40" r="3" fill="#F1C40F" />
                </g>

                {/* Second Drummer */}
                <g transform="translate(75, 10) scale(0.9)">
                  <circle cx="0" cy="-30" r="10" fill="#211206" />
                  <path d="M -8,-20 L 8,-20 L 12,30 L -12,30 Z" fill="#211206" />
                  <ellipse cx="0" cy="15" rx="20" ry="9" fill="#E67E22" stroke="#873600" strokeWidth="2" />
                  <rect x="-20" y="15" width="40" height="26" fill="#BA4A00" stroke="#5E2B0C" strokeWidth="2" />
                </g>
              </g>

              {/* Alpine Wild Bamboo Grooves on Ridge */}
              <g transform="translate(80, 390)">
                <line x1="0" y1="0" x2="-10" y2="-70" stroke="#27AE60" strokeWidth="4" />
                <line x1="15" y1="0" x2="10" y2="-85" stroke="#229954" strokeWidth="4.5" />
                <line x1="30" y1="0" x2="35" y2="-65" stroke="#27AE60" strokeWidth="3.5" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 6. SCENE: YORUBA ODUDUWA & GOLDEN CHAIN OF ILE-IFE        */}
          {/* ========================================================= */}
          {styleId === 'YORUBA_ILE_IFE' && (
            <g id="illustration-yoruba-ile-ife">
              <rect width="800" height="500" fill="url(#yorubaPrimordialSky)" />
              {/* Infinite Primordial Celestial Ocean */}
              <rect y="320" width="800" height="180" fill="#0C2461" />
              <path d="M 0,360 Q 200,345 400,360 Q 600,375 800,360 L 800,500 L 0,500 Z" fill="#1E3799" />
              <path d="M 0,420 Q 250,400 500,420 Q 700,430 800,415 L 800,500 L 0,500 Z" fill="#0A1931" />

              {/* Golden Chain Descending from Heaven (The Chain of Oduduwa) */}
              <g transform="translate(400, 0)">
                <ellipse cx="0" cy="20" rx="14" ry="24" fill="none" stroke="#F1C40F" strokeWidth="4.5" />
                <ellipse cx="0" cy="55" rx="24" ry="14" fill="none" stroke="#F39C12" strokeWidth="4.5" />
                <ellipse cx="0" cy="90" rx="14" ry="24" fill="none" stroke="#F1C40F" strokeWidth="4.5" />
                <ellipse cx="0" cy="125" rx="24" ry="14" fill="none" stroke="#F39C12" strokeWidth="4.5" />
                <ellipse cx="0" cy="160" rx="14" ry="24" fill="none" stroke="#F1C40F" strokeWidth="4.5" />
                <ellipse cx="0" cy="195" rx="24" ry="14" fill="none" stroke="#F39C12" strokeWidth="4.5" />
                <ellipse cx="0" cy="230" rx="14" ry="24" fill="none" stroke="#F1C40F" strokeWidth="4.5" />
              </g>

              {/* Golden Mound of First Earth (Ile-Ife Cradle) Spreading on the Waters */}
              <ellipse cx="400" cy="400" rx="180" ry="60" fill="#D35400" stroke="#A04000" strokeWidth="3" />
              <ellipse cx="400" cy="390" rx="120" ry="38" fill="#E67E22" />
              <ellipse cx="400" cy="380" rx="70" ry="22" fill="#F39C12" />

              {/* The Sacred Five-Toed Cockerel (Aiko) Spreading the Magic Soil */}
              <g transform="translate(440, 350) scale(0.85)">
                {/* Rooster Body */}
                <ellipse cx="0" cy="0" rx="20" ry="15" fill="#C0392B" />
                {/* Bright Feathers */}
                <path d="M -15,0 C -35,-20 -40,-45 -20,-50 C -5,-40 -10,-15 -10,0" fill="#F39C12" />
                <path d="M -10,-5 C -25,-30 -30,-55 -10,-60 C 5,-50 0,-25 0,-5" fill="#27AE60" />
                {/* Comb & Wattle */}
                <circle cx="16" cy="-12" r="8" fill="#E74C3C" />
                <polygon points="16,-24 12,-18 20,-18" fill="#C0392B" />
                {/* 5-Toed Claws Scratching Earth */}
                <path d="M -6,14 L -12,24 M 0,14 L 0,26 M 6,14 L 12,24" stroke="#F1C40F" strokeWidth="2.5" />
              </g>

              {/* Sacred Snail Shell (Igbin) Containing Primordial Sand */}
              <g transform="translate(340, 370) scale(0.8)">
                <ellipse cx="0" cy="0" rx="22" ry="14" fill="#F5CBA7" stroke="#BA4A00" strokeWidth="2" />
                <path d="M -14,0 Q 0,-10 14,0 Q 0,10 -14,0" stroke="#78281F" strokeWidth="2" fill="none" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 7. SCENE: ZULU UNKULUNKULU & DRAKENSBERG REED BEDS        */}
          {/* ========================================================= */}
          {styleId === 'ZULU_DRAKENSBERG' && (
            <g id="illustration-zulu-drakensberg">
              <rect width="800" height="500" fill="url(#drakensbergSky)" />

              {/* Majestic Drakensberg Basalt Amphitheatre Escarpment */}
              <polygon points="0,280 80,180 200,240 320,150 480,220 640,140 800,210 800,500 0,500" fill="#14261C" />
              <polygon points="0,320 120,240 280,300 420,220 560,280 720,210 800,270 800,500 0,500" fill="#1F3D2D" />

              {/* The Sacred Reed Bed (Uhlanga Swamp) from where Unkulunkulu Emerged */}
              <rect y="390" width="800" height="110" fill="#145A32" />
              {/* Dense Swaying Green Reeds */}
              {[40, 90, 140, 190, 240, 290, 340, 390, 440, 490, 540, 590, 640, 690, 740].map((x, i) => (
                <g key={i} transform={`translate(${x}, 460)`}>
                  <line x1="0" y1="0" x2={i % 2 === 0 ? -12 : 12} y2="-110" stroke="#52BE80" strokeWidth="3.5" />
                  <ellipse cx={i % 2 === 0 ? -12 : 12} cy="-110" rx="5" ry="16" fill="#F9E79F" />
                </g>
              ))}

              {/* Traditional Zulu Woven Beehive Homestead (iQhugwana) */}
              <g transform="translate(620, 370)">
                <ellipse cx="0" cy="0" rx="55" ry="42" fill="#7D6608" stroke="#4D3F04" strokeWidth="2.5" />
                <path d="M -50,-5 C -35,-35 0,-42 50,-5" stroke="#B7950B" strokeWidth="4" fill="none" opacity="0.8" />
                {/* Low Arched Entrance */}
                <path d="M -14,0 C -14,-16 14,-16 14,0 Z" fill="#1B1402" />
              </g>

              {/* Nguni Cattle Patterned Silhouettes */}
              <g transform="translate(200, 390) scale(0.75)">
                <ellipse cx="40" cy="30" rx="35" ry="20" fill="#FDFEFE" stroke="#17202A" strokeWidth="2" />
                <ellipse cx="30" cy="28" rx="14" ry="10" fill="#17202A" />
                <ellipse cx="55" cy="32" rx="10" ry="8" fill="#17202A" />
                <circle cx="10" cy="22" r="12" fill="#17202A" />
                <path d="M 5,14 Q -10,0 2,-15" stroke="#BDC3C7" strokeWidth="2.5" fill="none" />
                <path d="M 15,14 Q 30,0 18,-15" stroke="#BDC3C7" strokeWidth="2.5" fill="none" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 8. SCENE: KIKUYU MOUNT KENYA (KIRINYAGA) & SACRED FIG TREE */}
          {/* ========================================================= */}
          {styleId === 'KIKUYU_KIRINYAGA' && (
            <g id="illustration-kikuyu-kirinyaga">
              <rect width="800" height="500" fill="url(#kirinyagaSky)" />

              {/* Snow-Crowned Glacial Peaks of Mount Kenya (Batian & Nelion) */}
              <polygon points="400,90 280,260 520,260" fill="#154360" />
              <polygon points="400,90 350,160 450,160" fill="#FBFCFC" />
              <polygon points="360,110 320,180 400,180" fill="#EBF5FB" />

              {/* Highland Ridge */}
              <path d="M 0,330 Q 300,280 800,320 L 800,500 L 0,500 Z" fill="#145A32" />
              <path d="M 0,380 Q 400,340 800,370 L 800,500 L 0,500 Z" fill="#0E3A21" />

              {/* The Colossal Sacred Mukuyu (Wild Fig) Tree of Gikuyu & Mumbi */}
              <g transform="translate(400, 390)">
                {/* Mighty Spreading Trunk */}
                <path
                  d="M -30,60 C -25,0 -40,-40 -50,-80 L 50,-80 C 40,-40 25,0 30,60 Z"
                  fill="#422517"
                  stroke="#27130A"
                  strokeWidth="3"
                />
                {/* Spreading Buttress Roots */}
                <path d="M -30,60 Q -70,80 -110,90 M 30,60 Q 70,80 110,90" stroke="#422517" strokeWidth="8" fill="none" />

                {/* Massive Sacred Canopy of Leaves */}
                <ellipse cx="0" cy="-110" rx="170" ry="75" fill="#1E8449" />
                <ellipse cx="-60" cy="-130" rx="100" ry="55" fill="#27AE60" opacity="0.85" />
                <ellipse cx="60" cy="-130" rx="100" ry="55" fill="#2ECC71" opacity="0.8" />
                <ellipse cx="0" cy="-150" rx="120" ry="50" fill="#52BE80" opacity="0.85" />
              </g>

              {/* Gikuyu and Mumbi Holding Wooden Blessing Gourds */}
              <g transform="translate(260, 420)">
                <circle cx="0" cy="-25" r="9" fill="#2C1B10" />
                <path d="M -7,-16 L 7,-16 L 9,25 L -9,25 Z" fill="#2C1B10" />
                <ellipse cx="14" cy="5" rx="5" ry="8" fill="#D35400" />
              </g>
              <g transform="translate(540, 420)">
                <circle cx="0" cy="-25" r="9" fill="#2C1B10" />
                <path d="M -7,-16 L 7,-16 L 9,25 L -9,25 Z" fill="#2C1B10" />
                <ellipse cx="-14" cy="5" rx="5" ry="8" fill="#D35400" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 9. SCENE: ASANTE SIKA DWA KOFI (THE GOLDEN STOOL)        */}
          {/* ========================================================= */}
          {styleId === 'ASHANTI_GOLDEN_STOOL' && (
            <g id="illustration-ashanti-golden-stool">
              <rect width="800" height="500" fill="url(#asanteThunderSky)" />

              {/* Darkening Thunderclouds of Kumasi */}
              <ellipse cx="300" cy="110" rx="190" ry="70" fill="#211A2C" opacity="0.9" />
              <ellipse cx="500" cy="120" rx="210" ry="80" fill="#181320" opacity="0.95" />

              {/* Golden Mist Cloud Surrounding the Stool */}
              <ellipse cx="400" cy="220" rx="140" ry="90" fill="url(#goldGlow)" />
              <circle cx="400" cy="220" r="80" fill="#F9E79F" opacity="0.5" />

              {/* The Golden Stool (Sika Dwa Kofi) Floating from Heaven */}
              <g transform="translate(400, 220)">
                {/* Curved Crescent Seat */}
                <path d="M -55,-25 C -30,-15 30,-15 55,-25 C 45,-38 -45,-38 -55,-25 Z" fill="#F1C40F" stroke="#B7950B" strokeWidth="2.5" />
                {/* Central Openwork Column (Sunsum column) */}
                <rect x="-14" y="-20" width="28" height="42" rx="4" fill="#F39C12" stroke="#B7950B" strokeWidth="2" />
                <circle cx="0" cy="1" r="7" fill="#FDFEFE" />
                {/* Four Flanking Corner Struts */}
                <line x1="-38" y1="-20" x2="-45" y2="22" stroke="#F1C40F" strokeWidth="4" />
                <line x1="38" y1="-20" x2="45" y2="22" stroke="#F1C40F" strokeWidth="4" />
                {/* Base Pedestal */}
                <rect x="-60" y="22" width="120" height="14" rx="3" fill="#D4AC0D" stroke="#7D6608" strokeWidth="2" />
                {/* Golden Bells Attached to the Sides */}
                <circle cx="-56" cy="2" r="6" fill="#F1C40F" stroke="#7D6608" strokeWidth="1" />
                <circle cx="56" cy="2" r="6" fill="#F1C40F" stroke="#7D6608" strokeWidth="1" />
              </g>

              {/* Rain forest Floor & Kente Cloth Canopy */}
              <path d="M 0,390 Q 400,340 800,390 L 800,500 L 0,500 Z" fill="#0E2316" />
              <path d="M 0,430 Q 400,390 800,430 L 800,500 L 0,500 Z" fill="#07130B" />

              {/* Okomfo Anokye with Raised Hands & Sword of Unity */}
              <g transform="translate(230, 390)">
                <circle cx="0" cy="-40" r="12" fill="#FDFEFE" />
                <path d="M -12,-28 L 12,-28 L 18,45 L -18,45 Z" fill="#FDFEFE" stroke="#BDC3C7" strokeWidth="2" />
                {/* Upraised Arms in Invocation */}
                <line x1="-12" y1="-20" x2="-35" y2="-65" stroke="#FDFEFE" strokeWidth="4" />
                <line x1="12" y1="-20" x2="35" y2="-65" stroke="#FDFEFE" strokeWidth="4" />
              </g>
            </g>
          )}

          {/* ========================================================= */}
          {/* 10. CLASSIC: ANANSE AND THE POT OF WISDOM (ASHANTI CANOPY) */}
          {/* ========================================================= */}
          {styleId === 'ANANSE_FOREST' && (
            <g id="illustration-ananse-forest">
              <rect width="800" height="500" fill="url(#forestSky)" />
              {/* Giant Odum Tree */}
              <path d="M 520,500 C 500,380 470,260 510,140 C 530,70 560,0 590,0 L 680,0 C 660,110 630,220 670,350 C 700,430 760,480 800,500 Z" fill="#26160C" />
              {/* Sprawling High Branch */}
              <path d="M 515,160 C 420,150 280,110 180,130 C 130,140 70,190 0,220 L 0,160 C 90,130 160,80 260,80 C 370,80 460,110 520,130 Z" fill="#26160C" />

              {/* Canopy */}
              <ellipse cx="650" cy="50" rx="190" ry="110" fill="#1B4D2E" opacity="0.95" />
              <ellipse cx="400" cy="40" rx="220" ry="100" fill="#143D24" opacity="0.9" />
              <ellipse cx="180" cy="90" rx="170" ry="80" fill="#23633C" opacity="0.9" />

              {/* Golden Spider Web */}
              <g transform="translate(260, 110)">
                <circle cx="0" cy="0" r="140" fill="url(#goldGlow)" />
                <line x1="0" y1="0" x2="-120" y2="100" stroke="#F4B32A" strokeWidth="2.5" opacity="0.85" />
                <line x1="0" y1="0" x2="-60" y2="130" stroke="#F4B32A" strokeWidth="2.5" opacity="0.85" />
                <line x1="0" y1="0" x2="20" y2="140" stroke="#F4B32A" strokeWidth="2.5" opacity="0.85" />
                <line x1="0" y1="0" x2="90" y2="110" stroke="#F4B32A" strokeWidth="2.5" opacity="0.85" />
                <circle cx="0" cy="0" r="35" fill="none" stroke="#F4D06F" strokeWidth="2" opacity="0.9" />
                <circle cx="0" cy="0" r="65" fill="none" stroke="#F4D06F" strokeWidth="2" opacity="0.8" strokeDasharray="6,4" />
                <circle cx="0" cy="0" r="95" fill="none" stroke="#F4D06F" strokeWidth="2" opacity="0.7" strokeDasharray="8,5" />

                {/* Kwaku Ananse with Pot */}
                <ellipse cx="0" cy="0" rx="16" ry="14" fill="#2E1C12" stroke="#E25822" strokeWidth="2" />
                <ellipse cx="0" cy="18" rx="22" ry="26" fill="#1E120A" stroke="#F4B32A" strokeWidth="2.5" />
                {/* Clay Pot */}
                <ellipse cx="0" cy="48" rx="26" ry="24" fill="#C85A32" stroke="#8C3516" strokeWidth="2.5" />
              </g>
              <path d="M 0,440 Q 140,410 320,440 Q 520,460 800,430 L 800,500 L 0,500 Z" fill="#0E2316" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 11. CLASSIC: SAVANNA BAOBAB SUNSET                        */}
          {/* ========================================================= */}
          {styleId === 'BAOBAB_SUNSET' && (
            <g id="illustration-baobab-sunset">
              <rect width="800" height="500" fill="url(#savannaSky)" />
              <circle cx="480" cy="220" r="95" fill="url(#sunGlow)" />
              <circle cx="480" cy="220" r="65" fill="#FFF9A6" />
              {/* Baobab Tree */}
              <g id="giant-baobab">
                <path d="M 280,460 C 270,360 250,280 270,220 C 290,160 320,130 330,110 L 370,110 C 380,130 400,160 420,220 C 440,280 430,360 420,460 C 450,470 510,485 530,500 L 170,500 C 190,485 250,470 280,460 Z" fill="#2E140C" />
                <ellipse cx="350" cy="380" rx="28" ry="48" fill="#190A06" />
                <path d="M 320,160 C 260,140 180,120 120,80 C 80,50 40,30 10,20 L 20,40 C 60,50 100,75 140,110 C 200,150 280,180 320,190 Z" fill="#2E140C" />
                <path d="M 375,140 C 420,110 490,80 570,60 C 630,45 700,40 760,30 L 750,48 C 695,58 630,65 570,80 C 495,100 425,135 380,170 Z" fill="#2E140C" />
                <ellipse cx="70" cy="25" rx="35" ry="18" fill="#425C1B" opacity="0.9" />
                <ellipse cx="140" cy="85" rx="45" ry="22" fill="#587A24" opacity="0.95" />
                <ellipse cx="580" cy="65" rx="48" ry="24" fill="#587A24" opacity="0.95" />
              </g>
              {/* Soaring Birds */}
              <g transform="translate(560, 140) scale(0.9)">
                <path d="M 0,0 Q -30,-40 -60,-20 Q -40,-10 0,0 Q 30,-40 60,-20 Q 40,-10 0,0" fill="#1D150E" />
              </g>
              <path d="M 0,430 Q 220,380 440,410 Q 660,440 800,400 L 800,500 L 0,500 Z" fill="#421C0E" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 12. CLASSIC: LAKE VICTORIA (NALUBAALE) MIST & STONE WARRIOR */}
          {/* ========================================================= */}
          {styleId === 'LAKE_VICTORIA_MIST' && (
            <g id="illustration-lake-victoria">
              <rect width="800" height="500" fill="url(#lakeSky)" />
              <rect y="310" width="800" height="190" fill="#102538" />
              <path d="M 0,350 Q 200,330 400,350 Q 600,370 800,350 L 800,500 L 0,500 Z" fill="#16324F" />
              {/* Sacred Stone Monolith of Luanda Magere */}
              <polygon points="460,460 480,240 520,230 560,260 550,470" fill="#2C3E50" stroke="#1A252F" strokeWidth="3" />
              {/* Reeds */}
              <line x1="80" y1="480" x2="90" y2="340" stroke="#27AE60" strokeWidth="4" />
              <line x1="95" y1="490" x2="105" y2="330" stroke="#2ECC71" strokeWidth="3.5" />
              <line x1="110" y1="480" x2="120" y2="350" stroke="#27AE60" strokeWidth="4" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 13. CLASSIC: RIFT VALLEY STORM & ESCARPMENT               */}
          {/* ========================================================= */}
          {styleId === 'RIFT_VALLEY_STORM' && (
            <g id="illustration-rift-valley">
              <rect width="800" height="500" fill="url(#riftSky)" />
              <polygon points="0,320 180,180 340,240 520,160 800,280 800,500 0,500" fill="#3D261A" />
              <path d="M 0,400 Q 400,350 800,400 L 800,500 L 0,500 Z" fill="#2E1C12" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 14. CLASSIC: EVENING VILLAGE FIRESIDE                     */}
          {/* ========================================================= */}
          {styleId === 'VILLAGE_FIRESIDE' && (
            <g id="illustration-fireside">
              <rect width="800" height="500" fill="url(#nightSky)" />
              <circle cx="400" cy="400" r="160" fill="url(#goldGlow)" />
              <circle cx="400" cy="400" r="90" fill="#FF5722" opacity="0.6" />
              {/* Fire Flame */}
              <polygon points="400,320 370,410 430,410" fill="#FFC107" />
              <polygon points="390,340 375,410 415,410" fill="#FFEB3B" />
              <path d="M 0,420 Q 400,380 800,420 L 800,500 L 0,500 Z" fill="#1C1008" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 15. CLASSIC: VIBRANT VILLAGE MARKETPLACE                  */}
          {styleId === 'MARKETPLACE_COLORS' && (
            <g id="illustration-market">
              <rect width="800" height="500" fill="url(#marketSky)" />
              {/* Colorful Canopies */}
              <polygon points="100,280 240,240 280,310 140,350" fill="#E74C3C" />
              <polygon points="260,260 400,220 440,290 300,330" fill="#F39C12" />
              <polygon points="420,240 560,200 600,270 460,310" fill="#27AE60" />
              <path d="M 0,410 Q 400,380 800,410 L 800,500 L 0,500 Z" fill="#3E2723" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 16. CLASSIC: SAHARA OASIS DUNES                           */}
          {styleId === 'DESERT_CARAVAN' && (
            <g id="illustration-desert">
              <rect width="800" height="500" fill="url(#desertSky)" />
              <path d="M 0,360 C 220,260 400,400 800,310 L 800,500 L 0,500 Z" fill="#D35400" />
              <path d="M 0,410 C 280,330 520,440 800,370 L 800,500 L 0,500 Z" fill="#BA4A00" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 17. CLASSIC: SWAHILI COASTAL DHOW SAIL                    */}
          {styleId === 'COASTAL_DHOW' && (
            <g id="illustration-coastal">
              <rect width="800" height="500" fill="url(#coastSky)" />
              <rect y="300" width="800" height="200" fill="#1B6A7A" />
              <g transform="translate(360, 240)">
                <path d="M -80,95 C -40,110 50,110 110,90 C 70,125 -30,125 -80,95 Z" fill="#452715" stroke="#291407" strokeWidth="3" />
                <line x1="0" y1="105" x2="15" y2="-75" stroke="#291407" strokeWidth="5" />
                <polygon points="-55,60 55,-90 35,90" fill="#FBF7EE" stroke="#D1C7AC" strokeWidth="2" />
              </g>
            </g>
          )}

          {/* Hand-crafted Folk Texture Overlay */}
          <rect width="800" height="500" fill="url(#folkTexture)" pointerEvents="none" />

          {/* Framing African Geometric Border */}
          <rect
            x="6"
            y="6"
            width="788"
            height="488"
            rx="12"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
            strokeDasharray="16,8"
            pointerEvents="none"
          />
        </svg>
      )}

      {/* Gradient Bottom Shadow for Overlay Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-black/20 pointer-events-none" />

      {/* Top Badges & Drawing Style Tag */}
      {showBadge && (
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/70 backdrop-blur-xs text-[#F4B32A] border border-[#F4B32A]/30 shadow-xs">
              <span>🎨</span>
              <span className="tracking-wide uppercase line-clamp-1">{currentStyleMeta.name}</span>
            </span>

            {story?.country && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1D3E2F]/90 text-[#FBF7EE] border border-white/20">
                {story.country}
              </span>
            )}

            {currentStyleMeta.tradition.includes('Uganda') && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-stone-950 shadow-xs">
                <span>🇺🇬</span>
                <span>Uganda Spotlight</span>
              </span>
            )}
          </div>

          {/* Art vs Documentary Photo Toggle (when photo is available) */}
          {hasPhoto && allowPhotoView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode((curr) => (curr === 'ART' ? 'PHOTO' : 'ART'));
              }}
              className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 hover:bg-white/35 backdrop-blur-md text-white border border-white/30 shadow-xs transition-colors cursor-pointer"
              title="Toggle between handcrafted storybook art and documentary photo archive"
            >
              <span>{viewMode === 'ART' ? '📷 View Photo' : '🎨 View Art'}</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom Information or Caption */}
      {showCaption && story && (
        <div className="absolute bottom-3 left-3 right-3 z-10 text-white text-xs flex items-center justify-between pointer-events-none">
          <p className="line-clamp-1 italic font-medium text-white/90">
            {story.illustration?.caption || `${story.title} • ${currentStyleMeta.description}`}
          </p>
          <span className="text-[10px] text-[#F4D06F] shrink-0 ml-2 hidden sm:inline font-semibold">
            {currentStyleMeta.tradition}
          </span>
        </div>
      )}
    </div>
  );
};
