import { NextResponse, type NextRequest } from "next/server";

/** One URL per page: any uppercase path 301s to its lowercase twin (prevents duplicate-content variants like /Ganesh-Ji). */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname !== pathname.toLowerCase()) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }
}
export const config = { matcher: ["/((?!_next/|api/|icons/|og$|.*\\..*).*)"] };
