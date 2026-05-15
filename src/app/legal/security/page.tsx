'use client';

import Link from 'next/link';

export default function SecurityPage() {
  const researchers = [
    { name: 'Security Researcher', findling: 'Authentication bypass patch', date: '2024-01' },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-oxford text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-4xl font-serif font-bold mt-6">Vulnerability Disclosure</h1>
          <p className="text-slate-300 mt-2">Bug Bounty & Security Research Program</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Disclosure Policy */}
        <div className="bg-oxford text-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Vulnerability Disclosure Policy</h2>
          <p className="text-slate-300 leading-relaxed">
            "Protocol Counsel welcomes reports from security researchers. We prioritize the 'Zero-Trust' integrity of our legal infrastructure. 
            Qualified reports regarding authentication bypass or data leakage are eligible for recognition in our Hall of Fame. 
            Please submit all findings to security@protocolcounsel.com."
          </p>
        </div>

        {/* Scope */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">In Scope</h2>
          <ul className="space-y-2 text-slate-600">
            <li>• Authentication bypass vulnerabilities</li>
            <li>• Authorization flaws</li>
            <li>• Data leakage exposures</li>
            <li>• CSRF vulnerabilities</li>
            <li>• SQL injection</li>
            <li>• XSS vulnerabilities affecting user data</li>
            <li>• Secure session handling issues</li>
            <li>• Encryption weaknesses</li>
          </ul>
        </div>

        {/* Out of Scope */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Out of Scope</h2>
          <ul className="space-y-2 text-slate-600">
            <li>• Social engineering attacks</li>
            <li>• Physical security testing</li>
            <li>• Denial of service attacks</li>
            <li>• Issues in third-party libraries</li>
            <li>• UI/UX based findings</li>
            <li>• Theoretical vulnerabilities without proof</li>
          </ul>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Rules</h2>
          <ul className="space-y-2 text-slate-600">
            <li>• Do not exfiltrate data</li>
            <li>• Do not modify or delete data</li>
            <li>• Report findings immediately</li>
            <li>• Allow time for remediation</li>
            <li>• Do not disclose publicly until fixed</li>
            <li>• Use our security email for reports</li>
          </ul>
        </div>

        {/* Hall of Fame */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Hall of Fame</h2>
          <p className="text-slate-600 mb-4">
            Security researchers who have helped us:
          </p>
          {researchers.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-[#002147]">Researcher</th>
                  <th className="text-left p-3 font-semibold text-[#002147]">Finding</th>
                  <th className="text-left p-3 font-semibold text-[#002147]">Date</th>
                </tr>
              </thead>
              <tbody>
                {researchers.map((r, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.findling}</td>
                    <td className="p-3">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-slate-500 italic">No entries yet. Be the first!</p>
          )}
        </div>

        {/* Recognition */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Recognition</h2>
          <p className="text-slate-600">
            Qualified researchers will receive recognition in our Hall of Fame. 
            Critical vulnerabilities may qualify for a bounty at our discretion.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-oxford text-white rounded-xl p-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Report a Vulnerability</h2>
          <p className="text-slate-300 mb-4">
            Email findings to our security team:
          </p>
          <p className="text-white font-medium text-lg">security@protocolcounsel.com</p>
          <p className="text-slate-400 text-sm mt-4">
            PGP Key available upon request
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="underline">Privacy Policy</Link> · 
            <Link href="/terms" className="underline ml-2">Terms</Link> · 
            <Link href="/legal/dpa" className="underline ml-2">DPA</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}