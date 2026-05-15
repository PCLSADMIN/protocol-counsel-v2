'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ConciergePage() {
  const [messages, setMessages] = useState<{role: string; content: string}[]>([
    { role: 'assistant', content: 'Hello! I\'m Streamline Concierge. I can help with login issues, billing questions, and general inquiries about Protocol Counsel infrastructure. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickHelp = [
    { topic: 'Login Issues', response: 'For login problems: 1) Clear browser cache 2) Use the login page at /portal/login 3) Contact support if account is locked' },
    { topic: 'Billing Questions', response: 'Billing is handled through your firm portal. Platform fees are separate from service fees charged by third-party providers.' },
    { topic: 'API Access', response: 'API documentation is available at /docs. API access requires an Institutional or Sovereign tier subscription.' },
    { topic: 'Integration Help', response: 'We support Zapier, Clio, MyCase, and custom APIs. See /resources/integrations for details.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simple keyword matching (demo - in production would be real AI)
    setTimeout(() => {
      let response = 'Thank you for contacting Streamline Concierge. For your question, please contact support@protocolcounsel.com or visit /faq for more help.';
      
      const lower = input.toLowerCase();
      if (lower.includes('login') || lower.includes('password') || lower.includes('access')) {
        response = 'For login issues: Visit /portal/login to reset your password. If locked out, contact support. We also suggest clearing browser cookies.';
      } else if (lower.includes('bill') || lower.includes('invoice') || lower.includes('payment')) {
        response = 'Billing questions: Platform fees are shown in your portal. Service fees from third-party providers are billed separately per job. See /pricing for details.';
      } else if (lower.includes('api') || lower.includes('integration') || lower.includes('zapier')) {
        response = 'API and integrations: We support Zapier, Clio, MyCase, and custom webhooks. Full documentation is at /resources/integrations and /docs.';
      } else if (lower.includes('service') || lower.includes('process')) {
        response = 'All field services are provided by licensed third-party providers. We provide the infrastructure - the provider network handles delivery.';
      } else if (lower.includes('refund')) {
        response = 'Refunds: Services performed by providers are non-refundable. Duplicate charges or technical failures may qualify. See /refund for policy.';
      } else if (lower.includes('who are you') || lower.includes('what is')) {
        response = 'Streamline Concierge is the AI support assistant for Protocol Counsel, managed by Streamline Industries Management. We provide legal infrastructure technology.';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-oxford">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-oxford/95 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-white">
            PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/resources" className="text-slate-300 hover:text-white text-sm">Resources</Link>
            <Link href="/portal/login" className="text-slate-300 hover:text-white text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37] rounded-full mb-4">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Streamline Concierge</h1>
          <p className="text-slate-400">AI Support Assistant • Managed by Streamline Industries Management</p>
        </div>

        {/* Chat */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 mb-6">
          <div className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 ${msg.role === 'user' ? 'ml-8' : 'mr-8'}`}>
                <div className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-slate-700 ml-auto' : 'bg-slate-900'}`}>
                  <p className="text-sm text-white">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mr-8">
                <div className="p-4 rounded-lg bg-slate-900">
                  <p className="text-sm text-slate-400">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
              <button type="submit" disabled={isLoading} className="px-6 py-3 bg-[#D4AF37] text-oxford rounded-lg font-semibold hover:bg-[#b8962f] disabled:opacity-50">
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Quick Help */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Help Topics</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {quickHelp.map((item, i) => (
              <button
                key={i}
                onClick={() => setInput(item.topic)}
                className="text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
              >
                <div className="font-medium text-white">{item.topic}</div>
                <div className="text-xs text-slate-400">Click to ask</div>
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Need more help? <Link href="/faq" className="text-[#D4AF37] hover:underline">Visit FAQ</Link> or email support@protocolcounsel.com
          </p>
        </div>

        {/* Infrastructure Notice */}
        <div className="mt-6 p-3 border border-slate-700 rounded bg-slate-900/50">
          <p className="text-xs text-slate-500">
            ⚠️ <strong>Streamline Concierge</strong> is managed by <strong>Streamline Industries Management</strong>. Protocol Counsel provides legal infrastructure technology.
          </p>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}