import { describe, expect, it } from "vitest";
import {
  buildContactPlainText,
  contactFromToMisconfigured,
  formatContactReplyTo,
  sanitizeDisplayName,
} from "@/lib/contact-email-content";

describe("contact email content", () => {
  it("sanitizes display names for headers", () => {
    expect(sanitizeDisplayName("Jane\r\nO'Neill")).toBe("JaneO'Neill");
    expect(sanitizeDisplayName("   ")).toBe("Website visitor");
  });

  it("formats Reply-To with display name", () => {
    expect(formatContactReplyTo("Jane Doe", "jane@example.com")).toBe(
      "Jane Doe <jane@example.com>",
    );
  });

  it("builds a plain-text body with message and reply hint", () => {
    const text = buildContactPlainText({
      name: "Jane",
      email: "jane@example.com",
      company: "Acme",
      message: "Hello there",
      ip: "1.2.3.4",
    });
    expect(text).toContain("StackForgeAI — New website enquiry");
    expect(text).toContain("Jane <jane@example.com>");
    expect(text).toContain("Company: Acme");
    expect(text).toContain("Hello there");
    expect(text).toContain("Reply to this email");
    expect(text).toContain("IP: 1.2.3.4");
  });

  it("detects misconfigured From/To on the same mailbox", () => {
    expect(
      contactFromToMisconfigured(
        "StackForgeAI <hello@stackforgeai.africa>",
        "hello@stackforgeai.africa",
      ),
    ).toBe(true);
    expect(
      contactFromToMisconfigured(
        "StackForgeAI Contact Form <contact@send.stackforgeai.africa>",
        "hello@stackforgeai.africa",
      ),
    ).toBe(false);
  });
});
