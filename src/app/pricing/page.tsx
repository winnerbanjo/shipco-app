"use client";

import { useState, useMemo, Fragment } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  Truck,
  MessageCircle,
  Check,
} from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import {
  getCarrierCostForZone,
  applyMarkup,
  DEFAULT_PROFIT_MARKUP_PERCENT,
  type ZoneId,
} from "@/data/zone-pricing";

type ServiceType = "local" | "nationwide" | "international";

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: "local", label: "Local" },
  { value: "nationwide", label: "Nationwide" },
  { value: "international", label: "International" },
];

const FUEL_SURCHARGE_PERCENT = 10;
const INSURANCE_PERCENT = 2;
const VOLUMETRIC_DIVISOR = 5000;

const LOCAL_BASE = 1500;
const LOCAL_PER_KG = 120;
const NATIONWIDE_BASE = 2500;
const NATIONWIDE_PER_KG = 180;

const INTERNATIONAL_ROUTES: { route: string; zone: ZoneId; startKg: number; fixedFrom?: number }[] = [
  { route: "Lagos → UK", zone: "1", startKg: 1 },
  { route: "Lagos → USA", zone: "3", startKg: 1 },
  { route: "Lagos → China", zone: "3", startKg: 1, fixedFrom: 45000 },
];

function useLiveQuote(
  serviceType: ServiceType,
  weightStr: string,
  lengthStr: string,
  widthStr: string,
  heightStr: string
) {
  return useMemo(() => {
    const weight = parseFloat(weightStr.replace(/,/g, ".")) || 0;
    const length = parseFloat(lengthStr.replace(/,/g, ".")) || 0;
    const width = parseFloat(widthStr.replace(/,/g, ".")) || 0;
    const height = parseFloat(heightStr.replace(/,/g, ".")) || 0;

    const volumetricKg =
      length > 0 && width > 0 && height > 0
        ? (length * width * height) / VOLUMETRIC_DIVISOR
        : 0;
    const chargeableKg = Math.max(weight, volumetricKg, 0.5);
    if (chargeableKg <= 0) return null;

    let baseFare: number;
    if (serviceType === "local") {
      baseFare = Math.round(LOCAL_BASE + chargeableKg * LOCAL_PER_KG);
    } else if (serviceType === "nationwide") {
      baseFare = Math.round(NATIONWIDE_BASE + chargeableKg * NATIONWIDE_PER_KG);
    } else {
      const zone: ZoneId = "1";
      const cost = getCarrierCostForZone(chargeableKg, zone);
      baseFare = Math.round(applyMarkup(cost, DEFAULT_PROFIT_MARKUP_PERCENT));
    }

    const fuelSurcharge = Math.round((baseFare * FUEL_SURCHARGE_PERCENT) / 100);
    const insurance = Math.round(((baseFare + fuelSurcharge) * INSURANCE_PERCENT) / 100);
    const total = baseFare + fuelSurcharge + insurance;

    return {
      baseFare,
      fuelSurcharge,
      insurance,
      total,
      chargeableKg,
    };
  }, [serviceType, weightStr, lengthStr, widthStr, heightStr]);
}

const COMPARISON_ROWS = [
  {
    feature: "Delivery time",
    economy: "3–7 business days",
    express: "1–2 business days",
  },
  {
    feature: "Pricing",
    economy: "Standard rates",
    express: "~1.5× standard",
  },
  {
    feature: "Tracking detail",
    economy: "Hub-level updates",
    express: "Real-time + ETA",
  },
  {
    feature: "Insurance cover",
    economy: "Basic (included)",
    express: "Basic (included)",
  },
  {
    feature: "Pickup availability",
    economy: "Next-day pickup",
    express: "Same-day pickup",
  },
];

