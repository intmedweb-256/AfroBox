import { afroboxStorage } from './afroboxStorage';
import { storageService } from './storageService';
import { audioEngine } from './audioEngine';

export interface LevelInfo {
  level: number;
  title: string;
  badgeEmoji: string;
  currentXP: number;
  minXP: number;
  nextXP: number;
  progressPercent: number;
}

export interface RegionProgress {
  region: string;
  visited: boolean;
  discoveriesCount: number;
  percent: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  rewardXP: number;
  completed: boolean;
  icon: string;
}

const REGIONS = [
  'West Africa',
  'East Africa',
  'North Africa',
  'Central Africa',
  'Southern Africa'
];

const XP_RULES = {
  DISCOVERY: 30,
  STORY_SCENE: 15,
  STORY_COMPLETE: 60,
  RIDDLE_SOLVED: 45,
  PUZZLE_SOLVED: 50,
  WORD_COLLECTED: 25,
  FAMILY_VOICE_RECORDED: 75
};

class GamificationService {
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

  public getXP(): number {
    const box = afroboxStorage.getMyBoxState();
    const progress = storageService.getProgress();
    const casts = storageService.getAllFamilyStoryCasts();

    let familyRecordingsCount = 0;
    Object.values(casts).forEach((c) => {
      familyRecordingsCount += Object.keys(c.sceneRecordings || {}).length;
    });

    const xpFromDiscoveries = (box.discoveries?.length || 0) * XP_RULES.DISCOVERY;
    const xpFromStories = (progress.completedStoryIds?.length || 0) * XP_RULES.STORY_COMPLETE;
    const xpFromRiddles = (box.solvedRiddleIds?.length || 0) * XP_RULES.RIDDLE_SOLVED;
    const xpFromPuzzles = (box.solvedBrainPuzzleIds?.length || 0) * XP_RULES.PUZZLE_SOLVED;
    const xpFromWords = (progress.discoveredWords?.length || 0) * XP_RULES.WORD_COLLECTED;
    const xpFromVoices = familyRecordingsCount * XP_RULES.FAMILY_VOICE_RECORDED;

    return (
      120 + // Starting explorer bonus
      xpFromDiscoveries +
      xpFromStories +
      xpFromRiddles +
      xpFromPuzzles +
      xpFromWords +
      xpFromVoices
    );
  }

  public getLevelInfo(): LevelInfo {
    const totalXP = this.getXP();

    const levels = [
      { level: 1, title: 'Savanna Scout', badge: '🌱', maxXP: 200 },
      { level: 2, title: 'River Voyager', badge: '🌊', maxXP: 450 },
      { level: 3, title: 'Griot Storyteller', badge: '🪘', maxXP: 800 },
      { level: 4, title: 'Riddle Master', badge: '🧠', maxXP: 1300 },
      { level: 5, title: 'Continental Cartographer', badge: '🌍', maxXP: 2000 },
      { level: 6, title: 'Elder of Living Wisdom', badge: '👑', maxXP: 3000 }
    ];

    let currentLevel = levels[0];
    let prevMax = 0;

    for (let i = 0; i < levels.length; i++) {
      if (totalXP < levels[i].maxXP || i === levels.length - 1) {
        currentLevel = levels[i];
        break;
      }
      prevMax = levels[i].maxXP;
    }

    const range = currentLevel.maxXP - prevMax;
    const progressWithinLevel = Math.max(0, totalXP - prevMax);
    const progressPercent = Math.min(100, Math.round((progressWithinLevel / range) * 100));

    return {
      level: currentLevel.level,
      title: currentLevel.title,
      badgeEmoji: currentLevel.badge,
      currentXP: totalXP,
      minXP: prevMax,
      nextXP: currentLevel.maxXP,
      progressPercent
    };
  }

  public getContinentalProgress(): {
    overallPercent: number;
    regions: RegionProgress[];
  } {
    const box = afroboxStorage.getMyBoxState();
    const visitedSet = new Set<string>(box.regionsVisited || []);

    const regions: RegionProgress[] = REGIONS.map((regionName) => {
      const isVisited = visitedSet.has(regionName);
      const discoveriesInRegion = (box.discoveries || []).filter(
        (d) => d.region?.toLowerCase() === regionName.toLowerCase()
      ).length;

      const percent = Math.min(100, (discoveriesInRegion >= 1 ? 50 : 0) + (isVisited ? 50 : 0));

      return {
        region: regionName,
        visited: isVisited,
        discoveriesCount: discoveriesInRegion,
        percent: percent === 0 && isVisited ? 40 : percent
      };
    });

    const overallPercent = Math.round(
      regions.reduce((acc, r) => acc + r.percent, 0) / regions.length
    );

    return { overallPercent, regions };
  }

  public getDailyQuests(): DailyQuest[] {
    const box = afroboxStorage.getMyBoxState();
    const progress = storageService.getProgress();
    const casts = storageService.getAllFamilyStoryCasts();

    const hasFamilyVoice = Object.values(casts).some(
      (c) => Object.keys(c.sceneRecordings || {}).length > 0
    );

    return [
      {
        id: 'q_explore',
        title: 'Discover 1 landmark or animal on the African Map',
        rewardXP: 30,
        completed: (box.discoveries?.length || 0) >= 1,
        icon: '🌍'
      },
      {
        id: 'q_story',
        title: 'Read 1 African Folktale scene or collect an indigenous word',
        rewardXP: 25,
        completed: (progress.discoveredWords?.length || 0) >= 1 || (progress.completedStoryIds?.length || 0) >= 1,
        icon: '📖'
      },
      {
        id: 'q_voice',
        title: 'Record a family voice track or solve a riddle',
        rewardXP: 50,
        completed: hasFamilyVoice || (box.solvedRiddleIds?.length || 0) >= 1,
        icon: '🎙️'
      }
    ];
  }

  public triggerRewardEffect(actionType: string): void {
    if (actionType === 'discovery') {
      audioEngine.playSoundEffect('collect');
    } else if (actionType === 'story') {
      audioEngine.playSoundEffect('kora');
    } else if (actionType === 'riddle') {
      audioEngine.playSoundEffect('mbira');
    } else if (actionType === 'voice') {
      audioEngine.playSoundEffect('drum');
    }
    this.notify();
  }
}

export const gamificationService = new GamificationService();
