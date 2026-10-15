import { describe, expect, it, vi } from "vitest";
import { preventDeleteIfReferenced } from "./preventDeleteIfReferenced";

const run = (payload: { count?: unknown; findGlobal?: unknown }, id = 7) => {
  const hook = preventDeleteIfReferenced([
    { collection: "projects", field: "featuredImage", label: "project(s)" },
    { global: "profile", field: "resume", label: "Profile" },
  ]);
  const req = { payload } as never;
  return { req, result: hook({ id, req } as never) };
};

describe("preventDeleteIfReferenced", () => {
  it("allows delete when nothing points to the doc", async () => {
    const payload = {
      count: vi.fn().mockResolvedValue({ totalDocs: 0 }),
      findGlobal: vi.fn().mockResolvedValue({ resume: null }),
    };
    const { req, result } = run(payload);

    await expect(result).resolves.toBeUndefined();
    // Runs inside the delete's transaction
    expect(payload.count).toHaveBeenCalledWith({
      collection: "projects",
      where: { featuredImage: { equals: 7 } },
      req,
    });
  });

  it("blocks delete and lists every place that uses the doc", async () => {
    const payload = {
      count: vi.fn().mockResolvedValue({ totalDocs: 2 }),
      findGlobal: vi.fn().mockResolvedValue({ resume: 7 }),
    };

    await expect(run(payload).result).rejects.toMatchObject({
      status: 409,
      message: expect.stringContaining("2 project(s), Profile"),
    });
  });
});
