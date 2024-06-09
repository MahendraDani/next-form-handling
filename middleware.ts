import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentSession, getCurrentSessionToken } from "./lib/auth/session";

export function middleware(request: NextRequest) {
  const { token } = getCurrentSessionToken();
  if (!token && request.nextUrl.pathname !== "/signup") {
    return NextResponse.redirect(new URL("/signup", request.url));
  }
  console.log(token);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/feedback"],
};
