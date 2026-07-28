const fs = require('fs');

const OLD_KEY = '11baf87b-c4cb-4e9c-ad30-5068c7835a02';
const NEW_KEY = 'd2d57f95-4b83-4d4b-8b5c-68d23e27d040';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let fixed = 0;
files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes(OLD_KEY)) {
    c = c.split(OLD_KEY).join(NEW_KEY);
    fs.writeFileSync(file, c, 'utf8');
    fixed++;
    console.log('Updated:', file);
  }
});

console.log(`\nTotal files updated: ${fixed}`);
console.log('New key:', NEW_KEY);
