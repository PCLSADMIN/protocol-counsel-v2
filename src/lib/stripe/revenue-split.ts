// Stripe Connect Revenue Split Automation
// Partner Cost → Service Provider | Markup/Fee → Operating Account

export interface RevenueSplit {
  partnerCost: number;
  platformFee: number;
  total: number;
}

export const SPLIT_CONFIG = {
  // Percentage markup (adjustable)
  platformMarkupPercent: 15, // 15% platform fee
  triggerEvent: "DOCUMENT_UPLOADED",
};

// Calculate split
export function calculateSplit(totalAmount: number): RevenueSplit {
  const partnerCost = totalAmount; // What partner charges
  const platformFee = Math.round(totalAmount * (SPLIT_CONFIG.platformMarkupPercent / 100));
  // Total charged to client = partnerCost + platformFee
  
  return {
    partnerCost,
    platformFee,
    total: partnerCost + platformFee,
  };
}

// Stripe Connect transfer
export async function executeSplit(
  stripeAccountId: string,
  amount: number
): Promise<{ success: boolean; transferId?: string }> {
  // In production: Stripe Connect API
  // 1. Transfer to partner: stripe.transfers.create({ destination: partnerAccountId, amount })
  // 2. Transfer platform fee to operating: stripe.transfers.create({ destination: operatingAccount, amount: platformFee })
  return { success: true, transferId: `transfer_${Date.now()}` };
}

// Trigger on document upload
export async function onDocumentUploaded(orderId: string, amount: number, partnerStripeId: string) {
  return executeSplit(partnerStripeId, amount);
}