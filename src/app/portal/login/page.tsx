'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth, getDemoCredentials } from '@/lib/auth/system';

function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/portal/order');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const demoCredentials = getDemoCredentials();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002147] to-[#001529]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-t-[#D4AF37]">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-[#002147]">PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span></Link>
            <p className="text-sm text-slate-500 mt-1">Authorized Client Portal</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-transparent outline-none transition"
                placeholder="you@firm.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-transparent outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#002147] text-white font-semibold rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials toggle */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="w-full text-sm text-slate-500 hover:text-[#002147] transition"
            >
              {showDemo ? 'Hide Demo Credentials' : 'View Demo Credentials'}
            </button>

            {showDemo && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">Click to auto-fill:</p>
                {demoCredentials.map((creds, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setEmail(creds.email);
                      setPassword(creds.password);
                    }}
                    className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition"
                  >
                    <p className="text-sm font-medium text-[#002147]">{creds.role}</p>
                    <p className="text-xs text-slate-500">{creds.email}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Free Trial Signup */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              New to Protocol Counsel?{' '}
              <Link href="/portal/signup" className="text-[#D4AF37] font-semibold hover:underline">
                Start Free Trial
              </Link>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              14-day free trial. No credit card required.
            </p>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-[#002147]">
              Return to Home
            </Link>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-3">
              <strong>Infrastructure Notice:</strong> Protocol Counsel provides legal operations infrastructure only.
              We do not provide legal advice or legal services.
            </p>
            <div className="flex justify-center gap-4 text-xs text-slate-400">
              <span>SOC 2</span>
              <span>HIPAA</span>
              <span>ISO 27001</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Authorized access only. All activity is monitored.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}