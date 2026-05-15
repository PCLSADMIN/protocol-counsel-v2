'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Tier {
  name: string;
  commission: string;
  requirement: string;
  benefits: string[];
}

const partnerTiers: Tier[] = [
  {
    name: 'Referral Partner',
    commission: '15%',
    requirement: '3+ referrals/year',
    benefits: [
      '15% commission on all referred revenue',
      'Dedicated partner manager',
      'Co-marketing materials',
      'Quarterly business reviews',
    ],
  },
  {
    name: 'Solution Partner',
    commission: '25%',
    requirement: '$50K+ annually',
    benefits: [
      '25% commission on all referred revenue',
      'Priority support (P1)',
      'API access for integrations',
      'Joint go-to-market',
      'Case study opportunities',
    ],
  },
  {
    name: 'Enterprise Partner',
    commission: '30%',
    requirement: '$200K+ annually',
    benefits: [
      '30% commission on all referred revenue',
      'Executive sponsorship',
      'Custom integrations',
      'Volume discounts',
      'Board-level reporting',
      'Annual summit invite',
    ],
  },
];

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'The partner program made it easy to offer best-in-class legal ops to our clients.',
    author: 'James Wilson',
    company: 'LegalTech Consulting Group',
  },
  {
    quote: 'Best partner program in legal tech. The support is unmatched.',
    author: 'Maria Santos',
    company: 'Corporate Legal Solutions',
  },
  {
    quote: 'We grew our revenue 40% in the first year with Protocol Counsel.',
    author: 'Robert Chen',
    company: 'Attorney Services Network',
  },
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-[#002147] text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-4xl font-serif font-bold mt-4">Partner Program</h1>
          <p className="text-xl text-slate-300 mt-4 max-w-2xl">
            Join our network of solution providers and bring protocol automation to more law firms.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#002147] text-center mb-8">Why Partner With Us</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <div className="text-4xl">💰</div>
              <div className="font-semibold text-[#002147] mt-4">Recurring Revenue</div>
              <p className="text-slate-500 mt-2">Earn ongoing commissions for every client you refer.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <div className="text-4xl">🤝</div>
              <div className="font-semibold text-[#002147] mt-4">Dedicated Support</div>
              <p className="text-slate-500 mt-2">Your clients get white-glove onboarding and support.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
              <div className="text-4xl">📈</div>
              <div className="font-semibold text-[#002147] mt-4">Market Growth</div>
              <p className="text-slate-500 mt-2">The legal ops market is exploding. Capture your share.</p>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#002147] text-center mb-8">Partner Tiers</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTiers.map((tier, i) => (
              <div key={i} className={`bg-white rounded-xl shadow-sm border p-6 ${i === 1 ? 'border-[#D4AF37] border-2' : ''}`}>
                {i === 1 && (
                  <div className="bg-[#D4AF37] text-[#002147] text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-semibold text-[#002147]">{tier.name}</h3>
                <div className="text-3xl font-bold text-[#D4AF37] mt-2">{tier.commission}</div>
                <div className="text-sm text-slate-500">commission</div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-sm font-medium text-[#002147]">Requirement</div>
                  <p className="text-sm text-slate-500">{tier.requirement}</p>
                </div>
                
                <ul className="mt-4 space-y-2">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#002147] text-center mb-8">Partner Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <div className="font-semibold text-[#002147]">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#002147] text-center mb-8">How to Become a Partner</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm border p-6">
              <div className="w-12 h-12 bg-[#002147] text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
              <div>
                <div className="font-semibold text-[#002147]">Apply Online</div>
                <div className="text-slate-500">Fill out our partner application form.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm border p-6">
              <div className="w-12 h-12 bg-[#002147] text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
              <div>
                <div className="font-semibold text-[#002147]">Review Call</div>
                <div className="text-slate-500">We'll schedule a call to discuss fit.</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm border p-6">
              <div className="w-12 h-12 bg-[#002147] text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
              <div>
                <div className="font-semibold text-[#002147]">Onboarding</div>
                <div className="text-slate-500">Get certified and start referring clients.</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#002147] text-white rounded-xl p-12 text-center">
          <h2 className="text-2xl font-serif font-bold">Ready to Partner?</h2>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">
            Join 100+ partners already growing their business with Protocol Counsel.
          </p>
          <form className="mt-8 max-w-md mx-auto space-y-4">
            <input 
              type="email" 
              placeholder="Youremail@company.com"
              className="w-full px-4 py-3 text-[#002147] rounded-md"
            />
            <input 
              type="text" 
              placeholder="Company name"
              className="w-full px-4 py-3 text-[#002147] rounded-md"
            />
            <button className="w-full px-6 py-3 bg-[#D4AF37] text-[#002147] rounded font-semibold hover:bg-[#b8962f]">
              Apply Now
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}