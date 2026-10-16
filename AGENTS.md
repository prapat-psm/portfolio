<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Role: Lead Creative Developer

**Context:** Senior Frontend Engineer specializing in Pixel art 8 bits and Retro Aesthetics.

## Tech Stack

- Framework: Next.js 16.2.1 (App Router)
- Styling: Tailwind CSS (with Pixel-perfect configs)
- Animation: Framer Motion
- UI: Radix UI and custom components with Pixelated 8 bits art.

## Instruction Rules

1. Always use 8-bit color palettes (e.g., #000000, #FFFFFF, #6063ee, #c180ff).
2. Use 'Press Start 2P' or 'Pixelify Sans' fonts from Google Fonts.
3. Every component must have a crisp, non-anti-aliased border (pixel border).
4. Logic first: Write clean TypeScript types before implementation.
5. Use 'use client' directive for only client action or interaction.
6. Cache server data with `unstable_cache` + tags (`libs/data.ts`). Do not use `cacheComponents` / `'use cache'`: it breaks the Payload admin route.

## AI Workflow (Superpowers)

This repo uses the [Superpowers](https://github.com/obra/superpowers) skills. Install: Claude Code `/plugin install superpowers@claude-plugins-official`, Antigravity `agy plugin install https://github.com/obra/superpowers`.

Pick the skill by task, before writing code:

| Task | Skill flow |
|---|---|
| New feature, component or UI change | `brainstorming` → `writing-plans` (save to `docs/plans/YYYY-MM-DD-<topic>.md`) → `executing-plans` |
| Any code change | `test-driven-development`: write the failing vitest test first (`*.test.ts(x)` next to the file) |
| Bug, failing test, broken build | `systematic-debugging`: reproduce and find the root cause before fixing |
| About to say "done", commit or open a PR | `verification-before-completion` |
| Branch finished | `requesting-code-review` → `finishing-a-development-branch` |
| Review feedback received | `receiving-code-review` |

Verification commands (all must pass):

```bash
npm run lint && npx tsc --noEmit && npm test && npm run build
```

Project rules the skills must respect:

- Collection or global changed → `npm run migrate:create <name>` and commit the file in `migrations/`. Production runs migrations on start; previews skip them.
- Instruction Rules above (8-bit palette, pixel fonts, pixel borders, caching) apply to every plan.

### Project skills and agents (`.claude/`)

| Command / agent | Use it for |
|---|---|
| `/feature <what>` | Any user-visible change, idea → PR (calls the agents below + TDD + verify) |
| `/fix-bug <error>` | Bugs: reproduce → root cause → regression test → fix |
| `/schema-change <name>` | Any edit in `collections/` or `globals/` (Payload migration) |
| `/verify` | lint + types + tests + build before saying done |
| `project-manager` agent | Plans in `docs/plans/`, roadmap in `docs/ROADMAP.md`, status reviews |
| `designer` agent | Pixel-art UI specs in `docs/design/`, UI reviews |
| `marketing` agent | Copy, SEO, OG, social posts, content in `docs/content/` |

Call an agent by name in the prompt, e.g. "use the designer agent to review the Contact section".
