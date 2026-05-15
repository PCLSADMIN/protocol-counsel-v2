'use client';

import Link from 'next/link';

export default function GlobalError() {
  return (
    <main className="min-h-screen bg-oxford flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-[#D4AF37]">500</h1>
        <h2 className="text-2xl font-semibold text-white mt-4">System Interrupt</h2>
        <p className="text-slate-400 mt-2 max-w-md">
          Streamline Management is currently recalibrating this node. Please try again in a moment.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link 
            href="/portal/dashboard"
            className="px-6 py-3 bg-[#D4AF37] text-oxford rounded-md font-semibold hover:bg-[#b8962f] transition-colors"
          >
            Return to Dashboard
          </Link>
          <Link 
            href="/status"
            className="px-6 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
          >
            System Status
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Support: <a href="mailto:support@protocolcounsel.com" className="underline">support@protocolcounsel.com</a>
        </p>
      </div>
    </main>
  );
}