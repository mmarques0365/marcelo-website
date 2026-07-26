const fs = require('fs');

// Fix all page titles and meta tags with broken "" characters across all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && 
  !['index-draft.html','index-final.html'].includes(f));

let fixed = 0;
files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  const original = c;

  // Fix title tags with ""
  c = c.replace(/<title>([^<]*?)""([^<]*?)<\/title>/g, (match, before, after) => {
    return `<title>${before.trim()} - ${after.trim()}</title>`;
  });

  // Fix og:title with ""
  c = c.replace(/content="([^"]*?)""([^"]*?)"/g, (match, before, after) => {
    return `content="${before.trim()} - ${after.trim()}"`;
  });

  // Fix any remaining "" in meta content attributes
  c = c.replace(/""/g, '-');

  if (c !== original) {
    fs.writeFileSync(file, c, 'utf8');
    fixed++;
    console.log('Fixed:', file);
  }
});
console.log('Total fixed:', fixed);
