import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Info, Plus, Stethoscope, ClipboardList, Activity, AlertTriangle, MapPin } from 'lucide-react';
import { Message, RiskLevel, SessionSummary, OutbreakData } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { analyzeRisk, detectCity, extractDemographics } from '../utils/riskUtils';
import HealthSummaryCard from './HealthSummaryCard';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for new features
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('low');
  const [sessionSummary, setSessionSummary] = useState<SessionSummary>({
    riskLevel: 'low',
    keySymptoms: []
  });
  const [detectedCity, setDetectedCity] = useState<OutbreakData | null>(null);

  // Updated Initial Message: Asking for Demographics first
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      content: '**Diagnostic Protocol Initiated.**\n\nI am Dr. HealthGuard (AI). Before we begin the clinical assessment, please provide your **Age** and **Gender** (e.g., "25 Male").\n\n*This ensures I verify risk factors appropriate for your demographic.*',
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

  // Update summary card when AI pinpoints condition
  useEffect(() => {
    const lastModelMessage = [...messages].reverse().find(m => m.role === 'model');
    if (lastModelMessage) {
        // Simple regex to extract "Most likely condition is **X**"
        const conditionMatch = lastModelMessage.content.match(/most likely condition is \*\*(.*?)\*\*/i);
        if (conditionMatch) {
            setSessionSummary(prev => ({ ...prev, likelyCondition: conditionMatch[1] }));
        }
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    // --- STEP 1: DEMOGRAPHICS EXTRACTION (If not set) ---
    // If we don't have age/gender yet, try to parse it from this input
    if (!sessionSummary.age || !sessionSummary.gender) {
        const { age, gender } = extractDemographics(input);
        if (age || gender) {
            setSessionSummary(prev => ({
                ...prev,
                age: age || prev.age,
                gender: gender || prev.gender
            }));
        }
    }

    // --- STEP 2: RISK ANALYSIS ---
    const riskAssessment = analyzeRisk(input);
    const newRiskLevel = riskAssessment.level === 'high' ? 'high' : (riskAssessment.level === 'moderate' && riskLevel !== 'high' ? 'moderate' : riskLevel);
    setRiskLevel(newRiskLevel);
    
    // Update summary with new symptoms (basic keyword extraction)
    setSessionSummary(prev => ({
        ...prev, 
        riskLevel: newRiskLevel,
        keySymptoms: Array.from(new Set([...prev.keySymptoms, ...riskAssessment.detectedFlags, ...input.split(' ').filter(w => w.length > 6)])) // naive extraction + flags
            .slice(0, 8)
    }));

    // --- STEP 3: CITY DETECTION ---
    const cityData = detectCity(input);
    if (cityData) {
        setDetectedCity(cityData);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    // --- STEP 4: PREPARE CONTEXT FOR AI ---
    let contextInjection = "";
    
    // Inject Demographics if known
    if (sessionSummary.age || sessionSummary.gender) {
         contextInjection += `PATIENT DETAILS: Age ${sessionSummary.age || '?'}, Gender ${sessionSummary.gender || '?'}. `;
    }

    if (newRiskLevel === 'high') {
        contextInjection += "URGENT SAFETY INTERVENTION: The user has mentioned RED FLAG symptoms. You must immediately advise them to seek emergency medical care. Do not provide false reassurance. ";
    } else if (newRiskLevel === 'moderate') {
        contextInjection += "NOTE: User symptoms suggest moderate severity. Ask specific questions about duration and severity before diagnosing. ";
    }

    if (cityData) {
        contextInjection += `LOCAL CONTEXT: User is in ${cityData.city}. There is currently a ${cityData.trend} trend of ${cityData.diseaseName} cases here. Mention this if relevant. `;
    }

    const newMessages = [...messages, userMessage];
    
    // --- STEP 5: FRONTEND WARNING INJECTION ---
    if (newRiskLevel === 'high' && riskLevel !== 'high') {
        newMessages.push({
            id: Date.now().toString() + 'warn',
            role: 'model',
            content: "⚠️ **CRITICAL WARNING:** Your symptoms may indicate a serious medical emergency. Please seek immediate professional medical care or go to the nearest Emergency Room. This AI is not a substitute for emergency services.",
            timestamp: new Date(),
            isRiskWarning: true
        });
    }

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // --- STEP 6: SEND TO API ---
      const history = newMessages.filter(m => !m.isRiskWarning).map(m => ({ role: m.role, content: m.content }));
      const responseText = await sendMessageToGemini(userMessage.content, history, contextInjection);
      
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

  const startNewChat = () => {
    setMessages([{
        id: Date.now().toString(), 
        role: 'model', 
        content: '**Diagnostic Protocol Initiated.**\n\nI am Dr. HealthGuard (AI). Before we begin the clinical assessment, please provide your **Age** and **Gender** (e.g., "25 Male").', 
        timestamp: new Date() 
    }]);
    setRiskLevel('low');
    setSessionSummary({ riskLevel: 'low', keySymptoms: [] });
    setDetectedCity(null);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50">
      {/* Left Sidebar (Desktop) - Medical Record Style */}
      <div className="hidden md:flex md:w-80 flex-col bg-white border-r border-slate-200 shadow-sm overflow-y-auto custom-scrollbar">
         <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <button 
                onClick={startNewChat}
                className="w-full flex items-center justify-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-lg transition-colors shadow-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                <span>New Case File</span>
            </button>
         </div>
         
         <div className="p-5 flex-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Patient Overview</div>
            
            {/* Health Summary Card Component */}
            <HealthSummaryCard data={sessionSummary} />

            <div className="mt-6 space-y-4">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex items-center space-x-2 text-slate-700 font-semibold text-sm mb-1">
                        <ClipboardList className="w-4 h-4" />
                        <span>Protocol</span>
                    </div>
                    <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                        <li>Demographics Intake</li>
                        <li>Symptom Analysis</li>
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
                        Secure Connection • v1.0.5
                    </p>
                </div>
            </div>
            
            {/* Mobile Summary Indicator */}
            <div className="md:hidden flex items-center space-x-2">
                 <div className={`px-2 py-1 rounded text-xs font-bold ${riskLevel === 'high' ? 'bg-red-100 text-red-700' : 'bg-teal-50 text-teal-700'}`}>
                    Risk: {riskLevel.toUpperCase()}
                 </div>
            </div>
        </div>

        {/* High Risk Banner */}
        {riskLevel === 'high' && (
            <div className="bg-red-600 text-white px-6 py-3 flex items-center justify-center animate-pulse shadow-md z-20">
                <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                <p className="text-sm font-bold text-center">
                    ⚠️ WARNING: Symptoms indicate a potential medical emergency. Seek immediate professional care.
                </p>
            </div>
        )}

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            {messages.map((msg) => (
            <div
                key={msg.id}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`flex max-w-[95%] sm:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center mt-1 shadow-sm ${
                        msg.isRiskWarning ? 'bg-red-600 mr-3' :
                        msg.role === 'user' ? 'bg-slate-700 ml-3' : 'bg-teal-600 mr-3'
                    }`}>
                        {msg.isRiskWarning ? <AlertTriangle className="text-white w-5 h-5" /> : 
                         msg.role === 'user' ? <User className="text-white w-5 h-5" /> : <Bot className="text-white w-5 h-5" />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div
                        className={`p-5 text-sm sm:text-base leading-relaxed shadow-sm ${
                        msg.isRiskWarning
                            ? 'bg-red-50 text-red-900 border border-red-200 rounded-2xl rounded-tl-none'
                            : msg.role === 'user'
                            ? 'bg-white text-slate-800 rounded-2xl rounded-tr-none border border-slate-200'
                            : 'bg-white text-slate-800 rounded-2xl rounded-tl-none border-l-4 border-l-teal-500 border-y border-r border-slate-200'
                        }`}
                    >
                        {/* Label for Bot */}
                        {msg.role === 'model' && !msg.isRiskWarning && (
                            <div className="mb-2 text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center justify-between">
                                <span>Diagnostic Report</span>
                                {/* Inline Outbreak Alert inside bot message if relevant to current turn - simple logic */}
                                {detectedCity && messages.indexOf(msg) === messages.length - 1 && (
                                    <span className="flex items-center text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {detectedCity.city}: {detectedCity.diseaseName} Alert
                                    </span>
                                )}
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
                placeholder={
                    !sessionSummary.age 
                    ? "Enter Age and Gender (e.g., 25 Male)..." 
                    : riskLevel === 'high' ? "Describe emergency symptoms..." : "Describe your symptoms..."
                }
                className={`w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:ring-2 focus:border-transparent py-4 pl-5 pr-14 shadow-sm transition-all text-base ${riskLevel === 'high' ? 'focus:ring-red-500' : 'focus:ring-teal-500'}`}
                disabled={isLoading}
                autoFocus
                />
                <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`absolute right-2 p-2.5 rounded-lg text-white disabled:opacity-50 disabled:bg-slate-300 transition-all shadow-sm hover:shadow transform hover:scale-105 ${riskLevel === 'high' ? 'bg-red-600 hover:bg-red-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                >
                <Send className="h-5 w-5" />
                </button>
            </form>
            <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center">
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse ${riskLevel === 'high' ? 'bg-red-600' : 'bg-green-500'}`}></span>
                {riskLevel === 'high' ? 'HIGH ALERT MODE ACTIVE' : 'Secure Encrypted Channel Active'}
            </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;