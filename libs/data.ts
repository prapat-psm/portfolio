import "server-only";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { CACHE_TAGS } from "@/libs/cache-tags";

// Payload's admin routes don't support `cacheComponents` yet, so `"use cache"`
// can't be enabled. `unstable_cache` + tags gives the same on-demand revalidation.

export const getProjects = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "projects",
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
    return payload.findGlobal({ slug: "profile" });
  },
  ["profile"],
  { tags: [CACHE_TAGS.profile] },
);
