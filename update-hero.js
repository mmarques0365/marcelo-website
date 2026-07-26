const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const newSub = `<p class="hero__sub">Cancer treatment ends. The journey to who you are becoming starts here.<br><br>Medical clearance gives you your life back. Coaching helps you choose what to do with it.<br><br>Step out of the shadow of being a patient and onto an exciting journey to discover who you are becoming.</p>`;

c = c.replace(/<p class="hero__sub">[\s\S]*?<\/p>/, newSub);

fs.writeFileSync('index.html', c, 'utf8');
console.log('Hero updated');
