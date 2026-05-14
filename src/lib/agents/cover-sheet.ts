// On-Site Documentation - Professional Cover Sheet Generator
// Clear communication during physical hand-off

export interface CoverSheetData {
  orderId: string;
  orderNumber: string;
  firmName: string;
  supportPhone: string;
  firmPhone?: string;
  serviceType: string;
  clientName: string;
}

export interface CoverSheet extends CoverSheetData {
  generatedAt: Date;
  documentUrl: string;
}

// Order Context Header
export function getOrderContext(data: CoverSheetData): string {
  return `These documents are from ${data.firmName} regarding Order #${data.orderNumber}.`;
}

// The "Silent Agent" Disclaimer
export function getSilentAgentDisclaimer(data: CoverSheetData): string {
  const supportLine = data.firmPhone 
    ? `Call ${data.firmPhone} or ` 
    : "";
  return `The delivery agent is a third-party courier/notary and does not have details regarding the contents of this order. They cannot provide legal advice. For all questions, call ${supportLine}${data.supportPhone}.`;
}

// Full cover sheet text
export function getCoverSheetText(data: CoverSheetData): string {
  return `
══════════════════════════════════════════════════════════
                    COVER SHEET
══════════════════════════════════════════════════════════

ORDER: ${data.orderNumber}
SERVICE: ${data.serviceType}
CLIENT: ${data.clientName}

──────────────────────────────────────────────────────
${getOrderContext(data)}

──────────────────────────────────────────────────────
${getSilentAgentDisclaimer(data)}

──────────────────────────────────────────────────────
Generated: ${new Date().toLocaleString()}
══════════════════════════════════════════════════════════
`.trim();
}

// Client signature line
export function getSignatureLine(): string {
  return `
──────────────────────────────────────────────────────
CLIENT SIGNATURE: ___________________________
DATE: ____________________________
──────────────────────────────────────────────────────
`;
}

// Generate cover sheet
export function generateCoverSheet(data: CoverSheetData): CoverSheet {
  return {
    ...data,
    generatedAt: new Date(),
    documentUrl: `https://protocolcounsel.com/coversheet/${data.orderId}.pdf`,
  };
}

// Agent interaction check
export function getAgentConfirmationNote(): string {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${time}: Cover sheet provided. Client confirmed receipt before signing.`;
}