import NextAuth, { Session } from "next-auth";
import { NextRequest } from 'next/server';

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutePrefixes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

function isPublicRoute(urlPath: string) {
  return publicRoutes.includes(urlPath) || publicRoutePrefixes.some(prefix => urlPath.startsWith(prefix));
}

export default auth((req: NextRequest & { auth: Session | null }): Response | void => {
  const { nextUrl, auth, } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRouteCheck = isPublicRoute(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }

  if (!isLoggedIn && !isPublicRouteCheck) {

    return Response.redirect(new URL(
      `/auth/login`,
      nextUrl
    ));
  }

 



  // if (!isLoggedIn && !isPublicRoute) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  //   return Response.redirect(new URL(
  //     `/auth/login?callbackUrl=${encodedCallbackUrl}`,
  //     nextUrl
  //   ));
  // }

  return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/auth/login', '/(api|trpc)(.*)'],
}