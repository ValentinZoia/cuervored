// src/auth.middleware.ts  ← NUEVO ARCHIVO
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// Solo providers, sin PrismaAdapter, sin callbacks que usen prisma
export const authOptions = {
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        Credentials({ credentials: {} }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
};
