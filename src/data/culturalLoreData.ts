import {
  OriginLegend,
  DeityEntity,
  SacredNameEntity,
  CommonWordEntity,
  TraditionalHomeEntity
} from '../types/culturalLore';

export const ORIGIN_LEGENDS: OriginLegend[] = [
  // ==========================================
  // UGANDAN SPOTLIGHT (Chewzi, Ganda, Lango, Gisu)
  // ==========================================
  {
    id: 'chewzi-kitara-crater-lakes',
    tribe: 'Chewzi / Bachwezi',
    country: 'Uganda',
    region: 'East Africa',
    era: 'Empire of Kitara (Mystical Golden Age)',
    title: 'The Mystical Bachwezi and the Sacred Crater Lakes of Kitara',
    subtitle: 'The Demigod Kings and the Disappearance into Emerald Waters',
    founderOrHero: 'King Wamara & King Ndahiro',
    sacredSite: 'Lake Wamala, Bigo bya Mugenyi & Kasenda Crater Lakes (Fort Portal)',
    synopsis:
      'The legendary demigod kings of ancient Kitara ruled with extraordinary wisdom, magnificent long-horned Ankole cattle, and iron technology, before mysteriously vanishing into the emerald volcanic crater lakes of Western Uganda.',
    fullStoryParagraphs: [
      'Centuries ago across the rolling green highlands of Western Uganda stretched the vast Empire of Kitara. The kingdom was ruled by the Bachwezi—a dynasty of semi-divine kings, architects, and healers whose tall, noble presence was revered from the foothills of the Rwenzori Mountains to the shores of Lake Victoria.',
      'The Bachwezi introduced master iron-smelting, royal barkcloth craft, sacred coffee bean pacts of brotherhood, and bred the majestic, pearlescent long-horned Enyambo cattle (Ankole cows) whose lyrical horns arched gracefully toward the sky.',
      'Their great capital stood at Bigo bya Mugenyi, where immense circular ditches and earthwork ramparts were carved out of stone and clay to safeguard their cattle kraals. King Wamara and King Ndahiro were celebrated for dispensing justice with profound equanimity and knowledge of the stars.',
      'When their golden reign reached its prophesied conclusion, the Bachwezi did not succumb to mortal death. Surrounded by misty winds and ancestral flute melodies, the royal court walked serenely into the mirror-like waters of Lake Wamala, Lake Albert, and the Kasenda crater lakes near Fort Portal, submerging into the spiritual realm.',
      'To this day, the spirits of the Bachwezi (the Embandwa) are honored across Uganda as guardians of water springs, fertility, cattle prosperity, and natural harmony. Traditional healers and visitors to Fort Portal still gaze across the deep turquoise crater lakes, sensing the peaceful presence of the ancient kings.'
    ],
    deitiesInvolved: ['Wamara (King of the Spirit Realm)', 'Ndahiro', 'Mugenyi'],
    culturalValues: ['Reverence for Ankole Cattle', 'Master Craftsmanship (Iron & Barkcloth)', 'Harmony with Water Sanctuaries', 'Spiritual Continuity'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The emerald Kasenda volcanic crater lakes in Western Uganda, sacred sanctuary of the Bachwezi kings.',
    audioVoiceGuidance: 'The Bachwezi Ugandan origin story of the mystical kings and the crater lakes of Kitara.'
  },
  {
    id: 'ganda-kintu-nambi-genesis',
    tribe: 'Baganda (Ganda)',
    country: 'Uganda',
    region: 'East Africa',
    era: 'Genesis of the Buganda Kingdom',
    title: 'Kintu, Nambi, and the Genesis of the Buganda Kingdom',
    subtitle: 'The First Man on Earth, the Sky Maiden, and the 52 Clans',
    founderOrHero: 'Kintu & Nambi',
    sacredSite: 'Naggalabi Buddo, Lake Victoria (Nnalubaale) & Kasubi',
    synopsis:
      'Kintu, the solitary first human living on the lush green hills of central Uganda with only his single beloved cow, won the love of celestial maiden Nambi, survived the tests of Sky King Ggulu, and founded the 52 clans of Buganda.',
    fullStoryParagraphs: [
      'In the beginning of Uganda\'s earliest memories, the first man on earth was Kintu. He lived alone on the fertile hills surrounded by wild banana plants, accompanied only by his single beloved cow that provided him with fresh milk, quiet companionship, and warmth.',
      'From the heavens above, Nambi, the beautiful daughter of the Sky King Ggulu, gazed down upon the lush green landscape of Uganda. Touched by Kintu’s gentle humility and devotion to his cow, Nambi descended to earth and pledged her heart to him.',
      'To prove his worthiness to marry Nambi, Sky King Ggulu subjected Kintu to incredible tests: Ggulu locked Kintu inside an immense palace chamber and served a banquet fit for a thousand warriors, tested his honesty, and then hid his single cow among a herd of ten thousand golden heifers.',
      'With the miraculous guidance of a friendly buzzing hornet (Lwanyi), Kintu effortlessly identified his own cow by tapping its horn. Ggulu joyfully blessed the union and gifted Kintu and Nambi cattle, goats, chickens, millet seeds, and the sacred plantain shoots of Matooke to plant on earth.',
      'Ggulu gave them one stern warning: "Hurry down to earth before your troublesome brother Walumbe (Disease and Death) awakens!" Although Walumbe followed them when Nambi returned for chicken feed, Kintu and Nambi raised children who founded the 52 venerable clans of the Buganda Kingdom, thriving along the shores of Lake Victoria (Nnalubaale) in peace and unity.'
    ],
    deitiesInvolved: ['Katonda (Supreme Creator)', 'Ggulu (Sky Lord)', 'Mukasa (Lord of Lake Victoria)'],
    culturalValues: ['Humility over Arrogance', 'Reverence for Matooke and Agriculture', 'Clan Solidarity (52 Clans)', 'Love and Perseverance'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The morning mist rising over the lush islands and shoreline of Lake Victoria (Nnalubaale) in Uganda.',
    audioVoiceGuidance: 'The Buganda origin story of Kintu, Nambi, and the creation of the 52 clans.'
  },
  {
    id: 'lango-olum-sacred-hunt',
    tribe: 'Lango',
    country: 'Uganda',
    region: 'East Africa',
    era: 'The Great Migration to Lake Kyoga & Northern Plains',
    title: 'Olum, the Sacred Spear, and the Spirit of Dwar',
    subtitle: 'The Communal Hunt and the Rainmaker of Lake Kyoga',
    founderOrHero: 'Olum the Rainmaker & Clan Elders',
    sacredSite: 'Lake Kyoga, Otuke Hills & Lake Kwania',
    synopsis:
      'The legendary Lango hero Olum united the clans during a great drought, using the sacred iron spear and the communal hunting circle (Dwar) to discover hidden mountain springs and establish the law of shared food.',
    fullStoryParagraphs: [
      'The Lango people migrated from the northern savannahs, settling the rich grasslands and papyrus wetlands between Lake Kyoga and Lake Kwania. Renowned for their tactical brilliance, independent spirit, and community solidarity, the Lango were led by Olum, a legendary patriarch and rainmaker.',
      'During an unprecedented dry season, the streams dried to cracked mud, and the antelopes fled into distant thickets. Elders feared the children would starve. Olum took the ancestral iron spear (Tong), forged by the master blacksmiths of Otuke Hills, and climbed the sacred boulder.',
      'Instead of allowing each hunter to scramble selfishly, Olum sounded the curved kudu horn to call Dwar Arum—the great communal hunt. Hundreds of hunters moved in a synchronized, protective circular formation, working together with discipline and mutual trust.',
      'As they marched, a solitary Crested Crane (Walyer)—the national bird of Uganda—called out and flew toward a rocky grove of wild sycamore figs. Olum followed the crane’s flight and struck his iron spear into the fissures of the granite rock.',
      'A torrential freshwater spring bubbled forth from the stone, filling the streams and restoring the fishing waters of Lake Kyoga. Olum decreed the sacred law of Awany: every piece of food harvested in the hunt must be shared equally among the elderly, widows, and infants first, cementing the Lango tradition of communal generosity.'
    ],
    deitiesInvolved: ['Atida (Goddess of the Hunt & Rain)', 'Jok (Universal Divine Energy)'],
    culturalValues: ['Awany (Equal Communal Sharing)', 'Dwar (Cooperative Hunting)', 'Protection of the Crested Crane', 'Reverence for Fresh Waters'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The sweeping savannah wetlands and golden sunrise over Lake Kyoga in Northern Uganda.',
    audioVoiceGuidance: 'The Lango origin legend of Olum, the sacred spear, and the cooperative hunt.'
  },
  {
    id: 'gisu-masaba-mundu-sera',
    tribe: 'Bamasaba / Bagisu (Gisu)',
    country: 'Uganda',
    region: 'East Africa',
    era: 'Ancestral Awakening on Mount Elgon (Masaba)',
    title: 'Mundu, Sera, and the Sacred Spirit of Mount Masaba',
    subtitle: 'The Mountain Genesis and the Valor of Imbalu',
    founderOrHero: 'Mundu, Sera & Patriarch Masaba',
    sacredSite: 'Mount Masaba (Mount Elgon), Sipi Falls & Wanale Ridge',
    synopsis:
      'From the misty volcanic caves of Mount Elgon emerged the first ancestors Mundu and Sera. Generations later, their descendant Masaba proved his fearless valor in the sacred Imbalu initiation, founding the Bagisu nation.',
    fullStoryParagraphs: [
      'Soaring above Eastern Uganda stands Mount Masaba (Mount Elgon)—an ancient extinct volcano with the world’s largest intact caldera. The Bamasaba people revere this mountain as their eternal mother and the sacred birthplace of all humankind.',
      'Oral history recounts that the first human parents, Mundu and his wife Sera, emerged from the sacred volcanic caverns of the mountain near the rushing waters of Sipi Falls. They nourished their families on wild mountain honey, fertile red soil crops, and Malewa—tender smoked bamboo shoots gathered from the high alpine forests.',
      'Centuries later, their descendant Masaba, a strapping mountain hunter, fell deeply in love with Nabarwa, a brave Kalenjin maiden from the eastern plains. According to her traditions, to win her hand and prove he was ready to protect his people, Masaba had to undergo the intense rite of Imbalu (traditional circumcision) without flinching, blinking, or uttering a cry.',
      'As the thunderous polyrhythms of the Kadodi drums echoed against the sheer cliffs of Wanale Ridge, Masaba stood tall, calm, and unshakable like the volcanic stone of the mountain. His extraordinary valor inspired Nabarwa to join him, and their three sons—Mwambu, Mubilinyi, and Mamba—became the ancestors of the Bamasaba clans.',
      'Every two years, the slopes of Mount Elgon come alive as young men participate in the Imbalu ceremony, dancing the ecstatic Kadodi across Mbale to celebrate courage, ancestral honor, and the enduring strength of the mountain.'
    ],
    deitiesInvolved: ['Wele Khakaba (God the Provider)', 'Wele Murumwa'],
    culturalValues: ['Fearless Courage (Imbalu)', 'Honor for Mount Masaba', 'Kadodi Drumming and Celebration', 'Highland Bamboo Stewardship (Malewa)'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Sipi Falls tumbling through lush tropical mountain rainforest on Mount Masaba (Mount Elgon) in Uganda.',
    audioVoiceGuidance: 'The Bamasaba Ugandan origin story of Mundu, Sera, and the courage of Mount Masaba.'
  },

  // ==========================================
  // PAN-AFRICAN TRADITIONS (With Distinct Photos)
  // ==========================================
  {
    id: 'yoruba-ile-ife-descent',
    tribe: 'Yoruba',
    country: 'Nigeria & Benin',
    region: 'West Africa',
    era: 'Primordial Genesis (Ile-Ife Cradle)',
    title: 'Oduduwa and the Golden Chain of Ile-Ife',
    subtitle: 'The Creation of Earth from the Celestial Waters',
    founderOrHero: 'Oduduwa & Obatala',
    sacredSite: 'Ile-Ife (The Cradle of Yoruba Civilization)',
    synopsis:
      'When the entire world was only water and misty skies, Olodumare the Supreme Sky King commanded the heavenly elders to descend with a golden chain, a snail shell filled with magic earth, and a five-toed cockerel.',
    fullStoryParagraphs: [
      'In the earliest days before mountains or valleys existed, the world below was nothing but endless, shimmering water and cloudy mist. High above in the heavens, the Supreme Architect Olodumare looked down and decided that there should be dry land, bustling villages, lush farms, and thriving kingdoms.',
      'Olodumare summoned Obatala, the sculptor of humankind, and gave him the sacred tools of creation: a long golden chain to descend from the celestial realm, a snail shell filled with magical earth, a five-toed sacred rooster, and a palm nut.',
      'As Obatala prepared to descend, he grew tired, and his brother Oduduwa stepped forward with courage and resolve. Taking the golden chain, Oduduwa lowered it down from the sky until it hovered just above the boundless waters.',
      'Stepping onto the bottom link of the golden chain, Oduduwa tipped the snail shell. A mound of rich black soil fell into the water. Immediately, the five-toed rooster leaped down and began scratching and scattering the soil in every direction.',
      'Everywhere the rooster scratched, dry land formed! Hills rose up, grassy plains spread across the horizon, and fertile forests sprang into life. Oduduwa planted the palm nut, and it sprouted into a majestic tree with sixteen branches, representing the sixteen original crowns of Yoruba civilization.',
      'Oduduwa stepped down onto the fresh earth and named the sacred place "Ile-Ife"—meaning "The House of Expansion." He became the first Ooni (King) of Ife, and all Yoruba people trace their spiritual ancestry back to this sacred cradle where the sky met the earth.'
    ],
    deitiesInvolved: ['Olodumare', 'Oduduwa', 'Obatala'],
    culturalValues: ['Courage in Leadership', 'Reverence for Land', 'Unity of the 16 Crowns', 'Patience & Diligence'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The sacred terracotta and bronze heritage land of Ile-Ife in Southwestern Nigeria.',
    audioVoiceGuidance: 'The Yoruba origin story of Oduduwa descending on a golden chain to create Ile-Ife.'
  },
  {
    id: 'kikuyu-mount-kenya-origin',
    tribe: 'Kikuyu (Agĩkũyũ)',
    country: 'Kenya',
    region: 'East Africa',
    era: 'Ancestral Awakening at Kirinyaga',
    title: 'Gikuyu, Mumbi, and the Sacred Fig Tree of Kirinyaga',
    subtitle: 'The Covenant of the Mountain and the Nine Daughters',
    founderOrHero: 'Gikuyu & Mumbi',
    sacredSite: 'Kirinyaga (Mount Kenya) & Mukurwe wa Nyagathanga',
    synopsis:
      'Ngai, the Creator dwelling atop the snow-crested peak of Mount Kenya, called Gikuyu to a sacred grove of Mugumo fig trees and gave him Mumbi, mother of the nine foundational Kikuyu clans.',
    fullStoryParagraphs: [
      'High above the equator rises Kirinyaga—"The Mountain of Brightness" (Mount Kenya)—whose glaciated white peaks pierce the clouds. The Kikuyu people revere this mountain as the dwelling throne of Ngai (Mwene Nyaga), the Supreme Creator of all life.',
      'In ancient times, Ngai brought the first man, Gikuyu, to the summit of the mountain. Ngai pointed out across the magnificent landscape of forested valleys, cascading crystal streams, and fertile volcanic soil, saying: "This land is for you and your children forever."',
      'Ngai instructed Gikuyu to build his homestead at Mukurwe wa Nyagathanga, a tranquil ridge surrounded by wild fig trees (Mugumo). There, Ngai provided him with a companion named Mumbi, whose name means "She Who Creates / The Potter."',
      'Together, Gikuyu and Mumbi lived in peace and harmony with nature. In time, they were blessed with nine beautiful daughters: Wanjiku, Wambui, Wangari, Wanjiru, Wangui, Waithera, Wairimu, Nyambura, and Muthoni (with a tenth spiritual daughter, Wamuyu).',
      'When the daughters came of age, Gikuyu climbed to the sacred Mugumo tree and sacrificed a lamb to Ngai, praying for noble husbands for his daughters. Ngai answered his prayers: when Gikuyu returned, nine handsome young men were waiting by the hearth.',
      'The daughters and their husbands established the nine sacred clans (Mĩhĩrĩga) of the Agĩkũyũ nation. To this day, Kikuyu elders face the shining glaciers of Kirinyaga during communal prayers to honor Ngai and their ancestral parents Gikuyu and Mumbi.'
    ],
    deitiesInvolved: ['Ngai (Mwene Nyaga)'],
    culturalValues: ['Harmony with Ecology', 'Matrilineal Clan Heritage', 'Respect for Elders', 'Community Thanksgiving'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Kirinyaga (Mount Kenya), the sacred mountain where Ngai entrusted the land to Gikuyu and Mumbi.',
    audioVoiceGuidance: 'The Kikuyu legend of Gikuyu, Mumbi, and the covenant atop sacred Mount Kenya.'
  },
  {
    id: 'zulu-unkulunkulu-uhlanga',
    tribe: 'Zulu (amaZulu)',
    country: 'South Africa',
    region: 'Southern Africa',
    era: 'The Emergence from Uhlanga',
    title: 'Unkulunkulu and the Great Reed Marsh',
    subtitle: 'The First Ancestor and the Gifts of Life, Cattle, and Fire',
    founderOrHero: 'Unkulunkulu (The Old Old One / First Ancestor)',
    sacredSite: 'Uhlanga (The Primordial Reed Bed of KwaZulu-Natal)',
    synopsis:
      'Unkulunkulu, the First Human and Teacher, broke forth from a vast primordial reed marsh called Uhlanga, bringing with him men, women, cattle, maize seeds, and the fire of wisdom.',
    fullStoryParagraphs: [
      'In the Zulu memory of creation, life began not in stone or sand, but in a vast, lush wetland where tall green reeds swayed gently in the morning breeze. This sacred swamp was known as Uhlanga—the source of life.',
      'As the sun warmed the waters, the largest reed split open, and out stepped Unkulunkulu, "The Great Ancestor" and the First Teacher of humanity. With him emerged the first men and women, stepping into the golden sunlight.',
      'Unkulunkulu looked around at the wild green hills of KwaZulu-Natal and began his great work. From the reeds, he plucked the seeds of sorghum and sweet maize and planted them into the fertile soil so the people would never hunger.',
      'He called forth the black-and-white Nguni cattle from the mist, teaching people how to care for them with respect, for cattle represent family harmony, bridal honoring (lobola), and communal prosperity.',
      'Unkulunkulu rubbed dry twigs together to bring forth fire, taught the builders how to weave the aerodynamic beehive grass huts (indlu), and taught the elders the sacred law of Ubuntu: "Umuntu ngumuntu ngabantu"—a person is a person through other persons.',
      'Having taught humanity how to live with courage, dignity, and neighborly honor, Unkulunkulu retired into the starry heavens, leaving the amaZulu (The People of the Sky) to honor his teachings across every generation.'
    ],
    deitiesInvolved: ['Unkulunkulu', 'uMvelinqangi (The One Above All)'],
    culturalValues: ['Ubuntu (Collective Humanity)', 'Honor for Nguni Cattle', 'Courage & Dignity', 'Harmony with Water'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The rolling green ridges and mist-covered river valleys of KwaZulu-Natal.',
    audioVoiceGuidance: 'The Zulu origin story of Unkulunkulu emerging from the great reed marsh of Uhlanga.'
  },
  {
    id: 'ashanti-golden-stool-anokye',
    tribe: 'Ashanti (Asante)',
    country: 'Ghana',
    region: 'West Africa',
    era: '1701 CE (The Golden Stool Miracle)',
    title: 'Okomfo Anokye and the Golden Stool',
    subtitle: 'Sika Dwa Kofi and the Unification of the Asante Empire',
    founderOrHero: 'Okomfo Anokye & King Osei Tutu I',
    sacredSite: 'Kumasi (Capital of the Asante Kingdom)',
    synopsis:
      'Amidst rolls of thunder and a fragrant golden mist, high priest Okomfo Anokye summoned the solid gold Sika Dwa Kofi from the heavens to unite all Asante states into an invincible empire.',
    fullStoryParagraphs: [
      'In the late 17th century, the independent Akan chiefdoms of the Ghana forest were divided, vulnerable to rival kingdoms. In Kumasi, King Osei Tutu I and his brilliant high priest, Okomfo Anokye, envisioned a united Asante nation bound together forever by an unbreakable spiritual soul.',
      'Okomfo Anokye invited all the paramount chiefs, queen mothers, and warriors to a grand assembly under the shade of a sacred Kum tree in Kumasi. Drums called kete and fontomfrom echoed through the forest.',
      'As Okomfo Anokye chanted ancient invocations to Nyame (the Sky God), the midday sky suddenly darkened. Thunder roared like a celestial lion, lightning danced without rain, and a mysterious golden cloud descended gently over the assembly.',
      'From the center of the cloud, resting upon the laps of Osei Tutu I, landed a radiant stool made of pure, solid gold, decorated with golden bells and emblems of bravery: the Sika Dwa Kofi (The Golden Stool born on Friday).',
      'Okomfo Anokye announced to the breathless crowd: "This stool does not belong to any single mortal king. It contains the Sunsum—the soul, identity, strength, and collective destiny—of every Asante person who has lived, is living, or will ever be born."',
      'The chiefs took a sacred vow of unity. From that day forward, no person—not even the Asantehene (King)—is ever permitted to sit upon the Golden Stool; it rests upon its own velvet pillow. The Golden Stool cemented the Asante Empire as one of the most powerful and artistically brilliant civilizations in world history.'
    ],
    deitiesInvolved: ['Nyame (Supreme Sky God)', 'Asase Yaa (Mother Earth)'],
    culturalValues: ['Indivisible Unity', 'Sacred Regalia & Stool Veneration', 'Democratic Council of Chiefs', 'Defense of Freedom'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The sacred forest canopy of Kumasi, where the Golden Stool descended from the heavens.',
    audioVoiceGuidance: 'The Ashanti history of high priest Okomfo Anokye summoning the sacred Golden Stool.'
  },
  {
    id: 'dogon-nommo-bandiagara',
    tribe: 'Dogon',
    country: 'Mali',
    region: 'West Africa',
    era: 'The Cosmic Egg & the Bandiagara Cliffs',
    title: 'Amma, the Nommo, and the Sacred Seeds of Bandiagara',
    subtitle: 'Astronomical Wisdom and the Primordial Loom',
    founderOrHero: 'The Nommo Spirits & The Hogon Elders',
    sacredSite: 'Bandiagara Escarpment (UNESCO World Heritage Site)',
    synopsis:
      'Amma the Supreme Creator formed the universe like an immense cosmic egg containing eight sacred seeds, sending the aquatic Nommo spirits to teach the Dogon astronomy, weaving, and architecture.',
    fullStoryParagraphs: [
      'Along the sheer 150-kilometer sandstone cliffs of the Bandiagara Escarpment in Mali live the Dogon people, famous worldwide for their breathtaking cliffside architecture, masked dances, and astonishing ancient knowledge of the stars.',
      'According to Dogon wisdom, the universe began inside Amma, the supreme creator, who was shaped like a cosmic egg. Inside this egg were four cardinal chambers holding the eight primordial seeds of all life, with the tiny fonio seed as the most potent.',
      'To bring order to creation, Amma generated the Nommo—twin ancestral spirits of crystal-clear water, speech, and life. The Nommo descended to earth in an ark shaped like a woven basket, spinning through the celestial winds.',
      'Upon reaching the sandstone plateau, the Nommo brought sixty-six celestial steps containing the secrets of the seasons, the rotation of the invisible star Sirius B (Po Tolo), and the craft of metallurgy.',
      'The Nommo also taught the first human elders how to weave cloth on a loom. As the shuttle passed back and forth, words of truth were woven into thread, which is why the Dogon say that truthful speech is like tightly woven cotton.',
      'To maintain this cosmic harmony, Dogon elders still gather in the low-ceilinged Toguna shelters, where no man can stand up in anger, ensuring all community decisions are made through calm dialogue.'
    ],
    deitiesInvolved: ['Amma (Supreme Creator)', 'Nommo (Sacred Water Spirits)'],
    culturalValues: ['Celestial Observation', 'Weaving as Communication', 'Conflict Resolution in the Toguna', 'Architectural Harmony'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The soaring sandstone cliffs of the Bandiagara Escarpment, home to the Dogon people.',
    audioVoiceGuidance: 'The Dogon origin story of Amma, the cosmic seeds, and the wisdom of the Bandiagara cliffs.'
  },
  {
    id: 'maasai-enkai-cattle-gift',
    tribe: 'Maasai (Maa)',
    country: 'Kenya & Tanzania',
    region: 'East Africa',
    era: 'The Sky Covenant of the Great Rift Valley',
    title: 'Enkai, Neiterkob, and the Sacred Gift of Cattle',
    subtitle: 'The Braided Bark Rope from the Thundering Skies',
    founderOrHero: 'Neiterkob (The First Maasai Herder)',
    sacredSite: 'Ol Doinyo Lengai (Mountain of God) & Great Rift Valley',
    synopsis:
      'When sky and earth were separated during a great thunderstorm, Enkai the Sky God lowered cattle down a braided leather rope into the care of the Maasai people.',
    fullStoryParagraphs: [
      'In the beginning, sky and earth were closely connected, touching like brother and sister across the vast plains of the Great Rift Valley. But one day, a colossal thunderstorm tore them apart, lifting the heavens into the azure dome above.',
      'Enkai, the Supreme God who lives in the sky, looked down with compassion upon the humans who had been left on the dry savannah without nourishment.',
      'Enkai summoned Neiterkob (also called Maasinta), the ancestor of the Maasai. Enkai peeled the supple bark from a wild fig tree and braided it into an unbreakable golden rope stretching from heaven down to earth.',
      'Through a thunderous rift in the clouds, Enkai began lowering herds of magnificent humped zebu cattle down the rope. Down they trotted one by one: glossy black heifers, red bulls with curved horns, and dappled calves.',
      'Enkai spoke in the wind: "I entrust all the cattle of the earth to you and your descendants. Guard them with honor, share their milk freely, and move across the green plains without fencing the wild soil."',
      'To this day, the Maasai consider cattle not merely as animals, but as a sacred trust from Enkai. Their red shúkà cloaks and beaded collars reflect the beauty and sacred covenant of that ancient day.'
    ],
    deitiesInvolved: ['Enkai (Enkai Narok / Enkai Nanyokie)'],
    culturalValues: ['Stewardship of Herds', 'Nomadic Freedom', 'Open Grazing Commons', 'Reverence for Enkai'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The vast golden acacia grasslands of the Great Rift Valley, sacred roaming ground of the Maasai.',
    audioVoiceGuidance: 'The Maasai legend of Enkai lowering cattle from the heavens down a braided bark rope.'
  },
  {
    id: 'san-kaggen-fire-moon',
    tribe: 'San (Bushmen / !Kung / /Xam)',
    country: 'Botswana, Namibia & South Africa',
    region: 'Southern Africa',
    era: 'The Deep Ancestral Time of the Kalahari',
    title: 'Kaggen the Mantis, the First Fire, and the Moon',
    subtitle: 'The Creation of Light in the Ancient Night',
    founderOrHero: 'Kaggen (The Trickster-Transformer Mantis)',
    sacredSite: 'Tsodilo Hills & Kalahari Dunes',
    synopsis:
      'In the ancient times before the moon existed, Kaggen the praying mantis threw his favorite sandal into the night sky to create the moon, guiding nocturnal wanderers across the red Kalahari dunes.',
    fullStoryParagraphs: [
      'The San people have lived in the Kalahari Desert for tens of thousands of years, holding some of the oldest oral storytelling traditions on planet Earth. In their ancient stories, the trickster-creator is Kaggen, who often takes the form of a gentle Praying Mantis.',
      'In the first days of the world, there was no moon in the sky. When the sun dipped below the acacia trees, the desert was plunged into total, pitch-black darkness. Hunters and gatherers could not find their way home to their campfires.',
      'One night, Kaggen was crossing a deep salt pan when he stubbed his foot against a thorn. Annoyed by the darkness, Kaggen took off his leather sandal, dipped it into the honey of wild bees, and flung it with all his might high into the starry sky!',
      'As the sandal soared higher and higher, it began to shine with a soft, comforting silver glow. It became the Moon! The red leather turned silver, and the drops of golden honey sparkled as the stars.',
      'Kaggen called out to all the desert creatures: "Now you shall never be lost in the night! Whenever the moon is full, children may dance around the campfire and elders may tell stories until dawn."',
      'To celebrate this gift, San rock painters across the Tsodilo Hills etched the sacred eland and praying mantis onto the granite shelters, preserving the memory of the first light.'
    ],
    deitiesInvolved: ['Kaggen (The Mantis)', 'Cagn'],
    culturalValues: ['Deep Harmony with Desert Nature', 'Rock Art Legacy', 'Humility in Creation', 'Joy of Campfire Storytelling'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The starlit night skies over the ancient Kalahari basin, lit by Kaggen’s moon.',
    audioVoiceGuidance: 'The San ancient legend of Kaggen the Mantis creating the moon from his sandal.'
  },
  {
    id: 'oromo-waaqa-gadaa-assembly',
    tribe: 'Oromo',
    country: 'Ethiopia & Kenya',
    region: 'East Africa',
    era: 'The Assembly of the Sacred Odaa Tree',
    title: 'Waaqa, the Gadaa Order, and the Sacred Odaa Tree',
    subtitle: 'The Ancient Genesis of African Grassroots Democracy',
    founderOrHero: 'The Gadaa Assemblies & Abbaa Gadaa',
    sacredSite: 'Odaa Bultum & Odaa Nabee (Sacred Sycamore Fig Assemblies)',
    synopsis:
      'Waaqa, the Sky God of justice and balance (Saffuu), inspired the Oromo elders to govern through the Gadaa system—a democratic rotation of leadership every eight years beneath the holy Odaa tree.',
    fullStoryParagraphs: [
      'Centuries before modern constitutional democracies arose, the Oromo people of the Horn of Africa practiced one of the world\'s most sophisticated indigenous democratic systems: the Gadaa.',
      'In Oromo cosmology, the universe was created by Waaqa (Waaqayyo), the Supreme God who loves truth, justice, and cosmic equilibrium (Safuu). Waaqa taught that no single person should ever rule as a permanent king, for concentrated power corrupts the heart.',
      'Waaqa commanded the elders to gather beneath the expansive shade of the Odaa (the sacred sycamore fig tree). Beneath its welcoming branches, cool breezes allowed everyone to speak without fear.',
      'Under the Odaa tree, the people established the five rotating generational classes (Gogessa). Every eight years without exception, the current leaders peacefully handed over the Bokkuu (the sacred ceremonial scepter) to the next elected age-set.',
      'The leader, known as the Abbaa Gadaa, governed not as an absolute monarch, but as a servant of the community, responsible for upholding women’s rights (the Siinqee institution), mediating peace, and protecting the mountain springs.',
      'The green umbrella of the Odaa tree remains the national symbol of Oromo freedom, representing peace, democracy, and deep spiritual respect for the divine order of Waaqa.'
    ],
    deitiesInvolved: ['Waaqa (Waaqayyo)'],
    culturalValues: ['Grassroots Democracy (Gadaa)', 'Term Limits & Peaceful Succession', 'Safuu (Cosmic Balance & Moral Respect)', 'Siinqee (Women’s Council)'],
    illustrationUrl:
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Sunlight illuminating the sacred ancestral fig trees in the highland assemblies.',
    audioVoiceGuidance: 'The Oromo history of Waaqa, the sacred Odaa tree, and the democratic Gadaa system.'
  }
];

export const DEITIES_DATA: DeityEntity[] = [
  // ==========================================
  // UGANDAN DEITIES
  // ==========================================
  {
    id: 'mukasa-buganda',
    name: 'Mukasa',
    pronunciation: 'Moo-kah-sah',
    tribe: 'Baganda',
    culture: 'Buganda & Great Lakes cosmology',
    region: 'East Africa',
    country: 'Uganda',
    role: 'God of Lake Victoria (Nnalubaale), Waters & Bountiful Harvest',
    domain: 'Freshwater Lakes, Fishermen, Safe Canoe Journeys, Fertility',
    symbol: '🛶 White Canoe, Cowrie Shells & Sacred Waters',
    element: 'Fresh Water & Gentle Lake Breezes',
    sacredColor: 'White & Lake Blue',
    praiseTitle: 'Lubaale Mukasa (Guardian of Nnalubaale)',
    description:
      'Mukasa is the most benevolent and universally beloved Lubaale (divinity) of Buganda. He watches over Lake Victoria, protecting fishermen from storms, granting safe journeys to the Ssese Islands, and sending children to loving families.',
    mythologicalLore:
      'Before setting sail on Lake Victoria, Buganda fishermen poured clear milk into the waves and sounded the sacred drums. Mukasa would send a gentle trailing wind and calm the turbulent waters.',
    audioPronunciationText: 'Mukasa. The revered guardian spirit of Lake Victoria and fertility in Buganda.',
    icon: '🌊',
    illustrationUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'katonda-buganda',
    name: 'Katonda',
    pronunciation: 'Kah-tohn-dah',
    tribe: 'Baganda',
    culture: 'Buganda traditional religion',
    region: 'East Africa',
    country: 'Uganda',
    role: 'Supreme Creator & Architect of the Heavens (Lissoddene)',
    domain: 'Creation, Cosmic Life, Compassion, Ultimate Protection',
    symbol: '☀️ The Infinite Sky & The Great Sun',
    element: 'Breath of Life & Sky Light',
    sacredColor: 'Radiant Gold & White',
    praiseTitle: 'Lissoddene (The Great Seeing Eye of the Universe)',
    description:
      'Katonda is the supreme, uncreated Creator in Ganda spirituality. Unlike local spirits, Katonda is beyond mortal greed, needing no animal sacrifices, known as "The Father of All Living Beings."',
    mythologicalLore:
      'In Buganda proverbs, it is said: "Katonda ky’aterekera omunaku tekivunda"—What God preserves for the humble and righteous never rots or decays.',
    audioPronunciationText: 'Katonda. The supreme Creator God in Buganda tradition.',
    icon: '☀️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'wamara-chwezi',
    name: 'Wamara',
    pronunciation: 'Wah-mah-rah',
    tribe: 'Chewzi / Bachwezi',
    culture: 'Kitara, Bunyoro & Ankole traditions',
    region: 'East Africa',
    country: 'Uganda',
    role: 'King of the Spirit Realm & Master of the Sacred Crater Waters',
    domain: 'Spiritual Wisdom, Crater Lakes, Cattle Fertility, Embandwa Healing',
    symbol: '👑 Golden Crown of Cowries & Pearl-horned Ankole Cattle',
    element: 'Emerald Water & Mountain Mist',
    sacredColor: 'Emerald Green & Copper',
    praiseTitle: 'Omukama w’Abakama (King of the Kings of Kitara)',
    description:
      'The last ruling monarch of the Bachwezi dynasty who walked into Lake Wamala and the Kasenda craters. In Western Uganda, Wamara is revered as the supreme leader of the Embandwa ancestral spirits.',
    mythologicalLore:
      'Elders in Bunyoro recount that Wamara gave mankind the gift of sacred herbal healing and taught the people how to breed the long-horned cattle with sweet, calming songs.',
    audioPronunciationText: 'Wamara. Bachwezi king of the spirit realm and the crater lakes of Uganda.',
    icon: '👑',
    illustrationUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'atida-lango',
    name: 'Atida',
    pronunciation: 'Ah-tee-dah',
    tribe: 'Lango',
    culture: 'Lango traditional spirituality',
    region: 'East Africa',
    country: 'Uganda',
    role: 'Goddess of Rain, Harvest & the Communal Hunt (Dwar)',
    domain: 'Gentle Rain, Abundant Grain, Fair Hunting, Protection of Cranes',
    symbol: '🪶 Crested Crane Feather & Rain Water Horn',
    element: 'Rainfall & Grain Seeds',
    sacredColor: 'Sky Blue & Pearl White',
    praiseTitle: 'Maa Atida (Mother of the Spring and Harvest)',
    description:
      'Atida is the gentle feminine spirit who brings seasonal rains to the plains of Lake Kyoga and guides the communal hunt so that no family goes hungry.',
    mythologicalLore:
      'Whenever the Crested Crane danced near the village water hole, Lango elders knew that Mother Atida had accepted their thanksgiving and blessed the crops with morning dew.',
    audioPronunciationText: 'Atida. The beloved goddess of rain and communal hunting in Lango tradition.',
    icon: '🪶',
    illustrationUrl:
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'kibuka-buganda',
    name: 'Kibuka (Kyobe Omumbaale)',
    pronunciation: 'Chee-boo-kah',
    tribe: 'Baganda (Ganda)',
    culture: 'Buganda royal military & sky cosmology',
    region: 'East Africa',
    country: 'Uganda',
    role: 'God of War, Lightning Clouds & Defender of Buganda',
    domain: 'Thunderclouds, National Defense, Courage, Archery',
    symbol: '⚡ Celestial Clouds, Bow & Sacred Iron Arrows',
    element: 'Thunder, High Cloud Formations & Wind',
    sacredColor: 'Crimson & Sky Indigo',
    praiseTitle: 'Omutaka w’e Mbale (The Celestial Defender)',
    description:
      'Brother of Mukasa who fought for the Baganda by hovering inside dense storm clouds, shooting down flaming arrows upon invader armies.',
    mythologicalLore:
      'Legend recounts that Kibuka commanded the thunderclouds to conceal his movements until a tragic arrow pierced his cloud base, after which his spirit ascended to dwell forever in the sky.',
    audioPronunciationText: 'Kibuka. The legendary Buganda god of war and thunderclouds.',
    icon: '⚡',
    illustrationUrl:
      'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ndahura-chwezi',
    name: 'Ndahura (Ndahiro)',
    pronunciation: 'N-dah-hoo-rah',
    tribe: 'Chewzi / Bachwezi',
    culture: 'Kitara, Bunyoro & Western Uganda royal tradition',
    region: 'East Africa',
    country: 'Uganda',
    role: 'First Mucwezi King of Kitara & Spirit of Healing and Iron',
    domain: 'Iron Smelting, Empire Unification, Healing from Sickness, Valor',
    symbol: '🛡️ Sacred Royal Shield, Smelted Iron & Anvil',
    element: 'Fire of the Forge & Hardened Earth',
    sacredColor: 'Copper, Bronze & Deep Red',
    praiseTitle: 'Kyomya Nyantorogo (The Iron Unifier of Kitara)',
    description:
      'The heroic grandson of Isaza who unified the kingdom of Kitara, invented new iron smelting methods, and conquered rival lands before abdicating to become a revered Embandwa spirit.',
    mythologicalLore:
      'Ndahura was swallowed by an earthquake trench during an eclipse but returned miraculously three days later, commanding his people to honor the peace of the earth.',
    audioPronunciationText: 'Ndahura. First King of the Bachwezi and spirit of iron and healing.',
    icon: '🛡️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'wele-khakaba-gisu',
    name: 'Wele Khakaba',
    pronunciation: 'Weh-leh Kah-kah-bah',
    tribe: 'Bamasaba / Bagisu (Gisu)',
    culture: 'Mount Masaba (Mount Elgon) highland cosmology',
    region: 'East Africa',
    country: 'Uganda',
    role: 'Supreme Provider God Dwelling on Mount Masaba’s Snowy Peaks',
    domain: 'Mount Elgon Caldera, Highland Rains, Fertile Soil, Bamasaba Lineage',
    symbol: '⛰️ Mount Masaba Peak & Kadodi Drum Rhythm',
    element: 'High Alpine Snow, Volcanic Soil & Fresh Mist',
    sacredColor: 'Volcanic Red & Snow White',
    praiseTitle: 'Wele Khakaba (The Generous Giver of Mountain Bread)',
    description:
      'The supreme benevolent deity of the Bamasaba, believed to reside in the crystalline alpine air and snowfields of Mount Elgon’s highest peak (Wagagai).',
    mythologicalLore:
      'Elders taught that whenever young men dance the Kadodi drum with courage during Imbalu, Wele Khakaba sends refreshing rains to water the banana and coffee groves below.',
    audioPronunciationText: 'Wele Khakaba. Supreme God of the Bamasaba people on Mount Elgon.',
    icon: '⛰️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80'
  },

  // ==========================================
  // PAN-AFRICAN DEITIES (Distinct Images)
  // ==========================================
  {
    id: 'olodumare',
    name: 'Olodumare',
    pronunciation: 'Oh-loh-doo-mah-reh',
    tribe: 'Yoruba',
    culture: 'Yoruba cosmology',
    region: 'West Africa',
    country: 'Nigeria & Benin',
    role: 'Supreme Creator & Source of Life (Eledumare)',
    domain: 'Creation, Cosmos, Breath of Life, Ultimate Truth',
    symbol: '☀️ The Infinite Sun & Golden Chain',
    element: 'Pure Light and Air',
    sacredColor: 'White & Translucent Gold',
    praiseTitle: 'Olofin Aye (Owner of the Universe) & Eledumare',
    description:
      'Olodumare is the supreme, gender-transcendent deity in Yoruba belief. Olodumare does not have physical shrines or idols because the entire universe itself is Olodumare’s temple. He delegates governance of the natural elements to the Orishas.',
    mythologicalLore:
      'When Obatala molded the clay bodies of the first humans, it was Olodumare alone who leaned down and blew the divine breath of life (Emi) into their nostrils, awakening humanity into living consciousness.',
    audioPronunciationText: 'Olodumare. Supreme Creator of the universe in Yoruba cosmology.',
    icon: '☀️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'shango',
    name: 'Shango (Ṣàngó)',
    pronunciation: 'Shahn-goh',
    tribe: 'Yoruba',
    culture: 'Yoruba cosmology & Afro-Atlantic traditions',
    region: 'West Africa',
    country: 'Nigeria, Benin (and diaspora: Cuba, Brazil)',
    role: 'Orisha of Lightning, Thunder, Drums & Royal Justice',
    domain: 'Thunderbolts, Fire, Bata Drums, Leadership',
    symbol: '⚡ Oshe Shango (Double-headed wooden axe)',
    element: 'Fire & Storms',
    sacredColor: 'Crimson Red & White',
    praiseTitle: 'Kabiyesi (Unquestioned King of Oyo)',
    description:
      'Historically the fourth Alaafin (King) of Oyo, Shango transformed into a powerful Orisha of thunder and divine justice. He defends truth, strikes down deceit with thunderbolts, and dances passionately to the rhythm of the sacred Bata drums.',
    mythologicalLore:
      'When unjust rulers broke their vows to the people, Shango hurled polished thunderstones (edun ara) from the clouds, instantly striking down dishonesty and restoring moral integrity to the land.',
    audioPronunciationText: 'Shango. Yoruba Orisha of lightning, thunder, and drums.',
    icon: '⚡',
    illustrationUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ogun',
    name: 'Ogun (Ògún)',
    pronunciation: 'Oh-goon',
    tribe: 'Yoruba & Edo',
    culture: 'Yoruba & Dahomey',
    region: 'West Africa',
    country: 'Nigeria, Benin',
    role: 'Orisha of Iron, Metallurgy, Tools & Path Clearing',
    domain: 'Blacksmithing, Agriculture, Technology, Pioneer Travel',
    symbol: '⚔️ Iron Machete, Anvil & Palm Fronds (Mariwo)',
    element: 'Metal & Earth',
    sacredColor: 'Forest Green & Deep Charcoal',
    praiseTitle: 'Asinmolu (The Pioneer who Clears the Wild Road)',
    description:
      'Ogun is the master blacksmith of the heavens and earth. He is the guardian of all who work with metals, from ancient farmers clearing fields with hoes to modern engineers and surgeons using precision instruments.',
    mythologicalLore:
      'When the gods first descended to earth, an impassable wall of thorny jungle blocked their journey. While all other deities hesitated, Ogun forged a sturdy iron machete and carved a clear path through the wilderness.',
    audioPronunciationText: 'Ogun. Orisha of iron, engineering, and pioneering paths.',
    icon: '⚔️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'oya',
    name: 'Oya (Ọya)',
    pronunciation: 'Oh-yah',
    tribe: 'Yoruba & Nupe',
    culture: 'Yoruba cosmology',
    region: 'West Africa',
    country: 'Nigeria & Benin',
    role: 'Orisha of Winds, Whirlwinds, Lightning & Rebirth',
    domain: 'Transformative Storms, River Niger, Marketplace Wisdom',
    symbol: '🌪️ Buffalo Horn, Horsehair Whisk & Copper Sword',
    element: 'Wind, Air & Storm Waters',
    sacredColor: 'Maroon & Deep Purple',
    praiseTitle: 'Iya San (Mother of the River Niger) & Wind of Change',
    description:
      'Oya is a fierce, courageous goddess who commands the fierce winds and tornadoes that precede lightning storms. She clears away dead foliage in the forest to make room for vibrant new sprouts.',
    mythologicalLore:
      'The sacred River Niger in Nigeria is known natively as Odo Oya. Legend tells that whenever travelers faced dangerous rapids, whispering Oya’s praise would calm the river and grant safe passage to all.',
    audioPronunciationText: 'Oya. Goddess of winds, storms, and transformative change.',
    icon: '🌪️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'oshun',
    name: 'Oshun (Ọṣun)',
    pronunciation: 'Oh-shoon',
    tribe: 'Yoruba',
    culture: 'Yoruba cosmology',
    region: 'West Africa',
    country: 'Nigeria',
    role: 'Orisha of Fresh Rivers, Sweet Waters, Love & Fertility',
    domain: 'Fresh Water Springs, Compassion, Diplomacy, Prosperity',
    symbol: '💧 Brass Mirror, Golden Peacock Feather & Honeycomb',
    element: 'Fresh Sweet Water',
    sacredColor: 'Amber Gold & Canary Yellow',
    praiseTitle: 'Yeye Osun (Beneficent Mother of the Sacred Stream)',
    description:
      'Oshun is the youngest and most revered female Orisha, beloved for her gentle grace, sparkling joy, and diplomatic brilliance. Her sacred river flows through Osogbo, where the UNESCO Osun-Osogbo Sacred Grove stands.',
    mythologicalLore:
      'When the male deities attempted to manage the world without consulting Oshun, droughts withered the crops and dry rivers cracked. It was only when they humbly honored Oshun’s wisdom that rains fell and life flourished once more.',
    audioPronunciationText: 'Oshun. Yoruba Orisha of sweet river waters, love, and fertility.',
    icon: '💧',
    illustrationUrl:
      'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ngai-enkai',
    name: 'Ngai / Enkai',
    pronunciation: 'En-guy / En-kye',
    tribe: 'Kikuyu & Maasai',
    culture: 'East African Highland Cosmology',
    region: 'East Africa',
    country: 'Kenya & Tanzania',
    role: 'Supreme Creator of the Sky and Mountains',
    domain: 'Rainfall, Sun, Snow-capped Peaks, Pastoral Well-being',
    symbol: '🏔️ The Shining Mountain Peak & Double Rainbow',
    element: 'Sky, Rain, Glaciers',
    sacredColor: 'Black (benevolent rain) & Red (fire and lightning)',
    praiseTitle: 'Mwene Nyaga (Possessor of Brightness)',
    description:
      'In both Kikuyu and Maasai traditions, Ngai/Enkai is the omnipotent sky creator who sends seasonal rains down upon the crops and grasslands.',
    mythologicalLore:
      'During severe dry spells, Kikuyu elders would gather beneath a sacred Mugumo fig tree facing the snows of Mount Kenya, offering prayers. Clouds would roll over the glaciers within hours to water the valleys.',
    audioPronunciationText: 'Ngai. The Supreme Sky Divinity honored by the Kikuyu and Maasai.',
    icon: '🏔️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'nyame',
    name: 'Nyame (Onyankopon)',
    pronunciation: 'Nyah-meh / Oh-nyan-koh-pon',
    tribe: 'Akan / Ashanti',
    culture: 'Akan cosmology',
    region: 'West Africa',
    country: 'Ghana & Côte d’Ivoire',
    role: 'Supreme Sky God of Wisdom, Sun, and Light',
    domain: 'Heavenly Radiance, Moral Truth, Creation',
    symbol: '☀️ Gye Nyame Adinkra Symbol ("Except for God")',
    element: 'Sunlight and Sky',
    sacredColor: 'Pure White & Gold',
    praiseTitle: 'Onyame Tweduampon (The Dependable God upon whom one leans)',
    description:
      'Nyame is the supreme deity of the Akan people, represented universally through the famous Adinkra symbol "Gye Nyame," which signifies that nothing exists without divine presence.',
    mythologicalLore:
      'Nyame possessed all the stories in the universe in a golden chest, which Ananse the spider acquired through wit and patience.',
    audioPronunciationText: 'Nyame. Supreme Sky God of the Akan nation.',
    icon: '☀️',
    illustrationUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'asase-yaa',
    name: 'Asase Yaa',
    pronunciation: 'Ah-sah-seh Yah',
    tribe: 'Akan / Ashanti',
    culture: 'Akan cosmology',
    region: 'West Africa',
    country: 'Ghana',
    role: 'Mother Earth, Guardian of the Soil & Harvest',
    domain: 'Fertility, Agriculture, Ancestral Resting Places',
    symbol: '🌱 The Sprouting Seedling & Wooden Hoe',
    element: 'Living Earth & Soil',
    sacredColor: 'Earth Brown & Rich Moss Green',
    praiseTitle: 'Asase Yaa Efie (Mother of the Earth)',
    description:
      'Asase Yaa is the earth goddess who nurtures all plant life, feeds human beings, and holds the departed ancestors within her embrace.',
    mythologicalLore:
      'Before seeds are planted in the spring, elders pour a libation of clear water onto the ground, thanking Asase Yaa for her generosity.',
    audioPronunciationText: 'Asase Yaa. Mother Earth and sustainer of agriculture in Akan tradition.',
    icon: '🌱',
    illustrationUrl:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'amma-dogon',
    name: 'Amma',
    pronunciation: 'Ahm-mah',
    tribe: 'Dogon',
    culture: 'Dogon cosmology',
    region: 'West Africa',
    country: 'Mali',
    role: 'Supreme Cosmic Egg & Architect of the Universe',
    domain: 'Cosmic Order, Astronomy, Millet Seeds, Creation',
    symbol: '🌌 The Cosmic Egg & Sandstone Pillars',
    element: 'Cosmic Aether and Stars',
    sacredColor: 'Indigo Blue & White Sand',
    praiseTitle: 'The Great Potter of the Stars',
    description:
      'Amma is the primordial creator who shaped the sun as a glowing bowl of molten copper and the moon as a bowl of shimmering brass.',
    mythologicalLore:
      'Amma created four seeds inside the celestial egg: millet, sorghum, rice, and fonio. The fonio seed contained the blueprint for the entire universe.',
    audioPronunciationText: 'Amma. Supreme deity of the Dogon people of Mali.',
    icon: '🌌',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'mwari-shona',
    name: 'Mwari (Musikavanhu)',
    pronunciation: 'Mwah-ree / Moo-see-kah-vahn-hoo',
    tribe: 'Shona',
    culture: 'Shona & Rozvi traditions',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    role: 'Supreme Creator & The Voice of the Sacred Caves',
    domain: 'Seasonal Rains, Granite Rocks, Moral Integrity',
    symbol: '🦅 The Bateleur Eagle & Soapstone Bird (Zimbabwe Bird)',
    element: 'Granite Stone & Refreshing Rain',
    sacredColor: 'Slate Gray & Sky Blue',
    praiseTitle: 'Musikavanhu (The Creator of Humankind)',
    description:
      'Mwari is the supreme architect in Shona spirituality, venerated for millennia across Great Zimbabwe and the Matobo Hills.',
    mythologicalLore:
      'During historical droughts, a booming voice from the sacred granite caves of Matobo would instruct elders on planting times, followed by abundant rain.',
    audioPronunciationText: 'Mwari. The Supreme Creator and rain-bringer in Shona tradition.',
    icon: '🦅',
    illustrationUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'modimo-sotho',
    name: 'Modimo',
    pronunciation: 'Moh-dee-moh',
    tribe: 'Sotho & Tswana',
    culture: 'Basotho & Batswana cosmology',
    region: 'Southern Africa',
    country: 'Botswana, South Africa, Lesotho',
    role: 'The Great Transcendent Origin of All Life',
    domain: 'Breath of Life, Cosmic Justice, Ancestral Guardianship',
    symbol: '🌿 The Sacred Reed & High Mountain Peak',
    element: 'Air, High Heavens',
    sacredColor: 'White & Verdant Green',
    praiseTitle: 'Modimo wa Badimo (God of the Ancestors)',
    description:
      'Modimo is the high creator communicating with the living through the benevolent ancestral spirits known as the Badimo.',
    mythologicalLore:
      'When a person acts with kindness and truth, Modimo’s blessing shines upon their cattle and crops like the warm morning sun after frost.',
    audioPronunciationText: 'Modimo. The supreme high god of the Sotho and Tswana peoples.',
    icon: '🌿',
    illustrationUrl:
      'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const SACRED_NAMES_DATA: SacredNameEntity[] = [
  // ==========================================
  // UGANDAN SACRED NAMES (Ganda, Lango, Gisu, Chewzi/Bunyoro)
  // ==========================================
  {
    id: 'name-kato',
    name: 'Kato',
    pronunciation: 'Kah-toh',
    tribe: 'Baganda & Bunyoro',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Luganda / Runyoro',
    gender: 'MALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'The Younger Twin Boy (Sacred Blessing of the Hearth)',
    spiritualSignificance:
      'In Ugandan tradition, twins (Abalongo) are revered as sacred blessings from Katonda. Kato is the second-born twin brother of Wasswa, celebrated with joy and feasting.',
    namingTraditionFact:
      'In Buganda, twins are greeted with royal drums called "Nankasa" and special celebrations honoring the parents (Salongo & Nalongo).',
    audioPronunciationText: 'Kato. Ugandan name for the younger twin boy in Buganda and Bunyoro.'
  },
  {
    id: 'name-wasswa',
    name: 'Wasswa',
    pronunciation: 'Wah-swah',
    tribe: 'Baganda',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Luganda',
    gender: 'MALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'The Elder Twin Boy (Senior Twin and Protector)',
    spiritualSignificance:
      'The elder twin brother of Kato, recognized as the natural guardian, protector, and senior brother of the family.',
    namingTraditionFact:
      'The father of twins receives the revered lifetime title of "Salongo", and the mother "Nalongo".',
    audioPronunciationText: 'Wasswa. Ugandan name for the elder twin boy in Buganda.'
  },
  {
    id: 'name-babirye',
    name: 'Babirye',
    pronunciation: 'Bah-beer-yeh',
    tribe: 'Baganda',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Luganda',
    gender: 'FEMALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'The Elder Twin Girl (Grace and Leadership)',
    spiritualSignificance:
      'Given to the first-born of twin sisters, representing leadership, gentle maternal intuition, and blessing to the home.',
    namingTraditionFact:
      'Paired universally with Nakato (the younger twin girl).',
    audioPronunciationText: 'Babirye. Ugandan name for the elder twin girl in Buganda.'
  },
  {
    id: 'name-nakato',
    name: 'Nakato',
    pronunciation: 'Nah-kah-toh',
    tribe: 'Baganda',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Luganda',
    gender: 'FEMALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'The Younger Twin Girl (Joy and Sweetness)',
    spiritualSignificance:
      'The sister born following Babirye, celebrated for bringing smiles, lighthearted laughter, and peace to the homestead.',
    namingTraditionFact:
      'Families with twin girls are believed to enjoy perpetual abundance in their agricultural gardens.',
    audioPronunciationText: 'Nakato. Ugandan name for the younger twin girl in Buganda.'
  },
  {
    id: 'name-kiiza',
    name: 'Kiiza (Kizza)',
    pronunciation: 'Chee-zah / Kee-zah',
    tribe: 'Baganda & Banyoro',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Luganda / Runyoro',
    gender: 'UNISEX',
    category: 'DESTINY_CIRCUMSTANCE',
    meaning: 'Child Born Immediately Following Twins',
    spiritualSignificance:
      'Holds a very special spiritual status in Ugandan families as the guardian and anchor who seals the peace of the twins.',
    namingTraditionFact:
      'Kiiza is traditionally treated with immense gentleness and given special royal barkcloth at clan ceremonies.',
    audioPronunciationText: 'Kiiza. Ugandan name for the child born right after twins.'
  },
  {
    id: 'name-okello',
    name: 'Okello',
    pronunciation: 'Oh-kehl-loh',
    tribe: 'Lango & Acholi',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Leb Lango',
    gender: 'MALE',
    category: 'DESTINY_CIRCUMSTANCE',
    meaning: 'Boy Born After Twins (Bring of Good Fortune)',
    spiritualSignificance:
      'In Northern Uganda among the Lango and Acholi, Okello is a child of destiny believed to bring unexpected luck and blessings.',
    namingTraditionFact:
      'The female equivalent in Lango is "Akello".',
    audioPronunciationText: 'Okello. Lango and Acholi name for a boy born after twins.'
  },
  {
    id: 'name-ocen',
    name: 'Ocen',
    pronunciation: 'Oh-chen',
    tribe: 'Lango',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Leb Lango',
    gender: 'MALE',
    category: 'DESTINY_CIRCUMSTANCE',
    meaning: 'Born During Heavy Rain / Rainy Season',
    spiritualSignificance:
      'Rain in Northern Uganda is the supreme blessing for crops, cattle, and cooling the savannah sun; an Ocen brings refreshing prosperity.',
    namingTraditionFact:
      'Lango circumstance names record the exact weather or agricultural season of the child’s arrival.',
    audioPronunciationText: 'Ocen. Lango name for a boy born during the rainy season.'
  },
  {
    id: 'name-auma',
    name: 'Auma',
    pronunciation: 'Ah-oo-mah',
    tribe: 'Lango',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Leb Lango',
    gender: 'FEMALE',
    category: 'VIRTUE_CHARACTER',
    meaning: 'Born Facing Downward (Quiet and Deep Wisdom)',
    spiritualSignificance:
      'Believed to be contemplative, observant, and deeply insightful, growing into wise counselors and community mediators.',
    namingTraditionFact:
      'The male counterpart in Lango is "Ouma".',
    audioPronunciationText: 'Auma. Lango name for a girl born with contemplative wisdom.'
  },
  {
    id: 'name-masaba',
    name: 'Masaba',
    pronunciation: 'Mah-sah-bah',
    tribe: 'Bamasaba / Bagisu',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Lumasaaba',
    gender: 'MALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'Son of Mount Elgon (The Mountain Patriarch)',
    spiritualSignificance:
      'Carries the name of the great founding ancestor of the Bagisu and the majestic volcanic mountain itself.',
    namingTraditionFact:
      'Given to boys who demonstrate early strength, calm patience, and love for highland farming.',
    audioPronunciationText: 'Masaba. Bagisu name honoring the ancestral patriarch of Mount Elgon.'
  },
  {
    id: 'name-mwambu',
    name: 'Mwambu',
    pronunciation: 'Mwahm-boo',
    tribe: 'Bagisu',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Lumasaaba',
    gender: 'MALE',
    category: 'VIRTUE_CHARACTER',
    meaning: 'Firstborn Son of the Mountain / The Trailblazer',
    spiritualSignificance:
      'Representing the eldest son of Masaba and Nabarwa who pioneered the northern ridges of Mount Elgon.',
    namingTraditionFact:
      'Accompanied in song during the famous Kadodi festival in Mbale.',
    audioPronunciationText: 'Mwambu. Bagisu name meaning Firstborn Son of the Mountain.'
  },
  {
    id: 'name-namono',
    name: 'Namono',
    pronunciation: 'Nah-moh-noh',
    tribe: 'Bagisu',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Lumasaaba',
    gender: 'FEMALE',
    category: 'VIRTUE_CHARACTER',
    meaning: 'Gentle Daughter Born in the Bamboo Harvest',
    spiritualSignificance:
      'Associated with the tender harvest of sweet Malewa bamboo shoots and fertile mountain valleys.',
    namingTraditionFact:
      'Reflects the warm hospitality and generous culinary heritage of the Bamasaba mothers.',
    audioPronunciationText: 'Namono. Bagisu name for a gentle daughter of the mountain harvest.'
  },
  {
    id: 'name-akiiki',
    name: 'Akiiki (Empaako)',
    pronunciation: 'Ah-chee-chee',
    tribe: 'Bunyoro & Toro (Bachwezi Tradition)',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Runyoro-Rutooro',
    gender: 'UNISEX',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'Friend of All / Savior / The Gentle One (Empaako Praise Name)',
    spiritualSignificance:
      'One of the 12 sacred Empaako praise names of the Bachwezi heritage. It signifies a person who treats all living beings as beloved family.',
    namingTraditionFact:
      'In Bunyoro and Toro, calling someone by their Empaako praise name is the highest form of affection, respect, and peace.',
    audioPronunciationText: 'Akiiki. Sacred Empaako praise name meaning Friend of All in Bunyoro and Toro.'
  },
  {
    id: 'name-abwooli',
    name: 'Abwooli (Empaako)',
    pronunciation: 'Ah-bwoh-lee',
    tribe: 'Bunyoro & Toro (Bachwezi Tradition)',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Runyoro-Rutooro',
    gender: 'UNISEX',
    category: 'VIRTUE_CHARACTER',
    meaning: 'The Compassionate / Graceful (Empaako Praise Name)',
    spiritualSignificance:
      'Derived from the gentle dignity of the domestic cat, given to children who display natural grace, tenderness, and warm listening.',
    namingTraditionFact:
      'Empaako names were declared by UNESCO as Intangible Cultural Heritage of Humanity in need of urgent safeguarding.',
    audioPronunciationText: 'Abwooli. Sacred Empaako praise name meaning Graceful and Compassionate.'
  },
  {
    id: 'name-aceng',
    name: 'Aceng',
    pronunciation: 'Ah-chehng',
    tribe: 'Lango',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Leb Lango',
    gender: 'FEMALE',
    category: 'DESTINY_CIRCUMSTANCE',
    meaning: 'Girl Born in the Radiant Midday Sunshine',
    spiritualSignificance:
      'Believed to bring brilliant clarity, warmth, and sunny cheerfulness that dispels gloom from the clan.',
    namingTraditionFact:
      'The male counterpart in Lango is "Oceng".',
    audioPronunciationText: 'Aceng. Lango name for a daughter born in the bright midday sun.'
  },
  {
    id: 'name-sera',
    name: 'Sera',
    pronunciation: 'Seh-rah',
    tribe: 'Bamasaba / Bagisu',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Lumasaaba',
    gender: 'FEMALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'Ancestral First Mother of Mount Elgon (Masaba)',
    spiritualSignificance:
      'Honors the legendary first mother of humanity who emerged with Mundu from the volcanic caves of Mount Elgon.',
    namingTraditionFact:
      'Given to girls believed to possess strong maternal intuition and ancestral grounding.',
    audioPronunciationText: 'Sera. Bamasaba name honoring the ancestral first mother of Mount Elgon.'
  },
  {
    id: 'name-sanyu',
    name: 'Sanyu',
    pronunciation: 'Sahn-yoo',
    tribe: 'Baganda',
    country: 'Uganda',
    region: 'East Africa',
    language: 'Luganda',
    gender: 'UNISEX',
    category: 'VIRTUE_CHARACTER',
    meaning: 'Joy / Overwhelming Happiness to the Family',
    spiritualSignificance:
      'Expresses boundless gratitude to Katonda for answering prayers and bringing dancing laughter into the home.',
    namingTraditionFact:
      'Frequently given to children born during joyous family milestones or bountiful harvests.',
    audioPronunciationText: 'Sanyu. Luganda name meaning Joy and Happiness.'
  },

  // ==========================================
  // PAN-AFRICAN SACRED NAMES
  // ==========================================
  {
    id: 'name-kwame',
    name: 'Kwame',
    pronunciation: 'Kwah-meh',
    tribe: 'Akan / Ashanti',
    country: 'Ghana',
    region: 'West Africa',
    language: 'Asante Twi',
    gender: 'MALE',
    category: 'DAY_NAME',
    meaning: 'Born on Saturday (Child of the Creator / The Ancient One)',
    spiritualSignificance:
      'Children born on Saturday are believed to be dependable, wise philosophers, and creative problem-solvers.',
    namingTraditionFact:
      'In Akan tradition, every baby receives an automatic "Kra din" (soul name) based on the exact day of the week they arrived on earth.',
    audioPronunciationText: 'Kwame. Akan day name for a boy born on Saturday.'
  },
  {
    id: 'name-ama',
    name: 'Ama',
    pronunciation: 'Ah-mah',
    tribe: 'Akan / Ashanti',
    country: 'Ghana',
    region: 'West Africa',
    language: 'Asante Twi',
    gender: 'FEMALE',
    category: 'DAY_NAME',
    meaning: 'Born on Saturday (Grace, Resilient Guardian)',
    spiritualSignificance:
      'Ama is seen as a pillar of family harmony, patient, thoughtful, and protective of the community.',
    namingTraditionFact:
      'Akan naming ceremonies (Abadinto) take place at dawn on the eighth day after birth.',
    audioPronunciationText: 'Ama. Akan day name for a girl born on Saturday.'
  },
  {
    id: 'name-babatunde',
    name: 'Babatunde',
    pronunciation: 'Bah-bah-toon-deh',
    tribe: 'Yoruba',
    country: 'Nigeria',
    region: 'West Africa',
    language: 'Yorùbá',
    gender: 'MALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'Father has returned (Ancestral Reincarnation)',
    spiritualSignificance:
      'Given to a baby boy born after the passing of a beloved grandfather, symbolizing ancestral continuity.',
    namingTraditionFact:
      'In Yoruba culture, "Oruko ni ro omo"—a name shapes the character of a child.',
    audioPronunciationText: 'Babatunde. Yoruba name meaning Father has returned.'
  },
  {
    id: 'name-sipho',
    name: 'Sipho',
    pronunciation: 'See-poh',
    tribe: 'Zulu & Xhosa',
    country: 'South Africa',
    region: 'Southern Africa',
    language: 'isiZulu / isiXhosa',
    gender: 'MALE',
    category: 'VIRTUE_CHARACTER',
    meaning: 'Gift / Divine Blessing',
    spiritualSignificance:
      'The child is recognized as an unearned, sacred present from the ancestors and uMvelinqangi.',
    namingTraditionFact:
      'Zulu names directly articulate the emotions of the parents at the exact moment of birth.',
    audioPronunciationText: 'Sipho. Zulu name meaning Gift or Divine Blessing.'
  },
  {
    id: 'name-wanjiku',
    name: 'Wanjiku',
    pronunciation: 'Wahn-jee-koo',
    tribe: 'Kikuyu (Agĩkũyũ)',
    country: 'Kenya',
    region: 'East Africa',
    language: 'Gĩkũyũ',
    gender: 'FEMALE',
    category: 'ANCESTRAL_BLESSING',
    meaning: 'Foundational Mother (One of the Nine Sacred Daughters)',
    spiritualSignificance:
      'Wanjiku was the matriarch of the Anjiku clan, celebrated in oral history for industry and loyalty.',
    namingTraditionFact:
      'Kikuyu naming follows a strict ancestral rotation honoring paternal and maternal grandmothers.',
    audioPronunciationText: 'Wanjiku. Kikuyu name honoring one of the nine sacred ancestral mothers.'
  },
  {
    id: 'name-baraka',
    name: 'Baraka',
    pronunciation: 'Bah-rah-kah',
    tribe: 'Swahili & Coastal East Africa',
    country: 'Tanzania, Kenya, Zanzibar',
    region: 'East Africa',
    language: 'Kiswahili',
    gender: 'MALE',
    category: 'VIRTUE_CHARACTER',
    meaning: 'Blessing / Divine Favor',
    spiritualSignificance:
      'An enduring source of good fortune and uplifting energy for all who cross their path.',
    namingTraditionFact:
      'Widely cherished across coastal East African trading ports from Mombasa to Zanzibar.',
    audioPronunciationText: 'Baraka. Swahili name meaning Blessing.'
  }
];

export const COMMON_WORDS_DATA: CommonWordEntity[] = [
  // ==========================================
  // UGANDAN LANGUAGES (Luganda, Leb Lango, Lumasaaba)
  // ==========================================
  {
    id: 'word-oli-otya',
    word: 'Oli otya?',
    pronunciation: 'Oh-lee oh-chah',
    englishMeaning: 'How are you? (Greeting)',
    language: 'Luganda',
    tribeOrCommunity: 'Baganda & Central Uganda',
    region: 'East Africa',
    category: 'GREETING',
    culturalNote:
      'The warm everyday greeting across Kampala and Buganda. The standard reply is "Gyendi" (I am well / I am here).',
    exampleSentence: 'Oli otya, mukwano gwange?',
    exampleTranslation: 'How are you, my friend?',
    audioPronunciationText: 'Oli otya. Luganda greeting for how are you.'
  },
  {
    id: 'word-webale-nnyo',
    word: 'Webale nnyo',
    pronunciation: 'Weh-bah-leh nyo',
    englishMeaning: 'Thank you very much',
    language: 'Luganda',
    tribeOrCommunity: 'Baganda',
    region: 'East Africa',
    category: 'CELEBRATION',
    culturalNote:
      'Showing gratitude is essential in Ugandan etiquette. Often spoken with a slight respectful bow or hand clasp.',
    exampleSentence: 'Webale nnyo ku lwa emmere ennungi.',
    exampleTranslation: 'Thank you very much for the delicious food.',
    audioPronunciationText: 'Webale nnyo. Luganda for thank you very much.'
  },
  {
    id: 'word-kale',
    word: 'Kale',
    pronunciation: 'Kah-leh',
    englishMeaning: 'Okay / You are welcome / With pleasure',
    language: 'Luganda',
    tribeOrCommunity: 'Ugandan vernacular',
    region: 'East Africa',
    category: 'WISDOM_PHILOSOPHY',
    culturalNote:
      'One of the most versatile and beloved words in Uganda: it signifies agreement, warm hospitality, goodbye, and "you are welcome" all in one!',
    exampleSentence: 'Kale, tugende!',
    exampleTranslation: 'Okay, let us go!',
    audioPronunciationText: 'Kale. Universal Ugandan word for okay and you are welcome.'
  },
  {
    id: 'word-mirembe',
    word: 'Mirembe',
    pronunciation: 'Mee-rehm-beh',
    englishMeaning: 'Peace / Harmony',
    language: 'Luganda',
    tribeOrCommunity: 'Buganda',
    region: 'East Africa',
    category: 'WISDOM_PHILOSOPHY',
    culturalNote:
      'A deeply spiritual blessing. "Emirembe gya Katonda" means the enduring peace of the Creator.',
    exampleSentence: 'Mirembe gibeere nammwe.',
    exampleTranslation: 'May peace abide with you all.',
    audioPronunciationText: 'Mirembe. Luganda word for peace and harmony.'
  },
  {
    id: 'word-kop-ango',
    word: 'Kop ango?',
    pronunciation: 'Kohp ahn-goh',
    englishMeaning: 'What is the news? / How are you?',
    language: 'Leb Lango',
    tribeOrCommunity: 'Lango',
    region: 'East Africa',
    category: 'GREETING',
    culturalNote:
      'The friendly greeting in Lira and Northern Uganda. The cheerful reply is "Kop pe" (No trouble / All is peaceful).',
    exampleSentence: 'Kop ango, owada?',
    exampleTranslation: 'What is the news, my brother?',
    audioPronunciationText: 'Kop ango. Lango greeting for what is the news.'
  },
  {
    id: 'word-apwoyo-matek',
    word: 'Apwoyo matek',
    pronunciation: 'Ah-pwoh-yoh mah-tehk',
    englishMeaning: 'Thank you very much indeed',
    language: 'Leb Lango',
    tribeOrCommunity: 'Lango & Northern Uganda',
    region: 'East Africa',
    category: 'CELEBRATION',
    culturalNote:
      'Expresses immense gratitude for kindness, hospitality, or help rendered in the community.',
    exampleSentence: 'Apwoyo matek pi kony megi.',
    exampleTranslation: 'Thank you very much indeed for your assistance.',
    audioPronunciationText: 'Apwoyo matek. Lango phrase for thank you very much.'
  },
  {
    id: 'word-mulembe',
    word: 'Mulembe!',
    pronunciation: 'Moo-lehm-beh',
    englishMeaning: 'Peace! / Warm Greetings!',
    language: 'Lumasaaba / Lugisu',
    tribeOrCommunity: 'Bamasaba / Bagisu',
    region: 'East Africa',
    category: 'GREETING',
    culturalNote:
      'The proud greeting on Mount Elgon. When someone calls "Mulembe!", the community enthusiastically answers "Mulembe muno!" (Immense peace!).',
    exampleSentence: 'Mulembe khukhola, babandu ba Masaba!',
    exampleTranslation: 'Peaceful greetings, people of Mount Masaba!',
    audioPronunciationText: 'Mulembe. Bagisu greeting for peace and warmth.'
  },
  {
    id: 'word-wanyala-naabi',
    word: 'Wanyala naabi',
    pronunciation: 'Wah-nyah-lah nah-bee',
    englishMeaning: 'Thank you so very much',
    language: 'Lumasaaba / Lugisu',
    tribeOrCommunity: 'Bamasaba (Mbale)',
    region: 'East Africa',
    category: 'CELEBRATION',
    culturalNote:
      'Shared after a warm bowl of Malewa bamboo soup or when welcoming travelers to the slopes of Mount Elgon.',
    exampleSentence: 'Wanyala naabi khulwa kamakanda kano.',
    exampleTranslation: 'Thank you so very much for these beans and meal.',
    audioPronunciationText: 'Wanyala naabi. Bagisu phrase for thank you so very much.'
  },
  {
    id: 'word-gyebale-ko',
    word: 'Gyebale ko!',
    pronunciation: 'Jyeh-bah-leh koh',
    englishMeaning: 'Well done! / Thank you for your good work!',
    language: 'Luganda',
    tribeOrCommunity: 'Buganda',
    region: 'East Africa',
    category: 'GREETING',
    culturalNote:
      'The quintessential daily Ugandan greeting acknowledging anyone working in fields, offices, shops, or schoolrooms.',
    exampleSentence: 'Gyebale ko emirimu, mukwano gwange!',
    exampleTranslation: 'Well done with your work, my good friend!',
    audioPronunciationText: 'Gyebale ko. Luganda greeting meaning well done and thank you for your work.'
  },
  {
    id: 'word-oraire-ota',
    word: 'Oraire ota?',
    pronunciation: 'Oh-rye-reh oh-tah',
    englishMeaning: 'Good morning / How did you sleep?',
    language: 'Runyoro-Rutooro',
    tribeOrCommunity: 'Bunyoro & Toro (Kitara)',
    region: 'East Africa',
    category: 'GREETING',
    culturalNote:
      'The polite morning inquiry in Western Uganda. The gentle reply is "Ndaire kurungi" (I slept well).',
    exampleSentence: 'Oraire ota, Akiiki?',
    exampleTranslation: 'Good morning, how did you sleep, Akiiki?',
    audioPronunciationText: 'Oraire ota. Runyoro-Rutooro morning greeting for how did you sleep.'
  },
  {
    id: 'word-webale-muno',
    word: 'Webale muno',
    pronunciation: 'Weh-bah-leh moo-noh',
    englishMeaning: 'Thank you very much indeed',
    language: 'Runyoro-Rutooro',
    tribeOrCommunity: 'Bunyoro & Toro',
    region: 'East Africa',
    category: 'CELEBRATION',
    culturalNote:
      'Spoken with warm sincerity when receiving a gift, sharing hospitality, or completing a task.',
    exampleSentence: 'Webale muno obugabirizi bwawe.',
    exampleTranslation: 'Thank you very much indeed for your generosity.',
    audioPronunciationText: 'Webale muno. Runyoro-Rutooro phrase for thank you very much indeed.'
  },
  {
    id: 'word-itye-maber',
    word: 'Itye maber?',
    pronunciation: 'Ee-tyeh mah-behr',
    englishMeaning: 'Are you well? / Peace to you',
    language: 'Leb Lango',
    tribeOrCommunity: 'Lango',
    region: 'East Africa',
    category: 'GREETING',
    culturalNote:
      'The heartfelt personal greeting in Lira. The customary response is "Atye maber" (I am very well).',
    exampleSentence: 'Itye maber, lwak?',
    exampleTranslation: 'Are you all well, people?',
    audioPronunciationText: 'Itye maber. Lango greeting for are you well.'
  },
  {
    id: 'word-kadodi',
    word: 'Kadodi',
    pronunciation: 'Kah-doh-dee',
    englishMeaning: 'The rhythm and spirit of the mountain drum',
    language: 'Lumasaaba / Lugisu',
    tribeOrCommunity: 'Bamasaba / Bagisu',
    region: 'East Africa',
    category: 'CELEBRATION',
    culturalNote:
      'The world-renowned polyrhythmic percussion and dance rhythm that gathers thousands along the foothills of Mount Elgon.',
    exampleSentence: 'Kadodi kano kasangaza emitima gyonna.',
    exampleTranslation: 'This Kadodi drumming brings rejoicing to all hearts.',
    audioPronunciationText: 'Kadodi. The energetic traditional drumming and dance rhythm of Mount Elgon.'
  },

  // ==========================================
  // PAN-AFRICAN COMMON WORDS
  // ==========================================
  {
    id: 'word-jambo',
    word: 'Jambo / Hujambo',
    pronunciation: 'Jahm-boh / Hoo-jahm-boh',
    englishMeaning: 'Hello / How are you?',
    language: 'Kiswahili',
    tribeOrCommunity: 'Swahili & East African community',
    region: 'East Africa',
    category: 'GREETING',
    culturalNote:
      'The classic friendly greeting. The reply to "Hujambo" is "Sijambo" (I have no worries / I am well).',
    exampleSentence: 'Hujambo rafiki yangu?',
    exampleTranslation: 'How are you, my friend?',
    audioPronunciationText: 'Hujambo. Swahili greeting for Hello.'
  },
  {
    id: 'word-asante-sana',
    word: 'Asante sana',
    pronunciation: 'Ah-sahn-teh sah-nah',
    englishMeaning: 'Thank you very much',
    language: 'Kiswahili',
    tribeOrCommunity: 'East African Coast & Great Lakes',
    region: 'East Africa',
    category: 'CELEBRATION',
    culturalNote:
      'Showing gratitude is central to East African warmth. Spoken with a smile or hand over the heart.',
    exampleSentence: 'Asante sana kwa chakula kitamu.',
    exampleTranslation: 'Thank you very much for the delicious food.',
    audioPronunciationText: 'Asante sana. Swahili for Thank you very much.'
  },
  {
    id: 'word-bawo-ni',
    word: 'Bawo ni',
    pronunciation: 'Bah-woh nee',
    englishMeaning: 'How are things? / How are you doing?',
    language: 'Yorùbá',
    tribeOrCommunity: 'Yoruba people',
    region: 'West Africa',
    category: 'GREETING',
    culturalNote:
      'A relaxed, warm greeting between friends. To elders, you use respectful honorifics like "E nle o" or "E kaaro".',
    exampleSentence: 'Bawo ni, ore mi?',
    exampleTranslation: 'How are you, my friend?',
    audioPronunciationText: 'Bawo ni. Yoruba greeting for how are things.'
  },
  {
    id: 'word-sawubona',
    word: 'Sawubona / Sanibonani',
    pronunciation: 'Sah-woo-boh-nah / Sah-nee-boh-nah-nee',
    englishMeaning: 'I see you / We acknowledge your existence and soul',
    language: 'isiZulu',
    tribeOrCommunity: 'amaZulu',
    region: 'Southern Africa',
    category: 'GREETING',
    culturalNote:
      'Deeply poetic: "Sawubona" means far more than hello—it declares "I bear witness to you, your dignity, and your ancestors."',
    exampleSentence: 'Sawubona mngane wami!',
    exampleTranslation: 'I see you, my friend!',
    audioPronunciationText: 'Sawubona. Zulu greeting meaning I see and honor you.'
  },
  {
    id: 'word-ubuntu',
    word: 'Ubuntu',
    pronunciation: 'Oo-boon-too',
    englishMeaning: 'Humanity toward others / I am because we are',
    language: 'isiZulu / isiXhosa',
    tribeOrCommunity: 'Pan-Bantu & Southern Africa',
    region: 'Southern Africa',
    category: 'WISDOM_PHILOSOPHY',
    culturalNote:
      'The foundational moral philosophy of Southern Africa: a person is made whole only in relationship with their community.',
    exampleSentence: 'Ubuntu bubonakala lapho siphana khona.',
    exampleTranslation: 'Ubuntu is shown when we share with one another.',
    audioPronunciationText: 'Ubuntu. African philosophy meaning I am because we are.'
  },
  {
    id: 'word-akwaaba',
    word: 'Akwaaba',
    pronunciation: 'Ah-kwah-bah',
    englishMeaning: 'Welcome!',
    language: 'Asante Twi',
    tribeOrCommunity: 'Akan / Ashanti',
    region: 'West Africa',
    category: 'GREETING',
    culturalNote:
      'Emblazoned at Ghana’s gates, airports, and village thresholds. Visitors are offered a calabash of cool fresh water.',
    exampleSentence: 'Akwaaba ba fie!',
    exampleTranslation: 'Welcome home!',
    audioPronunciationText: 'Akwaaba. Akan word for Welcome.'
  }
];

export const TRADITIONAL_HOMES_DATA: TraditionalHomeEntity[] = [
  // ==========================================
  // UGANDAN ARCHITECTURE
  // ==========================================
  {
    id: 'kasubi-tombs-palace',
    name: 'Kasubi Tombs (Muzibu-Azaala-Mpanga)',
    nativeName: 'Muzibu-Azaala-Mpanga',
    tribe: 'Baganda (Ganda)',
    region: 'East Africa',
    country: 'Uganda',
    architectureType: 'Monumental Organic Thatch Dome (UNESCO World Heritage Site)',
    materialsUsed: ['Spear Grass Thatch (Kisasi)', 'Elephant Grass Reeds', 'Bamboo Poles', 'Barkcloth Wall Lining'],
    thermalDesignFeature:
      'The colossal thatched dome—spanning 31 meters in diameter and 7.5 meters high—breathes continuously. It stays refreshingly cool under the equatorial sun and traps soothing warmth at night without any artificial energy.',
    culturalSignificance:
      'The supreme masterpiece of Ganda architectural engineering, constructed entirely without nails or metal fasteners. It served as the palace of King Mutesa I before becoming the sacred burial sanctuary of four Buganda kings (Kabakas).',
    communityFunction:
      'Surrounded by a circular royal courtyard, drum houses (Ndwoogo), and enclosures where clan elders maintain ancient regalia and court wisdom.',
    funFact:
      'Muzibu-Azaala-Mpanga is one of the largest organic dome structures in sub-Saharan Africa, constructed by 52 master craft guilds from each of Buganda\'s clans!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The majestic thatched dome palace of Muzibu-Azaala-Mpanga (Kasubi Tombs) in Kampala, Uganda.',
    audioPronunciationText: 'Muzibu-Azaala-Mpanga. The UNESCO-protected royal thatched dome palace of Buganda in Uganda.'
  },
  {
    id: 'banyankole-ekyikari-kraal',
    name: 'Banyankole Pastoral Kraal (Ekyikari)',
    nativeName: 'Ekyikari / Orurembo',
    tribe: 'Banyankole & Bahima (Bachwezi Descendants)',
    region: 'East Africa',
    country: 'Uganda',
    architectureType: 'Circular Acacia Boma & Beehive Ghee Compound',
    materialsUsed: ['Acacia Thorn Enclosure', 'Thatch Grass', 'Woven Reed Churn Racks (Ebyanzi)', 'Smoked Gourd Stands'],
    thermalDesignFeature:
      'The beehive thatch huts feature low aerodynamic curves positioned along windward ridges, creating natural cross-ventilation while repelling savannah insects.',
    culturalSignificance:
      'Centered completely around the veneration of the pearl-horned Ankole cattle (Enyambo). The kraal contains the sacred milk chamber (Oruhimbi) where carved wooden milk pots (Ebyanzi) are smoked with fragrant herbs.',
    communityFunction:
      'Houses multi-generational pastoral families with a central night-pen for hundreds of calves and cows, protecting the herd from nocturnal predators.',
    funFact:
      'The horns of the Ankole cattle in these kraals can span over 2.4 meters from tip to tip, acting as natural thermal radiators that cool the cows’ blood!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Traditional pastoral homestead in Western Uganda, home of the legendary long-horned Ankole cattle.',
    audioPronunciationText: 'Ekyikari. Traditional pastoral kraal of the Banyankole and Bachwezi descendants in Uganda.'
  },
  {
    id: 'bamasaba-mountain-terraces',
    name: 'Bamasaba Mountain Terrace Homes',
    nativeName: 'Inzu y’omumugongo',
    tribe: 'Bamasaba / Bagisu',
    region: 'East Africa',
    country: 'Uganda',
    architectureType: 'Volcanic Cliff Terrace Dwellings with Bamboo Windbreaks',
    materialsUsed: ['Hand-hewn Basalt Stone', 'Bamboo Stems', 'Red Volcanic Clay Plaster', 'Banana Fiber Thatch'],
    thermalDesignFeature:
      'Built into the mountain slope with thick stone terrace footings that prevent landslides, shielded by high bamboo windbreaks that deflect cold gusts off Mount Elgon’s caldera.',
    culturalSignificance:
      'Reflects the master agro-engineering of the Bagisu, who cultivate Arabica coffee, bananas, and Malewa bamboo on 45-degree volcanic slopes without soil erosion.',
    communityFunction:
      'Familial homesteads clustered along the mountain ridges of Wanale and Sipi, connected by terraced stone footpaths overlooking the cascading waterfalls.',
    funFact:
      'The roof thatch incorporates dried banana leaves treated with wood ash, making the mountain roofs naturally resistant to alpine frosts!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Terraced mountain homesteads nestled among the lush bamboo and banana groves of Mount Elgon in Eastern Uganda.',
    audioPronunciationText: 'Bamasaba terrace homes. Sustainable volcanic mountain dwellings on Mount Elgon in Uganda.'
  },
  {
    id: 'lango-otogo-homestead',
    name: 'Lango Raised Granary & Thatched Compound (Otogo & Ot)',
    nativeName: 'Otogo & Ot me Lango',
    tribe: 'Lango',
    region: 'East Africa',
    country: 'Uganda',
    architectureType: 'Elevated Rodent-Proof Wicker Granary & Polished Earth Thatched Home',
    materialsUsed: ['Woven Bamboo & Sorghum Stalks', 'Hardwood Stilts', 'Clay & Cow Dung Floor Sealant', 'Spear Grass Thatch'],
    thermalDesignFeature:
      'The Otogo granaries sit high on smooth wooden stilts ringed with hardwood baffles that prevent mice or insects from reaching the harvest, while allowing cooling savannah wind to circulate under stored sorghum and millet.',
    culturalSignificance:
      'The center of Lango household security and the practice of Awany (equal food sharing). The living home (Ot) features exterior earthen walls polished with black graphite clay and white kaolin geometric patterns.',
    communityFunction:
      'Circular family boma containing central drying yard for finger millet, elevated granaries, cattle enclosure, and grandmother’s storytelling hearth.',
    funFact:
      'Lango granaries are woven so tightly from river bamboo reeds that dried grain stored inside can stay fresh and dry for over five years!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Traditional elevated thatch granaries and homestead in the savannah plains of Northern Uganda.',
    audioPronunciationText: 'Otogo. The elevated traditional wicker granaries and homes of the Lango in Uganda.'
  },
  {
    id: 'bigo-bya-mugenyi-citadel',
    name: 'Bachwezi Earthen Ramparts & Royal Court (Bigo bya Mugenyi)',
    nativeName: 'Bigo bya Mugenyi ("Fort of the Stranger")',
    tribe: 'Chewzi / Bachwezi',
    region: 'East Africa',
    country: 'Uganda',
    architectureType: 'Monumental Concentric Trench & Earthen Rampart Fortress',
    materialsUsed: ['Dug Granite & Laterite Stone', 'Compacted Earthen Ramparts', 'Acacia Palisade Gates', 'Reed Royal Courtyard'],
    thermalDesignFeature:
      'The deep defensive ditches—carved over 5 meters deep into solid rock spanning over 10 kilometers—created natural air drainage and microclimates that kept cattle kraals cool during scorching midday heat.',
    culturalSignificance:
      'The grandest archaeological earthwork complex in East Africa, serving as the 14th-century capital of the Bachwezi Empire of Kitara where King Wamara and Mugenyi held royal assemblies.',
    communityFunction:
      'Safeguarded thousands of royal long-horned Ankole cattle, housed royal blacksmiths forging copper regalia, and provided sacred spirit ritual spaces.',
    funFact:
      'The total length of the concentric earthwork trenches at Bigo bya Mugenyi exceeds 10 kilometers, hand-excavated using iron hoes centuries before modern machinery!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The ancient green earthworks and sweeping ridges of Bigo bya Mugenyi in Western Uganda.',
    audioPronunciationText: 'Bigo bya Mugenyi. The ancient Bachwezi earthen rampart fortress of the Empire of Kitara.'
  },

  // ==========================================
  // PAN-AFRICAN ARCHITECTURE (Distinct Photos)
  // ==========================================
  {
    id: 'musgum-teleuk',
    name: 'Musgum Mud Shell (Teleuk)',
    nativeName: 'Tòlék / Teleuk',
    tribe: 'Musgum',
    region: 'Central Africa',
    country: 'Cameroon & Chad',
    architectureType: 'Cathedrals of Earthen Arches (Catenary Vaults)',
    materialsUsed: ['Local Clay & Silt Soil', 'Coarse Sand', 'Straw & Organic Fibers', 'Natural Sap Sealant'],
    thermalDesignFeature:
      'The tall conical dome (reaching up to 9 meters) acts as a natural chimney. Rising hot air escapes out of the top circular hatch, drawing cool breezes into the living floor without electricity.',
    culturalSignificance:
      'Constructed with exquisite mathematical precision in a perfect inverted catenary curve. The intricate geometric rib patterns on the exterior serve as functional scaffolding during maintenance and channel torrential rainwater safely to the ground.',
    communityFunction:
      'Arranged in circular familial compounds of up to five domes connected by low earthen walls, including father’s chamber, mother’s chamber, granary, and livestock shelter.',
    funFact:
      'The ribs on the outside of the Musgum shell are molded at the exact spacing of human footsteps so builders can climb to the top without needing ladders!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The towering geometric earthen domes of the Musgum people in Cameroon.',
    audioPronunciationText: 'Teleuk. The soaring earthen mud shell houses of the Musgum in Cameroon.'
  },
  {
    id: 'great-zimbabwe-citadel',
    name: 'Great Zimbabwe Dry-Stone Citadels',
    nativeName: 'Dzimba-dza-Mabwe ("Houses of Stone")',
    tribe: 'Shona (Karanga / Rozvi Ancestors)',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    architectureType: 'Monumental Dry-Stone Masonry (No Mortar)',
    materialsUsed: ['Hand-quarried Granite Blocks', 'Daga (Gravelly Earthen Plaster)', 'Soapstone Carvings'],
    thermalDesignFeature:
      'The massive granite walls—up to 11 meters high and 6 meters thick—absorb the hot African sun during midday and gently radiate warmth into interior courtyards during chilly plateau nights.',
    culturalSignificance:
      'The capital of an immense medieval trading empire (11th to 15th centuries) that traded gold, copper, and ivory as far as Persia, India, and China. Built entirely without mortar using master dry-stone interlocking physics.',
    communityFunction:
      'The Great Enclosure housed the royal court, sacred chambers, and the iconic Conical Tower, flanked by the Hill Complex that served as the spiritual sanctuary.',
    funFact:
      'The entire nation of Zimbabwe takes its proud name directly from this architectural wonder: "Dzimba-dza-mabwe" means "Honored Houses of Stone" in Shona.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The curved granite dry-stone walls of Great Zimbabwe, built without a single drop of mortar.',
    audioPronunciationText: 'Great Zimbabwe. The ancient monumental stone citadel of the Shona empire.'
  },
  {
    id: 'dogon-toguna-granaries',
    name: 'Dogon Toguna & Sandstone Granaries',
    nativeName: 'Tòguna (Shelter of Whispering Councils)',
    tribe: 'Dogon',
    region: 'West Africa',
    country: 'Mali',
    architectureType: 'Cliff-hugging Earthen Shelters & Millet Granaries',
    materialsUsed: ['Sun-dried Mud Bricks', 'Carved Wood Pillars', 'Millet Thatch Roof (Eight Layers)'],
    thermalDesignFeature:
      'The eight-layer thatched roof of the Toguna provides immense shade against the searing Sahel sun, dropping interior temperatures by more than 15 degrees Celsius.',
    culturalSignificance:
      'The Toguna ceiling is deliberately built very low (around 1.2 to 1.5 meters). If an elder gets angry or excited during a town dispute and tries to jump up to shout, he bumps his head! This ingenious constraint forces everyone to sit down and resolve conflicts peacefully.',
    communityFunction:
      'The Toguna stands at the heart of every Dogon village as the supreme justice hall, flanked by male and female millet granaries with masterfully carved wooden doors depicting ancestral spirits.',
    funFact:
      'Dogon granaries are elevated on stone stilts to keep termites and desert mice away from the precious grain harvest.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The low-roofed Toguna council shelter and carved wooden granaries of the Dogon in Mali.',
    audioPronunciationText: 'Toguna. The low-roofed Dogon council house designed so no one can stand up in anger.'
  },
  {
    id: 'zulu-indlu-beehive',
    name: 'Zulu Beehive Indlu',
    nativeName: 'Indlu / iQhugwana',
    tribe: 'Zulu (amaZulu)',
    region: 'Southern Africa',
    country: 'South Africa',
    architectureType: 'Spherical Woven Dome Architecture',
    materialsUsed: ['Bent Sapling Poles (Wattle)', 'Braided Thatch Grass (Tambootie)', 'Polished Cow-Dung Floor'],
    thermalDesignFeature:
      'The thick woven thatch breathes during humid coastal summers. During winter rains, the thatch grass expands and seals tightly, making the dome completely waterproof.',
    culturalSignificance:
      'The spherical shape has no sharp corners, reflecting the Zulu view of life as a continuous, harmonious circle.',
    communityFunction:
      'Arranged in circular fortified family homesteads (umuZi) surrounding a central cattle byre (isibaya).',
    funFact:
      'The aerodynamic curved dome of the Zulu Indlu is so wind-resistant that severe coastal storms flow effortlessly over its surface without damaging the structure.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Traditional woven Zulu beehive indlu huts overlooking the lush valleys of KwaZulu-Natal.',
    audioPronunciationText: 'Indlu. The aerodynamic woven beehive dome house of the Zulu people.'
  },
  {
    id: 'ashanti-courtyard-palace',
    name: 'Ashanti Courtyard Shrines & Palaces',
    nativeName: 'Aban / Asante Fie',
    tribe: 'Ashanti (Asante)',
    region: 'West Africa',
    country: 'Ghana',
    architectureType: 'Timber-Framed Quadrangle Courtyard Architecture',
    materialsUsed: ['Timber Framework (Wattle & Daub)', 'Stepped Mud Plinths', 'Steep Palm-Thatch Roofs', 'Bas-Relief Plaster Reliefs'],
    thermalDesignFeature:
      'Steep high-pitched roofs immediately drain tropical monsoon deluges, while the open central courtyard creates convection airflow that continually pulls cool shaded air through all four surrounding rooms.',
    culturalSignificance:
      'The lower walls are adorned with intricate raised plaster reliefs depicting sacred proverbs, birds, coiled serpents, and Adinkra symbols that celebrate harmony, courage, and respect for ancestors.',
    communityFunction:
      'Composed of four rectangular rooms facing inward toward an open sunlit courtyard: one room for the shrine, one for communal kitchen, one for elders, and one for guests.',
    funFact:
      'The Ashanti courtyard houses are so celebrated for their cultural beauty that the remaining 10 traditional buildings are protected as UNESCO World Heritage sites.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'Traditional Ashanti courtyard architecture with high-relief plaster Adinkra symbols.',
    audioPronunciationText: 'Asante Fie. The UNESCO-protected courtyard architecture of the Ashanti kingdom in Ghana.'
  },
  {
    id: 'maasai-manyatta-boma',
    name: 'Maasai Manyatta & Enkang',
    nativeName: 'Enkang / Manyatta',
    tribe: 'Maasai',
    region: 'East Africa',
    country: 'Kenya & Tanzania',
    architectureType: 'Curved Loaf-Shaped Modular Savannah Dwellings',
    materialsUsed: ['Flexible Acacia Poles', 'Grass & Reeds', 'Clay and Cow Dung Insulation', 'Thorn Acacia Fencing (Boma)'],
    thermalDesignFeature:
      'The natural mixture of red clay, ash, and cow dung cures into a concrete-hard, waterproof shell that stays remarkably cool during the blistering midday sun and preserves hearth heat at night.',
    culturalSignificance:
      'In Maasai society, homes are traditionally engineered and built entirely by women. Women design the layout, weave the saplings, and plaster the walls, while men herd cattle and protect the compound perimeter.',
    communityFunction:
      'Built in a large protective circle surrounded by a thick, circular thorn-bush fence (boma) that keeps apex predators away from children and cattle herds.',
    funFact:
      'Because the roof is low and curved like a loaf of bread, Maasai homes blend seamlessly into the savannah landscape.',
    illustrationUrl:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The circular acacia boma and earth-plastered Manyatta homes of the Maasai.',
    audioPronunciationText: 'Manyatta. The curved earth-insulated homes built by Maasai women in the savannah.'
  },
  {
    id: 'nubian-vault-homes',
    name: 'Nubian Vaulted Painted Homes',
    nativeName: 'Nuba Nefe / Goubba',
    tribe: 'Nubian',
    region: 'North Africa',
    country: 'Egypt & Sudan',
    architectureType: 'Mud-Brick Barrel Vaults & Domes (Zero-Wood Technique)',
    materialsUsed: ['Nile River Silt Mud-Bricks', 'Lime Plaster', 'Vibrant Natural Pigments'],
    thermalDesignFeature:
      'The thick mud-brick curved vaults require no wood timbers and keep interior rooms up to 20 degrees cooler than the desert heat outside.',
    culturalSignificance:
      'The outer facades are celebrated worldwide for their dazzling hand-painted murals: bright geometric pyramids, palm trees, crocodiles, boats on the Nile, and greeting blessings that welcome every passerby.',
    communityFunction:
      'Spacious multi-family complexes with high-walled courtyards where families brew spiced tea and children play in shaded sand gardens overlooking the Nile.',
    funFact:
      'The Nubian Vault technique is so ancient and sustainable that architects today are reintroducing it across Africa to build green, timber-free schools and homes!',
    illustrationUrl:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    illustrationCaption:
      'The brightly painted vaulted earthen homes of Nubian villages along the Nile.',
    audioPronunciationText: 'Nubian Vault. The timber-free painted earthen dome homes of the Nile valley.'
  }
];
