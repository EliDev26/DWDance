// Tests for assets/js/dates.js — run with:  node --test tests/
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const dates = require('../assets/js/dates.js');

const ymd = (d) => [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');

test('parseDate accepts the formats the owner guide promises', () => {
  for (const s of ['Sat 14 Nov 2026', 'Saturday 14th November 2026', '14 Nov 2026', '14/11/2026',
                   '14-11-2026', '14.11.26', 'sat 14 nov 2026', '14 Sept 2026']) {
    const d = dates.parseDate(s);
    assert.ok(d, s);
  }
  assert.equal(ymd(dates.parseDate('Saturday 14th November 2026')), '2026-11-14');
  assert.equal(ymd(dates.parseDate('14.11.26')), '2026-11-14');
  assert.equal(ymd(dates.parseDate('5 Sept 2026')), '2026-9-5');
});

test('parseDate rejects dates that do not exist or are ambiguous', () => {
  for (const s of ['31 Sep 2026', '30/02/2027', '14 Nov', 'next Saturday', '14 Novem 2026x', '14 Notamonth 2026', '']) {
    assert.equal(dates.parseDate(s), null, s);
  }
});

test('parseRange handles single dates and "to" ranges', () => {
  const one = dates.parseRange('Sat 21 Nov 2026');
  assert.equal(one.start.getTime(), one.end.getTime());
  const r = dates.parseRange('Sat 19 Dec 2026 to Sat 2 Jan 2027');
  assert.equal(ymd(r.start), '2026-12-19');
  assert.equal(ymd(r.end), '2027-1-2');
  assert.throws(() => dates.parseRange('Sat 2 Jan 2027 to Sat 19 Dec 2026'), /ends before it starts/);
  assert.throws(() => dates.parseRange('31 Sept 2026'), /not recognised/);
});

const SAMPLE = `
# a note
Term: Autumn term
Starts: Sat 5 Sep 2026
Ends: Sat 12 Dec 2026
Half term: Sat 24 Oct 2026 to Sat 31 Oct 2026

Closed: Sat 21 Nov 2026
Reason: Studio maintenance
Competition: NATD Festival
Date: Sat 14 Nov 2026
Venue: Bolton
Notes: Arrive 9am

Term: Spring term
Starts: Sat 9 Jan 2027
Ends: Sat 27 Mar 2027

Closed: Sat 19 Dec 2026 to Sat 2 Jan 2027
Reason: Christmas holidays
`;

test('parse reads every block type, and a missing blank line does no harm', () => {
  const data = dates.parse(SAMPLE);
  assert.deepEqual(data.errors, []);
  assert.equal(data.terms.length, 2);
  assert.deepEqual(data.closures.map((c) => c.title), ['Half term', 'Studio maintenance', 'Christmas holidays']);
  assert.equal(data.competitions.length, 1);
  assert.equal(data.competitions[0].venue, 'Bolton');
  assert.equal(data.competitions[0].who, '');
  assert.equal(data.competitions[0].notes, 'Arrive 9am');
});

test('parse reports bad blocks with a line number and keeps the good ones', () => {
  const data = dates.parse(`Closed: 31 Sept 2026

Competition: Big Show

Term: Summer
Starts: Sat 17 Apr 2027

Holiday: Sat 1 May 2027

Closed: Sat 8 May 2027
Colour: pink

just some words

Closed: Sat 15 May 2027`);
  assert.equal(data.closures.length, 2); // "Holiday:" alias + the last one
  const lines = data.errors.map((e) => e.line);
  assert.deepEqual(lines, [1, 3, 5, 10, 13]);
  assert.match(data.errors[0].message, /not recognised/);
  assert.match(data.errors[1].message, /needs a Date/);
  assert.match(data.errors[2].message, /Starts: and an Ends:/);
  assert.match(data.errors[3].message, /Colour/);
  assert.match(data.errors[4].message, /needs a label and a colon/);
});

test('upcoming drops past items but keeps one that is still running', () => {
  const data = dates.parse(SAMPLE);
  const today = new Date(2026, 9, 26); // Mon 26 Oct, mid half term
  assert.deepEqual(dates.upcoming(data.closures, today).map((c) => c.title),
    ['Half term', 'Studio maintenance', 'Christmas holidays']);
  assert.deepEqual(dates.upcoming(data.closures, new Date(2026, 10, 22)).map((c) => c.title), ['Christmas holidays']);
});

test('listItems adds a "Back to class" line for each future term start', () => {
  const data = dates.parse(SAMPLE);
  const items = dates.listItems(data, new Date(2026, 9, 21));
  assert.deepEqual(items.map((i) => i.title + ' ' + ymd(i.start)), [
    'Half term 2026-10-24', 'Studio maintenance 2026-11-21', 'Christmas holidays 2026-12-19', 'Back to class 2027-1-9']);
  assert.equal(items[3].note, 'Spring term starts');
});

test('nextUp: a closed Saturday says when classes return', () => {
  const data = dates.parse(SAMPLE);
  const info = dates.nextUp(data, new Date(2026, 9, 21, 15, 30)); // Wed 21 Oct
  assert.equal(info.label, 'This Saturday');
  assert.equal(info.title, 'No classes — Half term');
  assert.equal(info.strong, 'Classes return on Saturday 7 November.');
});

test('nextUp: Christmas break skips to the new term in the next year', () => {
  const data = dates.parse(SAMPLE);
  const info = dates.nextUp(data, new Date(2026, 11, 19)); // Sat 19 Dec
  assert.equal(info.label, 'Today');
  assert.equal(info.strong, 'Classes return on Saturday 9 January 2027.');
});

test('nextUp: a normal week mentions the next break', () => {
  const data = dates.parse(SAMPLE);
  const info = dates.nextUp(data, new Date(2026, 10, 2)); // Mon 2 Nov
  assert.equal(info.title, 'Classes as normal');
  assert.equal(info.text, 'Next break: Studio maintenance, from Sat 21 Nov.');
});

test('nextUp: a competition Saturday wishes everyone luck', () => {
  const data = dates.parse(SAMPLE);
  assert.equal(dates.nextUp(data, new Date(2026, 10, 10)).text, 'Good luck to everyone dancing at NATD Festival!');
});

test('nextUp: between terms points to the next term, and hides when nothing is left', () => {
  const data = dates.parse(SAMPLE);
  const info = dates.nextUp(data, new Date(2027, 3, 1)); // after spring term
  assert.equal(info, null);
  const gap = dates.parse('Term: A\nStarts: 5 Sep 2026\nEnds: 12 Dec 2026\n\nTerm: B\nStarts: 9 Jan 2027\nEnds: 27 Mar 2027');
  const between = dates.nextUp(gap, new Date(2026, 11, 14));
  assert.equal(between.label, 'Next term');
  assert.equal(between.title, 'Classes return Saturday 9 January 2027');
});

test('exams are their own list, and closures can carry a note', () => {
  const data = dates.parse(`Exam: NATD examinations
Date: Sun 6th Dec 26
Venue: The studio
Closed: Mon 14 Dec 2026 to Sun 3 Jan 2027
Reason: Christmas holidays
Notes: Our last class before Christmas is Saturday 12 December.

Exam: No date`);
  assert.equal(data.exams.length, 1);
  assert.equal(data.exams[0].type, 'exam');
  assert.equal(ymd(data.exams[0].start), '2026-12-6');
  assert.equal(data.exams[0].venue, 'The studio');
  assert.equal(data.competitions.length, 0);
  assert.equal(data.closures[0].notes, 'Our last class before Christmas is Saturday 12 December.');
  assert.match(data.errors[0].message, /Exam "No date" needs a Date/);
});

test('with no terms listed, Christmas closure still gives the return date', () => {
  const data = dates.parse('Closed: Mon 14 Dec 2026 to Sun 3 Jan 2027\nReason: Christmas holidays');
  const info = dates.nextUp(data, new Date(2026, 11, 16)); // Wed 16 Dec
  assert.equal(info.title, 'No classes — Christmas holidays');
  assert.equal(info.strong, 'Classes return on Saturday 9 January 2027.');
});

test('formatCompact keeps dates short for the home strip', () => {
  const r = (a, b) => dates.formatCompact(dates.parseRange(b ? a + ' to ' + b : a));
  assert.equal(r('Sat 21 Nov 2026'), 'Sat 21 Nov');
  assert.equal(r('Sat 24 Oct 2026', 'Sat 31 Oct 2026'), 'Sat 24 – 31 Oct');
  assert.equal(r('Sat 19 Dec 2026', 'Sat 2 Jan 2027'), 'Sat 19 Dec – 2 Jan');
});

test('the shipped dates.txt reads cleanly', () => {
  const text = fs.readFileSync(path.join(__dirname, '..', 'dates.txt'), 'utf8');
  const data = dates.parse(text);
  assert.deepEqual(data.errors, []);
  assert.ok(data.closures.length && data.exams.length && data.competitions.length);
});
