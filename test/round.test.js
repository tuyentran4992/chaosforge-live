import test from 'node:test';
import assert from 'node:assert/strict';
import { createRound } from '../client/round/controller.js';
import { duckfallback } from '../shared/cartridges.js';

test('forge starts a 4Hz vote and a replacement cartridge owns its timer', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval', 'Date'] });
  let ended = 0;
  const polls = [];
  const round = createRound({ deploy() {}, panic() {}, onEnd() { ended += 1; },
    onState() {}, onCompiled() {}, onPoll(ideas, votes, seconds) { polls.push({ ideas, votes, seconds }); } });
  round.addIdea('flying ducks');
  assert.equal(round.state(), 'voting');
  round.vote(2);
  t.mock.timers.tick(1000);
  assert.ok(polls.length >= 5);
  assert.equal(polls.at(-1).votes[1], 1);
  assert.equal(polls.at(-1).seconds, 14);
  round.deployCartridge(duckfallback());
  t.mock.timers.tick(29000);
  round.deployCartridge(duckfallback());
  t.mock.timers.tick(2000);
  assert.equal(ended, 0);
  assert.equal(round.state(), 'active');
  t.mock.timers.tick(28000);
  assert.equal(ended, 1);
  assert.equal(round.state(), 'idle');
});

test('invalid compiler responses cannot reach the renderer', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ ast: { entity: 'script' }, blocked: false }) }));
  let deployments = 0;
  const states = [];
  const round = createRound({ deploy() { deployments += 1; }, panic() {},
    onState(state, detail) { states.push({ state, detail }); }, onCompiled() {} });
  await round.compile('test');
  assert.equal(deployments, 0);
  assert.deepEqual(states.at(-1), { state: 'idle', detail: 'INVALID COMPILER RESPONSE' });
  assert.equal(round.deployCartridge({ entity: 'script' }), false);
});

test('a new forge starts voting after panic without stale ideas or votes', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval', 'Date'] });
  const polls = [];
  const round = createRound({ deploy() {}, panic() {}, onState() {}, onCompiled() {},
    onPoll(ideas, votes) { polls.push({ ideas, votes }); } });
  round.addIdea('old idea');
  round.vote(2);
  round.clear();
  round.addIdea('new ducks');
  assert.equal(round.state(), 'voting');
  assert.deepEqual(polls.at(-1), { ideas: ['new ducks'], votes: [0, 0, 0] });
  round.vote(1);
  assert.equal(polls.at(-1).votes[0], 1);
});

test('addIdea rejects unsafe ideas and keeps them out of the poll', () => {
  const polls = [];
  const round = createRound({ deploy() {}, panic() {}, onState() {}, onCompiled() {},
    onPoll(ideas, votes) { polls.push({ ideas, votes }); } });
  round.addIdea('make a bomb');
  assert.equal(round.state(), 'idle');
  assert.equal(polls.length, 0);
  round.addIdea('giết người');
  assert.equal(round.state(), 'idle');
  round.addIdea('flying ducks');
  assert.equal(round.state(), 'voting');
  assert.deepEqual(polls.at(-1).ideas, ['flying ducks']);
  round.addIdea('bomba');
  assert.deepEqual(polls.at(-1).ideas, ['flying ducks']);
});
