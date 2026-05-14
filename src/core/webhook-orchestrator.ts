// Webhook Orchestrator - routes and processes webhooks

import { NextRequest, NextResponse } from "next/server";

export type WebhookEvent = 
  | "checkout.session.completed"
  | "checkout.session.expired"
  | "customer.subscription.created"
  | "customer.subscription.updated"
  | "customer.subscription.deleted"
  | "invoice.paid"
  | "invoice.payment_failed"
  | "product.created"
  | "product.updated"
  | "product.deleted"
  | "price.created"
  | "price.updated"
  | "price.deleted";

export interface WebhookPayload {
  id: string;
  type: WebhookEvent;
  data: {
    object: unknown;
  };
  created: number;
}

export interface WebhookHandler {
  eventType: WebhookEvent;
  handle: (payload: WebhookPayload) => Promise<void>;
}

export interface WebhookRoute {
  path: string;
  handler: WebhookHandler[];
}

// Event handlers registry
const handlerRegistry: Map<WebhookEvent, (payload: WebhookPayload) => Promise<void>> = new Map();

export function registerWebhookHandler(
  eventType: WebhookEvent,
  handler: (payload: WebhookPayload) => Promise<void>
): void {
  handlerRegistry.set(eventType, handler);
}

export function getWebhookHandler(eventType: WebhookEvent): 
  ((payload: WebhookPayload) => Promise<void>) | undefined {
  return handlerRegistry.get(eventType);
}

export function hasHandler(eventType: WebhookEvent): boolean {
  return handlerRegistry.has(eventType);
}

// Webhook event logger for debugging
const webhookLog: WebhookPayload[] = [];

export function logWebhook(payload: WebhookPayload): void {
  webhookLog.unshift(payload);
  // Keep last 100 events
  if (webhookLog.length > 100) {
    webhookLog.pop();
  }
}

export function getWebhookLog(limit = 10): WebhookPayload[] {
  return webhookLog.slice(0, limit);
}

export function clearWebhookLog(): void {
  webhookLog.length = 0;
}

// Parse and validate webhook
export function parseWebhook(
  payload: string
): { success: true; data: WebhookPayload } | { success: false; error: string } {
  try {
    const data = JSON.parse(payload) as WebhookPayload;

    if (!data.id || !data.type || !data.data) {
      return { success: false, error: "Invalid webhook payload structure" };
    }

    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to parse webhook JSON" };
  }
}

// Route webhook to appropriate handler
export async function routeWebhook(payload: WebhookPayload): Promise<{
  processed: boolean;
  error?: string;
}> {
  const handler = getWebhookHandler(payload.type);

  if (!handler) {
    console.log(`No handler registered for event type: ${payload.type}`);
    return { processed: false, error: "No handler for event type" };
  }

  try {
    await handler(payload);
    logWebhook(payload);
    return { processed: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook handler error: ${message}`);
    return { processed: false, error: message };
  }
}

// Batch process multiple webhooks
export async function batchProcessWebhooks(
  payloads: WebhookPayload[]
): Promise<{ processed: number; failed: number; errors: string[] }> {
  let processed = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const payload of payloads) {
    const result = await routeWebhook(payload);
    if (result.processed) {
      processed++;
    } else {
      failed++;
      if (result.error) {
        errors.push(`${payload.type}: ${result.error}`);
      }
    }
  }

  return { processed, failed, errors };
}

// Export for API route
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Parse webhook
    const parsed = parseWebhook(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error },
        { status: 400 }
      );
    }

    // Route to handler
    const result = await routeWebhook(parsed.data);

    return NextResponse.json({
      received: true,
      processed: result.processed,
      error: result.error,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook orchestrator error:", message);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// Class wrapper for webhook handling
export class WebhookOrchestrator {
  constructor(private db: unknown) {}

  async handle(event: { type: string; id?: string; data: { object: unknown } }) {
    switch (event.type) {
      case "checkout.session.completed":
        return this.onCheckout(event);
      case "customer.subscription.created":
        return this.onSubscription(event);
      case "invoice.payment_succeeded":
        return this.onPayment(event);
      default:
        return null;
    }
  }

  async onCheckout(event: { data: { object: unknown } }) {
    // @ts-expect-error - db type is unknown at this point
    return this.db?.orders?.create({
      data: event.data.object,
    });
  }

  async onSubscription(event: { id?: string; type: string; data: { object: unknown } }) {
    // @ts-expect-error - db type is unknown at this point
    return this.db?.subscriptions?.upsert({
      where: { id: event.id },
      update: event.data.object,
      create: event.data.object,
    });
  }

  async onPayment(event: { data: { object: unknown } }) {
    // @ts-expect-error - db type is unknown at this point
    return this.db?.payments?.create({
      data: event.data.object,
    });
  }
}