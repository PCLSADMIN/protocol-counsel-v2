'use client';

import Link from 'next/link';

export default function SLAPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-3xl font-serif font-bold mt-4">Service Level Agreement</h1>
          <p className="text-slate-300 mt-2">Our commitment to reliability and performance</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Summary Cards */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="text-4xl font-bold text-green-500">99.9%</div>
            <div className="font-semibold text-[#002147] mt-2">API Uptime</div>
            <div className="text-sm text-slate-500 mt-1">Guaranteed availability</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="text-4xl font-bold text-[#002147]">&lt;200ms</div>
            <div className="font-semibold text-[#002147] mt-2">Response Time</div>
            <div className="text-sm text-slate-500 mt-1">P95 latency</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="text-4xl font-bold text-[#D4AF37]">24/7</div>
            <div className="font-semibold text-[#002147] mt-2">Support</div>
            <div className="text-sm text-slate-500 mt-1">Enterprise tier</div>
          </div>
        </section>

        {/* SLA Details */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Service Level Commitments</h2>
          
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-semibold text-[#002147]">API Availability (99.9%)</h3>
              <p className="text-slate-600 mt-2">
                We guarantee 99.9% uptime for all API endpoints, measured monthly. This excludes scheduled maintenance windows and force majeure events.
              </p>
              <div className="mt-3 bg-slate-50 p-4 rounded-lg">
                <div className="text-sm font-medium">Monthly Allowable Downtime</div>
                <div className="text-2xl font-bold text-[#002147]">43.8 minutes</div>
              </div>
            </div>

            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-semibold text-[#002147]">Response Time (&lt;200ms P95)</h3>
              <p className="text-slate-600 mt-2">
                95% of API requests will complete within 200ms. Measured across all endpoints excluding file uploads.
              </p>
            </div>

            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-semibold text-[#002147]">Data Durability (99.999999999%)</h3>
              <p className="text-slate-600 mt-2">
                Your data is stored with 11-nines durability using redundant storage across multiple availability zones.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="font-semibold text-[#002147]">Support Response Times</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>Critical (System Down)</span>
                  <span className="font-semibold text-red-600">1 hour</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>High (Major Feature Affected)</span>
                  <span className="font-semibold text-orange-600">4 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>Medium (Minor Feature)</span>
                  <span className="font-semibold text-yellow-600">8 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>Low (General Questions)</span>
                  <span className="font-semibold text-green-600">24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Service Credits</h2>
          <p className="text-slate-600 mb-4">
            If we fail to meet our SLA commitments, you're entitled to service credits:
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>99.0% - 99.9% uptime</span>
              <span className="font-semibold">10% credit</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>95.0% - 99.0% uptime</span>
              <span className="font-semibold">25% credit</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
              <span>&lt;95% uptime</span>
              <span className="font-semibold">50% credit</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Maximum credit: 100% of monthly fee. Credits cannot exceed one month's subscription.
          </p>
        </section>

        {/* Exclusions */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Exclusions</h2>
          <p className="text-slate-600 mb-4">
            The following are excluded from SLA calculations:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>• Scheduled maintenance (notified 72 hours in advance)</li>
            <li>• Third-party service failures beyond our control</li>
            <li>• Force majeure events</li>
            <li>• Issues caused by customer configuration</li>
            <li>• Beta features</li>
            <li>• Usage exceeding plan limits</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-slate-800 text-white rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Enforcement</h2>
          <p className="text-slate-300">
            To request service credits, contact support within 30 days of the incident. Credits are applied to your next billing cycle. 
            For enterprise accounts, your signed enterprise agreement supersedes this SLA.
          </p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link href="/pricing" className="px-6 py-2 bg-[#D4AF37] text-[#002147] rounded font-semibold hover:bg-[#b8962f]">
              View Pricing
            </Link>
            <Link href="/demo" className="px-6 py-2 border border-white text-white rounded hover:bg-white/10">
              Contact Sales
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="underline">Privacy</Link> · 
            <Link href="/terms" className="underline ml-2">Terms</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}