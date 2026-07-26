const fs = require('fs');

const titleFixes = {
  'about.html': 'About Marcelo Marques | Marcelo Marques Coaching',
  'services.html': 'Coaching Services | Marcelo Marques Coaching',
  'faq.html': 'Frequently Asked Questions | Marcelo Marques Coaching',
  'testimonials.html': 'Client Stories | Marcelo Marques Coaching',
  'contact.html': 'Contact | Marcelo Marques Coaching',
  'book-now.html': 'Book a Session | Marcelo Marques Coaching',
  'blog.html': 'Blog | Marcelo Marques Coaching',
  'free-guide.html': 'Free Guide | Marcelo Marques Coaching',
  'free-guide-thank-you.html': 'Thank You | Marcelo Marques Coaching',
  'thank-you.html': 'Thank You | Marcelo Marques Coaching',
  'workbook.html': '5 Steps Workbook | Marcelo Marques Coaching',
  'blog-the-day-i-stopped-pretending.html': 'The Day I Stopped Pretending | Marcelo Marques Coaching',
  'blog-hidden-challenges-of-remission.html': 'Hidden Challenges of Remission | Marcelo Marques Coaching',
  'blog-post-traumatic-growth.html': 'Post-Traumatic Growth | Marcelo Marques Coaching',
  'blog-returning-to-work.html': 'Returning to Work After Cancer | Marcelo Marques Coaching',
  'blog-five-habits-inner-strength.html': 'Five Habits for Inner Strength | Marcelo Marques Coaching',
  'blog-rediscovering-identity.html': 'Rediscovering Your Identity | Marcelo Marques Coaching',
  'blog-what-is-remission-coaching.html': 'What Is Remission Coaching | Marcelo Marques Coaching',
  'blog-feeling-lost-after-cancer-treatment.html': 'Feeling Lost After Cancer Treatment | Marcelo Marques Coaching'
};

Object.entries(titleFixes).forEach(([file, newTitle]) => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/<title>[^<]*<\/title>/, `<title>${newTitle}</title>`);
  fs.writeFileSync(file, c, 'utf8');
  console.log('Fixed title:', file);
});

console.log('All titles fixed');
