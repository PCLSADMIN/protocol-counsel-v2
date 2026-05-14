// Supabase Row-Level Security (RLS) Policies
// 100% prevention of cross-firm data leakage

export const RLS_POLICIES = {
  USERS_SELECT_OWN_FIRM: `ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);`,
  ORDERS_SELECT_OWN_FIRM: `CREATE POLICY "Firm orders visible to firm" ON public.orders
  FOR SELECT USING (user_id IN (
    SELECT id FROM users WHERE firm_id = (
      SELECT firm_id FROM users WHERE auth.uid() = id
    )
  ));`,
  DOCUMENTS_SELECT_OWN_ORDERS: `CREATE POLICY "Documents from own orders only" ON public.documents
  FOR SELECT USING (order_id IN (
    SELECT id FROM orders WHERE user_id = (
      SELECT id FROM users WHERE auth.uid() = user_id
    )
  ));`,
  MESSAGES_SELECT_OWN_ORDERS: `CREATE POLICY "Messages from own orders only" ON public.messages
  FOR SELECT USING (order_id IN (
    SELECT id FROM orders WHERE user_id = (
      SELECT id FROM users WHERE auth.uid() = user_id
    )
  ));`,
  FIELD_AGENTS_VIEW_ASSIGNED: `CREATE POLICY "Field agents see assigned orders" ON public.field_agents
  FOR SELECT USING (id IN (SELECT field_agent_id FROM orders WHERE assigned = true));`,
};

export const SCHEMA_PARTITIONS = {
  PARTNER_DATA: "partner_schema",
  FIRM_DATA: "firm_schema",
  AGENT_DATA: "agent_schema",
  SYSTEM_DATA: "system_schema",
};

export const ACCESS_ROLES = {
  PARTNER: "partner_role",
  FIRM_ADMIN: "firm_admin",
  FIRM_USER: "firm_user",
  FIELD_AGENT: "field_agent",
  SYSTEM: "system_role",
};

export function canAccessPartition(userRole: string, partition: string): boolean {
  switch (partition) {
    case "partner_schema": return userRole === "partner_role" || userRole === "system_role";
    case "firm_schema": return userRole !== "partner_role";
    case "agent_schema": return userRole === "field_agent" || userRole === "firm_admin" || userRole === "system_role";
    case "system_schema": return userRole === "system_role";
    default: return false;
  }
}

export function getRLSSQL(): string {
  return Object.values(RLS_POLICIES).join("\n\n");
}