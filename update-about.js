const fs = require('fs');
let c = fs.readFileSync('about.html', 'utf8');

// Replace the first paragraph (old resilience copy)
c = c.replace(
  /After experiencing the profound impact[\s\S]*?to every session\./,
  `During his own cancer journey, Marcelo faced the questions that define the Remission Gap: who am I now, what do I do with this life, and what comes next? That experience did not just change him. It gave him his calling.

          Trained in Transformative Coaching and specialising in life after cancer treatment, Marcelo brings both professional expertise and lived understanding to every session, helping individuals and organisations navigate what comes when treatment ends, with confidence and dignity.`
);

// Fix paragraph 2 broken quotes
c = c.replace(
  'coaching simply creates\n          the space to access them. He works with clients across the UK and internationally,\n          primarily online, offering flexible and confidential 1:1 sessions.',
  'coaching simply creates the space to access them. He works with clients across the UK and internationally, primarily online, offering flexible and confidential one-to-one sessions.'
);
c = c.replace(/coaching simply creates[\s\S]*?confidential 1:1 sessions\./, 
  'coaching simply creates the space to access them. He works with clients across the UK and internationally, primarily online, offering flexible and confidential one-to-one sessions.');

// Replace paragraph 3 (old resilience/professionals copy)
c = c.replace(
  /His work is particularly focused on two areas[\s\S]*?acceptance, strength, and fulfilment\./,
  `His work is focused on two areas: supporting cancer survivors as they navigate the Remission Gap and rebuild their identity, purpose and confidence; and helping organisations support employees returning after cancer treatment through the Return to Thrive programme.`
);

// Fix paragraph 4 broken quotes
c = c.replace(/Whether you're facing[\s\S]*?walk that journey\s*with you\./, 
  `Whether you are taking the first steps after treatment ends, navigating a return to work, or rebuilding a life that feels genuinely meaningful again, Marcelo is here to walk that journey with you.`
);

// Fix any remaining broken chars in about.html
c = c.replace(/ "" /g, ' - ');
c = c.replace(/"" /g, '- ');
c = c.replace(/ ""/g, ' -');
c = c.replace(/="""/g, '');

// Update page title and meta
c = c.replace(/content="About Marcelo Marques[^"]*"/, 'content="About Marcelo Marques - remission coach and twice cancer survivor based in London. Specialist in life after cancer treatment."');

fs.writeFileSync('about.html', c, 'utf8');
console.log('About page updated');
