// ==========================================
// PROTOCOL COUNSEL REPORT WRAPPER
// Professional Report Packaging
// All reports are branded and presented by Protocol Counsel
// ==========================================

'use client';

import React from 'react';

interface ReportProps {
  // Report Type
  reportType: 'skip_trace' | 'property' | 'asset' | 'credit';
  reportTitle: string;
  
  // Firm Information (from settings)
  firmName: string;
  firmBarNumber: string;
  
  // Subject Information
  subjectName: string;
  subjectAddress?: string;
  subjectDob?: string;
  subjectSsn?: string; // Last 4 only
  
  // Report Data
  data: {
    currentAddress?: string;
    previousAddresses?: Array<{ address: string; date: string }>;
    employers?: Array<{ name: string; position: string; address: string }>;
    relatives?: Array<{ name: string; relationship: string }>;
    assets?: Array<{ type: string; description: string; value?: string }>;
    bankruptcy?: Array<{ date: string; court: string; caseNumber: string }>;
    liens?: Array<{ creditor: string; amount: string; date: string }>;
    judgments?: Array<{ court: string; amount: string; date: string }>;
  };
  
  // Report Metadata
  reportId: string;
  preparedAt: string;
  expiresAt: string;
}

// Professional Disclaimer for Reports
const REPORT_DISCLAIMER = `This report is provided by Protocol Counsel Legal Infrastructure for informational purposes only. 
Protocol Counsel does not provide legal advice, legal services, or attorney representation. 
Information contained herein is obtained from public records and third-party sources. 
Users are responsible for verifying all information and consulting qualified legal counsel before taking legal action. 
This report is not a substitute for professional legal advice.`;

// Report Header Component
function ReportHeader({ firmName, firmBarNumber, reportType, reportTitle }: { 
  firmName: string; 
  firmBarNumber: string; 
  reportType: string;
  reportTitle: string;
}) {
  const reportTypeLabels: Record<string, string> = {
    skip_trace: 'PERSON LOCATOR REPORT',
    property: 'PROPERTY STATUS REPORT',
    asset: 'ASSET INVESTIGATION REPORT',
    credit: 'CREDIT ANALYSIS REPORT',
  };

  return (
    <div className="bg-[#002147] text-white p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-serif font-bold">PROTOCOL COUNSEL</h1>
          <p className="text-[#D4AF37] text-sm mt-1">Legal Operations Infrastructure</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Prepared For</p>
          <p className="font-medium">{firmName}</p>
          <p className="text-xs text-slate-400 mt-1">Bar: {firmBarNumber}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-600">
        <p className="text-lg font-serif font-bold">{reportTypeLabels[reportType] || reportTitle}</p>
        <p className="text-xs text-slate-400 mt-1">Report ID: {reportType.toUpperCase()}-{Date.now().toString(36).toUpperCase()}</p>
      </div>
    </div>
  );
}

