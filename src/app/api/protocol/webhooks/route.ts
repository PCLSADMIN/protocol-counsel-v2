import { NextRequest, NextResponse } from "next/server";
import { WebhookOrchestrator } from "@/core/webhook-orchestrator";

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();

    if (!event || !event.type) {
      return NextResponse.json(
        { error: "Invalid event payload" },
        { status: 400 }
      );
    }

    // Create handler with db (would need actual db connection)
    const handler = new WebhookOrchestrator(null);

    await handler.handle(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook handling error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}