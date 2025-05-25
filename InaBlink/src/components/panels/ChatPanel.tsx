import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI assistant. Ask me about the latest tech news or trends!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with example responses based on input
    setTimeout(() => {
      let responseContent = '';
      
      if (input.toLowerCase().includes('ai') && input.toLowerCase().includes('trend')) {
        responseContent = "Based on the latest news, AI trends are focusing on multimodal models, AI safety, and regulation. For example, Anthropic just announced their latest Claude 3 model with improved capabilities for understanding images and documents.";
      } else if (input.toLowerCase().includes('github') || input.toLowerCase().includes('trending repo')) {
        responseContent = "The top trending repositories on GitHub this week include llama.cpp (an efficient LLM implementation), deno (a secure runtime for JS), and rust-analyzer (a Rust IDE support tool).";
      } else if (input.toLowerCase().includes('job') || input.toLowerCase().includes('career')) {
        responseContent = "There are several new job postings in tech. Companies like OpenAI, Anthropic, and Pathway are hiring ML engineers, while Amazon and Microsoft have opened roles for cloud architects.";
      } else {
        responseContent = "I've analyzed today's tech news. The hottest topics are AI advancements (especially LLMs), quantum computing breakthroughs, and increasing focus on tech regulation. Would you like me to elaborate on any of these?";
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-10rem)] flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700"
    >
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <h2 className="font-semibold flex items-center">
          <Bot size={18} className="mr-2 text-blue-500" />
          AI Assistant
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Ask questions about tech news & trends
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-700 rounded-tl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-3 rounded-lg bg-slate-100 dark:bg-slate-700 rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-full"
            title="Reset conversation"
          >
            <RotateCcw size={18} />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tech news..."
            className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-2 bg-blue-500 text-white rounded-full ${
              !input.trim() || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-600'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatPanel;