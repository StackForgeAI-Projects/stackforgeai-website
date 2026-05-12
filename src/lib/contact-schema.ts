import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(100).trim(),
  email: z.string().email({ message: "Please enter a valid email" }).max(254).toLowerCase().trim(),
  company: z.string().max(100).trim().optional().or(z.literal("")),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(5000)
    .trim(),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email().max(254).toLowerCase().trim(),
  // Honeypot
  fullName: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
