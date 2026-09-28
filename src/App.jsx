import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NavigationDock } from './components/NavigationDock';
import { HeaderBar } from './components/HeaderBar';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { FeedView } from './components/FeedView';
import { StatusView } from './components/StatusView';
import { FriendsView } from './components/FriendsView';
import { TrendingNewsView } from './components/TrendingNewsView';
import { VirusScannerView } from './components/VirusScannerView';
import { SettingsModal } from './components/SettingsModal';
import { CreateAccountModal } from './components/CreateAccountModal';
import { CallModal } from './components/CallModal';
import { ArrowLeft } from 'lucide-react';

const MainLayout = () => {
  const { activeNav } = useApp();
  const [mobileChatView, setMobileChatView] = useState('list'); // 'list' | 'chat'

  const handleContactSelect = () => {
    setMobileChatView('chat');
  };

  return (
    <div className="min-h-screen w-full bg-[#e8ecf2] dark:bg-[#0c0e13] flex items-center justify-center p-0 md:p-6 lg:p-8 transition-colors duration-200">
      {/* Outer Tactile Neumorphic Shell Frame */}
      <div className="w-full max-w-[1440px] h-screen md:h-[94vh] max-h-[980px] bg-[#eef2f7] dark:bg-[#151922] md:rounded-[36px] overflow-hidden flex flex-row shadow-[0_22px_55px_rgba(148,163,184,0.38),-12px_-12px_32px_rgba(255,255,255,0.95)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.75),-8px_-8px_25px_rgba(255,255,255,0.025)] border border-white/70 dark:border-white/5 relative transition-colors duration-200">
        {/* Left Navigation Dock (Apna Chatterly Branded) */}
        <NavigationDock />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Header Bar */}
          <HeaderBar />

          {/* Dynamic Content Views */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Chats View */}
            {activeNav === 'chats' && (
              <div className="flex-1 flex h-full w-full overflow-hidden">
                {/* Mobile back navigation button if in chat */}
                <div className="md:hidden absolute top-2 left-2 z-30">
                  {mobileChatView === 'chat' && (
                    <button
                      onClick={() => setMobileChatView('list')}
                      className="px-3 py-1.5 rounded-full neu-button text-xs font-bold text-slate-700 flex items-center gap-1 bg-white/90"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Chats</span>
                    </button>
                  )}
                </div>

                <div className={`${mobileChatView === 'chat' ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}>
                  <Sidebar onContactClick={handleContactSelect} />
                </div>

                <div className={`${mobileChatView === 'list' ? 'hidden md:flex' : 'flex'} flex-1 h-full`}>
                  <ChatArea />
                </div>
              </div>
            )}

            {/* Social Posts Feed View */}
            {activeNav === 'feed' && <FeedView />}

            {/* Status / Stories View */}
            {activeNav === 'status' && <StatusView />}

            {/* Friends & Connections View */}
            {activeNav === 'friends' && <FriendsView />}

            {/* Trending News View */}
            {activeNav === 'news' && <TrendingNewsView />}

            {/* Virus & Malware Security Scanner View */}
            {activeNav === 'security' && <VirusScannerView />}

            {/* Settings & Account Privacy View */}
            {activeNav === 'settings' && <SettingsModal />}
          </div>
        </div>

        {/* Global Modals */}
        <CreateAccountModal />
        <CallModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
