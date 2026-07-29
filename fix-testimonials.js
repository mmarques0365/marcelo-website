const fs = require('fs');

// ── REAL GOOGLE REVIEWS ──────────────────────────────────────────────────────
const reviews = [
  {
    initials: 'ME',
    name: 'Maria E.',
    context: 'Coaching client',
    text: 'I recently had the pleasure of working with Marcelo, and I cannot recommend his coaching services enough. From our very first session, he helped me gain clarity on some issues that had been holding me back. His insightful approach made it easy to understand my challenges, and he provided practical strategies to tackle them head-on. With his guidance, I learned to embrace my strengths and face obstacles with a newfound determination. His supportive and empathetic style made every session feel valuable and empowering.'
  },
  {
    initials: 'AV',
    name: 'Anastasia V.',
    context: 'Coaching client',
    text: 'I highly recommend Marcelo. He provided invaluable clarity and support during a challenging period in my life. His thoughtful, empathetic, and easygoing nature made all the difference.'
  },
  {
    initials: 'LW',
    name: 'Louise W.',
    context: 'Coaching client',
    text: 'I cannot recommend Marcelo highly enough. He gives wonderful insights and offers thought-provoking reflections. 5 star recommendation indeed!'
  },
  {
    initials: 'HA',
    name: 'Harrison A.',
    context: 'Coaching client',
    text: 'Marcelo is a great coach who is actually invested in your progress and focuses on visible results. He has been instrumental in getting me to start new things that I would never have had the confidence to do otherwise.'
  },
  {
    initials: 'MB',
    name: 'Midiã B.',
    context: 'Coaching client',
    text: 'My coaching sessions with Marcelo were very constructive. At each stage, we developed a decision-making process that proved fundamental to my professional and personal planning. I am very grateful to him — an excellent professional — and I highly recommend his work.'
  },
  {
    initials: 'MA',
    name: 'Maria A.',
    context: 'Coaching client',
    text: 'Marcelo has been clear and helpful and adaptable to changes made. I enjoy our weekly sessions and have made real advances with his assistance. Highly recommended.'
  }
];

function makeCard(r) {
  return `
      <div class="testimonial-card">
        <div class="testimonial-card__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="testimonial-card__text">"${r.text}"</p>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">${r.initials}</div>
          <div>
            <div class="testimonial-card__name">${r.name}</div>
            <div class="testimonial-card__context">${r.context} &middot; Google Review</div>
          </div>
        </div>
      </div>`;
}

// ── UPDATE testimonials.html ─────────────────────────────────────────────────
let t = fs.readFileSync('testimonials.html', 'utf8');

const startMarker = '<!-- TESTIMONIALS GRID -->';
const endMarker = '<!-- STATS BAND -->';
const startIdx = t.indexOf(startMarker);
const endIdx = t.indexOf(endMarker);

const newGrid = `<!-- TESTIMONIALS GRID -->
<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="testimonials-grid">
${reviews.map(makeCard).join('\n')}
    </div>
  </div>
</section>

`;

t = t.substring(0, startIdx) + newGrid + t.substring(endIdx);
fs.writeFileSync('testimonials.html', t, 'utf8');
console.log('testimonials.html updated');

// ── UPDATE index.html homepage teaser (2 best reviews) ──────────────────────
let idx = fs.readFileSync('index.html', 'utf8');

const oldTeaser = `      <div class="testimonial-card" style="grid-column:1/-1;text-align:center;padding:48px 40px;">
        <p style="font-size:1.15rem;color:var(--primary);font-weight:600;margin-bottom:16px;">Client stories coming soon.</p>
        <p style="color:var(--muted);max-width:480px;margin:0 auto 28px;">Marcelo is currently working with his first clients. Real testimonials will appear here as the practice grows.</p>
        <a href="book-now.html" class="btn">Be One of the First</a>
      </div>`;

const newTeaser = `${makeCard(reviews[0])}
${makeCard(reviews[1])}`;

idx = idx.replace(oldTeaser, newTeaser);
fs.writeFileSync('index.html', idx, 'utf8');
console.log('index.html updated');
console.log('Done');
