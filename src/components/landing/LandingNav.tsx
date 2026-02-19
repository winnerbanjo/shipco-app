"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Tracking", href: "/tracking" },
  { label: "Pricing", href: "/pricing" },
  { label: "Hub Locations", href: "/about#hubs" },
  { label: "Contact", href: "/contact" },
  { label: "API Docs", href: "/api-docs" },
];

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#121212]/5 bg-white/70 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
<Link
            href="/"
            className="shrink-0 font-sans text-xl font-extrabold tracking-tighter text-[#121212]"
          >
            shipco
          </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="relative text-sm font-medium text-[#121212]/70 after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-[#e3201b] after:transition-[width] after:duration-200 hover:text-[#121212] hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-[#121212]/80 transition-colors hover:bg-[#121212]/5 hover:text-[#121212]"
          >
            Sign In
          </Link>
          <Link
            href="/auth/login?callbackUrl=/merchant/booking"
            className="rounded-full bg-[#e3201b] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#e3201b]/25 transition-all hover:-translate-y-0.5 hover:bg-[#e3201b]/90 hover:shadow-xl hover:shadow-[#e3201b]/30"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
