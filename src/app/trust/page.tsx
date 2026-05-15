import Link from "next/link";

export const metadata = {
  title: "Trust Center - PROTOCOL COUNSEL",
  description: "Compliance certifications, encryption standards, and data residency policies.",
};

export default function TrustPage() {
  const certs = [
    {
      name: "SOC 2 Type II",
      logo: "SOC2",
      desc: "Security, Availability, Confidentiality",
      standards: "AICPA Trust Services Criteria",
      encryption: "AES-256 at rest, TLS 1.3 in transit",
    },
    {
      name: "HIPAA",
      logo: "HIPAA",
      desc: "Protected Health Information",
      standards: "45 CFR Part 164",
      encryption: "AES-256, Business Associate Agreements",
    },
    {
      name: "ISO 27001",
      logo: "ISO",
      desc: "Information Security Management",
      standards: "ISO/IEC 27001:2022",
      encryption: "NISTSP 800-111",
    },
    {
      name: "GDPR",
      logo: "GDPR",
      desc: "Data Protection",
      standards: "EU 2016/679",
      encryption: "GDPR Art. 32",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime SLA" },
    { value: "0", label: "Data Breaches" },
    { value: "256-bit", label: "Encryption" },
    { value: "24/7", label: "Monitoring" },
  ];

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">PROTOCOL COUNSEL</Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-slate-600 hover:text-[#002147] text-sm">Services</Link>
            <Link href="/security" className="text-slate-600 hover:text-[#002147] text-sm">Security</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-[#002147] text-sm">Pricing</Link>
            <Link href="/trust" className="text-[#002147] text-sm font-medium">Trust</Link>
            <Link href="/portal/login" className="border border-[#002147] text-[#002147] px-4 py-2 rounded text-sm hover:bg-[#002147] hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/demo" className="bg-[#D4AF37] text-[#002147] font-semibold px-5 py-2 rounded text-sm hover:bg-[#b8962f] transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-serif font-bold text-[#002147] mb-6">Trust Center</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transparency in security. View our certifications, encryption standards, and data practices.
          </p>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Protocol Counsel provides technology infrastructure. Our platform certifications apply to our technology and data handling—not to services performed by third-party providers. Each licensed provider maintains their own compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-[#002147]">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-serif font-bold text-[#002147] mb-8 text-center">Compliance Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certs.map((cert, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-[#002147]">{cert.name}</div>
                    <div className="text-sm text-slate-500">{cert.desc}</div>
                  </div>
                  <div className="bg-[#002147] text-white text-xs font-bold px-3 py-1 rounded">{cert.logo}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Standard</span>
                    <span className="text-[#002147]">{cert.standards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Encryption</span>
                    <span className="text-[#002147]">{cert.encryption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Residency */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-slate-200 p-8 rounded-lg">
            <h2 className="text-2xl font-serif font-bold text-[#002147] mb-4">Data Residency & Processing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#002147] mb-2">Infrastructure</h3>
                <p className="text-slate-600 text-sm">All data stored in US-based SOC 2 certified data centers with redundant backups.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#002147] mb-2">Encryption Keys</h3>
                <p className="text-slate-600 text-sm">Keys rotated every 90 days. AWS KMS with HSM-backed key storage.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#002147] mb-2">Access Controls</h3>
                <p className="text-slate-600 text-sm">Role-based access with audit logging. No standing admin access.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#002147] mb-2">Incident Response</h3>
                <p className="text-slate-600 text-sm">24/7 SOC monitoring. 24-hour breach notification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Questions about our security?</h2>
          <p className="text-slate-300 mb-8">View our full security whitepaper or contact our security team.</p>
          <div className="flex justify-center gap-4">
            <Link href="/security" className="bg-[#D4AF37] text-[#002147] font-semibold px-8 py-3 rounded-md hover:bg-[#b8962f] transition-colors">
              Security Details
            </Link>
            <Link href="/demo" className="border border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors">
              Contact Security Team
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} PROTOCOL COUNSEL. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}