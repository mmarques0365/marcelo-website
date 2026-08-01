const fs = require('fs');
let c = fs.readFileSync('workbook.html', 'utf8');

c = c.replace(/Resilience and Remission Coach/g, 'Remission Coach');
c = c.replace(/resilience and remission coach/g, 'remission coach');
c = c.replace(/I am a remission coach/g, 'I am a certified remission coach');

fs.writeFileSync('workbook.html', c, 'utf8');
console.log('Done');
console.log('Resilience remaining:', c.includes('Resilience'));
