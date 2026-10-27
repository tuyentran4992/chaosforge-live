import { timingSafeEqual } from 'node:crypto';

export function createCompileAccess({ token, paid }) {
  const hits = new Map();
  let total = [];
  let inflight = 0;
  return function authorize(req) {
    const now = Date.now();
    const ip = req.socket.remoteAddress || 'unknown';
    for (const [key, times] of hits) {
      if (!times.some((time) => time > now - 60000)) hits.delete(key);
    }
    const times = (hits.get(ip) || []).filter((time) => time > now - 60000);
    total = total.filter((time) => time > now - 60000);
    if (times.length >= 10 || total.length >= 30 || inflight >= 2) return { status: 429 };
    times.push(now);
    total.push(now);
    hits.set(ip, times);
    if (paid) {
      const supplied = String(req.headers.authorization || '').replace(/^Bearer /, '');
      const expected = Buffer.from(token || '');
      const candidate = Buffer.from(supplied);
      if (expected.length < 32 || candidate.length !== expected.length || !timingSafeEqual(expected, candidate)) {
        return { status: 401 };
      }
    }
    inflight += 1;
    let released = false;
    return { status: 200, release() { if (!released) { released = true; inflight -= 1; } } };
  };
}
