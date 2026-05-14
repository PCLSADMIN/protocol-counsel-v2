// Protocol Counsel API
// 
// Available endpoints:
// - GET /api/protocol/products - List all products
// - POST /api/protocol/products/create - Create a product
// - GET /api/protocol/pricing - Get pricing tiers
// - POST /api/protocol/webhooks - Handle webhooks
//
// All routes go through ProductRouter, PricingEngine, ComplianceLayer, WebhookOrchestrator

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Protocol Counsel API",
    version: "1.0.0",
    endpoints: [
      { path: "/api/protocol/products", method: "GET", description: "List all products" },
      { path: "/api/protocol/products/create", method: "POST", description: "Create a product" },
      { path: "/api/protocol/pricing", method: "GET", description: "Get pricing tiers" },
      { path: "/api/protocol/webhooks", method: "POST", description: "Handle webhooks" },
    ],
  });
}