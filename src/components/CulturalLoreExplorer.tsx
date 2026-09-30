import React, { useState, useMemo } from 'react';
import {
  ORIGIN_LEGENDS,
  DEITIES_DATA,
  SACRED_NAMES_DATA,
  COMMON_WORDS_DATA,
  TRADITIONAL_HOMES_DATA
} from '../data/culturalLoreData';
import {
  OriginLegend,
  DeityEntity,
  SacredNameEntity,
  CommonWordEntity,
  TraditionalHomeEntity
} from '../types/culturalLore';
import { audioEngine } from '../services/audioEngine';
import { afroboxStorage } from '../services/afroboxStorage';
import { gamificationService } from '../services/gamificationService';
import {
  BookOpen,
  Volume2,
  Sparkles,
  MapPin,
  Search,
  Check,
  Plus,
  Compass,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Home,
  Crown,
  Heart,
  Flame,
  Award,
  ExternalLink,
  Eye,
  X,
  Share2
} from 'lucide-react';

interface CulturalLoreExplorerProps {
  onSelectStoryById?: (storyId: string) => void;
  onNavigatePillar?: (pillar: any, contextId?: string) => void;
}

export type LoreCategory = 'ORIGINS' | 'DEITIES' | 'NAMES' | 'WORDS' | 'HOMES';

