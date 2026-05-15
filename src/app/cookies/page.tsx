'use client';

import Link from 'next/link';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-serif font-bold mb-2">Cookie Policy</h1>
          <p className="text-slate-300">Last updated: May 15, 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">What Are Cookies</h2>
            <p className="text-slate-600">
              Cookies are small text files stored on your device when you visit websites. They help remember your preferences and improve your experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Types of Cookies We Use</h2>
            
            <div className="mb-4">
              <h3 className="font-medium text-[#002147]">Essential Cookies</h3>
              <p className="text-slate-600 text-sm">
                Required for the website to function. These include authentication tokens and security cookies.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-[#002147]">Analytics Cookies</h3>
              <p className="text-slate-600 text-sm">
                Help us understand how visitors use our site so we can improve performance and user experience.
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-[#002147]">Functional Cookies</h3>
              <p className="text-slate-600 text-sm">
                Enable enhanced functionality and personalization, such as remembering your preferences.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Managing Cookies</h2>
            <p className="text-slate-600 mb-4">
              You can control or disable cookies through your browser settings:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Chrome: Settings → Privacy → Cookies</li>
              <li>Firefox: Options → Privacy → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Privacy → Cookies</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Disabling essential cookies may affect the functionality of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Third-Party Cookies</h2>
            <p className="text-slate-600">
              We use trusted third-party services for analytics (Google Analytics) and payment processing (Stripe). These services may set their own cookies per their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#002147] mb-4">Updates to This Policy</h2>
            <p className="text-slate-600">
              We may update this Cookie Policy periodically. Any changes will be posted on this page with an updated "Last updated" date.
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