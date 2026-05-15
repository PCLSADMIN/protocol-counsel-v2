// ==========================================
// BULK ORDER API
// Protocol Counsel - Bulk Order Entry Endpoint
// Handles CSV/Multi-row data entry (50+ orders)
// ==========================================

import { NextRequest, NextResponse } from 'next/server';
import { batchVerify } from '@/lib/integrations/prime-tracers';
import { createShipment, getTechFee } from '@/lib/integrations/fedex';
import { createTechFeeCharge, createNet30Invoice } from '@/lib/billing/automation';
import { sanitizeNote, generateBulkNote } from '@/lib/portal/note-automation';

export interface BulkOrderRow {
  serviceType: string;
  recipientName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  priority?: 'standard' | 'rush' | 'expedited';
  notes?: string;
}

export interface BulkOrderRequest {
  orders: BulkOrderRow[];
  firmId: string;
  billingType: 'immediate' | 'net_30';
  fedExAccount?: string;
}

export interface BulkOrderResponse {
  success: boolean;
  processedOrders: OrderResult[];
  failedOrders: FailedOrder[];
  totalTechFees: number;
  totalTraceFees: number;
  auditNote: string;
}

export interface OrderResult {
  orderId: string;
  status: string;
  trackingNumber?: string;
  labelUrl?: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
}

export interface FailedOrder {
  row: number;
  error: string;
}

/**
 * Parse CSV or multi-line text to orders
 */
function parseBulkData(
  data: string,
  format: 'csv' | 'text'
): BulkOrderRow[] {
  const orders: BulkOrderRow[] = [];

  if (format === 'csv') {
    const lines = data.trim().split('\n');
    for (const line of lines) {
      const cols = line.split(',').map(c => c.trim());
      if (cols.length >= 6) {
        orders.push({
          serviceType: cols[0],
          recipientName: cols[1],
          address: cols[2],
          city: cols[3],
          state: cols[4],
          zip: cols[5],
          phone: cols[6],
          priority: (cols[7] as 'standard' | 'rush' | 'expedited') || 'standard',
        });
      }
    }
  } else {
    // Text format: each line is an order
    const lines = data.trim().split('\n');
    for (const line of lines) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 6) {
        orders.push({
          serviceType: parts[0],
          recipientName: parts[1],
          address: parts[2],
          city: parts[3],
          state: parts[4],
          zip: parts[5],
        });
      }
    }
  }

  return orders;
}

/**
 * Generate unique order ID
 */
function generateOrderId(): string {
  const prefix = 'PC';
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${year}-${random}`;
}

/**
 * POST /api/orders/bulk - Process bulk orders
 */
export async function POST(request: NextRequest) {
  try {
    const body: BulkOrderRequest = await request.json();
    const { orders, firmId, billingType, fedExAccount } = body;

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { error: 'No orders provided' },
        { status: 400 }
      );
    }

    // Limit to 100 orders per batch
    if (orders.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 orders per batch' },
        { status: 400 }
      );
    }

    const processedOrders: OrderResult[] = [];
    const failedOrders: FailedOrder[] = [];
    let totalTechFees = 0;
    let totalTraceFees = 0;
    const orderIds: string[] = [];

    // Step 1: Verify all addresses/phones (batch)
    const traceRequests = orders.map(o => ({
      address: o.address,
      city: o.city,
      state: o.state,
      zip: o.zip,
      phone: o.phone,
    }));

    const orderId = generateOrderId();
    const traceResult = await batchVerify(traceRequests, orderId);
    totalTraceFees = traceResult.totalCost;

    // Step 2: Process each order
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const trace = traceResult.results[i];

      try {
        // Generate order ID
        const orderUid = generateOrderId();
        orderIds.push(orderUid);

        // Create shipment via FedEx if address verified
        let labelResult;
        if (trace?.verified) {
          labelResult = await createShipment(
            {
              sender: {
                street1: '123 Legal Way',
                city: 'Washington',
                state: 'DC',
                postalCode: '20001',
                countryCode: 'US',
              },
              recipient: {
                street1: order.address,
                city: order.city,
                state: order.state,
                postalCode: order.zip,
                countryCode: 'US',
              },
              packageWeight: 1,
              serviceType: order.priority === 'rush' ? 'PRIORITY_OVERNIGHT' : 'FEDEX_GROUND',
              reference: orderUid,
            },
            fedExAccount
          );
          totalTechFees += getTechFee();
        }

        // Create tech fee charge (if configured)
        if (labelResult && billingType === 'immediate') {
          // In real implementation, get firm Stripe customer ID from DB
          // await createTechFeeCharge(orderUid, firmStripeCustomerId);
        }

        processedOrders.push({
          orderId: orderUid,
          status: trace?.verified ? 'dispatched' : 'pending_verification',
          trackingNumber: labelResult?.trackingNumber,
          labelUrl: labelResult?.labelUrl,
          verificationStatus: trace?.verified ? 'verified' : 'pending',
        });
      } catch (error) {
        failedOrders.push({
          row: i + 1,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Step 3: Generate audit note
    const auditNote = generateBulkNote(orderIds, orders.length);

    return NextResponse.json({
      success: true,
      processedOrders,
      failedOrders,
      totalTechFees: totalTechFees / 100, // Convert to dollars
      totalTraceFees,
      auditNote,
    } as BulkOrderResponse);
  } catch (error) {
    console.error('Bulk order error:', error);
    return NextResponse.json(
      { error: 'Failed to process bulk order' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders/bulk - Get allowed methods
 */
export async function GET() {
  return NextResponse.json({
    message: 'Use POST to submit bulk orders',
    maxBatchSize: 100,
    supportedFormats: ['csv', 'pipe-delimited'],
  });
}