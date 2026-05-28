export interface SendContactArgs {
  name: string;
  email: string;
  company?: string;
  message: string;
  ip?: string;
  userAgent?: string;
}

/** Strip header-injection characters from display names. */
export function sanitizeDisplayName(name: string): string {
  return name.replace(/[\r\n<>]/g, "").trim() || "Website visitor";
}

/** RFC 5322 Reply-To with a safe display name so inbox clients thread correctly. */
export function formatContactReplyTo(name: string, email: string): string {
  return `${sanitizeDisplayName(name)} <${email}>`;
}

/** Plain-text body — multipart/alternative improves spam scoring vs HTML-only. */
export function buildContactPlainText(args: SendContactArgs): string {
  const lines = [
    "StackForgeAI — New website enquiry",
    "",
    `From: ${sanitizeDisplayName(args.name)} <${args.email}>`,
  ];

  if (args.company) {
    lines.push(`Company: ${args.company}`);
  }

  lines.push("", "Message:", args.message, "", "---", `Submitted: ${new Date().toUTCString()}`);

  if (args.ip) lines.push(`IP: ${args.ip}`);
  if (args.userAgent) lines.push(`User-Agent: ${args.userAgent}`);

  lines.push(
    "",
    "Reply to this email to respond directly to the sender.",
    "https://stackforgeai.africa",
  );

  return lines.join("\n");
}

/** Warn when From/To share the same mailbox — common cause of junk on self-hosted inboxes. */
export function contactFromToMisconfigured(from: string, to: string): boolean {
  const extract = (value: string) => {
    const match = value.match(/<([^>]+)>/);
    return (match?.[1] ?? value).trim().toLowerCase();
  };
  return extract(from) === extract(to);
}
