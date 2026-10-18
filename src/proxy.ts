import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    request.nextUrl.pathname === "/forgot-password" ||
    request.nextUrl.pathname === "/reset-password"
  ) {
    if (!session) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!session) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set(
      "from",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/settings", "/forgot-password", "/reset-password"], // Specify the routes the middleware applies to
};
