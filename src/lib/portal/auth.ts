// Portal Auth - session management for secure portal access

import { randomBytes } from "crypto";

const SESSION_DURATION_HOURS = 24;

export interface CreateSessionInput {
  userId: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// Generate secure session token
export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

// Calculate session expiration
export function getSessionExpiration(): Date {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + SESSION_DURATION_HOURS);
  return expiresAt;
}

// Create session object
export function createSession(input: CreateSessionInput): Session {
  const now = new Date();
  return {
    id: "",
    userId: input.userId,
    token: generateSessionToken(),
    expiresAt: getSessionExpiration(),
    createdAt: now,
  };
}

// Validate session
export function isSessionValid(session: { expiresAt: Date }): boolean {
  return new Date() < session.expiresAt;
}

// Get session age in hours
export function getSessionAgeHours(session: { createdAt: Date }): number {
  const now = new Date();
  const diff = now.getTime() - session.createdAt.getTime();
  return diff / (1000 * 60 * 60);
}