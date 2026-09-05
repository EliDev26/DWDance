# 4. SEO Strategy

Target market: **parents in Trafford searching on a phone, usually in
September, January or the week a friend mentions dance.** The strategy is
local-first. National dance-school terms are not worth pursuing.

---

## 4.1 Page-by-page metadata

All of the following is already implemented in the HTML.

### Home — `index.html`

* **Title** (68 chars)
  `Dance Classes for Children in Stretford & Manchester | Donelon Wild School of Dance`
* **Meta description** (155 chars)
  *Ballet, tap and modern dance classes for children aged 3-18 in Stretford, Flixton, Urmston and Davyhulme. NATD exams, shows and a friendly, safe environment. Book a free taster class.*
* **H1** — Where children find their confidence, one step at a time
* **H2s** — A dance school built around the child · Everything you'd want for your child's first dance class · Three disciplines, one strong foundation · Classes grouped by age and stage · NATD examinations · Performance opportunities all year round · What parents say · Uniform, shoes and accessories · Three steps to your child's first class · Ready to see your child dance? · Questions?
* **Primary keyword** — dance classes Stretford
* **Secondary** — children's dance school Manchester, dance classes near me, ballet classes Trafford

### Classes & Pricing — `classes.html`

* **Title** — `Ballet, Tap & Modern Classes & Prices | DWD Dance, Stretford`
* **Meta description** — *Children's ballet, tap and modern classes in Stretford, Flixton, Urmston and Davyhulme. Class descriptions by age 3-18, NATD grades, fees, sibling discount and FAQs.*
* **H1** — Classes & Pricing
* **H2s** — How our classes work · Four stages, from first steps to student grade · Ballet, tap and modern — and what each one is for · Weekly timetable · Clear, simple pricing · Classes & pricing FAQs
* **H3s** — Pre-School Dance · Junior Classes · Intermediate Classes · Senior Classes · Ballet · Tap · Modern · plus each FAQ question
* **Primary keyword** — children's dance classes Stretford
* **Secondary** — ballet classes Urmston, tap classes Flixton, dance class prices Manchester, NATD grades

### Store — `store.html`

* **Title** — `Dancewear Store – Uniform, Shoes & Accessories | DWD Dance`
* **Meta description** — *Order official DWD Dance uniform, ballet and tap shoes, and accessories from our online dancewear store. Uniform lists by class, sizing guidance and delivery to your door.*
* **H1** — Everything your dancer needs, in one place
* **H2s** — Why order through our store? · Featured dancewear categories · Uniform by class · Choosing the right shoes · Size guide · Ready to order? · Dancewear FAQs
* **Primary keyword** — dancewear Manchester
* **Secondary** — ballet uniform Stretford, children's tap shoes Trafford, dance leotard sizing

### About Us — `about.html`

* **Title** — `About Our Dance School in Stretford, Manchester | DWD Dance`
* **Meta description** — *Founded in Stretford in 2016 by Bethany Donelon and Sally Wild. Our story, teaching philosophy, NATD examination training, performances and our commitment to a safe, supportive environment.*
* **H1** — The school Bethany and Sally built
* **H2s** — Built on teaching, not on numbers · How we teach — and why · NATD examination training · Opportunities to perform · A safe and supportive environment · Miss Bethany Donelon · What parents and students say
* **Primary keyword** — dance school Stretford
* **Secondary** — NATD dance school Manchester, safe dance classes for children Trafford

### Contact — `contact.html`

* **Title** — `Contact Us – Book a Free Taster Class | DWD Dance, Stretford`
* **Meta description** — *Enquire about children's ballet, tap and modern classes in Stretford, Flixton, Urmston and Davyhulme. Call 07910 603360, email miss.bethany@dwdance.co.uk or send an enquiry.*
* **H1** — Book a free taster class
* **H2s** — Send an enquiry · Where we teach · Quick answers · Prefer to talk it through?
* **Primary keyword** — dance classes near me Urmston
* **Secondary** — free taster dance class Manchester, contact dance school Trafford

Utility pages (`privacy`, `cookies`, `thank-you`, `404`) carry accurate titles
and descriptions. `thank-you.html` and `404.html` are not in the sitemap.

---

## 4.2 Heading rules

* Exactly one `<h1>` per page, and it contains the page's primary intent.
* `h2` for sections, `h3` for cards and FAQ questions, `h4` for sub-labels
  inside a card. No level is skipped anywhere.
