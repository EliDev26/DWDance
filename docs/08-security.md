# 8. Security Review

Reviewed against the 20-point checklist supplied by the site owner.

**The single most important fact:** this is a **static website**. Nine HTML
files, one stylesheet, one JavaScript file, some images. There is no server-side
code, no database, no user accounts, no admin area, no sessions, no API and no
file uploads. Roughly half the checklist describes risks that require a backend
to exist at all.

Rather than mark those "done", they are marked **N/A** below, each with the
condition that would make it apply. That condition matters: the moment a booking
system, members' area or payment flow is added, the N/A items become live and
must be revisited.

Legend: **DONE** implemented and verified · **N/A** no attack surface exists ·
**ACTION** something the owner must do outside the codebase.

---

## Summary

| # | Item | Status |
|---|---|---|
| 1 | All API keys are hidden | DONE — there are none; verified |
| 2 | Check env variables | DONE — none exist; verified |
| 3 | Check keys in git | DONE — full history scanned, clean |
| 4 | Protect admin routes | N/A — no admin area |
| 5 | Add auth | N/A — no accounts |
| 6 | Check user permissions | N/A — no users or roles |
| 7 | Sanitize user inputs | DONE — the one input path is encoded |
| 8 | Protect against XSS | DONE — no HTML sinks; strict CSP added |
| 9 | SQL injection protection | N/A — no database, no SQL |
| 10 | Check DB rules | N/A — no database |
| 11 | Add rate limiting | ACTION — applies to the form endpoint |
| 12 | Set spend cap | ACTION — applies to hosting/form provider |
| 13 | Secure file uploads | N/A — nothing accepts uploads |
| 14 | CSRF protection | N/A now — becomes live with a form endpoint |
| 15 | Check CORS settings | DONE — no CORS headers; nothing to widen |
| 16 | Enable HTTPS | DONE in config — ACTION to confirm at One.com |
| 17 | Add security headers | DONE — full set including CSP and HSTS |
| 18 | Secure cookies | N/A — the site sets no cookies |
| 19 | Disable debug mode | N/A — no framework, no debug mode |
| 20 | Check prod settings | DONE — reviewed; see notes |

---

## 1–3. Secrets, environment variables and git history

**Verified clean.** Commands run against this repository:

```
grep -rniE '(api[_-]?key|secret|password|token|bearer|AKIA[0-9A-Z]{16}|
             sk_live|ghp_[A-Za-z0-9]{20,}|BEGIN .*PRIVATE KEY)' .
git log --all --pretty=%H | while read c; do git grep -niE '<same>' $c; done
find . -name '.env*' -o -name '*.pem' -o -name '*.key' -o -name 'id_rsa*'
```

Results: no credentials in the working tree, **no credentials at any commit in
the full history**, and no `.env`, `.pem`, `.key` or credential files present.
The only matches for "token" were CSS *design tokens*.

There is nothing for the site to authenticate to, so there are no keys to hide.

**If that changes** — say you add an analytics key, a maps key or a form
provider key — remember that **anything in a static site is public**. Viewing
source reveals it. Only ever put publishable/restricted keys in the HTML, lock
them to the `dwdance.co.uk` domain in the provider's console, and never paste a
secret key.

**Recommended:** add a `.gitignore` for `.env`, `*.key` and `*.pem` before any
future tooling is introduced. Not needed for the site as it stands.

## 4–6. Admin routes, authentication, user permissions — N/A

There is no admin area, no login, no user accounts and no roles. Every page is
public by design; the site is content, not an application.

The one place with privileged access is the **One.com control panel** itself.
That is where the real risk lives, and it is an account-hygiene matter:

- **ACTION:** turn on two-factor authentication for the One.com login.
- **ACTION:** use a unique, long password stored in a password manager.
- **ACTION:** the same for the domain registrar and the Facebook page.

**Becomes applicable if** a members' area, class register or parent portal is
added — see `docs/06-future-enhancements.md` §9, where the recommendation is to
buy a purpose-built class-management system rather than build authentication.

## 7. Input sanitisation — DONE

The site has exactly one input surface: the enquiry form on `contact.html`.

- Client-side validation checks required fields, email shape and phone length.
- **No user input is ever written back into the page.** The only value inserted
  into the DOM is a fixed error string.
- In the default `mailto` mode, every field is passed through
  `encodeURIComponent()` before being placed in the URL, which prevents header
  injection into the generated email.
