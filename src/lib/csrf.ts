import { siteConfig } from "@/config/site";

const CANONICAL_ORIGIN = new URL(siteConfig.url).origin;
const CANONICAL_HOST = new URL(siteConfig.url).host;

const ALLOWED_ORIGINS = new Set([
  CANONICAL_ORIGIN,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const ALLOWED_HOSTS = new Set([
  CANONICAL_HOST,
  "localhost:3000",
  "127.0.0.1:3000",
]);

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  const secFetchSite = request.headers.get("sec-fetch-site");

  // 1. Explicit cross-site fetch rejection (W3C Fetch Metadata Request Headers)
  if (secFetchSite === "cross-site") {
    return false;
  }

  // 2. Validate Origin header against strict allowlist if present
  if (origin) {
    try {
      const parsedOrigin = new URL(origin).origin;
      return ALLOWED_ORIGINS.has(parsedOrigin);
    } catch {
      return false;
    }
  }

  // 3. Validate Referer header against strict allowlist if present
  if (referer) {
    try {
      const parsedReferer = new URL(referer).origin;
      return ALLOWED_ORIGINS.has(parsedReferer);
    } catch {
      return false;
    }
  }

  // 4. Strict check for requests lacking Origin and Referer:
  // Must possess a valid, recognized Host header matching canonical or local development domains
  if (host) {
    return ALLOWED_HOSTS.has(host);
  }

  return false;
}
