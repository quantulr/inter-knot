import { PrismaClient } from "@/prisma/prismaClient";
import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "@node-rs/argon2";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "用户名",
        },
        password: {
          label: "密码",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        const user = await prisma.users.findUnique({
          where: {
            username: username as string,
          },
        });
        if (!user) {
          throw new AuthError("用户名或密码错误");
        }

        // verify password
        const isPasswordValid = await argon2.verify(
          user.password,
          password as string,
        );
        if (!isPasswordValid) {
          throw new AuthError("用户名或密码错误");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    redirect() {
      return "/";
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-expect-error basdfs
      session.user.id = token.id;
      return session;
    },
  },
});
