"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bomb,
  Flame,
  Wind,
  Beaker,
  Pill,
  Banknote,
  Gem,
  Package,
  Leaf,
  TriangleAlert,
  ShieldCheck,
} from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

const DANGER_ZONE = [
  { icon: Bomb, label: "Explosives" },
  { icon: Wind, label: "Compressed or flammable gases" },
  { icon: Flame, label: "Flammable liquids & solids" },
  { icon: Beaker, label: "Oxidizing substances & organic peroxides" },
];

const ILLEGAL_ITEMS = [
  { icon: Pill, label: "Narcotics" },
  { icon: Pill, label: "Psychotropic substances" },
  { icon: Pill, label: "Illegal drugs & controlled substances" },
];

const HIGH_VALUE_FRAGILE = [
  { icon: Banknote, label: "Currency & negotiable instruments" },
  { icon: Banknote, label: "Bullion & precious metals" },
  { icon: Gem, label: "Precious stones & high-value jewellery" },
  { icon: Package, label: "Fragile items without specialized packaging" },
];

const PERISHABLES = [
  { icon: Leaf, label: "Fresh food requiring temperature control" },
  { icon: Leaf, label: "Plants or live cuttings" },
  { icon: Leaf, label: "Perishables we don't currently offer cold chain for" },
];

const CATEGORIES = [
  { title: "Danger zone", subtitle: "Hazardous & dangerous goods", items: DANGER_ZONE, icon: Bomb },
  { title: "Illegal items", subtitle: "Controlled & prohibited by law", items: ILLEGAL_ITEMS, icon: Pill },
  { title: "High-value / fragile", subtitle: "Currency, bullion, fragile", items: HIGH_VALUE_FRAGILE, icon: Banknote },
  { title: "Perishables", subtitle: "Temperature-controlled we don't offer", items: PERISHABLES, icon: Leaf },
];

export default function ProhibitedPage() {
  return (
    <div className="corporate-layout flex min-h-screen flex-col bg-white font-sans antialiased">
      <LandingNav />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#121212]/70 hover:text-[#F40009]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <ScrollReveal className="mt-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl">
              Prohibited items
            </h1>
            <p className="mt-3 text-[#121212]/70">
              For safety and legal compliance, the following items may not be shipped via Shipco.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-10">
            <div
              className="flex items-start gap-4 rounded-2xl border-2 border-[#F40009]/30 bg-[#F40009]/5 p-6"
              role="alert"
            >
              <TriangleAlert className="h-8 w-8 shrink-0 text-[#F40009]" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-[#121212]">
                  Shipping prohibited items leads to immediate account suspension and legal reporting.
                </p>
                <p className="mt-2 text-sm text-[#121212]/80">
                  We inspect shipments when required and cooperate with authorities. You are solely responsible for ensuring your consignment complies with our policy and the law.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Shipco Shield: 3-column grid (on large screens; 2 then 1 on smaller) */}
          <ScrollReveal delay={0.15}>
            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold text-[#121212]">
              <ShieldCheck className="h-8 w-8 text-[#F40009]" strokeWidth={1.5} />
              Shipco Shield
            </h2>
            <p className="mt-2 text-[#121212]/70">
              Clear categories of what we do not accept. When in doubt, contact support before shipping.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => {
              const CategoryIcon = cat.icon;
              return (
                <ScrollReveal key={cat.title} delay={0.2 + i * 0.08}>
                  <div className="flex h-full flex-col rounded-2xl border border-[#121212]/10 bg-white/80 p-6 shadow-xl backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F40009]/10">
                      <CategoryIcon className="h-6 w-6 text-[#F40009]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#121212]">{cat.title}</h3>
                    <p className="mt-1 text-sm text-[#121212]/60">{cat.subtitle}</p>
                    <ul className="mt-4 space-y-2">
                      {cat.items.map(({ icon: ItemIcon, label }) => (
                        <li key={label} className="flex items-center gap-3 text-sm text-[#121212]/80">
                          <ItemIcon className="h-4 w-4 shrink-0 text-[#121212]/50" strokeWidth={1.5} />
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Merchant responsibility */}
          <ScrollReveal delay={0.25}>
            <div className="mt-14 rounded-2xl border-2 border-[#121212]/15 bg-[#121212]/[0.02] p-8 transition-all hover:-translate-y-2">
              <h3 className="text-xl font-bold text-[#121212]">Merchant responsibility</h3>
              <p className="mt-4 text-lg font-medium leading-relaxed text-[#121212]/90">
                By clicking &ldquo;Generate Waybill&rdquo;, the merchant certifies that the shipment contains no prohibited items and that the description, value, and weight are accurate. Breach of this certification may result in account suspension, forfeiture of the shipment, and reporting to the relevant authorities.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-[#121212]/10 pt-8">
            <Link href="/legal/terms" className="text-sm font-medium text-[#F40009] hover:underline">
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="text-sm font-medium text-[#121212]/70 hover:text-[#121212]">
              Privacy Policy
            </Link>
            <Link href="/" className="text-sm font-medium text-[#121212]/70 hover:text-[#121212]">
              Home
            </Link>
          </div>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
