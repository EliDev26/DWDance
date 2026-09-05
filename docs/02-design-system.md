# 2. Visual Design System

Everything below is implemented as CSS custom properties at the top of
`assets/css/styles.css`. Change a token there and it updates everywhere.

---

## 2.1 Brand direction

| Should feel | Achieved by |
|---|---|
| Professional | Restrained palette, one accent colour, generous whitespace, no decoration for its own sake |
| Welcoming | Warm off-white grounds rather than pure white, soft radii, first-person copy |
| Family-friendly | Photography-led cards, plain English, short paragraphs |
| Modern | Fluid type, CSS grid, sticky header, subtle depth instead of heavy borders |
| Trustworthy | Accreditation strip high on the page, safeguarding given a full section, honest pricing |
| Aspirational | Serif display face, gold accents used sparingly, editorial photo crops |
| Elegant, not formal | Playfair for headings only; friendly sans for everything you actually read |

Deliberately avoided, per the brief: dark themes, dense layouts, animated
carousels, motion on load, and the badge/stat/scoreboard visual language of
sports club sites.

---

## 2.2 Colour palette

### Brand

| Token | Hex | Use |
|---|---|---|
| `--c-blush-50` | `#FDF8F7` | Page tint, alternating sections |
| `--c-blush-100` | `#F9EDEC` | Section bands, icon grounds, pills |
| `--c-blush-200` | `#F2DCDC` | Card tints, hairline borders |
| `--c-blush-300` | `#E7C3C6` | Decorative edges, secondary button border |
| `--c-rose-500` | `#C1707E` | Brand pink — highlights, hover, theme colour |
| `--c-rose-600` | `#A85062` | **Primary action.** 5.4:1 on white |
| `--c-rose-700` | `#8C3F4F` | Links and hover states. 7.4:1 on white |

### Accent

| Token | Hex | Use |
|---|---|---|
| `--c-gold-300` | `#E3CBA0` | Eyebrow rules, decorative lines |
| `--c-gold-500` | `#C09A54` | Stars, small marks on light grounds |
| `--c-gold-700` | `#8A6C2E` | Gold **text** — 4.6:1 on white |

Gold is an accent, not a second brand colour. It appears on eyebrow labels, the
rating stars and one or two badges. If it starts appearing in buttons, it has
been overused.

### Neutrals

| Token | Hex | Use | Contrast on white |
|---|---|---|---|
| `--c-ink-900` | `#2B2729` | Headings, footer ground | 14.8:1 |
| `--c-ink-700` | `#46403F` | Body text | 9.6:1 |
| `--c-ink-500` | `#6B6260` | Muted / supporting text | 5.4:1 |
| `--c-ink-300` | `#ABA3A0` | Input borders, dividers | — |
| `--c-ink-200` | `#E4DEDB` | Borders | — |
| `--c-ink-100` | `#F4F1EF` | Warm grey band | — |

The neutrals are warm (a touch of red in the grey), which is what stops the
site feeling clinical next to the pinks. A pure `#666` grey against blush reads
as cold and slightly cheap.

### Accessibility notes

* All body and heading colours exceed **WCAG AA 4.5:1**; most exceed AAA 7:1.
* Never put `--c-rose-500` text on blush — it fails. Use `--c-rose-700`.
* Never use `--c-gold-500` for text. Use `--c-gold-700`.
* Colour is never the only signal: required fields are labelled, errors carry
  text, the active nav item is bold *and* tinted *and* marked `aria-current`.

---

## 2.3 Typography

### Faces

| Role | Family | Weights | Fallback |
|---|---|---|---|
| Display | **Playfair Display** | 500, 600 | Georgia, Times New Roman, serif |
| Interface & body | **Inter** | 400, 500, 600, 700 | system UI stack |

Playfair supplies the elegance and the "established school" feel; Inter is
neutral, screen-optimised and highly legible at 16px on a phone in a car park,
which is where a good proportion of this site will be read.

Both load from Google Fonts with `display=swap` and `preconnect`, so text paints
immediately in the fallback and swaps when the webfont arrives. Two families,
six weights total — see §5.4 of the hosting document for self-hosting if you
want to remove the third-party request entirely.

### Scale

Fluid, using `clamp()`, from a 1.200 ratio on mobile to 1.250 on desktop:

| Token | Mobile → Desktop | Used for |
|---|---|---|
| `--fs-3xl` | 36 → 60px | H1 |
| `--fs-2xl` | 30 → 44px | H2 |
| `--fs-xl` | 24 → 32px | Large numbers, price amounts |
| `--fs-lg` | 20 → 24px | H3, pull quotes |
| `--fs-md` | 17 → 19px | Lede paragraphs, accordion buttons |
| `--fs-base` | 16 → 17px | Body |
| `--fs-sm` | 14px | Meta, captions, nav |
| `--fs-xs` | 13px | Eyebrows, legal, footer bottom |

### Rules

* Line height `1.65` for body, `1.15` for display headings.
* Letter-spacing `-0.02em` on headings (Playfair sets loose at large sizes),
  `+0.08em` on uppercase eyebrows.
* Measure capped at **62–68 characters** for prose (`.wrap--narrow`, `62ch`).
* Body text never goes below 16px. Nothing important goes below 14px.
* Headings are `font-weight: 500` — Playfair at 600+ starts to shout.

