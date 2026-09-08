import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit, checkDistributedRateLimit } from "./rateLimit";

describe("Rate Limiter Utility", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("allows requests up to the specified limit", () => {
    const id = `test-ip-${Date.now()}-1`;
    const res1 = checkRateLimit(id, 3, 60000);
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = checkRateLimit(id, 3, 60000);
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = checkRateLimit(id, 3, 60000);
    expect(res3.success).toBe(true);
    expect(res3.remaining).toBe(0);

    const res4 = checkRateLimit(id, 3, 60000);
    expect(res4.success).toBe(false);
    expect(res4.remaining).toBe(0);
  });

  it("isolates distinct client identifiers", () => {
    const idA = "client-alpha";
    const idB = "client-beta";

    checkRateLimit(idA, 1, 60000);
    const resA = checkRateLimit(idA, 1, 60000);
    expect(resA.success).toBe(false);

    const resB = checkRateLimit(idB, 1, 60000);
    expect(resB.success).toBe(true);
  });

  it("resets limit counters after window expiration", () => {
    const id = "test-ip-reset";
    checkRateLimit(id, 1, 1000);

    const blocked = checkRateLimit(id, 1, 1000);
    expect(blocked.success).toBe(false);

    // Fast-forward past window
    vi.advanceTimersByTime(1100);

    const allowedAgain = checkRateLimit(id, 1, 1000);
    expect(allowedAgain.success).toBe(true);
    expect(allowedAgain.remaining).toBe(0);
  });

  it("checkDistributedRateLimit falls back cleanly to memory when no env credentials exist", async () => {
    const id = "distributed-fallback-id";
    const res = await checkDistributedRateLimit(id, 2, 60000);
    expect(res.success).toBe(true);
    expect(res.remaining).toBe(1);
  });

  it("checkDistributedRateLimit calls Upstash pipeline with EXPIRE NX option when credentials exist", async () => {
    const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
    const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    process.env.UPSTASH_REDIS_REST_URL = "https://mock-redis.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "mock-token-xyz";

    let capturedBody: unknown;
    global.fetch = vi.fn().mockImplementation((_url, init) => {
      capturedBody = JSON.parse(init.body as string);
      return Promise.resolve({
        ok: true,
        json: async () => [{ result: 2 }, { result: 1 }, { result: 45 }],
      } as Response);
    });

    const res = await checkDistributedRateLimit("user-test-dist", 5, 60000);

    expect(res.success).toBe(true);
    expect(res.remaining).toBe(3);
    expect(capturedBody).toEqual([
      ["INCR", "ratelimit:user-test-dist"],
      ["EXPIRE", "ratelimit:user-test-dist", 60, "NX"],
      ["TTL", "ratelimit:user-test-dist"],
    ]);

    process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
  });
});
