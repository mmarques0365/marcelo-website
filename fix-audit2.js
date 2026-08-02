const fs = require('fs');

function fix(file, fn) {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;
  c = fn(c);
  if (c !== orig) { fs.writeFileSync(file, c, 'utf8'); console.log('Fixed:', file); }
}

// ── 1. REMOVE UNGATED FREE GUIDE LINK FROM HOMEPAGE ─────────────────────────
fix('index.html', c => {
  c = c.replace(/Prefer to read it now\?[^<]*<a[^>]*>[^<]*<\/a>/g, '');
  c = c.replace(/View the guide online[^<]*<\/a>/g, '');
  return c;
});

// ── 2. ADD BILINGUAL TO FAQ ───────────────────────────────────────────────────
fix('faq.html', c => {
  const bilingualQ = `
        <!-- Q: Languages -->
        <div class="faq-item">
          <input type="checkbox" id="faq-lang" />
          <label class="faq-label" for="faq-lang">Do you offer sessions in languages other than English?</label>
          <div class="faq-answer">
            <p>
              Yes. Marcelo offers coaching sessions in both English and Portuguese. If you would feel more comfortable working in Portuguese, simply mention this when you book your discovery call.
            </p>
          </div>
        </div>`;
  // Insert before the closing of the faq-list
  if (!c.includes('faq-lang')) {
    c = c.replace('</div><!-- /faq-list -->', bilingualQ + '\n        </div><!-- /faq-list -->');
    if (!c.includes('</div><!-- /faq-list -->')) {
      // fallback - find the last faq-item closing
      const lastIdx = c.lastIndexOf('</div>\n\n        </div>');
      if (lastIdx !== -1) {
        c = c.substring(0, lastIdx + 6) + bilingualQ + c.substring(lastIdx + 6);
      }
    }
  }
  return c;
});

// ── 3. ADD BILINGUAL TO ABOUT PAGE ───────────────────────────────────────────
fix('about.html', c => {
  if (!c.includes('Portuguese')) {
    c = c.replace('<div class="credentials-grid">',
      '<p style="margin-bottom:24px;">Coaching sessions are available in <strong>English and Portuguese</strong>.</p>\n    <div class="credentials-grid">');
  }
  return c;
});

// ── 4. ADD BILINGUAL TO SERVICES PAGE ────────────────────────────────────────
fix('services.html', c => {
  if (!c.includes('Portuguese')) {
    c = c.replace('All sessions are conducted online via\n      video call, at a time that works for you.',
      'All sessions are conducted online via video call, at a time that works for you. Sessions available in English and Portuguese.');
  }
  return c;
});

// ── 5. STANDARDIZE PACKAGE/PROGRAMME TERMINOLOGY ─────────────────────────────
// Use "coaching packages" consistently on services and homepage
fix('index.html', c => {
  c = c.replace(/coaching programmes/g, 'coaching packages');
  return c;
});

// ── 6. FIX SERVICES META TITLE TO MATCH H1 ────────────────────────────────────
fix('services.html', c => {
  c = c.replace('<title>Coaching Services | Marcelo Marques Coaching</title>',
    '<title>Services and Pricing | Marcelo Marques Coaching</title>');
  return c;
});

// ── 7. FIX SCHEMA TYPE ON HOMEPAGE ───────────────────────────────────────────
fix('index.html', c => {
  c = c.replace('"@type": "LocalBusiness"', '"@type": "ProfessionalService"');
  return c;
});

// ── 8. FIX FREE GUIDE H1 LINE BREAK ─────────────────────────────────────────
fix('free-guide.html', c => {
  c = c.replace('Your Life<br>After Cancer', 'Your Life After Cancer');
  return c;
});

// ── 9. FIX FREE GUIDE H1 — ALREADY RENAMED, CLEAN UP BR ─────────────────────
// (already handled above)

console.log('All audit2 fixes applied.');
