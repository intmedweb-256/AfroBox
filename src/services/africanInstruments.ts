/**
 * African Instrument Synthesizer Engine
 * 100% Web Audio API synthesis - zero external audio files, zero network latency.
 * Supports:
 * - Kora (21-string West African harp)
 * - Mbira dzaVadzimu (Shona thumb piano with buzzing calabash resonator)
 * - Talking Drum (Tama / Dùndún with squeeze-and-release pitch modulation)
 * - Balafon (Resonant wooden xylophone with calabash gourds)
 * - Hosho / Shekere (Beaded gourd rattles with 12/8 polyrhythm)
 * - Oja / Flute (High wooden whistle with breath vibrato)
 */

export type InstrumentType = 'kora' | 'mbira' | 'talking-drum' | 'balafon' | 'hosho' | 'flute';

export interface InstrumentNote {
  name: string;
  frequency: number;
  label: string;
  fingerOrMallet?: string;
}

export interface TraditionalTune {
  id: string;
  title: string;
  origin: string;
  tempoBpm: number;
  notes: Array<{ freq: number; duration: number; timeOffset: number; noteType?: string; bendFreq?: number }>;
}

class AfricanInstrumentEngine {
  private audioCtx: AudioContext | null = null;
  private isPlayingTune = false;
  private activeTimeouts: number[] = [];

