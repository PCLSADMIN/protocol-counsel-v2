// Outbound Webhook Proxy - Push real-time updates to law firms
// Signed with Protocol Counsel Header for verification

const WEBHOOK_SIGNATURE = "X-Protocol-Sign";
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "pc_secret_key";

export interface WebhookPayload {
  event: "ORDER_ASSIGNED" | "NOTARY_SCHEDULED" | "DOCUMENT_UPLOADED" | "SERVICE_COMPLETED";
  orderId: string;
  orderNumber: string;
  timestamp: string;
  data: Record<string, unknown>;
}

// Sign webhook payload
export function signWebhook(payload: WebhookPayload): string {
  const data = JSON.stringify(payload);
  // Simple HMAC - in production use crypto
  return Buffer.from(`${data}:${WEBHOOK_SECRET}`).toString("base64");
}

// Send webhook to firm
export async function sendWebhook(
  webhookUrl: string,
  payload: WebhookPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const signature = signWebhook(payload);
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [WEBHOOK_SIGNATURE]: signature,
      },
      body: JSON.stringify(payload),
    });
    
    return { success: response.ok };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// Verify webhook signature
export function verifyWebhook(payload: WebhookPayload, signature: string): boolean {
  const expected = signWebhook(payload);
  return expected === signature;
}