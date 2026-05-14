import { NextRequest, NextResponse } from "next/server";
import { PricingEngine } from "@/core/pricing-engine";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get("tier");

    const engine = new PricingEngine();

    if (tier) {
      // Validate and return specific tier price
      if (!engine.validateTier(tier)) {
        return NextResponse.json(
          { error: "Invalid tier" },
          { status: 400 }
        );
      }

      const price = engine.getPrice(tier as keyof typeof engine.tiers);
      const stripePrice = engine.buildStripePrice(tier as keyof typeof engine.tiers);

      return NextResponse.json({
        tier,
        price,
        stripePrice,
      });
    }

    // Return all tiers
    return NextResponse.json({
      tiers: engine.tiers,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Pricing API error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}