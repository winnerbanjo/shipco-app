export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSession } from "@shipco/lib/auth";
import { connectDB } from "@shipco/lib/mongodb";
import Merchant from "@shipco/lib/models/Merchant";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.merchantId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const cacNumber = (formData.get("cacNumber") as string)?.trim();
    if (!cacNumber) {
      return NextResponse.json({ message: "CAC / Registration number is required." }, { status: 400 });
    }

    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ message: "Database unavailable." }, { status: 503 });
    }

    const merchant = await Merchant.findById(session.merchantId).lean();
    if (!merchant) {
      return NextResponse.json({ message: "Merchant not found." }, { status: 404 });
    }

    // Optional: in production you would upload idDocument and cacDocument to storage and save URLs
    const idDocument = formData.get("idDocument") as File | null;
    const cacDocument = formData.get("cacDocument") as File | null;
    const idDocumentUrl = idDocument?.size ? "/uploads/kyc/id-pending" : undefined;
    const cacDocumentUrl = cacDocument?.size ? "/uploads/kyc/cac-pending" : undefined;

    const update: Record<string, unknown> = {
      "businessKyc.rcNumber": cacNumber,
    };
    if (cacDocumentUrl) update["businessKyc.cacDocumentUrl"] = cacDocumentUrl;
    if (idDocumentUrl && merchant.personalKyc) update["personalKyc.idDocumentUrl"] = idDocumentUrl;

    await Merchant.findByIdAndUpdate(session.merchantId, { $set: update });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[merchant/kyc]", e);
    return NextResponse.json({ message: "Submission failed." }, { status: 500 });
  }
}
