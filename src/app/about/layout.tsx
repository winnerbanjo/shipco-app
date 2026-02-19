import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Shipco",
  description: "Our mission and hub locations. Shipco — modern logistics for Nigeria.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
