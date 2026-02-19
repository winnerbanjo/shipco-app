"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";

export default function TrackingPage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = trackingId.trim();
    if (id) router.push(`/track/${encodeURIComponent(id)}`);
  }

  return (
    <div className="corporate-layout flex min-h-screen flex-col bg-white font-sans antialiased">
      <LandingNav />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#121212]/70 hover:text-[#e3201b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-12 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#121212] sm:text-4xl">
              Track your shipment
            </h1>
            <p className="mt-3 text-[#121212]/70">
              Enter your tracking ID to see status and delivery journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#121212]/40"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g. SHP-123456789"
                  className="w-full rounded-xl border border-[#121212]/15 bg-white py-4 pl-12 pr-4 text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#e3201b] px-8 py-4 font-medium text-white shadow-lg shadow-[#e3201b]/25 transition-all hover:-translate-y-0.5 hover:bg-[#c41b17] focus:outline-none focus:ring-2 focus:ring-[#e3201b] focus:ring-offset-2"
              >
                Track
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-[#121212]/50">
            Find your tracking ID on your receipt or in your booking confirmation email.
          </p>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
