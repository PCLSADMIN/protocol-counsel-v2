// Proof of Service Affidavit Generator
// Auto-generated when Field Agent uploads GPS proof

export interface AffidavitData {
  orderId: string;
  orderNumber: string;
  caseId: string;
  firmName: string;
  
  // Agent info
  agentId: string;
  agentName: string;
  agentLicense?: string;
  
  // Visit details
  visitDate: Date;
  arrivalTime: Date;
  departureTime?: Date;
  
  // Location
  propertyAddress: string;
  gpsLatitude: number;
  gpsLongitude: number;
  
  // Service result
  clientPresent: boolean;
  documentsDelivered: number;
  signatureObtained: boolean;
  
  // Photo proof
  photoUrl: string;
  photoTimestamp: Date;
}

export interface GeneratedAffidavit extends AffidavitData {
  affidavitId: string;
  generatedAt: Date;
  documentUrl: string;
}

// Generate unique affidavit ID
function generateAffidavitId(): string {
  return `AFF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate affidavit text
export function generateAffidavitText(data: AffidavitData): string {
  const affidavitId = "affidavitId" in data ? data.affidavitId : "GENERATING...";
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formatTime = (d: Date) => d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  
  return `
══════════════════════════════════════════════════════════════════
                    PROOF OF SERVICE AFFIDAVIT
══════════════════════════════════════════════════════════════════════════

AFFIDAVIT ID: ${affidavitId}
ORDER #: ${data.orderNumber}
CASE ID: ${data.caseId}

──────────────────────────────────────────────────────────────
SERVICE DETAILS
──────────────────────────────────────────────────────────────
Date of Service: ${formatDate(data.visitDate)}
Arrival Time: ${formatTime(data.arrivalTime)}
Departure Time: ${data.departureTime ? formatTime(data.departureTime) : "N/A"}

──────────────────────────────────────────────────────────────
FIELD AGENT
──────────────────────────────────────────────────────────────
Agent ID: ${data.agentId}
Agent Name: ${data.agentName}
${data.agentLicense ? `License: ${data.agentLicense}` : ""}

──────────────────────────────────────────────────────────────
SERVICE LOCATION
──────────────────────────────────────────────────────────────
Address: ${data.propertyAddress}
GPS Coordinates: ${data.gpsLatitude}, ${data.gpsLongitude}
Photo Timestamp: ${formatTime(data.photoTimestamp)}

──────────────────────────────────────────────────────────────
SERVICE RESULT
──────────────────────────────────────────────────────────────
Client Present: ${data.clientPresent ? "YES" : "NO"}
Documents Delivered: ${data.documentsDelivered}
Signature Obtained: ${data.signatureObtained ? "YES" : "NO"}

──────────────────────────────────────────────────────────────
LEGAL STATEMENT
──────────────────────────────────────────────────────────────
I, ${data.agentName}, being duly sworn, declare that the above 
information is true and correct to the best of my knowledge. 
I personally served the documents at the address listed above 
on the date and time specified.

Agent Signature: ___________________________
Date: ${formatDate(new Date())}

──────────────────────────────────────────────────────────────
FIRM ACKNOWLEDGMENT
──────────────────────────────────────────────────────────────
Firm: ${data.firmName}
This service was completed under the Protocol Counsel seal.
All chain of custody protocols were followed.

══════════════════════════════════════════════════════════════════
Generated: ${new Date().toLocaleString()}
ProtocolCounsel | Legal Operations Orchestration Platform
══════════════════════════════════════════════════════════════════
`.trim();
}

// Generate full affidavit
export function generateAffidavit(data: AffidavitData): GeneratedAffidavit {
  const affidavitId = generateAffidavitId();
  
  return {
    ...data,
    affidavitId,
    generatedAt: new Date(),
    documentUrl: `https://protocolcounsel.com/affidavit/${affidavitId}.pdf`,
  };
}

// Validate GPS for affidavit
export function isValidGPSForAffidavit(
  latitude: number,
  longitude: number
): boolean {
  return (
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180 &&
    latitude !== 0 && longitude !== 0
  );
}

// Get service result summary
export function getServiceResultSummary(data: AffidavitData): string {
  if (data.clientPresent && data.signatureObtained) {
    return "Full service completed. Documents delivered and signed.";
  }
  if (data.clientPresent) {
    return "Client present. Documents delivered. Awaiting signature.";
  }
  return "No-show. Door hanger left per protocol.";
}