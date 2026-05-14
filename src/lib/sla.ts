// Service Level Agreement (SLA) Routing
// Order cut-off and next-day defaults

export const ORDER_CUTOFF_HOUR = 12; // 12:00 PM EST
export const CUTOFF_TIMEZONE = "America/New_York";

export type ServiceLevel = "SAME_DAY" | "NEXT_DAY" | "SCHEDULED";

export interface SLAResult {
  serviceLevel: ServiceLevel;
  estimatedExecutionWindow: string;
  cutoffPassed: boolean;
  message: string;
}

// Check if order is before cut-off
export function isBeforeCutoff(orderTime: Date): boolean {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CUTOFF_TIMEZONE,
    hour: "numeric",
    hour12: false,
  });
  
  const hourStr = formatter.format(orderTime);
  const hour = parseInt(hourStr, 10);
  
  return hour < ORDER_CUTOFF_HOUR;
}

// Get service level based on order time
export function getServiceLevel(orderTime: Date): SLAResult {
  const beforeCutoff = isBeforeCutoff(orderTime);
  
  if (beforeCutoff) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: CUTOFF_TIMEZONE,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    
    return {
      serviceLevel: "SAME_DAY",
      estimatedExecutionWindow: `Same-Day Priority: Today by ${formatter.format(orderTime)}`,
      cutoffPassed: false,
      message: "Order received. Same-Day Priority - Will be processed today.",
    };
  }
  
  // Next day
  const nextDay = new Date(orderTime);
  nextDay.setDate(nextDay.getDate() + 1);
  
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CUTOFF_TIMEZONE,
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  
  return {
    serviceLevel: "NEXT_DAY",
    estimatedExecutionWindow: `Next-Day Service: Tomorrow by ${formatter.format(nextDay)}`,
    cutoffPassed: true,
    message: "Order received. Next-Day Service - Scheduled for tomorrow.",
  };
}

// Format execution window for portal display
export function getExecutionWindowDisplay(serviceLevel: ServiceLevel, orderTime: Date): string {
  const result = getServiceLevel(orderTime);
  return result.estimatedExecutionWindow;
}