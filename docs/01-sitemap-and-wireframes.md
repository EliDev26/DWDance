# 1. Sitemap & Wireframes

## 1.1 Sitemap

```
Home  (index.html)
│
├── Classes & Pricing  (classes.html)
│     ├── #age-groups     Class categories
│     │     ├── #preschool      Pre-School (3–5)
│     │     ├── #junior         Junior (6–9)
│     │     ├── #intermediate   Intermediate (10–13)
│     │     └── #senior         Senior (14–18)
│     ├── #dance-styles   Ballet (#ballet) · Tap (#tap) · Modern (#modern)
│     ├── #timetable      Weekly timetable
│     ├── #pricing        Fees, discounts, other costs
│     └── #faq            Classes & pricing FAQs
│
├── Store  (store.html)  →  outbound to ddw.mydancestore.co.uk
│     ├── #categories     Uniform · Shoes · Accessories · Show & extras
│     ├── #uniform        Uniform by class
│     ├── #shoes          Choosing the right shoes
│     └── #sizing         Size guide
│
├── About Us  (about.html)
│     ├── #story          School story
│     ├── #philosophy     Teaching philosophy
│     ├── #natd           NATD examination training
│     ├── #performance    Performance opportunities
│     ├── #safeguarding   Safe & supportive environment
│     ├── #principal      Meet the principal
│     └── #testimonials   Testimonials
│
├── Contact  (contact.html)
│     ├── #enquiry        Enquiry form + venues
│     └── FAQs
│
└── Utility (not in main navigation)
      ├── thank-you.html   Form confirmation
      ├── privacy.html     Privacy policy
      ├── cookies.html     Cookies policy
      └── 404.html         Not found
```

**Why five pages and not fifteen.** Every extra page is another page for the
owner to keep current and another decision for a parent to make. Five pages map
exactly onto the five questions a parent asks: *Is this school any good? What
do you teach my child and what does it cost? What do I have to buy? Who are
you? How do I get in touch?*

### Primary conversion path

```
Home hero  →  "Book a Free Taster Class"  →  contact.html#enquiry  →  thank-you.html
```

Every page carries that same CTA in the sticky header, in the announcement bar
and in a closing CTA band, so a parent is never more than one tap from
enquiring, wherever they've scrolled to.

### Secondary path

```
Any page  →  "Visit Our Online Store"  →  ddw.mydancestore.co.uk (new tab)
```

---

## 1.2 Wireframes

Notation: `▭` full-width band · `│ │` columns · **CTA** primary button.

### Global chrome (every page)

```
┌───────────────────────────────────────────────────────────┐
│ ANNOUNCEMENT BAR   Now enrolling · Book a free taster →   │  charcoal, 38px
├───────────────────────────────────────────────────────────┤
│ ◆ Donelon Wild      Home Classes Store About Contact  [CTA]│ sticky, 72px
└───────────────────────────────────────────────────────────┘
   … page content …
┌───────────────────────────────────────────────────────────┐
│ FOOTER  Brand+social │ Quick links │ Classes │ Get in touch│  charcoal
│ © 2026 · Privacy · Cookies · Contact                      │
└───────────────────────────────────────────────────────────┘
   [Cookie bar — floats bottom until answered]
```

Mobile: the nav collapses behind a labelled **Menu** button (a hamburger with
the word next to it — icon-only hamburgers measurably reduce use). The primary
CTA appears inside the opened panel, so it is never hidden behind an icon.

---

### Home (`index.html`)

```
DESKTOP (≥992px)                          MOBILE (<992px)
┌──────────────────┬────────────────┐     ┌──────────────────┐
│ eyebrow: venues  │                │     │ eyebrow          │
│ H1 Where children│   HERO IMAGE   │     │ H1               │
│ find confidence  │   4:5 portrait │     │ lede             │
│ lede             │                │     │ [CTA] [Classes]  │
│ [CTA][Classes]   │  ┌──────────┐  │     │ trust row        │
│ ── trust row ──  │  │ 3–18 card│  │     ├──────────────────┤
└──────────────────┴──┴──────────┴──┘     │   HERO IMAGE 4:3 │
                                          │  ┌────────────┐  │
                                          │  │ 3–18 card  │  │
                                          └──┴────────────┴──┘
▭ ACCREDITATION STRIP  4 badges, wraps to 2×2 then 1 column
▭ INTRO                text 60% │ studio image 40%   →  stacked on mobile
▭ WHY CHOOSE US        4 cards   (4 → 2 → 1 column)
▭ DANCE STYLES         3 image cards (3 → 2 → 1)
▭ AGE GROUPS           4 cards + "View all classes" CTA
▭ NATD                 image │ text + tick list      →  stacked
▭ PERFORMANCE          3 cards on blush band
▭ TESTIMONIALS         3 quote cards
▭ STORE BANNER         charcoal panel, text │ [Visit Our Online Store]
▭ JOIN — 3 STEPS       numbered, 3 → 1 column
▭ CTA BAND             H2 + [Book a Free Taster] [Call]
▭ QUICK CONTACT        3 tap-to-call / tap-to-email tiles
```

