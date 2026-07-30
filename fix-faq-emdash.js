const fs = require('fs');
let c = fs.readFileSync('faq.html', 'utf8');

// Fix em dashes — replace with comma or restructure sentence
c = c.replace(/coaching \u2014 and coaching with Marcelo \u2014 is the right next\s+step\./,
  'coaching with Marcelo is the right next step.');

// Fix all remaining em dashes in FAQ
c = c.replace(/ \u2014 /g, ', ');
c = c.replace(/\u2014/g, ',');

// Fix contractions to formal language
c = c.replace(/It's a no-obligation/g, 'It is a no-obligation');
c = c.replace(/it's /g, 'it is ');
c = c.replace(/you'll /g, 'you will ');
c = c.replace(/they'll /g, 'they will ');
c = c.replace(/don't /g, 'do not ');
c = c.replace(/doesn't /g, 'does not ');
c = c.replace(/isn't /g, 'is not ');
c = c.replace(/aren't /g, 'are not ');
c = c.replace(/can't /g, 'cannot ');
c = c.replace(/won't /g, 'will not ');
c = c.replace(/I'm /g, 'I am ');
c = c.replace(/you're /g, 'you are ');
c = c.replace(/we're /g, 'we are ');
c = c.replace(/there's /g, 'there is ');
c = c.replace(/that's /g, 'that is ');

fs.writeFileSync('faq.html', c, 'utf8');
console.log('Done');

// Verify no em dashes remain
const emdash = c.includes('\u2014');
console.log('Em dashes remaining:', emdash);
