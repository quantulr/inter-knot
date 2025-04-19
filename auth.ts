import {PrismaClient} from "@/prisma/prismaClient";
import NextAuth, {AuthError,} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient()
export const {handlers, signIn, signOut, auth} = NextAuth({

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                username: {
                    label: "用户名"
                },
                password: {
                    label: "密码",
                    type: "password"
                }
            },
            async authorize(credentials) {
                const {username, password} = credentials;
                const user = await prisma.user.findUnique({
                    where: {
                        username: username as string,
                        password: password as string
                    }
                });
                if (!user) {
                    throw new AuthError("用户名或密码错误",);
                }
                return user
            },

        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        redirect() {
            return "/"
        }
    }
})