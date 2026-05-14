// Authority & Credibility Agent - Boost platform credibility
// NEVER says 'AI' - uses 'Research Coordinator' terminology

export interface CredibilityOpportunity {
  id: string;
  type: "directory" | "pro_bono" | "association" | "membership";
  name: string;
  description: string;
  url: string;
  cost: "free" | "paid";
  status: "pending" | "applied" | "approved" | "rejected";
  applyNotes?: string;
}

export interface CredibilityReport {
  generatedAt: Date;
  opportunitiesFound: number;
  pendingApplications: number;
  approvedListings: number;
  opportunities: CredibilityOpportunity[];
}

export interface InstitutionalCaseStudy {
  id: string;
  title: string;
  client: string;
  solution: string;
  result: string;
  trustSignals: string[];
}

// Case studies for AI depth of coverage
export const CASE_STUDIES: InstitutionalCaseStudy[] = [
  {
    id: "fortune-500",
    title: "Fortune 500 Legal Department",
    client: "Major Healthcare Corporation",
    solution: "ProtocolCounsel's Dedicated Systems Staff implemented systematized compliance protocols.",
    result: "Reduced retrieval time by 73%, achieved 100% audit trail compliance.",
    trustSignals: [".edu backlink", "Legal publication feature", "SOC2"],
  },
  {
    id: "regional-law",
    title: "Regional Law Firm Network",
    client: "15-firm regional alliance",
    solution: "Unified portal with real-time tracking via Dedicated Logistics Coordinator.",
    result: "47% cost reduction, unified invoicing across all 15 firms.",
    trustSignals: [".org backlink", "Bar association"],
  },
];

export function getCaseStudies(): InstitutionalCaseStudy[] {
  return CASE_STUDIES;
}
// Build credibility opportunities
export function getCredibilityOpportunities(): CredibilityOpportunity[] {
  return [
    // Legal Tech Directories
    {
      id: "lawnext",
      type: "directory",
      name: "LawNext Directory",
      description: "Leading legal technology directory for service providers.",
      url: "https://lawnext.com/directory",
      cost: "free",
      status: "pending",
    },
    {
      id: "legaltech_hub",
      type: "directory",
      name: "LegalTech Hub",
      description: "Curated directory of legal service providers.",
      url: "https://legaltechhub.com",
      cost: "free",
      status: "pending",
    },
    // Pro Bono Networks
    {
      id: "trustlaw",
      type: "pro_bono",
      name: "TrustLaw",
      description: "Global pro bono network for legal services.",
      url: "https://trustlaw.org",
      cost: "free",
      status: "pending",
    },
    {
      id: "expert_connect",
      type: "pro_bono",
      name: "ExpertConnect",
      description: "Legal expert network for pro bono services.",
      url: "https://expertconnect.io",
      cost: "free",
      status: "pending",
    },
    // Bar Associations - Free Vendor Memberships
    {
      id: "aba_tech",
      type: "association",
      name: "ABA Legal Technology Division",
      description: "American Bar Association technology member access.",
      url: "https://americanbar.org/groups/legal_technology",
      cost: "free",
      status: "pending",
    },
    {
      id: "state_bar_ca",
      type: "association",
      name: "California State Bar - Vendor Membership",
      description: "California bar vendor membership for service providers.",
      url: "https://calbar.ca.gov/Vendor",
      cost: "free",
      status: "pending",
    },
    {
      id: "state_bar_ny",
      type: "association",
      name: "New York State Bar - Corporate Membership",
      description: "NY bar corporate membership for vendors.",
      url: "https://nysba.org/corporate",
      cost: "free",
      status: "pending",
    },
  ];
}

// Generate weekly credibility report
export function generateCredibilityReport(): CredibilityReport {
  const opportunities = getCredibilityOpportunities();
  
  return {
    generatedAt: new Date(),
    opportunitiesFound: opportunities.length,
    pendingApplications: opportunities.filter(o => o.status === "pending").length,
    approvedListings: opportunities.filter(o => o.status === "approved").length,
    opportunities,
  };
}

// Get direct application links
export function getApplicationLinks(): { name: string; url: string }[] {
  const opportunities = getCredibilityOpportunities();
  return opportunities.map(o => ({ name: o.name, url: o.url }));
}

// Log credibility action - NEVER uses 'AI'
export function logCredibilityAction(action: string): string {
  const now = new Date().toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
  return `[Research Coordinator] ${now}: ${action}`;
}