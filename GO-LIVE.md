# Going live on One.com

A step-by-step guide to putting this site on the dwdance.co.uk hosting, and to
getting the enquiry form delivering into an inbox.

Two parts, and they are independent — **the site can go live today with the
form as delivered**, and the form can be upgraded any time afterwards.

- [Part 1 — Before you upload](#part-1--before-you-upload)
- [Part 2 — Upload to One.com](#part-2--upload-to-onecom)
- [Part 3 — After it is live](#part-3--after-it-is-live)
- [Part 4 — Making the enquiry form work](#part-4--making-the-enquiry-form-work)
- [Troubleshooting](#troubleshooting)

---

## Part 1 — Before you upload

### 1.1 Fill in the placeholders

Anything still to be written shows on the page with a **pale yellow
highlight**. To list what is left:

```
grep -c editable *.html
```

The ones that matter before launch:

| What | Where |
|---|---|
| Term dates + "last updated" line | `classes.html` → Term dates |
| Three teacher bios and roles | `about.html` → Meet the teachers |
| Three teacher photos | `assets/img/teacher-1.jpg`, `-2`, `-3` |
| Real testimonials (with permission) | `index.html`, `about.html` |
| Reply time ("one to two days") | `contact.html`, `thank-you.html` |
| Retention period `[X] years` | `privacy.html` |
| Policy date | `privacy.html`, `cookies.html` |

The site works perfectly well with placeholders still in — they just look
unfinished to a parent, and the yellow highlight is deliberately hard to miss.

### 1.2 Photographs

Every image is a drop-in file. Overwrite the file in `assets/img/` **keeping
the same filename** and no HTML needs editing. Each placeholder states its own
required size on the image itself.

Currently in use:

| File | Where it appears | Supply at |
|---|---|---|
| `logo.png` | Header, footer, browser tab | 600 square, black ground |
| `hero.jpg` | Home hero | 1600 × 1200 |
| `welcome-scholarships.jpg` | Home, "Welcome to DW Dance" | 800 × 1200 |
| `ballet.jpg` `tap.jpg` `modern.jpg` | Style cards | 1200 × 900 |
| `studio.jpg` | About, our story | 1600 × 1067 |
| `teacher-1.jpg` `teacher-2.jpg` `teacher-3.jpg` | Meet the teachers | 1000 × 1000 |
| `og-image.jpg` | Facebook/WhatsApp preview | 1200 × 630 |

Compress them at [squoosh.app](https://squoosh.app) before uploading — aim for
under 200 KB for the hero and under 100 KB for everything else. Update the
`alt` text on any image whose subject changes.

**Permission:** before a photograph of a child goes on the site, make sure you
hold the parent's written consent for that use. There is a form ready to hand
out in `docs/photo-permission-form.docx` (internal — do not upload it).

`performance.jpg`, `preschool.jpg`, `principal.jpg` and the four `store-*.jpg`
files are left in the folder but are no longer used by any page. You can
upload them or not; nothing links to them.

### 1.3 Check it locally

From the project folder:

```
python3 -m http.server 8000
```

Then open <http://localhost:8000> and click through every page.

---

## Part 2 — Upload to One.com

### 2.1 Get the files

Either use the project folder you already have, or download it from GitHub:
**Code → Download ZIP**, then unzip it.

### 2.2 Check the Website Builder is not in the way

This is the one thing that catches people out. If One.com's **Website Builder**
is publishing to dwdance.co.uk, it will serve its own pages and your uploaded
files will be ignored.

In the control panel, look under the website/builder section. If a builder site
is published to this domain, unpublish it (or point the builder at a subdomain)
before uploading. If you have never used the builder, there is nothing to do.

### 2.3 Back up what is there now

Before changing anything, download a copy of the current site from the file
manager. If anything goes wrong you can put it straight back.

### 2.4 Open the file manager

In the One.com control panel, find **Files & Databases → File Manager**.

Or connect over SFTP with [FileZilla](https://filezilla-project.org) or
[Cyberduck](https://cyberduck.io) — the host, username and password are shown
in the same area of the control panel. SFTP is much faster for the `assets`
folder and is worth the five minutes of setup.

> One.com renames its control panel sections from time to time. If the wording
> differs, you are looking for file management or FTP/SFTP access.

### 2.5 Find the web root

The web root is the folder whose contents appear at `https://www.dwdance.co.uk/`.
On One.com it is usually the folder you land in, and it is often the one that
already contains an `index.html` or the current site's files.

Sanity check: if you drop `index.html` in and the home page appears at the
domain, it is the right folder.

### 2.6 Upload these files

Preserve the folder structure exactly — `assets/css/styles.css` must stay at
`assets/css/styles.css`, not sit loose in the root.

```
index.html          classes.html        store.html
about.html          contact.html        thank-you.html
privacy.html        cookies.html        404.html
robots.txt          sitemap.xml         llms.txt
site.webmanifest    .htaccess

assets/css/styles.css
assets/js/main.js
assets/img/          (every image file)
```

**Do not upload** — these are internal and would be publicly readable:

```
docs/        README.md        GO-LIVE.md        .gitignore        .git/
```

### 2.7 About `.htaccess`

`.htaccess` begins with a dot, so most file managers hide it. Turn on **show
hidden files** to see and upload it.

It handles the 404 page, compression, caching, security headers and the
HTTPS/www redirect. If One.com's setup rejects it and the site errors, **delete
it** — everything still works without it, and the HTTPS and www redirects can
be set in the control panel instead.

### 2.8 Check the live site

Open `https://www.dwdance.co.uk` and work through:

- [ ] All five pages load and the menu works
- [ ] The same on a real phone, not just a narrow browser window
- [ ] Images all appear (a broken image means the `assets` structure got flattened)
- [ ] The page looks styled — if it is unstyled text, `assets/css/styles.css` is missing
- [ ] Phone numbers dial and email links open a message
- [ ] The store button opens ddw.mydancestore.co.uk in a new tab
- [ ] A made-up URL like `dwdance.co.uk/nope` shows the DW Dance 404 page
- [ ] The padlock shows in the address bar
- [ ] `dwdance.co.uk` (no www) redirects to `www.dwdance.co.uk`

---

## Part 3 — After it is live

1. **Google Search Console** — add the property at
   [search.google.com/search-console](https://search.google.com/search-console),
   verify ownership (One.com's DNS section lets you add the TXT record), then
   submit `https://www.dwdance.co.uk/sitemap.xml`.
2. **Google Business Profile** — this matters more than the website for
   "dance classes near me". Add the website link, the Saturday hours and photos.
3. **Facebook** — update the page's website link.
4. **Tell the dancewear partner** the site is live, in case they link back.

---

## Part 4 — Making the enquiry form work

### 4.1 How it works right now

As delivered, the form checks the three fields, then **opens the parent's own
email app** with the message pre-filled to `miss.bethany@dwdance.co.uk`.

- **Good:** works immediately, no account, no cost, nothing to break, and
  nobody else stores parents' details.
- **Not so good:** a phone with no mail app set up gets nothing, and the parent
  has to press send themselves. Some enquiries will be lost.

This is controlled by `data-mode="mailto"` on the `<form>` tag in
`contact.html`. It is a perfectly reasonable way to launch.

### 4.2 Upgrading to a real form (about 20 minutes)

The recommended route is **Formspree** — the free tier is 50 submissions a
month, which is ample.

**Step 1 — Create the endpoint**

Sign up at [formspree.io](https://formspree.io), create a new form, set the
delivery address to `miss.bethany@dwdance.co.uk`, and copy the endpoint URL. It
looks like `https://formspree.io/f/abcdwxyz`.

**Step 2 — Point the form at it**

In `contact.html`, find the form tag (around line 147):

```html
<form class="form mt-6" id="enquiry-form" data-mode="mailto" action="#" method="post" novalidate>
```

Change it to — using your own endpoint:

```html
<form class="form mt-6" id="enquiry-form" data-mode="post" action="https://formspree.io/f/abcdwxyz" method="post" novalidate>
  <input type="hidden" name="_next" value="https://www.dwdance.co.uk/thank-you.html">
```

Three things changed: `data-mode` is now `post` (so the script stops
intercepting and lets the browser submit), `action` is your endpoint, and the
hidden `_next` field sends parents to the thank-you page after submitting.

**Step 3 — Allow the endpoint in the security policy** ⚠️

This step is not optional, and skipping it is the single most likely reason a
form "does nothing". The site ships with a Content-Security-Policy that only
permits form submissions back to itself. You must add the endpoint's origin in
**two** places.

In `contact.html`, line 6, find:

```
form-action 'self';
```

and change it to:

```
form-action 'self' https://formspree.io;
```

Then do exactly the same in `.htaccess`, in the
`Header set Content-Security-Policy` line (around line 47).

Both files must match. The `.htaccess` header is what browsers actually
enforce when the site is live; the `<meta>` tag covers the case where One.com
ignores `.htaccess`.

**Step 4 — Upload and test**

Upload the changed `contact.html` and `.htaccess`, then send yourself a real
test enquiry. Formspree emails you to confirm the address on the first
submission — click that link or nothing will arrive.

Check: the message lands in the inbox, and the browser ends up on the thank-you
page.

**Step 5 — Watch the spam folder for a week**

Add `formspree.io` to your contacts so the notifications do not get filtered.

**Step 6 — Update the privacy policy**

Once a form service is in use it becomes a data processor handling parents'
details, and `privacy.html` currently says the opposite — that the form sends
nothing to another company. Two changes:

* Under "Who we share it with", name the form provider.
* If the provider stores data outside the UK (Formspree is US-based), say so.

Skipping this leaves a published statement that is no longer true.

### 4.3 Alternative — FormSubmit (no account)

If you would rather not sign up for anything, [formsubmit.co](https://formsubmit.co)
works with no account:

```html
<form class="form mt-6" id="enquiry-form" data-mode="post"
      action="https://formsubmit.co/miss.bethany@dwdance.co.uk" method="post" novalidate>
  <input type="hidden" name="_next" value="https://www.dwdance.co.uk/thank-you.html">
```

The CSP origin to allow is `https://formsubmit.co` — same two files as above.
The first submission triggers a confirmation email you must click.

### 4.4 A note on One.com's own form

One.com's form element only exists inside the Website Builder. Using it means
rebuilding the contact page in the builder, which will not match the rest of
the site. Formspree is the simpler answer.

### 4.5 What is already handled

- **Spam** — there is a hidden honeypot field (`company_website`). Bots fill
  it in and the submission is silently dropped. Keep it whichever route you take.
- **Validation** — name, email, subject and the consent tick are all checked in
  the browser before anything is sent.
- **Consent** — the tick box and the privacy policy link are already there,
  which is what you need for GDPR.

---

## Troubleshooting

| What you see | What it is |
|---|---|
| Page loads as unstyled text | `assets/css/styles.css` did not upload, or the `assets` folder got flattened |
| Images missing, everything else fine | Same cause — check `assets/img/` exists on the server |
| Site looks like the old one | Website Builder is still publishing to the domain (§2.2), or your browser cached it — try a private window |
| 404 page is One.com's, not ours | `.htaccess` did not upload, or is hidden. Turn on show hidden files |
| Server error 500 after upload | `.htaccess` is not supported on the plan — delete it |
| Form does nothing when submitted | Almost always the CSP (§4.3). Open the browser console; "Refused to send form data" confirms it |
| Form works but no email arrives | You have not clicked the provider's confirmation email, or it is in spam |
| Form redirects to the provider's own page | The `_next` hidden field is missing or has the wrong URL |
| No padlock in the address bar | Certificate not issued yet — One.com issues one automatically, give it an hour |

---

## Making an edit later

Edit the file, save it, upload just that one file, then refresh with
Ctrl+F5 (Cmd+Shift+R on a Mac) to get past the cache. Term dates are the one
thing you will change regularly — they are in `classes.html`, marked with a
comment saying exactly which cells to edit.
