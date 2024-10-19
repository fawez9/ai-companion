import { PrismaClient } from "@prisma/client";

// Declare a global type for Prisma to avoid multiple instances in development
declare global {
  // Allow global `var` property to hold the PrismaClient instance
  var prisma: PrismaClient | undefined;
}

// Check if Prisma is already instantiated in the global scope (for dev mode)
const prisma = global.prisma || new PrismaClient();

// Prevent multiple Prisma Client instances in development
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
