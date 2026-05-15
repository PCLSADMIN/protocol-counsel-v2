'use client';

import Link from 'next/link';
import { useState } from 'react';

interface TemplatePack {
  id: string;
  name: string;
  description: string;
  items: number;
  price: number;
  featured: boolean;
}

export default function VaultPage() {
  const [purchased, setPurchased] = useState<string[]>([]);

  const packs: TemplatePack[] = [
    {
      id: 'onboarding',
      name: 'Firm Onboarding Kit',
      description: 'Complete client intake documentation, engagement letters, and compliance acknowledgments for new matter establishment.',
      items: 12,
      price: 299,
      featured: true,
    },
    {
      id: 'litigation',
      name: 'Service Documentation Pack',
      description: 'Affidavits of service, chain of custody forms, and verification templates for litigation matters.',
      items: 8,
      price: 199,
      featured: false,
    },
    {
      id: 'compliance',
      name: 'Regulatory Compliance Suite',
      description: 'GDPR data processing authorizations, HIPAA acknowledgments, and retention policy templates.',
      items: 15,
      price: 399,
      featured: false,
    },
  ];

  const handlePurchase = (id: string) => {
    setPurchased(prev => [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-oxford">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-oxford/95 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-white">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/resources/vault" className="text-white text-sm font-medium">Digital Vault</Link>
            <Link href="/portal/login" className="text-slate-300 text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <header className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Digital Vault</h1>
          <p className="text-slate-400">Premium legal template library.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <section className="grid gap-6">
          {packs.map((pack) => (
            <div key={pack.id} className={`bg-slate-800 border ${pack.featured ? 'border-[#D4AF37]' : 'border-slate-700'} rounded-lg p-8`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">{pack.name}</h2>
                  <p className="text-slate-400 mb-4">{pack.description}</p>
                  <div className="text-sm text-slate-500">{pack.items} templates included</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-2">${pack.price}</div>
                  <button 
                    onClick={() => handlePurchase(pack.id)}
                    disabled={purchased.includes(pack.id)}
                    className="px-6 py-2 bg-[#D4AF37] text-oxford rounded font-semibold hover:bg-[#b8962f] disabled:opacity-50"
                  >
                    {purchased.includes(pack.id) ? 'License Purchased' : 'Purchase License'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>Protocol Counsel. Managed by Streamline Industries Management.</p>
        </footer>
      </div>
    </main>
  );
}