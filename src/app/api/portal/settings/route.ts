// ==========================================
// PORTAL SETTINGS API
// Protocol Counsel - Firm configuration
// ==========================================

import { NextRequest, NextResponse } from 'next/server';

// Mock settings database
const settingsDb = new Map<string, any>();

// Default settings
const defaultSettings = {
  firmId: 'firm_pc_002',
  firmName: 'Smith & Associates',
  firmAddress: '100 Legal Plaza, Suite 500',
  firmCity: 'Los Angeles',
  firmState: 'CA',
  firmZip: '90001',
  fedExAccount: '123456789',
  barNumber: 'BAR-2024-001',
  defaultServiceType: 'Process Service',
  defaultPriority: 'standard',
  billingType: 'net_30',
  notifyEmail: true,
  notifySms: true,
  
  // Coversheet Configuration
  publicContactNumber: '(555) 123-4567',
  firmRepName: 'John Smith, Esq.',
  
  createdAt: new Date().toISOString(),
};

settingsDb.set('firm_pc_002', defaultSettings);

/**
 * GET /api/portal/settings
 * Get firm settings
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const firmId = searchParams.get('firmId') || 'firm_pc_002';
  
  const settings = settingsDb.get(firmId) || defaultSettings;
  
  return NextResponse.json(settings);
}

/**
 * PATCH /api/portal/settings
 * Update firm settings
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { firmId } = body;
    
    if (!firmId) {
      return NextResponse.json(
        { error: 'Firm ID required' },
        { status: 400 }
      );
    }
    
    const current = settingsDb.get(firmId) || defaultSettings;
    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    settingsDb.set(firmId, updated);
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/portal/settings
 * Create default settings for new firm
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firmId, firmName } = body;
    
    if (!firmId || !firmName) {
      return NextResponse.json(
        { error: 'Firm ID and name required' },
        { status: 400 }
      );
    }
    
    const settings = {
      ...defaultSettings,
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    settingsDb.set(firmId, settings);
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings create error:', error);
    return NextResponse.json(
      { error: 'Failed to create settings' },
      { status: 500 }
    );
  }
}