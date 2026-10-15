import { APIError, type CollectionBeforeDeleteHook, type CollectionSlug, type GlobalSlug } from "payload";

/** A field in another collection/global that stores an ID of the doc being deleted. */
export type Reference =
  | { collection: CollectionSlug; field: string; label: string }
  | { global: GlobalSlug; field: string; label: string };

/**
 * Blocks deleting a doc while other docs still point to it.
 *
 * Without this, Postgres runs the FK `ON DELETE SET NULL` and silently empties the
 * relation, e.g. a project loses its required cover image. Queries pass `req` so they
 * run inside the same DB transaction as the delete.
 */
export const preventDeleteIfReferenced =
  (references: readonly Reference[]): CollectionBeforeDeleteHook =>
  async ({ id, req }) => {
    const usedBy: string[] = [];

    for (const ref of references) {
      if ("collection" in ref) {
        const { totalDocs } = await req.payload.count({
          collection: ref.collection,
          where: { [ref.field]: { equals: id } },
          req,
        });
        if (totalDocs > 0) usedBy.push(`${totalDocs} ${ref.label}`);
      } else {
        const global = await req.payload.findGlobal({ slug: ref.global, depth: 0, req });
        const value = (global as unknown as Record<string, unknown>)[ref.field];
        if (value != null && String(value) === String(id)) usedBy.push(ref.label);
      }
    }

    if (usedBy.length > 0) {
      throw new APIError(`Can't delete: still used by ${usedBy.join(", ")}. Remove it there first.`, 409, null, true);
    }
  };
