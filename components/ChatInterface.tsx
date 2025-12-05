import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Info, Plus, Stethoscope, ClipboardList, Activity } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      content: '**Diagnostic Protocol Initiated.**\n\nI am Dr. HealthGuard (AI). I am designed to pinpoint the specific cause of your health concern.\n\nPlease describe your primary symptom in detail (e.g., location, duration, severity) to begin the assessment.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const responseText = await sendMessageToGemini(userMessage.content, history);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50">
      {/* Left Sidebar (Desktop) - Medical Record Style */}
      <div className="hidden md:flex md:w-72 flex-col bg-white border-r border-slate-200 shadow-sm">
         <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <button 
                onClick={() => setMessages([{
                    id: Date.now().toString(), 
                    role: 'model', 
                    content: '**Diagnostic Protocol Initiated.**\n\nI am Dr. HealthGuard (AI). I am designed to pinpoint the specific cause of your health concern.\n\nPlease describe your primary symptom in detail to begin.', 
                    timestamp: new Date() 
                }])}
                className="w-full flex items-center justify-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-lg transition-colors shadow-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                <span>New Case File</span>
            </button>
         </div>
         
         <div className="p-5 flex-1 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">System Status</div>
            
            <div className="space-y-4">
                <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                    <div className="flex items-center space-x-2 text-teal-800 font-semibold text-sm mb-1">
                        <Activity className="w-4 h-4" />
                        <span>Triage Mode</span>
                    </div>
                    <p className="text-xs text-teal-600 leading-relaxed">
                        Active diagnostic algorithm. Pinpointing single-source pathology based on symptom clusters.
                    </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center space-x-2 text-slate-700 font-semibold text-sm mb-1">
                        <ClipboardList className="w-4 h-4" />
                        <span>Protocol</span>
                    </div>
                    <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                        <li>Symptom Intake</li>
                        <li>Differential Queries</li>
                        <li>Risk Stratification</li>
                        <li>Final Assessment</li>
                    </ul>
                </div>
            </div>
         </div>
         
         <div className="p-4 bg-slate-900 text-slate-300 text-xs">
            <p className="font-bold text-white mb-1 flex items-center">
                <Info className="w-3 h-3 mr-1" /> Disclaimer
            </p>
            This prototype is for demonstration only. It does not replace professional medical advice.
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[#f8fafc]">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 py-3 px-6 shadow-sm z-10 flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
                <div className="bg-teal-600 p-2 rounded-md shadow-sm">
                    <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight">AI Diagnostic Interface</h2>
                    <p className="text-[10px] uppercase tracking-wide text-teal-600 font-bold">
                        Secure Connection • v1.0.4
                    </p>
                </div>
            </div>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            {messages.map((msg) => (
            <div
                key={msg.id}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`flex max-w-[95%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center mt-1 shadow-sm ${msg.role === 'user' ? 'bg-slate-700 ml-3' : 'bg-teal-600 mr-3'}`}>
                        {msg.role === 'user' ? <User className="text-white w-5 h-5" /> : <Bot className="text-white w-5 h-5" />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div
                        className={`p-5 text-sm sm:text-base leading-relaxed shadow-sm ${
                        msg.role === 'user'
                            ? 'bg-white text-slate-800 rounded-2xl rounded-tr-none border border-slate-200'
                            : 'bg-white text-slate-800 rounded-2xl rounded-tl-none border-l-4 border-l-teal-500 border-y border-r border-slate-200'
                        }`}
                    >
                        {/* Label for Bot */}
                        {msg.role === 'model' && (
                            <div className="mb-2 text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center">
                                Diagnostic Report
                            </div>
                        )}
                         {/* Label for User */}
                         {msg.role === 'user' && (
                            <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                                Patient Input
                            </div>
                        )}

                        <div className="markdown-body prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0 prose-headings:text-teal-900 prose-headings:font-bold prose-strong:text-slate-900" 
                             dangerouslySetInnerHTML={{ 
                                __html: msg.content
                                    .replace(/\n/g, '<br />')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }} 
                        />
                        
                        <div className={`text-[10px] mt-3 font-medium border-t pt-2 ${msg.role === 'user' ? 'text-slate-300 border-slate-100' : 'text-slate-400 border-slate-100'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.role === 'user' ? 'Sent' : 'Generated by Gemini 2.5'}
                        </div>
                    </div>
                </div>
            </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
            <div className="flex justify-start animate-pulse">
                <div className="flex flex-row">
                    <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-teal-600 mr-3 flex items-center justify-center shadow-sm opacity-50">
                        <Bot className="text-white w-5 h-5" />
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                        <div className="space-y-1">
                            <div className="h-2 bg-slate-200 rounded w-24"></div>
                            <div className="h-2 bg-slate-100 rounded w-16"></div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="relative flex items-center group">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms here..."
                className="w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 py-4 pl-5 pr-14 shadow-sm transition-all text-base"
                disabled={isLoading}
                autoFocus
                />
                <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:bg-slate-300 transition-all shadow-sm hover:shadow transform hover:scale-105"
                >
                <Send className="h-5 w-5" />
                </button>
            </form>
            <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
                For medical emergencies, call emergency services immediately.
            </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;