'use client';

// ==========================================
// AI SUPPORT ASSISTANT
// Protocol Counsel - Client support with AI
// ==========================================

import { useState } from 'react';

interface SupportMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  messages: SupportMessage[];
}

const FAQ_DATA = [
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page, or contact your Firm Administrator to request a password reset. If you're the admin, contact support.",
  },
  {
    question: "How do I add a new user to my account?",
    answer: "Navigate to Staff Management in your portal. Click 'Invite User', enter their email address, and select their role. They will receive an invitation email.",
  },
  {
    question: "How do I place a bulk order?",
    answer: "In the Order Management portal, use the Quick-Quantity selector or upload a CSV file. Each row should contain: Service Type, Recipient Name, Address, City, State, ZIP, Priority.",
  },
  {
    question: "When will my order be completed?",
    answer: "Standard orders are typically completed within 24-48 hours. Rush orders are prioritized. Expedited orders receive same-day service. Track your order status in real-time in the portal.",
  },
  {
    question: "How do I update my firm information?",
    answer: "Go to Firm Settings in your portal. You can update your return address, FedEx account number, and default service preferences there.",
  },
  {
    question: "How do I view my invoices?",
    answer: "Invoices are available in the Billing section of your portal. You can view, download, and pay online. Net 30 terms are available for qualified firms.",
  },
];

export function AISupport({ firmId, userId, userEmail }: { firmId: string; userId: string; userEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: SupportMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (in production, call AI API)
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: SupportMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check FAQ
    for (const faq of FAQ_DATA) {
      if (lowerQuery.includes(faq.question.toLowerCase().split(' ')[0]) || 
          lowerQuery.includes('password') && faq.question.toLowerCase().includes('password') ||
          lowerQuery.includes('bulk') && faq.question.toLowerCase().includes('bulk') ||
          lowerQuery.includes('order') && faq.question.toLowerCase().includes('order') ||
          lowerQuery.includes('invoice') && faq.question.toLowerCase().includes('invoice')) {
        return faq.answer;
      }
    }
    
    // Default responses
    if (lowerQuery.includes('login') || lowerQuery.includes('access')) {
      return "For login issues, please verify your credentials. If you've forgotten your password, use the 'Forgot Password' link. For persistent issues, contact your Firm Administrator or submit a support ticket below.";
    }
    
    if (lowerQuery.includes('price') || lowerQuery.includes('cost')) {
      return "Pricing information is available on our Pricing page. For custom enterprise quotes, please schedule a consultation. Finance data is restricted to authorized firm administrators.";
    }
    
    return "Thank you for your question. For detailed assistance, please submit a support ticket below. Our team typically responds within 2 hours during business hours.";
  };

  const openTicket = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={openTicket}
        className="fixed bottom-6 right-6 bg-[#002147] text-white px-4 py-3 rounded-lg shadow-lg hover:bg-slate-800 transition flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="font-medium">Support</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-[500px] bg-white rounded-lg shadow-2xl border overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#002147] text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-medium">Client Support</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-h-80">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 py-4">
            <p className="text-sm mb-2">How can we help you today?</p>
            <p className="text-xs text-slate-400">Common questions: login issues, bulk orders, pricing</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-[85%] p-3 rounded-lg ${
                msg.role === 'user' ? 'bg-[#002147] text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-3 bg-slate-100 rounded-lg">
              <p className="text-sm text-slate-500">Thinking...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-[#002147] outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-3 py-2 bg-[#D4AF37] text-[#002147] rounded text-sm font-medium hover:bg-[#b8962f] disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          For urgent issues, contact your Firm Administrator
        </p>
      </div>
    </div>
  );
}

export default AISupport;