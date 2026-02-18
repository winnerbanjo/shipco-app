"use server";

import { createToken } from "@shipco/lib/auth";
import { connectDB } from "@shipco/lib/mongodb";
import Merchant from "@shipco/lib/models/Merchant";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";

function safeCallbackUrl(callbackUrl: string | null): string | null {
  if (!callbackUrl || typeof callbackUrl !== "string") return null;
  const path = callbackUrl.startsWith("/") ? callbackUrl : new URL(callbackUrl).pathname;
  if (!path.startsWith("/merchant") && !path.startsWith("/admin") && !path.startsWith("/hub")) return null;
  return path;
}

/** Merchant login (MongoDB): verify email/password, set cookie, return redirect. */
export async function attemptMerchantLogin(
  email: string,
  password: string,
  callbackUrl: string | null
): Promise<{ success: true; redirect: string } | { success: false; error: string }> {
  const e = email?.trim();
  const p = password ?? "";
  if (!e || !p) return { success: false, error: "Email and password required." };
  try {
    await connectDB();
    const merchant = await Merchant.findOne({ email: e.toLowerCase() }).select("_id email password isVerified").lean();
    if (!merchant) return { success: false, error: "Invalid email or password." };
    const ok = await compare(p, merchant.password);
    if (!ok) return { success: false, error: "Invalid email or password." };
    const token = await createToken({
      merchantId: String(merchant._id),
      email: merchant.email,
      isVerified: !!merchant.isVerified,
    });
    const store = await cookies();
    store.set("shipco-merchant-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    const cb = safeCallbackUrl(callbackUrl);
    return { success: true, redirect: cb ?? "/merchant/dashboard" };
  } catch (err) {
    console.error("[Merchant login]", err);
    return { success: false, error: "Sign-in failed. Try again." };
  }
}
