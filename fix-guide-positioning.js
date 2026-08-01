const fs = require('fs');

// ── 1. FREE GUIDE PAGE ───────────────────────────────────────────────────────
let fg = fs.readFileSync('free-guide.html', 'utf8');

// Update title and meta
fg = fg.replace(
  '<title>Free Guide | Marcelo Marques Coaching</title>',
  '<title>Free Guide: Understanding the Remission Gap | Marcelo Marques Coaching</title>'
);
fg = fg.replace(
  'content="A free practical guide for cancer survivors navigating life after treatment. Download 5 Steps to Rebuild Your Life After Cancer by Marcelo Marques."',
  'content="A free guide for cancer survivors navigating life after treatment. Understand the Remission Gap and begin moving forward. By Marcelo Marques, Remission Coach."'
);

// Update H1
fg = fg.replace(
  '<h1>5 Steps to Rebuild Your Life<br>After Cancer</h1>',
  '<h1>Understanding the Remission Gap<br><span style="font-size:0.65em;opacity:0.85;">A Free Guide for Cancer Survivors</span></h1>'
);

// Update the workbook link at the bottom to be clearer
fg = fg.replace(
  '<strong>Want to go deeper than these 5 steps?</strong><br><br>\n      This guide is a starting point. The <a href="workbook.html" \n      style="color:#5C3317;font-weight:700;">5 Steps Workbook</a> takes each step further with personal notes, \n      guided exercises, and a commitment section &mdash; so you actually work through the change, not just read \n      about it.',
  '<strong>Ready to do the deeper work?</strong><br><br>\n      This guide helps you understand what you are going through. When you are ready to work through it, <a href="workbook.html" \n      style="color:#5C3317;font-weight:700;">The Fuller Life Workbook</a> is your next step. Exercises, reflection, personal notes from Marcelo, and a coaching experience you work through at your own pace.'
);

fs.writeFileSync('free-guide.html', fg, 'utf8');
console.log('free-guide.html updated');

// ── 2. WORKBOOK PAGE ─────────────────────────────────────────────────────────
let wb = fs.readFileSync('workbook.html', 'utf8');

// Update title
wb = wb.replace(
  '<title>5 Steps Workbook | Marcelo Marques Coaching</title>',
  '<title>The Fuller Life Workbook | Marcelo Marques Coaching</title>'
);

// Update meta description
wb = wb.replace(
  /content="[^"]*workbook[^"]*"/i,
  'content="A coaching experience in a document. The Fuller Life Workbook helps cancer survivors rebuild identity, purpose, and confidence after treatment. By Marcelo Marques, Remission Coach."'
);

// Update H1/product name references
wb = wb.replace(/5 Steps Workbook — Personal Edition/g, 'The Fuller Life Workbook');
wb = wb.replace(/5 Steps Workbook/g, 'The Fuller Life Workbook');

// Add a "came from the free guide?" line near the top of the product description
wb = wb.replace(
  'A guided workbook to help you move from surviving to fully living',
  'The coaching experience that comes after the free guide.\nA guided workbook to help you move from surviving to fully living'
);

fs.writeFileSync('workbook.html', wb, 'utf8');
console.log('workbook.html updated');

// ── 3. FREE GUIDE THANK YOU PAGE ─────────────────────────────────────────────
let ty = fs.readFileSync('free-guide-thank-you.html', 'utf8');

// Update workbook reference on thank-you page if it exists
ty = ty.replace(/5 Steps Workbook/g, 'The Fuller Life Workbook');
ty = ty.replace(/5 Steps to Rebuild/g, 'Understanding the Remission Gap');

fs.writeFileSync('free-guide-thank-you.html', ty, 'utf8');
console.log('free-guide-thank-you.html updated');

// ── 4. HOMEPAGE ──────────────────────────────────────────────────────────────
let idx = fs.readFileSync('index.html', 'utf8');

// Update any workbook references
idx = idx.replace(/5 Steps Workbook/g, 'The Fuller Life Workbook');
idx = idx.replace(/5 Steps to Rebuild Your Life After Cancer/g, 'Understanding the Remission Gap');

fs.writeFileSync('index.html', idx, 'utf8');
console.log('index.html updated');

console.log('\nAll done. Verify no "5 Steps" naming conflicts remain.');
