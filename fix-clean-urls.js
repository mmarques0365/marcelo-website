const fs = require('fs');

const pages = [
  'index.html','about.html','services.html','faq.html','testimonials.html',
  'blog.html','book-now.html','contact.html','free-guide.html','workbook.html',
  'privacy-policy.html','terms.html','thank-you.html','free-guide-thank-you.html',
  'blog-the-day-i-stopped-pretending.html','blog-hidden-challenges-of-remission.html',
  'blog-post-traumatic-growth.html','blog-returning-to-work.html',
  'blog-five-habits-inner-strength.html','blog-rediscovering-identity.html',
  'blog-what-is-remission-coaching.html','blog-feeling-lost-after-cancer-treatment.html'
];

// Map of .html filenames to clean URLs
const cleanMap = {
  'index.html': '/',
  'about.html': '/about',
  'services.html': '/services',
  'faq.html': '/faq',
  'testimonials.html': '/testimonials',
  'blog.html': '/blog',
  'book-now.html': '/book-now',
  'contact.html': '/contact',
  'free-guide.html': '/free-guide',
  'workbook.html': '/workbook',
  'privacy-policy.html': '/privacy-policy',
  'terms.html': '/terms',
  'thank-you.html': '/thank-you',
  'free-guide-thank-you.html': '/free-guide-thank-you',
  'blog-the-day-i-stopped-pretending.html': '/blog-the-day-i-stopped-pretending',
  'blog-hidden-challenges-of-remission.html': '/blog-hidden-challenges-of-remission',
  'blog-post-traumatic-growth.html': '/blog-post-traumatic-growth',
  'blog-returning-to-work.html': '/blog-returning-to-work',
  'blog-five-habits-inner-strength.html': '/blog-five-habits-inner-strength',
  'blog-rediscovering-identity.html': '/blog-rediscovering-identity',
  'blog-what-is-remission-coaching.html': '/blog-what-is-remission-coaching',
  'blog-feeling-lost-after-cancer-treatment.html': '/blog-feeling-lost-after-cancer-treatment'
};

let totalFixed = 0;

pages.forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;

  // Replace href="filename.html" with href="clean-url" in nav links and internal links
  // But NOT in canonical tags, og:url, sitemap, or redirect values (those need full URLs)
  Object.entries(cleanMap).forEach(([htmlFile, cleanUrl]) => {
    if (htmlFile === 'index.html') {
      // index.html links -> just use the base or /
      c = c.replace(new RegExp(`href="${htmlFile}"`, 'g'), 'href="/"');
    } else {
      // Replace href="page.html" with href="/page" (clean relative)
      c = c.replace(new RegExp(`href="${htmlFile}"`, 'g'), `href="${cleanUrl}"`);
    }
  });

  if (c !== orig) {
    fs.writeFileSync(file, c, 'utf8');
    totalFixed++;
    console.log('Fixed:', file);
  }
});

console.log(`\nTotal files updated: ${totalFixed}`);
