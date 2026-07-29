import React, { useState } from 'react';
import { ActiveView, AlertItem, ChatMessage, ChatThread, Peer, UserProfile } from './types';
import { INITIAL_USER, MOCK_CHAT_THREADS, MOCK_DIRECT_MESSAGES, MOCK_PEERS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/views/HomeView';
import { ChatListView } from './components/views/ChatListView';
import { DirectChatView } from './components/views/DirectChatView';
import { DiscoveryView } from './components/views/DiscoveryView';
import { EmergencyBroadcastView } from './components/views/EmergencyBroadcastView';
import { AIAssistantView } from './components/views/AIAssistantView';
import { AlertsView } from './components/views/AlertsView';
import { BluetoothMeshView } from './components/views/BluetoothMeshView';
import { RegisterView } from './components/views/RegisterView';
import { LoginView } from './components/views/LoginView';
import { ProfileView } from './components/views/ProfileView';

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [customAlerts, setCustomAlerts] = useState<AlertItem[]>([]);

  // Peer & Device Block state
  const [peers, setPeers] = useState<Peer[]>(MOCK_PEERS);

  // Chat Threads & Message state
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_CHAT_THREADS);
  const [selectedThreadId, setSelectedThreadId] = useState<string>('1');
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({
    '1': MOCK_DIRECT_MESSAGES
  });

  const selectedThread = threads.find(t => t.id === selectedThreadId) || threads[0];

  const handleBlockPeer = (peerId: string) => {
    setPeers(prev => prev.map(p => p.id === peerId ? { ...p, isBlocked: true } : p));
  };

  const handleUnblockPeer = (peerId: string) => {
    setPeers(prev => prev.map(p => p.id === peerId ? { ...p, isBlocked: false } : p));
  };

  const handleMessagePeer = (peer: Peer) => {
    // Look for existing thread
    let existingThread = threads.find(t => t.peerId === peer.id || t.name === peer.name);

    if (existingThread) {
      setSelectedThreadId(existingThread.id);
    } else {
      // Create persistent new thread for this peer
      const newThread: ChatThread = {
        id: `t_peer_${peer.id}`,
        peerId: peer.id,
        name: peer.name,
        avatar: peer.avatar,
        lastMessage: 'P2P connection established.',
        time: 'Just now',
        isMeshOnly: true,
        onlineStatus: peer.isOnline
      };
      setThreads(prev => [newThread, ...prev]);
      setMessagesMap(prev => ({ ...prev, [newThread.id]: [] }));
      setSelectedThreadId(newThread.id);
    }

    setActiveView('direct-chat');
  };

  const handleCreateGroup = (groupName: string, icon: string, selectedPeerIds: string[]) => {
    const selectedPeers = peers.filter(p => selectedPeerIds.includes(p.id));
    const peerNames = selectedPeers.map(p => p.name.split(' ')[0]).join(', ');

    const newGroupThread: ChatThread = {
      id: `group_${Date.now()}`,
      name: groupName,
      icon: icon || 'groups',
      lastMessage: `Campus Mesh group created (${selectedPeerIds.length + 1} members)`,
      time: 'Just now',
      isGroup: true,
      memberCount: selectedPeerIds.length + 1,
      isMeshOnly: true
    };

    const initialSystemMsg: ChatMessage = {
      id: `sys_${Date.now()}`,
      senderId: 'system',
      senderName: 'CampusMesh System',
      text: `Mesh Group "${groupName}" created. Connected nodes: You${peerNames ? ', ' + peerNames : ''}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setThreads(prev => [newGroupThread, ...prev]);
    setMessagesMap(prev => ({
      ...prev,
      [newGroupThread.id]: [initialSystemMsg]
    }));
    setSelectedThreadId(newGroupThread.id);
    setActiveView('direct-chat');
  };

  const handleSendMessage = (threadId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: 'me',
      senderName: user.name,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessagesMap(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMsg]
    }));

    setThreads(prev => prev.map(t => t.id === threadId ? { ...t, lastMessage: text, time: 'Just now' } : t));

    // Automated peer mesh reply if applicable and not blocked
    const targetThread = threads.find(t => t.id === threadId);
    if (targetThread && !targetThread.isGroup) {
      const peerObj = peers.find(p => p.id === targetThread.peerId || p.name === targetThread.name);
      if (peerObj && !peerObj.isBlocked) {
        setTimeout(() => {
          const autoReply: ChatMessage = {
            id: `reply_${Date.now()}`,
            senderId: peerObj.id,
            senderName: peerObj.name,
            text: `Received mesh packet! Signals are strong near ${peerObj.location}.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read'
          };
          setMessagesMap(prev => ({
            ...prev,
            [threadId]: [...(prev[threadId] || []), autoReply]
          }));
          setThreads(prev => prev.map(t => t.id === threadId ? { ...t, lastMessage: autoReply.text, time: 'Just now' } : t));
        }, 1200);
      }
    }
  };

  const handleNewAlertCreated = (title: string, category: string, details: string) => {
    const newAlert: AlertItem = {
      id: `custom_${Date.now()}`,
      title: title || 'Emergency Broadcast',
      priority: 'HIGH PRIORITY',
      timeAgo: 'Just now',
      description: details || 'Real-time alert broadcasted across local mesh network.',
      distance: '10m away',
      statusText: 'Broadcasting',
      category: category || 'Emergency',
    };
    setCustomAlerts((prev) => [newAlert, ...prev]);
  };

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setActiveView={setActiveView} user={user} />;
      case 'chat':
        return (
          <ChatListView 
            setActiveView={setActiveView}
            threads={threads}
            setSelectedThreadId={setSelectedThreadId}
            onCreateGroup={handleCreateGroup}
            peers={peers}
          />
        );
      case 'direct-chat':
        return (
          <DirectChatView 
            setActiveView={setActiveView}
            selectedThread={selectedThread}
            messages={messagesMap[selectedThreadId] || []}
            onSendMessage={handleSendMessage}
            peers={peers}
            onUnblockPeer={handleUnblockPeer}
          />
        );
      case 'map':
        return (
          <DiscoveryView 
            setActiveView={setActiveView}
            peers={peers}
            onMessagePeer={handleMessagePeer}
            onBlockPeer={handleBlockPeer}
            onUnblockPeer={handleUnblockPeer}
          />
        );
      case 'emergency':
        return (
          <EmergencyBroadcastView 
            setActiveView={setActiveView} 
            onNewAlertCreated={handleNewAlertCreated} 
          />
        );
      case 'assistant':
        return <AIAssistantView setActiveView={setActiveView} />;
     case 'alerts':
        return <AlertsView setActiveView={setActiveView} customAlerts={customAlerts} />;
      case 'bluetooth':
        return <BluetoothMeshView setActiveView={setActiveView} />;
      case 'register':
        return <RegisterView setActiveView={setActiveView} setUser={setUser} />;
      case 'login':
        return <LoginView setActiveView={setActiveView} setUser={setUser} />;
      case 'profile':
        return <ProfileView setActiveView={setActiveView} user={user} setUser={setUser} />;
      default:
        return <HomeView setActiveView={setActiveView} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] font-body text-[#191c1e] antialiased selection:bg-[#90efef] selection:text-[#002020] flex flex-col">
      {/* Top Bar Header */}
      {activeView !== 'login' && activeView !== 'register' && (
        <Header 
          activeView={activeView} 
          setActiveView={setActiveView} 
          user={user} 
          selectedThread={selectedThread}
        />
      )}

      {/* Main View Area */}
      <div className="flex-1">
        {renderCurrentView()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}

export default App;
