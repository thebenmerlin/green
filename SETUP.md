# Green Eventwaala - Setup & Deployment Guide

## Quick Start

1. **Unzip the package**
   ```bash
   unzip green-eventwaala-v1.zip
   cd green-eventwaala-v1
   ```

2. **Open in browser**
   - Simply double-click `index.html`
   - Or open via local server (recommended)

3. **Local Server (Optional but Recommended)**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (npx)
   npx serve

   # PHP
   php -S localhost:8000
   ```
   Then visit: http://localhost:8000

## File Structure

```
green-eventwaala-v1/
├── index.html              # Homepage
├── work.html               # Portfolio/case studies
├── creators.html           # Partners page
├── about.html              # About/mission
├── contact.html            # Contact form
├── css/
│   ├── styles.css          # Main stylesheet (commented)
│   └── styles.min.css      # Minified version
├── js/
│   ├── scripts.js          # Main JavaScript (commented)
│   └── scripts.min.js      # Minified version
├── assets/
│   ├── images/             # Event photos, placeholders
│   ├── logos/              # Client/partner logos
│   ├── fonts/              # Web fonts
│   └── hero-placeholder.mp4 # Hero video (replace)
├── vendor/
│   ├── gsap.min.js         # Animation library (placeholder)
│   ├── ScrollTrigger.min.js # Scroll animations (placeholder)
│   └── locomotive-scroll.min.js # Smooth scroll (placeholder)
├── data/
│   └── portfolio.json      # Case study data
├── screenshot/             # Site previews
├── README.md               # Main documentation
├── CHANGELOG.md            # Version history
└── LICENSE                 # MIT License
```

## Customization

### 1. Replace Brand Colors

Edit `css/styles.css` (lines 10-15):
```css
:root {
    --brand-primary: #1E8F4A;      /* Main green */
    --brand-primary-dark: #0F5C31; /* Dark green */
    --brand-accent: #F6C24E;       /* Yellow accent */
    /* ... */
}
```

### 2. Update Content

**Homepage hero:**
- Edit `index.html` line ~60-70 (hero title/subtitle)

**Stats/counters:**
- Edit `index.html` line ~90-110 (data-count attributes)

**Services:**
- Edit `index.html` line ~130-180 (service cards)

**Case studies:**
- Edit `data/portfolio.json` (JSON format)

### 3. Replace Assets

**Hero Video:**
1. Add your video to `assets/`
2. Update `index.html` line ~50: `<source src="assets/your-video.mp4">`

**Logos & Images:**
1. Add files to `assets/images/` or `assets/logos/`
2. Update image src attributes in HTML

**Fonts:**
1. Download Inter from Google Fonts
2. Place WOFF2 files in `assets/fonts/`
3. Already configured in CSS

### 4. Install Animation Libraries (Optional)

**GSAP:**
```bash
# Download from https://greensock.com/gsap/
# Replace vendor/gsap.min.js and vendor/ScrollTrigger.min.js
```

**Locomotive Scroll:**
```bash
# Download from https://github.com/locomotivemtl/locomotive-scroll
# Replace vendor/locomotive-scroll.min.js
```

**Note:** Site works without these libraries using fallback animations.

## Adding New Pages

1. **Create HTML file**
   ```html
   <!-- Copy header/footer from existing pages -->
   ```

2. **Add navigation link**
   Update `.nav-list` in all HTML files

3. **Style page-specific elements**
   Add to `css/styles.css`

## Form Integration

The contact form (`contact.html`) currently:
- Validates client-side
- Shows success message
- Logs to console

To connect to a backend:

**Option 1: PHP**
```php
<?php
// contact-handler.php
$name = $_POST['name'];
$email = $_POST['email'];
// ... send email or save to database
?>
```

**Option 2: JavaScript (API)**
```javascript
// In scripts.js, update handleSubmit function
fetch('/api/contact', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
})
```

**Option 3: Third-party Services**
- Formspree: https://formspree.io/
- Basin: https://usebasin.com/
- Netlify Forms: https://www.netlify.com/products/forms/

## Deployment

### Static Hosting (Recommended)

**Netlify:**
1. Drag & drop the `green-eventwaala-v1` folder to netlify.com
2. Site goes live instantly
3. Free SSL certificate included

**Vercel:**
```bash
npm install -g vercel
cd green-eventwaala-v1
vercel
```

**GitHub Pages:**
1. Create a repo and push code
2. Go to Settings → Pages
3. Select branch → Save
4. Site live at `username.github.io/repo-name`

**AWS S3 + CloudFront:**
1. Upload to S3 bucket
2. Enable static website hosting
3. Add CloudFront distribution for HTTPS

### Traditional Hosting

Upload via FTP/SFTP to any web host:
- cPanel: File Manager → Upload
- FTP: Use FileZilla or similar
- SSH: `rsync` or `scp`

## Performance Optimization

### Images
```bash
# Install tools
npm install -g imagemin-cli

# Optimize images
imagemin assets/images/*.jpg --out-dir=assets/images/optimized

# Convert to WebP
cwebp input.jpg -q 80 -o output.webp
```

### Minification
Already included:
- `styles.min.css` (minified CSS)
- `scripts.min.js` (minified JS)

To use minified versions, update HTML:
```html
<link rel="stylesheet" href="css/styles.min.css">
<script src="js/scripts.min.js"></script>
```

### Caching
Add to `.htaccess` (Apache):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## Browser Support

- **Modern browsers:** Full support (Chrome, Firefox, Safari, Edge)
- **IE11:** Partially supported (no CSS Grid fallback)
- **Mobile:** Fully responsive on iOS Safari and Android Chrome

## Troubleshooting

**Issue: Animations not working**
- Install actual GSAP library (see vendor/README.md)
- Check browser console for errors

**Issue: Form not submitting**
- Connect to backend (see Form Integration section)
- Check console for validation errors

**Issue: Video not playing**
- Replace placeholder with actual MP4 file
- Ensure video format is H.264
- Check browser autoplay policies

**Issue: Fonts not loading**
- Download Inter from Google Fonts
- Place in assets/fonts/
- Clear browser cache

## Support & Contribution

This is a static template. Modify freely:
- Update branding in CSS variables
- Add new sections to HTML
- Extend JavaScript functionality
- Customize animations

Licensed under MIT - see LICENSE file.

## Next Steps

1. ✅ Replace hero video with real footage
2. ✅ Add actual client logos
3. ✅ Update case studies in portfolio.json
4. ✅ Install GSAP for smooth animations
5. ✅ Connect contact form to backend
6. ✅ Take screenshots for documentation
7. ✅ Deploy to hosting platform
8. ✅ Set up analytics (Google Analytics, etc.)

Good luck with your sustainable events business! 🌱
