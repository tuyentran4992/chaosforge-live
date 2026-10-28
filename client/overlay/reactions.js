const LABELS = ['SKILL ISSUE!', 'RIGGED!', 'EMOTIONAL DAMAGE!'];
const COLORS = ['#ff4df3', '#46f5e5', '#ffe64d'];
const LIFETIME = 1500;

export function createReactions() {
  let badge = null;
  let pending = false;
  let sequence = 0;
  function start(now) {
    const index = sequence++ % LABELS.length;
    badge = { born: now, label: LABELS[index], color: COLORS[index] };
  }
  function advance(now) {
    if (badge && now - badge.born >= LIFETIME) {
      badge = null;
      if (pending) { pending = false; start(now); }
    }
  }
  function add(_x, _y, now, panic = false) {
    advance(now);
    if (panic) { pending = false; start(now); }
    else if (badge) pending = true;
    else start(now);
  }
  function clear() { badge = null; pending = false; }
  function draw(ctx, now) {
    advance(now);
    if (!badge) return;
    const progress = Math.max(0, (now - badge.born) / LIFETIME);
    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.fillStyle = badge.color;
    ctx.shadowColor = badge.color;
    ctx.shadowBlur = 18;
    ctx.font = `bold ${Math.round(42 + progress * 18)}px sans-serif`;
    ctx.textAlign = 'center';
    // Bottom lane stays between the compiler and the stage webcam.
    ctx.fillText(badge.label, 990, 1010 - progress * 60, 980);
    ctx.restore();
  }
  return { add, clear, draw };
}
