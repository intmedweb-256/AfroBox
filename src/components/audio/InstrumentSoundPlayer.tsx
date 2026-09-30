import React, { useState, useEffect } from 'react';
import { Play, Square, Music2, Sparkles, Volume2 } from 'lucide-react';
import {
  africanInstruments,
  InstrumentType,
  KORA_STRINGS,
  MBIRA_TINES,
  BALAFON_BARS
} from '../../services/africanInstruments';

interface InstrumentSoundPlayerProps {
  instrument: InstrumentType;
  compact?: boolean;
  className?: string;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

interface InstrumentMeta {
  title: string;
  nativeName: string;
  origin: string;
  icon: string;
  traditionalTuneName: string;
  howSoundIsMade: string;
  acousticSecret: string;
}

const INSTRUMENT_METAS: Record<InstrumentType, InstrumentMeta> = {
  kora: {
    title: 'The 21-String Kora Harp',
    nativeName: 'Kora (Mandinka & Wolof)',
    origin: 'Gambia, Senegal, Mali (West Africa)',
    icon: '🎵',
    traditionalTuneName: 'Traditional "Kaira" (Peace & Abundance)',
    howSoundIsMade:
      '21 fishing-line or gut strings plucked rapidly with just the thumbs and index fingers over a cowhide calabash.',
    acousticSecret:
      'The large dried calabash gourd acts as a natural soundboard chamber, giving the harp notes a flowing river echo!'
  },
  mbira: {
    title: 'Mbira dzaVadzimu (Thumb Piano)',
    nativeName: 'Mbira (Shona: Voice of the Ancestors)',
    origin: 'Zimbabwe & Mozambique (Southern Africa)',
    icon: '🎶',
    traditionalTuneName: 'Traditional "Nhemamusasa" (Cutting Branches)',
    howSoundIsMade:
      'Forged iron keys hammered flat and tuned, mounted on hardwood inside a calabash resonator.',
    acousticSecret:
      'Bottle caps and sea shells attached to the calabash buzz gently whenever a key is struck—sounding like falling rain!'
  },
  'talking-drum': {
    title: 'The Talking Drum (Dùndún / Tama)',
    nativeName: 'Dùndún (Yoruba) • Tama (Wolof)',
    origin: 'Nigeria, Ghana, Senegal (West Africa)',
    icon: '🪘',
    traditionalTuneName: 'Traditional "Ẹ Kaabọ" (Welcome Phrase)',
    howSoundIsMade:
      'Squeezing the side leather cords with the upper arm changes the drumhead tension in real time.',
    acousticSecret:
      'By bending the pitch up and down like a human throat, the drum can recite entire proverbs and poetry across great distances!'
  },
  balafon: {
    title: 'The Balafon (Gourd Xylophone)',
    nativeName: 'Bala (Mandinka) • Gyil (Dagara)',
    origin: 'Guinea, Mali, Burkina Faso (West Africa)',
    icon: '🪵',
    traditionalTuneName: 'Festive Mandinka Village Dance Melody',
    howSoundIsMade:
      'Dense rosewood bars struck with rubber mallets, each bar suspended over a custom-sized hollow calabash.',
    acousticSecret:
      'Spider-egg cocoon paper over tiny holes in the gourds gives the wooden bars a joyful, buzzing acoustic warmth!'
  },
  hosho: {
    title: 'Hosho & Shekere Rattles',
    nativeName: 'Hosho (Shona) • Shekere (Yoruba)',
    origin: 'Zimbabwe & Nigeria',
    icon: '🪇',
    traditionalTuneName: '12/8 Polyrhythmic Shaker Groove',
    howSoundIsMade:
      'Maranka dried gourds filled with wild hotan seeds (Hosho) or wrapped in a net of beads (Shekere).',
    acousticSecret:
      'Played in pairs: one hand keeps the high driving pulse while the other drops syncopated downbeat accents!'
  },
  flute: {
    title: 'The Oja & Fulani Pastoral Flute',
    nativeName: 'Oja (Igbo) • Sarewa (Hausa)',
    origin: 'Nigeria & Sahelian West Africa',
    icon: '🪈',
    traditionalTuneName: 'Sahelian High Pastoral Melody',
    howSoundIsMade:
      'Carved bamboo cane or rosewood with fingerholes blown across the top rim to produce micro-vibrato.',
    acousticSecret:
      'The flutist can sing into the tube while blowing, creating extraordinary harmonic polyphony!'
  }
};

export const InstrumentSoundPlayer: React.FC<InstrumentSoundPlayerProps> = ({
  instrument,
  compact = false,
  className = '',
  onPlayStart,
  onPlayEnd
}) => {
  const [isPlayingTune, setIsPlayingTune] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isHoshoGrooveActive, setIsHoshoGrooveActive] = useState(false);

