import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("Healthcheck API Endpoint (/api/health)", () => {
  it("returns 200 OK with healthy status and metadata", async () => {
    const request = new Request("http://localhost:3000/api/health");
    const response = await GET(request);

    expect(response.status).toBe(200);

    const data = (await response.json()) as {
      status: string;
      timestamp: string;
      uptime: number;
      system: string;
      traceId: string;
    };

    expect(data.status).toBe("healthy");
    expect(typeof data.uptime).toBe("number");
    expect(typeof data.timestamp).toBe("string");
    expect(data.system).toContain("Cosmic Portfolio");
    expect(response.headers.get("x-request-id")).toBeTruthy();
  });
});
