import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { ChatInput } from './ChatInput';
import { MessageThread } from './MessageThread';
import { EmptyState } from './EmptyState';
import { MessageProps } from './Message';
import { ProfilePage } from './ProfilePage';
import { PanelRightOpen } from 'lucide-react';
export function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const handleSend = async (content: string) => {
    const userMessage: MessageProps = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: MessageProps = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Згідно з актуальною практикою Верховного Суду, нарахування штрафних санкцій може бути обмежено, якщо відповідач доведе наявність форс-мажорних обставин.\n\nОсь декілька релевантних рішень, які можуть бути корисні для вашої позиції. Перегляньте їх у правій панелі "Доказательная база".',
        isStreaming: true
      };
      setMessages(prev => [...prev, aiMessage]);
      // End streaming effect after a delay
      setTimeout(() => {
        setMessages(prev => prev.map(msg => msg.id === aiMessage.id ? {
          ...msg,
          isStreaming: false
        } : msg));
        setIsStreaming(false);
      }, 2000);
    }, 1000);
  };
  const handleNewChat = () => {
    setMessages([]);
    setIsStreaming(false);
    setShowProfile(false);
  };
  return <div className="flex h-screen bg-claude-bg overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNewChat={handleNewChat} onProfileClick={() => {
      setShowProfile(true);
      setIsSidebarOpen(false);
    }} />

      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-2.5 border-b border-claude-border bg-claude-bg/90 backdrop-blur-md sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-lg transition-all duration-200">
            <img src="/Image_1.jpg" alt="Menu" className="w-5 h-5 object-contain" />
          </button>
          <div className="h-9 flex items-center">
            <span className="font-serif font-semibold text-lg text-claude-text">
              Legal AI
            </span>
          </div>
          <button onClick={() => setIsRightPanelOpen(true)} className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-lg transition-all duration-200">
            <PanelRightOpen size={20} strokeWidth={2} />
          </button>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {showProfile ? <div className="flex-1 overflow-hidden relative">
              <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <ProfilePage />
            </div> : <>
              {messages.length === 0 ? <EmptyState onSelectPrompt={handleSend} /> : <MessageThread messages={messages} />}

              {/* Input Area - Fixed at bottom */}
              <div className="w-full bg-gradient-to-t from-claude-bg via-claude-bg to-transparent pt-8 pb-4 z-20">
                <ChatInput onSend={handleSend} disabled={isStreaming} />
              </div>
            </>}
        </div>
      </main>

      <RightPanel isOpen={isRightPanelOpen} onClose={() => setIsRightPanelOpen(false)} />
    </div>;
}