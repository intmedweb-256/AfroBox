import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Info,
  BookOpen,
  User,
  Users,
  Heart,
  Share2,
  GraduationCap,
  Lightbulb,
  X,
  Compass,
  Brain,
  Layers,
  Sliders,
  FileText
} from 'lucide-react';
import { Story, VocabularyWord, Narration, ChildRecording, StoryFamilyVoiceCast } from '../types/story';
import { PillarId } from '../types/afrobox';
import { CulturalProvenanceCard } from './CulturalProvenanceCard';
import { LearningJourney } from './LearningJourney';
import { VocabularyModal } from './VocabularyModal';
import { StoryIllustration } from './StoryIllustration';
import { FamilyVoiceStudioModal } from './FamilyVoiceStudioModal';
import { VoiceSettingsModal } from './VoiceSettingsModal';
import { audioEngine } from '../services/audioEngine';
import { storageService } from '../services/storageService';
import { analyticsService } from '../services/analyticsService';

interface StoryReaderProps {
  story: Story;
  allStories: Story[];
  onBack: () => void;
  onSelectStory: (story: Story) => void;
  isSaved: boolean;
  onToggleSave: (storyId: string) => void;
  onCompleteStory: (storyId: string, region: string) => void;
  isCompleted: boolean;
  onNavigatePillar?: (pillar: PillarId, contextId?: string) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  story,
  allStories,
  onBack,
  onSelectStory,
  isSaved,
  onToggleSave,
  onCompleteStory,
  isCompleted,
  onNavigatePillar
}) => {
  // Full Story Transcript overlay for teachers and parents
  const [showFullTranscript, setShowFullTranscript] = useState<boolean>(false);

  // Active Scene / Paragraph Index
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [activeVoiceMode, setActiveVoiceMode] = useState<'listen' | 'read'>('listen');

  const [selectedNarration, setSelectedNarration] = useState<Narration>(
    story.narrations[0] || {
      narrationId: 'default',
      storyId: story.id,
      narratorId: 'default',
      narratorName: 'Community Narrator',
      voiceType: 'HUMAN_NARRATOR',
      language: 'English',
      locale: 'en',
      duration: 180,
      recordingMethod: 'Studio Microphone',
      consentStatus: 'VERIFIED_COMMUNITY_CONSENT',
      rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
      publicationStatus: 'PUBLISHED',
      createdAt: new Date().toISOString()
    }
  );

  // Child Recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [recordingSavedNotice, setRecordingSavedNotice] = useState<boolean>(false);
  const recordingTimerRef = useRef<any>(null);

  // Vocabulary Modal state
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);
  const [collectedWords, setCollectedWords] = useState<string[]>([]);

  // Animated Overlays / Drawers
  const [isThinkOpen, setIsThinkOpen] = useState(false);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);
  const [isSchoolGuideOpen, setIsSchoolGuideOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [isFamilyStudioOpen, setIsFamilyStudioOpen] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);

  // Family Voice Cast State (User / Wife / Son)
  const [familyCast, setFamilyCast] = useState<StoryFamilyVoiceCast | null>(null);

  // Find related story
  const relatedStory =
    allStories.find((s) => s.id !== story.id && s.region === story.region) ||
    allStories.find((s) => s.id !== story.id) ||
    story;

  useEffect(() => {
    const prog = storageService.getProgress();
    setCollectedWords(prog.discoveredWords || []);
    setCurrentParagraphIndex(0);

    const cast = storageService.getStoryFamilyCast(story.id);
    setFamilyCast(cast);

    // Track analytics for story engagement
    analyticsService.trackStoryStart(story.id, story.title, story.country, story.region);
    const storyStartTime = Date.now();

    return () => {
      audioEngine.stopSpeaking();
      audioEngine.stopAudioUrl();
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      const elapsed = Math.round((Date.now() - storyStartTime) / 1000);
      if (elapsed > 10) {
        analyticsService.trackAudioListened(elapsed, 'Griot Narrator');
      }
    };
  }, [story.id]);

  // Audio Playback handler: Plays Family Voice if recorded, or community read-aloud
  const handlePlayCurrentScene = () => {
    if (isPlaying) {
      audioEngine.stopSpeaking();
      audioEngine.stopAudioUrl();
      setIsPlaying(false);
      return;
    }

    // Check if there is a family voice recording for this scene
    const sceneRec = familyCast?.sceneRecordings ? familyCast.sceneRecordings[currentParagraphIndex] : undefined;

    if (familyCast?.isDefaultNarrator && sceneRec && sceneRec.audioDataUrl) {
      setIsPlaying(true);
      audioEngine.playAudioUrl(
        sceneRec.audioDataUrl,
        () => {
          setIsPlaying(false);
          if (currentParagraphIndex === story.paragraphs.length - 1) {
            onCompleteStory(story.id, story.region);
          }
        },
        () => {
          setIsPlaying(false);
        }
      );
      return;
    }

    // Check if story has a published or remote narration audio URL for this scene or full story
    const remoteNarration = story.narrations?.find(
      (n) => (n.audioUrl || n.audioDataUri) && n.publicationStatus !== 'PRIVATE'
    );
    if (remoteNarration && (remoteNarration.audioUrl || remoteNarration.audioDataUri)) {
      const audioSource = remoteNarration.audioUrl || remoteNarration.audioDataUri!;
      setIsPlaying(true);
      audioEngine.playAudioUrl(
        audioSource,
        () => {
          setIsPlaying(false);
          if (currentParagraphIndex === story.paragraphs.length - 1) {
            onCompleteStory(story.id, story.region);
          }
        },
        () => {
          // Fallback gracefully to Web Speech API with African voice
          setIsPlaying(true);
          const paragraphTexts = [story.paragraphs[currentParagraphIndex]?.text || ''];
          audioEngine.speakParagraphs(paragraphTexts, 0, speechRate, {
            onEnd: () => {
              setIsPlaying(false);
              if (currentParagraphIndex === story.paragraphs.length - 1) {
                onCompleteStory(story.id, story.region);
              }
            },
            onError: () => setIsPlaying(false)
          });
        }
      );
      return;
    }

    // Default Fallback: Device-level African voices and localized TTS narration
    setIsPlaying(true);
    const paragraphTexts = [story.paragraphs[currentParagraphIndex]?.text || ''];

    audioEngine.speakParagraphs(
      paragraphTexts,
      0,
      speechRate,
      {
        onParagraphChange: () => {},
        onEnd: () => {
          setIsPlaying(false);
          if (currentParagraphIndex === story.paragraphs.length - 1) {
            onCompleteStory(story.id, story.region);
          }
        },
        onError: () => {
          setIsPlaying(false);
        }
      }
    );
  };

  // Full story audio player for continuous scroll mode
  const handlePlayFullStory = () => {
    if (isPlaying) {
      audioEngine.stopSpeaking();
      audioEngine.stopAudioUrl();
      setIsPlaying(false);
      return;
    }

    // Check for remote audio stream first
    const remoteNarration = story.narrations?.find(
      (n) => (n.audioUrl || n.audioDataUri) && n.publicationStatus !== 'PRIVATE'
    );
    if (remoteNarration && (remoteNarration.audioUrl || remoteNarration.audioDataUri)) {
      const audioSource = remoteNarration.audioUrl || remoteNarration.audioDataUri!;
      setIsPlaying(true);
      audioEngine.playAudioUrl(
        audioSource,
        () => {
          setIsPlaying(false);
          onCompleteStory(story.id, story.region);
        },
        () => {
          // Fallback gracefully to device African voice TTS
          setIsPlaying(true);
          const allTexts = story.paragraphs.map((p) => p.text);
          audioEngine.speakParagraphs(allTexts, 0, speechRate, {
            onParagraphChange: () => {},
            onEnd: () => {
              setIsPlaying(false);
              onCompleteStory(story.id, story.region);
            },
            onError: () => setIsPlaying(false)
          });
        }
      );
      return;
    }

    setIsPlaying(true);
    const allTexts = story.paragraphs.map((p) => p.text);
    audioEngine.speakParagraphs(allTexts, 0, speechRate, {
      onParagraphChange: () => {},
      onEnd: () => {
        setIsPlaying(false);
        onCompleteStory(story.id, story.region);
      },
      onError: () => {
        setIsPlaying(false);
      }
    });
  };

  const handleNextPage = () => {
    audioEngine.stopSpeaking();
    setIsPlaying(false);
    if (currentParagraphIndex < story.paragraphs.length - 1) {
      setCurrentParagraphIndex((prev) => prev + 1);
    } else {
      onCompleteStory(story.id, story.region);
      setIsThinkOpen(true);
    }
  };

  const handlePrevPage = () => {
    audioEngine.stopSpeaking();
    setIsPlaying(false);
    if (currentParagraphIndex > 0) {
      setCurrentParagraphIndex((prev) => prev - 1);
    }
  };

  // Child Recording
  const handleStartChildRecording = async () => {
    try {
      setRecordingError(null);
      setRecordedAudioUrl(null);
      await audioEngine.startRecording();
      setIsRecording(true);
      setRecordingTime(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      setRecordingError(
        err?.message || 'Microphone access is required to record voice practice.'
      );
    }
  };

  const handleStopChildRecording = async () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    setIsRecording(false);

    try {
      const result = await audioEngine.stopRecording();
      setRecordedAudioUrl(result.dataUrl);

      const newRec: ChildRecording = {
        id: `rec_${Date.now()}`,
        storyId: story.id,
        storyTitle: story.title,
        recordedAt: new Date().toISOString(),
        durationSeconds: result.durationSeconds,
        audioBlobUrl: result.dataUrl,
        isPrivate: true,
        privacyDeclaration:
          'Private child practice recording. Stored locally only; never uploaded.'
      };
      storageService.saveChildRecording(newRec);
      setRecordingSavedNotice(true);
      setTimeout(() => setRecordingSavedNotice(false), 4000);
    } catch (err: any) {
      setRecordingError(err?.message || 'Failed to finish audio recording.');
    }
  };

  const handleWordClick = (wordText: string) => {
    const cleanWord = wordText.replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, '').trim();
    const vocab = story.vocabulary.find(
      (v) => v.word.toLowerCase() === cleanWord.toLowerCase()
    );

    if (vocab) {
      setSelectedWord(vocab);
    } else {
      setSelectedWord({
        word: cleanWord,
        definition: 'A notable word from this story retelling.',
        language: story.languageOfOrigin
      });
    }
  };

  const handleCollectWord = (word: VocabularyWord) => {
    storageService.collectWord(word);
    setCollectedWords((prev) => [...prev, word.word]);
  };

  const currentParagraph = story.paragraphs[currentParagraphIndex] || story.paragraphs[0];

  return (
    <div
      id="story-reader-container"
      className="relative w-full h-[calc(100dvh-4.2rem)] md:h-[calc(100dvh-5rem)] flex flex-col bg-[#FBF7EE] text-[#23211E] overflow-hidden"
    >
      {/* Top Header Bar */}
      <header className="z-30 bg-[#FBF7EE]/95 backdrop-blur-md border-b border-[#E6DCBF] px-3 sm:px-5 py-2 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <button
            onClick={() => {
              audioEngine.stopSpeaking();
              onBack();
            }}
            className="p-2 rounded-xl bg-white hover:bg-[#F0E8D0] border border-[#E6DCBF] text-[#23211E] transition-colors shadow-2xs shrink-0"
            title="Back to Stories"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-[#23211E] font-['Urbanist'] truncate">
                {story.title}
              </span>
              {isCompleted && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
            </div>
            <div className="text-[11px] text-[#7C4728] font-bold truncate">
              {story.country} • {story.culturalTradition}
            </div>
          </div>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Think About It Overlay Button */}
          <button
            onClick={() => setIsThinkOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C85A32] border border-amber-300 text-xs font-extrabold transition-all"
            title="Reflection & Moral Meaning"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reflect</span>
          </button>

          {/* Provenance Overlay Button */}
          <button
            onClick={() => setIsProvenanceOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F0E8D0] text-[#7C4728] border border-[#E6DCBF] text-xs font-extrabold transition-all"
            title="Cultural Provenance & Heritage"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Origins</span>
          </button>

          {/* Teacher Classroom Guide Button */}
          <button
            onClick={() => setIsSchoolGuideOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold transition-all"
            title="Teacher Discussion Prompts & Lesson Plan"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Lesson</span>
          </button>

          {/* Family Voices Studio Button (User, Wife, Son) */}
          <button
            onClick={() => setIsFamilyStudioOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all shadow-2xs ${
              familyCast && familyCast.sceneRecordings && Object.keys(familyCast.sceneRecordings).length > 0
                ? 'bg-amber-100 text-amber-950 border-amber-400'
                : 'bg-white hover:bg-[#F0E8D0] text-[#7C4728] border-[#E6DCBF]'
            }`}
            title="Record your voice, your wife, and your son to replace or enrich the narrator"
          >
            <Users className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="hidden sm:inline">Family Voices</span>
            {familyCast && familyCast.sceneRecordings && Object.keys(familyCast.sceneRecordings).length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#1D3E2F] text-white text-[10px] font-black">
                {Object.keys(familyCast.sceneRecordings).length}
              </span>
            )}
          </button>

          {/* Learning Journey / Quiz Button */}
          <button
            onClick={() => setIsJourneyOpen(true)}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-gradient-to-r from-[#E25822] to-[#D9822B] text-white text-xs font-extrabold shadow-2xs hover:brightness-105 transition-all"
            title="Story Activities & Quizzes"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden lg:inline ml-1">Activities</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(story.id)}
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-white hover:bg-[#F0E8D0] text-[#7C4728] border-[#E6DCBF]'
            }`}
            title={isSaved ? 'Story Bookmarked' : 'Bookmark Story'}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Educator / Parent Full Story Transcript Toggle */}
          <button
            onClick={() => setShowFullTranscript(!showFullTranscript)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black transition-all flex items-center gap-1.5 shadow-2xs ${
              showFullTranscript
                ? 'bg-[#1D3E2F] text-white border-[#1D3E2F]'
                : 'bg-white hover:bg-[#F0E8D0] text-[#7C4728] border-[#E6DCBF]'
            }`}
            title="Read full story transcript for lesson planning or parent preview"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Story Transcript</span>
          </button>
        </div>
      </header>

      {/* Main Reading Zone: Classroom Scene-by-Scene Zero-Scroll Mode */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden p-3 sm:p-5 max-w-5xl mx-auto w-full">
          {/* Top Section: Scene Artwork Banner & Paragraph Heading */}
          <div className="flex flex-col lg:flex-row gap-4 items-center bg-white rounded-3xl p-3.5 sm:p-5 border-2 border-[#E6DCBF] shadow-xs shrink-0">
            {/* Story Scene Artwork */}
            <div className="w-full lg:w-48 h-32 sm:h-36 lg:h-36 rounded-2xl overflow-hidden shadow-2xs shrink-0 border border-[#E6DCBF]">
              <StoryIllustration
                story={story}
                aspectRatio="aspect-video"
                showBadge={false}
                showCaption={false}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Scene Header & Info */}
            <div className="flex-1 space-y-1.5 w-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#C85A32]">
                  Scene {currentParagraphIndex + 1} of {story.paragraphs.length}
                </span>
                <span className="text-xs font-bold text-[#7C4728] bg-[#FBF7EE] px-2.5 py-0.5 rounded-full border border-[#E6DCBF]">
                  ⏱️ ~{Math.ceil(story.estimatedReadingTime / story.paragraphs.length) || 1} min
                </span>
              </div>

              <h3 className="text-base sm:text-lg lg:text-xl font-black text-[#23211E] font-['Urbanist'] leading-tight">
                {currentParagraph.heading || `Part ${currentParagraphIndex + 1}`}
              </h3>

              {/* Tappable Vocabulary Hint */}
              <div className="text-[11px] font-semibold text-[#7C4728] flex items-center gap-1.5 flex-wrap">
                <span className="bg-amber-100 text-[#C85A32] font-black px-2 py-0.5 rounded-full text-[10px] border border-amber-300">
                  ✨ Interactive
                </span>
                <span>Tap any highlighted word below to discover pronunciation & folklore roots</span>
              </div>
            </div>
          </div>

          {/* Middle Section: Big Readable Scene Text (Fits on Screen) */}
          <div className="flex-1 my-2 sm:my-3 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-[#E6DCBF] shadow-xs flex flex-col justify-center overflow-y-auto">
            <p className="text-base sm:text-xl lg:text-2xl leading-relaxed sm:leading-loose text-[#23211E] font-medium font-['Plus_Jakarta_Sans'] select-text">
              {currentParagraph.text.split(' ').map((word, wIdx) => {
                const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()—"']/g, '').trim().toLowerCase();
                const matchedVocab = story.vocabulary.find((v) => {
                  const target = v.word.toLowerCase();
                  return clean === target || clean.includes(target) || target.includes(clean);
                });

                return matchedVocab ? (
                  <button
                    key={wIdx}
                    onClick={() => handleWordClick(matchedVocab.word)}
                    className="inline-flex items-baseline font-extrabold text-[#C85A32] bg-amber-50 hover:bg-amber-200 border-b-2 border-amber-500 rounded px-1.5 py-0.5 mx-0.5 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                    title={`Tap to explore "${matchedVocab.word}" (${matchedVocab.language || 'Folklore word'})`}
                  >
                    <span>{word}</span>
                    <span className="ml-1 text-[10px] text-amber-700 font-bold hidden sm:inline">🔍</span>
                  </button>
                ) : (
                  <span key={wIdx}>{word} </span>
                );
              })}
            </p>

            {/* In-Scene Interactive Words Quick Bar */}
            {story.vocabulary.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#E6DCBF]/70 flex flex-wrap items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-[#7C4728] mr-1">Words in this story:</span>
                {story.vocabulary.map((vocabItem, vIdx) => (
                  <button
                    key={vIdx}
                    onClick={() => handleWordClick(vocabItem.word)}
                    className="text-xs px-2.5 py-1 rounded-xl bg-[#FBF7EE] hover:bg-amber-100 text-[#C85A32] font-extrabold border border-amber-300 hover:border-amber-400 transition-all flex items-center gap-1"
                  >
                    <span>{vocabItem.word}</span>
                    <Volume2 className="w-3 h-3 text-[#C85A32]" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Section: Narration Voice Audio Strip + Page Turner */}
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#E6DCBF] flex flex-wrap items-center justify-between gap-2.5 shadow-2xs shrink-0">
            {/* Audio Voice Player for this scene */}
            <div className="flex flex-wrap items-center gap-2">
              {(() => {
                const currentSceneRecording = familyCast?.sceneRecordings ? familyCast.sceneRecordings[currentParagraphIndex] : undefined;
                const isFamilyActive = familyCast?.isDefaultNarrator && !!currentSceneRecording;

                return (
                  <>
                    <button
                      onClick={handlePlayCurrentScene}
                      className={`py-2 px-3.5 sm:px-4 rounded-xl text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xs active:scale-95 transition-all ${
                        isFamilyActive
                          ? 'bg-gradient-to-r from-[#C85A32] to-[#D9822B] hover:brightness-105'
                          : 'bg-[#1D3E2F] hover:bg-[#152e23] ring-2 ring-[#1D3E2F]/20'
                      }`}
                      title="Listen to narration of this scene aloud"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-white" />
                          <span>Pause Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>
                            {isFamilyActive
                              ? `Listen: ${currentSceneRecording.performerName}'s Voice`
                              : 'Listen to Scene'}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Performer Speaker Badge if family recorded this scene */}
                    {isFamilyActive && (
                      <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-black text-emerald-950">
                        <Mic className="w-3 h-3 text-emerald-700" />
                        <span>{currentSceneRecording.roleLabel}</span>
                      </div>
                    )}

                    {/* Quick Link to record this scene if not yet recorded */}
                    {!currentSceneRecording && (
                      <button
                        onClick={() => setIsFamilyStudioOpen(true)}
                        className="hidden md:flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C85A32] border border-amber-300 text-xs font-bold transition-all"
                        title="Record your voice or family for this scene"
                      >
                        <Mic className="w-3 h-3" />
                        <span>Record Voice for This Scene</span>
                      </button>
                    )}
                  </>
                );
              })()}

              {/* Speed Buttons */}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-[#7C4728]">
                {[0.8, 1.0, 1.2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setSpeechRate(rate)}
                    className={`px-2 py-1 rounded-lg ${
                      speechRate === rate
                        ? 'bg-[#1D3E2F] text-white'
                        : 'bg-[#F0E8D0] text-[#7C4728] hover:bg-stone-200'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}

                {/* Voice Picker / Audio Settings Button */}
                <button
                  onClick={() => setIsVoiceSettingsOpen(true)}
                  className="px-2 py-1 rounded-lg bg-[#F0E8D0] hover:bg-[#E6DCBF] text-[#7C4728] flex items-center gap-1 font-bold transition-colors cursor-pointer"
                  title="Choose Narrator Voice, Tone & Reading Pace"
                >
                  <Sliders className="w-3 h-3 text-[#C85A32]" />
                  <span className="hidden md:inline">Voice Tone</span>
                </button>
              </div>
            </div>

            {/* Page Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentParagraphIndex === 0}
                className="py-2 px-3 rounded-xl bg-[#F0E8D0] hover:bg-[#E6DCBF] disabled:opacity-40 font-extrabold text-xs text-[#23211E] flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev Scene</span>
              </button>

              {/* Progress indicator dots */}
              <div className="flex items-center gap-1 px-1">
                {story.paragraphs.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      audioEngine.stopSpeaking();
                      setIsPlaying(false);
                      setCurrentParagraphIndex(pIdx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      pIdx === currentParagraphIndex
                        ? 'w-6 bg-[#C85A32]'
                        : 'w-2 bg-[#E6DCBF] hover:bg-[#C85A32]/50'
                    }`}
                    title={`Go to scene ${pIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                className="py-2 px-3.5 rounded-xl bg-[#C85A32] hover:bg-[#b04a25] text-white font-extrabold text-xs flex items-center gap-1 transition-all shadow-xs"
              >
                <span>
                  {currentParagraphIndex < story.paragraphs.length - 1
                    ? 'Next Scene'
                    : 'Complete Story ✨'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      {/* Full Story Transcript Modal (for educators, parents, and deep reading) */}
      {showFullTranscript && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowFullTranscript(false)}
        >
          <div
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-3xl w-full p-5 sm:p-6 space-y-4 max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6DCBF] pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#C85A32]" />
                <div>
                  <h3 className="font-extrabold text-lg text-[#23211E] font-['Urbanist']">
                    {story.title} • Full Story Transcript
                  </h3>
                  <p className="text-xs text-[#7C4728]">
                    {story.country} • {story.culturalTradition} • {story.paragraphs.length} Scenes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFullTranscript(false)}
                className="p-1.5 rounded-xl hover:bg-[#F0E8D0] text-[#7C4728] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              {story.paragraphs.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-[#E6DCBF] shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-black text-[#C85A32]">
                    <span>Scene {idx + 1} {p.heading ? `• ${p.heading}` : ''}</span>
                    <button
                      onClick={() => {
                        setCurrentParagraphIndex(idx);
                        setShowFullTranscript(false);
                      }}
                      className="text-xs text-[#1D3E2F] hover:underline font-bold"
                    >
                      Jump to Scene →
                    </button>
                  </div>
                  <p className="text-sm sm:text-base text-[#23211E] leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E6DCBF] flex justify-end shrink-0">
              <button
                onClick={() => setShowFullTranscript(false)}
                className="px-4 py-2 rounded-xl bg-[#1D3E2F] text-white text-xs font-black hover:bg-[#152e23] transition-all"
              >
                Back to Story Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* ANIMATED OVERLAY DRAWERS (Same Screen, Zero Disruption)                  */}
      {/* ======================================================================== */}

      {/* 1. Think About It & Reflection Questions Overlay */}
      {isThinkOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsThinkOpen(false)}
        >
          <div
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6DCBF] pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#C85A32]" />
                <h3 className="font-extrabold text-lg text-[#23211E] font-['Urbanist']">
                  Think About It: Story Reflection
                </h3>
              </div>
              <button
                onClick={() => setIsThinkOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-200 text-[#23211E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#7C4728] leading-relaxed font-medium">
              {story.thinkAboutIt?.question || story.thinkAboutIt?.prompt}
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-extrabold uppercase text-[#23211E]">
                Key Ideas to Explore:
              </div>
              {(story.thinkAboutIt?.guidingPoints || []).map((pt, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white border border-[#E6DCBF] text-xs text-[#23211E]"
                >
                  <span className="font-bold text-[#C85A32]">• </span>
                  {pt}
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <Heart className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Discussion Starter:</span>{' '}
                {story.thinkAboutIt?.conversationStarterForParents || 'What is the most memorable choice made in this story?'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Cultural Provenance & Origins Overlay */}
      {isProvenanceOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsProvenanceOpen(false)}
        >
          <div
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6DCBF] pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#1D3E2F]" />
                <h3 className="font-extrabold text-lg text-[#23211E] font-['Urbanist']">
                  Cultural Provenance & Heritage Source
                </h3>
              </div>
              <button
                onClick={() => setIsProvenanceOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-200 text-[#23211E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <CulturalProvenanceCard story={story} />
          </div>
        </div>
      )}

      {/* 3. Teacher Classroom Guide Overlay */}
      {isSchoolGuideOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsSchoolGuideOpen(false)}
        >
          <div
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6DCBF] pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-lg text-[#23211E] font-['Urbanist']">
                  Teacher Lesson Plan & Discussion Guide
                </h3>
              </div>
              <button
                onClick={() => setIsSchoolGuideOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-200 text-[#23211E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <div className="font-extrabold text-xs text-emerald-950 uppercase tracking-wider">
                Curriculum Topic
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                African Oral Literature & Storytelling Traditions • Geographic Setting: {story.country} ({story.region})
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold text-[#23211E] uppercase tracking-wider">
                Classroom Inquiry Questions:
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E6DCBF] text-xs space-y-1">
                <span className="font-bold text-emerald-800">1. Comprehension:</span>{' '}
                <span>What problem did the main character face, and what choice did they make?</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E6DCBF] text-xs space-y-1">
                <span className="font-bold text-emerald-800">2. Values & Ethics:</span>{' '}
                <span>How does this story teach respect for nature, elders, or community cooperation?</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Learning Journey Overlay */}
      {isJourneyOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsJourneyOpen(false)}
        >
          <div
            className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E6DCBF] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E25822]" />
                <h3 className="font-extrabold text-lg text-[#23211E] font-['Urbanist']">
                  Connected Learning Activities
                </h3>
              </div>
              <button
                onClick={() => setIsJourneyOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-200 text-[#23211E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <LearningJourney connections={story.relatedContent} storyTitle={story.title} />
          </div>
        </div>
      )}

      {/* 5. Vocabulary Word Popover */}
      <VocabularyModal
        word={selectedWord}
        onClose={() => setSelectedWord(null)}
        onCollectWord={handleCollectWord}
        isCollected={selectedWord ? collectedWords.includes(selectedWord.word) : false}
      />

      {/* 6. Family Voice Studio Modal (Dad, Wife, Son Voice Cast) */}
      <FamilyVoiceStudioModal
        isOpen={isFamilyStudioOpen}
        onClose={() => setIsFamilyStudioOpen(false)}
        story={story}
        onCastUpdated={(newCast) => setFamilyCast(newCast ? { ...newCast } : null)}
      />

      {/* 7. Narrator Voice & Tone Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />
    </div>
  );
};
