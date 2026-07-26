const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && 
  !['index-draft.html','index-final.html'].includes(f));

let fixed = 0;
files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  const original = c;

  // Find and replace the specific unicode characters in title/meta tags
  // The "" appearing is U+201C U+201D (smart quotes) or similar
  // Let's replace ALL non-ASCII in title tags with a hyphen
  c = c.replace(/<title>([^<]*)<\/title>/g, (match, content) => {
    const cleaned = content.replace(/[^\x20-\x7E]/g, '-').replace(/-+/g, ' - ').trim();
    return `<title>${cleaned}</title>`;
  });

  // Fix content attributes in meta tags  
  c = c.replace(/content="([^"]*)"/g, (match, content) => {
    const cleaned = content.replace(/[^\x20-\x7E]/g, '');
    return `content="${cleaned}"`;
  });

  if (c !== original) {
    fs.writeFileSync(file, c, 'utf8');
    fixed++;
    console.log('Fixed:', file);
  }
});
console.log('Total fixed:', fixed);

// Verify about.html title
const about = fs.readFileSync('about.html', 'utf8');
const titleMatch = about.match(/<title>[^<]*<\/title>/);
console.log('About title now:', titleMatch ? titleMatch[0] : 'not found');
