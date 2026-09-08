import { test, expect } from "@playwright/test";

test.describe("Cosmic Portfolio E2E Quality Verification", () => {
  test("renders hero chamber with proper title and metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Levente Gáll/);

    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible();
    await expect(heroSection.locator("h1")).toContainText(/Levente/i);
  });

  test("navigates through desktop navbar links", async ({ page }) => {
    await page.goto("/");

    const projectsLink = page.locator('a[href="#projects"]').first();
    await projectsLink.click();
    await expect(page.locator("#projects")).toBeInViewport();
  });

  test("allows interactive project preview and lightbox modal interaction", async ({ page }) => {
    await page.goto("/");

    const screenshotCard = page.locator('button[aria-label*="Organizer"], button[aria-label*="Rendszerező"]').first();
    await screenshotCard.waitFor({ state: "visible" });
    await screenshotCard.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("validates contact form submission in UI", async ({ page }) => {
    await page.goto("/");

    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    const errorAlert = contactSection.locator('[role="alert"]').first();
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(/name|neved/i);
  });
});
