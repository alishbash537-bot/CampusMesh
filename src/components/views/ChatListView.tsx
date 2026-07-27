import React, { useState } from 'react';
import { ActiveView, ChatThread, Peer } from '../../types';

type FilterOption = 'all' | 'mesh' | 'groups';

interface ChatListViewProps {
  setActiveView: (view: ActiveView) => void;
  threads: ChatThread[];
  setSelectedThreadId: (id: string) => void;
  onCreateGroup: (groupName: string, icon: string, selectedPeerIds: string[]) => void;
  peers: Peer[];
}

export const ChatListView: React.FC<ChatListViewProps> = ({ 
  setActiveView, 
  threads, 
  setSelectedThreadId, 
  onCreateGroup, 
  peers 
}: ChatListViewProps) => {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('groups');
  const [selectedPeerIds, setSelectedPeerIds] = useState<string[]>([]);

  const directChatView = 'direct-chat' as ActiveView;
  const alertsView = 'alerts' as ActiveView;

  const groupIcons = [
    { icon: 'groups', label: 'General' },
    { icon: 'engineering', label: 'Tech' },
    { icon: 'school', label: 'Study' },
    { icon: 'sports_basketball', label: 'Sports' },
    { icon: 'campaign', label: 'Alerts' },
    { icon: 'biotech', label: 'Lab' },
    { icon: 'menu_book', label: 'Library' },
  ];

  const filteredThreads = threads.filter((t) => {
    if (filter === 'mesh') return t.isMeshOnly || t.onlineStatus;
    if (filter === 'groups') return t.isGroup;
    return true;
  });

  const handleThreadClick = (thread: ChatThread) => {
    setSelectedThreadId(String(thread.id));
    if (thread.isAlert) {
      setActiveView(alertsView);
    } else {
      setActiveView(directChatView);
    }
  };

  const togglePeerSelection = (peerId: string) => {
    if (selectedPeerIds.includes(peerId)) {
      setSelectedPeerIds(selectedPeerIds.filter((id) => id !== peerId));
    } else {
      setSelectedPeerIds([...selectedPeerIds, peerId]);
    }
  };

  const handleCreateGroupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    onCreateGroup(groupName.trim(), selectedIcon, selectedPeerIds);
    setGroupName('');
    setSelectedPeerIds([]);
    setIsCreateGroupOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto pb-28">
      {/* Quick Stories / Active Channels */}
      <section className="px-4 pt-4 pb-3">
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {/* Create Group Quick Tile */}
          <div 
            onClick={() => setIsCreateGroupOpen(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#0040a1] p-0.5 group-hover:scale-105 transition-transform flex items-center justify-center bg-white">
              <span className="material-symbols-outlined text-2xl text-[#0040a1]">add</span>
            </div>
            <span className="font-label text-xs font-bold text-[#0040a1]">New Group</span>
          </div>

          {/* Campus Wide */}
          <div 
            onClick={() => {
              const campusThread = threads.find(t => t.isGroup);
              if (campusThread) setSelectedThreadId(campusThread.id);
              setActiveView('direct-chat');
            }}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#0040a1] p-0.5 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#90efef] flex items-center justify-center text-[#0040a1]">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
            </div>
            <span className="font-label text-xs font-semibold text-[#191c1e]">Campus Wide</span>
          </div>

          {/* Active Nearby Peers Quick Tap */}
          {peers.filter(p => !p.isBlocked).slice(0, 4).map((peer) => (
            <div 
              key={peer.id}
              onClick={() => {
                const existing = threads.find(t => t.peerId === peer.id || t.name === peer.name);
                if (existing) {
                  setSelectedThreadId(existing.id);
                }
                setActiveView('direct-chat');
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-surface-variant overflow-hidden border-2 border-transparent group-hover:border-[#0040a1] transition-all">
                  <img src={peer.avatar} alt={peer.name} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${peer.isOnline ? 'bg-[#006a6a]' : 'bg-[#737785]'}`}></div>
              </div>
              <span className="font-label text-xs text-[#424654] truncate max-w-[64px] text-center">{peer.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Tabs & Create Group Action Bar */}
      <div className="px-4 mb-4 flex items-center justify-between gap-2">
        <div className="flex-1 flex gap-1.5 p-1 bg-[#f2f4f6] rounded-xl">
          <button 
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 rounded-lg font-label text-xs sm:text-sm font-semibold transition-all ${
              filter === 'all' 
                ? 'bg-white shadow-sm text-[#0040a1]' 
                : 'text-[#424654] hover:bg-surface-container-high'
            }`}
          >
            All Chats
          </button>
          <button 
            onClick={() => setFilter('mesh')}
            className={`flex-1 py-1.5 rounded-lg font-label text-xs sm:text-sm font-semibold transition-all ${
              filter === 'mesh' 
                ? 'bg-white shadow-sm text-[#0040a1]' 
                : 'text-[#424654] hover:bg-surface-container-high'
            }`}
          >
            Mesh Only
          </button>
          <button 
            onClick={() => setFilter('groups')}
            className={`flex-1 py-1.5 rounded-lg font-label text-xs sm:text-sm font-semibold transition-all ${
              filter === 'groups' 
                ? 'bg-white shadow-sm text-[#0040a1]' 
                : 'text-[#424654] hover:bg-surface-container-high'
            }`}
          >
            Groups
          </button>
        </div>

        <button
          onClick={() => setIsCreateGroupOpen(true)}
          className="py-2 px-3 bg-[#0040a1] text-white rounded-xl font-label text-xs font-bold flex items-center gap-1 shrink-0 hover:bg-[#003080] shadow-xs active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base">group_add</span>
          <span className="hidden sm:inline">Create Group</span>
        </button>
      </div>

      {/* Chat List */}
      <section className="px-4 space-y-1">
        {filteredThreads.map((thread) => {
          if (thread.isAlert) {
            return (
              <div 
                key={thread.id}
                onClick={() => handleThreadClick(thread)}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#ffdad6]/40 border border-[#ba1a1a]/20 hover:bg-[#ffdad6]/60 transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#ba1a1a] flex items-center justify-center text-white shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-2xl">campaign</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-body text-base font-bold text-[#ba1a1a] truncate">{thread.name}</h3>
                    <span className="font-label text-xs text-[#ba1a1a] font-semibold">{thread.time}</span>
                  </div>
                  <div className="mt-0.5">
                    <p className="font-body text-sm text-[#93000a] font-medium truncate">{thread.lastMessage}</p>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={thread.id}
              onClick={() => handleThreadClick(thread)}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#eceef0] transition-all cursor-pointer active:scale-[0.99]"
            >
              {thread.avatar ? (
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
                    <img src={thread.avatar} alt={thread.name} className="w-full h-full object-cover" />
                  </div>
                  {thread.onlineStatus && (
                    <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[#006a6a] rounded-full border-2 border-white shadow-sm"></div>
                  )}
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-[#0056d2] flex items-center justify-center text-[#ccd8ff] shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">{thread.icon || 'group'}</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="font-body text-base font-bold text-[#191c1e] truncate">{thread.name}</h3>
                    {thread.isMeshOnly && (
                      <span className="bg-[#93f2f2]/40 text-[#006a6a] text-[10px] px-1.5 py-0.5 rounded-full border border-[#006a6a]/20 font-bold tracking-wider shrink-0">
                        MESH
                      </span>
                    )}
                  </div>
                  <span className="font-label text-xs text-[#424654] shrink-0 ml-2">{thread.time}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p className="font-body text-sm text-[#424654] truncate">{thread.lastMessage}</p>
                  {thread.unreadCount ? (
                    <span className="w-5 h-5 rounded-full bg-[#0040a1] text-white flex items-center justify-center text-[10px] font-bold shrink-0 ml-2 shadow-xs">
                      {thread.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Modal: Create Mesh Group */}
      {isCreateGroupOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-outline-variant space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0040a1] text-2xl">groups</span>
                <h3 className="font-headline text-lg font-bold text-[#191c1e]">Create Campus Mesh Group</h3>
              </div>
              <button 
                onClick={() => setIsCreateGroupOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#737785] hover:bg-[#f2f4f6]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
              <div>
                <label className="block font-label text-xs font-bold text-[#191c1e] mb-1.5">Group Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. CS301 Study Squad, Dorm Floor 3"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full bg-[#f2f4f6] border border-outline-variant rounded-xl px-3.5 py-2.5 font-body text-sm text-[#191c1e] focus:outline-none focus:border-[#0040a1]"
                />
              </div>

              <div>
                <label className="block font-label text-xs font-bold text-[#191c1e] mb-1.5">Group Icon</label>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {groupIcons.map((item) => (
                    <button
                      key={item.icon}
                      type="button"
                      onClick={() => setSelectedIcon(item.icon)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 shrink-0 transition-all ${
                        selectedIcon === item.icon 
                          ? 'bg-[#0040a1] text-white border-[#0040a1]' 
                          : 'bg-white text-[#424654] border-outline-variant hover:bg-[#f2f4f6]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      <span className="font-label text-[10px] font-semibold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-label text-xs font-bold text-[#191c1e] mb-1.5">
                  Select Nearby Members ({selectedPeerIds.length} selected)
                </label>
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 border border-outline-variant rounded-xl p-2 bg-[#f8f9fa]">
                  {peers.filter(p => !p.isBlocked).map((peer) => {
                    const isSelected = selectedPeerIds.includes(peer.id);
                    return (
                      <div 
                        key={peer.id}
                        onClick={() => togglePeerSelection(peer.id)}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#90efef]/30 border border-[#006a6a]/30' : 'bg-white hover:bg-[#f0f2f4]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={peer.avatar} alt={peer.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <div>
                            <p className="font-label text-xs font-bold text-[#191c1e]">{peer.name}</p>
                            <p className="font-label text-[10px] text-[#424654]">{peer.distance}</p>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-[#006a6a]' : 'text-[#c2c6cf]'}`}>
                          {isSelected ? 'check_box' : 'checkbox_outline_blank'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateGroupOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-label text-xs font-bold text-[#424654] hover:bg-[#f2f4f6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!groupName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#0040a1] text-white font-label text-xs font-bold disabled:opacity-50 hover:bg-[#003080] shadow-xs active:scale-95 transition-all"
                >
                  Create Group Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAB: Start New Conversation */}
      <button 
        onClick={() => setIsCreateGroupOpen(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-2xl bg-[#940010] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all z-40"
        title="Create Mesh Group"
      >
        <span className="material-symbols-outlined text-2xl">group_add</span>
      </button>
    </div>
  );
};

