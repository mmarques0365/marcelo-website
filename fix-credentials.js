const fs = require('fs');
let c = fs.readFileSync('about.html', 'utf8');

// Replace the entire credentials grid
const oldGrid = /<div class="credentials-grid">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n<\/section>/;

const newGrid = `<div class="credentials-grid">

      <div class="credential-item">
        <div class="credential-item__title">Certified Coach</div>
        <div class="credential-item__text">Recognised coaching certification with training in transformative coaching methodologies</div>
      </div>

      <div class="credential-item">
        <div class="credential-item__title">ICF Member</div>
        <div class="credential-item__text">Member of the International Coaching Federation</div>
      </div>

      <div class="credential-item">
        <div class="credential-item__title">Cancer Survivorship Studies</div>
        <div class="credential-item__text">Currently completing specialist training in cancer survivorship, deepening expertise in the psychological and emotional dimensions of life after treatment</div>
      </div>

      <div class="credential-item">
        <div class="credential-item__title">Continued Professional Development</div>
        <div class="credential-item__text">Committed to ongoing professional development in coaching, cancer survivorship, and psychological wellbeing</div>
      </div>

    </div>
  </div>
</section>`;

c = c.replace(oldGrid, newGrid);

// Also fix broken chars in Philosophy section
c = c.replace(/the seeds of profound transformation\. He doesn't believe in rushing\s*\n\s*the process "" real change/,
  'the seeds of profound transformation. He does not believe in rushing the process. Real change');
c = c.replace(/Marcelo doesn't have all the answers\s*\n\s*"" but he knows/,
  'Marcelo does not have all the answers, but he knows');
c = c.replace(/ "" /g, ' - ');
c = c.replace(/"" /g, '- ');
c = c.replace(/ ""/g, ' -');

fs.writeFileSync('about.html', c, 'utf8');
console.log('Credentials updated');
