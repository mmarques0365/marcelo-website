const fs = require('fs');

const blogFiles = [
  'blog-hidden-challenges-of-remission.html',
  'blog-the-day-i-stopped-pretending.html',
  'blog-feeling-lost-after-cancer-treatment.html',
  'blog-post-traumatic-growth.html',
  'blog-rediscovering-identity.html',
  'blog-returning-to-work.html',
  'blog-five-habits-inner-strength.html',
  'blog-what-is-remission-coaching.html'
];

let totalFixed = 0;

blogFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  const original = c;

  // Find the Related Reading block pattern
  const marker = 'Related Reading';
  const firstIdx = c.indexOf(marker);
  if (firstIdx === -1) return;

  // Find the second occurrence
  const secondIdx = c.indexOf(marker, firstIdx + marker.length);
  if (secondIdx === -1) return;

  // Find the start of the second block (the opening div before it)
  // Work backwards from secondIdx to find the opening <div
  let blockStart = c.lastIndexOf('<div', secondIdx);

  // Find the end of the second block (closing </div>)
  let blockEnd = c.indexOf('</div>', secondIdx) + 6;

  // Remove the second block
  c = c.substring(0, blockStart) + c.substring(blockEnd);

  if (c !== original) {
    fs.writeFileSync(file, c, 'utf8');
    totalFixed++;
    console.log('Fixed duplicate in:', file);
  }
});

console.log('\nTotal files fixed:', totalFixed);

// Verify
blogFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const c = fs.readFileSync(file, 'utf8');
  const first = c.indexOf('Related Reading');
  const second = c.indexOf('Related Reading', first + 1);
  if (second !== -1) console.log('WARNING: still duplicated in', file);
});
console.log('Verification complete');
