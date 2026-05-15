'use client';

import Link from 'next/link';

export default function CareersPage() {
  const jobs = [
    {
      title: 'Senior Backend Engineer',
      team: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Build and scale our legal infrastructure platform.',
    },
    {
      title: 'Frontend Engineer',
      team: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Create beautiful, compliant user interfaces.',
    },
    {
      title: 'Solutions Engineer',
      team: 'Solutions',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Help enterprises integrate with our platform.',
    },
    {
      title: 'Customer Success Manager',
      team: 'Operations',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Drive customer satisfaction and retention.',
    },
    {
      title: 'Security Engineer',
      team: 'Security',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Protect our zero-trust infrastructure.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/company" className="text-[#002147] text-sm font-medium">Company</Link>
            <Link href="/portal/login" className="border border-[#002147] text-[#002147] px-4 py-2 rounded text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 bg-oxford">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Careers</h1>
          <p className="text-slate-300 text-lg">
            Join our distributed team. Build the infrastructure for modern legal operations.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Values */}
        <section className="mb-12">
          <div className="bg-oxford text-white rounded-xl p-8">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Why Protocol Counsel?</h2>
            <p className="text-slate-300 mb-4">
              We are building the infrastructure that powers legal operations across the nation. Work remotely, 
              solve interesting problems, and help shape the future of legal tech.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-[#D4AF37]">Remote-First</div>
                <div className="text-slate-400 text-sm">Work from anywhere</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-[#D4AF37]">Competitive</div>
                <div className="text-slate-400 text-sm">Salary & equity</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-[#D4AF37]">Mission-Driven</div>
                <div className="text-slate-400 text-sm">Legal infrastructure</div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#002147]">{job.title}</h3>
                    <div className="text-sm text-slate-500 mt-1">
                      {job.team} • {job.location} • {job.type}
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{job.description}</p>
                  </div>
                  <button className="px-4 py-2 bg-[#D4AF37] text-oxford rounded font-medium hover:bg-[#b8962f]">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Distributed Note */}
        <section className="bg-slate-100 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-[#002147] mb-2">Distributed Engineering & Ops</h2>
          <p className="text-slate-600">
            Our team works remotely across the US. We value outcomes over hours, 
            autonomy over process, and impact over hierarchy.
          </p>
        </section>

        {/* Infrastructure Notice */}
        <div className="mt-8 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500">
            ⚠️ <strong>Managed by Streamline Industries Management.</strong> Protocol Counsel provides technology infrastructure.
            See our <Link href="/terms" className="underline">Terms</Link> and <Link href="/legal/dpa" className="underline">DPA</Link>.
          </p>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}