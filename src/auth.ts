import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LogInFormSchema } from "./lib/zodSchema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions = {
  // debug: true,
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
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const validateFields = LogInFormSchema.safeParse(credentials);

        if (!validateFields.success) {
          throw new Error("Please provide both email and password");
        }

        const { email, password } = validateFields.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        //this means the user loggin with google or github
        if(!user.password){
          return null
        }
        
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password as string
        );

        if (!isPasswordCorrect) {
          throw new Error("Password did not match");
        }
        

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
    signIn: "/auth/login",
    error:"/auth/error",
  },
  
  events:{
    async linkAccount({user}){
      await prisma.user.update({
        where:{id: user.id},
        data:{ emailVerified: new Date() }
      })
    }
  },
  
  callbacks: {
    async session({ session, token,user }) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub;
      }

      if (token?.role && session?.user) {
        session.user.role = token.role;
      }

      if(session?.user){
        const user = await prisma.user.findUnique({
          where:{id: session.user.id},
          select:{image: true, name: true}
        });

        session.user.image = user?.image
        session.user.name = user?.name

        
      }

      

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      
      

      return token;
    },
    async signIn({ user, account, profile }) {
      

      if (account?.provider) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          include: { accounts: true },
        });

        if (existingUser) {
          // Determinar la imagen y el nombre basado en el proveedor
          let imageUrl = existingUser.image; // Mantener la imagen existente por defecto
          let name = existingUser.name; // Mantener el nombre existente por defecto

          if (account.provider === "github") {
            imageUrl = (profile as any)?.avatar_url || imageUrl;
            name = (profile as any)?.name || name;
          } else if (account.provider === "google") {
            imageUrl = (profile as any)?.picture || imageUrl;
            name = (profile as any)?.name || name;
          }
          

          // Actualizar usuario solo si hay cambios
          if (imageUrl !== existingUser.image || name !== existingUser.name) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                image: imageUrl,
                name: name,
              },
            });
          }

          // Verifica si ya existe una cuenta para este proveedor
          const existingAccount = existingUser.accounts.find(
            (acc) => acc.provider === account.provider
          );

          if (existingAccount) {
            // La cuenta para este proveedor ya existe, actualiza los tokens si es necesario
            await prisma.account.update({
              where: { id: existingAccount.id },
              data: {
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });
          } else {
            // El usuario existe pero no tiene una cuenta para este proveedor, crea una nueva
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                // image: user.image,
              },
            });
          }
        }
      }

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authOptions,
});
