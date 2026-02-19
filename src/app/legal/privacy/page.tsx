"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";

export default function PrivacyPage() {
  return (
    <div className="corporate-layout flex min-h-screen flex-col bg-white font-sans antialiased">
      <LandingNav />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#121212]/70 hover:text-[#e3201b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <header className="mt-8 border-b border-[#121212]/10 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-[#121212]/60">
              Last updated: February 2026. How we collect, use, and protect your data.
            </p>
          </header>

          <div className="prose prose-zinc mt-10 max-w-none">
            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">1. Data protection commitment</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                shipco (“we”, “us”) is committed to protecting your personal data in line with applicable laws, including the Nigeria Data Protection Regulation (NDPR) and other relevant legislation. This policy describes how we collect, use, store, and share information when you use our platform, website, or services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">2. Information we collect</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                We may collect: (a) account and profile information (name, email, phone, business details, address); (b) shipment and transaction data (origin, destination, weight, tracking events, payment information); (c) usage data (log data, device information, IP address); and (d) communications (support tickets, feedback). We collect this when you register, book shipments, use our tracking or wallet, or contact us.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">3. How we use your data</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                We use your data to provide and improve our services, process shipments, communicate with you, prevent fraud, comply with legal obligations, and send service-related or marketing communications where you have agreed. We do not sell your personal data to third parties for their marketing.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">4. Merchant privacy</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                If you use shipco as a merchant or business user, we process your business name, contact details, addresses, shipment history, and wallet/transaction data to fulfil contracts and provide the platform. We may share necessary data with hubs, riders, and partners involved in fulfilling your shipments. We retain shipment and financial records as required by law and our internal policies. You can request access, correction, or deletion of your data subject to legal and contractual constraints.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">5. Security and retention</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                We implement technical and organisational measures to protect your data against unauthorised access, loss, or misuse. We retain your data for as long as needed to provide services, resolve disputes, and comply with legal obligations. You may contact us to exercise your rights or ask questions about this policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">6. Contact</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                For privacy-related requests or questions, contact us via the details provided on our website or in your account. We will respond in accordance with applicable data protection law.
              </p>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-[#121212]/10 pt-8">
            <Link
              href="/legal/terms"
              className="text-sm font-medium text-[#e3201b] hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-[#121212]/70 hover:text-[#121212]"
            >
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
