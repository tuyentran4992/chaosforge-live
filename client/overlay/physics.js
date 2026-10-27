export const WIDTH = 1920;
export const HEIGHT = 1080;

export function insideSafe(x, y) {
  return x >= 384 && x <= 1536 && y >= 216 && y <= 864;
}

export function spawnParticle(side, random = Math.random) {
  const x = side === 0 ? random() * 383 : side === 1 ? 1537 + random() * 383 : random() * WIDTH;
  const y = side === 2 ? random() * 215 : side === 3 ? 865 + random() * 215 : random() * HEIGHT;
  return { x, y, vx: (random() - 0.5) * 180, vy: (random() - 0.5) * 180 };
}

export function advanceParticle(particle, ast, delta) {
  particle.vy += ast.gravity * delta * 80;
  particle.x += particle.vx * delta;
  particle.y += particle.vy * delta;
  if (ast.collision === 'float') {
    if (particle.x < 0) particle.x += WIDTH;
    if (particle.x > WIDTH) particle.x -= WIDTH;
    if (particle.y < 0) particle.y += HEIGHT;
    if (particle.y > HEIGHT) particle.y -= HEIGHT;
  } else {
    const damping = ast.collision === 'shield' ? 0.8 : 1;
    if (particle.x < 0 || particle.x > WIDTH) particle.vx *= -damping;
    if (particle.y < 0 || particle.y > HEIGHT) particle.vy *= -damping;
    particle.x = Math.max(0, Math.min(WIDTH, particle.x));
    particle.y = Math.max(0, Math.min(HEIGHT, particle.y));
  }
  return particle;
}
