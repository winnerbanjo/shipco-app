import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Protects /merchant, /admin, /hub, /dashboard, /customer by role.
 * Uses absolute URL for redirect to avoid redirect loops (required for NextAuth).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow auth and API routes without session check
  if (pathname.startsWith("/auth") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = (token?.role as string) ?? null;

  // /merchant: allow MERCHANT and ADMIN
  if (pathname.startsWith("/merchant")) {
    if (!token) {
      const baseUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin;
      const loginUrl = new URL("/auth/login", baseUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl.toString());
    }
    if (role === "MERCHANT" || role === "ADMIN") return NextResponse.next();
    const baseUrl = process.env.NODE_ENV === "production" && process.env.NEXTAUTH_URL
      ? process.env.NEXTAUTH_URL
      : request.nextUrl.origin;
    return NextResponse.redirect(new URL("/", baseUrl));
  }

  // /admin: strictly ADMIN only — no other roles
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const baseUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin;
      const loginUrl = new URL("/auth/login", baseUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl.toString());
    }
    if (role !== "ADMIN") {
      const baseUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin;
      return NextResponse.redirect(new URL("/", baseUrl));
    }
    return NextResponse.next();
  }

  // /hub: allow HUB_OPERATOR and ADMIN
  if (pathname.startsWith("/hub")) {
    if (!token) {
      const baseUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin;
      const loginUrl = new URL("/auth/login", baseUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl.toString());
    }
    if (role === "HUB_OPERATOR" || role === "ADMIN") return NextResponse.next();
    const baseUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin;
    return NextResponse.redirect(new URL("/", baseUrl));
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/customer")) {
    if (!token) {
      const baseUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin;
      const loginUrl = new URL("/auth/login", baseUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl.toString());
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/merchant/:path*", "/customer/:path*", "/hub/:path*"],
};
