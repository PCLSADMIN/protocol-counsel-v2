'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-oxford text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-4xl font-serif font-bold mt-6">About Us</h1>
          <p className="text-slate-300 mt-2">The orchestration layer for modern legal operations</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Mission Statement */}
        <div className="bg-oxford text-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            "Protocol Counsel is the orchestration layer for modern legal operations. By bridging the gap between 
            digital data and physical field requirements, we provide the 'Encrypted Rails' that law firms need to scale 
            nationwide without increasing their administrative footprint."
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">What We Do</h2>
          <p className="text-slate-600 mb-4">
            Protocol Counsel provides technology infrastructure that connects law firms with a network of licensed field service providers. 
            We don't deliver services ourselves—we build the secure, compliant rails that make modern legal operations possible.
          </p>
          <ul className="space-y-3 text-slate-600">
            <li>• <strong>Platform:</strong> Secure ordering, tracking, and management of service requests</li>
            <li>• <strong>Network:</strong> Access to thousands of licensed field professionals</li>
            <li>• <strong>Compliance:</strong> Chain-of-custody documentation for legal proceedings</li>
            <li>• <strong>Automation:</strong> AI-assisted scheduling and coordination</li>
          </ul>
        </div>

        {/* Infrastructure Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-4">Infrastructure, Not Services</h2>
          <p className="text-slate-600">
            We are a technology company, not a law firm, process server, or investigation agency. 
            All legal services are delivered by licensed third-party providers in our network. 
            This model allows us to maintain zero liability for service delivery while providing firms with access to 
            comprehensive legal operations infrastructure.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#002147]">Zero-Trust Security</h3>
              <p className="text-slate-600 text-sm mt-1">
                Every request verified. Every action logged. No exceptions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#002147]">Compliance First</h3>
              <p className="text-slate-600 text-sm mt-1">
                Built for HIPAA, SOC 2, GDPR from day one.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#002147]">Provider Quality</h3>
              <p className="text-slate-600 text-sm mt-1">
                Rigorous vetting of all field professionals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#002147]">Financial Firewall</h3>
              <p className="text-slate-600 text-sm mt-1">
                Isolating billing data from operations by default.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Leadership</h2>
          <p className="text-slate-600 mb-4">
            Our team combines decades of legal operations experience with deep technical expertise in 
            secure infrastructure.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="font-medium text-[#002147]">CEO</div>
              <div className="text-xs text-slate-500">LegalTech Veteran</div>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="font-medium text-[#002147]">CTO</div>
              <div className="text-xs text-slate-500">Security Expert</div>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="font-medium text-[#002147]">COO</div>
              <div className="text-xs text-slate-500">Legal Ops Leader</div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-oxford text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold">Join Us</h2>
          <p className="text-slate-300 mt-2 mb-6">
            Building the infrastructure for legal operations at scale.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo" className="px-6 py-2 bg-[#D4AF37] text-[#002147] rounded font-semibold">
              Request Demo
            </Link>
            <Link href="/partners" className="px-6 py-2 border border-white text-white rounded">
              Partner With Us
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="underline">Privacy Policy</Link> · 
            <Link href="/terms" className="underline ml-2">Terms</Link> · 
            <Link href="/security" className="underline ml-2">Security</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}