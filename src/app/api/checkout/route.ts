import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";
import { createOrder, checkDatabaseConnection } from "@/lib/db";
import { SHIPPING_TECH_FEE } from "@/lib/shipping/api";

// Financial constants
const ORCHESTRATION_FEE = 1000; // $10 in cents
const MINIMUM_MARKUP_PERCENT = 0.40; // 40% minimum
const MAXIMUM_MARKUP_PERCENT = 0.85; // 85% maximum
const LIQUIDITY_THRESHOLD_MULTIPLIER = 1.2; // Bank balance must be 120% of order total

// Markup calculation
function calculateMarkup(servicePrice: number): {
  wholesale: number;
  orchestrationFee: number;
  markup: number;
  markupPercent: number;
  total: number;
} {
  // Wholesale = cost (service price minus our margin)
  const wholesale = Math.round(servicePrice * (1 - MAXIMUM_MARKUP_PERCENT));
  const markup = Math.round(servicePrice * MAXIMUM_MARKUP_PERCENT);
  const total = wholesale + ORCHESTRATION_FEE + markup;
  
  return {
    wholesale,
    orchestrationFee: ORCHESTRATION_FEE,
    markup,
    markupPercent: MAXIMUM_MARKUP_PERCENT * 100,
    total,
  };
}

// Plaid liquidity check (mock for MVP)
async function checkBankLiquidity(
  userId: string,
  orderTotal: number
): Promise<{ approved: boolean; balance?: number; reason?: string }> {
  // Mock Plaid check - in production would call Plaid API
  const mockBalance = Math.random() * orderTotal * 2; // Random balance 0-200% of order
  
  if (mockBalance >= orderTotal * LIQUIDITY_THRESHOLD_MULTIPLIER) {
    return { approved: true, balance: mockBalance };
  }
  
  return {
    approved: false,
    balance: mockBalance,
    reason: "Bank balance below threshold. Credit card payment required.",
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Payment processing not configured" },
        { status: 503 }
      );
    }

    const dbConnected = await checkDatabaseConnection();
    if (!dbConnected) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      userId,
      customerEmail,
      priceAmount,
      currency = "usd",
      productName,
      successUrl,
      cancelUrl,
      billingType = "IMMEDIATE",
      shippingLabel = false,
      shippingCarrier,
      metadata,
    } = body;

    // Validate required fields
    if (!priceAmount || !productName || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check Strict Neutrality acknowledgment required
    if (!metadata?.acknowledged) {
      return NextResponse.json(
        { error: "Strict Neutrality acknowledgment required before checkout" },
        { status: 400 }
      );
    }

    // Calculate pricing split
    const pricing = calculateMarkup(priceAmount);

    // Net 30 Liquidity Check
    if (billingType === "NET_30" && userId) {
      const liquidity = await checkBankLiquidity(userId, pricing.total);
      if (!liquidity.approved) {
        // Force credit card for Net 30 firms with insufficient funds
        return NextResponse.json({
          error: liquidity.reason,
          requiresCreditCard: true,
          liquidityCheck: {
            balance: liquidity.balance,
            required: Math.round(pricing.total * LIQUIDITY_THRESHOLD_MULTIPLIER),
          },
        });
      }
    }

    // Shipping Tech Fee auto-append
    let finalPrice = pricing.total;
    let shippingTechFee = 0;
    
    if (shippingLabel && shippingCarrier) {
      shippingTechFee = SHIPPING_TECH_FEE * 100; // Convert to cents
      finalPrice += shippingTechFee;
    }

    // Add financial breakdown to metadata for webhook
    const financialMetadata = {
      ...metadata,
      wholesale_cost: pricing.wholesale,
      orchestration_fee: pricing.orchestrationFee,
      markup_amount: pricing.markup,
      markup_percent: pricing.markupPercent,
      shipping_tech_fee: shippingTechFee,
      total_charge: finalPrice,
      split_to_operating: pricing.orchestrationFee + pricing.markup,
    };

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      customerEmail,
      priceAmount: finalPrice,
      currency,
      productName,
      successUrl,
      cancelUrl,
      metadata: financialMetadata,
    });

    // Create pending order
    if (session.id) {
      try {
        await createOrder({
          stripe_session_id: session.id,
          customer_email: customerEmail || "",
          amount_total: finalPrice,
          currency,
          metadata: financialMetadata,
        });
      } catch (orderError) {
        console.error("Failed to create pending order:", orderError);
      }
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      financialBreakdown: {
        wholesale: pricing.wholesale / 100,
        orchestrationFee: pricing.orchestrationFee / 100,
        markup: pricing.markup / 100,
        markupPercent: `${pricing.markupPercent}%`,
        shippingTechFee: shippingTechFee / 100,
        total: finalPrice / 100,
        splitToOperating: (pricing.orchestrationFee + pricing.markup) / 100,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}