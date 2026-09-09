# 5. Implementation Plan & One.com Hosting

> **Superseded for launch and forms.** See `GO-LIVE.md` in the project root for
> the current, step-by-step upload and enquiry-form instructions. Sections 5.1
> Phase 4, 5.2 and the image table below predate the 2026 content rework and
> still refer to pages and placeholders that no longer exist (the timetable
> table, venue addresses, uniform lists, "Meet the principal"). The design and
> rationale in the rest of this document still stand.

---

## 5.1 Implementation plan

### Phase 1 — Content gathering (school, ~2 hours)

| # | Task | Where it goes |
|---|---|---|
| 1 | Current prices: trial, weekly class, sibling discount, uniform, registration, exam entry, show costs | `classes.html` → Fees |
| 2 | Current timetable: day, time, class, ages, venue | `classes.html` → Weekly timetable |
| 3 | Venue names and full addresses with postcodes | `contact.html` → Where we teach |
| 4 | Principal biography, training, qualifications | `about.html` → Meet the principal |
| 5 | Sally Wild biography (optional) | `about.html` → Meet the principal |
| 6 | 3–6 testimonials, with written permission | `index.html`, `about.html` |
| 7 | Uniform requirements per class and style | `store.html` → Uniform by class |
| 8 | Confirm safeguarding statements are accurate | `about.html` → Safe and supportive |
| 9 | Facebook and Instagram URLs | Footer, all pages |
| 10 | 12–15 photographs (see §5.3) | Throughout |

### Phase 2 — Fill in the placeholders (1–2 hours)

Open each HTML file in a plain text editor. Every value you need to change is
wrapped in `<span class="editable">` and appears with a **pale yellow
highlight** in the browser, so you can work through the live pages visually.

```
grep -c editable *.html      # how many placeholders remain per page
```

Work in this order: `classes.html` → `contact.html` → `about.html` →
`store.html` → `index.html` → the two policies.

### Phase 3 — Photography (see §5.3)

Replace the SVGs in `assets/img/`. Keep the same filenames and you won't need
to touch the HTML at all — but *do* update each `alt` attribute to describe the
new photograph.

### Phase 4 — Wire up the enquiry form (30 minutes)

As delivered, the form validates in the browser and then opens the parent's
email app with everything pre-filled. That works everywhere and needs no
account, but it loses parents whose phone has no mail app configured. To
receive submissions properly, pick one:

* **One.com's own form element** — if you rebuild the contact page inside the
  website builder, drop in its form component and map the fields.
* **Formspree / FormSubmit / Web3Forms** — free tiers are ample for a dance
  school. Create an endpoint, then in `contact.html`:

  ```html
  <form class="form" id="enquiry-form"
        data-mode="post"
        action="https://formspree.io/f/YOUR-ID"
        method="post" novalidate>
    <input type="hidden" name="_next" value="https://www.dwdance.co.uk/thank-you.html">
  ```

  Change `data-mode="mailto"` to `data-mode="post"` and the script stops
  intercepting the submission — validation still runs.

The honeypot field is already in place; keep it whichever route you choose.

### Phase 5 — Pre-launch checks (1 hour)

- [ ] Every page opens and the navigation works on a real phone
- [ ] `grep -c editable *.html` returns 0 for anything that should be finished
- [ ] All phone links dial and all email links open a message
- [ ] The store button opens `ddw.mydancestore.co.uk` in a new tab
- [ ] The enquiry form sends, and the reply lands somewhere you check
- [ ] `thank-you.html` shows after submission
- [ ] Tab through each page — the focus ring is always visible
- [ ] Lighthouse (mobile) — aim for 95+ across the board
- [ ] Privacy and cookies pages read correctly and are dated

### Phase 6 — Launch (1 hour)

1. Back up the current site from One.com first.
2. Upload (§5.2).
3. Check every page on the live domain, on a phone and a laptop.
4. Verify in Google Search Console and submit `sitemap.xml`.
5. Update the website link on Google Business Profile and Facebook.

