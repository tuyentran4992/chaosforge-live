import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { attachRooms } from '../server/rooms.js';
import { duckfallback } from '../shared/cartridges.js';
import { encodePoll } from '../client/round/poll.js';

class Socket extends EventEmitter {
  constructor() { super(); this.output = []; this.destroyed = false; this.writable = true; }
  write(value) { this.output.push(value); return true; }
  end() { this.destroyed = true; this.emit('close'); }
  destroy() { this.end(); }
  messages() {
    return this.output.filter(Buffer.isBuffer).filter((buffer) => (buffer[0] & 15) === 1).map((buffer) => {
      const offset = (buffer[1] & 127) === 126 ? 4 : 2;
      return JSON.parse(buffer.subarray(offset).toString());
    });
  }
}

function send(socket, value) {
  const body = Buffer.from(JSON.stringify(value));
  const mask = Buffer.from([1, 2, 3, 4]);
  const header = body.length < 126 ? Buffer.from([0x81, 0x80 | body.length]) :
    Buffer.from([0x81, 0x80 | 126, body.length >> 8, body.length & 255]);
  const masked = Buffer.from(body);
  for (let i = 0; i < masked.length; i += 1) masked[i] ^= mask[i % 4];
  socket.emit('data', Buffer.concat([header, mask, masked]));
}

test('studio snapshots and explicit raid events use separate rooms', () => {
  const server = new EventEmitter();
  attachRooms(server);
  function connect() {
    const socket = new Socket();
    server.emit('upgrade', { url: '/ws', headers: { upgrade: 'websocket',
      'sec-websocket-version': '13', 'sec-websocket-key': 'dGhlIHNhbXBsZSBub25jZQ==' } }, socket, Buffer.alloc(0));
    return socket;
  }
  const studio = connect();
  const obs = connect();
  const rival = connect();
  const raid = connect();
  const studioId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  send(studio, { type: 'join', kind: 'studio', studio: studioId });
  send(obs, { type: 'join', kind: 'studio', studio: studioId });
  send(rival, { type: 'join', kind: 'raid', room: 'TW26' });
  send(raid, { type: 'join', kind: 'raid', room: 'TW26' });
  send(studio, { type: 'deploy', id: 'local', ast: duckfallback() });
  assert.equal(obs.messages().at(-1).type, 'deploy');
  assert.equal(rival.messages().length, 1);
  send(studio, { type: 'state', id: 'vote', state: 'voting', detail: 'poll' });
  const ideas = ['"'.repeat(160), '\\'.repeat(160), '\u0000'.repeat(160)];
  const detail = encodePoll(ideas, [1, 2, 3], 14.75);
  const message = { type: 'state', id: 'escaped', state: 'voting', detail };
  assert.ok(Buffer.byteLength(JSON.stringify(message)) < 8192);
  send(studio, message);
  assert.deepEqual(JSON.parse(obs.messages().at(-1).detail).ideas, ideas);
  const late = connect();
  send(late, { type: 'join', kind: 'studio', studio: studioId });
  assert.equal(late.messages()[0].latest.id, 'local');
  assert.equal(late.messages()[0].phase.id, 'escaped');
  assert.deepEqual(JSON.parse(late.messages()[0].phase.detail).ideas, ideas);
  send(raid, { type: 'raid-send', id: 'raid', ast: duckfallback() });
  assert.equal(rival.messages().at(-1).type, 'raid-receive');
  assert.equal(raid.messages().at(-1).delivered, 1);
});
