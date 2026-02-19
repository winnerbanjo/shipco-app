import { getSession } from "@shipco/lib/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type MerchantSession = {
  merchantId: string;
  email: string;
  isVerified: boolean;
};

/**
 * Returns merchant session from either:
 * 1. Custom JWT cookie (shipco-merchant-token), or
 * 2. NextAuth session (user.id as merchantId, isVerified true).
 * Use this in merchant pages so both login flows work and avoid redirect loops.
 */
export async function getMerchantSession(): Promise<MerchantSession | null> {
  const custom = await getSession();
  if (custom?.merchantId && custom?.email != null) {
    return {
      merchantId: custom.merchantId,
      email: custom.email,
      isVerified: custom.isVerified ?? false,
    };
  }
  const nextAuth = await getServerSession(authOptions);
  const user = nextAuth?.user as { id?: string; email?: string; role?: string } | undefined;
  if (user?.id && user?.email && (user.role === "MERCHANT" || user.role === "ADMIN")) {
    return {
      merchantId: user.id,
      email: user.email,
      isVerified: true,
    };
  }
  return null;
}
