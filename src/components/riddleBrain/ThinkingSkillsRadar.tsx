import React from 'react';
import { Sparkles, Brain, Award, CheckCircle2 } from 'lucide-react';
import { ThinkingSkill } from '../../types/riddleBrain';
import { riddleBrainService } from '../../services/riddleBrainService';

interface ThinkingSkillsRadarProps {
  activeSkill?: ThinkingSkill | 'ALL';
  onSelectSkill?: (skill: ThinkingSkill | 'ALL') => void;
}

const SKILL_METADATA: Record<
  ThinkingSkill,
  { label: string; icon: string; description: string; color: string }
> = {
  REASONING: {
    label: 'Reasoning',
    icon: '⚖️',
    description: 'Constructing logical chains, balancing arguments and deductions',
    color: 'from-amber-500 to-orange-600'
  },
  OBSERVATION: {
    label: 'Observation',
    icon: '👁️',
    description: 'Noticing visual, biological, and spatial subtleties in the world',
    color: 'from-emerald-500 to-teal-600'
  },
  PATTERN_RECOGNITION: {
    label: 'Pattern Recognition',
    icon: '🌀',
    description: 'Identifying mathematical sequences, symmetries, and rhythmic cycles',
    color: 'from-blue-500 to-indigo-600'
  },
  LANGUAGE_SKILLS: {
    label: 'Language Skills',
    icon: '🗣️',
    description: 'Tonal discernment, wordplay, translation, and proverb wisdom',
    color: 'from-purple-500 to-pink-600'
  },
  MEMORY: {
    label: 'Memory',
    icon: '🧠',
    description: 'Retaining oral formulas, sequences, and multidimensional clues',
    color: 'from-rose-500 to-red-600'
  },
  SPATIAL_THINKING: {
    label: 'Spatial Thinking',
    icon: '📐',
    description: 'Visualizing geometric rotations, architectures, and physical grids',
    color: 'from-cyan-500 to-sky-600'
  },
  DEDUCTION: {
    label: 'Deduction',
    icon: '🔍',
    description: 'Eliminating impossibilities to uncover single necessary truths',
    color: 'from-teal-500 to-emerald-600'
  },
  PROBLEM_SOLVING: {
    label: 'Problem Solving',
    icon: '🛠️',
    description: 'Navigating real-world constraints, trades, and multi-step crossings',
    color: 'from-yellow-500 to-amber-600'
  },
  CURIOSITY: {
    label: 'Curiosity',
    icon: '✨',
    description: 'Asking how African wonders, waterfalls, and oases work',
    color: 'from-orange-500 to-amber-600'
  }
};

export const ThinkingSkillsRadar: React.FC<ThinkingSkillsRadarProps> = ({
  activeSkill = 'ALL',
  onSelectSkill
}) => {
  const stats = riddleBrainService.getStats();

  const skillsList: ThinkingSkill[] = [
    'REASONING',
    'OBSERVATION',
    'PATTERN_RECOGNITION',
    'LANGUAGE_SKILLS',
    'MEMORY',
    'SPATIAL_THINKING',
    'DEDUCTION',
    'PROBLEM_SOLVING',
    'CURIOSITY'
  ];

  return (
    <div className="bg-[#FAF3E0] rounded-3xl p-5 sm:p-6 border-2 border-[#D8C7A3] shadow-inner space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E0D4B2] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#7C4728] text-white flex items-center justify-center shadow-xs">
            <Brain className="w-4 h-4 text-amber-200" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#23211E] uppercase tracking-wider">
              Thinking Skills Playground Constellation
            </h3>
            <p className="text-xs text-[#7C4728]">
              Develop genuine cognitive capacities through authentic African challenges
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#7C4728]">
          <span className="px-3 py-1 rounded-full bg-white border border-[#D8C7A3]">
            {stats.totalSolved} Challenges Mastered
          </span>
          {onSelectSkill && activeSkill !== 'ALL' && (
            <button
              onClick={() => onSelectSkill('ALL')}
              className="px-2.5 py-1 rounded-full bg-[#E25822] text-white text-[11px] hover:bg-[#C85A32]"
            >
              Show All Skills
            </button>
          )}
        </div>
      </div>

      {/* Grid of 9 Skills - Clean wrapping grid without horizontal scrolling */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {skillsList.map((skill) => {
          const meta = SKILL_METADATA[skill];
          const score = stats.skillsMastery[skill] || 0;
          const isSelected = activeSkill === skill;

          return (
            <button
              key={skill}
              onClick={() => onSelectSkill?.(isSelected ? 'ALL' : skill)}
              className={`p-2 sm:p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1 group relative touch-manipulation ${
                isSelected
                  ? 'bg-white border-[#E25822] shadow-md ring-2 ring-[#E25822]/20'
                  : 'bg-white/70 hover:bg-white border-[#E0D4B2] hover:border-[#C85A32]'
              }`}
              title={`${meta.label}: ${meta.description}`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{meta.icon}</span>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#23211E] leading-tight line-clamp-1">
                {meta.label}
              </span>
              <div className="w-full mt-1 bg-[#E6DCBF] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E25822] to-[#1D3E2F] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, score * 25)}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-[#7C4728] mt-0.5">
                {score > 0 ? `${score}★` : 'Explore'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
