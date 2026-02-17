import { Metadata } from "next";
import { TrackPageClient } from "./track-page-client";

export const metadata: Metadata = {
  title: "Track Shipment | Shipco Logistics",
  description: "Track your Shipco Logistics shipment. Enter your tracking ID to see the delivery journey.",
  openGraph: {
    title: "Track Shipment | Shipco Logistics",
    description: "Track your Shipco Logistics shipment by ID.",
  },
};

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-white">
      <TrackPageClient />
    </main>
  );
}
