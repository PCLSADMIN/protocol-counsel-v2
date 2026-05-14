// AI Chat Dispatcher - Two-way real-time communication
// Central AI for signer and agent support

export interface ChatMessage {
  id: string;
  sender: "signer" | "agent" | "ai";
  content: string;
  timestamp: Date;
  orderId: string;
  isPolished?: boolean;
}

export interface CoverSheetContext {
  firmName: string;
  supportPhone: string;
  orderNumber: string;
  serviceType: string;
}

// AI responses - no hallucinations, only protocol-based
const AI_RESPONSES = {
  // Signer questions
  "what documents": "The documents being delivered are from your law firm regarding your case. For specific content questions, please contact your attorney directly.",
  "when": "Your law firm scheduled this service. For timing questions, check your client portal or contact the firm.",
  "where": "I can confirm the agent is en route to the service location. For specific details, contact your attorney.",
  "cost": "Billing questions should be directed to your law firm. I don't have access to your account details.",
  "default": "I've noted your question. Your law firm will follow up through the proper channels.",
  
  // Agent questions
  "no answer": "Protocol: Leave the door hanger and upload the property photo. Mark as no-show.",
  "locked gate": "Protocol: Contact the firm for access instructions. Do not leave property without authorization.",
  "wrong address": "Protocol: Do not proceed. Contact dispatch immediately with correct address from the firm.",
  "need help": "Protocol: Contact dispatch. Do not leave site until authorized.",
};

// Detect sender type
export function detectSenderType(message: string): "signer" | "agent" | "unknown" {
  const lower = message.toLowerCase();
  
  // Agent keywords
  if (lower.includes("dispatch") || lower.includes("firm") || lower.includes("client name")) {
    return "agent";
  }
  
  // Signer keywords
  if (lower.includes("what") || lower.includes("when") || lower.includes("where") || 
      lower.includes("cost") || lower.includes("how much")) {
    return "signer";
  }
  
  return "unknown";
}

// Generate AI response
export function generateAIResponse(
  message: string,
  senderType: "signer" | "agent",
  context?: CoverSheetContext
): string {
  const lower = message.toLowerCase();
  
  // Check for patterns
  if (senderType === "signer") {
    for (const [pattern, response] of Object.entries(AI_RESPONSES)) {
      if (lower.includes(pattern)) {
        return response;
      }
    }
    return AI_RESPONSES.default;
  }
  
  if (senderType === "agent") {
    for (const [pattern, response] of Object.entries(AI_RESPONSES)) {
      if (lower.includes(pattern)) {
        return response;
      }
    }
    return "Contact dispatch for immediate assistance.";
  }
  
  return AI_RESPONSES.default;
}

// Create chat message
export function createChatMessage(
  sender: "signer" | "agent" | "ai",
  content: string,
  orderId: string,
  isPolished: boolean = false
): ChatMessage {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sender,
    content,
    timestamp: new Date(),
    orderId,
    isPolished,
  };
}

// Format for realtime display
export function formatChatDisplay(messages: ChatMessage[]): {
  id: string;
  sender: string;
  content: string;
  time: string;
  isAi: boolean;
}[] {
  return messages.map(msg => ({
    id: msg.id,
    sender: msg.sender === "ai" ? "Protocol AI" : 
           msg.sender === "signer" ? "Client" : "Agent",
    content: msg.content,
    time: msg.timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    isAi: msg.sender === "ai",
  }));
}