export default function PricingPage() {
  const [serviceType, setServiceType] = useState<ServiceType>("nationwide");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const quote = useLiveQuote(serviceType, weight, length, width, height);

  const internationalRates = useMemo(() => {
    return INTERNATIONAL_ROUTES.map((r) => {
      const fromAmount =
        r.fixedFrom ??
        Math.round(
          applyMarkup(getCarrierCostForZone(r.startKg, r.zone), DEFAULT_PROFIT_MARKUP_PERCENT)
        );
      return { ...r, fromAmount };
    });
  }, []);

  return (
    <div className="corporate-layout flex min-h-screen flex-col bg-white font-sans antialiased">
      <LandingNav />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#121212]/70 hover:text-[#e3201b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Hero */}
          <ScrollReveal className="mt-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl">
              Simple, Transparent Pricing.
            </h1>
            <p className="mt-3 text-lg text-[#121212]/70">
              Use the calculator below to estimate your cost. Compare Economy and Express, then see international starting rates.
            </p>
          </ScrollReveal>

          {/* Floating rate calculator */}
          <ScrollReveal delay={0.1} className="mt-12">
            <div className="rounded-2xl border border-[#121212]/10 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-8">
              <div className="flex items-center gap-3">
                <Calculator className="h-8 w-8 text-[#e3201b]" strokeWidth={1.5} />
                <h2 className="text-xl font-bold text-[#121212]">Rate calculator</h2>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                    Service type
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as ServiceType)}
                    className="mt-2 w-full rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-sm text-[#121212] focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                  >
                    {SERVICE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                    Weight (kg)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g. 2.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-sm text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                    Length (cm)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g. 30"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-sm text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                    Width × Height (cm)
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="W"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-1/2 rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-sm text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                    />
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="H"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-1/2 rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-sm text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Live quote result */}
              <div className="mt-8 rounded-xl border border-[#121212]/10 bg-[#121212]/[0.02] p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                  Live quote
                  {quote && (
                    <span className="ml-2 font-normal normal-case text-[#121212]/50">
                      (chargeable weight: {quote.chargeableKg.toFixed(1)} kg)
                    </span>
                  )}
                </p>
                {quote ? (
                  <div className="mt-4 flex flex-wrap items-baseline gap-6">
                    <div>
                      <p className="text-xs text-[#121212]/60">Base fare</p>
                      <p className="text-2xl font-bold text-[#121212]">
                        ₦{quote.baseFare.toLocaleString("en-NG")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#121212]/60">Fuel surcharge</p>
                      <p className="text-2xl font-bold text-[#121212]">
                        ₦{quote.fuelSurcharge.toLocaleString("en-NG")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#121212]/60">Insurance</p>
                      <p className="text-2xl font-bold text-[#121212]">
                        ₦{quote.insurance.toLocaleString("en-NG")}
                      </p>
                    </div>
                    <div className="border-l border-[#121212]/20 pl-6">
                      <p className="text-xs text-[#121212]/60">Total (est.)</p>
                      <p className="text-3xl font-extrabold text-[#e3201b]">
                        ₦{quote.total.toLocaleString("en-NG")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-[#121212]/50">
                    Enter weight (and optionally dimensions) to see a live quote.
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Comparison table: Economy vs Express */}
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                Compare options
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#121212]">
                Economy vs Express
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#121212]/10 bg-white shadow-xl transition-all hover:shadow-2xl">
                <div className="grid grid-cols-3 gap-0 sm:grid-cols-3">
                  <div className="border-b border-r border-[#121212]/10 bg-[#121212]/[0.02] px-4 py-4 font-semibold text-[#121212] sm:px-6 sm:py-5">
                    Feature
                  </div>
                  <div className="border-b border-r border-[#121212]/10 bg-[#121212]/[0.02] px-4 py-4 text-center font-semibold text-[#121212] sm:px-6 sm:py-5">
                    Economy
                  </div>
                  <div className="relative border-b border-[#121212]/10 bg-[#e3201b]/5 px-4 py-4 text-center font-semibold text-[#121212] sm:px-6 sm:py-5">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#e3201b] px-3 py-0.5 text-xs font-bold uppercase text-white">
                      Popular
                    </span>
                    Express
                  </div>
                  {COMPARISON_ROWS.map((row) => (
                    <Fragment key={row.feature}>
                      <div className="border-r border-[#121212]/10 px-4 py-4 text-sm text-[#121212]/80 sm:px-6 sm:py-5">
                        {row.feature}
                      </div>
                      <div className="border-r border-[#121212]/10 px-4 py-4 text-sm text-[#121212]/80 sm:px-6 sm:py-5">
                        {row.economy}
                      </div>
                      <div className="px-4 py-4 text-sm font-medium text-[#121212] sm:px-6 sm:py-5">
                        {row.express}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Bulk / High-volume */}
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                High-volume merchants
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#121212]">
                Discounted rates and dedicated support
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-8 rounded-2xl border border-[#121212]/10 bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div className="space-y-4">
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#121212]/80">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#e3201b]" strokeWidth={2} />
                      Discounted rates
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#e3201b]" strokeWidth={2} />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#e3201b]" strokeWidth={2} />
                      Monthly invoicing
                    </li>
                  </ul>
                  <p className="text-[#121212]/70">
                    Ship at scale with custom pricing and priority support.
                  </p>
                </div>
                <a
                  href="mailto:sales@shipco.com?subject=High-Volume%20Pricing"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#e3201b] px-8 py-4 font-medium text-white shadow-lg shadow-[#e3201b]/25 transition-all hover:-translate-y-0.5 hover:bg-[#e3201b]/90 hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
                  Contact sales
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* International rate preview */}
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                International
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#121212]">
                Starting rates (Lagos origin)
              </p>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {internationalRates.map((r, i) => (
                <ScrollReveal key={r.route} delay={0.1 + i * 0.06}>
                  <div className="rounded-2xl border border-[#121212]/10 bg-white p-6 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <Truck className="h-10 w-10 text-[#e3201b]" strokeWidth={1.5} />
                    <p className="mt-4 font-semibold text-[#121212]">{r.route}</p>
                    <p className="mt-1 text-sm text-[#121212]/60">From {r.startKg} kg</p>
                    <p className="mt-3 text-2xl font-bold text-[#e3201b]">
                      ₦{r.fromAmount.toLocaleString("en-NG")}
                    </p>
                    <Link
                      href="/services#import-export"
                      className="mt-4 inline-block text-sm font-medium text-[#e3201b] hover:underline"
                    >
                      See Import/Export →
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-[#121212]/50">
              China/Asia rates vary by destination; contact us for a precise quote.
            </p>
          </section>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
