import { AgeTier, AfricanRegion, PillarId } from './afrobox';

export type { AgeTier, AfricanRegion, PillarId };

export type ChallengeType =
  | 'TRADITIONAL_RIDDLE'
  | 'LANGUAGE_RIDDLE'
  | 'LOGIC'
  | 'VISUAL_REASONING'
  | 'PATTERN'
  | 'AFRICA_CONTEXT'
  | 'NATURAL_WORLD';

export type RepresentationMode =
  | 'COMMUNITY_TRADITION'
  | 'LANGUAGE_TRADITION'
  | 'NATURAL_FEATURE'
  | 'ENVIRONMENT'
  | 'CONTEMPORARY_CONTEXT'
  | 'ORIGINAL_PUZZLE';

export type VerificationStatus =
  | 'VERIFIED_COMMUNITY'
  | 'VERIFIED_DOCUMENTED_ARCHIVE'
  | 'EDUCATIONAL_ORIGINAL'
  | 'PENDING_REVIEW';

export type ThinkingSkill =
  | 'REASONING'
  | 'OBSERVATION'
  | 'PATTERN_RECOGNITION'
  | 'LANGUAGE_SKILLS'
  | 'MEMORY'
  | 'SPATIAL_THINKING'
  | 'DEDUCTION'
  | 'PROBLEM_SOLVING'
  | 'CURIOSITY';

export interface TraditionalContext {
  openingFormula?: string; // e.g. "Kitendawili!" (Riddle!)
  responseFormula?: string; // e.g. "Tega!" (Set/Trap it!)
  performanceSetting?: string; // e.g. "Evening fireside gathering after dinner"
  participantsRole?: string; // e.g. "Elders challenge children to sharpen their wit"
  languageName?: string;
  regionalVariant?: string;
}

export interface InteractiveChallengePayload {
  kind: 'MULTIPLE_CHOICE' | 'RIVER_CROSSING' | 'SEQUENCE_BUILDER' | 'VISUAL_PUZZLE' | 'STEP_DEDUCTION';
  riverCrossingData?: {
    boatCapacity: number;
    items: Array<{ id: string; name: string; icon: string; conflictsWith: string[] }>;
    leftBank: string[];
    rightBank: string[];
    goalSide: 'right';
  };
  sequenceData?: {
    given: string[];
    options: string[];
    correctNext: string;
    patternRule: string;
  };
  visualData?: {
    matrix: string[][];
    missingPosition: [number, number];
    options: Array<{ id: string; visual: string; label: string }>;
    correctId: string;
  };
}

export interface Challenge {
  id: string;
  title: string;
  type: ChallengeType;
  representationMode: RepresentationMode;
  question: string;
  answer: string;
  answerOptions: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint: string;
  solutionSteps: string[];
  country: string;
  region: AfricanRegion;
  community: string;
  language: string;
  culturalContext: string;
  source: string;
  sourceType: 'ORAL_TRADITION' | 'ETHNOGRAPHIC_COLLECTION' | 'SCHOLARLY_PUBLICATION' | 'ORIGINAL_CURRICULUM';
  sourceAuthorOrCollector: string;
  rightsStatus: 'PUBLIC_DOMAIN' | 'COMMUNITY_HERITAGE' | 'EDUCATIONAL_CC' | 'ORIGINAL_AFROBOX';
  verificationStatus: VerificationStatus;
  traditionalContext?: TraditionalContext;
  ageTier: AgeTier;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  skillsDeveloped: ThinkingSkill[];
  interactivePayload?: InteractiveChallengePayload;
  audioPronunciationText?: string;
  accentRegion?: 'west-african' | 'east-african' | 'southern-african' | 'north-african';
  connectedWorldLinks?: {
    explorePinId?: string;
    storyId?: string;
    instrumentId?: string;
  };
}

export interface RiddleBrainFilter {
  type: ChallengeType | 'ALL';
  representationMode: RepresentationMode | 'ALL';
  skill: ThinkingSkill | 'ALL';
  region: AfricanRegion | 'ALL';
  ageTier: AgeTier | 'ALL';
  searchQuery: string;
}

export interface UserChallengeProgress {
  challengeId: string;
  completedAt: string;
  attemptsCount: number;
  hintsUsed: number;
  starsEarned: number; // 1, 2, or 3
}

export interface RiddleBrainStats {
  totalSolved: number;
  skillsMastery: Record<ThinkingSkill, number>;
  completedByRepresentation: Record<RepresentationMode, number>;
  solvedChallengeIds: string[];
  currentStreak: number;
}
