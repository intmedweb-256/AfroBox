import { Story, AfricanRegion } from './story';

export type { AfricanRegion };

export type EntityType =
  | 'COUNTRY'
  | 'REGION'
  | 'CITY'
  | 'PERSON'
  | 'ANIMAL'
  | 'PLANT'
  | 'FOOD'
  | 'LANGUAGE'
  | 'LANDMARK'
  | 'NATURAL_FEATURE'
  | 'STORY'
  | 'RIDDLE'
  | 'PUZZLE'
  | 'INSTRUMENT'
  | 'CULTURAL_PRACTICE';

export type AgeTier = '6-8' | '9-10' | '11-12';

export type PillarId = 'EXPLORE' | 'STORYLANDS' | 'BRAIN' | 'RIDDLE' | 'MY_BOX';

export interface BaseEntity {
  id: string;
  type: EntityType;
  name: string;
  localName?: string;
  pronunciationGuide?: string;
  tagline: string;
  description: string;
  illustrationUrl: string;
  icon?: string;
  audioPronunciationText?: string;
  region: AfricanRegion;
  country?: string;
  relatedEntityIds: string[]; // Connected ecosystem links
  funFact: string;
  ageTier: AgeTier;
}

export interface NaturalFeatureEntity extends BaseEntity {
  type: 'NATURAL_FEATURE';
  featureType: 'LAKE' | 'RIVER' | 'MOUNTAIN' | 'WATERFALL' | 'DELTA' | 'FOREST' | 'VALLEY';
  ecosystem: string;
  coordinates?: { lat: number; lng: number };
  surroundingCountries: string[];
}

export interface LandmarkEntity extends BaseEntity {
  type: 'LANDMARK';
  historicalPeriod: string;
  builtBy?: string;
  significance: string;
  coordinates?: { lat: number; lng: number };
}

export interface AnimalEntity extends BaseEntity {
  type: 'ANIMAL';
  scientificName?: string;
  habitat: string;
  diet: string;
  culturalSymbolism: string;
  soundName?: string;
  isThreatened?: boolean;
}

export interface PlantEntity extends BaseEntity {
  type: 'PLANT';
  medicinalOrCulturalUse: string;
  habitat: string;
  longevity?: string;
}

export interface FoodEntity extends BaseEntity {
  type: 'FOOD';
  mainIngredients: string[];
  traditionallyEatenDuring?: string;
  recipeSummary?: string;
}

export interface LanguageEntity extends BaseEntity {
  type: 'LANGUAGE';
  speakersCountEstimate?: string;
  commonGreetings: Array<{ phrase: string; phonetic: string; meaning: string }>;
  languageFamily: string;
}

export interface InstrumentEntity extends BaseEntity {
  type: 'INSTRUMENT';
  family: 'STRING' | 'PERCUSSION' | 'WIND';
  materials: string[];
  musicalRole: string;
}

export interface RiddleEntity {
  id: string;
  entityId: string; // The entity this riddle reveals
  title: string;
  riddleText: string;
  audioVoiceGuidance?: string;
  clues: string[];
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  ageTier: AgeTier;
  region: AfricanRegion;
  connectedStoryId?: string;
  connectedExploreEntityId?: string;
  rewardBadge: string;
}

export interface BrainPuzzleEntity {
  id: string;
  title: string;
  type: 'GEOGRAPHY_MATCH' | 'WORD_TRANSLATE' | 'HABITAT_SORT' | 'RHYTHM_PATTERN';
  description: string;
  instruction: string;
  ageTier: AgeTier;
  region: AfricanRegion;
  connectedEntityIds: string[];
  payload: {
    items?: Array<{ id: string; label: string; matchId: string; icon?: string }>;
    targets?: Array<{ id: string; label: string; icon?: string }>;
    question?: string;
    options?: string[];
    correctIndex?: number;
    explanation?: string;
  };
}

export type AfroBoxEntity =
  | NaturalFeatureEntity
  | LandmarkEntity
  | AnimalEntity
  | PlantEntity
  | FoodEntity
  | LanguageEntity
  | InstrumentEntity
  | BaseEntity;

export interface MyBoxDiscovery {
  entityId: string;
  entityName: string;
  entityType: EntityType;
  icon: string;
  discoveredAt: string;
  region: AfricanRegion;
  country?: string;
}

export interface MyBoxState {
  ageTier: AgeTier;
  discoveries: MyBoxDiscovery[];
  solvedRiddleIds: string[];
  solvedBrainPuzzleIds: string[];
  savedStoryIds: string[];
  completedStoryIds: string[];
  regionsVisited: AfricanRegion[];
  voiceRecordingsCount: number;
  earnedStickers: string[];
}
