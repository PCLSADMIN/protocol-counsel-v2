// ==========================================
// COOKIE CONSENT BANNER
// GDPR Cookie Consent
// Protocol Counsel - Legal compliance
// ==========================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'protocol_counsel_cookies_accepted';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShowBanner(false);
  };
  
  const rejectCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setShowBanner(false);
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#002147] text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300 flex-1">
          We use cookies to improve your experience and analyze site traffic. 
          By continuing, you agree to our <Link href="/cookies" className="underline">Cookie Policy</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 text-sm border border-slate-500 rounded hover:bg-slate-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-[#D4AF37] text-[#002147] rounded font-semibold hover:bg-[#b8962f] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}