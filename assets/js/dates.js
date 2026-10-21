/* ==========================================================================
   DW Dance — dates
   Reads /dates.txt (edited by the site owner) and draws the term-dates
   section on classes.html and the "Coming up" strip on index.html.
   Past dates drop off automatically. Owner check mode: classes.html#check-dates
   No dependencies. The parser is also exported for the Node tests.
   ========================================================================== */
(function () {
  'use strict';

  var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                     'August', 'September', 'October', 'November', 'December'];
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var DAY_MS = 864e5;

  /* -------------------------------------------------------------- parsing */

  // "Sat 14 Nov 2026", "Saturday 14th November 2026", "14/11/2026", "14-11-26"
  // → local-midnight Date, or null if it isn't a real calendar date.
  function parseDate(text) {
    var s = String(text).toLowerCase().replace(/,/g, ' ').trim()
      .replace(/^(mon|tue|wed|thu|fri|sat|sun)[a-z]*\.?\s+/, '');
    var d, m, y, match;

    if ((match = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2}|\d{4})$/))) {
      d = +match[1]; m = +match[2] - 1; y = +match[3];
    } else if ((match = s.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]+)\.?\s+(\d{2}|\d{4})$/))) {
      d = +match[1]; m = MONTHS.indexOf(match[2].slice(0, 3)); y = +match[3];
      // The word must be the month or a short form of it ("Nov", "Sept").
      if (m >= 0 && MONTH_NAMES[m].toLowerCase().indexOf(match[2]) !== 0 && match[2] !== 'sept') m = -1;
    } else {
      return null;
    }
    if (y < 100) y += 2000;
    if (m < 0 || m > 11) return null;
    var date = new Date(y, m, d);
    return date.getDate() === d && date.getMonth() === m ? date : null;
  }

  // "Sat 24 Oct 2026 to Sat 31 Oct 2026" → { start, end }. A single date
  // gives start === end. Throws a readable message for check mode.
  function parseRange(text) {
    var parts = String(text).split(/\s+(?:to|until|-|–|—)\s+/i);
    if (parts.length > 2) throw new Error('"' + text + '" has more than one "to" in it');
    var start = parseDate(parts[0]);
    if (!start) throw new Error('Date "' + parts[0].trim() + '" not recognised. Try writing it like Sat 14 Nov 2026');
    var end = parts[1] ? parseDate(parts[1]) : start;
    if (!end) throw new Error('Date "' + parts[1].trim() + '" not recognised. Try writing it like Sat 14 Nov 2026');
    if (end < start) throw new Error('"' + text + '" ends before it starts');
    return { start: start, end: end };
  }

  var KEY_ALIASES = {
    term: 'term', closed: 'closed', closure: 'closed', holiday: 'closed',
    competition: 'competition',
    starts: 'starts', start: 'starts', ends: 'ends', end: 'ends',
    'half term': 'halfterm', halfterm: 'halfterm', 'half-term': 'halfterm',
    date: 'date', dates: 'date', reason: 'reason', venue: 'venue', where: 'venue',
    who: 'who', notes: 'notes', note: 'notes'
  };

  // Turns the whole text file into { terms, closures, competitions, errors }.
  // Each term also gives a "Back to class" item; see listItems().
  // A block that can't be read is skipped and reported, never fatal.
  function parse(text) {
    var out = { terms: [], closures: [], competitions: [], errors: [] };
    var blocks = [], current = null;

    String(text).replace(/\r\n?/g, '\n').split('\n').forEach(function (raw, i) {
      var line = raw.trim();
      if (line.charAt(0) === '#') return;
      if (!line) { current = null; return; }
      var colon = line.indexOf(':');
      var label = colon > 0 ? line.slice(0, colon).trim().toLowerCase().replace(/\s+/g, ' ') : '';
      var key = colon > 0 ? KEY_ALIASES[label] || label : null;
      // A Term:/Closed:/Competition: line always starts a new block, so a
      // forgotten blank line between two entries does no harm.
      if (!current || /^(term|closed|competition)$/.test(key)) {
        current = { line: i + 1, fields: [] };
        blocks.push(current);
      }
      current.fields.push(key ? { key: key, label: line.slice(0, colon).trim(), value: line.slice(colon + 1).trim(), line: i + 1 }
                              : { key: null, value: line, line: i + 1 });
    });

    blocks.forEach(function (block) {
      try {
        readBlock(block, out);
      } catch (err) {
        out.errors.push({ line: block.line, message: err.message });
      }
    });

    out.closures.sort(byStart);
    out.competitions.sort(byStart);
    out.terms.sort(byStart);
    return out;
  }

  function readBlock(block, out) {
    var first = block.fields[0];
    var f = {};
    block.fields.forEach(function (field) {
      if (!field.key) throw new Error('Line ' + field.line + ' "' + field.value + '" needs a label and a colon, like Date: Sat 14 Nov 2026');
      if (field !== first && !/^(starts|ends|halfterm|date|reason|venue|who|notes)$/.test(field.key)) {
        throw new Error('Line ' + field.line + ': "' + field.label + ':" is not a label this file understands');
      }
      f[field.key] = field.value;
    });

    if (first.key === 'term') {
      if (!f.starts || !f.ends) throw new Error('Term "' + first.value + '" needs both a Starts: and an Ends: line');
      var term = { title: first.value || 'Term', start: parseRange(f.starts).start, end: parseRange(f.ends).end };
      if (term.end < term.start) throw new Error('Term "' + term.title + '" ends before it starts');
      out.terms.push(term);
      if (f.halfterm) {
        var half = parseRange(f.halfterm);
        out.closures.push({ type: 'closed', title: 'Half term', start: half.start, end: half.end, fromTerm: term.title });
      }
    } else if (first.key === 'closed') {
      var when = parseRange(first.value || f.date || '');
      out.closures.push({ type: 'closed', title: f.reason || 'Studio closed', start: when.start, end: when.end });
    } else if (first.key === 'competition') {
      if (!first.value) throw new Error('Competition on line ' + first.line + ' needs a name after "Competition:"');
      if (!f.date) throw new Error('Competition "' + first.value + '" needs a Date: line');
      var day = parseRange(f.date);
      out.competitions.push({ type: 'competition', title: first.value, start: day.start, end: day.end,
                              venue: f.venue || '', who: f.who || '', notes: f.notes || '' });
    } else {
      throw new Error('Line ' + first.line + ' should start with Term:, Closed: or Competition:');
    }
  }

  function byStart(a, b) { return a.start - b.start; }

  /* ------------------------------------------------------------ the model */

  function midnight(date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); }
  function upcoming(list, today) { return list.filter(function (x) { return x.end >= today; }); }

  // What the "Holidays & Closures" list shows: the closures plus a "Back to
  // class" line for each term start, so parents see when classes resume.
  function listItems(data, today) {
    var returns = data.terms.map(function (t) {
      return { type: 'return', title: 'Back to class', start: t.start, end: t.start, note: t.title + ' starts' };
    });
    return upcoming(data.closures.concat(returns), today).sort(byStart);
  }
  function within(list, day) {
    for (var i = 0; i < list.length; i++) if (day >= list[i].start && day <= list[i].end) return list[i];
    return null;
  }
  function nextSaturday(today) { return new Date(today.getTime() + ((6 - today.getDay() + 7) % 7) * DAY_MS); }
  function addDays(date, n) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n); }

  // The first Saturday on or after `from` that is in a term (if any terms are
  // listed) and not in a closure. Null if none within the next year.
  function nextClassDay(data, from) {
    for (var sat = nextSaturday(from), i = 0; i < 53; i++, sat = addDays(sat, 7)) {
      if (within(data.closures, sat)) continue;
      if (data.terms.length && !within(data.terms, sat)) continue;
      return sat;
    }
    return null;
  }

  // What the banner says about the coming Saturday. Null = hide the banner.
  function nextUp(data, now) {
    var today = midnight(now);
    var sat = nextSaturday(today);
    var label = sat.getTime() === today.getTime() ? 'Today' : 'This Saturday';
    var closure = within(data.closures, sat);

    if (closure) {
      var back = nextClassDay(data, addDays(closure.end, 1));
      return { label: label, date: sat, kind: 'closed', title: 'No classes — ' + closure.title,
               text: 'We are closed ' + formatWhen(closure, today) + '.',
               strong: back ? 'Classes return on ' + formatLong(back, today) + '.' : '' };
    }
    if (data.terms.length && !within(data.terms, sat)) {
      var restart = nextClassDay(data, sat);
      if (!restart) return null;
      return { label: 'Next term', date: restart, kind: 'closed', title: 'Classes return ' + formatLong(restart, today),
               text: 'There are no classes until then. Enjoy the break!', strong: '' };
    }
    var comp = within(data.competitions, sat);
    var nextBreak = upcoming(data.closures, today)[0];
    return { label: label, date: sat, kind: 'open', title: 'Classes as normal',
             text: comp ? 'Good luck to everyone dancing at ' + comp.title + '!'
                        : nextBreak ? 'Next break: ' + nextBreak.title + ', from ' + formatShort(nextBreak.start, today) + '.' : '',
             strong: '' };
  }

  /* ----------------------------------------------------------- formatting */

  function yearSuffix(date, today) { return date.getFullYear() !== today.getFullYear() ? ' ' + date.getFullYear() : ''; }
  function formatLong(date, today) {
    return DAY_NAMES[date.getDay()] + ' ' + date.getDate() + ' ' + MONTH_NAMES[date.getMonth()] + yearSuffix(date, today);
  }
  function formatShort(date, today) {
    return DAY_NAMES[date.getDay()].slice(0, 3) + ' ' + date.getDate() + ' ' + MONTH_NAMES[date.getMonth()].slice(0, 3) + yearSuffix(date, today);
  }
  function formatWhen(item, today) {
    if (item.start.getTime() === item.end.getTime()) return formatLong(item.start, today);
    return formatShort(item.start, today) + ' – ' + formatShort(item.end, today);
  }

  // Short form for tight spaces: "Sat 21 Nov", "Sat 24 – 31 Oct", "Sat 19 Dec – 2 Jan".
  function formatCompact(item) {
    var a = item.start, b = item.end, mon = function (d) { return MONTH_NAMES[d.getMonth()].slice(0, 3); };
    var first = DAY_NAMES[a.getDay()].slice(0, 3) + ' ' + a.getDate();
    if (a.getTime() === b.getTime()) return first + ' ' + mon(a);
    if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) return first + ' – ' + b.getDate() + ' ' + mon(b);
    return first + ' ' + mon(a) + ' – ' + b.getDate() + ' ' + mon(b);
  }

  var api = { parse: parse, parseDate: parseDate, parseRange: parseRange, nextUp: nextUp,
              upcoming: upcoming, listItems: listItems, formatWhen: formatWhen,
              formatCompact: formatCompact };

  if (typeof module === 'object' && module.exports) { module.exports = api; return; }

  /* ------------------------------------------------------------ rendering */
  // Built with textContent only: nothing typed into dates.txt is ever
  // treated as HTML.

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
    return parent;
  }

  var KIND = { closed: 'closed', competition: 'comp', 'return': 'return' };

  function tile(date, kind) {
    var t = el('span', 'date-tile' + (kind ? ' date-tile--' + kind : ''));
    t.setAttribute('aria-hidden', 'true');
    return add(t, el('span', 'date-tile__day', String(date.getDate())),
                  el('span', 'date-tile__month', MONTH_NAMES[date.getMonth()].slice(0, 3)));
  }

  function meta(rows) {
    var dl = el('dl', 'date-item__meta');
    rows.forEach(function (r) { if (r[1]) add(dl, add(el('div'), el('dt', null, r[0]), el('dd', null, r[1]))); });
    return dl.children.length ? dl : null;
  }

  function renderList(list, items, empty, today) {
    list.textContent = '';
    if (!items.length) { add(list, el('li', 'dates-empty', empty)); return; }
    items.forEach(function (item) {
      var isComp = item.type === 'competition';
      var when = (item.note ? item.note + ' · ' : '') + formatWhen(item, today);
      var body = add(el('div'), el('p', 'date-item__title', item.title), el('p', 'date-item__when', when));
      if (isComp) add(body, meta([['Venue', item.venue], ['Who', item.who]]), item.notes && el('p', 'date-item__note', item.notes));
      add(list, add(el('li', 'date-item'), tile(item.start, KIND[item.type]), body));
    });
  }

  function renderNextUp(box, data, now) {
    var info = nextUp(data, now);
    if (!info) { box.hidden = true; return; }
    box.textContent = '';
    box.className = 'next-up' + (info.kind === 'open' ? ' next-up--open' : '');
    var text = el('p', 'next-up__text', info.text ? info.text + (info.strong ? ' ' : '') : '');
    if (info.strong) add(text, el('strong', null, info.strong));
    add(box, tile(info.date), add(el('div'), el('p', 'next-up__label', info.label),
                                  el('p', 'next-up__title', info.title), text));
    box.hidden = false;
  }

  function renderComingUp(root, data, now) {
    var today = midnight(now);
    var items = listItems(data, today).concat(upcoming(data.competitions, today)).sort(byStart).slice(0, 3);
    if (!items.length) return;
    var list = root.querySelector('[data-dates="coming-up"]');
    items.forEach(function (item) {
      var sub = item.type === 'competition' ? item.venue || formatCompact(item)
              : item.type === 'return' ? item.note
              : 'No classes · ' + formatCompact(item);
      add(list, add(el('li', 'coming-up__item'), tile(item.start, KIND[item.type]),
                    add(el('div', 'coming-up__text'), el('strong', null, item.title), el('span', null, sub))));
    });
    root.hidden = false;
  }

  function renderCheck(root, data) {
    var box = root.querySelector('[data-dates="check"]');
    if (!box) return;
    var total = data.terms.length + data.closures.length + data.competitions.length;
    box.textContent = '';
    if (!data.errors.length) {
      box.className = 'alert alert--success';
      box.textContent = 'Date check: everything in dates.txt was read correctly (' + total + ' entries, including past ones).';
    } else {
      box.className = 'alert alert--error';
      add(box, el('p', null, 'Date check: ' + data.errors.length + ' part(s) of dates.txt could not be read and are not shown on the site:'));
      var ul = add(box, el('ul', 'date-check__list'));
      data.errors.forEach(function (e) { add(ul, el('li', null, 'Block starting on line ' + e.line + ': ' + e.message)); });
    }
    box.hidden = false;
    box.scrollIntoView();
  }

  function render(data) {
    var now = new Date();
    var today = midnight(now);
    var section = document.querySelector('[data-dates="section"]');
    if (section) {
      renderNextUp(section.querySelector('[data-dates="next-up"]'), data, now);
      renderList(section.querySelector('[data-dates="closures"]'), listItems(data, today),
                 'No holidays or closures coming up — classes are running as normal.', today);
      renderList(section.querySelector('[data-dates="competitions"]'), upcoming(data.competitions, today),
                 'No competitions coming up just now. Dates will appear here as soon as they are confirmed.', today);
      section.classList.add('is-loaded');
      if (window.location.hash === '#check-dates') renderCheck(section, data);
    }
    var strip = document.querySelector('[data-dates="strip"]');
    if (strip) renderComingUp(strip, data, now);
  }

  function failed() {
    var section = document.querySelector('[data-dates="section"]');
    if (section) section.classList.add('is-failed');
  }

  if (!document.querySelector('[data-dates]')) return;
  if (!window.fetch) { failed(); return; }
  window.fetch('dates.txt', { cache: 'no-cache' })
    .then(function (res) { if (!res.ok) throw new Error('dates.txt: HTTP ' + res.status); return res.text(); })
    .then(function (text) {
      var data = parse(text);
      if (data.errors.length && window.console) {
        console.warn('dates.txt: some entries could not be read. Open classes.html#check-dates for details.', data.errors);
      }
      render(data);
    })
    .catch(function (err) { if (window.console) console.error(err); failed(); });
}());
