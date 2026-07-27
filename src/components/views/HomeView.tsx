import React, { useState } from 'react';
import { ActiveView, UserProfile } from '../../types';

interface HomeViewProps {
  setActiveView: (view: ActiveView) => void;
  user: UserProfile;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveView }) => {
  const [sosActive, setSosActive] = useState(false);

  const handleSosClick = () => {
    setActiveView('emergency');
  };

  return (
    <div className="px-4 pt-6 max-w-lg mx-auto pb-28">
      {/* Network Status Card */}
      <section className="mb-6">
        <div className="glass-card rounded-2xl p-6 shadow-sm relative overflow-hidden bg-white/90 border border-outline-variant">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-headline text-xl font-bold text-[#191c1e]">Network Status</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#006a6a] animate-pulse"></div>
                <span className="font-label text-sm text-[#006a6a] font-semibold">Active Mesh Mode</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label text-xs text-[#424654]">Signal Strength</span>
              <div className="flex gap-[3px] mt-1.5 items-end">
                <div className="w-1.5 h-3 bg-[#0040a1] rounded-full"></div>
                <div className="w-1.5 h-4 bg-[#0040a1] rounded-full"></div>
                <div className="w-1.5 h-5 bg-[#0040a1] rounded-full"></div>
                <div className="w-1.5 h-6 bg-[#c3c6d6] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-6 relative">
            <div className="w-48 h-48 rounded-full border-8 border-[#dae2ff] flex items-center justify-center relative shadow-inner">
              <div 
                className="absolute inset-0 rounded-full border-4 border-[#0040a1] border-t-transparent animate-spin" 
                style={{ animationDuration: '3s' }}
              ></div>
              <div className="text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-[#0040a1] text-5xl mb-1 fill-1">wifi_tethering</span>
                <p className="font-headline text-xl font-bold text-[#0040a1] block">Connected</p>
                <p className="font-label text-xs text-[#424654] mt-0.5">12 Nodes Nearby</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 border-t border-outline-variant pt-4">
            <div className="text-center">
              <p className="font-label text-xs text-[#424654]">Latency</p>
              <p className="font-label text-base font-bold text-[#191c1e]">24ms</p>
            </div>
            <div className="text-center border-l border-outline-variant">
              <p className="font-label text-xs text-[#424654]">Stability</p>
              <p className="font-label text-base font-bold text-[#191c1e]">99.2%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="mb-8">
        <h3 className="font-label text-xs font-bold text-[#424654] uppercase tracking-wider mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Chat */}
          <button 
            onClick={() => setActiveView('chat')}
            className="flex flex-col items-center gap-1.5 hover:bg-surface-variant/50 transition-all p-2 rounded-xl active:scale-95 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#dae2ff] flex items-center justify-center group-hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[#001847] text-2xl">chat_bubble</span>
            </div>
            <span className="font-label text-xs font-semibold text-[#191c1e]">Chat</span>
          </button>

          {/* Nearby Users */}
          <button 
            onClick={() => setActiveView('map')}
            className="flex flex-col items-center gap-1.5 hover:bg-surface-variant/50 transition-all p-2 rounded-xl active:scale-95 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#93f2f2] flex items-center justify-center group-hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[#002020] text-2xl">group</span>
            </div>
            <span className="font-label text-xs font-semibold text-[#191c1e]">Nearby</span>
          </button>

          {/* Emergency Alerts */}
          <button 
            onClick={() => setActiveView('alerts')}
            className="flex flex-col items-center gap-1.5 hover:bg-surface-variant/50 transition-all p-2 rounded-xl active:scale-95 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] flex items-center justify-center group-hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[#93000a] text-2xl fill-1">notifications_active</span>
            </div>
            <span className="font-label text-xs font-semibold text-[#191c1e]">Alerts</span>
          </button>

          {/* Campus Map */}
          <button 
            onClick={() => setActiveView('map')}
            className="flex flex-col items-center gap-1.5 hover:bg-surface-variant/50 transition-all p-2 rounded-xl active:scale-95 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e6e8ea] flex items-center justify-center group-hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[#0040a1] text-2xl">map</span>
            </div>
            <span className="font-label text-xs font-semibold text-[#191c1e]">Map</span>
          </button>

          {/* AI Assistant */}
          <button 
            onClick={() => setActiveView('assistant')}
            className="flex flex-col items-center gap-1.5 hover:bg-surface-variant/50 transition-all p-2 rounded-xl active:scale-95 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] flex items-center justify-center group-hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[#410003] text-2xl">smart_toy</span>
            </div>
            <span className="font-label text-xs font-semibold text-[#191c1e]">Assistant</span>
          </button>

          {/* Settings */}
          <button 
            onClick={() => setActiveView('profile')}
            className="flex flex-col items-center gap-1.5 hover:bg-surface-variant/50 transition-all p-2 rounded-xl active:scale-95 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e6e8ea] flex items-center justify-center group-hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[#424654] text-2xl">settings</span>
            </div>
            <span className="font-label text-xs font-semibold text-[#191c1e]">Settings</span>
          </button>
        </div>
      </section>

      {/* Active Announcements Section */}
      <section className="mb-6">
        <h3 className="font-label text-xs font-bold text-[#424654] uppercase tracking-wider mb-4">Active Announcements</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 glass-card rounded-2xl p-4 flex items-center gap-4 bg-white/90 border border-outline-variant shadow-sm">
            <div className="w-12 h-12 bg-[#0040a1]/10 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#0040a1]">campaign</span>
            </div>
            <div>
              <h4 className="font-label text-sm font-bold text-[#191c1e]">Main Library Maintenance</h4>
              <p className="font-label text-xs text-[#424654]">Closed for network upgrade until 4:00 PM.</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 flex flex-col gap-2 bg-white/90 border border-outline-variant shadow-sm">
            <span className="material-symbols-outlined text-[#006a6a]">local_hospital</span>
            <h4 className="font-label text-xs font-bold text-[#191c1e]">Health Center</h4>
            <p className="font-label text-[11px] text-[#424654]">Free masks available at the North entry.</p>
          </div>

          <div className="glass-card rounded-2xl p-4 flex flex-col gap-2 bg-white/90 border border-outline-variant shadow-sm">
            <span className="material-symbols-outlined text-[#940010]">restaurant</span>
            <h4 className="font-label text-xs font-bold text-[#191c1e]">Dining Hall</h4>
            <p className="font-label text-[11px] text-[#424654]">New menu options for the evening shift.</p>
          </div>
        </div>
      </section>

      {/* SOS Floating Action Button */}
      <button 
        onClick={handleSosClick}
        className="fixed bottom-20 right-6 w-16 h-16 rounded-full bg-[#ba1a1a] text-white shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-all duration-150 ring-4 ring-[#ba1a1a]/20 hover:bg-[#940010]"
        title="Emergency Broadcast (SOS)"
      >
        <span className="font-headline font-bold text-lg tracking-widest">SOS</span>
      </button>
    </div>
  );
};
