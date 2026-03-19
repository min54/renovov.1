import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getSkinConsultation } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '안녕하세요! 벨아미리노보 피부과 AI 상담원입니다. 피부 고민을 말씀해 주시면 적절한 시술을 추천해 드릴게요. (예: "여드름 흉터가 고민이에요", "얼굴 탄력이 떨어졌어요")' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getSkinConsultation(input);

    const aiMsg: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <section id="consultant" className="py-16 lg:py-24 bg-[#0f172a] relative overflow-hidden text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#4fd1c5] blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <Bot size={18} className="text-[#4fd1c5]" />
            <span className="text-[10px] font-medium text-gray-300 tracking-wide uppercase">AI Skin Analysis</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            내 피부에 딱 맞는 <br />
            <span className="text-[#4fd1c5]">맞춤 시술 찾기</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            AI가 고객님의 피부 고민을 분석하여 레노보의 최적의 솔루션을 제안합니다.
          </p>
          <ul className="space-y-3 pt-4">
            {['24시간 실시간 상담', '개인 맞춤형 추천', '시술 정보 즉시 확인'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-300 text-xs font-medium">
                <div className="w-5 h-5 rounded-full bg-[#0f5156] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[500px] flex flex-col border border-slate-200/10">
          {/* Chat Header */}
          <div className="bg-[#0f172a] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#4fd1c5]">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Renovo AI Consultant</h3>
                <p className="text-[9px] text-[#4fd1c5] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4fd1c5] animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setMessages([{ role: 'model', text: '안녕하세요! 벨아미리노보 피부과 AI 상담원입니다.' }])}
              className="text-white/40 hover:text-white p-2 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-3 rounded-xl text-xs leading-relaxed shadow-sm ${msg.role === 'user'
                    ? 'bg-white text-slate-800 rounded-tr-none border border-slate-100'
                    : 'bg-[#0f5156] text-white rounded-tl-none'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#0f5156] p-3 rounded-xl rounded-tl-none text-white shadow-sm flex items-center gap-2">
                  <Loader2 size={12} className="animate-spin" />
                  <span className="text-[10px]">분석 중...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요..."
                className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0f5156] text-slate-800 text-xs"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 top-1.5 w-8 h-8 bg-[#0f5156] text-white rounded-lg flex items-center justify-center hover:bg-[#0a383c] disabled:bg-slate-300 transition-colors shadow-lg shadow-[#0f5156]/20"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;