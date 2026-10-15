import { describe, expect, it } from "vitest";
import { validateHttpUrl } from "./validators";

describe("validateHttpUrl", () => {
  it.each([undefined, null, "", "https://prapat.dev", "http://localhost:3000/x"])(
    "accepts %j",
    (value) => {
      expect(validateHttpUrl(value)).toBe(true);
    },
  );

  it.each(["javascript:alert(1)", "data:text/html,hi", "example.com", "ftp://x.com"])(
    "rejects %j",
    (value) => {
      expect(validateHttpUrl(value)).toEqual(expect.any(String));
    },
  );
});
