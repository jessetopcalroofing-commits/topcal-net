# TopCal Inc — Commercial Construction Landing Page

## Project Overview
A high-end, professional marketing landing page for **TopCal Inc**, a premier commercial contractor specializing in large-scale commercial projects. Designed to attract and convert potential clients seeking construction, painting, roofing, school construction, and commercial kitchen services.

---

## ✅ Completed Features

### Structure
- **Fixed Navigation** — Transparent on load, dark on scroll; active link highlighting; mobile hamburger menu
- **Hero Section** — Full-viewport hero with background image, animated headline, CTA buttons, and animated statistics counter
- **Marquee Bar** — Auto-scrolling services ticker
- **About Section** — Company overview with stacked image layout, floating badges, and certifications checklist
- **Services Section** — 6-service grid cards with images, descriptions, features, and hover effects
- **Projects / Portfolio** — Filterable project grid with hover overlay details
- **Why Us Section** — Dark-themed section with 6 value proposition cards
- **Testimonials Slider** — Auto-playing carousel with dot navigation and controls
- **CTA Banner** — Full-width call-to-action with background image and overlay
- **Contact Section** — Split layout with company details and full contact form
- **Footer** — Multi-column footer with links, contact info, and social icons
- **Back to Top Button** — Appears on scroll

### Interactions & Animations
- Scroll-triggered reveal animations on all sections
- Animated number counters (stats)
- Testimonial auto-slider with manual controls
- Project portfolio filter (by service category)
- Subtle 3D tilt effect on service cards
- Parallax scroll on hero background
- Form submission with loading state and success message
- Mobile-responsive hamburger navigation

### Data Storage
- Contact form submissions saved to **`contact_inquiries`** table via REST API

---

## 📄 Pages & Entry Points

| Path | Description |
|------|-------------|
| `index.html` | Main landing page |
| `css/style.css` | All styles |
| `js/main.js` | All JavaScript functionality |

### Section Anchors
| Anchor | Section |
|--------|---------|
| `#home` | Hero |
| `#about` | About TopCal |
| `#services` | Services |
| `#projects` | Portfolio |
| `#why-us` | Why Choose Us |
| `#testimonials` | Client Testimonials |
| `#contact` | Contact / Quote Form |

---

## 🗂️ Data Models

### `contact_inquiries` Table
| Field | Type | Description |
|-------|------|-------------|
| id | text | Auto-generated UUID |
| firstName | text | Client first name |
| lastName | text | Client last name |
| email | text | Email address |
| phone | text | Phone number |
| company | text | Company/Organization |
| service | text | Service requested |
| budget | text | Estimated budget range |
| message | rich_text | Project description |

---

## 🔧 Services Featured
1. Major Construction
2. Commercial Painting
3. Commercial Roofing
4. School Construction
5. Commercial Kitchens
6. Industrial Projects

---

## 🚀 Deployment Notes
- **Cloudflare Pages**: Upload all files as-is. The site is fully static (HTML/CSS/JS).
- The contact form uses a relative API endpoint (`tables/contact_inquiries`) — this works within the current hosting environment. For Cloudflare deployment, either:
  1. Connect a backend API and update the fetch URL in `js/main.js`
  2. Replace with a form service like Formspree or Netlify Forms

---

## 📌 Recommended Next Steps
- [ ] Add real company logo and brand assets
- [ ] Update contact phone, email, and address with real info
- [ ] Add actual project photos to the portfolio section
- [ ] Integrate a real contact form service (Formspree, EmailJS, etc.) for Cloudflare deployment
- [ ] Add Google Maps embed for office location
- [ ] Create dedicated service detail pages (e.g., `/services/roofing.html`)
- [ ] Add a blog/news section
- [ ] Implement Google Analytics or Cloudflare Web Analytics
- [ ] Add real client logos to a "Trusted By" strip
- [ ] SEO: Add structured data (JSON-LD) for local business schema

---

*Built with HTML5 · CSS3 · Vanilla JavaScript · Font Awesome 6 · Google Fonts (Montserrat + Inter)*
