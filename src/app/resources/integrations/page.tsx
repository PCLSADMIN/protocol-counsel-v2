'use client';

import Link from 'next/link';

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Zapier',
      category: 'Automation',
      description: 'Connect to 5,000+ apps. Automate workflows with triggers and actions.',
      status: 'Live',
      logo: '⚡',
    },
    {
      name: 'Clio',
      category: 'Practice Management',
      description: 'Sync orders, clients, and matters. Bi-directional data flow.',
      status: 'Live',
      logo: '⚖️',
    },
    {
      name: 'MyCase',
      category: 'Practice Management',
      description: 'Case management integration with document scheduling.',
      status: 'Coming Soon',
      logo: '📁',
    },
    {
      name: 'QuickBooks',
      category: 'Accounting',
      description: 'Invoice sync and payment reconciliation.',
      status: 'Coming Soon',
      logo: '💰',
    },
    {
      name: 'Stripe',
      category: 'Payments',
      description: 'Payment processing and subscription management.',
      status: 'Live',
      logo: '💳',
    },
    {
      name: 'FedEx',
      category: 'Shipping',
      description: 'Document shipping and tracking for legal deliverables.',
      status: 'Beta',
      logo: '📦',
    },
  ];

  const hooks = [
    { event: 'order.created', description: 'Triggered when a new order is submitted' },
    { event: 'order.completed', description: 'Triggered when service is completed' },
    { event: 'order.failed', description: 'Triggered when service attempt fails' },
    { event: 'document.uploaded', description: 'Triggered when document is uploaded' },
    { event: 'invoice.paid', description: 'Triggered when invoice is paid' },
  ];

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
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Integrations</h1>
          <p className="text-slate-300 text-lg">
            Connect Protocol Counsel to your existing tools. Zapier, practice management, accounting, and more.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Integrations Grid */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Available Integrations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {integrations.map((int, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{int.logo}</span>
                  <span className={`text-xs px-2 py-1 rounded ${int.status === 'Live' ? 'bg-green-100 text-green-700' : int.status === 'Beta' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                    {int.status}
                  </span>
                </div>
                <h3 className="font-semibold text-[#002147]">{int.name}</h3>
                <div className="text-xs text-slate-500 mb-2">{int.category}</div>
                <p className="text-sm text-slate-600">{int.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Webhooks */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Webhooks</h2>
          <p className="text-slate-600 mb-4">Available webhook events:</p>
          <div className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
            <div className="min-w-[500px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="text-left p-2">Event</th>
                    <th className="text-left p-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {hooks.map((h, i) => (
                    <tr key={i} className="border-b border-slate-700 last:border-0">
                      <td className="p-2 text-[#D4AF37] font-mono">{h.event}</td>
                      <td className="p-2 text-slate-300">{h.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* API Access */}
        <section className="bg-oxford text-white rounded-xl p-8">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Need a Custom Integration?</h2>
          <p className="text-slate-300 mb-4">
            Enterprise clients can request custom integrations. Contact your account manager or use our API.
          </p>
          <Link href="/docs" className="inline-block px-6 py-2 bg-[#D4AF37] text-oxford rounded font-semibold hover:bg-[#b8962f]">
            View API Docs
          </Link>
        </section>

        {/* Infrastructure Notice */}
        <div className="mt-8 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p className="text-xs text-slate-500">
            ⚠️ <strong>Managed by Streamline Industries Management.</strong> Protocol Counsel provides technology infrastructure.
            See our <Link href="/terms" className="underline">Terms</Link> and <Link href="/legal/dpa" className="underline">DPA</Link>.
          </p>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm pb-8">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}