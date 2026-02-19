import { PrismaClient } from "@prisma/client";

/**
 * Singleton with production-ready DB URL (sslmode=require, connect_timeout=30).
 * Prevents connection pool exhaustion on Vercel serverless.
 */
const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };

function getDatabaseUrl(): string {
  const base = process.env.DATABASE_URL ?? "";
  if (!base) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}sslmode=require&connect_timeout=30`;
}

const dbUrl = getDatabaseUrl();
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
    ...(dbUrl ? { datasources: { db: { url: dbUrl } } } : {}),
  });
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

export { prisma };
