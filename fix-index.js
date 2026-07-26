const fs = require('fs');
let c = fs.readFileSync('index-draft.html', 'utf8');

// Fix og:title and twitter:title
c = c.replace(/(<meta property="og:title" content=")[^"]*(")/, '$1Marcelo Marques - Remission Coach$2');
c = c.replace(/(<meta name="twitter:title" content=")[^"]*(")/, '$1Marcelo Marques - Remission Coach$2');

// Fix schema serviceType
c = c.replace(
  '"serviceType": ["Resilience Coaching", "Remission Coaching", "Cancer Recovery Coaching"]',
  '"serviceType": ["Remission Coaching", "Return to Thrive Corporate Programme", "Cancer Recovery Coaching"]'
);

// Fix services intro
c = c.replace(
  'Tailored coaching programmes designed around your unique situation,\n          goals, and pace of recovery.',
  'Whether you are a cancer survivor rebuilding your life or an organisation supporting a returning employee, there is a programme designed for you.'
);

// Replace entire services grid with correct version
const gridStart = c.indexOf('<div class="services-grid"');
const gridEnd = c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', gridStart) + 1) + 1) + 6;
const newGrid = `<div class="services-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 780px; margin: 0 auto;">

      <div class="service-card service-card--featured">
        <div class="service-card__title">Remission Coaching</div>
        <p class="service-card__text">
          Specialist one-to-one and group coaching for cancer survivors. Navigating the Remission Gap, rebuilding identity, managing fear, and building a life that is genuinely worth living after treatment.
        </p>
        <a href="services.html" class="service-card__link">Learn More</a>
      </div>

      <div class="service-card">
        <div class="service-card__title">Return to Thrive</div>
        <p class="service-card__text">
          The corporate programme for HR teams, line managers, and occupational health departments. Equipping organisations to support employees returning after cancer treatment - with dignity, not just policy.
        </p>
        <a href="services.html" class="service-card__link">Learn More</a>
      </div>

    </div>`;
c = c.substring(0, gridStart) + newGrid + c.substring(gridEnd);

// Fix testimonial stars
c = c.replace(/=====|<div class="testimonial-card__stars">[^<]*<\/div>/g, (match) => {
  if (match.startsWith('<div')) return '<div class="testimonial-card__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>';
  return '&#9733;&#9733;&#9733;&#9733;&#9733;';
});

// Fix broken quote chars in testimonials
c = c.replace(/ "" /g, ' - ');
c = c.replace(/"" /g, '- ');
c = c.replace(/ ""/g, ' -');
c = c.replace(/='|=†/g, '');

// Fix David M context
c = c.replace('Resilience coaching client', 'Remission coaching client');

// Fix footer resilience refs
c = c.replace(/[Rr]esilience and remission/g, 'Remission');
c = c.replace(/resilience and remission/gi, 'Remission');
c = c.replace(/Resilience &amp; Remission/g, 'Remission');
c = c.replace(/resilience or navigating recovery/gi, 'navigating the Remission Gap');

// Remove remaining broken emoji-like sequences
c = c.replace(/dY[^a-zA-Z\s]{0,5}/g, '');
c = c.replace(/=[A-Za-z~.+*]{1,3}/g, '');

// Remove any remaining garbled chars (keep standard latin, punctuation, HTML)
c = c.replace(/[\x80-\xBF]/g, '');

fs.writeFileSync('index-final.html', c, 'utf8');
console.log('Done. Length:', c.length);
