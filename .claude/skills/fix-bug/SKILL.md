---
name: fix-bug
description: Find and fix a bug in the portfolio with a regression test. Use for errors, failing tests, broken builds or "X doesn't work" reports.
argument-hint: <bug description or error>
---

# Fix bug: $ARGUMENTS

1. Follow `superpowers:systematic-debugging`. Reproduce first: a failing vitest test, a failing `npm run build`, or exact steps in the browser. No fix before you can reproduce.
2. Find the root cause and state it in one sentence with `file:line`. "Flaky" or "cache" is not a root cause.
3. Write the regression test that fails for that cause (it may be the reproduction from step 1).
4. Make the smallest fix that turns it green. Do not refactor nearby code in the same change.
5. Run `/verify`.
6. Commit on a branch and open a PR: Before (the bug), After (the fix), How (root cause + fix).

Common causes in this repo: Payload `find()` default `limit: 10`, missing production migration, `'use cache'` in a Payload route, a client component importing server-only code, env vars missing on Vercel.
