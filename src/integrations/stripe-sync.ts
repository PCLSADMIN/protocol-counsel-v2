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
      apiVersion: "2025-04-30.basil",
      typescript: true,
    })
  : null;

export function isStripeConfigured(): boolean {
  return !!stripeSecretKey;
}

// Product mapping cache
const productPriceCache: Map<string, string> = new Map();

interface StripeProduct {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

interface StripePrice {
  id: string;
  product: string;
  unitAmount: number;
  currency: string;
  recurring: { interval: "month" | "year" } | null;
  active: boolean;
}

export async function syncProductToStripe(
  product: ProductRoute
): Promise<StripeProduct> {
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
      unitAmount: tier.price,
      currency: "usd",
      recurring: {
        interval: tier.interval as "month" | "year",
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
): Promise<StripePrice[]> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const productRoute = getProductById(productId);
  if (!productRoute) {
    throw new Error(`Product not found: ${productId}`);
  }

  const prices: StripePrice[] = [];

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

    if (existing && existing.unitAmount !== tier.price) {
      // Deactivate old price
      await stripeClient.prices.update(existing.id, { active: false });

      // Create new price
      const newPrice = await stripeClient.prices.create({
        product: stripeProductId,
        unitAmount: tier.price,
        currency: "usd",
        recurring: {
          interval: tier.interval as "month" | "year",
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
): Promise<StripeProduct | null> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const products = await stripeClient.products.list({
    metadata: { product_id: productId },
    limit: 1,
  });

  return products.data[0] || null;
}

export async function getStripePrices(
  productId: string
): Promise<StripePrice[]> {
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
    paymentMethodTypes: ["card"],
    lineItems: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    customerEmail: options.customerEmail,
    successUrl: options.successUrl,
    cancelUrl: options.cancelUrl,
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
): Promise<void> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  await stripeClient.subscriptions.update(subscriptionId, {
    cancelAtPeriodEnd,
  });
}

export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<void> {
  if (!stripeClient) {
    throw new Error("Stripe not configured");
  }

  const subscription = await stripeClient.subscriptions.retrieve(
    subscriptionId
  );

  await stripeClient.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    prorationBehavior: "create_prorations",
  });
}