### Phase 7 — First month

Watch enquiries and calls. If a question keeps arriving by email, it belongs in
an FAQ. Add real photographs from the next show as soon as you have them.

---

## 5.2 Uploading to One.com

One.com offers two routes. **Plain file upload is strongly recommended** — it
preserves the design exactly and is simpler to maintain.

### Option A — Upload the files (recommended)

1. Log in to the One.com control panel.
2. Open **Files & Databases → File Manager** (or connect over SFTP with the
   credentials shown there — Cyberduck or FileZilla both work).
3. Navigate to the web root, usually `/www/` or `/public_html/`.
4. **Back up whatever is there now** by downloading it.
5. Upload, preserving the folder structure exactly:
   ```
   index.html  classes.html  store.html  about.html  contact.html
   thank-you.html  privacy.html  cookies.html  404.html
   robots.txt  sitemap.xml  site.webmanifest  .htaccess
   (do NOT upload docs/ or README.md — internal only)
   assets/css/styles.css
   assets/js/main.js
   assets/img/*
   ```
6. Visit the domain and check every page.

Notes:

* `.htaccess` starts with a dot and may be hidden — enable "show hidden files"
  in the file manager. If One.com's configuration ignores it or errors, delete
  it; the site works without it and the HTTPS/www redirect can be set in the
  control panel instead.
* The `assets/` folder structure matters. All paths in the HTML are relative
  (`assets/css/styles.css`), so as long as the tree is preserved, the site
  works in a subfolder too.
* To update one page later, upload just that file.

### Option B — Rebuild inside One.com Website Builder

Use this only if the school would rather edit through a visual interface.

* Recreate the five pages using the builder's sections, following the
  wireframes in `01-sitemap-and-wireframes.md`.
* Paste the copy from the delivered HTML.
* Set the builder's theme colours to `#A85062` (primary), `#F9EDEC`
  (background tint) and `#2B2729` (text), and its fonts to Playfair Display
  for headings and Inter for body.
* Where the builder allows a custom HTML/embed block, paste in the card,
  accordion or pricing markup from these files along with the relevant CSS.
* Expect the result to be visually close but not identical — builder templates
  impose their own spacing and breakpoints.

### Option C — Hybrid

Keep the four content pages as uploaded HTML and rebuild only `contact.html` in
the builder so the school can use One.com's form handling. Match the header and
footer as closely as the builder allows.

### One.com constraints to be aware of

| Constraint | How this build handles it |
|---|---|
| No server-side languages on basic plans | Nothing server-side is used |
| No build tools, no npm | Plain `.html`, `.css`, `.js` — edit and upload |
| Limited or no `.htaccess` support on some plans | `.htaccess` is optional and safe to delete |
| No CDN on basic plans | Assets are tiny; caching headers included where supported |
| Website Builder rewrites markup | Route A avoids the builder entirely |
| Email forms depend on plan | Two documented fallbacks in §5.1 Phase 4 |

---

## 5.3 Images — sizes, formats and optimisation

Everything in `assets/img/` is currently a labelled SVG placeholder (about 800
bytes each). Replace them with real photographs at these sizes:

| File | Purpose | Supply at | Aspect | Format |
|---|---|---|---|---|
| `logo.png` | Header, footer, favicon | ~600 square | 1:1 | **PNG** (keeps the black ground) |
| `hero.jpg` | Home hero | 1600 × 1200 | 4:3 | JPG or WebP, ~150 KB |
| `welcome-scholarships.jpg` | Home intro | 800 × 1200 | 2:3 | JPG or WebP, ~120 KB |
| `ballet.jpg` | Ballet card (home + classes) | 1200 × 900 | 4:3 | JPG or WebP, ~80 KB |
| `tap` `modern` | Style cards | 1200 × 900 | 4:3 | WebP, ~80 KB |
| `preschool.jpg` | NATD section (home + about) | 1000 × 1000 | 1:1 | JPG or WebP, ~90 KB |
| `performance.jpg` | End-of-year awards (about) | 1600 × 1200 | 4:3 | JPG or WebP, ~110 KB |
| `studio` | About story | 1600 × 1067 | 3:2 | WebP, ~110 KB |
| `principal` | Portrait | 1000 × 1000 | 1:1 | WebP, ~90 KB |
| `store-*` (×4) | Store categories | 1000 × 1000 | 1:1 | WebP, ~70 KB |
| `og-image` | Social sharing | 1200 × 630 | 1.91:1 | **JPG** — several platforms won't render SVG |
| `logo` / `favicon` | Brand mark | — | — | Keep as SVG |

