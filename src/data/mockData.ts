import { AlertItem, ChatMessage, ChatThread, Peer, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'John Doe',
  studentId: '2024-84921',
  email: 'student@university.edu',
  department: 'Computer Science',
  year: '3rd Year',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwVqtJp1xd4JTDV2rF39Rz8iexJ5BPKPgVrrS6kFRoxOkDmhLmiU7kB06i-UIBKtoXKz4MQpzGePyfaz7s3toKEF-ewLCGGRS3OZR2yMpd66HwNCxglTfiAGeG4sderzPIE15Tt1J43C150_Ah7Qs42bXz9wfSbZlShSRzhhQNPps6vBGzDYEV0iPei_uOlzvka0ThsEomYIxXvECuEA-OxA41wDYSbe1FIlask4XOEUiieB-j0sXTpujbokcS72pUcfaPWBYNXY_8',
  isLoggedIn: true,
};

export const MOCK_PEERS: Peer[] = [
  {
    id: 'p1',
    name: 'Alex Rivera',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLxTObq-MRte8wNGuKQAwycoiAqN-6xD97YAcs-OP7CeOtyjPpHSfsOu9ZjtYBt9r7YUu9VQHUdDhnKfmhA4gnCjkGEU_iVddHbpGar9n15Fo4rTLgYk6MpFihbXcE7N6LYY4ji-oXnxPkF8oOZmjt-Ytsl2C66vtjqZ9T5scg-bjUXUjEbCH6rfharJefCiwTdokVaO90VzvuNywY-vj_QuaMgQ54AHfp6nKtFO0rOxvHsp2g8enFCpLVhebOHrc6RreIk7No2_xp',
    isOnline: true,
    distance: '15m away',
    hops: 'Direct Hop',
    signalStrength: 'Strong',
    nodeType: 'person',
  },
  {
    id: 'p2',
    name: 'Sarah Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3NderzIB1SkBkX80NKZvmtY0elw1kMi_YOarf8PvBhhsuWZdObPpnM1kCyD6TLJ-ZSWaLmlI6Vk1gzXMwjXO-rWe49bL2tJaaPhy_pFPf34JinnsXcU2wWpbEcCt-WF9iQHLqaeRcNufSjNY7HZbSLgQLwzmkySauWAwSubISv7NlxFs3z2RM2MgxDh5X5xpZ83H0Tvl2Wu6n7wdgQZqKS8VKv-B2LoaWnXdd5wddWlIzYDlC_WwjiFjJaF6N5CCD7eNjCuPtWDX5',
    isOnline: true,
    distance: '42m away',
    hops: '2 Hops',
    signalStrength: 'Relayed',
    nodeType: 'person',
  },
  {
    id: 'p3',
    name: 'Library Node B',
    avatar: '',
    isOnline: true,
    distance: '110m away',
    hops: '3 Hops',
    signalStrength: 'Faint',
    nodeType: 'node',
  },
  {
    id: 'p4',
    name: 'Jordan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX6ey5kTrxATRTbguTzQyIgPspbKAZsbvd-kdGfornafY7DdNBW_2uKAgOBPrqvr1pmh2aVrgwsfexkr0__ZSBTcwMeqJmE2g4tujbNWAr7sdvAxY_-mnsgpCYoXtpaPcv4-yz1IRlBR9vdp0AYGmqUtR8BbgzVar1SmvgPUXdZSJhPykBpVkb5QTJZ7Bzm_HvJAmnyXAYxB_X3bLfElnpnLK0FAafnDeQ6nixKZK9FmldGhWxm90WQ6wiaUF63lkbR2RRZb40fPby',
    isOnline: false,
    distance: '85m away',
    hops: '1 Hop',
    signalStrength: 'Strong',
    nodeType: 'person',
  },
  {
    id: 'p5',
    name: 'Elena',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoj8_y2F1de4I36smTAyPD9zqp2njWcL4WdJecujStPmPrYzXn-jSSohEC27CPKZGrDhENUliHbe1os2VpVIahn_qOJCiTGCdehQ8z7gfcCnb0mBjKt7sGaffDiXQoeY3qfuQAPdEQKO02wao9tzaqqyvLjg5yIsrvu2KGeQuYRj-W2_j-7JjmZedPwQNwDy8Y1gWX-kOwsN_f2vDbr-rJuJfD7L-rO3FNBsgvPoT7UyAgausoIvF0WS8PY0VWEVPTpjEHMN_sh5VL',
    isOnline: true,
    distance: '30m away',
    hops: 'Direct Hop',
    signalStrength: 'Strong',
    nodeType: 'person',
  }
];

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 't1',
    name: 'Senior Design Team A',
    lastMessage: "Alex: I've uploaded the new CAD files to the mesh node.",
    time: '10:42 AM',
    unreadCount: 3,
    isGroup: true,
    icon: 'engineering'
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM0isQvcRAlt5rAZBPQBT54jbBAygS3kO6SXsUxjS-K3ftaPkwO7jDnYXDbI8ZHQ5i0-6YWbGngRSOqbuXpA50jjxafEdBhn2YUs1V3he-7JED6ulN0fTm81rCGfWFh9MAtYhRshxoJFhCtK-OoQeJAGHrD7b41ZwshZsfMh-p701X15gCEP4cwVCMpav5M60FwosjWenLU8XSCWDZSPhMlZ50hToW3bWCpcp0UwLzPiT9hF-z1hvmd_QorVezgTvZwvilswbSSiRV',
    lastMessage: 'Meeting at the Student Union in 10?',
    time: '09:15 AM',
    isMeshOnly: true,
    onlineStatus: true
  },
  {
    id: 't3',
    name: 'Campus Safety Alert',
    lastMessage: 'Maintenance: Library elevators offline until 2PM.',
    time: '08:00 AM',
    isAlert: true,
    icon: 'campaign'
  },
  {
    id: 't4',
    name: 'Sophie Walters',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS30sI073kMxnLF0fImbB_7ZmqCBpRk-l1nQ405toLTqL1YDq7EhEV5eTldACP5MFJrY6SxSQiaqo51UEP-QwoVeDAFTnBHXy7qWJLw1l4chU88fI4WFQogMEWEKKjIQP8beQ-9VY3IjYSSl3DWjwLBR9uGIK7teNHbtWsJKm6ADXyIKr6Khzp3g4P_Q2qlnAszq1YLxL6FDeI9jm34gct2ykINZ7_VJfZUIQE9TrXZ2QZGyZhLxWa2D9UQvPRLnGLEhE0_Q30CTMD',
    lastMessage: 'Thanks for the notes!',
    time: 'Yesterday',
    onlineStatus: false
  },
  {
    id: 't5',
    name: 'Rec Sports Club',
    lastMessage: 'Coach: Practice moved to Field 4.',
    time: 'Yesterday',
    isGroup: true,
    icon: 'sports_basketball'
  },
  {
    id: 't6',
    name: 'David Kim',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsBNr_sjBCRGdfU0w52W-u96f15LLvNv943r_ybuj3UZQy6DNH1Z7qNLYTvdaRdHUr0lDNC5ErUeOff8NhfjCkm-1UEMmAs0GXfTbxmZkXOG7RRofzVTqVpdFW2RDQEWnqDFHDPCY48O13EJGrldg1A3Tb-sBgQXWcieBGeeR5d12GHkd8TF_ejdWz7jkCNThZnvJAbjyC0CE8gGsstuQQFhtONoTEhU0QSgfy0CTu-vK-2B0ADR130-7A6vOG2f_xys-24Jxisd83',
    lastMessage: 'Did you see the latest mesh update?',
    time: 'Tue',
    onlineStatus: true
  }
];