- A honeypot field (`company_website`, hidden and `aria-hidden`) silently drops
  bot submissions.

Client-side validation is a **usability** feature, not a security control — it
can be bypassed trivially. The real validation must happen wherever submissions
are received. See item 14.

## 8. XSS — DONE

Audited `assets/js/main.js` for DOM sinks. Confirmed absent: `innerHTML`,
`outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`,
string-argument `setTimeout`/`setInterval`, `srcdoc`. All text is written with
`textContent`. There are **no inline event handlers** (`onclick=` etc.) anywhere
in the markup.

Additional hardening applied in this review:

- **All 30 inline `style="..."` attributes were converted to utility classes**,
  so the CSP can forbid inline styles outright rather than allowing
  `'unsafe-inline'`.
- The one inline `<script>` (which sets the `.js` class before first paint) is
  allowed by **SHA-256 hash**, not by `'unsafe-inline'`.

The resulting policy blocks injected scripts even if markup were somehow
tampered with:

```
default-src 'self'; base-uri 'self'; object-src 'none';
frame-ancestors 'none'; form-action 'self';
script-src 'self' 'sha256-riitXBKGtl5y5ccA7GF6ccqJuwEVP5tm8j0ff/fbw9U=';
style-src 'self' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:; connect-src 'self'; manifest-src 'self';
upgrade-insecure-requests
```

**Verified:** all 9 pages loaded in Chromium over HTTP with this policy active —
**zero CSP violations and zero page errors** — with navigation, accordions, form
validation and the cookie notice all still working.

> ⚠️ **If you edit the inline script in the `<head>`, the hash changes and the
> script will be blocked.** That script is one line and should not need
> changing. If you must, recompute the hash or the site loses its scroll-reveal.

## 9–10. SQL injection and database rules — N/A

There is no database and no SQL. Nothing the site does touches a data store.

**Becomes applicable if** a booking or membership system is added. Note that
the dancewear store at `ddw.mydancestore.co.uk` **is** a separate application
with its own database, run by a third party — its security is their
responsibility, not this site's, and the two share no data.

## 11. Rate limiting — ACTION

Static files cannot be rate limited meaningfully from within the site, and there
is no endpoint to exhaust. This becomes real for the **enquiry form** once it is
wired to a provider:

- Formspree, FormSubmit and Web3Forms all include spam filtering and submission
  caps on their free tiers — **turn them on**.
- Keep the honeypot field; it removes most low-effort bots before they count
  against your quota.
- Consider the provider's built-in CAPTCHA only if spam actually becomes a
  problem. It costs you real enquiries from real parents, so do not add it
  pre-emptively.

## 12. Spend cap — ACTION

There is no metered spend today: static hosting on a fixed One.com plan and no
paid APIs. Points to watch:

- **One.com bandwidth/overage** — check whether your plan charges for excess
  traffic or simply throttles. The site is under 100 KB per page, so this is
  unlikely to bite.
- **Form provider** — free tiers cap submissions per month. Know what happens at
  the cap: submissions are usually *dropped*, meaning lost enquiries. Set up the
  provider's email alert.
- If you ever add a paid API, set a hard billing cap in that provider's console
  on the day you add it, not later.

## 13. Secure file uploads — N/A

Nothing on the site accepts a file. The enquiry form has no file input.

**Becomes applicable if** you add a photo upload or a document return.

## 14. CSRF — N/A now, live the moment a form endpoint is added

With no sessions and no authenticated state, there is nothing for a
cross-site request to forge. The form currently opens the user's own email app.

**As soon as you point the form at a real endpoint**, the endpoint owns this:

- Reputable form providers (Formspree, Web3Forms) handle CSRF and origin
  checking for you — this is a strong reason to use one rather than roll your own.
- **Restrict the endpoint to your own domain** in the provider's settings, so
  nobody can use your form quota from elsewhere.
- **Update the CSP** — `form-action 'self'` will block a cross-origin POST.
  Add the provider, e.g. `form-action 'self' https://formspree.io;`, in both
  `.htaccess` and the `<meta>` CSP tag on `contact.html`.

## 15. CORS — DONE

The site sets **no** `Access-Control-Allow-Origin` header, which is the correct
and safest default: no other origin can read responses from this domain. There
is no permissive `*` anywhere to tighten.

The CSP additionally restricts what the pages themselves may reach:
`connect-src 'self'` means the site cannot make cross-origin requests at all.

