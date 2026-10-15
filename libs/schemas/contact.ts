import { z } from "zod";

/** Shared by the client form (react-hook-form) and the server action. */
export const contactSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),
  email: z.email("Invalid email address").max(254, "Email is too long"),
  tel: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{6,20}$/, "Invalid telephone number"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Hidden input that humans never fill. Bots that fill every field get dropped. */
export const HONEYPOT_FIELD = "website";

export type ContactFormState = {
  success: boolean;
  error?: string | null;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
  timestamp?: number;
};
