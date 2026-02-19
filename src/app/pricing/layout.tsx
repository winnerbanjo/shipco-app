import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Rate Card | shipco",
  description: "Simple, transparent pricing. Use our rate calculator, compare Economy vs Express, and see international starting rates.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
