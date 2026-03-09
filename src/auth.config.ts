import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LogInFormSchema } from "./lib/zodSchema";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize() {
                // authorize vacío acá — la lógica real queda en auth.ts
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            if (token?.sub && session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
};
