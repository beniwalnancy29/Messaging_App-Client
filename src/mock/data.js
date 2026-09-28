// Clean data for fresh Apna Chatterly app without dummy people or chats

export const initialPosts = [];

export const initialStories = [];

export const initialFriends = [];

export const initialFriendRequests = [];

export const initialDiscoverUsers = [
  {
    id: "user-zoe",
    name: "Zoe Patel",
    username: "@zoe_p",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    about: "Fullstack Developer • React & Rust",
    mutualFriends: 0
  },
  {
    id: "user-lucas",
    name: "Lucas Gray",
    username: "@lucas_g",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    about: "Mobile App Architect & Flutter Fanatic",
    mutualFriends: 0
  },
  {
    id: "user-elena",
    name: "Elena Rostova",
    username: "@elena_ux",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    about: "UX Strategist & Design Systems Speaker",
    mutualFriends: 0
  }
];

export const initialTrendingNews = [
  {
    id: "news-1",
    category: "Technology & AI",
    badgeColor: "bg-blue-500",
    title: "Breakthrough in Low-Latency Neural Networks Announced",
    summary: "Researchers unveil next-generation transformer quantization that reduces local AI inference power by 64% while maintaining sub-10ms response times.",
    source: "TechVision Daily",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    publishedAt: "25 mins ago",
    sharesCount: 312,
    reactions: { likes: 184, reads: 940 }
  },
  {
    id: "news-2",
    category: "Cybersecurity",
    badgeColor: "bg-emerald-500",
    title: "Global Antivirus Consortium Adopts Real-Time AI Zero-Day Shielding",
    summary: "New industry standard for automatic file and attachment scanning prevents stealth payloads before they reach user devices or chat channels.",
    source: "CyberDefense Weekly",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    publishedAt: "1 hour ago",
    sharesCount: 520,
    reactions: { likes: 290, reads: 1420 }
  },
  {
    id: "news-3",
    category: "Web & Mobile",
    badgeColor: "bg-purple-500",
    title: "Soft UI & Neumorphism Surge in 2026 Mobile Interfaces",
    summary: "Tactile depth, subtle directional shadows, and glowing accent badges lead modern design trends as users demand calm and tactile digital experiences.",
    source: "Design Trends Global",
    readTime: "2 min read",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    publishedAt: "2 hours ago",
    sharesCount: 840,
    reactions: { likes: 512, reads: 2310 }
  },
  {
    id: "news-4",
    category: "Global Space",
    badgeColor: "bg-amber-500",
    title: "Deep Space Telescope Detects Unprecedented Aurora Formations",
    summary: "High-resolution orbital spectroscopic data confirms atmospheric plasma storms on exoplanet Kepler-186f.",
    source: "Cosmos Chronicle",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    publishedAt: "4 hours ago",
    sharesCount: 428,
    reactions: { likes: 341, reads: 1890 }
  }
];
