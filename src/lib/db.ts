import { supabase, supabaseAdmin, isSupabaseConfigured } from "./supabase";

export interface Order {
  id: string;
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  customer_email: string;
  amount_total: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown> | null;
}

export interface CreateOrderInput {
  stripe_session_id: string;
  stripe_payment_intent_id?: string | null;
  stripe_customer_id?: string | null;
  customer_email: string;
  amount_total: number;
  currency: string;
  metadata?: Record<string, unknown> | null;
}

// Database utility functions
export async function getOrders(limit = 50): Promise<Order[]> {
  if (!supabase) {
    throw new Error("Supabase client not configured");
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return (data as Order[]) || [];
}

export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  if (!supabase) {
    throw new Error("Supabase client not configured");
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .single();

  if (error) {
    if (error.code === "PGR_116") {
      // Not found
      return null;
    }
    console.error("Error fetching order by session ID:", error);
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return data as Order;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  if (!supabaseAdmin) {
    throw new Error("Supabase admin client not configured");
  }

  const orderData = {
    stripe_session_id: input.stripe_session_id,
    stripe_payment_intent_id: input.stripe_payment_intent_id || null,
    stripe_customer_id: input.stripe_customer_id || null,
    customer_email: input.customer_email,
    amount_total: input.amount_total,
    currency: input.currency,
    status: "pending" as const,
    metadata: input.metadata || null,
  };

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert(orderData)
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return data as Order;
}

export async function updateOrderStatus(
  sessionId: string,
  status: Order["status"],
  paymentIntentId?: string
): Promise<Order> {
  if (!supabaseAdmin) {
    throw new Error("Supabase admin client not configured");
  }

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (paymentIntentId) {
    updateData.stripe_payment_intent_id = paymentIntentId;
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .update(updateData)
    .eq("stripe_session_id", sessionId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error(`Failed to update order status: ${error.message}`);
  }

  return data as Order;
}

export async function completeOrder(
  sessionId: string,
  paymentIntentId: string
): Promise<Order> {
  return updateOrderStatus(sessionId, "completed", paymentIntentId);
}

export async function failOrder(sessionId: string): Promise<Order> {
  return updateOrderStatus(sessionId, "failed");
}

export async function refundOrder(sessionId: string): Promise<Order> {
  return updateOrderStatus(sessionId, "refunded");
}

// Health check
export async function checkDatabaseConnection(): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const { error } = await supabase!.from("orders").select("id").limit(1);
    return !error;
  } catch {
    return false;
  }
}

// SQL for creating the orders table (for reference/migration)
export const CREATE_ORDERS_SQL = `
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  customer_email VARCHAR(255) NOT NULL,
  amount_total INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'usd',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
`;