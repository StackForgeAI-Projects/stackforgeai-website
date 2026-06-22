import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site";
import { rootStructuredDataGraph } from "@/lib/schema";

describe("StackFix external integration", () => {
  it("points product links to stackfix.app", () => {
    expect(siteConfig.links.stackfix).toBe("https://stackfix.app");
    expect(siteConfig.links.stackfixApp).toBe("https://stackfix.app/dashboard");
  });

  it("does not publish stackfix landing JSON-LD on the root org graph", () => {
    const graph = rootStructuredDataGraph();
    const nodes = graph["@graph"] as Record<string, unknown>[];
    const root = siteConfig.url.replace(/\/$/, "");
    expect(nodes.some((n) => n["@id"] === `${root}/#product-stackfix`)).toBe(false);
    expect(nodes.some((n) => n["@type"] === "FAQPage")).toBe(false);
  });
});
