"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type UserType = "personal" | "business";

export type PersonalFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type BusinessFormData = {
  name: string;
  email: string;
  password: string;
  companyName: string;
  industry: string;
};

const INPUT_CLASS =
  "mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-sans text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#F40009] focus:outline-none focus:ring-2 focus:ring-[#F40009]/20";
const LABEL_CLASS = "block text-xs font-medium uppercase tracking-wider text-zinc-500 font-sans";

export default function MerchantSignupPage() {
  const [userType, setUserType] = useState<UserType>("personal");
  const [personalData, setPersonalData] = useState<PersonalFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [businessData, setBusinessData] = useState<BusinessFormData>({
    name: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
  });
  const [businessStep, setBusinessStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handlePersonalSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/merchant-kyc-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: "personal",
          email: personalData.email,
          password: personalData.password,
          fullName: personalData.name,
          phone: personalData.phone,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Sign-up failed");
      window.location.href = data.redirectTo || "/merchant/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-up failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleBusinessSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/merchant-kyc-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: "business",
          email: businessData.email,
          password: businessData.password,
          fullName: businessData.name,
          businessKyc: {
            companyName: businessData.companyName,
            industry: businessData.industry,
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Sign-up failed");
      window.location.href = data.redirectTo || "/merchant/kyc";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-up failed");
    } finally {
      setSubmitting(false);
    }
  }

  const personalValid =
    personalData.name.trim() &&
    personalData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email) &&
    personalData.password.length >= 6;

  const businessStep1Valid =
    businessData.name.trim() &&
    businessData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessData.email) &&
    businessData.password.length >= 6;
  const businessStep2Valid = businessData.companyName.trim() && businessData.industry.trim();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-xl px-6 py-12">
        <header className="flex items-center gap-4 border-b border-zinc-100 pb-8">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl bg-white">
            <Image src="/shipco-logo.png" alt="Shipco" fill className="object-contain" sizes="40px" />
          </div>
          <div>
            <h1 className="font-sans text-2xl font-semibold tracking-tighter text-zinc-900">
              Merchant Sign-Up
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {userType === "personal" ? "Personal account" : businessStep === 1 ? "Account details" : "Business details"}
            </p>
          </div>
        </header>

        {/* User Type Toggle */}
        <div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-2">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => { setUserType("personal"); setError(""); setBusinessStep(1); }}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                userType === "personal"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Personal
            </button>
            <button
              type="button"
              onClick={() => { setUserType("business"); setError(""); setBusinessStep(1); }}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                userType === "business"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              Business
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {userType === "personal" && (
            <form onSubmit={handlePersonalSubmit} className="space-y-6">
              <div>
                <label htmlFor="p-name" className={LABEL_CLASS}>Name</label>
                <input
                  id="p-name"
                  type="text"
                  value={personalData.name}
                  onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
                  placeholder="Your full name"
                  className={INPUT_CLASS}
                  required
                />
              </div>
              <div>
                <label htmlFor="p-email" className={LABEL_CLASS}>Email</label>
                <input
                  id="p-email"
                  type="email"
                  value={personalData.email}
                  onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                  placeholder="you@example.com"
                  className={INPUT_CLASS}
                  required
                />
              </div>
              <div>
                <label htmlFor="p-phone" className={LABEL_CLASS}>Phone</label>
                <input
                  id="p-phone"
                  type="tel"
                  value={personalData.phone}
                  onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                  placeholder="+234 800 000 0000"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="p-password" className={LABEL_CLASS}>Password</label>
                <input
                  id="p-password"
                  type="password"
                  value={personalData.password}
                  onChange={(e) => setPersonalData({ ...personalData, password: e.target.value })}
                  placeholder="Min 6 characters"
                  minLength={6}
                  className={INPUT_CLASS}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!personalValid || submitting}
                className="w-full rounded-2xl bg-[#F40009] py-4 text-sm font-medium text-white hover:bg-[#cc0008] disabled:opacity-50 font-sans transition-colors"
              >
                {submitting ? "Creating account…" : "Continue to Dashboard"}
              </button>
            </form>
          )}

          {userType === "business" && (
            <>
              {businessStep === 1 && (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (businessStep1Valid) setBusinessStep(2); }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="b-name" className={LABEL_CLASS}>Your Name</label>
                    <input
                      id="b-name"
                      type="text"
                      value={businessData.name}
                      onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                      placeholder="Full name"
                      className={INPUT_CLASS}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="b-email" className={LABEL_CLASS}>Email</label>
                    <input
                      id="b-email"
                      type="email"
                      value={businessData.email}
                      onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                      placeholder="you@company.com"
                      className={INPUT_CLASS}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="b-password" className={LABEL_CLASS}>Password</label>
                    <input
                      id="b-password"
                      type="password"
                      value={businessData.password}
                      onChange={(e) => setBusinessData({ ...businessData, password: e.target.value })}
                      placeholder="Min 6 characters"
                      minLength={6}
                      className={INPUT_CLASS}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!businessStep1Valid}
                    className="w-full rounded-2xl bg-[#F40009] py-4 text-sm font-medium text-white hover:bg-[#cc0008] disabled:opacity-50 font-sans transition-colors"
                  >
                    Continue
                  </button>
                </form>
              )}
              {businessStep === 2 && (
                <form onSubmit={handleBusinessSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="b-company" className={LABEL_CLASS}>Company Name</label>
                    <input
                      id="b-company"
                      type="text"
                      value={businessData.companyName}
                      onChange={(e) => setBusinessData({ ...businessData, companyName: e.target.value })}
                      placeholder="Registered business name"
                      className={INPUT_CLASS}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="b-industry" className={LABEL_CLASS}>Industry</label>
                    <input
                      id="b-industry"
                      type="text"
                      value={businessData.industry}
                      onChange={(e) => setBusinessData({ ...businessData, industry: e.target.value })}
                      placeholder="e.g. Retail, Logistics, F&B"
                      className={INPUT_CLASS}
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setBusinessStep(1)}
                      className="flex-1 rounded-2xl border border-zinc-200 bg-white py-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 font-sans"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!businessStep2Valid || submitting}
                      className="flex-1 rounded-2xl bg-[#F40009] py-4 text-sm font-medium text-white hover:bg-[#cc0008] disabled:opacity-50 font-sans transition-colors"
                    >
                      {submitting ? "Creating account…" : "Continue to KYC"}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        <p className="mt-10 text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#F40009] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
