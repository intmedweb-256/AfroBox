import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Smartphone,
  Globe,
  Headphones,
  X,
  Heart,
  Users,
  Award,
  Sparkles,
  BookOpen,
  Mic,
  Star
} from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ROADMAP' | 'VOICES'>('ROADMAP');

  if (!isOpen) return null;

  const crowdfundingTiers = [
    {
      tier: 'Early Believer / App Backer',
      amount: '$15',
      badge: 'Seed Supporter',
      perks: [
        'Lifetime access to the AfroBox platform on web, mobile, and tablet',
        'Early community supporter badge in your profile',
        'Special name listed in the Ancestral Wall of Gratitude'
      ]
    },
    {
      tier: 'Cultural Story Weaver',
      amount: '$35',
      badge: 'Storyteller',
      perks: [
        'All previous tier perks',
        'Exclusive access to newly released Tribal Origin Chronicles & Pantheon audio',
        'Family Voice Studio multi-track recording unlocked forever'
      ]
    },
    {
      tier: 'School & Classroom Champion',
      amount: '$100',
      badge: 'Community Builder',
      perks: [
        'Sponsors a full classroom license for the upcoming "AfroBox for Schools" Edition',
        'Curriculum guide download bundle with lesson plans and map quizzes',
        'Direct input on the next African tribe origin legends added'
      ]
    },
    {
      tier: 'Heritage Guardian & Patron',
      amount: '$250+',
      badge: 'Patron of Heritage',
      perks: [
        'All previous perks + custom voice narration credit in an official story',
        'Invitation to founder briefings and roadmap design reviews',
        'Commemorative hand-illustrated digital art certificate'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-[#FBF7EE] border border-[#E6DCBF] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#23211E]">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1D3E2F] text-amber-300 flex items-center justify-center text-xl shadow-xs">
              🌍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-['Urbanist'] text-[#1D3E2F]">
                  AfroBox Community Vision & Roadmap
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Community Roadmap
                </span>
              </div>
              <p className="text-xs text-[#7C4728] font-bold">
                Preserving African heritage, oral traditions & diaspora educational access
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-stone-200 text-[#23211E] border border-[#E6DCBF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#EDE3C8] border-b border-[#E0D4B2] overflow-x-auto text-xs font-extrabold scrollbar-none">
          <button
            onClick={() => setActiveTab('ROADMAP')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'ROADMAP'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Vision & Crowdfunding Roadmap</span>
          </button>
          <button
            onClick={() => setActiveTab('VOICES')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'VOICES'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>2. Oral Storytelling & Voice Experience</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {/* TAB 1: VISION & CROWDFUNDING ROADMAP */}
          {activeTab === 'ROADMAP' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#F0E8D0] border border-[#E6DCBF] space-y-2">
                <div className="flex items-center gap-2 font-black text-[#1D3E2F]">
                  <Sparkles className="w-4 h-4 text-[#C85A32]" />
                  <span>The Vision: Bringing African Heritage to Every Child & Classroom</span>
                </div>
                <p className="text-xs text-[#7C4728] leading-relaxed">
                  AfroBox is dedicated to celebrating authentic African oral storytelling, indigenous cultural geography, and ancestral wisdom. Our roadmap expands the platform to support classroom projectors, teacher lesson guides, and community-driven diaspora stories.
                </p>
              </div>

              {/* Classroom & Diaspora Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="font-black text-emerald-950 flex items-center gap-1.5 mb-1">
                    <span>📱</span>
                    <span>AfroBox (Family & Child Edition)</span>
                  </div>
                  <p className="text-emerald-800 leading-snug">
                    Tactile exploration on mobile and tablet, offline zero-scroll learning, personal star progress, and family voice recordings by parents and children.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="font-black text-amber-950 flex items-center gap-1.5 mb-1">
                    <span>🏫</span>
                    <span>AfroBox for Schools (Classroom Edition)</span>
                  </div>
                  <p className="text-amber-800 leading-snug">
                    Classroom smartboard projection mode, teacher curriculum alignment guides, African geography quizzes, and tribal origin studies for elementary students.
                  </p>
                </div>
              </div>

              {/* Crowdfunding Campaign Tiers */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#1D3E2F]">
                    Community Supporter Tiers
                  </h4>
                  <span className="text-[11px] font-bold text-[#C85A32]">
                    Kickstarter & Patron Campaign
                  </span>
                </div>

                <div className="space-y-2.5">
                  {crowdfundingTiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <strong className="text-[#23211E] font-black">{tier.tier}</strong>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-bold">
                            {tier.badge}
                          </span>
                        </div>
                        <span className="text-sm font-black text-[#C85A32]">{tier.amount}</span>
                      </div>
                      <ul className="text-xs text-stone-600 space-y-0.5 list-disc list-inside">
                        {tier.perks.map((p, pIdx) => (
                          <li key={pIdx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VOICE & AUDIO EXPERIENCE */}
          {activeTab === 'VOICES' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="font-bold text-emerald-950 text-sm mb-1 flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-emerald-700" />
                  <span>Dual Storyteller Audio Pipeline</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  AfroBox combines authentic African oral storytelling traditions with high-definition voice generation, indigenous pronunciation guides, and multi-track family recordings.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] shadow-2xs space-y-1">
                  <div className="font-bold text-xs text-[#1D3E2F] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>1. Griot Studio HD Oral Storytellers</span>
                  </div>
                  <p className="text-xs text-[#7C4728] leading-relaxed">
                    Choose from 5 distinct African griot personas (Mama Griot Kore, Elder Babatunde, Brother Kwaku, Sister Amina, Elder Osei) delivering warm, captivating cadence and rhythmic storytelling designed for children.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] shadow-2xs space-y-1">
                  <div className="font-bold text-xs text-[#1D3E2F] flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-emerald-700" />
                    <span>2. Family Voice Studio Recording</span>
                  </div>
                  <p className="text-xs text-[#7C4728] leading-relaxed">
                    Parents, grandparents, and children can record their own family voices (Dad, Mom, Child) for any story scene, preserving their mother tongue (e.g. Luganda, Runyankole, Swahili) on their private device.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] shadow-2xs space-y-1">
                  <div className="font-bold text-xs text-[#1D3E2F] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>3. Indigenous Language & Phonetic Guides</span>
                  </div>
                  <p className="text-xs text-[#7C4728] leading-relaxed">
                    Tap any highlighted folklore word or sacred greeting in stories and cultural lore to hear accurate, authentic African pronunciations with syllable-by-syllable breakdowns.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5EEDC] border-t border-[#E6DCBF] flex items-center justify-between">
          <span className="text-xs text-[#7C4728] font-bold">
            AfroBox • Community Roadmap
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1D3E2F] hover:bg-[#142C21] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Close & Explore
          </button>
        </div>
      </div>
    </div>
  );
};
