import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, X, ChevronLeft, ChevronRight, Sparkles, Clock, Eye } from 'lucide-react';

export const StatusView = () => {
  const {
    stories,
    currentUser,
    isStoryViewerOpen,
    setIsStoryViewerOpen,
    selectedStoryIndex,
    setSelectedStoryIndex,
    isAddStoryOpen,
    setIsAddStoryOpen,
    addStatusStory
  } = useApp();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [newStoryImage, setNewStoryImage] = useState('');
  const [newStoryCaption, setNewStoryCaption] = useState('');

  const currentStoryUser = stories[selectedStoryIndex] || stories[0];
  const activeSlide = currentStoryUser?.stories?.[activeSlideIndex] || currentStoryUser?.stories?.[0];

  // Auto-advance progress timer for stories
  useEffect(() => {
    if (!isStoryViewerOpen || !currentStoryUser) return;

    const timer = setTimeout(() => {
      if (activeSlideIndex < currentStoryUser.stories.length - 1) {
        setActiveSlideIndex((prev) => prev + 1);
      } else {
        // Move to next user's story or close
        if (selectedStoryIndex < stories.length - 1) {
          setSelectedStoryIndex((prev) => prev + 1);
          setActiveSlideIndex(0);
        } else {
          setIsStoryViewerOpen(false);
          setActiveSlideIndex(0);
        }
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isStoryViewerOpen, activeSlideIndex, selectedStoryIndex, currentStoryUser, stories.length]);

  const openStoryViewer = (userIndex) => {
    setSelectedStoryIndex(userIndex);
    setActiveSlideIndex(0);
    setIsStoryViewerOpen(true);
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < currentStoryUser.stories.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    } else if (selectedStoryIndex < stories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
      setActiveSlideIndex(0);
    } else {
      setIsStoryViewerOpen(false);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    } else if (selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
      setActiveSlideIndex(0);
    }
  };

  const handleCreateStatus = (e) => {
    e.preventDefault();
    addStatusStory(
      newStoryImage || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      newStoryCaption || 'Status update ✨'
    );
    setNewStoryImage('');
    setNewStoryCaption('');
  };

  const presetStoryImages = [
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Top Banner / Add Status Action */}
      <div className="bg-[#eef2f7] rounded-3xl p-6 neu-card border border-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <button
              onClick={() => setIsAddStoryOpen(true)}
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center border-2 border-white shadow-md hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">My Status</h3>
            <p className="text-xs text-slate-400">Share photos & updates that disappear after 24 hours</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddStoryOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Status</span>
        </button>
      </div>

      {/* Stories Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Recent Updates from Friends
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {stories.map((storyUser, index) => {
            const firstStory = storyUser.stories[0];
            return (
              <div
                key={storyUser.id}
                onClick={() => openStoryViewer(index)}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer neu-card border border-white/80 transition-all duration-300 hover:scale-[1.02] shadow-[6px_10px_20px_rgba(148,163,184,0.22)]"
              >
                {/* Background Image Preview */}
                <img
                  src={firstStory?.image}
                  alt={storyUser.userName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Top Avatar with Gradient Border */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-blue-500 via-rose-500 to-amber-400 shadow-md">
                    <img
                      src={storyUser.avatar}
                      alt={storyUser.userName}
                      className="w-9 h-9 rounded-full object-cover border-2 border-white"
                    />
                  </div>
                </div>

                {/* Story Info at Bottom */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <p className="text-xs font-bold drop-shadow-sm truncate">{storyUser.userName}</p>
                  <p className="text-[10px] text-white/80 truncate">{firstStory?.caption}</p>
                  <div className="flex items-center gap-1 text-[9px] text-white/60 mt-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{firstStory?.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Story Player Modal */}
      {isStoryViewerOpen && currentStoryUser && activeSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm h-[85vh] max-h-[680px] bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between">
            {/* Top Multi-slide Progress Bars */}
            <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
              {currentStoryUser.stories.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      idx < activeSlideIndex
                        ? 'w-full'
                        : idx === activeSlideIndex
                        ? 'w-full animate-[progress_4.5s_linear]'
                        : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Story Header */}
            <div className="relative z-20 pt-6 px-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentStoryUser.avatar}
                  alt={currentStoryUser.userName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/80"
                />
                <div>
                  <h4 className="text-sm font-bold">{currentStoryUser.userName}</h4>
                  <p className="text-[11px] text-white/70">{activeSlide.time}</p>
                </div>
              </div>

              <button
                onClick={() => setIsStoryViewerOpen(false)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Background Media */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeSlide.image}
                alt="story content"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            </div>

            {/* Left & Right Click Navigation Areas */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-0 top-16 bottom-20 w-1/3 z-20 outline-none"
            />
            <button
              onClick={handleNextSlide}
              className="absolute right-0 top-16 bottom-20 w-1/3 z-20 outline-none"
            />

            {/* Bottom Caption */}
            <div className="relative z-20 p-5 text-center text-white">
              <p className="text-sm font-medium drop-shadow-md">{activeSlide.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Status Modal */}
      {isAddStoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#eef2f7] rounded-3xl p-6 neu-card border border-white/70 relative">
            <button
              onClick={() => setIsAddStoryOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full neu-button flex items-center justify-center text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-slate-800 mb-1">Add to Status</h3>
            <p className="text-xs text-slate-400 mb-4">Post a 24-hour visual story to your friends</p>

            <form onSubmit={handleCreateStatus} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Photo URL</label>
                <input
                  type="url"
                  value={newStoryImage}
                  onChange={(e) => setNewStoryImage(e.target.value)}
                  placeholder="https://... or choose below"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#eef2f7] rounded-xl neu-inset outline-none text-slate-800"
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Pick a sample status photo:
                </span>
                <div className="flex gap-2">
                  {presetStoryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewStoryImage(img)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        newStoryImage === img ? 'border-blue-500 scale-105' : 'border-transparent opacity-75'
                      }`}
                    >
                      <img src={img} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Caption</label>
                <input
                  type="text"
                  value={newStoryCaption}
                  onChange={(e) => setNewStoryCaption(e.target.value)}
                  placeholder="Say something about your status..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#eef2f7] rounded-xl neu-inset outline-none text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
              >
                Publish Status
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
