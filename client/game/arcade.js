import { createCombat } from './combat.js';

export function startArcade(canvas, { targets = () => [], hit = () => {} } = {}) {
  const ctx = canvas.getContext('2d');
  canvas.width = 960;
  canvas.height = 540;
  let manual = false;
  const keys = new Set();
  const player = { x: 480, y: 360 };
  const combat = createCombat();
  let last = performance.now();
  const stars = Array.from({ length: 90 }, () => ({ x: Math.random() * 960, y: Math.random() * 540,
    speed: 0.2 + Math.random() * 0.6 }));
  window.addEventListener('keydown', (event) => keys.add(event.key.toLowerCase()));
  window.addEventListener('keyup', (event) => keys.delete(event.key.toLowerCase()));
  function frame(time) {
    const delta = Math.min((time - last) / 1000, 0.05);
    last = time;
    const background = ctx.createLinearGradient(0, 0, 0, 540);
    background.addColorStop(0, '#04070e');
    background.addColorStop(1, '#081120');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 960, 540);
    ctx.strokeStyle = 'rgba(56,78,116,0.22)';
    for (let x = 60; x < 960; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 540); ctx.stroke(); }
    for (let y = 60; y < 540; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(960, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(52,211,153,0.12)';
    ctx.setLineDash([6, 7]);
    ctx.strokeRect(192, 108, 576, 324);
    ctx.beginPath();
    ctx.arc(480, 360, 105, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(214,232,255,0.45)';
    for (const star of stars) {
      star.y = (star.y + star.speed) % 540;
      ctx.fillRect(star.x, star.y, 1.5, 2.5);
    }
    if (manual) {
      player.x += 240 * delta * (Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft')));
      player.y += 240 * delta * (Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup')));
      player.x = Math.max(15, Math.min(945, player.x));
      player.y = Math.max(15, Math.min(525, player.y));
    } else {
      player.x = 480 + Math.sin(time / 1700) * 160;
      player.y = 360 + Math.cos(time / 1300) * 75;
    }
    const hits = combat.update(player, targets(), delta);
    for (const index of hits) hit(index);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    for (const bullet of combat.state.bullets) {
      ctx.beginPath();
      ctx.moveTo(bullet.x, bullet.y);
      ctx.lineTo(bullet.x - bullet.vx * 0.012, bullet.y - bullet.vy * 0.012);
      ctx.stroke();
    }
    document.getElementById('gameScore').textContent = String(combat.state.score).padStart(6, '0');
    document.getElementById('gameHull').textContent = `${combat.state.hull}%`;
    ctx.fillStyle = 'rgba(16,163,127,0.2)';
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - 16);
    ctx.lineTo(player.x + 12, player.y + 12);
    ctx.lineTo(player.x, player.y + 6);
    ctx.lineTo(player.x - 12, player.y + 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#d1fae5';
    ctx.beginPath();
    ctx.arc(player.x, player.y - 1, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(52,211,153,0.65)';
    ctx.beginPath();
    ctx.moveTo(player.x - 4, player.y + 11);
    ctx.lineTo(player.x, player.y + 22 + Math.sin(time / 90) * 3);
    ctx.lineTo(player.x + 4, player.y + 11);
    ctx.fill();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  return { setManual(value) { manual = value; }, clear: combat.clear };
}