  private getContext(): AudioContext | null {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;

      if (!this.audioCtx || this.audioCtx.state === 'closed') {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  // =========================================================================
  // 1. KORA (21-String West African Calabash Harp)
  // Characteristic: Warm fundamental, bright nylon/gut percussive attack,
  // rich 2nd and 3rd harmonics with calabash body low-pass filtering.
  // =========================================================================
  public playKoraString(freq: number, duration: number = 1.2): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Fundamental plucked oscillator (triangle for string warmth)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle 2nd harmonic (adds bright harp chime)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Subtle 3rd harmonic for string pluck texture
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now);

    // Calabash resonance filter (warm body warmth around 800Hz)
    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(1800, now);
    bodyFilter.Q.setValueAtTime(2.0, now);

    // Pluck attack & exponential decay envelopes
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.35, now + 0.008); // Sharp finger pluck
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.18, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.6);

    gain3.gain.setValueAtTime(0.001, now);
    gain3.gain.linearRampToValueAtTime(0.08, now + 0.004);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.35);

    // Master envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.85, now);

    // Connect nodes
    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(bodyFilter);
    gain2.connect(bodyFilter);
    gain3.connect(bodyFilter);

    bodyFilter.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  // =========================================================================
  // 2. MBIRA DZAVADZIMU (Shona Thumb Piano with Buzzing Calabash)
  // Characteristic: Forged metal tine chime + inharmonic partials +
  // signature sympathetic buzzing rattle ("nyonga / machachara") from bottle caps/shells.
  // =========================================================================
  public playMbiraTine(freq: number, duration: number = 1.4): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Metal Bar Fundamental (Sine/Triangle blend)
    const tine = ctx.createOscillator();
    const tineGain = ctx.createGain();
    tine.type = 'sine';
    tine.frequency.setValueAtTime(freq, now);

    // Inharmonic overtone characteristic of clamped iron bar (~2.75x fundamental)
    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2.75, now);

    // 2. Sympathetic Bottle-Cap/Shell Buzzer (The soul of Shona mbira!)
    // White noise passed through bandpass filter matching tine frequency
    const bufferSize = ctx.sampleRate * 0.5;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const buzzFilter = ctx.createBiquadFilter();
    buzzFilter.type = 'bandpass';
    buzzFilter.frequency.setValueAtTime(freq * 1.5, now);
    buzzFilter.Q.setValueAtTime(3.5, now);

    const buzzGain = ctx.createGain();

    // Envelopes
    tineGain.gain.setValueAtTime(0.001, now);
    tineGain.gain.linearRampToValueAtTime(0.38, now + 0.005);
    tineGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    overtoneGain.gain.setValueAtTime(0.001, now);
    overtoneGain.gain.linearRampToValueAtTime(0.2, now + 0.003);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.4);

    // Buzz starts right after strike and dies gently
    buzzGain.gain.setValueAtTime(0.001, now);
    buzzGain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    buzzGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);

    // Master out
    const mbiraOut = ctx.createGain();
    mbiraOut.gain.setValueAtTime(0.9, now);

    tine.connect(tineGain);
    overtone.connect(overtoneGain);
    whiteNoise.connect(buzzFilter);
    buzzFilter.connect(buzzGain);

    tineGain.connect(mbiraOut);
    overtoneGain.connect(mbiraOut);
    buzzGain.connect(mbiraOut);

    mbiraOut.connect(ctx.destination);

    tine.start(now);
    overtone.start(now);
    whiteNoise.start(now);

    tine.stop(now + duration);
    overtone.stop(now + duration);
    whiteNoise.stop(now + duration * 0.7);
  }

  // =========================================================================
  // 3. TALKING DRUM (Tama / Dùndún)
  // Characteristic: Dynamic pitch modulation (arm squeezes and releases cords)
  // produces rising and falling vocal glissandos mimicking African tonal speech!
  // =========================================================================
  public playTalkingDrum(
    strikeType: 'low-tone' | 'high-squeeze' | 'talking-bend' | 'slap',
    duration: number = 0.45
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    // Stick strike click transient
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(800, now);
    clickGain.gain.setValueAtTime(0.3, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    if (strikeType === 'low-tone') {
      // Relaxed cords: deep resonant drum base
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + duration);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else if (strikeType === 'high-squeeze') {
      // Clamped cords: high tight tone
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + duration);
      gain.gain.setValueAtTime(0.42, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else if (strikeType === 'talking-bend') {
      // Vocal glissando: drum "speaks" by swooping up and down!
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.12); // arm squeeze
      osc.frequency.linearRampToValueAtTime(150, now + duration); // arm release
      gain.gain.setValueAtTime(0.48, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else {
      // Sharp slap on head rim
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.15);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    }

    osc.connect(gain);
    clickOsc.connect(clickGain);

    gain.connect(ctx.destination);
    clickGain.connect(ctx.destination);

    osc.start(now);
    clickOsc.start(now);

    osc.stop(now + duration);
    clickOsc.stop(now + 0.03);
  }

  // =========================================================================
  // 4. BALAFON (West African Wooden Gourd Xylophone)
  // Characteristic: Dry woody mallet impact + resonant hollow gourd cavities.
  // =========================================================================
  public playBalafonBar(freq: number, duration: number = 0.8): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Woody slap attack
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.type = 'triangle';
    click.frequency.setValueAtTime(freq * 2.8, now);
    clickGain.gain.setValueAtTime(0.3, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    // 2. Main resonant rosewood bar
    const bar = ctx.createOscillator();
    const barGain = ctx.createGain();
    bar.type = 'triangle';
    bar.frequency.setValueAtTime(freq, now);

    // 3. Calabash gourd sub-resonator (gives the balafon its warm punch)
    const gourd = ctx.createOscillator();
    const gourdGain = ctx.createGain();
    gourd.type = 'sine';
    gourd.frequency.setValueAtTime(freq, now);

    barGain.gain.setValueAtTime(0.001, now);
    barGain.gain.linearRampToValueAtTime(0.4, now + 0.005);
    barGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);

    gourdGain.gain.setValueAtTime(0.001, now);
    gourdGain.gain.linearRampToValueAtTime(0.3, now + 0.008);
    gourdGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    click.connect(clickGain);
    bar.connect(barGain);
    gourd.connect(gourdGain);

    clickGain.connect(ctx.destination);
    barGain.connect(ctx.destination);
    gourdGain.connect(ctx.destination);

    click.start(now);
    bar.start(now);
    gourd.start(now);

    click.stop(now + 0.03);
    bar.stop(now + duration);
    gourd.stop(now + duration);
  }

  // =========================================================================
  // 5. HOSHO & SHEKERE (Shona Maranka Gourds / Beaded Net Rattles)
  // Characteristic: Shuffling beads against gourd shell + hollow bass pump.
  // =========================================================================
  public playHoshoShake(isAccented: boolean = false): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Filtered noise burst for seeds/beads
    const bufferSize = ctx.sampleRate * 0.25;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(isAccented ? 3800 : 2600, now);
    filter.Q.setValueAtTime(1.8, now);

    const gain = ctx.createGain();
    const amp = isAccented ? 0.35 : 0.2;
    const dur = isAccented ? 0.22 : 0.15;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(amp, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + dur);
  }

  // =========================================================================
  // 6. OJA / FULANI FLUTE
  // Characteristic: Breathy, soaring flute with micro-vibrato
  // =========================================================================
  public playFluteNote(freq: number, duration: number = 0.9): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle breath vibrato
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5.5, now);
    vibratoGain.gain.setValueAtTime(6.0, now);
    vibrato.connect(osc.frequency);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.08); // soft breath attack
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    vibrato.start(now);
    osc.start(now);

    vibrato.stop(now + duration);
    osc.stop(now + duration);
  }

  // =========================================================================
  // TRADITIONAL TUNE PLAYER (Authentic Griot, Shona, and Mandinka Melodies)
  // =========================================================================
  public stopAllTunes(): void {
    this.activeTimeouts.forEach((id) => window.clearTimeout(id));
    this.activeTimeouts = [];
    this.isPlayingTune = false;
  }

  public isTunePlaying(): boolean {
    return this.isPlayingTune;
  }

  public playTraditionalTune(
    instrument: InstrumentType,
    onComplete?: () => void
  ): void {
    this.stopAllTunes();
    this.isPlayingTune = true;

    if (instrument === 'kora') {
      // Traditional Kora arpeggio in Silaba tuning ("Kaira" - Peace)
      // Plucked with thumbs & index fingers in cascading river rhythm
      const melody = [
        { freq: 261.63, delay: 0 },    // C4
        { freq: 329.63, delay: 130 },  // E4
        { freq: 392.0, delay: 260 },   // G4
        { freq: 523.25, delay: 390 },  // C5
        { freq: 440.0, delay: 520 },   // A4
        { freq: 392.0, delay: 650 },   // G4
        { freq: 329.63, delay: 780 },  // E4
        { freq: 293.66, delay: 910 },  // D4
        { freq: 261.63, delay: 1040 }, // C4
        { freq: 329.63, delay: 1200 }, // E4
        { freq: 392.0, delay: 1340 },  // G4
        { freq: 587.33, delay: 1480 }, // D5
        { freq: 523.25, delay: 1640 }, // C5
        { freq: 392.0, delay: 1800 },  // G4
        { freq: 329.63, delay: 1960 }, // E4
        { freq: 261.63, delay: 2150 }  // C4 sustained
      ];

      melody.forEach((note) => {
        const tid = window.setTimeout(() => {
          this.playKoraString(note.freq, 1.2);
        }, note.delay);
        this.activeTimeouts.push(tid);
      });

      const endTid = window.setTimeout(() => {
        this.isPlayingTune = false;
        onComplete?.();
      }, 3400);
      this.activeTimeouts.push(endTid);

    } else if (instrument === 'mbira') {
      // Traditional Shona Mbira cycle ("Nhemamusasa" - Cutting Branches for Shelter)
      // Interlocking bass keys and high keys with buzzing bottle caps!
      const mbiraPattern = [
        { freq: 196.0, delay: 0 },    // G3 (Left thumb deep bass)
        { freq: 392.0, delay: 120 },  // G4 (Right index high tine)
        { freq: 293.66, delay: 240 }, // D4 (Left thumb mid)
        { freq: 440.0, delay: 360 },  // A4 (Right index)
        { freq: 220.0, delay: 480 },  // A3 (Left thumb)
        { freq: 329.63, delay: 600 }, // E4 (Right index)
        { freq: 261.63, delay: 720 }, // C4 (Left thumb)
        { freq: 523.25, delay: 840 }, // C5 (Right index sparkle)
        { freq: 196.0, delay: 960 },  // G3
        { freq: 392.0, delay: 1080 }, // G4
        { freq: 329.63, delay: 1200 },// E4
        { freq: 440.0, delay: 1320 }, // A4
        { freq: 220.0, delay: 1440 }, // A3
        { freq: 293.66, delay: 1580 },// D4
        { freq: 196.0, delay: 1720 }  // G3 final resonance
      ];

      mbiraPattern.forEach((note) => {
        const tid = window.setTimeout(() => {
          this.playMbiraTine(note.freq, 1.4);
          // Accompanying hosho rattle on key pulses
          if (note.delay % 480 === 0) {
            this.playHoshoShake(true);
          }
        }, note.delay);
        this.activeTimeouts.push(tid);
      });

      const endTid = window.setTimeout(() => {
        this.isPlayingTune = false;
        onComplete?.();
      }, 3000);
      this.activeTimeouts.push(endTid);

    } else if (instrument === 'talking-drum') {
      // Traditional West African Dùndún / Tama greeting phrase ("E Kaabo" - Welcome!)
      const drumSequence = [
        { type: 'low-tone' as const, delay: 0 },
        { type: 'talking-bend' as const, delay: 220 },
        { type: 'high-squeeze' as const, delay: 450 },
        { type: 'low-tone' as const, delay: 680 },
        { type: 'talking-bend' as const, delay: 900 },
        { type: 'slap' as const, delay: 1150 },
        { type: 'high-squeeze' as const, delay: 1350 },
        { type: 'talking-bend' as const, delay: 1580 },
        { type: 'low-tone' as const, delay: 1850 }
      ];

      drumSequence.forEach((hit) => {
        const tid = window.setTimeout(() => {
          this.playTalkingDrum(hit.type);
        }, hit.delay);
        this.activeTimeouts.push(tid);
      });

      const endTid = window.setTimeout(() => {
        this.isPlayingTune = false;
        onComplete?.();
      }, 2600);
      this.activeTimeouts.push(endTid);

    } else if (instrument === 'balafon') {
      // Upbeat Mandinka village balafon melody
      const balafonMelody = [
        { freq: 261.63, delay: 0 },
        { freq: 293.66, delay: 110 },
        { freq: 329.63, delay: 220 },
        { freq: 392.0, delay: 330 },
        { freq: 329.63, delay: 440 },
        { freq: 293.66, delay: 550 },
        { freq: 261.63, delay: 660 },
        { freq: 392.0, delay: 800 },
        { freq: 440.0, delay: 920 },
        { freq: 523.25, delay: 1050 },
        { freq: 440.0, delay: 1180 },
        { freq: 392.0, delay: 1300 },
        { freq: 329.63, delay: 1450 },
        { freq: 261.63, delay: 1650 }
      ];

      balafonMelody.forEach((note) => {
        const tid = window.setTimeout(() => {
          this.playBalafonBar(note.freq, 0.7);
        }, note.delay);
        this.activeTimeouts.push(tid);
      });

      const endTid = window.setTimeout(() => {
        this.isPlayingTune = false;
        onComplete?.();
      }, 2500);
      this.activeTimeouts.push(endTid);

    } else if (instrument === 'hosho') {
      // 12/8 Polyrhythmic Shona hosho pattern (Kushaura groove)
      for (let i = 0; i < 12; i++) {
        const delay = i * 140;
        const isAccent = i % 3 === 0;
        const tid = window.setTimeout(() => {
          this.playHoshoShake(isAccent);
        }, delay);
        this.activeTimeouts.push(tid);
      }

      const endTid = window.setTimeout(() => {
        this.isPlayingTune = false;
        onComplete?.();
      }, 2000);
      this.activeTimeouts.push(endTid);

    } else if (instrument === 'flute') {
      // Breathy soaring high pastoral flute melody
      const fluteMelody = [
        { freq: 587.33, delay: 0 },   // D5
        { freq: 659.25, delay: 240 }, // E5
        { freq: 783.99, delay: 480 }, // G5
        { freq: 880.0, delay: 720 },  // A5
        { freq: 1046.5, delay: 1050 },// C6
        { freq: 880.0, delay: 1400 }, // A5
        { freq: 783.99, delay: 1750 },// G5
        { freq: 587.33, delay: 2100 } // D5
      ];

      fluteMelody.forEach((note) => {
        const tid = window.setTimeout(() => {
          this.playFluteNote(note.freq, 0.85);
        }, note.delay);
        this.activeTimeouts.push(tid);
      });

      const endTid = window.setTimeout(() => {
        this.isPlayingTune = false;
        onComplete?.();
      }, 3200);
      this.activeTimeouts.push(endTid);
    }
  }
}

