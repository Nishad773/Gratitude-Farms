import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Enquiry + newsletter intake.
 *
 * Submissions are validated on the server, given a reference number, and
 * written to the server log. If `ENQUIRY_WEBHOOK_URL` is set in the deployment
 * environment, the record is also POSTed there — that is the hook for wiring up
 * email, a CRM, or a spreadsheet without touching this file again.
 */

export const enquiryInterests = [
  "CSR Partnership",
  "Crowdfunding & Donations",
  "Travel Partnership",
  "Media & Press",
  "Volunteering",
  "Transparency / due-diligence pack",
  "Other",
] as const;

export type EnquiryInterest = (typeof enquiryInterests)[number];

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number we can reach you on.")
    .max(24, "That phone number looks too long.")
    .regex(/^[0-9+\-\s()]+$/, "Use digits, spaces and + - ( ) only."),
  interest: z.enum(enquiryInterests),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about what you have in mind helps us route this.")
    .max(2000, "Please keep this under 2000 characters."),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm we may contact you about this enquiry.",
  }),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryValues = z.output<typeof enquirySchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(160),
});

export type NewsletterValues = z.output<typeof newsletterSchema>;

export type SubmissionResult = {
  ok: true;
  reference: string;
  receivedAt: string;
};

function makeReference(prefix: string): string {
  const now = new Date();
  const stamp = [
    now.getUTCFullYear().toString().slice(-2),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}

async function forwardToWebhook(kind: string, payload: Record<string, unknown>, reference: string) {
  const url = process.env["ENQUIRY_WEBHOOK_URL"];
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, reference, ...payload }),
    });
    if (!response.ok) {
      console.error(`[enquiry] webhook responded ${response.status} for ${reference}`);
    }
  } catch (error) {
    // Never fail the visitor's submission because a downstream integration is down.
    console.error(`[enquiry] webhook delivery failed for ${reference}`, error);
  }
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator(enquirySchema)
  .handler(async ({ data }): Promise<SubmissionResult> => {
    const reference = makeReference("GT");
    const receivedAt = new Date().toISOString();

    console.info(
      `[enquiry] ${reference} · ${data.interest} · ${data.name}` +
        `${data.organisation ? ` (${data.organisation})` : ""} · ${data.email} · ${data.phone}\n` +
        data.message,
    );

    await forwardToWebhook("enquiry", { ...data, receivedAt }, reference);

    return { ok: true, reference, receivedAt };
  });

export const subscribeToUpdates = createServerFn({ method: "POST" })
  .validator(newsletterSchema)
  .handler(async ({ data }): Promise<SubmissionResult> => {
    const reference = makeReference("NL");
    const receivedAt = new Date().toISOString();

    console.info(`[newsletter] ${reference} · ${data.email}`);

    await forwardToWebhook("newsletter", { ...data, receivedAt }, reference);

    return { ok: true, reference, receivedAt };
  });
