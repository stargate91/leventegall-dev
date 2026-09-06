import { describe, it, expect } from "vitest";
import { POST } from "./route";

describe("Contact API Endpoint (/api/contact)", () => {
  const validPayload = {
    name: "Dr. Gordon Freeman",
    email: "gordon@blackmesa.gov",
    tier: "full-orbit",
    timeline: "2-3-weeks",
    brief: "We require full-stack quantum telemetry and clean responsive interface.",
  };

  it("returns 200 OK and telemetryId for valid submissions", async () => {
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = (await response.json()) as { success: boolean; telemetryId: string };
    expect(data.success).toBe(true);
    expect(data.telemetryId).toMatch(/^TX-/);
    expect(response.headers.get("x-request-id")).toBeTruthy();
    expect(response.headers.get("X-RateLimit-Limit")).toBeTruthy();
  });

  it("returns 400 Bad Request when validation fails", async () => {
    const invalidPayload = {
      name: "G",
      email: "invalid-email",
      brief: "short",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify(invalidPayload),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = (await response.json()) as { error: string };
    expect(data.error).toBeTruthy();
  });

  it("returns 403 Forbidden for unauthorized cross-site origins", async () => {
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "https://unauthorized-external-site.com",
      },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    expect(response.status).toBe(403);
  });

  it("traps automated bot transmissions when honeypot field is filled", async () => {
    const botPayload = {
      ...validPayload,
      botProbe: "http://spam-link-buy-now.com",
    };

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify(botPayload),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = (await response.json()) as { success: boolean; telemetryId: string };
    expect(data.success).toBe(true);
    expect(data.telemetryId).toContain("TX-BOT-");
  });
});
