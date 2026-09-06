import { NextResponse } from "next/server";
import type { CheckoutApiResponse, CheckoutRequestBody } from "@/types/checkout";
import { validateOrigin } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import { checkDistributedRateLimit } from "@/lib/rateLimit";
import { checkoutFormSchema } from "@/lib/validations/checkout";

/**
 * Payment Endpoint (/api/checkout)
 *
 * Ready to connect with Stripe Checkout, Lemon Squeezy, or Barion/SimplePay.
 */

export async function POST(request: Request): Promise<NextResponse<CheckoutApiResponse>> {
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

  const rateLimitResult = await checkDistributedRateLimit(`checkout:${clientIp}`, 10, 60 * 1000);

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
    const rawBody = (await request.json()) as unknown;

    // 3. Server-side Zod Schema Validation
    const parseResult = checkoutFormSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid payload format.";
      logger.warn("Checkout validation failed", {
        traceId,
        context: { errorDetails: parseResult.error.flatten().fieldErrors },
      });
      return NextResponse.json(
        { error: firstError },
        { status: 400, headers: rateLimitHeaders },
      );
    }

    const { packageId, email }: CheckoutRequestBody = parseResult.data;

    const prices: Record<string, { name: string; amount: number }> = {
      naming: { name: "Orbital Identity (Naming & Slogans)", amount: 49000 },
      "full-orbit": { name: "Full-Orbit Launch (Naming + Next.js Platform)", amount: 185000 },
      "web-dev": { name: "Deep-Space Engine (Next.js Application)", amount: 145000 },
    };

    const selectedPkg = prices[packageId];
    if (!selectedPkg) {
      return NextResponse.json(
        { error: "Invalid mission payload package ID." },
        { status: 400, headers: rateLimitHeaders },
      );
    }

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
            amountFormatted: `$${(selectedPkg.amount / 100).toLocaleString("en-US")}`,
            clientEmail: email || "Not provided",
            status: "READY_FOR_ORBIT",
          },
        },
        { status: 200, headers: rateLimitHeaders },
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
