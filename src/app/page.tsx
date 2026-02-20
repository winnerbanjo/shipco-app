"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Bike,
  ArrowRight,
  Check,
  Truck,
  Globe,
  Warehouse,
  MapPin,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingNav } from "@/components/landing/LandingNav";
import { FatFooter } from "@/components/landing/FatFooter";
import { BackToTop } from "@/components/landing/BackToTop";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { saveBookingDraft, getQuickQuoteInputs, saveQuickQuoteInputs } from "@/lib/booking-draft";
import { computeLocalDispatchTotal } from "@/data/local-dispatch-pricing";

const CITIES = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
  "Enugu",
  "Benin City",
  "Kaduna",
  "Warri",
  "Calabar",
];

const LAGOS_AREAS = [
  "Ikeja",
  "Lekki",
  "Victoria Island",
  "Ajah",
  "Surulere",
  "Yaba",
  "Apapa",
  "Maryland",
  "Gbagada",
  "Ikorodu",
];

const COUNTRIES = ["USA", "UK", "China", "UAE", "Germany", "India", "South Africa", "Ghana"];

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "electronics", label: "Electronics" },
  { value: "fragile", label: "Fragile" },
];

type ServiceType = "local" | "nationwide" | "import" | "export";

const SERVICE_TABS: { id: ServiceType; label: string; icon: typeof MapPin }[] = [
  { id: "local", label: "Local", icon: MapPin },
  { id: "nationwide", label: "Nationwide", icon: Truck },
  { id: "import", label: "Import", icon: Globe },
  { id: "export", label: "Export", icon: Globe },
];

const STATS = [
  { value: "10k+", label: "Deliveries" },
  { value: "50+", label: "Hubs" },
  { value: "1hr", label: "Avg. Pickup" },
];

const SERVICE_DEEP_DIVE = [
  {
    icon: Truck,
    title: "Nationwide",
    href: "/services#nationwide",
    bullets: ["Door-to-door across all 36 states", "Hub-to-hub with real-time tracking", "Standard and express options"],
  },
  {
    icon: Globe,
    title: "Import/Export",
    href: "/services#import-export",
    bullets: ["Global clearing and forwarding", "Customs and documentation support", "Ocean and air freight"],
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    href: "/services#warehousing",
    bullets: ["Smart storage at strategic hubs", "Pick and pack on request", "Integrated outbound shipping"],
  },
  {
    icon: Bike,
    title: "Last-Mile",
    href: "/services#last-mile",
    bullets: ["Rider dispatch in metro areas", "Same-day and next-day slots", "Real-time ETA under 30 mins"],
  },
];

const TRUSTED_LOGOS = [
  "TechCorp",
  "RetailPlus",
  "FashionNG",
  "HealthFirst",
  "EduConnect",
  "BuildMax",
  "FoodHub",
  "AutoLink",
];

const TESTIMONIALS = [
  {
    quote: "shipco made our nationwide fulfillment seamless. Tracking and support are top-notch.",
    author: "Adebayo O.",
    role: "Operations, TechCorp",
  },
  {
    quote: "We ship fragile electronics daily. Their handling and on-time rate are exceptional.",
    author: "Chioma N.",
    role: "E-commerce Manager",
  },
  {
    quote: "From import clearance to last-mile, one platform. Saved us time and cost.",
    author: "Ibrahim K.",
    role: "Logistics Lead, RetailPlus",
  },
];

const DROPOFF_BULLETS = [
  "Instant waybill at the counter",
  "No pick-up fee — pay only for shipping",
  "Same-day dispatch from hub",
  "Secure insurance included",
  "Real-time tracking from handoff",
];

const PICKUP_BULLETS = [
  "Rider ETA under 30 minutes (metro areas)",
  "Door-to-door convenience",
  "Instant waybill + SMS confirmation",
  "Secure insurance included",
  "Flexible time windows",
];

const HERO_IMAGE = "/happy-client-with-their-box-delivered (1).jpg";

