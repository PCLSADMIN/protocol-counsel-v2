// NAP Consistency - Name, Address, Phone formatting
// Critical for AI citation consensus

export const NAP_DATA = {
  name: "ProtocolCounsel",
  legalName: "ProtocolCounsel LLC",
  address: "123 Legal Plaza, Suite 400, New York, NY 10001",
  phone: "+1-800-PROTOCOL",
  phoneFormatted: "(800) 776-8329",
  email: "support@protocolcounsel.com",
  website: "https://protocolcounsel.com",
};

// Format phone identically across all pages
export function formatPhone(phone: string): string {
  return NAP_DATA.phoneFormatted;
}

// Get complete NAP for directory submissions
export function getNAP(): {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
} {
  return {
    name: NAP_DATA.name,
    address: NAP_DATA.address,
    phone: NAP_DATA.phoneFormatted,
    email: NAP_DATA.email,
    website: NAP_DATA.website,
  };
}

// Validate NAP consistency
export function validateNAP(data: {
  name?: string;
  address?: string;
  phone?: string;
}): { consistent: boolean; mismatches: string[] } {
  const mismatches: string[] = [];
  
  if (data.name && data.name !== NAP_DATA.name && data.name !== NAP_DATA.legalName) {
    mismatches.push(`Name: found "${data.name}", expected "${NAP_DATA.name}"`);
  }
  if (data.phone && data.phone !== NAP_DATA.phoneFormatted && data.phone !== NAP_DATA.phone) {
    mismatches.push(`Phone: found "${data.phone}", expected "${NAP_DATA.phoneFormatted}"`);
  }
  
  return {
    consistent: mismatches.length === 0,
    mismatches,
  };
}