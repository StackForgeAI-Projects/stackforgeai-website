import { test, expect } from "@playwright/test";

test.describe("StackFix external routing", () => {
  test("redirects /stackfix to stackfix.app", async ({ request }) => {
    const response = await request.get("/stackfix", { maxRedirects: 0 });
    expect(response.status()).toBeGreaterThanOrEqual(300);
    expect(response.status()).toBeLessThan(400);
    expect(response.headers().location).toMatch(/^https:\/\/stackfix\.app\/?$/);
  });

  test("redirects /stackfix paths to stackfix.app", async ({ request }) => {
    const response = await request.get("/stackfix#pricing", { maxRedirects: 0 });
    expect(response.status()).toBeGreaterThanOrEqual(300);
    expect(response.status()).toBeLessThan(400);
    expect(response.headers().location).toMatch(/^https:\/\/stackfix\.app/);
  });

  test("homepage StackFix CTA links to stackfix.app in a new tab", async ({ page }) => {
    await page.goto("/#products");
    const tryLink = page.locator("#product-stackfix").getByRole("link", { name: /Try it now/i });
    await expect(tryLink).toHaveAttribute("href", "https://stackfix.app");
    await expect(tryLink).toHaveAttribute("target", "_blank");
    await expect(tryLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("footer StackFix link opens stackfix.app in a new tab", async ({ page }) => {
    await page.goto("/");
    const stackfixLink = page.getByRole("contentinfo").getByRole("link", { name: "StackFix" });
    await expect(stackfixLink).toHaveAttribute("href", "https://stackfix.app");
    await expect(stackfixLink).toHaveAttribute("target", "_blank");
  });
});
