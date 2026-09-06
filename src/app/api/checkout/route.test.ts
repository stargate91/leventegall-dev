import { describe, it, expect } from "vitest";
import { POST } from "./route";

describe("Checkout API Endpoint (/api/checkout)", () => {
  it("returns 200 OK and simulation orderSummary in sandbox mode", async () => {
    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        packageId: "full-orbit",
        email: "gordon.freeman@blackmesa.gov",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = (await response.json()) as {
      simulation: boolean;
      orderSummary: { package: string; amountFormatted: string };
    };

    expect(data.simulation).toBe(true);
    expect(data.orderSummary.package).toContain("Full-Orbit Launch");
    expect(data.orderSummary.amountFormatted).toBe("$1,850");
  });

  it("returns 400 Bad Request when validation fails", async () => {
    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        packageId: "non-existent-tier",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = (await response.json()) as { error: string };
    expect(data.error).toBeDefined();
  });

  it("returns 403 Forbidden for unauthorized cross-site origins", async () => {
    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "https://malicious-cross-origin.com",
      },
      body: JSON.stringify({
        packageId: "full-orbit",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(403);
  });
});
