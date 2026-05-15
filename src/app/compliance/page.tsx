'use client';

import Link from 'next/link';

export default function CompliancePage() {
  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 - Security, Availability, and Confidentiality',
      status: 'Compliant',
      lastAudit: 'January 15, 2024',
    },
    {
      name: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act - Privacy and Security',
      status: 'Compliant',
      lastAudit: 'February 1, 2024',
    },
    {
      name: 'ISO 27001',
      description: 'Information Security Management System Certification',
      status: 'Compliant',
      lastAudit: 'March 1, 2024',
    },
    {
      name: 'GDPR',
      description: 'General Data Protection Regulation - EU Privacy Compliance',
      status: 'Compliant',
      lastAudit: 'January 20, 2024',
    },
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      status: 'Compliant',
      lastAudit: 'February 15, 2024',
    },
    {
      name: 'CA SB 53',
      description: 'California Senate Bill 53 - Legal Service Process Requirements',
      status: 'Compliant',
      lastAudit: 'March 10, 2024',
    },
    {
      name: 'CO AI Act',
      description: 'Colorado Artificial Intelligence Act - AI Transparency Requirements',
      status: 'Under Review',
      lastAudit: 'April 1, 2024',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#002147] text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-serif font-bold mb-2">Compliance Center</h1>
          <p className="text-slate-300">Regulatory compliance and certifications</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <p className="text-3xl font-bold text-[#002147]">7</p>
            <p className="text-sm text-slate-500">Standards Tracked</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <p className="text-3xl font-bold text-green-600">6</p>
            <p className="text-sm text-slate-500">Compliant</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <p className="text-3xl font-bold text-yellow-600">1</p>
            <p className="text-sm text-slate-500">Under Review</p>
          </div>
        </div>

        {/* Certifications List */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-[#002147] text-white px-6 py-4">
            <h2 className="font-semibold">Compliance Standards</h2>
          </div>
          
          <div className="divide-y">
            {certifications.map((cert, index) => (
              <div key={index} className="px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-[#002147]">{cert.name}</h3>
                  <p className="text-sm text-slate-500">{cert.description}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'Compliant' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {cert.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Audit: {cert.lastAudit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Note */}
        <div className="mt-8 bg-slate-100 rounded-xl p-6">
          <h3 className="font-semibold text-[#002147] mb-2">Compliance Commitment</h3>
          <p className="text-slate-600 text-sm">
            Protocol Counsel is committed to maintaining the highest standards of regulatory compliance. 
            All certifications are regularly audited and updated. For compliance-related inquiries, 
            contact our compliance team at <span className="text-[#002147] font-medium">compliance@protocolcounsel.com</span>
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-[#002147] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}