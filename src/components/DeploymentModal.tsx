import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
  Smartphone,
  Globe,
  Headphones,
  FileCheck,
  Share2,
  AlertCircle,
  Copy,
  Check,
  X,
  Heart,
  Users,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'APP_DEPLOYMENT' | 'WEB_ROADMAP' | 'BETA_CHECKLIST' | 'AUDIO_FALLBACK'
  >('APP_DEPLOYMENT');

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const crowdfundingTiers = [
    {
      tier: 'Early Believer / App Backer',
      amount: '$15',
      badge: 'Seed Supporter',
      perks: [
        'Lifetime access to the Afro Box App on mobile and tablet',
        'Early beta tester badge in your profile',
        'Special name listed in the Ancestral Wall of Gratitude'
      ]
    },
    {
      tier: 'Cultural Story Weaver',
      amount: '$35',
      badge: 'Storyteller',
      perks: [
        'All previous tier perks',
        'Exclusive access to newly released Tribal Origin Chronicles & Gods pantheon audio',
        'Family Voice Studio multi-track unlocked forever'
      ]
    },
    {
      tier: 'School & Classroom Champion',
      amount: '$100',
      badge: 'Community Builder',
      perks: [
        'Sponsors a full classroom license for the upcoming "AfroBox for Schools" Web Edition',
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
        'Invitation to monthly founder beta briefings and roadmap design reviews',
        'Commemorative hand-illustrated digital art certificate'
      ]
    }
  ];

  const checklistItems = [
    {
      category: 'Visual & Media Quality',
      tasks: [
        { label: 'Map pin photos audited for factual accuracy (e.g. Mountain Gorilla, Victoria Falls, Pyramids, baobab trees)', completed: true },
        { label: 'Uncropped full image view toggle & full-screen lightbox modal functional', completed: true },
        { label: 'Fallbacks implemented for all images if offline or network throttled', completed: true }
      ]
    },
    {
      category: 'Cultural Lore & Tribal History',
      tasks: [
        { label: 'Tribal Origin Legends archive added under Stories (Yoruba, Kikuyu, Zulu, Ashanti, Dogon, Maasai, San, Oromo)', completed: true },
        { label: 'African Pantheon (Gods, Deities & Guardians) with domains, praise titles, and audio guides', completed: true },
        { label: 'Sacred Names & Meanings directory across Akan, Yoruba, Zulu, Kikuyu, Shona, and Swahili', completed: true },
        { label: 'Common Words & Greetings with interactive native audio speech synthesis', completed: true },
        { label: 'Traditional Homes & Sustainable Architecture catalog (Musgum, Great Zimbabwe, Toguna, Indlu, Manyatta)', completed: true }
      ]
    },
    {
      category: 'App Performance & PWA Offline',
      tasks: [
        { label: 'Client-side offline storage (My Box discoveries, word chest, story bookmarks, and progress)', completed: true },
        { label: 'Mobile-responsive layout with bottom persistent quick dock and landscape HUD', completed: true },
        { label: 'Audio Engine dual pipeline with streaming and prioritized African accents', completed: true }
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
              📱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black font-['Urbanist'] text-[#1D3E2F]">
                  AfroBox Web — Beta Testing & Roadmap
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Beta Version
                </span>
              </div>
              <p className="text-xs text-[#7C4728] font-bold">
                AfroBox Web Beta Release • Testing, Sharing, and Roadmap
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
            onClick={() => setActiveTab('APP_DEPLOYMENT')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'APP_DEPLOYMENT'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            1. Web Beta & Live Links
          </button>
          <button
            onClick={() => setActiveTab('WEB_ROADMAP')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'WEB_ROADMAP'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            2. Web Beta & Crowdfunding
          </button>
          <button
            onClick={() => setActiveTab('BETA_CHECKLIST')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'BETA_CHECKLIST'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            3. Verification Checklist
          </button>
          <button
            onClick={() => setActiveTab('AUDIO_FALLBACK')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'AUDIO_FALLBACK'
                ? 'bg-[#1D3E2F] text-white shadow-xs'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            4. Voice Architecture
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {/* TAB 1: WEB BETA & DEPLOYMENT */}
          {activeTab === 'APP_DEPLOYMENT' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm mb-1">
                  <Globe className="w-4 h-4 text-amber-700" />
                  <span>AfroBox Web (Beta Version)</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  This build is the official <strong>AfroBox Web</strong> beta release, designed for testing, community sharing, grant funding, and interactive storytelling across browsers, tablets, and smartboards.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#1D3E2F]">
                  App Deployment Pipeline
                </h3>

                <div className="p-4 rounded-2xl bg-white border border-[#E6DCBF] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-black text-[#23211E] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>1. Instant Live App Preview Link</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Active Now
                    </span>
                  </div>
                  <p className="text-xs text-[#7C4728]">
                    Send this URL directly to test users on Android, iPad, or mobile browsers. They can add it to their home screen as a standalone app icon.
                  </p>
                  <button
                    onClick={handleCopyUrl}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F5EEDC] hover:bg-[#E6DCBF] text-[#23211E] font-bold text-xs transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'App URL Copied!' : 'Copy Live App URL'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E6DCBF] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-black text-[#23211E] flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-indigo-600" />
                      <span>2. Cloud Run One-Click Production Deploy</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-[#7C4728] leading-relaxed">
                    Click <strong>Deploy</strong> in the AI Studio platform header. The build will bundle the Afro Box App via Vite into <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">dist/</code> and launch the container on Cloud Run with automated global HTTPS and CDN caching.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E6DCBF] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-black text-[#23211E] flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-amber-600" />
                      <span>3. Mobile App Packaging (Capacitor / Android APK)</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#7C4728] leading-relaxed">
                    Select <strong>Export to GitHub</strong> to wrap this codebase with Capacitor (<code className="bg-stone-100 px-1 py-0.5 rounded text-[11px]">npx cap add android</code>) for direct release onto the Google Play Store and Amazon Appstore.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEB BETA & CROWDFUNDING ROADMAP */}
          {activeTab === 'WEB_ROADMAP' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#F0E8D0] border border-[#E6DCBF] space-y-2">
                <div className="flex items-center gap-2 font-black text-[#1D3E2F]">
                  <Sparkles className="w-4 h-4 text-[#C85A32]" />
                  <span>Next Step: Transitioning to Web Beta & Crowdfunding</span>
                </div>
                <p className="text-xs text-[#7C4728] leading-relaxed">
                  As planned, once the <strong>Afro Box App</strong> is deployed, the platform will expand to a public web portal for large-scale beta testing and a crowdfunding campaign (Kickstarter / GoFundMe) to fund educational storytelling across the African diaspora.
                </p>
              </div>

              {/* Web vs App Clarification Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="font-black text-emerald-950 flex items-center gap-1.5 mb-1">
                    <span>📱</span>
                    <span>Afro Box (The App)</span>
                  </div>
                  <p className="text-emerald-800 leading-snug">
                    Currently deploying! Mobile, tablet, PWA, offline tactile learning, family voice recordings, and hands-on quests.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="font-black text-amber-950 flex items-center gap-1.5 mb-1">
                    <span>💻</span>
                    <span>AfroBox for Schools (The Web)</span>
                  </div>
                  <p className="text-amber-800 leading-snug">
                    Next phase! Large-format classroom projector mode, teacher curriculum alignment guides, school license dashboards, and community stretch goals.
                  </p>
                </div>
              </div>

              {/* Crowdfunding Campaign Tiers Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#1D3E2F]">
                    Crowdfunding Backer Tiers (Preview)
                  </h4>
                  <span className="text-[11px] font-bold text-[#C85A32]">
                    Kickstarter / GoFundMe Ready
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

          {/* TAB 3: BETA TESTING CHECKLIST */}
          {activeTab === 'BETA_CHECKLIST' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#1D3E2F]">
                  Beta Testing Readiness Matrix
                </h3>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Ready for Beta
                </span>
              </div>

              {checklistItems.map((group) => (
                <div key={group.category} className="p-4 rounded-2xl bg-white border border-[#E6DCBF] space-y-2">
                  <div className="font-bold text-xs uppercase tracking-wide text-[#7C4728]">
                    {group.category}
                  </div>
                  <div className="space-y-1.5">
                    {group.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#23211E]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{task.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: VOICE ARCHITECTURE */}
          {activeTab === 'AUDIO_FALLBACK' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="font-bold text-emerald-950 text-sm mb-1 flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-emerald-700" />
                  <span>Dual Audio Pipeline Active</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Afro Box combines authentic native pronunciation, local device synthesis with African accent prioritization (Nigeria, Kenya, South Africa, Ghana), and the Family Voice Studio recorder.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-1">
                  <div className="font-bold text-xs text-[#1D3E2F]">1. Common Words & Names Speech Engine</div>
                  <p className="text-xs text-[#7C4728]">
                    All entries in the new <strong>Common Words & Greetings</strong> and <strong>Sacred Names</strong> categories feature instant audio speech playback with accurate phonetics.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-1">
                  <div className="font-bold text-xs text-[#1D3E2F]">2. Family Voice Studio Multi-Track</div>
                  <p className="text-xs text-[#7C4728]">
                    Parents and kids can record their own voice tracks (Dad, Mom, Child) for any story paragraph and play it back in sync with text highlighting.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5EEDC] border-t border-[#E6DCBF] flex items-center justify-between">
          <span className="text-xs text-[#7C4728] font-bold">
            Afro Box App • Production Deployment Ready
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
