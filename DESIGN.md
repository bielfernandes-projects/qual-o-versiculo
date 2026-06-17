# qual o versículo? — Design System

## Theme

### Brand Palette

OKLCH values. All tokens map to Tailwind v4 `@theme` custom properties.

| Token | OKLCH | Tailwind var | Usage |
|---|---|---|---|
| **bg** | `oklch(1 0 0)` | `--color-brand-bg` | Page background — pure white. Carries no warmth; the brand lives in primary + accent. |
| **surface** | `oklch(0.97 0.008 260)` | `--color-brand-surface` | Card backgrounds, panels, section borders. Barely-tinted blue-white. |
| **ink** | `oklch(0.12 0.02 260)` | `--color-brand-ink` | Body text. Near-black with a whisper of blue. |
| **muted** | `oklch(0.48 0.015 260)` | `--color-brand-muted` | Secondary text, placeholders, metadata. Ink pulled toward bg, keeping the blue hue. |
| **primary** | `oklch(0.55 0.14 260)` | `--color-brand-primary` | Interactive elements (CTAs, links, active states), header icon. Serene, confident blue. |
| **accent** | `oklch(0.72 0.14 80)` | `--color-brand-accent` | Small decorative accents (badges, highlights, spare use). Warm gold complement to primary blue. ≤10% of surface. |

Color strategy: **Restrained** — tinted neutrals + accent ≤10%. Product default.

### Text-on-color Fills

- **Primary fills** (buttons, links): white text (`var(--color-brand-bg)`).
- **Accent fills** (badges, pills): white text.
- **Surface fills** (cards, panels): ink text.
- **Pale fills** (L > 0.85): ink text.

### Light mode only

No dark mode. Anti-reference: nothing dark or escuro.

---

## Typography

### Font

**Inter** via `next/font/google`, loaded in `layout.tsx`.

| Role | Size | Weight | Line Height | Other |
|---|---|---|---|---|---|
| Title | 1.125rem (18px) | 600 (semibold) | 1.2 | `text-wrap: balance` |
| Body | 1rem (16px) | 400 (regular) | 1.6 | Verse text, inputs, primary content |
| Small | 0.875rem (14px) | 500 (medium) | 1.4 | References, metadata, form labels |
| Caption | 0.75rem (12px) | 500 (medium) | 1.3 | Result counts, overline/kicker |

### Kicker / Overline

Used *only* for "VERSÍCULO DO DIA". Not repeated as a default scaffold across sections.

---

## Layout

- **Container**: `max-w-lg` (32rem / 512px) centered, white card on neutral body.
- **Outer bg**: `var(--color-brand-surface)` — the app card floats on this subtle blue-white.
- **Card inner bg**: `var(--color-brand-bg)` — pure white.
- **Spacing scale**: Tailwind v4 defaults (multiples of 0.25rem).
- **Section rhythm**: 16px (px-6) horizontal, 16-32px vertical gaps.

---

## Components

### Header
- Logo icon: `size-10 rounded-xl bg-brand-primary text-white`
- Title: `text-lg font-semibold text-brand-ink`
- Subtitle: `text-sm text-brand-muted`
- Icon: `BookOpen` (lucide-react)

### Search Bar
- Container: full width, `h-12 px-11` (with left icon offset)
- Border: `border-surface` → `border-brand-muted` on focus
- Background: `bg-brand-surface` → `bg-brand-bg` on focus
- Focus ring: `ring-2 ring-brand-primary/10`

### Verse Card (Daily)
- Background: `bg-brand-primary/6` (6% tint of primary blue)
- Border: `border-brand-primary/15`
- Kicker: "VERSÍCULO DO DIA" — `text-micro font-semibold uppercase tracking-wider text-brand-accent`
- Icon: `Sparkles` — `text-brand-accent`
- Body: "&ldquo;{texto}&rdquo;" — `text-base leading-relaxed text-brand-ink`
- Reference: `text-sm font-medium text-brand-muted`

### Search Result (list item)
- Container: `rounded-xl border border-surface bg-bg p-4`, hover: `shadow-sm`
- Verse text: `text-sm leading-relaxed text-brand-ink`
- Reference: `text-xs font-medium text-brand-muted`

### Newsletter Form
- Label: `text-sm font-medium text-brand-ink`
- Input: `border-surface bg-bg`, focus: same as search bar
- Submit button: `bg-brand-primary text-white rounded-lg`, hover: darkened
- Success state: `bg-emerald-50 border-emerald-200` (kept as green for positive signal)

### Copy Button
- Default: `text-brand-muted` → hover `text-brand-ink`
- Copied: `text-emerald-600` with `Check` icon

### Empty State
- Icon container: `bg-brand-surface text-brand-muted`
- Title: `text-base font-semibold text-brand-ink`
- Body: `text-sm text-brand-muted`

### Ad Placeholder
- Container: `border-dashed border-surface bg-brand-surface text-brand-muted`

---

## Iconography

**Lucide React** — 16-20px (`size-4` / `size-5`). Monotone, currentColor. No duotone or filled variants.

| Component | Icon | Size |
|---|---|---|
| Header | Cruz (SVG) | 20px |
| Search bar | Search / Loader2 | 20px |
| Daily verse | Sparkles | 16px |
| Newsletter | Mail | 16px |
| Success | Check | 16px |
| Error | AlertCircle | 16px |
| Copy | Copy / Check | 14px |
| Empty state | SearchX | 24px |

---

## Borders & Radii

| Token | Value | Usage |
|---|---|---|
| Radius sm | `rounded-lg` (8px) | Inputs, buttons |
| Radius md | `rounded-xl` (12px) | Cards, containers |
| Radius full | `rounded-full` | Icon backgrounds |
| Border default | 1px solid | All borders |
| Border style | `border-solid` | Default |

---

## Motion

- **Reduced motion**: `prefers-reduced-motion: reduce` → all animations become instant.
- **Transitions**: 150-200ms ease-out for hover/focus states (color, border, shadow).
- **Spinner**: `animate-spin` for loading states (SearchBar, SearchResults).
- **Copy feedback**: 2s delay on "Copiado!" before reverting.
- **No entrance animations** for initial load — content-first. If added later, reveal animations must enhance an already-visible default, not gate it.

---

## Shadows

| Token | Usage |
|---|---|
| `shadow-sm` | Card hover state, subtle elevation |
| `md:shadow-xl` | App container on desktop (outer card shadow) |
