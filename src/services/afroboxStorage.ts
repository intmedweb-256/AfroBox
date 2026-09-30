import { AgeTier, AfroBoxEntity, MyBoxDiscovery, MyBoxState } from '../types/afrobox';
import { storageService } from './storageService';

const MY_BOX_STORAGE_KEY = 'afrobox_master_mybox_v1';

const INITIAL_MY_BOX: MyBoxState = {
  ageTier: '6-8',
  discoveries: [
    {
      entityId: 'entity-lake-victoria',
      entityName: 'Lake Victoria',
      entityType: 'NATURAL_FEATURE',
      icon: '🌊',
      discoveredAt: new Date().toISOString(),
      region: 'East Africa',
      country: 'Uganda, Kenya, Tanzania'
    },
    {
      entityId: 'entity-baobab',
      entityName: 'The Great Baobab Tree',
      entityType: 'PLANT',
      icon: '🌳',
      discoveredAt: new Date().toISOString(),
      region: 'Southern Africa',
      country: 'Zimbabwe, Senegal, Kenya'
    }
  ],
  solvedRiddleIds: [],
  solvedBrainPuzzleIds: [],
  savedStoryIds: [],
  completedStoryIds: [],
  regionsVisited: ['East Africa', 'Southern Africa'],
  voiceRecordingsCount: 0,
  earnedStickers: ['sticker-welcome-explorer', 'sticker-baobab-seed']
};

export const afroboxStorage = {
  getMyBoxState(): MyBoxState {
    try {
      const data = localStorage.getItem(MY_BOX_STORAGE_KEY);
      if (!data) {
        this.saveMyBoxState(INITIAL_MY_BOX);
        return INITIAL_MY_BOX;
      }
      const parsed: MyBoxState = JSON.parse(data);
      // Sync with storageService
      const progress = storageService.getProgress();
      const recordings = storageService.getPrivateRecordings();
      parsed.savedStoryIds = progress.savedStoryIds || [];
      parsed.completedStoryIds = progress.completedStoryIds || [];
      parsed.voiceRecordingsCount = recordings.length;
      return parsed;
    } catch {
      return INITIAL_MY_BOX;
    }
  },

  saveMyBoxState(state: MyBoxState): void {
    try {
      localStorage.setItem(MY_BOX_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save MyBox state', e);
    }
  },

  setAgeTier(tier: AgeTier): void {
    const state = this.getMyBoxState();
    state.ageTier = tier;
    this.saveMyBoxState(state);
  },

  addDiscovery(entity: AfroBoxEntity): boolean {
    const state = this.getMyBoxState();
    const alreadyExists = state.discoveries.some((d) => d.entityId === entity.id);
    if (alreadyExists) return false;

    const newDiscovery: MyBoxDiscovery = {
      entityId: entity.id,
      entityName: entity.name,
      entityType: entity.type,
      icon: entity.icon || '✨',
      discoveredAt: new Date().toISOString(),
      region: entity.region,
      country: entity.country
    };

    state.discoveries.unshift(newDiscovery);

    // Auto-update visited region
    if (entity.region && !state.regionsVisited.includes(entity.region)) {
      state.regionsVisited.push(entity.region);
    }

    this.saveMyBoxState(state);
    return true;
  },

  recordSolvedRiddle(riddleId: string): void {
    const state = this.getMyBoxState();
    if (!state.solvedRiddleIds.includes(riddleId)) {
      state.solvedRiddleIds.push(riddleId);
      const stickerId = `sticker-riddle-${riddleId}`;
      if (!state.earnedStickers.includes(stickerId)) {
        state.earnedStickers.push(stickerId);
      }
      this.saveMyBoxState(state);
    }
  },

  recordSolvedBrainPuzzle(puzzleId: string): void {
    const state = this.getMyBoxState();
    if (!state.solvedBrainPuzzleIds.includes(puzzleId)) {
      state.solvedBrainPuzzleIds.push(puzzleId);
      const stickerId = `sticker-puzzle-${puzzleId}`;
      if (!state.earnedStickers.includes(stickerId)) {
        state.earnedStickers.push(stickerId);
      }
      this.saveMyBoxState(state);
    }
  },

  isEntityDiscovered(entityId: string): boolean {
    const state = this.getMyBoxState();
    return state.discoveries.some((d) => d.entityId === entityId);
  },

  getAllDiscoveries(): MyBoxDiscovery[] {
    return this.getMyBoxState().discoveries;
  },

  getTotalDiscoveriesCount(): number {
    const state = this.getMyBoxState();
    const progress = storageService.getProgress();
    return (
      state.discoveries.length +
      state.solvedRiddleIds.length +
      state.solvedBrainPuzzleIds.length +
      (progress.completedStoryIds?.length || 0) +
      (progress.discoveredWords?.length || 0)
    );
  }
};
