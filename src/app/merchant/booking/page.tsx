import { redirect } from "next/navigation";
import { getSession } from "@shipco/lib/auth";
import { connectDB } from "@shipco/lib/mongodb";
import Merchant from "@shipco/lib/models/Merchant";
import { getMerchantKycStatus } from "@/lib/merchant-kyc";
import { MerchantBookingFlow } from "./merchant-booking-flow";

export default async function MerchantBookingPage() {
  const session = await getSession();
  if (!session?.merchantId) redirect("/auth/login");
  const kycStatus = await getMerchantKycStatus(session.merchantId);
  if (kycStatus !== "Approved") {
    redirect("/merchant/dashboard?blocked=kyc");
  }

  const conn = await connectDB();
  let sender = { businessName: "", email: "", address: "" };
  if (conn) {
    const merchant = await Merchant.findById(session.merchantId)
      .select("businessName email address")
      .lean();
    if (merchant) {
      sender = {
        businessName: merchant.businessName ?? "",
        email: merchant.email ?? "",
        address: merchant.address ?? "",
      };
    }
  }

  return (
    <div className="mx-auto max-w-6xl bg-white px-6 py-8">
      <header className="flex items-center gap-4 border-b border-zinc-100 pb-6">
        <span className="shrink-0 font-sans text-xl font-bold tracking-tighter text-black">shipco</span>
        <div>
          <h1 className="font-sans text-3xl font-semibold tracking-tighter text-zinc-900">
            New shipment
          </h1>
          <p className="mt-1 text-sm text-zinc-500 font-sans">
            Select a service type, then complete the form. Quote updates as you type.
          </p>
        </div>
      </header>
      <MerchantBookingFlow sender={sender} merchantId={session.merchantId != null ? String(session.merchantId) : undefined} />
    </div>
  );
}
