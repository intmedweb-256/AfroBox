import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Users,
  Check,
  CheckCircle2,
  Volume2,
  Plus,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Headphones,
  Award,
  Upload,
  Link as LinkIcon,
  Globe
} from 'lucide-react';
import { Story, FamilyVoiceProfile, FamilyRole, StoryFamilyVoiceCast, SceneVoiceRecording } from '../types/story';
import { storageService } from '../services/storageService';
import { audioEngine } from '../services/audioEngine';

interface FamilyVoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story;
  onCastUpdated: (cast: StoryFamilyVoiceCast | null) => void;
}

export const FamilyVoiceStudioModal: React.FC<FamilyVoiceStudioModalProps> = ({
  isOpen,
  onClose,
  story,
  onCastUpdated
}) => {
  const [profiles, setProfiles] = useState<FamilyVoiceProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('profile_dad');
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);

  const [familyCast, setFamilyCast] = useState<StoryFamilyVoiceCast | null>(null);

  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const timerRef = useRef<any>(null);

  // Playback Preview State
  const [previewPlayingScene, setPreviewPlayingScene] = useState<number | null>(null);

  // Add Member State
  const [isAddingMember, setIsAddingMember] = useState<boolean>(false);
  const [newMemberName, setNewMemberName] = useState<string>('');
  const [newMemberRole, setNewMemberRole] = useState<FamilyRole>('CUSTOM');
  const [newMemberLabel, setNewMemberLabel] = useState<string>('');
  const [newMemberEmoji, setNewMemberEmoji] = useState<string>('🎙️');

  // File Upload & Remote URL State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showRemoteUrlInput, setShowRemoteUrlInput] = useState<boolean>(false);
  const [remoteAudioUrl, setRemoteAudioUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
    return () => {
      audioEngine.stopAudioUrl();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, story.id]);

  const loadData = () => {
    const loadedProfiles = storageService.getFamilyProfiles();
    setProfiles(loadedProfiles);
    if (loadedProfiles.length > 0 && !selectedProfileId) {
      setSelectedProfileId(loadedProfiles[0].id);
    }
    const cast = storageService.getStoryFamilyCast(story.id);
    setFamilyCast(cast);
  };

  if (!isOpen) return null;

  const currentParagraph = story.paragraphs[currentSceneIndex] || story.paragraphs[0];
  const currentSceneRecording = familyCast?.sceneRecordings[currentSceneIndex];
  const activeProfile = profiles.find((p) => p.id === selectedProfileId) || profiles[0];

  // Start Recording Active Scene
  const handleStartRecord = async () => {
    try {
      setRecordingError(null);
      audioEngine.stopAudioUrl();
      audioEngine.stopSpeaking();
      setPreviewPlayingScene(null);

      await audioEngine.startRecording();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      setRecordingError(err?.message || 'Microphone access is required to record your family voice.');
    }
  };

  // Stop Recording & Save
  const handleStopRecord = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);

    try {
      const result = await audioEngine.stopRecording();
      const newRec: SceneVoiceRecording = {
        paragraphIndex: currentSceneIndex,
        performerProfileId: activeProfile.id,
        performerName: activeProfile.name,
        roleLabel: activeProfile.relationshipLabel || activeProfile.role,
        audioDataUrl: result.dataUrl,
        durationSeconds: result.durationSeconds,
        recordedAt: new Date().toISOString()
      };

      const updatedCast = storageService.saveSceneRecording(story.id, currentSceneIndex, newRec, true);
      setFamilyCast({ ...updatedCast });
      onCastUpdated(updatedCast);
    } catch (err: any) {
      setRecordingError(err?.message || 'Failed to complete voice recording.');
    }
  };

  // Upload Local Audio File (MP3, WAV, M4A, WebM)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|m4a|webm|ogg|aac)$/i)) {
      setRecordingError('Please select a valid audio file (MP3, WAV, M4A, WebM).');
      return;
    }

    // Limit to 15MB
    if (file.size > 15 * 1024 * 1024) {
      setRecordingError('Audio file is too large. Please upload an audio clip under 15MB.');
      return;
    }

    setRecordingError(null);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const audioDataUrl = uploadEvent.target?.result as string;
      if (!audioDataUrl) return;

      // Estimate audio duration
      const tempAudio = new Audio();
      tempAudio.src = audioDataUrl;
      tempAudio.onloadedmetadata = () => {
        const durationSeconds = Math.max(1, Math.round(tempAudio.duration || 10));
        const newRec: SceneVoiceRecording = {
          paragraphIndex: currentSceneIndex,
          performerProfileId: activeProfile.id,
          performerName: `${activeProfile.name} (${file.name.replace(/\.[^/.]+$/, '')})`,
          roleLabel: 'Uploaded Audio Clip',
          audioDataUrl,
          durationSeconds,
          recordedAt: new Date().toISOString()
        };

        const updatedCast = storageService.saveSceneRecording(story.id, currentSceneIndex, newRec, true);
        setFamilyCast({ ...updatedCast });
        onCastUpdated(updatedCast);
      };
    };

    reader.onerror = () => {
      setRecordingError('Failed to read the selected audio file.');
    };

    reader.readAsDataURL(file);
    // Reset file input so user can pick the same file again if desired
    e.target.value = '';
  };

  // Attach Remote Audio URL
  const handleSaveRemoteAudioUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remoteAudioUrl.trim()) return;

    const trimmedUrl = remoteAudioUrl.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://') && !trimmedUrl.startsWith('/')) {
      setRecordingError('Please enter a valid remote audio URL starting with https:// or /');
      return;
    }

    setRecordingError(null);
    const newRec: SceneVoiceRecording = {
      paragraphIndex: currentSceneIndex,
      performerProfileId: activeProfile.id,
      performerName: `${activeProfile.name} (Remote Stream)`,
      roleLabel: 'Remote Audio Stream',
      audioDataUrl: trimmedUrl,
      durationSeconds: 30, // approximate stream placeholder
      recordedAt: new Date().toISOString()
    };

    const updatedCast = storageService.saveSceneRecording(story.id, currentSceneIndex, newRec, true);
    setFamilyCast({ ...updatedCast });
    onCastUpdated(updatedCast);
    setShowRemoteUrlInput(false);
    setRemoteAudioUrl('');
  };

  // Delete Scene Recording
  const handleDeleteSceneRecording = (sceneIdx: number) => {
    audioEngine.stopAudioUrl();
    setPreviewPlayingScene(null);
    const updated = storageService.deleteSceneRecording(story.id, sceneIdx);
    setFamilyCast(updated ? { ...updated } : null);
    onCastUpdated(updated);
  };

  // Preview Audio
  const handleTogglePreview = (sceneIdx: number, dataUrl: string) => {
    if (previewPlayingScene === sceneIdx) {
      audioEngine.stopAudioUrl();
      setPreviewPlayingScene(null);
      return;
    }

    setPreviewPlayingScene(sceneIdx);
    audioEngine.playAudioUrl(
      dataUrl,
      () => setPreviewPlayingScene(null),
      () => setPreviewPlayingScene(null)
    );
  };

  // Toggle Family Cast as default narrator for story
  const handleToggleDefault = (val: boolean) => {
    storageService.toggleStoryDefaultNarrator(story.id, val);
    if (familyCast) {
      const updated = { ...familyCast, isDefaultNarrator: val };
      setFamilyCast(updated);
      onCastUpdated(updated);
    }
  };

  // Add Family Member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newProfile: FamilyVoiceProfile = {
      id: `fam_${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole,
      relationshipLabel: newMemberLabel.trim() || `${newMemberName}'s Voice`,
      avatarEmoji: newMemberEmoji,
      avatarColor: '#1D3E2F',
      createdAt: new Date().toISOString()
    };

    const updated = storageService.saveFamilyProfile(newProfile);
    setProfiles(updated);
    setSelectedProfileId(newProfile.id);
    setIsAddingMember(false);
    setNewMemberName('');
    setNewMemberLabel('');
  };

  const totalRecordedScenes = familyCast
    ? Object.keys(familyCast.sceneRecordings).length
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 sm:p-5 bg-white border-b border-[#E6DCBF] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#C85A32] shadow-2xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-[#23211E] font-['Urbanist'] leading-tight">
                  Family Voice Studio & Narrator Cast
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold uppercase">
                  Private & Local
                </span>
              </div>
              <p className="text-xs text-[#7C4728] font-medium">
                Record yourself as the narrator, and assign your son & wife to voice characters!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#F0E8D0] text-[#7C4728] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content Body: Two Column Studio */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Family Voice Actors & Story Cast Settings (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Cast Member Selector */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6DCBF] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#23211E] tracking-wider">
                  1. Choose Speaker
                </span>
                <button
                  onClick={() => setIsAddingMember(true)}
                  className="text-xs font-extrabold text-[#C85A32] hover:text-[#b04a25] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Person</span>
                </button>
              </div>

              {/* Profiles List */}
              <div className="space-y-2">
                {profiles.map((p) => {
                  const isSelected = p.id === selectedProfileId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProfileId(p.id)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#1D3E2F] text-white border-[#1D3E2F] shadow-2xs'
                          : 'bg-[#FBF7EE] hover:bg-[#F0E8D0] text-[#23211E] border-[#E6DCBF]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="text-xl shrink-0">{p.avatarEmoji}</span>
                        <div className="overflow-hidden">
                          <div className="font-black text-xs sm:text-sm truncate">
                            {p.name}
                          </div>
                          <div
                            className={`text-[11px] truncate ${
                              isSelected ? 'text-emerald-200' : 'text-[#7C4728]'
                            }`}
                          >
                            {p.relationshipLabel}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Add Member Form Drawer */}
              {isAddingMember && (
                <form
                  onSubmit={handleAddMember}
                  className="pt-3 border-t border-[#E6DCBF] space-y-2.5 animate-in fade-in"
                >
                  <div className="text-xs font-extrabold text-[#23211E]">Add Family Voice Actor</div>
                  <input
                    type="text"
                    placeholder="Name (e.g. Grandma, Daughter, Leo)"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E6DCBF] bg-white text-[#23211E]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. Wise Elder, Leopard)"
                    value={newMemberLabel}
                    onChange={(e) => setNewMemberLabel(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E6DCBF] bg-white text-[#23211E]"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={newMemberEmoji}
                      onChange={(e) => setNewMemberEmoji(e.target.value)}
                      className="text-xs p-2 rounded-xl border border-[#E6DCBF] bg-white text-[#23211E]"
                    >
                      <option value="🎙️">🎙️ Mic</option>
                      <option value="👨🏾">👨🏾 Dad</option>
                      <option value="👩🏾">👩🏾 Mom / Wife</option>
                      <option value="👦🏾">👦🏾 Son</option>
                      <option value="👧🏾">👧🏾 Daughter</option>
                      <option value="👵🏾">👵🏾 Elder</option>
                      <option value="🦁">🦁 Lion</option>
                      <option value="🕷️">🕷️ Anansi</option>
                    </select>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#C85A32] text-white text-xs font-extrabold shadow-2xs hover:bg-[#b04a25]"
                    >
                      Save Voice Actor
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingMember(false)}
                      className="py-2 px-2.5 rounded-xl bg-stone-200 text-xs font-bold text-[#23211E]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Narrator Override Master Switch */}
            <div className="bg-white rounded-2xl p-4 border border-[#E6DCBF] space-y-3 shadow-2xs">
              <div className="text-xs font-black uppercase text-[#23211E] tracking-wider">
                2. Story Playback Option
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={familyCast?.isDefaultNarrator || false}
                  onChange={(e) => handleToggleDefault(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#1D3E2F] focus:ring-[#1D3E2F] accent-[#1D3E2F]"
                />
                <div>
                  <div className="text-xs font-extrabold text-[#23211E]">
                    Use Our Family Voices as Default Narrator
                  </div>
                  <div className="text-[11px] text-[#7C4728] leading-tight">
                    When checked, clicking "Read Scene Aloud" in the reader plays your family's voices instead of synthetic speech!
                  </div>
                </div>
              </label>

              {/* Progress pill */}
              <div className="pt-2 border-t border-[#E6DCBF] flex items-center justify-between text-xs">
                <span className="font-bold text-[#7C4728]">Scenes Recorded:</span>
                <span className="font-black text-[#C85A32] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {totalRecordedScenes} / {story.paragraphs.length} scenes
                </span>
              </div>
            </div>

            {/* Privacy Declaration Note */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="flex items-center gap-1.5 font-extrabold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% Family Privacy Protected</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                All voice clips of you, your wife, and your son stay strictly on your device. They are never uploaded or shared to cloud servers.
              </p>
            </div>
          </div>

          {/* Right Column: Scene Recording Console (8 cols) */}
          <div className="lg:col-span-8 space-y-4 flex flex-col">
            {/* Scene Selector Strip */}
            <div className="bg-white rounded-2xl p-3 border border-[#E6DCBF] flex items-center justify-between gap-2 overflow-x-auto shadow-2xs shrink-0">
              <span className="text-xs font-black uppercase text-[#23211E] shrink-0 pl-1">
                Select Scene:
              </span>
              <div className="flex items-center gap-1.5">
                {story.paragraphs.map((_, idx) => {
                  const hasRec = familyCast?.sceneRecordings[idx];
                  const isCurrent = idx === currentSceneIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        audioEngine.stopAudioUrl();
                        setPreviewPlayingScene(null);
                        setCurrentSceneIndex(idx);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all ${
                        isCurrent
                          ? 'bg-[#C85A32] text-white shadow-2xs scale-105'
                          : hasRec
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-[#FBF7EE] text-[#7C4728] hover:bg-[#F0E8D0] border border-[#E6DCBF]'
                      }`}
                    >
                      <span>Scene {idx + 1}</span>
                      {hasRec && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Stage: Active Scene & Teleprompter Text */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E6DCBF] shadow-xs space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DCBF]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C85A32]">
                      Scene {currentSceneIndex + 1} of {story.paragraphs.length}
                    </span>
                    <span className="text-xs font-extrabold text-[#23211E]">
                      • {currentParagraph.heading || `Part ${currentSceneIndex + 1}`}
                    </span>
                  </div>

                  {/* Active Speaker Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FBF7EE] border border-[#E6DCBF] text-xs font-extrabold text-[#23211E]">
                    <span>{activeProfile.avatarEmoji}</span>
                    <span>Recording as: {activeProfile.name}</span>
                  </div>
                </div>

                {/* Teleprompter Script */}
                <div className="py-4">
                  <div className="text-[11px] font-bold text-[#7C4728] uppercase mb-1">
                    Read aloud script:
                  </div>
                  <p className="text-base sm:text-xl font-medium text-[#23211E] font-['Plus_Jakarta_Sans'] leading-relaxed bg-[#FBF7EE] p-4 rounded-2xl border border-[#E6DCBF]">
                    "{currentParagraph.text}"
                  </p>
                </div>
              </div>

              {/* Recording & Playback Controls for this Scene */}
              <div className="bg-[#FBF7EE] p-4 rounded-2xl border border-[#E6DCBF] space-y-3">
                {recordingError && (
                  <div className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    {recordingError}
                  </div>
                )}

                {/* Recorded State vs Not Yet Recorded */}
                {currentSceneRecording ? (
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-emerald-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                          <span>Recorded by {currentSceneRecording.performerName}</span>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                            {currentSceneRecording.roleLabel}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500">
                          ⏱️ {currentSceneRecording.durationSeconds}s duration
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleTogglePreview(currentSceneIndex, currentSceneRecording.audioDataUrl)
                        }
                        className="py-1.5 px-3 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-2xs active:scale-95"
                      >
                        {previewPlayingScene === currentSceneIndex ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-white" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Listen to Voice</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleStartRecord}
                        className="py-1.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C85A32] border border-amber-300 text-xs font-bold flex items-center gap-1"
                        title="Re-record this scene"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-record</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSceneRecording(currentSceneIndex)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete recording"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs text-[#7C4728] font-bold">
                    This scene has not been recorded yet. Click below when ready!
                  </div>
                )}

                {/* Big Mic Recording Button & Audio Upload / Stream Bar */}
                <div className="flex flex-col items-center justify-center gap-2.5 pt-1">
                  {isRecording ? (
                    <button
                      onClick={handleStopRecord}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-3 shadow-md animate-pulse active:scale-95 transition-all"
                    >
                      <div className="w-3 h-3 rounded-full bg-white animate-ping" />
                      <span>Finish & Save Recording ({recordingSeconds}s)</span>
                    </button>
                  ) : (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        onClick={handleStartRecord}
                        className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#C85A32] to-[#D9822B] hover:brightness-105 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all flex-1"
                      >
                        <Mic className="w-4 h-4" />
                        <span>
                          Record Scene {currentSceneIndex + 1} with {activeProfile.name}'s Voice
                        </span>
                      </button>

                      {/* Upload Pre-recorded Audio File */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto px-3.5 py-3 rounded-2xl bg-white hover:bg-[#FBF7EE] text-[#1D3E2F] border-2 border-[#1D3E2F]/30 hover:border-[#1D3E2F] font-black text-xs flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-all"
                        title="Upload pre-recorded audio file (MP3, WAV, M4A)"
                      >
                        <Upload className="w-4 h-4 text-[#1D3E2F]" />
                        <span>Upload Audio File</span>
                      </button>

                      {/* Remote Audio Stream URL Button */}
                      <button
                        onClick={() => setShowRemoteUrlInput(!showRemoteUrlInput)}
                        className="w-full sm:w-auto px-3 py-3 rounded-2xl bg-[#F0E8D0] hover:bg-[#E6DCBF] text-[#7C4728] font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                        title="Attach remote audio URL or CDN stream"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Remote URL</span>
                      </button>
                    </div>
                  )}

                  {/* Hidden File Input for Audio Files */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg,.aac"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  {/* Remote URL Input Drawer */}
                  {showRemoteUrlInput && (
                    <form
                      onSubmit={handleSaveRemoteAudioUrl}
                      className="w-full mt-2 p-3 bg-white rounded-2xl border border-amber-300 shadow-2xs space-y-2 animate-in fade-in"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-[#C85A32] tracking-wider flex items-center gap-1">
                          <LinkIcon className="w-3.5 h-3.5" />
                          <span>Attach Remote Audio URL for Scene {currentSceneIndex + 1}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowRemoteUrlInput(false)}
                          className="text-stone-400 hover:text-stone-600 text-xs font-bold"
                        >
                          ✕ Cancel
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://cdn.example.com/audio/scene-1.mp3"
                          value={remoteAudioUrl}
                          onChange={(e) => setRemoteAudioUrl(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E6DCBF] bg-[#FBF7EE] focus:outline-hidden focus:ring-2 focus:ring-[#1D3E2F]"
                          required
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-black rounded-xl shadow-2xs"
                        >
                          Save URL
                        </button>
                      </div>
                      <p className="text-[10px] text-[#7C4728]">
                        Supports direct HTTPS audio files or Cloud CDN links (S3, Cloudflare R2, Firebase Storage, Supabase).
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* Bottom Stepper */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    audioEngine.stopAudioUrl();
                    setPreviewPlayingScene(null);
                    setCurrentSceneIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={currentSceneIndex === 0}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#E6DCBF] font-extrabold text-xs text-[#23211E] disabled:opacity-40 hover:bg-[#F0E8D0]"
                >
                  ← Previous Scene
                </button>

                <div className="text-xs font-bold text-[#7C4728]">
                  Scene {currentSceneIndex + 1} of {story.paragraphs.length}
                </div>

                <button
                  onClick={() => {
                    audioEngine.stopAudioUrl();
                    setPreviewPlayingScene(null);
                    setCurrentSceneIndex((prev) =>
                      Math.min(story.paragraphs.length - 1, prev + 1)
                    );
                  }}
                  disabled={currentSceneIndex === story.paragraphs.length - 1}
                  className="px-3.5 py-2 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white font-extrabold text-xs disabled:opacity-40 shadow-2xs"
                >
                  Next Scene →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 bg-[#FBF7EE] border-t border-[#E6DCBF] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#7C4728] font-bold">
            <Sparkles className="w-4 h-4 text-[#E25822]" />
            <span>
              Tip: Let your wife narrate the queen or wise characters, and your son voice the heroes!
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white font-extrabold text-xs shadow-2xs"
          >
            Done & Return to Story
          </button>
        </footer>
      </div>
    </div>
  );
};
