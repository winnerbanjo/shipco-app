import { PrismaClient } from "@prisma/client";

/**
 * Strict singleton: one PrismaClient instance per process. Required for Render and
 * Vercel serverless to avoid connection pool exhaustion and timeouts.
 *
 * Connection pool uses connect_timeout=30 and connection_limit=2 (injected if not in DATABASE_URL).
 */
const globalForPrisma = globalThis as unknown as { __shipco_prisma__: PrismaClient | undefined };

function getDatabaseUrlWithPoolParams(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  const hasConnectTimeout = url.includes("connect_timeout=");
  const hasConnectionLimit = url.includes("connection_limit=");
  if (hasConnectTimeout && hasConnectionLimit) return url;
  const sep = url.includes("?") ? "&" : "?";
  const params: string[] = [];
  if (!hasConnectTimeout) params.push("connect_timeout=30");
  if (!hasConnectionLimit) params.push("connection_limit=2");
  return params.length ? `${url}${sep}${params.join("&")}` : url;
}

function createPrismaClient(): PrismaClient {
  const url = getDatabaseUrlWithPoolParams();
  return new PrismaClient({
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

if (typeof globalForPrisma.__shipco_prisma__ === "undefined") {
  globalForPrisma.__shipco_prisma__ = createPrismaClient();
}
export const prisma = globalForPrisma.__shipco_prisma__;
