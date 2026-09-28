import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Share2,
  Clock,
  BookOpen,
  Send,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const TrendingNewsView = () => {
  const {
    trendingNews,
    friends,
    shareNewsToChat,
    isShareNewsOpen,
    setIsShareNewsOpen,
    selectedNewsToShare,
    setSelectedNewsToShare
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology & AI', 'Cybersecurity', 'Web & Mobile', 'Global Space'];

  const filteredNews = activeCategory === 'All'
    ? trendingNews
    : trendingNews.filter(n => n.category === activeCategory);

  const handleOpenShare = (news) => {
    setSelectedNewsToShare(news);
    setIsShareNewsOpen(true);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Top Header Card */}
      <div className="bg-[#eef2f7] rounded-3xl p-6 neu-card border border-white/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Trending Worldwide Updates</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Latest News & Innovations</h2>
          <p className="text-xs text-slate-400">
            Real-time tech, cybersecurity and science briefings. Share top stories with your friends in 1 click!
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#e4e9f0] rounded-2xl neu-inset max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-white text-slate-800 shadow-[2px_3px_8px_rgba(148,163,184,0.3)]'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((news) => (
          <article
            key={news.id}
            className="bg-[#eef2f7] rounded-3xl overflow-hidden neu-card border border-white/70 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
          >
            {/* News Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-200">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span
                className={`absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-md ${news.badgeColor}`}
              >
                {news.category}
              </span>
              <span className="absolute bottom-3.5 right-3.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                <span>{news.publishedAt}</span>
              </span>
            </div>

            {/* News Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-1">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-800 leading-snug">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                  {news.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
                <span className="text-[11px] text-slate-400 font-medium">
                  {news.sharesCount} shares
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenShare(news)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share with Friends</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Share to Friend Modal */}
      {isShareNewsOpen && selectedNewsToShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#eef2f7] rounded-3xl p-6 neu-card border border-white/70 relative">
            <button
              onClick={() => setIsShareNewsOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full neu-button flex items-center justify-center text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-800 mb-1">Share to Friend</h3>
            <p className="text-xs text-slate-400 mb-3 truncate">
              {selectedNewsToShare.title}
            </p>

            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select a friend to message:
            </span>

            <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => shareNewsToChat(selectedNewsToShare, friend.id)}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-white/70 hover:bg-white cursor-pointer transition-all border border-transparent hover:border-blue-300"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{friend.name}</h4>
                      <p className="text-xs text-slate-400">{friend.username}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center gap-1">
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
