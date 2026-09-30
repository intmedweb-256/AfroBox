import { AfroBoxEntity } from '../types/afrobox';

export const AFROBOX_ENTITIES: AfroBoxEntity[] = [
  // 1. NATURAL FEATURE: Lake Victoria
  {
    id: 'entity-lake-victoria',
    type: 'NATURAL_FEATURE',
    featureType: 'LAKE',
    name: 'Lake Victoria (Nam Lolwe / Nnalubaale)',
    localName: 'Nnalubaale (Luganda) • Nam Lolwe (Dholuo)',
    pronunciationGuide: 'Nnah-loo-BAH-lay / Nahm LOL-way',
    tagline: "Africa's largest freshwater lake and the headwaters of the Nile",
    description:
      'Lake Victoria is a vast inland sea shared by Uganda, Kenya, and Tanzania. Its gentle freshwater waves are home to colorful cichlid fish, playful hippos, and thousands of island fishing communities.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    icon: '🌊',
    audioPronunciationText: 'Lake Victoria, also called Nnalubaale and Nam Lolwe',
    region: 'East Africa',
    country: 'Uganda, Kenya, Tanzania',
    ecosystem: 'Freshwater lake, papyrus reedbeds, tropical archipelago islands',
    surroundingCountries: ['Uganda', 'Kenya', 'Tanzania'],
    relatedEntityIds: [
      'entity-tilapia',
      'entity-swahili',
      'entity-story-sungura',
      'riddle-lake-victoria',
      'puzzle-east-africa-geo'
    ],
    funFact:
      'Lake Victoria is so huge that if you stood on one shore, you could not see the other side! It holds more than 3,000 islands.',
    ageTier: '6-8'
  },

  // 2. NATURAL FEATURE: Mount Kilimanjaro
  {
    id: 'entity-kilimanjaro',
    type: 'NATURAL_FEATURE',
    featureType: 'MOUNTAIN',
    name: 'Mount Kilimanjaro',
    localName: 'Oldoinyo Oibor (Maasai: White Mountain)',
    pronunciationGuide: 'Kil-ee-man-JAH-ro',
    tagline: 'The snowy giant standing above the golden East African plains',
    description:
      'Kilimanjaro is the highest free-standing mountain on Earth. As you climb from its base to its summit, you travel through five distinct climate zones—from lush rainforest to arctic glaciers.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    icon: '⛰️',
    audioPronunciationText: 'Mount Kilimanjaro, the highest mountain in Africa',
    region: 'East Africa',
    country: 'Tanzania',
    ecosystem: 'Montane rainforest, moorland, alpine desert, glacial ice cap',
    surroundingCountries: ['Tanzania', 'Kenya'],
    relatedEntityIds: [
      'entity-swahili',
      'entity-story-sungura',
      'riddle-kilimanjaro',
      'puzzle-east-africa-geo'
    ],
    funFact:
      'Kilimanjaro has its own freshwater cloud forest that catches rain and fog to feed surrounding rivers and farms.',
    ageTier: '6-8'
  },

  // 3. PLANT: The Great Baobab Tree
  {
    id: 'entity-baobab',
    type: 'PLANT',
    name: 'The Great Baobab Tree (Tree of Life)',
    localName: 'Mbuyu (Swahili) • Mowana (Setswana)',
    pronunciationGuide: 'BAY-oh-bab / M-BOO-yoo',
    tagline: 'An ancient living reservoir that can live over a thousand years',
    description:
      'Known across the continent as the Tree of Life, the Baobab has a massive hollow trunk that can store up to 120,000 liters of water through dry seasons. Its velvet fruit is rich in vitamin C and tang.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
    icon: '🌳',
    audioPronunciationText: 'The Baobab Tree, called Mbuyu in Swahili',
    region: 'Southern Africa',
    country: 'Senegal, Zimbabwe, Kenya, Madagascar',
    medicinalOrCulturalUse:
      'Community meeting place, natural shelter, antioxidant fruit pulp, and bark woven into sturdy ropes.',
    habitat: 'Dry savannas and sun-drenched rocky kopjes',
    longevity: 'Can live between 1,000 and 2,500 years',
    relatedEntityIds: [
      'entity-story-sungura',
      'entity-guineafowl',
      'riddle-baobab',
      'puzzle-habitat-sort'
    ],
    funFact:
      'In traditional folklore, the baobab is said to have been planted upside down by the spirits, because its branches look like roots reaching into the sky!',
    ageTier: '6-8'
  },

  // 4. ANIMAL: Tilapia (Ngege)
  {
    id: 'entity-tilapia',
    type: 'ANIMAL',
    name: 'Tilapia (Ngege)',
    localName: 'Ngege (Luo & Swahili)',
    pronunciationGuide: 'N-GAY-gay',
    tagline: 'The shimmering lake fish cherished across African waters',
    description:
      'Tilapia are resilient freshwater fish that thrive in Lake Victoria, the Nile, and river deltas. Mother tilapia protect their tiny fry by holding them safely inside their mouths when danger approaches!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    icon: '🐟',
    audioPronunciationText: 'Ngege, the beloved Tilapia of Lake Victoria',
    region: 'East Africa',
    country: 'Uganda, Kenya, Tanzania, Egypt',
    habitat: 'Freshwater lakes, river estuaries, and slow-moving streams',
    diet: 'Freshwater algae, plankton, and aquatic plants',
    culturalSymbolism:
      'A symbol of rebirth, community sustenance, and peaceful abundance across the Great Lakes.',
    relatedEntityIds: [
      'entity-lake-victoria',
      'entity-food-tilapia-stew',
      'riddle-tilapia',
      'puzzle-habitat-sort'
    ],
    funFact:
      'Mother tilapia are called "mouthbrooders" because they keep baby fish in their mouth for shelter until they are strong enough to swim on their own.',
    ageTier: '6-8'
  },

  // 5. FOOD: Whole Spiced Tilapia Stew
  {
    id: 'entity-food-tilapia-stew',
    type: 'FOOD',
    name: 'Fresh Lake Tilapia Stew',
    localName: 'Ngege ya Kukaanga / Samaki wa Kupaka',
    pronunciationGuide: 'Sah-MAH-kee wah koo-PAH-kah',
    tagline: 'Crisp pan-seared lake fish in slow-simmered tomato, ginger, and coconut sauce',
    description:
      'Cooked along the beaches of Lake Victoria and the Swahili coast, whole fresh tilapia is gently seasoned with garlic, ginger, and cumin, then simmered in a golden coconut and fresh coriander gravy.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    icon: '🍲',
    audioPronunciationText: 'Samaki wa Kupaka, spiced fresh fish stew',
    region: 'East Africa',
    country: 'Kenya, Tanzania, Uganda',
    mainIngredients: ['Fresh Tilapia', 'Coconut Milk', 'Ginger & Garlic', 'Tomatoes', 'Coriander'],
    traditionallyEatenDuring: 'Family celebrations and welcoming visitors after the evening catch.',
    recipeSummary:
      'Fish is lightly seared with lemon and salt, then nestled in simmering spiced coconut sauce and served with warm ugali.',
    relatedEntityIds: [
      'entity-tilapia',
      'entity-lake-victoria',
      'entity-swahili',
      'riddle-tilapia'
    ],
    funFact:
      'Along Lake Victoria shores, families often enjoy fish together with ugali using only their right hand to pinch the bread and sauce.',
    ageTier: '9-10'
  },

  // 6. NATURAL FEATURE: Matobo Hills Granite Kopjes
  {
    id: 'entity-matobo-hills',
    type: 'NATURAL_FEATURE',
    featureType: 'VALLEY',
    name: 'Matobo Hills Granite Rocks',
    localName: 'Matombo (Shona)',
    pronunciationGuide: 'Mah-TOH-bo / Mah-TOM-bo',
    tagline: 'Sculptured balancing granite rocks standing guard over Southern Africa',
    description:
      'Massive granite boulders sculpted by wind and rain over two billion years. In between the smooth rocky peaks are ancient painted caves, whistling rock hyraxes, and flocks of crested guineafowl.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    icon: '🪨',
    audioPronunciationText: 'Matobo Hills granite rocks in Zimbabwe',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    ecosystem: 'Granite kopjes, wooded valleys, seasonal springs',
    surroundingCountries: ['Zimbabwe', 'Botswana', 'South Africa'],
    relatedEntityIds: [
      'entity-guineafowl',
      'entity-shona-lang',
      'entity-story-morning-star',
      'riddle-guineafowl'
    ],
    funFact:
      'Some giant round boulders balance so delicately on top of each other that people once believed friendly giants stacked them up like stepping stones!',
    ageTier: '9-10'
  },

  // 7. ANIMAL: Polka-Dotted Guineafowl (Hanga)
  {
    id: 'entity-guineafowl',
    type: 'ANIMAL',
    name: 'Helmeted Guineafowl (Hanga)',
    localName: 'Hanga (Shona) • Kanga (Swahili)',
    pronunciationGuide: 'HAHN-gah',
    tagline: 'The chattering bird with white starlight polka dots on midnight feathers',
    description:
      'Guineafowl are cheerful flock birds that run swiftly across grassy hilltops. In Shona storytelling, their white spots are said to have been flicked onto their feathers by the Morning Star.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80',
    icon: '🪶',
    audioPronunciationText: 'Hanga, the helmeted guineafowl',
    region: 'Southern Africa',
    country: 'Zimbabwe, South Africa, Botswana, Mozambique',
    habitat: 'Savanna woodlands, rocky granite kopjes, and farmland edges',
    diet: 'Grass seeds, fallen berries, and small insects',
    culturalSymbolism:
      'Vigilance, collective protection, and the dawn star awakening the village.',
    soundName: 'Rapid clattering "kek-kek-kek" call',
    relatedEntityIds: [
      'entity-matobo-hills',
      'entity-shona-lang',
      'entity-story-morning-star',
      'riddle-guineafowl'
    ],
    funFact:
      'Guineafowl would rather run with their strong legs than fly! They only fly up into tall trees when night falls to sleep safely away from leopards.',
    ageTier: '6-8'
  },

  // 8. LANDMARK: Great Zimbabwe Stone City
  {
    id: 'entity-great-zimbabwe',
    type: 'LANDMARK',
    name: 'The Great Zimbabwe Monument',
    localName: 'Dzimba-dza-Mabwe (Houses of Stone)',
    pronunciationGuide: 'DZIM-bah dzah MAHB-way',
    tagline: 'A medieval stone city built with curved drystone walls without mortar',
    description:
      'Between the 11th and 15th centuries, Shona kings and architects built a magnificent city with drystone walls over 11 meters high. It was a thriving center of gold trade, pottery, and scholarship.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    icon: '🏛️',
    audioPronunciationText: 'Great Zimbabwe, Dzimba dza Mabwe',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    historicalPeriod: '11th to 15th Century CE',
    builtBy: 'Ancestral Shona civil engineers and stonemasons',
    significance:
      'UNESCO World Heritage Site. The country of Zimbabwe takes its name directly from these stone houses.',
    relatedEntityIds: [
      'entity-shona-lang',
      'entity-matobo-hills',
      'entity-mbira',
      'puzzle-architecture-match'
    ],
    funFact:
      'The builders fitted millions of granite blocks together without any cement or mortar. The walls curve gracefully like waves of stone.',
    ageTier: '11-12'
  },

  // 9. LANGUAGE: Swahili (Kiswahili)
  {
    id: 'entity-swahili',
    type: 'LANGUAGE',
    name: 'Swahili (Kiswahili)',
    localName: 'Kiswahili',
    pronunciationGuide: 'Kee-swah-HEE-lee',
    tagline: 'A rhythmic African lingua franca spoken by over 200 million people',
    description:
      'Kiswahili is an official language of the African Union, East African Community, Kenya, and Tanzania. It originated along the Indian Ocean coast and blends rich Bantu roots with trade history.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    icon: '🗣️',
    audioPronunciationText: 'Kiswahili, spoken across East and Central Africa',
    region: 'East Africa',
    country: 'Tanzania, Kenya, Uganda, DRC, Rwanda',
    languageFamily: 'Niger-Congo (Bantu)',
    speakersCountEstimate: 'Over 200 million speakers',
    commonGreetings: [
      { phrase: 'Habari yako?', phonetic: 'Hah-BAH-ree YAH-ko', meaning: 'How are you?' },
      { phrase: 'Nzuri sana!', phonetic: 'N-ZOO-ree SAH-nah', meaning: 'Very good / beautiful!' },
      { phrase: 'Baraza', phonetic: 'Bah-RAH-zah', meaning: 'Gathering council / veranda' },
      { phrase: 'Asante sana', phonetic: 'Ah-SAHN-tay SAH-nah', meaning: 'Thank you very much' }
    ],
    relatedEntityIds: [
      'entity-lake-victoria',
      'entity-kilimanjaro',
      'entity-story-sungura',
      'puzzle-word-translate'
    ],
    funFact:
      'World Kiswahili Language Day is celebrated across the globe every July 7th by the United Nations!',
    ageTier: '6-8'
  },

  // 10. LANGUAGE: Akan / Twi
  {
    id: 'entity-akan-lang',
    type: 'LANGUAGE',
    name: 'Akan (Twi & Fante)',
    localName: 'Twi (Akan)',
    pronunciationGuide: 'TCH-wee',
    tagline: 'The expressive golden language of Akan storytellers, proverbs, and wisdom',
    description:
      'Akan is the major indigenous language group of southern and central Ghana. Renowned for its rich philosophical proverbs (Mbebusɛm) and Ananse spider tales.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    icon: '🗣️',
    audioPronunciationText: 'Twi, the language of Akan stories and proverbs',
    region: 'West Africa',
    country: 'Ghana, Ivory Coast',
    languageFamily: 'Niger-Congo (Kwa branch)',
    commonGreetings: [
      { phrase: 'Akwaaba', phonetic: 'Ah-KWAH-bah', meaning: 'Welcome!' },
      { phrase: 'Nyansa', phonetic: 'N-YAHN-sah', meaning: 'Deep practical wisdom' },
      { phrase: 'Me daa si', phonetic: 'May DAH-see', meaning: 'Thank you' },
      { phrase: 'Wo ho te sɛn?', phonetic: 'Woh hoh tay sen', meaning: 'How are you doing?' }
    ],
    relatedEntityIds: [
      'entity-story-ananse',
      'entity-kora',
      'riddle-ananse',
      'puzzle-word-translate'
    ],
    funFact:
      'In Akan culture, children are traditionally given a special soul name based on the day of the week they were born—like Kofi for boys born on Friday!',
    ageTier: '6-8'
  },

  // 11. INSTRUMENT: The Kora Harp
  {
    id: 'entity-kora',
    type: 'INSTRUMENT',
    name: 'The Kora Harp (21 Strings)',
    localName: 'Kora (Mandinka & Wolof)',
    pronunciationGuide: 'KOH-rah',
    tagline: 'A melodic 21-string harp crafted from a hollow sun-dried calabash gourd',
    description:
      'The Kora is played by hereditary oral historians (Jalis / Griots) in West Africa. Its shimmering music sounds like flowing river water and accompanies oral epics of Sundiata Keita.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    icon: '🎵',
    audioPronunciationText: 'The Kora, traditional twenty-one string calabash harp',
    region: 'West Africa',
    country: 'Gambia, Senegal, Mali, Guinea',
    family: 'STRING',
    materials: ['Large dried calabash gourd', 'Cowhide soundboard', 'Hardwood neck', 'Nylon strings'],
    musicalRole: 'Preserving historical genealogies, royal epics, and soothing lullabies.',
    relatedEntityIds: [
      'entity-akan-lang',
      'entity-story-ananse',
      'puzzle-rhythm-pattern'
    ],
    funFact:
      'A master Kora player uses only four fingers—thumbs and index fingers—to pluck 21 strings simultaneously in intricate polyrhythms!',
    ageTier: '9-10'
  },

  // 12. INSTRUMENT: Mbira dzaVadzimu
  {
    id: 'entity-mbira',
    type: 'INSTRUMENT',
    name: 'Mbira (Lamellophone / Thumb Piano)',
    localName: 'Mbira dzaVadzimu (Voice of the Ancestors)',
    pronunciationGuide: 'M-BEE-rah dzah vah-DZEE-moo',
    tagline: 'Tuned iron keys affixed to a wooden soundboard inside a calabash resonator',
    description:
      'For over a millennium, Shona musicians have played the Mbira to celebrate harvests, call rain, and maintain community harmony. Bottle caps or shells rattle softly to add a buzzing texture.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    icon: '🎶',
    audioPronunciationText: 'Mbira, the traditional thumb piano of Zimbabwe',
    region: 'Southern Africa',
    country: 'Zimbabwe, Mozambique',
    family: 'PERCUSSION',
    materials: ['Hand-hammered iron or spring steel keys', 'Mubvamaropa hardwood', 'Calabash resonator'],
    musicalRole: 'Spiritual gatherings, storytelling accompaniment, and contemplative meditation.',
    relatedEntityIds: [
      'entity-great-zimbabwe',
      'entity-matobo-hills',
      'entity-shona-lang',
      'puzzle-rhythm-pattern'
    ],
    funFact:
      'Mbira music consists of interlocking cycles. Two players perform different parts that mesh together like a musical jigsaw puzzle.',
    ageTier: '9-10'
  }
];
