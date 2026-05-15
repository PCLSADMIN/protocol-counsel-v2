import Link from "next/link";

export const metadata = {
  title: "Security - PROTOCOL COUNSEL",
  description: "Enterprise security standards. Zero-trust architecture, AES-256 encryption, Built on SOC 2 Type II Infrastructure.",
};

export default function SecurityPage() {
  const certs = [
    {
      name: "SOC 2 Type II",
      desc: "Built on SOC 2 Type II Infrastructure*",
      standard: "AICPA Trust Services Criteria",
    },
    {
      name: "HIPAA-Ready",
      desc: "HIPAA-Ready Data Architecture",
      standard: "45 CFR Part 164",
    },
    {
      name: "ISO 27001",
      desc: "Information Security Management",
      standard: "ISO/IEC 27001:2022",
    },
    {
      name: "GDPR",
      desc: "Data Protection",
      standard: "EU 2016/679",
    },
  ];

  const features = [
    {
      title: "Zero-Trust Architecture",
      desc: "Every request verified. No implicit trust. Least-privilege access.",
    },
    {
      title: "AES-256 Encryption",
      desc: "Military-grade encryption at rest and in transit. 90-day key rotation.",
    },
    {
      title: "WebAuthn Passkeys",
      desc: "Biometric authentication. No passwords to compromise.",
    },
    {
      title: "Immutable Audit Logs",
      desc: "Every action timestamped and logged. Tamper-proof records.",
    },
  ];

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold tracking-tight inline-flex items-center gap-2">PROTOCOL COUNSEL</Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-slate-600 hover:text-oxford text-sm">Services</Link>
            <Link href="/security" className="text-oxford text-sm font-medium">Security</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-oxford text-sm">Pricing</Link>
            <Link href="/trust" className="text-slate-600 hover:text-oxford text-sm">Trust</Link>
            <Link href="/portal/login" className="border border-[#002147] text-oxford px-4 py-2 rounded text-sm hover:bg-[#002147] hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/demo" className="bg-[#D4AF37] text-oxford font-semibold px-5 py-2 rounded text-sm hover:bg-[#b8962f] transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-serif font-bold text-oxford mb-6">Security & Compliance</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enterprise security architecture. Zero-trust framework with end-to-end encryption and regulatory compliance.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-lg text-center border border-slate-200">
                {/* Certificate Badge */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#002147] flex items-center justify-center">
                  <div className="text-[#D4AF37] font-bold text-lg">{cert.name.substring(0, 2)}</div>
                </div>
                <div className="text-xl font-bold text-oxford mb-2">{cert.name}</div>
                <p className="text-sm text-slate-600">{cert.desc}</p>
                <p className="text-xs text-slate-400 mt-2">{cert.standard}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mt-6 italic">
          * Protocol Counsel utilizes certified infrastructure providers. Platform-level certification is currently in-audit.
        </p>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-lg">
                {/* Feature Icon Badge */}
                <div className="w-12 h-12 mb-4 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                  <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-oxford mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Questions about security?</h2>
          <p className="text-slate-300 mb-8">Our security team is here to help.</p>
          <Link href="/demo" className="bg-[#D4AF37] text-oxford font-semibold px-8 py-3 rounded-md hover:bg-[#b8962f] transition-colors">
            Request Demo
          </Link>
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