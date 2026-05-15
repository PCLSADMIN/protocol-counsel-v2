// ==========================================
// LOGO COMPONENT - Metallic Insignia
// Protocol Counsel - Brushed silver & polished gold
// ==========================================

import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'text-lg',
  md: 'text-xl', 
  lg: 'text-2xl',
};

// SVG Shield Monogram - Interlocking P & C
function ShieldMonogram({ size = 32 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none"
      className="inline-block"
    >
      <defs>
        {/* Chrome/Silver metallic gradient */}
        <linearGradient id="chrome-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="25%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="75%" stopColor="#A8A8A8" />
          <stop offset="100%" stopColor="#D4D4D4" />
        </linearGradient>
        {/* Gold gradient */}
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D76E" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8962F" />
        </linearGradient>
      </defs>
      
      {/* Geometric line shield */}
      <path 
        d="M20 3 L37 8 V22 C37 31 20 37 20 37 C20 37 3 31 3 22 V8 L20 3Z" 
        stroke="url(#gold-gradient)" 
        strokeWidth="1.5" 
        fill="none"
      />
      
      {/* Interlocking P (chrome/silver) */}
      <path 
        d="M11 12 V28 M11 12 H17 C22 12 22 18 17 18 H11 M17 12 V18" 
        stroke="url(#chrome-gradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Interlocking C (gold) */}
      <path 
        d="M29 16 C26 14 23 16 23 20 C23 24 26 24 29 22" 
        stroke="url(#gold-gradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none"
      />
    </svg>
  );
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <Link href="/" className={`font-serif font-bold tracking-tight inline-flex items-center gap-2 ${sizes[size]} ${className}`}>
      <ShieldMonogram size={size === 'sm' ? 24 : size === 'lg' ? 40 : 32} />
      <span className="text-slate-300">PROTOCOL</span>
      <span className="text-[#D4AF37]">COUNSEL</span>
    </Link>
  );
}

// Standalone mark for favicon, etc.
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <ShieldMonogram size={32} />
    </Link>
  );
}

export default Logo;