import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const prisma = new PrismaClient({ adapter });
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB Connected via Prisma");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Database connection error:", error.message);
        }
        else {
            console.error("Database connection error:", error);
        }
    }
};
const disconnectDB = async () => {
    await prisma.$disconnect();
};
export { connectDB, disconnectDB, prisma };
