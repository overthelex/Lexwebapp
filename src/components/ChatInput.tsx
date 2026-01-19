import React, { useEffect, useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}
export function ChatInput({
  onSend,
  disabled
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [input]);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };
  return <div className="max-w-3xl mx-auto px-4 md:px-6 pb-6">
      <div className="relative bg-white rounded-[20px] border border-claude-border shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus-within:shadow-[0_2px_8px_rgba(0,0,0,0.08)] focus-within:border-claude-subtext/30 transition-all duration-300">
        <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message Lex..." disabled={disabled} rows={1} className="w-full py-[14px] pl-[18px] pr-[100px] bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-claude-text placeholder:text-claude-subtext/50 font-sans text-[15px] leading-relaxed max-h-[200px] overflow-y-auto" style={{
        minHeight: '52px'
      }} />

        <div className="absolute right-[10px] bottom-[10px] flex items-center gap-1">
          <button type="button" className="p-2 text-claude-subtext/60 hover:text-claude-text hover:bg-claude-bg rounded-lg transition-all duration-200" aria-label="Attach file">
            <Paperclip size={17} strokeWidth={2} />
          </button>
          <button onClick={handleSubmit} disabled={!input.trim() || disabled} className={`p-2 rounded-lg transition-all duration-200 ${input.trim() && !disabled ? 'bg-claude-accent text-white hover:bg-[#C66345] shadow-[0_1px_3px_rgba(217,119,87,0.3)] active:scale-95' : 'bg-claude-bg text-claude-subtext/30 cursor-not-allowed'}`} aria-label="Send message">
            <Send size={17} strokeWidth={2} className={input.trim() && !disabled ? 'translate-x-[1px]' : ''} />
          </button>
        </div>
      </div>
      <div className="text-center mt-3">
        <p className="text-[11px] text-claude-subtext/50 tracking-tight">
          Lex can make mistakes. Please use with discretion.
        </p>
      </div>
    </div>;
}