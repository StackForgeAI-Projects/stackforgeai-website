import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Landing page", () => {
  test("renders hero headline sizing and three-line layout", async ({ page, viewport }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toContainText("Building Solutions That");
    await expect(h1).toContainText("Power");
    await expect(h1).toContainText("Africa's Digital");
    await expect(h1).toContainText("Growth");
    const isMobile = (viewport?.width ?? 1280) < 768;
    await expect(h1).toHaveCSS("font-size", isMobile ? "48px" : "72px");
    await expect(h1).toHaveCSS("max-width", "896px");
  });

  test("renders all major sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#products")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#impact")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("anchor nav scrolls to sections", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Products" }).first().click();
    await expect(page).toHaveURL(/#products$/);
  });

  test("language switcher applies internal French copy", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Change language" }).click();
    await page.getByRole("menuitemradio", { name: /Français/i }).click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("stackforgeai.lang")))
      .toBe("fr");
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    await expect(page.getByRole("link", { name: "Contactez-nous" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Construire des solutions qui",
    );
  });

  test("language switcher applies internal Kinyarwanda copy", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Change language" }).click();
    await page.getByRole("menuitemradio", { name: /Kinyarwanda/i }).click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("stackforgeai.lang")))
      .toBe("rw");
    await expect(page.locator("html")).toHaveAttribute("lang", "rw");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Guteza imbere ibisubizo");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Afurika");
  });

  test("contact form blocks invalid submissions", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("tab", { name: /Send message/i }).click();
    await page.getByPlaceholder(/Name/i).first().fill("A");
    await page.getByPlaceholder(/Email/i).first().fill("not-an-email");
    await page.getByPlaceholder(/project/i).fill("hi");
    await page.getByRole("button", { name: /Send message/i }).click();
    await expect(page.getByText(/Please enter a valid email/i)).toBeVisible();
  });

  test("no critical accessibility violations on home", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical).toEqual([]);
  });
});
