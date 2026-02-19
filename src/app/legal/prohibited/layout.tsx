import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prohibited Items | Shipco",
  description: "Items we do not ship. Shipping prohibited items leads to account suspension and legal reporting.",
};

export default function ProhibitedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
