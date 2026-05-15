'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  auth: boolean;
}

interface Category {
  name: string;
  description: string;
  endpoints: Endpoint[];
}

const apiDocs: Category[] = [
  {
    name: 'Portal API',
    description: 'Law firm portal operations',
    endpoints: [
      { method: 'GET', path: '/api/portal/settings', description: 'Get firm settings', auth: true },
      { method: 'PUT', path: '/api/portal/settings', description: 'Update firm settings', auth: true },
      { method: 'GET', path: '/api/portal/orders', description: 'List all orders', auth: true },
      { method: 'POST', path: '/api/portal/orders', description: 'Create new order', auth: true },
      { method: 'GET', path: '/api/portal/orders/:id', description: 'Get order details', auth: true },
      { method: 'PUT', path: '/api/portal/orders/:id', description: 'Update order', auth: true },
      { method: 'GET', path: '/api/portal/documents', description: 'List documents', auth: true },
      { method: 'POST', path: '/api/portal/documents', description: 'Upload document', auth: true },
    ],
  },
  {
    name: 'Admin API',
    description: 'Firm administration',
    endpoints: [
      { method: 'GET', path: '/api/admin/accounts', description: 'List accounts', auth: true },
      { method: 'POST', path: '/api/admin/accounts', description: 'Create account', auth: true },
      { method: 'GET', path: '/api/admin/orders', description: 'List all orders', auth: true },
      { method: 'GET', path: '/api/admin/audit', description: 'Audit log', auth: true },
    ],
  },
  {
    name: 'Protocol API',
    description: 'Service execution',
    endpoints: [
      { method: 'POST', path: '/api/protocol/service', description: 'Submit service request', auth: true },
      { method: 'GET', path: '/api/protocol/orders', description: 'List orders', auth: true },
      { method: 'GET', path: '/api/protocol/invoices', description: 'List invoices', auth: true },
      { method: 'GET', path: '/api/protocol/funnel', description: 'Lead funnel', auth: true },
      { method: 'GET', path: '/api/protocol/pricing', description: 'Pricing data', auth: false },
      { method: 'GET', path: '/api/protocol/products', description: 'Products list', auth: false },
    ],
  },
  {
    name: 'Checkout API',
    description: 'Payment processing',
    endpoints: [
      { method: 'POST', path: '/api/checkout', description: 'Create checkout session', auth: true },
    ],
  },
  {
    name: 'Webhooks',
    description: 'Event notifications',
    endpoints: [
      { method: 'POST', path: '/api/webhooks/stripe', description: 'Stripe webhooks', auth: false },
    ],
  },
  {
    name: 'Compliance API',
    description: 'Compliance endpoints',
    endpoints: [
      { method: 'GET', path: '/api/compliance/certifications', description: 'Get certifications', auth: false },
      { method: 'GET', path: '/api/compliance/audit', description: 'Compliance audit', auth: false },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-blue-100 text-blue-700',
  POST: 'bg-green-100 text-green-700',
  PUT: 'bg-yellow-100 text-yellow-700',
  DELETE: 'bg-red-100 text-red-700',
};

export default function DocsPage() {
  const [expanded, setExpanded] = useState<string>('Portal API');
  const [copied, setCopied] = useState<string | null>(null);

  const copyEndpoint = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
            PROTOCOL COUNSEL
          </Link>
          <h1 className="text-4xl font-serif font-bold mt-4">API Documentation</h1>
          <p className="text-xl text-slate-300 mt-4 max-w-2xl">
            Integrate Protocol Counsel into your existing systems. RESTful API with JSON responses.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Authentication */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Authentication</h2>
          
          <div className="space-y-4 text-slate-600">
            <p>All authenticated endpoints require an API key passed in the header:</p>
            
            <div className="bg-slate-800 text-slate-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-400"># Request</div>
              curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
              &nbsp;&nbsp;-H "Content-Type: application/json" \<br/>
              &nbsp;&nbsp;https://api.protocolcounsel.com/api/portal/orders
            </div>
            
            <p className="text-sm text-slate-500">
              Get your API key from Settings → API Keys in the portal dashboard.
            </p>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Rate Limits</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-semibold text-[#002147]">Standard</div>
              <div className="text-2xl font-bold text-[#002147] mt-2">1,000</div>
              <div className="text-sm text-slate-500">requests/hour</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-semibold text-[#002147]">Institutional</div>
              <div className="text-2xl font-bold text-[#002147] mt-2">10,000</div>
              <div className="text-sm text-slate-500">requests/hour</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-semibold text-[#002147]">Enterprise</div>
              <div className="text-2xl font-bold text-[#002147] mt-2">Unlimited</div>
              <div className="text-sm text-slate-500">custom SLAs</div>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#002147]">API Endpoints</h2>
          
          {apiDocs.map((category) => (
            <div key={category.name} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === category.name ? '' : category.name)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div>
                  <div className="font-semibold text-[#002147]">{category.name}</div>
                  <div className="text-sm text-slate-500">{category.description}</div>
                </div>
                <span className="text-slate-400">{expanded === category.name ? '−' : '+'}</span>
              </button>
              
              {expanded === category.name && (
                <div className="border-t border-slate-100">
                  {category.endpoints.map((endpoint, i) => (
                    <div key={i} className="px-6 py-4 border-b border-slate-50 last:border-0 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${methodColors[endpoint.method]}`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm text-slate-600 font-mono">{endpoint.path}</code>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-400">{endpoint.description}</span>
                        <span className={`text-xs px-2 py-1 rounded ${endpoint.auth ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                          {endpoint.auth ? 'Auth' : 'Public'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Errors */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mt-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Error Responses</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-800 text-slate-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-red-400">// 200 OK</div>
              {"{ success: true, data: {...} }"}<br/><br/>
              <div className="text-red-400">// 400 Bad Request</div>
              {"{ error: \"Invalid request\", message: \"...\" }"}<br/><br/>
              <div className="text-red-400">// 401 Unauthorized</div>
              {"{ error: \"Invalid API key\" }"}<br/><br/>
              <div className="text-red-400">// 429 Too Many Requests</div>
              {"{ error: \"Rate limit exceeded\" }"}
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="bg-[#002147] text-white rounded-xl p-8 mt-8">
          <h2 className="text-xl font-semibold">API Support</h2>
          <p className="text-slate-300 mt-2">
            Need help with integration? Our developer success team is here to assist.
          </p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link href="/demo" className="px-6 py-2 bg-[#D4AF37] text-[#002147] rounded font-semibold hover:bg-[#b8962f]">
              Contact Support
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}