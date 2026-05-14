// External API Gateway - Secure for law firm integrations

const API_KEYS = new Map<string, { firmId: string; name: string; active: boolean }>();

const EXCLUDED = ["partnerId", "wholesaleCost", "internalRoutingLogic", "marginCalculation", "agentPayoutAmount"];
const PUBLIC = ["orderId", "orderNumber", "orderStatus", "finalDocumentUrl", "logNotes", "serviceType", "createdAt"];

export function generateAPIKey(firmId: string, name: string): string {
  const key = `pc_live_${Date.now()}_${Math.random().toString(36).substr(2, 12)}`;
  API_KEYS.set(key, { firmId, name, active: true });
  return key;
}

export function validateAPIKey(key: string) {
  const k = API_KEYS.get(key);
  return k?.active ? { valid: true, firmId: k.firmId } : { valid: false };
}

export function sanitizeOrder(order: Record<string, unknown>) {
  const sanitized: Record<string, unknown> = {};
  for (const f of PUBLIC) if (f in order) sanitized[f] = order[f];
  return sanitized;
}