// ==========================================
// ACCESSIBILITY COMPONENT
// ADA Compliance Features
// Protocol Counsel - Accessible design
// ==========================================

'use client';

import React from 'react';

// Skip to Main Content Link
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#002147] focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
    >
      Skip to main content
    </a>
  );
}

// Live Region for Screen Readers
export function LiveRegion({ message }: { message?: string }) {
  if (!message) return null;
  
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// Accessible Button Label
interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function AccessibleButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  ariaLabel 
}: AccessibleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={`focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
}

// Accessible Link
interface AccessibleLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  ariaLabel?: string;
}

export function AccessibleLink({ 
  children, 
  href, 
  className = '',
  ariaLabel 
}: AccessibleLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 ${className}`}
    >
      {children}
    </a>
  );
}

// Form Field Label
interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, required = false, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label 
        htmlFor={htmlFor} 
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

// Error Message
export function ErrorMessage({ id, message }: { id: string; message: string }) {
  if (!message) return null;
  
  return (
    <p 
      id={id} 
      role="alert"
      className="text-red-600 text-sm mt-1"
    >
      {message}
    </p>
  );
}

// Loading Indicator
export function LoadingIndicator() {
  return (
    <div 
      role="status"
      aria-live="polite"
      className="flex items-center gap-2"
    >
      <svg 
        className="animate-spin h-5 w-5" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4" 
          fill="none" 
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" 
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Screen Reader Only Text
export function SrOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Focus Visible Mixin (use with any focusable element)
export const focusVisible = `
  focus:outline-none 
  focus:ring-2 
  focus:ring-[#D4AF37] 
  focus:ring-offset-2
`;

// Reduced Motion Support
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}