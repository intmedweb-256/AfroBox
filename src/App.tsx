import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { LandscapeHUD } from './components/LandscapeHUD';
import { LandscapeQuickDock } from './components/LandscapeQuickDock';
import { QuestLandingLauncher } from './components/QuestLandingLauncher';
import { CompanionSidePanel } from './components/CompanionSidePanel';
import { AfroBoxHub } from './components/AfroBoxHub';
import { ExploreAfrica } from './components/ExploreAfrica';
import { StoryDiscovery } from './components/StoryDiscovery';
import { StoryReader } from './components/StoryReader';
import { RiddleChamber } from './components/RiddleChamber';
import { BrainChallenges } from './components/BrainChallenges';
import { RiddleBrainWorld } from './components/RiddleBrainWorld';
import { MyBox } from './components/MyBox';
import { StoryStudioModal } from './components/StoryStudioModal';
import { FamilyVoiceStudioModal } from './components/FamilyVoiceStudioModal';
import { Story } from './types/story';
import { AgeTier, PillarId } from './types/afrobox';
import { storageService } from './services/storageService';
import { afroboxStorage } from './services/afroboxStorage';
import { audioEngine } from './services/audioEngine';
import { storyService } from './services/storyService';
import { gamificationService } from './services/gamificationService';
import { SchoolModeProvider } from './context/SchoolModeContext';
import { BannerAd } from './components/BannerAd';
import { InterfaceTourModal } from './components/InterfaceTourModal';
import { DeploymentModal } from './components/DeploymentModal';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Brain,
  PackageOpen,
  ShieldCheck,
  Heart,
  Sparkles,
  Plus
} from 'lucide-react';

