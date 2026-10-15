# Prapat's Portfolio

Pixel-art portfolio built with Next.js 16 (App Router), Payload CMS 3 (Postgres + S3 media), Tailwind CSS 4 and Motion. The contact form sends email through Resend.

## Setup

```bash
npm install
cp .env.example .env   # fill in the values
npm run dev            # site: http://localhost:3000, CMS: http://localhost:3000/admin
```

Use **npm** only (`package-lock.json` is the single lockfile).

| Variable | Purpose |
|---|---|
| `PAYLOAD_SECRET` | Required. Long random string for Payload auth. |
| `DATABASE_URL` | Postgres connection string. Also needed at `next build`, because `/` is prerendered. |
| `S3_*` | Bucket for the `media` collection. |
| `RESEND_API_KEY` | Resend API key for the contact form. |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend. Empty = Resend test sender, owner notification only, no auto-reply. |
| `CONTACT_TO_EMAIL` | Where contact submissions are delivered. |

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` | ESLint |
| `npm test` / `npm run test:watch` | Vitest |
| `npm run gen` | Regenerate Payload types and admin import map |

## How content updates

Home page data is read through `libs/data.ts` (`unstable_cache` with tags). Payload `afterChange` / `afterDelete` hooks (`libs/revalidate.ts`) call `revalidateTag` and `revalidatePath("/")`, so edits in `/admin` show up without a redeploy.
