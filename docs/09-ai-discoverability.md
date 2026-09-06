# 9. AI Discoverability (GEO / AEO)

Parents increasingly ask an assistant — ChatGPT, Gemini, Copilot, Perplexity,
Siri — rather than typing into a search box. *"Is there a dance school near
Urmston that takes four-year-olds?"* This document covers what was done so the
site is found, understood and quoted correctly when that happens.

Traditional SEO gets you **ranked**. This gets you **cited**. They overlap but
are not the same: an answer engine needs facts it can lift with confidence, not
just pages it can order.

---

## 9.1 The crawl that drove this work

The site was crawled the way an AI agent actually reads a page — **raw HTML, no
JavaScript executed** — using two extraction models:

* **Naive**: strip tags, keep everything. What most LLM crawlers do.
* **CSS-aware**: additionally drop elements carrying the `hidden` attribute.
  What better extractors (and Readability-style pipelines) do.

The gap between the two is content at risk of being invisible.

### The finding

| Page | Naive | CSS-aware (before) | At risk |
|---|---|---|---|
| contact.html | 738 | 529 | **-28%** |
| classes.html | 1,924 | 1,579 | **-18%** |
| store.html | 1,037 | 893 | -14% |

Every FAQ answer on the site sat inside `<div class="accordion__panel" hidden>`.
Those answers are the **single most quotable content on the site** — direct
answers to the exact questions parents ask assistants — and a CSS-aware
extractor was dropping all of them.

### The fix

Accordion panels now ship **expanded** in the HTML. They are collapsed by CSS
that is gated on a `.js` class, which an inline script sets before first paint.

```css
.js .accordion__panel { display: none; }
.js .accordion__panel.is-open { display: block; }
```

Consequences:

* A crawler (no JS) sees every question **and** every answer in the text.
* A visitor sees a normal accordion, with no flash of expanded content.
* Without JS the page still works — it simply shows all answers at once.

### After

| Page | CSS-aware before | after | change |
|---|---|---|---|
| classes.html | 1,579 | 1,894 | **+315 words** |
| contact.html | 529 | 708 | **+34%** |
| store.html | 893 | 1,007 | +114 |
| index.html | 1,256 | 1,345 | +89 (at-a-glance block) |

The only remaining hidden text is the cookie banner, which should stay hidden.

---

## 9.2 What was added

### `robots.txt` — explicit welcome

Twenty AI and search agents are now named individually and allowed: GPTBot,
OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User,
anthropic-ai, Google-Extended, Googlebot, Bingbot, PerplexityBot,
Perplexity-User, Applebot, Applebot-Extended, meta-externalagent, Amazonbot,
DuckAssistBot, CCBot, cohere-ai, YouBot.

`User-agent: *` already permitted everything, so this is a **statement of
intent** rather than a functional change — but it is unambiguous, it survives
future default changes, and it is the file to edit if the school ever wants to
opt out of AI training. Each agent is commented so a non-technical owner can
tell which is which. `/docs/` is disallowed.

> **Note:** `Google-Extended` governs whether content may be used in Gemini and
> AI Overviews. Disallowing it removes the school from those answers. It is
> deliberately allowed.

### `llms.txt` — a summary written for machines

