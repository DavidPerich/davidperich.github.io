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
