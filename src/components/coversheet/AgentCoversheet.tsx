// ==========================================
// AGENT COVERSHEET COMPONENT
// Protocol Counsel - Professional Service Coversheet
// High-end, printable legal service document
// ==========================================

'use client';

import React from 'react';

interface CoversheetProps {
  // Firm Details
  firmName: string;
  firmAddress: string;
  firmCity: string;
  firmState: string;
  firmZip: string;
  fedExAccount: string;
  barNumber: string;
  
  // Contact (from settings)
  publicContactNumber: string;
  firmRepName: string;
  
  // Service Details
  orderNumber: string;
  serviceType: string;
  priority: 'standard' | 'rush' | 'expedited';
  
  // Recipient Details
  recipientName: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  
  // Timestamps
  createdAt: string;
  
  // Checkboxes (for checklists)
  onboardingVerified?: boolean;
  idVerified?: boolean;
  signaturesObtained?: boolean;
  documentsRetrieved?: boolean;
  signerCopyProvided?: boolean;
}

// Professional Disclaimer - Bold & Positioned at bottom
const SIGNER_DISCLAIMER = "NOTICE TO SIGNER: The field representative presenting these documents is authorized only to obtain signatures and retrieve documents. They are NOT a legal advisor and cannot provide legal advice or interpret the contents of these documents. Please contact the firm representative listed above with any questions.";

// Call Representative Text
const CALL_REP_TEXT = "For immediate assistance or questions regarding these documents, please contact the Firm Representative directly at:";

// Field Agent Checklist Items
const FIELD_CHECKLIST_ITEMS = [
  { key: 'idVerified', label: 'ID Verified' },
  { key: 'signaturesObtained', label: 'Signatures Obtained' },
  { key: 'documentsRetrieved', label: 'Documents Retrieved' },
  { key: 'signerCopyProvided', label: 'Signer Copy Provided' },
];

