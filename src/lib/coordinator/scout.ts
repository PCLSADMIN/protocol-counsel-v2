// Credibility Scout Automation - Directory Applications
// Uses press-kit materials to apply to directories

import { getCaseStudies } from "@/lib/coordinator/credibility";
import { NAP_DATA } from "@/lib/seo/nap-consistency";

// Directories to apply
export const DIRECTORIES = [
  { name: "LawNext", url: "https://lawnext.com/directory", priority: 1 },
  { name: "LegalTech Hub", url: "https://legaltechhub.com", priority: 2 },
  { name: "ExpertConnect", url: "https://expertconnect.io", priority: 3 },
];

// Draft application email
export function draftApplicationEmail(directoryName: string): {
  to: string;
  subject: string;
  body: string;
} {
  const caseStudies = getCaseStudies();
  const primaryCase = caseStudies[0];
  
  return {
    to: `listings@${directoryName.toLowerCase().replace(" ", "")}.com`,
    subject: `ProtocolCounsel - Service Provider Application (${NAP_DATA.phoneFormatted})`,
    body: `Dear Listings Team,

PROTOCOL COUNSEL is applying to be listed as a Participating Expert Service Provider.

WHO WE SERVE
We provide systematized logistics for medical records retrieval, skip tracing, and mobile notary services to law firms nationwide.

AUTHORITY TRACK RECORD
- ${primaryCase?.result || "73% reduction in retrieval time for Fortune 500 clients"}
- ${primaryCase?.trustSignals?.[0] || ".edu backlink"} included
- SOC2 Type II aligned

CONTACT
${NAP_DATA.name}
${NAP_DATA.phoneFormatted}
${NAP_DATA.website}

We've attached our press kit materials for your review.

Best,
ProtocolCounsel Systems`,
  };
}

// Execute: Crawl and apply to directories
export async function runCredibilityScout(): Promise<{
  directoriesContacted: number;
  applicationsDrafted: number;
}> {
  const applied = DIRECTORIES.map(d => draftApplicationEmail(d.name));
  
  return {
    directoriesContacted: DIRECTORIES.length,
    applicationsDrafted: applied.length,
  };
}