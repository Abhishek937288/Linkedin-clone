import type { PrismaClient } from "@prisma/client";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "./prisma.js";

export const auth = betterAuth({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  database: prismaAdapter(prisma as PrismaClient, {
    provider: "mongodb",
  }),

  emailAndPassword: {
    allowDomains: ["*"],
    enabled: true,
  },

  trustedOrigins: [process.env.FRONTEND_URL ?? ""],
});