export const africanInstruments = new AfricanInstrumentEngine();

// Playable Note Presets for Interactive On-Screen Instruments
export const KORA_STRINGS: InstrumentNote[] = [
  { name: 'C4', frequency: 261.63, label: 'Do', fingerOrMallet: 'Left Thumb' },
  { name: 'D4', frequency: 293.66, label: 'Re', fingerOrMallet: 'Left Index' },
  { name: 'E4', frequency: 329.63, label: 'Mi', fingerOrMallet: 'Left Thumb' },
  { name: 'F4', frequency: 349.23, label: 'Fa', fingerOrMallet: 'Right Index' },
  { name: 'G4', frequency: 392.0, label: 'Sol', fingerOrMallet: 'Right Thumb' },
  { name: 'A4', frequency: 440.0, label: 'La', fingerOrMallet: 'Right Index' },
  { name: 'B4', frequency: 493.88, label: 'Ti', fingerOrMallet: 'Right Index' },
  { name: 'C5', frequency: 523.25, label: 'High Do', fingerOrMallet: 'Right Index' }
];

export const MBIRA_TINES: InstrumentNote[] = [
  { name: 'G3 (Bass)', frequency: 196.0, label: 'Nhema (Deep)', fingerOrMallet: 'Left Thumb' },
  { name: 'C4 (Mid)', frequency: 261.63, label: 'Duriro', fingerOrMallet: 'Left Thumb' },
  { name: 'D4', frequency: 293.66, label: 'Kushaura', fingerOrMallet: 'Left Thumb' },
  { name: 'E4', frequency: 329.63, label: 'Chiramwi', fingerOrMallet: 'Right Thumb' },
  { name: 'G4 (High)', frequency: 392.0, label: 'Dhonza', fingerOrMallet: 'Right Index' },
  { name: 'A4', frequency: 440.0, label: 'Mawuruka', fingerOrMallet: 'Right Index' },
  { name: 'C5 (Top)', frequency: 523.25, label: 'Mutoriro', fingerOrMallet: 'Right Index' }
];

export const BALAFON_BARS: InstrumentNote[] = [
  { name: 'C4', frequency: 261.63, label: 'Low 1' },
  { name: 'D4', frequency: 293.66, label: 'Low 2' },
  { name: 'E4', frequency: 329.63, label: 'Mid 3' },
  { name: 'G4', frequency: 392.0, label: 'Mid 4' },
  { name: 'A4', frequency: 440.0, label: 'High 5' },
  { name: 'C5', frequency: 523.25, label: 'High 6' }
];
