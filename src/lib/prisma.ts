import { PrismaClient } from '../../prisma/app/generated/prisma';

// global namespace
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Singleton instance of PrismaClient
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Only set global reference in non-production environments to prevent memory leaks
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;