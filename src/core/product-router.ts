// Product Router - maps inbound requests to products

import { Product, PricingTier } from "./pricing-engine";

export interface ProductRoute {
  slug: string;
  productId: string;
  name: string;
  description: string;
  pricingTiers: PricingTier[];
  features: string[];
  complianceLevel: "standard" | "premium" | "enterprise";
  webhookTriggers: string[];
}

export interface RouteRequest {
  source: string; // e.g., "landing-page", "api-callback", "webhook"
  campaign?: string;
  referrer?: string;
  utmParams?: Record<string, string>;
}

export interface RouteResult {
  product: ProductRoute;
  suggestedTier: string;
  checkoutParams: Record<string, string>;
}

// Product catalog
const PRODUCT_CATALOG: ProductRoute[] = [
  {
    slug: "protocol-counsel-starter",
    productId: "prod_starter",
    name: "Protocol Counsel Starter",
    description: "Legal protocol management for small teams",
    pricingTiers: [
      { id: "monthly", name: "Monthly", price: 2900, interval: "month" },
      { id: "annual", name: "Annual", price: 29000, interval: "year" },
    ],
    features: ["up to 5 team members", "basic compliance", "email support"],
    complianceLevel: "standard",
    webhookTriggers: ["checkout.completed", "subscription.created"],
  },
  {
    slug: "protocol-counsel-business",
    productId: "prod_business",
    name: "Protocol Counsel Business",
    description: "Legal protocol management for growing teams",
    pricingTiers: [
      { id: "monthly", name: "Monthly", price: 7900, interval: "month" },
      { id: "annual", name: "Annual", price: 79000, interval: "year" },
    ],
    features: ["up to 25 team members", "advanced compliance", "priority support", "API access"],
    complianceLevel: "premium",
    webhookTriggers: ["checkout.completed", "subscription.created", "subscription.updated"],
  },
  {
    slug: "protocol-counsel-enterprise",
    productId: "prod_enterprise",
    name: "Protocol Counsel Enterprise",
    description: "Legal protocol management for large organizations",
    pricingTiers: [
      { id: "custom", name: "Custom", price: 0, interval: "year", custom: true },
    ],
    features: ["unlimited team members", "full compliance suite", "dedicated support", "custom integrations"],
    complianceLevel: "enterprise",
    webhookTriggers: ["*"],
  },
];

export function getProductBySlug(slug: string): ProductRoute | undefined {
  return PRODUCT_CATALOG.find((p) => p.slug === slug);
}

export function getProductById(productId: string): ProductRoute | undefined {
  return PRODUCT_CATALOG.find((p) => p.productId === productId);
}

export function getAllProducts(): ProductRoute[] {
  return PRODUCT_CATALOG;
}

export function routeRequest(request: RouteRequest): RouteResult | null {
  // Determine product based on source/campaign
  let product: ProductRoute | undefined;

  // Simple routing logic based on campaign or source
  if (request.campaign) {
    if (request.campaign.includes("enterprise")) {
      product = getProductBySlug("protocol-counsel-enterprise");
    } else if (request.campaign.includes("business")) {
      product = getProductBySlug("protocol-counsel-business");
    } else {
      product = getProductBySlug("protocol-counsel-starter");
    }
  }

  // Fall back to source-based routing
  if (!product) {
    if (request.source === "landing-starter") {
      product = getProductBySlug("protocol-counsel-starter");
    } else if (request.source === "landing-business") {
      product = getProductBySlug("protocol-counsel-business");
    } else if (request.source === "landing-enterprise") {
      product = getProductBySlug("protocol-counsel-enterprise");
    }
  }

  // Default to starter if no match
  if (!product) {
    product = getProductBySlug("protocol-counsel-starter");
  }

  if (!product) {
    return null;
  }

  // Determine suggested tier
  const suggestedTier = request.campaign?.includes("annual") ? "annual" : "monthly";

  // Build checkout params
  const checkoutParams: Record<string, string> = {
    product_id: product.productId,
    tier: suggestedTier,
    source: request.source,
    ...request.utmParams,
  };

  if (request.campaign) {
    checkoutParams.campaign = request.campaign;
  }

  return {
    product,
    suggestedTier,
    checkoutParams,
  };
}

export function getProductsByCompliance(level: ProductRoute["complianceLevel"]): ProductRoute[] {
  return PRODUCT_CATALOG.filter((p) => p.complianceLevel === level);
}