// Subject Information Section
function SubjectInfo({ subjectName, subjectAddress, subjectDob }: {
  subjectName: string;
  subjectAddress?: string;
  subjectDob?: string;
}) {
  return (
    <div className="p-6 border-b border-slate-200">
      <p className="text-xs font-bold text-[#002147] uppercase tracking-wider mb-3">Subject Information</p>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-slate-500">Subject Name</p>
          <p className="font-semibold text-[#002147]">{subjectName}</p>
        </div>
        {subjectAddress && (
          <div>
            <p className="text-xs text-slate-500">Subject Address</p>
            <p className="text-sm text-slate-700">{subjectAddress}</p>
          </div>
        )}
        {subjectDob && (
          <div>
            <p className="text-xs text-slate-500">Date of Birth</p>
            <p className="text-sm text-slate-700">{subjectDob}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Report Data Section
function ReportData({ data }: { data: ReportProps['data'] }) {
  return (
    <div className="p-6">
      <p className="text-xs font-bold text-[#002147] uppercase tracking-wider mb-4">Report Details</p>
      
      {/* Current Address */}
      {data.currentAddress && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-1">Current Address</p>
          <p className="text-sm font-medium text-[#002147]">{data.currentAddress}</p>
        </div>
      )}
      
      {/* Previous Addresses */}
      {data.previousAddresses && data.previousAddresses.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Previous Addresses</p>
          {data.previousAddresses.map((addr, i) => (
            <div key={i} className="text-sm text-slate-700 py-1">
              {addr.address} <span className="text-slate-400">({addr.date})</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Employers */}
      {data.employers && data.employers.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Known Employers</p>
          {data.employers.map((emp, i) => (
            <div key={i} className="text-sm py-1">
              <span className="font-medium text-[#002147]">{emp.name}</span>
              <span className="text-slate-500"> - {emp.position}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Assets */}
      {data.assets && data.assets.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Located Assets</p>
          {data.assets.map((asset, i) => (
            <div key={i} className="flex justify-between text-sm py-1 border-b border-slate-100">
              <span className="text-slate-700">{asset.description}</span>
              <span className="font-medium text-[#002147]">{asset.type}</span>
              {asset.value && <span className="text-slate-500">{asset.value}</span>}
            </div>
          ))}
        </div>
      )}
      
      {/* Bankruptcy */}
      {data.bankruptcy && data.bankruptcy.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">Bankruptcy Records</p>
          {data.bankruptcy.map((bk, i) => (
            <div key={i} className="text-sm py-1">
              <span className="text-red-600 font-medium">Bankruptcy Filed: {bk.date}</span>
              <span className="text-slate-500"> - {bk.court}, Case #{bk.caseNumber}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Report Footer with Disclaimer
function ReportFooter({ reportId, preparedAt, expiresAt }: {
  reportId: string;
  preparedAt: string;
  expiresAt: string;
}) {
  return (
    <div className="mt-auto">
      {/* Disclaimer */}
      <div className="bg-slate-100 p-4 border-l-4 border-l-[#D4AF37]">
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold">DISCLAIMER: </span>
          {REPORT_DISCLAIMER}
        </p>
      </div>
      
      {/* Footer Info */}
      <div className="bg-[#002147] text-white p-4 flex justify-between items-center text-xs">
        <div>
          <p>Report ID: {reportId}</p>
          <p className="text-slate-400">Prepared: {preparedAt}</p>
          <p className="text-slate-400">Expires: {expiresAt}</p>
        </div>
        <div className="text-right">
          <p className="text-[#D4AF37] font-serif font-bold">PROTOCOL COUNSEL</p>
          <p className="text-slate-400">Legal Operations Infrastructure</p>
        </div>
      </div>
    </div>
  );
}

// Main Report Component
export function ProtocolReport({
  reportType,
  reportTitle,
  firmName,
  firmBarNumber,
  subjectName,
  subjectAddress,
  subjectDob,
  data,
  reportId,
  preparedAt,
  expiresAt,
}: ReportProps) {
  // Format dates
  const prepDate = new Date(preparedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const expDate = new Date(expiresAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto bg-white border-2 border-slate-200 flex flex-col min-h-[800px]">
      <ReportHeader 
        firmName={firmName} 
        firmBarNumber={firmBarNumber} 
        reportType={reportType}
        reportTitle={reportTitle}
      />
      
      <SubjectInfo 
        subjectName={subjectName}
        subjectAddress={subjectAddress}
        subjectDob={subjectDob}
      />
      
      <ReportData data={data} />
      
      <ReportFooter 
        reportId={reportId}
        preparedAt={prepDate}
        expiresAt={expDate}
      />
      
      {/* Print Button */}
      <div className="p-4 text-center border-t border-slate-200 print:hidden">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#002147] text-white font-semibold rounded-lg hover:bg-slate-800 transition"
        >
          Print Report
        </button>
      </div>
    </div>
  );
}

export default ProtocolReport;