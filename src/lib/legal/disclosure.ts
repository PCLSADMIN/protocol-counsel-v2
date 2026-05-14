// Strict Neutrality Disclosure - Legal liability shield
// Platform is Orchestration Layer, NOT original record custodian

export const PLATFORM_DISCLAIMERS = {
  PLATFORM_IDENTITY: "ProtocolCounsel is a technology orchestration platform, not a record custodian or data provider.",
  
  DATA_SOURCE: "All data is sourced directly from white-label API partners and their underlying legal service providers. We do not originate, verify, or guarantee the accuracy of underlying records.",
  
  PROCESS_INTEGRITY: "We guarantee the integrity of the request/response workflow - that your request was transmitted, tracked, and fulfilled according to partner SLA. We do not guarantee data accuracy, completeness, or timeliness.",
  
  LIABILITY_SHIFT: "By using this platform, you acknowledge that disputes regarding data accuracy must be directed to the white-label API partner or their data source, not to ProtocolCounsel.",
  
  NO_WARRANTIES: "This service is provided 'as is' without warranties of any kind. Use at your own risk.",
} as const;

export function getOnboardingDisclosure(): string {
  return `PROTOCOLCOUNSEL DISCLOSURE NOTICE

${PLATFORM_DISCLAIMERS.PLATFORM_IDENTITY}

DATA SOURCES
${PLATFORM_DISCLAIMERS.DATA_SOURCE}

PROCESS INTEGRITY
${PLATFORM_DISCLAIMERS.PROCESS_INTEGRITY}

LIABILITY
${PLATFORM_DISCLAIMERS.LIABILITY_SHIFT}

NO WARRANTIES
${PLATFORM_DISCLAIMERS.NO_WARRANTIES}

By proceeding, you acknowledge this disclosure and agree to the Terms of Service.`.trim();
}

export function getAcknowledgmentText(): string {
  return `I acknowledge that ProtocolCounsel is an orchestration platform and NOT the original custodian of any records. I understand that data disputes must be handled with the white-label API partner, not ProtocolCounsel. I accept the Terms of Service and this disclosure.`;
}

export const REQUIRED_ACKNOWLEDGMENTS = [
  "platform_identity",
  "data_sources", 
  "process_integrity",
  "liability_shift",
  "no_warranties",
] as const;

export type AcknowledgmentType = typeof REQUIRED_ACKNOWLEDGMENTS[number];

export function validateAcknowledgments(
  received: Record<AcknowledgmentType, boolean>
): { valid: boolean; missing: AcknowledgmentType[] } {
  const missing = REQUIRED_ACKNOWLEDGMENTS.filter(ack => !received[ack]);
  return { valid: missing.length === 0, missing };
}