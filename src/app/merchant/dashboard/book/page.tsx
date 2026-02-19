import Link from "next/link";
import { BookingForm } from "../booking-form";
import { ChevronLeft } from "lucide-react";

export default function BookShipmentPage() {
  return (
    <div className="mx-auto max-w-5xl bg-white px-6 py-10">
      <div className="flex items-center gap-4 border-b border-zinc-100 pb-8">
        <Link
          href="/merchant/dashboard"
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 font-sans"
        >
          <ChevronLeft strokeWidth={1} className="mr-1 h-4 w-4" />
          Back
        </Link>
        <span className="ml-4 shrink-0 font-sans text-lg font-bold tracking-tighter text-black">shipco</span>
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
            Book shipment
          </h1>
          <p className="mt-0.5 text-sm text-zinc-500 font-sans">
            Receiver, package presets, insurance and price breakdown. Deducted from your wallet.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <BookingForm />
      </div>
    </div>
  );
}
