import "server-only";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { CACHE_TAGS } from "@/libs/cache-tags";

// Payload's admin routes don't support `cacheComponents` yet, so `"use cache"`
// can't be enabled. `unstable_cache` + tags gives the same on-demand revalidation.

/**
 * How relations are read: `depth: 1` joins each relation once (no nested media/skills
 * inside skills), and `populate` keeps only the fields the UI renders from related docs.
 * Smaller rows from Postgres and a smaller cached payload.
 */
export const RELATION_QUERY = {
  depth: 1,
  populate: {
    skills: { name: true },
    media: { url: true, alt: true, filename: true, width: true, height: true },
  },
} as const;

export const getProjects = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "projects",
      ...RELATION_QUERY,
      sort: "_order",
      limit: 0,
    });
    return docs;
  },
  ["projects"],
  { tags: [CACHE_TAGS.projects] },
);

export const getStacks = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "stacks",
      ...RELATION_QUERY,
      sort: "_order",
      limit: 0,
    });
    return docs;
  },
  ["stacks"],
  { tags: [CACHE_TAGS.stacks] },
);

export const getWorkExperiences = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "work-experiences",
      ...RELATION_QUERY,
      sort: "-yearStart",
      limit: 0,
    });
    return docs;
  },
  ["work-experiences"],
  { tags: [CACHE_TAGS.workExperiences] },
);

export const getProfile = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    return payload.findGlobal({ slug: "profile", ...RELATION_QUERY });
  },
  ["profile"],
  { tags: [CACHE_TAGS.profile] },
);
