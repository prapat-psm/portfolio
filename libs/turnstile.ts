const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Field name the Turnstile widget adds to the surrounding <form>. */
export const TURNSTILE_FIELD = "cf-turnstile-response";

/**
 * Verifies a Cloudflare Turnstile token on the server.
 * Turnstile is optional: without TURNSTILE_SECRET_KEY every request passes.
 */
export async function verifyTurnstile(
  token: FormDataEntryValue | null,
  ip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}
