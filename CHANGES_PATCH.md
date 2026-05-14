# Changes to Apply to protocol-counsel-v2

## 1. Create vercel.json (root level)
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {"key": "X-Frame-Options", "value": "DENY"},
        {"key": "X-Content-Type-Options", "value": "nosniff"},
        {"key": "X-XSS-Protection", "value": "1; mode=block"},
        {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"},
        {"key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()"},
        {"key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains"}
      ]
    }
  ],
  "rewrites": [{"source": "/portal", "destination": "/portal/login"}],
  "regions": ["iad1"]
}

## 2. Update next.config.ts (root level)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        {key: "X-DNS-Prefetch-Control", value: "on"},
        {key: "X-Content-Type-Options", value: "nosniff"},
        {key: "X-Frame-Options", value: "DENY"},
        {key: "X-XSS-Protection", value: "1; mode=block"},
        {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
      ],
    }];
  },
};

export default nextConfig;

## 3. Create src/app/portal/layout.tsx
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="portal-layout">{children}</div>;
}

## 4. Create src/app/portal/login/page.tsx
import { Metadata } from "next";
export const metadata: Metadata = { title: "Sign In - Protocol Counsel" };
export default function PortalLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
        <h1>Protocol Counsel</h1>
        <p>Secure Client Portal</p>
        {/* Full login form */}
      </div>
    </div>
  );
}

## 5. Create public/favicon.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <text x="16" y="22" font-family="Arial" font-size="14" font-weight="bold" fill="white" text-anchor="middle">PC</text>
</svg>

## 6. Update src/app/layout.tsx
Add comprehensive metadata with OpenGraph, Twitter cards, and proper SEO.

## 7. Update src/app/globals.css
Add portal and dashboard styles.

## 8. Create README.md
Add deployment instructions.
