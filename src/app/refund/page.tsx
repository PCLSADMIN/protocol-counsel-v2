'use client';

import Link from 'next/link';

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-3xl font-serif font-bold mt-4">Refund Policy</h1>
          <p className="text-slate-300 mt-2">Service-based billing policy</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Important Notice */}
        <div className="bg-[#002147] text-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Important Notice</h2>
          <p className="text-slate-300">
            Protocol Counsel provides services—process service, skip tracing, document retrieval, notarization, etc.
            Once a service has been performed, it cannot be refunded. This is standard industry practice 
            for professional legal services.
          </p>
        </div>

        {/* When Refunds Apply */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">When Refunds Apply</h2>
          
          <div className="space-y-4 text-slate-600">
            <p>Refunds are only provided in the following circumstances:</p>
            
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span><strong>Duplicate charges</strong> — If you were charged twice for the same service, we will refund the duplicate immediately</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span><strong>Service not performed</strong> — If a service was paid for but never completed, you will receive a full refund</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span><strong>Technical failure</strong> — If our system failed and the service could not be completed through no fault of yours</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span><strong>Billing error</strong> — Any incorrect or erroneous charges will be refunded</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Processing Fee */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Processing Fee</h2>
          
          <div className="space-y-4 text-slate-600">
            <p>A 3% processing fee applies to all refunds to cover payment processor charges. This fee is:</p>
            
            <ul className="space-y-2">
              <li>• Waived for duplicate charges</li>
              <li>• Waived for technical failures on our end</li>
              <li>• Required for all other refund requests</li>
            </ul>
          </div>
        </div>

        {/* How to Request */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">How to Request a Refund</h2>
          
          <p className="text-slate-600 mb-4">
            To request a refund review, contact support within 7 days of the charge:
          </p>
          
          <ul className="space-y-2 text-slate-600">
            <li>• Email: support@protocolcounsel.com</li>
            <li>• Include your order number or transaction ID</li>
            <li>• Describe the issue</li>
            <li>• We respond within 2 business days</li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="underline">Privacy</Link> · 
            <Link href="/terms" className="underline ml-2">Terms</Link> · 
            <Link href="/sla" className="underline ml-2">SLA</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}