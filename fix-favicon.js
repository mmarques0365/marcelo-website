const fs = require('fs');

const files = [
  'index.html','about.html','services.html','faq.html','testimonials.html',
  'book-now.html','contact.html','privacy-policy.html','terms.html','blog.html',
  'blog-feeling-lost-after-cancer-treatment.html','blog-five-habits-inner-strength.html',
  'blog-hidden-challenges-of-remission.html','blog-post-traumatic-growth.html',
  'blog-rediscovering-identity.html','blog-returning-to-work.html',
  'blog-the-day-i-stopped-pretending.html','blog-what-is-remission-coaching.html',
  'thank-you.html','free-guide-thank-you.html'
];

const anchor = '<link rel="stylesheet" href="style.css" />';
const favicon = '  <link rel="icon" href="images/logo.png" type="image/png" />';

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('rel="icon"')) {
    console.log(`${file}: already has favicon, skipped`);
    continue;
  }
  if (!html.includes(anchor)) {
    console.log(`${file}: ANCHOR NOT FOUND — manual fix needed`);
    continue;
  }
  html = html.replace(anchor, anchor + '\n' + favicon);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`${file}: favicon added`);
}
