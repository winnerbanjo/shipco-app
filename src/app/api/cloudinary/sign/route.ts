import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { paramsToSign } = (await req.json()) as { paramsToSign?: Record<string, unknown> };
    if (!paramsToSign || typeof paramsToSign !== "object") {
      return NextResponse.json({ error: "paramsToSign required" }, { status: 400 });
    }
    const secret = process.env.CLOUDINARY_API_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
    }
    const signature = cloudinary.utils.api_sign_request(paramsToSign, secret);
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("[cloudinary/sign]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Signing failed" },
      { status: 500 }
    );
  }
}
