import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !session.user.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { success: false, error: "Payment service is not configured." },
      { status: 503 }
    );
  }

  let body: { amount?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const amountInNaira = Number(body.amount);
  if (!Number.isFinite(amountInNaira) || amountInNaira < 100 || amountInNaira > 10_000_000) {
    return NextResponse.json(
      { success: false, error: "Amount must be between ₦100 and ₦10,000,000." },
      { status: 400 }
    );
  }

  try {
    let wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    });
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { userId: session.user.id, currency: "NGN" },
      });
    }

    const amountInKobo = Math.round(amountInNaira * 100);
    const baseUrl = process.env.NEXTAUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://shipco-logistics.com";
    const callbackUrl = `${baseUrl}/merchant/dashboard/wallet?funded=1`;

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        amount: amountInKobo,
        currency: "NGN",
        callback_url: callbackUrl,
        metadata: {
          userId: session.user.id,
          walletId: wallet.id,
        },
      }),
    });

    const data = (await response.json()) as {
      status: boolean;
      message?: string;
      data?: { authorization_url: string; reference: string };
    };

    if (!data.status || !data.data?.authorization_url) {
      return NextResponse.json(
        { success: false, error: data.message ?? "Failed to initialize payment." },
        { status: 502 }
      );
    }

    await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        type: "DEPOSIT",
        amount: amountInNaira,
        status: "PENDING",
        reference: data.data.reference,
        description: "Wallet funding via Paystack",
        metadata: { source: "paystack", initiatedAt: new Date().toISOString() },
      },
    });

    return NextResponse.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (err) {
    console.error("[Paystack API] Initialize error:", err);
    return NextResponse.json(
      { success: false, error: "An error occurred while initializing payment." },
      { status: 500 }
    );
  }
}
