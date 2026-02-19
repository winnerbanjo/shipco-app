"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Building2 } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

const HUBS = [
  { name: "Lagos Hub", address: "Lagos, Nigeria", region: "South-West" },
  { name: "Abuja Hub", address: "Abuja, FCT", region: "North-Central" },
  { name: "Port Harcourt Hub", address: "Port Harcourt, Rivers", region: "South-South" },
  { name: "Kano Hub", address: "Kano, Kano State", region: "North-West" },
  { name: "Enugu Hub", address: "Enugu, Enugu State", region: "South-East" },
];

export default function AboutPage() {
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
              About shipco
            </h1>
            <p className="mt-4 text-lg text-[#121212]/70">
              Our mission and where to find us.
            </p>
          </ScrollReveal>

          {/* Mission */}
          <section className="mt-16">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-[#121212] sm:text-3xl">
                Our mission
              </h2>
              <p className="mt-4 leading-relaxed text-[#121212]/80">
                shipco exists to make logistics simple, transparent, and reliable for businesses and individuals across Nigeria. We combine technology with a physical hub and rider network so that every shipment is tracked, insured, and delivered on time. We believe that moving goods should be as easy as sending a message — and we are built to deliver on that promise, one package at a time.
              </p>
            </ScrollReveal>
          </section>

          {/* Hub locations */}
          <section id="hubs" className="mt-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-[#121212] sm:text-3xl">
                <MapPin className="h-8 w-8 text-[#e3201b]" strokeWidth={1.5} />
                Hub locations
              </h2>
              <p className="mt-3 text-[#121212]/70">
                Drop off packages or collect at any of our strategic hubs.
              </p>
            </ScrollReveal>
            <ul className="mt-8 space-y-6">
              {HUBS.map((hub, i) => (
                <ScrollReveal key={hub.name} delay={i * 0.05}>
                  <li className="flex gap-4 rounded-2xl border border-[#121212]/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e3201b]/10">
                      <Building2 className="h-6 w-6 text-[#e3201b]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#121212]">{hub.name}</h3>
                      <p className="mt-1 text-sm text-[#121212]/70">{hub.address}</p>
                      <p className="mt-0.5 text-xs text-[#121212]/50">{hub.region}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </section>

          <ScrollReveal className="mt-16 text-center">
            <Link
              href="/auth/login?callbackUrl=/merchant/booking"
              className="inline-flex items-center justify-center rounded-xl bg-[#e3201b] px-8 py-4 text-base font-medium text-white shadow-lg shadow-[#e3201b]/25 transition-all hover:-translate-y-0.5 hover:bg-[#c41b17]"
            >
              Get Started
            </Link>
          </ScrollReveal>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
