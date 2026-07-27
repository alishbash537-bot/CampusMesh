import React from 'react';
import { ActiveView } from '../types';

interface BottomNavProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  // Hide bottom nav on full login or register screens if preferred
  if (activeView === 'login' || activeView === 'register') {
    return null;
  }

  const isHome = activeView === 'home';
  const isChat = activeView === 'chat' || activeView === 'direct-chat';
  const isMap = activeView === 'map';
  const isAlerts = activeView === 'alerts' || activeView === 'emergency';
  const isProfile = activeView === 'profile';

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-[#f7f9fb] border-t border-outline-variant shadow-lg z-50 h-16">
      {/* Home */}
      <button 
        onClick={() => setActiveView('home')}
        className={`flex flex-col items-center justify-center transition-all duration-150 ${
          isHome 
            ? 'bg-[#90efef] text-[#006e6e] rounded-full px-4 py-1 scale-105 font-bold' 
            : 'text-[#424654] hover:bg-surface-variant/50 px-3 py-1 rounded-lg'
        }`}
      >
        <span className={`material-symbols-outlined ${isHome ? 'fill-1' : ''}`}>home</span>
        <span className="font-label text-xs">Home</span>
      </button>

      {/* Chat */}
      <button 
        onClick={() => setActiveView('chat')}
        className={`flex flex-col items-center justify-center transition-all duration-150 ${
          isChat 
            ? 'bg-[#90efef] text-[#006e6e] rounded-full px-4 py-1 scale-105 font-bold' 
            : 'text-[#424654] hover:bg-surface-variant/50 px-3 py-1 rounded-lg'
        }`}
      >
        <span className={`material-symbols-outlined ${isChat ? 'fill-1' : ''}`}>chat_bubble</span>
        <span className="font-label text-xs">Chat</span>
      </button>

      {/* Map */}
      <button 
        onClick={() => setActiveView('map')}
        className={`flex flex-col items-center justify-center transition-all duration-150 ${
          isMap 
            ? 'bg-[#90efef] text-[#006e6e] rounded-full px-4 py-1 scale-105 font-bold' 
            : 'text-[#424654] hover:bg-surface-variant/50 px-3 py-1 rounded-lg'
        }`}
      >
        <span className={`material-symbols-outlined ${isMap ? 'fill-1' : ''}`}>map</span>
        <span className="font-label text-xs">Map</span>
      </button>

      {/* Alerts */}
      <button 
        onClick={() => setActiveView('alerts')}
        className={`flex flex-col items-center justify-center transition-all duration-150 ${
          isAlerts 
            ? 'bg-[#90efef] text-[#006e6e] rounded-full px-4 py-1 scale-105 font-bold' 
            : 'text-[#424654] hover:bg-surface-variant/50 px-3 py-1 rounded-lg'
        }`}
      >
        <span className={`material-symbols-outlined ${isAlerts ? 'fill-1' : ''}`}>notifications_active</span>
        <span className="font-label text-xs">Alerts</span>
      </button>

      {/* Profile */}
      <button 
        onClick={() => setActiveView('profile')}
        className={`flex flex-col items-center justify-center transition-all duration-150 ${
          isProfile 
            ? 'bg-[#90efef] text-[#006e6e] rounded-full px-4 py-1 scale-105 font-bold' 
            : 'text-[#424654] hover:bg-surface-variant/50 px-3 py-1 rounded-lg'
        }`}
      >
        <span className={`material-symbols-outlined ${isProfile ? 'fill-1' : ''}`}>person</span>
        <span className="font-label text-xs">Profile</span>
      </button>
    </nav>
  );
};
