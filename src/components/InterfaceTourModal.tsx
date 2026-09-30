import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Globe,
  Brain,
  PanelRight,
  Menu,
  Sparkles,
  ChevronRight,
  X,
  Volume2,
  CheckCircle2,
  HelpCircle,
  EyeOff
} from 'lucide-react';

interface InterfaceTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHideNextTime: () => void;
}

export const InterfaceTourModal: React.FC<InterfaceTourModalProps> = ({
  isOpen,
  onClose,
  onHideNextTime
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  if (!isOpen) return null;

  const tourSteps = [
    {
      badge: 'Step 1 of 4 • Navigation Dock',
      icon: <Menu className="w-6 h-6 text-[#E25822]" />,
      title: 'Left Vertical Quick Dock',
      desc: 'Quickly jump between the Setup Launcher, Hub, Interactive Map, Storylands, Riddles, Puzzles, and Word Chest with a single touch or click.',
      tip: 'Optimized for thumbs and touchpads on mobile tablets and landscape screens.'
    },
    {
      badge: 'Step 2 of 4 • Zero-Scroll Canvas',
      icon: <Globe className="w-6 h-6 text-emerald-700" />,
      title: 'Contained Interactive Stage',
      desc: 'The center stage stays completely visible on your screen without vertical page scrolling, keeping the tactile map, folktales, and riddles in immediate focus.',
      tip: 'Use full-screen mode anytime using the maximize button on the top HUD.'
    },
    {
      badge: 'Step 3 of 4 • Collapsible Side Panel',
      icon: <PanelRight className="w-6 h-6 text-[#C85A32]" />,
      title: 'Contextual Companion Panel',
      desc: 'The right side panel gives you instant access to story provenance, character voice tracks, African instrument soundboards, and daily quests.',
      tip: 'Tap "Hide Panel" in the top bar to collapse it whenever you want more space for the map.'
    },
    {
      badge: 'Step 4 of 4 • Multi-Track Voice',
      icon: <Volume2 className="w-6 h-6 text-amber-600" />,
      title: 'Audio Narrator & Family Studio',
      desc: 'Hear authentic African pronunciation, or tap "Voices" in the left dock to record customized family voices (Dad, Mom, Grandparent, Kid) for any folktale.',
      tip: 'Earn XP gems and continent discovery points as you explore!'
    }
  ];

  const current = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (dontShowAgain) {
      onHideNextTime();
    } else {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-[#FBF7EE] w-full max-w-lg rounded-3xl border-2 border-[#E6DCBF] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-[#E6DCBF] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E25822] to-[#C85A32] text-white flex items-center justify-center font-black text-sm shadow-xs">
              A
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#23211E] font-['Urbanist']">
                How to Navigate AfroBox
              </h2>
              <p className="text-[11px] text-[#7C4728] font-medium">Quick 30-second walkthrough</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#F0E8D0] text-[#7C4728] transition-colors"
            title="Close Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-5 pt-4 flex items-center gap-1.5">
          {tourSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'bg-[#E25822]'
                  : idx < currentStep
                  ? 'bg-[#1D3E2F]'
                  : 'bg-[#E6DCBF]'
              }`}
            />
          ))}
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6DCBF] shadow-2xs flex items-center justify-center shrink-0">
              {current.icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C85A32]">
                {current.badge}
              </span>
              <h3 className="text-lg font-black text-[#23211E] font-['Urbanist'] mt-0.5">
                {current.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#23211E] leading-relaxed">
            {current.desc}
          </p>

          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#E25822] shrink-0 mt-0.5" />
            <div className="text-xs text-[#7C4728] leading-snug">
              <span className="font-extrabold text-[#23211E]">Pro Tip: </span>
              {current.tip}
            </div>
          </div>
        </div>

        {/* Footer with "Hide Next Time" checkbox and action buttons */}
        <div className="bg-white px-5 py-4 border-t border-[#E6DCBF] flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-[#7C4728] cursor-pointer self-start sm:self-center select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 text-[#E25822] rounded-md border-stone-300 focus:ring-[#E25822]"
            />
            <span>Don't show this intro next time</span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onHideNextTime}
              className="flex-1 sm:flex-initial px-3 py-2 rounded-xl text-xs font-bold text-[#7C4728] hover:bg-[#F0E8D0] transition-colors"
            >
              Skip All
            </button>

            <button
              onClick={handleNext}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
