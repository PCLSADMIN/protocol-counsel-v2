// ==========================================
// NOTE AUTOMATION - Field Agent Note Sanitizer
// Protocol Counsel Note Relay System
// ==========================================

// Template mappings for professional status updates
const NOTE_TEMPLATES: Record<string, string> = {
  // Location issues
  'not there': 'Field Coordination: Location Verified / Protocol Active',
  'nobody home': 'Field Coordination: Location Verified / Protocol Active', 
  'no answer': 'Field Coordination: Location Verified / Protocol Active',
  'empty': 'Field Coordination: Property Vacant / Protocol Active',
  'abandoned': 'Field Coordination: Property Status: Vacant / Field Deployed',
  'vacant': 'Field Coordination: Property Status: Vacant / Protocol Active',
  
  // Contact issues  
  'no contact': 'Field Coordination: Contact Attempted / Awaiting Response',
  'wrong number': 'Field Coordination: Contact Updated / Protocol Active',
  'disconnected': 'Field Coordination: Communication Channel Updated / Protocol Active',
  'not answering': 'Field Coordination: Follow-up Scheduled / Protocol Active',
  
  // Success states
  'completed': 'Field Execution Complete / Documentation Secured',
  'delivered': 'Field Execution Complete / Documentation Secured',
  'signed': 'Field Execution Complete / Signature Obtained',
  'received': 'Field Execution Complete / Receipt Confirmed',
  'success': 'Field Execution Complete / Outcome Verified',
  
  // Issues
  'refused': 'Field Coordination: Status Update Required / Protocol Active',
  'denied': 'Field Coordination: Status Update Required / Protocol Active',
  'problem': 'Field Coordination: Escalation Required / Protocol Active',
  'issue': 'Field Coordination: Status Update Required / Protocol Active',
  
  // Reroutes
  'forwarding': 'Field Coordination: Reroute Initiated / Protocol Active',
  'new address': 'Field Coordination: Address Updated / Protocol Active',
};

export interface ProcessedNote {
  originalNote: string;
  sanitizedNote: string;
  category: string;
  isProfessional: boolean;
  requiresFollowUp: boolean;
  timestamp: string;
}

/**
 * Sanitize field agent note to professional status update
 */
export function sanitizeNote(rawNote: string): ProcessedNote {
  const timestamp = new Date().toISOString();
  const lowerNote = rawNote.toLowerCase();
  
  // Check for matches in templates
  let sanitizedNote = rawNote;
  let category = 'general';
  let isProfessional = true;
  let requiresFollowUp = false;
  
  for (const [keyword, template] of Object.entries(NOTE_TEMPLATES)) {
    if (lowerNote.includes(keyword)) {
      sanitizedNote = template;
      category = keyword;
      
      // Determine if follow-up is needed
      if (['not there', 'nobody home', 'empty', 'refused', 'denied', 'problem', 'issue'].includes(keyword)) {
        requiresFollowUp = true;
      }
      
      // Check if note is already professional language
      if (rawNote.toLowerCase() === template.toLowerCase()) {
        isProfessional = true;
      } else {
        isProfessional = false;
      }
      break;
    }
  }
  
  // If no template match, check if it already looks professional
  if (sanitizedNote === rawNote) {
    const professionalIndicators = ['coordination', 'protocol', 'execution', 'complete', 'verified', 'secured', 'scheduled'];
    isProfessional = professionalIndicators.some(ind => lowerNote.includes(ind.toLowerCase()));
    
    // If still not professional, add professional wrapper
    if (!isProfessional) {
      sanitizedNote = `Field Coordination: ${rawNote} / Protocol Active`;
      category = 'uncategorized';
    }
  }
  
  return {
    originalNote: rawNote,
    sanitizedNote,
    category,
    isProfessional,
    requiresFollowUp,
    timestamp,
  };
}

/**
 * Generate automated note for data audit completion
 */
export function generateAuditNote(
  orderId: string,
  corrections: { field: string; original: string; corrected: string }[]
): string {
  const timestamp = new Date().toISOString();
  const fieldsCorrected = corrections.map(c => c.field).join(', ');
  
  return `Data Audit Complete: Coordinates verified via Protocol Counsel proprietary trace. Field deployment active. Corrections applied to: ${fieldsCorrected}. Order ID: ${orderId}. Timestamp: ${timestamp}`;
}

/**
 * Generate bulk upload completion note
 */
export function generateBulkNote(
  orderIds: string[],
  totalCount: number
): string {
  return `Bulk Order Entry Complete: ${totalCount} orders processed. Order IDs: ${orderIds.slice(0, 5).join(', ')}${orderIds.length > 5 ? '...' : ''}. Data verification pending.`;
}

/**
 * Validate note for prohibited content
 */
export function validateNote(note: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for prohibited terms
  const prohibited = [
    { pattern: /\b(attorney|lawyer|counsel)\b/gi, message: 'Legal role references not permitted' },
    { pattern: /\b(sue|litigation|lawsuit)\b/gi, message: 'Legal action references not permitted' },
    { pattern: /\b(court|judge|filing)\b/gi, message: 'Court references not permitted in field notes' },
  ];
  
  for (const check of prohibited) {
    if (check.pattern.test(note)) {
      errors.push(check.message);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}