Order is deliberate: **claim → proof → detail → proof → ask.** The
accreditation strip sits immediately under the hero because it answers the
first silent question ("are these people qualified?") before the parent has
scrolled far enough to leave.

---

### Classes & Pricing (`classes.html`)

```
▭ PAGE HERO         breadcrumb · H1 · lede · [CTA][Jump to fees]
▭ ANCHOR SUBNAV     horizontally scrollable pill row, sticky-adjacent
▭ INTRO             how classes work (narrow measure, ~68ch)
▭ AGE GROUPS        4 stacked feature cards, each:
                      pills: age · level · length
                      H3 · 2 paragraphs
                      "What your child gains" tick list
                      meta table: styles / exams / uniform
▭ DANCE STYLES      3 image cards: ballet · tap · modern (3 → 2 → 1)
▭ TIMETABLE         scrollable table — day / time / class / ages / venue
▭ PRICING           4 price cards (trial highlighted) → 2 → 1
                    + "other costs" table │ "how payment works" list
▭ FAQ               8-item accordion
▭ CTA BAND
```

The pricing block uses four equal cards rather than a tiered "packages" layout
on purpose — a dance school isn't selling tiers, and package framing reads as
pushy to parents. The free trial card is the only one visually promoted.

---

### Store (`store.html`)

```
▭ PAGE HERO         H1 + [Visit Our Online Store] (primary) + [Uniform lists]
▭ WHY THE STORE     one short centred paragraph
▭ CATEGORIES        4 image cards, each linking out to the shop
▭ UNIFORM BY CLASS  table: class × ballet / tap / modern
                    + 3 practical cards (hair · naming · sizing up)
▭ SHOES             text + tick list │ image
▭ SIZE GUIDE        indicative table │ "how to measure at home" (numbered)
▭ STORE BANNER      charcoal, the page's main outbound CTA
▭ FAQ               4-item accordion
```

The page's job is not to be a shop — it's to remove every reason for hesitation
*before* sending the parent to the real shop, so they arrive knowing exactly
what to buy. Outbound links open in a new tab so the school's site is never
lost.

---

### About Us (`about.html`)

```
▭ PAGE HERO
▭ STORY             text │ image
▭ PHILOSOPHY        4 cards, 2×2
▭ NATD              image │ text
▭ PERFORMANCE       3 cards + wide performance image
▭ SAFEGUARDING      6 cards, 3 × 2 — the trust section
▭ PRINCIPAL         portrait │ bio + email tile
▭ TESTIMONIALS      3 quotes
▭ CTA BAND
```

Safeguarding gets six cards and a heading that speaks to the parent
("Your peace of mind"), not to the school. For a children's activity this is
the highest-value content on the site and it is usually buried; here it is a
full section.

---

### Contact (`contact.html`)

```
DESKTOP                                   MOBILE
▭ PAGE HERO                               ▭ PAGE HERO
▭ 3 CONTACT TILES (call/call/email)       ▭ 3 tiles stacked — tap to dial
┌────────────────────┬──────────────┐     ┌──────────────────┐
│ ENQUIRY FORM       │ Where we     │     │ ENQUIRY FORM     │
│  name   │ email    │ teach (4)    │     │  one field       │
│  phone  │ child    │              │     │  per row         │
│  age    │ interest │ Office hours │     ├──────────────────┤
│  venue             │              │     │ Where we teach   │
│  message           │              │     │ Office hours     │
│  consent ☐         │              │     └──────────────────┘
│  [Send my enquiry] │              │
└────────────────────┴──────────────┘
▭ FAQ  6-item accordion
▭ CTA BAND — call / email
```

Only three fields are required (name, email, child's age) plus a consent tick.
Everything else is optional. Each additional required field on a form of this
kind costs measurable completions, and a phone number the parent didn't want to
give is worth less than an enquiry you actually received.

---

## 1.3 Responsive behaviour

| Breakpoint | Width | What changes |
|---|---|---|
| Base | 320–639px | Single column. Full-width buttons in the hero. Nav collapsed. Tables scroll horizontally inside their own container. |
| `40em` (640px) | 640–767px | 2-column card grids, 2-column form rows. |
| `48em` (768px) | 768–991px | 3-column step and contact-tile grids. |
| `62em` (992px) | 992–1279px | Full horizontal nav. Split (text │ media) sections go side by side. |
| `64em` (1024px) | 1024px+ | 3- and 4-column card grids at full width; wider section gutters. |
| Max | 1160px | Content stops growing; margins take the extra width. |

Type, spacing and section padding are fluid (`clamp()`) between those points,
so there are no awkward in-between states.