export const MOCK_DIRECT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    senderId: 'other',
    senderName: 'Sarah Chen',
    text: 'Hey! Are you near the Engineering Quad? The main Wi-Fi is down but the Mesh is holding up well.',
    time: '14:22',
    status: 'read'
  },
  {
    id: 'm2',
    senderId: 'me',
    senderName: 'John Doe',
    text: "Yeah, I'm just outside the lab. Just saw the alert. It's crazy how fast the Mesh picked up the traffic.",
    time: '14:24',
    status: 'read'
  },
  {
    id: 'm3',
    senderId: 'me',
    senderName: 'John Doe',
    text: 'Current view. Seems like everyone is switching over.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2yWollygZii57uSF_tqlHTa30Zrodqj-lShCOad2QnpSmtZTcKP4foVwakClzL4PGCrc4tIbH5h2fZ4Lj9JshakD1UG-yRWdWj-S_ghErn76Gp7T-4KnXmGcgajVGe6Oq4Mq2Rw2Nk3tYNeeOTG-tjA2EKofke0YXgmn4M3xgihPEqdnC0Ile20FYqVolkpTzcIESbJLnf5rZ_1MXwP4BACHx9-WROyJhcXZvwi8QZyB3tfw3V_HEZ9THmtuR7nJOjWNNsRhbVmGe',
    time: '14:25',
    status: 'read'
  },
  {
    id: 'm4',
    senderId: 'other',
    senderName: 'Sarah Chen',
    isVoiceNote: true,
    audioDuration: '0:12',
    time: '14:28',
    status: 'read'
  },
  {
    id: 'm5',
    senderId: 'me',
    senderName: 'John Doe',
    text: 'Waiting for peer mesh node...',
    time: '14:31',
    status: 'queued'
  }
];

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'a1',
    title: 'Fire Alarm: Science Block B',
    priority: 'HIGH PRIORITY',
    timeAgo: '2 mins ago',
    description: 'Evacuation in progress. Please avoid the area and follow designated emergency exits.',
    distance: '450m away',
    statusText: 'Active Response',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDgEaA8wpFrnRQGYtoQyYNY1salcZRltXrHXap8W5zbWLlVoXog-b4_YteB2G_pSdPqyZ3gv-sVjyootSeiNKFsKYV2U7ZA87IjdDkmWtUB5ZzK5OTkGHXMtMM-J9cCJ-MyBxb8NXYJGFx8HqjUcIeASzNoY7i7X24htxDXflYdiN4pdPZz8Bd7I6O1_kHRWiqmnox0lblbKkWTFFrKWuqLT-S40vntrcg0hhLFxNkJJZsYlnOMc4y_hEoao3DaSoVBUOCCrcLMi2W',
    category: 'Fire'
  },
  {
    id: 'a2',
    title: 'Unscheduled Maintenance',
    priority: 'MEDIUM PRIORITY',
    timeAgo: '15 mins ago',
    description: 'Main gate road closure for water pipe repair. Expected duration: 4 hours. Use the West entrance.',
    distance: '1.2km away',
    statusText: 'In Progress',
    category: 'Maintenance'
  },
  {
    id: 'a3',
    title: 'Library Hours Extended',
    priority: 'GENERAL ALERT',
    timeAgo: '1 hour ago',
    description: 'Finals week special: The Main Library will remain open 24/7 until Friday.',
    distance: '300m away',
    statusText: 'Active',
    category: 'General'
  }
];
