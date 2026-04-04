"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getProjectBySlug(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  if (docs.length === 0) {
    return null;
  }

  return docs[0];
}
