import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("StackFix landing page", () => {
  test("renders all major sections", async ({ page }) => {
    await page.goto("/stackfix");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#features")).toBeVisible();
    await expect(page.locator("#product")).toBeVisible();
    await expect(page.locator("#how")).toBeVisible();
    await expect(page.locator("#pricing")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("uses homepage logo in navigation", async ({ page }) => {
    await page.goto("/stackfix");
    const logoLink = page.locator("header nav").getByRole("link", { name: /StackForgeAI home/i });
    await expect(logoLink).toHaveAttribute("href", "/");
    const logo = logoLink.getByRole("img", { name: "StackForgeAI" });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("src", /logo\.png/);
    await expect(page.locator("header nav")).not.toContainText("StackFix");
  });

  test("renders hero headline from translations", async ({ page }) => {
    await page.goto("/stackfix");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Run your repair shop");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("like a tech company.");
  });

  test("crops mobile product preview to top half", async ({ page }) => {
    await page.goto("/stackfix#product");
    const preview = page.locator("#product").getByLabel("StackFix mobile app preview");
    await expect(preview).toBeVisible();
    await expect(preview).toHaveCSS("overflow", "hidden");
    const box = await preview.boundingBox();
    expect(box?.height).toBeGreaterThan(0);
    if (box) {
      expect(box.height / box.width).toBeLessThan(1.1);
    }
  });

  test("keeps pricing badge on one line", async ({ page }) => {
    await page.goto("/stackfix#pricing");
    const badge = page.getByText("Most popular · Best value");
    await expect(badge).toBeVisible();
    await expect(badge).toHaveCSS("white-space", "nowrap");
  });

  test("anchor nav scrolls to pricing", async ({ page }) => {
    await page.goto("/stackfix");
    await page.getByRole("link", { name: "Pricing" }).first().click();
    await expect(page).toHaveURL(/#pricing$/);
  });

  test("language switcher changes locale label", async ({ page }) => {
    await page.goto("/stackfix");
    await page.getByRole("button", { name: "Change language" }).click();
    await page.getByRole("option", { name: /Kinyarwanda/i }).click();
    await expect(page.getByRole("button", { name: "Change language" })).toContainText("RW");
  });

  test("trial modal opens from starter plan", async ({ page }) => {
    await page.goto("/stackfix#pricing");
    await page.getByRole("button", { name: /Start free trial/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Start your free trial/i })).toBeVisible();
  });

  test("homepage StackFix CTA links to /stackfix", async ({ page }) => {
    await page.goto("/#products");
    const tryLink = page.locator("#product-stackfix").getByRole("link", { name: /Try it now/i });
    await expect(tryLink).toHaveAttribute("href", "/stackfix");
  });

  test("contact form submits to API and shows success alert", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, id: "test-id" }),
      });
    });

    await page.goto("/stackfix#contact");
    await page
      .getByLabel("StackFix demo request form")
      .getByPlaceholder("Kevin Ganza")
      .fill("Kevin Ganza");
    await page.getByPlaceholder("FixHub Nyarugenge").fill("FixHub Nyarugenge");
    await page.getByPlaceholder("you@shop.rw").fill("demo@shop.rw");
    await page.getByRole("button", { name: /Send message/i }).click();

    await expect(
      page.getByText(/Message sent ✓ We'll get back to you within 48 hours\./),
    ).toBeVisible();
  });

  test("no critical accessibility violations on stackfix", async ({ page }) => {
    await page.goto("/stackfix");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical).toEqual([]);
  });
});
