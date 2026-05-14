// Rush Bonus - Incentive for Same-Day Service
// $10 of the $50 rush fee goes to the first agent to accept/arrive

export const RUSH_BONUS_FEE = 5000; // $50 rush fee in cents
export const RUSH_BONUS_PAYOUT = 1000; // $10 to agent in cents
export const RUSH_WINDOW_MINUTES = 60; // Must arrive within 60 minutes

export type RushStatus =
  | "NOT_OFFERED"
  | "OFFERED"
  | "AGENT_ACCEPTED"
  | "ARRIVED"
  | "EXPIRED";

export interface RushOffer {
  orderId: string;
  rushFee: number;
  agentPayout: number;
  offeredAt: Date;
  expiresAt: Date;
  status: RushStatus;
  acceptedBy?: string;
  acceptedAt?: Date;
  arrivedAt?: Date;
}

// Calculate rush bonus breakdown
export function calculateRushBonus(): {
  rushFee: number;
  platformKeeps: number;
  agentPayout: number;
} {
  const platformKeeps = RUSH_BONUS_FEE - RUSH_BONUS_PAYOUT;
  
  return {
    rushFee: RUSH_BONUS_FEE,
    platformKeeps,
    agentPayout: RUSH_BONUS_PAYOUT,
  };
}

// Check if rush offer is still valid
export function isRushValid(offer: RushOffer): boolean {
  if (offer.status !== "OFFERED") return false;
  if (offer.expiresAt < new Date()) return false;
  return true;
}

// Generate rush offer
export function createRushOffer(orderId: string): RushOffer {
  const now = new Date();
  const expires = new Date(now.getTime() + RUSH_WINDOW_MINUTES * 60 * 1000);
  
  return {
    orderId,
    rushFee: RUSH_BONUS_FEE,
    agentPayout: RUSH_BONUS_PAYOUT,
    offeredAt: now,
    expiresAt: expires,
    status: "OFFERED",
  };
}

// Accept rush offer
export function acceptRushOffer(
  offer: RushOffer,
  agentId: string
): RushOffer {
  return {
    ...offer,
    status: "AGENT_ACCEPTED",
    acceptedBy: agentId,
    acceptedAt: new Date(),
  };
}

// Mark agent arrived (triggers payout)
export function markRushArrived(
  offer: RushOffer
): RushOffer {
  return {
    ...offer,
    status: "ARRIVED",
    arrivedAt: new Date(),
  };
}

// Get rush offer message for agent
export function getRushOfferMessage(): string {
  return `🚨 RUSH ORDER AVAILABLE
Earn $10 bonus for arriving within 60 minutes!
Target: [ADDRESS]
Time remaining: ${RUSH_WINDOW_MINUTES} min
 tap to accept`;
}

// Validate arrival time
export function validateRushArrival(offer: RushOffer): boolean {
  if (!offer.acceptedAt) return false;
  
  const arrivalDeadline = new Date(
    offer.acceptedAt.getTime() + RUSH_WINDOW_MINUTES * 60 * 1000
  );
  
  return new Date() <= arrivalDeadline;
}