import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  BookOpen,
  Compass,
  Brain,
  Award,
  CheckCircle2,
  FileText,
  Sparkles,
  Download,
  Printer
} from 'lucide-react';
import { useSchoolMode } from '../../context/SchoolModeContext';

export const CurriculumGuideModal: React.FC = () => {
  const { isCurriculumOpen, setIsCurriculumOpen } = useSchoolMode();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'GEOGRAPHY' | 'LITERATURE' | 'STEM'>('OVERVIEW');

  if (!isCurriculumOpen) return null;

  return (
    <div
      id="curriculum-guide-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
      onClick={() => setIsCurriculumOpen(false)}
    >
      <div
        id="curriculum-guide-modal-dialog"
        className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E6DCBF] flex items-center justify-between bg-gradient-to-r from-[#1D3E2F] to-[#2D5A43] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
              🏫
            </div>
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200">
                Schools & Education Centers Guide
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Urbanist'] tracking-tight">
                Curriculum Alignment & Teacher Notes
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsCurriculumOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center border-b border-[#E6DCBF] bg-[#F0E8D0] px-4 overflow-x-auto scrollbar-none gap-1.5 py-2">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'OVERVIEW'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            📋 Framework & Standards
          </button>
          <button
            onClick={() => setActiveTab('GEOGRAPHY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'GEOGRAPHY'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            🌍 Geography & Biomes
          </button>
          <button
            onClick={() => setActiveTab('LITERATURE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'LITERATURE'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            📖 Oral Traditions & Literacy
          </button>
          <button
            onClick={() => setActiveTab('STEM')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'STEM'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            🧩 Logic, STEM & Math
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-[#23211E] flex-1">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <h4 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Classroom-Ready African Studies Framework</span>
                </h4>
                <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                  AfroBox delivers culturally grounded, primary-source-adapted learning experiences built for primary and middle school grades (Ages 6–12). Designed to complement Social Studies, World Geography, English/Language Arts, and STEM curricula without requiring complex software setups.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF]">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="font-extrabold text-xs text-[#23211E]">Mobile-First & Touch</div>
                  <div className="text-[11px] text-[#7C4728] mt-0.5">Zero-scroll overlays designed for iPads, Chromebooks, and smartboards.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF]">
                  <div className="text-2xl mb-1">🎙️</div>
                  <div className="font-extrabold text-xs text-[#23211E]">Bilingual & Multi-voice</div>
                  <div className="text-[11px] text-[#7C4728] mt-0.5">Community accents, indigenous instrument audio, and vocabulary builders.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF]">
                  <div className="text-2xl mb-1">🏛️</div>
                  <div className="font-extrabold text-xs text-[#23211E]">Documented Provenance</div>
                  <div className="text-[11px] text-[#7C4728] mt-0.5">Every folktale and landmark cites its cultural community and origin tradition.</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E6DCBF]">
                <h5 className="font-extrabold text-xs text-[#7C4728] uppercase tracking-wider mb-2">
                  Classroom Implementation Tips
                </h5>
                <ul className="space-y-2 text-xs text-[#23211E]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Smartboard Group Reading:</strong> Use the "Classroom Slide / Page by Page" mode in Storylands to project large, legible story scenes for whole-class read-alouds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Interactive Stations:</strong> Set up tablet stations where students explore the 5 regions of Africa and collect wonders into their personalized "My Box".</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Morning Thinking Bell:</strong> Solve 1 African riddle or logic puzzle together during morning homeroom to build deduction and cultural curiosity.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'GEOGRAPHY' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DCBF]">
                <h4 className="font-extrabold text-sm text-[#1D3E2F] mb-1">Pillar 1: Interactive African Geography</h4>
                <p className="text-[#7C4728] leading-relaxed">
                  Focuses on spatial reasoning, biomes, major waterways (Nile, Congo, Zambezi, Niger), geological formations (Rift Valley, Kilimanjaro, Table Mountain), ancient architectural feats, and wildlife stewardship.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#F0E8D0] border border-[#E0D4B2]">
                  <span className="font-bold text-[#1D3E2F]">Inquiry Question: </span>
                  <span>"How do Africa's great river basins connect communities across different countries and ecosystems?"</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F0E8D0] border border-[#E0D4B2]">
                  <span className="font-bold text-[#1D3E2F]">Classroom Activity: </span>
                  <span>Have students pick one wonder from each of the 5 regions (North, West, Central, East, Southern Africa) and compare the climates and native instruments.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'LITERATURE' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DCBF]">
                <h4 className="font-extrabold text-sm text-[#E25822] mb-1">Pillar 2: Storylands Oral Literature & Literacy</h4>
                <p className="text-[#7C4728] leading-relaxed">
                  Focuses on narrative comprehension, moral reflection, trickster archetypes (Ananse, Sungura), cosmological myths, and modern African technology narratives.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#F0E8D0] border border-[#E0D4B2]">
                  <span className="font-bold text-[#E25822]">Inquiry Question: </span>
                  <span>"Why do trickster characters like Kwaku Ananse both succeed through wit and fail through greed? What does this teach a village community?"</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F0E8D0] border border-[#E0D4B2]">
                  <span className="font-bold text-[#E25822]">Classroom Activity: </span>
                  <span>Use the audio recorder tool to have student pairs re-narrate a traditional folktale in their own words or practice local vocabulary pronunciations.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'STEM' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DCBF]">
                <h4 className="font-extrabold text-sm text-[#2A729A] mb-1">Pillar 3 & 4: African STEM, Logic & Ethnomathematics</h4>
                <p className="text-[#7C4728] leading-relaxed">
                  Covers Lusona (Chokwe sand graph theory), river-crossing deduction, fractal architecture in ancient settlements, and biomimicry inspired by termite mounds and baobab water storage.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#F0E8D0] border border-[#E0D4B2]">
                  <span className="font-bold text-[#2A729A]">STEM Connection: </span>
                  <span>Algorithmic thinking through African grid riddles, geometric symmetries in Adinkra symbols, and ecological problem solving.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E6DCBF] bg-[#F0E8D0] flex items-center justify-between text-xs">
          <span className="text-[#7C4728] font-bold">
            AfroBox Web Edition for Schools & Education Centers
          </span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E0D4B2] font-bold text-[#23211E] hover:bg-[#FBF7EE]"
          >
            <Printer className="w-3.5 h-3.5 text-[#1D3E2F]" />
            <span>Print Lesson Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
