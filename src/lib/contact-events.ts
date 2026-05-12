/**
 * Cross-section communication for the Contact section's tabs.
 *
 * Any client component (Hero CTA, nav link, etc.) can call `openContactTab`
 * to scroll the user to `#contact` and activate the requested tab without
 * needing to know about the Contact component's internal state.
 */

export type ContactTab = "talk" | "message";

export const CONTACT_TAB_EVENT = "stackforge:contact-tab";

export type ContactTabEvent = CustomEvent<ContactTab>;

export function openContactTab(tab: ContactTab): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ContactTab>(CONTACT_TAB_EVENT, { detail: tab }));
  const target = document.getElementById("contact");
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}
