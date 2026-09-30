import React from 'react';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Brain,
  PackageOpen,
  ArrowRight,
  Sparkles,
  MapPin,
  Volume2,
  Award,
  Globe,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { AgeTier, PillarId } from '../types/afrobox';

interface AfroBoxHubProps {
  onSelectPillar: (pillar: PillarId) => void;
  ageTier: AgeTier;
  totalDiscoveriesCount: number;
  onQuickDiscoverEntity: (entityId: string) => void;
  onPlayVoice: (text: string) => void;
}

export const AfroBoxHub: React.FC<AfroBoxHubProps> = ({
  onSelectPillar,
  ageTier,
  totalDiscoveriesCount,
  onQuickDiscoverEntity,
  onPlayVoice
}) => {
  const handleWelcomeSpeech = () => {
    onPlayVoice(
      "Welcome to AfroBox! Explore African landscapes, hear authentic stories, guess clever riddles, and solve brain puzzles. Everything you find goes right into your Box!"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Warm African Landscape Hero Hub */}
      <section className="relative bg-gradient-to-br from-[#E25822] via-[#C85A32] to-[#7C4728] rounded-3xl p-6 sm:p-12 text-white shadow-lg overflow-hidden border-2 border-[#E08A5E]/30">
        {/* Decorative warm sun & landscape glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-[#F4B32A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#2A729A]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Tag & Voice Prompt */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs text-[#FBF7EE] text-xs font-extrabold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B32A]" />
              <span>AfroBox Digital World</span>
            </span>
            <button
              onClick={handleWelcomeSpeech}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs font-bold transition-colors cursor-pointer"
              title="Hear AfroBox Narrator"
            >
              <Volume2 className="w-3.5 h-3.5 text-white" />
              <span>Hear Welcome</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-['Urbanist'] tracking-tight leading-tight">
            Discover Africa Through Stories, Play & Living Curiosity
          </h1>

          <p className="mt-3 text-white/90 text-sm sm:text-lg leading-relaxed font-medium">
            You are inside a warm, connected African world. From ancient baobab trees and lake
            waters to medieval stone cities and melodic harps—every discovery belongs to you!
          </p>

          {/* Quick Hub Stats & Age Tier Indicator */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-xs border border-white/20 flex items-center gap-2.5">
              <PackageOpen className="w-5 h-5 text-[#F4B32A]" />
              <div>
                <div className="text-xs text-white/80 font-semibold">Your AfroBox Collection</div>
                <div className="text-sm font-extrabold text-white">
                  {totalDiscoveriesCount} Discoveries Saved
                </div>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-xs border border-white/20 flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-[#F4B32A]" />
              <div>
                <div className="text-xs text-white/80 font-semibold">Experience Mode</div>
                <div className="text-sm font-extrabold text-white">
                  Ages {ageTier} • {ageTier === '6-8' ? 'Visual & Audio' : ageTier === '9-10' ? 'Clues & Puzzles' : 'Deep Context'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Main Pillars Grid (Section 7) */}
      <section className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-[#7C4728]">
            The Four Worlds of AfroBox
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23211E] font-['Urbanist']">
            Where would you like to travel today?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* PILLAR 1: EXPLORE AFRICA */}
          <div
            id="pillar-card-explore"
            onClick={() => onSelectPillar('EXPLORE')}
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] hover:border-[#1D3E2F] p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#1D3E2F] text-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                🌍
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#1D3E2F] mt-4">
                Pillar 1 • Geography & Places
              </div>
              <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist'] mt-1 group-hover:text-[#1D3E2F] transition-colors">
                Explore Africa
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#7C4728] leading-relaxed font-medium">
                Tap mountains, great lakes, ancient river deltas, and cities. Watch objects come to
                life with voice and facts!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6DCBF] flex items-center justify-between text-xs font-bold text-[#1D3E2F]">
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* PILLAR 2: STORYLANDS */}
          <div
            id="pillar-card-storylands"
            onClick={() => onSelectPillar('STORYLANDS')}
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] hover:border-[#C85A32] p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#C85A32] text-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                📖
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#C85A32] mt-4">
                Pillar 2 • Stories & Voices
              </div>
              <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist'] mt-1 group-hover:text-[#C85A32] transition-colors">
                Storylands
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#7C4728] leading-relaxed font-medium">
                Immerse in authentic folktales, Ugandan origin legends (Bachwezi crater lakes, Buganda Kintu & Nambi, Lango Olum, Bamasaba Mount Elgon), African gods, sacred names, and the new Content Ingestion Pipeline.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6DCBF] flex items-center justify-between text-xs font-bold text-[#C85A32]">
              <span>Open Library</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* PILLAR 3: RIDDLE & BRAIN */}
          <div
            id="pillar-card-riddle"
            onClick={() => onSelectPillar('RIDDLE')}
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] hover:border-[#D9822B] p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#D9822B] text-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                🧠
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#D9822B] mt-4">
                Pillar 3 • Riddle & Brain
              </div>
              <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist'] mt-1 group-hover:text-[#D9822B] transition-colors">
                Riddle & Brain
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#7C4728] leading-relaxed font-medium">
                Culturally sourced African riddles, oral call-and-response chants, and starlight clue mysteries with verified provenance!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6DCBF] flex items-center justify-between text-xs font-bold text-[#D9822B]">
              <span>Enter Thinking Playground</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* PILLAR 4: BRAIN & LOGIC */}
          <div
            id="pillar-card-brain"
            onClick={() => onSelectPillar('BRAIN')}
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] hover:border-[#2A729A] p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#2A729A] text-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                🧩
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#2A729A] mt-4">
                Pillar 4 • Logic & Reasoning
              </div>
              <h3 className="text-xl font-extrabold text-[#23211E] font-['Urbanist'] mt-1 group-hover:text-[#2A729A] transition-colors">
                Logic & Puzzles
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#7C4728] leading-relaxed font-medium">
                River Niger crossing simulators, Great Zimbabwe chevron stone geometry, Kejetia market barter, and Chokwe sand patterns.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E6DCBF] flex items-center justify-between text-xs font-bold text-[#2A729A]">
              <span>Solve Challenges</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 & 14: The AfroBox Connected Learning Loop Banner */}
      <section className="bg-[#F0E8D0] rounded-3xl p-6 sm:p-8 border-2 border-[#E0D4B2] space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#E25822]" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C4728]">
            The AfroBox Connected Ecosystem
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#23211E] font-['Urbanist']">
          How everything connects together:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          <div className="bg-[#FBF7EE] p-3.5 rounded-2xl border border-[#E6DCBF] text-center">
            <div className="text-2xl mb-1">📖</div>
            <div className="text-xs font-extrabold text-[#C85A32]">1. Storylands</div>
            <div className="text-[11px] text-[#7C4728] mt-1">Read a story set on Lake Victoria</div>
          </div>

          <div className="bg-[#FBF7EE] p-3.5 rounded-2xl border border-[#E6DCBF] text-center">
            <div className="text-2xl mb-1">🌍</div>
            <div className="text-xs font-extrabold text-[#1D3E2F]">2. Explore Africa</div>
            <div className="text-[11px] text-[#7C4728] mt-1">Discover Lake Victoria & Tilapia fish</div>
          </div>

          <div className="bg-[#FBF7EE] p-3.5 rounded-2xl border border-[#E6DCBF] text-center">
            <div className="text-2xl mb-1">❓</div>
            <div className="text-xs font-extrabold text-[#D9822B]">3. Riddle</div>
            <div className="text-[11px] text-[#7C4728] mt-1">Solve the "Silver Lake Swimmer"</div>
          </div>

          <div className="bg-[#FBF7EE] p-3.5 rounded-2xl border border-[#E6DCBF] text-center">
            <div className="text-2xl mb-1">🧩</div>
            <div className="text-xs font-extrabold text-[#2A729A]">4. Brain</div>
            <div className="text-[11px] text-[#7C4728] mt-1">Match Uganda, Kenya & Tanzania</div>
          </div>

          <div className="bg-[#FBF7EE] p-3.5 rounded-2xl border border-[#E6DCBF] text-center">
            <div className="text-2xl mb-1">🎁</div>
            <div className="text-xs font-extrabold text-[#E25822]">5. My Box</div>
            <div className="text-[11px] text-[#7C4728] mt-1">4 new discoveries enter your Box!</div>
          </div>
        </div>
      </section>

      {/* Featured Curiosity Card (Section 6: Environmental Movement & Tap to Discover) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DCBF] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#E6DCBF] flex items-center justify-center text-4xl shrink-0 shadow-2xs">
            🌳
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase text-[#D9822B]">
              Curious Question of the Day
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#23211E] font-['Urbanist'] mt-0.5">
              Why do people call the Baobab the "Tree of Life"?
            </h4>
            <p className="text-xs sm:text-sm text-[#7C4728] mt-1">
              Its hollow trunk can store over 100,000 liters of water through dry seasons and live
              for more than 2,000 years!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onQuickDiscoverEntity('entity-baobab')}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-[#E25822] hover:bg-[#C85A32] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore the Baobab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
