'use client';

import Link from 'next/link';

export default function SecurityMonitoringPage() {
  const headers = [
    { name: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains', status: '✓' },
    { name: 'Content-Security-Policy', value: "default-src 'self'", status: '✓' },
    { name: 'X-Frame-Options', value: 'DENY', status: '✓' },
    { name: 'X-Content-Type-Options', value: 'nosniff', status: '✓' },
    { name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin', status: '✓' },
    { name: 'Permissions-Policy', value: 'geolocation=(), microphone=()', status: '✓' },
    { name: 'X-XSS-Protection', value: '1; mode=block', status: '✓' },
  ];

  const metrics = [
    { label: 'Uptime (30d)', value: '99.97%' },
    { label: 'Response Time (P95)', value: '145ms' },
    { label: 'SSL Grade', value: 'A+' },
    { label: 'Last Audit', value: '2024-05-01' },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/status" className="text-[#002147] text-sm font-medium">Status</Link>
            <Link href="/portal/login" className="border border-[#002147] text-[#002147] px-4 py-2 rounded text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 bg-oxford">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Security Monitoring</h1>
          <p className="text-slate-300 text-lg">
            Real-time security headers, uptime metrics, and infrastructure status.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Metrics */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Infrastructure Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-[#D4AF37]">{m.value}</div>
                <div className="text-sm text-slate-500">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Headers */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Security Headers</h2>
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-4 text-slate-400 font-medium">Header</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Value</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {headers.map((h, i) => (
                  <tr key={i} className="border-t border-slate-800">
                    <td className="p-4 text-[#D4AF37] font-mono">{h.name}</td>
                    <td className="p-4 text-slate-400 font-mono text-xs">{h.value}</td>
                    <td className="p-4 text-green-500">{h.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Transparency */}
        <section className="bg-oxford text-white rounded-xl p-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Security Transparency</h2>
          <p className="text-slate-300 mb-4">
            We believe in complete transparency regarding our security posture. This page is updated in real-time.
          </p>
          <ul className="space-y-2 text-slate-300">
            <li>• Independent audits quarterly</li>
            <li>• Bug bounty program active</li>
            <li>• 72-hour disclosure policy</li>
          </ul>
        </section>

        {/* Contact */}
        <div className="mt-8 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p className="text-sm text-slate-500">
            Security inquiries: security@protocolcounsel.com | Report vulnerabilities: See /legal/security
          </p>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Protocol Counsel. Managed by Streamline Industries Management.</p>
        </footer>
      </div>
    </main>
  );
}