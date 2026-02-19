import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | shipco",
  description: "Search help articles, browse by topic, and contact support. Getting started, shipping, payments, hubs, tracking, and API.",
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
