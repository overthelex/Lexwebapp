import React from 'react';
import { Plus, MessageSquare, X, Users, Briefcase, FileText, Scale, Clock, Gavel, BookOpen, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onProfileClick?: () => void;
}
export function Sidebar({
  isOpen,
  onClose,
  onNewChat,
  onProfileClick
}: SidebarProps) {
  const contextSections = [{
    id: 'clients',
    label: 'Клиенты',
    icon: Users,
    count: 12
  }, {
    id: 'cases',
    label: 'Дела',
    icon: Briefcase,
    count: 8
  }, {
    id: 'documents',
    label: 'Документы',
    icon: FileText,
    count: 45
  }, {
    id: 'legal-sources',
    label: 'Источники права',
    icon: Scale,
    count: null
  }, {
    id: 'history',
    label: 'История запросов',
    icon: Clock,
    count: null
  }];
  const evidenceSections = [{
    id: 'decisions',
    label: 'Судебные решения',
    icon: Gavel
  }, {
    id: 'regulations',
    label: 'Нормативные акты',
    icon: BookOpen
  }, {
    id: 'commentary',
    label: 'Комментарии и практика',
    icon: MessageSquare
  }, {
    id: 'verification',
    label: 'Проверка актуальности',
    icon: CheckCircle
  }];
  return <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }} onClick={onClose} className="fixed inset-0 bg-black/25 z-40 lg:hidden backdrop-blur-[2px]" />}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside initial={false} animate={{
      x: isOpen ? 0 : -280
    }} transition={{
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }} className="fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-claude-sidebar border-r border-claude-border flex flex-col lg:translate-x-0">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-claude-border/50">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 bg-claude-accent rounded-lg flex items-center justify-center">
              <Scale size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-serif font-semibold text-lg text-claude-text tracking-tight">
              Legal AI
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-lg transition-all duration-200">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 pb-3">
          <button onClick={() => {
          onNewChat();
          if (window.innerWidth < 1024) onClose();
        }} className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-claude-border hover:bg-claude-bg hover:border-claude-accent/30 rounded-[12px] text-claude-text shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 group active:scale-[0.98]">
            <div className="p-1 bg-claude-accent/10 rounded-full group-hover:bg-claude-accent/15 transition-colors duration-200">
              <Plus size={15} strokeWidth={2.5} className="text-claude-accent" />
            </div>
            <span className="font-medium text-[13px] tracking-tight">
              Новый запрос
            </span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3 py-1">
          {/* Context Section */}
          <div className="mb-6">
            <h3 className="px-3 py-2 text-[11px] font-semibold text-claude-subtext/70 uppercase tracking-[0.5px]">
              Контекст работы
            </h3>
            <div className="space-y-0.5">
              {contextSections.map(section => <button key={section.id} className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-claude-text hover:bg-claude-subtext/8 transition-all duration-200 flex items-center justify-between group">
                  <div className="flex items-center gap-3 min-w-0">
                    <section.icon size={15} strokeWidth={2} className="text-claude-subtext/60 group-hover:text-claude-accent transition-colors duration-200 flex-shrink-0" />
                    <span className="truncate font-medium tracking-tight">
                      {section.label}
                    </span>
                  </div>
                  {section.count !== null && <span className="text-[11px] text-claude-subtext/50 font-medium px-1.5 py-0.5 bg-claude-subtext/5 rounded flex-shrink-0">
                      {section.count}
                    </span>}
                </button>)}
            </div>
          </div>

          {/* Evidence Section */}
          <div className="mb-6">
            <h3 className="px-3 py-2 text-[11px] font-semibold text-claude-subtext/70 uppercase tracking-[0.5px]">
              Доказательная база
            </h3>
            <div className="space-y-0.5">
              {evidenceSections.map(section => <button key={section.id} className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-claude-text hover:bg-claude-subtext/8 transition-all duration-200 flex items-center gap-3 group">
                  <section.icon size={15} strokeWidth={2} className="text-claude-subtext/60 group-hover:text-claude-accent transition-colors duration-200 flex-shrink-0" />
                  <span className="truncate font-medium tracking-tight">
                    {section.label}
                  </span>
                </button>)}
            </div>
          </div>

          {/* Upgrade Card */}
          <div className="px-3 py-3 border-t border-claude-border/50">
            <div className="p-3.5 bg-gradient-to-br from-claude-accent/8 to-claude-accent/4 rounded-[12px] border border-claude-accent/15">
              <h4 className="text-[13px] font-semibold text-claude-text mb-1 tracking-tight">
                Upgrade to Pro
              </h4>
              <p className="text-[11px] text-claude-subtext/80 mb-3 leading-relaxed">
                Доступ к расширенной базе решений и аналитике.
              </p>
              <button className="text-[12px] font-semibold text-white bg-claude-accent hover:bg-[#C66345] px-3 py-1.5 rounded-lg transition-all duration-200 w-full shadow-[0_1px_3px_rgba(217,119,87,0.3)] active:scale-[0.98]">
                Обновить
              </button>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-claude-border">
          <button onClick={onProfileClick} className="w-full flex items-center gap-3 px-2 py-2 hover:bg-claude-subtext/8 rounded-lg transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-claude-subtext/15 flex items-center justify-center text-claude-subtext text-[11px] font-semibold">
              JD
            </div>
            <div className="flex-1 text-left">
              <div className="text-[13px] font-semibold text-claude-text tracking-tight">
                John Doe
              </div>
              <div className="text-[11px] text-claude-subtext/70">Юрист</div>
            </div>
          </button>
        </div>
      </motion.aside>
    </>;
}