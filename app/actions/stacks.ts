"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getStacks() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "stacks",
    sort: "_order",
  });

  if (docs.length === 0) {
    return [];
  }

  return docs;
}
