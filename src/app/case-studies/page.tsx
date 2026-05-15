'use client';

import Link from 'next/link';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  quote: string;
  quotee: string;
  quoteeTitle: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'fortress-law',
    company: 'Fortress Legal Group',
    industry: 'Civil Litigation',
    summary: 'How a mid-size litigation firm achieved 340% ROI through automated process service',
    challenge: 'Manual tracking of 500+ monthly service requests across 12 states with only 3 administrative staff',
    solution: 'Deployed Protocol Counsel for unified intake, automated scheduling, and real-time field coordination',
    results: [
      { label: 'Time Saved', value: '40 hrs/week' },
      { label: 'Success Rate', value: '98.7%' },
      { label: 'ROI', value: '340%' },
      { label: 'Cost Reduction', value: '62%' },
    ],
    quote: 'Protocol Counsel transformed how we handle service of process. What used to take all day now happens automatically.',
    quotee: 'Sarah Chen',
    quoteeTitle: 'Operations Manager, Fortress Legal Group',
  },
  {
    id: 'meridian-corp',
    company: 'Meridian Corporate Solutions',
    industry: 'Corporate Law',
    summary: 'Enterprise compliance automation for Fortune 500 legal departments',
    challenge: 'Managing legal notifications across 200+ subsidiaries with strict regulatory deadlines',
    solution: 'Implemented custom Regulatory Rails with API integration to existing document management',
    results: [
      { label: 'Compliance', value: '100%' },
      { label: 'Time to Complete', value: '-85%' },
      { label: 'Audit Prep', value: '-90%' },
      { label: 'Annual Savings', value: '$1.2M' },
    ],
    quote: 'The SLA guarantee and audit trail gave our C-suite exactly what they needed. Best legal ops investment we have made.',
    quotee: 'Michael Torres',
    quoteeTitle: 'General Counsel, Meridian Corp',
  },
  {
    id: 'pacific-notary',
    company: 'Pacific Mobile Notary',
    industry: 'Remote Online Notary',
    summary: 'Scaling notarization services 10x while reducing costs',
    challenge: ' Coordinating 2,000+ monthly closings across California with mobile notaries',
    solution: 'AI-powered scheduling with real-time field agent app and digital document vault',
    results: [
      { label: 'Throughput', value: '10x' },
      { label: 'Client Satisfaction', value: '4.9/5' },
      { label: 'Turnaround', value: 'Same-day' },
      { label: 'Revenue Growth', value: '156%' },
    ],
    quote: 'From 200 closings a month to 2,000. Protocol Counsel made scaling actually work.',
    quotee: 'Jennifer Park',
    quoteeTitle: 'Founder, Pacific Mobile Notary',
  },
  {
    id: 'atlas-recovery',
    company: 'Atlas Recovery Services',
    industry: 'Collections',
    summary: 'HIPAA-compliant medical records retrieval at enterprise scale',
    challenge: 'Retrieving 10,000+ medical records monthly while maintaining strict HIPAA compliance',
    solution: 'Secure chain-of-custody documentation with real-time status tracking',
    results: [
      { label: 'Retrieval Rate', value: '94%' },
      { label: 'HIPAA Audits', value: '100% passed' },
      { label: 'Turnaround', value: '-70%' },
      { label: 'Attorney Hours', value: '-85%' },
    ],
    quote: 'We went from drowning in paper to a fully digital operation. Every record is traceable, every handoff documented.',
    quotee: 'David Kim',
    quoteeTitle: 'Director of Operations, Atlas Recovery',
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-4xl font-serif font-bold mt-4">Case Studies</h1>
          <p className="text-xl text-slate-300 mt-4 max-w-2xl">
            See how leading law firms and legal service providers transform their operations with Protocol Counsel
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-[#D4AF37]">500+</div>
            <div className="text-sm text-slate-500">Active Firms</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-[#D4AF37]">2.5M+</div>
            <div className="text-sm text-slate-500">Documents Processed</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-[#D4AF37]">99.7%</div>
            <div className="text-sm text-slate-500">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-[#D4AF37]">$48M</div>
            <div className="text-sm text-slate-500">Client Savings</div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="space-y-8">
          {caseStudies.map((study) => (
            <article key={study.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-[#002147] text-white p-8">
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                    {study.industry}
                  </div>
                  <h3 className="text-2xl font-serif font-bold">{study.company}</h3>
                  <p className="text-slate-300 mt-2">{study.summary}</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {study.results.map((result, i) => (
                      <div key={i}>
                        <div className="text-2xl font-bold text-[#D4AF37]">{result.value}</div>
                        <div className="text-xs text-slate-400">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-oxford">Challenge</h4>
                      <p className="text-slate-600 mt-2">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-oxford">Solution</h4>
                      <p className="text-slate-600 mt-2">{study.solution}</p>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <blockquote className="text-lg text-slate-700 italic">
                        "{study.quote}"
                      </blockquote>
                      <div className="mt-4">
                        <div className="font-semibold text-oxford">{study.quotee}</div>
                        <div className="text-sm text-slate-500">{study.quoteeTitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-12 bg-[#002147] text-white rounded-xl p-12 text-center">
          <h2 className="text-2xl font-serif font-bold">Ready to transform your operations?</h2>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">
            Join 500+ firms already using Protocol Counsel to streamline their legal operations.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link href="/demo" className="px-8 py-3 bg-[#D4AF37] text-oxford rounded font-semibold hover:bg-[#b8962f]">
              Request Demo
            </Link>
            <Link href="/pricing" className="px-8 py-3 border border-white text-white rounded hover:bg-white/10">
              View Pricing
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}