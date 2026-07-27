import React from 'react';
import { ActiveView, ChatThread, UserProfile } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  user: UserProfile;
  selectedThread?: ChatThread;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, user, selectedThread }) => {
  // If view is direct-chat or assistant, show custom back header
  if (activeView === 'direct-chat') {
    const title = selectedThread?.name || 'Direct Chat';
    const avatar = selectedThread?.avatar;
    const icon = selectedThread?.icon || (selectedThread?.isGroup ? 'groups' : 'person');

    return (
      <header className="bg-surface/80 backdrop-blur-md text-primary shadow-sm border-b border-outline-variant sticky top-0 z-50 flex justify-between items-center px-4 h-14 w-full">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveView('chat')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-100"
            aria-label="Back to chats"
          >
            <span className="material-symbols-outlined text-[#0040a1]">arrow_back</span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('chat')}>
            {avatar ? (
              <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden border border-outline-variant shrink-0">
                <img 
                  src={avatar} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#0056d2] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-xl">{icon}</span>
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-sm font-bold leading-tight text-[#0040a1] truncate max-w-[160px] sm:max-w-[240px]">
                {title}
              </span>
              <span className="font-label text-xs text-[#006a6a] flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#006a6a]"></span>
                {selectedThread?.isGroup ? 'Mesh Group' : 'Mesh Active'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[#0040a1]">videocam</span>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[#0040a1]">call</span>
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined text-[#424654]">more_vert</span>
          </button>
        </div>
      </header>
    );
  }

  if (activeView === 'assistant') {
    return (
      <header className="bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant sticky top-0 z-50 flex justify-between items-center px-4 h-14 w-full">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-100"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[#424654]">arrow_back</span>
          </button>
          <div>
            <h1 className="font-headline text-base font-bold text-[#0040a1] leading-tight">Emergency AI Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#006a6a] rounded-full animate-pulse"></span>
              <span className="font-label text-xs text-[#424654]">Live Mesh Support</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-100"
          >
            <span className="material-symbols-outlined text-[#0040a1]">hub</span>
          </button>
        </div>
      </header>
    );
  }

  // Standard TopAppBar for Home, Chat List, Map, Alerts, Profile, Emergency Broadcast
  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-outline-variant flex justify-between items-center px-4 h-14 w-full">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
        <span className="material-symbols-outlined text-[#0040a1] text-2xl fill-1">hub</span>
        <h1 className="font-headline text-lg font-bold text-[#0040a1]">CampusMesh</h1>
      </div>

      <div className="flex items-center gap-3">
        {activeView === 'chat' ? (
          <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[#424654]">search</span>
          </button>
        ) : null}

        <div className="flex items-center bg-[#93f2f2]/30 text-[#004f4f] px-3 py-1 rounded-full gap-1.5 animate-network">
          <div className="w-2 h-2 bg-[#006a6a] rounded-full"></div>
          <span className="font-label text-xs font-semibold">Local-Mesh</span>
        </div>

        <span className="material-symbols-outlined text-[#0040a1]">signal_cellular_alt</span>

        {activeView === 'home' || activeView === 'map' || activeView === 'alerts' ? (
          <div 
            onClick={() => setActiveView('profile')}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-fixed cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        ) : null}
      </div>
    </header>
  );
};
