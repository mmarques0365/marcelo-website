const fs = require('fs');
let c = fs.readFileSync('testimonials.html', 'utf8');

// Replace fake stats with honest ones
c = c.replace(/>100%<\/div>/, '>2x</div>');
c = c.replace(/>5-Star Reviews<\/div>/, '>Cancer Survivor</div>');
c = c.replace(/>Every client who has completed a programme<\/p>/, '>Marcelo has walked this path twice. That is the foundation of everything he does.</p>');

c = c.replace(/>50\+<\/div>/, '>3.0</div>');
c = c.replace(/>Clients Supported<\/div>/, '>MD Anderson CME Credits</div>');
c = c.replace(/>Professionals from across the UK and beyond<\/p>/, '>Certified cancer survivorship education from The University of Texas MD Anderson Cancer Center</p>');

c = c.replace(/>3\+<\/div>/, '>ICF</div>');
c = c.replace(/>Years Coaching<\/div>/, '>Certified Member</div>');
c = c.replace(/>Dedicated practice in resilience &amp; remission coaching<\/p>/, '>Member of the International Coaching Federation, adhering to the ICF Code of Ethics</p>');

fs.writeFileSync('testimonials.html', c, 'utf8');

const check = c.includes('100%') || c.includes('50+') || c.includes('5-Star');
console.log('Fake stats remaining:', check);
console.log('2x present:', c.includes('>2x<'));
console.log('Done');