## 16. HTTPS — DONE in config, ACTION to confirm

`.htaccess` redirects HTTP → HTTPS and non-www → www (301), giving one canonical
address. `upgrade-insecure-requests` in the CSP upgrades any stray HTTP
subresource.

- **ACTION:** confirm One.com's free SSL certificate is issued and active for
  both `dwdance.co.uk` and `www.dwdance.co.uk`, and that auto-renewal is on.
- **ACTION:** if One.com ignores `.htaccess` on your plan, set the HTTPS
  redirect in the control panel instead.
- **HSTS is enabled** (`max-age=31536000; includeSubDomains`). Only leave it on
  once HTTPS is confirmed working on **every** subdomain — browsers will refuse
  plain HTTP for a year afterwards, and that is hard to undo.

## 17. Security headers — DONE

Set in `.htaccess`:

| Header | Value | Protects against |
|---|---|---|
| `Content-Security-Policy` | see item 8 | XSS, injection, data exfiltration |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Downgrade / stripping attacks |
| `X-Content-Type-Options` | `nosniff` | MIME-confusion attacks |
| `X-Frame-Options` | `DENY` | Clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage |
| `Permissions-Policy` | camera, mic, geolocation, payment, USB all off | Unwanted device access |
| `Cross-Origin-Opener-Policy` | `same-origin` | Cross-window attacks |
| `Cross-Origin-Resource-Policy` | `same-origin` | Cross-origin resource theft |

Also added: dotfiles are denied and `/.git` returns 404, so no repository
metadata is ever served if the folder is uploaded by accident.

A `<meta http-equiv="Content-Security-Policy">` tag is included on every page as
a **fallback**, because some One.com plans ignore `.htaccess`. Headers are
preferred where available; `frame-ancestors` and HSTS only work as real headers.

**ACTION after launch:** test at
[securityheaders.com](https://securityheaders.com) — enter the domain and aim
for A or better. If the grade is poor, One.com is ignoring `.htaccess` and the
meta CSP is doing the work alone.

## 18. Secure cookies — N/A

**The site sets no cookies at all.** The cookie banner records the visitor's
choice in `localStorage` (`dwd-cookie-choice`), which never leaves the browser
and is never transmitted. Every read and write is wrapped in `try/catch` so
blocked storage degrades cleanly.

**If you add analytics**, that will set cookies. Then: list them in
`cookies.html`, do not load the script until consent is given, and prefer a
cookieless analytics tool ([Plausible](https://plausible.io), Fathom) which
avoids the problem entirely.

## 19. Debug mode — N/A

No framework, no build, no debug flag. `main.js` contains no `console.log`, no
debugger statements and no development-only branches. Nothing verbose to
disable.

## 20. Production settings — DONE, with two notes

Reviewed the whole tree for anything not fit to publish:

- No source maps, no `node_modules`, no build artefacts, no `.env`.
- No TODO/FIXME leakage in shipped HTML.
- `robots.txt` allows indexing (correct for a live marketing site) and points at
  `sitemap.xml`.
- Canonical URLs on every page point at `https://www.dwdance.co.uk`.

Two things to settle before launch:

1. **`docs/` will be publicly readable if uploaded.** Nothing in it is
   sensitive, but it is internal strategy. **Do not upload the `docs/` folder
   to One.com** — it belongs in the repository only. The same goes for
   `README.md`.
2. **`contact.html` contains a placeholder `action="https://YOUR-ENDPOINT"` in a
   comment.** Harmless, but replace it when you wire the form up.

---

## What actually threatens this site

Ranked honestly, ignoring the checklist:

1. **Losing control of the One.com or domain account.** Far and away the biggest
   risk. Turn on 2FA today. A hijacked domain is a much worse day than any XSS.
2. **The enquiry form becoming a spam funnel** once wired up, drowning genuine
   enquiries. Mitigated by the honeypot and provider filtering.
3. **Publishing a child's photograph without consent.** Not a "hacking" risk,
   but for a children's dance school it is the most likely real-world harm and
   the one with legal weight. Get written consent per family and record it.
4. **The privacy and cookies pages being wrong.** They are templates and still
   need reading against what the school actually does with data.

Items 3 and 4 deserve more of the school's attention than anything on the
technical list, because the technical attack surface here is genuinely close to
zero — which is the main security advantage of a static site, and a good reason
to keep it that way.
