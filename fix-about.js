const fs = require('fs');
let c = fs.readFileSync('about.html', 'utf8');

// Fix paragraph 1 - split into two proper paragraphs
c = c.replace(
  /(<p>\s*)During his own cancer journey[\s\S]*?calling\.\s*\n\s*\n\s*Trained in Transformative Coaching[\s\S]*?with confidence and dignity\.\s*(<\/p>)/,
  `<p>
          During his own cancer journey, Marcelo faced the questions that define the Remission Gap: who am I now, what do I do with this life, and what comes next? That experience did not just change him. It gave him his calling.
        </p>
        <p>
          Trained in Transformative Coaching and specialising in life after cancer treatment, Marcelo brings both professional expertise and lived understanding to every session, helping individuals and organisations navigate what comes when treatment ends, with confidence and dignity.
        </p>`
);

// Fix broken quote in paragraph 2
c = c.replace(/to heal and grow "" coaching/, 'to heal and grow. Coaching');
c = c.replace(/heal and grow "" coaching/, 'heal and grow. Coaching');

// Fix broken emoji in credentials section
c = c.replace(/<div class="credential-item__icon">[\s\S]*?<\/div>/g, (match) => {
  if (match.includes('Certified') || match.match(/ðŸŽ"/)) return '';
  if (match.match(/ðŸ›¡/)) return '';
  if (match.match(/ðŸŒ¿/)) return '';
  if (match.match(/ðŸŽ¯/)) return '';
  return match.replace(/<div class="credential-item__icon">.*?<\/div>/, '');
});

// Remove all broken emoji icon divs
c = c.replace(/<div class="credential-item__icon">[^<]*<\/div>/g, '');

// Fix remaining broken chars
c = c.replace(/ "" /g, ' - ');
c = c.replace(/"" /g, '- ');
c = c.replace(/ ""/g, ' -');

fs.writeFileSync('about.html', c, 'utf8');
console.log('Done');

// Quick check
const lines = c.split('\n').filter(l => l.includes('""'));
if (lines.length === 0) console.log('No broken quotes remaining');
else console.log('Remaining broken quotes:', lines.length);
