// Field Agent API - receive jobs, upload signed docs, update status

import { NextRequest, NextResponse } from "next/server";

// GET /api/portal/agents - list active agents
export async function GET() {
  const agents = getMockAgents();
  return NextResponse.json({ agents });
}

// POST /api/portal/agents - register new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, phone } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    const agent = {
      id: generateAgentId(),
      email,
      name,
      phone: phone || null,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/portal/agents/jobs - get jobs for agent
export async function GET_JOBS(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId");

  if (!agentId) {
    return NextResponse.json({ error: "agentId required" }, { status: 400 });
  }

  const jobs = getMockJobs(agentId);
  return NextResponse.json({ jobs });
}

// POST /api/portal/agents/jobs - update job status
export async function POST_JOB(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status, notes, signedDocumentUrl } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId and status are required" },
        { status: 400 }
      );
    }

    // Mock update
    const job = {
      orderId,
      status,
      notes: notes || null,
      signedDocumentUrl: signedDocumentUrl || null,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ job });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/portal/agents/payout - process payout (mock)
export async function POST_PAYOUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, orderId, amount } = body;

    if (!agentId || !amount) {
      return NextResponse.json(
        { error: "agentId and amount are required" },
        { status: 400 }
      );
    }

    // Mock payout ledger
    const payout = {
      id: generatePayoutId(),
      fieldAgentId: agentId,
      orderId: orderId || null,
      amount: amount * 100, // convert to cents
      status: "PROCESSING",
      stripePayoutId: `po_${generateId()}`,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ payout });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function generateAgentId(): string {
  return `agent_${generateId()}`;
}

function generatePayoutId(): string {
  return `payout_${generateId()}`;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function getMockAgents() {
  return [
    { id: "agent_1", email: "john@agents.com", name: "John Smith", status: "ACTIVE" },
    { id: "agent_2", email: "jane@agents.com", name: "Jane Doe", status: "ACTIVE" },
  ];
}

function getMockJobs(agentId: string) {
  return [
    {
      id: "1",
      orderId: "ORD-2024-0001",
      serviceType: "incorporation",
      status: "PROCESSING",
      assignedAt: "2024-01-20T10:00:00Z",
    },
  ];
}