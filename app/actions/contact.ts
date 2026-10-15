"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { ResponseEmail } from "@/emails/ResponseEmail";
import { NotificationEmail } from "@/emails/NotificationEmail";
import { createRateLimiter } from "@/libs/rate-limit";
import { TURNSTILE_FIELD, verifyTurnstile } from "@/libs/turnstile";
import {
  contactSchema,
  HONEYPOT_FIELD,
  type ContactFormState,
} from "@/libs/schemas/contact";

// Resend's shared test sender. It can only deliver to the Resend account owner.
const TEST_SENDER = "Portfolio Contact <onboarding@resend.dev>";

const isAllowed = createRateLimiter({ limit: 3, windowMs: 10 * 60 * 1000 });

const getClientIp = async () => {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const timestamp = Date.now();

  // Bot filled the hidden field: pretend it worked, send nothing.
  if (formData.get(HONEYPOT_FIELD)) {
    return { success: true, timestamp };
  }

  const validatedFields = contactSchema.safeParse({
    company: formData.get("company"),
    email: formData.get("email"),
    tel: formData.get("tel"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      timestamp,
    };
  }

  const ip = await getClientIp();

  if (!isAllowed(ip)) {
    return {
      success: false,
      error: "Too many messages. Please try again later.",
      timestamp,
    };
  }

  if (!(await verifyTurnstile(formData.get(TURNSTILE_FIELD), ip))) {
    return {
      success: false,
      error: "Please complete the security check and try again.",
      timestamp,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
      timestamp,
    };
  }

  const resend = new Resend(apiKey);
  const data = validatedFields.data;
  // Set CONTACT_FROM_EMAIL to an address on a domain verified in Resend.
  const verifiedSender = process.env.CONTACT_FROM_EMAIL;
  const ownerEmail = process.env.CONTACT_TO_EMAIL || "prapat.psm@gmail.com";

  // 1. Notify the owner first: this is the email that must not get lost.
  const { error: notifyError } = await resend.emails.send({
    from: verifiedSender || TEST_SENDER,
    to: ownerEmail,
    replyTo: data.email,
    subject: `New Contact Submission from ${data.company}`,
    react: NotificationEmail(data),
  });

  if (notifyError) {
    console.error("Error sending notification email:", notifyError);
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
      timestamp,
    };
  }

  // 2. Auto-reply to the visitor, only from a verified domain.
  //    A failure here is logged but doesn't fail the submission.
  if (verifiedSender) {
    const { error: replyError } = await resend.emails.send({
      from: verifiedSender,
      to: data.email,
      subject: "Thank you for reaching out",
      react: ResponseEmail(data),
    });

    if (replyError) {
      console.error("Error sending auto-reply email:", replyError);
    }
  }

  return { success: true, timestamp };
}
