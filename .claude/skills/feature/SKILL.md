---
name: feature
description: Build a new feature, section or UI change in the portfolio end to end, from idea to PR. Use when asked to add or change something user-visible.
argument-hint: <what to build>
---

# Feature: $ARGUMENTS

Run these steps in order. Do not skip a step; say "skipped: <reason>" if one does not apply.

1. **Scope.** Ask the `project-manager` agent to write `docs/plans/<today>-<topic>.md` for "$ARGUMENTS" (tasks, tests, migration yes/no, acceptance criteria). If the request is vague, use `superpowers:brainstorming` with the user first, one question at a time.
2. **Design (UI only).** If the change is visible, ask the `designer` agent for `docs/design/<topic>.md` using the existing pixel classes in `app/(app)/globals.css`.
3. **Copy (if any text).** Ask the `marketing` agent for final copy and SEO (titles, alt text, meta).
4. **Branch.** Work on a feature branch, never on `main`.
5. **Build with TDD.** Follow `superpowers:test-driven-development` for each task in the plan: failing vitest test → minimal code → green. Put tests next to the file (`*.test.ts(x)`).
6. **Schema.** If a collection or global changed, run the `/schema-change` skill.
7. **Verify.** Run the `/verify` skill. Fix everything it reports before going on.
8. **Review.** Use `superpowers:requesting-code-review`, then fix the findings that are real.
9. **Ship.** Commit, push, open a PR. The PR body has Before / After / How and lists any env var, migration or `/admin` content step the user must do.

Project rules that apply to every step are in `AGENTS.md` (Instruction Rules + AI Workflow).
