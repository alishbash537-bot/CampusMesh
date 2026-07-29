export type ActiveView = 
  | 'home' 
  | 'chat' 
  | 'direct-chat' 
  | 'map' 
  | 'alerts' 
  | 'emergency' 
  | 'assistant' 
  | 'bluetooth'
  | 'login' 
  | 'register' 
  | 'profile';

export interface Peer {
  id: string;
  name: string;
  roleOrDept?: string;
  avatar: string;
  isOnline: boolean;
  distance: string;
  hops: string;
  signalStrength: 'Strong' | 'Relayed' | 'Faint';
  nodeType?: 'person' | 'device' | 'node';
  isBlocked?: boolean;
}

export interface ChatThread {
  id: string;
  name: string;
  avatar?: string;
  icon?: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isMeshOnly?: boolean;
  isGroup?: boolean;
  isAlert?: boolean;
  onlineStatus?: boolean;
  peerId?: string;
  memberCount?: number;
  members?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: 'me' | 'other' | 'system';
  senderName?: string;
  text?: string;
  imageUrl?: string;
  audioDuration?: string;
  isVoiceNote?: boolean;
  time: string;
  status: 'sent' | 'delivered' | 'read' | 'queued';
  isEncrypted?: boolean;
}

export interface AlertItem {
  id: string;
  title: string;
  priority: 'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'GENERAL ALERT';
  timeAgo: string;
  description: string;
  distance: string;
  statusText: string;
  imageUrl?: string;
  category: string;
}

export interface UserProfile {
  name: string;
  studentId: string;
  email: string;
  department: string;
  year: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

export interface BluetoothMeshMessage {
  id: string;
  from: 'me' | 'device';
  text: string;
  time: string;
}