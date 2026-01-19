import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, PenTool, Lightbulb } from 'lucide-react';
interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}
export function EmptyState({
  onSelectPrompt
}: EmptyStateProps) {
  const suggestions = [{
    icon: <Code size={18} strokeWidth={2} />,
    text: 'Help me debug this React component',
    category: 'Coding'
  }, {
    icon: <PenTool size={18} strokeWidth={2} />,
    text: 'Draft a professional email to a client',
    category: 'Writing'
  }, {
    icon: <Lightbulb size={18} strokeWidth={2} />,
    text: 'Brainstorm marketing ideas for a new app',
    category: 'Brainstorming'
  }, {
    icon: <Sparkles size={18} strokeWidth={2} />,
    text: 'Explain quantum computing simply',
    category: 'Learning'
  }];
  return <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-[60vh]">
      <motion.div initial={{
      opacity: 0,
      y: 24
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }} className="text-center max-w-2xl mx-auto space-y-10">
        <div className="w-[120px] h-[72px] mx-auto flex items-center justify-center">
          <img src="/Image.jpg" alt="Lex" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-[32px] md:text-[40px] text-claude-text font-medium tracking-tight leading-tight">
            How can I help you today?
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
          {suggestions.map((suggestion, index) => <motion.button key={index} initial={{
          opacity: 0,
          y: 12
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.15 + index * 0.08,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }} onClick={() => onSelectPrompt(suggestion.text)} className="flex items-start gap-3.5 p-4 bg-white border border-claude-border hover:border-claude-accent/40 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] rounded-[14px] text-left transition-all duration-300 group active:scale-[0.98]">
              <div className="p-2 bg-claude-bg rounded-lg text-claude-subtext group-hover:text-claude-accent group-hover:bg-claude-accent/10 transition-all duration-300 flex-shrink-0">
                {suggestion.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-claude-subtext/70 mb-1 uppercase tracking-[0.5px]">
                  {suggestion.category}
                </div>
                <div className="text-[14px] text-claude-text font-medium leading-snug">
                  {suggestion.text}
                </div>
              </div>
            </motion.button>)}
        </div>
      </motion.div>
    </div>;
}