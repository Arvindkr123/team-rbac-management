import "dotenv/config";

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export async function checkDatabaseConnection(): Promise<boolean> {
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log("Database connected successfully");
        return true;
    } catch (error) {
        console.error("Database connection failed:", error);
        return false;
    }
}