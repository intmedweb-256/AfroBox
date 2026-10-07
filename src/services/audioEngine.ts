/**
 * Audio Engine for AfroBox: Storylands
 * Handles both:
 * 1. Community narration / read-aloud via Web Speech & Audio API
 * 2. Private Child Voice Recording ("Read it yourself") via MediaRecorder
 */

import { africanInstruments, InstrumentType } from './africanInstruments';
import { localAccentEngine, AccentRegion } from './localAccentEngine';

export interface AudioEngineListeners {
  onParagraphChange?: (paragraphIndex: number) => void;
  onEnd?: () => void;
  onError?: (err: string) => void;
}

export type NarratorEngineType = 'AI_GRIOT' | 'BROWSER_SPEECH';
export type AIGriotVoice = 'Kore' | 'Fenrir' | 'Puck' | 'Zephyr' | 'Charon';

export interface GriotVoicePersona {
  id: AIGriotVoice;
  name: string;
  title: string;
  avatar: string;
  description: string;
  stylePrompt: string;
  gender: 'female' | 'male';
  recommendedPitch: number;
  recommendedRate: number;
}

export const GRIOT_VOICE_PERSONAS: GriotVoicePersona[] = [
  {
    id: 'Kore',
    name: 'Mama Griot',
    title: 'Warm Matriarch Storyteller',
    avatar: '👵🏾',
    description: 'Nurturing, melodic, engaging oral storytelling for young children',
    stylePrompt: 'Warm, nurturing, melodic African matriarch storyteller with gentle pacing and expressive pauses for young children',
    gender: 'female',
    recommendedPitch: 1.05,
    recommendedRate: 0.90
  },
  {
    id: 'Fenrir',
    name: 'Baba Griot',
    title: 'Wise Village Elder',
    avatar: '👴🏾',
    description: 'Deep, resonant, ancestral voice steeped in wisdom and epic legends',
    stylePrompt: 'Deep, resonant, wise African village elder with commanding warmth and thoughtful cadence',
    gender: 'male',
    recommendedPitch: 0.82,
    recommendedRate: 0.88
  },
  {
    id: 'Puck',
    name: 'Brother Kwaku',
    title: 'Lively Folktale Griot',
    avatar: '👦🏾',
    description: 'Playful, animated, rhythmic narrator perfect for Anansi & animal fables',
    stylePrompt: 'Cheerful, lively, animated African storyteller with high energy, playful rhythm, and warmth',
    gender: 'male',
    recommendedPitch: 1.14,
    recommendedRate: 1.02
  },
  {
    id: 'Zephyr',
    name: 'Sister Amina',
    title: 'Gentle Bedtime Storyteller',
    avatar: '🌸',
    description: 'Soft, soothing, tranquil voice ideal for quiet focus and evening reading',
    stylePrompt: 'Gentle, soothing, tranquil, and clear voice with peaceful storytelling cadence for children',
    gender: 'female',
    recommendedPitch: 1.08,
    recommendedRate: 0.84
  },
  {
    id: 'Charon',
    name: 'Elder Osei',
    title: 'Historical Chronicler',
    avatar: '📜',
    description: 'Measured, noble, reflective narrator for geography and kingdom lore',
    stylePrompt: 'Noble, measured, clear, and dignified African storyteller presenting rich cultural history',
    gender: 'male',
    recommendedPitch: 0.88,
    recommendedRate: 0.92
  }
];

export interface VoicePreferences {
  voiceURI?: string;
  pitch: number;
  rate: number;
  presetName?: 'WARM_STORYTELLER' | 'CLEAR_TEACHER' | 'YOUTHFUL_GRIOT' | 'CUSTOM';
  narratorEngine?: NarratorEngineType;
  aiVoiceName?: AIGriotVoice;
}

const VOICE_PREFS_KEY = 'afrobox_voice_preferences_v3';

const DEFAULT_VOICE_PREFS: VoicePreferences = {
  voiceURI: '',
  pitch: 0.96, // warm, comforting African storytelling pitch
  rate: 0.90,  // measured, natural pace for children
  presetName: 'WARM_STORYTELLER',
  narratorEngine: 'AI_GRIOT',
  aiVoiceName: 'Kore'
};

