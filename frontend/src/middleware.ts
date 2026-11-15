import { NextResponse, type NextRequest } from "next/server";

/**
 * Fast redirect between /login and /admin based on the "signed in" marker cookie.
 * This is only for navigation: every admin API call is authorised by the backend
 * (httpOnly JWT + refresh-token cookies), so a forged marker reveals nothing.
 */
export function middleware(req: NextRequest) {
  const signedIn = req.cookies.has("sm_session");
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/admin") && !signedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && signedIn) {
    const url = req.nextUrl.clone();
    const next = req.nextUrl.searchParams.get("next");
    // Only same-site /admin paths; parsed against our own origin, so it can't point elsewhere.
    const target = next && next.startsWith("/admin") && !next.startsWith("//") ? new URL(next, req.nextUrl.origin) : null;
    url.pathname = target?.pathname ?? "/admin";
    url.search = target?.search ?? "";
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
