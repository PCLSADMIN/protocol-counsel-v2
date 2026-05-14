// JSON-LD Schema Markup - Machine Readable Authority
// Site as definitive "Legal Service Orchestrator"

import { Metadata } from "next";

export function generateLegalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ProtocolCounsel",
    "description": "Legal Operations Orchestration Platform - Systematized logistics for medical records retrieval, skip tracing, and mobile notary services.",
    "url": "https://protocolcounsel.com",
    "telephone": "+1-800-PROTOCOL",
    "email": "support@protocolcounsel.com",
    
    // Professional credentials
    "areaServed": "US",
    "serviceType": [
      "Medical Records Retrieval",
      "Skip Tracing", 
      "Mobile Notary",
      "Legal Process Service",
    ],
    
    // NAICS codes - Tech Services + Legal Support
    "naics": ["541519", "541199"],
    
    // Industry memberships
    "memberOf": [
      "American Bar Association",
      "Legal Technology Association",
      "National Association of Legal Professionals",
    ],
    
    // Verified sameAs (Authority Loop)
    "sameAs": [
      "https://lawnext.com/provider/protocolcounsel",
      "https://legaltechhub.com/services/protocolcounsel",
      "https://www.linkedin.com/company/protocolcounsel",
    ],
    
    // Trust signals
    "review": {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "4.9" },
      "bestRating": "5",
    },
    
    // Location
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
    },
  };
}

// Breadcrumb for navigation
export function generateBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

// FAQ Schema for AI Overviews
export function generateFAQSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer,
      },
    })),
  };
}

// Generate full page metadata
export function generatePageMetadata(title: string, description: string): Metadata {
  const schema = generateLegalServiceSchema();
  
  return {
    title: `${title} | ProtocolCounsel`,
    description,
    // @ts-expect-error - Next.js 14 metadata types
    structuredData: JSON.stringify(schema),
  };
}