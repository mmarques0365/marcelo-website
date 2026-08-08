const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let fixed = 0;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;

  // Remove .html from canonical tags only (not other links)
  c = c.replace(
    /(<link rel="canonical" href="https:\/\/marcelomarquescoaching\.com\/[^"]*?)\.html(")/g,
    '$1$2'
  );

  if (c !== orig) {
    fs.writeFileSync(file, c, 'utf8');
    fixed++;
    console.log('Fixed:', file);
  }
});

console.log(`\nTotal fixed: ${fixed}`);
