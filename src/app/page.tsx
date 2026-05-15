import Link from "next/link";
import { DemoVideoPlayer } from "@/components/DemoVideoPlayer";

export default function Home() {
  const services = [
    {
      title: "Automated Asset Recovery",
      description: "Intelligent retrieval with chain-of-custody documentation for legal proceedings.",
      icon: "⚡",
    },
    {
      title: "Reverse Compliance",
      description: "Preemptive regulatory checks ensuring every step meets current legal standards.",
      icon: "🔄",
    },
    {
      title: "Secure Document Vault",
      description: "AES-256 encrypted storage with immutable audit trails for every interaction.",
      icon: "🔐",
    },
    {
      title: "Field Coordination",
      description: "Real-time assignment and tracking for mobile legal professionals.",
      icon: "📍",
    },
  ];

  const timeline = [
    { time: "12:01 PM", event: "Order Dispatched", status: "complete" },
    { time: "12:15 PM", event: "Signer Notified", status: "complete" },
    { time: "12:45 PM", event: "Location Verification", status: "active" },
    { time: "1:15 PM", event: "Document Secured", status: "pending" },
  ];

  return (
    <main className="min-h-screen">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">ProtocolCounsel</Link>
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
            <p className="text-[#D4AF37] text-sm tracking-widest uppercase mb-4">Enterprise Legal Operations</p>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Global Protocol Orchestration
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-md">
              Streamlined, automated, and built for scale. The definitive platform for modern legal service operations.
            </p>
            <div className="flex gap-4">
              <Link href="/portal/login" className="btn-gold">
                Enter the Protocol
              </Link>
              <Link href="/demo" className="border border-slate-500 text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
                Watch Demo
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            {/* Abstract Legal Bridge Image Placeholder */}
            <div className="relative aspect-square bg-gradient-to-br from-slate-800 to-oxford rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-64 h-64 opacity-30">
                  <path 
                    d="M20 180 L80 100 L120 140 L180 60" 
                    fill="none" 
                    stroke="#D4AF37" 
                    strokeWidth="2"
                  />
                  <circle cx="80" cy="100" r="4" fill="#D4AF37" />
                  <circle cx="120" cy="140" r="4" fill="#D4AF37" />
                  <circle cx="180" cy="60" r="6" fill="#D4AF37" />
                  <rect x="70" y="100" width="20" height="80" fill="#D4AF37" opacity="0.3" />
                  <rect x="110" y="140" width="20" height="40" fill="#D4AF37" opacity="0.3" />
                </svg>
              </div>
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
            <h2 className="text-4xl font-serif font-bold text-oxford mb-4">Service Architecture</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Enterprise-grade components for modern legal operations. Each module built for precision, security, and compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="card-elevated p-6">
                <div className="text-3xl mb-4">{service.icon}</div>
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
              <div className="bg-oxford text-white p-6 rounded-lg">
                <h3 className="text-lg font-serif font-bold mb-2">Why ProtocolCounsel?</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex gap-2"><span>✓</span> Zero-trust architecture</li>
                  <li className="flex gap-2"><span>✓</span> Real-time chain of custody</li>
                  <li className="flex gap-2"><span>✓</span> Automated compliance checks</li>
                  <li className="flex gap-2"><span>✓</span> 256-bit encryption</li>
                </ul>
              </div>
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-oxford mb-2">Enterprise Ready</h3>
                <p className="text-slate-600 text-sm">SOC 2 Type II certified. HIPAA compliant. Built for firms handling sensitive legal operations at scale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-oxford mb-4">See It In Action</h2>
          <p className="text-slate-600 mb-8">Watch how ProtocolCounsel streamlines legal operations.</p>
          <div className="text-left">
            <DemoVideoPlayer title="Platform Demo" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-oxford text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">ProtocolCounsel</h4>
            <p className="text-slate-400 text-sm">Global protocol orchestration for enterprise legal operations.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Dashboard</li>
              <li>Services</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Compliance</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Security</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-slate-400 text-sm">support@protocolcounsel.com</p>
            <p className="text-slate-400 text-sm">1-800-PROTOCOL</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} ProtocolCounsel. All rights reserved.
        </div>
      </footer>
    </main>
  );
}