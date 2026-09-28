import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Lock,
  Globe,
  Eye,
  CheckCheck,
  Volume2,
  VolumeX,
  RefreshCw,
  Trash2,
  User,
  Shield,
  Sparkles,
  Sun,
  Moon,
  Palette
} from 'lucide-react';

export const SettingsModal = () => {
  const {
    accountPrivacy,
    setAccountPrivacy,
    lastSeenPrivacy,
    setLastSeenPrivacy,
    readReceipts,
    setReadReceipts,
    soundEnabled,
    setSoundEnabled,
    currentUser,
    setCurrentUser,
    refreshApp,
    isRefreshing,
    themeMode,
    toggleTheme,
    eyeProtection,
    toggleEyeProtection
  } = useApp();

  const [editName, setEditName] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name: editName,
      bio: editBio
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-4xl mx-auto w-full">
      {/* Settings Title Card */}
      <div className="bg-[#eef2f7] dark:bg-[#191d26] rounded-3xl p-6 neu-card border border-white/60 dark:border-white/5">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Account & App Settings</h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize your display theme, eye protection, privacy preferences, and profile.
        </p>
      </div>

      {/* Display & Appearance Card (Dark / Light Mode & Eye Protection) */}
      <div className="bg-[#eef2f7] dark:bg-[#191d26] rounded-3xl p-6 neu-card border border-white/60 dark:border-white/5 space-y-5">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Palette className="w-4 h-4 text-blue-500" />
          <span>Display & Comfort</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dark / Light Mode Selector */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#141720] border border-slate-200/80 dark:border-white/5 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Theme Mode</span>
              <span className="text-[11px] text-slate-400">Switch between Crisp Light & Deep Neumorphic Dark</span>
            </div>

            <div className="flex items-center p-1 bg-[#e4e9f0] dark:bg-[#0f1217] rounded-full neu-inset">
              <button
                type="button"
                onClick={() => themeMode === 'dark' && toggleTheme()}
                className={`flex-1 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  themeMode === 'light'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => themeMode === 'light' && toggleTheme()}
                className={`flex-1 py-1.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  themeMode === 'dark'
                    ? 'bg-[#1e232e] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-blue-400" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Eye Protection Mode */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#141720] border border-slate-200/80 dark:border-white/5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Eye Protection Mode</span>
                {eyeProtection && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                    Active
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">
                Filters harsh blue light with a soothing warm tint for relaxed reading.
              </span>
            </div>

            <button
              type="button"
              onClick={toggleEyeProtection}
              className={`w-full py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                eyeProtection
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                  : 'neu-button text-slate-600 dark:text-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{eyeProtection ? 'Disable Eye Shield' : 'Enable Eye Protection'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Account Privacy Toggle (Public vs Private) */}
      <div className="bg-[#eef2f7] dark:bg-[#191d26] rounded-3xl p-6 neu-card border border-white/60 dark:border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md ${
                accountPrivacy === 'private'
                  ? 'bg-purple-600 shadow-purple-500/30'
                  : 'bg-blue-600 shadow-blue-500/30'
              }`}
            >
              {accountPrivacy === 'private' ? <Lock className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Account Privacy: {accountPrivacy === 'private' ? 'Private Account' : 'Public Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {accountPrivacy === 'private'
                  ? 'Only accepted friends can see your posts, stories, and send messages.'
                  : 'Anyone can find your profile, view posts, and start a conversation.'}
              </p>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex items-center p-1 bg-[#e4e9f0] dark:bg-[#141720] rounded-full neu-inset">
            <button
              onClick={() => setAccountPrivacy('public')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                accountPrivacy === 'public'
                  ? 'bg-white dark:bg-[#1e232e] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setAccountPrivacy('private')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                accountPrivacy === 'private'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              Private
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details Edit */}
      <div className="bg-[#eef2f7] dark:bg-[#191d26] rounded-3xl p-6 neu-card border border-white/60 dark:border-white/5 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          <span>Profile Information</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Display Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#eef2f7] dark:bg-[#141720] rounded-xl neu-inset outline-none text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Handle</label>
              <input
                type="text"
                disabled
                value={currentUser.username}
                className="w-full px-4 py-2.5 text-xs bg-[#e4e9f0] dark:bg-[#12151b] rounded-xl neu-inset outline-none text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Bio</label>
            <textarea
              rows={2}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-[#eef2f7] dark:bg-[#141720] rounded-xl neu-inset outline-none text-slate-800 dark:text-slate-100 resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Profile changes saved!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold shadow-md transition-all"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Visibility & Communications */}
      <div className="bg-[#eef2f7] dark:bg-[#191d26] rounded-3xl p-6 neu-card border border-white/60 dark:border-white/5 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Chat & Visibility Preferences</h3>

        <div className="space-y-3">
          {/* Last Seen Visibility */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/60 dark:bg-[#141720]">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Who can see when you're online</span>
              <span className="text-[11px] text-slate-400">Controls online green dot indicator</span>
            </div>
            <select
              value={lastSeenPrivacy}
              onChange={(e) => setLastSeenPrivacy(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#eef2f7] dark:bg-[#191d26] rounded-xl neu-inset border-none outline-none font-semibold text-slate-700 dark:text-slate-200"
            >
              <option value="everyone">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>

          {/* Read Receipts */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/60 dark:bg-[#141720]">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Read Receipts</span>
              <span className="text-[11px] text-slate-400">Show blue checkmarks when messages are read</span>
            </div>
            <input
              type="checkbox"
              checked={readReceipts}
              onChange={(e) => setReadReceipts(e.target.checked)}
              className="accent-blue-500 w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Audio Chimes */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/60 dark:bg-[#141720]">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Interactive Sound FX</span>
              <span className="text-[11px] text-slate-400">Synthesized audio chimes on send & receive</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl neu-button ${soundEnabled ? 'text-blue-600' : 'text-slate-400'}`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Network & Diagnostics Card */}
      <div className="bg-[#eef2f7] dark:bg-[#191d26] rounded-3xl p-6 neu-card border border-white/60 dark:border-white/5 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Connection Diagnostics & Cache</h4>
          <p className="text-[11px] text-slate-400">If messages fail to load or socket slows down, re-sync here</p>
        </div>

        <button
          onClick={refreshApp}
          disabled={isRefreshing}
          className="px-4 py-2 rounded-full neu-button text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
          <span>{isRefreshing ? 'Re-syncing...' : 'Sync Connection'}</span>
        </button>
      </div>
    </div>
  );
};
