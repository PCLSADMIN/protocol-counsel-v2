// ==========================================
// ADMIN ACCOUNTING SYSTEM
// Full account and order tracking with firm ownership
// Protocol Counsel - Enterprise audit trail
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export interface FirmAccount {
  id: string;
  firmName: string;
  firmType: 'law_firm' | 'legal_department' | 'solo_practitioner';
  primaryContact: string;
  email: string;
  phone?: string;
  
  // Billing
  billingType: 'prepaid' | 'net_30' | 'net_15';
  stripeCustomerId?: string;
  accountBalance: number;
  
  // Status
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  updatedAt: string;
}

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

// In-memory storage (replace with database in production)
const firmsDb = new Map<string, FirmAccount>();
const auditDb = new Map<string, AuditEntry>();

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

function generateTimestamp(): string {
  return new Date().toISOString();
}

/**
 * POST /api/admin/accounts
 * Create new firm account
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firmName, firmType, primaryContact, email, phone, billingType } = body;
    
    if (!firmName || !email) {
      return NextResponse.json({ error: 'Firm name and email required' }, { status: 400 });
    }
    
    const firm: FirmAccount = {
      id: generateId('FIRM'),
      firmName,
      firmType: firmType || 'law_firm',
      primaryContact,
      email,
      phone,
      billingType: billingType || 'net_30',
      accountBalance: 0,
      status: 'pending',
      createdAt: generateTimestamp(),
      updatedAt: generateTimestamp(),
    };
    
    firmsDb.set(firm.id, firm);
    
    return NextResponse.json({ success: true, firm });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}

/**
 * GET /api/admin/accounts
 * List all firm accounts (admin only)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  
  let firms = Array.from(firmsDb.values());
  
  if (status) {
    firms = firms.filter(f => f.status === status);
  }
  
  return NextResponse.json({ firms, total: firms.length });
}