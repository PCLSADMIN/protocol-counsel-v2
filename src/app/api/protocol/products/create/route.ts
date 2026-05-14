import { NextRequest, NextResponse } from "next/server";
import { ProductRouter as ProductRouterClass } from "@/core/product-router";
import { stripeClient } from "@/integrations/stripe-sync";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, config } = body;

    if (!type || !config) {
      return NextResponse.json(
        { error: "Missing type or config" },
        { status: 400 }
      );
    }

    // Create router with Stripe client
    const router = new ProductRouterClass(stripeClient, null);

    // Create product
    const result = await router.createProduct(type, config);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Protocol create product error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}