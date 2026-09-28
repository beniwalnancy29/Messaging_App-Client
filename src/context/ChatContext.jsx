import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialContacts } from '../mock/contacts';
import { soundFX } from '../utils/sound';
import { getSocket, initSocket, disconnectSocket } from '../services/socket';
import { authAPI, userAPI, messageAPI } from '../services/api';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : {
      id: 'current-user-id',
      username: 'User',
      email: 'user@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'online',
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isDemoMode, setIsDemoMode] = useState(!localStorage.getItem('token'));
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContactId, setActiveContactId] = useState('user-sarah');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread' | 'mentions'
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // Initialize socket when token changes
  useEffect(() => {
    if (token && !isDemoMode) {
      const socket = initSocket(token);

      socket.on('connect', () => setSocketConnected(true));
      socket.on('disconnect', () => setSocketConnected(false));

      socket.on('new-message', (incomingMsg) => {
        handleIncomingMessage(incomingMsg);
      });

      socket.on('user-status', ({ userId, status }) => {
        setContacts(prev => prev.map(c => c.id === userId ? { ...c, status } : c));
      });

      socket.on('user-typing', ({ userId }) => {
        if (userId === activeContactId) {
          setIsTyping(true);
        }
      });

      socket.on('user-stop-typing', ({ userId }) => {
        if (userId === activeContactId) {
          setIsTyping(false);
        }
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [token, isDemoMode, activeContactId]);

  // Sync sound setting
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  // Active contact object
  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  // Total mentions count for the glowing tab badge (defaults to 4 to match reference image)
  const totalMentionsCount = 4;

  // Filter contacts by activeTab and searchQuery
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeTab === 'unread') {
      return contact.unreadCount > 0;
    }
    if (activeTab === 'mentions') {
      return contact.hasMentions || contact.mentionCount > 0;
    }
    return true;
  });

  const selectContact = (contactId) => {
    setActiveContactId(contactId);
    // Clear unread count for this contact
    setContacts(prev => prev.map(c => {
      if (c.id === contactId) {
        return { ...c, unreadCount: 0, hasMentions: false, mentionCount: 0 };
      }
      return c;
    }));
  };

  const handleIncomingMessage = (msg) => {
    const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
    const formatted = {
      id: msg._id || 'msg-' + Date.now(),
      sender: 'contact',
      senderName: typeof msg.sender === 'object' ? msg.sender.username : 'Friend',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString(),
      text: msg.content || msg.text,
    };

    setContacts(prev => prev.map(c => {
      if (c.id === senderId) {
        return {
          ...c,
          messages: [...(c.messages || []), formatted],
          unreadCount: c.id === activeContactId ? 0 : c.unreadCount + 1,
        };
      }
      return c;
    }));

    soundFX.playReceive();
  };

  const sendMessage = async (text) => {
    if (!text || !text.trim()) return;

    const trimmed = text.trim();
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      senderName: currentUser.username || 'User',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString(),
      text: trimmed,
    };

    // Optimistically update conversation
    setContacts(prev => prev.map(c => {
      if (c.id === activeContactId) {
        return {
          ...c,
          messages: [...(c.messages || []), newMsg],
        };
      }
      return c;
    }));

    soundFX.playSend();

    // If connected to live backend
    const socket = getSocket();
    if (socket && socket.connected && !isDemoMode) {
      socket.emit('send-message', {
        receiverId: activeContactId,
        content: trimmed,
      });
    } else {
      // In interactive demo mode: simulate realistic conversational replies!
      simulateDemoReply(activeContactId, trimmed);
    }
  };

  const simulateDemoReply = (contactId, userMessage) => {
    setIsTyping(true);

    const contact = contacts.find(c => c.id === contactId);
    const contactName = contact ? contact.name : 'Sarah K.';

    setTimeout(() => {
      setIsTyping(false);

      let replyText = "Got it! That looks super clean and sleek.";
      const lower = userMessage.toLowerCase();
      if (lower.includes('hello') || lower.includes('hi')) {
        replyText = `Hey there! How's the new messaging design coming along?`;
      } else if (lower.includes('color') || lower.includes('palette') || lower.includes('design')) {
        replyText = "The soft neumorphic depth and glowing badges look phenomenal!";
      } else if (lower.includes('later') || lower.includes('sync') || lower.includes('call')) {
        replyText = "Sounds good, let's catch up on a quick call later today 🚀";
      } else {
        const replies = [
          "That sounds like a great plan!",
          "I totally agree. Let's move forward with this approach.",
          "Awesome, I just tested it and the animations feel silky smooth.",
          "Perfect! Let me review the details and get back to you shortly.",
          "Love this aesthetic. The soft floating bubbles look very tactile!"
        ];
        replyText = replies[Math.floor(Math.random() * replies.length)];
      }

      const replyMsg = {
        id: 'msg-' + Date.now(),
        sender: 'contact',
        senderName: contactName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString(),
        text: replyText,
      };

      setContacts(prev => prev.map(c => {
        if (c.id === contactId) {
          return {
            ...c,
            messages: [...(c.messages || []), replyMsg],
          };
        }
        return c;
      }));

      soundFX.playReceive();
    }, 1800);
  };

  const loginSuccess = (user, token) => {
    setCurrentUser(user);
    setToken(token);
    setIsDemoMode(false);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setIsAuthOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setToken(null);
    setIsDemoMode(true);
    setCurrentUser({
      id: 'current-user-id',
      username: 'User',
      email: 'user@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'online',
    });
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        token,
        isDemoMode,
        setIsDemoMode,
        contacts,
        setContacts,
        activeContact,
        activeContactId,
        selectContact,
        activeTab,
        setActiveTab,
        totalMentionsCount,
        searchQuery,
        setSearchQuery,
        filteredContacts,
        sendMessage,
        isTyping,
        soundEnabled,
        setSoundEnabled,
        isAuthOpen,
        setIsAuthOpen,
        isNewChatOpen,
        setIsNewChatOpen,
        isProfileOpen,
        setIsProfileOpen,
        socketConnected,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
