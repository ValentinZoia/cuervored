import NextAuth from "next-auth";
import { authOptions } from "@/auth";
import {
publicRoutes,
apiAuthPrefix,
authRoutes,
DEFAULT_LOGIN_REDIRECT,
} from '@/routes/routes'
import { NextResponse } from "next/server";


const {auth} = NextAuth(authOptions);

export default auth((req) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const isLoggedIn = !!req.auth;
  const isPublic = publicRoutes.some((route) => route.path === pathname);
  const isAuth = authRoutes.some((route) => route.path === pathname);
  const isApi = apiAuthPrefix.some(prefix => pathname.startsWith(prefix.path));

  if (isApi) {
    
    return NextResponse.next();
  }

  // Redirect to / if authenticated and im in a auth route
  // Redirigir a / si estoy autenticado y estoy en una ruta de autenticacion
  if(isAuth){
    if(isLoggedIn){
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT[0].path, req.url));
    }
    return NextResponse.next();
  }

  
  // Redirect to login if not authenticated and im not a public route
  // Redirigir a login si no estoy autenticado y no estoy en una ruta publica
  if(!isLoggedIn && !isPublic && !isApi){
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
  
})


export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }