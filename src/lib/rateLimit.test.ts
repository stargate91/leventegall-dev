import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit } from "./rateLimit";

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
});
