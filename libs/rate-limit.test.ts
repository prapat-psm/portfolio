import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit, then blocks", () => {
    const isAllowed = createRateLimiter({ limit: 2, windowMs: 1000 });

    expect(isAllowed("ip", 0)).toBe(true);
    expect(isAllowed("ip", 10)).toBe(true);
    expect(isAllowed("ip", 20)).toBe(false);
  });

  it("resets after the window", () => {
    const isAllowed = createRateLimiter({ limit: 1, windowMs: 1000 });

    expect(isAllowed("ip", 0)).toBe(true);
    expect(isAllowed("ip", 500)).toBe(false);
    expect(isAllowed("ip", 1000)).toBe(true);
  });

  it("counts each key separately", () => {
    const isAllowed = createRateLimiter({ limit: 1, windowMs: 1000 });

    expect(isAllowed("a", 0)).toBe(true);
    expect(isAllowed("b", 0)).toBe(true);
  });
});
