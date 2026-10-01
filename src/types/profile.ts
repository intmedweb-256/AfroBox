import { AgeTier } from './afrobox';
import { VoicePreferences } from '../services/audioEngine';

export interface LearnerProfile {
  id: string;
  name: string;
  avatar: string; // Emoji, e.g. 🦁, 🐘, 👑, 🪘, 🐆, 🌍, ⚡, 🌳, 🦉, 🦅
  avatarColor: string; // Accent color hex
  ageTier: AgeTier;
  schoolGrade?: string; // e.g. "Primary 2", "Grade 3", "Early Reader", "Home"
  createdAt: string;
  lastActiveAt: string;
  stars: number;
  completedStoriesCount: number;
  discoveriesCount: number;
  solvedRiddlesCount: number;
  solvedPuzzlesCount: number;
  preferredVoice?: Partial<VoicePreferences>;
}

export interface ProfileBackupData {
  version: number;
  exportedAt: string;
  profiles: LearnerProfile[];
  activeProfileId: string;
}
