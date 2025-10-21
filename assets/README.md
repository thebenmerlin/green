# Assets Directory

This folder contains all visual assets for the Green Eventwaala website.

## Directory Structure

- `images/` - Event photos, hero backgrounds, case study images
- `logos/` - Client logos, partner logos, certification badges
- `fonts/` - Web font files (WOFF2, TTF)
- `hero-placeholder.mp4` - Hero section background video

## Placeholder Assets

The following placeholders are included for demonstration:
- `images/placeholder-work-1.jpg` - Case study image 1
- `images/placeholder-work-2.jpg` - Case study image 2
- `images/placeholder-work-3.jpg` - Case study image 3
- `hero-placeholder.mp4` - Video placeholder (needs replacement)

## Replacing Assets

### Hero Video
1. Record or source a high-quality corporate/sustainability video
2. Recommended specs: 1920x1080, H.264, under 10MB
3. Replace `hero-placeholder.mp4`
4. Update `<video>` src in `index.html` if filename changes

### Case Study Images
1. Use real event photography (ensure you have rights)
2. Recommended size: 1200x800px minimum
3. Optimize: Use WebP format with JPEG fallback
4. Name files descriptively: `event-name-year.jpg`

### Client Logos
1. Add logo files to `logos/` directory
2. Recommended format: SVG (scalable) or PNG with transparency
3. Ensure logos are properly licensed for use
4. Update HTML img tags or portfolio.json

### Fonts
The site uses Inter font family. To add local fonts:
1. Download Inter from https://fonts.google.com/specimen/Inter
2. Place WOFF2 files in `fonts/` directory
3. Update `@font-face` declarations in CSS if needed

## Image Optimization

For production:
- Use WebP format for photos (with JPEG fallback)
- Compress images: aim for <200KB per image
- Use `srcset` for responsive images
- Add proper `alt` text for accessibility

## License & Rights

Ensure all images and videos:
- Are properly licensed for commercial use
- Have necessary model/property releases
- Credit photographers/videographers as required
- Don't include copyrighted brand assets without permission
