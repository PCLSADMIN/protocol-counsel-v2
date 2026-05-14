// AI Scheduler - Automated outreach for field visit scheduling
// Voice + SMS with retry logic and portal notes

export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY_MINUTES = 5;

export type SchedulingStatus =
  | "PENDING_OUTREACH"
  | "CALLING_CLIENT"
  | "SMS_SENT"
  | "SCHEDULED"
  | "NO_ANSWER"
  | "INVALID_NUMBER"
  | "FAILED";

export interface SchedulingAttempt {
  attemptNumber: number;
  timestamp: Date;
  method: "VOICE" | "SMS";
  outcome: "SUCCESS" | "NO_ANSWER" | "INVALID" | "VOICEMAIL" | "SMS_SENT";
  notes?: string;
}

export interface SchedulingResult {
  status: SchedulingStatus;
  scheduledTime?: Date;
  attempts: SchedulingAttempt[];
  portalNote?: string;
}

export function getOrderReceivedNote(): string {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${time}: Order received. Processing and scheduling will begin shortly.`;
}

export function getAttemptNote(attempt: SchedulingAttempt): string {
  const time = attempt.timestamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (attempt.outcome === "NO_ANSWER") {
    return `Called client at ${time} - No answer`;
  }
  if (attempt.outcome === "VOICEMAIL") {
    return `Left voicemail at ${time}`;
  }
  if (attempt.outcome === "INVALID") {
    return `Invalid contact information detected. Awaiting firm update.`;
  }
  return `Attempt at ${time}`;
}

export function isRetriesExhausted(attempts: SchedulingAttempt[]): boolean {
  return attempts.filter(a => a.method === "VOICE").length >= MAX_RETRY_ATTEMPTS;
}

export function getFailureNote(): string {
  return `Scheduling failed after ${MAX_RETRY_ATTEMPTS} attempts. Manual contact required.`;
}

export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

// Mock outreach - real impl would call voice/SMS API
export async function initiateOutreach(
  clientPhone: string,
  clientName: string,
  orderId: string
): Promise<SchedulingResult> {
  const attempts: SchedulingAttempt[] = [];
  const initialNote = getOrderReceivedNote();

  // Try voice call first
  attempts.push({
    attemptNumber: 1,
    timestamp: new Date(),
    method: "VOICE",
    outcome: "NO_ANSWER",
  });

  // Send SMS if no answer
  attempts.push({
    attemptNumber: 2,
    timestamp: new Date(),
    method: "SMS",
    outcome: "SMS_SENT",
  });

  return {
    status: "NO_ANSWER",
    attempts,
    portalNote: initialNote,
  };
}