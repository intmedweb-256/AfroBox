import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  icon: string;
  conflictsWith: string[];
}

const ITEMS: Item[] = [
  { id: 'leopard', name: 'Leopard', icon: '🐆', conflictsWith: ['goat'] },
  { id: 'goat', name: 'Goat', icon: '🐐', conflictsWith: ['yam'] },
  { id: 'yam', name: 'Yam Leaves', icon: '🌿', conflictsWith: [] }
];

interface RiverCrossingSimulatorProps {
  onSuccess: () => void;
  onPlayVoice?: (text: string) => void;
}

export const RiverCrossingSimulator: React.FC<RiverCrossingSimulatorProps> = ({
  onSuccess,
  onPlayVoice
}) => {
  const [leftBank, setLeftBank] = useState<string[]>(['leopard', 'goat', 'yam']);
  const [boatItems, setBoatItems] = useState<string[]>([]);
  const [rightBank, setRightBank] = useState<string[]>([]);
  const [boatPosition, setBoatPosition] = useState<'left' | 'right'>('left');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [stepCount, setStepCount] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  const checkSafety = (bankItems: string[], bankName: string): boolean => {
    // If traveler is on this bank, everything is safe!
    const travelerIsHere = (bankName === 'left' && boatPosition === 'left') || (bankName === 'right' && boatPosition === 'right');
    if (travelerIsHere) return true;

    // If traveler is absent, check conflicts
    if (bankItems.includes('leopard') && bankItems.includes('goat')) {
      const msg = `⚠️ Oh no! The Leopard will eat the Goat on the ${bankName} bank!`;
      setAlertMessage(msg);
      onPlayVoice?.(msg);
      return false;
    }
    if (bankItems.includes('goat') && bankItems.includes('yam')) {
      const msg = `⚠️ Oh no! The Goat will eat the Yam Leaves on the ${bankName} bank!`;
      setAlertMessage(msg);
      onPlayVoice?.(msg);
      return false;
    }
    return true;
  };

  const handleToggleBoatItem = (itemId: string, currentSide: 'left' | 'right' | 'boat') => {
    if (isSolved) return;
    setAlertMessage(null);

    if (currentSide === 'boat') {
      // Unload from boat to current bank
      setBoatItems([]);
      if (boatPosition === 'left') {
        setLeftBank((prev) => [...prev, itemId]);
      } else {
        setRightBank((prev) => [...prev, itemId]);
      }
    } else {
      // Can only load if boat is on the same side and has room (capacity = 1 item)
      if (currentSide !== boatPosition) {
        setAlertMessage(`Move the canoe to the ${currentSide} bank first!`);
        return;
      }
      if (boatItems.length >= 1) {
        setAlertMessage('The dug-out canoe can only hold ONE item plus the traveler!');
        return;
      }

      // Load item into boat
      if (currentSide === 'left') {
        setLeftBank((prev) => prev.filter((id) => id !== itemId));
      } else {
        setRightBank((prev) => prev.filter((id) => id !== itemId));
      }
      setBoatItems([itemId]);
    }
  };

  const handleRowBoat = () => {
    if (isSolved) return;
    setAlertMessage(null);

    const nextPosition = boatPosition === 'left' ? 'right' : 'left';
    setBoatPosition(nextPosition);
    setStepCount((s) => s + 1);

    // Check abandoned bank safety
    const abandonedBank = boatPosition === 'left' ? leftBank : rightBank;
    const abandonedSideName = boatPosition === 'left' ? 'left' : 'right';

    if (!checkSafety(abandonedBank, abandonedSideName)) {
      return;
    }

    // Check win condition
    if (nextPosition === 'right' && boatItems.length === 0 && rightBank.length === 3) {
      setIsSolved(true);
      onSuccess();
      onPlayVoice?.('Splendid! You safely guided all three companions across the River Niger!');
    }
  };

  const handleReset = () => {
    setLeftBank(['leopard', 'goat', 'yam']);
    setBoatItems([]);
    setRightBank([]);
    setBoatPosition('left');
    setAlertMessage(null);
    setStepCount(0);
    setIsSolved(false);
  };

  const getItem = (id: string) => ITEMS.find((i) => i.id === id);

  return (
    <div className="bg-[#FAF3E0] rounded-3xl p-5 sm:p-6 border-2 border-[#D8C7A3] shadow-inner space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-extrabold text-[#7C4728] uppercase tracking-wider">
            Hands-on Thinking Tool: River Crossing Simulator
          </h4>
          <p className="text-xs text-[#5C4033]">
            Tap an item to load into the canoe. Tap "Row Across" to test your deduction!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#7C4728] border border-[#D8C7A3]">
            Step: {stepCount}
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-white text-[#C85A32] border border-[#D8C7A3] hover:bg-[#F0E8D0] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-100 text-red-900 border border-red-300 text-xs font-semibold animate-in fade-in">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{alertMessage}</span>
        </div>
      )}

      {isSolved && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Brilliant thinking! All three reached the opposite bank safely!</span>
        </div>
      )}

      {/* River Canvas */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 items-stretch min-h-[190px] rounded-2xl bg-gradient-to-b sm:bg-gradient-to-r from-[#D7C49E] via-[#A8C8D8] to-[#D7C49E] p-3 sm:p-4 border border-[#B09E7B] relative overflow-hidden">
        {/* Left Bank */}
        <div className="bg-[#EFE5CE] rounded-xl p-3 border border-[#CBB892] flex flex-col justify-between">
          <div className="text-[11px] font-extrabold text-[#7C4728] uppercase text-center border-b border-[#CBB892]/60 pb-1 flex items-center justify-center gap-1">
            <span>West Bank (Start)</span>
            {boatPosition === 'left' && <span className="text-xs">🛶</span>}
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center py-2.5">
            {leftBank.map((id) => {
              const it = getItem(id);
              return (
                <button
                  key={id}
                  onClick={() => handleToggleBoatItem(id, 'left')}
                  disabled={boatPosition !== 'left'}
                  className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-white shadow-xs border border-[#CBB892] hover:bg-amber-50 active:scale-95 transition-all text-xs font-bold text-[#23211E] disabled:opacity-50 touch-manipulation"
                  title="Tap to load into canoe"
                >
                  <span className="text-xl">{it?.icon}</span>
                  <span>{it?.name}</span>
                </button>
              );
            })}
            {leftBank.length === 0 && <span className="text-[11px] text-[#A08C70] italic py-2">Empty</span>}
          </div>
          <div className="text-[10px] text-center font-bold text-[#7C4728]">
            {boatPosition === 'left' ? '🧑🏾‍🌾 Traveler is here' : ''}
          </div>
        </div>

        {/* River & Boat Middle */}
        <div className="flex flex-col items-center justify-center space-y-2.5 sm:space-y-3 py-2 sm:py-0">
          <div className="text-[10px] uppercase tracking-widest font-extrabold text-blue-900 bg-blue-100/80 px-2.5 py-0.5 rounded-full border border-blue-200">
            River Niger 🌊
          </div>

          <div
            className={`w-full max-w-[200px] sm:max-w-[150px] p-3 rounded-2xl bg-[#7C4728] text-white shadow-md border-2 border-[#542F18] flex flex-col items-center transition-all duration-300`}
          >
            <div className="text-[10px] font-extrabold text-amber-200">
              🛶 Canoe ({boatPosition === 'left' ? 'West' : 'East'} Bank)
            </div>
            <div className="text-xs font-semibold py-0.5">Traveler 🧑🏾‍🌾</div>

            {boatItems.length > 0 ? (
              <button
                onClick={() => handleToggleBoatItem(boatItems[0], 'boat')}
                className="mt-1.5 px-3 py-1.5 min-h-[36px] rounded-lg bg-amber-100 text-[#7C4728] text-xs font-bold flex items-center gap-1.5 hover:bg-white active:scale-95 shadow-xs touch-manipulation"
                title="Tap to unload into current bank"
              >
                <span className="text-base">{getItem(boatItems[0])?.icon}</span>
                <span>Unload {getItem(boatItems[0])?.name}</span>
              </button>
            ) : (
              <div className="text-[10px] text-amber-200/80 italic py-1">[ Canoe has 1 free seat ]</div>
            )}
          </div>

          <button
            onClick={handleRowBoat}
            className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#1D3E2F] text-white text-xs font-extrabold hover:bg-[#2A5642] active:scale-95 transition-all shadow-md touch-manipulation"
          >
            {boatPosition === 'left' ? (
              <>
                <span>Row to East Bank</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4" />
                <span>Row to West Bank</span>
              </>
            )}
          </button>
        </div>

        {/* Right Bank */}
        <div className="bg-[#EFE5CE] rounded-xl p-3 border border-[#CBB892] flex flex-col justify-between">
          <div className="text-[11px] font-extrabold text-[#7C4728] uppercase text-center border-b border-[#CBB892]/60 pb-1 flex items-center justify-center gap-1">
            <span>East Bank (Goal)</span>
            {boatPosition === 'right' && <span className="text-xs">🛶</span>}
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center py-2.5">
            {rightBank.map((id) => {
              const it = getItem(id);
              return (
                <button
                  key={id}
                  onClick={() => handleToggleBoatItem(id, 'right')}
                  disabled={boatPosition !== 'right'}
                  className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-white shadow-xs border border-[#CBB892] hover:bg-amber-50 active:scale-95 transition-all text-xs font-bold text-[#23211E] disabled:opacity-50 touch-manipulation"
                  title="Tap to load back into canoe"
                >
                  <span className="text-xl">{it?.icon}</span>
                  <span>{it?.name}</span>
                </button>
              );
            })}
            {rightBank.length === 0 && <span className="text-[11px] text-[#A08C70] italic py-2">Empty</span>}
          </div>
          <div className="text-[10px] text-center font-bold text-[#7C4728]">
            {boatPosition === 'right' ? '🧑🏾‍🌾 Traveler is here' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};
