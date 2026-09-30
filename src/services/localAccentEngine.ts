/**
 * African Local Accent & Pronunciation Engine
 * Uses Web Speech API with regional voice heuristics, syllable-timed cadence shaping,
 * and authentic African phonetic mappings for children.
 */

export type AccentRegion = 'west-african' | 'east-african' | 'southern-african' | 'north-african';

export interface SyllableItem {
  text: string;
  phoneticSpoken: string;
  isStressed?: boolean;
}

export interface AfricanWordPronunciation {
  id: string;
  word: string;
  indigenousScript?: string;
  phoneticDisplay: string;
  spokenPhonetic: string;
  syllables: SyllableItem[];
  language: string;
  region: 'West Africa' | 'East Africa' | 'Southern Africa' | 'Central Africa' | 'North Africa';
  country: string;
  defaultAccent: AccentRegion;
  meaning: string;
  pronunciationTip: string;
  culturalNote?: string;
}

export const AFRICAN_WORDS_DICTIONARY: AfricanWordPronunciation[] = [
  {
    id: 'akwaaba',
    word: 'Akwaaba',
    phoneticDisplay: 'Ah-KWAH-bah',
    spokenPhonetic: 'Ah-kwah-bah',
    syllables: [
      { text: 'Ah', phoneticSpoken: 'Ah' },
      { text: 'KWAH', phoneticSpoken: 'kwah', isStressed: true },
      { text: 'bah', phoneticSpoken: 'bah' }
    ],
    language: 'Twi (Akan)',
    region: 'West Africa',
    country: 'Ghana',
    defaultAccent: 'west-african',
    meaning: 'Welcome! You have arrived safely among friends.',
    pronunciationTip: 'Give the middle "KWAH" a bright, joyful bounce with an open mouth!'
  },
  {
    id: 'mbira',
    word: 'Mbira dzaVadzimu',
    phoneticDisplay: 'M-BEE-rah dzah vah-DZEE-moo',
    spokenPhonetic: 'Em-bee-rah zah vah-dzee-moo',
    syllables: [
      { text: 'M-BEE', phoneticSpoken: 'Em-bee', isStressed: true },
      { text: 'rah', phoneticSpoken: 'rah' },
      { text: 'dzah', phoneticSpoken: 'zah' },
      { text: 'vah', phoneticSpoken: 'vah' },
      { text: 'DZEE', phoneticSpoken: 'dzee', isStressed: true },
      { text: 'moo', phoneticSpoken: 'moo' }
    ],
    language: 'Shona',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    defaultAccent: 'southern-african',
    meaning: 'Thumb piano; literally "Voice of the Ancestors".',
    pronunciationTip: 'Gently hum the "M" sound before springing softly into "BEE-rah"!'
  },
  {
    id: 'kora',
    word: 'Kora',
    phoneticDisplay: 'KOH-rah',
    spokenPhonetic: 'Koh-rah',
    syllables: [
      { text: 'KOH', phoneticSpoken: 'Koh', isStressed: true },
      { text: 'rah', phoneticSpoken: 'rah' }
    ],
    language: 'Mandinka / Wolof',
    region: 'West Africa',
    country: 'Gambia / Senegal / Mali',
    defaultAccent: 'west-african',
    meaning: 'The 21-string calabash harp of West African storytellers (Griots).',
    pronunciationTip: 'The "O" is round like a drum, and the "r" rolls gently on your tongue.'
  },
  {
    id: 'ngege',
    word: 'Ngege',
    phoneticDisplay: 'N-GAY-gay',
    spokenPhonetic: 'En-gay-gay',
    syllables: [
      { text: 'N-GAY', phoneticSpoken: 'En-gay', isStressed: true },
      { text: 'gay', phoneticSpoken: 'gay' }
    ],
    language: 'Luo & Swahili',
    region: 'East Africa',
    country: 'Uganda & Kenya',
    defaultAccent: 'east-african',
    meaning: 'The shimmering sweet tilapia fish of Lake Victoria.',
    pronunciationTip: 'In Luo and Swahili, "Ng" starts softly inside your throat like a hum!'
  },
  {
    id: 'kampala',
    word: 'Kampala',
    phoneticDisplay: 'Kahm-PAH-lah',
    spokenPhonetic: 'Kahm-pah-lah',
    syllables: [
      { text: 'Kahm', phoneticSpoken: 'Kahm' },
      { text: 'PAH', phoneticSpoken: 'pah', isStressed: true },
      { text: 'lah', phoneticSpoken: 'lah' }
    ],
    language: 'Luganda',
    region: 'East Africa',
    country: 'Uganda',
    defaultAccent: 'east-african',
    meaning: 'From "Kasozi k’Empala" — "The Hill of the Impala Antelope".',
    pronunciationTip: 'Swahili & Luganda words naturally stretch the second-to-last syllable ("PAH")!'
  },
  {
    id: 'oli-otya',
    word: 'Oli otya?',
    phoneticDisplay: 'Oh-lee OH-tyah',
    spokenPhonetic: 'Oh-lee oh-tyah',
    syllables: [
      { text: 'Oh', phoneticSpoken: 'Oh' },
      { text: 'lee', phoneticSpoken: 'lee' },
      { text: 'OH', phoneticSpoken: 'Oh', isStressed: true },
      { text: 'tyah', phoneticSpoken: 'tyah' }
    ],
    language: 'Luganda',
    region: 'East Africa',
    country: 'Uganda',
    defaultAccent: 'east-african',
    meaning: 'How are you? The warmest greeting heard across the hills of Kampala.',
    pronunciationTip: 'Say it like two gentle rising ripples across the lake: "Oh-lee... Oh-tyah!"'
  },
  {
    id: 'gyendi',
    word: 'Gyendi!',
    phoneticDisplay: 'JEN-dee',
    spokenPhonetic: 'Jen-dee',
    syllables: [
      { text: 'JEN', phoneticSpoken: 'Jen', isStressed: true },
      { text: 'dee', phoneticSpoken: 'dee' }
    ],
    language: 'Luganda',
    region: 'East Africa',
    country: 'Uganda',
    defaultAccent: 'east-african',
    meaning: 'I am here, well and thriving! (Response to Oli otya).',
    pronunciationTip: 'The "Gy" makes a cheerful "J" sound, as in "Gentle"!'
  },
  {
    id: 'mosi-oa-tunya',
    word: 'Mosi-oa-Tunya',
    phoneticDisplay: 'MO-see oh-ah TOON-yah',
    spokenPhonetic: 'Moh-see oh-ah toon-yah',
    syllables: [
      { text: 'MO', phoneticSpoken: 'Moh', isStressed: true },
      { text: 'see', phoneticSpoken: 'see' },
      { text: 'oh', phoneticSpoken: 'oh' },
      { text: 'ah', phoneticSpoken: 'ah' },
      { text: 'TOON', phoneticSpoken: 'toon', isStressed: true },
      { text: 'yah', phoneticSpoken: 'yah' }
    ],
    language: 'Lozi / Kololo',
    region: 'Southern Africa',
    country: 'Zambia / Zimbabwe',
    defaultAccent: 'southern-african',
    meaning: 'The Smoke That Thunders (Victoria Falls).',
    pronunciationTip: 'Let the rhythm roll like thunder: "MO-see... oh-ah... TOON-yah!"'
  },
  {
    id: 'nyansa',
    word: 'Nyansa',
    phoneticDisplay: 'N-YAHN-sah',
    spokenPhonetic: 'En-yahn-sah',
    syllables: [
      { text: 'N-YAHN', phoneticSpoken: 'En-yahn', isStressed: true },
      { text: 'sah', phoneticSpoken: 'sah' }
    ],
    language: 'Twi (Akan)',
    region: 'West Africa',
    country: 'Ghana',
    defaultAccent: 'west-african',
    meaning: 'Deep practical wisdom, cleverness, and understanding.',
    pronunciationTip: 'Blend "N" and "Y" together like "canyon" — Nyahn-sah!'
  },
  {
    id: 'sankofa',
    word: 'Sankofa',
    phoneticDisplay: 'Sahn-KOH-fah',
    spokenPhonetic: 'Sahn-koh-fah',
    syllables: [
      { text: 'Sahn', phoneticSpoken: 'Sahn' },
      { text: 'KOH', phoneticSpoken: 'Koh', isStressed: true },
      { text: 'fah', phoneticSpoken: 'fah' }
    ],
    language: 'Akan',
    region: 'West Africa',
    country: 'Ghana',
    defaultAccent: 'west-african',
    meaning: 'Go back and fetch it — learning from the past to build the future.',
    pronunciationTip: 'Akan proverbs say: "It is not wrong to go back for that which you forgot."'
  },
  {
    id: 'hanga',
    word: 'Hanga',
    phoneticDisplay: 'HAHN-gah',
    spokenPhonetic: 'Hahn-gah',
    syllables: [
      { text: 'HAHN', phoneticSpoken: 'Hahn', isStressed: true },
      { text: 'gah', phoneticSpoken: 'gah' }
    ],
    language: 'Shona',
    region: 'Southern Africa',
    country: 'Zimbabwe',
    defaultAccent: 'southern-african',
    meaning: 'The helmeted guineafowl bird with starlight polka dots.',
    pronunciationTip: 'Both "a" vowels are open like "father"!'
  },
  {
    id: 'ingagi',
    word: 'Ingagi',
    phoneticDisplay: 'In-GAH-gee',
    spokenPhonetic: 'In-gah-gee',
    syllables: [
      { text: 'In', phoneticSpoken: 'In' },
      { text: 'GAH', phoneticSpoken: 'Gah', isStressed: true },
      { text: 'gee', phoneticSpoken: 'gee' }
    ],
    language: 'Kinyarwanda',
    region: 'Central Africa',
    country: 'Rwanda / DRC',
    defaultAccent: 'east-african',
    meaning: 'The gentle mountain gorilla of the Virunga volcanic bamboo forest.',
    pronunciationTip: 'Pronounce the "g" as a hard "g" like in "garden"!'
  },
  {
    id: 'injera',
    word: 'Injera',
    indigenousScript: 'እንጀራ',
    phoneticDisplay: 'In-JEH-rah',
    spokenPhonetic: 'In-jeh-rah',
    syllables: [
      { text: 'In', phoneticSpoken: 'In' },
      { text: 'JEH', phoneticSpoken: 'Jeh', isStressed: true },
      { text: 'rah', phoneticSpoken: 'rah' }
    ],
    language: 'Amharic',
    region: 'East Africa',
    country: 'Ethiopia',
    defaultAccent: 'east-african',
    meaning: 'Fermented sourdough flatbread made from ancient teff grain.',
    pronunciationTip: 'Keep the "JEH" short and crisp, rolling smoothly into "rah".'
  },
  {
    id: 'tajin',
    word: 'Tajin',
    indigenousScript: 'طاجين',
    phoneticDisplay: 'Tah-JEEN',
    spokenPhonetic: 'Tah-jeen',
    syllables: [
      { text: 'Tah', phoneticSpoken: 'Tah' },
      { text: 'JEEN', phoneticSpoken: 'Jeen', isStressed: true }
    ],
    language: 'Moroccan Arabic / Amazigh',
    region: 'North Africa',
    country: 'Morocco',
    defaultAccent: 'north-african',
    meaning: 'Clay cone-pot and slow-simmered fragrant stew with saffron and lemons.',
    pronunciationTip: 'Hold the "JEEN" syllable a tiny second longer with warmth!'
  },
  {
    id: 'samaki-wa-kupaka',
    word: 'Samaki wa Kupaka',
    phoneticDisplay: 'Sah-MAH-kee wah koo-PAH-kah',
    spokenPhonetic: 'Sah-mah-kee wah koo-pah-kah',
    syllables: [
      { text: 'Sah', phoneticSpoken: 'Sah' },
      { text: 'MAH', phoneticSpoken: 'Mah', isStressed: true },
      { text: 'kee', phoneticSpoken: 'kee' },
      { text: 'wah', phoneticSpoken: 'wah' },
      { text: 'koo', phoneticSpoken: 'koo' },
      { text: 'PAH', phoneticSpoken: 'Pah', isStressed: true },
      { text: 'kah', phoneticSpoken: 'kah' }
    ],
    language: 'Swahili',
    region: 'East Africa',
    country: 'Tanzania / Kenya',
    defaultAccent: 'east-african',
    meaning: 'Grilled fresh fish coated with rich spiced coconut curry sauce.',
    pronunciationTip: 'Every vowel in Swahili is pure and crisp: a=ah, e=eh, i=ee, o=oh, u=oo!'
  },
  {
    id: 'mbuyu',
    word: 'Mbuyu',
    phoneticDisplay: 'M-BOO-yoo',
    spokenPhonetic: 'Em-boo-yoo',
    syllables: [
      { text: 'M-BOO', phoneticSpoken: 'Em-boo', isStressed: true },
      { text: 'yoo', phoneticSpoken: 'yoo' }
    ],
    language: 'Swahili',
    region: 'East Africa',
    country: 'Kenya / Tanzania',
    defaultAccent: 'east-african',
    meaning: 'The great Baobab tree (Tree of Life).',
    pronunciationTip: 'Hum the "M" on your lips before releasing the rich "BOO-yoo"!'
  },
  {
    id: 'oldoinyo-oibor',
    word: 'Oldoinyo Oibor',
    phoneticDisplay: 'Ol-DOYN-yo OY-bor',
    spokenPhonetic: 'Ol-doyn-yo oy-bor',
    syllables: [
      { text: 'Ol', phoneticSpoken: 'Ol' },
      { text: 'DOYN', phoneticSpoken: 'Doyn', isStressed: true },
      { text: 'yo', phoneticSpoken: 'yo' },
      { text: 'OY', phoneticSpoken: 'Oy', isStressed: true },
      { text: 'bor', phoneticSpoken: 'bor' }
    ],
    language: 'Maa (Maasai)',
    region: 'East Africa',
    country: 'Tanzania / Kenya',
    defaultAccent: 'east-african',
    meaning: 'White Mountain — the Maasai name for Mount Kilimanjaro.',
    pronunciationTip: 'The Maasai language has a soaring, musical rhythm of open plains.'
  },
  {
    id: 'hoerikwaggo',
    word: 'Hoerikwaggo',
    phoneticDisplay: 'HOY-ree-kwah-goh',
    spokenPhonetic: 'Hoy-ree-kwah-goh',
    syllables: [
      { text: 'HOY', phoneticSpoken: 'Hoy', isStressed: true },
      { text: 'ree', phoneticSpoken: 'ree' },
      { text: 'kwah', phoneticSpoken: 'kwah' },
      { text: 'goh', phoneticSpoken: 'goh' }
    ],
    language: 'Khoekhoe',
    region: 'Southern Africa',
    country: 'South Africa',
    defaultAccent: 'southern-african',
    meaning: 'Mountain in the Sea — indigenous name for Table Mountain in Cape Town.',
    pronunciationTip: 'Khoekhoe words honor the sea breezes and mountain streams.'
  },
  {
    id: 'kente',
    word: 'Kente',
    phoneticDisplay: 'KEN-tay',
    spokenPhonetic: 'Ken-tay',
    syllables: [
      { text: 'KEN', phoneticSpoken: 'Ken', isStressed: true },
      { text: 'tay', phoneticSpoken: 'tay' }
    ],
    language: 'Akan',
    region: 'West Africa',
    country: 'Ghana',
    defaultAccent: 'west-african',
    meaning: 'Royal handwoven basket-weave silk and cotton cloth of Ashanti kings.',
    pronunciationTip: 'The "tay" is crisp and bright like golden yellow threads.'
  }
];

