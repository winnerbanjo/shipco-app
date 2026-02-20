"use client";

import Link from "next/link";
import { ArrowLeft, Truck, Globe, Warehouse, Bike, Check } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

export default function ServicesPage() {
  return (
    <div className="corporate-layout flex min-h-screen flex-col bg-white font-sans antialiased">
      <LandingNav />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#121212]/70 hover:text-[#e3201b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <ScrollReveal className="mt-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-[#121212]/70">
              A detailed breakdown of how we move your goods across Nigeria and the world.
            </p>
          </ScrollReveal>

          {/* Nationwide */}
          <section id="nationwide" className="mt-16 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10">
                  <Truck className="h-7 w-7 text-[#e3201b]" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-[#121212] sm:text-3xl">
                  Nationwide Delivery
                </h2>
              </div>
              <p className="mt-4 text-[#121212]/70">
                Door-to-door across all 36 states. We combine hub-to-hub trunk movement with last-mile delivery so your package reaches any address in Nigeria.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Hub-to-hub routing for inter-state shipments",
                  "Standard and express options",
                  "Real-time tracking at every leg",
                  "Proof of delivery and signature capture",
                  "Rates by zone and weight",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#121212]/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e3201b]" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </section>

          {/* Import/Export */}
          <section id="import-export" className="mt-20 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10">
                  <Globe className="h-7 w-7 text-[#e3201b]" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-[#121212] sm:text-3xl">
                  Import / Export
                </h2>
              </div>
              <p className="mt-4 text-[#121212]/70">
                Seamless global clearing and forwarding. We handle documentation, customs, and first-mile and last-mile so you can focus on your business.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Ocean and air freight options",
                  "Customs clearance support",
                  "Warehouse consolidation and deconsolidation",
                  "Door-to-door international quotes",
                  "DDP and DDU incoterms",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#121212]/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e3201b]" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </section>

          {/* Warehousing */}
          <section id="warehousing" className="mt-20 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10">
                  <Warehouse className="h-7 w-7 text-[#e3201b]" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-[#121212] sm:text-3xl">
                  Warehousing
                </h2>
              </div>
              <p className="mt-4 text-[#121212]/70">
                Smart storage at our strategic Hubs. Use our facilities for short-term holds, cross-docking, or inventory management before outbound shipping.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Secure, insured storage by pallet or unit",
                  "Pick and pack on request",
                  "Integration with nationwide and last-mile outbound",
                  "Reporting and visibility via dashboard",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#121212]/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e3201b]" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </section>

          {/* Last-Mile */}
          <section id="last-mile" className="mt-20 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10">
                  <Bike className="h-7 w-7 text-[#e3201b]" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-[#121212] sm:text-3xl">
                  Last-Mile
                </h2>
              </div>
              <p className="mt-4 text-[#121212]/70">
                Instant rider dispatch for local deliveries. Same-city and metro-area shipments get a rider assigned quickly with ETA under 30 minutes in supported zones.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Rider pick-up and drop-off",
                  "Same-day and next-day slots",
                  "Real-time rider location and ETA",
                  "Cash on delivery and prepaid options",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#121212]/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e3201b]" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </section>

          <ScrollReveal className="mt-20 text-center">
            <Link
              href="/auth/login?callbackUrl=/merchant/booking"
              className="inline-flex items-center justify-center rounded-xl bg-[#e3201b] px-8 py-4 text-base font-medium text-white shadow-lg shadow-[#e3201b]/25 transition-all hover:-translate-y-0.5 hover:bg-[#e3201b]/90"
            >
              Get Started - Book a shipment
            </Link>
          </ScrollReveal>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