A ~430-word Markdown file at the site root following the
[llmstxt.org](https://llmstxt.org) convention: a one-paragraph description, a
key-facts list, a annotated map of every page, and the seven questions parents
most often ask with their answers.

This is the highest-leverage single file here. An assistant that fetches it gets
the whole school in one request, with no HTML parsing and no ambiguity. Every
page links to it: `<link rel="alternate" type="text/markdown" href="/llms.txt">`.

**Keep it current.** If prices, venues or class times change, update
`llms.txt` alongside the pages — a stale summary is worse than none.

### Structured data — expanded from 3 blocks to 12

| Type | Where | Why it matters |
|---|---|---|
| `LocalBusiness` + `DanceSchool` | Home | Identity, area served, founders, founding date |
| `ContactPoint` ×2 | Home | Both phone numbers, with roles |
| `Course` ×3 | Home | Ballet, tap and modern as discrete offerings with age ranges and levels |
| `WebSite` | Home | Site-level identity |
| `FAQPage` ×3 | Classes, Contact, Store | 18 question/answer pairs, machine-readable |
| `BreadcrumbList` ×4 | Classes, Store, About, Contact | Site hierarchy |

**The FAQ blocks are generated from the page text itself**, not hand-written
alongside it, so the structured data cannot drift out of sync with what a
visitor reads — a common and penalised mistake.

### An "at a glance" block on the home page

Nine facts as a definition list: styles, ages, class groups, venues,
examinations, founding, free trial, performances, contact. Dense, unambiguous,
and near the top of the page.

This serves parents scanning on a phone *first* — which is why it earns its
place. That it is also ideal extraction material for an answer engine is the
happy side effect. It is not keyword stuffing, and it should not become so.

### Smaller items

* `max-snippet:-1, max-video-preview:-1` added to the robots meta, so search
  engines are not capped on how much they may quote.
* `lastmod` dates added to `sitemap.xml`.
* **Home page canonical corrected** from `/index.html` to `/`, matching the
  sitemap and the JSON-LD. Two URLs for one page splits authority and confuses
  citation.

---

## 9.3 Verification

An agent-style discovery crawl was run end to end: robots → sitemap →
`llms.txt` → pages → structured data → question answering.

```
STEP 1  robots.txt      21 agents addressed, sitemap declared
STEP 2  sitemap.xml     7 URLs discoverable
STEP 3  llms.txt        present, 429 words
STEP 4  structured data 12 entities harvested
STEP 5  question test   15/15 fully answerable
```

The question test checked whether the crawled text actually contains the facts
needed to answer real parent queries — not merely that pages exist:

| Query | Answerable |
|---|---|
| dance classes for kids in Stretford | ✅ |
| ballet classes Urmston | ✅ |
| toddler dance class near Flixton | ✅ |
| dance school Davyhulme | ✅ |
| what age can my child start ballet | ✅ |
| do they do dance exams | ✅ |
| is there a free trial | ✅ |
| what should my child wear to first class | ✅ |
| sibling discount | ✅ |
| who runs the dance school | ✅ |
| when was it founded | ✅ |
| how do I contact them | ✅ |
| do they put on a show | ✅ |
| where do I buy uniform | ✅ |
| do they take complete beginners | ✅ |

Browser regression testing: **14/14 passed** — accordions collapse on load,
toggle correctly, deep-link correctly, report accurate `aria-expanded`, and with
JavaScript disabled every answer is visible. No CSP violations, no JS errors.

---

## 9.4 The honest limits

**None of this is a ranking guarantee.** Answer engines choose sources mainly on
whether they trust them, and trust comes largely from off-site signals this
repository cannot touch:

1. **Google Business Profile** with real reviews. For a local business this
   still outweighs everything on the website itself, including for AI answers —
   assistants lean heavily on business listings for "near me" questions.
2. **Consistent name, address and phone** across Google, Facebook, Yell and any
   directory. Assistants cross-check; inconsistency reads as low confidence.
3. **Being mentioned elsewhere** — Trafford community pages, venue websites,
   local parenting groups. A school that exists on one website only is harder to
   trust than one corroborated in five places.

**Two things on the site still limit what an assistant can say.** Both are
placeholders only the school can fill:

* **Prices** are `£00.00`. Until they are real, no assistant can answer *"how
  much are dance classes at DW Dance?"* — a very common question.
* **The timetable and venue addresses** are placeholders. *"What time is the
  Saturday pre-school class in Stretford?"* is currently unanswerable, and
  "near me" matching is weaker without real postcodes.

Filling those two in would do more for AI answer quality than any further
technical work here.

---

## 9.5 Keeping it working

When content changes:

1. Update `llms.txt` if a key fact changed.
2. If you add or edit an FAQ, the JSON-LD on that page must match the visible
   text. It was generated from the page — regenerate or hand-edit to match.
3. Never wrap content in `hidden` unless it genuinely should not be read.
4. Keep the canonical URL and the sitemap entry for a page identical.
5. After launch, submit `sitemap.xml` in Google Search Console and check
   `https://www.dwdance.co.uk/robots.txt` and `/llms.txt` both load.
