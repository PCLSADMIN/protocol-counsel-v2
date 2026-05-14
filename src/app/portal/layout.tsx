import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal - Protocol Counsel",
  description: "Secure client portal access",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portal-layout">
      {children}
    </div>
  );
}