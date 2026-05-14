# Protocol Counsel

Legal Operations Orchestration Platform - HIPAA-compliant medical records retrieval, skip tracing, and mobile notary services.

## Features

- **HIPAA-Compliant Medical Records Retrieval** - Secure chain of custody documentation with immutable audit trails
- **Skip Tracing** - Comprehensive database search for legal service
- **Mobile Notary** - 24/7 certified notary availability with real-time tracking
- **AI-Mediated Messaging** - Professional communication with automatic scheduling
- **Instant Support** - 24/7 access to intelligent orchestration

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Database**: PostgreSQL (via Supabase)
- **Payments**: Stripe
- **SMS**: Twilio
- **Compliance**: HIPAA, SOC 2 Type II

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

```bash
# Clone the repository
git clone https://github.com/PCLSADMIN/protocol-counsel-v2.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your environment variables in .env.local

# Run the development server
npm run dev
```

### Environment Variables

See `.env.example` for all required environment variables:

- `DATABASE_URL` - Supabase PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `STRIPE_SECRET_KEY` - Stripe API secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `NEXT_PUBLIC_SITE_URL` - Your site URL (e.g., https://protocolcounsel.com)

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Domain Setup

1. Add DNS records at your domain registrar:
   - `A` record: `@` → Vercel deployment IP
   - `CNAME` record: `www` → `cname.vercel-dns.com`

2. Configure custom domain in Vercel dashboard

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   └── portal/         # Client portal
├── core/               # Core business logic
├── lib/                # Utility libraries
│   ├── auth/          # Authentication
│   ├── billing/       # Billing & payments
│   └── ...            # Other utilities
└── agents/            # AI agent definitions
```

## License

Proprietary - All rights reserved