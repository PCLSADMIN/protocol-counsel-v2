// Funnel Hooks - maps landing pages to products and triggers checkout

import { routeRequest, RouteResult } from "../core/product-router";

export interface FunnelMapping {
  landingSlug: string;
  productSlug: string;
  campaign: string;
  utmParams?: Record<string, string>;
  trigger: "auto" | "manual";
}

export interface FunnelTrigger {
  type: "checkout" | "redirect" | "custom";
  payload: Record<string, string>;
}

// Funnel mappings - maps landing page slugs to products
const FUNNEL_MAPPINGS: FunnelMapping[] = [
  {
    landingSlug: "starter",
    productSlug: "protocol-counsel-starter",
    campaign: "landing-starter",
    trigger: "manual",
  },
  {
    landingSlug: "business",
    productSlug: "protocol-counsel-business",
    campaign: "landing-business",
    trigger: "manual",
  },
  {
    landingSlug: "enterprise",
    productSlug: "protocol-counsel-enterprise",
    campaign: "landing-enterprise",
    trigger: "manual",
  },
  {
    landingSlug: "pricing",
    productSlug: "protocol-counsel-starter",
    campaign: "landing-pricing",
    trigger: "manual",
  },
  {
    landingSlug: "start",
    productSlug: "protocol-counsel-starter",
    campaign: "cta-start",
    trigger: "auto",
    utmParams: { source: "landing", medium: "cta" },
  },
  {
    landingSlug: "upgrade",
    productSlug: "protocol-counsel-business",
    campaign: "cta-upgrade",
    trigger: "auto",
    utmParams: { source: "landing", medium: "cta" },
  },
];

export function getMappingByLanding(landingSlug: string): FunnelMapping | undefined {
  return FUNNEL_MAPPINGS.find((m) => m.landingSlug === landingSlug);
}

export function getMappingsByProduct(productSlug: string): FunnelMapping[] {
  return FUNNEL_MAPPINGS.filter((m) => m.productSlug === productSlug);
}

export function triggerCheckout(mapping: FunnelMapping): FunnelTrigger {
  return {
    type: "checkout",
    payload: {
      productSlug: mapping.productSlug,
      campaign: mapping.campaign,
      ...mapping.utmParams,
    },
  };
}

export function processFunnelEvent(
  landingSlug: string,
  userAction: string
): FunnelTrigger | null {
  const mapping = getMappingByLanding(landingSlug);
  if (!mapping) {
    return null;
  }

  // Only auto-trigger on specific actions
  if (mapping.trigger === "auto" || userAction === "click_checkout") {
    return triggerCheckout(mapping);
  }

  return null;
}

export function buildCheckoutUrl(
  baseUrl: string,
  mapping: FunnelMapping,
  tier = "monthly"
): string {
  const params = new URLSearchParams({
    product: mapping.productSlug,
    tier,
    campaign: mapping.campaign,
  });

  if (mapping.utmParams) {
    Object.entries(mapping.utmParams).forEach(([key, value]) => {
      params.set(key, value);
    });
  }

  return `${baseUrl}/api/checkout?${params.toString()}`;
}

export function getAllFunnelMappings(): FunnelMapping[] {
  return FUNNEL_MAPPINGS;
} // Export for API
export async function GET() {
  return Response.json({ mappings: FUNNEL_MAPPINGS });
}