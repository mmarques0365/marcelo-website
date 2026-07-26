const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
// Fix broken star characters
c = c.replace(/<div class="testimonial-card__stars">[^<]*<\/div>/g, '<div class="testimonial-card__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>');
fs.writeFileSync('index.html', c, 'utf8');
console.log('Stars fixed');
// Verify
const check = c.match(/testimonial-card__stars">[^<]*/g);
console.log('Stars now:', check);
