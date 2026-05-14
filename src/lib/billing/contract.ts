// Contract System - manages subscription contracts (12/24/36 month)

export const CONTRACT_TERMS = [12, 24, 36] as const;
export type ContractTerm = typeof CONTRACT_TERMS[number];

export interface ContractPricing {
  term: ContractTerm;
  monthlyRate: number; // whole dollars
  totalAnnual: number;
  savings: number; // vs month-to-month
}

// Calculate contract pricing (whole dollars only)
export function getContractPricing(term: ContractTerm, baseMonthlyRate: number): ContractPricing {
  const totalContract = baseMonthlyRate * term;
  const monthToMonthAnnual = baseMonthlyRate * 12;
  const totalAnnual = Math.round(totalContract / (term / 12));
  
  const savings = monthToMonthAnnual - totalAnnual;

  return {
    term,
    monthlyRate: Math.round(baseMonthlyRate * (1 - savings / monthToMonthAnnual)),
    totalAnnual,
    savings,
  };
}

// Apply contract term to Stripe metadata
export function getContractMetadata(term: ContractTerm): Record<string, string> {
  return {
    contract_term: term.toString(),
    billing_cycle: "monthly",
  };
}

// Get contract end date
export function getContractEndDate(startDate: Date, term: ContractTerm): Date {
  const end = new Date(startDate);
  end.setMonth(end.getMonth() + term);
  return end;
}

// Check if contract is active
export function isContractActive(contract: { status: string; endDate?: Date | null }): boolean {
  if (contract.status !== "ACTIVE") return false;
  if (!contract.endDate) return true;
  return new Date() < contract.endDate;
}