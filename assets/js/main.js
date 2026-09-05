/* ==========================================================================
   DWD Dance — site behaviour
   Vanilla ES5-safe-ish ES2015. No dependencies. Deferred load.
   Everything degrades gracefully if JS is unavailable.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- utils */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ----------------------------------------------- 1. Mobile navigation */
  (function nav() {
    var toggle = $('.nav-toggle');
    var menu   = $('#site-nav');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.setAttribute('data-open', String(open));
      $('.nav-toggle__label', toggle).textContent = open ? 'Close' : 'Menu';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close on Escape, on outside click, and when a link is chosen.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    // Reset state when we cross into the desktop breakpoint.
    var mq = window.matchMedia('(min-width: 62em)');
    var onChange = function () { if (mq.matches) setOpen(false); };
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
  }());

  /* --------------------------------------------- 2. Header shadow on scroll */
  (function headerScroll() {
    var header = $('.site-header');
    if (!header) return;
    var ticking = false;
    function update() {
      header.setAttribute('data-scrolled', String(window.scrollY > 8));
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }());

  /* ------------------------------------------------------- 3. Accordions */
  (function accordions() {
    $$('.accordion__btn').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        panel.hidden = open;
      });
    });

    // Deep-link support: /classes.html#faq-uniform opens that item.
    if (window.location.hash) {
      var target = document.getElementById(window.location.hash.slice(1));
      var btn = target && target.classList.contains('accordion__panel')
        ? document.querySelector('[aria-controls="' + target.id + '"]')
        : null;
      if (btn) { btn.setAttribute('aria-expanded', 'true'); target.hidden = false; }
    }
  }());

  /* -------------------------------------------- 4. Scroll reveal (subtle) */
  (function reveal() {
    var items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }());

  /* ------------------------------------------------- 5. Cookie notice bar */
  (function cookies() {
    var bar = $('#cookie-bar');
    if (!bar) return;
    var KEY = 'dwd-cookie-choice';
    var stored = null;
    try { stored = window.localStorage.getItem(KEY); } catch (e) { stored = 'skip'; }
    if (stored) return;                       // already answered (or storage blocked)

    bar.hidden = false;
    $$('[data-cookie-choice]', bar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        try { window.localStorage.setItem(KEY, btn.getAttribute('data-cookie-choice')); } catch (e) {}
        bar.hidden = true;
      });
    });
  }());

  /* ------------------------------------------------- 6. Enquiry form UX */
  (function form() {
    var form = $('#enquiry-form');
    if (!form) return;

    var status = $('#form-status');

    function fieldError(input, message) {
      var slot = document.getElementById(input.id + '-error');
      if (slot) slot.textContent = message || '';
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validate(input) {
      var value = (input.value || '').trim();
      if (input.hasAttribute('required') && !value) {
        fieldError(input, 'Please complete this field.');
        return false;
      }
      if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
        fieldError(input, 'Please tick to continue.');
        return false;
      }
      if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        fieldError(input, 'Please enter a valid email address.');
        return false;
      }
      if (input.type === 'tel' && value && value.replace(/[^0-9]/g, '').length < 10) {
        fieldError(input, 'Please enter a full UK phone number.');
        return false;
      }
      fieldError(input, '');
      return true;
    }

    $$('input, select, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { validate(input); });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      // Honeypot: silently drop bot submissions.
      var trap = $('#company-website', form);
      if (trap && trap.value) { e.preventDefault(); return; }

      var invalid = $$('input, select, textarea', form).filter(function (i) { return !validate(i); });
      if (invalid.length) {
        e.preventDefault();
        if (status) {
          status.hidden = false;
          status.className = 'alert alert--error';
          status.textContent = 'Please check the highlighted fields and try again.';
        }
        invalid[0].focus();
        return;
      }

      // No form handler configured yet → fall back to a pre-filled email.
      if (form.getAttribute('data-mode') === 'mailto') {
        e.preventDefault();
        var get = function (name) {
          var el = form.elements[name];
          return el ? (el.value || '').trim() : '';
        };
        var body = [
          'Parent/guardian name: ' + get('name'),
          'Email: ' + get('email'),
          'Phone: ' + get('phone'),
          "Child's first name: " + get('child_name'),
          "Child's age: " + get('child_age'),
          'Interested in: ' + get('interest'),
          'Preferred venue: ' + get('venue'),
          '',
          'Message:',
          get('message')
        ].join('\n');
        window.location.href = 'mailto:miss.bethany@dwdance.co.uk'
          + '?subject=' + encodeURIComponent('Class enquiry from ' + (get('name') || 'the website'))
          + '&body=' + encodeURIComponent(body);
        if (status) {
          status.hidden = false;
          status.className = 'alert alert--success';
          status.textContent = 'Opening your email app with the enquiry ready to send. '
            + 'If nothing happens, please email miss.bethany@dwdance.co.uk directly.';
        }
      }
    });
  }());

  /* ------------------------------- 7. Current year in the footer copyright */
  $$('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
}());
