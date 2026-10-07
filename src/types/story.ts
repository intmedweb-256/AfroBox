export type StoryType =
  | 'TRADITIONAL_FOLKTALE'
  | 'LEGEND'
  | 'MYTH_ORIGIN'
  | 'ANIMAL_TRICKSTER'
  | 'CONTEMPORARY'
  | 'ADAPTED_TRADITIONAL';

export type RightsStatus =
  | 'PUBLIC_DOMAIN'
  | 'CC_BY'
  | 'CC_BY_SA'
  | 'CC_BY_NC'
  | 'PERMISSION_REQUIRED'
  | 'TRADITIONAL_SOURCE_ADAPTATION'
  | 'RESEARCH_ONLY';

export type PublicationStatus =
  | 'RESEARCH'
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED';

export type VerificationStatus =
  | 'VERIFIED'
  | 'RESEARCH_IN_PROGRESS'
  | 'DEMO_PLACEHOLDER';

export type VoiceType =
  | 'HUMAN_NARRATOR'
  | 'PARENT'
  | 'TEACHER'
  | 'COMMUNITY_STORYTELLER'
  | 'CHILD_READING'
  | 'AI_GENERATED'
  | 'AI_CLONED';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'CHALLENGING';

export type AfricanRegion =
  | 'West Africa'
  | 'East Africa'
  | 'Southern Africa'
  | 'North Africa'
  | 'Central Africa';

export interface Illustration {
  url: string;
  alt: string;
  caption?: string;
  artistOrCredit?: string;
  landscapeDescription?: string;
  drawingStyle?: string;
  artStyleLabel?: string;
}

export interface VocabularyWord {
  word: string;
  language?: string;
  phonetic?: string;
  definition: string;
  culturalContext?: string;
  audioPronunciation?: string;
}

export interface StoryParagraph {
  id: string;
  paragraphNumber: number;
  text: string;
  heading?: string;
  highlightWords?: string[];
}

export interface ThinkAboutItPrompt {
  question: string;
  prompt: string;
  guidingPoints: string[];
  conversationStarterForParents: string;
}

export interface LearningConnection {
  id: string;
  step: 'THINK' | 'EXPLORE' | 'CREATE';
  title: string;
  learningArea:
    | 'Reading Comprehension'
    | 'Vocabulary & Linguistics'
    | 'Geography & Ecology'
    | 'Science & Natural World'
    | 'Cultural Heritage'
    | 'Creative Writing & Art'
    | 'Riddles & Logic';
  description: string;
  interactiveType: 'quiz' | 'geography_card' | 'culture_insight' | 'creative_prompt' | 'word_match';
  payload: {
    question?: string;
    options?: string[];
    correctIndex?: number;
    explanation?: string;
    mapLocation?: {
      country: string;
      region: string;
      coordinatesName: string;
      ecosystem: string;
      fact: string;
    };
    creativeTask?: string;
    culturalDetails?: string[];
  };
}

export interface Narration {
  narrationId: string;
  storyId: string;
  narratorId: string;
  narratorName: string;
  voiceType: VoiceType;
  language: string;
  locale: string;
  audioUrl?: string;
  audioDataUri?: string; // for user/child recording
  duration: number; // in seconds
  recordingMethod: string;
  consentStatus:
    | 'VERIFIED_COMMUNITY_CONSENT'
    | 'PARENT_AUTHORIZED_PRIVATE'
    | 'STUDIO_LICENSED'
    | 'RESEARCH_ARCHIVE_CONSENT';
  rightsStatus: RightsStatus;
  publicationStatus: 'PRIVATE' | 'UNLISTED' | 'PUBLISHED';
  createdAt: string;
  approvedAt?: string;
  isChildRecording?: boolean;
  privacyNotice?: string;
}

export interface Story {
  id: string;
  title: string;
  shortDescription: string;
  country: string;
  region: AfricanRegion;
  culturalTradition: string;
  community: string;
  languageOfOrigin: string;
  storyType: StoryType;
  themes: string[];
  ageRange: string;
  difficulty: DifficultyLevel;
  estimatedReadingTime: number; // minutes
  readingTimeMinutes?: number;
  learningObjectives: string[];
  source: string;
  sourceType: string;
  sourceAuthorOrCollector: string;
  originalStoryteller: string;
  rightsStatus: RightsStatus;
  adaptationStatus: string;
  verificationStatus: VerificationStatus;
  variantNotes: string;
  illustration: Illustration;
  narrations: Narration[];
  relatedContent: LearningConnection[];
  dateAdded: string;
  publicationStatus: PublicationStatus;
  paragraphs: StoryParagraph[];
  vocabulary: VocabularyWord[];
  thinkAboutIt: ThinkAboutItPrompt;
  characterNames: string[];
  format: 'READ_ALONG' | 'AUDIO_FIRST' | 'ILLUSTRATED';
}

export interface ChildRecording {
  id: string;
  storyId: string;
  storyTitle: string;
  recordedAt: string;
  durationSeconds: number;
  audioBlobUrl: string;
  isPrivate: boolean;
  privacyDeclaration: string;
}

export type FamilyRole = 'DAD' | 'MOM' | 'SON' | 'DAUGHTER' | 'CHILD' | 'GRANDPARENT' | 'TEACHER' | 'CUSTOM';

export interface FamilyVoiceProfile {
  id: string;
  name: string;
  role: FamilyRole;
  relationshipLabel: string;
  avatarEmoji: string;
  avatarColor: string;
  createdAt: string;
}

export interface SceneVoiceRecording {
  paragraphIndex: number;
  performerProfileId: string;
  performerName: string;
  roleLabel: string;
  audioDataUrl: string;
  durationSeconds: number;
  recordedAt: string;
}

export interface StoryFamilyVoiceCast {
  storyId: string;
  trackTitle: string;
  isDefaultNarrator: boolean;
  sceneRecordings: { [paragraphIndex: number]: SceneVoiceRecording };
  createdAt: string;
  updatedAt: string;
}

export interface ReaderProgress {
  userId: string;
  savedStoryIds: string[];
  completedStoryIds: string[];
  storyReadingHistory: {
    storyId: string;
    lastReadAt: string;
    progressPercentage: number;
    listenCount: number;
  }[];
  earnedBadges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
  discoveredWords: string[];
  regionsVisited: string[];
}
