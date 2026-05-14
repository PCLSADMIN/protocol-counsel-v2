// Copy Engine - generates messaging from Stripe product metadata

import { getProductById, ProductRoute, PricingTier } from "@/core/product-router";
import { getTierPricing } from "@/core/pricing-engine";

export interface CopyInput {
  productId: string;
  tierId?: string;
}

export interface CopyOutput {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  problem: {
    title: string;
    points: string[];
  };
  solution: {
    title: string;
    benefits: string[];
  };
  pricing: {
    display: string;
    interval: string;
    savings?: number;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  onboarding: {
    step1: string;
    step2: string;
    step3: string;
  };
}

// Copy templates by product type
const COPY_TEMPLATES: Record<string, {
  hero: { headline: string; subheadline: string; cta: string };
  problem: { title: string; points: string[] };
  solution: { title: string; benefits: string[] };
  onboarding: { step1: string; step2: string; step3: string };
}> = {
  starter: {
    hero: {
      headline: "{name} - Start Protecting Your Business",
      subheadline: "Professional protocol management for small teams. Get started in minutes.",
      cta: "Start Free Trial",
    },
    problem: {
      title: "The Problem",
      points: [
        "Manual protocol management wastes hours every week",
        "No centralized documentation leads to costly mistakes",
        "Compliance gaps expose you to legal risk",
      ],
    },
    solution: {
      title: "The Solution",
      benefits: [
        "Automate repetitive protocol workflows",
        "Centralized team documentation",
        "Built-in compliance checks",
      ],
    },
    onboarding: {
      step1: "Create your account",
      step2: "Import your first protocol",
      step3: "Invite your team",
    },
  },
  business: {
    hero: {
      headline: "{name} - Scale Your Operations",
      subheadline: "Advanced protocol management for growing teams. Everything you need to scale.",
      cta: "Start Free Trial",
    },
    problem: {
      title: "The Problem",
      points: [
        "Disorganized processes slow down growth",
        "Manual onboarding costs time and money",
        "Compliance audits require endless paperwork",
      ],
    },
    solution: {
      title: "The Solution",
      benefits: [
        "Automated team workflows",
        "Priority support when you need it",
        "Advanced compliance reporting",
      ],
    },
    onboarding: {
      step1: "Configure your workspace",
      step2: "Set up team permissions",
      step3: "Launch your first campaign",
    },
  },
  enterprise: {
    hero: {
      headline: "{name} - Enterprise-Grade Control",
      subheadline: "Custom protocol solutions for large organizations. Full flexibility.",
      cta: " Contact Sales",
    },
    problem: {
      title: "The Problem",
      points: [
        "One-size-fits-all solutions don't work",
        "Complex organizations need custom workflows",
        "Regulatory requirements vary by jurisdiction",
      ],
    },
    solution: {
      title: "The Solution",
      benefits: [
        "Custom integrations and workflows",
        "Dedicated support team",
        "Full compliance suite",
      ],
    },
    onboarding: {
      step1: "Schedule onboarding call",
      step2: "Custom configuration",
      step3: "Team training",
    },
  },
};

function getTierFromProduct(product: ProductRoute, tierId?: string): PricingTier | undefined {
  if (tierId) {
    return product.pricingTiers.find(t => t.id === tierId);
  }
  return product.pricingTiers[0];
}

function generateFAQ(product: ProductRoute): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  // Generate FAQ based on product features
  for (const feature of product.features.slice(0, 3)) {
    faqs.push({
      question: `How does ${feature} work?`,
      answer: `${product.name} includes ${feature} as part of your subscription. Our team ensures everything is set up correctly.`,
    });
  }

  // Add common FAQs
  faqs.push({
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. No questions asked.",
  });

  faqs.push({
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all plans.",
  });

  return faqs;
}

export function generateCopy(input: CopyInput): CopyOutput {
  const product = getProductById(input.productId);
  
  if (!product) {
    throw new Error(`Product not found: ${input.productId}`);
  }

  // Determine tier
  const tier = getTierFromProduct(product, input.tierId);
  const tierPricing = getTierPricing(input.productId);

  // Get template based on compliance level
  const templateKey = product.complianceLevel;
  const template = COPY_TEMPLATES[templateKey] || COPY_TEMPLATES.starter;

  // Generate hero
  const hero = {
    headline: template.hero.headline.replace("{name}", product.name),
    subheadline: template.hero.subheadline,
    cta: template.hero.cta,
  };

  // Generate problem/solution
  const problem = {
    title: template.problem.title,
    points: template.problem.points,
  };

  const solution = {
    title: template.solution.title,
    benefits: template.solution.benefits,
  };

  // Generate pricing
  let pricing: CopyOutput["pricing"];
  
  if (tier?.custom) {
    pricing = {
      display: "Contact Sales",
      interval: "custom",
    };
  } else if (tierPricing.monthly && tierPricing.annual) {
    pricing = {
      display: tierPricing.monthly.display,
      interval: tierPricing.monthly.interval,
      savings: tierPricing.savingsPercent,
    };
  } else if (tier) {
    pricing = {
      display: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(tier.price / 100),
      interval: tier.interval,
    };
  } else {
    pricing = {
      display: "Free",
      interval: "month",
    };
  }

  // Generate FAQ
  const faq = generateFAQ(product);

  // Generate onboarding
  const onboarding = template.onboarding;

  return {
    hero,
    problem,
    solution,
    pricing,
    faq,
    onboarding,
  };
}

export function getCopyVariants(productId: string): CopyOutput[] {
  const product = getProductById(productId);
  
  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  // Generate copy for each tier
  return product.pricingTiers.map(tier => {
    return generateCopy({ productId, tierId: tier.id });
  });
}