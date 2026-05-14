// Time Zone Detection + Quiet Hours Logic
// Detect signer local time and prevent outreach during quiet hours

import { getZipCodeTimeZone, getAreaCodeTimeZone } from "./timezone-data";

// Quiet hours constants (in local time)
export const QUIET_HOURS_START = 20; // 8:00 PM
export const QUIET_HOURS_END = 8;   // 8:00 AM

export type TimeZoneResult = {
  timeZone: string;
  offset: number;
  isDst: boolean;
  detectedFrom: "zip" | "areaCode" | "default";
};

// Detect timezone from zip code
export function detectTimeZoneFromZip(zipCode: string): TimeZoneResult {
  const cleanZip = zipCode.replace(/\D/g, "");
  
  // Try to match zip to timezone
  const tz = getZipCodeTimeZone(cleanZip);
  if (tz) {
    return { ...tz, detectedFrom: "zip" };
  }
  
  // Default to EST if no match
  return {
    timeZone: "America/New_York",
    offset: -5,
    isDst: false,
    detectedFrom: "default",
  };
}

// Detect timezone from area code
export function detectTimeZoneFromAreaCode(areaCode: string): TimeZoneResult {
  const cleanArea = areaCode.replace(/\D/g, "");
  
  const tz = getAreaCodeTimeZone(cleanArea);
  if (tz) {
    return { ...tz, detectedFrom: "areaCode" };
  }
  
  return {
    timeZone: "America/New_York",
    offset: -5,
    isDst: false,
    detectedFrom: "default",
  };
}

// Check if we're in quiet hours for a given timezone
export function isQuietHours(timeZone: string): boolean {
  const now = new Date();
  
  // Create a date in the target timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hour12: false,
  });
  
  const hourStr = formatter.format(now);
  const hour = parseInt(hourStr, 10);
  
  // Quiet hours: 8 PM - 8 AM
  if (QUIET_HOURS_START <= QUIET_HOURS_END) {
    return hour >= QUIET_HOURS_START || hour < QUIET_HOURS_END;
  }
  
  return hour >= QUIET_HOURS_START || hour < QUIET_HOURS_END;
}

// Calculate next active window
export function getNextActiveWindow(timeZone: string): Date {
  const now = new Date();
  
  if (!isQuietHours(timeZone)) {
    return now; // Active now
  }
  
  // Find next 8 AM
  const next = new Date(now);
  next.setHours(QUIET_HOURS_END, 0, 0, 0);
  
  // If it's already past 8 AM today, next is tomorrow
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  
  return next;
}

// Check if order should be queued
export function shouldQueueOrder(zipCode?: string, areaCode?: string): {
  shouldQueue: boolean;
  reason?: string;
  nextAvailable?: Date;
} {
  let tz: TimeZoneResult;
  
  if (zipCode) {
    tz = detectTimeZoneFromZip(zipCode);
  } else if (areaCode) {
    tz = detectTimeZoneFromAreaCode(areaCode);
  } else {
    // Default - use server time
    return {
      shouldQueue: isQuietHours("America/New_York"),
      reason: isQuietHours("America/New_York") 
        ? "Server time is in quiet hours" 
        : undefined,
      nextAvailable: isQuietHours("America/New_York")
        ? getNextActiveWindow("America/New_York")
        : undefined,
    };
  }
  
  if (isQuietHours(tz.timeZone)) {
    return {
      shouldQueue: true,
      reason: `Signer local time (${tz.timeZone}) is in quiet hours`,
      nextAvailable: getNextActiveWindow(tz.timeZone),
    };
  }
  
  return { shouldQueue: false };
}

// Queue order until active window
export function queueUntilActive(orderTime: Date, timeZone: string): Date {
  const queueUntil = new Date(orderTime);
  
  if (isQuietHours(timeZone)) {
    return getNextActiveWindow(timeZone);
  }
  
  return orderTime;
}