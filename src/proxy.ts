import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    request.nextUrl.pathname === "/auth/forgot-password" ||
    request.nextUrl.pathname === "/auth/reset-password" ||
    request.nextUrl.pathname === "/auth/sign-in" ||
    request.nextUrl.pathname === "/auth/sign-up"
  ) {
    if (!session) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!session) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set(
      "redirectTo",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/settings", "/auth/forgot-password", "/auth/reset-password", "/auth/sign-in", "/auth/sign-up", "/my-shows/:path*", "/create-show"], // Specify the routes the middleware applies to
};
