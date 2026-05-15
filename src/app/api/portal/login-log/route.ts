// ==========================================
// LOGIN CREDENTIALS LOG
// Track all login attempts and session history
// Protocol Counsel - Security audit trail
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export interface LoginCredential {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: 'superadmin' | 'firm_admin' | 'restricted_coordinator';
  firmId: string;
  firmName: string;
  
  // Login attempt details
  action: 'login_success' | 'login_failed' | 'logout' | 'password_reset' | 'invite_sent' | 'invite_accepted';
  ipAddress?: string;
  userAgent?: string;
  
  // Session info
  sessionId?: string;
  sessionStarted?: string;
  sessionEnded?: string;
  
  // Timestamp
  timestamp: string;
  
  // Failure reason (if applicable)
  reason?: string;
}

// In-memory storage
const loginLogDb = new Map<string, LoginCredential>();
const sessionsDb = new Map<string, { userId: string; created: string; lastActivity: string }>();

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * POST /api/portal/login-log
 * Log a login attempt
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, name, role, firmId, firmName, action, ipAddress, userAgent, sessionId, reason } = body;
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    const credential: LoginCredential = {
      id: generateId('LOG'),
      userId: userId || 'unknown',
      email,
      name: name || '',
      role: role || 'restricted_coordinator',
      firmId: firmId || 'unknown',
      firmName: firmName || 'Unknown Firm',
      action: action || 'login_success',
      ipAddress,
      userAgent,
      sessionId,
      timestamp: new Date().toISOString(),
      reason,
    };
    
    loginLogDb.set(credential.id, credential);
    
    // Track active session
    if (action === 'login_success' && sessionId) {
      sessionsDb.set(sessionId, {
        userId: userId || 'unknown',
        created: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      });
    }
    
    // End session on logout
    if (action === 'logout' && sessionId) {
      const session = sessionsDb.get(sessionId);
      if (session) {
        session.lastActivity = new Date().toISOString();
        sessionsDb.delete(sessionId);
      }
    }
    
    return NextResponse.json({ success: true, credential });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log credential' }, { status: 500 });
  }
}

/**
 * GET /api/portal/login-log
 * Retrieve login history
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const firmId = searchParams.get('firmId');
  const email = searchParams.get('email');
  const action = searchParams.get('action');
  const limit = parseInt(searchParams.get('limit') || '50');
  
  let logs = Array.from(loginLogDb.values());
  
  if (userId) {
    logs = logs.filter(l => l.userId === userId);
  }
  
  if (firmId) {
    logs = logs.filter(l => l.firmId === firmId);
  }
  
  if (email) {
    logs = logs.filter(l => l.email.toLowerCase().includes(email.toLowerCase()));
  }
  
  if (action) {
    logs = logs.filter(l => l.action === action);
  }
  
  // Sort by most recent
  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Limit
  logs = logs.slice(0, limit);
  
  // Get login stats
  const stats = {
    totalAttempts: loginLogDb.size,
    successfulLogins: Array.from(loginLogDb.values()).filter(l => l.action === 'login_success').length,
    failedLogins: Array.from(loginLogDb.values()).filter(l => l.action === 'login_failed').length,
    activeSessions: sessionsDb.size,
  };
  
  return NextResponse.json({ logs, stats, total: logs.length });
}

/**
 * DELETE /api/portal/login-log
 * End a session (force logout)
 */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }
  
  const session = sessionsDb.get(sessionId);
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
  
  // Log the logout
  const logEntry: LoginCredential = {
    id: generateId('LOG'),
    userId: session.userId,
    email: 'session-ended',
    name: '',
    role: 'restricted_coordinator',
    firmId: 'unknown',
    firmName: '',
    action: 'logout',
    sessionId,
    timestamp: new Date().toISOString(),
    reason: 'Admin force logout',
  };
  
  loginLogDb.set(logEntry.id, logEntry);
  sessionsDb.delete(sessionId);
  
  return NextResponse.json({ success: true, message: 'Session ended' });
}

/**
 * GET /api/portal/login-log/stats
 * Get login statistics (via ?stats=true parameter)
 */