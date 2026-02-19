import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Shipment | shipco",
  description: "Track your shipco shipment. Enter your tracking ID to see status and delivery journey.",
};

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
