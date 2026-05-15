// ==========================================
// AUTHENTICATION SYSTEM
// Protocol Counsel - Role-based access
// ==========================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type PortalRole = 'superadmin' | 'firm_admin' | 'restricted_coordinator';

export interface PortalUser {
  id: string;
  email: string;
  name: string;
  role: PortalRole;
  firmId: string;
  firmName: string;
  avatar?: string;
}

export interface AuthState {
  user: PortalUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Demo credentials
const DEMO_USERS: Record<string, PortalUser & { password: string }> = {
  'storm@protocolcounsel.com': {
    id: 'usr_storm_001',
    email: 'storm@protocolcounsel.com',
    name: 'Storm (SuperAdmin)',
    role: 'superadmin',
    firmId: 'firm_pc_001',
    firmName: 'Protocol Counsel',
    password: 'demo123',
  },
  'admin@lawfirm.com': {
    id: 'usr_admin_001',
    email: 'admin@lawfirm.com',
    name: 'Admin (Firm)',
    role: 'firm_admin',
    firmId: 'firm_pc_002',
    firmName: 'Smith & Associates',
    password: 'demo123',
  },
  'coordinator@lawfirm.com': {
    id: 'usr_coord_001',
    email: 'coordinator@lawfirm.com',
    name: 'Coordinator',
    role: 'restricted_coordinator',
    firmId: 'firm_pc_002',
    firmName: 'Smith & Associates',
    password: 'demo123',
  },
};

const AuthContext = createContext<AuthState | undefined>(undefined);

// Session storage key
const SESSION_KEY = 'protocol_counsel_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    const savedSession = sessionStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const demoUser = DEMO_USERS[email.toLowerCase()];
    
    if (!demoUser || demoUser.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = demoUser;
    setUser(userWithoutPassword);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPassword));
    setIsLoading(false);
    
    return { success: true };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  // Switch role (for demo purposes)
  const switchRole = (role: PortalRole) => {
    if (!user) return;
    
    const newUser = { ...user, role };
    setUser(newUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  };

  const value: AuthState & { login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>; logout: () => void; switchRole: (role: PortalRole) => void } = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context as AuthState & { 
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    switchRole: (role: PortalRole) => void;
  };
}

// Role check helpers
export function canManageStaff(user: PortalUser | null): boolean {
  return user?.role === 'firm_admin' || user?.role === 'superadmin';
}

export function canViewFinancials(user: PortalUser | null): boolean {
  return user?.role === 'firm_admin' || user?.role === 'superadmin';
}

export function canToggleAudit(user: PortalUser | null): boolean {
  return user?.role === 'superadmin';
}

export function isRestrictedCoordinator(user: PortalUser | null): boolean {
  return user?.role === 'restricted_coordinator';
}

// Get demo credentials helper
export function getDemoCredentials(): { email: string; password: string; role: string }[] {
  return [
    { email: 'storm@protocolcounsel.com', password: 'demo123', role: 'SuperAdmin' },
    { email: 'admin@lawfirm.com', password: 'demo123', role: 'Firm Admin' },
    { email: 'coordinator@lawfirm.com', password: 'demo123', role: 'Restricted Coordinator' },
  ];
}