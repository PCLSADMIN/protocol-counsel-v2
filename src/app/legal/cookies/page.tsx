'use client';

import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-oxford text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-4xl font-serif font-bold mt-6">Cookie Declaration</h1>
          <p className="text-slate-300 mt-2">Technical disclosure of our cookie practices</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Technical Disclosure */}
        <div className="bg-oxford text-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Protocol Counsel Cookie Standard</h2>
          <p className="text-slate-300 leading-relaxed">
            "Our platform utilizes strictly necessary cookies to maintain secure sessions and prevent Cross-Site Request Forgery (CSRF). 
            We do not utilize third-party tracking or advertising cookies. Your session data is encrypted and cleared upon logout 
            to ensure the 'Financial Firewall' remains uncompromised."
          </p>
        </div>

        {/* Cookie Categories */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Cookie Categories</h2>
          
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-semibold text-[#002147]">Strictly Necessary Cookies</h3>
              <p className="text-slate-600 mt-2">
                Required for the platform to function. These cookies are essential for:
              </p>
              <ul className="mt-2 space-y-2 text-slate-600">
                <li>• <strong>Session Security:</strong> Maintaining authenticated sessions</li>
                <li>• <strong>CSRF Protection:</strong> Preventing Cross-Site Request Forgery attacks</li>
                <li>• <strong>Financial Firewall:</strong> Securing invoice and payment data</li>
                <li>• <strong>Load Balancing:</strong> Ensuring consistent platform availability</li>
              </ul>
              <p className="text-sm text-slate-500 mt-2">
                These cannot be disabled. Required for platform security.
              </p>
            </div>

            <div className="border-b border-slate-100 pb-6">
              <h3 className="font-semibold text-[#002147]">Third-Party Tracking</h3>
              <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">✓ NONE</p>
                <p className="text-green-700 text-sm">
                  We do not use Google Analytics, Facebook Pixel, or any advertising trackers.
                </p>
              </div>
            </div>

            <div className="pb-6">
              <h3 className="font-semibold text-[#002147]">Session Data Handling</h3>
              <ul className="mt-2 space-y-2 text-slate-600">
                <li>• Encrypted at rest using AES-256</li>
                <li>• Cleared immediately upon logout</li>
                <li>• Never shared with third parties</li>
                <li>• Financial data isolated in secure vault</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Financial Firewall */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Financial Firewall</h2>
          <p className="text-slate-600 mb-4">
            Our platform implements a 'Financial Firewall' to protect sensitive billing information:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>• Invoice amounts hidden until manual audit</li>
            <li>• Payment data isolated from operational data</li>
            <li>• Session-scoped credential storage</li>
            <li>• Auto-logout clears all financial data</li>
          </ul>
        </div>

        {/* Browser Settings */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Browser Settings</h2>
          <p className="text-slate-600 mb-4">
            Most browsers accept cookies by default. You can:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>• <strong>Block all cookies:</strong> Platform may not function</li>
            <li>• <strong>Block third-party:</strong> Our cookies will still work</li>
            <li>• <strong>Clear on logout:</strong> Automatic with our platform</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-4">Questions?</h2>
          <p className="text-slate-600">
            Contact our security team at: <span className="font-medium">security@protocolcounsel.com</span>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="underline">Privacy Policy</Link> · 
            <Link href="/terms" className="underline ml-2">Terms of Service</Link> · 
            <Link href="/security" className="underline ml-2">Security</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}