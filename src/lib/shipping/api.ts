// Shipping API Integration - EasyPost/Shippo for return labels

export const SHIPPING_TECH_FEE = 4.00;

export type Carrier = "FEDEX" | "UPS" | "DHL";

export interface ShippingCredentials {
  fedex?: string;
  ups?: string;
  dhl?: string;
}

export interface ShipFrom {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface ShipTo {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface LabelRequest {
  carrier: Carrier;
  service: string;
  shipFrom: ShipFrom;
  shipTo: ShipTo;
  returnLabel: boolean;
}

export interface LabelResponse {
  labelId: string;
  labelUrl: string;
  trackingNumber: string;
  carrier: Carrier;
  service: string;
  techFee: number;
  totalCost: number;
}

// Generate return label (mock for MVP)
export async function generateReturnLabel(
  credentials: ShippingCredentials,
  request: LabelRequest
): Promise<LabelResponse> {
  const labelId = generateLabelId();
  const baseCost = getCarrierRate(request.carrier, request.service);
  const techFee = SHIPPING_TECH_FEE;
  const totalCost = baseCost + techFee;
  const labelUrl = `https://ship.easypost.com/${labelId}`;
  const trackingNumber = generateTrackingNumber(request.carrier);

  return {
    labelId,
    labelUrl,
    trackingNumber,
    carrier: request.carrier,
    service: request.service,
    techFee,
    totalCost,
  };
}

function getCarrierRate(carrier: Carrier, service: string): number {
  const rates: Record<Carrier, Record<string, number>> = {
    FEDEX: { "PRIORITY_OVERNIGHT": 45.99, "FEDEX_2_DAY": 29.99, "FEDEX_GROUND": 12.99, "EXPRESS_SAVER": 24.99 },
    UPS: { "NEXT_DAY_AIR": 42.99, "2ND_DAY_AIR": 28.99, "GROUND": 11.99, "3DAY_SELECT": 22.99 },
    DHL: { "EXPRESS": 35.99, "EXPRESS_PLUS": 55.99, "ECONOMY": 18.99 },
  };
  return rates[carrier]?.[service] || 19.99;
}

export function getCarrierServices(carrier: Carrier): string[] {
  const services: Record<Carrier, string[]> = {
    FEDEX: ["PRIORITY_OVERNIGHT", "FEDEX_2_DAY", "FEDEX_GROUND", "EXPRESS_SAVER"],
    UPS: ["NEXT_DAY_AIR", "2ND_DAY_AIR", "GROUND", "3DAY_SELECT"],
    DHL: ["EXPRESS", "EXPRESS_PLUS", "ECONOMY"],
  };
  return services[carrier] || [];
}

export function hasValidCredentials(credentials: ShippingCredentials, carrier: Carrier): boolean {
  switch (carrier) {
    case "FEDEX": return !!credentials.fedex;
    case "UPS": return !!credentials.ups;
    case "DHL": return !!credentials.dhl;
    default: return false;
  }
}

function generateLabelId(): string {
  return `lbl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateTrackingNumber(carrier: Carrier): string {
  const prefix = { FEDEX: "7489", UPS: "1Z", DHL: "JD0" }[carrier];
  const number = Math.random().toString().substr(2, 12).padStart(12, "0");
  return `${prefix}${number}`;
}