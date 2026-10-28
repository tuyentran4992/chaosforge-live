import test from 'node:test';
import assert from 'node:assert/strict';
import { AST_SCHEMA } from '../shared/ast-schema.js';
import { validateAst } from '../shared/ast-validate.js';
import { duckfallback } from '../shared/cartridges.js';
import { synthesize } from '../shared/synthesize.js';
import { drawEntity } from '../client/overlay/artwork.js';
import { advanceParticle } from '../client/overlay/physics.js';
import { createReactions } from '../client/overlay/reactions.js';
import { createCollisionTracker } from '../client/overlay/collisions.js';
import { createSound } from '../client/audio/sfx.js';
import { readFileSync } from 'node:fs';

test('schema accepts every closed-world entity and sound, rejecting unknown values', () => {
  assert.deepEqual(AST_SCHEMA.properties.entity.enum, ['duck', 'ball', 'star', 'boss', 'doge', 'popcat']);
  assert.deepEqual(AST_SCHEMA.properties.sfx.enum, ['quack', 'pop', 'laser', 'bonk', 'bruh', 'boom', 'none']);
  for (const entity of AST_SCHEMA.properties.entity.enum) {
    for (const sfx of AST_SCHEMA.properties.sfx.enum) assert.ok(validateAst({ ...duckfallback(), entity, sfx }));
  }
  assert.equal(validateAst({ ...duckfallback(), entity: 'image' }), false);
  assert.equal(validateAst({ ...duckfallback(), sfx: 'external' }), false);
});

test('meme vocabulary, precedence and clause negation are deterministic', () => {
  for (const word of ['doge', 'cheems', 'bonk']) assert.equal(synthesize(word).entity, 'doge', word);
  for (const word of ['popcat', 'cat', 'mèo']) assert.equal(synthesize(word).entity, 'popcat', word);
  for (const [word, sound] of [['bonk', 'bonk'], ['bruh', 'bruh'], ['boom', 'boom'], ['vine boom', 'boom'], ['nổ', 'boom']]) {
    assert.equal(synthesize(word).sfx, sound, word);
  }
  assert.equal(synthesize('bonk doge storm with boom sound').sfx, 'boom');
  assert.equal(synthesize('popcat').sfx, 'none');
  assert.equal(synthesize('popcat pop').sfx, 'pop');
  assert.equal(synthesize('duck but without quack sound').sfx, 'none');
  assert.equal(synthesize('boss but no laser').sfx, 'none');
  assert.equal(synthesize('duck but no sound').sfx, 'none');
  for (const prompt of ['doge and bonk but without bonk sound', 'doge and boom nhưng không boom']) {
    const ast = synthesize(prompt);
    assert.equal(ast.entity, 'doge');
    assert.equal(ast.sfx, 'none', prompt);
  }
  assert.equal(synthesize('bonk doge boom but without boom sound').sfx, 'bonk');
  assert.equal(synthesize('bonk doge boom but without bonk sound').sfx, 'boom');
  assert.equal(synthesize('bonk doge but without bonk sound').entity, 'doge');
  for (const prompt of ['doge but without bonk sound', 'doge but no bonk', 'doge but tránh bonk', 'doge nhưng không bonk', 'doge but sin bonk', 'doge but 不要 bonk']) {
    const ast = synthesize(prompt);
    assert.equal(ast.entity, 'doge', prompt);
    assert.notEqual(ast.sfx, 'bonk', prompt);
  }
});

test('meme drawings animate without external assets', () => {
  function operations(entity, now) {
    const calls = [];
    const ctx = new Proxy({}, { get: (_, name) => (...args) => calls.push([name, ...args]),
      set: (_, name, value) => { calls.push([name, value]); return true; } });
    drawEntity(ctx, entity, 'bounce', 0, 0, now);
    return calls;
  }
  for (const entity of ['doge', 'popcat']) assert.notDeepEqual(operations(entity, 0), operations(entity, 200));
  assert.notDeepEqual(operations('doge', 0), operations('popcat', 0));
});

test('edge collisions emit once per crossing and reactions expire after 1.5 seconds', () => {
  let collisions = 0;
  const particle = { x: 1919, y: 400, vx: 100, vy: 0 };
  advanceParticle(particle, { gravity: 0, collision: 'bounce' }, 0.1, () => collisions++);
  advanceParticle(particle, { gravity: 0, collision: 'bounce' }, 0.1, () => collisions++);
  assert.equal(collisions, 1);
  const reactions = createReactions();
  const labels = [];
  const ctx = new Proxy({}, { get: (_, name) => name === 'fillText' ? (label) => labels.push(label) : name === 'measureText' ? () => ({ width: 300 }) : () => {}, set: () => true });
  reactions.add(500, 500, 100, true);
  reactions.draw(ctx, 1599);
  assert.deepEqual(labels, ['SKILL ISSUE!']);
  reactions.draw(ctx, 1600);
  assert.equal(labels.length, 1);
});

