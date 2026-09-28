import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialContacts } from '../mock/contacts';
import { initialPosts, initialStories, initialFriends, initialFriendRequests, initialDiscoverUsers, initialTrendingNews } from '../mock/data';
import { soundFX } from '../utils/sound';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Navigation: 'chats' | 'feed' | 'status' | 'friends' | 'news' | 'security' | 'settings'
  const [activeNav, setActiveNav] = useState('chats');

  // User Account & Privacy
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('chatterly_user');
    return saved ? JSON.parse(saved) : {
      id: 'user-me',
      name: 'Beniwal Nancy',
      username: '@nancy_b',
      email: 'nancy@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Chatting on Apna Chatterly ✨',
      isPrivate: false,
      status: 'online',
    };
  });

  const [accountPrivacy, setAccountPrivacy] = useState(() => {
    return localStorage.getItem('account_privacy') || 'public';
  });

  const [lastSeenPrivacy, setLastSeenPrivacy] = useState('everyone');
  const [readReceipts, setReadReceipts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Theme (Dark / Light Mode) & Eye Protection Mode
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('chatterly_theme') || 'light';
  });

  const [eyeProtection, setEyeProtection] = useState(() => {
    return localStorage.getItem('chatterly_eye_protection') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('chatterly_theme', themeMode);
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('chatterly_eye_protection', eyeProtection.toString());
    if (eyeProtection) {
      document.documentElement.classList.add('eye-shield-active');
    } else {
      document.documentElement.classList.remove('eye-shield-active');
    }
  }, [eyeProtection]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    soundFX.playSend();
  };

  const toggleEyeProtection = () => {
    setEyeProtection((prev) => !prev);
    soundFX.playReceive();
  };

  // Modals
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);
  const [isShareNewsOpen, setIsShareNewsOpen] = useState(false);
  const [selectedNewsToShare, setSelectedNewsToShare] = useState(null);

  // Audio / Video Call States
  const [activeCall, setActiveCall] = useState(null); // { type: 'audio' | 'video', contact }
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // In-chat Message Search state
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  const [chatSearchKeyword, setChatSearchKeyword] = useState('');

  // Network State & Refresh
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [latencyMs, setLatencyMs] = useState(32);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotification, setRefreshNotification] = useState('');

  // Virus & Security State
  const [virusScanStatus, setVirusScanStatus] = useState('clean');
  const [autoScanEnabled, setAutoScanEnabled] = useState(true);
  const [scannedFilesCount, setScannedFilesCount] = useState(156);
  const [threatsDetected, setThreatsDetected] = useState(0);
  const [scanProgress, setScanProgress] = useState(100);
  const [lastScanTime, setLastScanTime] = useState('Just now');
  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, type: 'info', message: 'Apna Chatterly automated security engine initialized', time: '10:00 AM' },
    { id: 2, type: 'safe', message: 'Auto-scan verified: 0 malicious scripts found', time: '10:45 AM' },
    { id: 3, type: 'safe', message: 'Voice & Video call end-to-end encryption verified', time: '11:12 AM' }
  ]);

  // Posts Feed
  const [posts, setPosts] = useState(initialPosts);

  // Stories
  const [stories, setStories] = useState(initialStories);

  // Friends & Requests
  const [friends, setFriends] = useState(initialFriends);
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [discoverUsers, setDiscoverUsers] = useState(initialDiscoverUsers);

  // Trending News
  const [trendingNews, setTrendingNews] = useState(initialTrendingNews);

  // Clean Contacts (Empty initial state)
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContactId, setActiveContactId] = useState(null);
  const [chatFilterTab, setChatFilterTab] = useState('all');
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Sync online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLatencyMs(Math.floor(25 + Math.random() * 15));
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync sound
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  // Save user changes
  useEffect(() => {
    localStorage.setItem('chatterly_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Save privacy changes
  useEffect(() => {
    localStorage.setItem('account_privacy', accountPrivacy);
    setCurrentUser(prev => ({ ...prev, isPrivate: accountPrivacy === 'private' }));
  }, [accountPrivacy]);

  // Call Actions
  const startAudioCall = (contact) => {
    setActiveCall({ type: 'audio', contact });
    soundFX.playSend();
  };

  const startVideoCall = (contact) => {
    setActiveCall({ type: 'video', contact });
    soundFX.playSend();
  };

  const endCall = () => {
    setActiveCall(null);
    setIsMicMuted(false);
    setIsCameraOff(false);
    soundFX.playSend();
  };

  // Network Refresh Action
  const refreshApp = () => {
    setIsRefreshing(true);
    soundFX.playSend();

    setTimeout(() => {
      const newLatency = Math.floor(20 + Math.random() * 18);
      setLatencyMs(newLatency);
      setIsRefreshing(false);
      setLastScanTime('Just now');
      setScannedFilesCount(prev => prev + 2);
      setRefreshNotification('Apna Chatterly re-synced & connection refreshed!');
      soundFX.playReceive();

      setTimeout(() => setRefreshNotification(''), 3000);
    }, 1200);
  };

  // Run Deep Virus Scan
  const runDeepVirusScan = () => {
    setVirusScanStatus('scanning');
    setScanProgress(10);
    soundFX.playSend();

    let p = 10;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setVirusScanStatus('clean');
        setScannedFilesCount(prev => prev + 28);
        setLastScanTime('Just now');
        setSecurityLogs(prev => [
          {
            id: Date.now(),
            type: 'safe',
            message: `Deep System Scan completed: 0 threats detected, all modules secure.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          ...prev
        ]);
        soundFX.playReceive();
      } else {
        setScanProgress(p);
      }
    }, 300);
  };

  // Post Actions
  const createPost = (content, image = null, tags = []) => {
    if (!content.trim() && !image) return;

    const newPost = {
      id: 'post-' + Date.now(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        verified: true
      },
      content,
      image,
      tags: tags.length ? tags : ['#ApnaChatterly', '#Social'],
      createdAt: 'Just now',
      likes: 0,
      userLiked: false,
      comments: []
    };

    setPosts([newPost, ...posts]);
    soundFX.playSend();
  };

  const toggleLikePost = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.userLiked;
        return {
          ...p,
          userLiked: isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
    soundFX.playSend();
  };

  const addCommentToPost = (postId, text) => {
    if (!text.trim()) return;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: 'c-' + Date.now(),
              author: currentUser.name,
              text: text.trim(),
              time: 'Just now'
            }
          ]
        };
      }
      return p;
    }));
    soundFX.playSend();
  };

  // Story / Status Actions
  const addStatusStory = (imageUrl, caption) => {
    const newStory = {
      id: 's-' + Date.now(),
      image: imageUrl || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      caption: caption || 'My status on Apna Chatterly ✨',
      time: 'Just now'
    };

    setStories(prev => {
      const myStoryIndex = prev.findIndex(s => s.userId === currentUser.id);
      if (myStoryIndex >= 0) {
        const updated = [...prev];
        updated[myStoryIndex].stories.unshift(newStory);
        return updated;
      } else {
        return [
          {
            id: 'story-' + Date.now(),
            userId: currentUser.id,
            userName: 'You',
            avatar: currentUser.avatar,
            hasUnseen: true,
            stories: [newStory]
          },
          ...prev
        ];
      }
    });

    setIsAddStoryOpen(false);
    soundFX.playSend();
  };

  // Friends Actions
  const sendFriendRequest = (user) => {
    setDiscoverUsers(prev => prev.filter(u => u.id !== user.id));
    soundFX.playSend();
    setRefreshNotification(`Friend request sent to ${user.name}!`);
    setTimeout(() => setRefreshNotification(''), 2500);
  };

  const acceptFriendRequest = (req) => {
    setFriendRequests(prev => prev.filter(r => r.id !== req.id));
    const newFriend = {
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      avatar: req.user.avatar,
      status: 'online',
      about: req.user.about,
      isFriend: true,
      mutualFriends: req.user.mutualFriends || 1
    };
    setFriends(prev => [newFriend, ...prev]);

    const newContact = {
      id: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      status: 'online',
      lastSeen: 'Online',
      unreadCount: 0,
      badgeType: 'none',
      isGroup: false,
      about: req.user.about,
      messages: []
    };
    setContacts(prev => [newContact, ...prev]);
    soundFX.playReceive();
    setRefreshNotification(`You and ${req.user.name} are now friends on Apna Chatterly!`);
    setTimeout(() => setRefreshNotification(''), 2500);
  };

  const removeFriend = (friendId) => {
    setFriends(prev => prev.filter(f => f.id !== friendId));
  };

  // Share News into Friend Chat
  const shareNewsToChat = (newsItem, friendContactId) => {
    const contact = contacts.find(c => c.id === friendContactId);
    if (!contact) return;

    const shareMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      senderName: currentUser.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `📰 Shared Trending News:\n*${newsItem.title}*\n"${newsItem.summary}"\n\nSource: ${newsItem.source}`
    };

    setContacts(prev => prev.map(c => {
      if (c.id === friendContactId) {
        return {
          ...c,
          messages: [...(c.messages || []), shareMsg]
        };
      }
      return c;
    }));

    setActiveContactId(friendContactId);
    setActiveNav('chats');
    setIsShareNewsOpen(false);
    soundFX.playSend();
    setRefreshNotification(`Article shared to ${contact.name}'s chat!`);
    setTimeout(() => setRefreshNotification(''), 2500);
  };

  // Fresh Account Registration
  const registerFreshAccount = ({ name, username, email, bio, avatar, isPrivate }) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      username: username.startsWith('@') ? username : `@${username}`,
      email,
      bio: bio || 'Chatting on Apna Chatterly 💫',
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      isPrivate: !!isPrivate,
      status: 'online'
    };

    setCurrentUser(newUser);
    setAccountPrivacy(isPrivate ? 'private' : 'public');
    setIsCreateAccountOpen(false);
    soundFX.playReceive();
    setRefreshNotification(`Welcome to Apna Chatterly, ${name}!`);
    setTimeout(() => setRefreshNotification(''), 3000);
  };

  // Active contact & Messaging
  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0] || null;

  const selectContact = (id) => {
    setActiveContactId(id);
    setContacts(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
  };

  const sendMessage = (text) => {
    if (!text || !text.trim()) return;

    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      senderName: currentUser.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim()
    };

    setContacts(prev => prev.map(c => {
      if (c.id === activeContactId) {
        return {
          ...c,
          messages: [...(c.messages || []), newMsg]
        };
      }
      return c;
    }));

    soundFX.playSend();
    setScannedFilesCount(prev => prev + 1);

    // Simulated responsive reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Hey! Great connecting on Apna Chatterly!",
        "Thanks for the message! How are you doing today?",
        "Sounds like a great plan. Let's catch up soon.",
        "Got it! I've reviewed the update, looks solid.",
        "Love the new Apna Chatterly interface, feels super fast!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const replyMsg = {
        id: 'msg-' + Date.now(),
        sender: 'contact',
        senderName: activeContact ? activeContact.name : 'Sarah K.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: randomResponse
      };

      setContacts(prev => prev.map(c => {
        if (c.id === activeContactId) {
          return {
            ...c,
            messages: [...(c.messages || []), replyMsg]
          };
        }
        return c;
      }));

      soundFX.playReceive();
      setScannedFilesCount(prev => prev + 1);
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        // Nav
        activeNav,
        setActiveNav,

        // User & Privacy
        currentUser,
        setCurrentUser,
        accountPrivacy,
        setAccountPrivacy,
        lastSeenPrivacy,
        setLastSeenPrivacy,
        readReceipts,
        setReadReceipts,
        soundEnabled,
        setSoundEnabled,
        registerFreshAccount,

        // Theme & Eye Protection
        themeMode,
        toggleTheme,
        eyeProtection,
        toggleEyeProtection,

        // Calls
        activeCall,
        startAudioCall,
        startVideoCall,
        endCall,
        isMicMuted,
        setIsMicMuted,
        isCameraOff,
        setIsCameraOff,

        // In-chat Search
        isChatSearchOpen,
        setIsChatSearchOpen,
        chatSearchKeyword,
        setChatSearchKeyword,

        // Network
        isOnline,
        latencyMs,
        isRefreshing,
        refreshApp,
        refreshNotification,

        // Security / Virus
        virusScanStatus,
        autoScanEnabled,
        setAutoScanEnabled,
        scannedFilesCount,
        threatsDetected,
        scanProgress,
        lastScanTime,
        securityLogs,
        runDeepVirusScan,

        // Posts
        posts,
        createPost,
        toggleLikePost,
        addCommentToPost,

        // Stories
        stories,
        selectedStoryIndex,
        setSelectedStoryIndex,
        isStoryViewerOpen,
        setIsStoryViewerOpen,
        isAddStoryOpen,
        setIsAddStoryOpen,
        addStatusStory,

        // Friends
        friends,
        friendRequests,
        discoverUsers,
        sendFriendRequest,
        acceptFriendRequest,
        removeFriend,

        // Trending News
        trendingNews,
        isShareNewsOpen,
        setIsShareNewsOpen,
        selectedNewsToShare,
        setSelectedNewsToShare,
        shareNewsToChat,

        // Chats
        contacts,
        activeContact,
        activeContactId,
        selectContact,
        chatFilterTab,
        setChatFilterTab,
        chatSearchQuery,
        setChatSearchQuery,
        sendMessage,
        isTyping,

        // Modals
        isCreateAccountOpen,
        setIsCreateAccountOpen,
        isSettingsOpen,
        setIsSettingsOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
