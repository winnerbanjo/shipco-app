import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | shipco",
  description: "Terms of Service and Privacy Policy for shipco.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
