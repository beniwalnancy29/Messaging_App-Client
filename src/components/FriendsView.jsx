import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  UserPlus,
  Check,
  X,
  MessageSquare,
  Search,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const FriendsView = () => {
  const {
    friends,
    friendRequests,
    discoverUsers,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    selectContact,
    setActiveNav
  } = useApp();

  const [activeTab, setActiveTab] = useState('friends'); // 'friends' | 'requests' | 'discover'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscover = discoverUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartChat = (friendId) => {
    selectContact(friendId);
    setActiveNav('chats');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Top Search & Filter Tabs */}
      <div className="bg-[#eef2f7] rounded-3xl p-5 neu-card border border-white/60 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, handle or interests..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#eef2f7] text-slate-800 placeholder-slate-400 rounded-full neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Neumorphic Filter Tabs */}
        <div className="flex items-center justify-between p-1 bg-[#e4e9f0] rounded-full neu-inset">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
              activeTab === 'friends'
                ? 'bg-white text-slate-800 shadow-[2px_3px_8px_rgba(148,163,184,0.3)]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            My Friends ({friends.length})
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'requests'
                ? 'bg-white text-slate-800 shadow-[2px_3px_8px_rgba(148,163,184,0.3)]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>Requests</span>
            {friendRequests.length > 0 && (
              <span className="w-4 h-4 rounded-full text-[10px] font-bold text-white bg-[#ff334b] flex items-center justify-center shadow-sm">
                {friendRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all ${
              activeTab === 'discover'
                ? 'bg-white text-slate-800 shadow-[2px_3px_8px_rgba(148,163,184,0.3)]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Discover People ({discoverUsers.length})
          </button>
        </div>
      </div>

      {/* Friends List Tab */}
      {activeTab === 'friends' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFriends.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-slate-400 text-sm">
              No friends found. Check "Discover People" to connect with new friends!
            </div>
          ) : (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="bg-[#eef2f7] rounded-3xl p-4 neu-card border border-white/70 flex items-center justify-between gap-3 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    {friend.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{friend.name}</h4>
                    <p className="text-xs text-slate-400 truncate">{friend.username}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{friend.about}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleStartChat(friend.id)}
                    title="Send Message"
                    className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Friend Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-3">
          {friendRequests.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No pending friend requests.
            </div>
          ) : (
            friendRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#eef2f7] rounded-3xl p-4 neu-card border border-white/70 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={req.user.avatar}
                    alt={req.user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{req.user.name}</h4>
                    <p className="text-xs text-slate-400">{req.user.username}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {req.user.mutualFriends} mutual friends • Requested {req.requestedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => acceptFriendRequest(req)}
                    className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Discover People Tab */}
      {activeTab === 'discover' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDiscover.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-slate-400 text-sm">
              All suggested people connected!
            </div>
          ) : (
            filteredDiscover.map((user) => (
              <div
                key={user.id}
                className="bg-[#eef2f7] rounded-3xl p-5 neu-card border border-white/70 flex flex-col justify-between text-center items-center gap-3 hover:scale-[1.01] transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{user.name}</h4>
                  <p className="text-xs text-slate-400">{user.username}</p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{user.about}</p>
                  <span className="inline-block mt-1 text-[11px] text-blue-600 font-semibold">
                    {user.mutualFriends} mutual friends
                  </span>
                </div>

                <button
                  onClick={() => sendFriendRequest(user)}
                  className="w-full py-2 rounded-full bg-white hover:bg-blue-50 text-blue-600 text-xs font-bold neu-button flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Friend</span>
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
