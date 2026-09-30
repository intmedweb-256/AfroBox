import { RiddleEntity } from '../types/afrobox';

export const AFROBOX_RIDDLES: RiddleEntity[] = [
  // 1. Tilapia Riddle (Linked to Lake Victoria & Food)
  {
    id: 'riddle-tilapia',
    entityId: 'entity-tilapia',
    title: 'The Silver Lake Swimmer',
    riddleText:
      'I swim in the gentle blue waves of Lake Victoria. When danger comes near, my mother shelters me safely inside her mouth until the water is calm. Fishermen celebrate when they catch me, and families enjoy me with coconut stew. Who am I?',
    audioVoiceGuidance:
      'Listen closely: I swim in Lake Victoria and my mother shelters me in her mouth. Who am I?',
    clues: [
      'I have shiny scales and live in freshwater.',
      'My Swahili and Luo name is "Ngege".',
      'I am one of the most beloved foods in East Africa.'
    ],
    options: ['Tilapia (Ngege)', 'Nile Crocodile', 'Water Lily', 'Hippopotamus'],
    correctAnswerIndex: 0,
    explanation:
      'Correct! Tilapia (called Ngege) are famous freshwater fish in Lake Victoria. Mother tilapia are mouthbrooders who protect their babies inside their mouths!',
    ageTier: '6-8',
    region: 'East Africa',
    connectedStoryId: 'story-sungura-baobab',
    connectedExploreEntityId: 'entity-lake-victoria',
    rewardBadge: 'Lake Fisher of Victoria'
  },

  // 2. Baobab Riddle (Linked to Plant & Savannas)
  {
    id: 'riddle-baobab',
    entityId: 'entity-baobab',
    title: 'The Upside-Down Giant',
    riddleText:
      'My branches look like roots waving in the sky, which makes people say the spirits planted me upside down! Inside my wide, hollow belly, I can store thousands of liters of fresh water through long dry seasons. Who am I?',
    audioVoiceGuidance:
      'I look like I was planted upside down, and my trunk stores thousands of liters of water. Can you guess?',
    clues: [
      'I am often called the "Tree of Life".',
      'My velvet fruit is sour, tangy, and filled with vitamins.',
      'I can live for more than one thousand years.'
    ],
    options: ['Acacia Bush', 'Baobab Tree', 'Oil Palm', 'Papyrus Reed'],
    correctAnswerIndex: 1,
    explanation:
      'Splendid! The Baobab tree (Mbuyu) can hold up to 120,000 liters of water in its spongy wood and live for over 2,000 years across the African savannas.',
    ageTier: '6-8',
    region: 'Southern Africa',
    connectedStoryId: 'story-sungura-baobab',
    connectedExploreEntityId: 'entity-baobab',
    rewardBadge: 'Friend of the Baobab'
  },

  // 3. Guineafowl Riddle (Linked to Matobo Hills & Morning Star story)
  {
    id: 'riddle-guineafowl',
    entityId: 'entity-guineafowl',
    title: 'The Starlight Cloak',
    riddleText:
      'I chatter across the granite rocks of the hills: "Kek-kek-kek!" On my deep midnight feathers, I wear hundreds of tiny white polka dots that look like stars flicked from the dawn sky. Who am I?',
    audioVoiceGuidance:
      'Who wears a cloak of starlight polka dots and chatters across the granite hills?',
    clues: [
      'I am a bird that prefers to sprint fast rather than fly.',
      'In Shona culture, my name is Hanga.',
      'I have a blue and red helmet on top of my head.'
    ],
    options: ['African Crowned Crane', 'Ostrich', 'Helmeted Guineafowl (Hanga)', 'Weaver Bird'],
    correctAnswerIndex: 2,
    explanation:
      'Spot on! The Helmeted Guineafowl (Hanga) runs along rocky kopjes in flocks and is celebrated in African folklore for its starlight polka dots.',
    ageTier: '6-8',
    region: 'Southern Africa',
    connectedStoryId: 'story-guineafowl-morning-star',
    connectedExploreEntityId: 'entity-matobo-hills',
    rewardBadge: 'Watcher of the Morning Star'
  },

  // 4. Ananse Spider Riddle (Linked to Wisdom & Ghana)
  {
    id: 'riddle-ananse',
    entityId: 'entity-akan-lang',
    title: 'The Eight-Legged Trickster',
    riddleText:
      'I have eight spindly legs, a clever mind, and a fondness for spinning fine silk threads. Long ago, I spun a golden thread all the way up to the Sky God Nyame to bring stories down to humankind. Who am I?',
    audioVoiceGuidance:
      'I have eight legs and spun a thread to the Sky God to win all the stories of the world. Who am I?',
    clues: [
      'My name in Akan means spider.',
      'I am the hero of hundreds of West African trickster folktales.',
      'My son Kweku Tsin often shows me that wisdom belongs to everyone.'
    ],
    options: ['Ananse the Spider', 'Tortoise the Slow', 'Leopard the Swift', 'Chameleon'],
    correctAnswerIndex: 0,
    explanation:
      'Incredible! Kwaku Ananse is the celebrated Akan spider who proved that small creatures with quick wit can accomplish heroic tasks.',
    ageTier: '9-10',
    region: 'West Africa',
    connectedStoryId: 'story-ananse-wisdom-pot',
    connectedExploreEntityId: 'entity-akan-lang',
    rewardBadge: 'Master of Stories'
  },

  // 5. Kilimanjaro Riddle (Linked to Geography & Snow)
  {
    id: 'riddle-kilimanjaro',
    entityId: 'entity-kilimanjaro',
    title: 'The White Crown of East Africa',
    riddleText:
      'I stand all alone in the sky with no mountain range around me. Even though I sit very close to the warm tropical equator, my highest rocky peak wears a glistening cap of ice and snow. Who am I?',
    audioVoiceGuidance:
      'I am the highest peak in Africa, wearing a crown of snow near the equator. Can you name me?',
    clues: [
      'I am located in Tanzania, East Africa.',
      'I am the tallest free-standing mountain in the world.',
      'You can hike through 5 climate zones to reach my summit, Uhuru Peak.'
    ],
    options: ['Atlas Mountains', 'Mount Kilimanjaro', 'Table Mountain', 'Drakensberg'],
    correctAnswerIndex: 1,
    explanation:
      'Wonderful! Mount Kilimanjaro rises 5,895 meters above sea level and provides water to surrounding cloud forests and agricultural communities.',
    ageTier: '9-10',
    region: 'East Africa',
    connectedStoryId: 'story-sungura-baobab',
    connectedExploreEntityId: 'entity-kilimanjaro',
    rewardBadge: 'Summit Explorer'
  },

  // 6. Kora Riddle (Linked to Music & West Africa)
  {
    id: 'riddle-kora',
    entityId: 'entity-kora',
    title: 'The Singing Calabash',
    riddleText:
      'I am made from a huge dried gourd, a cowskin soundboard, and twenty-one melodic strings. Griots hold me while singing epic histories of ancient kings, and my notes sound like fresh water pouring over stones. What am I?',
    audioVoiceGuidance:
      'I have twenty-one strings and a gourd soundboard, played by storytellers in West Africa. What am I?',
    clues: [
      'My musicians only use four fingers to play all my strings.',
      'I come from the Mandinka and Wolof cultural traditions.',
      'My name has only four letters.'
    ],
    options: ['Djembe Drum', 'Balafon Xylophone', 'The Kora Harp', 'Talking Drum'],
    correctAnswerIndex: 2,
    explanation:
      'Superb! The Kora is a 21-string harp lute played by hereditary oral historians (Griots/Jalis) across Senegal, Gambia, Guinea, and Mali.',
    ageTier: '11-12',
    region: 'West Africa',
    connectedStoryId: 'story-ananse-wisdom-pot',
    connectedExploreEntityId: 'entity-kora',
    rewardBadge: 'Melody of the Griots'
  }
];
