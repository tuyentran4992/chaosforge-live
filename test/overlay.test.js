import test from 'node:test';
import assert from 'node:assert/strict';
import { createOverlay } from '../client/overlay/engine.js';
import { encodePoll } from '../client/round/poll.js';
import { duckfallback } from '../shared/cartridges.js';
import { readFileSync } from 'node:fs';

class Element {
  constructor() { this.children = []; this.dataset = {}; this.style = {}; this.textContent = ''; }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children = []; }
}

test('overlay renders full escaped poll and updates boss timer on a frame', (t) => {
  const descriptors = ['document', 'ResizeObserver', 'requestAnimationFrame'].map((name) =>
    [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
  t.after(() => {
    for (const [name, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor); else delete globalThis[name];
    }
  });
  t.mock.method(Date, 'now', () => 1000);
  const frames = [];
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { createElement: () => new Element() } });
  Object.defineProperty(globalThis, 'ResizeObserver', { configurable: true, value: class { observe() {} } });
  Object.defineProperty(globalThis, 'requestAnimationFrame', { configurable: true, value: (callback) => frames.push(callback) });
  const labels = [];
  const context = new Proxy({}, { get: (_, name) => name === 'fillText' ? (label) => labels.push(label) : name === 'measureText' ? () => ({ width: 300 }) : () => {}, set: () => true });
  const canvas = { getContext: () => context };
  const nodes = new Map();
  const root = new Element();
  root.querySelector = (selector) => {
    if (selector === 'canvas') return canvas;
    if (!nodes.has(selector)) nodes.set(selector, new Element());
    return nodes.get(selector);
  };
  const mount = { firstElementChild: root, clientWidth: 1920, clientHeight: 1080 };
  const overlay = createOverlay(mount);
  assert.equal(overlay.deploy(duckfallback(), 31000), true);
  assert.equal(nodes.get('[data-verified]').textContent, '✓ AST SAFE VERIFIED');
  const uncertainAst = { ...duckfallback(), tags: ['synthesized', 'duck', 'uncertain'] };
  assert.equal(overlay.deploy(uncertainAst, 31000), true);
  assert.equal(nodes.get('[data-verified]').textContent, '✓ AST SAFE · DEFAULT FALLBACK');
  const targets = overlay.targets();
  targets.forEach((entity, index) => {
    entity.x = 100 + (index % 10) * 150;
    entity.y = 100 + Math.floor(index / 10) * 150;
    entity.vx = 0;
    entity.vy = 0;
  });
  targets[1].x = targets[0].x + 10;
  targets[1].y = targets[0].y;
  frames.shift()(performance.now() + 16);
  assert.ok(labels.includes('SKILL ISSUE!'), 'entity contact creates an overlay reaction');
  assert.equal(nodes.get('[data-boss-time]').textContent, 30);
  assert.equal(nodes.get('[data-boss-fill]').style.width, '100%');
  const ideas = ['"'.repeat(160), '\\'.repeat(160), '\u0000'.repeat(160)];
  overlay.showState('voting', encodePoll(ideas, [1, 2, 3], 12.5));
  const list = nodes.get('[data-poll]');
  assert.equal(list.children.length, 3);
  for (let i = 0; i < 3; i += 1) {
    const text = list.children[i].children[1].children[0];
    assert.equal(text.textContent, ideas[i]);
    assert.equal(text.title, ideas[i]);
    assert.equal(text.dataset.len, 'lg');
    assert.equal(list.children[i].dataset.len, 'lg');
  }
  const mixedIdeas = ['short idea', 'a'.repeat(60), 'b'.repeat(120)];
  overlay.showState('voting', encodePoll(mixedIdeas, [0, 0, 0], 10));
  assert.equal(list.children[0].children[1].children[0].dataset.len, 'sm');
  assert.equal(list.children[1].children[1].children[0].dataset.len, 'md');
  assert.equal(list.children[2].children[1].children[0].dataset.len, 'lg');
  assert.equal(nodes.get('[data-poll-total]').textContent, 0);
  overlay.clear();
  assert.equal(nodes.get('[data-verified]').textContent, '✓ AST SAFE VERIFIED');
  assert.equal(overlay.count(), 0);
  assert.equal(root.dataset.state, 'idle');
  labels.length = 0;
  overlay.clear(true);
  frames.shift()(performance.now() + 16);
  assert.ok(labels.includes('RIGGED!'));
  assert.equal(overlay.count(), 0);
});

test('broadcast poll has a bounded panel and adaptive font sizing without line clamp', () => {
  const css = readFileSync(new URL('../client/styles/main.css', import.meta.url), 'utf8');
  assert.match(css, /\.ov-poll\s*\{[^}]*height:\s*352px;[^}]*overflow:\s*hidden;/s);
  assert.match(css, /-webkit-line-clamp:\s*unset;/);
  assert.match(css, /\.ov-idea__text\[data-len="sm"\]\s*\{[^}]*font-size:\s*16px;/s);
  assert.match(css, /\.ov-idea__text\[data-len="md"\]\s*\{[^}]*font-size:\s*13\.5px;/s);
  assert.match(css, /\.ov-idea__text\[data-len="lg"\]\s*\{[^}]*font-size:\s*11\.5px;/s);
});
