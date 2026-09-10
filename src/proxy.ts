import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, internal Next.js paths, media previews, and APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes("opengraph-image") ||
    pathname.includes("twitter-image") ||
    pathname.includes("apple-icon") ||
    pathname.includes("icon") ||
    /\.(ico|png|jpg|jpeg|svg|webp|css|js|map|txt|xml|webmanifest)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Explicit URL-driven localization
  const isHuPath = pathname === "/hu" || pathname.startsWith("/hu/");
  const activeLocale = isHuPath ? "hu" : "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", activeLocale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-locale", activeLocale);

  // Synchronize NEXT_LOCALE cookie with the visited path locale
  const currentCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (currentCookie !== activeLocale) {
    response.cookies.set("NEXT_LOCALE", activeLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|.*icon.*|.*opengraph-image.*|.*twitter-image.*|robots.txt|sitemap.xml).*)"],
};
