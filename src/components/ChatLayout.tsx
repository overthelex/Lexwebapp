import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { ChatInput } from './ChatInput';
import { MessageThread } from './MessageThread';
import { EmptyState } from './EmptyState';
import { MessageProps } from './Message';
import { ProfilePage } from './ProfilePage';
import { JudgesPage } from './JudgesPage';
import { LawyersPage } from './LawyersPage';
import { ClientsPage } from './ClientsPage';
import { CasesPage } from './CasesPage';
import { HistoryPage } from './HistoryPage';
import { DecisionsSearchPage } from './DecisionsSearchPage';
import { LoginPage } from './LoginPage';
import { PersonDetailPage } from './PersonDetailPage';
import { ClientDetailPage } from './ClientDetailPage';
import { ClientMessagingPage } from './ClientMessagingPage';
import { CaseAnalysisPage } from './CaseAnalysisPage';
import { LegislationMonitoringPage } from './LegislationMonitoringPage';
import { CourtPracticeAnalysisPage } from './CourtPracticeAnalysisPage';
import { LegalInitiativesPage } from './LegalInitiativesPage';
import { LegislationStatisticsPage } from './LegislationStatisticsPage';
import { VotingAnalysisPage } from './VotingAnalysisPage';
import { LegalCodesLibraryPage } from './LegalCodesLibraryPage';
import { HistoricalAnalysisPage } from './HistoricalAnalysisPage';
import {
  PanelRightOpen,
  PanelLeftOpen,
  FileText,
  Share2,
  X,
  Menu } from
