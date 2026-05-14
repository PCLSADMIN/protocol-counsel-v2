// Pricing Engine - handles pricing logic and calculations

export interface PricingTier {
  id: string;
  name: string;
  price: number; // in cents
  interval: "month" | "year";
  custom?: boolean; // true for custom/enterprise pricing
}

export interface Price {
  amount: number;
  currency: string;
  interval: string;
  display: string;
}

export interface Product {
  id: string;
  name: string;
  tiers: PricingTier[];
}

const PRODUCTS: Product[] = [
  {
    id: "prod_starter",
    name: "Protocol Counsel Starter",
    tiers: [
      { id: "monthly", name: "Monthly", price: 2900, interval: "month" },
      { id: "annual", name: "Annual", price: 29000, interval: "year" },
    ],
  },
  {
    id: "prod_business",
    name: "Protocol Counsel Business",
    tiers: [
      { id: "monthly", name: "Monthly", price: 7900, interval: "month" },
      { id: "annual", name: "Annual", price: 79000, interval: "year" },
    ],
  },
  {
    id: "prod_enterprise",
    name: "Protocol Counsel Enterprise",
    tiers: [{ id: "custom", name: "Custom", price: 0, interval: "year", custom: true }],
  },
];

// Export functions for backward compatibility
export function getProductPrice(productId: string, tierId: string): Price | null {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  const tier = product.tiers.find((t) => t.id === tierId);
  if (!tier) return null;

  const currency = "usd";
  const display =
    tier.custom === true
      ? "Contact Sales"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency.toUpperCase(),
        }).format(tier.price / 100);

  return {
    amount: tier.price,
    currency,
    interval: tier.interval,
    display,
  };
}

export function calculateAnnualSavings(monthlyPrice: number, annualPrice: number): number {
  const equivalentAnnual = monthlyPrice * 12;
  return equivalentAnnual - annualPrice;
}

export function calculateSavingsPercent(monthlyPrice: number, annualPrice: number): number {
  const savings = calculateAnnualSavings(monthlyPrice, annualPrice);
  const equivalentAnnual = monthlyPrice * 12;
  return Math.round((savings / equivalentAnnual) * 100);
}

export function getTierPricing(
  productId: string
): { monthly: Price | null; annual: Price | null; savingsPercent: number } {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return { monthly: null, annual: null, savingsPercent: 0 };
  }

  const monthly = product.tiers.find((t) => t.interval === "month" && !t.custom);
  const annual = product.tiers.find((t) => t.interval === "year" && !t.custom);

  const monthlyPrice = monthly ? getProductPrice(productId, monthly.id) : null;
  const annualPrice = annual ? getProductPrice(productId, annual.id) : null;

  const savingsPercent =
    monthlyPrice && annualPrice
      ? calculateSavingsPercent(monthlyPrice.amount, annualPrice.amount)
      : 0;

  return {
    monthly: monthlyPrice,
    annual: annualPrice,
    savingsPercent,
  };
}

export function formatPrice(price: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(price / 100);
}

export function prorateAmount(
  currentPrice: number,
  newPrice: number,
  daysRemaining: number,
  totalDays: number
): number {
  const dailyRateCurrent = currentPrice / totalDays;
  const dailyRateNew = newPrice / totalDays;

  return Math.round((dailyRateNew - dailyRateCurrent) * daysRemaining);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

// Class wrapper for pricing operations
export class PricingEngine {
  tiers = {
    starter: 2900,
    growth: 7900,
    elite: 0, // custom
  };

  getPrice(tier: keyof typeof this.tiers): number {
    return this.tiers[tier];
  }

  validateTier(tier: string): boolean {
    return Object.keys(this.tiers).includes(tier);
  }

  buildStripePrice(tier: keyof typeof this.tiers) {
    return {
      unit_amount: this.tiers[tier] * 100,
      currency: "usd",
      recurring: { interval: "month" },
    };
  }
}