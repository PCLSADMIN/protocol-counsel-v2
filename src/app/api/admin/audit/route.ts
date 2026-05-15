// ==========================================
// ADMIN AUDIT TRAIL
// Protocol Counsel - Compliance audit log
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export interface AuditEntry {
  id: string;
  timestamp: string;
  eventType: 'order_created' | 'order_updated' | 'order_completed' | 'login' | 'logout' | 'settings_changed' | 'invoice_sent' | 'payment_received';
  userId: string;
  userEmail: string;
  firmId: string;
  firmName: string;
  targetId?: string;
  targetType?: 'order' | 'invoice' | 'user' | 'settings';
  details: string;
  ipAddress?: string;
}

const auditDb = new Map<string, AuditEntry>();

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * GET /api/admin/audit
 * Get audit trail for compliance
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const firmId = searchParams.get('firmId');
  const userId = searchParams.get('userId');
  const eventType = searchParams.get('eventType');
  const limit = parseInt(searchParams.get('limit') || '100');
  
  let entries = Array.from(auditDb.values());
  
  if (firmId) {
    entries = entries.filter(e => e.firmId === firmId);
  }
  
  if (userId) {
    entries = entries.filter(e => e.userId === userId);
  }
  
  if (eventType) {
    entries = entries.filter(e => e.eventType === eventType);
  }
  
  entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  entries = entries.slice(0, limit);
  
  return NextResponse.json({ audit: entries, total: entries.length });
}

/**
 * POST /api/admin/audit
 * Create audit entry
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, userId, userEmail, firmId, firmName, targetId, targetType, details, ipAddress } = body;
    
    if (!eventType || !details) {
      return NextResponse.json({ error: 'Event type and details required' }, { status: 400 });
    }
    
    const audit: AuditEntry = {
      id: generateId('AUD'),
      timestamp: new Date().toISOString(),
      eventType,
      userId: userId || 'system',
      userEmail: userEmail || 'unknown',
      firmId: firmId || 'unknown',
      firmName: firmName || 'Unknown',
      targetId,
      targetType,
      details,
      ipAddress,
    };
    
    auditDb.set(audit.id, audit);
    
    return NextResponse.json({ success: true, audit });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create audit entry' }, { status: 500 });
  }
}