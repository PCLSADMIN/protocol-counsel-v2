import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";
import { createOrder, checkDatabaseConnection } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Check Stripe configuration
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Payment processing not configured" },
        { status: 503 }
      );
    }

    // Check database configuration
    const dbConnected = await checkDatabaseConnection();
    if (!dbConnected) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      customerEmail,
      priceAmount,
      currency = "usd",
      productName,
      successUrl,
      cancelUrl,
      metadata,
    } = body;

    // Validate required fields
    if (!priceAmount || !productName || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: "Missing required fields: priceAmount, productName, successUrl, cancelUrl" },
        { status: 400 }
      );
    }

    if (priceAmount < 50) {
      return NextResponse.json(
        { error: "Price must be at least 50 cents" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      customerEmail,
      priceAmount,
      currency,
      productName,
      successUrl,
      cancelUrl,
      metadata,
    });

    // Create pending order in database (only if we have a session ID)
    if (session.id) {
      try {
        await createOrder({
          stripe_session_id: session.id,
          customer_email: customerEmail || "",
          amount_total: priceAmount,
          currency,
          metadata: metadata || undefined,
        });
      } catch (orderError) {
        // Log but don't fail the checkout if order creation fails
        console.error("Failed to create pending order:", orderError);
      }
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    const message = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}