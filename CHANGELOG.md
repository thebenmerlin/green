# Changelog for Green Eventwaala v1

## Initial Version – 2025-10-21

### Reference: Monk-E.in

**Structural Changes:**
- Adapted all page layouts and navigation for classic corporate events (index, work, creators, about, contact).
- Replaced all Monk-E branding/copy with "Green Eventwaala" and tailored for B2B/corporate sustainability market.
- Consolidated styles/fonts using CSS variables; added green/yellow/sustainable palette.

**Features Matching Monk-E.in:**
- Hero: full-bleed video/image carousel; mute/play control; parallax overlays.
- Animated counters for sustainability metrics (events, waste, recycled materials, etc).
- Services block: Corporate event offerings, sustainability. 
- Client and partner logo marquees, hover-animate from grayscale to color.
- Card-style case studies/work grid (modal/page details). 
- Creator/partner cards focus on eco-vendors/artisans.
- Sticky header, transparent-to-solid on scroll. 
- Scroll-triggered reveal (fade/stagger/translate), lazy-load images, smooth anchor scrolling.
- Responsive, mobile-first breakpoints.
- SEO meta, `Organization` structured data, accessible alt/ARIA attributes.

**Tech Adoption:**
- Local GSAP, ScrollTrigger, Locomotive Scroll and minimal slider for carousels (offline copies).
- Polyfills for critical IntersectionObserver features.
- Vanilla JS for all DOM logic (JS fallback: all content visible without JS).

**Placeholders:**
- Hero, services, sustainability sections reference event/sustainability placeholders (see README for asset swap guide).
- Data-driven option via `portfolio.json` for case studies/creators.

**Notes:**
- No proprietary images or Monk-E.in text/code/assets reused; all clone code written from scratch or via open-license template.
- Accessibility, performance, and SEO prioritized per requirements.
- For further edits/new assets, see README guides.