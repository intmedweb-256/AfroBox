import React, { useState, useEffect } from 'react';
import {
  Volume2,
  X,
  Play,
  Square,
  Sparkles,
  Sliders,
  Check,
  Globe,
  UserCheck,
  RotateCcw,
  Headphones,
  Mic,
  Radio,
  Zap,
  ShieldCheck
} from 'lucide-react';
import {
  audioEngine,
  VoicePreferences,
  GRIOT_VOICE_PERSONAS,
  AIGriotVoice,
  NarratorEngineType
} from '../services/audioEngine';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceChanged?: () => void;
  onOpenFamilyStudio?: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  onVoiceChanged,
  onOpenFamilyStudio
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [pitch, setPitch] = useState<number>(0.96);
  const [rate, setRate] = useState<number>(0.90);
  const [narratorEngine, setNarratorEngine] = useState<NarratorEngineType>('AI_GRIOT');
  const [selectedAiVoice, setSelectedAiVoice] = useState<AIGriotVoice>('Kore');
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadVoiceData();
    }
  }, [isOpen]);

  const loadVoiceData = () => {
    const available = audioEngine.getAvailableVoices();
    setVoices(available);

    const prefs = audioEngine.getVoicePreferences();
    setSelectedVoiceURI(prefs.voiceURI || '');
    setPitch(prefs.pitch || 0.96);
    setRate(prefs.rate || 0.90);
    setNarratorEngine(prefs.narratorEngine || 'AI_GRIOT');
    setSelectedAiVoice(prefs.aiVoiceName || 'Kore');
  };

  if (!isOpen) return null;

  const handleTestAiVoice = (voiceId: AIGriotVoice) => {
    if (previewingVoiceId === voiceId) {
      audioEngine.stopSpeaking();
      setPreviewingVoiceId(null);
      return;
    }

    setPreviewingVoiceId(voiceId);
    audioEngine.testVoiceSample(
      'Once upon a time in the whispering savannas of Africa, the wise animals gathered beneath the ancient baobab tree.',
      undefined,
      pitch,
      rate,
      voiceId,
      'AI_GRIOT',
      () => setPreviewingVoiceId(null)
    );
  };

  const handleTestBrowserVoice = () => {
    if (previewingVoiceId === 'browser') {
      audioEngine.stopSpeaking();
      setPreviewingVoiceId(null);
      return;
    }

    setPreviewingVoiceId('browser');
    audioEngine.testVoiceSample(
      'Welcome to AfroBox! Let us explore stories and ancient wisdom.',
      selectedVoiceURI,
      pitch,
      rate,
      undefined,
      'BROWSER_SPEECH',
      () => setPreviewingVoiceId(null)
    );
  };

  const handleSaveAndApply = () => {
    audioEngine.stopSpeaking();
    audioEngine.saveVoicePreferences({
      narratorEngine,
      aiVoiceName: selectedAiVoice,
      voiceURI: selectedVoiceURI,
      pitch,
      rate
    });
    onVoiceChanged?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 sm:p-5 bg-white border-b border-[#E6DCBF] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#C85A32] shadow-2xs">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-[#23211E] font-['Urbanist'] leading-tight">
                  Story Narrator & Voice Settings
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold uppercase">
                  Studio HD
                </span>
              </div>
              <p className="text-xs text-[#7C4728] font-medium">
                Choose a warm, natural African oral storyteller or custom family voice
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#F0E8D0] text-[#7C4728] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Narrator Engine Mode Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-[#F0E8D0] p-1.5 rounded-2xl border border-[#E6DCBF]">
            <button
              type="button"
              onClick={() => setNarratorEngine('AI_GRIOT')}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                narratorEngine === 'AI_GRIOT'
                  ? 'bg-white text-[#23211E] shadow-xs'
                  : 'text-[#7C4728] hover:text-[#23211E]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Griot Studio HD Voices (Recommended)</span>
            </button>

            <button
              type="button"
              onClick={() => setNarratorEngine('BROWSER_SPEECH')}
              className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                narratorEngine === 'BROWSER_SPEECH'
                  ? 'bg-white text-[#23211E] shadow-xs'
                  : 'text-[#7C4728] hover:text-[#23211E]'
              }`}
            >
              <Radio className="w-4 h-4 text-stone-500" />
              <span>Device System Voices (Offline)</span>
            </button>
          </div>

          {/* MODE 1: Griot Studio Natural Voices */}
          {narratorEngine === 'AI_GRIOT' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase text-[#23211E] tracking-wider">
                    Select Your Griot Storyteller
                  </h3>
                  <p className="text-xs text-[#7C4728]">
                    Natural oral storytellers crafted with authentic African cadence and warmth
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {GRIOT_VOICE_PERSONAS.map((persona) => {
                  const isSelected = selectedAiVoice === persona.id;
                  const isPreviewing = previewingVoiceId === persona.id;

                  return (
                    <div
                      key={persona.id}
                      onClick={() => setSelectedAiVoice(persona.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#C85A32] bg-white ring-2 ring-amber-300 shadow-xs'
                          : 'border-[#E6DCBF] bg-white/70 hover:bg-white hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                          {persona.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-sm text-[#23211E] font-['Urbanist']">
                              {persona.name}
                            </h4>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                              {persona.title}
                            </span>
                          </div>
                          <p className="text-xs text-[#7C4728] leading-tight mt-0.5">
                            {persona.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleTestAiVoice(persona.id)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${
                            isPreviewing
                              ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                              : 'bg-[#FBF7EE] hover:bg-[#F0E8D0] text-[#7C4728] border-[#E6DCBF]'
                          }`}
                          title="Listen to preview audio sample"
                        >
                          {isPreviewing ? (
                            <>
                              <Square className="w-3 h-3 fill-white" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-amber-700 text-amber-700" />
                              <span>Preview</span>
                            </>
                          )}
                        </button>

                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[#C85A32] bg-[#C85A32] text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 2: Device System Voices (Fallback) */}
          {narratorEngine === 'BROWSER_SPEECH' && (
            <div className="space-y-4 p-4 bg-white rounded-2xl border border-[#E6DCBF] animate-in fade-in">
              <div>
                <label className="block text-xs font-black uppercase text-[#23211E] tracking-wider mb-1">
                  Device Synthesizer Voices ({voices.length} detected on your computer)
                </label>
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-[#7C4728] mb-2 leading-relaxed">
                  💡 <strong>Tip for Desktop Chrome/Windows:</strong> Basic desktop voices (like <em>Microsoft David</em>) sound mechanical. For smooth, human-sounding offline speech, choose a <strong>✨ Google</strong> or <strong>✨ Natural/Neural</strong> voice below, or switch to <strong>Griot Studio HD Voices</strong> above.
                </div>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCBF] bg-[#FBF7EE] text-xs font-bold text-[#23211E] focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
                >
                  <option value="">Auto-Selected Best Natural Voice (Optimized)</option>
                  {voices.map((v) => {
                    const n = v.name.toLowerCase();
                    const isNatural =
                      !n.includes('desktop') &&
                      !n.includes('david') &&
                      !n.includes('zira') &&
                      !n.includes('mark') &&
                      !n.includes('espeak') &&
                      (n.includes('google') ||
                        n.includes('natural') ||
                        n.includes('neural') ||
                        n.includes('online') ||
                        n.includes('enhanced') ||
                        n.includes('premium'));
                    return (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {isNatural ? '✨ ' : ''}{v.name} ({v.lang}) {isNatural ? '• Natural' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Pitch & Rate Controls */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#F0E8D0]">
                <div>
                  <div className="flex justify-between text-xs font-extrabold text-[#7C4728] mb-1">
                    <span>Reading Speed</span>
                    <span className="text-[#C85A32]">{rate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.05"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full accent-[#C85A32]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-extrabold text-[#7C4728] mb-1">
                    <span>Voice Pitch</span>
                    <span className="text-[#C85A32]">{pitch.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.2"
                    step="0.04"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full accent-[#C85A32]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleTestBrowserVoice}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C85A32] border border-amber-300 text-xs font-bold transition-all"
                >
                  {previewingVoiceId === 'browser' ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop Sample</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Test Browser Voice</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Option: Family Voices Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-xl shrink-0">
                🎙️
              </div>
              <div>
                <h4 className="text-xs font-black text-[#23211E]">
                  Want Mom, Dad, or Kids to Narrate Instead?
                </h4>
                <p className="text-[11px] text-[#7C4728] leading-tight">
                  You can record your family’s real voices scene-by-scene in the Family Voice Studio.
                </p>
              </div>
            </div>

            {onOpenFamilyStudio && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenFamilyStudio();
                }}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-xs font-black text-[#C85A32] shrink-0 shadow-2xs transition-colors"
              >
                Open Studio
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 bg-[#FBF7EE] border-t border-[#E6DCBF] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              audioEngine.stopSpeaking();
              onClose();
            }}
            className="px-4 py-2 rounded-xl border border-[#E6DCBF] text-xs font-bold text-[#7C4728] hover:bg-[#F0E8D0]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveAndApply}
            className="px-5 py-2 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-black shadow-2xs transition-all"
          >
            Save & Apply Story Voice
          </button>
        </footer>
      </div>
    </div>
  );
};
