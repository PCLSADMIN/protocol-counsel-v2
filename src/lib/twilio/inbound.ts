// Inbound Event Listener - Twilio Webhooks for two-way communication

export type InboundEventType = "SMS_REPLY" | "CALLBACK" | "VOICEMAIL";

export interface ParsedAppointment {
  orderId: string;
  suggestedTime: Date;
  confirmed: boolean;
  rawInput: string;
}

const CONFIRM_KEYWORDS = ["yes", "confirm", "ok", "sure", "3pm", "4pm", "5pm", "10am", "11am"];
const DENY_KEYWORDS = ["no", "cancel", "not", "can't", "won't"];

export function detectSentiment(message: string): "POSITIVE" | "NEGATIVE" | "NEUTRAL" {
  const lower = message.toLowerCase();
  if (CONFIRM_KEYWORDS.some(k => lower.includes(k))) return "POSITIVE";
  if (DENY_KEYWORDS.some(k => lower.includes(k))) return "NEGATIVE";
  return "NEUTRAL";
}

// Simple time parser - extracts time from SMS
export function parseAppointmentTime(body: string): { time: Date; orderId?: string } | null {
  const lower = body.toLowerCase();
  const now = new Date();
  
  // Check for times like "4pm", "10am", "3:30pm"
  const timeMatch = body.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  if (timeMatch) {
    const hour = parseInt(timeMatch[1], 10);
    const minute = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    const isPM = lower.includes("pm");
    
    const time = new Date(now);
    time.setHours(isPM && hour < 12 ? hour + 12 : hour, minute, 0, 0);
    
    if (time < now) time.setDate(time.getDate() + 1);
    return { time };
  }
  
  return null;
}

export async function processInboundSMS(from: string, body: string): Promise<ParsedAppointment | null> {
  const parsed = parseAppointmentTime(body);
  if (!parsed) return null;
  
  return {
    orderId: "UNKNOWN",
    suggestedTime: parsed.time,
    confirmed: detectSentiment(body) === "POSITIVE",
    rawInput: body,
  };
}

export function getAgentAlertMessage(parsed: ParsedAppointment, clientName: string): string {
  const timeStr = parsed.suggestedTime.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });
  const dateStr = parsed.suggestedTime.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
  return `📅 Appointment Confirmed: ${clientName} confirmed ${dateStr} at ${timeStr}. Proceed to scheduled window.`;
}

export async function processInboundCallback(from: string, callDuration: number): Promise<{ noted: boolean; voicemail: boolean }> {
  return { noted: true, voicemail: callDuration <= 30 };
}