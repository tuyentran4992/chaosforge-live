import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('design system contains eight sections, examples and safe-zone diagram', () => {
  const html = readFileSync(new URL('../design-system.html', import.meta.url), 'utf8');
  assert.equal((html.match(/<section class="ds-section"/g) || []).length, 8);
  assert.equal((html.match(/class="swatch"/g) || []).length, 9);
  for (const required of ['Telemetry Grey', 'class="sz-frame"', 'class="sz-frame__safe"',
    'sz-zone--boss', 'sz-zone--poll', 'sz-zone--comp', 'class="type-row"', 'class="tokens-grid"',
    'class="comp-row"', 'class="cart ds-demo-cart"', 'class="ds-table"']) {
    assert.ok(html.includes(required), required);
  }
  assert.match(html, /role="img" aria-label="16 by 9 diagram/);
  assert.match(html, /aria-label="Blocked prompt and safe fallback example"/);
  assert.match(html, /PROMPT BLOCKED BY TOS GUARD/);
  assert.match(html, /DEPLOYING SAFE RUBBER DUCK FALLBACK/);
});
