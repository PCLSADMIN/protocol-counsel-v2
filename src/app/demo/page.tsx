'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-oxford flex items-center justify-center">
        <div className="text-center px-6 max-w-md">
          <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-oxford" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Inquiry Logged</h1>
          <p className="text-slate-400 mb-8">
            A Streamline Management representative will coordinate a briefing within 24 hours.
          </p>
          <Link href="/" className="text-[#D4AF37] hover:underline">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-oxford">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-oxford/95 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-white">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <Link href="/pricing" className="text-slate-300 text-sm hover:text-white">Pricing</Link>
        </div>
      </nav>

      <header className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-white">Institutional Inquiries</h1>
          <p className="text-slate-400 mt-2">Request a briefing with our architecture team.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input type="text" required className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-[#D4AF37] outline-none" placeholder="Full name" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Firm/Organization</label>
            <input type="text" required className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-[#D4AF37] outline-none" placeholder="Law firm or organization" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Professional Email</label>
            <input type="email" required className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-[#D4AF37] outline-none" placeholder="you@firm.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Estimated Monthly Volume</label>
            <select required className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-[#D4AF37] outline-none">
              <option value="">Select volume...</option>
              <option value="1-50">1-50 orders/month</option>
              <option value="51-200">51-200 orders/month</option>
              <option value="201-500">201-500 orders/month</option>
              <option value="500+">500+ orders/month</option>
            </select>
          </div>
          
          <button type="submit" className="w-full py-3 bg-[#D4AF37] text-oxford rounded-lg font-semibold hover:bg-[#b8962f]">
            Submit Inquiry
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Contact: <a href="mailto:support@protocolcounsel.com" className="text-[#D4AF37]">support@protocolcounsel.com</a>
        </p>

        <footer className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>Protocol Counsel. Managed by Streamline Industries Management.</p>
        </footer>
      </div>
    </main>
  );
}