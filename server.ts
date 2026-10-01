import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { SAMPLE_STORIES } from './src/data/sampleStories';
import { Story } from './src/types/story';

async function startServer() {
  const app = express();
  
  // Parse port & host from CLI flags or env vars (default 3000 and 0.0.0.0)
  const args = process.argv.slice(2);
  let PORT = 3000;
  let HOST = '0.0.0.0';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
      PORT = parseInt(args[i + 1], 10);
    }
    if (args[i] === '--host' && args[i + 1]) {
      HOST = args[i + 1];
    }
  }

  if (process.env.PORT) {
    PORT = parseInt(process.env.PORT, 10);
  }

  // Middleware for parsing JSON bodies
  app.use(express.json({ limit: '10mb' }));

  // In-memory story store seeded with default sample stories
  let storiesStore: Story[] = [...SAMPLE_STORIES];

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'AfroBox Story Backend',
      storyCount: storiesStore.length,
      timestamp: new Date().toISOString()
    });
  });

  // GET /api/stories - Retrieve all stories with optional filtering
  app.get('/api/stories', (req, res) => {
    try {
      const { region, storyType, search } = req.query;
      let result = [...storiesStore];

      if (region && typeof region === 'string' && region !== 'ALL') {
        result = result.filter((s) => s.region.toLowerCase() === region.toLowerCase());
      }

      if (storyType && typeof storyType === 'string' && storyType !== 'ALL') {
        result = result.filter((s) => s.storyType === storyType);
      }

      if (search && typeof search === 'string' && search.trim()) {
        const q = search.toLowerCase();
        result = result.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.shortDescription.toLowerCase().includes(q) ||
            s.country.toLowerCase().includes(q) ||
            s.culturalTradition.toLowerCase().includes(q)
        );
      }

      res.json({
        success: true,
        count: result.length,
        stories: result
      });
    } catch (err) {
      console.error('Error fetching stories:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch stories' });
    }
  });

  // GET /api/stories/:id - Retrieve a single story
  app.get('/api/stories/:id', (req, res) => {
    try {
      const story = storiesStore.find((s) => s.id === req.params.id);
      if (!story) {
        return res.status(404).json({ success: false, message: 'Story not found' });
      }
      res.json({ success: true, story });
    } catch (err) {
      console.error('Error fetching story:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch story' });
    }
  });

  // POST /api/stories - Add a new story
  app.post('/api/stories', (req, res) => {
    try {
      const storyData = req.body;

      if (!storyData.title || !storyData.title.trim()) {
        return res.status(400).json({ success: false, message: 'Story title is required' });
      }

      if (!storyData.country || !storyData.country.trim()) {
        return res.status(400).json({ success: false, message: 'Story country of origin is required' });
      }

      // Generate unique ID if not supplied
      const slug = storyData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const uniqueId = storyData.id || `${slug}-${Date.now().toString().slice(-4)}`;

      // Construct verified Story object
      const newStory: Story = {
        id: uniqueId,
        title: storyData.title.trim(),
        shortDescription: storyData.shortDescription || 'An authentic African story for young minds.',
        country: storyData.country.trim(),
        region: storyData.region || 'West Africa',
        culturalTradition: storyData.culturalTradition || 'Community Oral Tradition',
        community: storyData.community || 'Regional Storytellers',
        languageOfOrigin: storyData.languageOfOrigin || 'English & Indigenous Mother Tongue',
        storyType: storyData.storyType || 'TRADITIONAL_FOLKTALE',
        themes: Array.isArray(storyData.themes) && storyData.themes.length > 0 ? storyData.themes : ['Wisdom & Cleverness', 'Community'],
        ageRange: storyData.ageRange || '6-9',
        difficulty: storyData.difficulty || 'EASY',
        estimatedReadingTime: Number(storyData.estimatedReadingTime) || 5,
        learningObjectives: Array.isArray(storyData.learningObjectives) ? storyData.learningObjectives : ['Reflect on cultural values and storytelling lessons'],
        source: storyData.source || 'Oral storytelling tradition documented for education',
        sourceType: storyData.sourceType || 'Community Storyteller',
        sourceAuthorOrCollector: storyData.sourceAuthorOrCollector || 'AfroBox Cultural Education Initiative',
        originalStoryteller: storyData.originalStoryteller || 'Elders and community storytellers',
        rightsStatus: storyData.rightsStatus || 'TRADITIONAL_SOURCE_ADAPTATION',
        adaptationStatus: storyData.adaptationStatus || 'Child-Friendly Educational Retelling',
        verificationStatus: storyData.verificationStatus || 'VERIFIED',
        variantNotes: storyData.variantNotes || 'Traditional stories have regional variations told across generations.',
        illustration: {
          url: storyData.illustration?.url || '',
          alt: storyData.illustration?.alt || `${storyData.title} illustration`,
          caption: storyData.illustration?.caption || `${storyData.title} • Hand-drawn storybook illustration`,
          artistOrCredit: storyData.illustration?.artistOrCredit || 'AfroBox Story Studio Drawing',
          drawingStyle: storyData.illustration?.drawingStyle || 'BAOBAB_SUNSET'
        },
        narrations: Array.isArray(storyData.narrations) ? storyData.narrations : [],
        relatedContent: Array.isArray(storyData.relatedContent) ? storyData.relatedContent : [],
        dateAdded: new Date().toISOString(),
        publicationStatus: 'PUBLISHED',
        paragraphs: Array.isArray(storyData.paragraphs) && storyData.paragraphs.length > 0
          ? storyData.paragraphs
          : [
              {
                id: 'p1',
                paragraphNumber: 1,
                text: storyData.content || storyData.shortDescription || 'Once upon a time in a vibrant village...'
              }
            ],
        vocabulary: Array.isArray(storyData.vocabulary) ? storyData.vocabulary : [],
        thinkAboutIt: storyData.thinkAboutIt || {
          question: 'What important lesson did you discover in this story?',
          prompt: 'Share what you would do if you were in the main character’s shoes.',
          guidingPoints: ['Think about how kindness and cleverness work together.'],
          conversationStarterForParents: 'Ask your child what surprised them most about this tale.'
        },
        characterNames: Array.isArray(storyData.characterNames) ? storyData.characterNames : [],
        format: 'ILLUSTRATED'
      };

      // Prepend to top of stories
      storiesStore = [newStory, ...storiesStore.filter((s) => s.id !== newStory.id)];

      res.status(201).json({
        success: true,
        message: 'Story added successfully to AfroBox backend',
        story: newStory
      });
    } catch (err) {
      console.error('Error adding story:', err);
      res.status(500).json({ success: false, message: 'Failed to add story' });
    }
  });

  // PUT /api/stories/:id - Update an existing story
  app.put('/api/stories/:id', (req, res) => {
    try {
      const idx = storiesStore.findIndex((s) => s.id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Story not found' });
      }

      storiesStore[idx] = {
        ...storiesStore[idx],
        ...req.body,
        id: req.params.id // Prevent overriding ID
      };

      res.json({
        success: true,
        message: 'Story updated successfully',
        story: storiesStore[idx]
      });
    } catch (err) {
      console.error('Error updating story:', err);
      res.status(500).json({ success: false, message: 'Failed to update story' });
    }
  });

  // DELETE /api/stories/:id - Delete a story
  app.delete('/api/stories/:id', (req, res) => {
    try {
      const initialLength = storiesStore.length;
      storiesStore = storiesStore.filter((s) => s.id !== req.params.id);

      if (storiesStore.length === initialLength) {
        return res.status(404).json({ success: false, message: 'Story not found' });
      }

      res.json({
        success: true,
        message: 'Story deleted from backend',
        remainingCount: storiesStore.length
      });
    } catch (err) {
      console.error('Error deleting story:', err);
      res.status(500).json({ success: false, message: 'Failed to delete story' });
    }
  });

  // POST /api/stories/reset - Reset stories to defaults
  app.post('/api/stories/reset', (req, res) => {
    storiesStore = [...SAMPLE_STORIES];
    res.json({
      success: true,
      message: 'Stories reset to default library',
      count: storiesStore.length
    });
  });

  // POST /api/tts - High-fidelity Natural Griot / African Storyteller Text-To-Speech
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, voiceName = 'Kore', style } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text is required' });
      }

      const trimmedText = text.slice(0, 1600);
      const ai = new GoogleGenAI({});

      const storytellingStyle =
        style ||
        'Warm, engaging, natural African oral storyteller with gentle rhythm, natural cadence, and expressive pacing for young listeners';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: trimmedText,
                speechMetadata: {
                  style: storytellingStyle
                }
              }
            ]
          }
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' }
            }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(500).json({ error: 'No audio returned from speech model' });
      }

      res.json({
        success: true,
        audioUrl: `data:audio/wav;base64,${base64Audio}`,
        voiceName,
        source: 'gemini-tts'
      });
    } catch (err: any) {
      console.error('TTS endpoint error:', err);
      res.status(500).json({ error: err?.message || 'Failed to synthesize speech audio' });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : undefined,
        watch: isHmrDisabled ? null : undefined
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`AfroBox Server running on http://${HOST}:${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
