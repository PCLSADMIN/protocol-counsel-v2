// ==========================================
// ORDER CRUD API
// Protocol Counsel - Single order management
// ==========================================

import { NextRequest, NextResponse } from 'next/server';

// Mock order database
const ordersDb = new Map<string, any>();

// Initialize with sample orders
const sampleOrders = [
  {
    id: 'ord_pc_001',
    orderNumber: 'PC-2024-0001',
    serviceType: 'Process Service',
    recipientName: 'John Smith',
    address: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    phone: '555-0101',
    priority: 'standard',
    status: 'dispatched',
    servicePrice: 14500,
    processingFee: 999,
    shippingFee: 400,
    finalInvoiceAmount: null,
    manualAuditComplete: false,
    firmId: 'firm_pc_002',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ord_pc_002',
    orderNumber: 'PC-2024-0002',
    serviceType: 'Skip Trace',
    recipientName: 'Jane Doe',
    address: '456 Oak Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    phone: '555-0102',
    priority: 'rush',
    status: 'completed',
    servicePrice: 8500,
    processingFee: 999,
    shippingFee: 0,
    finalInvoiceAmount: 9499,
    manualAuditComplete: true,
    firmId: 'firm_pc_002',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

sampleOrders.forEach(order => ordersDb.set(order.id, order));

/**
 * GET /api/orders/[id]
 * Fetch single order by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const order = ordersDb.get(id);
  
  if (!order) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(order);
}

/**
 * PATCH /api/orders/[id]
 * Update order (toggle audit, status, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    
    const order = ordersDb.get(id);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Only allow specific updates
    const allowedFields = ['status', 'manualAuditComplete', 'finalInvoiceAmount', 'notes'];
    const sanitizedUpdates: any = {};
    
    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        sanitizedUpdates[key] = updates[key];
      }
    }
    
    // Toggle audit - set final amount
    if (updates.manualAuditComplete === true && !order.manualAuditComplete) {
      sanitizedUpdates.finalInvoiceAmount = 
        (order.servicePrice || 0) + 
        (order.processingFee || 0) + 
        (order.shippingFee || 0);
    }
    
    const updatedOrder = { ...order, ...sanitizedUpdates, updatedAt: new Date().toISOString() };
    ordersDb.set(id, updatedOrder);
    
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/orders/[id]
 * Delete/archive order
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  if (!ordersDb.has(id)) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    );
  }
  
  // Soft delete - change status to archived
  const order = ordersDb.get(id);
  order.status = 'archived';
  ordersDb.set(id, order);
  
  return NextResponse.json({ success: true, message: 'Order archived' });
}