import { useState } from "react";
import Link from "next/link";

export const metadata = {
  title: "Pricing - ProtocolCounsel",
  description: "Flexible pricing for firms of all sizes. Standard, Institutional, and Sovereign tiers.",
};

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const tiers = [
    {
      name: "Standard",
      desc: "For boutique firms",
      monthly: 499,
      annual: 399,
      features: [
        "Up to 100 orders/month",
        "AI Scheduling",
        "Basic analytics",
        "Email support",
        "1 user seat",
      ],
    },
    {
      name: "Institutional",
      desc: "For enterprise-scale operations",
      monthly: 1499,
      annual: 1199,
      popular: true,
      features: [
        "Unlimited orders",
        "Custom Regulatory Rails",
        "Advanced analytics",
        "Priority support",
        "5 user seats",
        "API access",
        "Webhook integration",
      ],
    },
    {
      name: "Sovereign",
      desc: "White-glove field coordination",
      monthly: 3499,
      annual: 2799,
      features: [
        "Everything in Institutional",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 phone support",
        "Unlimited seats",
        "SLA guarantee",
        "On-site training",
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">ProtocolCounsel</Link>
          <div className="flex items-center gap-6">
            <Link href="/services" className="text-slate-600 hover:text-[#002147] text-sm">Services</Link>
            <Link href="/security" className="text-slate-600 hover:text-[#002147] text-sm">Security</Link>
            <Link href="/pricing" className="text-[#002147] text-sm font-medium">Pricing</Link>
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

      <section className="pt-32 pb-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-serif font-bold text-[#002147] mb-6">Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Flexible plans for firms of all sizes. No hidden fees.
          </p>
          
          <div className="flex justify-center items-center gap-4">
            <span className={!annual ? "text-[#002147] font-medium" : "text-slate-500"}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="w-14 h-7 bg-[#002147] rounded-full p-1 relative transition-colors"
            >
              <div className={`w-5 h-5 bg-[#D4AF37] rounded-full transition-transform ${annual ? "translate-x-7" : "translate-x-0"}`} />
            </button>
            <span className={annual ? "text-[#002147] font-medium" : "text-slate-500"}>Annual</span>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Save 20%</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div key={i} className={`relative bg-white border ${tier.popular ? "border-[#D4AF37] ring-2 ring-[#D4AF37]" : "border-slate-200"} p-8 rounded-lg`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#002147] text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[#002147] mb-1">{tier.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{tier.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#002147]">${annual ? tier.annual : tier.monthly}</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/demo" className={`block text-center py-3 rounded-md transition-colors ${tier.popular ? "bg-[#D4AF37] text-[#002147] hover:bg-[#b8962f]" : "bg-[#002147] text-white hover:bg-slate-700"}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#002147] mb-4">Need a custom solution?</h2>
          <p className="text-slate-600 mb-8">Contact us for custom pricing and integrations.</p>
          <Link href="/demo" className="bg-[#002147] text-white font-semibold px-8 py-3 rounded-md hover:bg-slate-700 transition-colors">
            Contact Sales
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} ProtocolCounsel. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}