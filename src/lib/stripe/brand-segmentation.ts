// Stripe Brand Segmentation - Isolate Protocol Counsel

export const STRIPE_CONFIG = {
  statementDescriptor: "PROTOCOL COUNSEL",
  shortenedDescriptor: "PCLAW",
  businessProfile: {
    name: "ProtocolCounsel",
    phone: "+1-800-776-8329",
    address: "123 Legal Plaza, Suite 400, Henderson, NV 89011",
    website: "https://protocolcounsel.com",
    email: "support@protocolcounsel.com",
  },
};

export function getBrandedDescriptor() { return STRIPE_CONFIG.statementDescriptor; }
export function getShortenedDescriptor() { return STRIPE_CONFIG.shortenedDescriptor; }