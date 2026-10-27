import test from 'node:test';
import assert from 'node:assert/strict';
import { createCompileAccess } from '../server/access.js';

const req = (token, ip = '127.0.0.1') => ({
  headers: token ? { authorization: `Bearer ${token}` } : {}, socket: { remoteAddress: ip },
});

test('paid access fails closed and counts failed authorization toward burst limit', () => {
  const token = 'test-only-token-abcdefghijklmnopqrstuvwxyz';
  const authorize = createCompileAccess({ paid: true, token });
  assert.equal(authorize(req()).status, 401);
  assert.equal(authorize(req('wrong')).status, 401);
  for (let i = 0; i < 8; i += 1) {
    const access = authorize(req(token));
    assert.equal(access.status, 200);
    access.release();
  }
  assert.equal(authorize(req(token)).status, 429);
  assert.equal(createCompileAccess({ paid: true, token: 'short' })(req('short')).status, 401);
});

test('compile access enforces concurrent request limit', () => {
  const authorize = createCompileAccess({ paid: false });
  const first = authorize(req(null, 'first'));
  const second = authorize(req(null, 'second'));
  assert.equal(authorize(req(null, 'third')).status, 429);
  first.release();
  first.release();
  const third = authorize(req(null, 'third'));
  assert.equal(third.status, 200);
  second.release();
  third.release();
});
