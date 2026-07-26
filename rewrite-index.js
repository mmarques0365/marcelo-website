const fs = require('fs');

let c = fs.readFileSync('index.html', 'utf8');

// 1. Meta title
c = c.replace(/<title>[^<]*<\/title>/, '<title>Marcelo Marques - Remission Coach | marcelomarquescoaching.com</title>');

// 2. Meta description
c = c.replace(/content="Marcelo Marques Coaching .* Transformative resilience[^"]*"/, 'content="Marcelo Marques is a remission coach and cancer survivor based in London. Helping cancer survivors and organisations navigate life after treatment."');

// 3. OG title
c = c.replace(/(<meta property="og:title" content=")[^"]*"/, '$1Marcelo Marques - Remission Coach"');

// 4. OG description
c = c.replace(/(<meta property="og:description" content=")[^"]*"/, '$1Remission coaching for cancer survivors and organisations. Helping you navigate what comes when treatment ends."');

// 5. Twitter title
c = c.replace(/(<meta name="twitter:title" content=")[^"]*"/, '$1Marcelo Marques - Remission Coach"');

// 6. Twitter description
c = c.replace(/(<meta name="twitter:description" content=")[^"]*"/, '$1Remission coaching for cancer survivors and organisations in the UK."');

// 7. Schema description
c = c.replace(/"description": "Resilience and remission coaching for professionals[^"]*"/, '"description": "Remission coaching for cancer survivors and organisations navigating life after cancer treatment. Based in London, UK."');

// 8. Hero eyebrow
c = c.replace(/<p class="hero__eyebrow">[^<]*<\/p>/, '<p class="hero__eyebrow">Remission Coaching &middot; Return to Thrive &middot; A Fuller Life</p>');

// 9. H1
c = c.replace(/<h1 class="hero__title">[^<]*<\/h1>/, '<h1 class="hero__title">Remission Coaching</h1>');

// 10. Hero sub
c = c.replace(/<p class="hero__sub">[\s\S]*?<\/p>/, `<p class="hero__sub">Cancer treatment ends. The hard part does not.<br><br>I am Marcelo Marques - remission coach and cancer survivor. I help people and organisations navigate what comes when treatment ends: the identity questions, the fear, and the search for a life worth living.<br><br>You do not have to find your way through it alone.</p>`);

// 11. Mission quote
c = c.replace(/<blockquote class="mission__quote">[\s\S]*?<\/blockquote>/, `<blockquote class="mission__quote">"Cancer treatment ends. The hard part does not.<br><br>I help people and organisations navigate what comes when treatment ends: the identity questions, the fear, and the search for a life worth living. You do not have to find your way through it alone.<br><br><strong>For individuals:</strong> one-to-one coaching and group programmes for cancer survivors.<br><strong>For organisations:</strong> the Return to Thrive programme - helping companies support employees back to full working life with dignity."</blockquote>`);

// 12. Mission aside heading
c = c.replace('A coach who understands your journey', 'A remission coach who has been through it twice');

// 13. Mission aside text
c = c.replace(/Marcelo Marques brings both professional expertise[\s\S]*?to find a way through\./, 'Marcelo Marques is a remission coach and twice cancer survivor based in North Finchley, London. He has walked the same path as his clients. That is not a detail. It is the foundation of everything he does.');

// 14. Services intro
c = c.replace('Tailored coaching programmes designed around your unique situation,\n          goals, and pace of recovery.', 'Whether you are a cancer survivor rebuilding your life or an organisation supporting a returning employee, there is a programme designed for you.');

// 15. Replace Resilience Coaching card with Remission Coaching
const oldCard1Regex = /<div class="service-card service-card--featured">[\s\S]*?<\/div>\s*\n\s*<div class="service-card">/;
const newCard1 = `<div class="service-card service-card--featured">
        <div class="service-card__title">Remission Coaching</div>
        <p class="service-card__text">
          Specialist one-to-one and group coaching for cancer survivors. Navigating the Remission Gap, rebuilding identity, managing fear, and building a life worth living after treatment.
        </p>
        <a href="services.html" class="service-card__link">Learn More</a>
      </div>

      <div class="service-card">`;
c = c.replace(oldCard1Regex, newCard1);

// 16. Replace second service card content (Remission Coaching -> Return to Thrive)
c = c.replace(/<div class="service-card__title">Remission Coaching<\/div>[\s\S]*?Learn More[\s\S]*?<\/div>/, `<div class="service-card__title">Return to Thrive</div>
        <p class="service-card__text">
          The corporate programme for HR teams, line managers, and occupational health departments. Equipping organisations to support employees returning after cancer treatment - with dignity, not just policy.
        </p>
        <a href="services.html" class="service-card__link">Learn More</a>
      </div>`);

// 17. Why section heading
c = c.replace('Why Resilience &amp; Remission Coaching?', 'Why Remission Coaching?');
c = c.replace('The Case for Coaching', 'Understanding the Remission Gap');

// 18. Why section body text
c = c.replace(/When life throws its hardest challenges[\s\S]*?last a lifetime\./, `When cancer treatment ends, most people expect to feel relief. Instead, many feel lost, frightened, and unsure of who they are. This is the Remission Gap.
        </p>
        <p>
          Coaching provides a confidential, structured space to process your experience, rebuild your identity, and move forward with a clear vision. Unlike therapy, coaching is forward-looking and action-oriented. It is about building what comes next.`);

// 19. Fix why-points (remove broken emoji spans, keep text)
c = c.replace(/<span class="icon">[\s\S]*?<\/span>/g, '');

// 20. Fix free guide section sub label
c = c.replace(/<p class="section-sub">\s*.*?Free Resource.*?<\/p>/, '<p class="section-sub">Free Resource</p>');

// 21. Footer description
c = c.replace(/<p class="footer-desc">[\s\S]*?<\/p>/, '<p class="footer-desc">Remission coaching for cancer survivors and organisations navigating life after cancer treatment. Based in London, available online across the UK.</p>');

// 22. Copyright year
c = c.replace(/2025 Marcelo/g, '2026 Marcelo');
c = c.replace(/&copy; 2025/g, '&copy; 2026');

// 23. Fix all remaining broken characters
c = c.replace(/Resilience\s*&amp;\s*Remission/g, 'Remission');
c = c.replace(/resilience and remission/gi, 'remission');
c = c.replace(/Resilience and remission/gi, 'Remission');

// 24. Remove broken emoji characters
const brokenEmojis = ['\uD83D\uDEE1\uFE0F', '\uD83C\uDF3F', '\uD83C\uDFAF', '\uD83D\uDCAA', '\uD83E\uDD1D', '\uD83D\uDD04'];
brokenEmojis.forEach(e => { c = c.split(e).join(''); });

// Also remove any remaining garbled sequences
c = c.replace(/[^\x00-\x7F\u00A0-\u024F\u2019\u2018\u201C\u201D\u2013\u2014\u00B7\u2022\u2605\u2192\u00AE\u00A9&;]/g, '');

fs.writeFileSync('index-draft.html', c, 'utf8');
console.log('Done. Length:', c.length);
