import Link from "next/link";

export default function Home() {
  const stats = [
    { value: "50,000+", label: "Law Firms Served" },
    { value: "2M+", label: "Documents Processed" },
    { value: "99.9%", label: "Platform Uptime" },
    { value: "$500M+", label: "Client Recoveries" },
  ];

  const services = [
    {
      title: "Medical Records Retrieval",
      description: "HIPAA-compliant retrieval with complete chain-of-custody documentation for litigation support.",
      icon: "📋",
    },
    {
      title: "Vital Records",
      description: "Fast-track fulfillment of official state certificates for active litigation.",
      icon: "📜",
    },
    {
      title: "Asset Discovery",
      description: "Comprehensive retrieval with full audit trails for legal discovery.",
      icon: "🔍",
    },
    {
      title: "Secure Vault",
      description: "AES-256 encrypted storage with immutable compliance logging.",
      icon: "🔐",
    },
  ];

  const trustBadges = ["SOC 2 Type II", "HIPAA Certified", "ISO 27001", "GDPR Ready"];

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#002147] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-[#D4AF37] font-bold text-xl">PC</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#002147] font-bold tracking-tight">PROTOCOL COUNSEL</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/services" className="text-sm text-slate-600 hover:text-[#002147] font-medium">Services</Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-[#002147] font-medium">Pricing</Link>
            <Link href="/case-studies" className="text-sm text-slate-600 hover:text-[#002147] font-medium">Case Studies</Link>
            <Link href="/security" className="text-sm text-slate-600 hover:text-[#002147] font-medium">Security</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/portal/login" className="text-sm font-medium text-slate-600 hover:text-[#002147] hidden sm:block">
              Sign In
            </Link>
            <Link href="/demo" className="bg-[#D4AF37] text-[#002147] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#c9a430] transition-all shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#002147]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#002147]/5 px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-slate-600">Enterprise Legal Infrastructure</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#002147] leading-[1.1] mb-6">
                Legal Operations,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002147] to-[#D4AF37]">Elevated.</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                The enterprise platform for law firms who demand compliance, efficiency, and results. HIPAA-compliant retrieval, chain-of-custody documentation, and real-time monitoring.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/demo" className="inline-flex items-center justify-center gap-2 bg-[#002147] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#003366] transition-all shadow-xl">
                  Schedule Consultation
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/portal/signup" className="inline-flex items-center justify-center gap-2 border-2 border-[#002147] text-[#002147] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#002147] hover:text-white transition-all">
                  View Pricing
                </Link>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SOC 2 certified
                </span>
              </div>
            </div>
            
            {/* Dashboard Preview Card */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-[#002147] to-[#001a36] rounded-3xl shadow-2xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-[#002147] to-[#001a36] rounded-3xl shadow-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#002147]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Platform Status</p>
                    <p className="text-green-400 text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      All systems operational
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300">Today's Requests</span>
                      <span className="text-2xl font-bold text-[#D4AF37]">1,247</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-[#D4AF37] h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-slate-300 text-sm">Avg. Response</p>
                      <p className="text-xl font-bold">2.4s</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-slate-300 text-sm">Success Rate</p>
                      <p className="text-xl font-bold text-green-400">99.8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-[#002147]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
            <span className="text-white/60 text-sm font-medium tracking-wider uppercase">Trusted Infrastructure</span>
            {trustBadges.map((badge, i) => (
              <span key={i} className="text-white/90 text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-[#002147] mb-2">{stat.value}</p>
                <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-[#D4AF37] font-semibold tracking-widest text-sm mb-4 uppercase">Core Platform</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#002147] mb-4">
              Everything You Need.<br />Nothing You Don't.
            </h2>
            <p className="text-xl text-slate-600">
              Streamlined legal operations infrastructure. No bloat, no complexity—just enterprise-grade tools that work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={i} className="group p-8 bg-white border border-slate-200 rounded-2xl hover:border-[#002147] hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-[#002147] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#002147] mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-[#002147] font-semibold hover:text-[#D4AF37] transition-colors">
              Explore all services
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#002147]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Elevate Your Legal Operations?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of law firms who rely on Protocol Counsel for compliant, efficient service coordination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="bg-[#D4AF37] text-[#002147] px-8 py-4 rounded-full font-bold hover:bg-[#c9a430] transition-all shadow-xl">
              Schedule Demo
            </Link>
            <Link href="/contact" className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#002147] transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#002147] rounded-lg flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold">PC</span>
                </div>
                <span className="text-white font-semibold">PROTOCOL COUNSEL</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enterprise legal infrastructure for modern law firms and legal departments.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform              </h4>
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
                <li><Link href="/privacy" className="text-slate-400 text-sm hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="text-slate-400 text-sm hover:text-white">Terms</Link></li>
                <li><Link href="/security" className="text-slate-400 text-sm hover:text-white">Security</Link></li>
                <li><Link href="/cookies" className="text-slate-400 text-sm hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">© 2024 Protocol Counsel. All rights reserved.</p>
            <p className="text-slate-600 text-xs mt-2 md:mt-0">Technology infrastructure. Licensed providers deliver legal services.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
