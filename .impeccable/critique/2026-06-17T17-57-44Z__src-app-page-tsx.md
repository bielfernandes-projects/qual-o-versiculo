---
target: src/app/page.tsx
total_score: 27
p0_count: 2
p1_count: 2
timestamp: 2026-06-17T17-57-44Z
slug: src-app-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Search has spinner + debounce; copy confirms. No initial load indicator or verse count. |
| 2 | Match System / Real World | 4 | Portuguese labels, biblical terminology, natural copy. No issues. |
| 3 | User Control and Freedom | 2 | No clear/X button on search, no undo for newsletter, no back/escape. |
| 4 | Consistency and Standards | 4 | Uniform radii, tokens, CopyButton reuse, mobile card conventions. |
| 5 | Error Prevention | 3 | Debounce + email type validation. No AbortController, no confirmation on subscribe. |
| 6 | Recognition Rather Than Recall | 4 | Search visible, daily verse immediate, reference inline. Nothing to memorize. |
| 7 | Flexibility and Efficiency | 1 | No filters, no book scoping, no pagination, no keyboard shortcuts, no share. |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained palette, generous whitespace, purposeful typography, documented system. |
| 9 | Error Recovery | 2 | Empty state gives suggestions. Newsletter catches dupe. **P0**: catch in search-section silently masks network errors. |
| 10 | Help and Documentation | 0 | No help, FAQ, about page, onboarding, tooltips, or search syntax hints. |
| **Total** | | **27/40** | **Acceptable** (threshold of Good) |

## Anti-Patterns Verdict

**LLM assessment**: Not slop. No gradient text, glassmorphism, hero metrics, side-stripes, numbered sections, or card grids. The single uppercase eyebrow ("VERSÍCULO DO DIA") is documented as intentional and non-repeating. Color system is sophisticated (OKLCH, consistent 260° hue), layout shows restraint.

**Deterministic scan**: No findings detected by automated scanner. Clean.

## Overall Impression

A genuinely well-crafted, focused app with real design discipline. The OKLCH palette and component system are above average. **Biggest opportunity**: search lacks transparency about failure vs. emptiness, and has no accelerators for users who know what they're looking for.

## What's Working

1. **Color system discipline** — Single 260° hue through all neutrals gives cohesive, serene identity. Gold accent within ≤10% constraint.
2. **Component reuse** — CopyButton appears in daily verse + search results with identical behavior. Uniform radii and spacing throughout.
3. **Daily verse architecture** — Server component, deterministic offset, 24h revalidation, meaningful fallback. Degrades gracefully.

## Priority Issues

- **[P0] Silent catch in search** — `search-section.tsx:57` swallows all errors, user can't tell network failure from "no results". Fix: differentiate error vs empty state.
- **[P0] Ad placeholders occupy 208px dead space** — Pushes content below fold on mobile. Signals "business" before "spiritual" on a Catholic Bible tool.
- **[P1] No search filters / book scoping** — Users who know the Bible structure can't narrow results. Add book/testament filter or detect `João 3:16` patterns.
- **[P1] No request cancellation** — Rapid typing fires competing requests; responses may race. Add AbortController.
- **[P2] Search bar lacks clear button and type="search"** — Wrong keyboard on iOS, no way to clear query except deleting text.
- **[P3] CopyButton lacks aria-label** — Screen readers lack context for which verse.
- **[P3] Ad placeholders visible when no ad inventory** — Empty slots on a Bible app send the wrong message.

## Persona Red Flags

**Jordan (First-Timer)**: Types "João 3:16" — FTS likely doesn't parse chapter:verse notation. No example text below search bar. No share button (only copy). No context (neighboring verses).

**Riley (Stress Tester)**: Rapid-fire 4 queries in 2s — no AbortController, responses race. Network drops silently show empty state. No rate limiting.

**Casey (Mobile User)**: No `type="search"` → wrong iOS keyboard. Must scroll to top for new query (search not sticky). Ad placeholders = 208px dead space on 375px viewport.

## Minor Observations

1. `subset: ["latin"]` may miss Portuguese diacritics (ã, ç, é) — should be `latin-ext`.
2. `max-w-lg` (512px) is narrow on desktop. Consider `max-w-xl`.
3. DailyVerseFetcher exposes anon key in URL params (already public, but visible in logs).
4. Newsletter success uses emerald tokens outside brand palette (documented, but worth reconsidering).
5. No attribution/license footer for CNBB text.
6. No PWA manifest or favicon for a mobile-first app.
7. `text-wrap: balance` documented in DESIGN.md but not applied in header.tsx.

## Questions to Consider

1. Should search replace the daily verse when query is active, or should both coexist?
2. How will first-time users discover the search affordance — no onboarding, tooltips, or hint text?
3. What do empty ad slots ("Espaço Publicitário Reservado") communicate to a Catholic audience?
