import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Compass,
  CircleDot,
  Users,
  Flame,
  ShieldCheck,
  Settings,
  UserPlus
} from 'lucide-react';

export const NavigationDock = () => {
  const {
    activeNav,
    setActiveNav,
    contacts,
    friendRequests,
    virusScanStatus,
    accountPrivacy,
    currentUser,
    setIsCreateAccountOpen
  } = useApp();

  const totalUnreadChats = contacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
  const pendingFriendReqs = friendRequests.length;

  const navItems = [
    {
      id: 'chats',
      label: 'Chats',
      icon: MessageSquare,
      badge: totalUnreadChats > 0 ? (totalUnreadChats > 99 ? '99+' : totalUnreadChats) : null,
      badgeColor: 'bg-[#ff334b]'
    },
    {
      id: 'status',
      label: 'Stories',
      icon: CircleDot,
      badge: 'New',
      badgeColor: 'bg-emerald-500'
    },
    {
      id: 'feed',
      label: 'Feed',
      icon: Compass,
      badge: null
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: Users,
      badge: pendingFriendReqs > 0 ? pendingFriendReqs : null,
      badgeColor: 'bg-[#1d8cf8]'
    },
    {
      id: 'news',
      label: 'Trending',
      icon: Flame,
      badge: 'Live',
      badgeColor: 'bg-amber-500'
    },
    {
      id: 'security',
      label: 'Security',
      icon: ShieldCheck,
      badge: virusScanStatus === 'scanning' ? 'Scan' : 'Safe',
      badgeColor: virusScanStatus === 'scanning' ? 'bg-amber-500' : 'bg-emerald-500'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: accountPrivacy === 'private' ? 'Lock' : null,
      badgeColor: 'bg-purple-500'
    }
  ];

  return (
    <nav className="w-16 md:w-20 bg-[#e8ecf2] dark:bg-[#12151c] border-r border-[#d8e0ea] dark:border-white/5 flex flex-col items-center py-4 justify-between select-none z-30 transition-colors duration-200">
      {/* Top Apna Chatterly Brand Logo */}
      <div className="flex flex-col items-center gap-1.5 mb-2">
        {/* Custom Uploaded "Apna Chatterly" Brand Icon */}
        <div
          onClick={() => setActiveNav('chats')}
          title="Apna Chatterly"
          className="w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-[0_8px_20px_rgba(29,140,248,0.3)] cursor-pointer hover:scale-105 active:scale-95 transition-all p-0.5 border-2 border-white group"
        >
          <img
            src="/logo.png"
            alt="Apna Chatterly Logo"
            className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform"
          />
        </div>
        <span className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-tighter text-center leading-none">
          Apna<br />Chatterly
        </span>
      </div>

      {/* Nav List */}
      <div className="flex-1 flex flex-col gap-2.5 items-center justify-center w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              title={item.label}
              className={`relative w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 group ${
                isActive
                  ? 'bg-white text-[#1d8cf8] shadow-[4px_6px_14px_rgba(148,163,184,0.3),-3px_-3px_8px_rgba(255,255,255,0.9)] scale-105'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40 active:scale-95'
              }`}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />

              {/* Glowing Badge */}
              {item.badge && (
                <span
                  className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold text-white shadow-sm ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Avatar & Fresh Account Button */}
      <div className="flex flex-col items-center gap-2 pt-2 border-t border-[#d8e0ea] w-full px-2">
        <button
          onClick={() => setIsCreateAccountOpen(true)}
          title="Create Fresh Account"
          className="w-10 h-10 rounded-xl neu-button text-blue-600 hover:text-blue-700 flex items-center justify-center transition-all"
        >
          <UserPlus className="w-4 h-4" />
        </button>

        <div
          onClick={() => setActiveNav('settings')}
          className="relative cursor-pointer group"
          title={`${currentUser.name} (${accountPrivacy === 'private' ? 'Private' : 'Public'})`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform"
          />
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
              accountPrivacy === 'private' ? 'bg-purple-500' : 'bg-emerald-500'
            }`}
          />
        </div>
      </div>
    </nav>
  );
};
