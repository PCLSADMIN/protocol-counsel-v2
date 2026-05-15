// ==========================================
// ADMIN ORDERS ENDPOINT
// Full order tracking with firm ownership
// Protocol Counsel - Enterprise accounting
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const ordersDb = new Map<string, any>();

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(4).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * POST /api/admin/orders
 * Create order with full accounting
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firmId, serviceType, recipientName, recipientAddress, recipientCity, recipientState, recipientZip, priority } = body;
    
    if (!firmId || !recipientName) {
      return NextResponse.json({ error: 'Firm ID and recipient required' }, { status: 400 });
    }
    
    const orderId = generateId('ORD');
    const orderNumber = `PC-${Date.now().toString(36).toUpperCase()}`;
    
    const order: any = {
      id: orderId,
      orderNumber,
      firmId,
      firmName: body.firmName || 'Unknown Firm',
      serviceType: serviceType || 'Process Service',
      recipientName,
      recipientAddress,
      recipientCity,
      recipientState,
      recipientZip,
      status: 'new',
      priority: priority || 'standard',
      serviceFee: 0,
      processingFee: 0,
      shippingFee: 0,
      totalAmount: 0,
      invoiceStatus: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    ordersDb.set(orderId, order);
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

/**
 * GET /api/admin/orders
 * List all orders with firm accounting
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const firmId = searchParams.get('firmId');
  const status = searchParams.get('status');
  
  let orders = Array.from(ordersDb.values());
  
  if (firmId) {
    orders = orders.filter((o: any) => o.firmId === firmId);
  }
  
  if (status) {
    orders = orders.filter((o: any) => o.status === status);
  }
  
  orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return NextResponse.json({ orders, total: orders.length });
}