import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Palette,
  Eye,
  AlertCircle,
  HelpCircle,
  Clock,
  Send,
  Download,
  Upload,
  Layers,
  FileText,
  UserCheck,
  Check,
  Copy,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import {
  Story,
  AfricanRegion,
  StoryType,
  RightsStatus,
  DifficultyLevel,
  VerificationStatus,
  StoryParagraph,
  VocabularyWord
} from '../types/story';
import { storyService } from '../services/storyService';
import { audioEngine } from '../services/audioEngine';
import {
  StoryIllustration,
  DRAWING_STYLES,
  DrawingStyleId
} from './StoryIllustration';

interface StoryStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryAdded: (newStory: Story) => void;
  initialMode?: 'AUTHOR' | 'PIPELINE' | 'IMPORT_EXPORT';
}

export const StoryStudioModal: React.FC<StoryStudioModalProps> = ({
  isOpen,
  onClose,
  onStoryAdded,
  initialMode = 'AUTHOR'
}) => {
  // Main Navigation Mode
  const [mainMode, setMainMode] = useState<'AUTHOR' | 'PIPELINE' | 'IMPORT_EXPORT'>(initialMode);

  // Wizard Tab: 'BASICS' | 'ILLUSTRATION' | 'CONTENT' | 'PROVENANCE' | 'VOCABULARY'
  const [activeStep, setActiveStep] = useState<
    'BASICS' | 'ILLUSTRATION' | 'CONTENT' | 'PROVENANCE' | 'VOCABULARY'
  >('BASICS');

  // Form State
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [country, setCountry] = useState('Uganda');
  const [region, setRegion] = useState<AfricanRegion>('East Africa');
  const [culturalTradition, setCulturalTradition] = useState('Bachwezi & Empire of Kitara');
  const [community, setCommunity] = useState('Western Uganda Crater Lakes');
  const [languageOfOrigin, setLanguageOfOrigin] = useState('Runyoro-Rutooro');
  const [storyType, setStoryType] = useState<StoryType>('MYTH_ORIGIN');
  const [ageRange, setAgeRange] = useState('6-9');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('EASY');
  const [estimatedReadingTime, setEstimatedReadingTime] = useState<number>(5);
  const [themes, setThemes] = useState<string[]>(['Wisdom & Cleverness', 'Sacred Waters']);
  const [themeInput, setThemeInput] = useState('');

  // Illustration Drawing Settings
  const [selectedDrawingStyle, setSelectedDrawingStyle] = useState<DrawingStyleId>('CHWEZI_CRATER_LAKE');
  const [illustrationCaption, setIllustrationCaption] = useState('');
  const [artistCredit, setArtistCredit] = useState('AfroBox Ugandan Storybook Guild');

  // Paragraphs
  const [paragraphs, setParagraphs] = useState<StoryParagraph[]>([
    {
      id: 'p1',
      paragraphNumber: 1,
      text: 'Long ago in the rolling emerald hills of Western Uganda, the ancient kings of the Bachwezi gathered beside the mirror-like waters of the crater lakes...'
    },
    {
      id: 'p2',
      paragraphNumber: 2,
      text: 'Their royal Ankole cattle grazed peacefully, their immense lyrical white horns arched like crescents against the misty morning sky.'
    }
  ]);

  // Cultural Provenance & Rights
  const [source, setSource] = useState('Documented royal oral tradition of Kitara');
  const [sourceType, setSourceType] = useState('Oral Tradition Adaptation');
  const [sourceAuthorOrCollector, setSourceAuthorOrCollector] = useState('AfroBox Ugandan Storytellers & Elders');
  const [originalStoryteller, setOriginalStoryteller] = useState('Court knowledge keepers and elders');
  const [rightsStatus, setRightsStatus] = useState<RightsStatus>('TRADITIONAL_SOURCE_ADAPTATION');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('VERIFIED');
  const [variantNotes, setVariantNotes] = useState('Traditional African folktales have many variations passed down by different storytellers.');

  // Vocabulary Words
  const [vocabularyList, setVocabularyList] = useState<VocabularyWord[]>([
    {
      word: 'Bachwezi',
      language: 'Runyoro-Rutooro',
      phonetic: 'Bah-chweh-zee',
      definition: 'The mythical demigod kings and master architects of the ancient Empire of Kitara.'
    },
    {
      word: 'Enyambo',
      language: 'Runyankore',
      phonetic: 'Eh-nyahm-boh',
      definition: 'The sacred, royal long-horned Ankole cattle revered for their majestic curved horns.'
    }
  ]);
  const [newWord, setNewWord] = useState('');
  const [newDef, setNewDef] = useState('');
  const [newLang, setNewLang] = useState('');

  // Think About It Prompt
  const [thinkQuestion, setThinkQuestion] = useState('What important lesson does this story teach us about reverence for nature and community?');
  const [thinkPrompt, setThinkPrompt] = useState('Discuss how the main character treated others and what you would have done differently.');
  const [parentStarter, setParentStarter] = useState('Ask your child what value they found most inspiring in this story.');

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successStory, setSuccessStory] = useState<Story | null>(null);

  // Bulk Ingestion State
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copiedExport, setCopiedExport] = useState(false);

  if (!isOpen) return null;

  // Preset Loaders for Ugandan Traditions
  const handleLoadUgandaPreset = (presetKey: 'CHEWZI' | 'GANDA' | 'LANGO' | 'GISU') => {
    if (presetKey === 'CHEWZI') {
      setTitle('The Sacred Cattle of King Wamala');
      setShortDescription('How King Wamala of the Bachwezi protected the gentle long-horned cattle in the green crater valleys of Kitara.');
      setCountry('Uganda');
      setRegion('East Africa');
      setCulturalTradition('Bachwezi & Empire of Kitara');
      setCommunity('Crater Lakes of Fort Portal & Bunyoro');
      setLanguageOfOrigin('Runyoro-Rutooro');
      setStoryType('MYTH_ORIGIN');
      setSelectedDrawingStyle('CHWEZI_CRATER_LAKE');
      setThemes(['Sacred Waters', 'Ankole Cattle', 'Wisdom & Leadership']);
      setParagraphs([
        {
          id: 'p1',
          paragraphNumber: 1,
          text: 'In the golden age of the Empire of Kitara, King Wamala walked upon the emerald rim of Lake Wamala, where the water reflected the green hills like polished glass.'
        },
        {
          id: 'p2',
          paragraphNumber: 2,
          text: 'The King sang soft melodies to the long-horned Enyambo cattle, teaching the young herders that gentle care brings far more milk than harsh shouts.'
        },
        {
          id: 'p3',
          paragraphNumber: 3,
          text: 'When a great mist rolled off the Rwenzori Mountains, the people remembered that the blessings of the earth belong to those who walk with a quiet, generous heart.'
        }
      ]);
      setVocabularyList([
        { word: 'Enyambo', language: 'Runyankore', phonetic: 'Eh-nyahm-boh', definition: 'The royal long-horned Ankole cattle of Western Uganda.' },
        { word: 'Empango', language: 'Runyoro', phonetic: 'Ehm-pahn-goh', definition: 'The sacred royal drum coronation celebration.' }
      ]);
      setThinkQuestion('Why did King Wamala believe gentle words work better than harsh shouts?');
    } else if (presetKey === 'GANDA') {
      setTitle('The Buzzing Hornet and Kintu’s Cow');
      setShortDescription('How a clever little insect helped Kintu identify his beloved cow and win the hand of celestial maiden Nambi.');
      setCountry('Uganda');
      setRegion('East Africa');
      setCulturalTradition('Buganda Kingdom (Ganda)');
      setCommunity('Central Uganda & Naggalabi Buddo');
      setLanguageOfOrigin('Luganda');
      setStoryType('TRADITIONAL_FOLKTALE');
      setSelectedDrawingStyle('KINTU_NAMBI_LADDER');
      setThemes(['Kindness to Animals', 'Cleverness', 'Buganda Genesis']);
      setParagraphs([
        {
          id: 'p1',
          paragraphNumber: 1,
          text: 'Before Kintu could marry Nambi, Sky King Ggulu hid Kintu’s solitary cow inside a sea of ten thousand golden heifers on the celestial plains.'
        },
        {
          id: 'p2',
          paragraphNumber: 2,
          text: 'Kintu had once gently rescued a little buzzing hornet named Lwanyi from a spider’s web on earth. Remembering his kindness, Lwanyi buzzed into his ear: "Watch where I land!"'
        },
        {
          id: 'p3',
          paragraphNumber: 3,
          text: 'The hornet flew gracefully across the enormous herd and landed lightly on the left horn of one gentle cow. Kintu tapped the horn and smiled, for it was indeed his beloved companion.'
        }
      ]);
      setVocabularyList([
        { word: 'Mirembe', language: 'Luganda', phonetic: 'Mee-rehm-beh', definition: 'Peace and harmony in the home and community.' },
        { word: 'Matooke', language: 'Luganda', phonetic: 'Mah-toh-keh', definition: 'The cherished green cooking banana of Uganda.' }
      ]);
      setThinkQuestion('How did a tiny act of kindness help Kintu when he needed it most?');
    } else if (presetKey === 'LANGO') {
      setTitle('The Rainmaker and the Crested Crane');
      setShortDescription('How patriarch Olum followed the sacred Crested Crane to bring cooling mountain springs to the plains of Lake Kyoga.');
      setCountry('Uganda');
      setRegion('East Africa');
      setCulturalTradition('Lango Tradition');
      setCommunity('Otuke Hills & Lake Kyoga');
      setLanguageOfOrigin('Leb Lango');
      setStoryType('LEGEND');
      setSelectedDrawingStyle('LANGO_OTUKE_SAVANNA');
      setThemes(['Communal Sharing (Awany)', 'Cooperation', 'Crested Crane']);
      setParagraphs([
        {
          id: 'p1',
          paragraphNumber: 1,
          text: 'Across the hot savannah of Northern Uganda, the dry wind blew red dust across the Otuke Hills, and the children looked to the elders for hope.'
        },
        {
          id: 'p2',
          paragraphNumber: 2,
          text: 'Olum sounded the curved horn to call Dwar—the cooperative hunt where all clans march together as one family rather than competing.'
        },
        {
          id: 'p3',
          paragraphNumber: 3,
          text: 'Above them danced the Crested Crane, leading them to a deep granite fissure. Olum tapped the stone with his spear, and pure sweet water bubbled forth for all.'
        }
      ]);
      setVocabularyList([
        { word: 'Awany', language: 'Leb Lango', phonetic: 'Ah-wah-nee', definition: 'The sacred principle of sharing food equally with elders, widows, and infants.' },
        { word: 'Dwar', language: 'Leb Lango', phonetic: 'Dwah-rr', definition: 'The traditional cooperative communal hunt.' }
      ]);
      setThinkQuestion('Why is sharing food equally more heroic than keeping the biggest share for oneself?');
    } else if (presetKey === 'GISU') {
      setTitle('The Kadodi Drums of Wanale Ridge');
      setShortDescription('How young Masaba found his courage to the thunderous polyrhythms of Mount Elgon’s sacred drums.');
      setCountry('Uganda');
      setRegion('East Africa');
      setCulturalTradition('Bamasaba / Bagisu');
      setCommunity('Mount Masaba (Mount Elgon) & Mbale');
      setLanguageOfOrigin('Lumasaaba');
      setStoryType('LEGEND');
      setSelectedDrawingStyle('GISU_ELGON_KADODI');
      setThemes(['Courage & Imbalu', 'Kadodi Drumming', 'Mount Elgon']);
      setParagraphs([
        {
          id: 'p1',
          paragraphNumber: 1,
          text: 'The cliffs of Wanale Ridge towered over Mbale like giant stone sentinels, catching the morning mist from the caldera above.'
        },
        {
          id: 'p2',
          paragraphNumber: 2,
          text: 'As the Kadodi drums began their thunderous rhythm, young Masaba felt his heart beating in sync with the heartbeat of Mount Masaba.'
        },
        {
          id: 'p3',
          paragraphNumber: 3,
          text: 'He stood tall without blinking, proving that true valor is not the absence of butterflies in the stomach, but standing steadfast for one’s community.'
        }
      ]);
      setVocabularyList([
        { word: 'Kadodi', language: 'Lumasaaba', phonetic: 'Kah-doh-dee', definition: 'The energetic traditional drumming and dance rhythm of Mount Elgon.' },
        { word: 'Malewa', language: 'Lumasaaba', phonetic: 'Mah-leh-wah', definition: 'Smoked mountain bamboo shoots harvested on high alpine ridges.' }
      ]);
      setThinkQuestion('What does it feel like to stand brave when everyone is counting on you?');
    }
    setActiveStep('BASICS');
    audioEngine.playSoundEffect('kora');
  };

  // Add Theme
  const handleAddTheme = () => {
    if (themeInput.trim() && !themes.includes(themeInput.trim())) {
      setThemes([...themes, themeInput.trim()]);
      setThemeInput('');
    }
  };

  const handleRemoveTheme = (t: string) => {
    setThemes(themes.filter((item) => item !== t));
  };

  // Paragraph Handlers
  const handleParagraphChange = (id: string, newText: string) => {
    setParagraphs(
      paragraphs.map((p) => (p.id === id ? { ...p, text: newText } : p))
    );
  };

  const handleAddParagraph = () => {
    const nextNum = paragraphs.length + 1;
    setParagraphs([
      ...paragraphs,
      {
        id: `p${Date.now()}`,
        paragraphNumber: nextNum,
        text: ''
      }
    ]);
  };

  const handleDeleteParagraph = (id: string) => {
    if (paragraphs.length <= 1) return;
    const filtered = paragraphs
      .filter((p) => p.id !== id)
      .map((p, idx) => ({ ...p, paragraphNumber: idx + 1 }));
    setParagraphs(filtered);
  };

  // Add Vocabulary Word
  const handleAddVocabWord = () => {
    if (newWord.trim() && newDef.trim()) {
      setVocabularyList([
        ...vocabularyList,
        {
          word: newWord.trim(),
          definition: newDef.trim(),
          language: newLang.trim() || languageOfOrigin
        }
      ]);
      setNewWord('');
      setNewDef('');
      setNewLang('');
    }
  };

  const handleDeleteVocabWord = (index: number) => {
    setVocabularyList(vocabularyList.filter((_, i) => i !== index));
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Please provide a story title.');
      setActiveStep('BASICS');
      return;
    }

    if (!country.trim()) {
      setErrorMessage('Please provide the country of origin.');
      setActiveStep('BASICS');
      return;
    }

    const nonEmptyParagraphs = paragraphs.filter((p) => p.text.trim().length > 0);
    if (nonEmptyParagraphs.length === 0) {
      setErrorMessage('Please write at least one paragraph for the story.');
      setActiveStep('CONTENT');
      return;
    }

    setIsSubmitting(true);
    try {
      const newStoryPayload: Partial<Story> = {
        title: title.trim(),
        shortDescription: shortDescription.trim() || `An authentic ${culturalTradition} story from ${country}.`,
        country: country.trim(),
        region,
        culturalTradition: culturalTradition.trim(),
        community: community.trim(),
        languageOfOrigin: languageOfOrigin.trim(),
        storyType,
        themes,
        ageRange,
        difficulty,
        estimatedReadingTime,
        learningObjectives: [
          `Discover the rich storytelling tradition of the ${culturalTradition}`,
          `Reflect on community values, empathy, and courage`
        ],
        source: source.trim(),
        sourceType,
        sourceAuthorOrCollector: sourceAuthorOrCollector.trim(),
        originalStoryteller: originalStoryteller.trim(),
        rightsStatus,
        adaptationStatus: 'Child-Friendly Educational Retelling',
        verificationStatus,
        variantNotes: variantNotes.trim(),
        illustration: {
          url: '',
          alt: `${title} illustration`,
          caption: illustrationCaption.trim() || `${title} • Hand-drawn storybook illustration`,
          artistOrCredit: artistCredit.trim(),
          drawingStyle: selectedDrawingStyle
        },
        paragraphs: nonEmptyParagraphs,
        vocabulary: vocabularyList,
        thinkAboutIt: {
          question: thinkQuestion.trim(),
          prompt: thinkPrompt.trim(),
          guidingPoints: ['Reflect on how actions affect the entire community.'],
          conversationStarterForParents: parentStarter.trim()
        }
      };

      const savedStory = await storyService.addStory(newStoryPayload);
      audioEngine.playSoundEffect('correct');
      setSuccessStory(savedStory);
      onStoryAdded(savedStory);
    } catch (err) {
      setErrorMessage('Failed to publish story. Saved to local device cache.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bulk Ingestion handlers
  const handleImportJson = async () => {
    setImportStatus(null);
    try {
      const parsed = JSON.parse(importJsonText);
      const storiesArray = Array.isArray(parsed) ? parsed : [parsed];
      const count = await storyService.importStories(storiesArray);
      setImportStatus(`Successfully ingested ${count} stories into AfroBox library!`);
      audioEngine.playSoundEffect('correct');
      setImportJsonText('');
    } catch (err) {
      setImportStatus('Invalid JSON format. Please check the structure and try again.');
    }
  };

  const handleExportAllStories = () => {
    const jsonStr = storyService.exportStoriesJson();
    navigator.clipboard.writeText(jsonStr);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 3000);
  };

  const handleDownloadJson = () => {
    const jsonStr = storyService.exportStoriesJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afrobox-stories-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const allCurrentStories = storyService.getStoriesSync();

  return (
    <div
      id="story-studio-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        id="story-studio-modal-container"
        className="w-full max-w-4xl max-h-[92vh] bg-[#FBF7EE] rounded-3xl shadow-2xl border border-[#E6DCBF] flex flex-col overflow-hidden text-[#23211E]"
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#231A12] via-[#352516] to-[#231A12] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-black shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold font-['Urbanist'] tracking-tight">
                  Afro Box Story Studio & Content Pipeline
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-stone-950">
                  <span>🇺🇬</span>
                  <span>Uganda Spotlight</span>
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80 hidden sm:block">
                Oral storytelling preservation, community pipeline ingestion & folklore artwork studio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Master Mode Tabs */}
        <div className="bg-[#EFE8D3] px-5 pt-3 pb-0 border-b border-[#E0D4B2] flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setMainMode('AUTHOR')}
            className={`px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              mainMode === 'AUTHOR'
                ? 'bg-[#FBF7EE] text-[#C85A32] shadow-2xs font-extrabold border-t-2 border-[#C85A32]'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <span>✍️</span>
            <span>Author Story</span>
          </button>

          <button
            onClick={() => setMainMode('PIPELINE')}
            className={`px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              mainMode === 'PIPELINE'
                ? 'bg-[#FBF7EE] text-[#1D3E2F] shadow-2xs font-extrabold border-t-2 border-[#1D3E2F]'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Content Pipeline & Verification</span>
          </button>

          <button
            onClick={() => setMainMode('IMPORT_EXPORT')}
            className={`px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              mainMode === 'IMPORT_EXPORT'
                ? 'bg-[#FBF7EE] text-amber-800 shadow-2xs font-extrabold border-t-2 border-amber-800]'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <span>📦</span>
            <span>Bulk Import / Export</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* MODE 1: PIPELINE & INGESTION STATUS                       */}
        {/* ========================================================= */}
        {mainMode === 'PIPELINE' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Visual 5-Stage Ingestion Pipeline Diagram */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#23211E] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>Afro Box 5-Stage Content Ingestion Pipeline</span>
                  </h3>
                  <p className="text-xs text-[#7C4728] mt-0.5">
                    How oral folktales, tribal legends, and clan histories are safely ingested into the Afro Box archive.
                  </p>
                </div>
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Living Heritage Protocol
                </span>
              </div>

              {/* 5 Stages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
                {[
                  {
                    step: '1',
                    title: 'Oral Gathering',
                    desc: 'Record elders, clan historians & grandmothers with informed consent.',
                    tag: 'Community',
                    color: 'bg-amber-50 text-amber-900 border-amber-200'
                  },
                  {
                    step: '2',
                    title: 'Educational Adapt',
                    desc: 'Structure child-friendly paragraphs, moral lessons & reading levels.',
                    tag: 'Pedagogy',
                    color: 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  },
                  {
                    step: '3',
                    title: 'Linguistic Audit',
                    desc: 'Native speaker review of Luganda, Leb Lango, Lumasaaba, or Runyoro terms.',
                    tag: 'Dialect',
                    color: 'bg-blue-50 text-blue-900 border-blue-200'
                  },
                  {
                    step: '4',
                    title: 'Folkloric Art',
                    desc: 'Select or draw bespoke African storybook art matching local ecology.',
                    tag: 'Visual Art',
                    color: 'bg-purple-50 text-purple-900 border-purple-200'
                  },
                  {
                    step: '5',
                    title: 'Elder Verified',
                    desc: 'Cultural provenance validation and deployment to the live app library.',
                    tag: 'Published',
                    color: 'bg-stone-50 text-stone-900 border-stone-200'
                  }
                ].map((s, idx) => (
                  <div
                    key={s.step}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${s.color} relative`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-black/10 font-black text-[11px] flex items-center justify-center">
                          {s.step}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider opacity-75">
                          {s.tag}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs mb-1">{s.title}</h4>
                      <p className="text-[11px] leading-snug opacity-90">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Pipeline Stories Tracker */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-extrabold text-[#23211E]">
                    Current Library & Community Ingestion Queue ({allCurrentStories.length} Stories)
                  </h3>
                  <p className="text-xs text-[#7C4728]">
                    Real-time status of all stories in the applet runtime, categorized by tradition and verification status.
                  </p>
                </div>
                <button
                  onClick={() => setMainMode('AUTHOR')}
                  className="px-3 py-1.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#A84320] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Submit Story to Pipeline</span>
                </button>
              </div>

              {/* Stories List */}
              <div className="divide-y divide-amber-100 max-h-72 overflow-y-auto pr-1">
                {allCurrentStories.map((story) => (
                  <div
                    key={story.id}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-amber-50/50 px-2 rounded-xl transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#23211E]">{story.title}</span>
                        {story.country === 'Uganda' && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-300 text-stone-950">
                            🇺🇬 Uganda
                          </span>
                        )}
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          {story.verificationStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7C4728] line-clamp-1">
                        {story.culturalTradition} • {story.languageOfOrigin} • {story.sourceType}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-medium text-stone-500">
                        {story.estimatedReadingTime} min read
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-[10px] font-bold text-stone-700">
                        {story.illustration?.drawingStyle || 'Default Art'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingestion Pipeline Guidelines for Ugandan Schools & Storytellers */}
            <div className="p-4 rounded-2xl bg-[#EFE8D3] border border-[#E0D4B2] space-y-2">
              <h4 className="text-xs font-extrabold text-[#23211E] flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-800" />
                <span>Guidelines for Ugandan Educators & Cultural Custodians</span>
              </h4>
              <p className="text-xs text-[#7C4728] leading-relaxed">
                Afro Box welcomes oral stories from all regions of Uganda, particularly underrepresented communities
                (e.g., Karamojong cattle parables, Lugbara creation legends, Bakiga highland farming folktales, Iteso folklore,
                and Acholi hunting songs). To submit, use the Author Story tab with clan elder attribution, or upload a JSON batch in Bulk Ingestion.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: BULK IMPORT & EXPORT PIPELINE                     */}
        {/* ========================================================= */}
        {mainMode === 'IMPORT_EXPORT' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#23211E] flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-amber-700" />
                    <span>Export Entire Story Archive</span>
                  </h4>
                  <span className="text-[10px] font-bold text-stone-500">
                    {allCurrentStories.length} stories
                  </span>
                </div>
                <p className="text-xs text-[#7C4728]">
                  Export the full database to standard JSON for offline backup, school deployments, or curriculum planning.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleExportAllStories}
                    className="px-3.5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedExport ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedExport ? 'Copied to Clipboard!' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json file</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2.5">
                <h4 className="font-extrabold text-xs sm:text-sm text-[#23211E] flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span>Ingest Uganda Story Preset</span>
                </h4>
                <p className="text-xs text-[#7C4728]">
                  Pre-load an authentic Ugandan oral retelling template to author and publish with 1-click:
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => {
                      handleLoadUgandaPreset('CHEWZI');
                      setMainMode('AUTHOR');
                    }}
                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[11px] font-bold border border-emerald-200 text-left transition-colors"
                  >
                    👑 Bachwezi Kitara
                  </button>
                  <button
                    onClick={() => {
                      handleLoadUgandaPreset('GANDA');
                      setMainMode('AUTHOR');
                    }}
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 text-[11px] font-bold border border-amber-200 text-left transition-colors"
                  >
                    🛖 Buganda Kintu
                  </button>
                  <button
                    onClick={() => {
                      handleLoadUgandaPreset('LANGO');
                      setMainMode('AUTHOR');
                    }}
                    className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-950 text-[11px] font-bold border border-orange-200 text-left transition-colors"
                  >
                    🌾 Lango Olum & Dwar
                  </button>
                  <button
                    onClick={() => {
                      handleLoadUgandaPreset('GISU');
                      setMainMode('AUTHOR');
                    }}
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-950 text-[11px] font-bold border border-blue-200 text-left transition-colors"
                  >
                    ⛰️ Bamasaba Mount Elgon
                  </button>
                </div>
              </div>
            </div>

            {/* Paste JSON Ingestion Form */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-xs sm:text-sm text-[#23211E] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>Bulk JSON Ingestion Pipeline</span>
                </h4>
                <button
                  onClick={() => {
                    const sample = storyService.getBlankStoryTemplate();
                    setImportJsonText(JSON.stringify(sample, null, 2));
                  }}
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 underline"
                >
                  Load Sample JSON Template
                </button>
              </div>

              <textarea
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste story JSON object or array: [{"title": "My Story", "country": "Uganda", ...}]'
                rows={8}
                className="w-full p-3 font-mono text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {importStatus && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold ${
                    importStatus.includes('Successfully')
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      : 'bg-red-50 text-red-900 border border-red-300'
                  }`}
                >
                  {importStatus}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleImportJson}
                  disabled={!importJsonText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-extrabold text-xs shadow-xs hover:brightness-105 disabled:opacity-50 cursor-pointer"
                >
                  Ingest Stories to AfroBox Library
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: AUTHOR NEW STORY (WIZARD)                         */}
        {/* ========================================================= */}
        {mainMode === 'AUTHOR' && (
          <>
            {/* Quick Presets Bar for Uganda */}
            <div className="bg-amber-100/70 px-5 py-2.5 border-b border-amber-200/80 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <span>🇺🇬 Quick Uganda Presets:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadUgandaPreset('CHEWZI')}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 hover:bg-white text-emerald-900 border border-emerald-300 shadow-2xs transition-all hover:scale-105"
                >
                  👑 Bachwezi Kitara
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadUgandaPreset('GANDA')}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 hover:bg-white text-amber-900 border border-amber-300 shadow-2xs transition-all hover:scale-105"
                >
                  🛖 Buganda Kintu
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadUgandaPreset('LANGO')}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 hover:bg-white text-orange-900 border border-orange-300 shadow-2xs transition-all hover:scale-105"
                >
                  🌾 Lango Olum & Dwar
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadUgandaPreset('GISU')}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 hover:bg-white text-blue-900 border border-blue-300 shadow-2xs transition-all hover:scale-105"
                >
                  ⛰️ Bamasaba Mount Elgon
                </button>
              </div>
            </div>

            {/* Step Wizard Sub-Navigation */}
            <div className="bg-[#F0E8D0] px-5 py-2 border-b border-[#E6DCBF] flex items-center justify-between shrink-0 overflow-x-auto gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold">
                {[
                  { id: 'BASICS', label: '1. Basics', icon: BookOpen },
                  { id: 'ILLUSTRATION', label: '2. Artwork', icon: Palette },
                  { id: 'CONTENT', label: '3. Story Text', icon: Sparkles },
                  { id: 'PROVENANCE', label: '4. Provenance', icon: ShieldCheck },
                  { id: 'VOCABULARY', label: '5. Vocabulary', icon: Globe }
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = activeStep === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveStep(s.id as any)}
                      className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all text-xs touch-manipulation cursor-pointer ${
                        isActive
                          ? 'bg-[#C85A32] text-white shadow-xs font-extrabold'
                          : 'bg-white/60 text-[#7C4728] hover:bg-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="whitespace-nowrap">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wizard Body Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successStory && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Story "{successStory.title}" published to library and live in Discover!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessStory(null);
                      onClose();
                    }}
                    className="px-3 py-1 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
                  >
                    Open Story
                  </button>
                </div>
              )}

              {/* STEP 1: BASICS */}
              {activeStep === 'BASICS' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        Story Title *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. The Sacred Cattle of King Wamala"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCBF] text-sm text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        Short Kid-Friendly Overview / Hook
                      </label>
                      <input
                        type="text"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="1-2 sentences summarizing the moral, character, or wonder..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        Country of Origin *
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="e.g. Uganda, Ghana, Nigeria, Kenya"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        African Region
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value as AfricanRegion)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                      >
                        <option value="East Africa">East Africa</option>
                        <option value="West Africa">West Africa</option>
                        <option value="Southern Africa">Southern Africa</option>
                        <option value="North Africa">North Africa</option>
                        <option value="Central Africa">Central Africa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        Cultural Tradition / Tribe
                      </label>
                      <input
                        type="text"
                        value={culturalTradition}
                        onChange={(e) => setCulturalTradition(e.target.value)}
                        placeholder="e.g. Bachwezi, Baganda, Lango, Bamasaba"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        Indigenous Language of Origin
                      </label>
                      <input
                        type="text"
                        value={languageOfOrigin}
                        onChange={(e) => setLanguageOfOrigin(e.target.value)}
                        placeholder="e.g. Luganda, Leb Lango, Lumasaaba, Runyoro"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        Story Classification
                      </label>
                      <select
                        value={storyType}
                        onChange={(e) => setStoryType(e.target.value as StoryType)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                      >
                        <option value="MYTH_ORIGIN">Origin Legend & Tribal Genesis</option>
                        <option value="TRADITIONAL_FOLKTALE">Traditional Moral Folktale</option>
                        <option value="LEGEND">Historical Legend & Heroic Tale</option>
                        <option value="ANIMAL_TRICKSTER">Animal Trickster Story</option>
                        <option value="ADAPTED_TRADITIONAL">Living Community Adaptation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#23211E] mb-1">
                        Estimated Reading Time (Minutes)
                      </label>
                      <input
                        type="number"
                        min={2}
                        max={30}
                        value={estimatedReadingTime}
                        onChange={(e) => setEstimatedReadingTime(Number(e.target.value) || 5)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                      />
                    </div>
                  </div>

                  {/* Themes */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#23211E] mb-1.5">
                      Themes & Values
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {themes.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#EFE8D3] text-[#7C4728] border border-[#E0D4B2]"
                        >
                          <span>{t}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTheme(t)}
                            className="text-stone-400 hover:text-stone-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={themeInput}
                        onChange={(e) => setThemeInput(e.target.value)}
                        placeholder="Add theme (e.g. Courage, Sacred Waters, Community)..."
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddTheme}
                        className="px-3 py-1.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#A84320]"
                      >
                        Add Theme
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: ARTWORK & DRAWING STYLE */}
              {activeStep === 'ILLUSTRATION' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#23211E] mb-1">
                      African Folklore Handcrafted Drawing Style
                    </h3>
                    <p className="text-xs text-[#7C4728]">
                      Select from authentic regional storybook illustration styles. Each style features handcrafted SVG
                      visuals, varied color palettes, and cultural symbols to eliminate repetitive stock photos.
                    </p>
                  </div>

                  {/* Live Preview Card */}
                  <div className="rounded-2xl overflow-hidden border border-amber-200 shadow-md">
                    <StoryIllustration
                      drawingStyle={selectedDrawingStyle}
                      aspectRatio="aspect-21/9"
                      showBadge={true}
                      showCaption={true}
                      story={{
                        id: 'preview',
                        title: title || 'Untitled Story Preview',
                        country,
                        culturalTradition,
                        illustration: {
                          url: '',
                          alt: 'Preview',
                          caption: illustrationCaption || `Bespoke handcrafted art for ${title || 'your story'}`
                        }
                      } as any}
                    />
                  </div>

                  {/* Styles Selection Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                    {DRAWING_STYLES.map((style) => {
                      const isSelected = selectedDrawingStyle === style.id;
                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setSelectedDrawingStyle(style.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-600 ring-2 ring-amber-500/50'
                              : 'bg-white border-amber-200 hover:border-amber-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-xs text-[#23211E]">{style.name}</span>
                            {style.tradition.includes('Uganda') && (
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                                🇺🇬 Uganda
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#7C4728] line-clamp-2 leading-snug">
                            {style.description}
                          </p>
                          <div className="mt-1 text-[10px] text-stone-500 font-semibold">
                            Palette: {style.palette}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Caption & Artist Credit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Artwork Caption / Description
                      </label>
                      <input
                        type="text"
                        value={illustrationCaption}
                        onChange={(e) => setIllustrationCaption(e.target.value)}
                        placeholder="e.g. Morning mist over the crater lakes of Kitara..."
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Story Artist Guild Credit
                      </label>
                      <input
                        type="text"
                        value={artistCredit}
                        onChange={(e) => setArtistCredit(e.target.value)}
                        placeholder="e.g. AfroBox Storybook Artist Guild"
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: STORY TEXT / PARAGRAPHS */}
              {activeStep === 'CONTENT' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#23211E]">
                        Story Paragraphs & Retelling
                      </h3>
                      <p className="text-xs text-[#7C4728]">
                        Break the story into clear, readable paragraphs for children and voice narration.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddParagraph}
                      className="px-3 py-1.5 rounded-xl bg-[#C85A32] text-white text-xs font-bold hover:bg-[#A84320] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {paragraphs.map((p, idx) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-2xl bg-white border border-[#E6DCBF] space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#C85A32]">
                            Paragraph {idx + 1}
                          </span>
                          {paragraphs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteParagraph(p.id)}
                              className="text-stone-400 hover:text-red-600 transition-colors p-1"
                              title="Delete paragraph"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <textarea
                          value={p.text}
                          onChange={(e) => handleParagraphChange(p.id, e.target.value)}
                          rows={3}
                          placeholder={`Enter paragraph ${idx + 1}...`}
                          className="w-full p-2.5 rounded-xl bg-[#FBF7EE]/60 border border-[#E0D4B2] text-xs text-[#23211E] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: PROVENANCE & CULTURAL CITATION */}
              {activeStep === 'PROVENANCE' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#23211E] mb-1">
                      Cultural Provenance & Community Attribution
                    </h3>
                    <p className="text-xs text-[#7C4728]">
                      Protect living oral heritage by honoring the clan, storyteller, and transmission lineage.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Oral Tradition Source *
                      </label>
                      <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Source Collector / Educator
                      </label>
                      <input
                        type="text"
                        value={sourceAuthorOrCollector}
                        onChange={(e) => setSourceAuthorOrCollector(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Elder / Storyteller Knowledge Keeper
                      </label>
                      <input
                        type="text"
                        value={originalStoryteller}
                        onChange={(e) => setOriginalStoryteller(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Rights & Cultural Status
                      </label>
                      <select
                        value={rightsStatus}
                        onChange={(e) => setRightsStatus(e.target.value as RightsStatus)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      >
                        <option value="TRADITIONAL_SOURCE_ADAPTATION">Living Traditional Source Adaptation</option>
                        <option value="PUBLIC_DOMAIN">Public Domain Historical Lore</option>
                        <option value="PERMISSION_REQUIRED">Clan Council Approved</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Regional Variant Notes
                      </label>
                      <textarea
                        value={variantNotes}
                        onChange={(e) => setVariantNotes(e.target.value)}
                        rows={2}
                        className="w-full p-2.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: VOCABULARY & REFLECTION */}
              {activeStep === 'VOCABULARY' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#23211E] mb-1">
                      Vocabulary & Moral Reflection
                    </h3>
                    <p className="text-xs text-[#7C4728]">
                      Teach indigenous terms with pronunciation guides and family discussion prompts.
                    </p>
                  </div>

                  {/* Vocabulary List */}
                  <div className="space-y-2">
                    {vocabularyList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-[#E6DCBF] flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-extrabold text-[#C85A32]">{item.word}</span>
                          {item.language && (
                            <span className="ml-2 text-[10px] font-semibold text-[#7C4728] bg-[#F0E8D0] px-2 py-0.5 rounded">
                              {item.language}
                            </span>
                          )}
                          <p className="text-[11px] text-stone-600 mt-0.5">{item.definition}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteVocabWord(idx)}
                          className="text-stone-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Word Inputs */}
                  <div className="p-3.5 rounded-2xl bg-[#F0E8D0]/60 border border-[#E0D4B2] space-y-2.5">
                    <div className="text-xs font-bold text-[#7C4728]">Add Vocabulary Term</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        placeholder="Word (e.g. Mirembe)"
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={newLang}
                        onChange={(e) => setNewLang(e.target.value)}
                        placeholder="Language (e.g. Luganda)"
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={newDef}
                        onChange={(e) => setNewDef(e.target.value)}
                        placeholder="Definition (e.g. Peace)"
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddVocabWord}
                      className="px-3.5 py-1.5 rounded-xl bg-[#C85A32] text-white font-bold text-xs hover:bg-[#A84320]"
                    >
                      Add Word to Story
                    </button>
                  </div>

                  {/* Think About It Prompt */}
                  <div className="pt-2 border-t border-[#E6DCBF] space-y-3">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#23211E]">
                      "Think About It" Educational Reflection
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Child Discussion Question
                      </label>
                      <input
                        type="text"
                        value={thinkQuestion}
                        onChange={(e) => setThinkQuestion(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#7C4728] mb-1">
                        Parent & Educator Conversation Starter
                      </label>
                      <input
                        type="text"
                        value={parentStarter}
                        onChange={(e) => setParentStarter(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-[#E6DCBF] flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  {activeStep !== 'BASICS' && (
                    <button
                      type="button"
                      onClick={() => {
                        const steps = ['BASICS', 'ILLUSTRATION', 'CONTENT', 'PROVENANCE', 'VOCABULARY'];
                        const curIdx = steps.indexOf(activeStep);
                        if (curIdx > 0) setActiveStep(steps[curIdx - 1] as any);
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs font-bold text-[#7C4728] hover:bg-[#F0E8D0]"
                    >
                      ← Previous Step
                    </button>
                  )}
                  {activeStep !== 'VOCABULARY' && (
                    <button
                      type="button"
                      onClick={() => {
                        const steps = ['BASICS', 'ILLUSTRATION', 'CONTENT', 'PROVENANCE', 'VOCABULARY'];
                        const curIdx = steps.indexOf(activeStep);
                        if (curIdx < steps.length - 1) setActiveStep(steps[curIdx + 1] as any);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#F0E8D0] text-xs font-bold text-[#7C4728] hover:text-[#23211E] hover:bg-[#E6DCBF]"
                    >
                      Next Step →
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-white border border-[#E6DCBF] text-xs font-bold text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#E25822] text-white text-xs sm:text-sm font-extrabold shadow-sm hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Publishing to AfroBox...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Publish Story to AfroBox</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
