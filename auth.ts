import { betterAuth } from "better-auth";
import { PrismaClient } from "@/prisma/prismaClient";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/app/_lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username(), nextCookies()], // 确保 nextCookies 插件在数组最后一位。
});
