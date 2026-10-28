function circle(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function ears(ctx, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-27, -5);
  ctx.lineTo(-24, -34);
  ctx.lineTo(-7, -21);
  ctx.lineTo(7, -21);
  ctx.lineTo(24, -34);
  ctx.lineTo(27, -5);
  ctx.closePath();
  ctx.fill();
}

export function drawMeme(ctx, entity, now) {
  const dog = entity === 'doge';
  ears(ctx, dog ? '#a46b2d' : '#e5e7eb');
  circle(ctx, 0, 0, 26, dog ? '#e8b45b' : '#fafafa');
  circle(ctx, -9, -5, 3, '#1f2937');
  circle(ctx, 9, -5, 3, '#1f2937');
  if (dog) {
    circle(ctx, 0, 8, 10, '#f7d998');
    circle(ctx, 0, 5, 3, '#1f2937');
    ctx.save();
    ctx.translate(25, 2);
    ctx.rotate(-0.55 + Math.sin(now / 160) * 0.4);
    ctx.fillStyle = '#86562e';
    ctx.fillRect(0, -4, 7, 35);
    ctx.fillStyle = '#75432a';
    ctx.fillRect(-9, -14, 25, 13);
    ctx.restore();
  } else {
    ctx.fillStyle = '#3d2028';
    ctx.beginPath();
    ctx.ellipse(0, 13, 8, 3 + (1 + Math.sin(now / 130)) * 6, 0, 0, Math.PI * 2);
    ctx.fill();
    circle(ctx, 0, 4, 2, '#e994a2');
  }
}
