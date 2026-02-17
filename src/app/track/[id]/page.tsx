import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@shipco/lib/mongodb";
import Shipment from "@shipco/lib/models/Shipment";
import { isValidTrackingFormat } from "@/lib/tracking";
import { TrackPageClient } from "./track-client";
import { TrackDetailHeader } from "./track-detail-header";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://shipco-logistics.com";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Track ${id} | Shipco Logistics`,
    description: `Track your Shipco Logistics shipment ${id}. View delivery journey and status.`,
    openGraph: {
      title: `Track ${id} | Shipco Logistics`,
      description: `Track your Shipco Logistics shipment ${id}.`,
      url: `${BASE_URL}/track/${id}`,
    },
  };
}

export default async function TrackPage({ params }: Props) {
  const { id } = await params;
  const trackingId = id?.trim().toUpperCase();
  const mockBypass = trackingId === "Shipco-123" || trackingId === "Shipco-782-NG";

  if (!trackingId) {
    notFound();
  }
  if (!mockBypass && !isValidTrackingFormat(trackingId)) {
    notFound();
  }

  const conn = await connectDB();
  let data: {
    trackingId: string;
    receiverName?: string;
    status: string;
    packageWeight: number;
    cost: number;
    timeline: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    partnerName?: string;
    partnerTrackingUrl?: string;
  };

  if (trackingId === "Shipco-1001") {
    data = {
      trackingId,
      receiverName: "Abuja",
      status: "In Transit - Arrived at Gwagwalada Hub",
      packageWeight: 4.2,
      cost: 4500,
      timeline: {
        pickedUpAt: new Date(Date.now() - 86400 * 1000).toISOString(),
        atSortingCenterAt: new Date().toISOString(),
      },
      createdAt: new Date(Date.now() - 86400 * 2 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      partnerName: "DHL",
      partnerTrackingUrl: "https://www.dhl.com/en/express/tracking.html?AWB=" + trackingId,
    };
  } else if (trackingId === "Shipco-1234-5678" || trackingId === "Shipco-123" || trackingId === "Shipco-782-NG") {
    data = {
      trackingId,
      receiverName: trackingId === "Shipco-782-NG" ? "Lagos" : "Demo Recipient",
      status: "In Transit",
      packageWeight: 2.5,
      cost: 4500,
      timeline: {
        pickedUpAt: new Date(Date.now() - 86400 * 1000).toISOString(),
        atSortingCenterAt: new Date().toISOString(),
      },
      createdAt: new Date(Date.now() - 86400 * 2 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } else if (conn) {
    const shipment = await Shipment.findOne({ trackingId })
      .select("trackingId receiverDetails packageWeight cost status timeline createdAt updatedAt")
      .lean();

    if (!shipment) {
      notFound();
    }

    data = {
      trackingId: shipment.trackingId,
      receiverName: shipment.receiverDetails?.name,
      status: shipment.status,
      packageWeight: shipment.packageWeight,
      cost: shipment.cost,
      timeline: (shipment.timeline ?? {}) as Record<string, unknown>,
      createdAt: String(shipment.createdAt),
      updatedAt: String(shipment.updatedAt),
    };
  } else {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <TrackDetailHeader />

      <div className="mx-auto max-w-2xl px-6 py-12">
        <TrackPageClient
          trackingId={data.trackingId}
          receiverName={data.receiverName}
          status={data.status}
          packageWeight={data.packageWeight}
          cost={data.cost}
          timeline={data.timeline || {}}
          createdAt={data.createdAt}
          updatedAt={data.updatedAt}
          partnerName={data.partnerName}
          partnerTrackingUrl={data.partnerTrackingUrl}
        />
      </div>
    </main>
  );
}