---

## 2.4 Spacing & layout

4px base unit, t-shirt scale: `--s-1` (4px) through `--s-11` (96px).

* Section rhythm: `--section-y`, fluid `48px → 96px`.
* Container: `1160px` max, `24px` gutters on mobile, `32px` from 768px.
* Narrow container for prose: `760px`.
* Grid gaps: `24px` mobile, `32px` from 1024px.
* Radii: `6px` inputs · `12px` cards · `20px` hero media · pill buttons.

Three shadow levels only (`--shadow-sm/md/lg`), all warm-tinted rather than
neutral black, and all very soft. Depth is used to separate a card from its
background, never for decoration.

---

## 2.5 Component library

Every component below exists in `styles.css` and is used on at least two pages.

| Component | Class | Notes |
|---|---|---|
| Announcement bar | `.topbar` | Charcoal, one message + one link |
| Sticky header | `.site-header` | Blur backdrop, shadow appears on scroll |
| Mobile nav | `.nav-toggle` + `.site-nav` | Labelled button, Escape/outside-click closes, focus returns |
| Anchor sub-nav | `.subnav` | Horizontally scrollable pills, long pages only |
| Button | `.btn` + `--primary` `--secondary` `--ghost` `--gold` `--lg` `--block` | 48px min height (56px large) |
| Card | `.card` + `--media` `--feature` `--link` | Flex column so footers align across a row |
| Icon badge | `.card__icon` | 48px circle, blush ground, 24px stroke icon |
| Pill | `.pill` + `--gold` `--neutral` | Age ranges, levels, tags |
| Meta list | `.meta-list` | `dl` for styles / exams / uniform |
| Hero | `.hero` | Text + portrait image + floating stat badge |
| Page hero | `.page-hero` | Interior pages, blush gradient, breadcrumb |
| Tick list | `.tick-list` | Benefits — inline SVG check, never a bullet |
| Steps | `.steps` | CSS counter, 3 across |
| Quote | `.quote` | Optional star row, serif quote, attribution |
| Accordion | `.accordion` | Native buttons + `aria-expanded`/`hidden`, deep-linkable |
| Price card | `.price-card` + `--highlight` | 4 across → 2 → 1 |
| Data table | `.table-scroll` + `table.data` | Always inside a scroll container |
| Form field | `.field` `.input` `.select` `.textarea` `.checkbox` | Labels above, hint below, error below that |
| Alert | `.alert` + `--info` `--success` `--error` | Form status, owner notes |
| Contact tile | `.contact-tile` | Whole tile is the tap target for call/email |
| CTA band | `.cta-band` | Blush→gold gradient, closes most pages |
| Store banner | `.store-banner` | Charcoal panel — the one dark element, used for emphasis |
| Badge strip | `.badge-strip` | Accreditation row under the hero |
| Footer | `.site-footer` | 4 columns → 3 → 1; logo on the charcoal ground, social row horizontal |
| Portrait image | `.img-portrait` | Uncropped poster/collage artwork in a split column |
| Cookie bar | `.cookie-bar` | Fixed, dismissed choice stored locally |
| Editable marker | `.editable` | Pale yellow highlight on every placeholder value |

### The `.editable` convention

Any value the owner must supply is wrapped in `<span class="editable">`. It
renders as a pale yellow highlight, so unfinished content is impossible to miss
on the live page, and `grep -c editable *.html` gives a to-do count. Once the
real value is in, the class can stay or go — it only affects the highlight.

---

## 2.6 Accessibility (WCAG 2.2 AA)

Implemented:

* **1.3.1** Semantic landmarks (`header`, `nav`, `main`, `footer`, `aside`),
  one `h1` per page, no skipped heading levels, real `<table>` markup with
  `<th scope>`.
* **1.4.3 / 1.4.11** All text and UI borders meet 4.5:1 / 3:1.
* **1.4.4 / 1.4.10** Fluid `rem`-based type; reflows to 320px with no
  horizontal scroll (wide tables scroll inside their own container).
* **2.1.1 / 2.1.2** Everything operable by keyboard; the mobile menu closes on
  Escape and returns focus to its toggle.
* **2.4.1** Skip link to `#main`.
* **2.4.4** Descriptive links — no "click here". Outbound store links say where
  they go and that they open in a new tab.
* **2.4.7** Visible 3px focus ring with offset on every interactive element.
* **2.5.8** Touch targets ≥ 44×44px (buttons 48px, large buttons 56px).
* **3.3.1 / 3.3.2 / 3.3.3** Labels above every field, hints and errors tied by
  `id`, errors in `role="alert"`, `aria-invalid` set, first invalid field
  focused on submit.
* **4.1.2** `aria-expanded`, `aria-controls`, `aria-current="page"` used
  correctly; decorative SVGs are `aria-hidden`.
* **2.3.3** All motion respects `prefers-reduced-motion`.

Still to check once real content is in:

* Alt text on every replacement photograph — describe the dancers and the
  activity, not "image1.jpg".
* Any video must be captioned.
* Re-run contrast checks if you change the palette.

Suggested tooling: axe DevTools or Lighthouse in Chrome, plus one pass through
the whole site using only the Tab key.
