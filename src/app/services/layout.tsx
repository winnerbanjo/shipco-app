import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | shipco",
  description: "Nationwide delivery, import/export, warehousing, and last-mile logistics. Detailed breakdown of shipco services.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
