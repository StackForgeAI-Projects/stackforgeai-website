import { describe, expect, it } from "vitest";
import { dicts } from "@/lib/i18n/dicts";
import { en } from "@/lib/i18n/en";

describe("site i18n dictionaries", () => {
  const keys = Object.keys(en);

  it("keeps French and Kinyarwanda in sync with English keys", () => {
    for (const key of keys) {
      expect(dicts.fr[key], `missing fr: ${key}`).toBeTruthy();
      expect(dicts.rw[key], `missing rw: ${key}`).toBeTruthy();
    }
  });

  it("includes French hero copy", () => {
    expect(dicts.fr["hero.title.1"]).toBe("Construire des solutions qui");
    expect(dicts.fr["nav.cta"]).toBe("Contactez-nous");
  });

  it("includes Kinyarwanda hero copy", () => {
    expect(dicts.rw["hero.title.1"]).toBe("Guteza imbere ibisubizo");
    expect(dicts.rw["hero.title.4"]).toBe("Afurika");
  });
});
