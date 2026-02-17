"use server";

import { createToken } from "@shipco/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_MERCHANT_ID_APPROVED, DEMO_MERCHANT_ID_PENDING } from "@/lib/merchant-kyc";

export async function setDemoMerchantSession() {
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
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  redirect("/merchant/dashboard");
}

/** Demo login as "New Store" (Pending Verification) to test KYC approval flow. */
export async function setDemoMerchantPendingSession() {
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
  redirect("/merchant/dashboard");
}

export async function setDemoHubSession() {
  const store = await cookies();
  store.set("shipco-hub-token", "demo-hub-staff", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/hub/dashboard");
}
