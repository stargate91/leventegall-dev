import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, internal Next.js paths, and APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // favicon.ico, opengraph-image, etc.
  ) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let activeLocale = "en";

  if (cookieLocale === "hu" || cookieLocale === "en") {
    activeLocale = cookieLocale;
  } else {
    // Detect from Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") || "";
    if (acceptLanguage.toLowerCase().includes("hu")) {
      activeLocale = "hu";
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", activeLocale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-locale", activeLocale);

  // Set cookie if not already set
  if (!cookieLocale) {
    response.cookies.set("NEXT_LOCALE", activeLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap.xml).*)"],
};
