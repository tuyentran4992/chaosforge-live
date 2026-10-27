import test from 'node:test';
import assert from 'node:assert/strict';
import { createSync } from '../client/sync/channel.js';
import { encodePoll } from '../client/round/poll.js';
import { MAX_STATE_DETAIL } from '../shared/sync-contract.js';

test('full escaped poll is accepted locally and sent without truncation', (t) => {
  const names = ['location', 'WebSocket', 'BroadcastChannel'];
  const original = names.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
  t.after(() => {
    for (const [name, descriptor] of original) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  });
  class FakeWebSocket {
    static OPEN = 1;
    static instance;
    constructor() { this.readyState = 1; this.sent = []; FakeWebSocket.instance = this; }
    send(data) { this.sent.push(JSON.parse(data)); }
  }
  class FakeBroadcastChannel {
    constructor() { this.sent = []; }
    postMessage(data) { this.sent.push(data); }
  }
  Object.defineProperty(globalThis, 'location', { configurable: true, value: { protocol: 'http:', host: 'example.test' } });
  Object.defineProperty(globalThis, 'WebSocket', { configurable: true, value: FakeWebSocket });
  Object.defineProperty(globalThis, 'BroadcastChannel', { configurable: true, value: FakeBroadcastChannel });
  const events = [];
  const sync = createSync((event) => events.push(event), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
  const socket = FakeWebSocket.instance;
  socket.onopen();
  socket.onmessage({ data: JSON.stringify({ type: 'joined', latest: null, phase: null }) });
  const ideas = ['"'.repeat(160), '\\'.repeat(160), '\u0000'.repeat(160)];
  const detail = encodePoll(ideas, [7, 8, 9], 13.5);
  assert.ok(detail.length > 500 && detail.length <= MAX_STATE_DETAIL);
  sync.publish('state', { state: 'voting', detail });
  assert.deepEqual(JSON.parse(events.at(-1).detail).ideas, ideas);
  assert.deepEqual(JSON.parse(socket.sent.at(-1).detail).ideas, ideas);
  for (const sample of ['\u0000', '\ud800', '界', '😀']) {
    const expected = Array(3).fill(sample.repeat(160).slice(0, 160));
    const encoded = encodePoll(expected, [0, 0, 0], 15);
    assert.ok(encoded.length <= MAX_STATE_DETAIL);
    assert.ok(Buffer.byteLength(JSON.stringify({ type: 'state', id: 'test', state: 'voting', detail: encoded })) < 8192);
    sync.publish('state', { state: 'voting', detail: encoded });
    assert.deepEqual(JSON.parse(socket.sent.at(-1).detail).ideas, expected);
  }
});