export class AudioEngine {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingStartTime = 0;
  private activeAudioElement: HTMLAudioElement | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private ttsAudioCache: Map<string, string> = new Map();
  private abortController: AbortController | null = null;
  private isProcessingAiSpeech = false;
  private primedAudio: HTMLAudioElement | null = null;
  // Garbage collection protection for Microsoft Edge and Chromium V8
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          this.cachedVoices = v;
        }
      };
      // Fallback check for mobile Chrome, Edge, and tablet browsers
      setTimeout(() => {
        if (this.cachedVoices.length === 0) {
          this.cachedVoices = window.speechSynthesis.getVoices();
        }
      }, 300);
    }
  }

  /**
   * Safely speaks an utterance with garbage-collection retention and Edge unpause safeguard.
   */
  public safeSpeak(
    utterance: SpeechSynthesisUtterance,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    // In Microsoft Edge, speech often gets stuck in a paused state after backgrounding
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {}

    // Retain in Set so Microsoft Edge / Chromium V8 garbage collector does not kill it mid-playback
    this.activeUtterances.add(utterance);

    const cleanup = () => {
      this.activeUtterances.delete(utterance);
      if (this.currentUtterance === utterance) {
        this.currentUtterance = null;
      }
    };

    const origEnd = utterance.onend;
    utterance.onend = (e) => {
      cleanup();
      origEnd?.call(utterance, e);
      onEnd?.();
    };

    const origError = utterance.onerror;
    utterance.onerror = (e) => {
      cleanup();
      origError?.call(utterance, e);
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        onError?.(e.error || 'Speech playback notice');
      }
    };

    this.currentUtterance = utterance;

    try {
      window.speechSynthesis.speak(utterance);
      // Double check Edge unpause immediately after enqueueing
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e: any) {
      cleanup();
      onError?.(e?.message || 'Speech execution failed');
    }
  }

  /**
   * Synchronously prime audio element during user gesture so subsequent
   * async network responses can play on mobile/tablet Chrome and Edge without autoplay policy rejection.
   */
  public primeAudioForMobile(): void {
    if (typeof window === 'undefined') return;
    try {
      if (!this.primedAudio) {
        this.primedAudio = new Audio();
      }
      this.primedAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      this.primedAudio.play().then(() => {
        if (this.primedAudio) {
          this.primedAudio.pause();
          this.primedAudio.currentTime = 0;
        }
      }).catch(() => {});
    } catch {}
  }

  /**
   * Intelligently selects a matching browser voice, pitch, and speed for each Griot Persona.
   * Fully supports Chrome, Microsoft Edge (Online Natural Neural voices), and Mobile/Tablet Safari/Android.
   */
  public static getBestVoiceForPersona(
    personaId: AIGriotVoice,
    voices: SpeechSynthesisVoice[]
  ): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } {
    let available = voices;
    if ((!available || available.length === 0) && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      available = window.speechSynthesis.getVoices();
    }
    if (!available || available.length === 0) {
      return { voice: null, pitch: 1.0, rate: 0.95 };
    }

    const persona = GRIOT_VOICE_PERSONAS.find((p) => p.id === personaId) || GRIOT_VOICE_PERSONAS[0];
    const isMalePersona = persona.gender === 'male';

    const isVoiceMale = (v: SpeechSynthesisVoice) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('male') ||
        n.includes('david') ||
        n.includes('george') ||
        n.includes('guy') ||
        n.includes('brian') ||
        n.includes('mark') ||
        n.includes('oliver') ||
        n.includes('richard') ||
        n.includes('daniel') ||
        n.includes('ryan') ||
        n.includes('alex') ||
        n.includes('james') ||
        n.includes('andrew') ||
        n.includes('luke') ||
        n.includes('christopher') ||
        n.includes('eric') ||
        n.includes('steffan') ||
        n.includes('william') ||
        n.includes('liam') ||
        n.includes('prabhat') ||
        n.includes('asad') ||
        n.includes('connor') ||
        n.includes('mitchell') ||
        n.includes('wayne') ||
        n.includes('-m-') ||
        n.includes('x-sfg') // Android TTS male default
      );
    };

    const isVoiceFemale = (v: SpeechSynthesisVoice) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('female') ||
        n.includes('zira') ||
        n.includes('hazel') ||
        n.includes('susan') ||
        n.includes('jenny') ||
        n.includes('aria') ||
        n.includes('sonia') ||
        n.includes('catherine') ||
        n.includes('kore') ||
        n.includes('samantha') ||
        n.includes('victoria') ||
        n.includes('leah') ||
        n.includes('libby') ||
        n.includes('natasha') ||
        n.includes('clara') ||
        n.includes('neerja') ||
        n.includes('uzma') ||
        n.includes('emily') ||
        n.includes('molly') ||
        n.includes('michelle') ||
        n.includes('luna') ||
        n.includes('rosa') ||
        n.includes('-f-') ||
        n.includes('x-tpd') // Android TTS female default
      );
    };

    // Filter by persona gender
    let genderFiltered = available.filter((v) => (isMalePersona ? isVoiceMale(v) : isVoiceFemale(v)));
    if (genderFiltered.length === 0) {
      genderFiltered = available;
    }

    // 1. Regional African voices (Nigeria, South Africa, Kenya, Ghana, Swahili, etc.)
    // In Microsoft Edge, this automatically matches "Microsoft Leah Online (Natural) - English (South Africa)"
    // or "Microsoft Luke Online (Natural) - English (South Africa)"!
    const africanVoice = genderFiltered.find((v) => {
      const l = v.lang.toLowerCase();
      const n = v.name.toLowerCase();
      return (
        l === 'en-ng' ||
        l === 'en-za' ||
        l === 'en-ke' ||
        l === 'en-gh' ||
        l.startsWith('sw') ||
        l.startsWith('yo') ||
        l.startsWith('zu') ||
        n.includes('nigeria') ||
        n.includes('south africa') ||
        n.includes('kenya') ||
        n.includes('swahili')
      );
    });

    // 2. Persona-specific natural matches across Chrome, Edge, and Safari
    let chosenVoice: SpeechSynthesisVoice | undefined;

    if (personaId === 'Fenrir') {
      // Baba Griot: Prioritize deep, resonant male voices
      chosenVoice =
        africanVoice ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('microsoft') && (v.name.toLowerCase().includes('luke') || v.name.toLowerCase().includes('ryan') || v.name.toLowerCase().includes('guy'))) ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('google uk english male')) ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('google us english')) ||
        genderFiltered.find((v) => isVoiceMale(v)) ||
        genderFiltered[0];
    } else if (personaId === 'Puck') {
      // Brother Kwaku: Energetic, rhythmic young male
      chosenVoice =
        africanVoice ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('microsoft') && (v.name.toLowerCase().includes('steffan') || v.name.toLowerCase().includes('ryan') || v.name.toLowerCase().includes('christopher'))) ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('google')) ||
        genderFiltered.find((v) => v.lang.toLowerCase().includes('en-au')) ||
        genderFiltered.find((v) => isVoiceMale(v)) ||
        genderFiltered[0];
    } else if (personaId === 'Zephyr') {
      // Sister Amina: Gentle, soothing female voice
      chosenVoice =
        africanVoice ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('microsoft') && (v.name.toLowerCase().includes('sonia') || v.name.toLowerCase().includes('libby') || v.name.toLowerCase().includes('jenny'))) ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('google uk english female')) ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('aria') || v.name.toLowerCase().includes('jenny')) ||
        genderFiltered.find((v) => isVoiceFemale(v)) ||
        genderFiltered[0];
    } else if (personaId === 'Charon') {
      // Elder Osei: Measured, dignified male
      chosenVoice =
        africanVoice ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('microsoft') && (v.name.toLowerCase().includes('ryan') || v.name.toLowerCase().includes('guy') || v.name.toLowerCase().includes('natural'))) ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('google uk english male')) ||
        genderFiltered.find((v) => isVoiceMale(v)) ||
        genderFiltered[0];
    } else {
      // Mama Kore: Warm, nurturing matriarch
      chosenVoice =
        africanVoice ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('microsoft') && (v.name.toLowerCase().includes('leah') || v.name.toLowerCase().includes('jenny') || v.name.toLowerCase().includes('aria'))) ||
        genderFiltered.find((v) => v.name.toLowerCase().includes('google uk english female')) ||
        genderFiltered.find((v) => isVoiceFemale(v)) ||
        genderFiltered[0];
    }

    return {
      voice: chosenVoice || AudioEngine.getBestNaturalVoice(available),
      pitch: persona.recommendedPitch,
      rate: persona.recommendedRate
    };
  }

  public static getBestNaturalVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    let available = voices;
    if ((!available || available.length === 0) && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      available = window.speechSynthesis.getVoices();
    }
    if (!available || available.length === 0) return null;

    // Helper to identify and filter out known legacy robotic SAPI5 desktop synths
    const isRoboticSynth = (n: string) => {
      const lower = n.toLowerCase();
      return (
        lower.includes('espeak') ||
        lower.includes('zarvox') ||
        lower.includes('trinoids') ||
        lower.includes('whisper') ||
        lower.includes('bad news') ||
        lower.includes('deranged')
      );
    };

    // 1. Regional African voices (Nigeria, Kenya, South Africa, Ghana, Swahili, Yoruba, Zulu)
    const africanVoice = available.find((v) => {
      const l = v.lang.toLowerCase();
      const n = v.name.toLowerCase();
      return (
        l === 'en-ng' ||
        l === 'en-za' ||
        l === 'en-ke' ||
        l === 'en-tz' ||
        l === 'en-gh' ||
        l === 'sw' ||
        l.startsWith('sw-') ||
        l.startsWith('yo') ||
        l.startsWith('ha') ||
        l.startsWith('ig') ||
        l.startsWith('zu') ||
        l.startsWith('xh') ||
        n.includes('nigeria') ||
        n.includes('south africa') ||
        n.includes('kenya') ||
        n.includes('swahili')
      );
    });
    if (africanVoice) return africanVoice;

    // 2. High-quality natural voices in Chrome Desktop:
    const googleUkFemale = available.find((v) => v.name.toLowerCase().includes('google uk english female'));
    if (googleUkFemale) return googleUkFemale;

    const googleUkMale = available.find((v) => v.name.toLowerCase().includes('google uk english male'));
    if (googleUkMale) return googleUkMale;

    const googleUs = available.find((v) => v.name.toLowerCase().includes('google us english'));
    if (googleUs) return googleUs;

    // 3. Online Natural/Neural voices
    const onlineNatural = available.find((v) => {
      const n = v.name.toLowerCase();
      return (
        !isRoboticSynth(n) &&
        (n.includes('natural') ||
          n.includes('neural') ||
          n.includes('online') ||
          n.includes('enhanced') ||
          n.includes('premium'))
      );
    });
    if (onlineNatural) return onlineNatural;

    // 4. Any other Google voice in English
    const anyGoogle = available.find(
      (v) => v.name.toLowerCase().includes('google') && v.lang.toLowerCase().startsWith('en')
    );
    if (anyGoogle) return anyGoogle;

    // 5. High-quality Commonwealth / British or Irish English
    const commonwealthNatural = available.find((v) => {
      const l = v.lang.toLowerCase();
      const n = v.name.toLowerCase();
      return !isRoboticSynth(n) && (l === 'en-gb' || l === 'en-ie' || l === 'en-au' || l === 'en-nz' || l === 'en-za');
    });
    if (commonwealthNatural) return commonwealthNatural;

    // 6. Any English voice that is NOT an obsolete synth
    const nonRobotic = available.find((v) => {
      const n = v.name.toLowerCase();
      return v.lang.toLowerCase().startsWith('en') && !isRoboticSynth(n);
    });
    if (nonRobotic) return nonRobotic;

    return available.find((v) => v.lang.toLowerCase().startsWith('en')) || available[0] || null;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) this.cachedVoices = v;
    }
    return this.cachedVoices;
  }

  public getVoicePreferences(): VoicePreferences {
    try {
      const data = localStorage.getItem(VOICE_PREFS_KEY);
      if (data) return { ...DEFAULT_VOICE_PREFS, ...JSON.parse(data) };
    } catch {}
    return { ...DEFAULT_VOICE_PREFS };
  }

  public saveVoicePreferences(prefs: Partial<VoicePreferences>): VoicePreferences {
    const current = this.getVoicePreferences();
    const updated = { ...current, ...prefs };
    try {
      localStorage.setItem(VOICE_PREFS_KEY, JSON.stringify(updated));
    } catch {}
    return updated;
  }

  // READ ALOUD / NARRATION PLAYBACK
  public speakParagraphs(
    paragraphs: string[],
    startIndex: number = 0,
    rateOverride?: number,
    listeners: AudioEngineListeners = {}
  ): void {
    this.stopSpeaking();
    this.primeAudioForMobile();

    const prefs = this.getVoicePreferences();
    const useAiGriot = prefs.narratorEngine !== 'BROWSER_SPEECH';

    if (useAiGriot) {
      this.speakParagraphsAi(paragraphs, startIndex, prefs, rateOverride, listeners);
    } else {
      this.speakParagraphsBrowser(paragraphs, startIndex, rateOverride, listeners);
    }
  }

  // AI Studio High-Fidelity Griot Narration
  private async speakParagraphsAi(
    paragraphs: string[],
    startIndex: number,
    prefs: VoicePreferences,
    rateOverride: number | undefined,
    listeners: AudioEngineListeners
  ): Promise<void> {
    let currentIndex = startIndex;
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    this.isProcessingAiSpeech = true;

    const persona =
      GRIOT_VOICE_PERSONAS.find((p) => p.id === (prefs.aiVoiceName || 'Kore')) ||
      GRIOT_VOICE_PERSONAS[0];

    const playNextParagraph = async () => {
      if (signal.aborted || !this.isProcessingAiSpeech) return;

      if (currentIndex >= paragraphs.length) {
        this.isProcessingAiSpeech = false;
        listeners.onEnd?.();
        return;
      }

      listeners.onParagraphChange?.(currentIndex);
      const textToSpeak = paragraphs[currentIndex]?.trim();

      if (!textToSpeak) {
        currentIndex++;
        playNextParagraph();
        return;
      }

      const cacheKey = `${persona.id}:${textToSpeak}`;
      let audioUrl = this.ttsAudioCache.get(cacheKey);

      if (!audioUrl) {
        try {
          const res = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: textToSpeak,
              voiceName: persona.id,
              style: persona.stylePrompt
            }),
            signal
          });

          if (!res.ok) {
            throw new Error(`TTS server returned status ${res.status}`);
          }

          const data = await res.json();
          if (data.audioUrl) {
            audioUrl = data.audioUrl;
            this.ttsAudioCache.set(cacheKey, audioUrl!);
          } else {
            throw new Error('No audio in response');
          }
        } catch (fetchErr: any) {
          if (signal.aborted) return;
          console.warn('AI TTS failed or unavailable, falling back to browser persona:', fetchErr);
          // Gracefully fallback to browser speech synthesis with persona voice mapping
          this.speakParagraphsBrowser(paragraphs, currentIndex, rateOverride, listeners);
          return;
        }
      }

      if (signal.aborted) return;

      // Play audio chunk
      const audio = this.playAudioUrl(
        audioUrl!,
        () => {
          currentIndex++;
          playNextParagraph();
        },
        (err) => {
          console.warn('AI Audio play error, falling back to browser persona:', err);
          this.speakParagraphsBrowser(paragraphs, currentIndex, rateOverride, listeners);
        }
      );

      // Apply playback speed
      if (audio && rateOverride) {
        audio.playbackRate = rateOverride;
      }
    };

    playNextParagraph();
  }

  // Device Browser Web Speech API Narration (Enhanced for Chrome Desktop & Mobile & Tablets)
  public speakParagraphsBrowser(
    paragraphs: string[],
    startIndex: number = 0,
    rateOverride?: number,
    listeners: AudioEngineListeners = {}
  ): void {
    if (!('speechSynthesis' in window)) {
      listeners.onError?.('Speech audio is not supported in this browser.');
      return;
    }

    this.stopSpeaking();

    let currentIndex = startIndex;
    const voices = this.getAvailableVoices();
    const prefs = this.getVoicePreferences();

    let selectedVoice: SpeechSynthesisVoice | null = null;
    let computedPitch = 1.0;
    let computedRate = rateOverride !== undefined ? rateOverride : (prefs.rate || 0.95);

    // If Griot persona is requested, map to distinct voice + pitch + speed
    if (prefs.narratorEngine === 'AI_GRIOT') {
      const match = AudioEngine.getBestVoiceForPersona(prefs.aiVoiceName || 'Kore', voices);
      selectedVoice = match.voice;
      computedPitch = match.pitch;
      computedRate = rateOverride !== undefined ? rateOverride : match.rate;
    } else {
      // Offline / Custom device voice selection
      if (prefs.voiceURI) {
        selectedVoice = voices.find((v) => v.voiceURI === prefs.voiceURI) || null;
      }
      if (!selectedVoice) {
        selectedVoice = AudioEngine.getBestNaturalVoice(voices);
      }
      computedPitch = prefs.pitch || 1.0;
      computedRate = rateOverride !== undefined ? rateOverride : (prefs.rate || 0.95);
    }

    const playNextParagraph = () => {
      if (currentIndex >= paragraphs.length) {
        listeners.onEnd?.();
        return;
      }

      listeners.onParagraphChange?.(currentIndex);
      const fullText = paragraphs[currentIndex]?.trim() || '';

      if (!fullText) {
        currentIndex++;
        playNextParagraph();
        return;
      }

      // Break long text into natural oral storytelling sentences (avoiding monotone run-on robot cadence)
      const rawSentences = fullText.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
      const sentences = rawSentences.length > 0 ? rawSentences : [fullText];
      let sentenceIdx = 0;

      const speakSentence = () => {
        if (sentenceIdx >= sentences.length) {
          currentIndex++;
          playNextParagraph();
          return;
        }

        const sentenceText = sentences[sentenceIdx];
        const utterance = new SpeechSynthesisUtterance(sentenceText);
        utterance.rate = computedRate;
        utterance.pitch = computedPitch;

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        this.safeSpeak(
          utterance,
          () => {
            sentenceIdx++;
            setTimeout(() => {
              speakSentence();
            }, 120);
          },
          (err) => {
            listeners.onError?.(`Audio playback notice: ${err}`);
          }
        );
      };

      speakSentence();
    };

    playNextParagraph();
  }

  public async testVoiceSample(
    sampleText: string = 'Welcome to AfroBox! Let us explore the wonders, wisdom, and living traditions of our ancestors together.',
    voiceURI?: string,
    pitch?: number,
    rate?: number,
    aiVoice?: AIGriotVoice,
    engine?: NarratorEngineType,
    onEnd?: () => void
  ): Promise<void> {
    this.stopSpeaking();
    this.primeAudioForMobile();
    const prefs = this.getVoicePreferences();
    const targetEngine = engine || prefs.narratorEngine || 'AI_GRIOT';

    if (targetEngine === 'AI_GRIOT') {
      const selectedAiVoice = aiVoice || prefs.aiVoiceName || 'Kore';
      const persona =
        GRIOT_VOICE_PERSONAS.find((p) => p.id === selectedAiVoice) || GRIOT_VOICE_PERSONAS[0];

      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: sampleText,
            voiceName: persona.id,
            style: persona.stylePrompt
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.audioUrl) {
            this.playAudioUrl(data.audioUrl, () => onEnd?.(), () => onEnd?.());
            return;
          }
        }
      } catch (err) {
        console.warn('AI voice preview failed, falling back to persona browser voice:', err);
      }

      // Persona-specific fallback on Web and Tablet
      if (!('speechSynthesis' in window)) {
        onEnd?.();
        return;
      }
      const voices = this.getAvailableVoices();
      const match = AudioEngine.getBestVoiceForPersona(selectedAiVoice, voices);
      const utterance = new SpeechSynthesisUtterance(sampleText);
      if (match.voice) utterance.voice = match.voice;
      utterance.pitch = pitch !== undefined ? pitch : match.pitch;
      utterance.rate = rate !== undefined ? rate : match.rate;
      this.safeSpeak(utterance, onEnd, () => onEnd?.());
      return;
    }

    // Fallback to browser voice test
    if (!('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    const voices = this.getAvailableVoices();
    const targetVoiceURI = voiceURI !== undefined ? voiceURI : prefs.voiceURI;
    const targetVoice = voices.find((v) => v.voiceURI === targetVoiceURI) || null;
    const chosenVoice = targetVoice || AudioEngine.getBestNaturalVoice(voices);

    const utterance = new SpeechSynthesisUtterance(sampleText);
    utterance.rate = rate !== undefined ? rate : (prefs.rate || 0.95);
    utterance.pitch = pitch !== undefined ? pitch : (prefs.pitch || 1.0);

    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    this.safeSpeak(utterance, onEnd, () => onEnd?.());
  }

  public pauseSpeaking(): void {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  public resumeSpeaking(): void {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  public stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
      this.activeUtterances.clear();
      this.currentUtterance = null;
    }
    this.stopAudioUrl();
  }

  public playAudioUrl(
    url: string,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): HTMLAudioElement {
    this.stopSpeaking();
    this.stopAudioUrl();

    let audio = this.primedAudio;
    if (!audio) {
      audio = new Audio();
    }
    this.primedAudio = null;
    this.activeAudioElement = audio;
    audio.src = url;

    audio.onended = () => {
      this.activeAudioElement = null;
      onEnd?.();
    };

    audio.onerror = () => {
      this.activeAudioElement = null;
      onError?.('Recorded audio playback encountered an issue.');
    };

    audio.play().catch((err) => {
      this.activeAudioElement = null;
      onError?.(err?.message || 'Playback failed');
    });

    return audio;
  }

  public stopAudioUrl(): void {
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement.currentTime = 0;
      this.activeAudioElement = null;
    }
  }

  public isAudioUrlPlaying(): boolean {
    return this.activeAudioElement !== null && !this.activeAudioElement.paused;
  }

  public async speakText(text: string, onEnd?: () => void): Promise<void> {
    const trimmed = text?.trim();
    if (!trimmed) return;
    this.stopSpeaking();
    this.primeAudioForMobile();

    const prefs = this.getVoicePreferences();
    const useAiGriot = prefs.narratorEngine !== 'BROWSER_SPEECH';

    if (useAiGriot) {
      const persona =
        GRIOT_VOICE_PERSONAS.find((p) => p.id === (prefs.aiVoiceName || 'Kore')) ||
        GRIOT_VOICE_PERSONAS[0];
      const cacheKey = `word:${persona.id}:${trimmed}`;
      let audioUrl = this.ttsAudioCache.get(cacheKey);

      if (!audioUrl) {
        try {
          const res = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: trimmed,
              voiceName: persona.id,
              style: 'Warm, natural, clear African educator pronouncing vocabulary with authentic cadence'
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.audioUrl) {
              audioUrl = data.audioUrl;
              this.ttsAudioCache.set(cacheKey, audioUrl!);
            }
          }
        } catch {
          // Graceful fallback to browser speech below
        }
      }

      if (audioUrl) {
        this.playAudioUrl(audioUrl, onEnd, () => {
          this.speakTextBrowserFallback(trimmed, onEnd);
        });
        return;
      }
    }

    this.speakTextBrowserFallback(trimmed, onEnd);
  }

  private speakTextBrowserFallback(text: string, onEnd?: () => void): void {
    if (!('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = this.getAvailableVoices();
    const prefs = this.getVoicePreferences();

    let selectedVoice: SpeechSynthesisVoice | null = null;
    let computedPitch = 1.0;
    let computedRate = 0.92;

    if (prefs.narratorEngine === 'AI_GRIOT') {
      const match = AudioEngine.getBestVoiceForPersona(prefs.aiVoiceName || 'Kore', voices);
      selectedVoice = match.voice;
      computedPitch = match.pitch;
      computedRate = match.rate;
    } else {
      if (prefs.voiceURI) {
        selectedVoice = voices.find((v) => v.voiceURI === prefs.voiceURI) || null;
      }
      if (!selectedVoice) {
        selectedVoice = AudioEngine.getBestNaturalVoice(voices);
      }
      computedPitch = prefs.pitch || 1.0;
      computedRate = prefs.rate || 0.92;
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = computedRate;
    utterance.pitch = computedPitch;

    this.safeSpeak(utterance, onEnd, () => onEnd?.());
  }

  // CHILD READING PRACTICE (RECORDING)
  public async startRecording(): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Microphone access is not supported by your device browser.');
    }

    this.audioChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this.mediaRecorder = new MediaRecorder(stream);
    this.recordingStartTime = Date.now();

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(250);
  }

  public stopRecording(): Promise<{ blob: Blob; dataUrl: string; durationSeconds: number }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        return reject(new Error('No active recording found'));
      }

      const durationSeconds = Math.round((Date.now() - this.recordingStartTime) / 1000);

      this.mediaRecorder.onstop = () => {
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.audioChunks, { type: mimeType });

        // Stop all tracks
        this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
        this.mediaRecorder = null;

        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            blob,
            dataUrl: reader.result as string,
            durationSeconds: Math.max(1, durationSeconds)
          });
        };
        reader.onerror = () => {
          // Fallback to object URL if data URL conversion fails
          resolve({
            blob,
            dataUrl: URL.createObjectURL(blob),
            durationSeconds: Math.max(1, durationSeconds)
          });
        };
        reader.readAsDataURL(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  public isRecordingActive(): boolean {
    return this.mediaRecorder !== null && this.mediaRecorder.state === 'recording';
  }

  // TACTILE WEB AUDIO SYNTHESIS FOR MAP DISCOVERIES
  public playSoundEffect(type: string): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'kora') {
        // Authentic resonant Kora harp pluck
        africanInstruments.playKoraString(392.0, 1.2); // G4 pluck
      } else if (type === 'mbira') {
        // Authentic Mbira chime with buzzing calabash resonator
        africanInstruments.playMbiraTine(293.66, 1.4);
      } else if (type === 'drum' || type === 'talking-drum') {
        // Authentic Talking Drum talking-bend tone
        africanInstruments.playTalkingDrum('talking-bend', 0.45);
      } else if (type === 'balafon') {
        // Resonant rosewood balafon bar
        africanInstruments.playBalafonBar(329.63, 0.75);
      } else if (type === 'hosho' || type === 'shekere') {
        // Beaded gourd rattle shake
        africanInstruments.playHoshoShake(true);
      } else if (type === 'chime' || type === 'collect') {
        // Pentatonic harp pluck notes
        const notes = [261.63, 329.63, 392.0, 440.0, 523.25, 659.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.4);
        });
      } else if (type === 'water' || type === 'fish') {
        // Shimmering water droplet
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'bird') {
        // Gentle bird chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1900, ctx.currentTime + 0.08);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === 'zoom' || type === 'wind') {
        // Whoosh tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        // Default gentle pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // AudioContext might be blocked until user gesture, safely ignore
    }
  }

  // AFRICAN INSTRUMENTS & LOCAL ACCENT HELPER METHODS
  public playInstrumentTune(type: InstrumentType, onComplete?: () => void): void {
    africanInstruments.playTraditionalTune(type, onComplete);
  }

  public stopInstrumentTune(): void {
    africanInstruments.stopAllTunes();
  }

  public isInstrumentTunePlaying(): boolean {
    return africanInstruments.isTunePlaying();
  }

  public playInstrumentString(freq: number): void {
    africanInstruments.playKoraString(freq);
  }

  public playMbiraTine(freq: number): void {
    africanInstruments.playMbiraTine(freq);
  }

  public playTalkingDrumHit(type: 'low-tone' | 'high-squeeze' | 'talking-bend' | 'slap'): void {
    africanInstruments.playTalkingDrum(type);
  }

  public playBalafonBar(freq: number): void {
    africanInstruments.playBalafonBar(freq);
  }

  public playHoshoShake(accented: boolean = false): void {
    africanInstruments.playHoshoShake(accented);
  }

  public speakLocalAccent(wordOrId: string, accent?: AccentRegion, onEnd?: () => void): void {
    localAccentEngine.playFullPronunciation(wordOrId, accent, onEnd);
  }

  public speakSyllable(syllable: string, accent?: AccentRegion): void {
    localAccentEngine.playSyllable(syllable, accent);
  }
}

export { africanInstruments, localAccentEngine };
export type { InstrumentType, AccentRegion };

export const audioEngine = new AudioEngine();