* Headings describe content honestly — they are not keyword slots. The H1s here
  are written for the parent; the keywords live in the title tag, the lede
  paragraph and the body copy, which is where they belong.

---

## 4.3 Keyword map

### Primary local terms (highest intent)

| Term | Target page |
|---|---|
| dance classes Stretford | Home |
| dance classes Urmston | Home, Contact |
| dance classes Flixton | Home, Classes |
| dance classes Davyhulme | Home, Contact |
| children's dance school Manchester | Home |
| ballet classes Stretford / Urmston | Classes |
| tap classes Manchester | Classes |
| modern dance classes Trafford | Classes |

### Long tail (easiest early wins)

* dance classes for 3 year olds Stretford
* toddler ballet Urmston
* NATD dance exams Manchester
* dance school with shows Trafford
* first ballet class what to wear
* how much are dance classes Manchester
* dance classes near me for kids Flixton

Long-tail terms convert far better than head terms and are realistically
winnable for a local school. The Pre-School section, the FAQ entries and the
uniform guide are written specifically to catch them.

### Terms not to chase

"Dance classes Manchester" (city-centre schools with much older domains own it),
"dance school UK", and anything adult-focused. Winning Trafford is worth more
than ranking 40th for Manchester.

---

## 4.4 Local SEO

Beyond the website, in priority order:

1. **Google Business Profile** — the single highest-return action. Claim it,
   categorise as *Dance school*, set the service area to Stretford, Flixton,
   Urmston and Davyhulme, add real photographs, list class times, and post
   once a month. Ask five happy parents for a review; reply to every one.
2. **NAP consistency** — name, address and phone must match *character for
   character* everywhere: website footer, Google, Facebook, Yell, local
   directories. Inconsistency is the most common local-SEO problem.
3. **Structured data** — already implemented:
   * `LocalBusiness` + `DanceSchool` on the home page, with `areaServed` for
     all four towns, plus `foundingDate` (2016) and both founders
   * `WebSite`
   * `FAQPage` on Classes (eligible for FAQ rich results)
   * `BreadcrumbList` on Classes
   Add `postalCode` and `streetAddress` to the home-page JSON-LD once the main
   venue address is confirmed, and `geo` coordinates if you have them.
4. **Local links** — Trafford community pages, the venues' own websites, local
   school newsletters and parent Facebook groups. Ten genuine local links beat
   a hundred directory listings.
5. **Location wording in body copy** — the four town names appear naturally in
   the hero eyebrow, the intro, the timetable, the venue list and the footer.
   That is sufficient. Do not add a "dance classes in Stretford, dance classes
   in Urmston, dance classes in Flixton…" block; it reads badly and is treated
   as spam.

---

## 4.5 Technical SEO — already in place

* Canonical URL on every page.
* `robots.txt` with a sitemap reference.
* `sitemap.xml` covering the five public pages plus the two policies.
* Open Graph and Twitter Card tags for link previews.
* `lang="en-GB"`.
* Descriptive `alt` text on every image.
* Clean, human-readable filenames.
* HTTPS and single-host canonicalisation (`.htaccess`, if One.com honours it —
  otherwise set the redirect in the One.com control panel).
* Mobile-first, fast, no layout shift — Core Web Vitals are a ranking input and
  are covered in `05-implementation-and-hosting.md`.

### After launch

1. Verify the site in **Google Search Console** and submit `sitemap.xml`.
2. Add analytics only if you'll look at it — and only *after* cookie consent.
   [Plausible](https://plausible.io) or Fathom avoid the consent problem
   entirely; if you use Google Analytics, list its cookies in `cookies.html`
   and gate it behind the accept button.
3. Watch four things monthly: enquiry form submissions, calls, Search Console
   impressions for "dance classes + [town]", and which pages parents land on.

---

## 4.6 Content ideas that would rank

Each is a genuine parent question and a realistic 400–600 word page:

* "What age should a child start ballet?"
* "What to expect at your child's first dance class"
* "What is the NATD, and do dance exams matter?"
* "How to do a ballet bun" — endlessly searched, endlessly shared
* "Ballet, tap or modern — which should my child try first?"
* A show recap with photographs, in show years

Two or three of these, well written, would out-perform any amount of keyword
tinkering on the existing pages. Add them as `blog/` pages linked from the
footer only once there are at least three.
