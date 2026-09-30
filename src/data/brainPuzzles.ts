import { BrainPuzzleEntity } from '../types/afrobox';

export const AFROBOX_BRAIN_PUZZLES: BrainPuzzleEntity[] = [
  // 1. Geography Challenge: East African Lakes & Mountains
  {
    id: 'puzzle-east-africa-geo',
    title: 'The Great Waters Geography Challenge',
    type: 'GEOGRAPHY_MATCH',
    description: 'Connect iconic geographical features of Africa with the countries that embrace them.',
    instruction: 'Tap a feature on the left, then tap its matching African country or region on the right!',
    ageTier: '6-8',
    region: 'East Africa',
    connectedEntityIds: ['entity-lake-victoria', 'entity-kilimanjaro', 'entity-tilapia'],
    payload: {
      items: [
        { id: 'item-lake-vic', label: 'Lake Victoria', matchId: 'target-tri-country', icon: '🌊' },
        { id: 'item-kili', label: 'Mount Kilimanjaro', matchId: 'target-tanzania', icon: '⛰️' },
        { id: 'item-matobo', label: 'Matobo Granite Hills', matchId: 'target-zimbabwe', icon: '🪨' },
        { id: 'item-cross-river', label: 'Cross River Estuary', matchId: 'target-nigeria', icon: '🌴' }
      ],
      targets: [
        { id: 'target-tri-country', label: 'Uganda, Kenya & Tanzania', icon: '🌍' },
        { id: 'target-tanzania', label: 'Tanzania', icon: '🇹🇿' },
        { id: 'target-zimbabwe', label: 'Zimbabwe', icon: '🇿🇼' },
        { id: 'target-nigeria', label: 'Nigeria & Cameroon', icon: '🇳🇬' }
      ],
      explanation:
        'Great job! Lake Victoria is shared between Uganda, Kenya, and Tanzania; Kilimanjaro towers over Tanzania; the Matobo Hills grace Zimbabwe; and the Cross River flows through Nigeria into the Atlantic ocean.'
    }
  },

  // 2. Language & Wisdom Match: Indigenous African Words
  {
    id: 'puzzle-word-translate',
    title: 'Living Words & Meanings Match',
    type: 'WORD_TRANSLATE',
    description: 'Match indigenous African vocabulary words with their rich cultural meanings.',
    instruction: 'Can you match each indigenous word with its definition?',
    ageTier: '6-8',
    region: 'West Africa',
    connectedEntityIds: ['entity-swahili', 'entity-akan-lang', 'entity-guineafowl'],
    payload: {
      items: [
        { id: 'word-nyansa', label: 'Nyansa (Akan)', matchId: 'def-wisdom', icon: '✨' },
        { id: 'word-baraza', label: 'Baraza (Swahili)', matchId: 'def-council', icon: '🏛️' },
        { id: 'word-hanga', label: 'Hanga (Shona)', matchId: 'def-bird', icon: '🪶' },
        { id: 'word-utin', label: 'Utin (Efik)', matchId: 'def-sun', icon: '☀️' }
      ],
      targets: [
        { id: 'def-wisdom', label: 'Deep practical wisdom that lives in everyone', icon: '💡' },
        { id: 'def-council', label: 'A peaceful community gathering council on the veranda', icon: '🤝' },
        { id: 'def-bird', label: 'The spotted helmeted guineafowl bird', icon: '🐦' },
        { id: 'def-sun', label: 'The radiant sun that shines warm upon the land', icon: '🌅' }
      ],
      explanation:
        'Fabulous! You have unlocked four living words from Akan, Swahili, Shona, and Efik traditions.'
    }
  },

  // 3. Animal Habitats: Who Lives Where?
  {
    id: 'puzzle-habitat-sort',
    title: 'African Habitat Harmony',
    type: 'HABITAT_SORT',
    description: 'Sort animals and trees to their real natural habitats across Africa.',
    instruction: 'Match each living creature with its natural home!',
    ageTier: '9-10',
    region: 'Southern Africa',
    connectedEntityIds: ['entity-tilapia', 'entity-guineafowl', 'entity-baobab'],
    payload: {
      items: [
        { id: 'hab-tilapia', label: 'Tilapia (Ngege)', matchId: 'loc-lake', icon: '🐟' },
        { id: 'hab-guineafowl', label: 'Guineafowl (Hanga)', matchId: 'loc-kopjes', icon: '🪶' },
        { id: 'hab-baobab', label: 'Baobab Tree', matchId: 'loc-savanna', icon: '🌳' },
        { id: 'hab-kora', label: 'Kora Calabash', matchId: 'loc-sahel', icon: '🎵' }
      ],
      targets: [
        { id: 'loc-lake', label: 'Freshwater Lake & Reedbeds', icon: '🌊' },
        { id: 'loc-kopjes', label: 'Granite Rocks & High Kopjes', icon: '🪨' },
        { id: 'loc-savanna', label: 'Dry Savannas & Grasslands', icon: '🌾' },
        { id: 'loc-sahel', label: 'Griot Courts & Riverbanks', icon: '🏛️' }
      ],
      explanation:
        'Spot on! African biodiversity adapts perfectly to diverse landscapes—from deep freshwater lakes to sunny granite kopjes.'
    }
  },

  // 4. Cultural Architecture & Music
  {
    id: 'puzzle-architecture-match',
    title: 'Builders & Master Musicians',
    type: 'RHYTHM_PATTERN',
    description: 'Discover how ancient African builders and musicians crafted great treasures from nature.',
    instruction: 'Match the masterpiece with the natural materials used to build it!',
    ageTier: '11-12',
    region: 'Southern Africa',
    connectedEntityIds: ['entity-great-zimbabwe', 'entity-kora', 'entity-mbira'],
    payload: {
      items: [
        { id: 'art-great-zim', label: 'Great Zimbabwe Walls', matchId: 'mat-granite', icon: '🏰' },
        { id: 'art-kora', label: 'The Kora 21-String Harp', matchId: 'mat-calabash', icon: '🎶' },
        { id: 'art-mbira', label: 'Mbira Thumb Piano', matchId: 'mat-iron', icon: '🎹' },
        { id: 'art-djenne', label: 'Djenne Great Mosque', matchId: 'mat-earth', icon: '🕌' }
      ],
      targets: [
        { id: 'mat-granite', label: 'Carved curved granite blocks fitted with no mortar', icon: '🧱' },
        { id: 'mat-calabash', label: 'Large sun-dried calabash gourd & cowhide soundboard', icon: '🍈' },
        { id: 'mat-iron', label: 'Hand-hammered iron keys on hardwood', icon: '🔨' },
        { id: 'mat-earth', label: 'Sun-baked mud bricks & palm timber beams', icon: '🪵' }
      ],
      explanation:
        'Brilliant engineering! African builders, sculptors, and instrument makers utilized local granite, earth, calabash, and iron with immense ingenuity.'
    }
  }
];
