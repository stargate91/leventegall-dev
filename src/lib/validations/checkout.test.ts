import { describe, it, expect } from "vitest";
import { checkoutFormSchema } from "./checkout";

describe("Checkout Form Zod Validation Schema", () => {
  it("validates valid package IDs with optional email", () => {
    const result = checkoutFormSchema.safeParse({
      packageId: "full-orbit",
      email: "contact@orbital.dev",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.packageId).toBe("full-orbit");
      expect(result.data.email).toBe("contact@orbital.dev");
    }
  });

  it("validates payload without email", () => {
    const result = checkoutFormSchema.safeParse({
      packageId: "naming",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid package IDs", () => {
    const result = checkoutFormSchema.safeParse({
      packageId: "super-tier-invalid",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid email formats", () => {
    const result = checkoutFormSchema.safeParse({
      packageId: "web-dev",
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });
});
