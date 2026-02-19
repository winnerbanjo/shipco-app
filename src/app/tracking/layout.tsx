import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Shipment | Shipco",
  description: "Track your Shipco shipment. Enter your tracking ID to see status and delivery journey.",
};

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
