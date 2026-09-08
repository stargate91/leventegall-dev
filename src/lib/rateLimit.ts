interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired records periodically
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  if (typeof cleanupTimer.unref === "function") {
    cleanupTimer.unref();
  }
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs: number = 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  if (!existing || now > existing.resetTime) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetTime,
    };
  }

  if (existing.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetTime: existing.resetTime,
    };
  }

  existing.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - existing.count,
    resetTime: existing.resetTime,
  };
}

/**
 * Distributed Rate Limiting Layer
 * Supports Upstash Redis / Vercel KV REST API when configured via environment variables.
 * Automatically falls back to local in-memory store in development and test environments.
 */
export async function checkDistributedRateLimit(
  identifier: string,
  limit = 5,
  windowMs: number = 60 * 1000,
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!upstashUrl || !upstashToken) {
    return checkRateLimit(identifier, limit, windowMs);
  }

  try {
    const windowSeconds = Math.ceil(windowMs / 1000);
    const key = `ratelimit:${identifier}`;

    // Execute atomic INCR, conditional EXPIRE (NX) and TTL pipeline via Upstash REST API
    const response = await fetch(`${upstashUrl}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${upstashToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, windowSeconds, "NX"],
        ["TTL", key],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      return checkRateLimit(identifier, limit, windowMs);
    }

    const data = (await response.json()) as Array<{ result: number }>;
    const currentCount = data[0]?.result ?? 1;
    const ttlSeconds = (data[2]?.result ?? windowSeconds) > 0 ? (data[2]?.result ?? windowSeconds) : windowSeconds;
    const resetTime = Date.now() + ttlSeconds * 1000;

    return {
      success: currentCount <= limit,
      limit,
      remaining: Math.max(0, limit - currentCount),
      resetTime,
    };
  } catch {
    // Fail open or fallback to memory on network/adapter failure
    return checkRateLimit(identifier, limit, windowMs);
  }
}
