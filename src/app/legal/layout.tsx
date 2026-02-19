import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | Shipco",
  description: "Terms of Service and Privacy Policy for Shipco.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
