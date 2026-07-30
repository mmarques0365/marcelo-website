const fs = require('fs');

// Only the files touched by this pass -- normalize their line endings to
// plain LF to match how they're stored in git, so the diff reflects the
// real content change instead of pre-existing CRLF/CR/LF drift.
const files = [
  'about.html',
  'blog-feeling-lost-after-cancer-treatment.html',
  'blog-five-habits-inner-strength.html',
  'blog-hidden-challenges-of-remission.html',
  'blog-post-traumatic-growth.html',
  'blog-rediscovering-identity.html',
  'blog-returning-to-work.html',
  'blog-the-day-i-stopped-pretending.html',
  'blog-what-is-remission-coaching.html',
  'blog.html',
  'book-now.html',
  'contact.html',
  'faq.html',
  'free-guide-thank-you.html',
  'index.html',
  'services.html',
  'testimonials.html',
  'thank-you.html',
];

files.forEach(file => {
  const buf = fs.readFileSync(file);
  let text = buf.toString('utf8');
  const original = text;

  // Normalize CRLF and lone CR to LF.
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    console.log('Normalized:', file);
  } else {
    console.log('Already clean:', file);
  }
});
