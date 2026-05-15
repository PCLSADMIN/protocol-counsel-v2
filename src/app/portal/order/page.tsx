'use client';

import React, { useState } from 'react';

// Placeholder Configuration for Backend Hooks
const BACKEND_CONFIG = {
  fulfillment: '360 Legal / Lexitas',
  shipping: {
    provider: 'FedEx Developer API',
    billing: 'Bill Recipient'
  },
  automation: {
    voice: 'Twilio',
    ai: 'OpenAI',
    purpose: 'Automated Scheduling Calls'
  },
  verification: 'Prime Tracers (Address Verification)',
  payments: 'Stripe Connect (Payouts & Net 30 Factoring)'
};

export default function OrderPortal() {
  // Mock user role - in a real app this would come from auth context
  const [userRole] = useState<'admin' | 'restricted_coordinator'>('restricted_coordinator');
  const [bulkData, setBulkData] = useState('');

  const isRestricted = userRole === 'restricted_coordinator';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#002147]">Order Portal</h1>
          <p className="text-slate-500 mt-2">Manage nationwide legal fulfillment and bulk requests.</p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Active Profile</span>
          <p className="font-medium text-[#002147] capitalize">{userRole.replace('_', ' ')}</p>
        </div>
      </header>

      {/* Bulk Ordering Section */}
      <section className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Bulk Ordering
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Enter multiple service requests below (one per row) or upload a CSV file.
        </p>
        
        <div className="space-y-4">
          <textarea
            value={bulkData}
            onChange={(e) => setBulkData(e.target.value)}
            placeholder="Service Type, Recipient Name, Address, Priority..."
            className="w-full h-40 p-4 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#002147] outline-none"
          />
          
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-[#002147] text-white rounded-md font-medium hover:bg-slate-800 transition">
              Process Bulk Order
            </button>
            <label className="px-6 py-2 border border-slate-300 rounded-md font-medium cursor-pointer hover:bg-slate-50 transition">
              Upload CSV
              <input type="file" className="hidden" accept=".csv" />
            </label>
          </div>
        </div>
      </section>

      {/* Order Details Table */}
      <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Order ID</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Service</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Status</th>
              {!isRestricted && (
                <th className="px-6 py-4 font-semibold text-sm text-slate-700">Pricing / Net 30</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-6 py-4 text-sm font-medium">#PC-9921</td>
              <td className="px-6 py-4 text-sm text-slate-600 font-medium">Process Service (Nationwide)</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold uppercase">Dispatched</span>
              </td>
              {!isRestricted && (
                <td className="px-6 py-4 text-sm text-slate-900 font-bold">$145.00</td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium">#PC-9844</td>
              <td className="px-6 py-4 text-sm text-slate-600 font-medium">Skip Trace (Advanced)</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold uppercase">Verified</span>
              </td>
              {!isRestricted && (
                <td className="px-6 py-4 text-sm text-slate-900 font-bold">$85.00</td>
              )}
            </tr>
          </tbody>
        </table>
        
        {isRestricted && (
          <div className="bg-slate-50 p-4 border-t text-center">
            <p className="text-xs text-slate-400 italic">Financial data restricted via Restricted Coordinator policy.</p>
          </div>
        )}
      </section>
      
      <footer className="mt-12 text-slate-400 text-[10px] uppercase tracking-widest text-center">
        Powered by {BACKEND_CONFIG.fulfillment} • Integrated with {BACKEND_CONFIG.shipping.provider}
      </footer>
    </div>
  );
}
