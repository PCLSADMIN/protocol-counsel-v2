import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Protocol Counsel",
  description: "Legal Operations Orchestration Platform - HIPAA-compliant medical records retrieval, skip tracing, and mobile notary services.",
  keywords: ["legal operations", "HIPAA compliant", "medical records", "notary services", "document retrieval"],
  authors: [{ name: "Protocol Counsel" }],
  creator: "Protocol Counsel",
  publisher: "Protocol Counsel",
  metadataBase: new URL("https://protocolcounsel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://protocolcounsel.com",
    siteName: "Protocol Counsel",
    title: "Protocol Counsel - Legal Operations Orchestration Platform",
    description: "HIPAA-compliant medical records retrieval with chain of custody documentation and immutable audit trails.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Protocol Counsel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Protocol Counsel",
    description: "Legal Operations Orchestration Platform",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Accessibility: Preload reduced motion preference */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}