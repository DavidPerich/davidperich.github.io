# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder home page with an extremely simple, clean, factual, and responsive terminal-style HTML homepage that links to subdomains and contains contact info.

**Architecture:** A single pure HTML file (`index.html`) using a semantic `<style>` tag for light/dark theme variables triggered automatically by system settings. A lightweight Node.js script is used to verify content and style assertions.

**Tech Stack:** HTML5, CSS3, Node.js (Standard Library for verification script)

## Global Constraints
- **Styling**: Pure semantic CSS in a `<style>` block. No Tailwind CSS. No external styling libraries.
- **Copy**: Exact factual copy regarding David's role, background, links, and projects as agreed.
- **Email**: Use exact email link `mailto:hello@davidperich.com`.
- **Formatting**: Respect system monospace fonts and keep it clean and minimal.

---

### Task 1: Create Verification Script

**Files:**
- Create: `scripts/verify-homepage.js`

**Interfaces:**
- Consumes: None
- Produces: Executable Node.js assertion-based verification tool for testing the homepage.

- [ ] **Step 1: Write the verification script**

Create `scripts/verify-homepage.js` using pure Node.js to assert that our layout, content, links, and CSS rules are correctly implemented.

```javascript
const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

const indexPath = path.join(__dirname, '../index.html');

try {
  console.log('Starting verification of index.html...');
  const html = fs.readFileSync(indexPath, 'utf-8');

  // 1. Verify basic HTML layout
  assert.match(html, /<!DOCTYPE html>/i, 'Should have DOCTYPE');
  assert.match(html, /<html lang="en(-US)?"/i, 'Should have HTML lang');
  assert.match(html, /<meta name="viewport"/i, 'Should be mobile responsive');

  // 2. Verify Exact Copy
  assert.match(html, /David Perich/i, 'Should contain David Perich');
  assert.match(html, /Staff Software Engineer/i, 'Should contain title');
  assert.match(html, /Staff Software Engineer at Ferocia \/ Up Bank/i, 'Should contain professional role');
  assert.match(html, /Projects I host here so my wife\/friends can find them/i, 'Should contain specific projects section header');

  // 3. Verify Links
  assert.match(html, /href="https:\/\/books\.davidperich\.com"/, 'Should link to books subdomain');
  assert.match(html, /href="https:\/\/fifa\.davidperich\.com"/, 'Should link to fifa subdomain');
  assert.match(html, /href="mailto:hello@davidperich\.com"/, 'Should contain clickable mailto link');

  // 4. Verify Monospace Styling & Media Queries
  assert.match(html, /ui-monospace|SFMono-Regular|monospace/, 'Should use monospace fonts');
  assert.match(html, /prefers-color-scheme:\s*dark/i, 'Should contain prefers-color-scheme dark media query');
  assert.match(html, /--bg-color/i, 'Should use CSS variables for theme colours');

  console.log('✅ Homepage verification PASSED!');
  process.exit(0);
} catch (error) {
  console.error('❌ Homepage verification FAILED:');
  console.error(error.message);
  process.exit(1);
}
```

- [ ] **Step 2: Run verification script to verify it fails**

Run the following command:
`node scripts/verify-homepage.js`

Expected output: **FAIL** (as `index.html` doesn't have the new content, links, or styles yet).

---

### Task 2: Implement Layout & Factual Copy in index.html

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `scripts/verify-homepage.js` (to verify copy changes)
- Produces: HTML containing the updated headers, factual paragraphs, links, and structure.

- [ ] **Step 1: Replace index.html content with the new structural markup**

Using surgical edits or full replacement, set up the updated layout of `index.html`. Retain existing useful meta configurations in the header.

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>David Perich</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="title" property="og:title" content="David Perich" />
    <meta name="description" property="og:description" content="David Perich - Staff Software Engineer" />
    <meta name="author" content="David Perich" />
    <link rel="apple-touch-icon" sizes="180x180" href="/public/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="public/favicons/favicon.ico" />
    <link rel="manifest" href="/public/favicons/site.webmanifest" />
  </head>
  <body>
    <main>
      <header>
        <h1>David Perich</h1>
        <p class="subtitle">Staff Software Engineer</p>
      </header>

      <section class="about">
        <p>
          Staff Software Engineer at Ferocia / Up Bank, specializing in secure banking architectures, 
          multi-signatory payment flows, and customer onboarding systems.
        </p>
        <p>
          5+ years of engineering and technical leadership experience, following 8 years of 
          management and consulting experience in the social impact sector.
        </p>
      </section>

      <section class="projects">
        <h2>Projects I host here so my wife/friends can find them</h2>
        <ul>
          <li><a href="https://books.davidperich.com" target="_blank" rel="noopener">books.davidperich.com</a></li>
          <li><a href="https://fifa.davidperich.com" target="_blank" rel="noopener">fifa.davidperich.com</a></li>
        </ul>
      </section>

      <footer>
        <p>Email: <a href="mailto:hello@davidperich.com">hello@davidperich.com</a></p>
      </footer>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Run verification to check incremental success**

Run: `node scripts/verify-homepage.js`

Expected output: **FAIL** (since typography, variables, and dark mode styling are still missing).

---

### Task 3: Implement Styles & Dark/Light Theme Switching

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `index.html` markup
- Produces: CSS layout matching system preferences automatically.

- [ ] **Step 1: Add internal CSS styling and media queries to head of index.html**

Insert a `<style>` block in `<head>` of `index.html` with monospace typography, max-width constraints, colors, and `prefers-color-scheme` dark mode colors.

```html
    <style>
      :root {
        --bg-color: #fcfcfc;
        --text-color: #1a1a1a;
        --link-color: #0066cc;
        --accent-color: #555555;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg-color: #121212;
          --text-color: #e0e0e0;
          --link-color: #66b2ff;
          --accent-color: #aaaaaa;
        }
      }

      body {
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
        line-height: 1.6;
        margin: 0;
        padding: 2rem 1rem;
        display: flex;
        justify-content: center;
      }

      main {
        max-width: 650px;
        width: 100%;
      }

      header {
        margin-bottom: 2rem;
      }

      h1 {
        font-size: 1.8rem;
        margin: 0 0 0.2rem 0;
        font-weight: bold;
      }

      .subtitle {
        font-size: 1.1rem;
        color: var(--accent-color);
        margin: 0;
      }

      h2 {
        font-size: 1.1rem;
        margin: 2rem 0 1rem 0;
        font-weight: bold;
      }

      p {
        margin: 0 0 1.2rem 0;
      }

      ul {
        list-style-type: "- ";
        padding-left: 1.2rem;
        margin: 0 0 2rem 0;
      }

      li {
        margin-bottom: 0.5rem;
      }

      a {
        color: var(--link-color);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      footer {
        margin-top: 3rem;
        border-top: 1px dashed var(--accent-color);
        padding-top: 1.5rem;
      }
    </style>
```

- [ ] **Step 2: Run verification to check full success**

Run: `node scripts/verify-homepage.js`

Expected output: **PASS** (all assertions should succeed).
