import { PrismaClient } from "@prisma/client";

/**
 * Strict singleton: one PrismaClient instance per process. Required for Render and
 * serverless to avoid connection pool exhaustion and timeouts.
 *
 * DATABASE_URL should include: ?sslmode=require&connect_timeout=30&connection_limit=1&pool_timeout=20
 */
const globalForPrisma = globalThis as unknown as { __shipco_prisma__: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

if (typeof globalForPrisma.__shipco_prisma__ === "undefined") {
  globalForPrisma.__shipco_prisma__ = createPrismaClient();
}
export const prisma = globalForPrisma.__shipco_prisma__;
