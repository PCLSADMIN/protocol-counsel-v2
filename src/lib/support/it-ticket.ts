// IT Support Portal Component

export type SupportTicketType = "LOGIN_ISSUE" | "DNS_ISSUE" | "API_ISSUE" | "PAYMENT_ISSUE" | "OTHER";

const TICKET_PREFIX = "PCL"; // Protocol Counsel Ltd ID

export interface SupportTicket {
  ticketId: string;
  type: SupportTicketType;
  userId: string;
  firmId?: string;
  description: string;
  createdAt: Date;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  resolution?: string;
}

const AUTO_RESOLVE: Record<string, { resolved: boolean; msg: string }> = {
  LOGIN_ISSUE: { resolved: true, msg: "Magic link sent to email" },
  DNS_ISSUE: { resolved: false, msg: "Escalated to IT Staff" },
  API_ISSUE: { resolved: false, msg: "Escalated to API Team" },
  PAYMENT_ISSUE: { resolved: false, msg: "Escalated to Billing Team" },
  OTHER: { resolved: false, msg: "Ticket created" },
};

export async function createTicket(type: SupportTicketType, userId: string, desc: string, firmId?: string) {
  const ticketId = `${TICKET_PREFIX}_${Date.now()}`;
  const auto = AUTO_RESOLVE[type] || { resolved: false, msg: "Ticket created" };
  return {
    ticketId, type, userId, firmId, description: desc, createdAt: new Date(),
    status: auto.resolved ? "RESOLVED" : "OPEN", resolution: auto.msg,
  };
}

export function generateMagicLink(userId: string): string {
  const token = Buffer.from(`${userId}:${Date.now()}`).toString("base64");
  return `https://protocolcounsel.com/auth/magic?token=${token}`;
}