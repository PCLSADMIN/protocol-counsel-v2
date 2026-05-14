import { Metadata } from "next";
import { getOrders, checkDatabaseConnection, Order } from "@/lib/db";
import { isStripeConfigured } from "@/lib/stripe";
import { OrdersList } from "./orders-list";

export const metadata: Metadata = {
  title: "Dashboard - Protocol Counsel",
  description: "Order management dashboard",
};

async function getData(): Promise<{
  orders: Order[];
  connected: boolean;
  stripeConfigured: boolean;
}> {
  const stripeConfigured = isStripeConfigured();
  const dbConnected = await checkDatabaseConnection();

  let orders: Order[] = [];

  if (dbConnected) {
    try {
      orders = await getOrders(50);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }

  return {
    orders,
    connected: dbConnected,
    stripeConfigured,
  };
}

export default async function DashboardPage() {
  const { orders, connected, stripeConfigured } = await getData();

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Protocol Counsel Dashboard
        </h1>
        <p style={{ color: "#666" }}>Order management and analytics</p>
      </header>

      {/* Status indicators */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            padding: "0.75rem 1rem",
            background: connected ? "#d4edda" : "#f8d7da",
            border: `1px solid ${connected ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "4px",
          }}
        >
          <strong>Database:</strong> {connected ? " Connected" : " Not Connected"}
        </div>
        <div
          style={{
            padding: "0.75rem 1rem",
            background: stripeConfigured ? "#d4edda" : "#f8d7da",
            border: `1px solid ${stripeConfigured ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "4px",
          }}
        >
          <strong>Stripe:</strong> {stripeConfigured ? " Configured" : " Not Configured"}
        </div>
      </div>

      {/* Orders table */}
      <OrdersList orders={orders} />
    </div>
  );
}