  const meta = INSTRUMENT_METAS[instrument] || INSTRUMENT_METAS.kora;

  useEffect(() => {
    return () => {
      africanInstruments.stopAllTunes();
    };
  }, [instrument]);

  const handlePlayTraditionalTune = () => {
    if (isPlayingTune) {
      africanInstruments.stopAllTunes();
      setIsPlayingTune(false);
      return;
    }

    setIsPlayingTune(true);
    onPlayStart?.();

    africanInstruments.playTraditionalTune(instrument, () => {
      setIsPlayingTune(false);
      onPlayEnd?.();
    });
  };

  const handlePluckKora = (noteName: string, freq: number) => {
    setActiveNote(noteName);
    africanInstruments.playKoraString(freq);
    setTimeout(() => setActiveNote((prev) => (prev === noteName ? null : prev)), 250);
  };

  const handleStrikeMbira = (noteName: string, freq: number) => {
    setActiveNote(noteName);
    africanInstruments.playMbiraTine(freq);
    setTimeout(() => setActiveNote((prev) => (prev === noteName ? null : prev)), 250);
  };

  const handleHitTalkingDrum = (
    type: 'low-tone' | 'high-squeeze' | 'talking-bend' | 'slap',
    label: string
  ) => {
    setActiveNote(label);
    africanInstruments.playTalkingDrum(type);
    setTimeout(() => setActiveNote((prev) => (prev === label ? null : prev)), 250);
  };

  const handleStrikeBalafon = (name: string, freq: number) => {
    setActiveNote(name);
    africanInstruments.playBalafonBar(freq);
    setTimeout(() => setActiveNote((prev) => (prev === name ? null : prev)), 250);
  };

  const handleShakeHosho = () => {
    setActiveNote('shake');
    africanInstruments.playHoshoShake(true);
    setTimeout(() => setActiveNote((prev) => (prev === 'shake' ? null : prev)), 200);
  };

