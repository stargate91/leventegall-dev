import { siteConfig } from "@/config/site";

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");

  if (!origin && !referer) {
    return true;
  }

  const allowedOrigins = [
    new URL(siteConfig.url).origin,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];

  if (host) {
    allowedOrigins.push(`http://${host}`, `https://${host}`);
  }

  if (origin) {
    try {
      const parsedOrigin = new URL(origin).origin;
      if (allowedOrigins.includes(parsedOrigin)) {
        return true;
      }
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const parsedReferer = new URL(referer).origin;
      if (allowedOrigins.includes(parsedReferer)) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}
