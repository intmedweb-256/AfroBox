import { LearnerProfile, ProfileBackupData } from '../types/profile';
import { AgeTier } from '../types/afrobox';
import { afroboxStorage } from './afroboxStorage';
import { storageService } from './storageService';
import { gamificationService } from './gamificationService';

const PROFILES_STORAGE_KEY = 'afrobox_learner_profiles_v2';
const ACTIVE_PROFILE_ID_KEY = 'afrobox_active_learner_id_v2';

export const CULTURAL_AVATARS = [
  { emoji: '🦁', name: 'Simba the Lion', color: '#C85A32' },
  { emoji: '🐘', name: 'Tembo the Elephant', color: '#1D3E2F' },
  { emoji: '🐆', name: 'Chui the Leopard', color: '#D9822B' },
  { emoji: '👑', name: 'Royal Crown of Buganda', color: '#E25822' },
  { emoji: '🪘', name: 'Griot Talking Drum', color: '#7C4728' },
  { emoji: '🌳', name: 'Ancient Baobab Tree', color: '#2D5A27' },
  { emoji: '🌍', name: 'Continental Voyager', color: '#1E40AF' },
  { emoji: '🦅', name: 'Fish Eagle of the Nile', color: '#B45309' },
  { emoji: '⚡', name: 'Thunder Spirit Shango', color: '#DC2626' },
  { emoji: '🦉', name: 'Wise Night Owl', color: '#4338CA' }
];

const DEFAULT_PROFILE: LearnerProfile = {
  id: 'learner_default_1',
  name: 'Amara',
  avatar: '🦁',
  avatarColor: '#C85A32',
  ageTier: '6-8',
  schoolGrade: 'Primary 2',
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
  stars: 120,
  completedStoriesCount: 2,
  discoveriesCount: 4,
  solvedRiddlesCount: 1,
  solvedPuzzlesCount: 1
};

class ProfileService {
  private listeners: Array<() => void> = [];

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  public getProfiles(): LearnerProfile[] {
    try {
      const data = localStorage.getItem(PROFILES_STORAGE_KEY);
      if (!data) {
        const initial = [DEFAULT_PROFILE];
        this.saveProfiles(initial);
        return initial;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return [DEFAULT_PROFILE];
    } catch {
      return [DEFAULT_PROFILE];
    }
  }

  private saveProfiles(profiles: LearnerProfile[]): void {
    try {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
    } catch (e) {
      console.warn('Failed to save profiles to localStorage', e);
    }
  }

  public getActiveProfileId(): string {
    try {
      const id = localStorage.getItem(ACTIVE_PROFILE_ID_KEY);
      const profiles = this.getProfiles();
      if (id && profiles.some((p) => p.id === id)) {
        return id;
      }
      const fallbackId = profiles[0]?.id || DEFAULT_PROFILE.id;
      this.setActiveProfileId(fallbackId);
      return fallbackId;
    } catch {
      return DEFAULT_PROFILE.id;
    }
  }

  public getActiveProfile(): LearnerProfile {
    const activeId = this.getActiveProfileId();
    const profiles = this.getProfiles();
    const found = profiles.find((p) => p.id === activeId);
    return found || profiles[0] || DEFAULT_PROFILE;
  }

  public setActiveProfileId(id: string): void {
    const profiles = this.getProfiles();
    const target = profiles.find((p) => p.id === id);
    if (!target) return;

    target.lastActiveAt = new Date().toISOString();
    this.saveProfiles(profiles);
    localStorage.setItem(ACTIVE_PROFILE_ID_KEY, id);

    // Sync age tier with box state
    const box = afroboxStorage.getMyBoxState();
    if (box.ageTier !== target.ageTier) {
      box.ageTier = target.ageTier;
      afroboxStorage.saveMyBoxState(box);
    }

    gamificationService.triggerRewardEffect('star');
    this.notify();
  }

  public createProfile(params: {
    name: string;
    avatar: string;
    avatarColor: string;
    ageTier: AgeTier;
    schoolGrade?: string;
  }): LearnerProfile {
    const profiles = this.getProfiles();
    const newProfile: LearnerProfile = {
      id: `learner_${Date.now()}`,
      name: params.name.trim() || 'Young Explorer',
      avatar: params.avatar || '🦁',
      avatarColor: params.avatarColor || '#C85A32',
      ageTier: params.ageTier || '6-8',
      schoolGrade: params.schoolGrade?.trim() || 'Grade 2',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      stars: 50,
      completedStoriesCount: 0,
      discoveriesCount: 0,
      solvedRiddlesCount: 0,
      solvedPuzzlesCount: 0
    };

    const updated = [...profiles, newProfile];
    this.saveProfiles(updated);
    this.setActiveProfileId(newProfile.id);
    return newProfile;
  }

  public updateProfile(id: string, updates: Partial<LearnerProfile>): LearnerProfile | null {
    const profiles = this.getProfiles();
    const idx = profiles.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    profiles[idx] = {
      ...profiles[idx],
      ...updates,
      lastActiveAt: new Date().toISOString()
    };

    this.saveProfiles(profiles);

    // If active profile updated, sync age tier
    if (this.getActiveProfileId() === id && updates.ageTier) {
      const box = afroboxStorage.getMyBoxState();
      box.ageTier = updates.ageTier;
      afroboxStorage.saveMyBoxState(box);
    }

    this.notify();
    return profiles[idx];
  }

  public deleteProfile(id: string): boolean {
    const profiles = this.getProfiles();
    if (profiles.length <= 1) {
      // Cannot delete last remaining profile
      return false;
    }

    const filtered = profiles.filter((p) => p.id !== id);
    this.saveProfiles(filtered);

    if (this.getActiveProfileId() === id) {
      this.setActiveProfileId(filtered[0].id);
    } else {
      this.notify();
    }
    return true;
  }

  public exportBackup(): string {
    const backup: ProfileBackupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      profiles: this.getProfiles(),
      activeProfileId: this.getActiveProfileId()
    };
    return JSON.stringify(backup, null, 2);
  }

  public importBackup(jsonString: string): { success: boolean; message: string; count?: number } {
    try {
      const parsed: ProfileBackupData = JSON.parse(jsonString);
      if (!Array.isArray(parsed.profiles) || parsed.profiles.length === 0) {
        return { success: false, message: 'Invalid backup file: no learner profiles found.' };
      }

      this.saveProfiles(parsed.profiles);
      const activeId = parsed.activeProfileId || parsed.profiles[0].id;
      this.setActiveProfileId(activeId);
      return {
        success: true,
        message: `Successfully restored ${parsed.profiles.length} learner profile(s)!`,
        count: parsed.profiles.length
      };
    } catch (e: any) {
      return { success: false, message: e?.message || 'Could not parse backup file.' };
    }
  }
}

export const profileService = new ProfileService();
