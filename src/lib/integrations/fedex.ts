// ==========================================
// FEDEX DEVELOPER API Integration
// Protocol Counsel Shipping Integration
// Bill Recipient Logic
// ==========================================

const FEDEX_CONFIG = {
  apiUrl: process.env.FEDEX_API_URL || 'https://apis.fedex.com',
  accountNumber: process.env.FEDEX_ACCOUNT_NUMBER,
  apiKey: process.env.FEDEX_API_KEY,
  secretKey: process.env.FEDEX_SECRET_KEY,
  labeServiceFee: 4.00, // $4.00 FedEx tech fee per label
};

export interface ShipperAccount {
  accountNumber: string;
  companyName: string;
  billingAddress: string;
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface ShipmentRequest {
  sender: Address;
  recipient: Address;
  packageWeight: number;
  serviceType: 'PRIORITY_OVERNIGHT' | 'FEDEX_2_DAY' | 'FEDEX_EXPRESS_SAVER' | 'FEDEX_GROUND';
  reference: string;
}

export interface LabelResult {
  labelId: string;
  trackingNumber: string;
  labelUrl: string;
  shipDate: string;
  deliveryDate: string;
  cost: number;
  billedTo: string; // Account number
}

/**
 * Generate authentication token
 */
async function getAuthToken(): Promise<string> {
  const { apiUrl, apiKey, secretKey } = FEDEX_CONFIG;
  
  if (!apiKey) {
    return 'mock-token';
  }

  const response = await fetch(`${apiUrl}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`,
  });

  if (!response.ok) {
    throw new Error(`FedEx auth error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Create a shipment with Bill Recipient billing
 */
export async function createShipment(
  request: ShipmentRequest,
  billToAccount?: string
): Promise<LabelResult> {
  const token = await getAuthToken();
  const { apiUrl, accountNumber } = FEDEX_CONFIG;
  
  const billedAccount = billToAccount || accountNumber || '';
  
  if (!token || token === 'mock-token') {
    // Mock response for development
    return {
      labelId: `MOCK-LBL-${Date.now()}`,
      trackingNumber: `MOCK-${Math.random().toString(36).substring(7).toUpperCase()}`,
      labelUrl: 'https://example.com/label.pdf',
      shipDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      cost: FEDEX_CONFIG.labeServiceFee,
      billedTo: billedAccount,
    };
  }

  const response = await fetch(`${apiUrl}/ship/v1/labels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      labelResponseOptions: 'URL_ONLY',
      requestedShipment: {
        shipper: {
          contact: { companyName: 'Protocol Counsel' },
          address: request.sender,
        },
        recipient: {
          contact: { personName: 'Recipient' },
          address: request.recipient,
        },
        shippingCharges: {
          paymentType: 'THIRD_PARTY',
          billedParty: 'SHIPPER',
          billingCode: billedAccount,
        },
        labelSpecification: {
          labelFormatType: 'COMMON_2D',
          imageType: 'PDF',
        },
        requestedPackageLineItems: [
          {
            weight: { value: request.packageWeight, units: 'LB' },
          },
        ],
      },
      }),
  });

  if (!response.ok) {
    throw new Error(`FedEx shipment error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    labelId: data.output.printerId,
    trackingNumber: data.output.masterTrackingNumber,
    labelUrl: data.output.url,
    shipDate: data.output.shipDatestamp,
    deliveryDate: data.output.estimatedDelivery,
    cost: FEDEX_CONFIG.labeServiceFee,
    billedTo: billedAccount,
  };
}

/**
 * Track a shipment
 */
export async function trackShipment(trackingNumber: string): Promise<{
  status: string;
  location: string;
  estimatedDelivery: string;
}> {
  const token = await getAuthToken();
  const { apiUrl } = FEDEX_CONFIG;

  if (!token || token === 'mock-token') {
    return {
      status: 'IN_TRANSIT',
      location: 'Memphis, TN',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  const response = await fetch(
    `${apiUrl}/track/v1/trackingnumbers/${trackingNumber}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`FedEx track error: ${response.statusText}`);
  }

  const data = await response.json();
  const scan = data.output.completeTrackResults[0]?.scanEvents?.[0];
  return {
    status: scan?.scanStatus || 'UNKNOWN',
    location: scan?.scanLocation?.city || 'Unknown',
    estimatedDelivery: data.output.estimatedDeliveryWindow?.window,
  };
}

/**
 * Cancel a shipment
 */
export async function cancelShipment(labelId: string): Promise<boolean> {
  const token = await getAuthToken();
  const { apiUrl } = FEDEX_CONFIG;

  if (!token || token === 'mock-token') {
    return true;
  }

  const response = await fetch(`${apiUrl}/ship/v1/labels/${labelId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.ok;
}

/**
 * Get the tech fee amount
 */
export function getTechFee(): number {
  return FEDEX_CONFIG.labeServiceFee;
}