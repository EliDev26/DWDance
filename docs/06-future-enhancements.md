# 6. Future Enhancements

Ordered by return on effort. Do the first three before considering anything
below them.

---

## Tier 1 — Highest return, low effort

### 1. Google Business Profile, properly maintained
Not a website change, but the single biggest source of local enquiries. Claim
it, add real photographs, list class times, and ask five parents for reviews.
**Effort: 2 hours, then 10 minutes a month.**

### 2. Real photography
The design is built for it and currently propped up by placeholders. One
two-hour session with a photographer at a class and at the show would lift the
whole site more than any feature on this list. **Effort: one session plus an
hour of cropping.**

### 3. A proper form endpoint with autoresponder
Move off the mailto fallback and add an automatic "we've got your enquiry"
reply. Parents who enquire on a Friday night currently hear nothing until
Monday. **Effort: 30 minutes.**

### 4. Real testimonials
Three specific quotes about a change the parent saw in their child. Ask by
email after the show, when goodwill peaks. **Effort: an hour of asking.**

---

## Tier 2 — Worth doing in the first six months

### 5. A small blog
Three or four genuinely useful articles (see §4.6 of the SEO document) would
bring in long-tail search traffic that the five core pages cannot. Add
`blog/index.html` and individual pages using the same header, footer and
stylesheet; link it from the footer once there are three or more posts.

### 6. Online booking for taster classes
A simple scheduling tool (Calendly, SavvyCal or similar) embedded on the
contact page, showing which taster slots are actually free. Removes the
back-and-forth entirely.

### 7. A photo gallery / show page
`gallery.html` with 12–20 images from the annual show, lazy-loaded in a CSS
grid. High emotional value for prospective parents and heavily shared by
existing ones. Photo consent applies.

### 8. Term dates and news page
A single page with term dates, closure dates and show dates. Parents ask for
this constantly, and it is the easiest page in the world to keep current.

---

## Tier 3 — When the school has capacity

### 9. Parent portal / members' area
Class notes, exam dates, music downloads, uniform lists and show information
behind a simple login. One.com's basic plans can't do this natively — the
practical route is a private page with an unguessable URL, or a service like
ClassManager, Dance Studio Pro or Class4Kids, which also handle registers,
invoicing and payments.

### 10. Online payments
Fee collection via GoCardless (direct debit is the right instrument for
termly fees) or Stripe. Usually arrives bundled with the class-management
system above, which is the better way to buy it.

### 11. Video content
A 45-second clip of a class in progress on the home page — muted, captioned,
lazy-loaded and never autoplaying with sound. Extremely persuasive for nervous
parents. Host on YouTube or Vimeo and embed with a click-to-play poster image
so it costs nothing until played.

### 12. Multi-venue location pages
Once the four venues are confirmed, individual pages — `classes-urmston.html`
and so on — with that venue's timetable, address, parking and a map. These rank
well for "dance classes [town]" and are the most reliable way to expand local
search coverage. Only worth building if each page has genuinely distinct
content; four near-identical pages will hurt rather than help.

### 13. Waiting list capture
When a class is full, a short "join the waiting list" form converts a lost
enquiry into a future student.

---

## Tier 4 — Nice to have

* **Adult and holiday classes** — new revenue, new audience, its own page.
* **Referral scheme** — "recommend a friend, both get a free week". Dance
  schools grow through the playground more than through Google.
* **Newsletter** — a termly email to existing families; low effort with
  Mailchimp's free tier, and it keeps the school in mind for re-enrolment.
* **Alumni page** — "where our dancers went next". Powerful for aspirational
  parents, if former students are happy to be named.
* **Dark mode** — deliberately out of scope per the brief; if it is ever
  wanted, the palette is already tokenised, so it is a matter of redefining the
  semantic tokens inside a `prefers-color-scheme` block.

---

## Deliberately not recommended

| Idea | Why not |
|---|---|
| Rebuilding in React / Next.js | No benefit for five static pages; adds a build step the school cannot maintain and can't be hosted on a basic One.com plan |
| A homepage carousel | Measurably poor engagement, hurts LCP, and hides content behind interaction |
| A live chat widget | Costs 100–200 KB, needs someone to answer it, and parents here prefer to phone |
| Autoplaying background video | Slow, distracting, an accessibility problem, and contrary to the brief |
| Pop-up newsletter overlays | Actively damages trust with the exact audience you are trying to reassure |
| A separate mobile site | The site is responsive; a second codebase doubles maintenance |