const inputClass =
  "mt-2 w-full rounded-xl border border-[#121212]/15 bg-white px-4 py-3 text-sm text-[#121212] focus:border-[#e3201b] focus:outline-none focus:ring-2 focus:ring-[#e3201b]/20 placeholder:text-[#121212]/40";

function SmartQuoteWidget() {
  const router = useRouter();
  const [service, setService] = useState<ServiceType>("nationwide");
  const [city, setCity] = useState("Lagos");
  const [originCity, setOriginCity] = useState("Lagos");
  const [destinationCity, setDestinationCity] = useState("");
  const [originLga, setOriginLga] = useState("");
  const [destLga, setDestLga] = useState("");
  const [area, setArea] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [category, setCategory] = useState("general");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const saved = getQuickQuoteInputs();
    if (!saved) return;
    if (saved.service) setService(saved.service as ServiceType);
    if (saved.city) setCity(saved.city);
    if (saved.originCity) setOriginCity(saved.originCity);
    if (saved.destinationCity) setDestinationCity(saved.destinationCity);
    if (saved.originLga) setOriginLga(saved.originLga);
    if (saved.destLga) setDestLga(saved.destLga);
    if (saved.area) setArea(saved.area);
    if (saved.originCountry) setOriginCountry(saved.originCountry);
    if (saved.destinationCountry) setDestinationCountry(saved.destinationCountry);
    if (saved.category) setCategory(saved.category);
    if (saved.weight) setWeight(saved.weight);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      saveQuickQuoteInputs({
        service,
        city,
        originCity,
        destinationCity,
        originLga,
        destLga,
        area,
        originCountry,
        destinationCountry,
        category,
        weight,
      });
    }, 400);
    return () => clearTimeout(t);
  }, [service, city, originCity, destinationCity, originLga, destLga, area, originCountry, destinationCountry, category, weight]);

  const isWithinLagos =
    service === "nationwide" && originCity === "Lagos" && destinationCity === "Lagos";
  const weightNum = parseFloat(weight) || 0;
  const localDispatchAmount = isWithinLagos && weightNum > 0 ? computeLocalDispatchTotal(weightNum) : 0;

  function handleGetQuoteAndBook() {
    const origin =
      service === "local" ? city : service === "nationwide" ? originCity : service === "import" ? originCountry : originCity;
    const destination =
      service === "local" ? area : service === "nationwide" ? destinationCity : service === "import" ? destinationCity : destinationCountry;
    const w = weightNum || 0;
    const quoteAmount =
      isWithinLagos && w > 0 ? localDispatchAmount : 0;
    saveBookingDraft(origin, destination, w, quoteAmount, {
      serviceType: service,
      ...(isWithinLagos && { originLga: originLga || undefined, destLga: destLga || undefined }),
    });
    const params = new URLSearchParams();
    params.set("callbackUrl", "/merchant/booking");
    if (origin) params.set("origin", origin);
    if (destination) params.set("destination", destination);
    if (w > 0) params.set("weight", String(w));
    if (service) params.set("service", service);
    router.push(`/auth/login?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-[#121212]/10 bg-white/80 p-6 shadow-xl backdrop-blur-md transition-all hover:shadow-2xl sm:p-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
        Quick Quote
      </h2>

      {/* Service selector tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {SERVICE_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setService(id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              service === id
                ? "bg-[#e3201b] text-white"
                : "bg-[#121212]/5 text-[#121212]/80 hover:bg-[#121212]/10 hover:text-[#121212]"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* Local: same city + Area/LGA */}
        {service === "local" && (
          <>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputClass}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                Select Area / LGA
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className={inputClass}
              >
                <option value="">Select area</option>
                {LAGOS_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Nationwide: Origin + Destination city; when both Lagos → LGA selector */}
        {service === "nationwide" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                  Origin (City)
                </label>
                <select
                  value={originCity}
                  onChange={(e) => {
                    setOriginCity(e.target.value);
                    if (e.target.value !== "Lagos") setOriginLga("");
                  }}
                  className={inputClass}
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                  Destination (City)
                </label>
                <select
                  value={destinationCity}
                  onChange={(e) => {
                    setDestinationCity(e.target.value);
                    if (e.target.value !== "Lagos") setDestLga("");
                  }}
                  className={inputClass}
                >
                  <option value="">Select city</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            {isWithinLagos && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                      Origin LGA / Area
                    </label>
                    <select
                      value={originLga}
                      onChange={(e) => setOriginLga(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select area</option>
                      {LAGOS_AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                      Destination LGA / Area
                    </label>
                    <select
                      value={destLga}
                      onChange={(e) => setDestLga(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select area</option>
                      {LAGOS_AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {weightNum > 0 && (
                  <p className="text-sm font-medium text-[#e3201b]">
                    Local Dispatch: ₦{localDispatchAmount.toLocaleString("en-NG")} (flat + ₦{120}/kg)
                  </p>
                )}
              </>
            )}
          </>
        )}

        {/* Import: Origin country, Destination Nigeria city, Category */}
        {service === "import" && (
          <>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                Origin (Country)
              </label>
              <select
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                className={inputClass}
              >
                <option value="">Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                Destination (Nigeria)
              </label>
              <select
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className={inputClass}
              >
                <option value="">Select city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Export: Origin Nigeria city, Destination country, Category */}
        {service === "export" && (
          <>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                Origin (Nigeria)
              </label>
              <select
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                className={inputClass}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                Destination (Country)
              </label>
              <select
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                className={inputClass}
              >
                <option value="">Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#121212]/60">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Weight: all service types */}
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
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleGetQuoteAndBook}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e3201b] px-6 py-4 text-base font-medium text-white shadow-lg shadow-[#e3201b]/25 transition-all hover:-translate-y-0.5 hover:bg-[#e3201b]/90 hover:shadow-xl"
      >
        Get Quote & Book
        <ArrowRight className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  );
}

function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="min-h-[200px] px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <Quote className="mx-auto h-10 w-10 text-[#e3201b]/30" strokeWidth={1} />
            <blockquote className="mt-4 text-lg font-medium leading-relaxed text-[#121212] sm:text-xl">
              &ldquo;{TESTIMONIALS[index].quote}&rdquo;
            </blockquote>
            <footer className="mt-6">
              <p className="font-semibold text-[#121212]">{TESTIMONIALS[index].author}</p>
              <p className="text-sm text-[#121212]/60">{TESTIMONIALS[index].role}</p>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="rounded-full p-2 text-[#121212]/60 transition-colors hover:bg-[#121212]/5 hover:text-[#121212]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[#e3201b]" : "w-2 bg-[#121212]/20 hover:bg-[#121212]/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
          className="rounded-full p-2 text-[#121212]/60 transition-colors hover:bg-[#121212]/5 hover:text-[#121212]"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="landing-page flex min-h-screen flex-col font-sans antialiased">
      <LandingNav />

      <main className="flex-1">
        {/* Split-screen Hero */}
        <section className="relative px-6 pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="flex flex-col">
              <ScrollReveal>
                <h1 className="text-4xl font-extrabold tracking-tight text-[#121212] sm:text-5xl lg:text-6xl">
                  Global Logistics, Locally Mastered.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-6 text-lg text-[#121212]/70">
                  Reliable shipping for businesses and individuals across Nigeria.
                  Get a quote and book in seconds.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="mt-10">
                <SmartQuoteWidget />
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.15} className="relative flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-[#121212]/5 shadow-2xl transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] hover:-translate-y-2 animate-float">
                <Image
                  src={HERO_IMAGE}
                  alt="Happy client with their box delivered — shipco delivery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Animated Stats Bar (floating, fade-in) */}
          <ScrollReveal className="mx-auto mt-12 max-w-3xl">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-[#121212]/10 bg-white/80 px-8 py-6 shadow-xl backdrop-blur-md">
              {STATS.map(({ value, label }, i) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#e3201b] sm:text-3xl">{value}</span>
                  <span className="text-sm font-medium text-[#121212]/70">{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Live Status ticker */}
          <ScrollReveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-[#121212]/10 bg-white/60 px-6 py-4 text-sm text-[#121212]/70 backdrop-blur-md">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                1,240 deliveries today
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                99.8% on-time rate
              </span>
            </div>
          </ScrollReveal>
        </section>

        {/* Trusted By marquee */}
        <section className="border-y border-[#121212]/10 bg-[#121212]/[0.02] py-12">
          <ScrollReveal>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#121212]/50">
              Trusted by leading brands
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05} className="mt-8 overflow-hidden">
            <div className="flex animate-marquee gap-16 whitespace-nowrap">
              {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-lg font-semibold text-[#121212]/30 grayscale"
                >
                  {name}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Service Deep-Dive: 4 high-detail cards with 3 bullets + Learn More */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                Service deep-dive
              </h2>
              <p className="mt-2 text-center text-3xl font-bold tracking-tight text-[#121212] sm:text-4xl">
                End-to-end solutions for every need
              </p>
            </ScrollReveal>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICE_DEEP_DIVE.map(({ icon: Icon, title, href, bullets }, i) => (
                <ScrollReveal key={title} delay={0.05 + i * 0.1}>
                  <div className="flex h-full flex-col rounded-2xl border border-[#121212]/10 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10 text-[#e3201b]">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#121212]">{title}</h3>
                    <ul className="mt-4 flex-1 space-y-2">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-[#121212]/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e3201b]" strokeWidth={2} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#e3201b] hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="border-t border-[#121212]/10 bg-[#121212]/[0.02] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                How it works
              </h2>
              <p className="mt-2 text-center text-3xl font-bold tracking-tight text-[#121212] sm:text-4xl">
                Three steps to ship
              </p>
            </ScrollReveal>
            <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
              <div className="absolute left-1/4 right-1/4 top-7 hidden h-0.5 bg-[#121212]/10 sm:block" aria-hidden />
              {[
                { step: 1, title: "Get a quote & book", body: "Enter origin, destination, and weight. Book in one click." },
                { step: 2, title: "Drop off or get picked up", body: "Visit a hub or schedule a rider pick-up at your door." },
                { step: 3, title: "Track & deliver", body: "Follow in real time. We deliver safely and on time." },
              ].map(({ step, title, body }) => (
                <ScrollReveal key={step} delay={0.1 + step * 0.08}>
                  <div className="group relative z-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e3201b] text-lg font-bold text-white shadow-lg shadow-[#e3201b]/30">
                      {step}
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-[#121212]">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#121212]/70">{body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-[#121212]/10 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                What our customers say
              </h2>
              <p className="mt-2 text-center text-2xl font-bold tracking-tight text-[#121212] sm:text-3xl">
                Trusted by businesses nationwide
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mt-16">
              <TestimonialSlider />
            </ScrollReveal>
          </div>
        </section>

        {/* Service Modes */}
        <section id="services" className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal>
              <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-[#121212]/60">
                Service modes
              </h2>
              <p className="mt-2 text-center text-3xl font-bold tracking-tight text-[#121212] sm:text-4xl">
                Drop-off or pick-up — you choose
              </p>
            </ScrollReveal>
            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-[#121212]/10 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-2xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10">
                    <Building2 className="h-7 w-7 text-[#e3201b]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-[#121212]">Drop-off at Hub</h3>
                  <p className="mt-2 text-[#121212]/70">Save more when you bring your package to the nearest hub.</p>
                  <ul className="mt-6 space-y-3">
                    {DROPOFF_BULLETS.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#121212]/80">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e3201b]" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="rounded-2xl border border-[#121212]/10 bg-white/80 p-8 shadow-xl backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-2xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3201b]/10">
                    <Bike className="h-7 w-7 text-[#e3201b]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-[#121212]">Rider Pick-up</h3>
                  <p className="mt-2 text-[#121212]/70">We come to you. Schedule a pick-up at your door.</p>
                  <ul className="mt-6 space-y-3">
                    {PICKUP_BULLETS.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#121212]/80">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#e3201b]" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <FatFooter />
      </main>

      <BackToTop />
    </div>
  );
}
