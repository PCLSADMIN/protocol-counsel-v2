// ==========================================
// ORDER TYPES - Type-safe order interfaces
// Protocol Counsel
// ==========================================

export interface OrderData {
  id: string;
  orderNumber: string;
  serviceType: string;
  recipientName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  priority?: 'standard' | 'rush' | 'expedited';
  status: OrderStatus;
  
  // Financial data - locked until audit
  servicePrice?: number;
  processingFee?: number;
  shippingFee?: number;
  finalInvoiceAmount?: number | null; // NULL until manual_audit_complete
  manualAuditComplete?: boolean; // SuperAdmin toggle
  
  // Coversheet auto-fill data
  firmAddress?: string;
  fedExAccount?: string;
  barNumber?: string;
  
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'new' 
  | 'processing' 
  | 'scheduled' 
  | 'dispatched' 
  | 'completed' 
  | 'archived';

// ==========================================
// USER TYPES - Portal roles
// ==========================================

export type PortalRole = 'superadmin' | 'firm_admin' | 'restricted_coordinator';

export interface PortalUser {
  id: string;
  email: string;
  role: PortalRole;
  firmId: string;
  name?: string;
  invitedBy?: string;
  inviteToken?: string;
  invitePending?: boolean;
  createdAt: string;
}

// ==========================================
// COVERSHEET STORAGE - LocalStorage & DB caching
// ==========================================

const COVERSHEET_KEY = 'protocol_counsel_coversheet';

export interface CoversheetDefaults {
  firmName?: string;
  firmAddress: string;
  firmCity: string;
  firmState: string;
  firmZip: string;
  fedExAccount: string;
  barNumber: string;
  defaultServiceType: string;
  defaultPriority: 'standard' | 'rush' | 'expedited';
  
  // Coversheet Contact Info
  publicContactNumber: string;
  firmRepName: string;
}

/**
 * Save coversheet defaults to localStorage
 */
export function saveCoversheetDefaults(defaults: CoversheetDefaults): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COVERSHEET_KEY, JSON.stringify(defaults));
}

/**
 * Load coversheet defaults from localStorage
 */
export function loadCoversheetDefaults(): CoversheetDefaults | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(COVERSHEET_KEY);
  return saved ? JSON.parse(saved) : null;
}

/**
 * Clear coversheet defaults
 */
export function clearCoversheetDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COVERSHEET_KEY);
}

// ==========================================
// QUICK QUANTITY - Generator for bulk orders
// ==========================================

export interface QuickQuantityOrder {
  serviceType: string;
  recipientName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  priority: 'standard' | 'rush' | 'expedited';
}

/**
 * Generate dynamic rows for Quick-Quantity selector
 */
export function generateQuickQuantityRows(
  count: number,
  defaults: CoversheetDefaults
): QuickQuantityOrder[] {
  const rows: QuickQuantityOrder[] = [];
  
  for (let i = 0; i < count; i++) {
    rows.push({
      serviceType: defaults.defaultServiceType,
      recipientName: '', // User fills this
      address: '',
      city: '',
      state: '',
      zip: '',
      priority: defaults.defaultPriority,
    });
  }
  
  return rows;
}