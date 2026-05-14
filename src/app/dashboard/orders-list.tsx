"use client";

import { useState } from "react";

interface Order {
  id: string;
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  customer_email: string;
  amount_total: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  created_at: string;
}

interface OrdersListProps {
  orders: Order[];
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusStyle(status: Order["status"]): {
  background: string;
  color: string;
} {
  switch (status) {
    case "completed":
      return { background: "#d4edda", color: "#155724" };
    case "pending":
      return { background: "#fff3cd", color: "#856404" };
    case "failed":
      return { background: "#f8d7da", color: "#721c24" };
    case "refunded":
      return { background: "#d6d8db", color: "#383d41" };
    default:
      return { background: "#e2e3e5", color: "#383d41" };
  }
}

export function OrdersList({ orders }: OrdersListProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const statusCounts = {
    all: orders.length,
    completed: orders.filter((o) => o.status === "completed").length,
    pending: orders.filter((o) => o.status === "pending").length,
    failed: orders.filter((o) => o.status === "failed").length,
    refunded: orders.filter((o) => o.status === "refunded").length,
  };

  return (
    <div>
      {/* Filter controls */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "0.5rem 1rem",
            background: filter === "all" ? "#0070f3" : "#f5f5f5",
            color: filter === "all" ? "white" : "#333",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          All ({statusCounts.all})
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "0.5rem 1rem",
            background: filter === "completed" ? "#28a745" : "#f5f5f5",
            color: filter === "completed" ? "white" : "#333",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Completed ({statusCounts.completed})
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{
            padding: "0.5rem 1rem",
            background: filter === "pending" ? "#ffc107" : "#f5f5f5",
            color: filter === "pending" ? "#333" : "#333",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Pending ({statusCounts.pending})
        </button>
        <button
          onClick={() => setFilter("failed")}
          style={{
            padding: "0.5rem 1rem",
            background: filter === "failed" ? "#dc3545" : "#f5f5f5",
            color: filter === "failed" ? "white" : "#333",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Failed ({statusCounts.failed})
        </button>
      </div>

      {/* Orders table */}
      {filteredOrders.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "#f9f9f9",
            borderRadius: "4px",
          }}
        >
          {orders.length === 0
            ? "No orders yet. Orders will appear here after successful Stripe checkouts."
            : "No orders match the selected filter."}
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Date
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "0.75rem", textAlign: "right", borderBottom: "2px solid #ddd" }}>
                Amount
              </th>
              <th style={{ padding: "0.75rem", textAlign: "center", borderBottom: "2px solid #ddd" }}>
                Status
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                Session ID
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                style={{
                  background: index % 2 === 0 ? "white" : "#fafafa",
                }}
              >
                <td style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
                  {formatDate(order.created_at)}
                </td>
                <td style={{ padding: "0.75rem", borderBottom: "1px solid #eee" }}>
                  {order.customer_email || "—"}
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    borderBottom: "1px solid #eee",
                    textAlign: "right",
                    fontFamily: "monospace",
                  }}
                >
                  {formatCurrency(order.amount_total, order.currency)}
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    borderBottom: "1px solid #eee",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      ...getStatusStyle(order.status),
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    borderBottom: "1px solid #eee",
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    color: "#666",
                  }}
                >
                  {order.stripe_session_id.slice(0, 20)}...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}