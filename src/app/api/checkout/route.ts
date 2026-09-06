import { NextResponse } from "next/server";
import { validateOrigin } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import { checkRateLimit } from "@/lib/rateLimit";

/**
 * Payment Endpoint (/api/checkout)
 *
 * Ready to connect with Stripe Checkout, Lemon Squeezy, or Barion/SimplePay.
 */

export async function POST(request: Request): Promise<NextResponse> {
  const traceId = request.headers.get("x-request-id") || logger.createTraceId();

  // 1. Origin & CSRF validation
  if (!validateOrigin(request)) {
    logger.warn("Checkout rejected: unauthorized cross-site origin", { traceId });
    return NextResponse.json(
      { error: "Forbidden: cross-site request rejected." },
      { status: 403, headers: { "x-request-id": traceId } },
    );
  }

  // 2. Client IP & Rate limiting (10 checkout requests per minute)
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const rateLimitResult = checkRateLimit(`checkout:${clientIp}`, 10, 60 * 1000);

  const rateLimitHeaders = {
    "x-request-id": traceId,
    "X-RateLimit-Limit": String(rateLimitResult.limit),
    "X-RateLimit-Remaining": String(rateLimitResult.remaining),
    "X-RateLimit-Reset": String(rateLimitResult.resetTime),
  };

  if (!rateLimitResult.success) {
    logger.warn("Rate limit exceeded for checkout initiation", {
      traceId,
      context: { clientIp: `${clientIp.slice(0, 4)}***` },
    });
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: rateLimitHeaders },
    );
  }

  try {
    const { packageId, email } = (await request.json()) as { packageId?: string; email?: string };

    const prices: Record<string, { name: string; amount: number }> = {
      naming: { name: "Orbital Identity (Naming & Slogans)", amount: 49000 },
      "full-orbit": { name: "Full-Orbit Launch (Naming + Next.js Platform)", amount: 185000 },
      "web-dev": { name: "Deep-Space Engine (Next.js Application)", amount: 145000 },
    };

    if (!packageId || !prices[packageId]) {
      logger.warn("Checkout failed: invalid package ID", {
        traceId,
        context: { packageId },
      });
      return NextResponse.json(
        { error: "Invalid mission payload package ID." },
        { status: 400, headers: rateLimitHeaders },
      );
    }

    const selectedPkg = prices[packageId];
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      logger.info("Checkout requested in sandbox/simulation mode", {
        traceId,
        context: {
          packageName: selectedPkg.name,
          amount: selectedPkg.amount,
          hasEmail: Boolean(email),
        },
      });

      return NextResponse.json(
        {
          simulation: true,
          message: "Payment subsystem operational in sandbox mode. Add STRIPE_SECRET_KEY to .env to enable direct live card charges.",
          orderSummary: {
            package: selectedPkg.name,
            amountFormatted: `$${(selectedPkg.amount / 100).toLocaleString()}`,
            clientEmail: email || "Not provided",
            status: "READY_FOR_ORBIT",
          },
        },
        { headers: rateLimitHeaders },
      );
    }

    return NextResponse.json(
      { error: "Stripe key present but session awaiting configuration." },
      { status: 501, headers: rateLimitHeaders },
    );
  } catch (err) {
    logger.error("Checkout sequence aborted", {
      traceId,
      error: err,
    });
    return NextResponse.json(
      { error: "Checkout sequence aborted." },
      { status: 500, headers: rateLimitHeaders },
    );
  }
}