'lucide-react';
type ViewState =
'chat' |
'profile' |
'judges' |
'lawyers' |
'clients' |
'cases' |
'history' |
'decisions' |
'login' |
'person-detail' |
'client-detail' |
'client-messaging' |
'case-analysis' |
'legislation-monitoring' |
'court-practice-analysis' |
'legal-initiatives' |
'legislation-statistics' |
'voting-analysis' |
'legal-codes-library' |
'historical-analysis';
interface SelectedPerson {
  type: 'judge' | 'lawyer';
  data: {
    id: string;
    name: string;
    position: string;
    cases: number;
    successRate: number;
    specialization: string;
  };
}
interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  activeCases: number;
  status: 'active' | 'inactive';
  lastContact: string;
  type: 'individual' | 'corporate';
}
export function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('chat');
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(
    null
  );
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [messagingClientIds, setMessagingClientIds] = useState<string[]>([]);
  const handleSend = async (content: string) => {
    const userMessage: MessageProps = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);
    setTimeout(() => {
      const aiMessage: MessageProps = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
        'Проаналізував документацію Порталу відкритих даних Верховної Ради України. Нижче наведено детальний огляд архітектури доступу до API.\n\n# Архітектура доступу до API\n\nПортал надає два різновиди API з різними вимогами до автентифікації:\n\n## 1. Портал відкритих даних ВРУ (безключовий доступ)\n\nДоступ до API цього порталу здійснюється без обмежень. Ключові особливості:\n\n- Не потрібна реєстрація або API ключ\n- Доступні всі публічні датасети\n- Обмеження за кількістю запитів не встановлено офіційно',
        isStreaming: true,
        thinkingSteps: [
        {
          id: 's1',
          title:
          'Розпланував дослідження API документації та вимог автентифікації',
          content:
          'Визначив необхідність аналізу офіційної документації порталу data.rada.gov.ua',
          isComplete: true
        }],

        decisions: [
        {
          id: 'd1',
          number: '910/12345/23',
          court: 'Верховний Суд КГС',
          date: '15.05.2023',
          summary:
          'Постанова щодо застосування строків позовної давності у спорах про стягнення неустойки за договорами поставки.',
          relevance: 95,
          status: 'active'
        }],

        citations: [
        {
          text: "Боржник звільняється від відповідальності за порушення зобов'язання, якщо він доведе, що це порушення сталося внаслідок випадку або непереборної сили.",
          source: 'ЦКУ ст. 617'
        }]

      };
      setMessages((prev) => [...prev, aiMessage]);
      setTimeout(() => {
        setMessages((prev) =>
        prev.map((msg) =>
        msg.id === aiMessage.id ?
        {
          ...msg,
          isStreaming: false
        } :
        msg
        )
        );
        setIsStreaming(false);
      }, 2000);
    }, 1000);
  };
  const handleNewChat = () => {
    setMessages([]);
    setIsStreaming(false);
    setCurrentView('chat');
    setSelectedPerson(null);
    setSelectedClient(null);
    setMessagingClientIds([]);
  };
  const handleLogout = () => {
    setCurrentView('login');
    setMessages([]);
    setIsStreaming(false);
    setSelectedPerson(null);
    setSelectedClient(null);
    setMessagingClientIds([]);
  };
  // Get page title based on current view
  const getPageTitle = () => {
    if (currentView === 'chat') return 'Чат';
    if (currentView === 'profile') return 'Профіль';
    if (currentView === 'judges') return 'Судді';
    if (currentView === 'lawyers') return 'Адвокати';
    if (currentView === 'clients') return 'Клієнти';
    if (currentView === 'cases') return 'Справи';
    if (currentView === 'history') return 'Історія запитів';
    if (currentView === 'decisions') return 'Пошук судових рішень';
    if (currentView === 'client-messaging') return 'Відправити повідомлення';
    if (currentView === 'case-analysis') return 'Аналіз справи';
    if (currentView === 'legislation-monitoring')
    return 'Моніторинг законодавства';
    if (currentView === 'court-practice-analysis')
    return 'Аналіз судової практики';
    if (currentView === 'legal-initiatives') return 'Законодавчі ініціативи';
    if (currentView === 'legislation-statistics') return 'Статистика законів';
    if (currentView === 'voting-analysis') return 'Аналіз голосувань';
    if (currentView === 'legal-codes-library') return 'Бібліотека кодексів';
    if (currentView === 'historical-analysis') return 'Історичний аналіз';
    if (selectedPerson) return selectedPerson.data.name;
    if (selectedClient) return selectedClient.name;
    return 'Чат';
  };
  // If on login page, show only login
  if (currentView === 'login') {
    return <LoginPage />;
  }
  const renderContent = () => {
    if (currentView === 'profile') {
      return (
        <div className="flex-1 overflow-hidden relative">
          <button
            onClick={() => setCurrentView('chat')}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">

            <X size={20} />
          </button>
          <ProfilePage />
        </div>);

    }
    if (currentView === 'judges') {
      return (
        <div className="flex-1 overflow-hidden relative">
          <button
            onClick={() => setCurrentView('chat')}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">

            <X size={20} />
          </button>
          <JudgesPage
            onSelectJudge={(judge) => {
              setSelectedPerson({
                type: 'judge',
                data: {
                  id: judge.id,
                  name: judge.name,
                  position: judge.court,
                  cases: judge.cases,
                  successRate: judge.approvalRate,
                  specialization: judge.specialization
                }
              });
              setCurrentView('person-detail');
            }} />

        </div>);

    }
    if (currentView === 'lawyers') {
      return (
        <div className="flex-1 overflow-hidden relative">
          <button
            onClick={() => setCurrentView('chat')}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">

            <X size={20} />
          </button>
          <LawyersPage
            onSelectLawyer={(lawyer) => {
              setSelectedPerson({
                type: 'lawyer',
                data: {
                  id: lawyer.id,
                  name: lawyer.name,
                  position: lawyer.firm,
                  cases: lawyer.cases,
                  successRate: lawyer.successRate,
                  specialization: lawyer.specialization
                }
              });
              setCurrentView('person-detail');
            }} />

        </div>);

    }
    if (currentView === 'clients') {
      return (
        <div className="flex-1 overflow-hidden relative">
          <button
            onClick={() => setCurrentView('chat')}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">

            <X size={20} />
          </button>
          <ClientsPage
            onSelectClient={(client) => {
              setSelectedClient(client);
              setCurrentView('client-detail');
            }}
            onSendMessage={(clientIds) => {
              setMessagingClientIds(clientIds);
              setCurrentView('client-messaging');
            }} />

        </div>);

    }
    if (currentView === 'cases') {
      return (
        <div className="flex-1 overflow-hidden relative">
          <button
            onClick={() => setCurrentView('chat')}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">

            <X size={20} />
          </button>
          <CasesPage />
        </div>);

    }
    if (currentView === 'history') {
      return (
        <div className="flex-1 overflow-hidden relative">
          <button
            onClick={() => setCurrentView('chat')}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">

            <X size={20} />
          </button>
          <HistoryPage />
        </div>);

    }
    if (currentView === 'decisions') {
      return (
        <div className="flex-1 overflow-hidden relative">
          <button
            onClick={() => setCurrentView('chat')}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm border border-claude-border text-claude-subtext hover:text-claude-text transition-colors">

            <X size={20} />
          </button>
          <DecisionsSearchPage />
        </div>);

    }
    if (currentView === 'case-analysis') {
      return <CaseAnalysisPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'legislation-monitoring') {
      return <LegislationMonitoringPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'court-practice-analysis') {
      return <CourtPracticeAnalysisPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'legal-initiatives') {
      return <LegalInitiativesPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'legislation-statistics') {
      return <LegislationStatisticsPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'voting-analysis') {
      return <VotingAnalysisPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'legal-codes-library') {
      return <LegalCodesLibraryPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'historical-analysis') {
      return <HistoricalAnalysisPage onBack={() => setCurrentView('chat')} />;
    }
    if (currentView === 'person-detail' && selectedPerson) {
      return (
        <PersonDetailPage
          type={selectedPerson.type}
          person={selectedPerson.data}
          onBack={() => {
            if (selectedPerson.type === 'judge') setCurrentView('judges');else
            setCurrentView('lawyers');
            setSelectedPerson(null);
          }} />);


    }
    if (currentView === 'client-detail' && selectedClient) {
      return (
        <ClientDetailPage
          client={selectedClient}
          onBack={() => {
            setCurrentView('clients');
            setSelectedClient(null);
          }} />);


    }
    if (currentView === 'client-messaging') {
      return (
        <ClientMessagingPage
          clientIds={messagingClientIds}
          onBack={() => {
            setCurrentView('clients');
            setMessagingClientIds([]);
          }} />);


    }
    return (
      <>
        {messages.length === 0 ?
        <EmptyState onSelectPrompt={handleSend} /> :

        <MessageThread messages={messages} />
        }
        <div className="w-full bg-gradient-to-t from-white via-white to-transparent pt-6 pb-4 z-20 border-t border-claude-border/30">
          <ChatInput onSend={handleSend} disabled={isStreaming} />
        </div>
      </>);

  };
  const pageTitle = getPageTitle();
  return (
    <div className="flex h-screen bg-claude-bg overflow-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNewChat={handleNewChat}
          onProfileClick={() => {
            setCurrentView('profile');
            setIsSidebarOpen(false);
          }}
          onJudgesClick={() => {
            setCurrentView('judges');
            setIsSidebarOpen(false);
          }}
          onLawyersClick={() => {
            setCurrentView('lawyers');
            setIsSidebarOpen(false);
          }}
          onClientsClick={() => {
            setCurrentView('clients');
            setIsSidebarOpen(false);
          }}
          onCasesClick={() => {
            setCurrentView('cases');
            setIsSidebarOpen(false);
          }}
          onHistoryClick={() => {
            setCurrentView('history');
            setIsSidebarOpen(false);
          }}
          onDecisionsClick={() => {
            setCurrentView('decisions');
            setIsSidebarOpen(false);
          }}
          onLegislationMonitoringClick={() => {
            setCurrentView('legislation-monitoring');
            setIsSidebarOpen(false);
          }}
          onCourtPracticeAnalysisClick={() => {
            setCurrentView('court-practice-analysis');
            setIsSidebarOpen(false);
          }}
          onLegalInitiativesClick={() => {
            setCurrentView('legal-initiatives');
            setIsSidebarOpen(false);
          }}
          onLegislationStatisticsClick={() => {
            setCurrentView('legislation-statistics');
            setIsSidebarOpen(false);
          }}
          onVotingAnalysisClick={() => {
            setCurrentView('voting-analysis');
            setIsSidebarOpen(false);
          }}
          onLegalCodesLibraryClick={() => {
            setCurrentView('legal-codes-library');
            setIsSidebarOpen(false);
          }}
          onHistoricalAnalysisClick={() => {
            setCurrentView('historical-analysis');
            setIsSidebarOpen(false);
          }}
          onLogout={handleLogout} />

      </div>

      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-6 py-3 border-b border-claude-border bg-white/80 backdrop-blur-sm sticky top-0 z-30">
          {/* Left: Toggle button */}
          <div className="flex items-center gap-3 w-[200px]">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-lg transition-all duration-200"
              title={isSidebarOpen ? 'Сховати меню' : 'Показати меню'}>

              {isSidebarOpen ?
              <X size={18} strokeWidth={2} /> :

              <Menu size={18} strokeWidth={2} />
              }
            </button>
          </div>

          {/* Center: Page title */}
          <div className="flex-1 flex items-center justify-center">
            <h1 className="font-sans text-lg text-claude-text font-medium">
              {pageTitle}
            </h1>
          </div>

          {/* Right: Toggle right panel button */}
          <div className="flex items-center justify-end gap-2 w-[200px]">
            <button
              onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
              className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-lg transition-all duration-200"
              title={isRightPanelOpen ? 'Сховати панель' : 'Показати панель'}>

              {isRightPanelOpen ?
              <X size={18} strokeWidth={2} /> :

              <PanelRightOpen size={18} strokeWidth={2} />
              }
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-2.5 border-b border-claude-border bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-lg transition-all duration-200">

            <img
              src="/Image_1.jpg"
              alt="Menu"
              className="w-6 h-6 object-contain" />

          </button>
          <div className="flex items-center">
            {pageTitle ?
            <h1 className="text-base font-sans text-claude-text font-medium">
                {pageTitle}
              </h1> :

            <img
              src="/Image.jpg"
              alt="Lex"
              className="h-10 w-auto object-contain" />

            }
          </div>
          <button
            onClick={() => setIsRightPanelOpen(true)}
            className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-lg transition-all duration-200">

            <PanelRightOpen size={20} strokeWidth={2} />
          </button>
        </header>

        <div className="flex-1 flex flex-col relative overflow-hidden">
          {renderContent()}
        </div>
      </main>

      {/* Right Panel */}
      <div className={`${isRightPanelOpen ? 'block' : 'hidden'}`}>
        <RightPanel
          isOpen={isRightPanelOpen}
          onClose={() => setIsRightPanelOpen(false)} />

      </div>
    </div>);

}