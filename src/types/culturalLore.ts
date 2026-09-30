import { AfricanRegion } from './story';

export interface OriginLegend {
  id: string;
  tribe: string;
  country: string;
  region: AfricanRegion;
  era: string;
  title: string;
  subtitle: string;
  founderOrHero: string;
  sacredSite: string;
  synopsis: string;
  fullStoryParagraphs: string[];
  deitiesInvolved: string[];
  culturalValues: string[];
  illustrationUrl: string;
  illustrationCaption: string;
  audioVoiceGuidance?: string;
  relatedStoryId?: string;
}

export interface DeityEntity {
  id: string;
  name: string;
  pronunciation: string;
  tribe: string;
  culture: string;
  region: AfricanRegion;
  country: string;
  role: string;
  domain: string; // e.g. Thunder, Wisdom, Iron, Rivers, Creation
  symbol: string;
  element: string;
  sacredColor?: string;
  description: string;
  mythologicalLore: string;
  praiseTitle: string; // e.g. "Kabiyesi", "Owner of the Endless Sky"
  audioPronunciationText: string;
  icon: string;
  illustrationUrl: string;
}

export interface SacredNameEntity {
  id: string;
  name: string;
  pronunciation: string;
  tribe: string;
  country: string;
  region: AfricanRegion;
  language: string;
  gender: 'MALE' | 'FEMALE' | 'UNISEX';
  category: 'DAY_NAME' | 'DESTINY_CIRCUMSTANCE' | 'VIRTUE_CHARACTER' | 'ANCESTRAL_BLESSING';
  meaning: string;
  spiritualSignificance: string;
  namingTraditionFact: string;
  audioPronunciationText: string;
}

export interface CommonWordEntity {
  id: string;
  word: string;
  pronunciation: string;
  englishMeaning: string;
  language: string;
  tribeOrCommunity: string;
  region: AfricanRegion;
  category: 'GREETING' | 'WISDOM_PHILOSOPHY' | 'FAMILY_COMMUNITY' | 'NATURE_LORE' | 'CELEBRATION';
  culturalNote: string;
  exampleSentence: string;
  exampleTranslation: string;
  audioPronunciationText: string;
}

export interface TraditionalHomeEntity {
  id: string;
  name: string;
  nativeName: string;
  tribe: string;
  region: AfricanRegion;
  country: string;
  architectureType: string;
  materialsUsed: string[];
  thermalDesignFeature: string;
  culturalSignificance: string;
  communityFunction: string;
  funFact: string;
  illustrationUrl: string;
  illustrationCaption: string;
  audioPronunciationText: string;
}
