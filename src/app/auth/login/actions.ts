"use server";

import { createToken } from "@shipco/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_MERCHANT_ID_APPROVED, DEMO_MERCHANT_ID_PENDING } from "@/lib/merchant-kyc";

function safeCallbackUrl(callbackUrl: string | null): string | null {
  if (!callbackUrl || typeof callbackUrl !== "string") return null;
  const path = callbackUrl.startsWith("/") ? callbackUrl : new URL(callbackUrl).pathname;
  if (!path.startsWith("/merchant") && !path.startsWith("/admin") && !path.startsWith("/customer") && !path.startsWith("/hub")) return null;
  return path;
}

export async function setDemoMerchantSession(formData?: FormData) {
  const token = await createToken({
    merchantId: DEMO_MERCHANT_ID_APPROVED,
    email: "demo@shipco.com",
    isVerified: true,
  });
  const store = await cookies();
  store.set("shipco-merchant-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  const cb = safeCallbackUrl(formData?.get("callbackUrl") as string | null);
  redirect(cb ?? "/merchant/dashboard");
}

export async function setDemoMerchantPendingSession(formData?: FormData) {
  const token = await createToken({
    merchantId: DEMO_MERCHANT_ID_PENDING,
    email: "newstore@shipco.com",
    isVerified: false,
  });
  const store = await cookies();
  store.set("shipco-merchant-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  const cb = safeCallbackUrl(formData?.get("callbackUrl") as string | null);
  redirect(cb ?? "/merchant/dashboard");
}

export async function setDemoHubSession(formData?: FormData) {
  const store = await cookies();
  store.set("shipco-hub-token", "demo-hub-staff", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  const cb = safeCallbackUrl(formData?.get("callbackUrl") as string | null);
  redirect(cb ?? "/hub/dashboard");
}
