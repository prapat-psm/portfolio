---
name: schema-change
description: Safely change the Payload CMS schema (a collection, global or field) and ship it to the production database with a migration. Use whenever files in collections/ or globals/ change.
argument-hint: <short_migration_name>
---

# Schema change: $ARGUMENTS

Production schema only changes through committed Payload migrations. Dev uses `push`, so local tests can pass while production breaks.

1. Edit the collection/global in `collections/` or `globals/`. Keep changes additive when possible (new optional field). Dropping or renaming a column needs the user's explicit OK.
2. Regenerate types and the admin import map: `npm run gen`.
3. Create the migration against a database that matches production (not one already changed by dev `push`):
   ```bash
   npm run migrate:create $ARGUMENTS
   ```
   Read the generated file in `migrations/` and check that `up` only does what you meant and `down` reverses it.
4. Run `/verify`.
5. In the PR body, state the migration name and what it changes.

How it reaches production (`payload.config.ts` → `prodMigrations`):
- Production deploys run pending migrations on start.
- Vercel **previews skip migrations** but use the production database. So if `/` reads the new field, the preview build will fail until the migration is applied; say this in the PR and let the user decide (merge to run it, or apply it first).
- Never apply SQL to the production Supabase database without the user's explicit approval.
