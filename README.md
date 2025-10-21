# Green Eventwaala – Static Site Build Instructions

## Overview
This is a design-inspired static clone of the Monk-E.in public site, rebranded for the corporate events and sustainability-focused business "Green Eventwaala." This README covers site structure, setup, rebranding, asset replacement, core design/animation features, and sustainability messaging.

## Project Structure
- `index.html`: Home page (hero+video, animated counters, sustainability stats, services, logo carousel, featured cases, creators/partners block, footer)
- `work.html`: Corporate case studies (grid/list; modal or detail pages highlighting sustainable event solutions)
- `creators.html`: Partner/creator/artisan grid (focus: eco vendors, recycled artisans)
- `about.html`: Mission, vision, certifications, CSR, sustainability/impact
- `contact.html`: Corporate contact + RFP form (includes procurement/department, file upload, spam prevention)
- `css/`: `styles.css` (readable with comments, CSS vars), `styles.min.css` (minified)
- `js/`: `scripts.js` (with comments, ES6 modules), `scripts.min.js` (minified)
- `vendor/`: local GSAP, ScrollTrigger, Locomotive Scroll (or equivalent), slider/marquee lib, polyfills
- `assets/`: images, video, placeholder logos/icons, webfonts
- `data/portfolio.json`: Editable JSON listing case studies and partners (optional)
- `screenshot/`: Screenshot previews (desktop/mobile)
- `LICENSE`, `CHANGELOG.md`, `README.md`

## How To Run Locally
1. Unzip `green-eventwaala-v1.zip` into a folder.
2. Open `index.html` in your browser. No server needed.
3. All pages, animations, forms, and images work offline.

## Asset & Brand Swapping
- To swap the hero video: replace `/assets/hero.mp4` with your new video; update `<video src>` in `index.html`.
- To change the logo: replace `/assets/logo.png` and update favicon files if needed.
- To update partner/case logos: add images in `assets/logos/` and edit `index.html`/pages for new `<img>` references.
- For font changes: update or add new `.woff2`/`.ttf` files in `assets/fonts/`, and edit the top of `styles.css`.

## Customization — Colors & Copy
- All theme colors are defined in `styles.css` under `:root`. (E.g. `--brand-primary`, `--brand-accent`, etc). Change these to rebrand.
- All placeholder sustainability stats and impact counters can be updated directly in HTML or dynamically via `scripts.js` (example: `200+ events`, `10,000kg recycled`).
- Example home hero headline: `Corporate Events — Reimagined, Responsibly.`
- Example call-to-action: `Book your next sustainable corporate conference with us`.

## Animations & Scroll Effects
- Animations powered by GSAP + ScrollTrigger and Locomotive Scroll (see `vendor/`).
- Scroll triggers: fade-up, staggered card reveals, parallax effects, sticky header.
- Counters/metrics animated using JS when visible in viewport (IntersectionObserver polyfilled).
- Logo/partner carousel uses local slider/marquee, no CDN.
- All JS has `no-JS` graceful fallback; content and forms always accessible.

## Accessibility, SEO, & Performance
- Semantic HTML5 throughout; all images have `alt` attributes.
- Keyboard navigation (tab/shift-tab) enabled for nav, modals, forms.
- Responsive at 320/480/768/1024/1440px breakpoints.
- Optimized images: use both WebP and JPEG, with `srcset` for high/low-res.
- Includes `meta`/OpenGraph tags, `Organization` structured data, `service` offering as "Event Management", `areaServed` (placeholder; update as needed).
- Certifications or partnerships badge area on About/Index.

## Sustainability Content Guidance
- Use sustained messaging throughout: "zero-plastic policy", "carbon offset", "recycled materials", "eco-vendor partners", "waste-minimization", "circular supply chain".
- Impact block: animated stats (events held, kg recycled, waste diverted; replace numbers as needed).
- Each case study/service should highlight sustainability outcomes.

## Animations/Lib Licensing
- All JS libraries in `vendor/` are open-source: see MIT license or equivalent. Replace/update version if needed.

## Changelog & Further Edits
- See `CHANGELOG.md` for what was changed vs original site structure.

## Support
- For static structure changes: edit HTML.
- For new colors/brand styles: adjust CSS vars in `styles.css`.
- For new events, partners, cases: add to `portfolio.json` and update card blocks with new content where needed.

---
Any custom widgets should be written in vanilla JS for portability. See comments in CSS and JS for section-by-section notes on key logic, animation triggers, and sustainability content tokens.