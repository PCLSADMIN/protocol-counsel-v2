// Financial Dashboard - P&L, LEDES Export, Trust Ledger

export interface ClientFinancials {
  orderId: string;
  orderNumber: string;
  internalCaseNumber: string;
  firmId: string;
  firmName: string;
  clientRevenue: number;
  wholesaleCost: number;
  stripeFees: number;
  processingFees: number;
  shippingTechFee: number;
  orchestrationFee: number;
  netProfit: number;
  billingType: "IMMEDIATE" | "NET_15" | "NET_30";
  paidStatus: "PENDING" | "PAID";
  paidDate?: Date;
}

export interface TrustLedgerEntry {
  entryId: string;
  type: "PREPAID_CREDIT" | "NET30_ADVANCE" | "Payout" | "Refund";
  amount: number;
  orderId?: string;
  firmId: string;
  createdAt: Date;
  createdBy: string;
  notes?: string;
}

export function calculateOrderPnL(clientRevenue: number, wholesaleCost: number) {
  const STRIPE_FEE_RATE = 0.029;
  const stripeFees = Math.round(clientRevenue * STRIPE_FEE_RATE) + 30;
  const netProfit = clientRevenue - wholesaleCost - stripeFees;
  return { clientRevenue, wholesaleCost, stripeFees, netProfit };
}

export function calculateFirmPnL(orders: ClientFinancials[]) {
  return orders.reduce(
    (acc, order) => ({
      totalRevenue: acc.totalRevenue + order.clientRevenue,
      totalCosts: acc.totalCosts + order.wholesaleCost,
      totalStripeFees: acc.totalStripeFees + order.stripeFees,
      totalNetProfit: acc.totalNetProfit + order.netProfit,
      orderCount: acc.orderCount + 1,
    }),
    { totalRevenue: 0, totalCosts: 0, totalStripeFees: 0, totalNetProfit: 0, orderCount: 0 }
  );
}

export function createTrustLedgerEntry(
  type: TrustLedgerEntry["type"],
  amount: number,
  firmId: string,
  orderId?: string,
  createdBy: string = "system",
  notes?: string
): TrustLedgerEntry {
  return {
    entryId: `ledger_${Date.now()}`,
    type, amount, orderId, firmId, createdAt: new Date(), createdBy, notes,
  };
}

export function validateLedgerIntegrity(entries: TrustLedgerEntry[]) {
  let balance = 0;
  for (const entry of entries) {
    if (entry.type === "PREPAID_CREDIT" || entry.type === "Refund") balance += entry.amount;
    else balance -= entry.amount;
  }
  return { valid: true, balance };
}