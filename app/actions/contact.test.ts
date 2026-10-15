import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn(function () {
    return { emails: { send } };
  }),
}));

let ip = "1.1.1.1";
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": ip }),
}));

const form = (fields: Record<string, string>) => {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => fd.set(k, v));
  return fd;
};

const valid = { company: "Acme", email: "visitor@acme.com", tel: "0990000000" };
const initial = { success: false };

// Fresh module per test so the in-memory rate limiter starts empty.
const loadAction = async () => {
  vi.resetModules();
  return (await import("./contact")).submitContactForm;
};

describe("submitContactForm", () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: "1" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    ip = `ip-${Math.random()}`;
  });

  it("returns field errors and sends nothing for invalid input", async () => {
    const submit = await loadAction();
    const result = await submit(initial, form({ ...valid, email: "nope" }));

    expect(result.success).toBe(false);
    expect(result.fieldErrors?.email).toBeDefined();
    expect(send).not.toHaveBeenCalled();
  });

  it("silently drops bots that fill the honeypot", async () => {
    const submit = await loadAction();
    const result = await submit(initial, form({ ...valid, website: "spam.com" }));

    expect(result.success).toBe(true);
    expect(send).not.toHaveBeenCalled();
  });

  it("only notifies the owner when no verified sender is set", async () => {
    const submit = await loadAction();
    const result = await submit(initial, form(valid));

    expect(result.success).toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0]).toMatchObject({
      to: "owner@example.com",
      replyTo: "visitor@acme.com",
    });
  });

  it("notifies the owner first, then auto-replies from the verified sender", async () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "Prapat <hi@prapat.dev>");
    const submit = await loadAction();
    await submit(initial, form(valid));

    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0][0].to).toBe("owner@example.com");
    expect(send.mock.calls[1][0]).toMatchObject({
      from: "Prapat <hi@prapat.dev>",
      to: "visitor@acme.com",
    });
  });

  it("fails when Resend returns an error (it doesn't throw)", async () => {
    send.mockResolvedValue({ data: null, error: { message: "invalid from" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const submit = await loadAction();
    const result = await submit(initial, form(valid));

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/failed to send/i);
  });

  it("still succeeds when only the auto-reply fails", async () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "Prapat <hi@prapat.dev>");
    send
      .mockResolvedValueOnce({ data: { id: "1" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "bounced" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const submit = await loadAction();

    expect((await submit(initial, form(valid))).success).toBe(true);
  });

  it("rate limits after 3 submissions from the same IP", async () => {
    const submit = await loadAction();
    for (let i = 0; i < 3; i++) {
      expect((await submit(initial, form(valid))).success).toBe(true);
    }

    const blocked = await submit(initial, form(valid));
    expect(blocked.success).toBe(false);
    expect(blocked.error).toMatch(/too many/i);
    expect(send).toHaveBeenCalledTimes(3);
  });
});

describe("submitContactForm with Turnstile", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    send.mockReset().mockResolvedValue({ data: { id: "1" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "ts_secret");
    vi.stubGlobal("fetch", fetchMock);
    ip = `ip-${Math.random()}`;
  });

  it("rejects a submission without a token", async () => {
    const submit = await loadAction();
    const result = await submit(initial, form(valid));

    expect(result.error).toMatch(/security check/i);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects a token Cloudflare marks as invalid", async () => {
    fetchMock.mockResolvedValue({ json: async () => ({ success: false }) });
    const submit = await loadAction();
    const result = await submit(
      initial,
      form({ ...valid, "cf-turnstile-response": "bad" }),
    );

    expect(result.success).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });

  it("sends when the token is valid", async () => {
    fetchMock.mockResolvedValue({ json: async () => ({ success: true }) });
    const submit = await loadAction();
    const result = await submit(
      initial,
      form({ ...valid, "cf-turnstile-response": "good" }),
    );

    expect(result.success).toBe(true);
    expect(fetchMock.mock.calls[0][0]).toContain("challenges.cloudflare.com");
    expect(send).toHaveBeenCalledTimes(1);
  });
});
