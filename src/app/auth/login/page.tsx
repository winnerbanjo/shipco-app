"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { setDemoMerchantSession, setDemoMerchantPendingSession, setDemoHubSession } from "./actions";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [logoError, setLogoError] = useState(false);
  const errorParam = searchParams.get("error");
  const isUnauthorized = errorParam === "unauthorized";
  const callbackUrl = searchParams.get("callbackUrl") ?? "";

  function handleAdminDemo() {
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 font-sans">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          {!logoError ? (
            <Image
              src="/shipco-logo.png"
              alt="Shipco"
              width={96}
              height={96}
              className="h-24 w-24 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <p className="text-center text-2xl font-bold tracking-[0.2em] text-[#F40009]">
              Shipco
            </p>
          )}
        </div>

        <div className="w-full border border-zinc-100 bg-white p-8">
          {isUnauthorized && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-center text-sm text-amber-800">
              You don’t have access to that area. Sign in with the correct account (Admin or Hub).
            </div>
          )}
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Merchant Sign In
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <form action={setDemoMerchantSession}>
              {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#F40009] py-4 text-sm font-medium text-white hover:bg-[#cc0008] transition-colors"
              >
                Merchant Demo (Approved)
              </button>
            </form>
            <form action={setDemoMerchantPendingSession}>
              {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}
              <button
                type="submit"
                className="w-full rounded-2xl border border-[#F40009] bg-white py-4 text-sm font-medium text-[#F40009] hover:bg-[#F40009]/5 transition-colors"
              >
                Merchant Demo (Pending KYC)
              </button>
            </form>
            <button
              type="button"
              onClick={handleAdminDemo}
              className="w-full rounded-2xl border border-zinc-200 bg-white py-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Admin Demo
            </button>
            <form action={setDemoHubSession}>
              {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}
              <button
                type="submit"
                className="w-full rounded-2xl border border-zinc-200 bg-white py-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Hub Demo
              </button>
            </form>
          </div>

          <div className="mt-12 space-y-4 text-center">
            <p className="text-xs text-zinc-500">
              <Link href="/auth/merchant-signup" className="text-[#F40009] hover:underline">
                Register as Merchant
              </Link>
              {" · "}
              <Link href="/track" className="text-[#F40009] hover:underline">
                Track a Package
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-[11px] text-zinc-400">
            Demo access only. No credentials required.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-white">Loading…</div>}>
      <LoginContent />
    </Suspense>
  );
}
