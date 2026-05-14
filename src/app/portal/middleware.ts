// Portal Layout - login protected
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Session cookie name
const SESSION_COOKIE = "pc_session";

// Protected paths
const PROTECTED_PATHS = ["/portal/orders", "/portal/messages", "/portal/documents"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if protected path
  const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  // Check for session cookie
  const sessionCookie = request.cookies.get(SESSION_COOKIE);
  if (!sessionCookie?.value) {
    // Redirect to login
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  return NextResponse.next();
}

// Check if user is authenticated (for components)
export function isAuthenticated(cookies: Map<string, string>): boolean {
  const session = cookies.get(SESSION_COOKIE);
  return !!session;
}