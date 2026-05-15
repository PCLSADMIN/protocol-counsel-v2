'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-serif font-bold mb-2">Terms of Service</h1>
          <p className="text-slate-300">Last updated: May 15, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Acceptance of Terms</h2>
            <p className="text-slate-600">
              By accessing and using Protocol Counsel services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Description of Service</h2>
            <p className="text-slate-600 mb-4">
              Protocol Counsel provides enterprise legal operations infrastructure—a technology platform that connects law firms and legal service providers with a network of licensed third-party service providers. Specifically:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Technology Platform</strong> — We provide software infrastructure for ordering, tracking, and managing legal service requests</li>
              <li><strong>Provider Network</strong> — We connect users with licensed third-party service providers who perform actual services</li>
              <li><strong>Document Handling</strong> — Secure vault and chain-of-custody documentation for file management</li>
              <li><strong>Scheduling</strong> — AI-assisted coordination between firms, clients, and field professionals</li>
            </ul>
            <p className="text-slate-600 mt-4">
              <strong>We do not provide legal services ourselves.</strong> All legal services (process service, skip tracing, notarization, etc.) are performed by licensed third-party providers in our network.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">User Responsibilities</h2>
            <p className="text-slate-600 mb-4">
              As a user of Protocol Counsel services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use services only for lawful purposes</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not attempt to breach system security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Payment Terms</h2>
            <p className="text-slate-600 mb-4">
              Payment terms for services include:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Prepaid plans require payment in advance</li>
              <li>Net 30 terms available for qualifying firms</li>
              <li>All fees are due within stated payment terms</li>
              <li>Late payments may incur additional fees</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              Protocol Counsel provides technology infrastructure only. We are not a law firm, not a process server, not a investigator, and not a notary public. All services are provided by third-party licensed providers.
            </p>
            <p className="text-slate-600 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Protocol Counsel is not liable for any acts or omissions of third-party service providers</li>
              <li>We do not guarantee the quality, timeliness, or accuracy of services performed by providers</li>
              <li>Users must resolve any service disputes directly with the provider</li>
              <li>Our liability is limited to the fees paid for our technology platform, not for services rendered by providers</li>
              <li>We are not responsible for any legal consequences of service delivery or non-delivery</li>
            </ul>
            <p className="text-slate-600 mt-4">
              <strong>No Legal Advice:</strong> We do not provide legal advice. Users should consult their own counsel for legal matters.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Third-Party Providers</h2>
            <p className="text-slate-600 mb-4">
              Services are fulfilled by independent licensed providers. Each provider is responsible for their own:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Licensing and compliance</li>
              <li>Quality of service delivery</li>
              <li>Insurance and liability coverage</li>
              <li>Legal compliance in their jurisdiction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Termination</h2>
            <p className="text-slate-600">
              We reserve the right to terminate services at any time for violation of these terms or for non-payment. Users may terminate their account with 30 days written notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Contact Us</h2>
            <p className="text-slate-600">
              For questions about these terms, contact us at: <br />
              <span className="text-[#002147] font-medium">legal@protocolcounsel.com</span>
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-[#002147] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}