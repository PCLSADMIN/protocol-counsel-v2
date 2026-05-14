// GPS Fence Validation - Prevent Lazy Agent fraud
// Verify agent is within 100 meters before allowing photo upload

export const GPS_FENCE_RADIUS_METERS = 100;
export const GPS_FENCE_RADIUS_MILES = 0.0621371;

// Calculate distance between two GPS points using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth radius in meters
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Check if within fence
export function isWithinFence(
  agentLat: number,
  agentLon: number,
  targetLat: number,
  targetLon: number,
  radiusMeters: number = GPS_FENCE_RADIUS_METERS
): boolean {
  const distance = calculateDistance(
    agentLat, agentLon,
    targetLat, targetLon
  );
  
  return distance <= radiusMeters;
}

// Get distance for display
export function getDistanceDisplay(
  agentLat: number,
  agentLon: number,
  targetLat: number,
  targetLon: number
): string {
  const distance = calculateDistance(
    agentLat, agentLon,
    targetLat, targetLon
  );
  
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  }
  return `${(distance / 1000).toFixed(2)}km`;
}

// GPS validation result
export interface GPSValidationResult {
  valid: boolean;
  distance: number;
  distanceDisplay: string;
  error?: string;
}

// Validate agent GPS for visit
export function validateAgentGPS(
  agentLat: number,
  agentLon: number,
  targetLat: number,
  targetLon: number
): GPSValidationResult {
  const distance = calculateDistance(agentLat, agentLon, targetLat, targetLon);
  
  if (distance > GPS_FENCE_RADIUS_METERS) {
    return {
      valid: false,
      distance,
      distanceDisplay: getDistanceDisplay(agentLat, agentLon, targetLat, targetLon),
      error: `Agent is ${getDistanceDisplay(agentLat, agentLon, targetLat, targetLon)} from target. Must be within ${GPS_FENCE_RADIUS_METERS}m.`,
    };
  }
  
  return {
    valid: true,
    distance,
    distanceDisplay: getDistanceDisplay(agentLat, agentLon, targetLat, targetLon),
  };
}