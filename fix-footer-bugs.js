const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix 1: Remove duplicated footer sentence
  const duplicated = 'Based in North Finchley, London. Available online across the UK. Based in North Finchley, London. Available online across the UK.';
  const fixed = 'Based in North Finchley, London. Available online across the UK.';
  if (html.includes(duplicated)) {
    html = html.split(duplicated).join(fixed);
    changed = true;
    console.log(`Fixed duplicate text in: ${file}`);
  }

  // Fix 2: Replace wrong email in footer links
  const wrongEmail = 'marcelomarquescoaching.com@gmail.com';
  const rightEmail = 'hello@marcelomarquescoaching.com';
  if (html.includes(`mailto:${wrongEmail}`)) {
    html = html.split(`mailto:${wrongEmail}`).join(`mailto:${rightEmail}`);
    html = html.split(`>${wrongEmail}<`).join(`>${rightEmail}<`);
    changed = true;
    console.log(`Fixed email in: ${file}`);
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    fixedCount++;
  }
});

console.log(`\nDone. Fixed ${fixedCount} file(s).`);
