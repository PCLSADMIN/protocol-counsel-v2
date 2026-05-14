// Page Builder - builds structured funnel page from copy

import { CopyOutput, CopyInput, generateCopy } from "./copy-engine";
import {
  createCheckoutSessionForProduct,
  isStripeConfigured,
} from "@/integrations/stripe-sync";

export interface PageSection {
  type: string;
  content: Record<string, unknown>;
}

export interface FunnelPage {
  id: string;
  slug: string;
  productId: string;
  sections: PageSection[];
  checkoutUrl?: string;
  metadata?: Record<string, string>;
}

export interface PageBuilderOptions {
  productId: string;
  tierId?: string;
  checkoutBaseUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
}

async function buildHeroSection(copy: CopyOutput): Promise<PageSection> {
  return {
    type: "hero",
    content: {
      headline: copy.hero.headline,
      subheadline: copy.hero.subheadline,
      cta: copy.hero.cta,
    },
  };
}

async function buildProblemSection(copy: CopyOutput): Promise<PageSection> {
  return {
    type: "problem",
    content: {
      title: copy.problem.title,
      points: copy.problem.points,
    },
  };
}

async function buildSolutionSection(copy: CopyOutput): Promise<PageSection> {
  return {
    type: "solution",
    content: {
      title: copy.solution.title,
      benefits: copy.solution.benefits,
    },
  };
}

async function buildPricingSection(
  copy: CopyOutput,
  productId: string,
  tierId?: string
): Promise<PageSection & { checkoutUrl?: string }> {
  const section: PageSection & { checkoutUrl?: string } = {
    type: "pricing",
    content: {
      display: copy.pricing.display,
      interval: copy.pricing.interval,
      savings: copy.pricing.savings,
    },
  };

  // Generate checkout URL if Stripe is configured
  if (isStripeConfigured() && tierId) {
    try {
      const checkout = await createCheckoutSessionForProduct(
        productId,
        tierId,
        {
          successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
          cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
        }
      );
      section.checkoutUrl = checkout.url;
      section.content.checkoutUrl = checkout.url;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  }

  return section;
}

async function buildFAQSection(copy: CopyOutput): Promise<PageSection> {
  return {
    type: "faq",
    content: {
      faqs: copy.faq.map(f => ({
        question: f.question,
        answer: f.answer,
      })),
    },
  };
}

async function buildOnboardingSection(copy: CopyOutput): Promise<PageSection> {
  return {
    type: "onboarding",
    content: {
      steps: [
        copy.onboarding.step1,
        copy.onboarding.step2,
        copy.onboarding.step3,
      ],
    },
  };
}

export async function buildFunnelPage(options: PageBuilderOptions): Promise<FunnelPage> {
  const { productId, tierId } = options;

  // Generate copy
  const copyInput: CopyInput = { productId, tierId };
  const copy = generateCopy(copyInput);

  // Build sections in order
  const sections: PageSection[] = [];

  sections.push(await buildHeroSection(copy));
  sections.push(await buildProblemSection(copy));
  sections.push(await buildSolutionSection(copy));
  sections.push(await buildPricingSection(copy, productId, tierId));
  sections.push(await buildFAQSection(copy));
  sections.push(await buildOnboardingSection(copy));

  // Generate checkout URL from pricing section
  const pricingSection = sections.find(s => s.type === "pricing") as
    | (PageSection & { checkoutUrl?: string })
    | undefined;

  // Generate funnel metadata
  const slug = `${productId}-${tierId || "default"}-funnel`;

  return {
    id: `funnel_${slug}`,
    slug,
    productId,
    sections,
    checkoutUrl: pricingSection?.checkoutUrl,
    metadata: {
      generated: new Date().toISOString(),
      tierId: tierId || "default",
    },
  };
}

export async function getFunnelPageJSON(options: PageBuilderOptions): Promise<string> {
  const page = await buildFunnelPage(options);
  return JSON.stringify(page, null, 2);
}