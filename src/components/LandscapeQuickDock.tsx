import React from 'react';
import {
  Zap,
  Globe,
  BookOpen,
  Brain,
  Puzzle,
  PackageOpen,
  Users,
  HelpCircle,
  Rocket
} from 'lucide-react';
import { PillarId } from '../types/afrobox';

interface LandscapeQuickDockProps {
  currentPillar: PillarId | 'HOME' | 'LAUNCHER';
  onSelectPillar: (pillar: PillarId | 'HOME' | 'LAUNCHER') => void;
  onOpenFamilyStudio?: () => void;
  onOpenTour?: () => void;
  onOpenDeployment?: () => void;
  onOpenProfiles?: () => void;
}

export const LandscapeQuickDock: React.FC<LandscapeQuickDockProps> = ({
  currentPillar,
  onSelectPillar,
  onOpenFamilyStudio,
  onOpenTour,
  onOpenDeployment,
  onOpenProfiles
}) => {

  const dockItems: {
    id: PillarId | 'HOME' | 'LAUNCHER';
    label: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'LAUNCHER',
      label: 'Setup',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      color: 'hover:bg-amber-50'
    },
    {
      id: 'HOME',
      label: 'Hub',
      icon: <span className="text-lg">🛖</span>,
      color: 'hover:bg-orange-50'
    },
    {
      id: 'EXPLORE',
      label: 'Map',
      icon: <Globe className="w-5 h-5 text-emerald-600" />,
      color: 'hover:bg-emerald-50'
    },
    {
      id: 'STORYLANDS',
      label: 'Stories',
      icon: <BookOpen className="w-5 h-5 text-[#C85A32]" />,
      color: 'hover:bg-amber-50'
    },
    {
      id: 'RIDDLE',
      label: 'Riddles',
      icon: <Brain className="w-5 h-5 text-orange-600" />,
      color: 'hover:bg-orange-50'
    },
    {
      id: 'BRAIN',
      label: 'Puzzles',
      icon: <span className="text-lg">🧩</span>,
      color: 'hover:bg-sky-50'
    },
    {
      id: 'MY_BOX',
      label: 'Chest',
      icon: <PackageOpen className="w-5 h-5 text-amber-600" />,
      color: 'hover:bg-amber-50'
    }
  ];

  return (
    <nav
      aria-label="Quick Access Dock"
      className="hidden md:flex flex-col items-center justify-between py-3 px-2 bg-[#FBF7EE] border-r border-[#E6DCBF] shadow-xs w-16 lg:w-20 shrink-0 select-none z-30"
    >
      <div className="flex flex-col items-center gap-2 w-full">
        {dockItems.map((item) => {
          const isActive = currentPillar === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPillar(item.id)}
              className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? 'bg-[#1D3E2F] text-white shadow-xs scale-105'
                  : `text-[#23211E] ${item.color} hover:text-[#1D3E2F]`
              }`}
              title={item.label}
            >
              <div className="flex items-center justify-center">{item.icon}</div>
              <span
                className={`text-[10px] font-black leading-none tracking-tight ${
                  isActive ? 'text-white' : 'text-[#7C4728]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Auxiliary Docks: Learner Profiles, Launch Suite, Family Studio & App Tour */}
      <div className="flex flex-col items-center gap-2 w-full pt-2 border-t border-[#E6DCBF]">
        {onOpenProfiles && (
          <button
            onClick={onOpenProfiles}
            className="w-full py-2 rounded-2xl bg-white hover:bg-amber-50 border border-[#E6DCBF] text-[#23211E] flex flex-col items-center justify-center gap-0.5 transition-all shadow-2xs hover:scale-102"
            title="Switch or manage child learner profiles"
          >
            <span className="text-base leading-none">👤</span>
            <span className="text-[9px] font-black text-[#7C4728]">Learners</span>
          </button>
        )}

        {onOpenDeployment && (
          <button
            onClick={onOpenDeployment}
            className="w-full py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 flex flex-col items-center justify-center gap-0.5 transition-all shadow-2xs"
            title="AfroBox Web Beta Testing & Roadmap"
          >
            <Rocket className="w-4 h-4 text-amber-700" />
            <span className="text-[9px] font-black">Beta</span>
          </button>
        )}

        {onOpenFamilyStudio && (
          <button
            onClick={onOpenFamilyStudio}
            className="w-full py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[#C85A32] flex flex-col items-center justify-center gap-0.5 transition-all shadow-2xs"
            title="Family Voice Studio (Dad, Wife, Son)"
          >
            <Users className="w-4 h-4" />
            <span className="text-[9px] font-extrabold">Voices</span>
          </button>
        )}

        {onOpenTour && (
          <button
            onClick={onOpenTour}
            className="w-full py-2 rounded-2xl bg-[#F0E8D0] hover:bg-[#E6DCBF] border border-[#E0D4B2] text-[#23211E] flex flex-col items-center justify-center gap-0.5 transition-all shadow-2xs"
            title="How to navigate AfroBox"
          >
            <HelpCircle className="w-4 h-4 text-[#E25822]" />
            <span className="text-[9px] font-extrabold">Tour</span>
          </button>
        )}
      </div>
    </nav>
  );
};
