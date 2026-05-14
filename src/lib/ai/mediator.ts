// AI Message Mediation - Professional Scrubbing
// Transform agent messages to professional protocol-compliant notes

export interface MediatorsInput {
  rawMessage: string;
  context?: "arrival" | "delivery" | "notary" | "general";
}

// Professional polish templates
const POLISH_TEMPLATES: Record<string, string> = {
  // Arrival scenarios
  "gate locked": "Field Update: Agent has arrived at location. Access is currently restricted by a locked gate; awaiting further entry instructions.",
  "no answer": "Field Update: Agent arrived at location. No response at the door. Per protocol, will leave notice and attempt contact.",
  "wrong address": "Field Update: Agent arrived at listed address. The location does not match expected destination. Awaiting firm clarification.",
  
  // Delivery scenarios  
  "delivered signed": "Field Update: Documents successfully delivered and signature obtained.",
  "refused": "Field Update: Recipient declined to accept documents. Per protocol, documents remain in agent possession.",
  "not home": "Field Update: No one present at location. Door hanger left per no-show protocol.",
  
  // Notary scenarios
  "signer not ready": "Field Update: Signer requires additional preparation time. Scheduling updated.",
  "ID invalid": "Field Update: Signer identification requires verification. Process paused pending compliance.",
  
  // General
  "running late": "Field Update: Agent is en route; slight delay anticipated.",
  "done": "Field Update: Service completed successfully.",
};

// Detect message type and polish
export function mediatMessage(input: MediatorsInput): string {
  const message = input.rawMessage.toLowerCase();
  
  // Check for specific patterns
  for (const [pattern, polished] of Object.entries(POLISH_TEMPLATES)) {
    if (message.includes(pattern)) {
      return polished;
    }
  }
  
  // Default: professional wrap
  if (input.context === "arrival") {
    return `Field Update: Agent arrived at location. Status: ${input.rawMessage}`;
  }
  if (input.context === "delivery") {
    return `Delivery Update: ${input.rawMessage}`;
  }
  return `Status Update: ${input.rawMessage}`;
}

// Add timestamp to logged note
export function logPolishedNote(polishedNote: string): string {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${time}: ${polishedNote}`;
}

// Get client-facing note (no PII)
export function getClientNote(rawMessage: string, context?: "arrival" | "delivery" | "notary" | "general"): {
  raw: string;
  polished: string;
  logged: string;
} {
  const polished = mediatMessage({ rawMessage, context });
  const logged = logPolishedNote(polished);
  
  return {
    raw: rawMessage,
    polished,
    logged,
  };
}