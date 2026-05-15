'use client';

import { useState } from 'react';
import Link from 'next/link';

type ServiceStatus = 'operational' | 'degraded' | 'partial' | 'outage';

interface Service {
  name: string;
  status: ServiceStatus;
  uptime: string;
  lastCheck: string;
}

// Mock data - replace with real API in production
const services: Service[] = [
  { name: 'API', status: 'operational', uptime: '99.99%', lastCheck: '2 min ago' },
  { name: 'Web Dashboard', status: 'operational', uptime: '99.95%', lastCheck: '2 min ago' },
  { name: 'Mobile App', status: 'operational', uptime: '99.98%', lastCheck: '2 min ago' },
  { name: 'Field Agent App', status: 'operational', uptime: '99.92%', lastCheck: '2 min ago' },
  { name: 'Document Upload', status: 'operational', uptime: '99.99%', lastCheck: '2 min ago' },
  { name: 'AI Scheduling', status: 'operational', uptime: '99.87%', lastCheck: '2 min ago' },
  { name: 'Payment Processing', status: 'operational', uptime: '99.99%', lastCheck: '2 min ago' },
  { name: 'Webhook Delivery', status: 'operational', uptime: '99.91%', lastCheck: '2 min ago' },
];

const incidents = [
  {
    id: 'INC-2024-042',
    type: 'maintenance',
    title: 'Scheduled API Maintenance',
    status: 'resolved',
    date: '2024-05-10',
    affectation: 'None - completed successfully',
  },
  {
    id: 'INC-2024-038',
    type: 'incident',
    title: 'Elevated Error Rates in AI Scheduling',
    status: 'resolved',
    date: '2024-04-22',
    affectation: '15 min - all systems restored',
  },
];

export default function StatusPage() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demo: Subscription to status updates would be saved.');
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <Link href="/" className="text-xl font-serif font-bold text-white hover:text-[#D4AF37]">
                PROTOCOL COUNSEL
              </Link>
              <h1 className="text-3xl font-serif font-bold mt-4">System Status</h1>
              <p className="text-slate-300 mt-2">Real-time system availability and incident reports</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-green-500">
              <span className="font-semibold">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Overall Uptime */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">30-Day Uptime Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500">99.97%</div>
              <div className="text-sm text-slate-500 mt-1">Overall Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002147]">12min</div>
              <div className="text-sm text-slate-500 mt-1">Total Downtime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002147]">0</div>
              <div className="text-sm text-slate-500 mt-1">Security Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002147]">2</div>
              <div className="text-sm text-slate-500 mt-1">Planned Maintenance</div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">System Components</h2>
          <div className="space-y-4">
            {services.map((service, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <div className="font-medium text-[#002147]">{service.name}</div>
                  <div className="text-sm text-slate-500">Last check: {service.lastCheck}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{service.uptime} uptime</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-6">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-slate-200 rounded text-slate-600">{incident.id}</span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                        {incident.type === 'maintenance' ? 'Scheduled Maintenance' : 'Incident'}
                      </span>
                    </div>
                    <div className="font-medium text-[#002147] mt-2">{incident.title}</div>
                    <div className="text-sm text-slate-500 mt-1">{incident.date}</div>
                  </div>
                  <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">Resolved</span>
                </div>
                <div className="text-sm text-slate-600 mt-2">
                  <span className="font-medium">Impact:</span> {incident.affectation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subscribe */}
        <section className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-xl font-semibold text-[#002147] mb-4">Subscribe to Updates</h2>
          <p className="text-slate-600 mb-4">Get notified about incidents and maintenance windows.</p>
          <form onSubmit={handleSubscribe} className="flex gap-4 flex-wrap">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 min-w-[200px] px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#D4AF37]"
            />
            <button className="px-6 py-2 bg-[#002147] text-white rounded-md hover:bg-slate-700">
              Subscribe
            </button>
          </form>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Protocol Counsel. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="underline">Privacy</Link> · 
            <Link href="/terms" className="underline ml-2">Terms</Link> · 
            <Link href="/security" className="underline ml-2">Security</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}