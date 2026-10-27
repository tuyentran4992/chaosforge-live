export function createCombat() {
  const state = { bullets: [], score: 0, hull: 100, fireDelay: 0, damageDelay: 0 };
  function update(player, targets, delta) {
    state.fireDelay -= delta;
    state.damageDelay -= delta;
    if (targets.length && state.fireDelay <= 0) {
      const target = targets.reduce((best, candidate) => {
        const distance = Math.hypot(candidate.x / 2 - player.x, candidate.y / 2 - player.y);
        return !best || distance < best.distance ? { target: candidate, distance } : best;
      }, null);
      const dx = target.target.x / 2 - player.x;
      const dy = target.target.y / 2 - player.y;
      const distance = Math.hypot(dx, dy) || 1;
      state.bullets.push({ x: player.x, y: player.y, vx: dx / distance * 740,
        vy: dy / distance * 740, life: 1.1 });
      state.fireDelay = 0.3;
    }
    const hits = new Set();
    for (const bullet of state.bullets) {
      bullet.x += bullet.vx * delta;
      bullet.y += bullet.vy * delta;
      bullet.life -= delta;
      for (let i = 0; i < targets.length; i += 1) {
        if (hits.has(i)) continue;
        const target = targets[i];
        if (Math.hypot(target.x / 2 - bullet.x, target.y / 2 - bullet.y) < 18) {
          hits.add(i);
          bullet.life = 0;
          state.score += 150;
          break;
        }
      }
    }
    state.bullets = state.bullets.filter((bullet) => bullet.life > 0);
    if (state.damageDelay <= 0 && targets.some((target, i) => !hits.has(i) &&
        Math.hypot(target.x / 2 - player.x, target.y / 2 - player.y) < 24)) {
      state.hull = Math.max(0, state.hull - 10);
      state.damageDelay = 1;
      if (!state.hull) { state.hull = 100; state.score = Math.max(0, state.score - 500); }
    }
    return [...hits].sort((a, b) => b - a);
  }
  function clear() { state.bullets = []; }
  return { state, update, clear };
}
