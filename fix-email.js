const fs = require('fs');

const OLD = 'mmarques0365@gmail.com';
const NEW = 'marcelomarquescoaching.com@gmail.com';

const files = fs.readdirSync('.').filter(f =>
  f.endsWith('.html') &&
  !['index-draft.html', 'index-final.html'].includes(f)
);

let totalFixed = 0;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes(OLD)) {
    c = c.split(OLD).join(NEW);
    fs.writeFileSync(file, c, 'utf8');
    totalFixed++;
    console.log('Fixed:', file);
  }
});

console.log(`\nTotal files updated: ${totalFixed}`);
console.log('New email:', NEW);
