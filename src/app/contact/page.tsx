"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, MessageCircle, Mail, Phone } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

const OFFICES = [
  {
    title: "Lagos HQ",
    address: "Office 10 Ipaja, Modern Market, Lagos, Nigeria.",
    icon: MapPin,
  },
  {
    title: "USA HQ",
    address: "30 N Gould St Ste R, Sheridan, WY 82801, USA.",
    icon: MapPin,
  },
];

const SUPPORT_CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Chat with our team",
    href: "https://wa.me/2348000000000",
    label: "+234 800 000 0000",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "We reply within 24 hours",
    href: "mailto:support@shipco.com",
    label: "support@shipco.com",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Mon–Fri, 9am–6pm WAT",
    href: "tel:+2348000000000",
    label: "+234 800 000 0000",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: could POST to /api/contact
  }

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
            <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl">
              We&apos;re here to keep you moving.
            </h1>
            <p className="mt-4 text-lg text-[#121212]/70">
              Reach our global offices or reach out directly. We&apos;ll get back to you quickly.
            </p>
          </ScrollReveal>

          {/* Global Offices Grid */}
          <ScrollReveal delay={0.1}>
            <h2 className="mt-16 text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
              Global offices
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {OFFICES.map((office) => {
                const Icon = office.icon;
                return (
                  <div
                    key={office.title}
                    className="rounded-2xl border border-[#121212]/10 bg-white p-6 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-[#e3201b]/20"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e3201b]/10">
                      <Icon className="h-6 w-6 text-[#e3201b]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#121212]">{office.title}</h3>
                    <p className="mt-2 text-sm text-[#121212]/70">{office.address}</p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Direct Support - large animated cards */}
          <ScrollReveal delay={0.15}>
            <h2 className="mt-16 text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
              Direct support
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {SUPPORT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.title}
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex flex-col rounded-2xl border border-[#121212]/10 bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-[#e3201b]/30"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10 transition-colors group-hover:bg-[#e3201b]/15">
                      <Icon className="h-7 w-7 text-[#e3201b]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-[#121212]">{channel.title}</h3>
                    <p className="mt-1 text-sm text-[#121212]/60">{channel.description}</p>
                    <p className="mt-3 text-sm font-medium text-[#e3201b]">{channel.label}</p>
                  </a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Contact Form - Anti-Gravity */}
          <ScrollReveal delay={0.2}>
            <h2 className="mt-16 text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
              Send a message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-6 rounded-2xl border border-[#121212]/10 bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl sm:p-10"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                    placeholder="Company (optional)"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full resize-y rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-[#121212] placeholder:text-[#121212]/40 focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20"
                    placeholder="How can we help?"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-[#e3201b] px-6 py-4 text-base font-medium text-white shadow-lg shadow-[#e3201b]/25 transition-all hover:-translate-y-0.5 hover:bg-[#e3201b]/90 hover:shadow-xl"
              >
                Send message
              </button>
            </form>
          </ScrollReveal>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
