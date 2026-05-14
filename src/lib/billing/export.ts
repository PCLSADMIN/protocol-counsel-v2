// Billing Export - CSV/Excel generation for legal billing software
// Compatible with Clio, Litify, and other legal billing platforms

export interface BillingExportRow {
  // Firm's internal case reference
  internalCaseNumber: string;
  
  // Order identifiers
  orderId: string;
  orderNumber: string;
  
  // Service details
  serviceType: string;
  serviceDescription: string;
  
  // Financial breakdown (in dollars)
  wholesaleCost: number;
  orchestrationFee: number;
  markupAmount: number;
  markupPercent: number;
  shippingTechFee: number;
  processingFee: number;
  totalCharge: number;
  
  // Billing
  billingType: "IMMEDIATE" | "NET_15" | "NET_30";
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate?: Date;
  
  // Status
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  paidDate?: Date;
  
  // Metadata
  clientName?: string;
  matterReference?: string;
}

// Clio CSV format mapping
export function toClioFormat(orders: BillingExportRow[]): string {
  const headers = [
    "Matter_Reference",
    "Date",
    "Description",
    "Quantity",
    "Unit_Price",
    "Total_Amount",
    "Service_Type",
    "Invoice_Number",
    "Due_Date",
  ];
  
  const rows = orders.map(order => [
    order.matterReference || order.internalCaseNumber,
    formatDateForClio(order.invoiceDate),
    order.serviceDescription,
    "1",
    (order.totalCharge / 100).toFixed(2),
    (order.totalCharge / 100).toFixed(2),
    order.serviceType,
    order.invoiceNumber,
    order.dueDate ? formatDateForClio(order.dueDate) : "",
  ]);
  
  return [headers, ...rows].map(row => row.join(",")).join("\n");
}

// Litify CSV format mapping
export function toLitifyFormat(orders: BillingExportRow[]): string {
  const headers = [
    "Invoice Number",
    "Matter ID",
    "Client Name",
    "Service Date",
    "Description",
    "Amount",
    "Status",
    "Due Date",
  ];
  
  const rows = orders.map(order => [
    order.invoiceNumber,
    order.internalCaseNumber,
    order.clientName || "",
    formatDateForLitify(order.invoiceDate),
    order.serviceDescription,
    (order.totalCharge / 100).toFixed(2),
    order.paymentStatus,
    order.dueDate ? formatDateForLitify(order.dueDate) : "",
  ]);
  
  return [headers, ...rows].map(row => row.join(",")).join("\n");
}

// Ledger-compatible format (LEDES 1998B)
export function toLEDESFormat(orders: BillingExportRow[]): string {
  const lines: string[] = [];
  
  // Header
  lines.push("LEDES1998B");
  lines.push("FIRM|ProtocolCounsel||");
  lines.push("DATE|" + formatDateLEDES(new Date()) + "|");
  
  // Line items
  for (const order of orders) {
    const line = [
      "INV",
      order.invoiceNumber,
      formatDateLEDES(order.invoiceDate),
      order.matterReference || order.internalCaseNumber,
      order.serviceDescription,
      (order.totalCharge / 100).toFixed(2),
      order.billingType === "NET_30" ? "NET30" : "DUE",
    ].join("|");
    lines.push(line);
  }
  
  // Footer
  const total = orders.reduce((sum, o) => sum + o.totalCharge, 0) / 100;
  lines.push("TOT|" + total.toFixed(2) + "||");
  lines.push("END|");
  
  return lines.join("\n");
}

// Excel-compatible (tab-separated)
export function toExcelFormat(orders: BillingExportRow[]): string {
  const headers = [
    "Internal Case Number", "Order Number", "Service Type",
    "Wholesale Cost", "Orchestration Fee", "Markup",
    "Shipping Tech Fee", "Processing Fee", "Total",
    "Billing Type", "Status", "Invoice Date", "Due Date",
  ];
  
  const rows = orders.map(order => [
    order.internalCaseNumber,
    order.orderNumber,
    order.serviceType,
    (order.wholesaleCost / 100).toFixed(2),
    (order.orchestrationFee / 100).toFixed(2),
    (order.markupAmount / 100).toFixed(2) + ` (${order.markupPercent}%)`,
    (order.shippingTechFee / 100).toFixed(2),
    (order.processingFee / 100).toFixed(2),
    (order.totalCharge / 100).toFixed(2),
    order.billingType,
    order.paymentStatus,
    formatDateExcel(order.invoiceDate),
    order.dueDate ? formatDateExcel(order.dueDate) : "",
  ]);
  
  return [headers, ...rows].map(row => row.join("\t")).join("\n");
}

// Date formatters
function formatDateForClio(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatDateForLitify(date: Date): string {
  return date.toLocaleDateString("en-US");
}

function formatDateLEDES(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split("T")[0];
}

function formatDateExcel(date: Date): string {
  return date.toLocaleDateString("en-US");
}

// Export by format
export type ExportFormat = "clio" | "litify" | "ledes" | "excel";

export function generateExport(
  orders: BillingExportRow[],
  format: ExportFormat
): string {
  switch (format) {
    case "clio":
      return toClioFormat(orders);
    case "litify":
      return toLitifyFormat(orders);
    case "ledes":
      return toLEDESFormat(orders);
    case "excel":
      return toExcelFormat(orders);
    default:
      return toExcelFormat(orders);
  }
}

// Get filename
export function getExportFilename(
  firmName: string,
  format: ExportFormat,
  date: Date = new Date()
): string {
  const dateStr = date.toISOString().split("T")[0];
  const safeName = firmName.replace(/[^a-z0-9]/gi, "_");
  
  return `pc_billing_${safeName}_${dateStr}.${format === "ledes" ? "txt" : "csv"}`;
}