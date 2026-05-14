// AI Messaging System - scheduling + intake assistant

export interface AIMessage {
  id: string;
  sender: "AI" | "USER" | "SYSTEM";
  content: string;
  timestamp: Date;
  deliveryMethod: "IN_APP" | "EMAIL" | "SMS";
  metadata?: Record<string, unknown>;
}

export interface ConversationThread {
  orderId: string;
  messages: AIMessage[];
}

// AI response templates
const AI_TEMPLATES = {
  greeting: [
    "Hello! I'm your ProtocolCounsel assistant. How can I help you today?",
    "Hi there! I can help you schedule an appointment or answer questions about your order.",
  ],
  appointment_suggestion: [
    "I'd be happy to help you schedule an appointment. What times work best for you?",
    "Let me check our available slots. When would you like to meet?",
  ],
  order_status: [
    "I can check on your order status. One moment please.",
    "Let me look up your order details.",
  ],
  document_help: [
    "I can help you upload documents. We accept PDF files up to 10MB.",
    "Need help with documents? Just drag and drop your PDFs in the portal.",
  ],
  farewell: [
    "Is there anything else I can help you with?",
    "Feel free to reach out anytime you need assistance.",
  ],
};

// Generate AI response based on user message
export function generateAIResponse(userMessage: string, orderContext?: {
  orderId?: string;
  orderStatus?: string;
}): AIMessage {
  const content = parseUserIntent(userMessage, orderContext);
  
  return {
    id: generateMessageId(),
    sender: "AI",
    content,
    timestamp: new Date(),
    deliveryMethod: "IN_APP",
  };
}

// Parse user message intent and generate response
function parseUserIntent(userMessage: string, context?: {
  orderId?: string;
  orderStatus?: string;
}): string {
  const lower = userMessage.toLowerCase();
  
  // Check for scheduling keywords
  if (lower.includes("schedule") || lower.includes("appointment") || lower.includes("meet")) {
    return randomFrom(AI_TEMPLATES.appointment_suggestion);
  }
  
  // Check for order status keywords
  if (lower.includes("status") || lower.includes("track") || lower.includes("where")) {
    return randomFrom(AI_TEMPLATES.order_status);
  }
  
  // Check for document keywords
  if (lower.includes("document") || lower.includes("upload") || lower.includes("pdf")) {
    return randomFrom(AI_TEMPLATES.document_help);
  }
  
  // Check for greeting
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return randomFrom(AI_TEMPLATES.greeting);
  }
  
  // Default response
  return randomFrom(AI_TEMPLATES.greeting);
}

// Generate unique message ID
function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get random template
function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Simulate SMS/email response (no external provider)
export function simulateDelivery(
  message: AIMessage,
  destination: "EMAIL" | "SMS"
): {
  simulated: boolean;
  destination: string;
  content: string;
} {
  return {
    simulated: true,
    destination,
    content: `[SIMULATED ${destination}] ${message.content}`,
  };
}

// Log message with timestamp
export function logMessage(message: AIMessage, orderId: string): void {
  console.log(`[${message.timestamp.toISOString()}] Order ${orderId}: ${message.sender} - ${message.content}`);
}