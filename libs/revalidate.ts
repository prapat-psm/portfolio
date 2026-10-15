import { revalidatePath, revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

/**
 * Payload hooks that mark cached data (and the home page) as stale after an edit in the admin.
 * Skipped outside a Next.js request (e.g. `payload` CLI scripts), where revalidateTag throws.
 */
export const revalidateCollection = (tags: readonly string[]) => {
  const revalidate = () => {
    try {
      tags.forEach((tag) => revalidateTag(tag, "max"));
      revalidatePath("/");
    } catch (err) {
      console.warn(`Skipped revalidating [${tags.join(", ")}]:`, err);
    }
  };

  const afterChange: CollectionAfterChangeHook & GlobalAfterChangeHook = ({ doc }) => {
    revalidate();
    return doc;
  };

  const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
    revalidate();
    return doc;
  };

  return { afterChange: [afterChange], afterDelete: [afterDelete] };
};
