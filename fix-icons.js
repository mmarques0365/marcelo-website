const fs = require('fs');
let c = fs.readFileSync('about.html', 'utf8');

// Replace all icon spans in the why-points section with clean gold dots
// Find the why-points section and replace emoji icons
c = c.replace(/<span class="icon">[^<]*<\/span>/g, '<span class="icon" style="color:#C9963A;font-size:1.6rem;line-height:1;">&#11044;</span>');

fs.writeFileSync('about.html', c, 'utf8');

// Verify
const remaining = c.match(/<span class="icon">/g);
console.log('Icon spans updated:', remaining ? remaining.length : 0);
console.log('Done');
