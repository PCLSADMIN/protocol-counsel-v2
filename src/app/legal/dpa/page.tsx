'use client';

import Link from 'next/link';

export default function DPAPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-oxford text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-4xl font-serif font-bold mt-6">Data Processing Agreement</h1>
          <p className="text-slate-300 mt-2">GDPR Article 28 Compliant - Data Processor Terms</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="bg-oxford text-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">The Protocol Standard</h2>
          <p className="text-slate-300 leading-relaxed">
            "Protocol Counsel acts as a Data Processor under GDPR Article 28. All data retrieved via our field agents is encrypted at rest using 
            AES-256 and is subject to our '72-Hour Data Purge' protocol unless otherwise specified by the Firm's retention policy. 
            We maintain a sub-processor registry for all API hooks (Stripe, FedEx, Supabase) to ensure end-to-end compliance."
          </p>
        </div>

        {/* Definitions */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">1. Definitions</h2>
          <div className="space-y-4 text-slate-600">
            <p><strong>"Data Controller"</strong> = The law firm or client using our platform</p>
            <p><strong>"Data Processor"</strong> = Protocol Counsel (us)</p>
            <p><strong>"Personal Data"</strong> = Any data processed on behalf of the Controller</p>
            <p><strong>"Sub-Processor"</strong> = Third-party services we use to deliver our platform</p>
          </div>
        </div>

        {/* Processor Obligations */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">2. Processor Obligations</h2>
          <p className="text-slate-600 mb-4">Protocol Counsel agrees to:</p>
          <ul className="space-y-2 text-slate-600">
            <li>• Process personal data only on documented instructions from the Controller</li>
            <li>• Ensure personnel are subject to confidentiality obligations</li>
            <li>• Implement appropriate technical and organizational security measures</li>
            <li>• Assist the Controller in responding to data subject requests</li>
            <li>• Delete or return all personal data upon termination</li>
            <li>• Make available information necessary to demonstrate compliance</li>
          </ul>
        </div>

        {/* Security Measures */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">3. Security Standards</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-[#002147]">Encryption</h3>
              <p className="text-slate-600">AES-256 at rest, TLS 1.3 in transit</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-[#002147]">72-Hour Data Purge</h3>
              <p className="text-slate-600">Automatic deletion of field-retrieved data after 72 hours unless retention policy specified</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-[#002147]">Access Controls</h3>
              <p className="text-slate-600">Role-based access, zero-trust architecture</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-[#002147]">Audit Trails</h3>
              <p className="text-slate-600">Immutable logs for all data access events</p>
            </div>
          </div>
        </div>

        {/* Sub-Processors */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">4. Sub-Processor Registry</h2>
          <p className="text-slate-600 mb-4">We use the following Sub-Processors:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-[#002147]">Service</th>
                  <th className="text-left p-3 font-semibold text-[#002147]">Purpose</th>
                  <th className="text-left p-3 font-semibold text-[#002147]">Data Location</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="p-3">Stripe</td>
                  <td className="p-3">Payment Processing</td>
                  <td className="p-3">US/EU</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="p-3">Supabase</td>
                  <td className="p-3">Database & Auth</td>
                  <td className="p-3">US/EU</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="p-3">OpenAI</td>
                  <td className="p-3">AI Scheduling</td>
                  <td className="p-3">US</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            We will notify controllers of any changes to sub-processors.
          </p>
        </div>

        {/* Data Transfers */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">5. International Transfers</h2>
          <p className="text-slate-600">
            Data transferred outside the EU/EEA is protected by Standard Contractual Clauses 
            or adequacy decisions. Sub-processors in the US are EU-U.S. Data Privacy Framework certified.
          </p>
        </div>

        {/* Breach Notification */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">6. Breach Notification</h2>
          <p className="text-slate-600">
            In the event of a personal data breach, we will notify the Controller within 72 hours of becoming aware.
            Notification will include the nature of the breach, categories and approximate number of data subjects affected,
            and proposed corrective measures.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-oxford text-white rounded-xl p-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Data Protection Officer</h2>
          <p className="text-slate-300 mb-4">
            For DPA requests or data protection inquiries:
          </p>
          <p className="text-white font-medium">dpo@protocolcounsel.com</p>
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