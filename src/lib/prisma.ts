import { PrismaClient } from "@prisma/client";

/**
 * Global singleton for PrismaClient.
 * Prevents multiple instances during Next.js build (e.g. on Vercel) and in serverless.
 * Uses DATABASE_URL from env. No DB connection is made at module load.
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;
