import { describe, expect, it } from "vitest";
import { cn, absoluteUrl } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("dedupes conflicting Tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("respects conditionals", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
});

describe("absoluteUrl", () => {
  it("returns a full URL", () => {
    expect(absoluteUrl("/contact")).toMatch(/^https?:\/\//);
  });
});
