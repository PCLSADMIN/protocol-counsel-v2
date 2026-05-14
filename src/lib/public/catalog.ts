// Service Catalog - Public site catalog (Medical, Vital, Skip, Notary)
// Pricing hidden behind requiresAuth wall

import { 
  ServiceType, 
  BASE_RATES, 
  VOLUME_TIERS,
  calculateTieredPricing 
} from "@/lib/pricing/tiered";

export interface ServiceCatalogItem {
  id: ServiceType;
  name: string;
  description: string;
  category: ServiceCategory;
  requiresAuth: boolean;
  baseRate?: number;
}

export type ServiceCategory = 
  | "MEDICAL" 
  | "VITAL" 
  | "SKIP" 
  | "NOTARY";

// Public catalog - no pricing shown until auth
export const SERVICE_CATALOG: ServiceCatalogItem[] = [
  {
    id: "medical_records",
    name: "Medical Records Retrieval",
    description: "Request and retrieve medical records from healthcare providers nationwide. Digital API hits with secure chain of custody.",
    category: "MEDICAL",
    requiresAuth: true,
  },
  {
    id: "skip_trace",
    name: "Skip Trace",
    description: "Locate individuals for legal service, debt collection, or due diligence. Comprehensive database search.",
    category: "SKIP",
    requiresAuth: true,
  },
  {
    id: "mobile_notary",
    name: "Mobile Notary",
    description: "Certified notaries available for on-site document execution. Available 24/7 for urgent matters.",
    category: "NOTARY",
    requiresAuth: true,
  },
];

// All services with prices (for authenticated users only)
export function getAuthenticatedPricing(): ServiceCatalogItem[] {
  return SERVICE_CATALOG.map(item => {
    if (item.id === "skip_trace") {
      return { ...item, baseRate: BASE_RATES.skip_trace.baseRate };
    }
    if (item.id === "mobile_notary") {
      return { ...item, baseRate: BASE_RATES.mobile_notary.baseRate };
    }
    if (item.id === "medical_records") {
      return { ...item, baseRate: BASE_RATES.medical_records.baseRate };
    }
    return item;
  });
}

export function getServiceById(id: ServiceType): ServiceCatalogItem | undefined {
  return SERVICE_CATALOG.find(item => item.id === id);
}

export function getServicesByCategory(category: ServiceCategory): ServiceCatalogItem[] {
  return SERVICE_CATALOG.filter(item => item.category === category);
}

export function hasPricing(serviceId: ServiceType, isAuthenticated: boolean): boolean {
  const service = getServiceById(serviceId);
  if (!service) return false;
  return !service.requiresAuth || isAuthenticated;
}