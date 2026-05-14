// Business Associate Agreement (BAA) Click-Wrap
// HIPAA compliance hard-coded into Medical Records transactions

export const BAA_REQUIRED_SERVICES = [
  "medical_records",
  "medical_retrieval", 
  "health_records",
  "hipaa_data",
];

export type BAAType = " Standard BAA" | "Limited BAA";

export interface BAAContent {
  type: BAAType;
  effectiveDate: Date;
  expiresAt: Date;
  obligations: string[];
  permittedUse: string;
  restrictions: string[];
}

// BAA Agreement Text
export function getBAAAgreement(): string {
  return `
BUSINESS ASSOCIATE AGREEMENT

This Business Associate Agreement ("BAA") is entered into between 
the Covered Entity (Law Firm) and ProtocolCounsel ("Business Associate").

1. DEFINITIONS
"Protected Health Information" (PHI) includes any individually 
identifiable health information transmitted or maintained by the 
Business Associate in any form.

2. OBLIGATIONS OF BUSINESS ASSOCIATE
- Safeguard PHI as required by HIPAA Security Rule
- Report any breach within 72 hours
- Not disclose PHI without authorization
- Ensure agent compliance with BAA terms
- Return or destroy PHI upon termination

3. PERMITTED USE
PHI may only be used for the specific legal service requested 
by the Covered Entity.

4. RESTRICTIONS
- No secondary use of PHI
- No disclosure to third parties without consent
- No re-identification of de-identified data
- Agents must sign BAA as sub-contractors

5. TERM
This BAA is effective upon acceptance and remains in effect 
for the duration of the service relationship.

By proceeding, you acknowledge you are a Covered Entity subject 
to HIPAA regulations and agree to these terms.
`.trim();
}

// Check if service requires BAA
export function requiresBAA(serviceType: string): boolean {
  return BAA_REQUIRED_SERVICES.includes(serviceType.toLowerCase());
}

// Get BAA acknowledgment checkbox text
export function getBAAAcknowledgmentText(): string {
  return `I acknowledge that I am a Covered Entity under HIPAA and agree to the Business Associate Agreement. I understand that Protected Health Information will be safeguardeaccording to HIPAA Security Rule requirements.`;
}

// Validate BAA acceptance
export interface BAAAcceptance {
  acknowledged: boolean;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export function validateBAAAcceptance(
  acceptance: BAAAcceptance
): { valid: boolean; error?: string } {
  if (!acceptance.acknowledged) {
    return {
      valid: false,
      error: "BAA acknowledgment required for Medical Records orders",
    };
  }
  
  // Check if acceptance is recent (within 24 hours)
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  if (acceptance.timestamp < dayAgo) {
    return {
      valid: false,
      error: "BAA acceptance expired. Please re-accept.",
    };
  }
  
  return { valid: true };
}