# Stripe Manager Agent

## Role
Manages Stripe integrations including product sync, subscription management, and webhook processing.

## Responsibilities

### Product Sync
- Sync products from local catalog to Stripe
- Create/update Stripe prices for each tier
- Map local product IDs to Stripe Price IDs

### Subscription Sync
- Monitor subscription lifecycle events
- Update local database on subscription changes
- Handle trial conversions

### Webhook Processing
- Process Stripe webhooks securely
- Verify signature before processing
- Update local state based on events

## Configuration

```typescript
interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
  products: ProductMapping[];
}
```

## Event Handling

| Stripe Event | Local Action |
|--------------|--------------|
| `checkout.session.completed` | Mark order complete |
| `customer.subscription.created` | Create subscription |
| `customer.subscription.updated` | Update subscription |
| `customer.subscription.deleted` | Cancel subscription |
| `invoice.paid` | Record payment |
| `invoice.payment_failed` | Handle failure |

## Commands

- `/sync:products` - Sync all products to Stripe
- `/sync:prices` - Sync prices for all products
- `/verify:webhook <payload>` - Verify webhook payload
- `/status` - Show integration status