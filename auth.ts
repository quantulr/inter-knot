import {PrismaClient} from "@/prisma/prismaClient";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient()
export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials, req) {
                const {username, password} = credentials;
                console.log(username)
                const user = await prisma.user.findUnique({
                    where: {
                        username: username as string
                    }
                });
                if (!user || user.password !== password) {
                    throw new Error("用户名或密码错误")
                }

                return {
                    email: "eraer"
                }
            }
        })
    ],
})