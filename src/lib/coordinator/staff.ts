// Dedicated Logistics Coordinator - Internal Agent

export type CoordinatorStatus = "IDLE" | "MONITORING" | "ESCALATING" | "RESOLVED";

export const ORDER_ACCEPT_TIMEOUT = 30;
export const FIELD_VISIT_TIMEOUT = 120;

export interface OrderHealth {
  orderId: string;
  status: "healthy" | "stale" | "critical";
  staleReason?: string;
  lastUpdate: Date;
}

export async function checkOrderHealth(orderId: string): Promise<OrderHealth> {
  // Mock - in production from database
  return { orderId, status: "healthy", lastUpdate: new Date() };
}

export function logCoordinatorAction(action: string, details: string): string {
  const now = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true,
  });
  return `[Protocol Systems Staff] ${now}: ${action} - ${details}`;
}

export function triggerEscalation(orderId: string, reason: string) {
  const message = logCoordinatorAction("Escalation triggered", `Order ${orderId}: ${reason}`);
  return { escalated: true, notificationSent: true, logMessage: message };
}

export async function monitorOrders(orderIds: string[]) {
  const results = { healthy: 0, stale: 0, critical: 0, escalations: [] as string[] };
  for (const orderId of orderIds) {
    const health = await checkOrderHealth(orderId);
    if (health.status === "healthy") results.healthy++;
    else if (health.status === "stale") results.stale++;
    else if (health.status === "critical") {
      results.critical++;
      const esc = triggerEscalation(orderId, health.staleReason || "Unknown");
      results.escalations.push(esc.logMessage);
    }
  }
  return results;
}