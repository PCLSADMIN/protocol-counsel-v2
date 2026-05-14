// Merchant Shadow Mode - Force Protocol Counsel branding

export const SHADOW_MODE = {
  // Disable business name visibility
  hideBusinessName: true,
  
  // Force display name
  displayName: "ProtocolCounsel",
  
  // Portal settings
  portalSettings: {
    allowCustomerToUpdateBusiness: false,
    allowCustomerToUpdateEmail: false,
    allowCustomerToUpdatePhone: false,
    defaultAllowedPaymentMethods: ["card"],
  },
};

export function getPortalConfig() {
  return SHADOW_MODE.portalSettings;
}