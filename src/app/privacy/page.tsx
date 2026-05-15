'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-serif font-bold mb-2">Privacy Policy</h1>
          <p className="text-slate-300">Last updated: May 15, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              Protocol Counsel collects information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Account information (name, email, phone, firm details)</li>
              <li>Service order details and recipient information</li>
              <li>Payment and billing information</li>
              <li>Communications with our support team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">How We Use Information</h2>
            <p className="text-slate-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide and improve our legal operations services</li>
              <li>Process service orders and deliver documents</li>
              <li>Communicate with you about your orders</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Protect against fraud and ensure security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Data Protection</h2>
            <p className="text-slate-600 mb-4">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>AES-256 encryption for data at rest</li>
              <li>TLS 1.3 encryption for data in transit</li>
              <li>Multi-factor authentication</li>
              <li>Regular security audits and penetration testing</li>
              <li>SOC 2 Type II, HIPAA, and ISO 27001 compliance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Your Rights</h2>
            <p className="text-slate-600 mb-4">
              Under GDPR and applicable privacy laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Contact Us</h2>
            <p className="text-slate-600">
              For privacy-related inquiries, contact us at: <br />
              <span className="text-[#002147] font-medium">privacy@protocolcounsel.com</span>
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