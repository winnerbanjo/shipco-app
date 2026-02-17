import { PrismaClient } from "@prisma/client";

/** Prisma uses DATABASE_URL from env for PostgreSQL connection. */
/** Global singleton prevents multiple instances in dev/build (e.g. Vercel serverless). */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;
