const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') &&
  !['index-draft.html','index-final.html'].includes(f));

let fixed = 0;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  const original = c;

  // Remove LinkedIn anchor tags (both variations)
  c = c.replace(/<a href="#" aria-label="LinkedIn"[^>]*>in<\/a>/g, '');
  c = c.replace(/<a href="#" aria-label="LinkedIn" title="LinkedIn">in<\/a>/g, '');

  // Fix en dashes in session hours
  c = c.replace(/Monday \u2013 Friday/g, 'Monday to Friday');
  c = c.replace(/9am \u2013 8pm/g, '9am to 8pm');

  if (c !== original) {
    fs.writeFileSync(file, c, 'utf8');
    fixed++;
    console.log('Fixed:', file);
  }
});

console.log('Total fixed:', fixed);
