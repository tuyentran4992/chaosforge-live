import test from 'node:test';
import assert from 'node:assert/strict';
import { createCombat } from '../client/game/combat.js';

test('arcade fires at entities, scores hits and clears bullets', () => {
  const combat = createCombat();
  const player = { x: 100, y: 100 };
  const targets = [{ x: 400, y: 200 }];
  assert.deepEqual(combat.update(player, targets, 0), []);
  assert.equal(combat.state.bullets.length, 1);
  assert.deepEqual(combat.update(player, targets, 100 / 740), [0]);
  assert.equal(combat.state.score, 150);
  combat.update(player, [{ x: 600, y: 200 }], 0.3);
  combat.clear();
  assert.equal(combat.state.bullets.length, 0);
});

test('contact reduces hull once during its cooldown', () => {
  const combat = createCombat();
  combat.state.fireDelay = 10;
  const player = { x: 100, y: 100 };
  const targets = [{ x: 205, y: 205 }];
  combat.update(player, targets, 0.01);
  combat.update(player, targets, 0.01);
  assert.equal(combat.state.hull, 90);
});
