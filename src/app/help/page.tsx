"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Rocket,
  Truck,
  Wallet,
  MapPin,
  PackageSearch,
  Code2,
  ChevronDown,
  MessageCircle,
  Mail,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

const CATEGORIES = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Account setup and first shipment.",
    href: "/help#getting-started",
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Prohibited items, packaging, and transit times.",
    href: "/help#shipping",
  },
  {
    icon: Wallet,
    title: "Payments & Wallet",
    description: "Funding, withdrawals, and invoicing.",
    href: "/help#payments",
  },
  {
    icon: MapPin,
    title: "Hubs & Pickup",
    description: "Finding locations and rider scheduling.",
    href: "/help#hubs",
  },
  {
    icon: PackageSearch,
    title: "Tracking",
    description: "Understanding status updates.",
    href: "/help#tracking",
  },
  {
    icon: Code2,
    title: "Business / API",
    description: "Integration for large merchants.",
    href: "/help#api",
  },
];

const FAQS = [
  {
    q: "How do I fund my wallet?",
    a: "Sign in to your merchant dashboard and go to Wallet. Click 'Fund wallet', enter the amount (minimum ₦100), and choose 'Open Paystack'. Complete the payment in the popup. Your balance updates once the payment is confirmed. For large or recurring top-ups, contact our team for bulk funding options.",
  },
  {
    q: "What happens if my package is delayed?",
    a: "We track every leg of your shipment. If there's a delay, you'll see status updates in the tracking view. Delays can happen due to weather, customs, or high volume. If your shipment is significantly late, contact support with your tracking ID—we'll investigate and, where applicable, follow our claims process. Delivery times are estimates unless you've booked an express guaranteed service.",
  },
  {
    q: "How do I become a shipco Partner?",
    a: "We work with hubs, riders, and enterprise clients. For hub or rider partnerships, email partnerships@shipco.com with your location and capacity. For high-volume or API integration, use the same email or visit our Services page to see Import/Export and Nationwide options. We'll guide you through onboarding and contracts.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. shipco offers Import and Export services with seamless clearing and forwarding. We handle documentation, customs, and first-mile and last-mile so you can ship to and from Nigeria. See our Import/Export flow and get a quote on the Services page.",
    link: { label: "Import/Export on Services", href: "/services#import-export" },
  },
];

const SUPPORT_LINKS = [
  { icon: MessageCircle, label: "WhatsApp Support", href: "https://wa.me/2348000000000", description: "Chat with us" },
  { icon: Mail, label: "Email Us", href: "mailto:support@shipco.com", description: "support@shipco.com" },
  { icon: MessageSquare, label: "Live Chat", href: "#", description: "Coming soon" },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

          {/* Hero */}
          <ScrollReveal className="mt-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl lg:text-6xl">
              How can we help you today?
            </h1>
            <p className="mt-4 text-lg text-[#121212]/70">
              Search articles or pick a category below.
            </p>
          </ScrollReveal>

          {/* Floating search bar */}
          <ScrollReveal delay={0.1} className="mt-12">
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#121212]/10 bg-white p-2 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <form
                role="search"
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-3 rounded-xl bg-[#121212]/[0.02] px-4 py-1"
              >
                <Search className="h-6 w-6 shrink-0 text-[#e3201b]" strokeWidth={1.5} aria-hidden />
                <input
                  type="search"
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-4 text-[#121212] placeholder:text-[#121212]/50 focus:outline-none"
                  aria-label="Search help"
                />
              </form>
            </div>
          </ScrollReveal>

          {/* Quick category grid */}
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                Browse by topic
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#121212]">
                Quick categories
              </p>
            </ScrollReveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <ScrollReveal key={cat.title} delay={0.05 + i * 0.06}>
                    <Link
                      href={cat.href}
                      id={cat.href.replace("/help#", "")}
                      className="group flex flex-col rounded-2xl border border-[#121212]/10 bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-[#e3201b]/20 scroll-mt-24"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10 text-[#e3201b] transition-colors group-hover:bg-[#e3201b]/15">
                        <Icon className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-[#121212]">{cat.title}</h3>
                      <p className="mt-2 text-sm text-[#121212]/70">{cat.description}</p>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>

          {/* Top FAQs accordion */}
          <section id="faq" className="mt-20">
            <ScrollReveal>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                Top questions
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#121212]">
                Frequently asked
              </p>
            </ScrollReveal>
            <div className="mt-10 space-y-3">
              {FAQS.map((faq, i) => (
                <ScrollReveal key={faq.q} delay={0.1 + i * 0.05}>
                  <div className="overflow-hidden rounded-2xl border border-[#121212]/10 bg-white shadow-sm transition-all hover:shadow-md">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#e3201b] focus:ring-inset"
                      aria-expanded={openFaqIndex === i}
                    >
                      {faq.q}
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#121212]/60 transition-transform ${
                          openFaqIndex === i ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaqIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#121212]/10 px-6 py-5">
                            <p className="text-[#121212]/80 leading-relaxed">{faq.a}</p>
                            {faq.link && (
                              <Link
                                href={faq.link.href}
                                className="mt-4 inline-block text-sm font-medium text-[#e3201b] hover:underline"
                              >
                                {faq.link.label} →
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Still need help? Contact Support */}
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                Still need help?
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#121212]">
                Contact support
              </p>
            </ScrollReveal>
            <div className="mt-10 rounded-2xl border border-[#121212]/10 bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl sm:p-10">
              <p className="text-lg text-[#121212]/80">
                Our team is here to help. Choose the option that works best for you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {SUPPORT_LINKS.map(({ icon: Icon, label, href, description }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex flex-col items-start rounded-xl border border-[#121212]/10 bg-[#121212]/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-[#e3201b]/30 hover:bg-[#e3201b]/5 min-w-[200px]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e3201b]/10">
                      <Icon className="h-6 w-6 text-[#e3201b]" strokeWidth={1.5} />
                    </div>
                    <span className="mt-4 font-semibold text-[#121212]">{label}</span>
                    <span className="mt-1 text-sm text-[#121212]/60">{description}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
