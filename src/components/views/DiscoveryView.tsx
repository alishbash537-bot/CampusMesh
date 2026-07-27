import React, { useState } from 'react';
import { ActiveView, Peer } from '../../types';

interface DiscoveryViewProps {
  setActiveView: (view: ActiveView) => void;
  peers: Peer[];
  onMessagePeer: (peer: Peer) => void;
  onBlockPeer: (peerId: string) => void;
  onUnblockPeer: (peerId: string) => void;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ 
  setActiveView, 
  peers, 
  onMessagePeer, 
  onBlockPeer, 
  onUnblockPeer 
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanLabel, setScanLabel] = useState('Scanning for nodes...');
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);

  const handleRescan = () => {
    setIsScanning(true);
    setScanLabel('Updating Mesh Topology...');
    setTimeout(() => {
      setIsScanning(false);
      setScanLabel('Scanning for nodes...');
    }, 2000);
  };

  const activePeers = peers.filter(p => !p.isBlocked);
  const blockedPeers = peers.filter(p => p.isBlocked);
  const displayedPeers = showBlockedOnly ? blockedPeers : activePeers;

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-28">
      {/* Radar Section */}
      <section className="relative w-full aspect-square max-h-[340px] flex items-center justify-center overflow-hidden bg-white rounded-3xl shadow-sm border border-outline-variant">
        <div className="absolute inset-0 radar-sweep-line"></div>
        <div className="radar-ring w-1/4 h-1/4" style={{ animationDelay: '0s' }}></div>
        <div className="radar-ring w-2/4 h-2/4" style={{ animationDelay: '1s' }}></div>
        <div className="radar-ring w-3/4 h-3/4" style={{ animationDelay: '2s' }}></div>
        <div className="radar-ring w-full h-full" style={{ animationDelay: '3s' }}></div>

        {/* Central Node */}
        <div className="relative z-10 w-16 h-16 bg-[#0040a1] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <span className="material-symbols-outlined text-white text-2xl fill-1">person</span>
        </div>

        {/* Nearby Nodes (Visualized on Radar) */}
        <div className="absolute top-[20%] left-[25%] z-10 w-10 h-10 bg-[#90efef] rounded-full flex items-center justify-center shadow-md animate-pulse">
          <span className="material-symbols-outlined text-[#006e6e] text-sm">laptop_mac</span>
        </div>

        <div className="absolute bottom-[30%] right-[15%] z-10 w-12 h-12 bg-[#0056d2] rounded-full flex items-center justify-center shadow-md animate-pulse" style={{ animationDelay: '0.5s' }}>
          <span className="material-symbols-outlined text-white text-sm">smartphone</span>
        </div>

        <div className="absolute top-[40%] right-[20%] z-10 w-8 h-8 bg-[#ffdad6] rounded-full flex items-center justify-center shadow-md animate-pulse" style={{ animationDelay: '1.2s' }}>
          <span className="material-symbols-outlined text-[#410003] text-xs">directions_walk</span>
        </div>

        {/* Radar Label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface/90 px-4 py-1.5 rounded-full border border-outline-variant backdrop-blur-sm shadow-xs">
          <p className="font-label text-xs font-bold text-[#0040a1] flex items-center gap-1.5">
            {isScanning && <span className="material-symbols-outlined text-sm animate-spin">sync</span>}
            <span>{scanLabel}</span>
          </p>
        </div>
      </section>

      {/* Discovery Peers List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-lg font-bold text-[#191c1e]">
              {showBlockedOnly ? 'Blocked Devices' : 'Nearby Peers'}
            </h2>
            <span className="bg-[#f0f4f8] text-[#0040a1] text-xs px-2 py-0.5 rounded-full font-bold">
              {displayedPeers.length}
            </span>
          </div>
          
          {blockedPeers.length > 0 && (
            <button 
              onClick={() => setShowBlockedOnly(!showBlockedOnly)}
              className="font-label text-xs font-bold text-[#ba1a1a] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">block</span>
              <span>{showBlockedOnly ? 'Show All Peers' : `Blocked (${blockedPeers.length})`}</span>
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {displayedPeers.length === 0 ? (
            <div className="bg-white border border-outline-variant p-6 rounded-2xl text-center space-y-2">
              <span className="material-symbols-outlined text-3xl text-[#737785]">block</span>
              <p className="font-body text-sm font-semibold text-[#191c1e]">
                {showBlockedOnly ? 'No blocked devices' : 'No nearby mesh nodes found'}
              </p>
              <p className="font-label text-xs text-[#424654]">
                {showBlockedOnly ? 'You have not blocked any devices or nodes.' : 'Tap sync button to refresh network topology.'}
              </p>
            </div>
          ) : (
            displayedPeers.map((peer) => {
              const isBlocked = peer.isBlocked;

              return (
                <div 
                  key={peer.id}
                  className={`p-3.5 bg-white rounded-2xl border transition-all flex flex-col gap-3 shadow-xs ${
                    isBlocked ? 'border-[#ffb4ab] bg-[#fff8f7]' : 'border-outline-variant hover:border-[#0040a1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {peer.avatar ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant border-2 border-[#0040a1]/20 shrink-0">
                          <img src={peer.avatar} alt={peer.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#d8dadc] flex items-center justify-center shrink-0 border border-outline-variant">
                          <span className="material-symbols-outlined text-[#424654]">
                            {peer.nodeType === 'node' ? 'router' : 'cell_tower'}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-label text-sm font-bold text-[#191c1e]">{peer.name}</h3>
                          {isBlocked && (
                            <span className="bg-[#ffdad6] text-[#93000a] text-[10px] px-2 py-0.5 rounded-full font-bold">
                              BLOCKED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[#424654] mt-0.5">
                          <span className="font-label text-xs flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">distance</span>
                            {peer.distance}
                          </span>
                          <span>•</span>
                          <span className="font-label text-xs">{peer.hops}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-[#006a6a]">
                        <span className="material-symbols-outlined text-sm fill-1">wifi_tethering</span>
                        <span className="font-label text-xs font-bold">{peer.signalStrength}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/60">
                    {!isBlocked ? (
                      <>
                        <button
                          onClick={() => onMessagePeer(peer)}
                          className="flex-1 py-2 px-3 bg-[#0040a1] text-white rounded-xl font-label text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#003080] active:scale-[0.98] transition-all shadow-xs"
                        >
                          <span className="material-symbols-outlined text-base">chat</span>
                          <span>Message</span>
                        </button>
                        <button
                          onClick={() => onBlockPeer(peer.id)}
                          className="py-2 px-3 bg-[#f2f4f6] text-[#ba1a1a] border border-[#ffdad6] rounded-xl font-label text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#ffdad6]/50 active:scale-[0.98] transition-all"
                          title="Block Device"
                        >
                          <span className="material-symbols-outlined text-base">block</span>
                          <span>Block</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onUnblockPeer(peer.id)}
                        className="w-full py-2 px-3 bg-white text-[#006a6a] border border-[#006a6a]/30 rounded-xl font-label text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#90efef]/20 active:scale-[0.98] transition-all"
                      >
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span>Unblock Device</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Mesh Network Visualization Map */}
      <section className="space-y-3">
        <h2 className="font-headline text-lg font-bold text-[#191c1e]">Mesh Map</h2>
        <div className="relative w-full h-48 bg-[#eceef0] rounded-2xl border border-outline-variant overflow-hidden shadow-xs">
          <div 
            className="absolute inset-0 opacity-15" 
            style={{ backgroundImage: 'radial-gradient(#0040a1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          ></div>
          
          <svg className="absolute inset-0 w-full h-full">
            <line className="mesh-dash-line" x1="50%" y1="50%" x2="20%" y2="30%" strokeWidth="1.5" />
            <line className="mesh-dash-line" x1="50%" y1="50%" x2="80%" y2="40%" strokeWidth="1.5" />
            <line className="mesh-dash-line" x1="50%" y1="50%" x2="40%" y2="80%" strokeWidth="1.5" />
            <line className="mesh-dash-line" x1="20%" y1="30%" x2="80%" y2="40%" strokeWidth="0.8" stroke="rgba(0,64,161,0.3)" />
          </svg>

          <div className="absolute top-[30%] left-[20%] w-3.5 h-3.5 bg-[#006a6a] rounded-full shadow-md animate-ping"></div>
          <div className="absolute top-[30%] left-[20%] w-3.5 h-3.5 bg-[#006a6a] rounded-full shadow-md"></div>
          <div className="absolute top-[40%] right-[20%] w-3.5 h-3.5 bg-[#0040a1] rounded-full shadow-md"></div>
          <div className="absolute bottom-[20%] left-[40%] w-3.5 h-3.5 bg-[#0040a1] rounded-full shadow-md"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[#0056d2] border-2 border-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#424654] border border-outline-variant shadow-xs">
            LIVE TOPOLOGY
          </div>
        </div>
      </section>

      {/* FAB Rescan Sync */}
      <button 
        onClick={handleRescan}
        className="fixed bottom-20 right-6 w-14 h-14 bg-[#940010] text-white rounded-full shadow-xl hover:bg-[#ba1b20] active:scale-95 transition-all flex items-center justify-center z-40"
        title="Sync Mesh Nodes"
      >
        <span className={`material-symbols-outlined text-2xl fill-1 ${isScanning ? 'animate-spin' : ''}`}>sync</span>
      </button>
    </div>
  );
};
