"use client";

import Link from "next/link";
import { ArrowLeft, Building2, Code2, Bike, ArrowRight } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

const CAREER_CATEGORIES = [
  {
    icon: Building2,
    title: "Operations & Hubs",
    description: "Run our hubs, manage inventory, and keep the network moving.",
    roles: ["Hub Manager", "Operations Lead", "Inventory Associate", "Sorting & Dispatch"],
    href: "/careers#operations",
  },
  {
    icon: Code2,
    title: "Technology",
    description: "Build and maintain the platforms that power Shipco.",
    roles: ["Software Engineer", "Product Designer", "Data Analyst", "DevOps Engineer"],
    href: "/careers#technology",
  },
  {
    icon: Bike,
    title: "Last-Mile Riders",
    description: "Be the face of delivery. Flexible schedules, competitive pay.",
    roles: ["Delivery Rider", "Rider Team Lead", "Fleet Coordinator"],
    href: "/careers#riders",
  },
];

export default function CareersPage() {
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
            <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl lg:text-6xl">
              Help Us Move the World.
            </h1>
            <p className="mt-6 text-lg text-[#121212]/70">
              Join a team that’s redefining logistics in Nigeria. Open roles across operations, technology, and last-mile delivery.
            </p>
          </ScrollReveal>

          <div className="mt-16 space-y-8">
            {CAREER_CATEGORIES.map(({ icon: Icon, title, description, roles, href }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div
                  id={href.replace("/careers#", "")}
                  className="scroll-mt-24 rounded-2xl border border-[#121212]/10 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F40009]/10">
                      <Icon className="h-7 w-7 text-[#F40009]" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold text-[#121212]">{title}</h2>
                      <p className="mt-2 text-[#121212]/70">{description}</p>
                      <ul className="mt-4 space-y-2">
                        {roles.map((role) => (
                          <li key={role} className="flex items-center gap-2 text-sm text-[#121212]/80">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F40009]" />
                            {role}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="mailto:careers@shipco.com?subject=Application"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#F40009] hover:underline"
                      >
                        Apply for this area
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-16 text-center">
            <p className="text-[#121212]/70">
              Send your CV to{" "}
              <a href="mailto:careers@shipco.com" className="font-medium text-[#F40009] hover:underline">
                careers@shipco.com
              </a>{" "}
              with the role title in the subject line.
            </p>
          </ScrollReveal>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