  if (compact) {
    return (
      <div
        id={`compact-instrument-${instrument}`}
        className={`flex items-center gap-2 p-2 rounded-xl bg-[#FFFDF9] border border-[#E6DCBF] ${className}`}
      >
        <button
          type="button"
          onClick={handlePlayTraditionalTune}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
            isPlayingTune
              ? 'bg-[#E25822] text-white animate-pulse'
              : 'bg-[#1D3E2F] hover:bg-[#2A5C43] text-white'
          }`}
        >
          {isPlayingTune ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlayingTune ? 'Playing Tune' : 'Hear Instrument'}</span>
          <span className="text-sm">{meta.icon}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      id={`instrument-player-${instrument}`}
      className={`rounded-2xl p-4.5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F3ECD8] border-2 border-[#E6DCBF] shadow-sm space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#E25822]">
            <Music2 className="w-3.5 h-3.5" />
            <span>Interactive Instrument Studio</span>
          </div>
          <h3 className="text-xl font-black text-[#23211E] font-['Urbanist'] flex items-center gap-2">
            <span>{meta.icon}</span>
            <span>{meta.title}</span>
          </h3>
          <p className="text-xs font-semibold text-[#7C4728]">{meta.origin}</p>
        </div>

        {/* Listen to Traditional Tune Button */}
        <button
          type="button"
          id={`play-tune-btn-${instrument}`}
          onClick={handlePlayTraditionalTune}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
            isPlayingTune
              ? 'bg-[#E25822] text-white ring-2 ring-[#E25822]/50 animate-pulse'
              : 'bg-[#1D3E2F] hover:bg-[#2A5C43] text-[#F7F4EB] active:scale-95'
          }`}
        >
          {isPlayingTune ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isPlayingTune ? 'Stop Melody' : 'Hear Traditional Tune'}</span>
        </button>
      </div>

      {/* Waveform Equalizer when Melody is Playing */}
      {isPlayingTune && (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#E25822]/10 border border-[#E25822]/30 text-xs font-bold text-[#E25822]">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>Playing: {meta.traditionalTuneName}</span>
          </div>
          <div className="flex items-center gap-1">
            {[4, 12, 8, 16, 10, 14, 6, 12].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-[#E25822] rounded-full animate-pulse"
                style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* PLAYABLE ON-SCREEN INSTRUMENT SURFACE */}
      <div className="p-3.5 rounded-xl bg-white/90 border border-[#E6DCBF] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#7C4728]">
          <span>Tap notes to play this instrument:</span>
          <span className="text-[11px] font-normal text-stone-500 hidden sm:inline">
            Tactile Acoustic Modeling
          </span>
        </div>

        {/* KORA STRINGS INTERACTION */}
        {instrument === 'kora' && (
          <div className="flex items-end justify-center gap-2 sm:gap-3 pt-2 pb-1 overflow-x-auto">
            {KORA_STRINGS.map((str, idx) => {
              const isPlucked = activeNote === str.name;
              // Graduated string height mimicking authentic Kora bridge
              const heightPx = 60 + idx * 7;
              return (
                <button
                  key={str.name}
                  type="button"
                  id={`kora-string-${idx}`}
                  onClick={() => handlePluckKora(str.name, str.frequency)}
                  className="flex flex-col items-center group relative focus:outline-none"
                  title={`Pluck ${str.name} (${str.label}) - ${str.fingerOrMallet}`}
                >
                  <span className="text-[10px] font-mono font-bold text-stone-500 mb-1">
                    {str.label}
                  </span>
                  <div
                    className={`w-2 sm:w-2.5 rounded-full transition-all duration-100 ${
                      isPlucked
                        ? 'bg-[#E25822] scale-125 shadow-md ring-2 ring-[#E25822]/50'
                        : 'bg-gradient-to-b from-[#C85A32] via-[#E6DCBF] to-[#7C4728] hover:bg-[#E25822]'
                    }`}
                    style={{ height: `${heightPx}px` }}
                  />
                  <span className="text-[9px] font-mono text-stone-600 mt-1 font-bold">
                    {str.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* MBIRA TINES INTERACTION */}
        {instrument === 'mbira' && (
          <div className="flex items-end justify-center gap-2 sm:gap-3 pt-2 pb-1 overflow-x-auto">
            {MBIRA_TINES.map((tine, idx) => {
              const isStruck = activeNote === tine.name;
              const tineHeight = 55 + (idx % 2 === 0 ? 15 : 0) + idx * 4;
              return (
                <button
                  key={tine.name}
                  type="button"
                  id={`mbira-tine-${idx}`}
                  onClick={() => handleStrikeMbira(tine.name, tine.frequency)}
                  className="flex flex-col items-center group relative focus:outline-none"
                  title={`Strike ${tine.name} (${tine.label}) - ${tine.fingerOrMallet}`}
                >
                  <span className="text-[9px] font-mono font-bold text-stone-600 mb-1">
                    {tine.label}
                  </span>
                  <div
                    className={`w-3.5 sm:w-4.5 rounded-b-md transition-all duration-100 ${
                      isStruck
                        ? 'bg-[#E25822] scale-110 shadow-lg ring-2 ring-[#E25822]/60'
                        : 'bg-gradient-to-b from-stone-400 via-stone-300 to-stone-500 hover:from-amber-400 hover:to-amber-600'
                    }`}
                    style={{ height: `${tineHeight}px` }}
                  >
                    {/* Simulated bottle-cap buzzer shimmer */}
                    <div className="w-full h-2 bg-amber-400/50 rounded-full mt-1 opacity-70" />
                  </div>
                  <span className="text-[9px] font-mono text-stone-500 mt-1">
                    {tine.fingerOrMallet?.includes('Left') ? 'L' : 'R'}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* TALKING DRUM PADS INTERACTION */}
        {instrument === 'talking-drum' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <button
              type="button"
              id="drum-pad-bend"
              onClick={() => handleHitTalkingDrum('talking-bend', 'Talking Bend')}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                activeNote === 'Talking Bend'
                  ? 'bg-[#E25822] text-white border-[#E25822] scale-105 shadow-md'
                  : 'bg-[#FAF6ED] hover:bg-[#F3ECD8] border-[#E6DCBF] text-[#23211E]'
              }`}
            >
              <div className="text-xl">🗣️</div>
              <div className="text-xs font-black mt-1">Talking Bend</div>
              <div className="text-[10px] opacity-75">Arm Squeeze Glissando</div>
            </button>

            <button
              type="button"
              id="drum-pad-low"
              onClick={() => handleHitTalkingDrum('low-tone', 'Low Tone')}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                activeNote === 'Low Tone'
                  ? 'bg-[#1D3E2F] text-white border-[#1D3E2F] scale-105 shadow-md'
                  : 'bg-[#FAF6ED] hover:bg-[#F3ECD8] border-[#E6DCBF] text-[#23211E]'
              }`}
            >
              <div className="text-xl">🪘</div>
              <div className="text-xs font-black mt-1">Low Tone</div>
              <div className="text-[10px] opacity-75">Relaxed Open Bass</div>
            </button>

            <button
              type="button"
              id="drum-pad-high"
              onClick={() => handleHitTalkingDrum('high-squeeze', 'High Tone')}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                activeNote === 'High Tone'
                  ? 'bg-[#C85A32] text-white border-[#C85A32] scale-105 shadow-md'
                  : 'bg-[#FAF6ED] hover:bg-[#F3ECD8] border-[#E6DCBF] text-[#23211E]'
              }`}
            >
              <div className="text-xl">⚡</div>
              <div className="text-xs font-black mt-1">High Squeeze</div>
              <div className="text-[10px] opacity-75">Tight Tension Pitch</div>
            </button>

            <button
              type="button"
              id="drum-pad-slap"
              onClick={() => handleHitTalkingDrum('slap', 'Rim Slap')}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                activeNote === 'Rim Slap'
                  ? 'bg-amber-600 text-white border-amber-600 scale-105 shadow-md'
                  : 'bg-[#FAF6ED] hover:bg-[#F3ECD8] border-[#E6DCBF] text-[#23211E]'
              }`}
            >
              <div className="text-xl">💥</div>
              <div className="text-xs font-black mt-1">Rim Slap</div>
              <div className="text-[10px] opacity-75">Crisp Accent Strike</div>
            </button>
          </div>
        )}

        {/* BALAFON BARS INTERACTION */}
        {instrument === 'balafon' && (
          <div className="flex items-center justify-center gap-2 pt-2 pb-1 overflow-x-auto">
            {BALAFON_BARS.map((bar, idx) => {
              const isStruck = activeNote === bar.name;
              const barWidth = 44 + (BALAFON_BARS.length - idx) * 6;
              return (
                <button
                  key={bar.name}
                  type="button"
                  id={`balafon-bar-${idx}`}
                  onClick={() => handleStrikeBalafon(bar.name, bar.frequency)}
                  className={`py-3 rounded-lg flex flex-col items-center justify-center transition-all duration-100 ${
                    isStruck
                      ? 'bg-[#E25822] text-white scale-110 shadow-md ring-2 ring-[#E25822]/50'
                      : 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:brightness-110 text-[#F7F4EB] shadow-xs'
                  }`}
                  style={{ width: `${barWidth}px` }}
                  title={`Strike ${bar.name}`}
                >
                  <span className="text-[10px] font-mono font-bold">{bar.name}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300 mt-1 opacity-80" />
                </button>
              );
            })}
          </div>
        )}

        {/* HOSHO SHAKER INTERACTION */}
        {instrument === 'hosho' && (
          <div className="flex items-center justify-center gap-3 pt-2 pb-1">
            <button
              type="button"
              id="hosho-shake-btn"
              onClick={handleShakeHosho}
              className={`px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all ${
                activeNote === 'shake'
                  ? 'bg-[#E25822] text-white scale-110 shadow-lg'
                  : 'bg-[#FAF6ED] hover:bg-[#F3ECD8] border-2 border-[#E6DCBF] text-[#23211E]'
              }`}
            >
              <span className="text-2xl animate-spin">🪇</span>
              <span>Tap to Shake Hosho</span>
            </button>
          </div>
        )}

        {/* FLUTE INTERACTION */}
        {instrument === 'flute' && (
          <div className="flex items-center justify-center gap-2 pt-2 pb-1">
            {[587.33, 659.25, 783.99, 880.0, 1046.5].map((freq, i) => {
              const noteNames = ['D5', 'E5', 'G5', 'A5', 'C6'];
              const isPlaying = activeNote === noteNames[i];
              return (
                <button
                  key={freq}
                  type="button"
                  id={`flute-note-${i}`}
                  onClick={() => {
                    setActiveNote(noteNames[i]);
                    africanInstruments.playFluteNote(freq, 0.9);
                    setTimeout(() => setActiveNote((prev) => (prev === noteNames[i] ? null : prev)), 300);
                  }}
                  className={`w-11 h-11 rounded-full font-mono text-xs font-black transition-all ${
                    isPlaying
                      ? 'bg-[#1D3E2F] text-white scale-110 shadow-md ring-2 ring-[#1D3E2F]/50'
                      : 'bg-[#FAF6ED] hover:bg-[#F3ECD8] border border-[#E6DCBF] text-[#23211E]'
                  }`}
                >
                  {noteNames[i]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Cultural Acoustic Secret */}
      <div className="p-2.5 rounded-xl bg-white/80 border border-[#E6DCBF] text-xs text-[#7C4728] space-y-1">
        <div className="flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E25822] shrink-0 mt-0.5" />
          <span>
            <strong>How It Works:</strong> {meta.howSoundIsMade}
          </span>
        </div>
        <div className="text-[11px] text-stone-600 pl-5">{meta.acousticSecret}</div>
      </div>
    </div>
  );
};
