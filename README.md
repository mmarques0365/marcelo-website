# Marcelo Marques Coaching — Static Website

A complete, professional static HTML website for **Marcelo Marques Coaching**, matching the design system of the live site at [marcelomarquescoaching.com](https://marcelomarquescoaching.com/).

---

## File Structure

```
marcelo-website/
├── index.html          Home page
├── about.html          About Marcelo
├── services.html       Services & Pricing
├── testimonials.html   Client Stories
├── faq.html            FAQ (CSS-only accordion)
├── book-now.html       Booking Request Form
├── contact.html        Contact Form & Details
├── style.css           Shared stylesheet (all pages)
└── README.md           This file
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#bf966f` | Nav background, buttons, accents |
| `--primary-dark` | `#af8965` | Hover states |
| `--primary-hover` | `#dfb083` | Button hover |
| `--primary-link` | `#917050` | Links, accents |
| `--dark` | `#161616` | Footer, mobile nav |
| `--body-text` | `#5e5e5e` | Paragraphs |
| `--heading-text` | `#1b1b1b` | Headings |

**Fonts (Google Fonts):**
- `Archivo Black` — Display headings, hero titles
- `Montserrat` (400, 700, 900) — Logo, nav, subheadings, labels
- `Source Sans Pro` (400, 600, 700) — Body text

---

## Features

- ✅ **7 complete pages** — Home, About, Services, Testimonials, FAQ, Book Now, Contact
- ✅ **Pure HTML + CSS** — No JavaScript, no build tools, no dependencies (except Google Fonts CDN)
- ✅ **Mobile responsive** — Hamburger menu via CSS checkbox hack; all grids collapse to single column on mobile
- ✅ **CSS-only FAQ accordion** — `<details>`-free, uses the checkbox hack for smooth open/close
- ✅ **Active nav states** — Each page highlights its own nav link
- ✅ **Sticky header** with smooth hover transitions
- ✅ **Consistent header/footer** across all pages
- ✅ **4 pricing tiers** on services page with "Most Popular" badge
- ✅ **6 testimonial cards** with star ratings and author avatars
- ✅ **Booking & contact forms** with styled inputs, selects, and textareas
- ✅ **CTA bands** on every page to drive conversions
- ✅ **Credentials section** on About page

---

## Deployment

### Option 1: Static file hosting (simplest)

Upload all files to any static web host:

- **Netlify** — drag-and-drop the `marcelo-website/` folder at [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `npx vercel` in the folder
- **GitHub Pages** — push to a repo, enable Pages in Settings
- **Cloudflare Pages** — connect a Git repo or direct upload

### Option 2: FTP / cPanel

Upload all files to your hosting provider's `public_html` directory via FTP (FileZilla, cPanel File Manager, etc.)

---

## Customisation Checklist

Before going live, update the following:

- [ ] Replace `hello@marcelomarquescoaching.com` with the real email address
- [ ] Add real social media URLs (LinkedIn, Instagram, Facebook, Twitter/X)
- [ ] Replace `[Client Name]` placeholders with real testimonials (or remove)
- [ ] Update `£TBC` pricing on services page
- [ ] Add a real coach photo to `about.html` (replace the `MM` placeholder div)
- [ ] Add a Calendly or booking calendar embed to `book-now.html`
- [ ] Connect the forms to a form backend (Netlify Forms, Formspree, EmailJS, etc.)
- [ ] Add real Google Analytics / tracking code if needed
- [ ] Add a favicon (`<link rel="icon" href="favicon.ico">` in each `<head>`)
- [ ] Review and personalise the `[coaching credentials]` and bio copy on About page
- [ ] Update copyright year if needed

---

## Form Backends (no server required)

| Service | Free tier | Setup |
|---------|-----------|-------|
| [Netlify Forms](https://docs.netlify.com/forms/setup/) | ✅ 100 submissions/mo | Add `netlify` attribute to `<form>` |
| [Formspree](https://formspree.io) | ✅ 50/mo | Change `action="https://formspree.io/f/yourID"` |
| [EmailJS](https://emailjs.com) | ✅ 200/mo | Requires small JS snippet |
| [Web3Forms](https://web3forms.com) | ✅ Unlimited | Add hidden `access_key` input |

---

## Browser Support

Tested and compatible with:
- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari / Chrome on iOS & Android

---

*Built with care. Pure HTML & CSS — fast, accessible, dependency-free.*
