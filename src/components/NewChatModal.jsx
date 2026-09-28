import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { userAPI } from '../services/api';
import { X, Search, UserPlus, MessageSquare } from 'lucide-react';

export const NewChatModal = () => {
  const {
    isNewChatOpen,
    setIsNewChatOpen,
    contacts,
    setContacts,
    selectContact,
    isDemoMode
  } = useChat();

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isNewChatOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (isDemoMode) {
      // In demo mode, filter contacts or suggest new mock contact
      const found = contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
      if (found.length === 0) {
        setSearchResults([
          {
            id: 'mock-' + Date.now(),
            name: query.trim(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${query.trim()}`,
            about: 'Ready to chat on Neumorphic Messenger'
          }
        ]);
      } else {
        setSearchResults(found);
      }
      return;
    }

    // Call real backend user search API
    setLoading(true);
    try {
      const res = await userAPI.searchUsers(query);
      setSearchResults(res.data.users || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const startConversation = (user) => {
    // Check if conversation already exists in contacts
    const existing = contacts.find(c => c.id === user.id || c.id === user._id);
    if (existing) {
      selectContact(existing.id);
    } else {
      const newContact = {
        id: user.id || user._id || 'user-' + Date.now(),
        name: user.username || user.name,
        avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || user.name}`,
        status: user.status || 'offline',
        lastSeen: 'Recently',
        unreadCount: 0,
        badgeType: 'none',
        isGroup: false,
        about: user.about || 'New friend on Neumorphic Messenger',
        messages: []
      };

      setContacts(prev => [newContact, ...prev]);
      selectContact(newContact.id);
    }

    setIsNewChatOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#eef2f7] rounded-3xl p-6 neu-card relative border border-white/60">
        {/* Close Button */}
        <button
          onClick={() => setIsNewChatOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 neu-button"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center mx-auto mb-2 shadow-[0_6px_18px_rgba(37,99,235,0.35)]">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">New Conversation</h2>
          <p className="text-xs text-slate-400">Search for a colleague or friend to chat</p>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-20 py-2.5 text-sm bg-[#eef2f7] text-slate-700 rounded-full neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Search Results */}
        <div className="max-h-60 overflow-y-auto space-y-2">
          {loading ? (
            <p className="text-center text-xs text-slate-400 py-4">Searching users...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.id || user._id}
                onClick={() => startConversation(user)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/70 cursor-pointer transition-all border border-transparent hover:border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name || user.username}
                    className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{user.name || user.username}</h4>
                    <p className="text-xs text-slate-400 truncate max-w-[180px]">{user.email || user.about}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-blue-600 neu-button"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : query ? (
            <p className="text-center text-xs text-slate-400 py-4">No users found</p>
          ) : (
            <p className="text-center text-xs text-slate-400 py-4">Type a name to search</p>
          )}
        </div>
      </div>
    </div>
  );
};
