'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-oxford flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-[#D4AF37]">404</h1>
        <h2 className="text-2xl font-semibold text-white mt-4">Protocol Not Found</h2>
        <p className="text-slate-400 mt-2 max-w-md">
          The requested resource is outside the current encrypted parameters.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link 
            href="/portal/dashboard"
            className="px-6 py-3 bg-[#D4AF37] text-oxford rounded-md font-semibold hover:bg-[#b8962f] transition-colors"
          >
            Return to Dashboard
          </Link>
          <Link 
            href="/demo"
            className="px-6 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
          >
            Request Demo
          </Link>
        </div>
      </div>
    </main>
  );
}