// ==========================================
// PRIME TRACERS - Address Verification API
// Protocol Counsel Skip-Trace Integration
// ==========================================

const PRIME_TRACERS_CONFIG = {
  apiUrl: process.env.PRIME_TRACERS_API_URL || 'https://api.primetracers.com/v2',
  apiKey: process.env.PRIME_TRACERS_API_KEY,
  batchUrl: process.env.PRIME_TRACERS_BATCH_URL || 'https://api.primetracers.com/v2/batch',
  costPerTrace: 0.03, // $0.03 per address/phone verification
};

export interface TraceRequest {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface TraceResult {
  verified: boolean;
  originalValue: string;
  correctedAddress?: string;
  correctedPhone?: string;
  deliverabilityScore?: number; // 0-100
  phoneType?: 'mobile' | 'landline' | 'voip' | 'unknown';
  phoneCarrier?: string;
  dateOfDeath?: string;
  associatedNames?: string[];
  riskIndicators?: string[];
  traceId: string;
  cost: number;
}

export interface BatchTraceResult {
  results: TraceResult[];
  totalCost: number;
  processedAt: string;
  orderId: string;
}

/**
 * Verify a single address/phone
 */
export async function verifyAddress(request: TraceRequest): Promise<TraceResult> {
  const { apiUrl, apiKey } = PRIME_TRACERS_CONFIG;
  
  if (!apiKey) {
    // Mock response for development
    return {
      verified: true,
      originalValue: request.address || request.phone || '',
      correctedAddress: request.address,
      deliverabilityScore: 95,
      traceId: `MOCK-${Date.now()}`,
      cost: PRIME_TRACERS_CONFIG.costPerTrace,
    };
  }

  const response = await fetch(`${apiUrl}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Prime Tracers API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    verified: data.deliverable || false,
    originalValue: request.address || '',
    correctedAddress: data.correctedAddress,
    deliverabilityScore: data.deliverabilityScore,
    traceId: data.traceId,
    cost: PRIME_TRACERS_CONFIG.costPerTrace,
  };
}

/**
 * Verify a phone number
 */
export async function verifyPhone(phone: string): Promise<TraceResult> {
  const { apiUrl, apiKey } = PRIME_TRACERS_CONFIG;
  
  if (!apiKey) {
    return {
      verified: true,
      originalValue: phone,
      phoneType: 'mobile',
      deliverabilityScore: 90,
      traceId: `MOCK-${Date.now()}`,
      cost: PRIME_TRACERS_CONFIG.costPerTrace,
    };
  }

  const response = await fetch(`${apiUrl}/phone/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ phone }),
  });

  if (!response.ok) {
    throw new Error(`Prime Tracers API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    verified: data.valid || false,
    originalValue: phone,
    phoneType: data.phoneType,
    phoneCarrier: data.carrier,
    traceId: data.traceId,
    cost: PRIME_TRACERS_CONFIG.costPerTrace,
  };
}

/**
 * Batch verification for bulk orders
 */
export async function batchVerify(
  requests: TraceRequest[],
  orderId: string
): Promise<BatchTraceResult> {
  const results: TraceResult[] = [];
  let totalCost = 0;

  for (const request of requests) {
    if (request.address || request.phone) {
      try {
        const result = request.address 
          ? await verifyAddress(request)
          : await verifyPhone(request.phone!);
        results.push(result);
        totalCost += result.cost;
      } catch (error) {
        console.error('Trace error:', error);
        // Continue with other requests
      }
    }
  }

  return {
    results,
    totalCost,
    processedAt: new Date().toISOString(),
    orderId,
  };
}

/**
 * Calculate total trace cost for billing
 */
export function calculateTraceCost(count: number): number {
  return count * PRIME_TRACERS_CONFIG.costPerTrace;
}