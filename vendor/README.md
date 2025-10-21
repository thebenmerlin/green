# Vendor Libraries

This folder contains local copies of third-party JavaScript libraries used for animations and scroll effects.

## Included Libraries

### GSAP (GreenSock Animation Platform)
- **Files**: `gsap.min.js`, `ScrollTrigger.min.js`
- **Version**: 3.12.2 (recommended)
- **License**: Free for most use cases; see https://greensock.com/licensing/
- **Download**: https://greensock.com/gsap/

To install GSAP:
1. Download from https://greensock.com/gsap/
2. Replace `gsap.min.js` and `ScrollTrigger.min.js` with downloaded files

### Locomotive Scroll
- **File**: `locomotive-scroll.min.js`
- **Version**: 4.1.4 (recommended)
- **License**: MIT
- **GitHub**: https://github.com/locomotivemtl/locomotive-scroll

To install Locomotive Scroll:
1. Download from https://github.com/locomotivemtl/locomotive-scroll
2. Replace `locomotive-scroll.min.js` with the minified build file

## Usage Notes

The site is designed to work with or without these libraries:
- Without GSAP: Basic CSS animations still work
- Without Locomotive Scroll: Native browser smooth scroll is used

For production deployment:
1. Download the latest stable versions of each library
2. Replace the placeholder files in this folder
3. Test all animations across different browsers
4. Consider using a CDN alternative if offline support isn't required

## Licenses

- **GSAP**: Standard "no charge" license for most projects (see GreenSock website)
- **Locomotive Scroll**: MIT License
- All libraries are the property of their respective owners