test('meme sounds synthesize distinct envelopes and mute prevents new nodes', () => {
  const played = [];
  let suspended = 0;
  const parameter = () => ({ setValueAtTime(value) { this.initial = value; }, exponentialRampToValueAtTime(value) { this.end = value; } });
  const context = { currentTime: 0, destination: {}, resume() {}, suspend() { suspended++; },
    createOscillator() { const node = { frequency: parameter(), connect() {}, start() { played.push(node); }, stop() {} }; return node; },
    createGain() { return { gain: parameter(), connect() {}, disconnect() {} }; },
    createDelay() { return { delayTime: {}, connect() {}, disconnect() {} }; },
  };
  const sound = createSound(() => context);
  for (const kind of ['bonk', 'bruh', 'boom']) sound.play(kind);
  assert.deepEqual(played.map((node) => [node.type, node.frequency.initial, node.frequency.end]),
    [['triangle', 620, 160], ['sawtooth', 180, 65], ['sine', 150, 35]]);
  sound.setEnabled(false);
  sound.play('boom');
  assert.equal(played.length, 3);
  assert.equal(suspended, 1);
});

test('built-in meme cartridges remain available under their exact names', () => {
  const library = readFileSync(new URL('../client/cartridges/library.js', import.meta.url), 'utf8');
  for (const name of ['Bonk Doge Hammer Storm', 'Popcat Chorus Hype']) {
    assert.ok(library.includes(name));
    assert.ok(validateAst(synthesize(name)));
  }
});


test('entity contacts fire once on entry, including after an entity is removed', () => {
  const tracker = createCollisionTracker();
  const a = { x: 50, y: 50 };
  const b = { x: 60, y: 50 };
  const c = { x: 200, y: 50 };
  const hits = [];
  const hit = (x, y) => hits.push([x, y]);
  tracker.update([a, b, c], hit);
  tracker.update([a, b, c], hit);
  assert.deepEqual(hits, [[55, 50]]);
  tracker.update([a, c], hit);
  c.x = 70;
  tracker.update([a, c], hit);
  assert.deepEqual(hits, [[55, 50], [60, 50]]);
  c.x = 200;
  tracker.update([a, c], hit);
  c.x = 70;
  tracker.update([a, c], hit);
  assert.equal(hits.length, 3);
});

test('late collision remains pending and displays for a full 1.5 seconds', () => {
  const reactions = createReactions();
  const calls = [];
  const ctx = new Proxy({}, {
    get: (_, name) => name === 'fillText' ? (...args) => calls.push(args) : () => {},
    set: () => true,
  });
  reactions.add(0, 0, 0);
  reactions.add(0, 0, 1499);
  reactions.draw(ctx, 1499);
  reactions.draw(ctx, 1500);
  reactions.draw(ctx, 2999);
  assert.deepEqual(calls.map((call) => call[0]), ['SKILL ISSUE!', 'RIGGED!', 'RIGGED!']);
  const [, x, y, maxWidth] = calls[1];
  assert.ok(x - maxWidth / 2 - 24 >= 448, 'compiler HUD');
  assert.ok(x + maxWidth / 2 + 24 <= 1513, 'stage webcam');
  assert.ok(y >= 950 && y <= 1010, 'bottom lane');
  reactions.draw(ctx, 3000);
  assert.equal(calls.length, 3);
});

test('collision bursts coalesce into one pending reaction and panic preempts all', () => {
  const reactions = createReactions();
  const calls = [];
  const ctx = new Proxy({}, { get: (_, name) => name === 'fillText' ? (label) => calls.push(label) : () => {}, set: () => true });
  reactions.add(0, 0, 0);
  for (let time = 100; time < 1500; time += 100) reactions.add(0, 0, time);
  reactions.draw(ctx, 1499);
  reactions.draw(ctx, 1500);
  reactions.draw(ctx, 3000);
  assert.deepEqual(calls, ['SKILL ISSUE!', 'RIGGED!']);
  reactions.add(0, 0, 3100);
  reactions.add(0, 0, 3200);
  reactions.add(0, 0, 3300, true);
  reactions.draw(ctx, 3300);
  reactions.draw(ctx, 4800);
  assert.deepEqual(calls, ['SKILL ISSUE!', 'RIGGED!', 'SKILL ISSUE!']);
});
