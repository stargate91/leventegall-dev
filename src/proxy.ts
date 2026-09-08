import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, internal Next.js paths, and APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    /\.(ico|png|jpg|jpeg|svg|webp|css|js|map|txt|xml|webmanifest)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const isHuPath = pathname === "/hu" || pathname.startsWith("/hu/");
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let activeLocale = "en";

  if (isHuPath) {
    activeLocale = "hu";
  } else if (cookieLocale === "hu" || cookieLocale === "en") {
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

  if (isHuPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
    response.headers.set("x-locale", "hu");
    response.cookies.set("NEXT_LOCALE", "hu", {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
    return response;
  }

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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml).*)"],
};
