import { Story } from '../types/story';
import { SAMPLE_STORIES } from '../data/sampleStories';

const STORAGE_KEY = 'afrobox_stories_cache';
type StorySubscriber = (stories: Story[]) => void;

class StoryService {
  private stories: Story[] = [];
  private subscribers: StorySubscriber[] = [];
  private initialized: boolean = false;

  constructor() {
    this.loadInitialCache();
  }

  private loadInitialCache() {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed: Story[] = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge missing sample stories so newly added traditions (e.g. Uganda spotlight) are always included
          const existingIds = new Set(parsed.map((s) => s.id));
          const missing = SAMPLE_STORIES.filter((s) => !existingIds.has(s.id));
          this.stories = [...missing, ...parsed];
          this.saveCache();
          return;
        }
      }
    } catch {
      // ignore
    }
    this.stories = [...SAMPLE_STORIES];
  }

  private saveCache() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.stories));
    } catch {
      // ignore
    }
    this.notifySubscribers();
  }

  public subscribe(callback: StorySubscriber): () => void {
    this.subscribers.push(callback);
    callback(this.stories);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach((s) => s(this.stories));
  }

  public async fetchStories(): Promise<Story[]> {
    try {
      const response = await fetch('/api/stories');
      if (response.ok) {
        const data = await response.json();
        if (data && data.success && Array.isArray(data.stories)) {
          this.stories = data.stories;
          this.saveCache();
          this.initialized = true;
          return this.stories;
        } else if (Array.isArray(data)) {
          this.stories = data;
          this.saveCache();
          this.initialized = true;
          return this.stories;
        }
      }
    } catch (err) {
      console.warn('Backend /api/stories fetch fallback to local:', err);
    }

    // Return cached or sample stories
    if (this.stories.length === 0) {
      this.stories = [...SAMPLE_STORIES];
    }
    this.initialized = true;
    return this.stories;
  }

  public getStoriesSync(): Story[] {
    return this.stories.length > 0 ? this.stories : SAMPLE_STORIES;
  }

  public getStoryById(id: string): Story | undefined {
    return this.stories.find((s) => s.id === id) || SAMPLE_STORIES.find((s) => s.id === id);
  }

  public async addStory(newStoryData: Partial<Story>): Promise<Story> {
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStoryData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.story) {
          this.stories = [result.story, ...this.stories.filter((s) => s.id !== result.story.id)];
          this.saveCache();
          return result.story;
        }
      }
    } catch (err) {
      console.warn('Backend POST /api/stories failed, saving locally:', err);
    }

    // Fallback: save locally
    const slug = (newStoryData.title || 'untitled')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const id = newStoryData.id || `${slug}-${Date.now().toString().slice(-4)}`;

    const fallbackStory: Story = {
      id,
      title: newStoryData.title || 'Untitled Story',
      shortDescription: newStoryData.shortDescription || 'An authentic African story.',
      country: newStoryData.country || 'Nigeria',
      region: newStoryData.region || 'West Africa',
      culturalTradition: newStoryData.culturalTradition || 'Community Oral Tradition',
      community: newStoryData.community || 'Regional Storytellers',
      languageOfOrigin: newStoryData.languageOfOrigin || 'English',
      storyType: newStoryData.storyType || 'TRADITIONAL_FOLKTALE',
      themes: newStoryData.themes || ['Wisdom & Cleverness', 'Community'],
      ageRange: newStoryData.ageRange || '6-9',
      difficulty: newStoryData.difficulty || 'EASY',
      estimatedReadingTime: newStoryData.estimatedReadingTime || 5,
      learningObjectives: newStoryData.learningObjectives || ['Reflect on cultural values'],
      source: newStoryData.source || 'Oral storytelling tradition',
      sourceType: newStoryData.sourceType || 'Community Storyteller',
      sourceAuthorOrCollector: newStoryData.sourceAuthorOrCollector || 'AfroBox Story Studio',
      originalStoryteller: newStoryData.originalStoryteller || 'Elders and community storytellers',
      rightsStatus: newStoryData.rightsStatus || 'TRADITIONAL_SOURCE_ADAPTATION',
      adaptationStatus: 'Child-Friendly Educational Retelling',
      verificationStatus: newStoryData.verificationStatus || 'VERIFIED',
      variantNotes: newStoryData.variantNotes || 'Traditional stories have regional variations.',
      illustration: {
        url: '',
        alt: `${newStoryData.title} illustration`,
        caption: newStoryData.illustration?.caption || `${newStoryData.title} • Hand-drawn storybook illustration`,
        artistOrCredit: newStoryData.illustration?.artistOrCredit || 'AfroBox Story Studio Drawing',
        drawingStyle: newStoryData.illustration?.drawingStyle || 'BAOBAB_SUNSET'
      },
      narrations: newStoryData.narrations || [],
      relatedContent: newStoryData.relatedContent || [],
      dateAdded: new Date().toISOString(),
      publicationStatus: 'PUBLISHED',
      paragraphs: newStoryData.paragraphs || [
        {
          id: 'p1',
          paragraphNumber: 1,
          text: newStoryData.shortDescription || 'Once upon a time...'
        }
      ],
      vocabulary: newStoryData.vocabulary || [],
      thinkAboutIt: newStoryData.thinkAboutIt || {
        question: 'What did this story teach you?',
        prompt: 'Reflect on how the characters treated one another.',
        guidingPoints: ['Consider how words have power.'],
        conversationStarterForParents: 'Ask what moral lesson stood out.'
      },
      characterNames: newStoryData.characterNames || [],
      format: 'ILLUSTRATED'
    };

    this.stories = [fallbackStory, ...this.stories.filter((s) => s.id !== fallbackStory.id)];
    this.saveCache();
    return fallbackStory;
  }

  public async deleteStory(id: string): Promise<boolean> {
    try {
      await fetch(`/api/stories/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    this.stories = this.stories.filter((s) => s.id !== id);
    this.saveCache();
    return true;
  }

  public exportStoriesJson(): string {
    return JSON.stringify(this.getStoriesSync(), null, 2);
  }

  public getBlankStoryTemplate(): Partial<Story> {
    return {
      title: 'Title of African Story',
      shortDescription: 'A brief 1-2 sentence kid-friendly adventure overview',
      country: 'Uganda',
      region: 'East Africa',
      culturalTradition: 'e.g. Bachwezi / Buganda / Lango / Bamasaba',
      community: 'e.g. Crater Lakes / Mount Elgon / Lake Kyoga',
      languageOfOrigin: 'e.g. Luganda / Leb Lango / Lumasaaba / Runyoro',
      storyType: 'TRADITIONAL_FOLKTALE',
      ageRange: '6-9',
      difficulty: 'EASY',
      estimatedReadingTime: 5,
      themes: ['Wisdom & Cleverness', 'Community & Family', 'Courage'],
      paragraphs: [
        {
          id: 'p1',
          paragraphNumber: 1,
          text: 'Long ago in the green hills of Uganda, the elders gathered the children beneath the sacred tree...'
        },
        {
          id: 'p2',
          paragraphNumber: 2,
          text: 'The storyteller sounded the drum, and everyone listened with open hearts...'
        }
      ],
      vocabulary: [
        {
          word: 'Mirembe',
          language: 'Luganda',
          phonetic: 'Mee-rehm-beh',
          definition: 'Peace and harmony within the family and community.'
        }
      ],
      source: 'Documented oral tradition',
      sourceType: 'Oral Tradition Adaptation',
      sourceAuthorOrCollector: 'Community Storyteller & Elder',
      originalStoryteller: 'Village knowledge keeper',
      rightsStatus: 'TRADITIONAL_SOURCE_ADAPTATION',
      verificationStatus: 'VERIFIED',
      variantNotes: 'Traditional African stories have living variations passed down through generations.',
      characterNames: ['Hero', 'Wise Elder'],
      format: 'READ_ALONG'
    };
  }

  public async importStories(newStories: Story[]): Promise<number> {
    let addedCount = 0;
    for (const story of newStories) {
      if (story && story.title && story.country) {
        await this.addStory(story);
        addedCount++;
      }
    }
    return addedCount;
  }
}

export const storyService = new StoryService();
