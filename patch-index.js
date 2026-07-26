const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// META TAGS
c = c.replace(
  /content="Marcelo Marques Coaching "" Transformative resilience[^"]*"/,
  'content="Marcelo Marques is a remission coach and cancer survivor based in London. Helping cancer survivors and organisations navigate life after treatment."'
);
c = c.replace(
  'Marcelo Marques Coaching "" Resilience &amp; Remission</title>',
  'Marcelo Marques - Remission Coach | marcelomarquescoaching.com</title>'
);
c = c.replace(
  'content="Marcelo Marques Coaching "" Resilience &amp; Remission" />\n  <meta property="og:description"',
  'content="Marcelo Marques - Remission Coach" />\n  <meta property="og:description"'
);
c = c.replace(
  'content="Resilience and remission coaching for cancer survivors in the UK. Online sessions available. Helping you rebuild your life, identity, and purpose after cancer treatment."',
  'content="Remission coaching for cancer survivors and organisations. Helping you navigate what comes when treatment ends."'
);
c = c.replace(
  'content="Marcelo Marques Coaching "" Resilience &amp; Remission" />\n  <meta name="twitter:description" content="Resilience and remission coaching for professionals navigating life after cancer treatment."',
  'content="Marcelo Marques - Remission Coach" />\n  <meta name="twitter:description" content="Remission coaching for cancer survivors and organisations in the UK."'
);

// HERO EYEBROW
c = c.replace(
  '<p class="hero__eyebrow">Resilience =\xB7 Remission =\xB7 Renewal</p>',
  '<p class="hero__eyebrow">Remission Coaching &middot; Return to Thrive &middot; A Fuller Life</p>'
);
// Try other variants
c = c.replace(
  /(<p class="hero__eyebrow">)[^<]*/,
  '$1Remission Coaching &middot; Return to Thrive &middot; A Fuller Life'
);

// H1
c = c.replace(
  '<h1 class="hero__title">Resilience and Remission Coaching After Cancer</h1>',
  '<h1 class="hero__title">Remission Coaching</h1>'
);

// HERO SUB
c = c.replace(
  /(<p class="hero__sub">)\s*Helping professionals[^<]*<\/p>/,
  `$1Cancer treatment ends. The hard part does not.<br><br>I am Marcelo Marques - remission coach and cancer survivor. I help people and organisations navigate what comes when treatment ends: the identity questions, the fear, and the search for a life worth living.<br><br>You do not have to find your way through it alone.</p>`
);

// MISSION QUOTE
c = c.replace(
  /(<blockquote class="mission__quote">\s*")[^<]*("[^<]*<\/blockquote>)/,
  `<blockquote class="mission__quote">"Cancer treatment ends. The hard part does not.<br><br>I help people and organisations navigate what comes when treatment ends: the identity questions, the fear, and the search for a life worth living. You do not have to find your way through it alone.<br><br><strong>For individuals:</strong> one-to-one coaching and group programmes for cancer survivors.<br><strong>For organisations:</strong> the Return to Thrive programme - helping companies support employees back to full working life with dignity."</blockquote>`
);

// MISSION ASIDE
c = c.replace('A coach who understands your journey', 'A remission coach who has been through it twice');
c = c.replace(
  /Marcelo Marques brings both professional expertise[\s\S]*?to find a way through\./,
  'Marcelo Marques is a remission coach and twice cancer survivor based in North Finchley, London. He has walked the same path as his clients. That is not a detail. It is the foundation of everything he does.'
);

// SERVICE CARDS
c = c.replace(
  /(<div class="services-grid"[^>]*>)[\s\S]*?(<\/div>\s*\n\s*<\/div>\s*\n\s*<div style="margin-top)/,
  `$1

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
          The corporate programme for HR teams, line managers, and occupational health departments. Supporting organisations to help employees return after cancer treatment - with dignity, not just policy.
        </p>
        <a href="services.html" class="service-card__link">Learn More</a>
      </div>

    </div>
    $2`
);

// WHY SECTION
c = c.replace('Why Resilience &amp; Remission Coaching?', 'Why Remission Coaching?');
c = c.replace('The Case for Coaching', 'Understanding the Remission Gap');
c = c.replace(
  /When life throws its hardest challenges[\s\S]*?last a lifetime\./,
  `When cancer treatment ends, most people expect to feel relief. Instead, many feel lost, frightened, and unsure of who they are. This is the Remission Gap.
        </p>
        <p>
          Coaching provides a confidential, structured space to process your experience, rebuild your identity, and move forward with a clear vision. Unlike therapy, coaching is forward-looking and action-oriented. It is about building what comes next.`
);

// REMOVE BROKEN EMOJI ICONS from why-points
c = c.replace(/<span class="icon">[\s\S]*?<\/span>/g, '');

// FOOTER
c = c.replace(
  /(<p class="footer-desc">\s*)[\s\S]*?(<\/p>)/,
  '$1Remission coaching for cancer survivors and organisations navigating life after cancer treatment. Based in London, available online across the UK.$2'
);

// COPYRIGHT
c = c.replace(/&copy; 2025/g, '&copy; 2026');
c = c.replace(/2025 Marcelo/g, '2026 Marcelo');

// Fix remaining weird chars
c = c.replace(/ "" /g, ' - ');
c = c.replace(/"" /g, '- ');
c = c.replace(/ ""/g, ' -');
c = c.replace(/=""/g, '');

fs.writeFileSync('index.html', c, 'utf8');
console.log('Done. Length:', c.length);
