import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "Medical Records Retrieval",
      description: "HIPAA-compliant retrieval with chain-of-custody documentation for litigation support.",
      href: "/services",
    },
    {
      title: "Vital Records Fulfillment",
      description: "Official state certificates for active litigation and legal proceedings.",
      href: "/services",
    },
    {
      title: "Asset Discovery",
      description: "Intelligent retrieval with full audit trails for legal discovery.",
      href: "/services",
    },
    {
      title: "Secure Document Vault",
      description: "AES-256 encrypted storage with immutable compliance logging.",
      href: "/services",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime SLA" },
    { value: "50K+", label: "Firms Served" },
    { value: "2M+", label: "Documents Processed" },
    { value: "24/7", label: "Enterprise Support" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#002147] rounded flex items-center justify-center">
              <span className="text-[#D4AF37] font-serif font-bold text-lg">PC</span>
            </div>
            <div>
              <span className="text-[#002147] font-semibold tracking-tight">PROTOCOL COUNSEL</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link href="/services" className="text-sm text-slate-600 hover:text-[#002147] transition-colors">Services</Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-[#002147] transition-colors">Pricing</Link>
            <Link href="/security" className="text-sm text-slate-600 hover:text-[#002147] transition-colors">Security</Link>
            <Link href="/company" className="text-sm text-slate-600 hover:text-[#002147] transition-colors">Company</Link>
            <Link href="/portal/login" className="text-sm text-slate-600 hover:text-[#002147] transition-colors">Client Portal</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/portal/login" className="text-sm text-[#002147] font-medium hover:underline">
              Sign In
            </Link>
            <Link href="/demo" className="bg-[#002147] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#003366] transition-colors">
              Request Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <p className="text-[#D4AF37] font-medium tracking-widest text-sm mb-6 uppercase">
              Enterprise Legal Infrastructure
            </p>
            <h1 className="text-5xl lg:text-6xl text-[#002147] font-serif font-bold leading-tight mb-8">
              The Standard for<br />Legal Operations
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              Protocol Counsel provides enterprise-grade infrastructure for law firms and legal departments. HIPAA-compliant retrieval, chain-of-custody documentation, and real-time compliance monitoring—all through a single secure platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/demo" className="bg-[#002147] text-white px-8 py-4 rounded font-medium hover:bg-[#003366] transition-all">
                Schedule Consultation
              </Link>
              <Link href="/portal/signup" className="border-2 border-[#002147] text-[#002147] px-8 py-4 rounded font-medium hover:bg-[#002147] hover:text-white transition-all">
                Begin Onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            <span className="text-white/80 text-sm font-medium">Compliant Infrastructure</span>
            <span className="text-[#D4AF37]">•</span>
            <span className="text-white/80 text-sm font-medium">SOC 2 Type II</span>
            <span className="text-[#D4AF37]">•</span>
            <span className="text-white/80 text-sm font-medium">HIPAA Certified</span>
            <span className="text-[#D4AF37]">•</span>
            <span className="text-white/80 text-sm font-medium">ISO 27001</span>
            <span className="text-[#D4AF37]">•</span>
            <span className="text-white/80 text-sm font-medium">GDPR Ready</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-serif font-bold text-[#002147] mb-2">{stat.value}</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <p className="text-[#D4AF37] font-medium tracking-widest text-sm mb-4 uppercase">Core Platform</p>
            <h2 className="text-4xl font-serif font-bold text-[#002147]">Integrated Legal Services</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <Link 
                key={i} 
                href={service.href}
                className="group p-8 border border-slate-200 rounded-lg hover:border-[#002147] hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-[#002147] group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <span className="text-slate-400 group-hover:text-[#002147] transition-colors">→</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#002147]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">
            Ready to Modernize Your Legal Operations?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of law firms and legal departments who rely on Protocol Counsel for compliant, efficient service coordination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="bg-[#D4AF37] text-[#002147] px-8 py-4 rounded font-semibold hover:bg-[#c9a430] transition-colors">
              Schedule Demo
            </Link>
            <Link href="/contact" className="border border-white text-white px-8 py-4 rounded font-medium hover:bg-white hover:text-[#002147] transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#002147] rounded flex items-center justify-center">
                  <span className="text-[#D4AF37] font-serif font-bold text-lg">PC</span>
                </div>
                <span className="text-white font-semibold">PROTOCOL COUNSEL</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enterprise legal infrastructure for modern law firms and legal departments.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-slate-400 text-sm hover:text-white">Services</Link></li>
                <li><Link href="/pricing" className="text-slate-400 text-sm hover:text-white">Pricing</Link></li>
                <li><Link href="/security" className="text-slate-400 text-sm hover:text-white">Security</Link></li>
                <li><Link href="/compliance" className="text-slate-400 text-sm hover:text-white">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/company" className="text-slate-400 text-sm hover:text-white">About</Link></li>
                <li><Link href="/case-studies" className="text-slate-400 text-sm hover:text-white">Case Studies</Link></li>
                <li><Link href="/partners" className="text-slate-400 text-sm hover:text-white">Partners</Link></li>
                <li><Link href="/careers" className="text-slate-400 text-sm hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-slate-400 text-sm hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-400 text-sm hover:text-white">Terms of Service</Link></li>
                <li><Link href="/security" className="text-slate-400 text-sm hover:text-white">Security</Link></li>
                <li><Link href="/cookies" className="text-slate-400 text-sm hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © 2024 Protocol Counsel. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs mt-2 md:mt-0">
              This platform provides technology infrastructure. Licensed providers deliver legal services.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}