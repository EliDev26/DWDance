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
├── robots.txt            Search engine + AI crawler directives
├── llms.txt              Plain-text site summary for AI assistants
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

1. **Term dates** — `classes.html`, the "Term dates" section. This is the one
   you will come back to each year; edit only the highlighted cells and the
   "last updated" line.
2. **Class times** — `classes.html`, the "When we teach" section, if the
   Saturday pattern ever changes.
3. **Teacher profiles** — `about.html`, "Meet the teachers" (three cards:
   name, role, a short bio and a photo; delete the third if it isn't needed).
4. **Testimonials** — real quotes, with each family's permission, on
   `index.html` and `about.html`.
5. **Reply time** — `contact.html` and `thank-you.html`, "one to two days".
6. **Store page** — `store.html` is just a signpost to
   ddw.mydancestore.co.uk; there is no uniform list to maintain.
7. **Photography** — **every image is now a drop-in file.** Overwrite anything
   in `assets/img/` keeping the same filename, and no HTML needs editing:
   | File | Where it appears | Supply at |
   |---|---|---|
   | `logo.png` | Header, footer, browser tab | Square, ~600px, black ground |
   | `hero.jpg` | Home hero | 1600 × 1200 (4:3) |
   | `welcome-scholarships.jpg` | Home "Welcome to DW Dance" | 800 × 1200 (2:3 portrait) |
   | `ballet.jpg` `tap.jpg` `modern.jpg` | Home + Classes style cards | 1200 × 900 (4:3) |
   | `studio.jpg` | About story | 1600 × 1067 (3:2) |
   | `teacher-1.jpg` `teacher-2.jpg` `teacher-3.jpg` | About "Meet the teachers" | 1000 × 1000 (square) |
   | `og-image.jpg` | Social sharing preview | 1200 × 630 |

   `performance.jpg`, `preschool.jpg`, `principal.jpg` and the four
   `store-*.jpg` files are left in place but are no longer used by any page.
   Each placeholder states its own size on the image itself.
8. **Social links** — Facebook is live; add Instagram back if you want it.
9. **Enquiry form** — three fields only (name, email, subject). Wire it to a
   real inbox (instructions are in a comment inside `contact.html`); until
   then it opens the parent's email app.
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
| `docs/09-ai-discoverability.md` | Being found and quoted by AI assistants |

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
