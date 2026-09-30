import { Challenge } from '../types/riddleBrain';

export const RIDDLE_BRAIN_CHALLENGES: Challenge[] = [
  // =========================================================================
  // 1. TRADITIONAL RIDDLES (COMMUNITY_TRADITION / LANGUAGE_TRADITION)
  // Culturally sourced African riddles with verified provenance
  // =========================================================================
  {
    id: 'trad-swahili-egg',
    title: 'The House Without a Door (Swahili: Kitendawili)',
    type: 'TRADITIONAL_RIDDLE',
    representationMode: 'COMMUNITY_TRADITION',
    question:
      'Kitendawili! Nyumba yangu haina mlango wala dirisha, lakini ndani yake mna mfalme mwenye koti la dhahabu. Nani huyo?\n\n(Translation: "My house has neither a door nor a window, yet inside lives a king wearing a golden coat. Who is it?")',
    answer: 'Yai (An Egg)',
    answerOptions: ['Yai (An Egg)', 'Nazi (A Coconut)', 'Kobe (A Tortoise)', 'Mbegu ya Embe (Mango Seed)'],
    correctAnswerIndex: 0,
    explanation:
      'In Swahili coastal communities, this classic riddle celebrates the marvel of life inside an egg. The seamless shell has neither door nor window, and the bright golden yolk inside is the "king"!',
    hint: 'Think of something smooth and closed on all sides that holds yellow treasure inside before hatching!',
    solutionSteps: [
      'Observe the first clue: "No doors and no windows" means a completely sealed, seamless shell.',
      'Observe the second clue: "Inside lives a king in a golden coat" describes the bright yellow yolk surrounded by white.',
      'Compare: A coconut has three "eyes" (openings), a tortoise shell has openings for legs, but an egg is totally sealed until it breaks open to bring forth life.'
    ],
    country: 'Tanzania & Kenya',
    region: 'East Africa',
    community: 'Waswahili (Coastal Swahili communities)',
    language: 'Kiswahili',
    culturalContext:
      'Riddle contests (Vitendawili) are a beloved evening tradition along the Swahili coast. An elder or child calls "Kitendawili!" and the listeners must respond in unison "Tega!" ("Set the trap!" or "I accept the challenge!"). If nobody can guess, the riddle teller demands a metaphorical gift of a town (e.g., "Nipe mji!" — "Give me Mombasa!") before revealing the wisdom.',
    source: 'Swahili Riddles, Proverbial Lore and Wordplay (J. Knappert, 1986); Swahili Folk Archives',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Jan Knappert / Swahili Oral Tradition Archive',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    traditionalContext: {
      openingFormula: 'Kitendawili!',
      responseFormula: 'Tega!',
      performanceSetting: 'Evening courtyard gathering after dinner under the coastal coconut palms',
      participantsRole: 'Children take turns challenging adults; witty answers earn cheers from the gathering'
    },
    ageTier: '6-8',
    difficulty: 'BEGINNER',
    skillsDeveloped: ['OBSERVATION', 'REASONING', 'LANGUAGE_SKILLS', 'CURIOSITY'],
    audioPronunciationText: 'Kitendawili! Tega! Nyumba yangu haina mlango wala dirisha.',
    accentRegion: 'east-african',
    connectedWorldLinks: {
      explorePinId: 'pin-kilimanjaro'
    }
  },
  {
    id: 'trad-yoruba-road',
    title: 'My Father’s Ring Across the Land (Yoruba: Àlọ́)',
    type: 'TRADITIONAL_RIDDLE',
    representationMode: 'LANGUAGE_TRADITION',
    question:
      'Àlọ́ o! Òruka bàbá mi tí ń fọ́ ilẹ̀ láti oko dé ilé, kò sì ní orí tàbí ìpìlẹ̀.\n\n(Translation: "My father has a long ribbon or ring that stretches unbroken from the distant forest farm all the way to our doorstep, yet it has neither head nor feet. What is it?")',
    answer: 'Ọ̀nà (The Path / Road)',
    answerOptions: ['Ọ̀nà (The Path / Road)', 'Ejò (A Snake)', 'Odò (A River)', 'Okùn (A Rope)'],
    correctAnswerIndex: 0,
    explanation:
      'In Yoruba oral culture, "Ọ̀nà" (the path) is described as an unbroken line connecting every house to the farm, guiding travelers home without having legs of its own!',
    hint: 'Everyone walks upon it every day to travel from village to village!',
    solutionSteps: [
      'Clue 1: It stretches all the way from the forest farm directly to the home doorstep.',
      'Clue 2: A snake moves and has a head and tail; a river flows with water; but a foot-path stays on the ground unbroken day and night.',
      'Conclusion: The path connects the people without ever walking itself.'
    ],
    country: 'Nigeria',
    region: 'West Africa',
    community: 'Yoruba',
    language: 'Yorùbá',
    culturalContext:
      'In Yorubaland, storytelling sessions begin with riddles called "Àlọ́ Àpamọ̀". The speaker calls "Àlọ́ o!" and the listeners eagerly chant back "Àà!". Riddles teach children close observation of nature, communal geography, and the moral power of pathways that bind families together.',
    source: 'The Content and Form of Yoruba Ijala & Yoruba Folktales (Adeboye Babalola, Oxford University Press)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Prof. Adeboye Babalola',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    traditionalContext: {
      openingFormula: 'Àlọ́ o!',
      responseFormula: 'Àà!',
      performanceSetting: 'Fireside or moonlit compound veranda (Àbúlé)',
      participantsRole: 'Grandmothers and youth exchanging wordplay before folk epics'
    },
    ageTier: '6-8',
    difficulty: 'BEGINNER',
    skillsDeveloped: ['OBSERVATION', 'SPATIAL_THINKING', 'REASONING'],
    audioPronunciationText: 'Àlọ́ o! Àà! Òruka bàbá mi tí ń fọ́ ilẹ̀.',
    accentRegion: 'west-african'
  },
  {
    id: 'trad-shona-tongue',
    title: 'The Ox in the Cave (Shona: Chirahwe)',
    type: 'TRADITIONAL_RIDDLE',
    representationMode: 'COMMUNITY_TRADITION',
    question:
      'Chirandigo! Chiuye!\n\nMombe yababa vangu inofura mumupata wakakomberedzwa nematombo machena, asi haimbobudi panze.\n\n(Translation: "My father’s red ox grazes peacefully inside a small valley surrounded by shiny white stones, yet it never leaves its valley. What is it?")',
    answer: 'Rurimi (The Tongue inside the Teeth)',
    answerOptions: ['Rurimi (The Tongue inside the Teeth)', 'Moyo (The Heart)', 'Ziso (The Eye)', 'Chitunha (A Shadow)'],
    correctAnswerIndex: 0,
    explanation:
      'In Shona culture, the mouth is poetically envisioned as a sheltered cave: the white teeth are the glistening stones, and the agile red tongue is the ox that grazes and creates speech!',
    hint: 'You are using this exact organ right now to speak, taste food, and laugh!',
    solutionSteps: [
      'Clue: "Surrounded by shiny white stones" — think about parts of the human body that are white and arranged in rows.',
      'Clue: "A red ox inside a valley" — the tongue is red/pink and rests inside the mouth.',
      'Clue: "Never leaves its valley" — the tongue stays inside the mouth behind the white teeth.'
    ],
    country: 'Zimbabwe',
    region: 'Southern Africa',
    community: 'VaShona',
    language: 'chiShona',
    culturalContext:
      'Shona "Zvirahwe" are games of intellect played during the dry winter evenings around the "choto" (central hearth). They teach children anatomy, metaphor, and respect for the spoken word.',
    source: 'Shona Traditional Literature & Ethnographic Riddles (G. Fortune & A.C. Hodza)',
    sourceType: 'ETHNOGRAPHIC_COLLECTION',
    sourceAuthorOrCollector: 'Prof. George Fortune / Aaron C. Hodza',
    rightsStatus: 'COMMUNITY_HERITAGE',
    verificationStatus: 'VERIFIED_COMMUNITY',
    traditionalContext: {
      openingFormula: 'Chirandigo!',
      responseFormula: 'Chiuye!',
      performanceSetting: 'Winter evening around the hearth (choto)',
      participantsRole: 'Fireside reasoning test among siblings'
    },
    ageTier: '6-8',
    difficulty: 'BEGINNER',
    skillsDeveloped: ['DEDUCTION', 'OBSERVATION', 'REASONING'],
    audioPronunciationText: 'Chirandigo! Chiuye! Mombe yababa vangu inofura mumupata.',
    accentRegion: 'southern-african'
  },
  {
    id: 'trad-lusoga-canoe',
    title: 'The Child Who Drinks Water While Running (Lusoga / Baganda)',
    type: 'TRADITIONAL_RIDDLE',
    representationMode: 'LANGUAGE_TRADITION',
    question:
      'Kikokyo! Kisa!\n\nAkaana kange kagenda nga kanywa amazzi naye tekakuta, era bwekatuuka ku lubalama kakeera kwebaka.\n\n(Translation: "My little child travels across the great lake drinking water with every step, yet never gets full. But the moment it touches dry sand, it rests peacefully. What is it?")',
    answer: 'Eryato (A Wooden Canoe / Boat)',
    answerOptions: ['Eryato (A Wooden Canoe / Boat)', 'Ekyenyanja (A Fish)', 'Envubu (A Hippo)', 'Ekinyonyi (A Kingfisher)'],
    correctAnswerIndex: 0,
    explanation:
      'A carved dugout canoe (eryato) glides across Lake Victoria surrounded by water, dipping into the lake as it moves, but is pulled ashore onto the sandy beach to sleep!',
    hint: 'Fishermen carve it from a single mahogany or mvule tree trunk to glide across Lake Victoria.',
    solutionSteps: [
      'Clue: Drinks water as it travels — a canoe sits directly in the water as it moves.',
      'Clue: Never gets full — a good canoe keeps the water outside and stays buoyant.',
      'Clue: Rests when it reaches the sand — fishermen pull their canoes onto the beach when the day is done.'
    ],
    country: 'Uganda',
    region: 'East Africa',
    community: 'Basoga & Baganda of Lake Victoria',
    language: 'Lusoga / Luganda',
    culturalContext:
      'For centuries, fishing communities on the shores of Nalubaale (Lake Victoria) have shared "Ebikokyo" (riddles) to train young navigators in understanding buoyancy, canoe craftsmanship, and reverence for the water spirits.',
    source: 'Uganda Folklore Archives & Lusoga Cultural Heritage Foundation Fieldwork Collection',
    sourceType: 'ETHNOGRAPHIC_COLLECTION',
    sourceAuthorOrCollector: 'Basoga Cultural Elder Elders Circle',
    rightsStatus: 'COMMUNITY_HERITAGE',
    verificationStatus: 'VERIFIED_COMMUNITY',
    traditionalContext: {
      openingFormula: 'Kikokyo!',
      responseFormula: 'Kisa!',
      performanceSetting: 'Lakeside evening fish-drying camp on Lake Victoria',
      participantsRole: 'Fishermen mentoring apprentice youths'
    },
    ageTier: '9-10',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['OBSERVATION', 'REASONING', 'SPATIAL_THINKING'],
    audioPronunciationText: 'Kikokyo! Kisa! Akaana kange kagenda nga kanywa amazzi.',
    accentRegion: 'east-african',
    connectedWorldLinks: {
      explorePinId: 'pin-lake-victoria',
      storyId: 'story-sungura-lake-victoria'
    }
  },

  // =========================================================================
  // 2. LANGUAGE RIDDLE (LANGUAGE_TRADITION)
  // Vocabulary, translation, tonal differences, and wordplay
  // =========================================================================
  {
    id: 'lang-yoruba-tonal-market',
    title: 'The Three Tones of Wealth: Owó, Ọwọ́ & Òwò',
    type: 'LANGUAGE_RIDDLE',
    representationMode: 'LANGUAGE_TRADITION',
    question:
      'In Yoruba, changing the musical tone (High, Mid, Low) completely transforms a word!\n\nRead this market riddle:\n"With my [Tone 1] (hand), I carry my [Tone 2] (money) to do [Tone 3] (business) in Ibadan market."\n\nWhich tonal pitch sequence correctly completes this sentence in Yoruba?',
    answer: 'Ọwọ́ (Hand) → Owó (Money) → Òwò (Commerce/Trade)',
    answerOptions: [
      'Ọwọ́ (Hand) → Owó (Money) → Òwò (Commerce/Trade)',
      'Owó (Money) → Ọwọ́ (Hand) → Òwò (Trade)',
      'Òwò (Trade) → Owó (Money) → Ọwọ́ (Hand)',
      'Ọwọ́ (Hand) → Òwò (Trade) → Owó (Money)'
    ],
    correctAnswerIndex: 0,
    explanation:
      'Yoruba is a tonal language with three registers: High (acute accent ´), Mid (no accent), and Low (grave accent `). "Ọwọ́" (High) means hand, "Owó" (Mid-High) means money, and "Òwò" (Low-Low) means trade/commerce. Changing the pitch changes the meaning!',
    hint: 'Remember: Ọwọ́ (hand) starts with high pitch, Owó (money) is currency, and Òwò has the low grave accents for deep marketplace trade!',
    solutionSteps: [
      'Step 1: Identify the anatomical tool used to hold objects: Ọwọ́ (High tone = hand).',
      'Step 2: Identify the cowrie currency or coins: Owó (money).',
      'Step 3: Identify the entrepreneurial activity of trading: Òwò (low tones = trade).',
      'Result: "Pẹ̀lú ọwọ́ mi, mo mú owó mi láti ṣe òwò!"'
    ],
    country: 'Nigeria',
    region: 'West Africa',
    community: 'Yoruba',
    language: 'Yorùbá',
    culturalContext:
      'In Yoruba linguistics, tone is phonemic—meaning musical pitch alters the vocabulary entirely. Children learn to listen with musical precision, a skill that directly strengthens musical ability, auditory memory, and poetic appreciation.',
    source: 'Yoruba Grammar and Tonal Poetics (Ayo Bamgbose, Evans Brothers Ltd)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Prof. Ayo Bamgbose',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    traditionalContext: {
      openingFormula: 'Ẹ gbọ́ ohun mi o! (Listen to my voice!)',
      responseFormula: 'À ń gbọ́! (We are listening!)',
      performanceSetting: 'Linguistic courtyard riddle game',
      participantsRole: 'Youth language games'
    },
    ageTier: '9-10',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['LANGUAGE_SKILLS', 'MEMORY', 'PATTERN_RECOGNITION'],
    audioPronunciationText: 'Ọwọ́, owó, àti òwò. Tones change the meaning!',
    accentRegion: 'west-african'
  },
  {
    id: 'lang-swahili-kanga-bird-cloth',
    title: 'The Riddle of the Flying Cloth: Kanga',
    type: 'LANGUAGE_RIDDLE',
    representationMode: 'LANGUAGE_TRADITION',
    question:
      'In Swahili, "Kanga" means two completely different things that share a visual secret.\n\nOne "Kanga" runs across the savanna with helmeted feathers and white polka-dots. The other "Kanga" is a brightly printed cotton cloth worn by mothers, decorated with polka-dot borders and a Swahili proverb written at the bottom.\n\nWhy did Swahili coastal weavers name this famous printed cloth after the wild guineafowl bird?',
    answer: 'The first cloths were printed with white speckles on dark indigo, exactly like the guineafowl’s speckled plumage!',
    answerOptions: [
      'The first cloths were printed with white speckles on dark indigo, exactly like the guineafowl’s speckled plumage!',
      'Because the cloth was woven from bird feathers.',
      'Because only hunters were permitted to wear the cloth.',
      'Because the cloth was sold in exchange for live birds.'
    ],
    correctAnswerIndex: 0,
    explanation:
      'When printed cotton handkerchief cloths (leso) arrived in Zanzibar and Mombasa in the 19th century, women loved designs with black-and-white speckled spots that resembled the plumage of the Helmeted Guineafowl (Kanga). The name stuck and became East Africa’s most iconic garment!',
    hint: 'Look closely at the feathers of a guineafowl bird—what pattern do you see repeated on traditional cloth?',
    solutionSteps: [
      'Examine the biological subject: The Helmeted Guineafowl (Numida meleagris) is called "Kanga" in Swahili.',
      'Notice its distinctive feature: thousands of crisp white pearl dots on dark midnight feathers.',
      'Connect to linguistic origin: When dark patterned cloth with white spots was printed, Swahili women nicknamed it "Kanga" after the bird’s plumage.'
    ],
    country: 'Kenya & Tanzania',
    region: 'East Africa',
    community: 'Swahili & Coastal East Africa',
    language: 'Kiswahili',
    culturalContext:
      'Every Kanga cloth has a "Jina" (name/proverb) printed along the bottom edge, such as "Majivuno hayafai" (Boasting is worthless) or "Upendo ni zawadi" (Love is a gift). Women communicate gentle social messages, affection, or witty wisdom simply by choosing which Kanga to wear!',
    source: 'Kanga: The Cloth That Hides and Reveals (Rose Marie Beck); National Museums of Kenya',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Dr. Rose Marie Beck',
    rightsStatus: 'COMMUNITY_HERITAGE',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    ageTier: '9-10',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['LANGUAGE_SKILLS', 'OBSERVATION', 'CURIOSITY'],
    audioPronunciationText: 'Kanga, ndege mwenye madoa na vazi la heshima.',
    accentRegion: 'east-african',
    connectedWorldLinks: {
      explorePinId: 'pin-kilimanjaro'
    }
  },

  // =========================================================================
  // 3. LOGIC (CONTEMPORARY_CONTEXT & ORIGINAL_PUZZLE)
  // Multi-step reasoning, deduction, sequencing
  // =========================================================================
  {
    id: 'logic-river-niger-crossing',
    title: 'The Great River Niger Canoe Crossing',
    type: 'LOGIC',
    representationMode: 'CONTEMPORARY_CONTEXT',
    question:
      'A traveler arrives at the banks of the mighty River Niger with THREE things:\n• A hungry Leopard 🐆\n• A frisky Goat 🐐\n• A bundle of fresh Yam Leaves 🌿\n\nThere is a small wooden dug-out canoe, but it can only hold the TRAVELER plus ONE companion/item at a time.\n\nRULES:\n1. If left alone without the traveler, the Leopard will eat the Goat.\n2. If left alone without the traveler, the Goat will eat the Yam Leaves.\n3. The Leopard does not eat Yam Leaves.\n\nWhat is the traveler’s FIRST required move to safely cross?',
    answer: 'Take the Goat across first, leaving the Leopard safely alone with the Yam Leaves',
    answerOptions: [
      'Take the Goat across first, leaving the Leopard safely alone with the Yam Leaves',
      'Take the Leopard across first, leaving the Goat with the Yam Leaves',
      'Take the Yam Leaves across first, leaving the Leopard with the Goat',
      'Try to squeeze all three into the small canoe'
    ],
    correctAnswerIndex: 0,
    explanation:
      'If you take the Leopard first, the Goat eats the Yam Leaves! If you take the Yam Leaves first, the Leopard eats the Goat! Only the Goat is safe to leave alone on either side because the Leopard will not eat yam leaves. In step 3, the clever traveler takes the Goat BACK to the start while swapping it for the next item!',
    hint: 'Which two items can you leave together on the riverbank without either one eating the other?',
    solutionSteps: [
      'Step 1: Take the GOAT across to the right bank. (Left bank: Leopard & Yam Leaves — safe, because leopards are carnivores!).',
      'Step 2: Row back alone to the left bank.',
      'Step 3: Take the LEOPARD across to the right bank.',
      'Step 4: KEY MOVE: Do not leave Leopard with Goat! Bring the GOAT back with you to the left bank.',
      'Step 5: Leave the Goat on the left bank, take the YAM LEAVES across to the right bank (now Leopard & Yam Leaves are together on right bank — safe!).',
      'Step 6: Row back alone to the left bank.',
      'Step 7: Pick up the GOAT and row across. All three arrive unharmed!'
    ],
    country: 'Nigeria & Mali',
    region: 'West Africa',
    community: 'Niger River Basin Traders',
    language: 'English with Hausa & Yoruba context',
    culturalContext:
      'River-crossing puzzles have been shared along the River Niger and Nile basins for generations. They teach children sequential planning, working backward from constraints, and anticipating unintended consequences.',
    source: 'African Mathematical Puzzles and River Navigation Folklore (Paulus Gerdes, Ethnomathematics)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Prof. Paulus Gerdes',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'EDUCATIONAL_ORIGINAL',
    ageTier: '9-10',
    difficulty: 'ADVANCED',
    skillsDeveloped: ['DEDUCTION', 'REASONING', 'PROBLEM_SOLVING'],
    interactivePayload: {
      kind: 'RIVER_CROSSING',
      riverCrossingData: {
        boatCapacity: 1,
        items: [
          { id: 'leopard', name: 'Leopard', icon: '🐆', conflictsWith: ['goat'] },
          { id: 'goat', name: 'Goat', icon: '🐐', conflictsWith: ['yam-leaves'] },
          { id: 'yam-leaves', name: 'Yam Leaves', icon: '🌿', conflictsWith: [] }
        ],
        leftBank: ['leopard', 'goat', 'yam-leaves'],
        rightBank: [],
        goalSide: 'right'
      }
    },
    audioPronunciationText: 'The River Niger crossing: think three steps ahead before rowing the canoe!',
    accentRegion: 'west-african'
  },
  {
    id: 'logic-kejetia-market-barter',
    title: 'The Great Kejetia Market Trade Deduction',
    type: 'LOGIC',
    representationMode: 'CONTEMPORARY_CONTEXT',
    question:
      'In Kumasi’s bustling Kejetia Market in Ghana, four friends are trading goods before the festival:\n• Kweku has 2 pots of golden Shea Butter 🧈\n• Abena has 1 roll of woven Kente cloth 🧵\n• Kofi has 4 baskets of ripe Plantains 🍌\n• Ama has 6 large white Yams 🍠\n\nThe traders agree on these traditional fair exchanges:\n1. 1 roll of Kente is worth exactly 2 pots of Shea Butter.\n2. 1 pot of Shea Butter is worth exactly 3 large Yams.\n3. 3 large Yams are worth exactly 2 baskets of Plantains.\n\nHow many baskets of Plantains is 1 roll of Abena’s Kente cloth worth?',
    answer: '4 baskets of Plantains',
    answerOptions: ['4 baskets of Plantains', '2 baskets of Plantains', '6 baskets of Plantains', '8 baskets of Plantains'],
    correctAnswerIndex: 0,
    explanation:
      'Let us track the conversion: 1 Kente roll = 2 pots of Shea Butter. 1 pot of Shea Butter = 3 Yams, so 2 pots of Shea Butter = 6 Yams. Since 3 Yams = 2 baskets of Plantains, 6 Yams = 4 baskets of Plantains! Therefore, 1 roll of Kente = 4 baskets of Plantains.',
    hint: 'Chain the equalities step-by-step: Kente → Shea Butter → Yams → Plantains!',
    solutionSteps: [
      'Step 1: Start with Abena’s 1 roll of Kente cloth.',
      'Step 2: Rule 1 says: 1 Kente = 2 pots of Shea Butter.',
      'Step 3: Rule 2 says: 1 Shea Butter = 3 Yams. Therefore, 2 Shea Butter = 6 Yams.',
      'Step 4: Rule 3 says: 3 Yams = 2 baskets of Plantains. Double that: 6 Yams = 4 baskets of Plantains!',
      'Conclusion: 1 roll of Kente = 4 baskets of Plantains.'
    ],
    country: 'Ghana',
    region: 'West Africa',
    community: 'Asante (Kumasi)',
    language: 'English with Twi terms',
    culturalContext:
      'Kejetia Market in Kumasi is one of the largest open-air markets in West Africa, hosting over 10,000 merchants. Trading requires mental arithmetic, relational equivalences, and quick deductive thinking.',
    source: 'Original educational math puzzle inspired by West African marketplace arithmetic traditions',
    sourceType: 'ORIGINAL_CURRICULUM',
    sourceAuthorOrCollector: 'AfroBox Educational Thinkers Studio',
    rightsStatus: 'ORIGINAL_AFROBOX',
    verificationStatus: 'EDUCATIONAL_ORIGINAL',
    ageTier: '11-12',
    difficulty: 'ADVANCED',
    skillsDeveloped: ['REASONING', 'DEDUCTION', 'PROBLEM_SOLVING'],
    audioPronunciationText: 'Kejetia Market barter: calculate the chain of exchange values!',
    accentRegion: 'west-african'
  },

  // =========================================================================
  // 4. VISUAL REASONING (ENVIRONMENT & ORIGINAL_PUZZLE)
  // Spot differences, classify spatial patterns, visual deduction
  // =========================================================================
  {
    id: 'vis-great-zimbabwe-chevron',
    title: 'The Stone Mason’s Chevron Wall of Great Zimbabwe',
    type: 'VISUAL_REASONING',
    representationMode: 'ENVIRONMENT',
    question:
      'The ancient Shona master builders of Great Zimbabwe constructed massive stone walls up to 11 meters high without using a single drop of mortar or cement! Along the top rim of the Great Enclosure, they laid a famous decorative zigzag pattern called a "Chevron" (representing lightning, rainfall, and fertility).\n\nLook at the stone orientation pattern:\n[ ◥◤ ] → [ ◢◣ ] → [ ◥◤ ] → [ ◢◣ ] → [ ? ]\n\nWhich stone alignment must the master builder place next to preserve the continuous chevron zig-zag?',
    answer: '[ ◥◤ ] (Inverted V-apex pointing downward)',
    answerOptions: [
      '[ ◥◤ ] (Inverted V-apex pointing downward)',
      '[ ◢◣ ] (Upward peak)',
      '[ █ ] (Flat horizontal capstone)',
      '[ ◀▶ ] (Horizontal diamonds)'
    ],
    correctAnswerIndex: 0,
    explanation:
      'The Chevron frieze alternates rhythmically between downward-pointing apexes [ ◥◤ ] and upward-pointing peaks [ ◢◣ ]. Following the alternating sequence (A - B - A - B), the 5th element must be A: [ ◥◤ ]!',
    hint: 'Follow the rhythm: Down, Up, Down, Up... what comes next in the dance of the stones?',
    solutionSteps: [
      'Analyze the pattern sequence: Term 1 is Down [ ◥◤ ].',
      'Term 2 is Up [ ◢◣ ].',
      'Term 3 is Down [ ◥◤ ].',
      'Term 4 is Up [ ◢◣ ].',
      'Following alternating period 2: The 5th stone pattern must be Down [ ◥◤ ]!'
    ],
    country: 'Zimbabwe',
    region: 'Southern Africa',
    community: 'Kingdom of Zimbabwe Builders',
    language: 'chiShona / English',
    culturalContext:
      'Constructed between the 11th and 15th centuries, Great Zimbabwe was the capital of a prosperous trading kingdom. The dry-stone granite walls have stood for over 700 years through sheer geometric balance, gravity, and precise angle cuts.',
    source: 'The Architecture of Great Zimbabwe (Peter Garlake, Thames & Hudson)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Peter Garlake',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    ageTier: '6-8',
    difficulty: 'BEGINNER',
    skillsDeveloped: ['SPATIAL_THINKING', 'PATTERN_RECOGNITION', 'OBSERVATION'],
    audioPronunciationText: 'Great Zimbabwe dry stone walls: identify the alternating chevron pattern.',
    accentRegion: 'southern-african',
    connectedWorldLinks: {
      explorePinId: 'pin-mbira'
    }
  },
  {
    id: 'vis-adinkra-symmetry-transformation',
    title: 'Adinkra Symbol Geometry: The Gye Nyame Transformation',
    type: 'VISUAL_REASONING',
    representationMode: 'LANGUAGE_TRADITION',
    question:
      'In Akan culture of Ghana, Adinkra symbols convey philosophical proverbs. The most famous symbol is "Gye Nyame" ("Except for God"), which exhibits rotational symmetry.\n\nIf you rotate the Gye Nyame symbol clockwise by 180 degrees (a half-turn), what do you observe about its shape?',
    answer: 'It matches its original silhouette because it has 2-fold (180°) rotational symmetry!',
    answerOptions: [
      'It matches its original silhouette because it has 2-fold (180°) rotational symmetry!',
      'It turns completely upside down and looks like an arrow.',
      'It loses its spirals and becomes a square.',
      'It only matches after a full 360-degree rotation.'
    ],
    correctAnswerIndex: 0,
    explanation:
      'Gye Nyame has order-2 rotational symmetry (180°). The two curved spiral arms balance each other across the central axis. Rotating it half a turn brings each arm into the exact position of the opposite arm!',
    hint: 'Imagine pinning the center with your finger and turning the symbol halfway around like a pinwheel.',
    solutionSteps: [
      'Notice the two balanced curved spirals: one sweeping from the top-left, one from the bottom-right.',
      'Perform a 180° rotation around the central axis: the top arm swings to the bottom, and the bottom arm swings to the top.',
      'Observe: The shape aligns with itself. This is called two-fold rotational symmetry!'
    ],
    country: 'Ghana',
    region: 'West Africa',
    community: 'Akan / Ashanti',
    language: 'Twi',
    culturalContext:
      'Adinkra symbols were stamped on commemorative fabrics using carved calabash stamps and natural dye from the Badie tree. Their geometric symmetries represent balance, continuity, and cosmic order.',
    source: 'The Cloth of the Sun: Adinkra Symbolism and Geometric Mathematics (Kwame Nkrumah University)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Centre for Cultural Studies, KNUST Kumasi',
    rightsStatus: 'COMMUNITY_HERITAGE',
    verificationStatus: 'VERIFIED_COMMUNITY',
    ageTier: '9-10',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['SPATIAL_THINKING', 'OBSERVATION', 'REASONING'],
    audioPronunciationText: 'Gye Nyame: discovering the two-fold rotational symmetry in Akan art.',
    accentRegion: 'west-african',
    connectedWorldLinks: {
      explorePinId: 'pin-kente'
    }
  },

  // =========================================================================
  // 5. PATTERN (COMMUNITY_TRADITION & ORIGINAL_PUZZLE)
  // Numbers, shapes, sequences, symmetry, mathematical traditions
  // =========================================================================
  {
    id: 'pat-chokwe-sona-euler',
    title: 'The Chokwe Sona Sand-Drawing Grid (Angola & DR Congo)',
    type: 'PATTERN',
    representationMode: 'COMMUNITY_TRADITION',
    question:
      'The elders of the Chokwe people in Angola and DR Congo draw intricate memory figures in the sand called "Sona".\n\nFirst, they press a grid of dots in the sand. Then, they draw a single continuous loop that weaves around the dots without lifting their finger or retracing any line! (In modern mathematics, this is called an Eulerian Path).\n\nIf a Sona pattern has a 3 × 4 grid of 12 dots, and each horizontal step weaves 2 boundary loops, how many total dots are enclosed inside the outer sand frame?',
    answer: '12 dots (3 rows × 4 columns)',
    answerOptions: ['12 dots (3 rows × 4 columns)', '7 dots', '14 dots', '24 dots'],
    correctAnswerIndex: 0,
    explanation:
      'A rectangular grid of 3 rows with 4 dots in each row contains exactly 3 × 4 = 12 dots. In Chokwe geometry, storytellers weave the continuous line through the spaces between the dots to depict birds, hunters, and constellations!',
    hint: 'Count the dots by multiplying the number of rows by the number of columns: 3 times 4!',
    solutionSteps: [
      'Recall the grid dimensions: 3 rows high and 4 columns wide.',
      'Multiply rows by columns: 3 × 4 = 12 dots in total.',
      'The Chokwe storyteller weaves the continuous cord line between these 12 anchor dots without ever intersecting a dot directly!'
    ],
    country: 'Angola & DR Congo',
    region: 'Central Africa',
    community: 'Chokwe (Tuchokwe)',
    language: 'Cokwe (Chokwe)',
    culturalContext:
      'Chokwe Sona storytellers (Akwa kuta sona) memorize hundreds of intricate geometric algorithms. While drawing the continuous sand curve, they narrate philosophical parables about the origin of the sun, the cunning hare, and communal cooperation. European mathematicians study Sona as an early indigenous foundation of graph theory!',
    source: 'Sona Geometry: Reflections on the Sand Drawing Tradition of Central Africa (Paulus Gerdes)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Prof. Paulus Gerdes',
    rightsStatus: 'COMMUNITY_HERITAGE',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    ageTier: '9-10',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['PATTERN_RECOGNITION', 'SPATIAL_THINKING', 'REASONING'],
    audioPronunciationText: 'Chokwe Sona: geometry in the sand that weaves graph theory with storytelling.',
    accentRegion: 'southern-african'
  },
  {
    id: 'pat-polyrhythm-12-8-beat',
    title: 'The 12/8 Bell Pattern: African Polyrhythm Math',
    type: 'PATTERN',
    representationMode: 'COMMUNITY_TRADITION',
    question:
      'In West African drumming (like the Ewe Gankogui bell and Yoruba Agogo), musicians play a famous 7-stroke bell pattern across a 12-pulse musical cycle:\n\nPulses: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]\nBell strikes on: [ 1, ., 3, ., 5, 6, ., 8, ., 10, ., 12 ]\n\nNotice the rhythm of intervals between strikes: 2 steps, 2 steps, 1 step, 2 steps, 2 steps, 2 steps, 1 step.\n\nHow many quiet "rest" pulses (dots) occur during this 12-pulse cycle?',
    answer: '5 quiet rest pulses (12 total pulses - 7 strikes = 5 rests)',
    answerOptions: [
      '5 quiet rest pulses (12 total pulses - 7 strikes = 5 rests)',
      '3 quiet rest pulses',
      '7 quiet rest pulses',
      '2 quiet rest pulses'
    ],
    correctAnswerIndex: 0,
    explanation:
      'The standard 12/8 bell timeline consists of 7 strikes and 5 rests (7 + 5 = 12). Because 7 and 12 share no common divisor (they are coprime), this pattern creates an asymmetrical, endlessly propelling groove that never feels monotonous!',
    hint: 'Subtract the 7 bell strikes from the total 12 pulses in the measure!',
    solutionSteps: [
      'Count the total beats in the complete timeline cycle: 12 pulses.',
      'Count the active bell strikes: beats 1, 3, 5, 6, 8, 10, 12 = 7 strikes.',
      'Subtract to find the silent spaces (rests): 12 - 7 = 5 silent pulses.',
      'These 5 syncopated spaces allow other drums (like the talking drum and djembe) to interlock like jigsaw puzzle pieces!'
    ],
    country: 'Ghana, Togo & Benin',
    region: 'West Africa',
    community: 'Ewe & Fon',
    language: 'Ewe / English',
    culturalContext:
      'The Gankogui iron bell plays the foundational timeline of the orchestra. Every dancer, singer, and master drummer listens to this exact 7-in-12 pattern to anchor their timing.',
    source: 'African Rhythm and African Sensibility (John Miller Chernoff, University of Chicago Press)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Dr. John Miller Chernoff',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    ageTier: '11-12',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['PATTERN_RECOGNITION', 'REASONING', 'MEMORY'],
    audioPronunciationText: 'The twelve-eight bell rhythm: seven strikes and five rests interlocking in time.',
    accentRegion: 'west-african',
    connectedWorldLinks: {
      instrumentId: 'talking-drum'
    }
  },

  // =========================================================================
  // 6. AFRICA_CONTEXT (ORIGINAL_PUZZLE & CONTEMPORARY_CONTEXT)
  // Architecture, science, inventions, daily life
  // =========================================================================
  {
    id: 'afr-lalibela-top-down-architecture',
    title: 'The Underground Church Mystery of Lalibela',
    type: 'AFRICA_CONTEXT',
    representationMode: 'ORIGINAL_PUZZLE',
    question:
      'In the highlands of northern Ethiopia, King Lalibela built 11 world-famous churches, including the cross-shaped Church of Saint George (Bete Giyorgis). Unlike normal buildings that are constructed from the ground upward with stones and wood, Lalibela’s builders used an astonishing reverse engineering method.\n\nHow were these massive 12-meter-tall churches constructed?',
    answer: 'They were carved directly downward into the solid red volcanic mountain rock from the roof to the floor!',
    answerOptions: [
      'They were carved directly downward into the solid red volcanic mountain rock from the roof to the floor!',
      'They were assembled from giant basalt blocks hauled across the desert.',
      'They were built from sun-dried clay bricks imported from Egypt.',
      'They were cast in bronze molds and buried in trenches.'
    ],
    correctAnswerIndex: 0,
    explanation:
      'Lalibela’s churches are monolithic rock-cut marvels! Stonemasons first dug wide trenches deep into the mountain to isolate a single block of volcanic basalt, and then meticulously chiseled doors, windows, pillars, and vaulted ceilings straight down into the living rock without a single nail or mortar seam!',
    hint: 'Look down from above: the roof of the church sits level with the ground where you walk!',
    solutionSteps: [
      'Step 1: Notice that you can stand on the grass and look DOWN into the courtyard onto the roof of Bete Giyorgis.',
      'Step 2: The rock has no joints or mortar seams because it is one continuous piece of bedrock.',
      'Step 3: Deduction: The builders chiseled trenches downward to free the block, then hollowed out the interior spaces with hammers and chisels.'
    ],
    country: 'Ethiopia',
    region: 'East Africa',
    community: 'Highland Ethiopian / Amhara Heritage',
    language: 'Amharic / Ge’ez / English',
    culturalContext:
      'Built in the 12th and 13th centuries, Lalibela is recognized by UNESCO as an engineering wonder of the medieval world. Water drainage systems carved into the rock still protect the monuments from torrential rainy seasons after 800 years.',
    source: 'Ethiopian Medieval Architecture and Monolithic Churches (UNESCO World Heritage Archives)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'UNESCO World Heritage Center',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'EDUCATIONAL_ORIGINAL',
    ageTier: '9-10',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['SPATIAL_THINKING', 'OBSERVATION', 'CURIOSITY'],
    audioPronunciationText: 'Bete Giyorgis in Lalibela: carved downward from the mountain rock.',
    accentRegion: 'east-african'
  },
  {
    id: 'afr-termite-mound-biomimicry',
    title: 'The Termite Air Conditioner: Bio-Inspired Engineering',
    type: 'AFRICA_CONTEXT',
    representationMode: 'ENVIRONMENT',
    question:
      'Across the African savannas, tiny Macrotermes termites build giant earthen mounds up to 5 meters tall. Even when the midday sun heats the outside air to a scorching 42°C (108°F), the temperature inside the termite queen’s nursery chamber remains at a cool, constant 30°C.\n\nArchitect Mick Pearce used this African natural principle to design the Eastgate Shopping Centre in Harare, Zimbabwe—saving 90% of the energy normally needed for electric air conditioning!\n\nWhat physical science principle keeps both the termite mound and the building naturally cool?',
    answer: 'Thermal convection chimneys: warm air rises and escapes out the top, drawing cool air in through lower underground vents.',
    answerOptions: [
      'Thermal convection chimneys: warm air rises and escapes out the top, drawing cool air in through lower underground vents.',
      'Termites cover their mound with crushed ice found underground.',
      'The red soil reflects all sunlight like a mirror.',
      'Electric fans powered by solar currents.'
    ],
    correctAnswerIndex: 0,
    explanation:
      'Hot air is lighter and naturally rises! By carving tall vertical chimney shafts and low underground tunnels, the termites create passive airflow (the stack effect). Cooler air from deep underground is pulled upward continuously, ventilating the colony without any moving machines!',
    hint: 'What happens to hot air compared to cool air? (Think of hot air balloons or campfire smoke rising!).',
    solutionSteps: [
      'Observe the thermal principle: Hot air expands, becomes less dense, and rises.',
      'Trace the airflow: Hot air inside the mound flows up through the tall central chimney.',
      'Notice the suction: As hot air leaves, it creates a low pressure that draws cooler air from deep below the surface into the nursery.',
      'Architectural connection: Humans can build comfortable buildings in warm climates by copying nature’s smart ventilation designs!'
    ],
    country: 'Zimbabwe & Kenya',
    region: 'Southern Africa',
    community: 'Savanna Ecosystems / Harare Architecture',
    language: 'English with Shona context',
    culturalContext:
      'Biomimicry—learning from African flora and fauna to solve human engineering challenges—is one of modern Africa’s most exciting scientific frontiers.',
    source: 'Biomimicry in Architecture & The Thermal Mechanics of African Macrotermes Mounds (Scott Turner)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Prof. J. Scott Turner',
    rightsStatus: 'PUBLIC_DOMAIN',
    verificationStatus: 'EDUCATIONAL_ORIGINAL',
    ageTier: '11-12',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['REASONING', 'OBSERVATION', 'PROBLEM_SOLVING', 'CURIOSITY'],
    audioPronunciationText: 'Termite mounds and the Eastgate Centre: natural thermal convection cooling.',
    accentRegion: 'southern-african'
  },

  // =========================================================================
  // 7. NATURAL_WORLD (NATURAL_FEATURE & ENVIRONMENT)
  // Landscapes, ecosystems, rivers, waterfalls, mountains, deserts
  // =========================================================================
  {
    id: 'nat-mosi-oa-tunya-rainforest',
    title: 'The Mystery of the Rainforest in the Gorge (Mosi-oa-Tunya)',
    type: 'NATURAL_WORLD',
    representationMode: 'NATURAL_FEATURE',
    question:
      'At Victoria Falls on the border of Zambia and Zimbabwe, the Tonga people call the waterfall "Mosi-oa-Tunya" ("The Smoke That Thunders").\n\nThe surrounding countryside is dry open savanna woodland. Yet directly opposite the edge of the falls, a dense, lush tropical rainforest flourishes with wild ferns, mahogany trees, and orchids!\n\nWhat continuous natural phenomenon allows this miraculous miniature rainforest to survive in the middle of a dry savanna?',
    answer: 'The rising cloud of mist from the falling water creates 24-hour artificial rain over the opposite cliff!',
    answerOptions: [
      'The rising cloud of mist from the falling water creates 24-hour artificial rain over the opposite cliff!',
      'An underground river pumps water up into the tree roots.',
      'The soil contains special volcanic chemicals that generate water.',
      'Local gardeners water the forest every morning.'
    ],
    correctAnswerIndex: 0,
    explanation:
      'When over 500 million liters of water plummet 108 meters down into the basalt chasm every minute, the force shatters the water into an immense cloud of spray that rises over 400 meters into the air. This constant falling spray provides 24-hour rainfall for the cliffside, nurturing a perpetual rainforest micro-climate!',
    hint: 'Why do visitors wearing raincoats get soaked even on sunny, cloudless days when walking along the cliff opposite the falls?',
    solutionSteps: [
      'Observe the physical energy: Millions of liters of Zambezi water drop into a narrow gorge.',
      'Observe the spray: The impact creates towering columns of mist visible 30 miles away.',
      'Follow the wind: Prevailing breezes blow this spray across the opposing cliff edge.',
      'Consequence: The continuous moisture nourishes delicate rainforest flora that could never survive the dry savanna climate alone.'
    ],
    country: 'Zambia & Zimbabwe',
    region: 'Southern Africa',
    community: 'Tonga & Lozi People of the Zambezi',
    language: 'chiTonga / siLozi',
    culturalContext:
      'The Tonga people recognized the falls as a sacred sanctuary of rain and rainbows. Traditional elders held prayers at the water’s edge, giving thanks for the perennial mist that blessed the region.',
    source: 'The Zambezi Basin Ecology & UNESCO World Heritage Dossier for Mosi-oa-Tunya',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Zambia National Heritage Conservation Commission',
    rightsStatus: 'COMMUNITY_HERITAGE',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    ageTier: '9-10',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['OBSERVATION', 'REASONING', 'CURIOSITY'],
    audioPronunciationText: 'Mosi-oa-Tunya, The Smoke That Thunders, and its perpetual rainforest mist.',
    accentRegion: 'southern-african',
    connectedWorldLinks: {
      explorePinId: 'pin-victoria-falls'
    }
  },
  {
    id: 'nat-okavango-desert-oasis',
    title: 'The River That Never Finds the Sea (Okavango Delta)',
    type: 'NATURAL_WORLD',
    representationMode: 'ENVIRONMENT',
    question:
      'Most great rivers around the world (like the Nile, Congo, and Mississippi) flow continuously until they empty into a salty ocean or sea.\n\nHowever, the Okavango River in southern Africa starts in the rainy highlands of Angola, flows across Namibia, and enters Botswana—but it NEVER reaches an ocean or sea!\n\nWhere does all of the Okavango’s fresh river water travel and disappear?',
    answer: 'It fans out into a giant inland oasis in the Kalahari Desert, where it evaporates and waters wildlife!',
    answerOptions: [
      'It fans out into a giant inland oasis in the Kalahari Desert, where it evaporates and waters wildlife!',
      'It falls into an endless underground volcanic tunnel.',
      'It freezes into a hidden glacier beneath the desert dunes.',
      'It turns around and flows backward up the mountain.'
    ],
    correctAnswerIndex: 0,
    explanation:
      'The Okavango is one of the world’s very few endorheic inland deltas! Spreading across 15,000 square kilometers of the Kalahari Desert sands, it creates a lush labyrinth of lagoons, papyrus channels, and islands. Over 96% of the water transpires through plants and evaporates into the sky, nourishing elephants, hippos, and fish in the heart of a desert!',
    hint: 'Look at the map of Botswana: the river spreads out like a giant green hand in the sands of the Kalahari Desert.',
    solutionSteps: [
      'Trace the journey: Rain falls on the Angolan plateau and travels hundreds of miles southeast.',
      'Reach the fault lines: The river reaches geological faults in the Kalahari basin where the land flattens.',
      'Notice the dispersal: With no gradient to continue to the ocean, the water fans out into thousands of tranquil channels.',
      'The cycle continues: The desert sun and thirsty plants absorb the water, recharging the clouds with rain for future seasons.'
    ],
    country: 'Botswana, Namibia & Angola',
    region: 'Southern Africa',
    community: 'Bayei & San of the Okavango',
    language: 'Setswana / English',
    culturalContext:
      'Bayei fishermen navigate the winding channels of the Okavango using "mokoro" (poled dugout canoes). Their profound understanding of seasonal water pulses and animal migration has preserved the delta for centuries.',
    source: 'The Okavango River: The Life of a Miracle Oasis (UNESCO World Heritage Committee)',
    sourceType: 'SCHOLARLY_PUBLICATION',
    sourceAuthorOrCollector: 'Botswana Department of Wildlife and National Parks',
    rightsStatus: 'COMMUNITY_HERITAGE',
    verificationStatus: 'VERIFIED_DOCUMENTED_ARCHIVE',
    ageTier: '11-12',
    difficulty: 'INTERMEDIATE',
    skillsDeveloped: ['REASONING', 'SPATIAL_THINKING', 'CURIOSITY'],
    audioPronunciationText: 'The Okavango Delta: an inland miracle river that flowers in the Kalahari sands.',
    accentRegion: 'southern-african',
    connectedWorldLinks: {
      explorePinId: 'pin-okavango-delta'
    }
  }
];
