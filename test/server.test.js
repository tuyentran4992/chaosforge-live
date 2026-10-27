import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/index.js';
import { duckfallback } from '../shared/cartridges.js';

async function start(options) {
  const server = createApp(options);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  return { server, origin };
}

test('HTTP compiler validates requests and serves only public paths', async (t) => {
  const { server, origin } = await start();
  t.after(() => server.close());
  const result = await fetch(`${origin}/api/compile`, { method: 'POST',
    headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: 'rubber ducks' }) });
  assert.equal(result.status, 200);
  assert.equal((await result.json()).source, 'local');
  assert.equal((await fetch(`${origin}/api/compile`, { method: 'POST', body: '{' })).status, 400);
  assert.equal((await fetch(`${origin}/server/compiler.js`)).status, 404);
  assert.equal((await fetch(`${origin}/api/compile`)).status, 405);
});

test('studio control is separate from explicit raid delivery and supports late joins', async (t) => {
  const { server, origin } = await start();
  t.after(() => server.close());
  async function connect() {
    const ws = new WebSocket(origin.replace('http:', 'ws:') + '/ws');
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });
    t.after(() => ws.close());
    return ws;
  }
  function next(ws) {
    return new Promise((resolve) => ws.addEventListener('message', (event) => resolve(JSON.parse(event.data)), { once: true }));
  }
  const first = await connect();
  let response = next(first);
  first.send(JSON.stringify({ type: 'join', kind: 'studio', studio: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }));
  assert.equal((await response).kind, 'studio');
  const second = await connect();
  response = next(second);
  second.send(JSON.stringify({ type: 'join', kind: 'studio', studio: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }));
  await response;
  response = next(second);
  first.send(JSON.stringify({ type: 'deploy', id: 'test-1', ast: duckfallback() }));
  const received = await response;
  assert.equal(received.type, 'deploy');
  assert.equal(received.id, 'test-1');
  assert.deepEqual(received.ast, duckfallback());
  assert.ok(received.expires > Date.now());
  response = next(second);
  first.send(JSON.stringify({ type: 'state', id: 'poll-1', state: 'voting', detail: 'poll snapshot' }));
  assert.equal((await response).state, 'voting');
  const third = await connect();
  response = next(third);
  third.send(JSON.stringify({ type: 'join', kind: 'studio', studio: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }));
  const snapshot = await response;
  assert.equal(snapshot.latest.id, 'test-1');
  assert.equal(snapshot.phase.id, 'poll-1');
  const raidA = await connect();
  response = next(raidA);
  raidA.send(JSON.stringify({ type: 'join', kind: 'raid', room: 'TW26' }));
  await response;
  response = next(raidA);
  raidA.send(JSON.stringify({ type: 'raid-send', id: 'alone', ast: duckfallback() }));
  assert.equal((await response).delivered, 0);
  const raidB = await connect();
  response = next(raidB);
  raidB.send(JSON.stringify({ type: 'join', kind: 'raid', room: 'TW26' }));
  await response;
  const receivedRaid = next(raidB);
  const receipt = next(raidA);
  raidA.send(JSON.stringify({ type: 'raid-send', id: 'explicit', ast: duckfallback() }));
  assert.equal((await receivedRaid).type, 'raid-receive');
  assert.equal((await receipt).delivered, 1);
});

test('paid compiler requires token and rejects bursts', async (t) => {
  let calls = 0;
  const token = 'local-test-token-abcdefghijklmnopqrstuvwxyz';
  const transport = async () => {
    calls += 1;
    return { choices: [{ message: { content: JSON.stringify(duckfallback()) } }] };
  };
  const { server, origin } = await start({ transport, accessToken: token });
  t.after(() => server.close());
  const send = (auth) => fetch(`${origin}/api/compile`, { method: 'POST',
    headers: auth ? { Authorization: `Bearer ${auth}` } : {}, body: JSON.stringify({ prompt: 'ducks' }) });
  assert.equal((await send()).status, 401);
  assert.equal((await send('wrong-token')).status, 401);
  assert.equal(calls, 0);
  for (let i = 0; i < 8; i += 1) assert.equal((await send(token)).status, 200);
  assert.equal((await send(token)).status, 429);
  assert.equal(calls, 8);
});

test('missing or weak paid token fails closed', async (t) => {
  let calls = 0;
  const { server, origin } = await start({ accessToken: 'weak', transport: async () => { calls += 1; } });
  t.after(() => server.close());
  const response = await fetch(`${origin}/api/compile`, { method: 'POST',
    headers: { Authorization: 'Bearer weak' }, body: JSON.stringify({ prompt: 'ducks' }) });
  assert.equal(response.status, 401);
  assert.equal(calls, 0);
});
