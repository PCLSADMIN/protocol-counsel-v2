'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    {
      name: 'Billing & Payments',
      faqs: [
        {
          q: 'How am I charged for services?',
          a: 'Platform fees are charged monthly based on your subscription tier. Service fees from third-party providers are billed separately per job. Invoice amounts require manual audit access.',
        },
        {
          q: 'Can I get refunds?',
          a: 'All services performed by third-party providers are non-refundable. Duplicate charges or technical failures may qualify for credits. See our Refund Policy for details.',
        },
        {
          q: 'Do you offer net terms?',
          a: 'Net 30 payment terms are available for qualifying Institutional and Sovereign tier firms. Contact sales for approval.',
        },
      ],
    },
    {
      name: 'Field Agents',
      faqs: [
        {
          q: 'Who performs the services?',
          a: 'All field services are performed by licensed third-party providers in our network. We vet all providers for licensing, insurance, and compliance.',
        },
        {
          q: 'How do I track field agents?',
          a: 'The Client Portal provides real-time tracking and status updates for all active jobs. Field agents sync status directly from our Field Agent App.',
        },
        {
          q: 'What if service quality is poor?',
          a: 'Service disputes must be resolved directly with the provider. Contact support for provider information.',
        },
      ],
    },
    {
      name: 'Platform',
      faqs: [
        {
          q: 'Is this a law firm?',
          a: 'Protocol Counsel is a technology company, not a law firm, process server, or investigator. We provide infrastructure that connects firms with licensed providers.',
        },
        {
          q: 'Is my data secure?',
          a: 'We use AES-256 encryption at rest, TLS 1.3 in transit. Data is subject to our 72-Hour Data Purge unless retention is specified.',
        },
        {
          q: 'Do you provide legal advice?',
          a: 'No. We do not provide legal advice. Consult your own counsel for legal matters.',
        },
      ],
    },
    {
      name: 'Technical',
      faqs: [
        {
          q: 'What APIs are available?',
          a: 'Full API documentation is available at /docs. Access is included in Institutional and Sovereign tiers.',
        },
        {
          q: 'Can I integrate with my system?',
          a: 'Yes. We offer REST APIs, webhooks, and custom integrations for enterprise clients.',
        },
      ],
    },
  ];

  const filtered = search
    ? categories.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(
          f => f.q.toLowerCase().includes(search.toLowerCase()) ||
               f.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(c => c.faqs.length > 0)
    : categories;

  return (
    <main className="min-h-screen bg-oxford">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-oxford/95 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-white">
            PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/portal/login" className="text-slate-300 hover:text-white text-sm">Client Portal</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">Help Center</h1>
          <p className="text-slate-400 mb-8">Search our knowledge base</p>

          {/* Search */}
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-12">
        {filtered.map((category, ci) => (
          <div key={ci} className="mb-8">
            <h2 className="text-lg font-semibold text-[#D4AF37] mb-4">{category.name}</h2>
            <div className="space-y-2">
              {category.faqs.map((faq, fi) => (
                <div key={fi} className="border border-slate-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === fi ? null : fi)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center bg-slate-800 hover:bg-slate-750"
                  >
                    <span className="text-white font-medium">{faq.q}</span>
                    <span className="text-[#D4AF37] text-xl">{openFaq === fi ? '−' : '+'}</span>
                  </button>
                  {openFaq === fi && (
                    <div className="px-6 py-4 bg-slate-900 text-slate-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No results found. Contact support for help.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-slate-800 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
          <p className="text-slate-400 mb-4">Our support team is here to help.</p>
          <Link href="/demo" className="inline-block px-6 py-2 bg-[#D4AF37] text-oxford font-semibold rounded hover:bg-[#b8962f]">
            Request Demo
          </Link>
        </div>

        {/* Infrastructure Notice */}
        <div className="mt-8 p-4 border border-slate-700 rounded-lg bg-slate-900/50">
          <p className="text-xs text-slate-500">
            ⚠️ <strong>Infrastructure Notice:</strong> Protocol Counsel provides technology infrastructure. 
            All services delivered by licensed third-party providers. See our{' '}
            <Link href="/terms" className="underline">Terms</Link> and{' '}
            <Link href="/legal/dpa" className="underline">DPA</Link> for details.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/portal/login" className="underline">Client Portal</Link> · 
            <Link href="/privacy" className="underline ml-2">Privacy</Link> · 
            <Link href="/terms" className="underline ml-2">Terms</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}