**Every image is now a drop-in file** — overwrite any `.jpg`/`.png` in
`assets/img/` keeping its filename and no HTML changes are needed. The six
already matched to supplied photographs are — `logo.png`,
`hero.jpg`, `welcome-scholarships.jpg`, `ballet.jpg`, `preschool.jpg` and
`performance.jpg`. Overwrite those files
in place and no HTML needs touching. For the remaining `.svg` placeholders you
must rename to `.webp`/`.jpg` and edit the matching `<img src>`.

The logo is white text on a black ground, so it is shown on a dark tile in the
header and directly on the charcoal footer. Removing the black background would
leave white text invisible on the white header — if you want a transparent
logo, you need a version with charcoal text, not just the background stripped.

Optimisation:

* Compress with [Squoosh](https://squoosh.app) — WebP, quality 75–80. It is
  free, runs in the browser and typically saves 60–70% over a JPG.
* Target **under 200 KB** for the hero and **under 100 KB** for everything else.
* Keep the `width` and `height` attributes on every `<img>` (they are already
  there) — they reserve the space and prevent layout shift.
* `loading="lazy"` is set on every image except the hero, which carries
  `fetchpriority="high"` because it is the Largest Contentful Paint element.
* Photograph in landscape for cards, portrait for the hero, and leave space
  around the subject so the crop works at every breakpoint.
* **Get written photo consent from every family** before publishing a
  recognisable child, and note it in the privacy policy.

---

## 5.4 Performance & Core Web Vitals

Current build, before photography:

| Asset | Size |
|---|---|
| HTML (largest page) | ~39 KB |
| CSS | ~25 KB |
| JS | ~7 KB |
| Images (placeholders) | ~1 KB each |
| **Total first load** | **under 60 KB** |

Design decisions made for speed:

* One stylesheet, one script, both cacheable for a year — no framework, no
  jQuery, no icon font (all icons are inline SVG).
* JavaScript is `defer`red and the site is fully usable without it: navigation
  links work, accordion panels can be opened by removing `hidden`, and the form
  falls back to a normal submit.
* No web fonts block rendering — `display=swap` plus a matched fallback stack.
* No carousels, no scroll-jacking, no animation on load. The only motion is a
  12px fade-in on scroll, disabled under `prefers-reduced-motion`.
* Every image has explicit dimensions, so **CLS ≈ 0**.
* The sticky header uses `backdrop-filter`, which is GPU-composited.

Expected Lighthouse (mobile, once photographs are optimised):
**Performance 95+ · Accessibility 100 · Best Practices 100 · SEO 100**

### If you want to squeeze further

1. **Self-host the fonts.** Download the Inter and Playfair Display `woff2`
   files, put them in `assets/fonts/`, replace the Google Fonts `<link>` with
   an `@font-face` block and `<link rel="preload">`. Removes two third-party
   connections and any GDPR question about Google Fonts.
2. **Inline the critical CSS.** Paste the tokens, reset, header and hero rules
   into a `<style>` block in `<head>` and load `styles.css` asynchronously.
   Worth perhaps 100ms; only do it if you are comfortable maintaining two
   copies of those rules.
3. **Serve AVIF with a WebP fallback** using `<picture>` — another 20–30% off
   image weight.

Measure before and after with PageSpeed Insights. Do not optimise blind.
