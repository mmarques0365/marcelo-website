const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') &&
  !['index-draft.html', 'index-final.html'].includes(f));

const LINKEDIN_URL = 'https://www.linkedin.com/company/marcelomarquescoaching';

let fixed = 0;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  const original = c;

  // Restore the LinkedIn icon on the blank line left behind before each
  // Instagram link, now pointing at the real company page instead of "#".
  c = c.replace(
    /([ \t]*)\n([ \t]*)<a href="https:\/\/www\.instagram\.com\/marcelomcoaching\/"/g,
    `$1<a href="${LINKEDIN_URL}" aria-label="LinkedIn" target="_blank" rel="noopener">in</a>\n$2<a href="https://www.instagram.com/marcelomcoaching/"`
  );

  if (c !== original) {
    fs.writeFileSync(file, c, 'utf8');
    fixed++;
    console.log('Restored LinkedIn in:', file);
  }
});

console.log('Total files fixed:', fixed);
