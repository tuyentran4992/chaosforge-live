import test from 'node:test';
import assert from 'node:assert/strict';
import { insideSafe, spawnParticle, advanceParticle } from '../client/overlay/physics.js';
import { drawEntity } from '../client/overlay/artwork.js';

test('all edges spawn outside the inclusive safe zone including random endpoints', () => {
  for (let side = 0; side < 4; side += 1) {
    for (const value of [0, 0.5, 0.999999]) {
      const particle = spawnParticle(side, () => value);
      assert.equal(insideSafe(particle.x, particle.y), false);
    }
  }
  assert.equal(insideSafe(384, 216), true);
  assert.equal(insideSafe(1536, 864), true);
});

test('entity and shield choices produce different drawing operations', () => {
  function operations(entity, collision) {
    const calls = [];
    const context = new Proxy({}, {
      get(_target, name) { return (...args) => calls.push([name, ...args]); },
      set(_target, name, value) { calls.push([name, value]); return true; },
    });
    drawEntity(context, entity, collision, 0, 0);
    return calls;
  }
  assert.notDeepEqual(operations('duck', 'bounce'), operations('boss', 'bounce'));
  assert.notDeepEqual(operations('ball', 'bounce'), operations('star', 'bounce'));
  assert.notDeepEqual(operations('duck', 'bounce'), operations('duck', 'shield'));
});

test('gravity and collision choices change motion', () => {
  const initial = { x: 1919, y: 400, vx: 100, vy: 0 };
  const bounce = advanceParticle({ ...initial }, { gravity: 1, collision: 'bounce' }, 0.1);
  const shield = advanceParticle({ ...initial }, { gravity: 1, collision: 'shield' }, 0.1);
  const floating = advanceParticle({ ...initial }, { gravity: -1, collision: 'float' }, 0.1);
  assert.equal(bounce.vy, 8);
  assert.equal(floating.vy, -8);
  assert.equal(bounce.vx, -100);
  assert.equal(shield.vx, -80);
  assert.equal(floating.vx, 100);
  assert.equal(floating.x, 9);
});
