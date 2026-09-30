import { Story } from '../types/story';

export const SAMPLE_STORIES: Story[] = [
  {
    id: 'chewzi-kitara-crater-lakes',
    title: 'The Mystical Bachwezi and the Sacred Crater Lakes of Kitara',
    shortDescription:
      'The legendary demigod kings of ancient Kitara ruled Western Uganda with long-horned Ankole cattle and master crafts before mystically submerging into the emerald crater lakes.',
    country: 'Uganda',
    region: 'East Africa',
    culturalTradition: 'Bachwezi / Kitara Dynasty Lore',
    community: 'Western Uganda crater lakes (Bunyoro, Toro & Ankole)',
    languageOfOrigin: 'Runyoro-Rutooro / Runyankore',
    storyType: 'LEGEND',
    themes: ['Origins & Ancestry', 'Sacred Cattle', 'Crater Lakes & Nature', 'Wisdom'],
    ageRange: '6-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 5,
    learningObjectives: [
      'Learn about the historical Empire of Kitara and the mysterious Bachwezi kings',
      'Understand the cultural reverence for pearl-horned Ankole cattle (Enyambo)',
      'Explore the volcanic crater lakes of Fort Portal and Western Uganda'
    ],
    source: 'Documented Bunyoro-Kitara and Toro royal oral histories and palace archives',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Traditional Banyoro and Batooro oral custodians',
    originalStoryteller: 'Palace elders of Fort Portal and Karuzika Palace',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Educational Chronicle',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'In Western Ugandan tradition, the Bachwezi are remembered as gentle demi-gods who vanished into Lake Wamala and crater lakes rather than dying as mortals.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      alt: 'The emerald waters of Kasenda volcanic crater lakes ringed by green hills in Western Uganda',
      caption: 'The emerald Kasenda crater lakes of Western Uganda, sacred sanctuary of the Bachwezi.',
      artistOrCredit: 'Photo by Unsplash Nature Archive / AfroBox Visual Curations'
    },
    narrations: [],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'Centuries ago across the rolling green highlands of Western Uganda stretched the vast Empire of Kitara. The kingdom was ruled by the Bachwezi—a dynasty of semi-divine kings, architects, and healers whose tall, noble presence was revered from the foothills of the Rwenzori Mountains to the shores of Lake Victoria.',
        highlightWords: ['Bachwezi', 'Kitara']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'The Bachwezi introduced master iron-smelting, royal barkcloth craft, sacred coffee bean pacts of brotherhood, and bred the majestic, pearlescent long-horned Enyambo cattle whose lyrical horns arched gracefully toward the sky.',
        highlightWords: ['Enyambo']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Their great capital stood at Bigo bya Mugenyi, where immense circular ditches and earthwork ramparts were carved out of stone and clay to safeguard their cattle kraals. King Wamara and King Ndahiro were celebrated for dispensing justice with profound equanimity.',
        highlightWords: ['Wamara', 'Bigo bya Mugenyi']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'When their golden reign reached its prophesied conclusion, the Bachwezi did not succumb to mortal death. Surrounded by misty winds and ancestral flute melodies, the royal court walked serenely into the mirror-like waters of Lake Wamala and the Kasenda crater lakes near Fort Portal, submerging into the spiritual realm.',
        highlightWords: ['Fort Portal', 'Kasenda']
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'To this day, the spirits of the Bachwezi (the Embandwa) are honored across Uganda as guardians of water springs, fertility, and cattle prosperity. Visitors to Fort Portal still gaze across the deep turquoise crater lakes, sensing the peaceful presence of the ancient kings.'
      }
    ],
    vocabulary: [
      {
        word: 'Bachwezi',
        language: 'Runyoro-Rutooro',
        phonetic: 'Bah-chweh-zee',
        definition: 'The legendary semi-divine rulers and master craftsmen of the ancient Empire of Kitara.'
      },
      {
        word: 'Enyambo',
        language: 'Runyankore / Runyoro',
        phonetic: 'Eh-nyahm-boh',
        definition: 'The royal, long-horned Ankole cattle celebrated for their majestic curved horns.'
      },
      {
        word: 'Embandwa',
        language: 'Runyoro',
        phonetic: 'Ehm-bahn-dwah',
        definition: 'Ancestral guardian spirits associated with healing, water sanctuaries, and family well-being.'
      }
    ],
    thinkAboutIt: {
      question: 'Why did the ancient people remember the Bachwezi as protectors of crater lakes and nature?',
      prompt: 'Reflect on how stories preserve the sacredness of fresh water sources for future generations.',
      guidingPoints: [
        'Crater lakes provided clean water and prevented soil drought.',
        'Connecting leaders with nature reminded communities never to pollute or exploit lakes.'
      ],
      conversationStarterForParents: 'Ask your child: What is the most beautiful lake or river in your country, and how can we protect it?'
    },
    relatedContent: [
      {
        id: 'chewzi-explore-01',
        step: 'EXPLORE',
        title: 'Fort Portal: Tourism City of Crater Lakes',
        learningArea: 'Geography & Ecology',
        description: 'Explore the volcanic crater fields of Western Uganda.',
        interactiveType: 'geography_card',
        payload: {
          mapLocation: {
            country: 'Uganda',
            region: 'East Africa',
            coordinatesName: 'Fort Portal & Kasenda Crater Belt',
            ecosystem: 'Albertine Rift Volcanic Field & Montane Forest',
            fact: 'Fort Portal is officially designated as the Tourism City of Uganda, surrounded by over 50 volcanic crater lakes.'
          }
        }
      }
    ],
    characterNames: ['King Wamara', 'King Ndahiro'],
    format: 'READ_ALONG',
    dateAdded: '2026-09-28',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'ganda-kintu-nambi-genesis',
    title: 'Kintu, Nambi, and the Genesis of the Buganda Kingdom',
    shortDescription:
      'The foundational Buganda genesis story: how Kintu won the love of celestial maiden Nambi, survived the trials of Sky King Ggulu, and established the 52 clans of Uganda.',
    country: 'Uganda',
    region: 'East Africa',
    culturalTradition: 'Buganda Kingdom Oral Tradition',
    community: 'Central Uganda (Kampala, Mukono, Mpigi & Lake Victoria)',
    languageOfOrigin: 'Luganda',
    storyType: 'MYTH_ORIGIN',
    themes: ['Origins & Creation', 'Love & Loyalty', 'Clan Solidarity', 'Agriculture'],
    ageRange: '6-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 6,
    learningObjectives: [
      'Learn about Kintu as the first man in Buganda oral cosmology',
      'Understand how Matooke (steamed green bananas) became the staple food of Uganda',
      'Discover the origin of the 52 clans of the Buganda Kingdom'
    ],
    source: 'Documented by Sir Apolo Kaggwa (Ekitabo kye Bika bya Baganda, 1908) and Buganda cultural custodians',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Buganda royal historians and clan heads (Batakka)',
    originalStoryteller: 'Kasubi court griots and palace elders',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Educational Chronicle',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'Kintu and Nambi is the most celebrated epic in Ugandan folklore, explaining both the blessings of agriculture and the origin of mortal resilience.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Misty golden sunrise over the serene islands and waters of Lake Victoria (Nnalubaale)',
      caption: 'The peaceful shoreline of Lake Victoria (Nnalubaale), where Kintu and Nambi settled.',
      artistOrCredit: 'Photo by Unsplash Nature Archive / AfroBox Visual Curations'
    },
    narrations: [],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'In the beginning of Uganda\'s earliest memories, the first man on earth was Kintu. He lived alone on the fertile hills surrounded by wild banana plants, accompanied only by his single beloved cow that provided him with fresh milk, quiet companionship, and warmth.',
        highlightWords: ['Kintu']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'From the heavens above, Nambi, the beautiful daughter of the Sky King Ggulu, gazed down upon the lush green landscape of Uganda. Touched by Kintu’s gentle humility and devotion to his cow, Nambi descended to earth and pledged her heart to him.',
        highlightWords: ['Nambi', 'Ggulu']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'To prove his worthiness to marry Nambi, Sky King Ggulu tested Kintu with impossible challenges: eating a banquet for a thousand warriors and identifying his own single cow hidden among ten thousand identical golden heifers.',
        highlightWords: ['Lwanyi']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Guided by a helpful hornet, Kintu successfully identified his cow. Delighted by his honesty and calmness, Ggulu blessed the couple with cattle, goats, chickens, millet, and the sacred plantain shoots of Matooke to cultivate on earth.',
        highlightWords: ['Matooke']
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Kintu and Nambi descended to the shores of Lake Victoria (Nnalubaale). There they raised children who established the 52 venerable clans of the Buganda Kingdom, thriving on the fertile green hills in perpetual harmony.'
      }
    ],
    vocabulary: [
      {
        word: 'Matooke',
        language: 'Luganda',
        phonetic: 'Mah-toh-keh',
        definition: 'The beloved highland cooking bananas steamed in plantain leaves; the national dish of Uganda.'
      },
      {
        word: 'Nnalubaale',
        language: 'Luganda',
        phonetic: 'Nah-loo-bah-leh',
        definition: 'The native African name for Lake Victoria, meaning "The Sea of Divine Spirits."'
      },
      {
        word: 'Kabaka',
        language: 'Luganda',
        phonetic: 'Kah-bah-kah',
        definition: 'The king and supreme cultural sovereign of the Buganda Kingdom.'
      }
    ],
    thinkAboutIt: {
      question: 'Why did Kintu value his single cow so deeply before meeting Nambi?',
      prompt: 'Reflect on how taking care of simple gifts with loyalty prepares you for greater blessings.',
      guidingPoints: [
        'Kintu was not greedy; he treated his single animal with respect and tenderness.',
        'True wealth is measured by character, loyalty, and patience.'
      ],
      conversationStarterForParents: 'Ask your child: What is something you take care of every day with loving care?'
    },
    relatedContent: [],
    characterNames: ['Kintu', 'Nambi', 'Ggulu'],
    format: 'READ_ALONG',
    dateAdded: '2026-09-28',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'lango-olum-sacred-hunt',
    title: 'Olum, the Sacred Spear, and the Spirit of Dwar',
    shortDescription:
      'The legendary Lango origin story: how the wise leader Olum united Northern Uganda through cooperative hunting (Dwar), protected the Crested Crane, and discovered life-giving springs.',
    country: 'Uganda',
    region: 'East Africa',
    culturalTradition: 'Lango Oral Tradition',
    community: 'Northern Uganda savannahs and Lake Kyoga wetlands (Lira, Apac, Dokolo)',
    languageOfOrigin: 'Leb Lango',
    storyType: 'LEGEND',
    themes: ['Community Unity', 'Cooperative Hunting', 'Crested Crane', 'Fair Sharing'],
    ageRange: '6-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 5,
    learningObjectives: [
      'Learn about the Lango heritage of Northern Uganda and the cultural code of Dwar',
      'Understand why the Crested Crane is revered as a sacred animal and national symbol',
      'Discover the Lango virtue of Awany (sharing food with the whole community)'
    ],
    source: 'Documented by Lango cultural researchers and the Won Nyaci council of elders',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Lango elders and community storytellers of Otuke Hills',
    originalStoryteller: 'Lango clan elders of Lira',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Educational Chronicle',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'The communal hunt (Dwar) among the Lango was strictly regulated by elders to ensure wildlife conservation and communal food distribution.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1200&q=80',
      alt: 'Golden sunrise across the savannah grasslands and acacia woodlands of Northern Uganda',
      caption: 'The sweeping savannah horizons of Northern Uganda near Lake Kyoga.',
      artistOrCredit: 'Photo by Unsplash African Collection / AfroBox Visual Curations'
    },
    narrations: [],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'The Lango people migrated from the northern savannahs, settling the rich grasslands and papyrus wetlands between Lake Kyoga and Lake Kwania. Renowned for their tactical brilliance, independent spirit, and community solidarity, the Lango were led by Olum, a legendary patriarch and rainmaker.',
        highlightWords: ['Olum', 'Lake Kyoga']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'During an unprecedented dry season, the streams dried to cracked mud, and the antelopes fled into distant thickets. Olum took the ancestral iron spear (Tong), forged by the master blacksmiths of Otuke Hills, and climbed the sacred boulder.',
        highlightWords: ['Tong', 'Otuke']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Instead of allowing hunters to scramble selfishly, Olum sounded the curved kudu horn to call Dwar Arum—the great communal hunt. Hundreds of hunters moved in a synchronized, protective circular formation, working together with discipline and mutual trust.',
        highlightWords: ['Dwar Arum']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'As they marched, a solitary Crested Crane (Walyer)—the national bird of Uganda—called out and flew toward a rocky grove of wild sycamore figs. Olum followed the crane’s flight and struck his iron spear into the fissures of the granite rock.',
        highlightWords: ['Walyer']
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'A torrential freshwater spring bubbled forth from the stone, filling the streams and restoring the fishing waters of Lake Kyoga. Olum decreed the sacred law of Awany: every piece of food harvested must be shared equally among the elderly, widows, and infants first.'
      }
    ],
    vocabulary: [
      {
        word: 'Dwar',
        language: 'Leb Lango',
        phonetic: 'Dwah-rr',
        definition: 'The organized communal hunt where families and clans work together in unified discipline.'
      },
      {
        word: 'Tong',
        language: 'Leb Lango',
        phonetic: 'Tohng',
        definition: 'The sacred iron hunting and ceremonial spear forged by master blacksmiths.'
      },
      {
        word: 'Walyer',
        language: 'Leb Lango',
        phonetic: 'Wah-lyair',
        definition: 'The Crested Crane; revered for elegance, fidelity, and peaceful guidance.'
      }
    ],
    thinkAboutIt: {
      question: 'Why did Olum follow the flight of the Crested Crane rather than chasing wild game?',
      prompt: 'Notice how paying attention to birds and animals often leads to water and safety.',
      guidingPoints: [
        'The crane is a creature of freshwater wetlands and never strays far from living springs.',
        'Listening to nature is often wiser than relying only on force.'
      ],
      conversationStarterForParents: 'Ask your child: What does the Crested Crane on Uganda\'s flag represent to you?'
    },
    relatedContent: [],
    characterNames: ['Olum'],
    format: 'READ_ALONG',
    dateAdded: '2026-09-28',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'gisu-masaba-mundu-sera',
    title: 'Mundu, Sera, and the Sacred Spirit of Mount Masaba',
    shortDescription:
      'The Bamasaba creation legend: how Mundu and Sera emerged from the caves of Mount Elgon, and their descendant Masaba proved his valor in the sacred Imbalu initiation.',
    country: 'Uganda',
    region: 'East Africa',
    culturalTradition: 'Bamasaba / Bagisu Oral Heritage',
    community: 'Eastern Uganda volcanic highlands (Mbale, Sironko, Manafwa & Mount Elgon)',
    languageOfOrigin: 'Lumasaaba / Lugisu',
    storyType: 'MYTH_ORIGIN',
    themes: ['Mountain Heritage', 'Courage & Valor', 'Imbalu Ceremony', 'Bamboo Forests'],
    ageRange: '6-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 5,
    learningObjectives: [
      'Discover Mount Masaba (Mount Elgon) as the cultural heart of the Bagisu',
      'Understand the cultural significance of the Imbalu rite of passage and Kadodi drums',
      'Explore Malewa (smoked bamboo shoots) as a culinary and ecological treasure'
    ],
    source: 'Documented by Bamasaba Cultural Institution (Inzu Ya Masaaba) elders',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Inzu Ya Masaaba council of elders and Mbale historians',
    originalStoryteller: 'Bamasaba village elders of Wanale',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Educational Chronicle',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'The Bamasaba view Mount Elgon not merely as a geographic peak, but as the physical body of their founding ancestor Masaba.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Sipi Falls cascading through lush tropical green mountain gorges on Mount Elgon in Uganda',
      caption: 'Sipi Falls plunging down the volcanic cliffs of Mount Masaba (Mount Elgon) in Uganda.',
      artistOrCredit: 'Photo by Unsplash Nature Archive / AfroBox Visual Curations'
    },
    narrations: [],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'Soaring above Eastern Uganda stands Mount Masaba (Mount Elgon)—an ancient extinct volcano with the world’s largest intact caldera. The Bamasaba people revere this mountain as their eternal mother and the sacred birthplace of all humankind.',
        highlightWords: ['Mount Masaba', 'Mount Elgon']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'Oral history recounts that the first human parents, Mundu and his wife Sera, emerged from the sacred volcanic caverns of the mountain near the rushing waters of Sipi Falls. They nourished their families on wild mountain honey, fertile volcanic crops, and Malewa—tender smoked bamboo shoots.',
        highlightWords: ['Mundu', 'Sera', 'Malewa']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Centuries later, their descendant Masaba, a strapping mountain hunter, fell deeply in love with Nabarwa, a brave maiden from the plains. To win her hand and prove his readiness to protect his family, Masaba had to undergo the sacred rite of Imbalu without flinching or blinking.',
        highlightWords: ['Masaba', 'Nabarwa', 'Imbalu']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'As the thunderous polyrhythms of the Kadodi drums echoed against the sheer cliffs of Wanale Ridge, Masaba stood tall, calm, and unshakable like the volcanic stone of the mountain. His valor won Nabarwa’s heart, and their children founded the clans of the Bamasaba.',
        highlightWords: ['Kadodi', 'Wanale']
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Every two years, the slopes of Mount Elgon come alive as youth participate in the Imbalu ceremony, dancing the ecstatic Kadodi across Mbale to celebrate courage, ancestral honor, and the enduring strength of the mountain.'
      }
    ],
    vocabulary: [
      {
        word: 'Imbalu',
        language: 'Lumasaaba',
        phonetic: 'Eem-bah-loo',
        definition: 'The sacred biennial circumcision rite of passage celebrating unwavering courage and maturity.'
      },
      {
        word: 'Kadodi',
        language: 'Lumasaaba',
        phonetic: 'Kah-doh-dee',
        definition: 'The high-energy ceremonial drum rhythms and ecstatic street dance of the Bamasaba people.'
      },
      {
        word: 'Malewa',
        language: 'Lumasaaba',
        phonetic: 'Mah-leh-wah',
        definition: 'Tender bamboo shoots harvested from Mount Elgon’s alpine bamboo forests and smoked to perfection.'
      }
    ],
    thinkAboutIt: {
      question: 'Why do the Bamasaba call Mount Elgon by the personal name "Mount Masaba"?',
      prompt: 'Consider how naming a mountain after an ancestor makes people protect its forests and streams like family.',
      guidingPoints: [
        'The mountain provides rain, fertile volcanic soil for coffee, and bamboo shoots.',
        'Treating the mountain as a living ancestor builds deep ecological respect.'
      ],
      conversationStarterForParents: 'Ask your child: What is a place in nature where you feel peaceful and strong?'
    },
    relatedContent: [],
    characterNames: ['Mundu', 'Sera', 'Masaba', 'Nabarwa'],
    format: 'READ_ALONG',
    dateAdded: '2026-09-28',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'ananse-pot-of-wisdom',
    title: 'The Spider and the Pot of Wisdom',
    shortDescription:
      'Kwaku Ananse collects all the wisdom in the world into a clay pot, only to learn a surprising lesson from his young son.',
    country: 'Ghana',
    region: 'West Africa',
    culturalTradition: 'Akan / Asante Tradition',
    community: 'Southern forest belt (Ashanti and Eastern regions)',
    languageOfOrigin: 'Asante Twi',
    storyType: 'ANIMAL_TRICKSTER',
    themes: ['Wisdom & Cleverness', 'Humility', 'Family & Community', 'Nature'],
    ageRange: '6-9',
    difficulty: 'EASY',
    estimatedReadingTime: 5,
    learningObjectives: [
      'Understand that knowledge and wisdom belong to the collective community',
      'Learn key Twi vocabulary words and their cultural meanings',
      'Reflect on how listening to others makes us wiser'
    ],
    source: 'Documented Akan oral tradition retold for educational reading',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Documented by R.S. Rattray (1930); retold in contemporary child-accessible English',
    originalStoryteller: 'Akan village storytellers (Akyeame and elders)',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Educational Retelling',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'Traditional stories can have many versions. This is one retelling. In Akan oral traditions, Kwaku Ananse (the spider) is famous for his ingenuity, but his tales almost always conclude with a lesson in humility, showing that one single person cannot possess all the knowledge of the earth.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
      alt: 'Lush green tropical canopy with sunlight filtering through ancient forest trees in Ghana',
      caption: 'In the high green forest of Ghana, where silk-cotton trees reach toward the sun.',
      artistOrCredit: 'Photo by Unsplash Nature Archive / AfroBox Visual Curations'
    },
    narrations: [
      {
        narrationId: 'narr-ananse-01',
        storyId: 'ananse-pot-of-wisdom',
        narratorId: 'narrator-adjoa',
        narratorName: 'Adjoa Mansa',
        voiceType: 'COMMUNITY_STORYTELLER',
        language: 'English (Ghanaian Accent)',
        locale: 'en-GH',
        duration: 210,
        recordingMethod: 'Studio Microphone',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-03-01T10:00:00Z',
        approvedAt: '2026-03-05T12:00:00Z'
      },
      {
        narrationId: 'narr-ananse-02',
        storyId: 'ananse-pot-of-wisdom',
        narratorId: 'narrator-kofi',
        narratorName: 'Kofi Mensah',
        voiceType: 'TEACHER',
        language: 'Asante Twi & English Bilingual',
        locale: 'ak-GH',
        duration: 245,
        recordingMethod: 'Classroom Microphone',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-04-12T14:30:00Z',
        approvedAt: '2026-04-14T09:00:00Z'
      }
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'A long time ago in the vibrant green forests of Ghana, Kwaku Ananse the spider had an ambitious thought. "If I can gather every drop of nyansa—wisdom—in the whole wide world, everyone will have to come to me whenever they need good advice!"',
        highlightWords: ['nyansa']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'He found a sturdy clay pot and went from village to riverbank, listening carefully to weavers, farmers, blacksmiths, and boat builders. Whenever he heard a clever idea or a wise proverb, he captured it and placed it carefully into his clay pot.'
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Soon, the pot was overflowing with thoughts on how to heal illnesses, how to settle quarrels peacefully, how to plant yams in fertile soil, and how to tell the weather by the flight of swallows. Ananse sealed the top with thick tree sap.'
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: '"Now," thought Ananse, "I must hide this pot where no one else can ever reach it. The highest branch of the sacred Odum tree!" He tied the heavy pot to the front of his stomach with a strong vine rope and started climbing.',
        highlightWords: ['Odum']
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Up he tried to scuttle, but having the pot tied to his front made it impossible. His knees kept bumping against the clay, and his little eight legs could not get a firm grip on the tree trunk. He slipped and puffed and grew frustrated.'
      },
      {
        id: 'p6',
        paragraphNumber: 6,
        text: 'Down below on the path, his young son Ntikuma was watching with curious eyes. Ntikuma tilted his head and called up gently: "Father, wouldn’t it be much easier to climb if you strapped the pot onto your back instead of your belly?"',
        highlightWords: ['Ntikuma']
      },
      {
        id: 'p7',
        paragraphNumber: 7,
        text: 'Ananse stopped in mid-air. He looked at the pot. He looked down at his child. In all his gathering, he had forgotten that a small child could see what a clever spider had missed! "I gathered all the wisdom in the world, yet a piece remained with my own son!" In his astonishment, the pot slipped from the vine and shattered upon the soft moss below.'
      },
      {
        id: 'p8',
        paragraphNumber: 8,
        text: 'A gentle breeze blew through the forest, picking up bits of wisdom and scattering them to every corner of the world. And that is why to this very day, no single person possesses all the wisdom—it is shared by everyone everywhere.'
      }
    ],
    vocabulary: [
      {
        word: 'Nyansa',
        language: 'Asante Twi',
        phonetic: 'nyan-sah',
        definition: 'Wisdom, understanding, and clever insight.',
        culturalContext:
          'In Akan culture, wisdom is deeply respected and believed to belong to community elders, children, and ancestors together.'
      },
      {
        word: 'Odum',
        language: 'Asante Twi / English',
        phonetic: 'oh-doom',
        definition: 'The African Teak tree (Milicia excelsa), an enormous canopy tree.',
        culturalContext:
          'Odum trees can live for hundreds of years and grow over 50 meters tall in the West African rainforest.'
      },
      {
        word: 'Ntikuma',
        language: 'Asante Twi',
        phonetic: 'en-tee-koo-mah',
        definition: 'Ananse’s observant and clever son in Akan folklore.',
        culturalContext:
          'Ntikuma often plays the voice of practical reason when his father’s schemes become too complicated.'
      }
    ],
    thinkAboutIt: {
      question: 'Why do you think wisdom couldn’t fit into a single pot?',
      prompt: 'Think about a time when someone younger or unexpected taught you something new.',
      guidingPoints: [
        'Ananse thought he could own all knowledge by himself.',
        'His son saw a simple solution because he looked from a different angle.',
        'Sharing ideas makes everyone in the family or classroom stronger.'
      ],
      conversationStarterForParents:
        'Ask your child: "What is one thing you taught me this week that I didn’t know before?"'
    },
    relatedContent: [
      {
        id: 'ananse-think-01',
        step: 'THINK',
        title: 'The Great Wisdom Riddle',
        learningArea: 'Reading Comprehension',
        description: 'Test your understanding of why Ananse had trouble climbing the tree.',
        interactiveType: 'quiz',
        payload: {
          question: 'What made Ananse realize that he did not have all the world’s wisdom?',
          options: [
            'A bird stole the pot from his hand',
            'His son Ntikuma pointed out that tying the pot to his back would make climbing easier',
            'The tree grew too tall to see the top',
            'The clay pot dissolved in the rain'
          ],
          correctIndex: 1,
          explanation:
            'Even though Ananse believed his pot contained all knowledge, his son’s practical insight proved that wisdom is everywhere and cannot be monopolized.'
        }
      },
      {
        id: 'ananse-explore-02',
        step: 'EXPLORE',
        title: 'Explore the Ashanti Rainforest',
        learningArea: 'Geography & Ecology',
        description: 'Discover the living environment of the Akan people in southern Ghana.',
        interactiveType: 'geography_card',
        payload: {
          mapLocation: {
            country: 'Ghana',
            region: 'West Africa',
            coordinatesName: 'Kumasi, Ashanti Region',
            ecosystem: 'Tropical Moist Forest & Deciduous Forest Zone',
            fact: 'The Odum tree provides shelter for over 40 species of birds and insects in Ghana’s forest reserves.'
          },
          culturalDetails: [
            'The Asante kingdom has used adinkra symbols for centuries to record proverbs and philosophy.',
            'The spider symbol is known as "Ananse Ntontan", representing wisdom, craftiness, and creativity.'
          ]
        }
      },
      {
        id: 'ananse-create-03',
        step: 'CREATE',
        title: 'Design Your Own Wisdom Pot',
        learningArea: 'Creative Writing & Art',
        description: 'If you had a clay pot, what 3 pieces of kindness or helpful advice would you place inside for your school?',
        interactiveType: 'creative_prompt',
        payload: {
          creativeTask:
            'Write or draw three things that help people get along: for example, "listen when someone is sad", "share your water", or "say thank you".'
        }
      }
    ],
    characterNames: ['Kwaku Ananse', 'Ntikuma'],
    format: 'READ_ALONG',
    dateAdded: '2026-01-15',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'clever-hare-mountain-spring',
    title: 'The Clever Hare and the Mountain Spring',
    shortDescription:
      'During a hot season in the foothills of Mount Kilimanjaro, Sungura the hare must learn that everyone must help care for the freshwater stream.',
    country: 'Kenya & Tanzania',
    region: 'East Africa',
    culturalTradition: 'Coastal Swahili & Coastal Bantu Traditions',
    community: 'East African foothills and coastal trading settlements',
    languageOfOrigin: 'Kiswahili',
    storyType: 'ANIMAL_TRICKSTER',
    themes: ['Resourcefulness', 'Nature & Animals', 'Cooperation', 'Water Stewardship'],
    ageRange: '4-7',
    difficulty: 'EASY',
    estimatedReadingTime: 4,
    learningObjectives: [
      'Learn about the vital importance of fresh water in East African landscapes',
      'Understand why shared resources require everyone to contribute fairly',
      'Discover Swahili animal names and ecology'
    ],
    source: 'Swahili oral tales of Sungura (the trickster hare) recorded across East African coastal traditions',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Traditional East African folklore collected across Taita and coastal Swahili communities',
    originalStoryteller: 'Swahili community narrators and coastal elders',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Illustrated Retelling',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'Traditional stories can have many versions. This is one retelling. Sungura appears across Kenya, Tanzania, and Zanzibar. While Sungura often uses his wit to outsmart larger animals like Tembo (the elephant) and Simba (the lion), this variation emphasizes that living harmoniously requires pitching in during times of drought.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Scenic views of the acacia plains leading up towards the misty mountain highlands of East Africa',
      caption: 'The golden acacia slopes of East Africa under the clear morning sun.',
      artistOrCredit: 'Photo by Unsplash Nature Collection / AfroBox Visual Curations'
    },
    narrations: [
      {
        narrationId: 'narr-sungura-01',
        storyId: 'clever-hare-mountain-spring',
        narratorId: 'narrator-halima',
        narratorName: 'Halima Mwangi',
        voiceType: 'HUMAN_NARRATOR',
        language: 'English (East African Accent)',
        locale: 'en-KE',
        duration: 180,
        recordingMethod: 'Studio Microphone',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-02-10T09:00:00Z',
        approvedAt: '2026-02-12T11:00:00Z'
      },
      {
        narrationId: 'narr-sungura-02',
        storyId: 'clever-hare-mountain-spring',
        narratorId: 'narrator-juma',
        narratorName: 'Mwalimu Juma',
        voiceType: 'TEACHER',
        language: 'Kiswahili',
        locale: 'sw-TZ',
        duration: 195,
        recordingMethod: 'Classroom Microphone',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-03-01T15:00:00Z',
        approvedAt: '2026-03-03T10:00:00Z'
      }
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'The sun had shone warmly for many weeks across the green plains below the great mountain. The seasonal rains were late, and the small ponds were drying into golden dust. The animals held a baraza—a gathering—to solve the problem.',
        highlightWords: ['baraza']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'Simba the lion stood tall. "High on the rocky slope, there is cool water bubbling under the stones. If we all dig a channel together, the fresh spring water will flow down for everyone to drink."'
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'All the animals agreed enthusiastically—except Sungura, the little hare. Sungura reclined comfortably under the shade of a baobab tree, grooming his long ears. "My paws are too delicate for sharp stones," Sungura chuckled. "I will stay right here and compose a lovely song instead!"',
        highlightWords: ['Sungura']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Tembo the elephant used her strong tusks to lift boulders. Twiga the giraffe moved tall fallen logs. The warthogs used their snout shovels, and the little dik-diks carried away small pebbles. They worked until the late afternoon.'
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Suddenly, with a cheerful gurgle, crystal-clear water rushed down the new stone canal! It filled a sparkling pool right in the center of the valley. The animals drank thirstily and washed their dusty faces in celebration.'
      },
      {
        id: 'p6',
        paragraphNumber: 6,
        text: 'When night fell, Sungura tiptoed down to the pool with his gourd, thinking he could secretly drink the cold, sweet water without doing any work. But standing guard by the moonlight was Kasa the wise tortoise, who was slow of foot but sharp of watch.',
        highlightWords: ['Kasa']
      },
      {
        id: 'p7',
        paragraphNumber: 7,
        text: '"Jambo, Sungura," whispered Kasa softly. "The water tastes sweetest to those who cleared the channel. If you wish to drink with us tomorrow, bring your broom and help sweep the leaves from the canal."'
      },
      {
        id: 'p8',
        paragraphNumber: 8,
        text: 'Sungura felt his ears warm with embarrassment. He realized that living happily together means sharing both the work and the water. The next dawn, the very first animal at the spring with a woven palm broom was Sungura!'
      }
    ],
    vocabulary: [
      {
        word: 'Baraza',
        language: 'Kiswahili',
        phonetic: 'bah-rah-zah',
        definition: 'A council, public meeting, or gathering of community members to discuss plans.',
        culturalContext:
          'In East Africa, a baraza is an open community assembly where all voices are heard to solve shared challenges.'
      },
      {
        word: 'Sungura',
        language: 'Kiswahili',
        phonetic: 'soon-goo-rah',
        definition: 'The hare; known in folklore for quick wit and agility.',
        culturalContext:
          'Sungura stories are beloved throughout Kenya, Tanzania, Uganda, and the Swahili islands.'
      },
      {
        word: 'Kasa',
        language: 'Kiswahili',
        phonetic: 'kah-sah',
        definition: 'The sea turtle or land tortoise.',
        culturalContext:
          'In Swahili proverbs, the tortoise represents patience, steadfast duty, and quiet resilience.'
      }
    ],
    thinkAboutIt: {
      question: 'Why did Kasa the tortoise invite Sungura to sweep leaves instead of chasing him away?',
      prompt: 'Think about how giving someone a chance to help is better than being angry.',
      guidingPoints: [
        'Kasa did not fight Sungura; he invited him to contribute.',
        'When everyone contributes, nobody feels left out or resentful.',
        'Caring for water is something every creature must do together.'
      ],
      conversationStarterForParents:
        'Ask your child: "What is a chore in our home that feels much easier when we do it as a team?"'
    },
    relatedContent: [
      {
        id: 'sungura-think-01',
        step: 'THINK',
        title: 'Community Teamwork Challenge',
        learningArea: 'Riddles & Logic',
        description: 'Match the animals with how they helped bring water to the valley.',
        interactiveType: 'word_match',
        payload: {
          question: 'Which animal used patience and kindness to teach Sungura a lesson?',
          options: ['Simba the lion', 'Kasa the tortoise', 'Twiga the giraffe', 'Tembo the elephant'],
          correctIndex: 1,
          explanation: 'Kasa the tortoise showed that gentle words and an invitation to help can change a person’s mind.'
        }
      },
      {
        id: 'sungura-explore-02',
        step: 'EXPLORE',
        title: 'Where Water Comes From: Mount Kilimanjaro',
        learningArea: 'Science & Natural World',
        description: 'Explore the natural water tower of East Africa.',
        interactiveType: 'geography_card',
        payload: {
          mapLocation: {
            country: 'Kenya & Tanzania',
            region: 'East Africa',
            coordinatesName: 'Kilimanjaro Foothills & Tsavo Basin',
            ecosystem: 'Montane forest cloud catchment and dry savannah plains',
            fact: 'Misty cloud forests on high African mountains capture water directly from passing clouds and release it into clean streams.'
          },
          culturalDetails: [
            'Kiswahili is spoken by over 100 million people across East and Central Africa.',
            'Swahili coastal architecture incorporates natural coral stone channels that have directed rainfall for over 800 years.'
          ]
        }
      },
      {
        id: 'sungura-create-03',
        step: 'CREATE',
        title: 'Water Protector Badge',
        learningArea: 'Creative Writing & Art',
        description: 'Invent a slogan or poster showing one way you save water at your house or school.',
        interactiveType: 'creative_prompt',
        payload: {
          creativeTask:
            'Draw a water drop wearing a superhero cape! Write: "Every drop counts in our home."'
        }
      }
    ],
    characterNames: ['Sungura', 'Kasa', 'Simba', 'Tembo'],
    format: 'ILLUSTRATED',
    dateAdded: '2026-02-01',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'sun-moon-ocean-estuary',
    title: 'How the Sun and the Moon Visited the Ocean',
    shortDescription:
      'In the Cross River estuary, the generous Sun builds an enormous courtyard to welcome his friend the Water, only to discover how vast the ocean truly is.',
    country: 'Nigeria',
    region: 'West Africa',
    culturalTradition: 'Efik & Ibibio Traditions',
    community: 'Cross River basin, Calabar waterways & coastal mangroves',
    languageOfOrigin: 'Efik',
    storyType: 'MYTH_ORIGIN',
    themes: ['Origins & Astronomy', 'Friendship', 'Hospitality', 'Natural World'],
    ageRange: '4-8',
    difficulty: 'EASY',
    estimatedReadingTime: 5,
    learningObjectives: [
      'Discover an authentic origin myth explaining why the sun and moon dwell in the high sky',
      'Learn about the rich riverine and mangrove geography of southeastern Nigeria',
      'Understand the cultural value of unconditional hospitality and keeping promises'
    ],
    source: 'Documented Efik-Ibibio oral folklore collected in Calabar and the Cross River region',
    sourceType: 'Archival Folklore Adaptation',
    sourceAuthorOrCollector: 'Documented by Elphinstone Dayrell (1910, Folk Stories from Southern Nigeria); adapted for children',
    originalStoryteller: 'Efik and Ibibio community elders of Calabar',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Illustrated Retelling',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'Traditional stories can have many versions. This is one retelling. In the coastal traditions of southeastern Nigeria, the natural elements are depicted as neighbors who lived side-by-side on earth before taking their permanent places across the cosmos.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Shimmering tropical coastal waters meeting the open sky at golden sunset',
      caption: 'The vast, shimmering waters of the estuary meeting the evening horizon.',
      artistOrCredit: 'Photo by Unsplash Nature Archive / AfroBox Visual Curations'
    },
    narrations: [
      {
        narrationId: 'narr-sunmoon-01',
        storyId: 'sun-moon-ocean-estuary',
        narratorId: 'narrator-chidinma',
        narratorName: 'Chidinma Bassey',
        voiceType: 'PARENT',
        language: 'English (Nigerian Accent)',
        locale: 'en-NG',
        duration: 200,
        recordingMethod: 'Home Studio',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-02-18T16:00:00Z',
        approvedAt: '2026-02-20T12:00:00Z'
      }
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'Long ago, before they climbed up into the sky, the Sun and the Moon were married companions who lived in a great compound near the mangrove waters of Calabar in southeastern Nigeria.'
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'The Sun frequently visited his good friend the Water, spending cheerful afternoons chatting about the tides and the wind. But one evening, the Sun asked: "My friend, why do you never come to visit my house?"'
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'The Water smiled with gentle ripples and replied: "My people and I are too many. If I come, I bring with me all the silver fish, the swimming crabs, the sea turtles, and the giant waves. Your house would not be large enough."'
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: '"Do not worry!" answered the Sun warmly. "I will build the largest compound this country has ever seen!" The Sun and Moon gathered bamboo and sturdy palm rafters, building an expansive courtyard with high verandas.'
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'When the compound was ready, the Sun stood at the gates and called out welcomingly to the Water: "Come inside, dear friend, the feast is prepared!"'
      },
      {
        id: 'p6',
        paragraphNumber: 6,
        text: 'The Water began to flow in gently. First came the sparkling streams, lapping up to the doorsteps. "Is it still safe to enter?" asked the Water. "Yes, welcome!" said the generous Sun.'
      },
      {
        id: 'p7',
        paragraphNumber: 7,
        text: 'In flowed the playful schools of catfish, the sea anemones, and the surging river currents. Soon the water was waist-deep, then shoulder-deep! The Sun and Moon had to hop onto the carved roof rafters to keep dry.'
      },
      {
        id: 'p8',
        paragraphNumber: 8,
        text: 'Still the Water kept surging in with magnificent blue waves. To make room for their vast and beloved friend without ending the friendship, the Sun and the Moon leaped joyfully straight up into the sky! And there they decided to stay forever, shining down upon the water that they loved so dearly.'
      }
    ],
    vocabulary: [
      {
        word: 'Utin',
        language: 'Efik',
        phonetic: 'oo-teen',
        definition: 'The Sun in the Efik language.',
        culturalContext:
          'Represented as a radiant source of energy, warmth, and hospitality in southeastern Nigerian storytelling.'
      },
      {
        word: 'Ọfiọn̄',
        language: 'Efik',
        phonetic: 'oh-fee-on',
        definition: 'The Moon, and also the word for "month" in the Efik lunar calendar.',
        culturalContext:
          'Efik fishermen use the phases of Ọfiọn̄ to calculate the height of the tides in the Cross River delta.'
      },
      {
        word: 'Mangrove',
        language: 'English / Botany',
        phonetic: 'man-grohv',
        definition: 'Special coastal trees that grow with roots submerged in salty river water.',
        culturalContext:
          'The Niger Delta and Cross River mangrove forest is the largest mangrove ecosystem in Africa and the third largest in the world.'
      }
    ],
    thinkAboutIt: {
      question: 'How did the Sun show true hospitality even when things became crowded?',
      prompt: 'Notice how instead of getting angry with the Water, the Sun and Moon found a creative new space where everyone could fit.',
      guidingPoints: [
        'The Sun kept his promise to welcome his friend.',
        'Rather than fighting the ocean, the Sun found a higher perspective.',
        'True friends make room for who you really are.'
      ],
      conversationStarterForParents:
        'Ask your child: "How can we make new classmates or guests feel welcomed when they visit?"'
    },
    relatedContent: [
      {
        id: 'sunmoon-think-01',
        step: 'THINK',
        title: 'Story Sequence Detective',
        learningArea: 'Reading Comprehension',
        description: 'Remember the order of events in the story.',
        interactiveType: 'quiz',
        payload: {
          question: 'Where did the Sun and Moon climb when the water filled the courtyard?',
          options: [
            'Into an underground cave',
            'Up onto the roof rafters, and then into the sky',
            'Onto a wooden fishing boat',
            'Behind a large clay cooking stove'
          ],
          correctIndex: 1,
          explanation: 'They hopped onto the roof rafters first, and then leaped into the sky to give their friend plenty of room!'
        }
      },
      {
        id: 'sunmoon-explore-02',
        step: 'EXPLORE',
        title: 'The Mangroves of Cross River',
        learningArea: 'Geography & Ecology',
        description: 'Explore the winding riverways of Calabar in southeastern Nigeria.',
        interactiveType: 'geography_card',
        payload: {
          mapLocation: {
            country: 'Nigeria',
            region: 'West Africa',
            coordinatesName: 'Calabar & Cross River Estuary',
            ecosystem: 'Coastal Mangroves & Estuarine Wetlands',
            fact: 'Cross River is home to the rare Cross River gorilla and colorful kingfishers that dive into the brackish water.'
          },
          culturalDetails: [
            'The Efik people are renowned for their ancient Nsibidi written symbols, one of the oldest indigenous writing systems in West Africa.',
            'Calabar was historically one of the most significant coastal trading and cultural centers in the Bight of Biafra.'
          ]
        }
      },
      {
        id: 'sunmoon-create-03',
        step: 'CREATE',
        title: 'Draw the Sun and Moon House',
        learningArea: 'Creative Writing & Art',
        description: 'Draw a house that has room for both fish and bright sunlight!',
        interactiveType: 'creative_prompt',
        payload: {
          creativeTask:
            'Use yellow, orange, and deep ocean blues to draw the moment the sun rose into the sky above the waves.'
        }
      }
    ],
    characterNames: ['The Sun (Utin)', 'The Moon (Ọfiọn̄)', 'The Water'],
    format: 'READ_ALONG',
    dateAdded: '2026-02-15',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'guineafowl-star-seeds',
    title: 'The Guineafowl and the Morning Star',
    shortDescription:
      'In the granite kopjes of Zimbabwe, Hanga the spotted guineafowl awakens the sleeping birds and farmers to greet the first star of the planting season.',
    country: 'Zimbabwe',
    region: 'Southern Africa',
    culturalTradition: 'Shona Tradition',
    community: 'Granite kopjes and highveld plateau of Matobo & Masvingo',
    languageOfOrigin: 'ChiShona',
    storyType: 'LEGEND',
    themes: ['Stewardship', 'Nature & Animals', 'Courage', 'Cooperation'],
    ageRange: '7-10',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 6,
    learningObjectives: [
      'Learn how southern African farming traditions align with the stars and bird calls',
      'Discover Shona cultural names for wildlife and geographical landmarks',
      'Understand how attentiveness and teamwork help a whole community thrive'
    ],
    source: 'Documented Shona oral storytelling tradition (Ngano dzepasi chigare)',
    sourceType: 'Documented Oral Tradition',
    sourceAuthorOrCollector: 'Collected by Shona folklorists and educators; adapted for bilingual children',
    originalStoryteller: 'Traditional Shona elders and grandparents (Ambuya)',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Educational Retelling',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'Traditional stories can have many versions. This is one retelling. In Shona ngano (folktales), animal characteristics such as the polka-dot feathers of the guineafowl (hanga) are explained through stories of bravery and community stewardship.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      alt: 'Majestic balancing rock formations under a twilight sky dotted with bright stars in Zimbabwe',
      caption: 'The ancient granite balancing rocks of Matobo under a canopy of stars.',
      artistOrCredit: 'Photo by Unsplash Landscape Archive / AfroBox Visual Curations'
    },
    narrations: [
      {
        narrationId: 'narr-hanga-01',
        storyId: 'guineafowl-star-seeds',
        narratorId: 'narrator-tendai',
        narratorName: 'Tendai Mutasa',
        voiceType: 'COMMUNITY_STORYTELLER',
        language: 'English & ChiShona',
        locale: 'sn-ZW',
        duration: 230,
        recordingMethod: 'Acoustic Studio',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-03-10T11:00:00Z',
        approvedAt: '2026-03-12T14:00:00Z'
      }
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'Among the great balancing boulders of Zimbabwe, where the granite rocks rise like giant statues against the sky, the dry season was coming to an end. The soil was waiting for the early rains to plant millet and sorghum.'
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'In those days, Hanga the guineafowl had plain brown feathers like the dry savannah grass. But she had the sharpest ears and the most attentive eyes of all the birds in the high plateau.',
        highlightWords: ['Hanga']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Every dusk, Hanga perched atop the highest granite kopje. She looked upward toward the southern sky, watching for the silver rising of Nyamatsatse—the bright Morning Star—which signaled to the farmers that the time for plowing had arrived.',
        highlightWords: ['kopje', 'Nyamatsatse']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'One cool night, a dense blanket of low mountain fog covered the hills. None of the other birds could see through the mist, and the roosters remained fast asleep in the valleys.'
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Hanga did not give up. She beat her strong wings and climbed above the cold fog, flying higher and higher until her beak broke through the clouds. There, sparkling like a silver jewel in the violet dawn, was Nyamatsatse!'
      },
      {
        id: 'p6',
        paragraphNumber: 6,
        text: 'As Hanga flew close beneath the stars, tiny sparks of starlight fell like luminous seeds upon her wings. Each spark kissed her feathers, leaving behind a brilliant white dot. From tip to tail, her feathers were transformed into a constellation of white pearls against dark slate.'
      },
      {
        id: 'p7',
        paragraphNumber: 7,
        text: 'Hanga dove down through the fog, calling out with her famous rhythmic cry: "Kenge-kenge-kenge! Mukai! Mukai! Awaken! The star is in the sky!"',
        highlightWords: ['Mukai']
      },
      {
        id: 'p8',
        paragraphNumber: 8,
        text: 'Hearing her joyful call, the villagers gathered their wooden hoes, and the birds began their morning chorus. The fields were sown in time, and abundant green shoots arose with the first rain. Ever since, Hanga proudly wears the star-seeds on her feathers as a badge of honor.'
      }
    ],
    vocabulary: [
      {
        word: 'Hanga',
        language: 'ChiShona',
        phonetic: 'hahn-gah',
        definition: 'The helmeted guineafowl (Numida meleagris).',
        culturalContext:
          'Recognized for its distinctive polka-dotted plumage and noisy alarm calls that alert other creatures to movement.'
      },
      {
        word: 'Kopje',
        language: 'Southern African English / Shona (Dombo)',
        phonetic: 'kop-ee',
        definition: 'A small hill or isolated steep granite outcrop rising above the savannah plateau.',
        culturalContext:
          'Zimbabwe’s Matobo Hills kopjes have served as spiritual sanctuaries, art galleries of ancient rock paintings, and observation perches for thousands of years.'
      },
      {
        word: 'Nyamatsatse',
        language: 'ChiShona',
        phonetic: 'nyah-mah-tsah-tseh',
        definition: 'The Morning Star (planet Venus).',
        culturalContext:
          'In Shona indigenous astronomy, the appearance of Nyamatsatse heralds the dawn and the agricultural calendar.'
      },
      {
        word: 'Mukai',
        language: 'ChiShona',
        phonetic: 'moo-kye',
        definition: '"Awaken!" or "Rise up!"',
        culturalContext:
          'A customary morning greeting and call to start the day with vigor and purpose.'
      }
    ],
    thinkAboutIt: {
      question: 'What made Hanga’s flight through the fog so important for the village?',
      prompt: 'Notice that Hanga didn’t wait for someone else to act; she flew above the mist to see the truth.',
      guidingPoints: [
        'She was persistent even when the fog made it hard to see.',
        'Her call helped everyone wake up and plant seeds before the rain came.',
        'Being attentive to nature helps people live in harmony with the seasons.'
      ],
      conversationStarterForParents:
        'Ask your child: "What is a small sign in nature that tells you the weather or season is changing?"'
    },
    relatedContent: [
      {
        id: 'hanga-think-01',
        step: 'THINK',
        title: 'Constellation Knowledge Quiz',
        learningArea: 'Cultural Heritage',
        description: 'Test what you learned about Shona astronomy.',
        interactiveType: 'quiz',
        payload: {
          question: 'What does Nyamatsatse mean in Shona astronomy?',
          options: [
            'The Crescent Moon',
            'The Morning Star (Venus)',
            'The Sun during eclipse',
            'A shooting star'
          ],
          correctIndex: 1,
          explanation: 'Nyamatsatse is the ChiShona name for the brilliant Morning Star, which marks the early dawn.'
        }
      },
      {
        id: 'hanga-explore-02',
        step: 'EXPLORE',
        title: 'The Granite Wonders of Zimbabwe',
        learningArea: 'Geography & Ecology',
        description: 'Discover the geology and ancient rock art of the Matobo Hills.',
        interactiveType: 'geography_card',
        payload: {
          mapLocation: {
            country: 'Zimbabwe',
            region: 'Southern Africa',
            coordinatesName: 'Matobo National Park, Bulawayo',
            ecosystem: 'Granite Kopjes and Southern Miombo Woodlands',
            fact: 'Matobo has one of the highest concentrations of black eagles and ancient San rock art in the world.'
          },
          culturalDetails: [
            'Great Zimbabwe, built from dry-stone granite walls without mortar between the 11th and 15th centuries, was the capital of the historic Kingdom of Zimbabwe.',
            'The soapstone bird carved at Great Zimbabwe remains the national emblem of the country.'
          ]
        }
      },
      {
        id: 'hanga-create-03',
        step: 'CREATE',
        title: 'Star Pattern Guineafowl Art',
        learningArea: 'Creative Writing & Art',
        description: 'Create your own constellation animal pattern!',
        interactiveType: 'creative_prompt',
        payload: {
          creativeTask:
            'Use white dots or chalk on dark paper to draw an animal whose coat is covered in bright stars!'
        }
      }
    ],
    characterNames: ['Hanga', 'The Highveld Farmers'],
    format: 'READ_ALONG',
    dateAdded: '2026-03-01',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'amina-solar-lanterns-dakar',
    title: 'Amina and the City of Floating Solar Lanterns',
    shortDescription:
      'In contemporary Dakar, eight-year-old Amina teams up with her grandmother and coastal fishermen to craft floating solar lanterns that guide night boats safely home.',
    country: 'Senegal',
    region: 'West Africa',
    culturalTradition: 'Contemporary Senegalese Coastal Urban Life',
    community: 'Dakar peninsula, Ngor Island and Soumbédioune artisanal port',
    languageOfOrigin: 'Wolof & French',
    storyType: 'CONTEMPORARY',
    themes: ['Modern Africa', 'Science & Innovation', 'Family & Community', 'Coastlines & Oceans'],
    ageRange: '7-11',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 6,
    learningObjectives: [
      'Experience contemporary African innovation and clean solar energy in modern Senegal',
      'Learn Wolof words reflecting coastal life and family values (Teranga)',
      'Inspire children to combine science and traditional coastal knowledge'
    ],
    source: 'Original educational story written for AfroBox beta demonstration',
    sourceType: 'Contemporary Educational Narrative',
    sourceAuthorOrCollector: 'AfroBox Educational Studio Curators (Clearly marked DEMO)',
    originalStoryteller: 'Contemporary narrative',
    rightsStatus: 'CC_BY_SA',
    adaptationStatus: 'Original Demonstration Story',
    verificationStatus: 'DEMO_PLACEHOLDER',
    variantNotes:
      'Demonstration placeholder narrative clearly labelled DEMO. Written to demonstrate how Storylands showcases modern African urban and technological life alongside traditional folktales.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      alt: 'Bustling modern coastal harbor with colorful traditional pirogues under a radiant evening skyline',
      caption: 'The vibrant coastline of Dakar at dusk, where traditional wooden pirogues float under solar lamps.',
      artistOrCredit: 'Photo by Unsplash Urban Archive / AfroBox Visual Curations'
    },
    narrations: [
      {
        narrationId: 'narr-amina-01',
        storyId: 'amina-solar-lanterns-dakar',
        narratorId: 'narrator-fatou',
        narratorName: 'Fatou Diop',
        voiceType: 'HUMAN_NARRATOR',
        language: 'English & Wolof',
        locale: 'wo-SN',
        duration: 210,
        recordingMethod: 'Studio Microphone',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'CC_BY_SA',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-03-20T10:00:00Z',
        approvedAt: '2026-03-22T08:00:00Z'
      }
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'Every afternoon when the bell rang at school in Dakar, eight-year-old Amina rode the electric bus down to the bay of Soumbédioune. The air was filled with the scent of grilled ocean fish, roasted groundnuts, and the salty Atlantic spray.'
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'Along the beach, wooden pirogues painted in dazzling stripes of cobalt blue, sunshine yellow, and emerald green bobbed against the waves. Her grandmother, Mame Seynabou, was a master net weaver whose fingers moved like quick silver.',
        highlightWords: ['pirogues', 'Mame']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'In the makerspace classroom at school, Amina had been learning how tiny photovoltaic solar cells could turn the warm Senegalese sunshine into clean electric light. "Mame," Amina said, "when Uncle Babacar returns from night fishing in the dark, finding the inlet can be perilous without a light."'
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Mame Seynabou nodded wisely. "The sea has no signposts, little one. We have always guided them with fires on the rocks, but high waves can douse the flames."'
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Amina opened her backpack. Inside were small solar panels recycled from eco-lanterns, buoyant dried calabash gourds from the market, and waterproof seals made from local gum acacia. "What if we build floating lanterns that drink sunlight all day and glow all night?"'
      },
      {
        id: 'p6',
        paragraphNumber: 6,
        text: 'Working together under the seaside veranda, Mame carved graceful star and wave patterns into the hollow gourds, while Amina wired the solar chips and soft amber LEDs inside. They anchored the gourds to woven hemp ropes.'
      },
      {
        id: 'p7',
        paragraphNumber: 7,
        text: 'When the violet night fell over Dakar, the lanterns flickered on automatically! They bobbed along the harbor canal like a runway of warm floating stars, illuminating the path between the rocky headlands.'
      },
      {
        id: 'p8',
        paragraphNumber: 8,
        text: 'Uncle Babacar’s pirogue glided smoothly through the glowing lane into the calm sandy harbor. The fishermen cheered and held up their fresh catch. That night, the whole community gathered with glasses of mint tea, celebrating teranga—the spirit of generosity and mutual care.',
        highlightWords: ['teranga']
      }
    ],
    vocabulary: [
      {
        word: 'Teranga',
        language: 'Wolof',
        phonetic: 'teh-rahn-gah',
        definition: 'Hospitality, mutual respect, and community generosity; the defining value of Senegalese culture.',
        culturalContext:
          'Senegal is widely celebrated across Africa as the "Land of Teranga", where sharing food, warmth, and assistance with neighbors and travelers is sacred.'
      },
      {
        word: 'Pirogue',
        language: 'French / Wolof (Gaal)',
        phonetic: 'pee-rohg',
        definition: 'A long, slender handcrafted wooden fishing boat painted with vibrant protective colors.',
        culturalContext:
          'The word "Senegal" is often believed to derive from the Wolof phrase "Sunu Gaal", meaning "Our Boat", symbolizing all people sailing forward together.'
      },
      {
        word: 'Mame',
        language: 'Wolof',
        phonetic: 'mahm',
        definition: 'Grandmother or elder woman of honor.',
        culturalContext:
          'Elders in West African households are respected keepers of family history, traditional sciences, and oral culture.'
      }
    ],
    thinkAboutIt: {
      question: 'How did Amina blend new technology with her grandmother’s traditional knowledge?',
      prompt: 'Notice that neither technology alone nor tradition alone was enough—they made something wonderful by collaborating.',
      guidingPoints: [
        'Amina understood solar circuits from school.',
        'Her grandmother knew how the sea moved and how to carve the calabash gourds.',
        'Together, they solved a real challenge facing their community.'
      ],
      conversationStarterForParents:
        'Ask your child: "What is an invention you would like to design to help people in your town?"'
    },
    relatedContent: [
      {
        id: 'amina-think-01',
        step: 'THINK',
        title: 'Clean Energy & Ocean Innovation',
        learningArea: 'Science & Natural World',
        description: 'Learn how solar cells capture sunlight energy.',
        interactiveType: 'quiz',
        payload: {
          question: 'What powered the floating lanterns that Amina and her grandmother built?',
          options: [
            'Disposable batteries that rust in seawater',
            'Photovoltaic solar cells that store sunshine during the day',
            'Kerosene oil lamps',
            'Wind turbines on the boat'
          ],
          correctIndex: 1,
          explanation: 'Photovoltaic cells absorb energy from the abundant tropical sunshine and release clean light all night.'
        }
      },
      {
        id: 'amina-explore-02',
        step: 'EXPLORE',
        title: 'Dakar: Capital of West African Art & Tech',
        learningArea: 'Geography & Ecology',
        description: 'Explore the westernmost city of continental Africa.',
        interactiveType: 'geography_card',
        payload: {
          mapLocation: {
            country: 'Senegal',
            region: 'West Africa',
            coordinatesName: 'Dakar & Cape Verde Peninsula',
            ecosystem: 'Atlantic Coastal Headland and Sahelian Marine Zone',
            fact: 'Dakar is the westernmost point of the African continent and a thriving hub of contemporary art, music, and digital technology.'
          },
          culturalDetails: [
            'The Dakar Biennale (Dak\'Art) is one of the most prestigious contemporary African art festivals in the world.',
            'Ngor Island, just off the coast, is a car-free island celebrated for surf culture, solar power, and artist studios.'
          ]
        }
      },
      {
        id: 'amina-create-03',
        step: 'CREATE',
        title: 'Paint Your Own Colorful Pirogue',
        learningArea: 'Creative Writing & Art',
        description: 'Design the hull pattern for your own solar boat!',
        interactiveType: 'creative_prompt',
        payload: {
          creativeTask:
            'Choose three bright colors: one for courage, one for the ocean, and one for the bright sun. Name your boat something uplifting!'
        }
      }
    ],
    characterNames: ['Amina', 'Mame Seynabou', 'Uncle Babacar'],
    format: 'ILLUSTRATED',
    dateAdded: '2026-03-25',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'oduduwa-ile-ife-origin',
    title: 'Oduduwa and the Golden Chain of Ile-Ife',
    shortDescription:
      'The sacred Yoruba origin legend: how Oduduwa descended on a golden chain with a sacred rooster to create dry earth from the primordial waters at Ile-Ife.',
    country: 'Nigeria & Benin',
    region: 'West Africa',
    culturalTradition: 'Yoruba Oral Tradition & Ile-Ife Cradle',
    community: 'Yoruba ancestral kingdom of Ile-Ife',
    languageOfOrigin: 'Yorùbá',
    storyType: 'MYTH_ORIGIN',
    themes: ['Origins & Creation', 'Courage', 'Leadership', 'Reverence for Land'],
    ageRange: '6-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 6,
    learningObjectives: [
      'Discover the primordial Yoruba creation story of Ile-Ife',
      'Understand the cultural significance of the sixteen crowns of Yoruba civilization',
      'Learn key Yoruba words: Olodumare, Ile-Ife, and Alafia'
    ],
    source: 'Documented Yoruba historical chronicles and Ifa oral corpus',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Traditional Yoruba griots (Akigbe) and Ife palace historians',
    originalStoryteller: 'Palace elders of Ile-Ife',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Educational Cultural Narrative',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'In Yoruba oral traditions, both Obatala and Oduduwa play central roles in the creation of the terrestrial realm, culminating in the founding of Ile-Ife as the sacred spiritual heartland.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Lush tropical landscape of Ile-Ife at morning dawn',
      caption: 'The fertile landscape of Ile-Ife, where earth expanded across the primeval waters.',
      artistOrCredit: 'Photo by Unsplash African Collection / AfroBox Visual Curations'
    },
    narrations: [
      {
        narrationId: 'narr-oduduwa-01',
        storyId: 'oduduwa-ile-ife-origin',
        narratorId: 'narrator-adebayo',
        narratorName: 'Adebayo Ogunlesi',
        voiceType: 'COMMUNITY_STORYTELLER',
        language: 'English (Yoruba Accent)',
        locale: 'en-NG',
        duration: 250,
        recordingMethod: 'Studio Microphone',
        consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
        rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
        publicationStatus: 'PUBLISHED',
        createdAt: '2026-04-10T10:00:00Z',
        approvedAt: '2026-04-12T12:00:00Z'
      }
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'In the earliest days before mountains or valleys existed, the world below was nothing but endless, shimmering water and cloudy mist. High above in the heavens, the Supreme Architect Olodumare looked down and decided that there should be dry land, bustling villages, lush farms, and thriving kingdoms.',
        highlightWords: ['Olodumare']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'Olodumare summoned Obatala, the sculptor of humankind, and gave him the sacred tools of creation: a long golden chain to descend from the celestial realm, a snail shell filled with magical earth, a five-toed sacred rooster, and a palm nut.',
        highlightWords: ['Obatala']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'As Obatala prepared to descend, he grew tired, and his brother Oduduwa stepped forward with courage and resolve. Taking the golden chain, Oduduwa lowered it down from the sky until it hovered just above the boundless waters.',
        highlightWords: ['Oduduwa']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Stepping onto the bottom link of the golden chain, Oduduwa tipped the snail shell. A mound of rich black soil fell into the water. Immediately, the five-toed rooster leaped down and began scratching and scattering the soil in every direction.'
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Everywhere the rooster scratched, dry land formed! Hills rose up, grassy plains spread across the horizon, and fertile forests sprang into life. Oduduwa planted the palm nut, and it sprouted into a majestic tree with sixteen branches, representing the sixteen original crowns of Yoruba civilization.'
      },
      {
        id: 'p6',
        paragraphNumber: 6,
        text: 'Oduduwa stepped down onto the fresh earth and named the sacred place "Ile-Ife"—meaning "The House of Expansion." He became the first Ooni of Ife, and all Yoruba people trace their spiritual ancestry back to this sacred cradle where the sky met the earth.',
        highlightWords: ['Ile-Ife']
      }
    ],
    vocabulary: [
      {
        word: 'Olodumare',
        language: 'Yorùbá',
        phonetic: 'Oh-loh-doo-mah-reh',
        definition: 'The Supreme Creator and Architect of all existence in Yoruba belief.'
      },
      {
        word: 'Ile-Ife',
        language: 'Yorùbá',
        phonetic: 'Ee-leh Ee-feh',
        definition: 'The ancient holy city in southwestern Nigeria revered as the cradle of Yoruba civilization.'
      },
      {
        word: 'Ooni',
        language: 'Yorùbá',
        phonetic: 'Oh-nee',
        definition: 'The traditional royal title of the supreme sovereign and spiritual king of Ile-Ife.'
      }
    ],
    thinkAboutIt: {
      question: 'Why did the five-toed rooster play such an important role in creating the earth?',
      prompt: 'Reflect on how small, steady actions can create an entire world of opportunity.',
      guidingPoints: [
        'The rooster did not hesitate—he immediately began scratching the soil to make room for life.',
        'Creation required both celestial guidance (Olodumare) and hardworking hands on earth.'
      ],
      conversationStarterForParents: 'Ask your child: What is something you can build step by step through daily effort?'
    },
    relatedContent: [
      {
        id: 'oduduwa-explore-01',
        step: 'EXPLORE',
        title: 'Ile-Ife: City of Bronzes & Antiquity',
        learningArea: 'Cultural Heritage',
        description: 'Discover the world-famous bronze and terracotta sculptures of ancient Ife.',
        interactiveType: 'geography_card',
        payload: {
          mapLocation: {
            country: 'Nigeria',
            region: 'West Africa',
            coordinatesName: 'Ile-Ife, Osun State',
            ecosystem: 'Tropical Rainforest and Agricultural Belt',
            fact: 'Ile-Ife was a global center of bronze casting and glass beadmaking as early as the 11th century CE.'
          }
        }
      }
    ],
    characterNames: ['Olodumare', 'Oduduwa', 'Obatala'],
    format: 'READ_ALONG',
    dateAdded: '2026-04-15',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'gikuyu-mumbi-mount-kenya',
    title: 'Gikuyu, Mumbi, and the Sacred Fig Tree of Kirinyaga',
    shortDescription:
      'The Kikuyu origin story: how Ngai the creator gave the fertile green ridges of Mount Kenya to Gikuyu and Mumbi, from whom the nine original clans descended.',
    country: 'Kenya',
    region: 'East Africa',
    culturalTradition: 'Agĩkũyũ Ancestral Tradition',
    community: 'Central highlands surrounding Mount Kenya',
    languageOfOrigin: 'Gĩkũyũ',
    storyType: 'MYTH_ORIGIN',
    themes: ['Origins & Ancestry', 'Ecology & Sacred Trees', 'Family Clans', 'Gratitude'],
    ageRange: '6-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 5,
    learningObjectives: [
      'Learn about Kirinyaga (Mount Kenya) as a sacred landmark',
      'Understand the matrilineal origin of the nine Kikuyu clans',
      'Appreciate why wild fig trees (Mugumo) are protected in East Africa'
    ],
    source: 'Documented by Jomo Kenyatta (Facing Mount Kenya, 1938) and Kikuyu council of elders',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Kikuyu oral historians and cultural custodians',
    originalStoryteller: 'Kiama elders of Mukurwe wa Nyagathanga',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Cultural Narrative',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'In Kikuyu tradition, Gikuyu and Mumbi had nine daughters, though tradition refers to them as "full nine" (kenda muiyuru) to ward off counting taboos.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      alt: 'Snow-capped ridges of Mount Kenya rising above misty green forest canopy',
      caption: 'Kirinyaga (Mount Kenya), the sacred mountain where Ngai entrusted the land to Gikuyu and Mumbi.',
      artistOrCredit: 'Photo by Unsplash Nature Archive / AfroBox Visual Curations'
    },
    narrations: [],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'High above the equator rises Kirinyaga—"The Mountain of Brightness" (Mount Kenya)—whose glaciated white peaks pierce the clouds. The Kikuyu people revere this mountain as the dwelling throne of Ngai, the Supreme Creator of all life.',
        highlightWords: ['Kirinyaga', 'Ngai']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'In ancient times, Ngai brought the first man, Gikuyu, to the summit of the mountain. Ngai pointed out across the magnificent landscape of forested valleys, cascading crystal streams, and fertile volcanic soil, saying: "This land is for you and your children forever."',
        highlightWords: ['Gikuyu']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Ngai instructed Gikuyu to build his homestead at Mukurwe wa Nyagathanga, a tranquil ridge surrounded by wild fig trees (Mugumo). There, Ngai provided him with a companion named Mumbi, whose name means "She Who Creates / The Potter."',
        highlightWords: ['Mumbi', 'Mugumo']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Together, Gikuyu and Mumbi lived in peace and harmony with nature. In time, they were blessed with nine beautiful daughters: Wanjiku, Wambui, Wangari, Wanjiru, Wangui, Waithera, Wairimu, Nyambura, and Muthoni.',
        highlightWords: ['Wanjiku']
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'When the daughters came of age, Gikuyu prayed beneath the sacred Mugumo tree for noble companions for them. Ngai answered his prayers with nine worthy suitors, and together they founded the nine sacred clans (Mĩhĩrĩga) of the Agĩkũyũ nation.'
      }
    ],
    vocabulary: [
      {
        word: 'Ngai',
        language: 'Gĩkũyũ / Maa',
        phonetic: 'En-guy',
        definition: 'The Supreme Creator dwelling on the heights of Mount Kenya.'
      },
      {
        word: 'Mugumo',
        language: 'Gĩkũyũ',
        phonetic: 'Moo-goo-moh',
        definition: 'The sacred wild fig tree used for communal peace prayers and assemblies.'
      },
      {
        word: 'Kirinyaga',
        language: 'Gĩkũyũ',
        phonetic: 'Kee-ree-nyah-gah',
        definition: 'Mount Kenya; literally meaning "The Mountain of Brightness and Ostriches."'
      }
    ],
    thinkAboutIt: {
      question: 'Why are wild fig trees (Mugumo) respected as sacred sanctuaries?',
      prompt: 'Consider how big trees bring rain, give shade, and shelter birds and springs.',
      guidingPoints: [
        'Mugumo trees have deep roots that preserve groundwater and prevent soil erosion.',
        'They served as gathering places for peace talks rather than conflict.'
      ],
      conversationStarterForParents: 'Ask your child: What is the most magnificent tree in your neighborhood, and how does it help nature?'
    },
    relatedContent: [],
    characterNames: ['Gikuyu', 'Mumbi', 'Ngai', 'Wanjiku'],
    format: 'READ_ALONG',
    dateAdded: '2026-04-18',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'unkulunkulu-zulu-reed',
    title: 'Unkulunkulu and the Great Reed Marsh',
    shortDescription:
      'The Zulu genesis story: how the First Ancestor Unkulunkulu emerged from the sacred reed bed of Uhlanga, teaching humanity Ubuntu, cattle care, and the fire of wisdom.',
    country: 'South Africa',
    region: 'Southern Africa',
    culturalTradition: 'amaZulu Oral Tradition',
    community: 'KwaZulu-Natal river valleys and coastal grasslands',
    languageOfOrigin: 'isiZulu',
    storyType: 'MYTH_ORIGIN',
    themes: ['Ubuntu', 'Origins of Life', 'Cattle & Wisdom', 'Respect for Elders'],
    ageRange: '6-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 5,
    learningObjectives: [
      'Learn about the Zulu origin marsh of Uhlanga',
      'Understand the philosophy of Ubuntu ("I am because we are")',
      'Discover the cultural role of Nguni cattle in Zulu heritage'
    ],
    source: 'Documented by Henry Callaway (The Religious System of the Amazulu, 1870) and Zulu oral elders',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Zulu oral custodians and praise singers (Izimbongi)',
    originalStoryteller: 'Traditional Zulu village elders',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Cultural Narrative',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'In Zulu cosmology, Unkulunkulu is the First Ancestor who organized human society and taught agriculture, language, and community solidarity.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Rolling green valleys and wetland reeds of KwaZulu-Natal',
      caption: 'The rolling green hills and mist-covered river valleys of KwaZulu-Natal.',
      artistOrCredit: 'Photo by Unsplash Nature Collection / AfroBox Visual Curations'
    },
    narrations: [],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'In the Zulu memory of creation, life began not in stone or sand, but in a vast, lush wetland where tall green reeds swayed gently in the morning breeze. This sacred swamp was known as Uhlanga—the source of life.',
        highlightWords: ['Uhlanga']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'As the sun warmed the waters, the largest reed split open, and out stepped Unkulunkulu, "The Great Ancestor" and the First Teacher of humanity. With him emerged the first men and women, stepping into the golden sunlight.',
        highlightWords: ['Unkulunkulu']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Unkulunkulu called forth the black-and-white Nguni cattle from the mist, teaching people how to care for them with respect, for cattle represent family harmony and communal prosperity.',
        highlightWords: ['Nguni']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Unkulunkulu rubbed dry twigs together to bring forth fire, taught the builders how to weave the aerodynamic beehive grass huts (indlu), and taught the elders the sacred law of Ubuntu: "Umuntu ngumuntu ngabantu"—a person is a person through other persons.',
        highlightWords: ['Ubuntu', 'Indlu']
      }
    ],
    vocabulary: [
      {
        word: 'Ubuntu',
        language: 'isiZulu / isiXhosa',
        phonetic: 'Oo-boon-too',
        definition: 'The philosophy that a person is a person through other persons; collective compassion.'
      },
      {
        word: 'Uhlanga',
        language: 'isiZulu',
        phonetic: 'Oo-shlahn-gah',
        definition: 'The primordial reed bed from which the first human beings emerged.'
      }
    ],
    thinkAboutIt: {
      question: 'What does "a person is a person through other persons" mean in your school and family?',
      prompt: 'Think of a time when someone helped you feel included, safe, or appreciated.',
      guidingPoints: [
        'We grow stronger when we cooperate rather than compete alone.',
        'Kindness is the true measure of a person\'s character.'
      ],
      conversationStarterForParents: 'Ask your child: How can we show Ubuntu to a new classmate or neighbor today?'
    },
    relatedContent: [],
    characterNames: ['Unkulunkulu'],
    format: 'READ_ALONG',
    dateAdded: '2026-04-20',
    publicationStatus: 'PUBLISHED'
  },
  {
    id: 'golden-stool-ashanti-anokye',
    title: 'Okomfo Anokye and the Golden Stool',
    shortDescription:
      'The legendary Ashanti history: how high priest Okomfo Anokye summoned the solid gold Sika Dwa Kofi from the skies in Kumasi to unite all Asante states into an invincible empire.',
    country: 'Ghana',
    region: 'West Africa',
    culturalTradition: 'Asante Kingdom Heritage',
    community: 'Kumasi and the Ashanti forest confederacy',
    languageOfOrigin: 'Asante Twi',
    storyType: 'LEGEND',
    themes: ['Unity & Freedom', 'Sacred Regalia', 'Courage in Community', 'Leadership'],
    ageRange: '7-12',
    difficulty: 'MEDIUM',
    estimatedReadingTime: 6,
    learningObjectives: [
      'Learn how the Asante Empire was unified by King Osei Tutu I and Okomfo Anokye',
      'Understand why the Golden Stool represents the soul (Sunsum) of the entire nation',
      'Explore Asante court regalia, drums, and Adinkra symbols'
    ],
    source: 'Documented Asante oral history recorded by R.S. Rattray and Manhyia Palace archives',
    sourceType: 'Oral Tradition Adaptation',
    sourceAuthorOrCollector: 'Kumasi palace linguists (Akyeame) and cultural custodians',
    originalStoryteller: 'Asantehene court historians',
    rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
    adaptationStatus: 'Child-Friendly Educational Chronicle',
    verificationStatus: 'VERIFIED',
    variantNotes:
      'The Golden Stool (Sika Dwa Kofi) remains the most sacred symbol of the Ashanti people, preserved with immense veneration in Kumasi.',
    illustration: {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
      alt: 'Lush tropical forest canopy of Kumasi in the Ashanti region of Ghana',
      caption: 'The sacred forest canopy of Kumasi, where the Golden Stool descended from the heavens.',
      artistOrCredit: 'Photo by Unsplash Nature Archive / AfroBox Visual Curations'
    },
    narrations: [],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'In the late 17th century, the independent Akan chiefdoms of the Ghana forest were divided. In Kumasi, King Osei Tutu I and his brilliant high priest, Okomfo Anokye, envisioned a united Asante nation bound together forever by an unbreakable spiritual soul.',
        highlightWords: ['Osei Tutu', 'Okomfo Anokye']
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'Okomfo Anokye invited all the paramount chiefs, queen mothers, and warriors to a grand assembly under the shade of a sacred Kum tree in Kumasi. Drums called fontomfrom echoed through the forest.',
        highlightWords: ['fontomfrom']
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'As Okomfo Anokye chanted ancient invocations to Nyame (the Sky God), the midday sky suddenly darkened. Thunder roared like a celestial lion, lightning danced without rain, and a mysterious golden cloud descended gently over the assembly.',
        highlightWords: ['Nyame']
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'From the center of the cloud, resting upon the laps of Osei Tutu I, landed a radiant stool made of pure, solid gold, decorated with golden bells: the Sika Dwa Kofi (The Golden Stool born on Friday).',
        highlightWords: ['Sika Dwa Kofi']
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Okomfo Anokye announced to the breathless crowd: "This stool does not belong to any single mortal king. It contains the Sunsum—the soul, identity, strength, and collective destiny—of every Asante person who has lived, is living, or will ever be born."',
        highlightWords: ['Sunsum']
      }
    ],
    vocabulary: [
      {
        word: 'Sika Dwa Kofi',
        language: 'Asante Twi',
        phonetic: 'See-kah Dwah Koh-fee',
        definition: 'The Golden Stool of the Ashanti nation, literally "The Golden Stool born on Friday."'
      },
      {
        word: 'Sunsum',
        language: 'Asante Twi',
        phonetic: 'Soon-soom',
        definition: 'The spiritual soul, collective energy, and personality of a person or nation.'
      }
    ],
    thinkAboutIt: {
      question: 'Why did Okomfo Anokye say that no mortal person may ever sit on the Golden Stool?',
      prompt: 'Reflect on symbols that belong to everybody rather than one powerful individual.',
      guidingPoints: [
        'The stool represents the collective spirit and future generations, not any single king.',
        'True national strength comes from shared identity and mutual respect.'
      ],
      conversationStarterForParents: 'Ask your child: What family heirloom or shared tradition brings your family together?'
    },
    relatedContent: [],
    characterNames: ['Okomfo Anokye', 'King Osei Tutu I'],
    format: 'READ_ALONG',
    dateAdded: '2026-04-22',
    publicationStatus: 'PUBLISHED'
  }
];
