import React, { useState, useRef, useEffect } from 'react';
import { ActiveView } from '../../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

interface AIAssistantViewProps {
  setActiveView: (view: ActiveView) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ setActiveView }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'ai-initial',
      role: 'assistant',
      text: 'Hello. I am the CampusMesh AI. I can provide first-aid guidance, campus navigation during outages, and contact campus security. What is your situation?',
      time: '10:42 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendPrompt = async (promptText: string) => {
    if (!promptText.trim() || isLoading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: promptText,
      time: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: data.reply || 'CampusMesh AI is online and ready.',
          time: aiTime,
        },
      ]);
    } catch (err) {
      console.error('Failed to query AI:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          text: 'Emergency Advisory: In an active medical or fire situation, tap the SOS Broadcast or proceed calmly to the nearest marked emergency exit.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(inputText);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fb] pb-40">
      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full space-y-6">
        {/* Welcome Branding */}
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-20 h-20 bg-[#90efef] rounded-3xl flex items-center justify-center mb-4 shadow-sm">
            <span className="material-symbols-outlined text-[#006e6e] text-4xl fill-1">auto_awesome</span>
          </div>
          <h2 className="font-headline text-2xl font-bold text-[#191c1e]">How can I help you?</h2>
          <p className="font-body text-sm text-[#424654] max-w-xs mt-1">
            I have access to offline campus maps and emergency protocols.
          </p>
        </div>

        {/* Message Thread */}
        {messages.map((msg) => {
          if (msg.role === 'assistant') {
            return (
              <div key={msg.id} className="flex gap-3 items-end max-w-[90%] self-start">
                <div className="w-8 h-8 rounded-full bg-[#006a6a] flex items-center justify-center shrink-0 mb-1 shadow-xs">
                  <span className="material-symbols-outlined text-white text-sm fill-1">smart_toy</span>
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-bl-xs shadow-xs border border-outline-variant">
                  <p className="font-body text-sm text-[#191c1e] whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <span className="font-label text-[10px] text-[#737785] mt-2 block font-medium">{msg.time}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex flex-col items-end gap-1 max-w-[85%] self-end ml-auto">
              <div className="bg-[#90efef] text-[#002020] p-3.5 rounded-2xl rounded-br-xs shadow-xs">
                <p className="font-body text-sm font-medium">{msg.text}</p>
              </div>
              <span className="font-label text-[10px] text-[#737785] mr-1">{msg.time}</span>
            </div>
          );
        })}

        {/* Prompt Suggestions Grid */}
        {messages.length <= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => sendPrompt('How do I perform CPR?')}
              className="flex items-center gap-3 p-3.5 bg-white border border-outline-variant rounded-2xl text-left hover:border-[#006a6a] transition-all active:scale-98 shadow-xs"
            >
              <div className="w-10 h-10 bg-[#90efef]/40 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#006a6a]">medical_services</span>
              </div>
              <div>
                <p className="font-label text-sm font-bold text-[#191c1e]">How do I perform CPR?</p>
                <p className="text-[11px] text-[#424654]">Step-by-step guidance</p>
              </div>
            </button>

            <button
              onClick={() => sendPrompt('Where is the nearest emergency exit?')}
              className="flex items-center gap-3 p-3.5 bg-white border border-outline-variant rounded-2xl text-left hover:border-[#006a6a] transition-all active:scale-98 shadow-xs"
            >
              <div className="w-10 h-10 bg-[#90efef]/40 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#006a6a]">exit_to_app</span>
              </div>
              <div>
                <p className="font-label text-sm font-bold text-[#191c1e]">Nearest emergency exit?</p>
                <p className="text-[11px] text-[#424654]">Based on your location</p>
              </div>
            </button>

            <button
              onClick={() => sendPrompt('I need to report a fire on campus.')}
              className="flex items-center gap-3 p-3.5 bg-white border border-outline-variant rounded-2xl text-left hover:border-[#006a6a] transition-all active:scale-98 shadow-xs"
            >
              <div className="w-10 h-10 bg-[#90efef]/40 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#006a6a]">fire_extinguisher</span>
              </div>
              <div>
                <p className="font-label text-sm font-bold text-[#191c1e]">Report a fire</p>
                <p className="text-[11px] text-[#424654]">Alert campus responders</p>
              </div>
            </button>

            <button
              onClick={() => sendPrompt('Call Campus Security direct line.')}
              className="flex items-center gap-3 p-3.5 bg-white border border-outline-variant rounded-2xl text-left hover:border-[#006a6a] transition-all active:scale-98 shadow-xs"
            >
              <div className="w-10 h-10 bg-[#90efef]/40 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#006a6a]">shield</span>
              </div>
              <div>
                <p className="font-label text-sm font-bold text-[#191c1e]">Call Security</p>
                <p className="text-[11px] text-[#424654]">Direct mesh-line</p>
              </div>
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex gap-2 items-center text-[#006a6a] p-2 bg-white rounded-xl border border-outline-variant w-32 shadow-xs">
            <span className="material-symbols-outlined text-base animate-spin">sync</span>
            <span className="font-label text-xs font-semibold">Mesh AI...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Floating Bottom Input Bar */}
      <div className="fixed bottom-16 left-0 w-full bg-[#f7f9fb]/95 backdrop-blur-md pt-2 pb-6 px-4 border-t border-outline-variant z-50">
        <div className="max-w-2xl mx-auto flex items-center gap-2 bg-white border border-outline-variant rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-[#006a6a]/30 transition-all">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-colors text-[#424654]">
            <span className="material-symbols-outlined text-xl">add_circle</span>
          </button>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type emergency request..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none font-body text-sm py-1.5 px-1 max-h-28 resize-none text-[#191c1e]"
          />

          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-container-low transition-colors text-[#424654]">
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>

            <button
              onClick={() => sendPrompt(inputText)}
              disabled={isLoading || !inputText.trim()}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#006a6a] text-white transition-all active:scale-95 shadow-md disabled:opacity-50 hover:bg-[#004f4f]"
            >
              <span className="material-symbols-outlined text-lg fill-1">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};