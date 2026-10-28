import { validateAst } from '../../shared/ast-validate.js';
import { insideSafe, spawnParticle, advanceParticle } from './physics.js';
import { drawEntity } from './artwork.js';
import { createReactions } from './reactions.js';
import { createCollisionTracker } from './collisions.js';
import { MAX_IDEA_LENGTH } from '../../shared/sync-contract.js';

export function createOverlay(mount) {
  mount.innerHTML = `<div class="ov" data-state="idle" data-guide="0">
    <canvas class="ov-canvas" aria-hidden="true"></canvas>
    <div class="ov-safe" aria-hidden="true"><span class="ov-safe__tag">CENTER 60% · SAFE ZONE</span></div>
    <section class="ov-boss" aria-label="Active chaos patch">
      <div class="ov-boss__bar-top"><span class="ov-kicker"><i class="ov-pulse"></i> LIVE CHAOS PATCH</span>
        <span class="ov-boss__clock"><b data-boss-time>0</b><em>s</em></span></div>
      <div class="ov-boss__title"><span data-name data-boss-name>CHAOS</span><em data-boss-proto>AST SAFE VERIFIED</em></div>
      <div class="ov-boss__track"><div class="ov-boss__fill" data-boss-fill></div><div class="ov-boss__ticks"></div></div>
      <div class="ov-boss__row"><span class="ov-crown">👑 <em>Chief Chaos Architect:</em> <b data-boss-author>—</b></span>
        <span class="ov-combo"><em>CHAT COMBO</em><b data-combo>×1.0</b></span></div>
      <div class="ov-combo-meter" data-combo-meter aria-hidden="true"></div>
    </section>
    <section class="ov-compiler" aria-label="Codex live compiler"><div class="ov-compiler__head">
      <span class="ov-dots"><i></i><i></i><i></i></span><span>codex://compile · patch.ast.json</span>
      <span class="ov-compiler__badge">LIVE</span></div><pre class="ov-code" data-code></pre>
      <div class="ov-compiler__foot"><span class="ov-verified" data-verified>✓ AST SAFE VERIFIED</span></div></section>
    <section class="ov-poll" aria-label="Live chaos poll"><div class="ov-poll__head">
      <span class="ov-kicker"><i class="ov-pulse"></i> LIVE CHAOS POLL</span>
      <div class="ov-ring"><svg viewBox="0 0 46 46" aria-hidden="true">
        <circle class="ov-ring__bg" cx="23" cy="23" r="18"></circle>
        <circle class="ov-ring__fg" cx="23" cy="23" r="18" stroke-dasharray="113.1" data-ring-fg></circle>
      </svg><b data-countdown data-poll-clock>15</b></div></div>
      <div class="ov-poll__meta"><em>!forge</em> TOP 3 IDEAS · <b data-poll-total>0</b> VOTES</div>
      <ol class="ov-poll__list" data-poll data-poll-list></ol></section>
    <div class="ov-flash" data-flash><div class="ov-flash__card"><span class="ov-flash__kicker" data-flash-kicker>SAFETY</span>
      <div class="ov-flash__title" data-status data-flash-title></div><p class="ov-flash__body" data-flash-body></p>
      <div class="ov-flash__meta" data-flash-meta></div></div></div>
  </div>`;
  const root = mount.firstElementChild;
  const resize = () => {
    root.style.transform = `scale(${Math.min(mount.clientWidth / 1920, mount.clientHeight / 1080)})`;
  };
  new ResizeObserver(resize).observe(mount);
  resize();
  const canvas = root.querySelector('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const context = canvas.getContext('2d');
  const reactions = createReactions();
  const collisions = createCollisionTracker();
  let entities = [];
  let ast = null;
  let last = performance.now();
  let guide = false;
  let limit = 35;
  let combo = 1;
  let expires = 0;
  function deploy(next, expiry = Date.now() + next?.duration * 1000) {
    if (!validateAst(next)) return false;
    ast = next;
    expires = Number.isFinite(expiry) ? expiry : Date.now() + next.duration * 1000;
    entities = [];
    reactions.clear();
    collisions.clear();
    combo = 1;
    root.querySelector('[data-combo]').textContent = '×1.0';
    for (let i = 0; i < limit; i += 1) {
      entities.push(spawnParticle(i % 4));
    }
    root.dataset.state = 'active';
    root.querySelector('[data-name]').textContent = next.entity.toUpperCase();
    root.querySelector('[data-code]').textContent = JSON.stringify(next, null, 2);
    const verified = root.querySelector('[data-verified]');
    if (verified) verified.textContent = next.tags?.includes('uncertain') ? '✓ AST SAFE · DEFAULT FALLBACK' : '✓ AST SAFE VERIFIED';
    return true;
  }
  function clear(panic = false) {
    ast = null;
    entities = [];
    root.dataset.state = 'idle';
    context.clearRect(0, 0, 1920, 1080);
    reactions.clear();
    collisions.clear();
    if (panic) reactions.add(960, 300, performance.now(), true);
    const verified = root.querySelector('[data-verified]');
    if (verified) verified.textContent = '✓ AST SAFE VERIFIED';
  }
  function draw(now) {
    const delta = Math.min((now - last) / 1000, 0.05);
    last = now;
    context.clearRect(0, 0, 1920, 1080);
    if (ast) {
      const seconds = Math.max(0, (expires - Date.now()) / 1000);
      root.querySelector('[data-boss-time]').textContent = Math.ceil(seconds);
      root.querySelector('[data-boss-fill]').style.width = `${Math.min(100, seconds / ast.duration * 100)}%`;
    }
    for (const entity of entities) {
      advanceParticle(entity, ast, delta, (particle) => {
        reactions.add(Math.max(180, Math.min(1740, particle.x)), Math.max(90, Math.min(1000, particle.y)), now);
      });
      context.globalAlpha = insideSafe(entity.x, entity.y) ? 0.7 : 1;
      drawEntity(context, ast.entity, ast.collision, entity.x, entity.y, now);
    }
    collisions.update(entities, (x, y) => reactions.add(x, y, now));
    context.globalAlpha = 1;
    reactions.draw(context, now);
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  return { deploy, clear, count: () => entities.length,
    targets: () => entities.slice(),
    remove(index) {
      if (Number.isInteger(index) && index >= 0 && index < entities.length) {
        const entity = entities[index];
        reactions.add(entity.x, entity.y, performance.now());
        entities.splice(index, 1);
      }
    },
    react() {
      combo = Math.min(10, combo + 0.1);
      root.querySelector('[data-combo]').textContent = `×${combo.toFixed(1)}`;
    },
    showState(state, detail) {
      root.dataset.state = state;
      root.querySelector('[data-status]').textContent = detail;
      if (state === 'voting') {
        try {
          const poll = JSON.parse(detail);
          if (!Array.isArray(poll.ideas) || !Array.isArray(poll.votes) || !Number.isFinite(poll.seconds)) return;
          root.querySelector('[data-countdown]').textContent = Math.ceil(poll.seconds);
          root.querySelector('[data-ring-fg]').style.strokeDashoffset = String(113.1 * (1 - Math.max(0, Math.min(15, poll.seconds)) / 15));
          root.querySelector('[data-poll-total]').textContent = poll.votes.reduce((total, value) => total + (Number(value) || 0), 0);
          const list = root.querySelector('[data-poll]');
          list.replaceChildren();
          for (let i = 0; i < 3; i += 1) {
            const item = document.createElement('li');
            item.className = 'ov-idea';
            item.dataset.rank = String(i + 1);
            const rank = document.createElement('span');
            rank.className = 'ov-idea__rank';
            rank.textContent = String(i + 1);
            const body = document.createElement('div');
            body.className = 'ov-idea__body';
            const text = document.createElement('span');
            text.className = 'ov-idea__text';
            const ideaStr = String(poll.ideas[i] || 'Waiting for idea').slice(0, MAX_IDEA_LENGTH);
            text.textContent = ideaStr;
            text.title = ideaStr;
            const len = ideaStr.length;
            text.dataset.len = len <= 48 ? 'sm' : len <= 96 ? 'md' : 'lg';
            item.dataset.len = text.dataset.len;
            body.append(text);
            const votes = document.createElement('span');
            votes.className = 'ov-idea__num';
            votes.textContent = `${Number(poll.votes[i]) || 0} votes`;
            item.append(rank, body, votes);
            list.append(item);
          }
        } catch { /* A transition may arrive before the first poll snapshot. */ }
      }
    },
    setLimit(value) { limit = Math.max(15, Math.min(50, Number(value) || 35)); },
    toggleGuide() { guide = !guide; root.dataset.guide = guide ? '1' : '0'; } };
}
