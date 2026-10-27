import test from 'node:test';
import assert from 'node:assert/strict';
import { makeObsUrl, validStudioId } from '../client/ui/obs-link.js';
import { overlayView } from '../client/ui/overlay-view.js';

test('OBS setup uses a valid Studio-specific URL and rejects missing IDs', () => {
  const studio = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  const source = makeObsUrl('https://example.test/#/overlay', studio);
  assert.equal(source.pathname, '/overlay.html');
  assert.equal(source.searchParams.get('studio'), studio);
  assert.equal(validStudioId(null), false);
  assert.equal(validStudioId('-'.repeat(36)), false);
  assert.throws(() => makeObsUrl('https://example.test/', ''), TypeError);
  const markup = overlayView();
  assert.match(markup, /id="obsUrl"/);
  assert.match(markup, /Copy the Studio-specific URL/);
  assert.doesNotMatch(markup, /<code>overlay\.html<\/code>/);
});
