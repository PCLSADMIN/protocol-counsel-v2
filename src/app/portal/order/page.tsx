'use client';

import React, { useState, useEffect, useRef } from 'react';
import { saveCoversheetDefaults, loadCoversheetDefaults, CoversheetDefaults } from '@/lib/types/order';
import { AgentCoversheet } from '@/components/coversheet/AgentCoversheet';
import { DocumentScanner } from '@/components/documents/DocumentScanner';
import { ReputationWidget } from '@/components/reputation/ReputationDefender';

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

// Mock order interface with financial firewall
interface SecureOrder {
  id: string;
  serviceType?: string;
  recipientName?: string;
  recipientAddress?: string;
  recipientCity?: string;
  recipientState?: string;
  recipientZip?: string;
  status?: 'new' | 'processing' | 'dispatched' | 'completed';
  priority?: 'standard' | 'rush' | 'expedited';
  finalAmount?: number | null;
  manualAuditComplete?: boolean;
  servicePrice?: number | null;
  processingFee?: number | null;
  shippingFee?: number | null;
  finalInvoiceAmount?: number | null;
}

export default function OrderPortal() {
  // Mock user role - in production would come from auth context
  const [userRole] = useState<'admin' | 'restricted_coordinator'>('restricted_coordinator');
  const [bulkData, setBulkData] = useState('');
  const [showCoversheet, setShowCoversheet] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SecureOrder | null>(null);
  const coversheetRef = useRef<HTMLDivElement>(null);
  
  // Quick Quantity state
  const [quantity, setQuantity] = useState(1);
  const [dynamicRows, setDynamicRows] = useState<SecureOrder[]>([]);
  
  // Coversheet defaults state
  const [defaults, setDefaults] = useState<CoversheetDefaults>({
    firmName: 'Smith & Associates',
    firmAddress: '100 Legal Plaza, Suite 500',
    firmCity: 'Los Angeles',
    firmState: 'CA',
    firmZip: '90001',
    fedExAccount: '123456789',
    barNumber: 'BAR-2024-001',
    defaultServiceType: 'Process Service',
    defaultPriority: 'standard',
    // New coversheet fields
    publicContactNumber: '(555) 123-4567',
    firmRepName: 'John Smith, Esq.',
  });
  
  // Load coversheet from localStorage on mount
  useEffect(() => {
    const saved = loadCoversheetDefaults();
    if (saved) setDefaults(saved);
  }, []);
  
  // Update dynamic rows when quantity changes
  useEffect(() => {
    const rows: SecureOrder[] = [];
    for (let i = 0; i < quantity; i++) {
      rows.push({
        id: `temp-${i}`,
        serviceType: defaults.defaultServiceType,
        status: 'new',
        servicePrice: null,
        processingFee: null,
        shippingFee: null,
        finalInvoiceAmount: null,
        manualAuditComplete: false,
      });
    }
    setDynamicRows(rows);
  }, [quantity, defaults.defaultServiceType]);
  
  const isRestricted = userRole === 'restricted_coordinator';
  
  // Financial Firewall - Check if amount should be shown
  const canViewAmount = (order: SecureOrder) => {
    // Only show if admin AND manual audit is complete
    return !isRestricted && order.manualAuditComplete;
  };
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10 flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#002147]">Order Management</h1>
          <p className="text-slate-500 mt-2">Nationwide legal service fulfillment and bulk processing.</p>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Active Profile</span>
          <p className="font-medium text-[#002147] capitalize">{userRole.replace('_', ' ')}</p>
        </div>
      </header>

      {/* Coversheet Defaults - Auto-fill Section */}
      <section className="bg-white rounded-xl shadow-sm border p-6 mb-8 border-l-4 border-l-[#D4AF37]">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Firm Coversheet Defaults
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Configure default firm data for service coversheet auto-fill. (Firm Administrator only)
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Return Address</label>
            <input 
              type="text" 
              value={defaults.firmAddress}
              onChange={(e) => setDefaults({...defaults, firmAddress: e.target.value})}
              placeholder="123 Legal Way"
              className="w-full p-2 border rounded text-sm"
              disabled={isRestricted}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">City</label>
            <input 
              type="text" 
              value={defaults.firmCity}
              onChange={(e) => setDefaults({...defaults, firmCity: e.target.value})}
              placeholder="Washington"
              className="w-full p-2 border rounded text-sm"
              disabled={isRestricted}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">FedEx Account</label>
            <input 
              type="text" 
              value={defaults.fedExAccount}
              onChange={(e) => setDefaults({...defaults, fedExAccount: e.target.value})}
              placeholder="123456789"
              className="w-full p-2 border rounded text-sm"
              disabled={isRestricted}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Bar Number</label>
            <input 
              type="text" 
              value={defaults.barNumber}
              onChange={(e) => setDefaults({...defaults, barNumber: e.target.value})}
              placeholder="BAR12345"
              className="w-full p-2 border rounded text-sm"
              disabled={isRestricted}
            />
          </div>
        </div>
        
        {/* Public Contact Row */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Public Contact Number (Coversheet)</label>
            <input 
              type="text" 
              value={defaults.publicContactNumber}
              onChange={(e) => setDefaults({...defaults, publicContactNumber: e.target.value})}
              placeholder="(555) 123-4567"
              className="w-full p-2 border rounded text-sm font-medium"
              disabled={isRestricted}
            />
            <p className="text-xs text-slate-400 mt-1">Appears on all coversheets</p>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Firm Representative Name</label>
            <input 
              type="text" 
              value={defaults.firmRepName}
              onChange={(e) => setDefaults({...defaults, firmRepName: e.target.value})}
              placeholder="John Smith, Esq."
              className="w-full p-2 border rounded text-sm"
              disabled={isRestricted}
            />
            <p className="text-xs text-slate-400 mt-1">Contact name on coversheet</p>
          </div>
        </div>
        
        {!isRestricted && (
          <button 
            onClick={() => saveCoversheetDefaults(defaults)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm hover:bg-slate-200 transition"
          >
            Save Defaults
          </button>
        )}
      </section>

      {/* Quick-Quantity Bulk Ordering */}
      <section className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Bulk Ordering
        </h2>
        
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm text-slate-600">Quick Quantity:</label>
          <select 
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 border rounded text-sm"
          >
            {[1,2,3,4,5,10,25,50].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'order' : 'orders'}</option>
            ))}
          </select>
        </div>
        
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

      {/* Document Scanning Section */}
      <section className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <div className="bg-[#002147] text-white px-6 py-3">
          <h2 className="font-semibold">Field Agent Document Center</h2>
          <p className="text-xs text-slate-300">Scan and upload documents to firm portal</p>
        </div>
        <div className="p-6">
          <DocumentScanner
            orderId="PC-9921"
            firmId="firm_pc_002"
            firmName={defaults.firmName || 'Smith & Associates'}
            agentId="agent-001"
          />
        </div>
      </section>

      {/* Order Details Table with Financial Firewall */}
      <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Order ID</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Service</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Financial</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-700">Coversheet</th>
              {!isRestricted && (
                <th className="px-6 py-4 font-semibold text-sm text-slate-700">Audit</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Sample orders showing financial firewall */}
            <tr>
              <td className="px-6 py-4 text-sm font-medium">#PC-9921</td>
              <td className="px-6 py-4 text-sm text-slate-600 font-medium">Process Service (Nationwide)</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold uppercase">Dispatched</span>
              </td>
              <td className="px-6 py-4">
                {/* Financial Firewall */}
                {!isRestricted ? (
                  <span className="text-sm text-slate-900 font-bold">$145.00</span>
                ) : (
                  <span className="text-xs text-slate-400 italic">Awaiting Audit</span>
                )}
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => {
                    setSelectedOrder({
                      id: 'PC-9921',
                      serviceType: 'Process Service',
                      recipientName: 'John Doe',
                      recipientAddress: '123 Main St',
                      recipientCity: 'Beverly Hills',
                      recipientState: 'CA',
                      recipientZip: '90210',
                      status: 'dispatched',
                      priority: 'standard',
                      finalAmount: 14500,
                      manualAuditComplete: true
                    });
                    setShowCoversheet(true);
                  }}
                  className="text-xs text-[#002147] hover:underline font-medium"
                >
                  Print Coversheet
                </button>
              </td>
              {!isRestricted && (
                <td className="px-6 py-4">
                  <button className="text-xs text-[#D4AF37] hover:underline">
                    Toggle Audit
                  </button>
                </td>
              )}
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium">#PC-9844</td>
              <td className="px-6 py-4 text-sm text-slate-600 font-medium">Skip Trace (Advanced)</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold uppercase">Verified</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs text-slate-400 italic">Locked</span>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => {
                    setSelectedOrder({
                      id: 'PC-9844',
                      serviceType: 'Skip Trace',
                      recipientName: 'Jane Smith',
                      recipientAddress: '456 Oak Ave',
                      recipientCity: 'Los Angeles',
                      recipientState: 'CA',
                      recipientZip: '90001',
                      status: 'completed',
                      priority: 'rush',
                      finalAmount: 7500,
                      manualAuditComplete: true
                    });
                    setShowCoversheet(true);
                  }}
                  className="text-xs text-[#002147] hover:underline font-medium"
                >
                  Print Coversheet
                </button>
              </td>
              {!isRestricted && (
                <td className="px-6 py-4">
                  <button className="text-xs text-[#D4AF37] hover:underline">
                    Toggle Audit
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
        
        {isRestricted && (
          <div className="bg-slate-50 p-4 border-t text-center">
            <p className="text-xs text-slate-400 italic">Financial data requires manual audit by SuperAdmin.</p>
          </div>
        )}
      </section>

      {/* Fast-Track Payment Messaging */}
      <div className="mt-8 bg-[#002147] text-white rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-[#D4AF37] text-2xl">*</div>
          <div>
            <p className="font-semibold">Trial Account: Upfront Fulfillment</p>
            <p className="text-slate-300 text-sm mt-1">
              Initial orders require upfront payment. Institutional Net-30 terms will be applied automatically upon account verification.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-slate-400 text-[10px] uppercase tracking-widest text-center">
        Powered by {BACKEND_CONFIG.fulfillment} - Integrated with {BACKEND_CONFIG.shipping.provider}
      </footer>

      {/* Coversheet Modal */}
      {showCoversheet && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-3 flex justify-between items-center">
              <h3 className="font-bold text-[#002147]">Service Coversheet - {selectedOrder.id}</h3>
              <button 
                onClick={() => setShowCoversheet(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Coversheet Content */}
            <div ref={coversheetRef} className="p-4">
              <AgentCoversheet
                firmName={defaults.firmName || 'Smith & Associates'}
                firmAddress={defaults.firmAddress || '100 Legal Plaza'}
                firmCity={defaults.firmCity || 'Los Angeles'}
                firmState={defaults.firmState || 'CA'}
                firmZip={defaults.firmZip || '90001'}
                fedExAccount={defaults.fedExAccount || '123456789'}
                barNumber={defaults.barNumber || 'BAR-2024-001'}
                publicContactNumber={defaults.publicContactNumber || '(555) 123-4567'}
                firmRepName={defaults.firmRepName || 'John Smith, Esq.'}
                orderNumber={selectedOrder.id}
                serviceType={selectedOrder.serviceType || 'Process Service'}
                priority={selectedOrder.priority || 'standard'}
                recipientName={selectedOrder.recipientName || 'N/A'}
                recipientAddress={selectedOrder.recipientAddress || 'N/A'}
                recipientCity={selectedOrder.recipientCity || 'N/A'}
                recipientState={selectedOrder.recipientState || 'N/A'}
                recipientZip={selectedOrder.recipientZip || 'N/A'}
                createdAt={new Date().toISOString()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}