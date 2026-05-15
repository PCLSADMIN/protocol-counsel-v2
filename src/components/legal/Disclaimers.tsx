// ==========================================
// LEGAL DISCLAIMERS
// Protocol Counsel - Important legal notices
// ==========================================

/**
 * DISCLAIMER: Protocol Counsel is infrastructure only
 * We do NOT provide legal advice
 */
export const INFRASTRUCTURE_DISCLAIMER = "PROTOCOL COUNSEL is a legal operations infrastructure platform. We provide technology, automation, and orchestration services for legal professionals. We do not provide legal advice, and no information on this platform should be construed as legal advice.";

/**
 * Get disclaimer for footer
 */
export function FooterDisclaimer() {
  return (
    <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200">
      <p className="mb-2">
        <strong className="text-slate-600">Infrastructure Notice:</strong> Protocol Counsel provides legal operations infrastructure only. 
        We do not provide legal advice, legal services, or attorney representation. All services are administrative and technological in nature.
      </p>
      <p className="text-slate-400">
        {new Date().getFullYear()} Protocol Counsel. All rights reserved. Authorized access only.
      </p>
    </div>
  );
}

/**
 * Get disclaimer banner for portals
 */
export function PortalDisclaimer() {
  return (
    <div className="bg-[#002147]/5 border border-[#002147]/10 px-4 py-2 text-xs text-slate-600 mb-4">
      <strong>Infrastructure Notice:</strong> This system provides legal operations infrastructure only. 
      All users are licensed legal professionals or their authorized representatives. No legal advice is provided through this platform.
    </div>
  );
}

/**
 * Get login page disclaimer
 */
export function LoginDisclaimer() {
  return (
    <div className="mt-4 text-xs text-slate-500 text-center">
      <p className="mb-1">
        <strong>Authorized Access Only</strong>
      </p>
      <p>
        This portal provides legal operations infrastructure. Use of this system constitutes agreement to our Terms of Service.
        No legal advice is provided through this platform.
      </p>
    </div>
  );
}

/**
 * Compliance badge
 */
export function ComplianceBadge() {
  return (
    <div className="flex items-center gap-4 text-xs text-slate-400">
      <span>SOC 2 Type II</span>
      <span>HIPAA Compliant</span>
      <span>ISO 27001</span>
      <span>No Legal Advice</span>
    </div>
  );
}

/**
 * Privacy notice
 */
export const PRIVACY_NOTICE = `Privacy Notice: This system collects only operational data necessary for service delivery. 
We do not share, sell, or disclose client data to third parties except as required for service fulfillment. 
All data is encrypted and stored in compliance with SOC 2 Type II, HIPAA, and GDPR requirements.`;

/**
 * Terms acceptance notice
 */
export const TERMS_NOTICE = `By accessing this system, you acknowledge that:
1. You are a licensed legal professional or authorized representative
2. You agree to our Terms of Service and Acceptable Use Policy
3. This platform provides infrastructure only - no legal advice
4. All activity is logged for security and compliance purposes`;