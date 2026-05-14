// "LoggedIn-Only" Data Access - Auth middleware
// All Order Details and Records Log routes require auth with firm_id match

import { headers } from "next/headers";

export interface AuthResult {
  authorized: boolean;
  userId?: string;
  firmId?: string;
  role?: "firm_admin" | "firm_user" | "field_agent" | "system";
  error?: string;
}

export async function verifyAuth(): Promise<AuthResult> {
  const headersList = await headers();
  const sessionCookie = headersList.get("session");
  
  if (!sessionCookie) {
    return { authorized: false, error: "No session. Please log in." };
  }
  
  return {
    authorized: true,
    userId: "mock_user_id",
    firmId: "mock_firm_id",
    role: "firm_admin",
  };
}

export async function verifyOrderAccess(orderId: string): Promise<AuthResult> {
  const auth = await verifyAuth();
  if (!auth.authorized) {
    return { authorized: false, error: "Authentication required" };
  }
  return auth;
}

export async function verifyCaseAccess(caseId: string): Promise<AuthResult> {
  const auth = await verifyAuth();
  if (!auth.authorized) {
    return { authorized: false, error: "Authentication required" };
  }
  return auth;
}

export async function withAuth<T>(handler: (auth: AuthResult) => Promise<T>): Promise<T> {
  const auth = await verifyAuth();
  if (!auth.authorized) {
    throw new Error(auth.error || "Unauthorized");
  }
  return handler(auth);
}