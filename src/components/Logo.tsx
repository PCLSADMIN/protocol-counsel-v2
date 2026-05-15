// ==========================================
// LEGAL LOGO COMPONENT
// Protocol Counsel - Bold, authoritative mark
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

export function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <Link href="/" className={`font-serif font-bold tracking-tight ${sizes[size]} ${className}`}>
      <span className="text-[#002147]">PROTOCOL</span>
      <span className="text-[#D4AF37]">COUNSEL</span>
    </Link>
  );
}

// Standalone mark for favicon, etc.
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="w-8 h-8 bg-[#002147] rounded flex items-center justify-center">
        <span className="text-[#D4AF37] font-bold text-sm">PC</span>
      </span>
    </div>
  );
}

export default Logo;