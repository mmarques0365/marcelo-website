const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && 
  !['index-draft.html','index-final.html'].includes(f));

let totalFixed = 0;

files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  const original = c;

  // Fix all "" patterns (broken em dashes shown as inverted commas)
  // Pattern: word "" word = word. Word (sentence break)
  c = c.replace(/ "" /g, '. ');
  c = c.replace(/"" /g, '');
  c = c.replace(/ ""/g, '.');
  c = c.replace(/""/g, '');

  // Fix contractions for professionalism
  c = c.replace(/doesn't/g, "does not");
  c = c.replace(/don't/g, "do not");
  c = c.replace(/isn't/g, "is not");
  c = c.replace(/aren't/g, "are not");
  c = c.replace(/can't/g, "cannot");
  c = c.replace(/won't/g, "will not");
  c = c.replace(/it's/g, "it is");
  c = c.replace(/you're/g, "you are");
  c = c.replace(/they're/g, "they are");
  c = c.replace(/we're/g, "we are");
  c = c.replace(/I'm/g, "I am");
  c = c.replace(/that's/g, "that is");
  c = c.replace(/there's/g, "there is");
  c = c.replace(/here's/g, "here is");
  c = c.replace(/wasn't/g, "was not");
  c = c.replace(/weren't/g, "were not");
  c = c.replace(/didn't/g, "did not");
  c = c.replace(/haven't/g, "have not");
  c = c.replace(/hasn't/g, "has not");
  c = c.replace(/wouldn't/g, "would not");
  c = c.replace(/couldn't/g, "could not");
  c = c.replace(/shouldn't/g, "should not");
  c = c.replace(/you'll/g, "you will");
  c = c.replace(/we'll/g, "we will");
  c = c.replace(/they'll/g, "they will");
  c = c.replace(/I'll/g, "I will");

  if (c !== original) {
    fs.writeFileSync(file, c, 'utf8');
    totalFixed++;
    console.log('Fixed:', file);
  }
});

console.log(`\nTotal files updated: ${totalFixed}`);

// Final check
let remaining = 0;
files.forEach(file => {
  const c = fs.readFileSync(file, 'utf8');
  if (c.includes('""')) remaining++;
});
console.log('Files still with broken quotes:', remaining);
