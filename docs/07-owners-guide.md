# 7. Owner's Guide — everyday edits

Written for someone comfortable with a computer but not with code. You cannot
break the site by editing text; if something looks wrong, undo the change or
re-upload the original file.

---

## What you need

* A plain text editor — **Notepad** (Windows), **TextEdit in plain text mode**
  (Mac), or better, the free [Visual Studio Code](https://code.visualstudio.com).
  **Not** Word.
* Access to One.com's File Manager.

**Always keep a backup.** Before you change anything, download a copy of the
file you're about to edit.

---

## The golden rule

Text lives *between* the pointy brackets. Change the words, leave the brackets
alone.

```html
<h3 class="card__title">Ballet</h3>
                        ^^^^^^ change this
```

If you delete a `<` or a `>` by accident, the page will look broken — undo, or
re-upload your backup.

---

## Finding what to change

Everything that needs a real value is marked like this:

```html
<span class="editable">£00.00</span>
```

It shows on the live page as a **pale yellow highlight**, so you can look at
the page in a browser, spot the highlight, then search the file for that text.

Once you've put the real value in, you can leave `class="editable"` in place
(the highlight will still show) or delete just that part:

```html
<span class="editable">£00.00</span>   →   £8.50
```

---

## Common jobs

### Change a price

`classes.html` → search for `price-card__amount`.

```html
<p class="price-card__amount"><span class="editable">&pound;00.00</span></p>
```
becomes
```html
<p class="price-card__amount">&pound;8.50</p>
```

`&pound;` is the code for £. Typing `£` directly works too.

### Update the timetable

`classes.html` → search for `<tbody>` under "Weekly timetable". Each row is:

```html
<tr><td>Monday</td><td>4.00–4.45pm</td><td>Pre-School Ballet</td><td>3–5</td><td>Stretford</td></tr>
```

Copy an entire `<tr>…</tr>` line to add a class; delete the whole line to
remove one.

### Change the announcement bar

The charcoal strip at the very top. It's in **every** page file — search for
`topbar__inner` and change the message in all nine files so they match.

### Add or change a testimonial

`index.html` and `about.html` → search for `<figure class="quote">`. Replace
the text inside `<blockquote>` and the attribution in `<figcaption>`. To add
another, copy a whole `<figure>…</figure>` block and paste it after the last
one.

**Always get the family's written permission first.**

### Add the social media links

In the footer of every page, find:

```html
<li><a href="#" aria-label="DWD Dance on Facebook" rel="noopener">
```

Replace `#` with your full Facebook URL. Do the same for Instagram. If you
don't have one of them, delete that whole `<li>…</li>` block.

### Replace a photograph

1. Save your image at the size listed in `docs/05-implementation-and-hosting.md`.
2. Compress it at [squoosh.app](https://squoosh.app) — WebP, quality 80.
3. Upload it to `assets/img/`.
4. In the HTML, change the filename **and the alt text**:

```html
<img src="assets/img/ballet.svg" alt="Children practising ballet positions at the barre">
                        ^^^^^^^^^^                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

Alt text describes the photo for anyone who can't see it. Say what is happening:
*"Junior class rehearsing on stage before the annual show"*, not *"IMG_4471"*.

### Add an FAQ

Copy this block and paste it before the closing `</div>` of the accordion.
**Change both `faq-newquestion` ids to something unique on that page** — they
must match each other, and must not clash with another id.

```html
<div class="accordion__item">
  <h3><button class="accordion__btn" type="button" aria-expanded="false" aria-controls="faq-newquestion">
    Your question here?<span class="accordion__icon" aria-hidden="true"></span></button></h3>
  <div class="accordion__panel" id="faq-newquestion" hidden>
    <p>Your answer here.</p>
  </div>
</div>
```

If you add it to `classes.html`, also add the question and answer to the
`FAQPage` JSON-LD block at the bottom of that file, so it stays eligible for
Google's FAQ results.

### Change a colour across the whole site

`assets/css/styles.css`, lines near the top:

```css
--c-rose-600: #A85062;   /* primary action */
```

Change the hex code and every button, link and highlight updates at once.
**Check the contrast** of any new colour against white at
[webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)
— it needs to reach 4.5:1 to stay readable and accessible.

---

## Things to be careful with

| Don't | Why |
|---|---|
| Edit in Microsoft Word | It replaces quotes with curly characters that break the code |
| Rename `styles.css` or `main.js` | Every page points at those exact names |
| Move files out of `assets/` | All the paths would break |
| Reuse an `id` on the same page | Accordions and anchor links stop working |
| Delete `<div>` closing tags | The layout collapses below that point |
| Publish a child's photo without consent | Legal and safeguarding risk |

---

## Checking your work

1. Open the edited file in a browser (double-click it) before uploading.
2. Look at it on your phone as well as your computer.
3. After uploading, refresh the live page with **Ctrl+F5** (or **Cmd+Shift+R**)
   — browsers cache the old stylesheet otherwise.

---

## If something goes wrong

Re-upload your backup of that one file. Nothing else on the site is affected —
each page is independent.
