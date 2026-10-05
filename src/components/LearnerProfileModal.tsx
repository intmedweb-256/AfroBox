import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Check,
  Edit2,
  Trash2,
  Download,
  Upload,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Award,
  BookOpen,
  Compass,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { LearnerProfile } from '../types/profile';
import { profileService, CULTURAL_AVATARS } from '../services/profileService';
import { AgeTier } from '../types/afrobox';
import { gamificationService, LevelInfo } from '../services/gamificationService';
import { analyticsService } from '../services/analyticsService';

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileChanged?: (profile: LearnerProfile) => void;
  isFirstTimeOnboarding?: boolean;
  onFirstProfileCreated?: (profile: LearnerProfile) => void;
}

export const LearnerProfileModal: React.FC<LearnerProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileChanged,
  isFirstTimeOnboarding = false,
  onFirstProfileCreated
}) => {
  const [profiles, setProfiles] = useState<LearnerProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState<string>('');
  const [formAvatar, setFormAvatar] = useState<string>('🦁');
  const [formColor, setFormColor] = useState<string>('#C85A32');
  const [formAgeTier, setFormAgeTier] = useState<AgeTier>('6-8');
  const [formGrade, setFormGrade] = useState<string>('Primary 2');
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const list = profileService.getProfiles();
    setProfiles(list);
    const activeId = profileService.getActiveProfileId();
    setActiveProfileId(activeId);

    // If first-time onboarding or no profiles exist, force open create form
    if (isFirstTimeOnboarding || !profileService.hasOnboarded() || list.length === 0) {
      setIsCreating(true);
      setEditingProfileId(null);
    }
  };

  const isFirstTime = Boolean(
    isFirstTimeOnboarding || !profileService.hasOnboarded() || profiles.length === 0
  );

  if (!isOpen) return null;

  const handleSelectProfile = (id: string) => {
    profileService.setActiveProfileId(id);
    setActiveProfileId(id);
    const active = profileService.getActiveProfile();
    analyticsService.trackProfileSwitched(active.name, active.ageTier);
    onProfileChanged?.(active);
    onClose();
  };

  const handleStartCreate = () => {
    setEditingProfileId(null);
    setFormName('');
    setFormAvatar('🦁');
    setFormColor('#C85A32');
    setFormAgeTier('6-8');
    setFormGrade('Primary 2');
    setIsCreating(true);
  };

  const handleStartEdit = (profile: LearnerProfile) => {
    setIsCreating(false);
    setEditingProfileId(profile.id);
    setFormName(profile.name);
    setFormAvatar(profile.avatar);
    setFormColor(profile.avatarColor);
    setFormAgeTier(profile.ageTier);
    setFormGrade(profile.schoolGrade || 'Primary 2');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProfileId) {
      profileService.updateProfile(editingProfileId, {
        name: formName.trim(),
        avatar: formAvatar,
        avatarColor: formColor,
        ageTier: formAgeTier,
        schoolGrade: formGrade.trim()
      });
      loadData();
      const updated = profileService.getActiveProfile();
      onProfileChanged?.(updated);
      setIsCreating(false);
      setEditingProfileId(null);
    } else {
      const wasFirstTime = isFirstTime;
      const created = profileService.createProfile({
        name: formName.trim(),
        avatar: formAvatar,
        avatarColor: formColor,
        ageTier: formAgeTier,
        schoolGrade: formGrade.trim()
      });
      analyticsService.trackProfileCreated(created.name, created.ageTier, created.schoolGrade);
      loadData();
      onProfileChanged?.(created);
      setIsCreating(false);
      setEditingProfileId(null);
      if (wasFirstTime) {
        onFirstProfileCreated?.(created);
      }
      onClose();
    }
  };

  const handleDeleteProfile = (id: string, name: string) => {
    if (profiles.length <= 1) {
      alert('You need at least one active learner profile.');
      return;
    }

    if (window.confirm(`Delete profile "${name}"? Progress for this child will be cleared.`)) {
      profileService.deleteProfile(id);
      loadData();
    }
  };

  const handleExportBackup = () => {
    const backupJson = profileService.exportBackup();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afrobox-learners-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupMessage('Backup file downloaded! Keep it to restore on other tablets or devices.');
    setTimeout(() => setBackupMessage(null), 4500);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = profileService.importBackup(content);
        if (result.success) {
          loadData();
          setBackupMessage(result.message);
          const active = profileService.getActiveProfile();
          onProfileChanged?.(active);
        } else {
          setBackupMessage(`Error: ${result.message}`);
        }
        setTimeout(() => setBackupMessage(null), 5000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetCache = () => {
    if (window.confirm('Clear all local learner profiles and restart as a new user? This will test the first-load profile creation & tips.')) {
      profileService.clearCache();
      window.location.reload();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in"
      onClick={isFirstTime ? undefined : onClose}
    >
      <div
        className="bg-[#FBF7EE] rounded-3xl border-2 border-[#E6DCBF] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 sm:p-5 bg-white border-b border-[#E6DCBF] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shadow-2xs">
              🦁
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-[#23211E] font-['Urbanist'] leading-tight">
                  {isFirstTime ? 'Welcome to AfroBox!' : 'Learner Profiles & Progress'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold uppercase">
                  {isFirstTime ? 'First Time Setup' : 'Class & Home'}
                </span>
              </div>
              <p className="text-xs text-[#7C4728] font-medium">
                {isFirstTime
                  ? "Create your child's profile to personalize reading levels, discovery stars, and storyteller voices"
                  : 'Personalized stars, completed quests, and age-adapted reading for each child'}
              </p>
            </div>
          </div>

          {!isFirstTime && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#F0E8D0] text-[#7C4728] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Welcome / Quick Tip for Profile Selection */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border-2 border-amber-400/40 flex items-start gap-3 shadow-xs">
            <span className="text-2xl shrink-0">🦁</span>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-[#23211E] uppercase tracking-wide">
                  Who is Exploring AfroBox Today?
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#1D3E2F] text-white text-[9px] font-black uppercase tracking-wider">
                  Select Profile
                </span>
              </div>
              <p className="text-xs text-[#7C4728] leading-relaxed">
                Choose or add your child or student profile below. Each profile preserves their individual discovery stars, reading level (Ages 4-7, 8-10, 11+), and storytelling voice.
              </p>
            </div>
          </div>

          {/* Notification banner */}
          {backupMessage && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{backupMessage}</span>
            </div>
          )}

          {/* Active Learner Level & Progress Hero Card */}
          {(() => {
            const active = profileService.getActiveProfile();
            const levelInfo = gamificationService.getLevelInfo();
            const continentProgress = gamificationService.getContinentalProgress();

            return (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#E6DCBF] shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-2xs ring-2 ring-amber-300 shrink-0"
                    style={{ backgroundColor: `${active.avatarColor}25` }}
                  >
                    {active.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-[#23211E] font-['Urbanist']">
                        {active.name}
                      </h3>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        LVL {levelInfo.level} • {levelInfo.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-28 sm:w-40 h-2.5 rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#E25822] to-[#F4B32A] rounded-full transition-all duration-500"
                          style={{ width: `${levelInfo.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-extrabold text-[#7C4728]">
                        {levelInfo.currentXP} XP
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-[#7C4728]">Continental Exploration</div>
                    <div className="text-xs font-black text-emerald-800">
                      {continentProgress.overallPercent}% of Africa Discovered
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200 text-xs font-black text-amber-900 shadow-2xs">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{active.stars || 100}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Action Header: List of Learners & Add Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <h3 className="text-sm font-black text-[#23211E] uppercase tracking-wider">
                Select Active Learner ({profiles.length})
              </h3>
              <p className="text-xs text-[#7C4728]">
                Tap a child's card to switch their active learning session
              </p>
            </div>

            {!isCreating && !editingProfileId && (
              <button
                onClick={handleStartCreate}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-black shadow-2xs transition-all hover:scale-102"
              >
                <Plus className="w-4 h-4" />
                <span>Add Child / Student</span>
              </button>
            )}
          </div>

          {/* Create or Edit Form */}
          {(isCreating || editingProfileId) && (
            <form
              onSubmit={handleSaveProfile}
              className="p-5 bg-white rounded-2xl border-2 border-amber-300 shadow-md space-y-4 animate-in fade-in"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E6DCBF]">
                <h4 className="text-sm font-black text-[#23211E]">
                  {isFirstTime
                    ? '✨ Create Your Child’s Learner Profile'
                    : editingProfileId
                    ? '✏️ Edit Learner Profile'
                    : '✨ New Learner Profile'}
                </h4>
                {!isFirstTime && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProfileId(null);
                    }}
                    className="text-xs font-bold text-stone-500 hover:text-stone-800"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Child Name & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-[#7C4728] mb-1">
                    Child's Name or Nickname *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Kato, Amara, Kwame..."
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E6DCBF] bg-[#FBF7EE] text-sm font-bold text-[#23211E] focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#7C4728] mb-1">
                    Class / Grade / Context
                  </label>
                  <input
                    type="text"
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    placeholder="e.g. Primary 2, Grade 3, Home..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E6DCBF] bg-[#FBF7EE] text-sm font-bold text-[#23211E] focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
                  />
                </div>
              </div>

              {/* Cultural Avatar Picker */}
              <div>
                <label className="block text-xs font-extrabold text-[#7C4728] mb-1.5">
                  Pick Cultural Mascot & Avatar
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {CULTURAL_AVATARS.map((av) => {
                    const isSelected = formAvatar === av.emoji;
                    return (
                      <button
                        key={av.name}
                        type="button"
                        onClick={() => {
                          setFormAvatar(av.emoji);
                          setFormColor(av.color);
                        }}
                        className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-amber-100 ring-3 ring-[#C85A32] scale-110 shadow-sm'
                            : 'bg-[#FBF7EE] hover:bg-stone-100 border border-[#E6DCBF]'
                        }`}
                        title={av.name}
                      >
                        <span className="text-2xl">{av.emoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Age Tier Selector */}
              <div>
                <label className="block text-xs font-extrabold text-[#7C4728] mb-1.5">
                  Age Tier (Adapts stories, riddles & challenge complexity)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { tier: '6-8' as AgeTier, label: 'Ages 4-7', desc: 'Little Cubs (Visual & Audio)' },
                    { tier: '9-10' as AgeTier, label: 'Ages 8-10', desc: 'Story Explorer (Fables & Geography)' },
                    { tier: '11-12' as AgeTier, label: 'Ages 11+', desc: 'Master Griot (Epic Lore & Puzzles)' }
                  ].map((t) => (
                    <button
                      key={t.tier}
                      type="button"
                      onClick={() => setFormAgeTier(t.tier)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        formAgeTier === t.tier
                          ? 'border-[#1D3E2F] bg-emerald-50 text-[#1D3E2F] font-black ring-2 ring-emerald-500'
                          : 'border-[#E6DCBF] bg-[#FBF7EE] text-[#7C4728]'
                      }`}
                    >
                      <div className="text-xs font-black">{t.label}</div>
                      <div className="text-[10px] text-stone-600 leading-tight">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                {!isFirstTime && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProfileId(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-[#E6DCBF] text-xs font-bold text-[#7C4728] hover:bg-[#F0E8D0]"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#b04a25] text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5 hover:scale-102"
                >
                  <span>{isFirstTime ? 'Create Profile & Start AfroBox 🚀' : editingProfileId ? 'Save Changes' : 'Create Learner Profile'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Profiles Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {profiles.map((p) => {
              const isActive = p.id === activeProfileId;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectProfile(p.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-[#1D3E2F] bg-white ring-2 ring-emerald-500 shadow-md'
                      : 'border-[#E6DCBF] bg-white/80 hover:bg-white hover:border-amber-400 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-2xs border border-white"
                        style={{ backgroundColor: `${p.avatarColor}20` }}
                      >
                        {p.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-black text-base text-[#23211E] font-['Urbanist']">
                            {p.name}
                          </h4>
                          {isActive && (
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[9px] font-black uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#7C4728] font-bold">
                          {p.schoolGrade || 'Learner'} • Ages {p.ageTier}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-[#F0E8D0] text-stone-500 hover:text-stone-800 transition-colors"
                        title="Edit profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {profiles.length > 1 && (
                        <button
                          onClick={() => handleDeleteProfile(p.id, p.name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                          title="Delete profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Badges / Stats Strip */}
                  <div className="mt-3 pt-3 border-t border-[#F0E8D0] flex items-center justify-between text-xs text-[#7C4728]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-black text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{p.stars || 100}</span>
                      </span>
                      <span className="text-[11px] text-stone-500 font-semibold">
                        Ages {p.ageTier}
                      </span>
                    </div>

                    {isActive ? (
                      <span className="text-[11px] font-extrabold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Current Session
                      </span>
                    ) : (
                      <span className="text-[11px] font-extrabold text-[#C85A32] flex items-center gap-0.5 hover:underline">
                        Switch Learner <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Privacy & Device Storage Note */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <h4 className="text-xs font-black text-[#23211E] uppercase tracking-wider">
                Why Device-Specific Storage (No Cookies, No Passwords)?
              </h4>
            </div>
            <p className="text-xs text-[#7C4728] leading-relaxed">
              AfroBox is built for schools, tablets, and families. Storing profiles locally in browser storage protects child privacy (COPPA compliant), eliminates login friction, and works 100% offline or on school networks without servers.
            </p>

            {/* School Backup / Export / Import */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={handleExportBackup}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6DCBF] hover:bg-[#F0E8D0] text-[#7C4728] font-bold shadow-2xs transition-colors"
                title="Save backup of all learner profiles as JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Class Backup (.json)</span>
              </button>

              <button
                type="button"
                onClick={handleResetCache}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold shadow-2xs transition-colors"
                title="Clear all stored profiles and reset initial onboarding"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Cache & Reset Setup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 bg-[#FBF7EE] border-t border-[#E6DCBF] flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#7C4728]">
            Active learner: <span className="font-black text-[#23211E]">{profileService.getActiveProfile().name}</span>
          </div>

          <button
            onClick={() => {
              const active = profileService.getActiveProfile();
              onProfileChanged?.(active);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#1D3E2F] hover:bg-[#152e23] text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5 hover:scale-102"
          >
            <span>Start Exploring with {profileService.getActiveProfile().name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </footer>
      </div>
    </div>
  );
};
