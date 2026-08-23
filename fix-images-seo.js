// Fix 3: Add loading="lazy" and width/height to all img tags across all HTML files
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Known image dimensions (approximate, based on display size)
const knownDimensions = {
  'marcelo-primary.jpg':   { w: 600,  h: 800  },
  'marcelo-secondary.jpg': { w: 600,  h: 800  },
  'marcelo-kitchen.jpg':   { w: 800,  h: 600  },
  'logo-FINAL-light.png':  { w: 240,  h: 60   },
  'logo-FINAL-dark.png':   { w: 240,  h: 60   },
  'favicon.ico':           { w: 32,   h: 32   },
};

let totalFixed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add loading="lazy" to img tags that don't already have it
  // Skip logo images (above-fold) - those should be eager
  const updated = html.replace(/<img\s([^>]*?)>/gi, (match, attrs) => {
    // Skip if already has loading attribute
    if (/loading=/i.test(attrs)) return match;
    // Skip logo images (eager load)
    if (/logo/i.test(attrs)) return match;
    // Skip tiny icons
    if (/favicon/i.test(attrs)) return match;
    
    changed = true;
    totalFixed++;
    
    // Add width/height if we know the image
    let extra = ' loading="lazy"';
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    if (srcMatch) {
      const imgName = path.basename(srcMatch[1]);
      const dims = knownDimensions[imgName];
      if (dims && !/width=/i.test(attrs) && !/height=/i.test(attrs)) {
        extra += ` width="${dims.w}" height="${dims.h}"`;
      }
    }
    
    return `<img ${attrs.trim()}${extra}>`;
  });

  if (changed) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Fixed: ${file}`);
  }
}

console.log(`\nTotal img tags updated: ${totalFixed}`);
