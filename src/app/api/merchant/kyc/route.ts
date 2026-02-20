export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getMerchantSession } from "@/lib/merchant-session";
import { connectDB } from "@shipco/lib/mongodb";
import Merchant from "@shipco/lib/models/Merchant";
import { setMerchantKycStatus } from "@/lib/merchant-kyc";

export async function POST(req: Request) {
  try {
    const session = await getMerchantSession();
    if (!session?.merchantId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const cacNumber = (body.cacNumber as string)?.trim();
    const idDocumentUrl = (body.idDocumentUrl as string)?.trim() || undefined;
    const cacDocumentUrl = (body.cacDocumentUrl as string)?.trim() || undefined;

    if (!cacNumber) {
      return NextResponse.json({ message: "CAC / Registration number is required." }, { status: 400 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ message: "Database unavailable." }, { status: 503 });
    }

    let merchant = await Merchant.findById(session.merchantId).lean();
    if (!merchant) {
      merchant = await Merchant.findOne({ email: session.email }).lean();
    }
    const merchantId = merchant ? (merchant as { _id: unknown })._id : null;
    if (!merchantId) {
      return NextResponse.json({ message: "Merchant not found. Complete signup first." }, { status: 404 });
    }

    const update: Record<string, unknown> = {
      "businessKyc.rcNumber": cacNumber,
      kycStatus: "Pending Verification",
    };
    if (cacDocumentUrl) update["businessKyc.cacDocumentUrl"] = cacDocumentUrl;
    if (idDocumentUrl) update["personalKyc.idDocumentUrl"] = idDocumentUrl;

    await Merchant.findByIdAndUpdate(merchantId, { $set: update });
    await setMerchantKycStatus(String(merchantId), "Pending Verification");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[merchant/kyc]", e);
    return NextResponse.json({ message: "Submission failed." }, { status: 500 });
  }
}
