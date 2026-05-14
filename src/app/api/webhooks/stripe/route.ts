import { NextRequest, NextResponse } from "next/server";
import {
  constructWebhookEvent,
  isStripeConfigured,
  getCheckoutSession,
  createTransfer,
  getStripeInstance,
} from "@/lib/stripe";
import {
  completeOrder,
  failOrder,
  refundOrder,
  getOrderByPaymentIntent,
  Order,
  checkDatabaseConnection,
} from "@/lib/db";

type WebhookHandler = (
  event: StripeEvent
) => Promise<void>;

interface StripeEvent {
  type: string;
  data: {
    object: unknown;
  };
}

async function handleCheckoutSessionCompleted(event: StripeEvent) {
  const session = event.data.object as {
    id: string;
    payment_intent: string;
    customer_email?: string;
    amount_total: number;
    currency: string;
    metadata?: Record<string, string>;
  };

  console.log("Checkout session completed:", session.id);

  try {
    await completeOrder(session.id, session.payment_intent as string);
    console.log("Order marked as completed:", session.id);
  } catch (error) {
    console.error("Failed to complete order:", error);
    throw error;
  }
}

async function handleCheckoutSessionAsyncPaymentFailed(event: StripeEvent) {
  const session = event.data.object as {
    id: string;
    payment_intent?: string;
  };

  console.log("Checkout session payment failed:", session.id);

  try {
    await failOrder(session.id);
    console.log("Order marked as failed:", session.id);
  } catch (error) {
    console.error("Failed to mark order as failed:", error);
    throw error;
  }
}

async function handleChargeRefunded(event: StripeEvent) {
  const charge = event.data.object as {
    payment_intent?: string;
  };

  console.log("Charge refunded:", charge.payment_intent);

  if (charge.payment_intent) {
    try {
      const sessions = await getCheckoutSession(charge.payment_intent as string);
      if (sessions && sessions.id) {
        await refundOrder(sessions.id);
        console.log("Order marked as refunded:", sessions.id);
      }
    } catch (error) {
      console.error("Failed to refund order:", error);
      throw error;
    }
  }
}

// Immediate Payout: Trigger transfer to Service Partner on payment success
async function handlePaymentIntentSucceeded(event: StripeEvent) {
  const paymentIntent = event.data.object as {
    id: string;
    amount: number;
    currency: string;
  };

  console.log("Payment intent succeeded:", paymentIntent.id);

  try {
    // Find order by payment intent
    const order = await getOrderByPaymentIntent(paymentIntent.id);
    
    // Extended order type with fields not in current DB model
    const orderWithAgent = order as Order & {
      fieldAgentId?: string;
      agentPayoutAmount?: number;
      orderNumber?: string;
    };
    
    if (orderWithAgent && orderWithAgent.fieldAgentId && orderWithAgent.agentPayoutAmount) {
      // Create immediate transfer to field agent
      const transfer = await createTransfer({
        amount: orderWithAgent.agentPayoutAmount,
        currency: paymentIntent.currency || "usd",
        destination: orderWithAgent.fieldAgentId,
        description: `Payout for Order ${orderWithAgent.orderNumber}`,
      });

      console.log("Transfer created:", transfer.id);
      console.log("Agent payout processed:", orderWithAgent.fieldAgentId);
    } else {
      console.log("No field agent assigned or no payout amount - skipping transfer");
    }
  } catch (error) {
    console.error("Failed to process payout:", error);
  }
}

// Map of event types to handlers
const WEBHOOK_HANDLERS: Record<string, WebhookHandler> = {
  "checkout.session.completed": handleCheckoutSessionCompleted,
  "checkout.session.async_payment_failed": handleCheckoutSessionAsyncPaymentFailed,
  "charge.refunded": handleChargeRefunded,
  "payment_intent.succeeded": handlePaymentIntentSucceeded,
};

export async function POST(request: NextRequest) {
  try {
    // Check Stripe configuration
    if (!isStripeConfigured()) {
      console.error("Stripe not configured");
      return NextResponse.json(
        { error: "Payment processing not configured" },
        { status: 503 }
      );
    }

    // Check database configuration
    const dbConnected = await checkDatabaseConnection();
    if (!dbConnected) {
      console.error("Database not connected");
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    // Get the raw request body
    const rawBody = await request.text();

    // Get the Stripe signature from headers
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("Missing Stripe signature header");
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: StripeEvent;
    try {
      event = (await constructWebhookEvent(rawBody, signature)) as StripeEvent;
    } catch (signatureError) {
      console.error("Invalid webhook signature:", signatureError);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    console.log("Received webhook event:", event.type);

    // Find and call the appropriate handler
    const handler = WEBHOOK_HANDLERS[event.type];

    if (handler) {
      await handler(event);
    } else {
      console.log("Unhandled webhook event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);

    // Return 200 to acknowledge receipt even on errors
    // to prevent Stripe from retrying indefinitely
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", message);

    return NextResponse.json(
      { error: "Webhook processing failed", details: message },
      { status: 500 }
    );
  }
}