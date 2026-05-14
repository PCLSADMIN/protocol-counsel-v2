// Compliance Layer - handles regulatory requirements

export type ComplianceLevel = "standard" | "premium" | "enterprise";

export interface ComplianceRule {
  id: string;
  name: string;
  level: ComplianceLevel;
  requirement: string;
 enabled: boolean;
}

export interface ComplianceCheck {
  passed: boolean;
  rule: ComplianceRule;
  message?: string;
}

export interface ComplianceResult {
  passed: boolean;
  level: ComplianceLevel;
  checks: ComplianceCheck[];
  blocked: boolean;
  message?: string;
}

// Compliance rules by level
const COMPLIANCE_RULES: ComplianceRule[] = [
  // Standard level
  {
    id: "data-encryption",
    name: "Data Encryption",
    level: "standard",
    requirement: "All data must be encrypted at rest and in transit",
    enabled: true,
  },
  {
    id: "basic-audit",
    name: "Basic Audit Logging",
    level: "standard",
    requirement: "Maintain audit logs for 90 days",
    enabled: true,
  },
  // Premium level
  {
    id: "gdpr-compliant",
    name: "GDPR Compliance",
    level: "premium",
    requirement: "Full GDPR data subject rights implementation",
    enabled: true,
  },
  {
    id: "soc2-type2",
    name: "SOC 2 Type II",
    level: "premium",
    requirement: "Annual SOC 2 Type II audit",
    enabled: true,
  },
  // Enterprise level
  {
    id: "hipaa-ready",
    name: "HIPAA Ready",
    level: "enterprise",
    requirement: "HIPAA Business Associate Agreement support",
    enabled: true,
  },
  {
    id: "fedramp-moderate",
    name: "FedRAMP Moderate",
    level: "enterprise",
    requirement: "FedRAMP Moderate authorization",
    enabled: true,
  },
  {
    id: "custom-dpa",
    name: "Custom DPA",
    level: "enterprise",
    requirement: "Custom Data Processing Agreement",
    enabled: true,
  },
];

export function getComplianceRules(level: ComplianceLevel): ComplianceRule[] {
  return COMPLIANCE_RULES.filter((rule) => level === "standard" || rule.level === level);
}

export function runComplianceCheck(
  level: ComplianceLevel,
  context: {
    userId?: string;
    organizationId?: string;
    dataTypes?: string[];
  }
): ComplianceResult {
  const rules = getComplianceRules(level);
  const checks: ComplianceCheck[] = [];

  for (const rule of rules) {
    // Simple check - in production, this would verify actual compliance
    const passed = true; // Simplified for MVP

    checks.push({
      passed,
      rule,
      message: passed ? undefined : `Failed: ${rule.requirement}`,
    });
  }

  const allPassed = checks.every((c) => c.passed);

  return {
    passed: allPassed,
    level,
    checks,
    blocked: !allPassed,
    message: allPassed ? undefined : "Compliance checks failed",
  };
}

export function canAccessFeature(
  userLevel: ComplianceLevel,
  featureLevel: ComplianceLevel
): boolean {
  const levels: ComplianceLevel[] = ["standard", "premium", "enterprise"];
  const userIndex = levels.indexOf(userLevel);
  const featureIndex = levels.indexOf(featureLevel);

  return userIndex >= featureIndex;
}

export function requiresCompliance(
  requiredLevel: ComplianceLevel,
  currentLevel: ComplianceLevel
): boolean {
  if (requiredLevel === "standard") return false;
  if (requiredLevel === "premium") return currentLevel === "enterprise";
  return currentLevel !== "enterprise"; // enterprise requires enterprise
}

export function getNextComplianceLevel(currentLevel: ComplianceLevel): ComplianceLevel | null {
  const levels: ComplianceLevel[] = ["standard", "premium", "enterprise"];
  const currentIndex = levels.indexOf(currentLevel);

  if (currentIndex >= levels.length - 1) {
    return null; // Already at highest level
  }

  return levels[currentIndex + 1];
}