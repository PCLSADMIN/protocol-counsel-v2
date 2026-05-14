// Stripe Integration Layer - syncs products and subscriptions with Stripe

import Stripe from "stripe";
import { getAllProducts, getProductPrice } from "../core/pricing-engine";
import {
  getProductById,
  ProductRoute,
} from "../core/product-router";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripeClient = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    })
  : null;

export function isStripeConfigured(): boolean {
  return !!stripeSecretKey;
}

// Product mapping cache
const productPriceCache: Map<string, string> = new Map();

export interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
}

export interface StripePrice {
  id: string;
  product: string;
  unitAmount: number | null;
  currency: string;
  recurring: { interval: "month" | "year" } | null;
  active: boolean;
}

export async function syncProductToStripe(
  product: ProductRoute
): Promise<Stripe.Product> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  // Create product in Stripe
  const stripeProduct = await stripeClient.products.create({
    name: product.name,
    description: product.description,
    metadata: {
      product_id: product.productId,
      slug: product.slug,
      compliance_level: product.complianceLevel,
    },
  });

  // Create prices for each tier
  for (const tier of product.pricingTiers) {
    if (tier.custom) continue; // Skip custom pricing

    await stripeClient.prices.create({
      product: stripeProduct.id,
      unit_amount: tier.price,
      currency: "usd",
      recurring: {
        interval: tier.interval,
      },
      metadata: {
        product_id: product.productId,
        tier_id: tier.id,
      },
    });
  }

  return stripeProduct;
}

export async function syncProductPrices(
  productId: string,
  stripeProductId: string
): Promise<Stripe.Price[]> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const productRoute = getProductById(productId);
  if (!productRoute) {
    throw new Error(`Product not found: ${productId}`);
  }

  const prices: Stripe.Price[] = [];

  // Get existing prices
  const existingPrices = await stripeClient.prices.list({
    product: stripeProductId,
    active: true,
  });

  // Update or create prices
  for (const tier of productRoute.pricingTiers) {
    if (tier.custom) continue;

    const existing = existingPrices.data.find(
      (p) => p.recurring?.interval === tier.interval
    );

    if (existing && existing.unit_amount !== tier.price) {
      // Deactivate old price
      await stripeClient.prices.update(existing.id, { active: false });

      // Create new price
      const newPrice = await stripeClient.prices.create({
        product: stripeProductId,
        unit_amount: tier.price,
        currency: "usd",
        recurring: {
          interval: tier.interval,
        },
        metadata: {
          product_id: productId,
          tier_id: tier.id,
        },
      });

      prices.push(newPrice);
    } else if (existing) {
      prices.push(existing);
    }
  }

  return prices;
}

export async function getStripeProduct(
  productId: string
): Promise<Stripe.Product | null> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const products = await stripeClient.products.list();
  // Find product by metadata.product_id
  return products.data.find(p => p.metadata?.product_id === productId) || null;
}

export async function getStripePrices(
  productId: string
): Promise<Stripe.Price[]> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const stripeProduct = await getStripeProduct(productId);
  if (!stripeProduct) {
    return [];
  }

  const prices = await stripeClient.prices.list({
    product: stripeProduct.id,
    active: true,
  });

  return prices.data;
}

export async function createCheckoutSessionForProduct(
  productId: string,
  tierId: string,
  options: {
    customerEmail?: string;
    successUrl: string;
    cancelUrl: string;
  }
): Promise<{ sessionId: string; url: string }> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const productRoute = getProductById(productId);
  if (!productRoute) {
    throw new Error(`Product not found: ${productId}`);
  }

  const tier = productRoute.pricingTiers.find((t) => t.id === tierId);
  if (!tier) {
    throw new Error(`Tier not found: ${tierId}`);
  }

  const prices = await getStripePrices(productId);
  const price = prices.find(
    (p) => p.recurring?.interval === tier.interval
  );

  if (!price) {
    throw new Error(`Price not found for tier: ${tierId}`);
  }

  const session = await stripeClient.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    customer_email: options.customerEmail,
    success_url: options.successUrl,
    cancel_url: options.cancelUrl,
    metadata: {
      product_id: productId,
      tier_id: tierId,
    },
  });

  return {
    sessionId: session.id,
    url: session.url!,
  };
}

export async function cancelSubscription(
  subscriptionId: string,
  cancelAtPeriodEnd = true
): Promise<Stripe.Subscription> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  return stripeClient.subscriptions.update(subscriptionId, {
    cancel_at_period_end: cancelAtPeriodEnd,
  });
}

export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const subscription = await stripeClient.subscriptions.retrieve(
    subscriptionId
  );

  return stripeClient.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: "create_prorations",
  });
}