import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Send,
  Sparkles,
  BadgeCheck,
  Tag
} from 'lucide-react';

export const FeedView = () => {
  const { posts, createPost, toggleLikePost, addCommentToPost, currentUser } = useApp();
  const [newContent, setNewContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const sampleImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
  ];

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newContent.trim() && !imageUrl) return;

    createPost(newContent, imageUrl || null);
    setNewContent('');
    setImageUrl('');
    setShowImageInput(false);
  };

  const handleAddComment = (postId) => {
    if (!commentInput.trim()) return;
    addCommentToPost(postId, commentInput);
    setCommentInput('');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 max-w-4xl mx-auto w-full">
      {/* Create New Post Card */}
      <div className="bg-[#eef2f7] rounded-3xl p-5 md:p-6 neu-card border border-white/60">
        <div className="flex items-start gap-3.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
          />

          <form onSubmit={handleSubmitPost} className="flex-1 space-y-3">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={`What's on your mind, ${currentUser.name}?`}
              rows={3}
              className="w-full p-3.5 text-sm bg-[#eef2f7] text-slate-800 placeholder-slate-400 rounded-2xl neu-inset border-none outline-none focus:ring-1 focus:ring-blue-400 resize-none"
            />

            {showImageInput && (
              <div className="p-3 bg-[#e8ecf2] rounded-2xl space-y-2 neu-inset">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste an image URL..."
                  className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 outline-none"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">Or pick sample:</span>
                  {sampleImages.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(src)}
                      className="w-7 h-7 rounded-lg overflow-hidden border hover:border-blue-500"
                    >
                      <img src={src} alt="sample" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold neu-button ${
                  showImageInput ? 'text-blue-600 bg-white' : 'text-slate-600'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span>Add Photo</span>
              </button>

              <button
                type="submit"
                disabled={!newContent.trim() && !imageUrl}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#1d8cf8] to-[#0066eb] text-white text-xs font-bold shadow-[0_4px_14px_rgba(29,140,248,0.4)] hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Posts Timeline */}
      <div className="space-y-5">
        {posts.map((post) => {
          const isCommentsOpen = activeCommentPostId === post.id;

          return (
            <article
              key={post.id}
              className="bg-[#eef2f7] rounded-3xl p-5 md:p-6 neu-card border border-white/60 space-y-4"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-800">{post.author.name}</h4>
                      {post.author.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {post.author.username} • {post.createdAt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Body Content */}
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-blue-600 bg-blue-50/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Attached Image (if any) */}
              {post.image && (
                <div className="rounded-2xl overflow-hidden shadow-inner max-h-[420px] bg-slate-100">
                  <img
                    src={post.image}
                    alt="post media"
                    className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
              )}

              {/* Action Buttons: Like, Comment, Share */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold neu-button transition-all ${
                      post.userLiked ? 'text-rose-500 bg-white' : 'text-slate-600'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        post.userLiked ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() =>
                      setActiveCommentPostId(isCommentsOpen ? null : post.id)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold neu-button text-slate-600"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span>{post.comments ? post.comments.length : 0}</span>
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => alert(`Post shared to your clipboard!`)}
                  className="w-8 h-8 rounded-full neu-button flex items-center justify-center text-slate-500 hover:text-slate-700"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Comments Section Drawer */}
              {isCommentsOpen && (
                <div className="pt-3 border-t border-slate-200/80 space-y-3 animate-in fade-in duration-200">
                  {/* Existing comments */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-2.5 bg-[#e8ecf2] rounded-xl text-xs space-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800">{comment.author}</span>
                            <span className="text-[10px] text-slate-400">{comment.time}</span>
                          </div>
                          <p className="text-slate-600">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-2">
                        No comments yet. Be the first to reply!
                      </p>
                    )}
                  </div>

                  {/* Add comment input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3.5 py-2 text-xs bg-[#eef2f7] rounded-full neu-inset outline-none text-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddComment(post.id)}
                      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
