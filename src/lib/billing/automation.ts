// ==========================================
// STRIPE BILLING AUTOMATION
// Protocol Counsel - $4 Tech Fee & Net 30 Integration
// ==========================================

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-04-22.dahlia',
});

const BILLING_CONFIG = {
  techFeeAmount: 400, // $4.00 in cents
  platformFeePercent: 0.10, // 10% platform fee
  netTermsDays: 30,
};

export interface InvoiceData {
  orderId: string;
  firmId: string;
  firmStripeCustomerId?: string;
  amount: number;
  description: string;
  lineItems: { name: string; amount: number }[];
}

export interface Net30Terms {
  orderId: string;
  invoiceId: string;
  dueDate: Date;
  status: 'pending' | 'approved' | 'paid' | 'overdue';
  amount: number;
}

/**
 * Create a tech fee charge for label generation
 */
export async function createTechFeeCharge(
  orderId: string,
  firmStripeCustomerId: string,
  metadata?: Record<string, string>
): Promise<{
  chargeId: string;
  amount: number;
  status: string;
}> {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
    return {
      chargeId: `mock_charge_${Date.now()}`,
      amount: BILLING_CONFIG.techFeeAmount,
      status: 'succeeded',
    };
  }

  try {
    const charge = await stripe.charges.create({
      amount: BILLING_CONFIG.techFeeAmount,
      currency: 'usd',
      customer: firmStripeCustomerId,
      description: `Tech Fee - Label Generation - Order ${orderId}`,
      metadata: {
        orderId,
        type: 'tech_fee',
        ...metadata,
      },
    });

    return {
      chargeId: charge.id,
      amount: charge.amount,
      status: charge.status,
    };
  } catch (error) {
    console.error('Stripe charge error:', error);
    throw error;
  }
}

/**
 * Create an invoice with Net 30 terms
 */
export async function createNet30Invoice(
  data: InvoiceData
): Promise<{
  invoiceId: string;
  invoiceUrl: string;
  dueDate: Date;
}> {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + BILLING_CONFIG.netTermsDays);

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
    return {
      invoiceId: `mock_inv_${Date.now()}`,
      invoiceUrl: 'https://invoice.example.com/mock',
      dueDate,
    };
  }

  // Create invoice items first
  for (const item of data.lineItems) {
    await stripe.invoiceItems.create({
      customer: data.firmStripeCustomerId!,
      amount: item.amount,
      currency: 'usd',
      description: item.name,
    });
  }

  // Create the invoice
  const invoice = await stripe.invoices.create({
    customer: data.firmStripeCustomerId!,
    collection_method: 'send_invoice',
    days_until_due: BILLING_CONFIG.netTermsDays,
    metadata: {
      orderId: data.orderId,
      firmId: data.firmId,
    },
  });

  // Finalize and send
  const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
  const sent = await stripe.invoices.sendInvoice(finalized.id);

  return {
    invoiceId: sent.id,
    invoiceUrl: sent.hosted_invoice_url || '',
    dueDate: new Date(sent.due_date! * 1000),
  };
}

/**
 * Check Net 30 invoice status
 */
export async function checkNet30Status(
  invoiceId: string
): Promise<Net30Terms> {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + BILLING_CONFIG.netTermsDays);
    return {
      invoiceId,
      orderId: 'mock_order',
      dueDate,
      status: 'pending',
      amount: BILLING_CONFIG.techFeeAmount,
    };
  }

  const invoice = await stripe.invoices.retrieve(invoiceId);

  let status: Net30Terms['status'] = 'pending';
  if (invoice.status === 'paid') status = 'paid';
  else if (invoice.amount_due === 0) status = 'paid';
  else {
    const now = new Date();
    const due = new Date(invoice.due_date! * 1000);
    if (now > due) status = 'overdue';
  }

  return {
    invoiceId: invoice.id,
    orderId: invoice.metadata?.orderId || '',
    dueDate: new Date(invoice.due_date! * 1000),
    status,
    amount: invoice.amount_due,
  };
}

/**
 * Process payment for completed Net 30 invoice
 */
export async function processNet30Payment(
  invoiceId: string
): Promise<{ success: boolean; paymentId?: string }> {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
    return { success: true, paymentId: `mock_pay_${Date.now()}` };
  }

  try {
    const payment = await stripe.invoices.pay(invoiceId);
    return {
      success: payment.status === 'paid',
      paymentId: payment.id,
    };
  } catch (error) {
    console.error('Net 30 payment error:', error);
    return { success: false };
  }
}

/**
 * Create a payment intent for immediate billing
 */
export async function createPaymentIntent(
  amount: number,
  customerId: string,
  metadata?: Record<string, string>
): Promise<{
  clientSecret: string;
  paymentIntentId: string;
}> {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
    return {
      clientSecret: 'mock_secret_' + Date.now(),
      paymentIntentId: 'mock_pi_' + Date.now(),
    };
  }

  const intent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    customer: customerId,
    automatic_payment_methods: { enabled: true },
    metadata,
  });

  return {
    clientSecret: intent.client_secret!,
    paymentIntentId: intent.id,
  };
}

/**
 * Calculate platform fee
 */
export function calculatePlatformFee(amount: number): number {
  return Math.round(amount * BILLING_CONFIG.platformFeePercent);
}

/**
 * Get billing configuration
 */
export function getBillingConfig() {
  return {
    techFee: BILLING_CONFIG.techFeeAmount,
    platformFeePercent: BILLING_CONFIG.platformFeePercent * 100,
    netTermsDays: BILLING_CONFIG.netTermsDays,
  };
}