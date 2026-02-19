"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="mt-3 text-[#121212]/60">
              Last updated: February 2026. Please read these terms before using shipco services.
            </p>
          </header>

          <div className="prose prose-zinc mt-10 max-w-none">
            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">1. Acceptance of terms</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                By accessing or using shipco’s platform, websites, or services (collectively, the “Services”), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the Services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">2. Shipping terms</h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-[#121212]/80">
                <li>Rates are based on origin, destination, weight, and service type. Quotes are valid for the period stated at the time of booking.</li>
                <li>You are responsible for accurate description of contents, weight, and dimensions. Incorrect information may result in re-weighing, re-rating, or refusal of shipment.</li>
                <li>Delivery times are estimates and not guaranteed unless expressly agreed in writing (e.g. express service). We are not liable for delays due to customs, weather, or events outside our control.</li>
                <li>You must ensure that the recipient address is correct and that someone is available to receive the shipment where required.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">3. Limitation of liability</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                shipco is not liable for loss, damage, or delay caused by third parties (including but not limited to customs, carriers, sub-contractors, or recipients), force majeure, your misdeclaration of contents or value, or your failure to comply with these terms. Where we are liable, our liability is limited to the amount set out in your service agreement or the declared value of the shipment, whichever is lower, and we do not accept liability for indirect, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">4. Weight verification</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                All shipments are subject to weight verification at our hubs or by our partners. If the verified weight exceeds the weight declared at booking, we may re-rate the shipment and charge the difference. Dimensional weight may apply where volumetric weight exceeds actual weight. You agree to pay any applicable re-rating or surcharges before release of the shipment.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">5. Insurance claims</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                Insurance claims for loss or damage must be submitted in writing within the period specified in your policy (typically 30 days from delivery or expected delivery). We may require proof of value, condition prior to shipment, and evidence of loss or damage. Claims are processed in accordance with the insurance terms. We do not guarantee approval of any claim; fraudulent or exaggerated claims may result in account suspension and referral to authorities.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">6. Payment terms</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                You must pay all applicable charges (freight, fees, surcharges, and taxes) before or at the time of shipment unless you have an approved credit account. For wallet-funded shipments, sufficient balance must be available at booking. Failed or reversed payments may result in suspension of services and collection action. We may set off any amounts you owe against credits or refunds. All amounts are in Nigerian Naira (NGN) unless otherwise stated.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">7. Claims and liability (general)</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                Claims for loss, damage, or delay must be reported in writing within the timeframe specified in your service agreement (typically within 30 days of delivery or expected delivery). We may require proof of value and condition. Our liability is limited as set out in your contract and applicable law; we do not accept liability for indirect or consequential loss. Insurance may be purchased for higher value shipments.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">8. Prohibited items</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                You may not ship items that are illegal, hazardous, or otherwise prohibited by law or our policies. Prohibited items include but are not limited to:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-[#121212]/80">
                <li>Explosives, flammables, and hazardous materials (unless properly declared and permitted)</li>
                <li>Counterfeit or pirated goods</li>
                <li>Weapons, ammunition, and controlled substances</li>
                <li>Live animals (except where explicitly permitted)</li>
                <li>Currency, negotiable instruments, or items prohibited by customs or local law</li>
              </ul>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                We reserve the right to inspect, refuse, or dispose of any shipment that we reasonably believe violates these rules. You are solely responsible for compliance with all applicable laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-xl font-bold text-[#121212]">9. General</h2>
              <p className="mt-3 leading-relaxed text-[#121212]/80">
                These terms are governed by the laws of Nigeria. We may update these terms from time to time; continued use of the Services after changes constitutes acceptance. For questions, contact us via the details on our website.
              </p>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-[#121212]/10 pt-8">
            <Link href="/legal/privacy" className="text-sm font-medium text-[#e3201b] hover:underline">
              Privacy Policy
            </Link>
            <Link href="/legal/prohibited" className="text-sm font-medium text-[#121212]/70 hover:text-[#121212]">
              Prohibited Items
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
