import { en } from "./en";
import { fr } from "./fr";
import { rw } from "./rw";

export type Lang = "en" | "fr" | "rw";

export const dicts = { en, fr, rw } as const;

export type DictKey = keyof typeof en;
