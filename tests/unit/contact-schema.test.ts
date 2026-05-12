import { describe, expect, it } from "vitest";
import { contactSchema, newsletterSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse({
      name: "Aline",
      email: "aline@example.com",
      company: "Kigali Co.",
      message: "Hello, this is a real message with enough characters.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short names", () => {
    const result = contactSchema.safeParse({
      name: "A",
      email: "a@b.co",
      message: "1234567890",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid emails", () => {
    const result = contactSchema.safeParse({
      name: "Aline",
      email: "not-an-email",
      message: "1234567890",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short messages", () => {
    const result = contactSchema.safeParse({
      name: "Aline",
      email: "a@b.co",
      message: "hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-empty honeypot", () => {
    const result = contactSchema.safeParse({
      name: "Aline",
      email: "a@b.co",
      message: "Hello there, this is a long enough message.",
      website: "I'm a bot",
    });
    expect(result.success).toBe(false);
  });

  it("normalises email to lowercase", () => {
    const result = contactSchema.safeParse({
      name: "Aline",
      email: "ALine@EXAMPLE.com",
      message: "Hello there, this is a long enough message.",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("aline@example.com");
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "x@y.co" }).success).toBe(true);
  });
  it("blocks honeypot fills", () => {
    expect(newsletterSchema.safeParse({ email: "x@y.co", fullName: "bot" }).success).toBe(false);
  });
});
