"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ResponseEmail } from "@/emails/ResponseEmail";
import { NotificationEmail } from "@/emails/NotificationEmail";

// Schema for the server-side as well
const contactSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  tel: z.string().min(1, "Telephone is required"),
});

type FormState = {
  success: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string[]>;
  timestamp?: number;
};

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function submitContactForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const tel = formData.get("tel") as string;

  // Validate using zod
  const validatedFields = contactSchema.safeParse({ company, email, tel });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  }

  try {
    // 1. Send an email to the person who submitted the form
    await resend.emails.send({
      from: "Portfolio Contact <noreply@resend.dev>", // you should verify your own domain
      to: validatedFields.data.email,
      subject: "Thank you for reaching out",
      react: ResponseEmail({
        company: validatedFields.data.company,
        email: validatedFields.data.email,
        tel: validatedFields.data.tel,
      }),
    });

    // 2. Send the form submitter data to prapat.psm@gmail.com
    await resend.emails.send({
      from: "Portfolio Contact <noreply@resend.dev>",
      to: "prapat.psm@gmail.com",
      subject: `New Contact Submission from ${validatedFields.data.company}`,
      react: NotificationEmail({
        company: validatedFields.data.company,
        email: validatedFields.data.email,
        tel: validatedFields.data.tel,
      }),
    });

    return { success: true, timestamp: Date.now() };
  } catch (err) {
    console.error("Error sending email:", err);
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
      timestamp: Date.now(),
    };
  }
}
