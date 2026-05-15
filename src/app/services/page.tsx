import Link from "next/link";

export const metadata = {
  title: "Services - ProtocolCounsel",
  description: "Enterprise-grade legal operations services. Automated asset recovery, reverse compliance, secure document vault, and field coordination.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Automated Asset Recovery",
      description: "Intelligent retrieval with chain-of-custody documentation for legal proceedings. Real-time tracking from request to completion.",
      features: ["GPS-verified proof of service", "Automated cover sheet generation", "Immutable audit trails"],
      icon: "⚡",
    },
    {
      title: "Reverse Compliance",
      description: "Preemptive regulatory checks ensuring every step meets current legal standards. Proactive risk mitigation.",
      features: ["CA SB 53 ready", "CO AI Act compliant", "Real-time validation"],
      icon: "🔄",
    },
    {
      title: "Secure Document Vault",
      description: "AES-256 encrypted storage with immutable audit trails for every interaction. Zero-trust architecture.",
      features: ["End-to-end encryption", "90-day key rotation", "SOC 2 Type II certified"],
      icon: "🔐",
    },
    {
      title: "Field Coordination",
      description: "Real-time assignment and tracking for mobile legal professionals. Nationwide network coverage.",
      features: ["Live GPS tracking", "Push notifications", "Mobile-optimized interface"],
      icon: "📍",
    },
    {
      title: "AI Scheduling Assistant",
      description: "Automated appointment scheduling within signer time windows. SMS/voice confirmations.",
      features: ["8 AM - 8 PM local windows", "3 retry attempts", "Calendar integration"],
      icon: "🤖",
    },
    {
      title: "Trust Ledger",
      description: "Immutable transaction log for billing and escrow. Prepaid credits and Net 30 terms.",
     features: ["Real-time P&L", "LEDES export", "Stripe integration"],
      icon: "📊",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">ProtocolCounsel</Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-[#002147] text-sm font-medium">Services</Link>
            <Link href="/security" className="text-slate-600 hover:text-[#002147] text-sm">Security</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-[#002147] text-sm">Pricing</Link>
            <Link href="/trust" className="text-slate-600 hover:text-[#002147] text-sm">Trust</Link>
            <Link href="/portal/login" className="border border-[#002147] text-[#002147] px-4 py-2 rounded text-sm hover:bg-[#002147] hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/demo" className="bg-[#D4AF37] text-[#002147] font-semibold px-5 py-2 rounded text-sm hover:bg-[#b8962f] transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-serif font-bold text-[#002147] mb-6">Service Architecture</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enterprise-grade components for modern legal operations. Each module built for precision, security, and compliance.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="group bg-white border border-slate-200 p-8 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#002147] mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <li key={j} className="text-sm text-slate-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/demo" className="text-[#002147] font-medium text-sm group-hover:underline">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to streamline your operations?</h2>
          <p className="text-slate-300 mb-8">Schedule a personalized demo with our team.</p>
          <div className="flex justify-center gap-4">
            <Link href="/demo" className="bg-[#D4AF37] text-[#002147] font-semibold px-8 py-3 rounded-md hover:bg-[#b8962f] transition-colors">
              Request Demo
            </Link>
            <Link href="/pricing" className="border border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} ProtocolCounsel. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}