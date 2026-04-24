import { PrismaClient } from '@prisma/client';

// Singleton Prisma client safe for Next.js hot reload and Vercel serverless.
// Uses POSTGRES_PRISMA_URL (pooled, pgbouncer) in runtime and
// POSTGRES_URL_NON_POOLING for schema migrations via prisma CLI.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
