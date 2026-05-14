// AutoFunnelGenerator - automatically generates complete revenue landing pages from Stripe product metadata

import { getProductById, getAllProducts, ProductRoute } from "@/core/product-router";
import { generateCopy, CopyInput, CopyOutput } from "./copy-engine";
import {
  buildFunnelPage,
  getFunnelPageJSON,
  FunnelPage,
  PageBuilderOptions,
} from "./page-builder";
import {
  createCheckoutSessionForProduct,
  isStripeConfigured,
  getStripePrices,
} from "@/integrations/stripe-sync";

export interface FunnelConfig {
  productId: string;
  tierId?: string;
  checkoutBaseUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface FunnelResult {
  funnelId: string;
  slug: string;
  productId: string;
  tierId?: string;
  page: FunnelPage;
  checkoutUrl?: string;
  checkoutSessionId?: string;
  error?: string;
}

export interface FunnelMetadata {
  productName: string;
  complianceLevel: string;
  features: string[];
  tiers: string[];
  generatedAt: string;
}

// Generate deterministic funnel ID from input
function generateFunnelId(productId: string, tierId?: string): string {
  const base = `funnel_${productId}`;
  return tierId ? `${base}_${tierId}` : base;
}

// Generate deterministic slug from product
function generateSlug(product: ProductRoute, tierId?: string): string {
  const base = product.slug;
  return tierId ? `${base}-${tierId}` : base;
}

export async function generateFunnel(config: FunnelConfig): Promise<FunnelResult> {
  const { productId, tierId, successUrl, cancelUrl } = config;

  // Get product from catalog
  const product = getProductById(productId);
  if (!product) {
    return {
      funnelId: "",
      slug: "",
      productId,
      tierId,
      page: {
        id: "",
        slug: "",
        productId,
        sections: [],
      },
      error: `Product not found: ${productId}`,
    };
  }

  try {
    // Build the page
    const options: PageBuilderOptions = {
      productId,
      tierId,
      successUrl: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancelUrl: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    };

    const page = await buildFunnelPage(options);

    // Generate checkout session if Stripe configured
    let checkoutUrl: string | undefined;
    let checkoutSessionId: string | undefined;

    if (isStripeConfigured() && tierId) {
      try {
        const checkout = await createCheckoutSessionForProduct(
          productId,
          tierId,
          {
            successUrl: options.successUrl || "http://localhost:3000/success",
            cancelUrl: options.cancelUrl || "http://localhost:3000/cancel",
          }
        );
        checkoutUrl = checkout.url;
        checkoutSessionId = checkout.sessionId;
      } catch (error) {
        console.error("Failed to create checkout session:", error);
      }
    }

    return {
      funnelId: generateFunnelId(productId, tierId),
      slug: generateSlug(product, tierId),
      productId,
      tierId,
      page,
      checkoutUrl,
      checkoutSessionId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      funnelId: generateFunnelId(productId, tierId),
      slug: generateSlug(product, tierId),
      productId,
      tierId,
      page: {
        id: generateFunnelId(productId, tierId),
        slug: generateSlug(product, tierId),
        productId,
        sections: [],
      },
      error: message,
    };
  }
}

export async function generateAllFunnels(): Promise<FunnelResult[]> {
  const products = getAllProducts();
  const funnels: FunnelResult[] = [];

  for (const product of products) {
    // Generate funnel for each tier
    for (const tier of product.pricingTiers) {
      if (tier.custom) continue; // Skip custom tiers

      const result = await generateFunnel({
        productId: product.productId,
        tierId: tier.id,
      });

      funnels.push(result);
    }
  }

  return funnels;
}

export function getFunnelMetadata(productId: string): FunnelMetadata | null {
  const product = getProductById(productId);
  if (!product) return null;

  return {
    productName: product.name,
    complianceLevel: product.complianceLevel,
    features: product.features,
    tiers: product.pricingTiers.map(t => t.id),
    generatedAt: new Date().toISOString(),
  };
}

export function validateFunnelInput(productId: string, tierId?: string): {
  valid: boolean;
  error?: string;
} {
  const product = getProductById(productId);
  if (!product) {
    return { valid: false, error: `Product not found: ${productId}` };
  }

  if (tierId) {
    const tier = product.pricingTiers.find(t => t.id === tierId);
    if (!tier) {
      return { valid: false, error: `Tier not found: ${tierId}` };
    }
  }

  return { valid: true };
}

// Export for Next.js API route
export async function generateFunnelAPI(
  productId: string,
  tierId?: string
): Promise<FunnelResult> {
  return generateFunnel({ productId, tierId });
}

// Export for use as React component (server component)
export async function FunnelPageComponent({
  productId,
  tierId,
}: {
  productId: string;
  tierId?: string;
}) {
  const result = await generateFunnel({ productId, tierId });

  if (result.error) {
    return (
      <div className="error">
        <h1>Error generating funnel</h1>
        <p>{result.error}</p>
      </div>
    );
  }

  return (
    <div className="funnel-page" data-funnel-id={result.funnelId}>
      {result.page.sections.map((section, index) => (
        <section key={index} data-type={section.type}>
          {/* Render based on section type */}
          {section.type === "hero" && (
            <div className="hero">
              <h1>{(section.content as { headline: string }).headline}</h1>
              <p>{(section.content as { subheadline: string }).subheadline}</p>
              {result.checkoutUrl && (
                <a href={result.checkoutUrl} className="cta-button">
                  {(section.content as { cta: string }).cta}
                </a>
              )}
            </div>
          )}

          {section.type === "problem" && (
            <div className="problem">
              <h2>{(section.content as { title: string }).title}</h2>
              <ul>
                {(section.content as { points: string[] }).points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {section.type === "solution" && (
            <div className="solution">
              <h2>{(section.content as { title: string }).title}</h2>
              <ul>
                {(section.content as { benefits: string[] }).benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {section.type === "pricing" && (
            <div className="pricing">
              <span className="price">
                {(section.content as { display: string }).display}
              </span>
              <span className="interval">
                /{(section.content as { interval: string }).interval}
              </span>
              {(section.content as { savings?: number }).savings && (
                <span className="savings">
                  Save {(section.content as { savings: number }).savings}%
                </span>
              )}
            </div>
          )}

          {section.type === "faq" && (
            <div className="faq">
              {(section.content as { faqs: { question: string; answer: string }[] }).faqs.map(
                (faq, i) => (
                  <details key={i}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                )
              )}
            </div>
          )}

          {section.type === "onboarding" && (
            <div className="onboarding">
              <ol>
                {(section.content as { steps: string[] }).steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}