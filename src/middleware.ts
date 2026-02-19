import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Temporarily simplified: no auth checks so callback and login flow are not interfered with.
 * Re-enable protection for /admin, /merchant, /hub when auth is stable.
 */
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/merchant/:path*", "/customer/:path*", "/hub/:path*"],
};
