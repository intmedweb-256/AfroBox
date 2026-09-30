import {
  Challenge,
  ChallengeType,
  RepresentationMode,
  ThinkingSkill,
  RiddleBrainFilter,
  UserChallengeProgress,
  RiddleBrainStats
} from '../types/riddleBrain';
import { RIDDLE_BRAIN_CHALLENGES } from '../data/riddleBrainChallenges';

const STORAGE_KEY_PROGRESS = 'afrobox_riddle_brain_progress_v1';
const STORAGE_KEY_ACTIVE_FILTER = 'afrobox_riddle_brain_filter_v1';

class RiddleBrainService {
  private challenges: Challenge[] = RIDDLE_BRAIN_CHALLENGES;
  private progressMap: Record<string, UserChallengeProgress> = {};

  constructor() {
    this.loadLocalProgress();
  }

  private loadLocalProgress(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (stored) {
        this.progressMap = JSON.parse(stored);
      }
    } catch {
      this.progressMap = {};
    }
  }

  private saveLocalProgress(): void {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(this.progressMap));
    } catch {
      // Storage quota or sandboxed iframe restriction fallback
    }
  }

  /**
   * Fetch challenges with optional multi-dimensional filtering
   */
  public getChallenges(filter?: Partial<RiddleBrainFilter>): Challenge[] {
    let list = [...this.challenges];

    if (!filter) return list;

    if (filter.type && filter.type !== 'ALL') {
      list = list.filter((c) => c.type === filter.type);
    }

    if (filter.representationMode && filter.representationMode !== 'ALL') {
      list = list.filter((c) => c.representationMode === filter.representationMode);
    }

    if (filter.skill && filter.skill !== 'ALL') {
      list = list.filter((c) => c.skillsDeveloped.includes(filter.skill as ThinkingSkill));
    }

    if (filter.region && filter.region !== 'ALL') {
      list = list.filter((c) => c.region === filter.region);
    }

    if (filter.ageTier && filter.ageTier !== 'ALL') {
      list = list.filter((c) => c.ageTier === filter.ageTier);
    }

    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.question.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.community.toLowerCase().includes(q) ||
          c.skillsDeveloped.some((s) => s.toLowerCase().includes(q))
      );
    }

    return list;
  }

  public getChallengeById(id: string): Challenge | undefined {
    return this.challenges.find((c) => c.id === id);
  }

  public getProgressForChallenge(challengeId: string): UserChallengeProgress | undefined {
    return this.progressMap[challengeId];
  }

  public isSolved(challengeId: string): boolean {
    return !!this.progressMap[challengeId];
  }

  /**
   * Record a completed challenge attempt
   */
  public recordSolvedChallenge(challengeId: string, hintsUsed: number = 0): UserChallengeProgress {
    const starsEarned = hintsUsed === 0 ? 3 : hintsUsed === 1 ? 2 : 1;
    const progress: UserChallengeProgress = {
      challengeId,
      completedAt: new Date().toISOString(),
      attemptsCount: (this.progressMap[challengeId]?.attemptsCount || 0) + 1,
      hintsUsed,
      starsEarned
    };

    this.progressMap[challengeId] = progress;
    this.saveLocalProgress();
    return progress;
  }

  /**
   * Aggregate user thinking skills mastery and completion stats
   */
  public getStats(): RiddleBrainStats {
    const solvedIds = Object.keys(this.progressMap);
    const solvedChallenges = this.challenges.filter((c) => solvedIds.includes(c.id));

    const skillsMastery: Record<ThinkingSkill, number> = {
      REASONING: 0,
      OBSERVATION: 0,
      PATTERN_RECOGNITION: 0,
      LANGUAGE_SKILLS: 0,
      MEMORY: 0,
      SPATIAL_THINKING: 0,
      DEDUCTION: 0,
      PROBLEM_SOLVING: 0,
      CURIOSITY: 0
    };

    const completedByRepresentation: Record<RepresentationMode, number> = {
      COMMUNITY_TRADITION: 0,
      LANGUAGE_TRADITION: 0,
      NATURAL_FEATURE: 0,
      ENVIRONMENT: 0,
      CONTEMPORARY_CONTEXT: 0,
      ORIGINAL_PUZZLE: 0
    };

    solvedChallenges.forEach((ch) => {
      ch.skillsDeveloped.forEach((skill) => {
        skillsMastery[skill] = (skillsMastery[skill] || 0) + 1;
      });
      completedByRepresentation[ch.representationMode] =
        (completedByRepresentation[ch.representationMode] || 0) + 1;
    });

    return {
      totalSolved: solvedIds.length,
      skillsMastery,
      completedByRepresentation,
      solvedChallengeIds: solvedIds,
      currentStreak: solvedIds.length
    };
  }

  /**
   * Cultural Provenance Helper: Returns honest, unambiguous metadata descriptions
   */
  public getRepresentationMeta(mode: RepresentationMode): {
    badgeLabel: string;
    description: string;
    colorClass: string;
    isTraditional: boolean;
  } {
    switch (mode) {
      case 'COMMUNITY_TRADITION':
        return {
          badgeLabel: 'Community Tradition',
          description: 'Documented oral heritage preserved and passed down by indigenous communities.',
          colorClass: 'bg-amber-100 text-amber-900 border-amber-300',
          isTraditional: true
        };
      case 'LANGUAGE_TRADITION':
        return {
          badgeLabel: 'Language Tradition',
          description: 'Linguistic wordplay, tonal distinctions, and sound symbolism rooted in indigenous languages.',
          colorClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          isTraditional: true
        };
      case 'NATURAL_FEATURE':
        return {
          badgeLabel: 'Natural Feature',
          description: 'Educational reasoning challenge centered on African lakes, mountains, and waterfalls.',
          colorClass: 'bg-blue-100 text-blue-900 border-blue-300',
          isTraditional: false
        };
      case 'ENVIRONMENT':
        return {
          badgeLabel: 'African Environment',
          description: 'Observational and scientific deduction based on African ecosystems and natural adaptations.',
          colorClass: 'bg-teal-100 text-teal-900 border-teal-300',
          isTraditional: false
        };
      case 'CONTEMPORARY_CONTEXT':
        return {
          badgeLabel: 'Contemporary Context',
          description: 'Original logic puzzle grounded in everyday African life, modern trading, and community spaces.',
          colorClass: 'bg-orange-100 text-orange-900 border-orange-300',
          isTraditional: false
        };
      case 'ORIGINAL_PUZZLE':
      default:
        return {
          badgeLabel: 'Original Educational Puzzle',
          description: 'Newly created pedagogical problem inspired by African history, geometry, or architecture.',
          colorClass: 'bg-purple-100 text-purple-900 border-purple-300',
          isTraditional: false
        };
    }
  }

  public resetProgress(): void {
    this.progressMap = {};
    try {
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch {
      // safe ignore
    }
  }
}

export const riddleBrainService = new RiddleBrainService();
