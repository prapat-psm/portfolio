import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

const valid = { company: "Acme", email: "a@acme.com", tel: "099-000-0000" };

describe("contactSchema", () => {
  it("accepts a valid submission and trims text", () => {
    const result = contactSchema.safeParse({ ...valid, company: "  Acme  " });
    expect(result.success && result.data.company).toBe("Acme");
  });

  it.each([
    ["company", ""],
    ["company", "x".repeat(101)],
    ["email", "not-an-email"],
    ["tel", "call me"],
    ["tel", "123"],
  ])("rejects %s = %j", (field, value) => {
    const result = contactSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
  });
});
