import Link from "next/link";
import { ReputationDefender, TrustBar, StarRating } from "@/components/reputation/ReputationDefender";

export default function Home() {
  const services = [
    {
      title: "Medical Records Retrieval",
      description: "HIPAA-compliant authorization routing with automated provider tracking and chain-of-custody documentation.",
      icon: "Medical",
    },
    {
      title: "Vital Records Fulfillment",
      description: "Fast-track ordering for official state certificates required for active litigation and legal proceedings.",
      icon: "Vital",
    },
    {
      title: "Automated Asset Recovery",
      description: "Intelligent retrieval with chain-of-custody documentation for legal proceedings.",
      icon: "Automated",
    },
    {
      title: "Secure Document Vault",
      description: "AES-256 encrypted storage with immutable audit trails for every interaction.",
      icon: "Vault",
    },
    {
      title: "Field Coordination",
      description: "Real-time assignment and tracking for mobile legal professionals.",
      icon: "Field",
    },
  ];

  const timeline = [
    { time: "12:01 PM", event: "Order Dispatched", status: "complete" },
    { time: "12:15 PM", event: "Signer Notified", status: "complete" },
    { time: "12:45 PM", event: "Location Verification", status: "active" },
    { time: "1:15 PM", event: "Documentation Secured", status: "pending" },
  ];

  return (
    <main className="min-h-screen">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold tracking-tight text-[#002147]">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-slate-600 hover:text-[#002147] text-sm">Services</Link>
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

      {/* Hero Section - Split Screen */}
      <section className="pt-24 min-h-[85vh] bg-oxford flex">
        <div className="max-w-7xl mx-auto w-full px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-[#D4AF37] text-sm tracking-widest uppercase mb-4">Legal Infrastructure</p>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Protocol Orchestration
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-md">
              Enterprise infrastructure for legal service management. Connect your firm to licensed service providers nationwide through our secure orchestration platform with chain-of-custody documentation, automated scheduling, and real-time compliance.
            </p>
            <div className="flex gap-4">
              <Link href="/portal/login" className="btn-gold">
                Client Portal
              </Link>
              <Link href="/demo" className="border border-slate-500 text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
                Schedule Consultation
              </Link>
            </div>
            <p className="text-slate-500 text-xs mt-6">
              ⚡ Protocol Counsel provides technology infrastructure. Licensed service providers deliver all legal services.
            </p>
          </div>
          <div className="hidden lg:block">
            {/* Legal Vault / SecureBridge Background */}
            <div className="relative aspect-square bg-gradient-to-br from-[#001529] via-[#002147] to-[#001529] rounded-lg overflow-hidden border border-slate-700">
              {/* Architectural lines */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" opacity="0.3"/>
                  {/* Vault door circles */}
                  <circle cx="200" cy="200" r="120" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"/>
                  <circle cx="200" cy="200" r="90" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3"/>
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.2"/>
                  {/* Center seal */}
                  <circle cx="200" cy="200" r="30" fill="#D4AF37" opacity="0.1"/>
                  <text x="200" y="195" textAnchor="middle" fill="#D4AF37" fontSize="10" fontWeight="bold">PC</text>
                  <text x="200" y="210" textAnchor="middle" fill="#D4AF37" fontSize="6">LEGAL</text>
                  {/* Corner accents */}
                  <path d="M 50 50 L 80 50 L 80 80" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                  <path d="M 350 50 L 320 50 L 320 80" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                  <path d="M 50 350 L 80 350 L 80 320" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                  <path d="M 350 350 L 320 350 L 320 320" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                </svg>
              </div>
              {/* Floating text elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">Secure Platform</div>
                  <div className="text-slate-400 text-sm">End-to-End Encryption</div>
                </div>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 text-slate-400 text-sm">
                <p>SecureBridge™ Architecture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Row - Trust Bar */}
      <section className="bg-slate-100 py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-500 text-sm mb-6">TRUSTED BY LEADING FIRMS • COMPLIANCE CERTIFICATIONS</p>
          <div className="flex justify-center gap-12 items-center opacity-50 grayscale">
            <span className="text-lg font-semibold">ISO 27001</span>
            <span className="text-lg font-semibold">SOC 2 Type II</span>
            <span className="text-lg font-semibold">HIPAA Compliant</span>
            <span className="text-lg font-semibold">GDPR Ready</span>
            <span className="text-lg font-semibold">21 CFR Part 11</span>
          </div>
        </div>
      </section>

      {/* Feature Grid - Elevated Cards */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-oxford mb-4">Integrated Service Architecture</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive legal operations tooling. Each component engineered for regulatory compliance, audit readiness, and operational efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="card-elevated p-6 border-t-2 border-t-[#D4AF37]">
                <div className="text-xl mb-4 font-serif font-semibold text-[#D4AF37]">{service.icon}</div>
                <h3 className="text-lg font-semibold text-oxford mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sealed Vault Dashboard Mockup */}
      <section id="dashboard" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-oxford px-6 py-4 flex justify-between items-center">
                  <span className="text-white font-semibold">Sealed Vault™ Dashboard</span>
                  <span className="text-slate-400 text-sm">Live Preview</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded">
                      <p className="text-slate-500 text-xs">Active Orders</p>
                      <p className="text-2xl font-bold text-oxford">247</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded">
                      <p className="text-slate-500 text-xs">Completed Today</p>
                      <p className="text-2xl font-bold text-oxford">89</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded">
                      <p className="text-slate-500 text-xs">Avg. Time</p>
                      <p className="text-2xl font-bold text-oxford">42m</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-6">
                    <h4 className="text-sm font-semibold text-oxford mb-4">Timeline of Service</h4>
                    <div className="space-y-3">
                      {timeline.map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            item.status === "complete" ? "bg-green-500" :
                            item.status === "active" ? "bg-[#D4AF37] animate-pulse" :
                            "bg-slate-300"
                          }`} />
                          <span className="text-xs text-slate-500 w-20">{item.time}</span>
                          <span className={`text-sm ${
                            item.status === "active" ? "text-oxford font-medium" : "text-slate-600"
                          }`}>{item.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-oxford text-white p-6 rounded-lg border-l-4 border-l-[#D4AF37]">
                <h3 className="text-lg font-serif font-bold mb-4">Enterprise Advantages</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex gap-2"><span className="text-[#D4AF37]">◆</span> Zero-trust architecture</li>
                  <li className="flex gap-2"><span className="text-[#D4AF37]">◆</span> Real-time chain of custody</li>
                  <li className="flex gap-2"><span className="text-[#D4AF37]">◆</span> Regulatory compliance verification</li>
                  <li className="flex gap-2"><span className="text-[#D4AF37]">◆</span> AES-256 encryption</li>
                </ul>
              </div>
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-oxford mb-2">Enterprise Ready</h3>
                <p className="text-slate-600 text-sm">Built on SOC 2 Type II Infrastructure*. HIPAA-Ready Data Architecture. Built for firms handling sensitive legal operations at scale.</p>
                <p className="text-xs text-slate-400 mt-2 italic">* Platform-level certification is currently in-audit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Legal Data Vault SVG */}
      <section className="py-20 bg-oxford">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <svg className="w-64 h-64 mx-auto" viewBox="0 0 256 256" fill="none">
            {/* Outer vault door */}
            <rect x="32" y="48" width="192" height="160" rx="8" stroke="#D4AF37" strokeWidth="2" fill="none"/>
            {/* Vault door circle */}
            <circle cx="128" cy="128" r="56" stroke="#D4AF37" strokeWidth="2" fill="none"/>
            {/* Inner vault circle */}
            <circle cx="128" cy="128" r="36" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            {/* Center lock */}
            <circle cx="128" cy="128" r="16" fill="#D4AF37" opacity="0.3"/>
            <circle cx="128" cy="128" r="8" stroke="#D4AF37" strokeWidth="2" fill="none"/>
            {/* Corner accents */}
            <path d="M48 64 L48 48 L64 48" stroke="#D4AF37" strokeWidth="2"/>
            <path d="M208 64 L208 48 L192 48" stroke="#D4AF37" strokeWidth="2"/>
            <path d="M48 192 L48 208 L64 208" stroke="#D4AF37" strokeWidth="2"/>
            <path d="M208 192 L208 208 L192 208" stroke="#D4AF37" strokeWidth="2"/>
            {/* Side lock bars */}
            <rect x="44" y="112" width="8" height="32" rx="2" fill="#D4AF37" opacity="0.6"/>
            <rect x="204" y="112" width="8" height="32" rx="2" fill="#D4AF37" opacity="0.6"/>
            {/* Status indicator */}
            <circle cx="128" cy="224" r="6" fill="#D4AF37"/>
          </svg>
          <h2 className="text-2xl font-serif font-bold text-white mt-8">Secure Legal Data Vault</h2>
          <p className="text-slate-400 mt-2">AES-256 Encrypted Infrastructure</p>
        </div>
      </section>

      {/* Services Grid - Below Trust Bar */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-oxford mb-12 text-center">Core Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-[#D4AF37] transition-colors">
                <div className="w-12 h-12 mb-4 rounded-lg bg-oxford flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-sm">{service.title.substring(0, 2)}</span>
                </div>
                <h3 className="font-semibold text-oxford mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          
          {/* Liability Statement */}
          <div className="mt-12 bg-oxford text-white p-6 rounded-lg text-center">
            <p className="font-bold text-[#D4AF37]">
              Protocol Counsel is a secure software infrastructure utility. All field operations, records retrieval, and legal services are executed exclusively by independent, licensed third-party professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Reputation Defender Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <TrustBar />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <StarRating rating={5} size="lg" />
              <span className="text-2xl font-bold text-[#002147]">5.0</span>
            </div>
            <p className="text-center text-slate-600 mb-4">
              Based on client reviews and industry certifications
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded">
                <StarRating rating={5} size="sm" />
                <p className="text-xs text-slate-500 mt-2">"Outstanding platform..."</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded">
                <StarRating rating={5} size="sm" />
                <p className="text-xs text-slate-500 mt-2">"Impeccable documentation..."</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded">
                <StarRating rating={5} size="sm" />
                <p className="text-xs text-slate-500 mt-2">"Best system we've used..."</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-[#002147]">100%</p>
              <p className="text-xs text-slate-500">Build on SOC 2 Type II*</p>
              <p className="text-[10px] text-slate-400 italic mt-1">* Infrastructure</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#002147]">24/7</p>
              <p className="text-xs text-slate-500">Security Monitoring</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#002147]">0</p>
              <p className="text-xs text-slate-500">Data Breaches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-oxford text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></h4>
            <p className="text-slate-400 text-sm">Legal infrastructure for modern law firms.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-white transition">Demo</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Compliance</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/security" className="hover:text-white transition">Security</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition">Compliance</Link></li>
              <li><Link href="/trust" className="hover:text-white transition">Trust</Link></li>
              <li><Link href="/sla" className="hover:text-white transition">SLA</Link></li>
              <li><Link href="/refund" className="hover:text-white transition">Refund Policy</Link></li>
              <li><Link href="/status" className="hover:text-white transition">Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/docs" className="hover:text-white transition">API Docs</Link></li>
              <li><Link href="/partners" className="hover:text-white transition">Partners</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/company" className="hover:text-white transition">About</Link></li>
              <li><Link href="/demo" className="hover:text-white transition">Contact</Link></li>
            </ul>
            <h4 className="font-semibold mt-4 mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/legal/cookies" className="hover:text-white transition">Cookie Declaration</Link></li>
              <li><Link href="/legal/dpa" className="hover:text-white transition">DPA</Link></li>
              <li><Link href="/legal/security" className="hover:text-white transition">Bug Bounty</Link></li>
            </ul>
            <h4 className="font-semibold mt-4 mb-4">Contact</h4>
            <p className="text-slate-400 text-sm">support@protocolcounsel.com</p>
            <p className="text-slate-400 text-sm">1-800-PROTOCOL</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-700">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}