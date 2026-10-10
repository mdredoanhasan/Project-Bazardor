import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hasSessionCookie =
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  if (!hasSessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set(
      "callbackURL",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/product/:path*",
};
