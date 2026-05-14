// Security Whitepaper - Technical Infrastructure

export const SECURITY_WHITEPAPER = {
  title: "ProtocolCounsel Technical Infrastructure",
  version: "1.0",
  updated: "2024",
  
  sections: {
    zeroTrust: `ZERO-TRUST LOGIC
- No direct partner-to-firm data flow
- All data passes through encrypted gateway
- Row-Level Security (RLS) enforced at database level
- Firm can only access own data`,

    encryption: `ENCRYPTION
- AES-256 at rest
- TLS 1.3 in transit
- 90-day automated key rotation
- HSM-backed key management`,

    authentication: `PASSKEY AUTHENTICATION
- WebAuthn (Passkeys) as primary method
- MFA required for firm admins
- Session tokens expire in 15 minutes
- Biometric integration available`,
    
    compliance: `COMPLIANCE
- SOC2 Type II aligned
- HIPAA compliant
- CA SB 53 ready
- CO AI Act aligned`,
  },
};

export function getSecuritySection(key: keyof typeof SECURITY_WHITEPAPER.sections) {
  return SECURITY_WHITEPAPER.sections[key];
}