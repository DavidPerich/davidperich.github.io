# Spec: Homepage Redesign
**Date**: 2026-08-28  
**Status**: Draft  
**Author**: Gemini CLI

---

## 1. Background & Goals
The goal is to replace the current `index.html` placeholder page with an extremely simple, clean, pure HTML/CSS home page. The design will follow a factual, ultra-minimal "terminal" style with system light/dark theme auto-switching.

## 2. Requirements & Content Specifications

### A. Core Content
- **Header**: David's name and "Staff Software Engineer" title.
- **About Me**: A direct, factual summary describing David's role at Ferocia / Up Bank, technical focus, and career background.
- **Projects Section**: An unordered list of subdomain links under a specified header explaining their purpose.
- **Contact Info**: A simple contact section with a clickable wildcard email address forwarding to David's personal inbox.

### B. Specific Copy
- **Header**:
  ```text
  David Perich
  Staff Software Engineer
  ```
- **About Me**:
  > Staff Software Engineer at Ferocia / Up Bank, specializing in secure banking architectures, multi-signatory payment flows, and customer onboarding systems.
  > 
  > 5+ years of engineering and technical leadership experience, following 8 years of management and consulting experience in the social impact sector.
- **Projects Header**:
  `Projects I host here so my wife/friends can find them`
- **Projects Links**:
  - `https://books.davidperich.com`
  - `https://fifa.davidperich.com`
- **Contact**:
  `Email: hello@davidperich.com` (using a clickable `mailto:` link)

## 3. Design & Architecture

### A. Layout & Styling Strategy
- **Aesthetic**: Minimalist terminal style utilizing system monospace fonts.
- **Responsive Sizing**: Max-width of `650px`, horizontally centered viewport, and standard padding.
- **Styling Method**: Clean, embedded `<style>` block directly inside `index.html` to eliminate extra network requests and maintain extreme simplicity.

### B. Light & Dark Theme Variables
Using CSS variables combined with the `prefers-color-scheme` media query to automatically switch between light and dark modes:

- **Light Mode (Default)**:
  - Background: `#fcfcfc` (soft off-white)
  - Text: `#1a1a1a` (dark charcoal)
  - Links: `#0066cc` (crisp blue)
- **Dark Mode (Auto-switched)**:
  - Background: `#121212` (dark charcoal)
  - Text: `#e0e0e0` (light grey)
  - Links: `#66b2ff` (light blue)

### C. HTML Structure (`index.html`)
- Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<ul>`, `<a>`).
- Meta tags for viewport responsiveness and SEO/social shares (retaining existing useful meta configurations in `index.html` headers).

## 4. Verification & Testing Plan
- Ensure that the page layout renders cleanly on both mobile and desktop screens.
- Validate that the CSS variables successfully auto-toggle when switching operating system themes.
- Confirm all links (`books.davidperich.com`, `fifa.davidperich.com`, and `mailto:hello@davidperich.com`) are fully functional and semantic.
