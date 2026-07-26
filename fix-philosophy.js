const fs = require('fs');
let c = fs.readFileSync('about.html', 'utf8');

// Fix "rushing the process "" real change"
c = c.replace(/rushing\s*\n\s*the process "" real change/g, 'rushing the process. Real change');
c = c.replace(/rushing the process "" real change/g, 'rushing the process. Real change');

// Fix "all the answers "" but"
c = c.replace(/all the answers "" but/g, 'all the answers, but');
c = c.replace(/all the answers\s*""\s*but/g, 'all the answers, but');

// Also fix doesn't contractions to does not
c = c.replace(/He doesn't believe/g, 'He does not believe');
c = c.replace(/Marcelo doesn't have/g, 'Marcelo does not have');

fs.writeFileSync('about.html', c, 'utf8');
console.log('Done');

// Verify
const check = c.includes('""');
console.log('Broken quotes remaining:', check);
