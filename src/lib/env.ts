// Environment Validation - Ensure required vars are set

export const requiredEnv = [
  "STRIPE_SECRET_KEY",
  "DATABASE_URL",
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
] as const;

export const optionalEnv = [
  "OPENAI_API_KEY",
  "LINEAR_API_KEY",
  "VERCELProtection_BYPASS_SECRET",
] as const;

export function validateEnv() {
  const missing: string[] = [];
  
  for (const key of requiredEnv) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    console.error(`Missing required env vars: ${missing.join(", ")}`);
    return false;
  }
  
  console.log("✓ All required environment variables are set");
  return true;
}

export function getEnv(key: string): string | undefined {
  return process.env[key];
}