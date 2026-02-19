export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSession } from "@shipco/lib/auth";
import { connectDB } from "@shipco/lib/mongodb";
import Merchant from "@shipco/lib/models/Merchant";

/** GET /api/merchant/profile — returns businessName, email, address, phone for the logged-in merchant. */
export async function GET() {
  try {
    const nextAuthSession = await getServerSession(authOptions);
    const shipcoSession = await getSession();

    let merchant: { businessName?: string; email?: string; address?: string; phone?: string } | null = null;

    const conn = await connectDB();
    if (conn) {
      if (shipcoSession?.merchantId) {
        const byId = await Merchant.findById(shipcoSession.merchantId)
          .select("businessName email address phone")
          .lean();
        if (byId) merchant = byId;
      }
      if (!merchant && nextAuthSession?.user?.email) {
        const byEmail = await Merchant.findOne({ email: nextAuthSession.user.email.toLowerCase() })
          .select("businessName email address phone")
          .lean();
        if (byEmail) merchant = byEmail;
      }
    }

    if (!merchant) {
      return NextResponse.json(
        { businessName: "", email: nextAuthSession?.user?.email ?? "", address: "", phone: "" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      businessName: merchant.businessName ?? "",
      email: merchant.email ?? "",
      address: merchant.address ?? "",
      phone: merchant.phone ?? "",
    });
  } catch (e) {
    console.error("[merchant/profile]", e);
    return NextResponse.json({ message: "Profile fetch failed." }, { status: 500 });
  }
}
