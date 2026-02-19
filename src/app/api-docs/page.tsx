"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";

const SECTIONS = [
  { id: "authentication", title: "Authentication" },
  { id: "create-shipment", title: "Create Shipment" },
  { id: "track-shipment", title: "Track Shipment" },
  { id: "webhook-integration", title: "Webhook Integration" },
];

export default function ApiDocsPage() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("authentication");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function copyApiKey() {
    void navigator.clipboard.writeText("sk_live_xxxxxxxxxxxxxxxx");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="corporate-layout flex min-h-screen flex-col bg-white font-sans antialiased">
      <LandingNav />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#121212]/70 hover:text-[#e3201b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row">
            {/* Left: Documentation */}
            <div className="min-w-0 flex-1 lg:max-w-[55%]">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#121212] sm:text-4xl">
                API Documentation
              </h1>
              <p className="mt-2 text-[#121212]/70">
                Integrate shipco into your app with our REST API. All requests use JSON and require authentication.
              </p>

              {/* Copy API Key box */}
              <div className="mt-8 rounded-2xl border border-[#121212]/10 bg-[#121212]/[0.03] p-6">
                <p className="text-sm font-semibold text-[#121212]">API Key</p>
                <p className="mt-1 text-xs text-[#121212]/60">
                  Use this in the <code className="rounded bg-[#121212]/10 px-1.5 py-0.5 font-mono text-xs">Authorization</code> header.
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#121212]/15 bg-white px-4 py-3 font-mono text-sm text-[#121212]/80">
                  <span className="truncate">sk_live_xxxxxxxxxxxxxxxx</span>
                  <button
                    type="button"
                    onClick={copyApiKey}
                    className="ml-auto flex shrink-0 items-center gap-2 rounded-lg bg-[#e3201b] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#e3201b]/90"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy API Key"}
                  </button>
                </div>
              </div>

              {/* Section: Authentication */}
              <section id="authentication" className="mt-12 scroll-mt-24">
                <h2 className="text-xl font-bold text-[#121212]">Authentication</h2>
                <p className="mt-2 text-[#121212]/70">
                  Include your API key in every request using the <code className="rounded bg-[#121212]/10 px-1.5 py-0.5 font-mono text-xs">Authorization</code> header with Bearer scheme.
                </p>
                <div className="mt-4 rounded-xl border border-[#121212]/10 bg-[#0d1117] p-4 font-mono text-sm text-[#e6edf3]">
                  <div className="text-[#8b949e]">Authorization: Bearer sk_live_xxxxxxxxxxxxxxxx</div>
                </div>
              </section>

              {/* Section: Create Shipment */}
              <section id="create-shipment" className="mt-12 scroll-mt-24">
                <h2 className="text-xl font-bold text-[#121212]">Create Shipment</h2>
                <p className="mt-2 text-[#121212]/70">
                  POST to <code className="rounded bg-[#121212]/10 px-1.5 py-0.5 font-mono text-xs">/v1/shipments</code> with origin, destination, and parcel details. Returns a shipment ID and tracking number.
                </p>
                <div className="mt-4 rounded-xl border border-[#121212]/10 bg-[#0d1117] p-4 font-mono text-sm text-[#e6edf3]">
                  <div><span className="text-[#ff7b72]">POST</span> https://api.shipco.com/v1/shipments</div>
                  <div className="mt-2 text-[#8b949e]">{"{"}</div>
                  <div className="pl-4"><span className="text-[#79c0ff]">&quot;origin&quot;</span>: <span className="text-[#a5d6ff]">&quot;Lagos&quot;</span>,</div>
                  <div className="pl-4"><span className="text-[#79c0ff]">&quot;destination&quot;</span>: <span className="text-[#a5d6ff]">&quot;Abuja&quot;</span>,</div>
                  <div className="pl-4"><span className="text-[#79c0ff]">&quot;weight_kg&quot;</span>: <span className="text-[#79c0ff]">2.5</span></div>
                  <div className="text-[#8b949e]">{"}"}</div>
                </div>
              </section>

              {/* Section: Track Shipment */}
              <section id="track-shipment" className="mt-12 scroll-mt-24">
                <h2 className="text-xl font-bold text-[#121212]">Track Shipment</h2>
                <p className="mt-2 text-[#121212]/70">
                  GET <code className="rounded bg-[#121212]/10 px-1.5 py-0.5 font-mono text-xs">/v1/shipments/:id</code> or <code className="rounded bg-[#121212]/10 px-1.5 py-0.5 font-mono text-xs">/v1/track?tracking_number=XXX</code> for real-time status and events.
                </p>
                <div className="mt-4 rounded-xl border border-[#121212]/10 bg-[#0d1117] p-4 font-mono text-sm text-[#e6edf3]">
                  <div><span className="text-[#7ee787]">GET</span> https://api.shipco.com/v1/track?tracking_number=SC123456789</div>
                </div>
              </section>

              {/* Section: Webhook Integration */}
              <section id="webhook-integration" className="mt-12 scroll-mt-24">
                <h2 className="text-xl font-bold text-[#121212]">Webhook Integration</h2>
                <p className="mt-2 text-[#121212]/70">
                  Register a URL in your dashboard to receive events (e.g. <code className="rounded bg-[#121212]/10 px-1.5 py-0.5 font-mono text-xs">shipment.created</code>, <code className="rounded bg-[#121212]/10 px-1.5 py-0.5 font-mono text-xs">shipment.delivered</code>). We send a signed payload; verify the signature using your webhook secret.
                </p>
                <div className="mt-4 rounded-xl border border-[#121212]/10 bg-[#0d1117] p-4 font-mono text-sm text-[#e6edf3]">
                  <div className="text-[#8b949e]">{"{"}</div>
                  <div className="pl-4"><span className="text-[#79c0ff]">&quot;event&quot;</span>: <span className="text-[#a5d6ff]">&quot;shipment.delivered&quot;</span>,</div>
                  <div className="pl-4"><span className="text-[#79c0ff]">&quot;tracking_number&quot;</span>: <span className="text-[#a5d6ff]">&quot;SC123456789&quot;</span>,</div>
                  <div className="pl-4"><span className="text-[#79c0ff]">&quot;timestamp&quot;</span>: <span className="text-[#a5d6ff]">&quot;2026-02-18T12:00:00Z&quot;</span></div>
                  <div className="text-[#8b949e]">{"}"}</div>
                </div>
              </section>
            </div>

            {/* Right: Dark code preview (sticky) */}
            <div className="lg:w-[45%]">
              <div className="sticky top-24 rounded-2xl border border-[#121212]/15 bg-[#0d1117] p-6 shadow-2xl">
                <div className="mb-4 flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="font-mono text-sm text-[#e6edf3]">
                  {activeSection === "authentication" && (
                    <>
                      <div className="text-[#8b949e]"># Request</div>
                      <div className="mt-2"><span className="text-[#ff7b72]">curl</span> -X POST \</div>
                      <div className="pl-4">-H <span className="text-[#a5d6ff]">&quot;Authorization: Bearer $API_KEY&quot;</span> \</div>
                      <div className="pl-4">https://api.shipco.com/v1/shipments</div>
                    </>
                  )}
                  {activeSection === "create-shipment" && (
                    <>
                      <div className="text-[#8b949e]"># Create shipment</div>
                      <div className="mt-2"><span className="text-[#ff7b72]">POST</span> /v1/shipments</div>
                      <div className="mt-4 text-[#8b949e]">{"{"}</div>
                      <div className="pl-4"><span className="text-[#79c0ff]">&quot;origin&quot;</span>: <span className="text-[#a5d6ff]">&quot;Lagos&quot;</span>,</div>
                      <div className="pl-4"><span className="text-[#79c0ff]">&quot;destination&quot;</span>: <span className="text-[#a5d6ff]">&quot;Abuja&quot;</span>,</div>
                      <div className="pl-4"><span className="text-[#79c0ff]">&quot;weight_kg&quot;</span>: <span className="text-[#79c0ff]">2.5</span></div>
                      <div className="text-[#8b949e]">{"}"}</div>
                    </>
                  )}
                  {activeSection === "track-shipment" && (
                    <>
                      <div className="text-[#8b949e]"># Track by ID or number</div>
                      <div className="mt-2"><span className="text-[#7ee787]">GET</span> /v1/track?tracking_number=SC123456789</div>
                    </>
                  )}
                  {activeSection === "webhook-integration" && (
                    <>
                      <div className="text-[#8b949e]"># Webhook payload example</div>
                      <div className="mt-2 text-[#8b949e]">{"{"}</div>
                      <div className="pl-4"><span className="text-[#79c0ff]">&quot;event&quot;</span>: <span className="text-[#a5d6ff]">&quot;shipment.delivered&quot;</span>,</div>
                      <div className="pl-4"><span className="text-[#79c0ff]">&quot;tracking_number&quot;</span>: <span className="text-[#a5d6ff]">&quot;SC123456789&quot;</span></div>
                      <div className="text-[#8b949e]">{"}"}</div>
                    </>
                  )}
                </div>
              </div>

              {/* Section nav for mobile / sync active */}
              <nav className="mt-6 flex flex-wrap gap-2 lg:mt-0">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className="rounded-lg border border-[#121212]/15 bg-white px-3 py-2 text-xs font-medium text-[#121212]/80 hover:border-[#e3201b]/40 hover:text-[#e3201b]"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
