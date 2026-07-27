import React, { useState } from 'react';
import { ActiveView, UserProfile } from '../../types';

interface ProfileViewProps {
  setActiveView: (view: ActiveView) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ setActiveView, user, setUser }) => {
  const [relayMode, setRelayMode] = useState(true);
  const [bleEnabled, setBleEnabled] = useState(true);
  const [wifiDirect, setWifiDirect] = useState(true);
  const [storageLimit, setStorageLimit] = useState(50);

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    setActiveView('login');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 pb-28 space-y-6">
      {/* User Info Header Card */}
      <div className="bg-white border border-outline-variant rounded-3xl p-6 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#0040a1]/20 shadow-md mb-3">
          <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="font-headline text-2xl font-bold text-[#191c1e]">{user.name}</h2>
        <p className="font-label text-sm text-[#0040a1] font-semibold">{user.department} • {user.year}</p>
        <div className="flex items-center gap-2 mt-2 bg-[#f2f4f6] px-3 py-1 rounded-full">
          <span className="material-symbols-outlined text-xs text-[#424654]">badge</span>
          <span className="font-label text-xs text-[#424654] font-medium">{user.studentId}</span>
        </div>
      </div>

      {/* Mesh Radio Settings */}
      <div className="bg-white border border-outline-variant rounded-2xl p-4 shadow-xs space-y-4">
        <h3 className="font-headline text-base font-bold text-[#191c1e] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0040a1]">router</span>
          Mesh Radio Settings
        </h3>

        {/* Packet Relay Mode */}
        <div className="flex items-center justify-between py-2 border-b border-outline-variant">
          <div>
            <p className="font-label text-sm font-bold text-[#191c1e]">Background Packet Relay</p>
            <p className="font-label text-xs text-[#424654]">Relay encrypted mesh messages for nearby peers</p>
          </div>
          <button
            onClick={() => setRelayMode(!relayMode)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              relayMode ? 'bg-[#0040a1]' : 'bg-[#e0e3e5]'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${relayMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>

        {/* BLE Mesh */}
        <div className="flex items-center justify-between py-2 border-b border-outline-variant">
          <div>
            <p className="font-label text-sm font-bold text-[#191c1e]">Bluetooth Low Energy (BLE)</p>
            <p className="font-label text-xs text-[#424654]">Low-power short range peer discovery</p>
          </div>
          <button
            onClick={() => setBleEnabled(!bleEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              bleEnabled ? 'bg-[#0040a1]' : 'bg-[#e0e3e5]'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${bleEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>

        {/* Wi-Fi Direct Mesh */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-label text-sm font-bold text-[#191c1e]">Wi-Fi Direct Peer Link</p>
            <p className="font-label text-xs text-[#424654]">High bandwidth peer file and photo exchange</p>
          </div>
          <button
            onClick={() => setWifiDirect(!wifiDirect)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              wifiDirect ? 'bg-[#0040a1]' : 'bg-[#e0e3e5]'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${wifiDirect ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      {/* Offline Storage Cache */}
      <div className="bg-white border border-outline-variant rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-base font-bold text-[#191c1e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a6a]">sd_card</span>
            Offline Packet Storage
          </h3>
          <span className="font-label text-xs font-bold text-[#006a6a]">{storageLimit} MB</span>
        </div>
        <p className="font-label text-xs text-[#424654]">
          Maximum space allocated for storing offline peer messages until internet returns.
        </p>
        <input
          type="range"
          min="10"
          max="200"
          step="10"
          value={storageLimit}
          onChange={(e) => setStorageLimit(Number(e.target.value))}
          className="w-full accent-[#006a6a] cursor-pointer"
        />
      </div>

      {/* Switch Screens & Logout */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => setActiveView('register')}
          className="w-full py-3.5 bg-white border border-outline-variant text-[#0040a1] rounded-2xl font-label text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined">person_add</span>
          <span>View Registration Screen</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-[#ffdad6] text-[#93000a] rounded-2xl font-label text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#ffb4ab] transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Sign Out Node</span>
        </button>
      </div>
    </div>
  );
};
