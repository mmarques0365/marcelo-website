// Fix 4a: Remove duplicate Article schema from blog posts — keep BlogPosting only
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const blogFiles = fs.readdirSync(dir).filter(f => f.startsWith('blog-') && f.endsWith('.html'));

let fixed = 0;

for (const file of blogFiles) {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Find all JSON-LD script blocks
  const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  const scripts = [];
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    scripts.push({ full: match[0], content: match[1] });
  }

  let changed = false;
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.content);
      // Remove if @type is "Article" (we keep BlogPosting)
      if (data['@type'] === 'Article') {
        html = html.replace(script.full, '<!-- Article schema removed: BlogPosting schema retained -->');
        changed = true;
        console.log(`Removed Article schema from: ${file}`);
      }
    } catch(e) {
      // skip malformed JSON
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    fixed++;
  }
}

console.log(`\nBlog schema fixed in ${fixed} files.`);
