import { drawMeme } from './meme-artwork.js';

export function drawEntity(ctx, entity, collision, x, y, now = 0) {
  ctx.save();
  ctx.translate(x, y);
  if (collision === 'shield') {
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 34, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (entity === 'doge' || entity === 'popcat') {
    drawMeme(ctx, entity, now);
  } else if (entity === 'duck') {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.ellipse(0, 8, 26, 17, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(15, -7, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(26, -8, 12, 6);
    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(19, -10, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (entity === 'boss') {
    ctx.fillStyle = '#a78bfa';
    ctx.beginPath();
    ctx.moveTo(-26, -12);
    ctx.lineTo(-24, -33);
    ctx.lineTo(-10, -23);
    ctx.lineTo(10, -23);
    ctx.lineTo(24, -33);
    ctx.lineTo(26, -12);
    ctx.lineTo(23, 20);
    ctx.lineTo(-23, 20);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-16, -9, 8, 5);
    ctx.fillRect(8, -9, 8, 5);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(12, -6);
    ctx.lineTo(70, 18);
    ctx.stroke();
  } else if (entity === 'star') {
    ctx.fillStyle = '#c084fc';
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const angle = -Math.PI / 2 + i * Math.PI / 5;
      const radius = i % 2 ? 12 : 27;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = '#c084fc';
    ctx.beginPath();
    ctx.arc(0, 0, 19, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
