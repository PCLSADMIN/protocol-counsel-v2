// ==========================================
// STAFF MANAGEMENT API
// Protocol Counsel - Firm Admin creates Restricted Coordinator accounts
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export interface StaffInviteRequest {
  email: string;
  name?: string;
  role: 'restricted_coordinator';
  firmId: string;
  invitedBy: string; // Firm Admin user ID
}

export interface StaffInviteResponse {
  success: boolean;
  inviteId?: string;
  inviteToken?: string;
  email?: string;
  message: string;
}

/**
 * Generate secure invite token
 */
function generateInviteToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Generate invite ID
 */
function generateInviteId(): string {
  const prefix = 'INV';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * POST /api/portal/staff/invite
 * Firm Admin invites a Restricted Coordinator
 */
export async function POST(request: NextRequest) {
  try {
    const body: StaffInviteRequest = await request.json();
    const { email, name, role, firmId, invitedBy } = body;

    // Validate required fields
    if (!email || !firmId || !invitedBy) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate role is restricted_coordinator
    if (role !== 'restricted_coordinator') {
      return NextResponse.json(
        { success: false, message: 'Only restricted_coordinator role can be invited' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate invite tokens
    const inviteId = generateInviteId();
    const inviteToken = generateInviteToken();

    // In production, save to database:
    // await db.portalInvites.create({
    //   id: inviteId,
    //   token: inviteToken,
    //   email,
    //   name,
    //   role,
    //   firmId,
    //   invitedBy,
    //   status: 'pending',
    //   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    // });

    // Send invite email (mock)
    console.log(`Invite sent to ${email} with token ${inviteToken}`);

    return NextResponse.json({
      success: true,
      inviteId,
      inviteToken, // In production, don't return token - send via email instead
      email,
      message: `Invitation sent to ${email}`,
    } as StaffInviteResponse);
  } catch (error) {
    console.error('Staff invite error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send invitation' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/portal/staff/invite
 * List pending invites (Firm Admin only)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const firmId = searchParams.get('firmId');

  if (!firmId) {
    return NextResponse.json(
      { error: 'Firm ID required' },
      { status: 400 }
    );
  }

  // In production, fetch from database:
  // const invites = await db.portalInvites.findMany({
  //   where: { firmId, status: 'pending' },
  // });

  // Mock response
  return NextResponse.json({
    invites: [
      {
        id: 'INV-ABC123',
        email: 'assistant@example.com',
        name: 'New Assistant',
        role: 'restricted_coordinator',
        status: 'pending',
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  });
}

/**
 * DELETE /api/portal/staff/invite
 * Revoke an invite
 */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const inviteId = searchParams.get('inviteId');

  if (!inviteId) {
    return NextResponse.json(
      { success: false, message: 'Invite ID required' },
      { status: 400 }
    );
  }

  // In production:
  // await db.portalInvites.update({
  //   where: { id: inviteId },
  //   data: { status: 'revoked' },
  // });

  return NextResponse.json({
    success: true,
    message: 'Invitation revoked',
  });
}