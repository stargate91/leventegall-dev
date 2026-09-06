import { describe, it, expect } from "vitest";
import { contactFormSchema } from "./contact";

describe("Contact Form Zod Schema Validation", () => {
  const validPayload = {
    name: "Alex Mercer",
    email: "alex@startup.io",
    tier: "full-orbit",
    timeline: "2-3-weeks",
    brief: "We need a complete brand identity and Next.js full-stack platform built.",
  };

  it("passes for valid contact payloads", () => {
    const result = contactFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Alex Mercer");
      expect(result.data.email).toBe("alex@startup.io");
    }
  });

  it("fails when name is shorter than 2 characters", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, name: "A" });
    expect(result.success).toBe(false);
  });

  it("fails when email has invalid format", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, email: "invalid-email-address" });
    expect(result.success).toBe(false);
  });

  it("fails when project brief is shorter than 10 characters", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, brief: "Short" });
    expect(result.success).toBe(false);
  });

  it("trims extraneous whitespace from text fields", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      name: "  Alex Mercer  ",
      email: "  alex@startup.io  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Alex Mercer");
      expect(result.data.email).toBe("alex@startup.io");
    }
  });
});