export default function App() {
  const [currentPillar, setCurrentPillar] = useState<PillarId | 'HOME' | 'LAUNCHER'>('LAUNCHER');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedExploreEntityId, setSelectedExploreEntityId] = useState<string | null>(null);
  const [ageTier, setAgeTier] = useState<AgeTier>('6-8');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isDeploymentOpen, setIsDeploymentOpen] = useState<boolean>(false);

  // Landscape companion side panel state
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  // Backend Stories State
  const [stories, setStories] = useState<Story[]>(storyService.getStoriesSync());
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [isFamilyStudioOpen, setIsFamilyStudioOpen] = useState<boolean>(false);

  // Sync state
  const [savedStoryIds, setSavedStoryIds] = useState<string[]>([]);
  const [completedStoryIds, setCompletedStoryIds] = useState<string[]>([]);
  const [totalDiscoveriesCount, setTotalDiscoveriesCount] = useState<number>(0);

  // Navigation intro tour state
  const [isTourOpen, setIsTourOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('afrobox_hide_tour') !== 'true';
    }
    return true;
  });

  const handleHideTourNextTime = () => {
    localStorage.setItem('afrobox_hide_tour', 'true');
    setIsTourOpen(false);
  };

  useEffect(() => {
    const boxState = afroboxStorage.getMyBoxState();
    setAgeTier(boxState.ageTier || '6-8');
    refreshProgress();

    // Subscribe to story updates & fetch from backend API
    const unsubscribe = storyService.subscribe((updatedStories) => {
      setStories(updatedStories);
    });
    storyService.fetchStories();

    return () => {
      unsubscribe();
    };
  }, []);

  const refreshProgress = () => {
    const progress = storageService.getProgress();
    setSavedStoryIds(progress.savedStoryIds || []);
    setCompletedStoryIds(progress.completedStoryIds || []);
    setTotalDiscoveriesCount(afroboxStorage.getTotalDiscoveriesCount());
  };

  const handleToggleVoice = () => {
    if (voiceEnabled) {
      audioEngine.stopSpeaking();
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
      audioEngine.speakText('AfroBox voice narrator enabled!');
    }
  };

  const handlePlayVoice = (text: string) => {
    if (voiceEnabled) {
      audioEngine.speakText(text);
    }
  };

  const handleChangeAgeTier = (tier: AgeTier) => {
    setAgeTier(tier);
    afroboxStorage.setAgeTier(tier);
    handlePlayVoice(`Switched to Ages ${tier} experience`);
  };

  const handleNavigatePillar = (pillar: PillarId | 'HOME' | 'LAUNCHER', contextId?: string) => {
    audioEngine.stopSpeaking();
    if (pillar !== 'STORYLANDS') {
      setSelectedStory(null);
    }
    if (contextId && pillar === 'EXPLORE') {
      setSelectedExploreEntityId(contextId);
    }
    setCurrentPillar(pillar);
    refreshProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchQuest = (
    targetPillar: PillarId,
    options: { ageTier: AgeTier; soundEnabled: boolean }
  ) => {
    handleChangeAgeTier(options.ageTier);
    handleNavigatePillar(targetPillar);
    gamificationService.triggerRewardEffect('discovery');
  };

  const handleSelectStory = (story: Story) => {
    audioEngine.stopSpeaking();
    setSelectedStory(story);
    setCurrentPillar('STORYLANDS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveStory = (storyId: string) => {
    storageService.toggleSaveStory(storyId);
    refreshProgress();
  };

  const handleCompleteStory = (storyId: string, region: string) => {
    storageService.markStoryCompleted(storyId, region);
    refreshProgress();
  };

  const handleQuickDiscoverEntity = (entityId: string) => {
    setSelectedExploreEntityId(entityId);
    handleNavigatePillar('EXPLORE', entityId);
  };

  const handleStoryAdded = (newStory: Story) => {
    setSelectedStory(newStory);
    setCurrentPillar('STORYLANDS');
    setIsStudioOpen(false);
    handlePlayVoice(`New African story "${newStory.title}" published!`);
  };

  const isScreenFitModule =
    currentPillar === 'EXPLORE' ||
    (currentPillar === 'STORYLANDS' && selectedStory !== null) ||
    currentPillar === 'LAUNCHER';

  return (
    <SchoolModeProvider>
      <div className="h-screen w-screen bg-[#FBF7EE] text-[#23211E] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#E25822]/20 selection:text-[#E25822] overflow-hidden">
        {/* Gamified Landscape Top HUD Bar with Status Meters & Controls */}
        <LandscapeHUD
          currentPillar={currentPillar}
          onSelectPillar={handleNavigatePillar}
          isSidePanelOpen={isSidePanelOpen}
          onToggleSidePanel={() => setIsSidePanelOpen(!isSidePanelOpen)}
          voiceEnabled={voiceEnabled}
          onToggleVoice={handleToggleVoice}
          ageTier={ageTier}
          onOpenTour={() => setIsTourOpen(true)}
          onOpenDeployment={() => setIsDeploymentOpen(true)}
        />

        {/* Master Landscape Stage Flex: Left Dock | Center Canvas | Right Companion Panel */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Quick Dock (Instant icon access to all modules, setup & voices) */}
          <LandscapeQuickDock
            currentPillar={currentPillar}
            onSelectPillar={handleNavigatePillar}
            onOpenFamilyStudio={() => setIsFamilyStudioOpen(true)}
            onOpenTour={() => setIsTourOpen(true)}
            onOpenDeployment={() => setIsDeploymentOpen(true)}
          />

          {/* Center Stage Viewport (Contained Zero-Scroll Canvas) */}
          <main className="flex-1 h-full overflow-y-auto relative flex flex-col pb-16 md:pb-0">
            {/* LAUNCHER: Option Selection Landing Page */}
            {currentPillar === 'LAUNCHER' && (
              <QuestLandingLauncher
                onLaunchQuest={handleLaunchQuest}
                currentAgeTier={ageTier}
                onChangeAgeTier={handleChangeAgeTier}
                voiceEnabled={voiceEnabled}
                onToggleVoice={handleToggleVoice}
                totalDiscoveriesCount={totalDiscoveriesCount}
              />
            )}

            {/* WORLD HUB: HOME */}
            {currentPillar === 'HOME' && (
              <AfroBoxHub
                onSelectPillar={handleNavigatePillar}
                ageTier={ageTier}
                totalDiscoveriesCount={totalDiscoveriesCount}
                onQuickDiscoverEntity={handleQuickDiscoverEntity}
                onPlayVoice={handlePlayVoice}
              />
            )}

            {/* PILLAR 1: EXPLORE AFRICA */}
            {currentPillar === 'EXPLORE' && (
              <ExploreAfrica
                onNavigatePillar={handleNavigatePillar}
                onPlayVoice={handlePlayVoice}
                ageTier={ageTier}
                initialSelectedEntityId={selectedExploreEntityId}
              />
            )}

            {/* PILLAR 2: STORYLANDS */}
            {currentPillar === 'STORYLANDS' &&
              (selectedStory ? (
                <StoryReader
                  story={selectedStory}
                  allStories={stories}
                  onBack={() => setSelectedStory(null)}
                  onSelectStory={handleSelectStory}
                  isSaved={savedStoryIds.includes(selectedStory.id)}
                  onToggleSave={handleToggleSaveStory}
                  onCompleteStory={handleCompleteStory}
                  isCompleted={completedStoryIds.includes(selectedStory.id)}
                  onNavigatePillar={handleNavigatePillar}
                />
              ) : (
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E6DCBF] pb-4 gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-extrabold text-[#C85A32] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>Pillar 2: Authentic Stories & Cultural Provenance</span>
                      </div>
                      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#23211E] font-['Urbanist'] mt-1">
                        Storylands
                      </h1>
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto">
                      <button
                        id="storylands-header-add-story-btn"
                        onClick={() => setIsStudioOpen(true)}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#A84320] text-white shadow-xs transition-colors touch-manipulation cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Story</span>
                      </button>

                      <button
                        onClick={() => handleNavigatePillar('EXPLORE')}
                        className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCBF] text-[#1D3E2F] hover:bg-[#F0E8D0] transition-colors"
                      >
                        <span>🌍 Explore Story Places</span>
                      </button>
                    </div>
                  </div>

                  <StoryDiscovery
                    stories={stories}
                    onSelectStory={handleSelectStory}
                    savedStoryIds={savedStoryIds}
                    onToggleSave={handleToggleSaveStory}
                    initialSubTab="DISCOVER"
                    onOpenStudio={() => setIsStudioOpen(true)}
                  />
                </div>
              ))}

            {/* PILLAR 3: RIDDLE & BRAIN WORLD (Traditional Riddles) */}
            {currentPillar === 'RIDDLE' && (
              <RiddleBrainWorld
                onNavigatePillar={handleNavigatePillar}
                onPlayVoice={handlePlayVoice}
                ageTier={ageTier}
                initialType="TRADITIONAL_RIDDLE"
              />
            )}

            {/* PILLAR 4: RIDDLE & BRAIN WORLD (Logic & Puzzles) */}
            {currentPillar === 'BRAIN' && (
              <RiddleBrainWorld
                onNavigatePillar={handleNavigatePillar}
                onPlayVoice={handlePlayVoice}
                ageTier={ageTier}
                initialType="LOGIC"
              />
            )}

            {/* EMOTIONAL CENTER: MY BOX */}
            {currentPillar === 'MY_BOX' && (
              <MyBox
                onNavigatePillar={handleNavigatePillar}
                onPlayVoice={handlePlayVoice}
                ageTier={ageTier}
              />
            )}
          </main>

          {/* Right Dynamic Companion Side Panel (Zero-scroll contextual info & tools) */}
          <CompanionSidePanel
            isOpen={isSidePanelOpen}
            onClose={() => setIsSidePanelOpen(false)}
            currentPillar={currentPillar}
            selectedStory={selectedStory}
            selectedEntityId={selectedExploreEntityId}
            onSelectStory={handleSelectStory}
            onNavigatePillar={handleNavigatePillar}
            onOpenFamilyStudio={() => setIsFamilyStudioOpen(true)}
          />
        </div>

        {/* Mobile Bottom Navigation Bar (Persistent on phone portrait) */}
        <nav
          id="mobile-persistent-nav"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF7EE]/95 backdrop-blur-md border-t border-[#E6DCBF] px-1.5 py-1.5 flex items-center justify-around shadow-lg"
        >
          <button
            onClick={() => handleNavigatePillar('LAUNCHER')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all touch-manipulation ${
              currentPillar === 'LAUNCHER'
                ? 'text-[#C85A32] font-extrabold'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>Setup</span>
          </button>

          <button
            onClick={() => handleNavigatePillar('HOME')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all touch-manipulation ${
              currentPillar === 'HOME'
                ? 'text-[#E25822] font-extrabold'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <span className="text-base leading-none">🛖</span>
            <span>Hub</span>
          </button>

          <button
            onClick={() => handleNavigatePillar('EXPLORE')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all touch-manipulation ${
              currentPillar === 'EXPLORE'
                ? 'text-[#1D3E2F] font-extrabold'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <span className="text-base leading-none">🌍</span>
            <span>Explore</span>
          </button>

          <button
            onClick={() => handleNavigatePillar('STORYLANDS')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all touch-manipulation ${
              currentPillar === 'STORYLANDS'
                ? 'text-[#C85A32] font-extrabold'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Stories</span>
          </button>

          <button
            onClick={() => handleNavigatePillar('RIDDLE')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all touch-manipulation ${
              currentPillar === 'RIDDLE' || currentPillar === 'BRAIN'
                ? 'text-[#E25822] font-extrabold'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <Brain className="w-5 h-5" />
            <span className="whitespace-nowrap">Riddle</span>
          </button>

          <button
            onClick={() => handleNavigatePillar('MY_BOX')}
            className={`flex flex-col items-center py-1 px-1.5 rounded-xl text-[10px] font-bold transition-all relative touch-manipulation ${
              currentPillar === 'MY_BOX'
                ? 'text-[#D9822B] font-extrabold'
                : 'text-[#7C4728] hover:text-[#23211E]'
            }`}
          >
            <PackageOpen className="w-5 h-5" />
            <span>My Box</span>
            {totalDiscoveriesCount > 0 && (
              <span className="absolute top-0 right-1 w-4 h-4 bg-[#E25822] text-white rounded-full text-[9px] font-extrabold flex items-center justify-center">
                {totalDiscoveriesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Story Studio: Add Stories to Backend */}
        <StoryStudioModal
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
          onStoryAdded={handleStoryAdded}
        />

        {/* Global Family Voice Studio */}
        {stories.length > 0 && (
          <FamilyVoiceStudioModal
            isOpen={isFamilyStudioOpen}
            onClose={() => setIsFamilyStudioOpen(false)}
            story={selectedStory || stories[0]}
            onCastUpdated={() => {
              gamificationService.triggerRewardEffect('voice');
            }}
          />
        )}

        {/* Non-intrusive Docked Bottom Banner (Hidden in School Mode) */}
        <BannerAd slot="bottom_dock" />

        {/* First-load Interface Tour Walkthrough */}
        <InterfaceTourModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onHideNextTime={handleHideTourNextTime}
        />

        {/* Launch Steps & Beta Testing Suite (Target: September 27th) */}
        <DeploymentModal
          isOpen={isDeploymentOpen}
          onClose={() => setIsDeploymentOpen(false)}
        />
      </div>
    </SchoolModeProvider>
  );
}
