import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LogInFormSchema } from "./lib/zodSchema";
import { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

// Extendemos el tipo Session de NextAuth para incluir nuestros tokens personalizados
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    error?: string;
  }
}

export const authOptions = {
  providers: [
    // Configuración del proveedor de GitHub
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    // Configuración del proveedor de Google
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),

    // Configuración del proveedor de credenciales (email/password)
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
        // Validación de campos usando Zod
        const validateFields = LogInFormSchema.safeParse(credentials);

        if (!validateFields.success) {
          throw new Error("Por favor, ingresa tu correo y contraseña.");
        }

        const { email, password } = validateFields.data;

        // Buscar usuario en la base de datos
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Email o contraseña incorrectos.");
        }

        // Si el usuario se registró con OAuth, no permitir login con password
        if(!user.password){
          return null;
        }
        
        // Verificar contraseña
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password as string
        );

        if (!isPasswordCorrect) {
          throw new Error("La contraseña no es correcta.");
        }

        // Retornar datos básicos del usuario
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
  // Configuración de páginas personalizadas
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
  // Eventos de autenticación
  events: {
    // Se ejecuta cuando se vincula una cuenta OAuth
    async linkAccount({user}) {
      await prisma.user.update({
        where: {id: user.id},
        data: { emailVerified: new Date() }
      });
    },
    // Se ejecuta al cerrar sesión
    async signOut() {
      try {
        // Limpiar tokens almacenados
        await prisma.account.updateMany({
          where: { refresh_token: { not: null } },
          data: { 
            refresh_token: null,
            access_token: null,
            expires_at: null
          }
        });
      } catch (error) {
        console.error("Error al limpiar tokens:", error);
      }
    }
  },
  
  // Callbacks para personalizar el proceso de autenticación
  callbacks: {
    // Modificar la sesión antes de enviarla al cliente
    async session({ session, token }) {
      // Agregar ID de usuario a la sesión
      if (token?.sub && session?.user) {
        session.user.id = token.sub;
      }

      // Agregar rol de usuario a la sesión
      if (token?.role && session?.user) {
        session.user.role = token.role;
      }

      // Actualizar datos de usuario en la sesión
      if(session?.user) {
        const user = await prisma.user.findUnique({
          where: {id: session.user.id},
          select: {image: true, name: true}
        });

        session.user.image = user?.image;
        session.user.name = user?.name;
      }

      

      return session;
    },

    // Modificar el token JWT
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      
      // Si es un nuevo inicio de sesión, configurar tokens
      
        return {
          ...token,
        }
    },

    // Manejar el proceso de inicio de sesión
    async signIn({ user, account, profile }) {
      if (account?.provider) {
        // Buscar usuario existente
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
          include: { accounts: true },
        });

        if (existingUser) {
          // Actualizar imagen y nombre según el proveedor
          let imageUrl = existingUser.image;
          let name = existingUser.name;

          if (account.provider === "github") {
            imageUrl = (profile as any)?.avatar_url || imageUrl;
            name = (profile as any)?.name || name;
          } else if (account.provider === "google") {
            imageUrl = (profile as any)?.picture || imageUrl;
            name = (profile as any)?.name || name;
          }

          // Actualizar datos de usuario si han cambiado
          if (imageUrl !== existingUser.image || name !== existingUser.name) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                image: imageUrl,
                name: name,
              },
            });
          }

          // Manejar la cuenta vinculada
          const existingAccount = existingUser.accounts.find(
            (acc) => acc.provider === account.provider
          );

          if (existingAccount) {
            // Actualizar tokens de la cuenta existente
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
            // Crear nueva cuenta vinculada
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
              },
            });
          }
        }
      }

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // Sesión dura 30 días
  ...authOptions,
});

// Función para renovar el access token
