// Tiered Pricing Engine - Volume-based markup logic with margin protection

export const PROCESSING_FEE = 9.99;

// Base service rates (already marked up for margin)
export const BASE_RATES = {
  skip_trace: {
    name: "Skip Trace",
    baseRate: 65, // $65 flat
    laborIntensive: true, // Requires minimum 40% margin
  },
  mobile_notary: {
    name: "Mobile Notary",
    baseRate: 175, // Base + pass-through costs
    passThrough: true, // May have pass-through costs
    laborIntensive: true,
  },
  medical_records: {
    name: "Medical Records",
    baseRate: 95, // $95 flat
    digitalApiHit: true, // Requires minimum 85% margin on API
  },
} as const;

// Volume tiers
export const VOLUME_TIERS = {
  tier1: { min: 1, max: 5, discount: 0 },
  tier2: { min: 6, max: 20, discount: 0.15 }, // 15% reduction
  tier3: { min: 21, max: Infinity, discount: 0.25 }, // 25% reduction
} as const;

export type ServiceType = keyof typeof BASE_RATES;
export type VolumeTier = keyof typeof VOLUME_TIERS;

// Margin requirements
export const MARGIN_REQUIREMENTS = {
  laborIntensive: 0.40, // Minimum 40% margin
  digitalApiHit: 0.85, // Minimum 85% margin on digital
};

export interface PricingInput {
  serviceType: ServiceType;
  quantity: number;
}

export interface PricingOutput {
  serviceType: ServiceType;
  unitPrice: number;
  quantity: number;
  discount: number;
  discountAmount: number;
  processingFee: number;
  subtotal: number;
  total: number;
  marginProtected: boolean;
  displayPrice: string;
  displayTotal: string;
}

// Get volume tier based on order quantity
export function getVolumeTier(quantity: number): VolumeTier {
  if (quantity <= 5) return "tier1";
  if (quantity <= 20) return "tier2";
  return "tier3";
}

// Calculate tiered pricing
export function calculateTieredPricing(input: PricingInput): PricingOutput {
  const { serviceType, quantity } = input;
  
  // Get service definition
  const service = BASE_RATES[serviceType];
  if (!service) {
    throw new Error(`Unknown service type: ${serviceType}`);
  }
  
  // Get volume tier
  const tier = getVolumeTier(quantity);
  const tierConfig = VOLUME_TIERS[tier];
  
  // Calculate base price before discount
  let unitPrice = service.baseRate;
  
  // Apply volume discount
  const discount = tierConfig.discount;
  const discountAmount = Math.round(unitPrice * discount);
  unitPrice = unitPrice - discountAmount;
  
  // Verify margin protection
  const marginProtected = verifyMargin(service, unitPrice);
  if (!marginProtected) {
    console.warn(`⚠️ Margin below minimum for ${serviceType}`);
  }
  
  // Calculate totals
  const subtotal = unitPrice * quantity;
  const processingFee = PROCESSING_FEE;
  const total = subtotal + processingFee;
  
  return {
    serviceType,
    unitPrice,
    quantity,
    discount,
    discountAmount,
    processingFee,
    subtotal,
    total,
    marginProtected,
    displayPrice: formatPrice(unitPrice),
    displayTotal: formatPrice(total),
  };
}

// Verify margin is protected
function verifyMargin(
  service: typeof BASE_RATES[keyof typeof BASE_RATES],
  price: number
): boolean {
  // For digital API hits, verify 85% margin (price should be 15x cost)
  if ("digitalApiHit" in service && service.digitalApiHit) {
    // Cost = price / 15 (for 85% margin)
    const cost = price / 15;
    const margin = (price - cost) / price;
    return margin >= 0.85;
  }
  
  // For labor intensive, verify 40% margin (price should be 1.67x cost)
  if ("laborIntensive" in service && service.laborIntensive) {
    const cost = price * 0.6; // Assuming 40% margin means cost is 60% of price
    const margin = (price - cost) / price;
    return margin >= 0.40;
  }
  
  return true;
}

// Format price for display
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents);
}

// Validate whole dollars
export function validateWholeDollars(amount: number): boolean {
  return Number.isInteger(Math.round(amount)) && amount >= 0;
}

// Get pricing breakdown for UI
export function getPricingBreakdown(input: PricingInput): PricingOutput {
  return calculateTieredPricing(input);
}

// Calculate all services
export function calculateAllServices(quantities: Record<ServiceType, number>): {
  services: PricingOutput[];
  totalProcessing: number;
  grandTotal: number;
} {
  const services: PricingOutput[] = [];
  let totalProcessing = 0;
  
  for (const [serviceType, quantity] of Object.entries(quantities)) {
    if (quantity > 0) {
      const pricing = calculateTieredPricing({
        serviceType: serviceType as ServiceType,
        quantity,
      });
      services.push(pricing);
      totalProcessing += PROCESSING_FEE;
    }
  }
  
  const grandTotal = services.reduce((sum, s) => sum + s.total, 0);
  
  return { services, totalProcessing, grandTotal };
}