export function AgentCoversheet({
  firmName,
  firmAddress,
  firmCity,
  firmState,
  firmZip,
  fedExAccount,
  barNumber,
  publicContactNumber,
  firmRepName,
  orderNumber,
  serviceType,
  priority,
  recipientName,
  recipientAddress,
  recipientCity,
  recipientState,
  recipientZip,
  createdAt,
  onboardingVerified = false,
  idVerified = false,
  signaturesObtained = false,
  documentsRetrieved = false,
  signerCopyProvided = false,
}: CoversheetProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-0">
      {/* Main Coversheet Container */}
      <div className="border-4 border-[#002147]">
        
        {/* Header - Firm Logo & Bar Number */}
        <div className="bg-[#002147] text-white p-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-serif font-bold">{firmName}</h1>
            <p className="text-slate-300 text-sm mt-1">
              {firmAddress}<br />
              {firmCity}, {firmState} {firmZip}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#D4AF37] text-sm uppercase tracking-widest">Bar Number</p>
            <p className="text-xl font-mono">{barNumber}</p>
          </div>
        </div>

        {/* Order Info Bar */}
        <div className="bg-slate-100 p-4 flex justify-between items-center border-b border-slate-300">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Service Order</p>
            <p className="text-lg font-bold text-[#002147]">{orderNumber}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Service Type</p>
            <p className="text-lg font-medium text-[#002147]">{serviceType}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Priority</p>
            <p className={`text-lg font-medium uppercase ${
              priority === 'expedited' ? 'text-red-600' :
              priority === 'rush' ? 'text-orange-600' :
              'text-[#002147]'
            }`}>
              {priority}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Date</p>
            <p className="text-sm font-medium text-[#002147]">{formattedDate}</p>
            <p className="text-xs text-slate-500">{formattedTime}</p>
          </div>
        </div>

        {/* Service To / Deliver To Section */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* From - Firm */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">From</p>
              <div className="border-b-2 border-[#D4AF37] pb-2">
                <p className="font-semibold text-[#002147]">{firmName}</p>
                <p className="text-sm text-slate-600">{firmAddress}</p>
                <p className="text-sm text-slate-600">{firmCity}, {firmState} {firmZip}</p>
              </div>
              <p className="text-xs text-slate-400 mt-2">FedEx Account: {fedExAccount}</p>
            </div>

            {/* To - Recipient */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Deliver To</p>
              <div className="border-b-2 border-[#D4AF37] pb-2">
                <p className="font-semibold text-[#002147] text-lg">{recipientName}</p>
                <p className="text-sm text-slate-600">{recipientAddress}</p>
                <p className="text-sm text-slate-600">{recipientCity}, {recipientState} {recipientZip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information - Call Representative */}
        <div className="bg-slate-50 p-6 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-2">
            <span className="font-semibold">{CALL_REP_TEXT}</span>
          </p>
          <p className="text-xl font-bold text-[#002147]">{publicContactNumber}</p>
          <p className="text-sm text-slate-500">Contact: {firmRepName}</p>
        </div>

        {/* DUAL CHECKLIST SYSTEM */}
        <div className="border-t border-slate-300">
          
          {/* 1. Onboarding Verification (Firm Admin) */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <p className="text-xs font-bold text-[#002147] uppercase tracking-wider mb-2">
              Onboarding Verification
            </p>
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 border-2 ${onboardingVerified ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-400'}`}>
                {onboardingVerified && (
                  <svg className="w-full h-full text-[#002147]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-slate-700">
                Firm contact details verified and up-to-date
              </span>
            </div>
          </div>

          {/* 2. Field Agent Checklist (For Agent) */}
          <div className="p-4 bg-white">
            <p className="text-xs font-bold text-[#002147] uppercase tracking-wider mb-3">
              Field Agent Completion Checklist
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 border-2 ${idVerified ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-400'}`}>
                  {idVerified && (
                    <svg className="w-full h-full text-[#002147]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-700">ID Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 border-2 ${signaturesObtained ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-400'}`}>
                  {signaturesObtained && (
                    <svg className="w-full h-full text-[#002147]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-700">Signatures Obtained</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 border-2 ${documentsRetrieved ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-400'}`}>
                  {documentsRetrieved && (
                    <svg className="w-full h-full text-[#002147]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-700">Documents Retrieved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 border-2 ${signerCopyProvided ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-400'}`}>
                  {signerCopyProvided && (
                    <svg className="w-full h-full text-[#002147]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-700">Signer Copy Provided</span>
              </div>
            </div>
            
            {/* Agent Signature Line */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500">Field Representative Signature</p>
                <div className="w-48 h-8 border-b border-slate-400"></div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Date</p>
                <div className="w-24 h-8 border-b border-slate-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* REPUTATION GUARD - Bold Disclaimer at Bottom */}
        <div className="bg-[#002147] p-6 border-t-4 border-t-[#D4AF37]">
          <p className="text-sm text-white font-bold leading-relaxed">
            {SIGNER_DISCLAIMER}
          </p>
        </div>

        {/* Footer - Protocol Counsel Branding */}
        <div className="bg-slate-100 p-4 flex justify-between items-center border-t border-slate-300">
          <div className="text-xs text-slate-500">
            <p>Authorized Document Retrieval Service</p>
            <p className="mt-1">Protocol Counsel Infrastructure</p>
          </div>
          <div className="text-right">
            <p className="text-[#D4AF37] font-serif font-bold">PROTOCOL COUNSEL</p>
            <p className="text-xs text-slate-400">Legal Operations Infrastructure</p>
          </div>
        </div>
      </div>

      {/* Print Button - Screen Only */}
      <div className="mt-6 text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#002147] text-white font-semibold rounded-lg hover:bg-slate-800 transition"
        >
          Print Coversheet
        </button>
        <p className="text-xs text-slate-500 mt-2">
          Press Ctrl+P or Cmd+P to print
        </p>
      </div>
    </div>
  );
}

export default AgentCoversheet;