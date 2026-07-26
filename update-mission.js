const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const newQuote = `<blockquote class="mission__quote">"Cancer treatment ends. The journey to who you are becoming starts here.<br><br>Medical clearance gives you your life back. Coaching helps you choose what to do with it.<br><br>Step out of the shadow of being a patient and onto an exciting journey to discover who you are becoming.<br><br><strong>For individuals:</strong> one-to-one coaching and group programmes for cancer survivors.<br><strong>For organisations:</strong> the Return to Thrive programme - helping companies support employees back to full working life with dignity."</blockquote>`;

c = c.replace(/<blockquote class="mission__quote">[\s\S]*?<\/blockquote>/, newQuote);

fs.writeFileSync('index.html', c, 'utf8');
console.log('Mission updated');
