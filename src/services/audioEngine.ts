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
}

export const GRIOT_VOICE_PERSONAS: GriotVoicePersona[] = [
  {
    id: 'Kore',
    name: 'Mama Griot',
    title: 'Warm Matriarch Storyteller',
    avatar: '👵🏾',
    description: 'Nurturing, melodic, engaging oral storytelling for young children',
    stylePrompt: 'Warm, nurturing, melodic African matriarch storyteller with gentle pacing and expressive pauses for young children'
  },
  {
    id: 'Fenrir',
    name: 'Baba Griot',
    title: 'Wise Village Elder',
    avatar: '👴🏾',
    description: 'Deep, resonant, ancestral voice steeped in wisdom and epic legends',
    stylePrompt: 'Deep, resonant, wise African village elder with commanding warmth and thoughtful cadence'
  },
  {
    id: 'Puck',
    name: 'Brother Kwaku',
    title: 'Lively Folktale Griot',
    avatar: '👦🏾',
    description: 'Playful, animated, rhythmic narrator perfect for Anansi & animal fables',
    stylePrompt: 'Cheerful, lively, animated African storyteller with high energy, playful rhythm, and warmth'
  },
  {
    id: 'Zephyr',
    name: 'Sister Amina',
    title: 'Gentle Bedtime Storyteller',
    avatar: '🌸',
    description: 'Soft, soothing, tranquil voice ideal for quiet focus and evening reading',
    stylePrompt: 'Gentle, soothing, tranquil, and clear voice with peaceful storytelling cadence for children'
  },
  {
    id: 'Charon',
    name: 'Elder Osei',
    title: 'Historical Chronicler',
    avatar: '📜',
    description: 'Measured, noble, reflective narrator for geography and kingdom lore',
    stylePrompt: 'Noble, measured, clear, and dignified African storyteller presenting rich cultural history'
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

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  public static getBestNaturalVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null;

    // 1. Regional African voices (Nigeria, Kenya, South Africa, Ghana, Swahili, Yoruba, Zulu)
    const africanVoice = voices.find((v) => {
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

    // 2. High-quality natural voices in Chrome / Edge / macOS:
    // In Chrome on desktop, Google voices ("Google UK English Female", "Google US English") are far more natural
    const googleNatural = voices.find((v) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('google uk english female') ||
        n.includes('google us english') ||
        n.includes('google uk english male')
      );
    });
    if (googleNatural) return googleNatural;

    // 3. Online Natural/Neural voices (Edge/Windows 11)
    const onlineNeural = voices.find((v) => {
      const n = v.name.toLowerCase();
      const isRobotic =
        n.includes('desktop') ||
        n.includes('david') ||
        n.includes('zira') ||
        n.includes('mark') ||
        n.includes('espeak') ||
        n.includes('alex') ||
        n.includes('fred');
      return (
        !isRobotic &&
        (n.includes('natural') ||
          n.includes('neural') ||
          n.includes('online') ||
          n.includes('enhanced') ||
          n.includes('premium'))
      );
    });
    if (onlineNeural) return onlineNeural;

    // 4. Any other Google voice
    const anyGoogle = voices.find(
      (v) => v.name.toLowerCase().includes('google') && v.lang.startsWith('en')
    );
    if (anyGoogle) return anyGoogle;

    // 5. Any English voice that is NOT an obsolete robotic SAPI5 desktop synth
    const nonRobotic = voices.find((v) => {
      const n = v.name.toLowerCase();
      const isRobotic =
        n.includes('desktop') ||
        n.includes('david') ||
        n.includes('zira') ||
        n.includes('mark') ||
        n.includes('espeak') ||
        n.includes('alex') ||
        n.includes('fred');
      return v.lang.startsWith('en') && !isRobotic;
    });
    if (nonRobotic) return nonRobotic;

    return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
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
          console.warn('AI TTS failed or unavailable, falling back to browser speech:', fetchErr);
          // Gracefully fallback to browser speech synthesis
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
          console.warn('AI Audio play error, falling back to browser:', err);
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

  // Device Browser Web Speech API Narration
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

    // 1. Try explicitly chosen voiceURI
    let selectedVoice: SpeechSynthesisVoice | null = null;
    if (prefs.voiceURI) {
      selectedVoice = voices.find((v) => v.voiceURI === prefs.voiceURI) || null;
    }

    // 2. If not selected, prioritize regional African or high-quality natural voices
    if (!selectedVoice) {
      selectedVoice = AudioEngine.getBestNaturalVoice(voices);
    }

    const computedRate = rateOverride !== undefined ? rateOverride : (prefs.rate || 0.90);
    const computedPitch = prefs.pitch || 0.98;

    const playNext = () => {
      if (currentIndex >= paragraphs.length) {
        listeners.onEnd?.();
        return;
      }

      listeners.onParagraphChange?.(currentIndex);

      const utterance = new SpeechSynthesisUtterance(paragraphs[currentIndex]);
      utterance.rate = computedRate;
      utterance.pitch = computedPitch;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        currentIndex++;
        playNext();
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          listeners.onError?.(`Audio playback notice: ${e.error}`);
        }
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    };

    playNext();
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
        console.warn('AI voice preview failed, falling back to browser:', err);
      }
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
    utterance.rate = rate !== undefined ? rate : (prefs.rate || 0.90);
    utterance.pitch = pitch !== undefined ? pitch : (prefs.pitch || 0.98);

    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
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
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
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

    const audio = new Audio(url);
    this.activeAudioElement = audio;

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
    const naturalVoice = AudioEngine.getBestNaturalVoice(voices);

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }
    utterance.rate = 0.90;
    utterance.pitch = 1.0;

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
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
