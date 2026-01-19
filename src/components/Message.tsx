import React from 'react';
import { Copy, RotateCw, User } from 'lucide-react';
import { motion } from 'framer-motion';
export type MessageRole = 'user' | 'assistant';
export interface MessageProps {
  id: string;
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
}
export function Message({
  role,
  content,
  isStreaming
}: MessageProps) {
  const isUser = role === 'user';
  return <motion.div initial={{
    opacity: 0,
    y: 12
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  }} className="group w-full py-6 md:py-7">
      <div className="max-w-3xl mx-auto px-4 md:px-6 flex gap-4 md:gap-5">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-0.5">
          {isUser ? <div className="w-8 h-8 rounded-full bg-claude-subtext/15 flex items-center justify-center text-claude-subtext">
              <User size={15} strokeWidth={2} />
            </div> : <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#1E293B] flex items-center justify-center shadow-sm">
              <img src="/Image_1.jpg" alt="Lex" className="w-full h-full object-cover" />
            </div>}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center">
            <span className="font-sans font-semibold text-[13px] text-claude-text tracking-tight">
              {isUser ? 'You' : 'Lex'}
            </span>
          </div>

          <div className={`max-w-none ${isUser ? 'font-sans text-[15px] leading-relaxed text-claude-text' : 'font-serif text-[17px] leading-[1.7] text-claude-text'}`}>
            <p className="whitespace-pre-wrap m-0">{content}</p>
            {isStreaming && <span className="inline-block w-[3px] h-[18px] ml-1 bg-claude-accent animate-pulse align-middle rounded-[1px]" />}
          </div>

          {/* Actions (Only visible on hover for assistant) */}
          {!isUser && !isStreaming && <div className="flex items-center gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-md transition-all duration-200" aria-label="Copy message">
                <Copy size={14} strokeWidth={2} />
              </button>
              <button className="p-2 text-claude-subtext hover:text-claude-text hover:bg-claude-subtext/8 rounded-md transition-all duration-200" aria-label="Regenerate response">
                <RotateCw size={14} strokeWidth={2} />
              </button>
            </div>}
        </div>
      </div>
    </motion.div>;
}