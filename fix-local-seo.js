// Fix 2: Add PostalAddress, geo, telephone to LocalBusiness schema on homepage
// Fix: Remove duplicate description sentence in schema
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Find and replace the LocalBusiness/ProfessionalService schema
const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
let match;

while ((match = scriptRegex.exec(html)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    const type = data['@type'];
    if (type === 'ProfessionalService' || type === 'LocalBusiness') {

      // Build enhanced schema
      const enhanced = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Marcelo Marques Coaching",
        "description": "Remission coaching for cancer survivors. One-to-one support helping people rebuild identity, manage fear of recurrence, and design a fuller life after cancer treatment.",
        "url": "https://marcelomarquescoaching.com",
        "logo": "https://marcelomarquescoaching.com/logo-FINAL-light.png",
        "image": "https://marcelomarquescoaching.com/marcelo-primary.jpg",
        "founder": {
          "@type": "Person",
          "name": "Marcelo Marques"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "North Finchley",
          "addressLocality": "London",
          "postalCode": "N12",
          "addressCountry": "GB"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.6028,
          "longitude": -0.1731
        },
        "areaServed": [
          { "@type": "City", "name": "London" },
          { "@type": "Country", "name": "United Kingdom" }
        ],
        "serviceType": [
          "Remission Coaching",
          "Cancer Survivorship Coaching",
          "Life Coaching after Cancer"
        ],
        "sameAs": [
          "https://www.instagram.com/marcelomcoaching"
        ],
        "priceRange": "££",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@marcelomarquescoaching.com",
          "availableLanguage": ["English", "Portuguese"]
        }
      };

      const enhancedJson = JSON.stringify(enhanced, null, 2);
      const newScript = `<script type="application/ld+json">\n${enhancedJson}\n</script>`;
      html = html.replace(match[0], newScript);
      console.log('Homepage LocalBusiness schema updated.');
      break;
    }
  } catch(e) {
    // skip
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Done.');
