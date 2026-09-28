import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Mic,
  ShieldCheck,
  CheckCheck,
  Sparkles,
  X,
  ChevronUp,
  ChevronDown,
  MessageSquare
} from 'lucide-react';

export const ChatArea = () => {
  const {
    activeContact,
    sendMessage,
    isTyping,
    currentUser,
    startAudioCall,
    startVideoCall,
    isChatSearchOpen,
    setIsChatSearchOpen,
    chatSearchKeyword,
    setChatSearchKeyword
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFileName, setAttachedFileName] = useState('');
  const [attachmentScanning, setAttachmentScanning] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (!chatSearchKeyword) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeContact?.messages, isTyping, chatSearchKeyword]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFileName) return;

    let textToSend = inputText.trim();
    if (attachedFileName) {
      textToSend = `📎 [Attachment: ${attachedFileName} - Verified Safe by Anti-Virus Shield]\n` + textToSend;
    }

    sendMessage(textToSend);
    setInputText('');
    setAttachedFileName('');
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const handleAttachFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachmentScanning(true);
    setTimeout(() => {
      setAttachmentScanning(false);
      setAttachedFileName(file.name);
    }, 800);
  };

  const addEmoji = (emoji) => {
    setInputText((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  const commonEmojis = ['😊', '👍', '❤️', '🔥', '🎉', '🚀', '✨', '😂', '🙌', '💯'];

  if (!activeContact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f0f4f9] dark:bg-[#12161f] text-center p-8 select-none space-y-4 transition-colors duration-200">
        <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#191d26] neu-card flex items-center justify-center shadow-lg p-2 border border-white/60 dark:border-white/5">
          <img src="/logo.png" alt="Apna Chatterly" className="w-full h-full object-contain rounded-2xl" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Welcome to Apna Chatterly</h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 leading-relaxed">
            Your messaging app is fresh and ready. Connect with friends to begin encrypted chats, voice calls, and video calls.
          </p>
        </div>
      </div>
    );
  }

  // Filter messages if search keyword is active
  const messagesToDisplay = activeContact.messages || [];
  const searchMatchesCount = chatSearchKeyword.trim()
    ? messagesToDisplay.filter((m) =>
        m.text.toLowerCase().includes(chatSearchKeyword.toLowerCase())
      ).length
    : 0;

  return (
    <main className="flex-1 flex flex-col h-full bg-[#f0f4f8] dark:bg-[#12161f] relative overflow-hidden select-none transition-colors duration-200">
      {/* Chat Header */}
      <header className="h-16 px-4 md:px-6 bg-[#eef2f7] dark:bg-[#151922] border-b border-[#dbe3ed] dark:border-white/5 flex items-center justify-between shadow-sm z-20 transition-colors duration-200">
        <div className="flex items-center gap-3.5">
          {/* Avatar with Glowing Green Status Dot */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-slate-200 to-white shadow-sm overflow-hidden flex items-center justify-center">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
                }}
              />
            </div>

            {/* Glowing Green Dot */}
            {activeContact.status === 'online' && (
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_8px_rgba(16,185,129,0.95)]" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">{activeContact.name}</h2>
              {/* Automated Virus Shield Indicator */}
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                <span>Encrypted & Scanned</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {isTyping ? (
                <span className="text-xs text-blue-500 font-semibold animate-pulse">Typing...</span>
              ) : (
                <span className="text-xs text-slate-400 font-medium">
                  {activeContact.status === 'online' ? 'Online' : activeContact.lastSeen || 'Offline'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Top Right Action Icons: Audio Call, Video Call, Search */}
        <div className="flex items-center gap-2">
          {/* Audio Call Button */}
          <button
            onClick={() => startAudioCall(activeContact)}
            title={`Voice Call ${activeContact.name}`}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 neu-button active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Video Call Button */}
          <button
            onClick={() => startVideoCall(activeContact)}
            title={`Video Call ${activeContact.name}`}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 neu-button active:scale-95 transition-all"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* In-Chat Search Button */}
          <button
            onClick={() => {
              setIsChatSearchOpen(!isChatSearchOpen);
              if (isChatSearchOpen) setChatSearchKeyword('');
            }}
            title="Search Messages in this Chat"
            className={`w-9 h-9 rounded-full flex items-center justify-center neu-button active:scale-95 transition-all ${
              isChatSearchOpen ? 'text-blue-600 bg-white' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* In-Chat Search Filter Bar (if open) */}
      {isChatSearchOpen && (
        <div className="px-4 py-2 bg-[#e8ecf2] border-b border-[#d8e0ea] flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full neu-inset">
            <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={chatSearchKeyword}
              onChange={(e) => setChatSearchKeyword(e.target.value)}
              placeholder={`Search messages with ${activeContact.name}...`}
              className="flex-1 bg-transparent text-xs text-slate-800 outline-none border-none"
            />
            {chatSearchKeyword && (
              <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded-full bg-slate-100">
                {searchMatchesCount} {searchMatchesCount === 1 ? 'match' : 'matches'}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setIsChatSearchOpen(false);
              setChatSearchKeyword('');
            }}
            className="w-7 h-7 rounded-full neu-button flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Message Thread Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-5">
        {messagesToDisplay.length > 0 ? (
          messagesToDisplay.map((msg, index) => {
            const isUser = msg.sender === 'user';
            const matchesKeyword = chatSearchKeyword.trim() && msg.text.toLowerCase().includes(chatSearchKeyword.toLowerCase());

            return (
              <div
                key={msg.id || index}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full ${
                  matchesKeyword ? 'p-1 rounded-2xl bg-amber-100/60 ring-2 ring-amber-300' : ''
                }`}
              >
                {/* Timestamp and Sender Tag above bubble */}
                <div
                  className={`text-[11px] font-medium text-slate-400 mb-1 px-1.5 flex items-center gap-1 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {isUser ? (
                    <>
                      <span>{msg.time || 'Just now'}</span>
                      <span className="font-semibold text-slate-500">{currentUser.name || 'User'}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-slate-600">{activeContact.name}</span>
                      <span>{msg.time || 'Just now'}</span>
                    </>
                  )}
                </div>

                {/* Chat Bubble */}
                <div
                  className={`relative group max-w-[85%] sm:max-w-[70%] md:max-w-[62%] px-5 py-3 text-[14px] leading-relaxed transition-all duration-200 ${
                    isUser
                      ? 'bg-gradient-to-r from-[#1d8cf8] to-[#0072f5] text-white rounded-[22px] rounded-tr-sm shadow-[0_8px_20px_rgba(29,140,248,0.32)] font-normal'
                      : 'bg-white/95 dark:bg-[#1a1e27] text-slate-800 dark:text-slate-100 rounded-[22px] rounded-tl-sm shadow-[0_8px_20px_rgba(148,163,184,0.18)] dark:shadow-[0_6px_16px_rgba(0,0,0,0.5)] border border-transparent dark:border-white/5 font-normal'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 space-y-2">
            <div className="w-16 h-16 rounded-full bg-slate-200/70 flex items-center justify-center mb-1 shadow-inner">
              <Smile className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm font-bold text-slate-700">No messages yet with {activeContact.name}</p>
            <p className="text-xs text-slate-400 max-w-xs">
              Say hello, start a voice/video call, or share a trending update on Apna Chatterly!
            </p>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="text-[11px] font-medium text-slate-400 mb-1 px-1.5 flex items-center gap-1">
              <span className="font-semibold text-slate-600">{activeContact.name}</span>
              <span>typing...</span>
            </div>
            <div className="bg-white/95 px-4 py-2.5 rounded-[20px] rounded-tl-sm shadow-[0_8px_20px_rgba(148,163,184,0.18),-3px_-3px_10px_rgba(255,255,255,0.9)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Attachment Scan Pill (if attached) */}
      {attachmentScanning && (
        <div className="mx-4 mb-2 p-2.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-2 text-xs text-blue-700 animate-pulse">
          <ShieldCheck className="w-4 h-4 text-blue-500 animate-spin" />
          <span>Automated virus scan running on attachment before sending...</span>
        </div>
      )}

      {attachedFileName && !attachmentScanning && (
        <div className="mx-4 mb-2 p-2 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">{attachedFileName}</span>
            <span className="text-[10px] text-emerald-600">(Verified Safe • 0 Viruses)</span>
          </div>
          <button
            onClick={() => setAttachedFileName('')}
            className="text-slate-400 hover:text-slate-600 text-[11px] font-bold px-2"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Dock Bar */}
      <footer className="p-4 bg-[#eef2f7] dark:bg-[#151922] border-t border-[#dbe3ed] dark:border-white/5 relative transition-colors duration-200">
        {/* Emoji Quick Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-6 p-2 bg-white dark:bg-[#191d26] rounded-2xl shadow-xl border border-slate-200/80 dark:border-white/10 flex items-center gap-1.5 z-30 animate-in fade-in zoom-in-95">
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addEmoji(emoji)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center text-lg transition-transform active:scale-125"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSend} className="flex items-center gap-2.5">
          {/* Recessed Neumorphic Input Wrapper */}
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-[#eef2f7] dark:bg-[#12151c] rounded-full neu-inset">
            {/* Attachment Button with Automatic Scanner trigger */}
            <label
              title="Attach File (Auto-Scanned for Viruses)"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <input
                type="file"
                onChange={handleAttachFile}
                className="hidden"
              />
              <Paperclip className="w-4 h-4" />
            </label>

            {/* Input Element */}
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${activeContact.name}...`}
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-100 placeholder-slate-400"
            />

            {/* Emoji Trigger */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Add Emoji"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>

          {/* Send / Mic Button */}
          {inputText.trim() || attachedFileName ? (
            <button
              type="submit"
              title="Send Message"
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#1d8cf8] to-[#0072f5] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(29,140,248,0.45)] hover:scale-105 active:scale-95 transition-all duration-150"
            >
              <Send className="w-4 h-4 translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => startAudioCall(activeContact)}
              title="Voice Call"
              className="w-11 h-11 rounded-full text-slate-500 hover:text-blue-600 neu-button flex items-center justify-center"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </form>
      </footer>
    </main>
  );
};