export const CulturalLoreExplorer: React.FC<CulturalLoreExplorerProps> = ({
  onSelectStoryById,
  onNavigatePillar
}) => {
  const [activeCategory, setActiveCategory] = useState<LoreCategory>('ORIGINS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTribeFilter, setSelectedTribeFilter] = useState<string>('ALL');
  const [selectedOriginModal, setSelectedOriginModal] = useState<OriginLegend | null>(null);
  const [selectedHomeModal, setSelectedHomeModal] = useState<TraditionalHomeEntity | null>(null);
  const [savedEntityIds, setSavedEntityIds] = useState<string[]>(() => {
    return afroboxStorage.getMyBoxState().discoveries.map((d) => d.entityId);
  });
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Audio speech handler
  const handlePronounce = (id: string, text: string) => {
    setSpeakingId(id);
    audioEngine.speakText(text);
    setTimeout(() => {
      setSpeakingId((curr) => (curr === id ? null : curr));
    }, 2500);
  };

  // Save to My Box
  const handleSaveToBox = (
    entityId: string,
    name: string,
    type: any,
    icon: string,
    region: any,
    country?: string
  ) => {
    afroboxStorage.addDiscovery({
      id: entityId,
      name,
      type,
      tagline: 'Afro Box Cultural Discovery',
      description: name,
      illustrationUrl: '',
      icon,
      region,
      country,
      relatedEntityIds: [],
      funFact: '',
      ageTier: '6-8'
    });
    setSavedEntityIds((prev) => [...prev, entityId]);
    gamificationService.triggerRewardEffect('discovery');
    audioEngine.playSoundEffect('kora');
  };

  // Distinct tribes list across datasets
  const allTribes = useMemo(() => {
    const set = new Set<string>();
    ORIGIN_LEGENDS.forEach((item) => set.add(item.tribe));
    DEITIES_DATA.forEach((item) => set.add(item.tribe));
    SACRED_NAMES_DATA.forEach((item) => set.add(item.tribe));
    COMMON_WORDS_DATA.forEach((item) => set.add(item.tribeOrCommunity));
    TRADITIONAL_HOMES_DATA.forEach((item) => set.add(item.tribe));
    return ['ALL', ...Array.from(set).sort()];
  }, []);

  // Filtered Origin Legends
  // Filtered Origin Legends
  const filteredOrigins = useMemo(() => {
    return ORIGIN_LEGENDS.filter((item) => {
      if (selectedTribeFilter === 'Uganda') {
        if (!item.country.includes('Uganda')) return false;
      } else if (selectedTribeFilter !== 'ALL' && !item.tribe.includes(selectedTribeFilter)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.tribe.toLowerCase().includes(q) ||
          item.founderOrHero.toLowerCase().includes(q) ||
          item.synopsis.toLowerCase().includes(q) ||
          item.sacredSite.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTribeFilter, searchQuery]);

  // Filtered Deities
  const filteredDeities = useMemo(() => {
    return DEITIES_DATA.filter((item) => {
      if (selectedTribeFilter === 'Uganda') {
        if (!item.country?.includes('Uganda')) return false;
      } else if (selectedTribeFilter !== 'ALL' && !item.tribe.includes(selectedTribeFilter)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.tribe.toLowerCase().includes(q) ||
          item.domain.toLowerCase().includes(q) ||
          item.role.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTribeFilter, searchQuery]);

  // Filtered Sacred Names
  const filteredNames = useMemo(() => {
    return SACRED_NAMES_DATA.filter((item) => {
      if (selectedTribeFilter === 'Uganda') {
        if (!item.country.includes('Uganda')) return false;
      } else if (selectedTribeFilter !== 'ALL' && !item.tribe.includes(selectedTribeFilter)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.meaning.toLowerCase().includes(q) ||
          item.tribe.toLowerCase().includes(q) ||
          item.spiritualSignificance.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTribeFilter, searchQuery]);

  // Filtered Common Words
  const filteredWords = useMemo(() => {
    return COMMON_WORDS_DATA.filter((item) => {
      if (selectedTribeFilter === 'Uganda') {
        const isUgandaWord =
          item.language?.includes('Luganda') ||
          item.language?.includes('Lango') ||
          item.language?.includes('Lumasaaba') ||
          item.language?.includes('Lugisu') ||
          item.language?.includes('Runyoro') ||
          item.tribeOrCommunity?.includes('Uganda') ||
          item.tribeOrCommunity?.includes('Buganda') ||
          item.tribeOrCommunity?.includes('Lango') ||
          item.tribeOrCommunity?.includes('Bamasaba') ||
          item.tribeOrCommunity?.includes('Bagisu') ||
          item.tribeOrCommunity?.includes('Bunyoro');
        if (!isUgandaWord) return false;
      } else if (selectedTribeFilter !== 'ALL' && !item.tribeOrCommunity.includes(selectedTribeFilter)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.word.toLowerCase().includes(q) ||
          item.englishMeaning.toLowerCase().includes(q) ||
          item.language.toLowerCase().includes(q) ||
          item.culturalNote.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTribeFilter, searchQuery]);

  // Filtered Traditional Homes
  const filteredHomes = useMemo(() => {
    return TRADITIONAL_HOMES_DATA.filter((item) => {
      if (selectedTribeFilter === 'Uganda') {
        if (!item.country.includes('Uganda')) return false;
      } else if (selectedTribeFilter !== 'ALL' && !item.tribe.includes(selectedTribeFilter)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.nativeName.toLowerCase().includes(q) ||
          item.tribe.toLowerCase().includes(q) ||
          item.architectureType.toLowerCase().includes(q) ||
          item.culturalSignificance.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedTribeFilter, searchQuery]);

  // Interactive Quiz questions on African cultural lore
  const quizQuestions = [
    {
      question:
        'In the Yoruba origin story of Ile-Ife, which sacred bird scattered the magic soil across the primeval waters to create dry earth?',
      options: ['The Five-Toed Rooster', 'The Crowned Crane', 'The Martial Eagle', 'The Hornbill'],
      correctIndex: 0,
      explanation:
        'Oduduwa lowered the golden chain and tipped the snail shell of magic earth, and the sacred five-toed rooster scratched and expanded the soil into land.'
    },
    {
      question:
        'Why was the ceiling of the Dogon Toguna council house in Mali intentionally built so low?',
      options: [
        'To store heavy bags of salt on top',
        'So elders cannot jump up in anger during arguments, forcing peaceful dialogue',
        'To keep wild desert lions from sleeping inside',
        'Because the Dogon were mythical miniature giants'
      ],
      correctIndex: 1,
      explanation:
        'The Toguna ceiling is low so that if an elder gets angry and jumps up, he bumps his head, reminding everyone to sit down and speak gently.'
    },
    {
      question:
        'In Akan / Ashanti naming tradition, what is the soul name (Kra din) for a boy born on Saturday?',
      options: ['Kofi', 'Kwame', 'Kwaku', 'Yaw'],
      correctIndex: 1,
      explanation:
        'Kwame is the Akan day name for a boy born on Saturday, symbolizing deep wisdom, dependability, and creative problem-solving.'
    },
    {
      question:
        'What sacred covenant was made between Enkai (the Sky God) and the Maasai people of East Africa?',
      options: [
        'To build stone pyramids in the desert',
        'To receive cattle lowered from heaven on a braided bark rope as a sacred trust',
        'To carve wooden boats for the Nile',
        'To harvest gold in the mountains'
      ],
      correctIndex: 1,
      explanation:
        'Enkai lowered humped cattle from the heavens down a braided bark rope into the care of the Maasai pastoralists.'
    },
    {
      question:
        'What does the ancient African word "Ubuntu" in Zulu and Xhosa signify?',
      options: [
        'Fast running across the hills',
        'A sacred golden spear',
        '"I am because we are" — collective humanity and mutual care',
        'A sweet honeycomb cake'
      ],
      correctIndex: 2,
      explanation:
        'Ubuntu embodies the philosophy: "Umuntu ngumuntu ngabantu" — a person is a person through other persons.'
    }
  ];

  const handleQuizAnswer = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedQuizAnswer(index);
    setIsAnswerSubmitted(true);
    if (index === quizQuestions[currentQuizIndex].correctIndex) {
      setQuizScore((prev) => prev + 1);
      gamificationService.triggerRewardEffect('discovery');
      audioEngine.playSoundEffect('kora');
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedQuizAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed quiz
      gamificationService.triggerRewardEffect('trophy');
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setSelectedQuizAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizActive(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner: Afro Box Cultural Lore & Tribal Heritage */}
      <div className="bg-gradient-to-br from-[#1D3E2F] via-[#2A5742] to-[#12241B] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-900/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-amber-300 text-xs font-black tracking-wide mb-3 border border-white/15">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Afro Box Heritage Archives</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Urbanist'] tracking-tight">
            Tribal Origin Legends, Gods & Living Traditions
          </h2>

          <p className="mt-2 text-stone-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
            Explore the ancestral origins of Africa’s proudest nations: sacred genesis stories, the
            pantheon of deities, destiny names and meanings, everyday greetings with native audio,
            and sustainable architectural wonders.
          </p>

          {/* Quick Stats Strip */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-xs border border-white/10 font-bold flex items-center gap-1.5">
              <span>📜</span> {ORIGIN_LEGENDS.length} Origin Legends
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-xs border border-white/10 font-bold flex items-center gap-1.5">
              <span>⚡</span> {DEITIES_DATA.length} Gods & Deities
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-xs border border-white/10 font-bold flex items-center gap-1.5">
              <span>✨</span> {SACRED_NAMES_DATA.length} Sacred Names
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-xs border border-white/10 font-bold flex items-center gap-1.5">
              <span>🗣️</span> {COMMON_WORDS_DATA.length} Words & Audio
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-xs border border-white/10 font-bold flex items-center gap-1.5">
              <span>🛖</span> {TRADITIONAL_HOMES_DATA.length} Ancient Homes
            </span>
            <button
              onClick={() => {
                setQuizActive(true);
                setCurrentQuizIndex(0);
                setQuizScore(0);
                setSelectedQuizAnswer(null);
                setIsAnswerSubmitted(false);
              }}
              className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black shadow-md transition-transform hover:scale-105 active:scale-95 touch-manipulation cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Cultural Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E6DCBF] pb-3">
        {[
          { id: 'ORIGINS', label: 'Origin Legends & History', icon: '📜', count: ORIGIN_LEGENDS.length },
          { id: 'DEITIES', label: 'Gods & Deities', icon: '⚡', count: DEITIES_DATA.length },
          { id: 'NAMES', label: 'Sacred Names & Meanings', icon: '✨', count: SACRED_NAMES_DATA.length },
          { id: 'WORDS', label: 'Common Words & Greetings', icon: '🗣️', count: COMMON_WORDS_DATA.length },
          { id: 'HOMES', label: 'Traditional Homes & Architecture', icon: '🛖', count: TRADITIONAL_HOMES_DATA.length }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`lore-tab-${tab.id.toLowerCase()}`}
            onClick={() => {
              setActiveCategory(tab.id as LoreCategory);
              setSearchQuery('');
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-2xs touch-manipulation ${
              activeCategory === tab.id
                ? 'bg-[#C85A32] text-white shadow-sm scale-102'
                : 'bg-white text-stone-700 hover:bg-amber-100/60 border border-[#E6DCBF]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeCategory === tab.id ? 'bg-black/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Search and Tribe Filter Control */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E6DCBF] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search in ${activeCategory.toLowerCase()} by tribe, name, meaning, or concept...`}
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-[#C85A32] text-stone-900 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedTribeFilter(selectedTribeFilter === 'Uganda' ? 'ALL' : 'Uganda')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTribeFilter === 'Uganda'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
            }`}
          >
            <span>🇺🇬</span>
            <span>{selectedTribeFilter === 'Uganda' ? 'Showing Uganda Lore' : 'Uganda Spotlight'}</span>
          </button>

          <select
            value={selectedTribeFilter}
            onChange={(e) => setSelectedTribeFilter(e.target.value)}
            className="text-xs font-bold bg-amber-50 text-stone-800 border border-amber-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#C85A32]"
          >
            <option value="ALL">🌍 All African Traditions</option>
            <option value="Uganda">🇺🇬 All Uganda Lore</option>
            {allTribes
              .filter((t) => t !== 'ALL')
              .map((t) => (
                <option key={t} value={t}>
                  {t.includes('Chewzi') || t.includes('Baganda') || t.includes('Lango') || t.includes('Gisu') || t.includes('Bamasaba') || t.includes('Bunyoro')
                    ? `🇺🇬 ${t}`
                    : `Tribe: ${t}`}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* 4. MAIN CATEGORY VIEWS */}

      {/* VIEW A: ORIGIN LEGENDS & HISTORY */}
      {activeCategory === 'ORIGINS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-[#23211E] font-['Urbanist'] flex items-center gap-2">
              <span>📜</span>
              <span>Tribal Origin Legends & Creation Chronicles</span>
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredOrigins.length} of {ORIGIN_LEGENDS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOrigins.map((origin) => {
              const isSaved = savedEntityIds.includes(origin.id);
              const isSpeaking = speakingId === origin.id;

              return (
                <div
                  key={origin.id}
                  className="bg-white rounded-3xl border border-[#E6DCBF] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group hover:border-[#C85A32]/50"
                >
                  {/* Photo Banner */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-900">
                    <img
                      src={origin.illustrationUrl}
                      alt={origin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Badge Chips */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-stone-950 font-black text-[11px] shadow-sm flex items-center gap-1">
                        <span>🛖</span> {origin.tribe}
                      </span>
                      <span className="px-2 py-1 rounded-xl bg-black/60 backdrop-blur-xs text-white font-bold text-[10px]">
                        {origin.region}
                      </span>
                    </div>

                    {/* Quick Pronounce Button */}
                    <button
                      onClick={() =>
                        handlePronounce(
                          origin.id,
                          origin.audioVoiceGuidance || `${origin.title}. ${origin.synopsis}`
                        )
                      }
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                        isSpeaking
                          ? 'bg-amber-500 text-stone-950 ring-2 ring-white scale-110'
                          : 'bg-black/50 hover:bg-black/80 text-white'
                      }`}
                      title="Listen to audio overview"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Title in Image Bottom */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-bold text-amber-300 tracking-wide uppercase">
                        {origin.subtitle}
                      </div>
                      <h4 className="text-base sm:text-lg font-black font-['Urbanist'] leading-tight drop-shadow-xs">
                        {origin.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {origin.synopsis}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
                      <div>
                        <span className="text-stone-400 font-semibold block">Founder / Hero:</span>
                        <span className="font-extrabold text-[#C85A32]">{origin.founderOrHero}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 font-semibold block">Sacred Site:</span>
                        <span className="font-extrabold text-stone-800 line-clamp-1">{origin.sacredSite}</span>
                      </div>
                    </div>

                    {/* Cultural Values Chips */}
                    <div className="flex flex-wrap gap-1">
                      {origin.culturalValues.map((val, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-100/70 text-amber-900 font-bold border border-amber-200"
                        >
                          ✦ {val}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedOriginModal(origin)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1D3E2F] hover:bg-[#142B21] text-white text-xs font-black shadow-xs transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Full Chronicle</span>
                      </button>

                      <button
                        onClick={() =>
                          handleSaveToBox(
                            origin.id,
                            origin.title,
                            'STORY',
                            '📜',
                            origin.region,
                            origin.country
                          )
                        }
                        className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                          isSaved
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                        title="Save to My Box"
                      >
                        {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: GODS & DEITIES */}
      {activeCategory === 'DEITIES' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-[#23211E] font-['Urbanist'] flex items-center gap-2">
              <span>⚡</span>
              <span>African Pantheon: Gods, Deities & Guardians of Nature</span>
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredDeities.length} of {DEITIES_DATA.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeities.map((deity) => {
              const isSaved = savedEntityIds.includes(deity.id);
              const isSpeaking = speakingId === deity.id;

              return (
                <div
                  key={deity.id}
                  className="bg-white rounded-3xl border border-[#E6DCBF] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group hover:border-amber-400"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-[#C85A32] text-white flex items-center justify-center text-xl shadow-xs">
                          {deity.icon}
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold text-[#23211E] font-['Urbanist'] leading-tight">
                            {deity.name}
                          </h4>
                          <span className="text-[10px] text-stone-500 font-semibold italic">
                            {deity.pronunciation}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handlePronounce(deity.id, deity.audioPronunciationText)}
                        className={`p-1.5 rounded-xl border transition-all ${
                          isSpeaking
                            ? 'bg-amber-500 text-stone-950 border-amber-600 scale-105'
                            : 'bg-stone-50 hover:bg-amber-100 text-stone-700 border-stone-200'
                        }`}
                        title="Pronounce name and role"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-bold">
                        {deity.tribe} ({deity.region})
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold">
                        {deity.domain}
                      </span>
                    </div>

                    <div className="text-[11px] font-bold text-[#C85A32] bg-amber-50/80 px-2.5 py-1 rounded-xl border border-amber-200/60">
                      👑 {deity.role}
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      {deity.description}
                    </p>

                    <div className="text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                      <div className="font-bold text-stone-900 flex items-center gap-1">
                        <span>✨ Sacred Lore:</span>
                      </div>
                      <p className="text-stone-600 italic leading-snug">"{deity.mythologicalLore}"</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-stone-400 font-medium">
                      Praise: <strong className="text-stone-700">{deity.praiseTitle}</strong>
                    </span>
                    <button
                      onClick={() =>
                        handleSaveToBox(
                          deity.id,
                          deity.name,
                          'PERSON',
                          deity.icon,
                          deity.region,
                          deity.country
                        )
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                        isSaved
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{isSaved ? 'Saved' : 'Collect'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW C: SACRED NAMES & MEANINGS */}
      {activeCategory === 'NAMES' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-[#23211E] font-['Urbanist'] flex items-center gap-2">
              <span>✨</span>
              <span>Traditional African Names & Sacred Meanings</span>
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredNames.length} of {SACRED_NAMES_DATA.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredNames.map((nameItem) => {
              const isSaved = savedEntityIds.includes(nameItem.id);
              const isSpeaking = speakingId === nameItem.id;

              return (
                <div
                  key={nameItem.id}
                  className="bg-white rounded-2xl border border-[#E6DCBF] p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-lg font-black text-[#1D3E2F] font-['Urbanist']">
                            {nameItem.name}
                          </h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            {nameItem.gender}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 italic font-medium">
                          [{nameItem.pronunciation}]
                        </span>
                      </div>

                      <button
                        onClick={() => handlePronounce(nameItem.id, nameItem.audioPronunciationText)}
                        className={`p-1.5 rounded-xl border transition-all ${
                          isSpeaking
                            ? 'bg-amber-500 text-stone-950 scale-105'
                            : 'bg-stone-50 hover:bg-amber-100 text-stone-700 border-stone-200'
                        }`}
                        title="Hear pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs font-extrabold text-[#C85A32] bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200">
                      Meaning: "{nameItem.meaning}"
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      {nameItem.spiritualSignificance}
                    </p>

                    <div className="text-[10px] bg-stone-50 p-2 rounded-xl text-stone-600 border border-stone-200 leading-snug">
                      <strong className="text-stone-900">Tradition:</strong> {nameItem.namingTraditionFact}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-semibold">
                      {nameItem.tribe} ({nameItem.language})
                    </span>
                    <button
                      onClick={() =>
                        handleSaveToBox(
                          nameItem.id,
                          nameItem.name,
                          'LANGUAGE',
                          '✨',
                          nameItem.region,
                          nameItem.country
                        )
                      }
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold border transition-colors ${
                        isSaved
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {isSaved ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      <span>{isSaved ? 'In Chest' : 'Save Name'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW D: COMMON WORDS & GREETINGS */}
      {activeCategory === 'WORDS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-[#23211E] font-['Urbanist'] flex items-center gap-2">
              <span>🗣️</span>
              <span>Everyday African Words, Greetings & Native Audio</span>
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredWords.length} of {COMMON_WORDS_DATA.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredWords.map((wordItem) => {
              const isSaved = savedEntityIds.includes(wordItem.id);
              const isSpeaking = speakingId === wordItem.id;

              return (
                <div
                  key={wordItem.id}
                  className="bg-white rounded-2xl border border-[#E6DCBF] p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3 group hover:border-[#1D3E2F]"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-black text-[#1D3E2F] font-['Urbanist']">
                            {wordItem.word}
                          </h4>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                            {wordItem.language}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 italic font-semibold">
                          Pronunciation: [{wordItem.pronunciation}]
                        </span>
                      </div>

                      <button
                        onClick={() => handlePronounce(wordItem.id, wordItem.audioPronunciationText)}
                        className={`p-2 rounded-xl border transition-all ${
                          isSpeaking
                            ? 'bg-emerald-600 text-white scale-110 shadow-sm'
                            : 'bg-stone-50 hover:bg-emerald-50 text-emerald-800 border-stone-200'
                        }`}
                        title="Play audio pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-stone-900 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200">
                      Meaning: <span className="text-[#C85A32]">{wordItem.englishMeaning}</span>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      {wordItem.culturalNote}
                    </p>

                    <div className="text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                      <span className="text-stone-400 font-bold block text-[10px]">
                        Example in conversation:
                      </span>
                      <p className="font-extrabold text-stone-800">"{wordItem.exampleSentence}"</p>
                      <p className="text-stone-600 text-[10px] italic">"{wordItem.exampleTranslation}"</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-semibold">{wordItem.tribeOrCommunity}</span>
                    <button
                      onClick={() =>
                        handleSaveToBox(
                          wordItem.id,
                          wordItem.word,
                          'LANGUAGE',
                          '🗣️',
                          wordItem.region
                        )
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                        isSaved
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      <span>{isSaved ? 'In Word Chest' : 'Save Word'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW E: TRADITIONAL HOMES & ARCHITECTURE */}
      {activeCategory === 'HOMES' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-[#23211E] font-['Urbanist'] flex items-center gap-2">
              <span>🛖</span>
              <span>Traditional African Homes & Architectural Marvels</span>
            </h3>
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredHomes.length} of {TRADITIONAL_HOMES_DATA.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHomes.map((home) => {
              const isSaved = savedEntityIds.includes(home.id);
              const isSpeaking = speakingId === home.id;

              return (
                <div
                  key={home.id}
                  className="bg-white rounded-3xl border border-[#E6DCBF] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group hover:border-[#1D3E2F]/60"
                >
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-900">
                    <img
                      src={home.illustrationUrl}
                      alt={home.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-stone-950 font-black text-[11px] shadow-sm flex items-center gap-1">
                        <span>🛖</span> {home.tribe}
                      </span>
                      <span className="px-2 py-1 rounded-xl bg-black/60 backdrop-blur-xs text-white font-bold text-[10px]">
                        {home.country}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePronounce(home.id, home.audioPronunciationText)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                        isSpeaking
                          ? 'bg-amber-500 text-stone-950 ring-2 ring-white scale-110'
                          : 'bg-black/50 hover:bg-black/80 text-white'
                      }`}
                      title="Pronounce architectural name"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-bold text-amber-300 tracking-wide uppercase">
                        Native: {home.nativeName}
                      </div>
                      <h4 className="text-base sm:text-lg font-black font-['Urbanist'] leading-tight drop-shadow-xs">
                        {home.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      🏛️ Style: {home.architectureType}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {home.culturalSignificance}
                    </p>

                    <div className="text-xs bg-amber-50/80 p-3 rounded-2xl border border-amber-200/80 space-y-1">
                      <div className="font-extrabold text-[#C85A32] flex items-center gap-1">
                        <span>🌬️ Natural Physics & Thermal Design:</span>
                      </div>
                      <p className="text-stone-700 text-[11px] leading-relaxed">
                        {home.thermalDesignFeature}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedHomeModal(home)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1D3E2F] hover:bg-[#142B21] text-white text-xs font-black shadow-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Architecture</span>
                      </button>

                      <button
                        onClick={() =>
                          handleSaveToBox(
                            home.id,
                            home.name,
                            'LANDMARK',
                            '🛖',
                            home.region,
                            home.country
                          )
                        }
                        className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                          isSaved
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                        title="Save to My Box"
                      >
                        {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. MODAL: FULL ORIGIN LEGEND CHRONICLE */}
      {selectedOriginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="relative bg-[#FBF7EE] border border-[#E6DCBF] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#23211E]">
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#C85A32] text-white flex items-center justify-center text-lg shadow-xs">
                  📜
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-['Urbanist'] text-[#23211E] leading-tight">
                    {selectedOriginModal.title}
                  </h3>
                  <p className="text-xs text-[#7C4728] font-bold">
                    {selectedOriginModal.tribe} Tradition • {selectedOriginModal.country}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOriginModal(null)}
                className="p-2 rounded-xl bg-white hover:bg-stone-200 text-stone-800 border border-[#E6DCBF] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              <div className="relative rounded-2xl overflow-hidden h-48 bg-stone-900 shadow-md">
                <img
                  src={selectedOriginModal.illustrationUrl}
                  alt={selectedOriginModal.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                  {selectedOriginModal.illustrationCaption}
                </div>
              </div>

              {/* Information Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-white p-3 rounded-2xl border border-[#E6DCBF]">
                <div>
                  <span className="text-stone-400 font-semibold block text-[10px]">Sacred Cradle:</span>
                  <strong className="text-stone-900">{selectedOriginModal.sacredSite}</strong>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold block text-[10px]">Ancestral Founder:</span>
                  <strong className="text-[#C85A32]">{selectedOriginModal.founderOrHero}</strong>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-stone-400 font-semibold block text-[10px]">Deities Honored:</span>
                  <strong className="text-emerald-800">
                    {selectedOriginModal.deitiesInvolved.join(', ')}
                  </strong>
                </div>
              </div>

              {/* Full Paragraphs */}
              <div className="space-y-3 text-stone-800 text-sm leading-relaxed font-medium">
                {selectedOriginModal.fullStoryParagraphs.map((para, idx) => (
                  <p key={idx} className="bg-white p-3.5 rounded-2xl border border-stone-200/70 shadow-2xs">
                    {para}
                  </p>
                ))}
              </div>

              {/* Core Cultural Values */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-amber-900">
                  ✦ Living Cultural Wisdom & Values
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedOriginModal.culturalValues.map((v, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-white border border-amber-300 text-amber-950 font-bold text-xs"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Bar */}
            <div className="p-4 border-t border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-between gap-3">
              <button
                onClick={() =>
                  handlePronounce(
                    selectedOriginModal.id,
                    selectedOriginModal.fullStoryParagraphs.join(' ')
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50"
              >
                <Volume2 className="w-4 h-4 text-[#C85A32]" />
                <span>Listen to Story Narration</span>
              </button>

              <button
                onClick={() => {
                  handleSaveToBox(
                    selectedOriginModal.id,
                    selectedOriginModal.title,
                    'STORY',
                    '📜',
                    selectedOriginModal.region,
                    selectedOriginModal.country
                  );
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-black hover:bg-[#A84320] shadow-xs"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save to My Box</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: TRADITIONAL HOME ARCHITECTURAL INSPECTOR */}
      {selectedHomeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="relative bg-[#FBF7EE] border border-[#E6DCBF] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#23211E]">
            <div className="p-4 sm:p-5 border-b border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#1D3E2F] text-amber-300 flex items-center justify-center text-lg shadow-xs">
                  🛖
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-['Urbanist'] text-[#23211E] leading-tight">
                    {selectedHomeModal.name}
                  </h3>
                  <p className="text-xs text-[#7C4728] font-bold">
                    Native: {selectedHomeModal.nativeName} • {selectedHomeModal.country}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHomeModal(null)}
                className="p-2 rounded-xl bg-white hover:bg-stone-200 text-stone-800 border border-[#E6DCBF] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-48 bg-stone-900 shadow-md">
                <img
                  src={selectedHomeModal.illustrationUrl}
                  alt={selectedHomeModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                  {selectedHomeModal.illustrationCaption}
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <span className="font-extrabold text-[#C85A32] block">
                    ✦ Cultural Significance & Community:
                  </span>
                  <p className="text-stone-700 leading-relaxed font-medium">
                    {selectedHomeModal.culturalSignificance}
                  </p>
                </div>

                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="font-extrabold text-emerald-900 block">
                    🌬️ Green Architecture & Thermal Physics:
                  </span>
                  <p className="text-stone-700 leading-relaxed font-medium">
                    {selectedHomeModal.thermalDesignFeature}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1">
                  <span className="font-extrabold text-stone-900 block">
                    🧱 Natural Materials Utilized:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedHomeModal.materialsUsed.map((mat, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-extrabold text-amber-900 block">💡 Fascinating Fact:</span>
                  <p className="text-stone-800 text-xs leading-relaxed font-medium">
                    {selectedHomeModal.funFact}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-end">
              <button
                onClick={() => setSelectedHomeModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1D3E2F] text-white text-xs font-black hover:bg-[#142B21]"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: CULTURAL KNOWLEDGE MINI-QUIZ */}
      {quizActive && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="relative bg-[#FBF7EE] border border-[#E6DCBF] rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-[#23211E]">
            <div className="p-4 sm:p-5 border-b border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center text-sm font-black">
                  🏆
                </div>
                <div>
                  <h3 className="text-base font-black font-['Urbanist'] text-[#23211E]">
                    Afro Box Cultural Quiz Challenge
                  </h3>
                  <span className="text-[11px] text-[#7C4728] font-bold">
                    Question {currentQuizIndex + 1} of {quizQuestions.length} • Score: {quizScore}
                  </span>
                </div>
              </div>
              <button
                onClick={resetQuiz}
                className="p-1.5 rounded-xl bg-white hover:bg-stone-200 text-stone-800 border border-[#E6DCBF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#C85A32] h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%`
                  }}
                />
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-[#23211E] leading-snug">
                {quizQuestions[currentQuizIndex].question}
              </h4>

              <div className="space-y-2">
                {quizQuestions[currentQuizIndex].options.map((opt, optIdx) => {
                  const isCorrect = optIdx === quizQuestions[currentQuizIndex].correctIndex;
                  const isSelected = selectedQuizAnswer === optIdx;

                  let btnStyle = 'bg-white hover:bg-amber-50 text-stone-800 border-stone-200';
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-100 text-rose-950 border-rose-300';
                    } else {
                      btnStyle = 'opacity-50 bg-stone-50 border-stone-200 text-stone-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleQuizAnswer(optIdx)}
                      className={`w-full text-left p-3 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>

              {isAnswerSubmitted && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-stone-800 leading-relaxed font-medium animate-in fade-in">
                  <strong className="text-amber-900 block mb-1">💡 Lore Context:</strong>
                  {quizQuestions[currentQuizIndex].explanation}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#E6DCBF] bg-[#F5EEDC] flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600">
                Score: {quizScore}/{quizQuestions.length}
              </span>

              {isAnswerSubmitted && (
                <button
                  onClick={
                    currentQuizIndex < quizQuestions.length - 1
                      ? handleNextQuizQuestion
                      : resetQuiz
                  }
                  className="px-4 py-2 rounded-xl bg-[#C85A32] text-white text-xs font-black hover:bg-[#A84320] flex items-center gap-1.5"
                >
                  <span>{currentQuizIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
