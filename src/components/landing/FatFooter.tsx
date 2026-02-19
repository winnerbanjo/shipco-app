"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export function FatFooter() {
  return (
    <footer className="mt-auto border-t border-[#121212]/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Branding & Socials */}
          <div>
            <Link
              href="/"
              className="font-sans text-xl font-extrabold tracking-tight text-[#121212]"
            >
              Shipco
            </Link>
            <p className="mt-3 text-sm text-[#121212]/60">
              Modern logistics for Nigeria. Ship smarter, track easier.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212]/50 transition-colors hover:text-[#F40009]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212]/50 transition-colors hover:text-[#F40009]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212]/50 transition-colors hover:text-[#F40009]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 2. Solutions */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
              Solutions
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/services" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Personal
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Corporate
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
              Support
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/help" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Company & Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#121212]">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/careers" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/prohibited" className="text-sm text-[#121212]/60 hover:text-[#121212]">
                  Prohibited Items
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#121212]/10 px-6 py-5">
        <div className="mx-auto max-w-6xl text-center text-sm text-[#121212]/50">
          © 2026 Nile Africa Technologies. Built in Lagos.
        </div>
      </div>
    </footer>
  );
}
