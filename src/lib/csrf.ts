import { siteConfig } from "@/config/site";

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  const secFetchSite = request.headers.get("sec-fetch-site");

  // 1. Explicit cross-site fetch rejection (W3C Fetch Metadata Request Headers)
  if (secFetchSite === "cross-site") {
    return false;
  }

  const allowedOrigins = [
    new URL(siteConfig.url).origin,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];

  if (host) {
    allowedOrigins.push(`http://${host}`, `https://${host}`);
  }

  // 2. Validate Origin header if present
  if (origin) {
    try {
      const parsedOrigin = new URL(origin).origin;
      return allowedOrigins.includes(parsedOrigin);
    } catch {
      return false;
    }
  }

  // 3. Validate Referer header if present
  if (referer) {
    try {
      const parsedReferer = new URL(referer).origin;
      return allowedOrigins.includes(parsedReferer);
    } catch {
      return false;
    }
  }

  // 4. Strict check for requests lacking Origin and Referer:
  // Must possess a valid, recognized Host header matching canonical or local development domains
  if (host) {
    const canonicalHost = new URL(siteConfig.url).host;
    const allowedHosts = [canonicalHost, "localhost:3000", "127.0.0.1:3000"];
    return allowedHosts.includes(host);
  }

  return false;
}
