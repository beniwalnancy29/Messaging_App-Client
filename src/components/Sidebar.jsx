import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Plus,
  Volume2,
  VolumeX,
  UserPlus,
  MessageSquare,
  Users
} from 'lucide-react';

export const Sidebar = ({ onContactClick }) => {
  const {
    contacts,
    activeContactId,
    selectContact,
    chatFilterTab,
    setChatFilterTab,
    chatSearchQuery,
    setChatSearchQuery,
    currentUser,
    accountPrivacy,
    setActiveNav
  } = useApp();

  // Dynamic mentions count (0 if no contacts or mentions)
  const totalMentionsCount = contacts.reduce((sum, c) => sum + (c.mentionCount || 0), 0);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(chatSearchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (chatFilterTab === 'unread') {
      return contact.unreadCount > 0;
    }
    if (chatFilterTab === 'mentions') {
      return contact.hasMentions || contact.mentionCount > 0;
    }
    return true;
  });

  const renderBadge = (contact) => {
    if (contact.badgeType === 'gray-dot') {
      return (
        <span className="w-3.5 h-3.5 rounded-full bg-slate-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></span>
      );
    }

    if (contact.badgeType === 'blue-mention' || contact.hasMentions) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#1d8cf8] shadow-[0_0_12px_rgba(29,140,248,0.7),0_2px_4px_rgba(29,140,248,0.3)] animate-pulse">
          @ {contact.mentionCount || 2}
        </span>
      );
    }

    if (contact.unreadCount > 0) {
      const displayVal = contact.badgeText || (contact.unreadCount > 99 ? '99+' : contact.unreadCount);
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white bg-[#ff334b] shadow-[0_0_14px_rgba(255,51,75,0.75),0_2px_5px_rgba(255,51,75,0.4)]">
          {displayVal}
        </span>
      );
    }

    return null;
  };

  return (
    <aside className="w-full md:w-80 lg:w-[340px] flex-shrink-0 flex flex-col bg-[#eef2f7] dark:bg-[#151922] border-r border-[#dbe3ed] dark:border-white/5 h-full select-none transition-colors duration-200">
      {/* Top Search & Filter Bar */}
      <div className="p-4 pb-3 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={chatSearchQuery}
            onChange={(e) => setChatSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#eef2f7] dark:bg-[#12151c] text-slate-700 dark:text-slate-100 placeholder-slate-400 rounded-full neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Tab Pills: All, Unread, Mentions */}
        <div className="flex items-center justify-between p-1 bg-[#e4e9f0] dark:bg-[#12151c] rounded-full neu-inset">
          <button
            onClick={() => setChatFilterTab('all')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all duration-200 text-center ${
              chatFilterTab === 'all'
                ? 'bg-white dark:bg-[#1e232e] text-slate-800 dark:text-white shadow-[2px_3px_8px_rgba(148,163,184,0.3)] dark:shadow-none'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setChatFilterTab('unread')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all duration-200 text-center ${
              chatFilterTab === 'unread'
                ? 'bg-white dark:bg-[#1e232e] text-slate-800 dark:text-white shadow-[2px_3px_8px_rgba(148,163,184,0.3)] dark:shadow-none'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Unread
          </button>

          {/* Mentions Tab (Only shows red badge if mentions exist) */}
          <button
            onClick={() => setChatFilterTab('mentions')}
            className={`flex-1 py-1 px-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
              chatFilterTab === 'mentions'
                ? 'bg-white dark:bg-[#1e232e] text-slate-800 dark:text-white shadow-[2px_3px_8px_rgba(148,163,184,0.3)] dark:shadow-none'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            <span>Mentions</span>
            {totalMentionsCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-white bg-[#ff334b] shadow-[0_0_10px_rgba(255,51,75,0.85)]">
                {totalMentionsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1.5">
        {filteredContacts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white/70 dark:bg-[#191d26] neu-card flex items-center justify-center shadow-sm">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">No chats yet</h4>
              <p className="text-xs text-slate-400 dark:text-slate-400 mt-1 max-w-[210px] leading-relaxed">
                Your conversation list is completely fresh & empty.
              </p>
            </div>
          </div>
        ) : (
          filteredContacts.map((contact) => {
            const isActive = contact.id === activeContactId;

            return (
              <div
                key={contact.id}
                onClick={() => {
                  selectContact(contact.id);
                  onContactClick?.(contact.id);
                }}
                className={`relative group flex items-center gap-3.5 px-3.5 py-3 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-[#1e232e] rounded-2xl shadow-[6px_10px_22px_rgba(148,163,184,0.22)] dark:shadow-[6px_8px_18px_rgba(0,0,0,0.5)] z-10'
                    : 'rounded-2xl hover:bg-white/40 dark:hover:bg-white/5 active:scale-[0.99]'
                }`}
              >
                {/* Avatar with soft border & online glowing dot if active */}
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-slate-200 to-white shadow-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {contact.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                  )}
                </div>

                {/* Contact Name & Last Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-sm truncate ${
                        isActive
                          ? 'font-bold text-slate-800 dark:text-white'
                          : 'font-semibold text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {contact.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {contact.messages && contact.messages.length > 0
                      ? contact.messages[contact.messages.length - 1].text
                      : contact.about || 'New chat'}
                  </p>
                </div>

                {/* Notification Badge */}
                <div className="flex-shrink-0 flex items-center">
                  {renderBadge(contact)}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Profile */}
      <div className="p-3 bg-[#e8ecf2] dark:bg-[#12151c] border-t border-[#d8e0ea] dark:border-white/5 flex items-center justify-between transition-colors duration-200">
        <div
          onClick={() => setActiveNav('settings')}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90"
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt="You"
              className="w-9 h-9 rounded-full object-cover border border-white shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>{currentUser.name}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                accountPrivacy === 'private'
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                  : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
              }`}>
                {accountPrivacy === 'private' ? 'Private' : 'Public'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">{currentUser.username}</p>
          </div>
        </div>

        <button
          onClick={() => setActiveNav('friends')}
          title="Find & Add Friends"
          className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600 hover:text-blue-700 neu-button"
        >
          <UserPlus className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
