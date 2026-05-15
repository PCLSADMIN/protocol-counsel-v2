'use client';

import Link from 'next/link';

export default function PressPage() {
  const assets = [
    { name: 'Logo (PNG)', size: 'Transparent background', link: '#' },
    { name: 'Logo (SVG)', size: 'Vector format', link: '#' },
    { name: 'Brand Guidelines', size: 'PDF', link: '#' },
    { name: 'Executive Photos', size: 'ZIP', link: '#' },
  ];

  const press = [
    { title: 'Legal Tech Innovator Raises $10M Series A', source: 'TechCrunch', date: '2024-03' },
    { title: 'The Future of Process Service', source: 'ABA Journal', date: '2024-02' },
    { title: 'AI in Legal Operations', source: 'Law360', date: '2024-01' },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/company" className="text-[#002147] text-sm font-medium">Company</Link>
            <Link href="/portal/login" className="border border-[#002147] text-[#002147] px-4 py-2 rounded text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 bg-oxford">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Press & Media</h1>
          <p className="text-slate-300 text-lg">
            Brand assets, press coverage, and media inquiries for Protocol Counsel.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Mission */}
        <section className="mb-12">
          <div className="bg-oxford text-white rounded-xl p-8">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Our Mission</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              "Protocol Counsel is the orchestration layer for modern legal operations. By bridging the gap between 
              digital data and physical field requirements, we provide the 'Encrypted Rails' that law firms need to scale 
              nationwide without increasing their administrative footprint. Our infrastructure supports the delivery of 
              legal services across all 50 states through a network of licensed providers managed by 
              Streamline Industries Management."
            </p>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Brand Assets</h2>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-[#002147]">Asset</th>
                  <th className="text-left p-4 font-semibold text-[#002147]">Format</th>
                  <th className="text-right p-4 font-semibold text-[#002147]">Download</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="p-4 font-medium text-[#002147]">{a.name}</td>
                    <td className="p-4 text-slate-500">{a.size}</td>
                    <td className="p-4 text-right">
                      <button className="text-[#D4AF37] hover:underline">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Press Coverage */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Press Coverage</h2>
          <div className="space-y-4">
            {press.map((p, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-[#002147]">{p.title}</h3>
                <div className="text-sm text-slate-500 mt-1">{p.source} • {p.date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-oxford text-white rounded-xl p-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Media Inquiries</h2>
          <p className="text-slate-300 mb-4">
            For press and media inquiries, contact:
          </p>
          <p className="text-white font-medium">press@protocolcounsel.com</p>
        </section>

        {/* Infrastructure Notice */}
        <div className="mt-8 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500">
            ⚠️ <strong>Managed by Streamline Industries Management.</strong> Protocol Counsel provides technology infrastructure.
            See our <Link href="/terms" className="underline">Terms</Link> and <Link href="/legal/dpa" className="underline">DPA</Link>.
          </p>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}