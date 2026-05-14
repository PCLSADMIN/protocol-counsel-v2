import Stripe from "stripe";

// Stripe API key must be set in environment
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn(
    "⚠️  Stripe secret key not set. Set STRIPE_SECRET_KEY in environment."
  );
}

// Create Stripe client
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    })
  : null;

export function isStripeConfigured(): boolean {
  return !!stripeSecretKey;
}

export function getStripeConfig() {
  return {
    hasSecretKey: !!stripeSecretKey,
  };
}

// Checkout session creation
export interface CreateCheckoutInput {
  customerEmail?: string;
  customerId?: string;
  priceAmount: number; // in cents
  currency?: string;
  productName: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession(
  input: CreateCheckoutInput
): Promise<Stripe.Checkout.Session> {
  if (!stripe) {
    throw new Error("Stripe not configured");
  }

  const {
    customerEmail,
    customerId,
    priceAmount,
    currency = "usd",
    productName,
    successUrl,
    cancelUrl,
    metadata,
  } = input;

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: productName,
          },
          unit_amount: priceAmount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      ...metadata,
      integration: "protocol-counsel",
    },
  };

  // Set customer email or ID if provided
  if (customerEmail) {
    sessionParams.customer_email = customerEmail;
  } else if (customerId) {
    sessionParams.customer = customerId;
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  return session;
}

// Webhook signature verification
export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  if (!stripe) {
    throw new Error("Stripe not configured");
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("Stripe webhook secret not configured");
  }

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    webhookSecret
  );

  return event;
}

// Get checkout session
export async function getCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  if (!stripe) {
    throw new Error("Stripe not configured");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer"],
  });

  return session;
}

// Refund creation
export async function createRefund(
  paymentIntentId: string,
  amount?: number
): Promise<Stripe.Refund> {
  if (!stripe) {
    throw new Error("Stripe not configured");
  }

  const refundParams: Stripe.RefundCreateParams = {
    payment_intent: paymentIntentId,
  };

  if (amount) {
    refundParams.amount = amount;
  }

  const refund = await stripe.refunds.create(refundParams);

  return refund;
}