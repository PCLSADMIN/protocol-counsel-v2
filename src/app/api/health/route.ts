// Health Check Endpoint

import { validateEnv } from "@/lib/env";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const envValid = validateEnv();
  
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: envValid ? "configured" : "missing",
    version: "1.0.0",
  });
}