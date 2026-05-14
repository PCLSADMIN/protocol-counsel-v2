// Order Billing Rules

export const PROCESSING_FEE = 9.99; // Always $9.99

export interface BillingInput {
  servicePrice: number; // in dollars (whole dollars only)
  billingType: "IMMEDIATE" | "NET_15" | "NET_30";
}

export interface BillingOutput {
  servicePrice: number; // validated
  processingFee: number;
  amountTotal: number; // in cents
  displayTotal: string;
}

// Rounding rules - whole dollars only
function roundToWholeDollars(amount: number): number {
  return Math.round(amount);
}

// Calculate order total with processing fee
export function calculateOrderTotal(input: BillingInput): BillingOutput {
  // Validate: service price must be whole dollars
  const servicePrice = roundToWholeDollars(input.servicePrice);
  
  if (servicePrice < 0) {
    throw new Error("Service price must be non-negative");
  }
  
  // Processing fee is always fixed
  const processingFee = PROCESSING_FEE;
  
  // Total in cents
  const amountTotal = (servicePrice + processingFee) * 100;
  
  // Display format
  const displayTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountTotal / 100);

  return {
    servicePrice,
    processingFee,
    amountTotal,
    displayTotal,
  };
}

// Format price for UI display (whole dollars only)
export function formatPriceForUI(dollars: number): string {
  const whole = Math.round(dollars);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(whole);
}

// Validate whole dollars
export function validateWholeDollars(amount: number): boolean {
  return Number.isInteger(Math.round(amount)) && amount >= 0;
}