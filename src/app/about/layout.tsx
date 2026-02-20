import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | shipco",
  description: "Our mission and hub locations. shipco - modern logistics for Nigeria.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
