const fs = require('fs');

// ── HELPER ───────────────────────────────────────────────────────────────────
function fix(file, fn) {
  if (!fs.existsSync(file)) { console.log('SKIP (not found):', file); return; }
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;
  c = fn(c);
  if (c !== orig) { fs.writeFileSync(file, c, 'utf8'); console.log('Fixed:', file); }
  else { console.log('No change:', file); }
}

const FAVICON = '<link rel="icon" href="images/favicon.png" type="image/png" />';
const CANONICAL_BASE = 'https://marcelomarquescoaching.com';

const FOOTER_STANDARD = 'Remission coaching for cancer survivors navigating life after treatment. Based in North Finchley, London. Available online across the UK.';

const allPages = [
  'index.html','about.html','services.html','faq.html','testimonials.html',
  'blog.html','book-now.html','contact.html','free-guide.html','workbook.html',
  'privacy-policy.html','terms.html','thank-you.html','free-guide-thank-you.html',
  'blog-the-day-i-stopped-pretending.html','blog-hidden-challenges-of-remission.html',
  'blog-post-traumatic-growth.html','blog-returning-to-work.html',
  'blog-five-habits-inner-strength.html','blog-rediscovering-identity.html',
  'blog-what-is-remission-coaching.html','blog-feeling-lost-after-cancer-treatment.html'
];

// ── 1. ADD FAVICON TO ALL PAGES ──────────────────────────────────────────────
allPages.forEach(file => {
  fix(file, c => {
    if (c.includes('rel="icon"')) return c; // already has it
    return c.replace('</head>', `  ${FAVICON}\n</head>`);
  });
});

// ── 2. ADD CANONICAL TO FREE-GUIDE AND WORKBOOK ──────────────────────────────
fix('free-guide.html', c => {
  if (c.includes('rel="canonical"')) return c;
  return c.replace('</head>', `  <link rel="canonical" href="${CANONICAL_BASE}/free-guide" />\n</head>`);
});
fix('workbook.html', c => {
  if (c.includes('rel="canonical"')) return c;
  return c.replace('</head>', `  <link rel="canonical" href="${CANONICAL_BASE}/workbook" />\n</head>`);
});

// ── 3. STANDARDIZE FOOTER DESCRIPTION ───────────────────────────────────────
const oldFooters = [
  'Resilience and remission coaching for professionals navigating life\'s greatest challenges and life after cancer treatment.',
  'Remission coaching for cancer survivors and organisations navigating life after cancer treatment. Based in London, available online across the UK.',
  'Remission coaching for cancer survivors navigating life after treatment.'
];
allPages.forEach(file => {
  fix(file, c => {
    oldFooters.forEach(old => { c = c.split(old).join(FOOTER_STANDARD); });
    return c;
  });
});

// ── 4. ABOUT PAGE — CREDENTIALS TO FIRST PERSON ──────────────────────────────
fix('about.html', c => {
  c = c.replace('Marcelo holds recognised qualifications in coaching and continues to invest in his\n      professional development to provide the highest standard of support.',
    'I hold recognised qualifications in coaching and continue to invest in my professional development to provide the highest standard of support.');
  return c;
});

// ── 5. FAQ — STANDARDIZE TO THIRD PERSON (fix the one first-person slip) ─────
fix('faq.html', c => {
  c = c.replace("I ask for 48 hours' notice so I can offer that slot to someone else. I know",
    "Marcelo asks for 48 hours' notice so that slot can be offered to someone else. He knows");
  // Fix stray space-comma from em-dash swap
  c = c.replace('navigate adversity ,', 'navigate adversity,');
  c = c.replace('brings its own set of challenges ,', 'brings its own set of challenges,');
  return c;
});

// ── 6. STRAY SPACE BEFORE PERIOD IN BLOG POSTS AND CONTACT ───────────────────
const blogAndContact = [
  'contact.html',
  'blog-the-day-i-stopped-pretending.html','blog-hidden-challenges-of-remission.html',
  'blog-post-traumatic-growth.html','blog-returning-to-work.html',
  'blog-five-habits-inner-strength.html','blog-rediscovering-identity.html',
  'blog-what-is-remission-coaching.html','blog-feeling-lost-after-cancer-treatment.html'
];
blogAndContact.forEach(file => {
  fix(file, c => {
    // Fix "discovery call ." pattern
    c = c.replace(/ \./g, '.');
    return c;
  });
});

// ── 7. SERVICES — FIX BEST VALUE / MOST POPULAR LABELS ───────────────────────
fix('services.html', c => {
  // 6 sessions: Most Popular (correct — keep)
  // 9 sessions: Best Value (correct per-session price — keep)
  // The audit said Best Value is on wrong tier. Let's check: 9 sessions at £60/session IS cheaper per session
  // So Best Value on 9 sessions IS correct. But the audit says 6 sessions is tagged Best Value?
  // From our search: 6 sessions = "Most Popular", 9 sessions = "Best Value" — this IS correct.
  // The audit may have misread. Leave as is but verify copy.
  return c;
});

console.log('\nAll fixes applied.');
