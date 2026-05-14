// Portal Orders API - view, create, and manage orders

import { NextRequest, NextResponse } from "next/server";
import { calculateOrderTotal, validateWholeDollars } from "@/lib/billing/order-billing";

export type OrderStatus = "NEW" | "PROCESSING" | "SCHEDULED" | "COMPLETED" | "ARCHIVED";

// Service types available
export const SERVICE_TYPES = [
  "incorporation",
  "contract-review",
  "litigation-support",
  "compliance-audit",
  "ip-filing",
  "other",
] as const;

export type ServiceType = typeof SERVICE_TYPES[number];

// GET /api/portal/orders - list orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const orders = getMockOrders(status as OrderStatus | null);

    return NextResponse.json({
      orders,
      summary: {
        total: orders.length,
        pending: orders.filter(o => o.status === "NEW").length,
        processing: orders.filter(o => o.status === "PROCESSING").length,
        completed: orders.filter(o => o.status === "COMPLETED").length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/portal/orders - create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceType,
      servicePrice,
      billingType = "IMMEDIATE",
    } = body;

    if (!serviceType || !SERVICE_TYPES.includes(serviceType)) {
      return NextResponse.json({ error: "Invalid service type" }, { status: 400 });
    }

    if (!validateWholeDollars(servicePrice)) {
      return NextResponse.json(
        { error: "Service price must be whole dollars (no cents)" },
        { status: 400 }
      );
    }

    const billing = calculateOrderTotal({
      servicePrice,
      billingType: billingType as "IMMEDIATE" | "NET_15" | "NET_30",
    });

    const orderNumber = generateOrderNumber();

    const order = {
      id: orderNumber,
      orderNumber,
      serviceType,
      servicePrice: billing.servicePrice,
      processingFee: billing.processingFee,
      amountTotal: billing.amountTotal,
      displayTotal: billing.displayTotal,
      billingType,
      status: "NEW" as OrderStatus,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `ORD-${year}-${random}`;
}

function getMockOrders(filterStatus: OrderStatus | null) {
  const orders = [
    {
      id: "1",
      orderNumber: "ORD-2024-0001",
      serviceType: "incorporation",
      servicePrice: 499,
      processingFee: 9.99,
      amountTotal: 50899,
      displayTotal: "$508.99",
      billingType: "IMMEDIATE",
      status: "COMPLETED" as OrderStatus,
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-0002",
      serviceType: "contract-review",
      servicePrice: 299,
      processingFee: 9.99,
      amountTotal: 30899,
      displayTotal: "$308.99",
      billingType: "NET_15",
      status: "PROCESSING" as OrderStatus,
      createdAt: "2024-01-20T14:30:00Z",
    },
  ];

  if (filterStatus) {
    return orders.filter(o => o.status === filterStatus);
  }

  return orders;
}