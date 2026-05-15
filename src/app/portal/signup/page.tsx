'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Fast-Track Protocol: New accounts default to UPFRONT
// Background qualification via Resolve API happens silently

interface SignupForm {
  email: string;
  firmName: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupForm>({
    email: '',
    firmName: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [qualification, setQualification] = useState<'PENDING' | 'APPROVED' | 'DENIED'>('PENDING');

  // Silent background qualification check via Resolve API
  const checkQualification = async (firmName: string): Promise<void> => {
    // In production: GET /api/billing/qualify?firm={firmName}
    // Default: PENDING = no Net terms until verified
    setTimeout(() => setQualification('PENDING'), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      await checkQualification(formData.firmName);
      setStep(2);
      return;
    }
    setLoading(true);
    
    // Account creation: payment_status defaults to UPFRONT
    // In production: POST /api/auth/signup { payment_status: 'UPFRONT', billing_terms: null }
    setTimeout(() => {
      setLoading(false);
      router.push('/portal/dashboard?welcome=true&payment=UPFRONT');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-serif font-bold text-[#002147]">
            PROTOCOL<span className="text-[#D4AF37]">COUNSEL</span>
          </Link>
          <p className="text-sm text-slate-500 mt-1">Start Your Free Trial</p>
        </div>

        {/* Trial Banner */}
        <div className="bg-[#002147] text-white rounded-t-lg p-4 text-center">
          <p className="font-semibold">14-Day Free Trial</p>
          <p className="text-slate-300 text-sm">No credit card required</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-slate-200 rounded-b-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#002147] outline-none"
                    placeholder="you@firm.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Firm Name
                  </label>
                  <input
                    type="text"
                    value={formData.firmName}
                    onChange={(e) => setFormData({...formData, firmName: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#002147] outline-none"
                    placeholder="Your law firm"
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#002147] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#002147] outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#002147] outline-none"
                    placeholder="(555) 555-5555"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#002147] text-white font-semibold rounded-lg hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : step === 1 ? 'Continue' : 'Start Free Trial'}
            </button>
          </form>

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-4 text-sm text-slate-500 hover:text-[#002147]"
            >
              Back
            </button>
          )}

          {/* Login link */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/portal/login" className="text-[#D4AF37] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              <strong>Infrastructure Notice:</strong> Protocol Counsel provides legal operations infrastructure.
              All legal services are provided by licensed third-party providers.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}