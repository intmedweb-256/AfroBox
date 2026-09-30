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

class AudioEngine {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingStartTime = 0;
  private activeAudioElement: HTMLAudioElement | null = null;

  // READ ALOUD / NARRATION PLAYBACK
  public speakParagraphs(
    paragraphs: string[],
    startIndex: number = 0,
    rate: number = 0.95,
    listeners: AudioEngineListeners = {}
  ): void {
    if (!('speechSynthesis' in window)) {
      listeners.onError?.('Speech audio is not supported in this browser.');
      return;
    }

    this.stopSpeaking();

    let currentIndex = startIndex;

    // Find best matching voice: prioritize regional African device voices (en-NG, en-ZA, en-KE, sw, etc.)
    const voices = typeof window !== 'undefined' && 'speechSynthesis' in window
      ? window.speechSynthesis.getVoices()
      : [];

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

    const naturalFallback = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('English'))
    );

    const preferredVoice = africanVoice || naturalFallback || null;
    const computedPitch = africanVoice ? 1.02 : 1.04;
    const computedRate = africanVoice ? rate : Math.max(0.85, rate * 0.94);

    const playNext = () => {
      if (currentIndex >= paragraphs.length) {
        listeners.onEnd?.();
        return;
      }

      listeners.onParagraphChange?.(currentIndex);

      const utterance = new SpeechSynthesisUtterance(paragraphs[currentIndex]);
      utterance.rate = computedRate;
      utterance.pitch = computedPitch;

      if (preferredVoice) {
        utterance.voice = preferredVoice;
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

  public speakText(text: string, onEnd?: () => void): void {
    if (!('speechSynthesis' in window)) return;
    this.stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
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
        n.includes('nigeria') ||
        n.includes('south africa') ||
        n.includes('kenya')
      );
    });

    if (africanVoice) {
      utterance.voice = africanVoice;
      utterance.rate = 0.94;
      utterance.pitch = 1.02;
    } else {
      utterance.rate = 0.92;
      utterance.pitch = 1.04;
    }

    utterance.onend = () => {
      onEnd?.();
    };
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
