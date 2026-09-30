import { AfricanRegion, EntityType } from '../types/afrobox';

export type { AfricanRegion };

export type MapPinCategory =
  | 'ALL'
  | 'NATURAL_FEATURE'
  | 'ANIMAL'
  | 'LANDMARK'
  | 'CITY'
  | 'FOOD'
  | 'INSTRUMENT'
  | 'LANGUAGE'
  | 'SECRET';

export interface MapPinItem {
  id: string;
  name: string;
  localName?: string;
  pronunciation?: string;
  type: EntityType;
  category: MapPinCategory;
  region: AfricanRegion;
  country: string;
  city?: string;
  hierarchyPath: string[]; // e.g. ['Africa', 'Uganda', 'Kampala', 'Lake Victoria', 'Tilapia']
  x: number; // 0 - 1000 SVG coordinates
  y: number; // 0 - 1000 SVG coordinates
  minZoom: number; // 1 = continent, 1.7 = regional, 2.4 = deep local
  icon: string;
  badgeBg: string;
  tagline: string;
  description: string;
  curiousFact: string;
  illustrationUrl: string;
  audioPronunciationText?: string;
  soundType: 'water' | 'drum' | 'bird' | 'fish' | 'city' | 'lion' | 'kora' | 'mbira' | 'talking-drum' | 'balafon' | 'hosho' | 'flute' | 'wind' | 'chime' | 'food';
  instrumentType?: 'kora' | 'mbira' | 'talking-drum' | 'balafon' | 'hosho' | 'flute';
  pronunciationWordId?: string;
  accentRegion?: 'west-african' | 'east-african' | 'southern-african' | 'north-african';
  greetings?: Array<{ phrase: string; phonetic: string; meaning: string }>;
  connectedStoryId?: string;
  connectedRiddleId?: string;
  connectedBrainPuzzleId?: string;
  isSecret?: boolean;
}

export interface MapRegionInfo {
  id: AfricanRegion;
  label: string;
  shortLabel: string;
  icon: string;
  centerX: number;
  centerY: number;
  targetZoom: number;
  description: string;
  highlights: string[];
}

export const MAP_REGIONS: MapRegionInfo[] = [
  {
    id: 'North Africa',
    label: 'North Africa (Sahara & Mediterranean)',
    shortLabel: 'North Africa',
    icon: '☀️',
    centerX: 520,
    centerY: 240,
    targetZoom: 2.2,
    description: 'Golden dunes of the Sahara, the great River Nile, ancient pyramids, and Mediterranean olive groves.',
    highlights: ['Pyramids of Giza', 'River Nile', 'Atlas Mountains', 'Moroccan Tagine', 'Sahara Desert']
  },
  {
    id: 'West Africa',
    label: 'West Africa (Savannas & Atlantic Coast)',
    shortLabel: 'West Africa',
    icon: '🌅',
    centerX: 300,
    centerY: 460,
    targetZoom: 2.4,
    description: 'Vibrant music, kora harps, Ananse trickster tales, colorful kente cloth, and steaming jollof rice.',
    highlights: ['Kora Harp', 'Djenné Mosque', 'Akan Kente Cloth', 'Jollof Rice', 'Niger River']
  },
  {
    id: 'Central Africa',
    label: 'Central Africa (Congo Rainforest & Virunga)',
    shortLabel: 'Central Africa',
    icon: '🌴',
    centerX: 520,
    centerY: 580,
    targetZoom: 2.3,
    description: 'Earth’s second largest tropical rainforest, the mighty Congo River, and misty mountain gorilla sanctuaries.',
    highlights: ['Congo River', 'Mountain Gorillas', 'Forest Elephants', 'Virunga Volcanoes']
  },
  {
    id: 'East Africa',
    label: 'East Africa (Great Lakes, Rift Valley & Horn)',
    shortLabel: 'East Africa',
    icon: '🌿',
    centerX: 720,
    centerY: 530,
    targetZoom: 2.3,
    description: 'Snow-capped Mount Kilimanjaro, Lake Victoria, boundless Serengeti plains, and the melodic Kiswahili tongue.',
    highlights: ['Lake Victoria', 'Mount Kilimanjaro', 'Tilapia Fish', 'Kiswahili', 'Serengeti Migration']
  },
  {
    id: 'Southern Africa',
    label: 'Southern Africa (Zambezi, Kopjes & Madagascar)',
    shortLabel: 'Southern Africa',
    icon: '🦁',
    centerX: 600,
    centerY: 800,
    targetZoom: 2.2,
    description: 'The roaring Victoria Falls, ancient Great Zimbabwe stone walls, jumping lemurs, and melodic mbira thumb pianos.',
    highlights: ['Victoria Falls', 'Great Zimbabwe', 'Matobo Granite Rocks', 'Mbira', 'Madagascar Lemurs']
  }
];

