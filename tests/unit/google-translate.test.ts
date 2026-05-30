import { describe, expect, it, beforeEach } from "vitest";
import {
  desiredGoogTransCookie,
  isPageTranslated,
  isTranslationSynced,
  readGoogTransCookie,
  writeGoogTransCookie,
} from "@/lib/google-translate";

describe("google-translate cookies", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("translated-ltr", "translated-rtl");
    document.body.classList.remove("translated-ltr", "translated-rtl");
    document.cookie = "googtrans=; Max-Age=0; path=/";
  });

  it("maps language codes to googtrans cookie values", () => {
    expect(desiredGoogTransCookie("en")).toBe("");
    expect(desiredGoogTransCookie("fr")).toBe("/en/fr");
    expect(desiredGoogTransCookie("rw")).toBe("/en/rw");
  });

  it("writes and reads rw cookie", () => {
    writeGoogTransCookie("rw");
    expect(readGoogTransCookie()).toBe("/en/rw");
  });

  it("clears cookie for English", () => {
    writeGoogTransCookie("rw");
    writeGoogTransCookie("en");
    expect(readGoogTransCookie()).toBe("");
  });

  it("detects synced Kinyarwanda when cookie and translated class match", () => {
    writeGoogTransCookie("rw");
    document.documentElement.classList.add("translated-ltr");
    expect(isPageTranslated()).toBe(true);
    expect(isTranslationSynced("rw")).toBe(true);
  });

  it("detects synced English when cookie cleared and page not translated", () => {
    expect(isTranslationSynced("en")).toBe(true);
  });
});
