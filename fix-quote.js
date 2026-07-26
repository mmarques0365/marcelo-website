const fs = require('fs');
let c = fs.readFileSync('about.html', 'utf8');
// Find and fix the broken quote in paragraph 3
c = c.replace(/heal and grow[^c]*coaching/g, 'heal and grow. Coaching');
// Also try direct replacement
c = c.replace(/grow \u201c\u201c coaching/g, 'grow. Coaching');
c = c.replace(/grow \u0022\u0022 coaching/g, 'grow. Coaching');
// Check what character is there
const idx = c.indexOf('heal and grow');
if (idx > -1) {
  const snippet = c.substring(idx, idx + 40);
  console.log('Context:', JSON.stringify(snippet));
}
fs.writeFileSync('about.html', c, 'utf8');
