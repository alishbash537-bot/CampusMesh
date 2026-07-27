import React, { useState } from 'react';
import { ActiveView, ChatMessage, ChatThread, Peer } from '../../types';

interface DirectChatViewProps {
  setActiveView: (view: ActiveView) => void;
  selectedThread?: ChatThread;
  messages: ChatMessage[];
  onSendMessage: (threadId: string, text: string) => void;
  peers: Peer[];
  onUnblockPeer: (peerId: string) => void;
}

export const DirectChatView: React.FC<DirectChatViewProps> = ({ 
  setActiveView, 
  selectedThread, 
  messages = [], 
  onSendMessage, 
  peers = [], 
  onUnblockPeer 
}) => {
  const [inputText, setInputText] = useState('');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Check if current thread's peer is blocked
  const currentPeer = peers.find(p => p.id === selectedThread?.peerId || p.name === selectedThread?.name);
  const isBlocked = currentPeer?.isBlocked;

  const handleSend = () => {
    if (!inputText.trim() || !selectedThread || isBlocked) return;
    onSendMessage(selectedThread.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] pb-24 relative">
      {/* Mesh Banner */}
      <div className="bg-[#90efef] text-[#006e6e] px-4 py-2 flex items-center justify-center gap-2 sticky top-14 z-30 shadow-xs">
        <span className="material-symbols-outlined text-lg">hub</span>
        <span className="font-label text-xs font-semibold">
          {selectedThread?.isGroup ? 'Group Broadcast • CampusMesh Encrypted' : 'Connected via Campus Mesh • P2P Encrypted'}
        </span>
      </div>

      {/* Blocked Device Warning Banner */}
      {isBlocked && currentPeer && (
        <div className="bg-[#ffdad6] text-[#93000a] px-4 py-3 flex items-center justify-between gap-2 border-b border-[#ba1a1a]/20 sticky top-[90px] z-30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">block</span>
            <span className="font-label text-xs font-bold">This device is blocked. Messages cannot be sent.</span>
          </div>
          <button 
            onClick={() => onUnblockPeer(currentPeer.id)}
            className="px-3 py-1 bg-[#ba1a1a] text-white rounded-lg font-label text-xs font-bold shrink-0 hover:bg-[#93000a]"
          >
            Unblock
          </button>
        </div>
      )}

      {/* Chat Messages Canvas */}
      <main className="flex-1 px-4 py-6 flex flex-col gap-5 max-w-2xl mx-auto w-full">
        {/* Encryption Notice */}
        <div className="self-center bg-[#e6e8ea]/90 backdrop-blur-sm px-4 py-2 rounded-xl max-w-[85%] text-center border border-outline-variant shadow-xs">
          <span className="font-label text-xs text-[#424654] flex items-center justify-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-sm">lock</span>
            Messages are end-to-end encrypted on the CampusMesh network.
          </span>
        </div>

        {/* Date Separator */}
        <div className="self-center my-1">
          <span className="font-label text-[11px] font-bold text-[#424654] bg-[#d8dadc]/50 px-3 py-1 rounded-full uppercase tracking-wider">
            Today
          </span>
        </div>

        {/* Empty state if no messages yet */}
        {messages.length === 0 && (
          <div className="text-center py-12 text-[#737785] space-y-2">
            <span className="material-symbols-outlined text-4xl">chat_bubble_outline</span>
            <p className="font-headline text-base font-bold">Start Mesh Conversation</p>
            <p className="font-label text-xs">Direct P2P link established. Type a message below.</p>
          </div>
        )}

        {/* Render Messages */}
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          const isSystem = msg.senderId === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="self-center my-2 max-w-[90%] text-center">
                <span className="font-label text-xs text-[#0040a1] bg-[#eef3ff] border border-[#0040a1]/20 px-3 py-1.5 rounded-xl font-semibold inline-block">
                  {msg.text}
                </span>
              </div>
            );
          }

          // Queued status message
          if (msg.status === 'queued') {
            return (
              <div key={msg.id} className="flex flex-col items-end max-w-[85%] self-end">
                <div className="bg-[#e6e8ea] border border-outline-variant p-3 rounded-2xl rounded-br-xs shadow-xs opacity-90">
                  <p className="font-body text-sm text-[#424654] italic font-medium">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-[#424654] font-label">{msg.time}</span>
                    <span className="material-symbols-outlined text-xs text-[#424654]">schedule</span>
                  </div>
                </div>
              </div>
            );
          }

          // Voice Note Message
          if (msg.isVoiceNote) {
            return (
              <div key={msg.id} className="flex flex-col items-start max-w-[85%] self-start">
                <div className="bg-white border border-outline-variant p-3 rounded-2xl rounded-bl-xs shadow-xs w-64 max-w-full">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                      className="w-10 h-10 rounded-full bg-[#006a6a]/10 text-[#006a6a] flex items-center justify-center active:scale-90 transition-transform shrink-0"
                    >
                      <span className="material-symbols-outlined fill-1 text-2xl">
                        {isPlayingVoice ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-8 flex items-center gap-[3px]">
                        <div className={`h-3 w-1 rounded-full ${isPlayingVoice ? 'bg-[#006a6a] animate-pulse' : 'bg-[#006a6a]'}`}></div>
                        <div className={`h-5 w-1 rounded-full ${isPlayingVoice ? 'bg-[#006a6a] animate-pulse' : 'bg-[#006a6a]'}`}></div>
                        <div className={`h-7 w-1 rounded-full ${isPlayingVoice ? 'bg-[#006a6a] animate-pulse' : 'bg-[#006a6a]'}`}></div>
                        <div className="h-4 w-1 bg-[#006a6a]/30 rounded-full"></div>
                        <div className="h-6 w-1 bg-[#006a6a]/30 rounded-full"></div>
                        <div className="h-3 w-1 bg-[#006a6a]/30 rounded-full"></div>
                        <div className="h-5 w-1 bg-[#006a6a]/30 rounded-full"></div>
                        <div className="h-4 w-1 bg-[#006a6a]/30 rounded-full"></div>
                        <div className="h-6 w-1 bg-[#006a6a]/30 rounded-full"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-[#424654] font-label font-medium">{msg.audioDuration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-[#424654] font-label">{msg.time}</span>
                  </div>
                </div>
              </div>
            );
          }

          // Image Message
          if (msg.imageUrl) {
            return (
              <div key={msg.id} className={`flex flex-col max-w-[85%] ${isMe ? 'items-end self-end' : 'items-start self-start'}`}>
                {msg.senderName && !isMe && (
                  <span className="font-label text-[11px] font-bold text-[#0040a1] mb-1 ml-1">{msg.senderName}</span>
                )}
                <div className={`p-1.5 rounded-2xl shadow-md ${isMe ? 'bg-[#0040a1] text-white rounded-br-xs' : 'bg-white text-[#191c1e] rounded-bl-xs border border-outline-variant'}`}>
                  <div className="rounded-xl overflow-hidden aspect-4/3 w-64 max-w-full">
                    <img src={msg.imageUrl} alt="Attachment" className="w-full h-full object-cover" />
                  </div>
                  {msg.text && (
                    <div className="p-2">
                      <p className="font-body text-sm leading-snug">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className={`text-[10px] font-label ${isMe ? 'text-white/80' : 'text-[#424654]'}`}>{msg.time}</span>
                        {isMe && <span className="material-symbols-outlined text-xs fill-1 text-white/80">done_all</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // Standard Text Message
          return (
            <div key={msg.id} className={`flex flex-col max-w-[85%] ${isMe ? 'items-end self-end' : 'items-start self-start'}`}>
              {msg.senderName && !isMe && selectedThread?.isGroup && (
                <span className="font-label text-[11px] font-bold text-[#0040a1] mb-1 ml-1">{msg.senderName}</span>
              )}
              <div className={`p-3 rounded-2xl shadow-xs ${isMe ? 'bg-[#0040a1] text-white rounded-br-xs' : 'bg-white text-[#191c1e] rounded-bl-xs border border-outline-variant'}`}>
                <p className="font-body text-sm leading-normal">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className={`text-[10px] font-label ${isMe ? 'text-white/80' : 'text-[#424654]'}`}>{msg.time}</span>
                  {isMe && <span className="material-symbols-outlined text-xs fill-1 text-white/80">done_all</span>}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Bottom Input Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant p-3 flex items-center gap-2 z-50">
        <div className="flex-1 bg-[#f2f4f6] border border-outline-variant rounded-full px-3 py-1.5 flex items-center gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#424654] hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-xl">sentiment_satisfied</span>
          </button>
          <input 
            type="text"
            disabled={isBlocked}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isBlocked ? 'Device blocked...' : 'Message...'}
            className="flex-1 bg-transparent border-none outline-none font-body text-sm py-1 text-[#191c1e] disabled:opacity-50"
          />
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#424654] hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-xl">attach_file</span>
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#424654] hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-xl">photo_camera</span>
          </button>
        </div>
        <button 
          onClick={handleSend}
          disabled={isBlocked}
          className="w-12 h-12 rounded-full bg-[#0040a1] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0 hover:bg-[#003080] disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-xl">
            {inputText.trim() ? 'send' : 'mic'}
          </span>
        </button>
      </footer>
    </div>
  );
};
