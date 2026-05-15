'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ROICalculatorPage() {
  const [orders, setOrders] = useState(100);
  const [staff, setStaff] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [serviceFee, setServiceFee] = useState(75);

  // Calculate savings
  const manualHours = orders * 0.5; // 30 min per order manually
  const manualCost = manualHours * hourlyRate;
  const totalCost = manualCost + (orders * serviceFee);
  const efficiencyGain = 0.6; // 60% more efficient
  const savings = totalCost * efficiencyGain;
  const annualSavings = savings * 12;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-serif font-bold text-[#002147]">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
          <div className="flex items-center gap-6">
            <Link href="/resources" className="text-[#002147] text-sm font-medium">Resources</Link>
            <Link href="/portal/login" className="border border-[#002147] text-[#002147] px-4 py-2 rounded text-sm">Login</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 bg-oxford">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">ROI Calculator</h1>
          <p className="text-slate-300 text-lg">
            Estimate your administrative savings with Protocol Counsel.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Input */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Your Firm Profile</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#002147] mb-2">Monthly Service Orders</label>
              <input type="number" value={orders} onChange={(e) => setOrders(Number(e.target.value))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002147] mb-2">Administrative Staff</label>
              <input type="number" value={staff} onChange={(e) => setStaff(Number(e.target.value))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002147] mb-2">Avg. Hourly Rate ($)</label>
              <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002147] mb-2">Avg. Service Fee ($)</label>
              <input type="number" value={serviceFee} onChange={(e) => setServiceFee(Number(e.target.value))} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-oxford text-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-6">Estimated Monthly Savings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-[#D4AF37]">${(manualHours * hourlyRate).toLocaleString()}</div>
              <div className="text-slate-400 text-sm mt-2">Admin Time Savings</div>
            </div>
            <div className="text-center p-6 bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-[#D4AF37]">${savings.toLocaleString()}</div>
              <div className="text-slate-400 text-sm mt-2">Efficiency Gains</div>
            </div>
            <div className="text-center p-6 bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-[#D4AF37]">${annualSavings.toLocaleString()}</div>
              <div className="text-slate-400 text-sm mt-2">Annual Savings</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-8">
          <Link href="/demo" className="inline-block px-6 py-3 bg-[#D4AF37] text-oxford rounded font-semibold hover:bg-[#b8962f]">
            Request Demo
          </Link>
        </section>

        {/* Infrastructure Notice */}
        <div className="mt-8 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500">
            ⚠️ <strong>Managed by Streamline Industries Management.</strong> Protocol Counsel provides technology infrastructure.
          </p>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}