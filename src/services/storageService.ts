import {
  ChildRecording,
  ReaderProgress,
  VocabularyWord,
  FamilyVoiceProfile,
  StoryFamilyVoiceCast,
  SceneVoiceRecording
} from '../types/story';

const PROGRESS_STORAGE_KEY = 'afrobox_storylands_progress_v1';
const RECORDINGS_STORAGE_KEY = 'afrobox_storylands_private_recordings_v1';
const FAMILY_PROFILES_KEY = 'afrobox_family_voice_profiles_v1';
const FAMILY_CASTS_KEY = 'afrobox_family_story_casts_v1';

const DEFAULT_FAMILY_PROFILES: FamilyVoiceProfile[] = [
  {
    id: 'profile_dad',
    name: 'Dad',
    role: 'DAD',
    relationshipLabel: 'Main Story Narrator',
    avatarEmoji: '👨🏾',
    avatarColor: '#1D3E2F',
    createdAt: new Date().toISOString()
  },
  {
    id: 'profile_wife',
    name: 'Wife / Mom',
    role: 'MOM',
    relationshipLabel: 'Queens, Motherly Voices & Animals',
    avatarEmoji: '👩🏾',
    avatarColor: '#C85A32',
    createdAt: new Date().toISOString()
  },
  {
    id: 'profile_son',
    name: 'Son',
    role: 'SON',
    relationshipLabel: 'Anansi, Heroes & Young Adventurers',
    avatarEmoji: '👦🏾',
    avatarColor: '#D9822B',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_PROGRESS: ReaderProgress = {
  userId: 'local_explorer',
  savedStoryIds: [],
  completedStoryIds: [],
  storyReadingHistory: [],
  earnedBadges: [
    {
      id: 'welcome_explorer',
      title: 'Storylands Explorer',
      description: 'Entered the world of African stories and living knowledge',
      icon: 'compass',
      unlockedAt: new Date().toISOString()
    }
  ],
  discoveredWords: [],
  regionsVisited: []
};

export const storageService = {
  getProgress(): ReaderProgress {
    try {
      const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!data) return INITIAL_PROGRESS;
      return JSON.parse(data);
    } catch {
      return INITIAL_PROGRESS;
    }
  },

  saveProgress(progress: ReaderProgress): void {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save reader progress to localStorage', e);
    }
  },

  toggleSaveStory(storyId: string): boolean {
    const progress = this.getProgress();
    const exists = progress.savedStoryIds.includes(storyId);
    if (exists) {
      progress.savedStoryIds = progress.savedStoryIds.filter((id) => id !== storyId);
    } else {
      progress.savedStoryIds.push(storyId);
    }
    this.saveProgress(progress);
    return !exists;
  },

  markStoryCompleted(storyId: string, region: string): ReaderProgress {
    const progress = this.getProgress();
    if (!progress.completedStoryIds.includes(storyId)) {
      progress.completedStoryIds.push(storyId);
    }

    if (!progress.regionsVisited.includes(region)) {
      progress.regionsVisited.push(region);
    }

    // Check badges
    if (progress.completedStoryIds.length >= 1 && !progress.earnedBadges.some((b) => b.id === 'first_story')) {
      progress.earnedBadges.push({
        id: 'first_story',
        title: 'Story Weaver',
        description: 'Finished your first traditional African journey',
        icon: 'book-open',
        unlockedAt: new Date().toISOString()
      });
    }

    if (progress.regionsVisited.length >= 2 && !progress.earnedBadges.some((b) => b.id === 'voyager')) {
      progress.earnedBadges.push({
        id: 'voyager',
        title: 'Continental Voyager',
        description: 'Traveled across multiple regions of Africa',
        icon: 'map',
        unlockedAt: new Date().toISOString()
      });
    }

    this.saveProgress(progress);
    return progress;
  },

  collectWord(word: VocabularyWord): boolean {
    const progress = this.getProgress();
    if (!progress.discoveredWords.includes(word.word)) {
      progress.discoveredWords.push(word.word);
      if (progress.discoveredWords.length >= 3 && !progress.earnedBadges.some((b) => b.id === 'word_collector')) {
        progress.earnedBadges.push({
          id: 'word_collector',
          title: 'Word Guardian',
          description: 'Collected 3 or more indigenous language words in your Word Chest',
          icon: 'gem',
          unlockedAt: new Date().toISOString()
        });
      }
      this.saveProgress(progress);
      return true;
    }
    return false;
  },

  getPrivateRecordings(): ChildRecording[] {
    try {
      const data = localStorage.getItem(RECORDINGS_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveChildRecording(recording: ChildRecording): void {
    const recordings = this.getPrivateRecordings();
    // Prepend new recording
    const updated = [recording, ...recordings];
    try {
      localStorage.setItem(RECORDINGS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage limit reached when saving audio recording locally', e);
    }

    // Award badge for practice reading
    const progress = this.getProgress();
    if (!progress.earnedBadges.some((b) => b.id === 'my_voice')) {
      progress.earnedBadges.push({
        id: 'my_voice',
        title: 'Voice of the Griot',
        description: 'Recorded yourself reading an African story with your own voice',
        icon: 'mic',
        unlockedAt: new Date().toISOString()
      });
      this.saveProgress(progress);
    }
  },

  deleteRecording(id: string): ChildRecording[] {
    const recordings = this.getPrivateRecordings().filter((r) => r.id !== id);
    localStorage.setItem(RECORDINGS_STORAGE_KEY, JSON.stringify(recordings));
    return recordings;
  },

  // FAMILY VOICE PROFILES (User, Wife, Son, Custom)
  getFamilyProfiles(): FamilyVoiceProfile[] {
    try {
      const data = localStorage.getItem(FAMILY_PROFILES_KEY);
      if (!data) {
        localStorage.setItem(FAMILY_PROFILES_KEY, JSON.stringify(DEFAULT_FAMILY_PROFILES));
        return DEFAULT_FAMILY_PROFILES;
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FAMILY_PROFILES;
    } catch {
      return DEFAULT_FAMILY_PROFILES;
    }
  },

  saveFamilyProfile(profile: FamilyVoiceProfile): FamilyVoiceProfile[] {
    const profiles = this.getFamilyProfiles();
    const existingIdx = profiles.findIndex((p) => p.id === profile.id);
    let updated: FamilyVoiceProfile[];
    if (existingIdx >= 0) {
      updated = [...profiles];
      updated[existingIdx] = profile;
    } else {
      updated = [...profiles, profile];
    }
    localStorage.setItem(FAMILY_PROFILES_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteFamilyProfile(profileId: string): FamilyVoiceProfile[] {
    const profiles = this.getFamilyProfiles().filter((p) => p.id !== profileId);
    localStorage.setItem(FAMILY_PROFILES_KEY, JSON.stringify(profiles));
    return profiles;
  },

  // STORY FAMILY CAST RECORDINGS
  getAllFamilyStoryCasts(): { [storyId: string]: StoryFamilyVoiceCast } {
    try {
      const data = localStorage.getItem(FAMILY_CASTS_KEY);
      if (!data) return {};
      return JSON.parse(data);
    } catch {
      return {};
    }
  },

  getStoryFamilyCast(storyId: string): StoryFamilyVoiceCast | null {
    const all = this.getAllFamilyStoryCasts();
    return all[storyId] || null;
  },

  saveSceneRecording(
    storyId: string,
    paragraphIndex: number,
    recording: SceneVoiceRecording,
    setAsDefaultNarrator: boolean = true
  ): StoryFamilyVoiceCast {
    const all = this.getAllFamilyStoryCasts();
    const existing: StoryFamilyVoiceCast = all[storyId] || {
      storyId,
      trackTitle: 'Our Family Cast Retelling',
      isDefaultNarrator: setAsDefaultNarrator,
      sceneRecordings: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    existing.sceneRecordings[paragraphIndex] = recording;
    existing.updatedAt = new Date().toISOString();
    if (setAsDefaultNarrator) {
      existing.isDefaultNarrator = true;
    }

    all[storyId] = existing;
    try {
      localStorage.setItem(FAMILY_CASTS_KEY, JSON.stringify(all));
    } catch (e) {
      console.warn('LocalStorage limit for family voice audio, saving in memory', e);
    }

    // Award badge for family storytelling
    const progress = this.getProgress();
    if (!progress.earnedBadges.some((b) => b.id === 'family_storytellers')) {
      progress.earnedBadges.push({
        id: 'family_storytellers',
        title: 'Circle of Griots',
        description: 'Recorded a family story cast with your own voices',
        icon: 'users',
        unlockedAt: new Date().toISOString()
      });
      this.saveProgress(progress);
    }

    return existing;
  },

  deleteSceneRecording(storyId: string, paragraphIndex: number): StoryFamilyVoiceCast | null {
    const all = this.getAllFamilyStoryCasts();
    if (!all[storyId]) return null;

    delete all[storyId].sceneRecordings[paragraphIndex];
    all[storyId].updatedAt = new Date().toISOString();
    localStorage.setItem(FAMILY_CASTS_KEY, JSON.stringify(all));
    return all[storyId];
  },

  toggleStoryDefaultNarrator(storyId: string, useFamilyCast: boolean): boolean {
    const all = this.getAllFamilyStoryCasts();
    if (all[storyId]) {
      all[storyId].isDefaultNarrator = useFamilyCast;
      localStorage.setItem(FAMILY_CASTS_KEY, JSON.stringify(all));
      return useFamilyCast;
    }
    return false;
  }
};
