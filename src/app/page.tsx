"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getZoneFromCountry,
  getCarrierCostForZone,
  applyMarkup,
  ZONE_LABELS,
  DEFAULT_PROFIT_MARKUP_PERCENT,
  type ZoneId,
} from "@/data/zone-pricing";
import { QUICK_QUOTE_COUNTRIES } from "@/data/quick-quote-countries";
import { saveBookingDraft } from "@/lib/booking-draft";

const HERO_ORIGIN_OPTIONS = [
  { value: "Nigeria", label: "Nigeria" },
  ...QUICK_QUOTE_COUNTRIES,
];
const HERO_DEST_OPTIONS = [
  { value: "Nigeria", label: "Nigeria" },
  ...QUICK_QUOTE_COUNTRIES,
];

export default function HomePage() {
  const [origin, setOrigin] = useState("Nigeria");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");

  const weightNum = useMemo(() => {
    const n = parseFloat(weight.replace(/,/g, "."));
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [weight]);

  const quote = useMemo(() => {
    if (!destination?.trim() || weightNum <= 0) return null;
    const zone = getZoneFromCountry(destination) ?? getZoneFromCountry(origin);
    if (!zone) return null;
    const cost = getCarrierCostForZone(weightNum, zone);
    const amount = applyMarkup(cost, DEFAULT_PROFIT_MARKUP_PERCENT);
    return { amount, zone, zoneLabel: ZONE_LABELS[zone as ZoneId] };
  }, [origin, destination, weightNum]);

  function handleBookNow() {
    if (!quote || !destination?.trim() || weightNum <= 0) return;
    saveBookingDraft(origin, destination, weightNum, quote.amount);
    window.location.href = "/auth/login?callbackUrl=/merchant/booking";
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Ship smarter. Track easier.
          </h1>
          <p className="mt-2 text-center text-lg text-zinc-500">
            Get an instant quote — no sign-up required.
          </p>

          <div className="mt-10 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="hero-origin" className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Origin
                </label>
                <select
                  id="hero-origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-[#F40009] focus:outline-none focus:ring-2 focus:ring-[#F40009]/20"
                >
                  {HERO_ORIGIN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="hero-dest" className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Destination
                </label>
                <select
                  id="hero-dest"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-[#F40009] focus:outline-none focus:ring-2 focus:ring-[#F40009]/20"
                >
                  <option value="">Select</option>
                  {HERO_DEST_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="hero-weight" className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Weight (kg)
                </label>
                <input
                  id="hero-weight"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 2.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#F40009] focus:outline-none focus:ring-2 focus:ring-[#F40009]/20"
                />
              </div>
            </div>

            {quote && (
              <div className="mt-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Instant quote</p>
                <p className="mt-1 text-2xl font-bold text-[#F40009]">
                  ₦{quote.amount.toLocaleString("en-NG")}
                </p>
                <p className="mt-0.5 text-sm text-zinc-500">{quote.zoneLabel}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleBookNow}
                disabled={!quote || weightNum <= 0}
                className="flex-1 rounded-2xl bg-[#F40009] px-6 py-4 text-sm font-medium text-white hover:bg-[#cc0008] disabled:opacity-50 transition-colors"
              >
                Book Now
              </button>
              <Link
                href="/auth/login"
                className="flex-1 rounded-2xl border border-[#F40009] bg-white px-6 py-4 text-center text-sm font-medium text-[#F40009] hover:bg-[#F40009]/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/track"
                className="flex-1 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-center text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Track a package
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            New?{" "}
            <Link href="/auth/merchant-signup" className="font-medium text-[#F40009] hover:underline">
              Register as merchant
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
