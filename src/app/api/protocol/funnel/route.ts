import { NextRequest, NextResponse } from "next/server";
import { generateFunnel, getFunnelMetadata, validateFunnelInput } from "@/protocolcounsel/funnel/auto-funnel-generator";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const tierId = searchParams.get("tierId");

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateFunnelInput(productId, tierId || undefined);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Get metadata
    const metadata = getFunnelMetadata(productId);
    if (!metadata) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Funnel metadata API error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, tierId, successUrl, cancelUrl } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateFunnelInput(productId, tierId);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Generate funnel
    const result = await generateFunnel({
      productId,
      tierId,
      successUrl,
      cancelUrl,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      funnelId: result.funnelId,
      slug: result.slug,
      productId: result.productId,
      tierId: result.tierId,
      checkoutUrl: result.checkoutUrl,
      checkoutSessionId: result.checkoutSessionId,
      page: result.page,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Funnel generation API error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}