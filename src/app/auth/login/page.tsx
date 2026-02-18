"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { attemptMerchantLogin } from "./actions";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/auth/callback";
  const errorParam = searchParams.get("error");
  const isUnauthorized = errorParam === "unauthorized";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(isUnauthorized ? "You don't have access to that area." : null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
        callbackUrl: callbackUrl as string,
      });
      if (res?.ok && res.url) {
        router.push(res.url);
        return;
      }
      const merchantRes = await attemptMerchantLogin(email.trim(), password, callbackUrl);
      if (merchantRes.success) {
        router.push(merchantRes.redirect);
        return;
      }
      setError(merchantRes.error);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 font-sans">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <span className="font-sans text-2xl font-bold text-black tracking-tight">Shipco</span>
        </div>

        <div className="w-full border border-zinc-100 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-center text-sm text-amber-800">
              {error}
            </div>
          )}

          <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Sign in
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-medium text-zinc-600">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#F40009] focus:outline-none focus:ring-1 focus:ring-[#F40009]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-medium text-zinc-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#F40009] focus:outline-none focus:ring-1 focus:ring-[#F40009]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-[#F40009] py-4 text-sm font-medium text-white transition-colors hover:bg-[#cc0008] disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-8 space-y-4 text-center">
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
        </div>
      </div>
    </div>
  );
}

export default function AuthLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-white font-sans">Loading…</div>}>
      <LoginContent />
    </Suspense>
  );
}
