import { PrismaClient } from "@prisma/client";

/**
 * Singleton: one PrismaClient per process so Vercel/Render serverless does not
 * hit "Too many connections". globalThis survives HMR and avoids new clients per request.
 * DB URL gets sslmode=require&connect_timeout=30 when DATABASE_URL is set.
 */
const globalForPrisma = globalThis as typeof globalThis & { __prisma?: PrismaClient };

function getDatabaseUrl(): string {
  const base = process.env.DATABASE_URL ?? "";
  if (!base) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}sslmode=require&connect_timeout=30`;
}

if (typeof globalForPrisma.__prisma === "undefined") {
  const dbUrl = getDatabaseUrl();
  globalForPrisma.__prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
    ...(dbUrl ? { datasources: { db: { url: dbUrl } } } : {}),
  });
}
const prisma = globalForPrisma.__prisma;

export { prisma };
