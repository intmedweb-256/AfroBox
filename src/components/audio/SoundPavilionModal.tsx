import React, { useState } from 'react';
import { X, Music, Volume2, Sparkles, Compass, Check } from 'lucide-react';
import { InstrumentSoundPlayer } from './InstrumentSoundPlayer';
import { LocalAccentPronunciationCard } from './LocalAccentPronunciationCard';
import { InstrumentType } from '../../services/africanInstruments';
import {
  AFRICAN_WORDS_DICTIONARY,
  AccentRegion
} from '../../services/localAccentEngine';

interface SoundPavilionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'instruments' | 'accents';
  initialInstrument?: InstrumentType;
  initialWordId?: string;
}

export const SoundPavilionModal: React.FC<SoundPavilionModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'instruments',
  initialInstrument = 'kora',
  initialWordId
}) => {
  const [activeTab, setActiveTab] = useState<'instruments' | 'accents'>(initialTab);
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType>(initialInstrument);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('ALL');
  const [selectedWordId, setSelectedWordId] = useState<string>(
    initialWordId || AFRICAN_WORDS_DICTIONARY[0].id
  );

  if (!isOpen) return null;

  const instrumentsList: Array<{ id: InstrumentType; name: string; icon: string; region: string }> = [
    { id: 'kora', name: '21-String Kora Harp', icon: '🎵', region: 'West Africa' },
    { id: 'mbira', name: 'Mbira Thumb Piano', icon: '🎶', region: 'Southern Africa' },
    { id: 'talking-drum', name: 'Talking Drum (Tama)', icon: '🪘', region: 'West Africa' },
    { id: 'balafon', name: 'Balafon Xylophone', icon: '🪵', region: 'West Africa' },
    { id: 'hosho', name: 'Hosho & Shekere', icon: '🪇', region: 'Southern/West Africa' },
    { id: 'flute', name: 'Oja & Fulani Flute', icon: '🪈', region: 'West/Central Africa' }
  ];

  const filteredWords =
    selectedRegionFilter === 'ALL'
      ? AFRICAN_WORDS_DICTIONARY
      : AFRICAN_WORDS_DICTIONARY.filter((w) => w.region === selectedRegionFilter);

  return (
    <div
      id="sound-pavilion-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FAF6ED] border-2 border-[#E6DCBF] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6DCBF] bg-gradient-to-r from-[#1D3E2F] via-[#244C39] to-[#1D3E2F] text-[#F7F4EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shadow-inner">
              🌍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                  AfroBox Audio Pavilion
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Urbanist'] leading-tight">
                Sounds of Africa: Instruments & Local Accents
              </h2>
            </div>
          </div>

          <button
            type="button"
            id="close-pavilion-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close Sound Pavilion"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center gap-2 p-3 bg-[#F3ECD8] border-b border-[#E6DCBF]">
          <button
            type="button"
            id="tab-instruments-btn"
            onClick={() => setActiveTab('instruments')}
            className={`flex items-center gap-2 px-5 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'instruments'
                ? 'bg-[#1D3E2F] text-[#F7F4EB] shadow-md scale-102'
                : 'bg-white/80 hover:bg-white text-[#23211E] border border-[#E6DCBF]'
            }`}
          >
            <Music className="w-4 h-4 text-amber-300" />
            <span>African Instruments Studio</span>
          </button>

          <button
            type="button"
            id="tab-accents-btn"
            onClick={() => setActiveTab('accents')}
            className={`flex items-center gap-2 px-5 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'accents'
                ? 'bg-[#E25822] text-white shadow-md scale-102'
                : 'bg-white/80 hover:bg-white text-[#23211E] border border-[#E6DCBF]'
            }`}
          >
            <Volume2 className="w-4 h-4 text-amber-200" />
            <span>Local Accent & Pronunciation Studio</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'instruments' ? (
            <div className="space-y-5">
              {/* Instrument Selector Pill Row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {instrumentsList.map((inst) => {
                  const isSelected = selectedInstrument === inst.id;
                  return (
                    <button
                      key={inst.id}
                      type="button"
                      id={`select-inst-${inst.id}`}
                      onClick={() => setSelectedInstrument(inst.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl shrink-0 text-xs sm:text-sm font-black transition-all ${
                        isSelected
                          ? 'bg-[#1D3E2F] text-white shadow-md ring-2 ring-[#1D3E2F]/40'
                          : 'bg-white hover:bg-[#F3ECD8] border border-[#E6DCBF] text-[#23211E]'
                      }`}
                    >
                      <span className="text-base">{inst.icon}</span>
                      <span>{inst.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Instrument Player Component */}
              <InstrumentSoundPlayer instrument={selectedInstrument} />
            </div>
          ) : (
            <div className="space-y-5">
              {/* Region Filter Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-[#7C4728] mr-1 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Region:
                </span>
                {['ALL', 'West Africa', 'East Africa', 'Southern Africa', 'North Africa', 'Central Africa'].map(
                  (reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setSelectedRegionFilter(reg)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        selectedRegionFilter === reg
                          ? 'bg-[#E25822] text-white shadow-xs'
                          : 'bg-white hover:bg-[#F3ECD8] border border-[#E6DCBF] text-[#23211E]'
                      }`}
                    >
                      {reg === 'ALL' ? 'All Regions' : reg}
                    </button>
                  )
                )}
              </div>

              {/* Word List Chips */}
              <div className="p-3 rounded-2xl bg-white/80 border border-[#E6DCBF] space-y-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#7C4728]">
                  Select an authentic African word to hear in its local accent:
                </div>
                <div className="flex items-center gap-2 flex-wrap max-h-36 overflow-y-auto pr-1">
                  {filteredWords.map((word) => {
                    const isSelected = selectedWordId === word.id;
                    return (
                      <button
                        key={word.id}
                        type="button"
                        id={`select-word-${word.id}`}
                        onClick={() => setSelectedWordId(word.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#1D3E2F] text-white shadow-sm ring-2 ring-[#1D3E2F]/40'
                            : 'bg-[#FAF6ED] hover:bg-[#F3ECD8] border border-[#E6DCBF] text-[#23211E]'
                        }`}
                      >
                        <span>{word.word}</span>
                        <span className="text-[10px] opacity-75 ml-1.5 font-normal">
                          ({word.language.split(' ')[0]})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Word Accent Card */}
              <LocalAccentPronunciationCard wordOrId={selectedWordId} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#E6DCBF] bg-[#F7F4EB] flex items-center justify-between text-xs text-[#7C4728]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E25822]" />
            <span>
              Real African Acoustic Physics & Syllable-Timed Dialect Prosody
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white hover:bg-[#F3ECD8] border border-[#D9CEB0] text-[#23211E] font-bold"
          >
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
