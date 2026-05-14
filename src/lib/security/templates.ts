// Zero-Inference Templates for Portal Notes
// AI is FORBIDDEN from summarizing - MUST only report status

import { getAttemptNote } from "@/lib/ai/scheduler";

export type NoteTemplate = 
  | "ORDER_RECEIVED"
  | "ORDER_PLACED"
  | "SCHEDULING_INITIATED"
  | "CALL_ATTEMPT_1"
  | "CALL_ATTEMPT_2"
  | "CALL_ATTEMPT_3"
  | "SMS_SENT"
  | "APPOINTMENT_CONFIRMED"
  | "AGENT_DISPATCHED"
  | "DOCUMENT_UPLOADED"
  | "DOCUMENT_SIGNED"
  | "COVER_SHEET_PROVIDED"
  | "VISIT_COMPLETED"
  | "NO_SHOW_DOOR_HANGER"
  | "PAYMENT_RECEIVED"
  | "ERROR_INVALID_NUMBER";

// Fixed templates - NO inference allowed
export const NOTE_TEMPLATES: Record<NoteTemplate, string> = {
  ORDER_RECEIVED: "[TIME]: Order received. Processing will begin shortly.",
  ORDER_PLACED: "[TIME]: Order #[ORDER_ID] placed by [FIRM_NAME]. Service: [SERVICE_TYPE]",
  SCHEDULING_INITIATED: "[TIME]: Scheduling initiated for Order #[ORDER_ID]. Client: [CLIENT_NAME]",
  CALL_ATTEMPT_1: "Called client at [TIME] - No answer",
  CALL_ATTEMPT_2: "Called client at [TIME] - No answer (Attempt 2)",
  CALL_ATTEMPT_3: "Called client at [TIME] - No answer (Attempt 3)",
  SMS_SENT: "Sent SMS at [TIME] - Awaiting response",
  APPOINTMENT_CONFIRMED: "Appointment confirmed for [DATE] at [TIME]. Proceed to scheduled window.",
  AGENT_DISPATCHED: "Field Agent dispatched to [ADDRESS]. Order #[ORDER_ID].",
  DOCUMENT_UPLOADED: "Document [DOC_ID] uploaded. File: [FILENAME]",
  DOCUMENT_SIGNED: "Document [DOC_ID] signed by [SIGNER_NAME]. Timestamp: [TIME]",
  COVER_SHEET_PROVIDED: "Cover sheet provided. Client confirmed receipt before signing.",
  VISIT_COMPLETED: "Visit completed. Documents handed off securely. GPS: [LAT],[LONG]",
  NO_SHOW_DOOR_HANGER: "Client not home. Door hanger generated and left. Photo uploaded.",
  PAYMENT_RECEIVED: "Payment received. Amount: $[AMOUNT]. Transaction: [TXN_ID]",
  ERROR_INVALID_NUMBER: "Invalid contact information detected. Awaiting firm update.",
};

// Generate note from template
export function generateNote(
  template: NoteTemplate,
  replacements: Record<string, string>
): string {
  let note = NOTE_TEMPLATES[template];
  
  // Replace placeholders
  for (const [key, value] of Object.entries(replacements)) {
    note = note.replace(`[${key}]`, value);
  }
  
  // Add timestamp if not present
  if (!note.includes("[TIME]")) {
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    note = note.replace("[TIME]", time);
  }
  
  return note;
}

// Validate - must be from approved templates only
export function isValidTemplate(noteText: string): boolean {
  return Object.values(NOTE_TEMPLATES).some(t => 
    noteText.includes(t.split(":")[0])
  );
}

// AI is FORBIDDEN from doing this:
// - Summarizing legal documents
// - Extracting meaning from content
// - Generating insights
// - Making inferences about case status