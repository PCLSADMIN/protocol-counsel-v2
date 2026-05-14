// Supabase Row-Level Security (RLS) Policies
// NO Admin overrides - all data siloed by default

export const RLS_POLICIES = {
  orders: { select: "auth.jwt() ->> 'firm_id' = firm_id" },
  documents: { select: "auth.jwt() ->> 'firm_id' = firm_id" },
  transactions: { select: "auth.jwt() ->> 'firm_id' = firm_id" },
  trust_ledger: { select: "auth.jwt() ->> 'firm_id' = firm_id" },
};

export const ENFORCE_RLS = "FORCE ROW LEVEL SECURITY";

export function getRLSPolicy(table: keyof typeof RLS_POLICIES): string {
  return RLS_POLICIES[table]?.select || "false";
}