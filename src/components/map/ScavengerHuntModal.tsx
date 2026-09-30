import React, { useState } from 'react';
import {
  Compass,
  X,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Award
} from 'lucide-react';
import { EXPLORER_MISSIONS, ScavengerMission, MAP_PINS, MapPinItem } from '../../data/mapData';
import { audioEngine } from '../../services/audioEngine';

interface ScavengerHuntModalProps {
  onClose: () => void;
  onLocatePin: (pin: MapPinItem) => void;
  discoveredPinIds: string[];
}

export const ScavengerHuntModal: React.FC<ScavengerHuntModalProps> = ({
  onClose,
  onLocatePin,
  discoveredPinIds
}) => {
  const [selectedMission, setSelectedMission] = useState<ScavengerMission>(EXPLORER_MISSIONS[0]);
  const [revealedHint, setRevealedHint] = useState<boolean>(false);

  const isCompleted = discoveredPinIds.includes(selectedMission.targetPinId);

  const handleSelectMission = (mission: ScavengerMission) => {
    setSelectedMission(mission);
    setRevealedHint(false);
    audioEngine.playSoundEffect('chime');
  };

  const handleStartMission = () => {
    const targetPin = MAP_PINS.find((p) => p.id === selectedMission.targetPinId);
    if (targetPin) {
      audioEngine.playSoundEffect('zoom');
      onLocatePin(targetPin);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FBF7EE] w-full max-w-2xl rounded-3xl border-2 border-[#E6DCBF] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E6DCBF] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E25822] text-white flex items-center justify-center shadow-xs">
              <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#E25822]">
                AfroBox Explorer Quests
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#23211E] font-['Urbanist']">
                Curiosity Scavenger Hunt
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F0E8D0] hover:bg-[#E0D4B2] text-[#23211E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mission Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {EXPLORER_MISSIONS.map((mission, idx) => {
            const done = discoveredPinIds.includes(mission.targetPinId);
            const isSelected = selectedMission.id === mission.id;

            return (
              <button
                key={mission.id}
                onClick={() => handleSelectMission(mission)}
                className={`p-3 rounded-2xl text-left border-2 transition-all relative ${
                  isSelected
                    ? 'bg-white border-[#E25822] shadow-sm -translate-y-0.5'
                    : 'bg-[#F0E8D0]/60 hover:bg-white border-transparent'
                }`}
              >
                <div className="text-xs font-extrabold text-[#7C4728]">Quest {idx + 1}</div>
                <div className="text-xs font-bold text-[#23211E] mt-0.5 line-clamp-1">
                  {mission.title}
                </div>
                {done && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-extrabold">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Quest Card */}
        <div className="bg-white rounded-2xl border-2 border-[#E6DCBF] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D3E2F]">
              Mission Target
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F0E8D0] text-[#7C4728]">
              Region: {selectedMission.targetRegion}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#23211E] font-['Urbanist']">
            {selectedMission.title}
          </h3>

          <p className="text-sm sm:text-base text-[#23211E] font-semibold leading-relaxed bg-[#FBF7EE] p-4 rounded-xl border border-[#E6DCBF]">
            "{selectedMission.prompt}"
          </p>

          {/* Compass Clue Section */}
          <div className="space-y-2">
            {!revealedHint ? (
              <button
                onClick={() => {
                  audioEngine.playSoundEffect('chime');
                  setRevealedHint(true);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#E25822] hover:underline"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Whisper a Compass Clue...</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2 animate-in fade-in">
                <Compass className="w-5 h-5 text-[#E25822] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Compass Whisper:</span>{' '}
                  <span>{selectedMission.hint}</span>
                </div>
              </div>
            )}
          </div>

          {/* Reward Badge */}
          <div className="flex items-center justify-between text-xs font-bold text-[#7C4728] pt-2 border-t border-[#E6DCBF]">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D9822B]" />
              <span>Reward: {selectedMission.rewardSticker}</span>
            </span>
            {isCompleted && (
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Found & Unlocked!</span>
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#7C4728] hover:bg-[#F0E8D0] transition-colors"
          >
            Explore on My Own
          </button>

          <button
            id="start-mission-explore-btn"
            onClick={handleStartMission}
            className="px-6 py-2.5 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Search This on the Big Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