export const MAP_PINS: MapPinItem[] = [
  // ==========================================
  // EAST AFRICA
  // ==========================================
  {
    id: 'pin-lake-victoria',
    name: 'Lake Victoria (Nam Lolwe / Nnalubaale)',
    localName: 'Nnalubaale (Luganda) • Nam Lolwe (Dholuo)',
    pronunciation: 'Nnah-loo-BAH-lay / Nahm LOL-way',
    type: 'NATURAL_FEATURE',
    category: 'NATURAL_FEATURE',
    region: 'East Africa',
    country: 'Uganda',
    city: 'Entebbe / Kampala',
    hierarchyPath: ['Africa', 'East Africa', 'Uganda', 'Kampala', 'Lake Victoria'],
    x: 685,
    y: 540,
    minZoom: 1.0, // Visible even at continental level
    icon: '🌊',
    badgeBg: '#1D3E2F',
    tagline: 'The glistening freshwater jewel at the heart of Africa',
    description:
      'Lake Victoria is the largest lake in Africa and the second-largest freshwater lake in the entire world! Its shimmering blue waters provide freshwater and life for millions of people across Uganda, Kenya, and Tanzania.',
    curiousFact: 'Lake Victoria is so immense that it holds over 3,000 lush green islands where fishing families live in harmony with water birds!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    soundType: 'water',
    audioPronunciationText: 'Lake Victoria, called Nnalubaale in Luganda and Nam Lolwe in Dholuo.',
    connectedStoryId: 'story-sungura-lake-victoria',
    connectedRiddleId: 'riddle-lake-victoria',
    connectedBrainPuzzleId: 'puzzle-east-africa-geo'
  },
  {
    id: 'pin-tilapia',
    name: 'Tilapia Fish (Ngege)',
    localName: 'Ngege (Luo & Swahili)',
    pronunciation: 'N-GAY-gay',
    type: 'ANIMAL',
    category: 'ANIMAL',
    region: 'East Africa',
    country: 'Uganda',
    city: 'Lake Victoria Shores',
    hierarchyPath: ['Africa', 'East Africa', 'Uganda', 'Kampala', 'Lake Victoria', 'Tilapia'],
    x: 695,
    y: 550,
    minZoom: 2.3, // Deep discovery zoom!
    icon: '🐟',
    badgeBg: '#2A729A',
    tagline: 'The sweet shimmering lake fish with magical mouth-shelters',
    description:
      'Tilapia swim in schools through the papyrus reeds of Lake Victoria. Mother tilapia are caring protectors called mouthbrooders: when a predator approaches, baby fish quickly swim right into their mother’s mouth for safety!',
    curiousFact:
      'When danger passes, the mother tilapia gently opens her mouth and dozens of baby fish swim out into the sunlit water again!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    soundType: 'fish',
    pronunciationWordId: 'ngege',
    accentRegion: 'east-african',
    audioPronunciationText: 'Ngege, the beloved Tilapia of Lake Victoria.',
    connectedStoryId: 'story-sungura-lake-victoria',
    connectedRiddleId: 'riddle-tilapia',
    connectedBrainPuzzleId: 'puzzle-habitat-sort'
  },
  {
    id: 'pin-kampala',
    name: 'Kampala (City of Seven Hills)',
    localName: 'Akabuga k’Empeewo (Luganda)',
    pronunciation: 'Kahm-PAH-lah',
    type: 'CITY',
    category: 'CITY',
    region: 'East Africa',
    country: 'Uganda',
    city: 'Kampala',
    hierarchyPath: ['Africa', 'East Africa', 'Uganda', 'Kampala'],
    x: 675,
    y: 525,
    minZoom: 1.7,
    icon: '🏙️',
    badgeBg: '#C85A32',
    tagline: 'Uganda’s bustling hilltop capital on the shores of Lake Victoria',
    description:
      'Kampala was built across rolling green hills where herds of graceful impalas once grazed. Today it is alive with vibrant markets, matatu minibuses, university students, and gentle lake breezes.',
    curiousFact:
      'The name Kampala comes from the Luganda phrase "Kasozi k’Empala", meaning "the Hill of the Impala"!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    soundType: 'city',
    pronunciationWordId: 'kampala',
    accentRegion: 'east-african',
    audioPronunciationText: 'Kampala, capital of Uganda.',
    greetings: [
      { phrase: 'Oli otya?', phonetic: 'Oh-lee OH-tyah', meaning: 'How are you?' },
      { phrase: 'Gyendi!', phonetic: 'JEN-dee', meaning: 'I am doing well!' }
    ]
  },
  {
    id: 'pin-tilapia-stew',
    name: 'Lake Tilapia Coconut Stew',
    localName: 'Samaki wa Kupaka',
    pronunciation: 'Sah-MAH-kee wah koo-PAH-kah',
    type: 'FOOD',
    category: 'FOOD',
    region: 'East Africa',
    country: 'Uganda / Kenya',
    hierarchyPath: ['Africa', 'East Africa', 'Uganda', 'Lake Victoria', 'Tilapia Stew'],
    x: 710,
    y: 535,
    minZoom: 2.4,
    icon: '🍲',
    badgeBg: '#D9822B',
    tagline: 'Whole grilled fresh tilapia simmered in rich coconut and ginger gravy',
    description:
      'After fishermen bring the afternoon catch to shore, families season the fish with lime and garlic, pan-fry it crisp, and spoon a fragrant golden coconut sauce over warm ugali.',
    curiousFact: 'Families traditionally eat together from a shared platter, rolling a warm morsel of ugali in their right hand to scoop the sauce!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    soundType: 'food',
    pronunciationWordId: 'samaki-wa-kupaka',
    accentRegion: 'east-african',
    audioPronunciationText: 'Samaki wa Kupaka, fresh fish in coconut curry.'
  },
  {
    id: 'pin-kilimanjaro',
    name: 'Mount Kilimanjaro',
    localName: 'Oldoinyo Oibor (Maasai: White Mountain)',
    pronunciation: 'Kil-ee-man-JAH-ro',
    type: 'NATURAL_FEATURE',
    category: 'NATURAL_FEATURE',
    region: 'East Africa',
    country: 'Tanzania',
    hierarchyPath: ['Africa', 'East Africa', 'Tanzania', 'Mount Kilimanjaro'],
    x: 725,
    y: 605,
    minZoom: 1.0,
    icon: '⛰️',
    badgeBg: '#1D3E2F',
    tagline: 'The snow-crowned giant standing tall above the golden plains',
    description:
      'Mount Kilimanjaro is the tallest free-standing mountain in the world! Rising 5,895 meters above sea level, its peak reaches into the clouds with glistening white glaciers right near the equator.',
    curiousFact: 'Climbing Kilimanjaro is like walking from the equator to the North Pole in just one week! You pass rainforest, moorland, desert, and arctic ice.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    soundType: 'wind',
    audioPronunciationText: 'Mount Kilimanjaro in Tanzania.',
    connectedRiddleId: 'riddle-kilimanjaro',
    connectedBrainPuzzleId: 'puzzle-east-africa-geo'
  },
  {
    id: 'pin-swahili-language',
    name: 'Kiswahili Language',
    localName: 'Lugha ya Kiswahili',
    pronunciation: 'Kee-swah-HEE-lee',
    type: 'LANGUAGE',
    category: 'LANGUAGE',
    region: 'East Africa',
    country: 'Tanzania / Kenya',
    hierarchyPath: ['Africa', 'East Africa', 'Swahili Coast', 'Kiswahili'],
    x: 755,
    y: 590,
    minZoom: 1.8,
    icon: '🗣️',
    badgeBg: '#7C4728',
    tagline: 'The rhythmic language connecting over 200 million people',
    description:
      'Kiswahili is the official language of the African Union, Tanzania, and Kenya. It has beautiful proverbs, melodic greetings, and was born along the Indian Ocean trade winds.',
    curiousFact: 'The United Nations celebrates World Kiswahili Day every July 7th because of its message of peace and unity across Africa!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    soundType: 'chime',
    audioPronunciationText: 'Habari! Jambo! Kiswahili connects millions of hearts.',
    greetings: [
      { phrase: 'Jambo!', phonetic: 'JAHM-boh', meaning: 'Hello!' },
      { phrase: 'Habari yako?', phonetic: 'Hah-BAH-ree YAH-ko', meaning: 'How are you?' },
      { phrase: 'Nzuri sana!', phonetic: 'N-ZOO-ree SAH-nah', meaning: 'Very good!' },
      { phrase: 'Asante sana', phonetic: 'Ah-SAHN-tay SAH-nah', meaning: 'Thank you very much' }
    ],
    connectedBrainPuzzleId: 'puzzle-word-translate'
  },
  {
    id: 'pin-nairobi',
    name: 'Nairobi (The Green City in the Sun)',
    localName: 'Enkare Nyrobi (Maasai: Place of Cool Waters)',
    pronunciation: 'Nigh-ROH-bee',
    type: 'CITY',
    category: 'CITY',
    region: 'East Africa',
    country: 'Kenya',
    city: 'Nairobi',
    hierarchyPath: ['Africa', 'East Africa', 'Kenya', 'Nairobi'],
    x: 715,
    y: 565,
    minZoom: 1.7,
    icon: '🏙️',
    badgeBg: '#C85A32',
    tagline: 'A vibrant modern metropolis with a wild national park right on its doorstep',
    description:
      'Nairobi is Kenya’s energetic capital. It is the only capital city on Earth with a wildlife safari park where wild giraffes and black rhinos graze against a backdrop of city skyscrapers!',
    curiousFact: 'The Maasai called this area Enkare Nyrobi because of a refreshing cold river that provided cool water for herds during the sunny days.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
    soundType: 'city',
    audioPronunciationText: 'Nairobi, the capital of Kenya.'
  },
  {
    id: 'pin-injera-food',
    name: 'Injera Flatbread & Doro Wat',
    localName: 'Injera (Amharic: እንጀራ)',
    pronunciation: 'In-JEH-rah dah-ROH waht',
    type: 'FOOD',
    category: 'FOOD',
    region: 'East Africa',
    country: 'Ethiopia',
    city: 'Addis Ababa',
    hierarchyPath: ['Africa', 'East Africa', 'Ethiopia', 'Addis Ababa', 'Injera'],
    x: 720,
    y: 430,
    minZoom: 2.3,
    icon: '🫓',
    badgeBg: '#D9822B',
    tagline: 'Spongy fermented sourdough flatbread served on a giant woven mesob basket',
    description:
      'Injera is made from teff, an ancient tiny cereal grain native to Ethiopia. Families gather around a giant colorful basket to share dishes, tearing pieces of injera to scoop up spiced lentils and stew.',
    curiousFact: 'Teff seeds are so tiny that 150 grains of teff weigh as much as just one grain of wheat!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    soundType: 'food',
    audioPronunciationText: 'Injera, the traditional sourdough bread of Ethiopia.'
  },
  {
    id: 'pin-addis-ababa',
    name: 'Addis Ababa (New Flower)',
    localName: 'Addis Abäba (Amharic: አዲስ አበባ)',
    pronunciation: 'Ah-DEES AH-bah-bah',
    type: 'CITY',
    category: 'CITY',
    region: 'East Africa',
    country: 'Ethiopia',
    city: 'Addis Ababa',
    hierarchyPath: ['Africa', 'East Africa', 'Ethiopia', 'Addis Ababa'],
    x: 710,
    y: 410,
    minZoom: 1.7,
    icon: '🏛️',
    badgeBg: '#C85A32',
    tagline: 'Highland diplomatic capital of Africa perched in the Entoto eucalyptus hills',
    description:
      'Addis Ababa sits at an elevation of 2,355 meters, making it one of the highest capital cities in the world. It is home to the headquarters of the African Union and ancient paleontological treasures.',
    curiousFact: 'The fossil skeleton of our famous 3.2-million-year-old human ancestor, Dinkinesh (Lucy), rests in the National Museum here!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    soundType: 'city',
    audioPronunciationText: 'Addis Ababa, the diplomatic heart of Africa.'
  },

  // ==========================================
  // WEST AFRICA
  // ==========================================
  {
    id: 'pin-kora-harp',
    name: 'The 21-String Kora Harp',
    localName: 'Kora (Mandinka & Wolof)',
    pronunciation: 'KOH-rah',
    type: 'INSTRUMENT',
    category: 'INSTRUMENT',
    region: 'West Africa',
    country: 'Gambia / Senegal / Mali',
    hierarchyPath: ['Africa', 'West Africa', 'Gambia River', 'Kora Harp'],
    x: 180,
    y: 430,
    minZoom: 1.8,
    icon: '🎵',
    badgeBg: '#E25822',
    tagline: 'A royal calabash harp whose strings sparkle like flowing river water',
    description:
      'Crafted from a large dried calabash gourd wrapped in cowhide, the Kora has 21 strings plucked with only the thumbs and index fingers. Master storytellers called Jalis (Griots) use it to sing epics of great kings.',
    curiousFact: 'A master Kora player can pluck basslines, harmony chords, and sparkling melodies all at the exact same moment on 21 strings!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    soundType: 'kora',
    instrumentType: 'kora',
    pronunciationWordId: 'kora',
    accentRegion: 'west-african',
    audioPronunciationText: 'The Kora, the 21-string harp of West African griots.',
    connectedStoryId: 'story-ananse-pot-wisdom',
    connectedRiddleId: 'riddle-ananse'
  },
  {
    id: 'pin-talking-drum',
    name: 'The Talking Drum (Dùndún / Tama)',
    localName: 'Gangan (Yoruba) • Tama (Wolof)',
    pronunciation: 'DOON-doon / GAHN-gahn',
    type: 'INSTRUMENT',
    category: 'INSTRUMENT',
    region: 'West Africa',
    country: 'Nigeria / Senegal',
    city: 'Ibadan',
    hierarchyPath: ['Africa', 'West Africa', 'Nigeria', 'Yorubaland', 'Talking Drum'],
    x: 375,
    y: 495,
    minZoom: 1.8,
    icon: '🪘',
    badgeBg: '#7C4728',
    tagline: 'An hourglass tension drum squeezed under the arm to speak the words of songs',
    description:
      'The player squeezes the leather tension cords linked to both goat-skin heads with their upper arm. By tightening and releasing the cords while striking with a curved stick, the drum bends pitch to mimic human speech!',
    curiousFact: 'In ancient kingdoms, talking drum messages could travel from village to village across 30 kilometers in under an hour!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    soundType: 'talking-drum',
    instrumentType: 'talking-drum',
    accentRegion: 'west-african',
    audioPronunciationText: 'The Talking Drum, the voice of West African celebrations.'
  },
  {
    id: 'pin-balafon',
    name: 'The Balafon (Gourd Xylophone)',
    localName: 'Bala (Mandinka) • Gyil (Dagara)',
    pronunciation: 'BAH-lah-fohn / JEEL',
    type: 'INSTRUMENT',
    category: 'INSTRUMENT',
    region: 'West Africa',
    country: 'Guinea / Mali / Ghana',
    hierarchyPath: ['Africa', 'West Africa', 'Guinea', 'Balafon'],
    x: 235,
    y: 470,
    minZoom: 2.0,
    icon: '🪵',
    badgeBg: '#C85A32',
    tagline: 'Resonant rosewood wooden keys suspended above tuned calabash gourds',
    description:
      'Each wooden key of the balafon is hand-carved from dense bène wood and tuned over a specific hollow calabash gourd underneath. Tiny holes in the gourds are covered with spider-silk web or thin paper to add a joyful buzz!',
    curiousFact: 'The legendary Sosso-Bala, an ancient royal balafon preserved in Guinea, is over 800 years old!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=1200&q=80',
    soundType: 'balafon',
    instrumentType: 'balafon',
    accentRegion: 'west-african',
    audioPronunciationText: 'The Balafon, the singing wooden keys of West Africa.'
  },
  {
    id: 'pin-jollof-rice',
    name: 'Smoky Jollof Rice',
    localName: 'Benachin (Wolof: One Pot)',
    pronunciation: 'JOL-off / Beh-nah-CHEEN',
    type: 'FOOD',
    category: 'FOOD',
    region: 'West Africa',
    country: 'Nigeria / Senegal / Ghana',
    city: 'Lagos',
    hierarchyPath: ['Africa', 'West Africa', 'Nigeria', 'Lagos', 'Jollof Rice'],
    x: 390,
    y: 535,
    minZoom: 2.3,
    icon: '🍛',
    badgeBg: '#D9822B',
    tagline: 'Bright orange grain-by-grain party rice scented with smoked paprika, thyme, and tomatoes',
    description:
      'No West African celebration or wedding is complete without a towering platter of hot, smoky Jollof rice! Cooked slowly in a rich tomato, ginger, and scotch bonnet pepper reduction.',
    curiousFact: 'The dish originated from the ancient Wolof empire in the Senegambia region where it was called Benachin, meaning "one pot"!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    soundType: 'food',
    audioPronunciationText: 'Jollof rice, celebrated across West Africa.'
  },
  {
    id: 'pin-djenne-mosque',
    name: 'The Great Mud Mosque of Djenné',
    localName: 'La Grande Mosquée de Djenné',
    pronunciation: 'JAY-nay',
    type: 'LANDMARK',
    category: 'LANDMARK',
    region: 'West Africa',
    country: 'Mali',
    city: 'Djenné',
    hierarchyPath: ['Africa', 'West Africa', 'Mali', 'Niger River', 'Djenné Mosque'],
    x: 290,
    y: 410,
    minZoom: 1.8,
    icon: '🏛️',
    badgeBg: '#C85A32',
    tagline: 'The world’s largest sun-baked earth and mud-brick architectural masterpiece',
    description:
      'Standing gracefully beside the Bani River, this stunning monument is built entirely of sun-baked earth bricks and palm wood beams. Every year, the entire city gathers for a joyous festival to replaster its walls.',
    curiousFact: 'During the Crépissage festival, master masons, musicians, and thousands of young people climb ladders to coat the mosque with fresh smooth river clay in one single morning!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1599837965373-593dd8536f98?auto=format&fit=crop&w=1200&q=80',
    soundType: 'drum',
    audioPronunciationText: 'The Great Mosque of Djenné in Mali.'
  },
  {
    id: 'pin-kente-cloth',
    name: 'Royal Ashanti Kente Cloth',
    localName: 'Kenten (Akan: Basket-Weave)',
    pronunciation: 'KEN-tay',
    type: 'CULTURAL_PRACTICE',
    category: 'SECRET',
    region: 'West Africa',
    country: 'Ghana',
    city: 'Kumasi',
    hierarchyPath: ['Africa', 'West Africa', 'Ghana', 'Kumasi', 'Kente Weaving'],
    x: 310,
    y: 530,
    minZoom: 2.3,
    icon: '🧵',
    badgeBg: '#E25822',
    tagline: 'Luminous hand-woven silk strips where every color and pattern whispers royal wisdom',
    description:
      'Legend says two young hunters watched Ananse the spider spin a web in the forest and brought the technique back to their village. Master weavers in Bonwire weave colorful silk strips with rhythmic clattering wooden looms.',
    curiousFact: 'In Kente cloth, golden yellow represents royalty, green represents harvest and new growth, and blue represents peaceful skies!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    soundType: 'chime',
    audioPronunciationText: 'Kente cloth, hand-woven royal silk of Ghana.',
    connectedStoryId: 'story-ananse-pot-wisdom'
  },
  {
    id: 'pin-lagos',
    name: 'Lagos (Center of African Energy)',
    localName: 'Èkó (Yoruba)',
    pronunciation: 'LAY-gos / EH-koh',
    type: 'CITY',
    category: 'CITY',
    region: 'West Africa',
    country: 'Nigeria',
    city: 'Lagos',
    hierarchyPath: ['Africa', 'West Africa', 'Nigeria', 'Lagos'],
    x: 375,
    y: 525,
    minZoom: 1.6,
    icon: '🏙️',
    badgeBg: '#C85A32',
    tagline: 'The bustling coastal powerhouse of music, Afrobeats, and boundless innovation',
    description:
      'Lagos is Africa’s most populous city, spread across sparkling lagoons and coastal islands. It is the buzzing birthplace of Nollywood cinema, world-conquering Afrobeats music, and fearless tech innovators.',
    curiousFact: 'Lagos has an island bridge called the Third Mainland Bridge that stretches over 11 kilometers across the water!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1594732832278-abd644401426?auto=format&fit=crop&w=1200&q=80',
    soundType: 'city',
    audioPronunciationText: 'Lagos, also known as Èkó, the bustling mega-city of Nigeria.',
    greetings: [
      { phrase: 'Ẹ nlẹ o!', phonetic: 'Eh n-LAY oh', meaning: 'Hello / Greetings!' },
      { phrase: 'Bawo ni?', phonetic: 'BAH-woh nee', meaning: 'How are things?' }
    ]
  },
  {
    id: 'pin-twi-language',
    name: 'Akan / Twi Language',
    localName: 'Twi (Akan)',
    pronunciation: 'TCH-wee',
    type: 'LANGUAGE',
    category: 'LANGUAGE',
    region: 'West Africa',
    country: 'Ghana',
    city: 'Accra',
    hierarchyPath: ['Africa', 'West Africa', 'Ghana', 'Accra', 'Twi Language'],
    x: 320,
    y: 540,
    minZoom: 2.2,
    icon: '🗣️',
    badgeBg: '#7C4728',
    tagline: 'The expressive golden language of Ananse stories and timeless Akan proverbs',
    description:
      'Twi is spoken across southern Ghana and is famous for its rich proverbs (Mbebusɛm). Wisdom in Twi is called "Nyansa", celebrated as the greatest treasure a human can gather.',
    curiousFact: 'Children in Akan culture receive a "day name" when they are born—like Kwame for boys born on Saturday, and Ama for girls born on Saturday!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    soundType: 'chime',
    pronunciationWordId: 'akwaaba',
    accentRegion: 'west-african',
    audioPronunciationText: 'Akwaaba! Welcome in Twi, the language of Ghana.',
    greetings: [
      { phrase: 'Akwaaba!', phonetic: 'Ah-KWAH-bah', meaning: 'Welcome!' },
      { phrase: 'Nyansa', phonetic: 'N-YAHN-sah', meaning: 'Deep wisdom' },
      { phrase: 'Me daa si', phonetic: 'May DAH-see', meaning: 'Thank you' }
    ],
    connectedBrainPuzzleId: 'puzzle-word-translate'
  },

  // ==========================================
  // NORTH AFRICA
  // ==========================================
  {
    id: 'pin-pyramids-giza',
    name: 'The Great Pyramids of Giza & Sphinx',
    localName: 'Al-Ahramat (Arabic: الأهرامات)',
    pronunciation: 'Al-Ah-RAH-maht',
    type: 'LANDMARK',
    category: 'LANDMARK',
    region: 'North Africa',
    country: 'Egypt',
    city: 'Cairo',
    hierarchyPath: ['Africa', 'North Africa', 'Egypt', 'Cairo', 'Pyramids of Giza'],
    x: 720,
    y: 200,
    minZoom: 1.0,
    icon: '🏛️',
    badgeBg: '#D9822B',
    tagline: 'The last standing Wonder of the Ancient World, guarding the desert for 4,500 years',
    description:
      'Constructed around 2500 BCE, the Great Pyramid of Khufu was the tallest man-made structure on Earth for more than 3,800 years. Millions of giant limestone blocks were cut and aligned with cosmic precision.',
    curiousFact: 'The Great Pyramid was originally covered in polished white casing stones that reflected the desert sunlight like a brilliant mirror!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    soundType: 'wind',
    audioPronunciationText: 'The Great Pyramids of Giza in Egypt.'
  },
  {
    id: 'pin-river-nile',
    name: 'The River Nile (Father of Rivers)',
    localName: 'Nahr an-Nil (Arabic: نهر النيل)',
    pronunciation: 'NAH-hur an-NEEL',
    type: 'NATURAL_FEATURE',
    category: 'NATURAL_FEATURE',
    region: 'North Africa',
    country: 'Egypt / Sudan / Uganda',
    hierarchyPath: ['Africa', 'North Africa', 'River Nile'],
    x: 695,
    y: 280,
    minZoom: 1.0,
    icon: '🌊',
    badgeBg: '#2A729A',
    tagline: 'The 6,650 km lifegiving blue ribbon flowing north to the Mediterranean',
    description:
      'The Nile is often celebrated as the longest river in the world. Flowing northward from Lake Victoria in East Africa through Sudan and Egypt, its fertile floodwaters nurtured ancient civilizations.',
    curiousFact: 'Unlike almost every other major river in the world, the Nile flows from south to north because high mountains lie at its southern origins!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    soundType: 'water',
    audioPronunciationText: 'The River Nile, flowing through the heart of Africa.'
  },
  {
    id: 'pin-moroccan-tagine',
    name: 'Moroccan Claypot Tagine',
    localName: 'Tajin (Arabic: طاجين)',
    pronunciation: 'Tah-JEEN',
    type: 'FOOD',
    category: 'FOOD',
    region: 'North Africa',
    country: 'Morocco',
    city: 'Marrakech',
    hierarchyPath: ['Africa', 'North Africa', 'Morocco', 'Marrakech', 'Tagine'],
    x: 290,
    y: 195,
    minZoom: 2.1,
    icon: '🍲',
    badgeBg: '#D9822B',
    tagline: 'Slow-simmered savory stew cooked in a cone-shaped clay pot with preserved lemons and saffron',
    description:
      'The conical lid of the tagine pot traps steam and returns droplets of condensation back down into the food, keeping tender vegetables, dates, almonds, and spices wonderfully succulent.',
    curiousFact: 'Tagines were designed by nomadic Amazigh (Berber) people so they could cook delicious meals in dry desert climates using very little water!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
    soundType: 'food',
    audioPronunciationText: 'Moroccan tagine, slow-cooked in a conical clay dish.'
  },
  {
    id: 'pin-sahara-camel',
    name: 'The Dromedary Desert Camel',
    localName: 'Al-Jamal (Arabic: الجمل)',
    pronunciation: 'Al-Jah-MAHL',
    type: 'ANIMAL',
    category: 'ANIMAL',
    region: 'North Africa',
    country: 'Algeria / Niger / Egypt',
    hierarchyPath: ['Africa', 'North Africa', 'Sahara Desert', 'Desert Camel'],
    x: 480,
    y: 280,
    minZoom: 1.8,
    icon: '🐪',
    badgeBg: '#D9822B',
    tagline: 'The magnificent "Ship of the Desert" with triple eyelids and wide sand-shoes',
    description:
      'Camels can travel over 150 dry desert kilometers without drinking a single drop of water! Their humps store rich energy fats, and their long eyelashes protect their eyes during fierce sandstorms.',
    curiousFact: 'Camels have special wide leathery footpads that spread out when stepping on soft sand, keeping them from sinking like snowshoes!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    soundType: 'bird',
    audioPronunciationText: 'Al-Jamal, the resilient camel of the Sahara.'
  },

  // ==========================================
  // CENTRAL AFRICA
  // ==========================================
  {
    id: 'pin-mountain-gorilla',
    name: 'Mountain Gorilla Family',
    localName: 'Ingagi (Kinyarwanda)',
    pronunciation: 'In-GAH-gee',
    type: 'ANIMAL',
    category: 'ANIMAL',
    region: 'Central Africa',
    country: 'DRC / Rwanda / Uganda',
    hierarchyPath: ['Africa', 'Central Africa', 'Virunga Volcanoes', 'Mountain Gorilla'],
    x: 640,
    y: 575,
    minZoom: 2.2,
    icon: '🦍',
    badgeBg: '#1D3E2F',
    tagline: 'Gentle giants living in the misty high-altitude volcanic bamboo forests',
    description:
      'Mountain gorillas live in loving family troops led by a wise, protective Silverback male. They share 98% of their DNA with humans, build fresh soft leaf nests every night, and communicate with gentle rumbles.',
    curiousFact: 'Just like human fingerprints are completely unique, every gorilla has a unique nose-print pattern that scientists use to recognize them!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1574063413132-355dbfd83e25?auto=format&fit=crop&w=1200&q=80',
    soundType: 'bird',
    audioPronunciationText: 'Ingagi, the majestic mountain gorilla of the Virunga mountains.',
    connectedBrainPuzzleId: 'puzzle-habitat-sort'
  },
  {
    id: 'pin-congo-rainforest',
    name: 'The Congo Basin Rainforest',
    localName: 'Biso na Biso (Lingala Forest Heart)',
    pronunciation: 'KOHN-goh BAH-sin',
    type: 'NATURAL_FEATURE',
    category: 'NATURAL_FEATURE',
    region: 'Central Africa',
    country: 'DRC / Congo / Gabon',
    hierarchyPath: ['Africa', 'Central Africa', 'Congo Basin'],
    x: 530,
    y: 560,
    minZoom: 1.0,
    icon: '🌴',
    badgeBg: '#1D3E2F',
    tagline: 'The green lung of Africa and second-largest tropical rainforest on Earth',
    description:
      'Spanning over 2 million square kilometers, the Congo rainforest breathes clean oxygen into the planet. Its dense emerald canopy shelters forest elephants, okapis with zebra stripes, and thousands of rare orchids.',
    curiousFact: 'It can take a raindrop falling from a storm cloud a full 10 minutes to drip all the way down through the thick leafy canopy to the forest floor!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    soundType: 'wind',
    audioPronunciationText: 'The lush Congo Basin rainforest in Central Africa.'
  },

  // ==========================================
  // SOUTHERN AFRICA & MADAGASCAR
  // ==========================================
  {
    id: 'pin-great-zimbabwe',
    name: 'Great Zimbabwe Stone City',
    localName: 'Dzimba-dza-Mabwe (Houses of Stone)',
    pronunciation: 'DZIM-bah dzah MAHB-way',
    type: 'LANDMARK',
    category: 'LANDMARK',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    city: 'Masvingo',
    hierarchyPath: ['Africa', 'Southern Africa', 'Zimbabwe', 'Masvingo', 'Great Zimbabwe'],
    x: 650,
    y: 745,
    minZoom: 1.7,
    icon: '🏛️',
    badgeBg: '#7C4728',
    tagline: 'Magnificent medieval granite towers built with curving mortarless walls',
    description:
      'Built between the 11th and 15th centuries by ancestral Shona civil engineers, Great Zimbabwe was a thriving capital of trade, pottery, and gold. Its curved granite walls stand over 11 meters tall without any mortar or cement!',
    curiousFact: 'The modern nation of Zimbabwe takes its name directly from this sacred city: "Dzimba-dza-Mabwe" meaning "venerated houses of stone"!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    soundType: 'drum',
    audioPronunciationText: 'Great Zimbabwe, Dzimba dza Mabwe.',
    connectedStoryId: 'story-morning-star-guineafowl',
    connectedBrainPuzzleId: 'puzzle-architecture-match'
  },
  {
    id: 'pin-victoria-falls',
    name: 'Victoria Falls (The Smoke That Thunders)',
    localName: 'Mosi-oa-Tunya (Kololo / Lozi)',
    pronunciation: 'MOH-see oh-ah TOON-yah',
    type: 'NATURAL_FEATURE',
    category: 'NATURAL_FEATURE',
    region: 'Southern Africa',
    country: 'Zambia / Zimbabwe',
    hierarchyPath: ['Africa', 'Southern Africa', 'Zambezi River', 'Victoria Falls'],
    x: 600,
    y: 715,
    minZoom: 1.0,
    icon: '🌊',
    badgeBg: '#2A729A',
    tagline: 'The world’s largest curtain of falling water, sending rainbow mist into the clouds',
    description:
      'Over 500 million cubic meters of Zambezi river water plunge every minute over a 100-meter drop! The resulting spray shoots high into the blue sky, creating moonbows (lunar rainbows) under the full moon.',
    curiousFact: 'The spray from Mosi-oa-Tunya can be seen rising into the sky from over 50 kilometers away!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=80',
    soundType: 'water',
    pronunciationWordId: 'mosi-oa-tunya',
    accentRegion: 'southern-african',
    audioPronunciationText: 'Mosi-oa-Tunya, The Smoke That Thunders.',
    connectedRiddleId: 'riddle-kilimanjaro'
  },
  {
    id: 'pin-mbira',
    name: 'Mbira dzaVadzimu (Thumb Piano)',
    localName: 'Mbira dzaVadzimu (Voice of the Ancestors)',
    pronunciation: 'M-BEE-rah dzah vah-DZEE-moo',
    type: 'INSTRUMENT',
    category: 'INSTRUMENT',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    hierarchyPath: ['Africa', 'Southern Africa', 'Zimbabwe', 'Mbira'],
    x: 670,
    y: 730,
    minZoom: 2.3,
    icon: '🎶',
    badgeBg: '#E25822',
    tagline: 'Tuned iron keys affixed to hardwood inside a buzzing calabash gourd resonator',
    description:
      'For over a thousand years, Shona musicians have plucked the metal keys of the mbira with both thumbs and right index finger. Bottle caps or shells attached to the gourd add a gentle buzzing texture that sounds like rain.',
    curiousFact: 'Mbira music is played in interlocking cycles: two players weave separate musical patterns together so tightly it sounds like a third invisible musician is playing!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    soundType: 'mbira',
    instrumentType: 'mbira',
    pronunciationWordId: 'mbira',
    accentRegion: 'southern-african',
    audioPronunciationText: 'Mbira dzaVadzimu, the traditional thumb piano of Zimbabwe.',
    connectedStoryId: 'story-morning-star-guineafowl',
    connectedBrainPuzzleId: 'puzzle-rhythm-pattern'
  },
  {
    id: 'pin-guineafowl',
    name: 'Helmeted Guineafowl (Hanga)',
    localName: 'Hanga (Shona) • Kanga (Swahili)',
    pronunciation: 'HAHN-gah',
    type: 'ANIMAL',
    category: 'ANIMAL',
    region: 'Southern Africa',
    country: 'Zimbabwe / South Africa',
    hierarchyPath: ['Africa', 'Southern Africa', 'Matobo Hills', 'Guineafowl'],
    x: 645,
    y: 775,
    minZoom: 2.3,
    icon: '🪶',
    badgeBg: '#7C4728',
    tagline: 'Fast-running flock birds with starlight white polka dots on midnight feathers',
    description:
      'Guineafowl sprint swiftly across sunny granite kopjes and tall grasslands. Shona folklore tells that their lovely white spots were flicked onto their feathers by the Morning Star to guide morning travellers.',
    curiousFact: 'Guineafowl would rather run with their strong legs than fly! They only flutter up into acacia branches when the sun sets to sleep safely away from leopards.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80',
    soundType: 'bird',
    audioPronunciationText: 'Hanga, the helmeted guineafowl.',
    connectedStoryId: 'story-morning-star-guineafowl',
    connectedRiddleId: 'riddle-guineafowl'
  },
  {
    id: 'pin-baobab',
    name: 'The Great Baobab (Tree of Life)',
    localName: 'Mbuyu (Swahili) • Mowana (Setswana)',
    pronunciation: 'BAY-oh-bab / M-BOO-yoo',
    type: 'PLANT',
    category: 'NATURAL_FEATURE',
    region: 'Southern Africa',
    country: 'Botswana / Zimbabwe / Madagascar',
    hierarchyPath: ['Africa', 'Southern Africa', 'Kalahari / Savanna', 'Baobab Tree'],
    x: 580,
    y: 760,
    minZoom: 1.8,
    icon: '🌳',
    badgeBg: '#1D3E2F',
    tagline: 'An ancient living water tower that can live for over 2,000 years',
    description:
      'The Baobab’s massive trunk can store up to 120,000 liters of sweet water to survive harsh dry seasons! Its velvety green fruits are bursting with vitamin C and make a tangy, nutritious drink.',
    curiousFact: 'Because its bare branches in winter look just like roots sticking straight into the air, African folklore says spirits planted the baobab upside down!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
    soundType: 'wind',
    audioPronunciationText: 'The Baobab Tree, the Tree of Life.',
    connectedStoryId: 'story-sungura-lake-victoria',
    connectedRiddleId: 'riddle-baobab',
    connectedBrainPuzzleId: 'puzzle-habitat-sort'
  },
  {
    id: 'pin-madagascar-lemur',
    name: 'Ring-Tailed Lemurs of Madagascar',
    localName: 'Maki (Malagasy)',
    pronunciation: 'MAH-kee',
    type: 'ANIMAL',
    category: 'ANIMAL',
    region: 'Southern Africa',
    country: 'Madagascar',
    hierarchyPath: ['Africa', 'Madagascar', 'Spiny Forest', 'Ring-Tailed Lemur'],
    x: 840,
    y: 750,
    minZoom: 1.7,
    icon: '🐒',
    badgeBg: '#C85A32',
    tagline: 'Sun-worshipping acrobats with black-and-white striped ringed tails',
    description:
      'Found naturally nowhere else on the planet, lemurs live on the magical red island of Madagascar. Every morning, they sit with their arms outstretched facing the rising sun in a "yoga posture" to warm up!',
    curiousFact: 'Lemurs use their long striped tails like a flag held high in the air so their troop members can easily follow each other through dense forest branches!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    soundType: 'bird',
    audioPronunciationText: 'Maki, the ring-tailed lemur of Madagascar.'
  },
  {
    id: 'pin-cape-town',
    name: 'Cape Town & Table Mountain',
    localName: 'Hoerikwaggo (Khoekhoe: Mountain in the Sea)',
    pronunciation: 'HOY-ree-kwah-goh',
    type: 'CITY',
    category: 'CITY',
    region: 'Southern Africa',
    country: 'South Africa',
    city: 'Cape Town',
    hierarchyPath: ['Africa', 'Southern Africa', 'South Africa', 'Cape Town'],
    x: 535,
    y: 950,
    minZoom: 1.6,
    icon: '⛰️',
    badgeBg: '#2A729A',
    tagline: 'Where the Atlantic and Indian oceans meet beneath a flat-topped sandstone mountain',
    description:
      'Cape Town sits at the southern tip of the continent, cradled by Table Mountain. When moist ocean winds blow across its flat summit, a blanket of white cloud pours over the edge like a tablecloth!',
    curiousFact: 'Just around the corner at Boulders Beach, a colony of wild African penguins waddles across the white sand and swims with beachgoers!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    soundType: 'water',
    audioPronunciationText: 'Cape Town, South Africa.',
    greetings: [
      { phrase: 'Sawubona!', phonetic: 'Sah-woo-BOH-nah', meaning: 'I see you! (Zulu hello)' },
      { phrase: 'Yebo!', phonetic: 'YEH-boh', meaning: 'Yes / I see you too!' }
    ]
  },

  // ==========================================
  // HIDDEN SECRETS & EASTER EGGS
  // ==========================================
  {
    id: 'pin-secret-zanzibar-dhow',
    name: 'Secret: The Spice Dhow of Zanzibar',
    localName: 'Jahazi ya Karafuu',
    pronunciation: 'Jah-HAH-zee',
    type: 'CULTURAL_PRACTICE',
    category: 'SECRET',
    region: 'East Africa',
    country: 'Tanzania (Zanzibar)',
    hierarchyPath: ['Africa', 'East Africa', 'Zanzibar Channel', 'Secret Dhow'],
    x: 775,
    y: 620,
    minZoom: 2.4,
    icon: '⛵',
    badgeBg: '#E25822',
    tagline: 'You discovered the hidden wooden sailing boat carrying fragrant Zanzibar cloves!',
    description:
      'Centuries ago, triangular-sailed dhows caught the seasonal monsoon trade winds to carry sweet vanilla, cinnamon, and cloves across the Indian Ocean.',
    curiousFact: 'Zanzibar is called the Spice Island because the gentle ocean breeze carries the scent of cloves and nutmeg miles out to sea!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    soundType: 'water',
    audioPronunciationText: 'You found the secret Spice Dhow of Zanzibar!',
    isSecret: true
  },
  {
    id: 'pin-secret-sahara-cave-art',
    name: 'Secret: Tassili n’Ajjer Ancient Rock Paintings',
    localName: 'Tassili n’Ajjer (Plateau of the Rivers)',
    pronunciation: 'Tah-SEE-lee n-Ah-JEER',
    type: 'NATURAL_FEATURE',
    category: 'SECRET',
    region: 'North Africa',
    country: 'Algeria',
    hierarchyPath: ['Africa', 'North Africa', 'Sahara Desert', 'Tassili Rock Art'],
    x: 430,
    y: 250,
    minZoom: 2.4,
    icon: '✨',
    badgeBg: '#D9822B',
    tagline: 'You uncovered ancient paintings from 10,000 years ago when the Sahara was green and full of lakes!',
    description:
      'High on sandstone plateaus in the Algerian desert, ancient artists painted over 15,000 pictures of swimming people, grazing hippos, giraffes, and cattle—revealing that the Sahara once had sparkling rivers and green pastures!',
    curiousFact: 'Scientists discovered that thousands of years ago, the Sahara was called the "Green Sahara" with giant freshwater lakes where crocodiles swam!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    soundType: 'chime',
    audioPronunciationText: 'You uncovered the ancient Green Sahara cave art!',
    isSecret: true
  }
];

