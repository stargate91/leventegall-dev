import { NextResponse } from "next/server";
import type { ContactApiResponse } from "@/types/contact";
import { validateOrigin } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import { checkDistributedRateLimit } from "@/lib/rateLimit";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request): Promise<NextResponse<ContactApiResponse>> {
  const traceId = request.headers.get("x-request-id") || logger.createTraceId();

  // 1. Origin & CSRF validation
  if (!validateOrigin(request)) {
    logger.warn("Request rejected: unauthorized cross-site origin", { traceId });
    return NextResponse.json(
      { error: "Forbidden: cross-site transmission rejected." },
      { status: 403, headers: { "x-request-id": traceId } },
    );
  }

  // 2. Client IP extraction & Rate limiting (5 requests per minute)
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const rateLimitResult = await checkDistributedRateLimit(`contact:${clientIp}`, 5, 60 * 1000);

  const rateLimitHeaders = {
    "x-request-id": traceId,
    "X-RateLimit-Limit": String(rateLimitResult.limit),
    "X-RateLimit-Remaining": String(rateLimitResult.remaining),
    "X-RateLimit-Reset": String(rateLimitResult.resetTime),
  };

  if (!rateLimitResult.success) {
    logger.warn("Rate limit exceeded for contact transmissions", {
      traceId,
      context: { clientIp: `${clientIp.slice(0, 4)}***` },
    });
    return NextResponse.json(
      { error: "Too many transmissions. Please wait before sending another message." },
      { status: 429, headers: rateLimitHeaders },
    );
  }

  try {
    const rawBody = (await request.json()) as unknown;

    // 3. Server-side Zod schema validation
    const parseResult = contactFormSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid payload format.";
      logger.warn("Contact validation failed", {
        traceId,
        context: { errorDetails: parseResult.error.flatten().fieldErrors },
      });
      return NextResponse.json(
        { error: firstError },
        { status: 400, headers: rateLimitHeaders },
      );
    }

    const { name, email, tier, timeline, brief, botProbe } = parseResult.data;

    // 4. Honeypot check: If botProbe is filled, silently discard bot transmission
    if (botProbe && botProbe.trim().length > 0) {
      logger.warn("Bot submission trapped via honeypot field", {
        traceId,
        context: { clientIp: `${clientIp.slice(0, 4)}***` },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Signal received and verified. Mission team will establish uplink within 24 hours.",
          telemetryId: `TX-BOT-${Date.now().toString(36).toUpperCase()}`,
        },
        { status: 200, headers: rateLimitHeaders },
      );
    }

    // 5. Mask PII in server logs for privacy compliance
    const maskedEmail = email.replace(/(?<=^.{2}).*(?=@)/, "***");
    logger.info("Incoming contact transmission verified", {
      traceId,
      context: {
        name: `${name.slice(0, 1)}***`,
        maskedEmail,
        tier,
        timeline,
        briefLength: brief.length,
      },
    });

    const telemetryId = `TX-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Signal received and verified. Mission team will establish uplink within 24 hours.",
        telemetryId,
      },
      {
        status: 200,
        headers: rateLimitHeaders,
      },
    );
  } catch (err) {
    logger.error("Transmission gateway error", {
      traceId,
      error: err,
    });
    return NextResponse.json(
      { error: "Signal interference detected. Please retry or contact directly via email." },
      {
        status: 500,
        headers: rateLimitHeaders,
      },
    );
  }
}
