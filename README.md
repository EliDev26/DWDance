# Donelon Wild School of Dance — website

A complete, mobile-first redesign of **dwdance.co.uk**, built as plain HTML, CSS
and JavaScript so it can be uploaded to One.com (or any static host) with no
build step, no framework and no server-side code.

---

## What's here

```
/
├── index.html            Home
├── classes.html          Classes & Pricing
├── store.html            Dancewear Store
├── about.html            About Us
├── contact.html          Contact (enquiry form)
├── thank-you.html        Form confirmation page
├── privacy.html          Privacy Policy (template — review before publishing)
├── cookies.html          Cookies Policy (template — review before publishing)
├── 404.html              Not-found page
├── robots.txt            Search engine directives
├── sitemap.xml           XML sitemap
├── site.webmanifest      Icons and theme colour
├── .htaccess             Optional Apache caching/redirect rules
├── assets/
│   ├── css/styles.css    One stylesheet, design tokens at the top
│   ├── js/main.js        One script — nav, accordions, form, cookie bar
│   └── img/              Brand mark + labelled photo placeholders
└── docs/                 Strategy, design system, copy, SEO, hosting
```

Total page weight before real photography: **under 60 KB** per page including
CSS and JS.

---

## Before you publish — the short checklist

Everything that needs a real value is **highlighted in pale yellow** on the
page itself. Search the HTML for `class="editable"` to find each one.

1. **Prices** — `classes.html`, the "Fees" section.
2. **Timetable** — `classes.html`, the "Weekly timetable" table.
3. **Venue addresses** — `contact.html`, "Where we teach".
4. **Principal biography** — `about.html`, "Meet the principal" (and Sally
   Wild's paragraph, or delete it).
5. **Testimonials** — real quotes, with each family's permission, on
   `index.html` and `about.html`.
6. **Uniform lists and sizing** — `store.html`.
7. **Photography** — **every image is now a drop-in file.** Overwrite anything
   in `assets/img/` keeping the same filename, and no HTML needs editing:
   | File | Where it appears | Supply at |
   |---|---|---|
   | `logo.png` | Header, footer, browser tab | Square, ~600px, black ground |
   | `hero.jpg` | Home hero | 1600 × 1200 (4:3) |
   | `welcome-scholarships.jpg` | Home "Welcome to DWD Dance" | 800 × 1200 (2:3 portrait) |
   | `ballet.jpg` | Home + Classes ballet card | 1200 × 900 (4:3) |
   | `preschool.jpg` | Home + About NATD section | 1000 × 1000 (square) |
   | `performance.jpg` | About show & performance | 1600 × 1200 (4:3) |
   | `tap.jpg` `modern.jpg` | Style cards | 1200 × 900 (4:3) |
   | `studio.jpg` | About story | 1600 × 1067 (3:2) |
   | `principal.jpg` | Meet the principal | 1000 × 1000 (square) |
   | `store-*.jpg` (×4) | Store categories | 1000 × 1000 (square) |
   | `og-image.jpg` | Social sharing preview | 1200 × 630 |
   Each placeholder states its own size on the image itself.
8. **Social links** — Facebook is live; add Instagram back if you want it.
9. **Enquiry form** — wire it to a real inbox (instructions are in a comment
   inside `contact.html`); until then it opens the parent's email app.
10. **Legal pages** — read `privacy.html` and `cookies.html` properly and
    adjust them to what you actually do.

---

## Documentation

| Document | Covers |
|---|---|
| `docs/01-sitemap-and-wireframes.md` | Sitemap, page-by-page wireframes, mobile and desktop layouts |
| `docs/02-design-system.md` | Colour, typography, spacing, components, accessibility |
| `docs/03-copywriting.md` | Section-by-section copy rationale and alternatives |
| `docs/04-seo-strategy.md` | Titles, meta descriptions, headings, keywords, local SEO |
| `docs/05-implementation-and-hosting.md` | Implementation plan, One.com upload, images, Core Web Vitals |
| `docs/06-future-enhancements.md` | What to add next, in priority order |
| `docs/07-owners-guide.md` | How to make everyday edits without breaking anything |
| `docs/08-security.md` | Security review against the 20-point checklist |

---

## Before uploading to One.com

Upload the site files only. **Do not upload `docs/`, `README.md` or
`.gitignore`** — they are internal and would be publicly readable.

## Viewing it locally

Open `index.html` in a browser, or from this folder run:

```
python3 -m http.server 8000
```

then visit <http://localhost:8000>.
