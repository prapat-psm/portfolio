---
name: verify
description: Run every check the portfolio needs before saying work is done, committing or opening a PR (lint, types, tests, build). Use before any "done" claim.
allowed-tools: Bash(npm run lint:*), Bash(npx tsc:*), Bash(npm test:*), Bash(npm run build:*), Bash(git status:*), Bash(git diff:*)
---

# Verify

Follow `superpowers:verification-before-completion`: no "done" without fresh output.

Run each command and keep going after a failure so you can report all of them:

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Notes:
- `npm run build` prerenders `/` and needs a reachable `DATABASE_URL`. If no database is available, say so and report the other three; do not call the build green.
- If `git status` shows changes to `payload-types.ts` or `app/(payload)/admin/importMap.js`, run `npm run gen` and include them.
- `AGENTS.md` may be rewritten by `next dev`; keep that change.

Report as a table: check | result | first error (`file:line`). Then fix failures, rerun only the failed checks, and report again. Only say "verified" when all four are green.
