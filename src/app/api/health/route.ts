import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET(request: Request): Promise<NextResponse> {
  const traceId = request.headers.get("x-request-id") || logger.createTraceId();

  logger.debug("Healthcheck probe executed", { traceId });

  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      system: "Cosmic Portfolio Engine",
      traceId,
    },
    {
      status: 200,
      headers: { "x-request-id": traceId },
    },
  );
}
