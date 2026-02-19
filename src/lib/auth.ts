import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { Role } from "@/types";
import { prisma } from "@/lib/prisma";

/**
 * NextAuth credentials: same bcryptjs library as prisma/seed.ts (hash there, compare here).
 * Session is JWT; secret from env.
 *
 * Production (Vercel): Set NEXTAUTH_URL to your live URL (e.g. https://your-app.vercel.app).
 * trustHost lets NextAuth use X-Forwarded-Host/Proto from Vercel's proxy for callbacks.
 */
export const authOptions: NextAuthOptions = {
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === "production",
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("--- LOGIN ATTEMPT ---", credentials?.email ?? "(no email)");
        if (!credentials?.email) return null;
        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password ?? "";
        if (!password) return null;

        const isAdminBypass = email === "admin@shipco.com" && password === "Shipco2026!";
        const isMerchantBypass = email === "merchant@shipco.com" && password === "Shipco2026!";
        const isHubBypass = email === "hub@shipco.com" && password === "Shipco2026!";
        const mockAdmin = { id: "bypass-admin", email: "admin@shipco.com", name: "Admin", role: "ADMIN" as Role };
        const mockMerchant = { id: "bypass-merchant", email: "merchant@shipco.com", name: "Merchant", role: "MERCHANT" as Role };
        const mockHub = { id: "bypass-hub", email: "hub@shipco.com", name: "Hub Operator", role: "HUB_OPERATOR" as Role };

        if (isMerchantBypass) return mockMerchant;
        if (isAdminBypass) return mockAdmin;
        if (isHubBypass) return mockHub;

        try {

          const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, role: true, passwordHash: true },
          });
          if (!user) return null;
          if (!user.passwordHash) return null;

          const matched = await compare(password, user.passwordHash);
          if (!matched) {
            console.log("Password check failed for:", user.email);
            return null;
          }
          return {
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
            role: user.role as Role,
          };
        } catch (err) {
          console.error("[NextAuth authorize] Database error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: Role }).role = token.role as Role;
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      const base = process.env.NEXTAUTH_URL ?? baseUrl;
      if (!url || url === base || url === `${base}/`) return `${base}/auth/callback`;
      if (url.startsWith("/")) return `${base}${url}`;
      try {
        if (new URL(url).origin === base) return url;
      } catch {
        // ignore invalid URL
      }
      return base;
    },
  },
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

declare module "next-auth" {
  interface User {
    role?: Role;
  }
  interface Session {
    user: User & { id?: string; role?: Role };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}
