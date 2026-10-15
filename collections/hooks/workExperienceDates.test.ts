import { describe, expect, it } from "vitest";
import { clearEndDateWhenCurrent, validateEndDate } from "./workExperienceDates";

describe("clearEndDateWhenCurrent", () => {
  it("drops the end date for a current job", () => {
    const data = { isCurrent: true, yearEnd: "2024-01-01" };
    expect(clearEndDateWhenCurrent({ data } as never)).toEqual({ isCurrent: true, yearEnd: null });
  });

  it("keeps the end date for a past job", () => {
    const data = { isCurrent: false, yearEnd: "2024-01-01" };
    expect(clearEndDateWhenCurrent({ data } as never)).toBe(data);
  });
});

describe("validateEndDate", () => {
  const check = (yearEnd: string | null, yearStart: string) =>
    validateEndDate(yearEnd as never, { siblingData: { yearStart }, required: false, req: { t: (k: string) => k } } as never);

  it("accepts an empty or later end date", () => {
    expect(check(null, "2022-01-01")).toBe(true);
    expect(check("2023-06-01", "2022-01-01")).toBe(true);
  });

  it("rejects an end date before the start", () => {
    expect(check("2021-01-01", "2022-01-01")).toBe("End date must be after the start date");
  });
});
