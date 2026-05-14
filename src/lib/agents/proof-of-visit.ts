// Field Agent Proof of Visit Workflow
// GPS photo upload triggers visit fee

export const FULL_VISIT_FEE_MULTIPLIER = 1.0;
export const REDUCED_VISIT_FEE_MULTIPLIER = 0.5;

export type VisitStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "PROOF_UPLOADED"
  | "NO_SHOW_DOOR_HANGER"
  | "COMPLETED";

export interface ProofOfVisit {
  orderId: string;
  agentId: string;
  orderValue?: number; // Base fee for payout calculation
  status: VisitStatus;
  photoUrl?: string;
  gpsCoordinates?: { latitude: number; longitude: number };
  photoTimestamp: Date;
  clientPresent: boolean;
  doorHangerGenerated?: boolean;
  doorHangerUrl?: string;
  visitFeeAmount?: number;
  payoutTriggered?: boolean;
}

export function generateDoorHanger(orderId: string): string {
  return `https://protocolcounsel.com/doorhanger/${orderId}.pdf`;
}

export function calculateVisitFee(baseAmount: number, status: VisitStatus): number {
  if (status === "NO_SHOW_DOOR_HANGER") {
    return Math.round(baseAmount * REDUCED_VISIT_FEE_MULTIPLIER);
  }
  return Math.round(baseAmount * FULL_VISIT_FEE_MULTIPLIER);
}

export function isValidGPS(latitude: number, longitude: number): boolean {
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

export function getVisitNotification(proof: ProofOfVisit): string {
  if (proof.clientPresent) {
    return `Visit completed: Client present. Photo uploaded.`;
  }
  return `Attempt made: Door hanger left. Photo uploaded.`;
}

export function getDoorHangerNote(): string {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${time}: Client not home. Door hanger generated and left.`;
}

export function getCompletedNote(): string {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${time}: Visit completed. Documents handed off securely.`;
}

export async function processProofOfVisit(
  input: Omit<ProofOfVisit, "status" | "visitFeeAmount" | "payoutTriggered">
): Promise<ProofOfVisit> {
  const { clientPresent, photoUrl } = input;
  const status: VisitStatus = clientPresent ? "PROOF_UPLOADED" : "NO_SHOW_DOOR_HANGER";
  const visitFeeAmount = calculateVisitFee(input.orderValue ?? 10000, status);
  const doorHangerUrl = !clientPresent ? generateDoorHanger(input.orderId) : undefined;

  return {
    ...input,
    status,
    clientPresent,
    photoUrl,
    visitFeeAmount,
    doorHangerUrl,
    payoutTriggered: true,
  };
}