class LocalAccentEngine {
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private voicesCache: SpeechSynthesisVoice[] = [];
  private slowTimeoutIds: number[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voicesCache = window.speechSynthesis.getVoices();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.voicesCache.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voicesCache = window.speechSynthesis.getVoices();
    }
    return this.voicesCache;
  }

  /**
   * Selects the closest native voice matching the requested African accent
   */
  private selectVoiceForAccent(accent: AccentRegion): {
    voice: SpeechSynthesisVoice | null;
    rate: number;
    pitch: number;
  } {
    const voices = this.getVoices();

    if (accent === 'west-african') {
      // Look for Nigerian English, Ghanaian, or African English locales
      const westVoice = voices.find(
        (v) =>
          v.lang === 'en-NG' ||
          v.lang === 'en-GH' ||
          v.lang.startsWith('yo') ||
          v.lang.startsWith('ha') ||
          v.lang.startsWith('ig') ||
          v.name.toLowerCase().includes('nigeria')
      );
      if (westVoice) {
        return { voice: westVoice, rate: 0.95, pitch: 1.05 };
      }
      // Prosodic fallback: Syllable-timed West African cadence
      const neutralVoice = voices.find((v) => v.lang.startsWith('en')) || null;
      return { voice: neutralVoice, rate: 0.92, pitch: 1.08 };
    }

    if (accent === 'east-african') {
      // Look for Swahili, Kenyan, or Tanzanian voices
      const eastVoice = voices.find(
        (v) =>
          v.lang === 'sw' ||
          v.lang.startsWith('sw-') ||
          v.lang === 'en-KE' ||
          v.lang === 'en-TZ' ||
          v.name.toLowerCase().includes('swahili') ||
          v.name.toLowerCase().includes('kenya')
      );
      if (eastVoice) {
        return { voice: eastVoice, rate: 0.9, pitch: 1.0 };
      }
      // Prosodic fallback: Warm melodic penultimate stress
      const neutralVoice = voices.find((v) => v.lang.startsWith('en')) || null;
      return { voice: neutralVoice, rate: 0.88, pitch: 1.02 };
    }

    if (accent === 'southern-african') {
      // Look for South African English, Zulu, or Xhosa
      const southVoice = voices.find(
        (v) =>
          v.lang === 'en-ZA' ||
          v.lang.startsWith('zu') ||
          v.lang.startsWith('xh') ||
          v.name.toLowerCase().includes('south africa')
      );
      if (southVoice) {
        return { voice: southVoice, rate: 0.93, pitch: 0.98 };
      }
      const neutralVoice = voices.find((v) => v.lang.startsWith('en')) || null;
      return { voice: neutralVoice, rate: 0.9, pitch: 0.97 };
    }

    if (accent === 'north-african') {
      // Look for Arabic or French-North African
      const northVoice = voices.find(
        (v) =>
          v.lang.startsWith('ar') ||
          v.lang === 'ar-EG' ||
          v.lang === 'ar-MA' ||
          v.name.toLowerCase().includes('arabic')
      );
      if (northVoice) {
        return { voice: northVoice, rate: 0.9, pitch: 1.0 };
      }
      const neutralVoice = voices.find((v) => v.lang.startsWith('en')) || null;
      return { voice: neutralVoice, rate: 0.88, pitch: 1.02 };
    }

    return { voice: null, rate: 0.92, pitch: 1.0 };
  }

  public stopSpeaking(): void {
    this.slowTimeoutIds.forEach((id) => window.clearTimeout(id));
    this.slowTimeoutIds = [];
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.activeUtterance = null;
  }

  public getWordById(id: string): AfricanWordPronunciation | undefined {
    return AFRICAN_WORDS_DICTIONARY.find(
      (w) => w.id.toLowerCase() === id.toLowerCase() || w.word.toLowerCase() === id.toLowerCase()
    );
  }

  public findMatchingWord(text: string): AfricanWordPronunciation | undefined {
    const clean = text.toLowerCase().trim();
    return AFRICAN_WORDS_DICTIONARY.find(
      (w) =>
        clean.includes(w.id.toLowerCase()) ||
        clean.includes(w.word.toLowerCase()) ||
        w.word.toLowerCase().includes(clean)
    );
  }

  /**
   * Pronounce a full word using the authentic local accent profile and acoustic tuning
   */
  public playFullPronunciation(
    wordOrId: string,
    overrideAccent?: AccentRegion,
    onEnd?: () => void
  ): void {
    this.stopSpeaking();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    const wordData = this.getWordById(wordOrId) || this.findMatchingWord(wordOrId);
    const accent = overrideAccent || wordData?.defaultAccent || 'west-african';
    const textToSpeak = wordData?.spokenPhonetic || wordOrId;

    const { voice, rate, pitch } = this.selectVoiceForAccent(accent);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => {
      this.activeUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.activeUtterance = null;
      onEnd?.();
    };

    this.activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Pronounce an individual syllable clearly for kids to tap and repeat
   */
  public playSyllable(
    syllableText: string,
    accent: AccentRegion = 'west-african',
    onEnd?: () => void
  ): void {
    this.stopSpeaking();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    const { voice, pitch } = this.selectVoiceForAccent(accent);
    const utterance = new SpeechSynthesisUtterance(syllableText);
    if (voice) {
      utterance.voice = voice;
    }
    // Syllables are enunciated slightly slower and clearer
    utterance.rate = 0.82;
    utterance.pitch = pitch;

    utterance.onend = () => {
      this.activeUtterance = null;
      onEnd?.();
    };

    this.activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Play syllable-by-syllable slow guided learning practice
   */
  public playSlowSyllablePractice(
    wordOrId: string,
    accent: AccentRegion,
    onActiveSyllable: (index: number) => void,
    onComplete: () => void
  ): void {
    this.stopSpeaking();

    const wordData = this.getWordById(wordOrId) || this.findMatchingWord(wordOrId);
    if (!wordData || wordData.syllables.length === 0) {
      this.playFullPronunciation(wordOrId, accent, onComplete);
      return;
    }

    const syllables = wordData.syllables;
    let accumulatedTime = 0;

    syllables.forEach((syl, index) => {
      const tid = window.setTimeout(() => {
        onActiveSyllable(index);
        this.playSyllable(syl.phoneticSpoken, accent);
      }, accumulatedTime);
      this.slowTimeoutIds.push(tid);

      // 650ms between each syllable
      accumulatedTime += 750;
    });

    // Finally say the full word together
    const finalTid = window.setTimeout(() => {
      onActiveSyllable(-1);
      this.playFullPronunciation(wordData.id, accent, onComplete);
    }, accumulatedTime + 200);
    this.slowTimeoutIds.push(finalTid);
  }
}

export const localAccentEngine = new LocalAccentEngine();
