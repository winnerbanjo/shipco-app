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
      const credentials = {
        email: email.trim(),
        password,
        redirect: false,
        callbackUrl: callbackUrl as string,
      };
      const timeoutMs = 12_000;
      let res: { ok?: boolean; url?: string } | null = null;
      try {
        res = await Promise.race([
          signIn("credentials", credentials),
          new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error("Sign-in timed out")), timeoutMs)
          ),
        ]);
      } catch (timeoutOrErr) {
        if (
          timeoutOrErr instanceof Error &&
          timeoutOrErr.message === "Sign-in timed out"
        ) {
          const merchantRes = await attemptMerchantLogin(
            email.trim(),
            password,
            callbackUrl
          );
          if (merchantRes.success) {
            router.push(merchantRes.redirect);
            return;
          }
        }
        throw timeoutOrErr;
      }
      if (res?.ok && res.url) {
        router.push(res.url);
        return;
      }
      // Show specific NextAuth error (e.g. CredentialsSignin) when credentials fail
      const nextAuthError =
        res?.error != null
          ? String(res.error)
          : null;
      const merchantRes = await attemptMerchantLogin(
        email.trim(),
        password,
        callbackUrl
      );
      if (merchantRes.success) {
        router.push(merchantRes.redirect);
        return;
      }
      const isDbUnreachable = res?.status === 500;
      const friendlyDbMessage = "Database connecting... please wait.";
      setError(
        isDbUnreachable ? friendlyDbMessage : (nextAuthError ?? merchantRes.error ?? "Invalid email or password.")
      );
    } catch (err) {
      const isTimeout =
        err instanceof Error && err.message === "Sign-in timed out";
      const isNetworkOrServer =
        err instanceof TypeError ||
        (err instanceof Error && (err.message.includes("fetch") || err.message.includes("network")));
      const message = isTimeout
        ? "Sign-in took too long. Check your connection or try again."
        : isNetworkOrServer
          ? "Database connecting... please wait."
          : "Something went wrong. Please try again.";
      setError(message);
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
              {loading ? "Logging in..." : "Sign in"}
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
