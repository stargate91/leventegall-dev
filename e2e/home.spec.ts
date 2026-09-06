import { test, expect } from "@playwright/test";

test.describe("Cosmic Portfolio E2E Quality Verification", () => {
  test("renders hero chamber with proper title and metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Levente Gáll/);

    const mainHeading = page.locator("h1");
    await expect(mainHeading).toContainText("CLEAN CODE ARCHITECTURE");
  });

  test("navigates through desktop navbar links", async ({ page }) => {
    await page.goto("/");

    const projectsLink = page.locator('#nav-link-projects, a[href="#projects"]');
    await projectsLink.first().click();
    await expect(page.locator("#projects")).toBeInViewport();
  });

  test("allows interactive project simulator interaction", async ({ page }) => {
    await page.goto("/");

    const stepBtn = page.locator('button:has-text("+ Step Queue")');
    if (await stepBtn.isVisible()) {
      await stepBtn.click();
      await expect(page.locator('text="[ 83% ]"')).toBeVisible();
    }
  });

  test("validates contact form submission in UI", async ({ page }) => {
    await page.goto("/");

    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const submitBtn = page.locator('button[type="submit"]:has-text("Send Message")');
    await submitBtn.click();

    await expect(page.locator('text="CALLSIGN REQUIRED"')).toBeVisible();
  });
});