export interface ScavengerMission {
  id: string;
  title: string;
  prompt: string;
  hint: string;
  targetPinId: string;
  targetRegion: AfricanRegion;
  rewardSticker: string;
}

export const EXPLORER_MISSIONS: ScavengerMission[] = [
  {
    id: 'mission-tilapia',
    title: 'The Caring Mother Fish',
    prompt: 'Find the lake fish that shelters her babies safely inside her mouth when predators swim near!',
    hint: 'Zoom into East Africa and look inside Africa’s largest freshwater lake near Uganda...',
    targetPinId: 'pin-tilapia',
    targetRegion: 'East Africa',
    rewardSticker: '🐟 Lake Explorer Badge'
  },
  {
    id: 'mission-kora',
    title: 'The 21-String Royal Harp',
    prompt: 'Find the musical instrument made from a dried calabash gourd played by oral historians!',
    hint: 'Zoom into West Africa along the river lands of Senegal, Gambia and Mali...',
    targetPinId: 'pin-kora-harp',
    targetRegion: 'West Africa',
    rewardSticker: '🎵 Griot Musician Badge'
  },
  {
    id: 'mission-kilimanjaro',
    title: 'The Snowy Equator Mountain',
    prompt: 'Find the highest mountain in Africa whose snowy peak touches the sky above sunny savannas!',
    hint: 'Explore East Africa near the border of Tanzania and Kenya...',
    targetPinId: 'pin-kilimanjaro',
    targetRegion: 'East Africa',
    rewardSticker: '⛰️ Mountain Summit Badge'
  },
  {
    id: 'mission-great-zimbabwe',
    title: 'The City of Stone Walls',
    prompt: 'Find the ancient city built with curved granite blocks without using a single drop of mortar!',
    hint: 'Look in Southern Africa in the land that took its name from these stone houses...',
    targetPinId: 'pin-great-zimbabwe',
    targetRegion: 'Southern Africa',
    rewardSticker: '🏛️ Master Builder Badge'
  },
  {
    id: 'mission-jollof',
    title: 'The Great One-Pot Feast',
    prompt: 'Find the smoky, bright orange rice celebrated at weddings and parties across West Africa!',
    hint: 'Look in Nigeria and West Africa’s buzzing coastal cities...',
    targetPinId: 'pin-jollof-rice',
    targetRegion: 'West Africa',
    rewardSticker: '🍛 Master Chef Badge'
  }
];
