import React from 'react';
import { useApp } from '../context/AppContext';
import {
  RefreshCw,
  Wifi,
  WifiOff,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Globe,
  CheckCircle2,
  Sun,
  Moon,
  Eye,
  EyeOff
} from 'lucide-react';

export const HeaderBar = () => {
  const {
    activeNav,
    isOnline,
    latencyMs,
    isRefreshing,
    refreshApp,
    refreshNotification,
    virusScanStatus,
    threatsDetected,
    accountPrivacy,
    setActiveNav,
    themeMode,
    toggleTheme,
    eyeProtection,
    toggleEyeProtection
  } = useApp();

  const getNavTitle = () => {
    switch (activeNav) {
      case 'chats':
        return 'Apna Chatterly • Chats';
      case 'status':
        return 'Apna Chatterly • Stories';
      case 'feed':
        return 'Apna Chatterly • Community';
      case 'friends':
        return 'Apna Chatterly • Friends';
      case 'news':
        return 'Apna Chatterly • Trending News';
      case 'security':
        return 'Apna Chatterly • Security Shield';
      case 'settings':
        return 'Apna Chatterly • Settings';
      default:
        return 'Apna Chatterly';
    }
  };

  return (
    <header className="h-14 px-4 md:px-6 bg-[#eef2f7] dark:bg-[#151922] border-b border-[#dbe3ed] dark:border-white/5 flex items-center justify-between z-20 select-none transition-colors duration-200">
      {/* Current Section Title & Toast */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <span>{getNavTitle()}</span>
        </h1>

        {refreshNotification && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800/40 animate-in fade-in duration-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{refreshNotification}</span>
          </div>
        )}
      </div>

      {/* Right Controls: Eye Protection, Dark Mode, Network Monitor, Refresh, Privacy */}
      <div className="flex items-center gap-2 md:gap-2.5">
        {/* Eye Protection Mode Toggle Button */}
        <button
          onClick={toggleEyeProtection}
          title={eyeProtection ? 'Eye Protection Active (Warm Tint On)' : 'Enable Eye Protection Mode (Anti-Blue Light)'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            eyeProtection
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 shadow-sm'
              : 'neu-button text-slate-600 dark:text-slate-300 hover:text-amber-600'
          }`}
        >
          <Eye className={`w-3.5 h-3.5 ${eyeProtection ? 'text-amber-600 fill-amber-500/20' : ''}`} />
          <span className="hidden sm:inline">{eyeProtection ? 'Eye Shield ON' : 'Eye Shield'}</span>
        </button>

        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-8 h-8 rounded-full neu-button flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-all active:scale-95"
        >
          {themeMode === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Network Quality Monitor */}
        <div
          title={isOnline ? `Network connection healthy (${latencyMs}ms)` : 'Network disconnected'}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#e8ecf2] dark:bg-[#141720] neu-inset text-[11px] font-semibold text-slate-600 dark:text-slate-300"
        >
          {isOnline ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
              <span>5G Fast</span>
              <span className="text-slate-400 font-normal">({latencyMs}ms)</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.9)] animate-ping" />
              <span className="text-rose-500">Offline</span>
            </>
          )}
        </div>

        {/* Tactile "Refresh App" Button */}
        <button
          onClick={refreshApp}
          disabled={isRefreshing}
          title="Refresh App & Re-sync Network Connection"
          className={`px-3 py-1.5 rounded-full neu-button flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 active:scale-95 transition-all ${
            isRefreshing ? 'opacity-80' : ''
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
          <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
        </button>

        {/* Account Privacy Capsule (Public vs Private) */}
        <button
          onClick={() => setActiveNav('settings')}
          title="Account Privacy Setting"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
            accountPrivacy === 'private'
              ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40'
              : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40'
          }`}
        >
          {accountPrivacy === 'private' ? (
            <>
              <Lock className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              <span>Private</span>
            </>
          ) : (
            <>
              <Globe className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span>Public</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
