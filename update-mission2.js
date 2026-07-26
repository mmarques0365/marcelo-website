const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const newQuote = `<blockquote class="mission__quote">"I help cancer survivors discover who they are becoming. And I help organisations support their employees to do the same.<br><br><strong>For individuals:</strong> one-to-one coaching and group programmes that guide you from the end of treatment into a life that is genuinely worth living.<br><br><strong>For organisations:</strong> the Return to Thrive programme - equipping HR teams and line managers to support employees returning after cancer treatment with dignity, not just policy."</blockquote>`;

c = c.replace(/<blockquote class="mission__quote">[\s\S]*?<\/blockquote>/, newQuote);

fs.writeFileSync('index.html', c, 'utf8');
console.log('Done');
