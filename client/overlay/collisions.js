// Track contact transitions without changing entity motion or emitting every frame.
export function createCollisionTracker() {
  let active = new Set();
  let ids = new WeakMap();
  let nextId = 0;
  function id(particle) {
    if (!ids.has(particle)) ids.set(particle, nextId++);
    return ids.get(particle);
  }
  function update(particles, onCollision) {
    const current = new Set();
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (dx * dx + dy * dy > 48 * 48) continue;
        const first = id(a);
        const second = id(b);
        const key = first < second ? `${first}:${second}` : `${second}:${first}`;
        current.add(key);
        if (!active.has(key)) onCollision((a.x + b.x) / 2, (a.y + b.y) / 2);
      }
    }
    active = current;
  }
  function clear() { active.clear(); ids = new WeakMap(); nextId = 0; }
  return { update, clear };
}
