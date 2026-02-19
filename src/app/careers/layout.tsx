import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | shipco",
  description: "Join shipco. Open roles in Operations & Hubs, Technology, and Last-Mile Riders.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
