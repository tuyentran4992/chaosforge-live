/* ══════════════════════════════════════════════════════════════
   CHAOSFORGE LIVE — Overlay HUD engine
   Renders a 1920×1080 transparent broadcast layer: live poll,
   Codex compiler terminal, boss bar / combo meter, and the 2D
   physics ring that keeps the center 60% safe.
   Used by index.html (stage + preview) and overlay.html (OBS).
   ══════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var W = 1920;
  var H = 1080;
  var SAFE = { x: W * 0.2, y: H * 0.2, w: W * 0.6, h: H * 0.6 };
  var TAU = Math.PI * 2;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function insideSafe(x, y) {
    return x > SAFE.x && x < SAFE.x + SAFE.w && y > SAFE.y && y < SAFE.y + SAFE.h;
  }

  var TPL = [
    '<div class="ov" data-state="idle" data-guide="0">',
    '  <canvas class="ov-canvas" aria-hidden="true"></canvas>',

    '  <div class="ov-safe" aria-hidden="true">',
    '    <span class="ov-safe__tag">GIỮA 60% · VÙNG AN TOÀN</span>',
    '  </div>',

    '  <section class="ov-boss" aria-label="Patch hỗn loạn đang chạy">',
    '    <div class="ov-boss__bar-top">',
    '      <span class="ov-kicker"><i class="ov-pulse"></i> PATCH HỖN LOẠN ĐANG CHẠY</span>',
    '      <span class="ov-boss__clock"><b data-boss-time>35</b><em>s</em></span>',
    '    </div>',
    '    <div class="ov-boss__title">',
    '      <span data-boss-name>MƯA THIÊN THẠCH</span>',
    '      <em data-boss-proto>GIAO THỨC BOSS</em>',
    '    </div>',
    '    <div class="ov-boss__track">',
    '      <div class="ov-boss__fill" data-boss-fill></div>',
    '      <div class="ov-boss__ticks"></div>',
    '    </div>',
    '    <div class="ov-boss__row">',
    '      <span class="ov-crown">👑 <em>Kiến trúc sư hỗn loạn:</em> <b data-boss-author>@viewer</b></span>',
    '      <span class="ov-combo"><em>COMBO CHAT</em><b data-combo>×1.0</b></span>',
    '    </div>',
    '    <div class="ov-combo-meter" data-combo-meter aria-hidden="true"></div>',
    '  </section>',

    '  <section class="ov-poll" aria-label="Poll hỗn loạn trực tiếp">',
    '    <div class="ov-poll__head">',
    '      <span class="ov-kicker"><i class="ov-pulse"></i> POLL HỖN LOẠN TRỰC TIẾP</span>',
    '      <div class="ov-ring">',
    '        <svg viewBox="0 0 46 46" aria-hidden="true">',
    '          <circle class="ov-ring__bg" cx="23" cy="23" r="18"></circle>',
    '          <circle class="ov-ring__fg" cx="23" cy="23" r="18" data-ring-fg></circle>',
    '        </svg>',
    '        <b data-poll-clock>15</b>',
    '      </div>',
    '    </div>',
    '    <div class="ov-poll__meta"><em>!forge</em> TOP 3 Ý TƯỞNG · <b data-poll-total>0</b> PHIẾU · <span data-poll-rate>+0/s</span></div>',
    '    <ol class="ov-poll__list" data-poll-list></ol>',
    '  </section>',

    '  <section class="ov-compiler" aria-label="Compiler Codex trực tiếp">',
    '    <div class="ov-compiler__head">',
    '      <span class="ov-dots"><i></i><i></i><i></i></span>',
    '      <span>codex://compile · patch.ast.json</span>',
    '      <span class="ov-compiler__badge">TRỰC TIẾP</span>',
    '    </div>',
    '    <pre class="ov-code" data-code></pre>',
    '    <div class="ov-compiler__foot">',
    '      <span class="ov-verified" data-verified>✓ AST AN TOÀN — 0% LỖI</span>',
    '      <span class="ov-deploy">TRIỂN KHAI PATCH SAU <b data-deploy>3</b></span>',
    '    </div>',
    '  </section>',

    '  <div class="ov-flash" data-flash>',
    '    <div class="ov-flash__card">',
    '      <span class="ov-flash__kicker" data-flash-kicker>DỌN PANIC</span>',
    '      <div class="ov-flash__title" data-flash-title>CHẾ ĐỘ AN TOÀN</div>',
    '      <p class="ov-flash__body" data-flash-body></p>',
    '      <div class="ov-flash__meta" data-flash-meta></div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  function formatAst(patch) {
    var a = patch.ast || {};
    return [
      '{',
      '  "entity": "' + (a.entity || 'chaos_entity') + '",',
      '  "gravity": ' + (a.gravity != null ? a.gravity : 0.4) + ',',
      '  "collision": "' + (a.collision || 'bounce/elastic') + '",',
      '  "spawn_zone": "' + (a.spawn_zone || 'edge_ring') + '",',
      '  "safe_zone": { "w": 1152, "h": 648, "alpha": 0.7 },',
      '  "sfx_synth": "' + (a.sfx || 'square/blip') + '",',
      '  "chat_trigger": "!forge > poll(1|2|3)",',
      '  "ttl_s": ' + (patch.duration || 35),
      '}'
    ].join('\n');
  }

  function ChaosOverlay(mount, options) {
    this.mount = mount;
    this.opts = options || {};
    this.state = 'idle';
    this.patch = null;
    this.entities = [];
    this.particles = [];
    this.bossObj = null;
    this.beams = [];
    this.maxEntities = 35;
    this.comboHits = 0;
    this.combo = 1;
    this.hp = 100;
    this.remaining = 35;
    this.duration = 35;
    this.pollIdeas = [];
    this.pollRows = {};
    this.compile = { active: false, start: 0, full: '', done: false, verified: false };
    this.time = 0;
    this.last = 0;
    this.scale = 1;
    this.raf = 0;
    this._build();
    this._observe();
    this._loop = this._loop.bind(this);
    this.last = performance.now();
    this.raf = requestAnimationFrame(this._loop);
  }

  ChaosOverlay.prototype._build = function () {
    this.mount.innerHTML = TPL;
    this.root = this.mount.querySelector('.ov');
    this.canvas = this.root.querySelector('.ov-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dpr = Math.min(global.devicePixelRatio || 1, 2);
    this.canvas.width = W * this.dpr;
    this.canvas.height = H * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    var q = function (sel) { return this.root.querySelector(sel); }.bind(this);
    this.refs = {
      bossName: q('[data-boss-name]'),
      bossProto: q('[data-boss-proto]'),
      bossTime: q('[data-boss-time]'),
      bossFill: q('[data-boss-fill]'),
      bossAuthor: q('[data-boss-author]'),
      combo: q('[data-combo]'),
      comboMeter: q('[data-combo-meter]'),
      pollList: q('[data-poll-list]'),
      pollClock: q('[data-poll-clock]'),
      pollTotal: q('[data-poll-total]'),
      pollRate: q('[data-poll-rate]'),
      ring: q('[data-ring-fg]'),
      code: q('[data-code]'),
      verified: q('[data-verified]'),
      deploy: q('[data-deploy]'),
      flashKicker: q('[data-flash-kicker]'),
      flashTitle: q('[data-flash-title]'),
      flashBody: q('[data-flash-body]'),
      flashMeta: q('[data-flash-meta]')
    };

    this.bars = [];
    for (var i = 0; i < 14; i++) {
      var bar = document.createElement('i');
      this.refs.comboMeter.appendChild(bar);
      this.bars.push(bar);
    }

    if (this.refs.ring) {
      this.ringLen = TAU * 18;
      this.refs.ring.style.strokeDasharray = this.ringLen.toFixed(2);
      this.refs.ring.style.strokeDashoffset = '0';
    }

    this._fit();
  };

  ChaosOverlay.prototype._observe = function () {
    var self = this;
    this._onResize = function () { self._fit(); };
    if (global.ResizeObserver) {
      this.ro = new ResizeObserver(this._onResize);
      this.ro.observe(this.mount);
    } else {
      global.addEventListener('resize', this._onResize);
    }
  };

  ChaosOverlay.prototype._fit = function () {
    var rect = this.mount.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var s = Math.min(rect.width / W, rect.height / H);
    this.scale = s;
    this.root.style.width = W + 'px';
    this.root.style.height = H + 'px';
    this.root.style.transform =
      'translate(' + ((rect.width - W * s) / 2).toFixed(2) + 'px,' +
      ((rect.height - H * s) / 2).toFixed(2) + 'px) scale(' + s.toFixed(4) + ')';
  };

  ChaosOverlay.prototype.setGuide = function (on) {
    this.root.dataset.guide = on ? '1' : '0';
  };

  ChaosOverlay.prototype._hideFlash = function () {
    // visibility is driven by data-state; nothing else to do
  };

  ChaosOverlay.prototype._setFlash = function (kicker, title, body, meta) {
    this.refs.flashKicker.textContent = kicker;
    this.refs.flashTitle.textContent = title;
    this.refs.flashBody.textContent = body;
    this.refs.flashMeta.textContent = meta;
  };

  ChaosOverlay.prototype.setState = function (next) {
    this.state = next;
    this.root.dataset.state = next;

    if (next === 'voting') {
      this._clearArena();
      this._resetPoll();
    }
    if (next === 'compiling') {
      this._clearArena();
      this.refs.verified.classList.remove('is-on');
      this.refs.code.textContent = '';
    }
    if (next === 'idle') {
      this._clearArena();
      this.compile.active = false;
      this.refs.verified.classList.remove('is-on');
      this.refs.code.textContent = '';
    }
    if (next !== 'compiling') {
      this.compile.active = false;
    }
    if (next === 'panic' || next === 'blocked' || next === 'idle') {
      this._clearArena();
    }
  };

  /* ────────────── poll ────────────── */

  ChaosOverlay.prototype._resetPoll = function () {
    this.refs.pollList.innerHTML = '';
    this.pollRows = {};
    this.pollIdeas = [];
  };

  ChaosOverlay.prototype.updatePoll = function (data) {
    if (!data || !data.ideas) return;
    var list = this.refs.pollList;
    var ids = data.ideas.map(function (i) { return i.id; }).join('|');

    if (ids !== this.pollIdeas.join('|')) {
      list.innerHTML = '';
      this.pollRows = {};
      this.pollIdeas = data.ideas.map(function (i) { return i.id; });
      for (var k = 0; k < data.ideas.length; k++) {
        var idea = data.ideas[k];
        var li = document.createElement('li');
        li.className = 'ov-idea';
        li.dataset.rank = String(k + 1);
        li.innerHTML =
          '<span class="ov-idea__rank"></span>' +
          '<div class="ov-idea__body">' +
            '<span class="ov-idea__text"></span>' +
            '<span class="ov-idea__by"></span>' +
            '<span class="ov-idea__bar"><i></i></span>' +
          '</div>' +
          '<div class="ov-idea__num"><b></b><em></em></div>';
        var ui = {
          rank: li.querySelector('.ov-idea__rank'),
          text: li.querySelector('.ov-idea__text'),
          by: li.querySelector('.ov-idea__by'),
          bar: li.querySelector('.ov-idea__bar i'),
          pct: li.querySelector('.ov-idea__num b'),
          rate: li.querySelector('.ov-idea__num em')
        };
        li._ui = ui;
        this.pollRows[idea.id] = li;
        list.appendChild(li);
      }
    }

    for (var i = 0; i < data.ideas.length; i++) {
      var it = data.ideas[i];
      var node = this.pollRows[it.id];
      if (!node) continue;
      node.dataset.rank = String(i + 1);
      node._ui.rank.textContent = String(i + 1);
      node._ui.text.textContent = it.text;
      node._ui.by.textContent = '@' + it.author;
      node._ui.bar.style.width = clamp(it.pct || 0, 0, 100) + '%';
      node._ui.pct.textContent = Math.round(it.pct || 0) + '%';
      node._ui.rate.textContent = '+' + Math.round(it.rate || 0) + '/s';
      list.appendChild(node);
    }

    this.refs.pollTotal.textContent = Math.round(data.totalVotes || 0);
    this.refs.pollRate.textContent = '+' + Math.round(data.voteRate || 0) + '/s';
    var seconds = Math.max(0, Math.ceil(data.remaining || 0));
    this.refs.pollClock.textContent = String(seconds);
    if (this.refs.ring) {
      var ratio = data.duration ? clamp(data.remaining / data.duration, 0, 1) : 0;
      this.refs.ring.style.strokeDashoffset = (this.ringLen * (1 - ratio)).toFixed(2);
    }
  };

  /* ────────────── compiler ────────────── */

  ChaosOverlay.prototype.startCompile = function (patch) {
    this.patch = patch;
    this.fullAst = formatAst(patch);
    this.compile = { active: true, start: performance.now(), full: this.fullAst, done: false, verified: false };
    this.refs.code.textContent = '';
    this.refs.verified.classList.remove('is-on');
    this.refs.deploy.textContent = '3';
    this.refs.code.classList.remove('is-done');
    this.setState('compiling');
    this._setFlash('', '', '', '');
  };

  ChaosOverlay.prototype._updateCompile = function () {
    if (!this.compile.active) return;
    var elapsed = (performance.now() - this.compile.start) / 1000;
    var total = this.compile.full.length;
    var shown = Math.min(total, Math.floor(elapsed * 300));
    var text = this.compile.full.slice(0, shown);
    this.refs.code.textContent = shown < total ? text + '▍' : text;
    if (shown >= total) this.refs.code.classList.add('is-done');

    if (elapsed > 1.05 && !this.compile.verified) {
      this.compile.verified = true;
      this.refs.verified.classList.add('is-on');
    }
    if (elapsed > 1.15) {
      var step = elapsed < 1.55 ? '3' : elapsed < 1.95 ? '2' : elapsed < 2.35 ? '1' : 'GO';
      if (this.refs.deploy.textContent !== step) this.refs.deploy.textContent = step;
    }
  };

  /* ────────────── active patch ────────────── */

  ChaosOverlay.prototype.activate = function (patch) {
    this.patch = patch;
    this.duration = patch.duration || 35;
    this.remaining = this.duration;
    this.comboHits = 0;
    this.combo = 1;
    this._clearArena();
    this.setState('active');
    this._hideFlash();

    this.refs.bossName.textContent = patch.name || 'PATCH HỖN LOẠN';
    this.refs.bossProto.textContent = patch.protocol || 'GIAO THỨC HỖN LOẠN';
    this.refs.bossAuthor.textContent = patch.author || '@viewer';
    this.refs.bossTime.textContent = String(Math.ceil(this.duration));
    this.refs.bossFill.style.width = '100%';
    this.refs.combo.textContent = '×1.0';
    this.bars.forEach(function (b) {
      b.style.height = '18%';
      b.classList.remove('is-hot');
    });

    this._spawnFor(patch);
  };

  ChaosOverlay.prototype.setRemaining = function (sec, duration) {
    this.remaining = Math.max(0, sec);
    this.duration = duration || this.duration || 35;
    this.refs.bossTime.textContent = String(Math.max(0, Math.ceil(sec)));
    var pct = clamp((sec / this.duration) * 100, 0, 100);
    this.refs.bossFill.style.width = pct.toFixed(1) + '%';
  };

  ChaosOverlay.prototype.bumpCombo = function (n) {
    this.comboHits = Math.min(110, this.comboHits + (n || 1));
    this.combo = 1 + this.comboHits * 0.06;
    this.refs.combo.textContent = '×' + Math.min(this.combo, 9.9).toFixed(1);
    for (var i = 0; i < this.bars.length; i++) {
      var h = 22 + Math.random() * 78;
      this.bars[i].style.height = h.toFixed(0) + '%';
      this.bars[i].classList.toggle('is-hot', h > 48);
    }
    this.refs.comboMeter.style.color = this.combo > 2.4 ? '#FBBF24' : 'rgba(251,191,36,.5)';
  };

  ChaosOverlay.prototype.setMaxEntities = function (n) {
    this.maxEntities = clamp(Number(n) || 35, 15, 50);
  };

  ChaosOverlay.prototype.panic = function () {
    this._setFlash(
      'DỌN PANIC · <100 MS',
      'ĐÃ DỌN LỚP PHỦ',
      'Đã xoá vật lý · đã dọn HUD · đã tắt âm thanh 8-bit.',
      'AN TOÀN · TRỞ VỀ TRẠNG THÁI CHỜ'
    );
    this.setState('panic');
    if (this.opts.onEvent) this.opts.onEvent('panic');
  };

  ChaosOverlay.prototype.showBlocked = function (prompt) {
    var q = '"' + String(prompt).slice(0, 90) + '"';
    this._setFlash(
      'CHẶN TOS · BỘ LỌC AN TOÀN',
      'PROMPT BỊ CHẶN',
      q + ' — vi phạm bộ lọc an toàn và chưa từng được biên dịch.',
      'TỰ VIẾT LẠI → VỊT CAO SU CỨU HỘ'
    );
    this.setState('blocked');
  };

  ChaosOverlay.prototype._clearArena = function () {
    this.entities.length = 0;
    this.particles.length = 0;
    this.beams.length = 0;
    this.bossObj = null;
  };

  ChaosOverlay.prototype._spawnFor = function (patch) {
    var base = patch.base || 18;
    var count = clamp(Math.round(base * (this.maxEntities / 35)), 6, this.maxEntities);
    var type = patch.spawn || 'meteor';
    var i;

    if (type === 'duck' || type === 'duckfallback') {
      for (i = 0; i < count; i++) this._spawn('duck');
    } else if (type === 'meteor') {
      for (i = 0; i < count; i++) this._spawn('meteor');
    } else if (type === 'cat') {
      for (i = 0; i < Math.round(count * 0.6); i++) this._spawn('meteor');
      for (i = 0; i < Math.round(count * 0.4); i++) this._spawn('duck');
      this.bossObj = {
        type: 'cat', x: W - 250, y: 560, t: rand(0, 6),
        beam: 0, beamCd: 2.2, target: null
      };
    } else if (type === 'shield') {
      for (i = 0; i < 6; i++) this._spawn('shield', i);
      for (i = 0; i < Math.min(10, count); i++) this._spawn('meteor');
    } else if (type === 'tug') {
      this.bossObj = { type: 'tug', x: W / 2, y: 540, t: 0, tension: 0.4 };
      for (i = 0; i < count; i++) this._spawn('shard');
    } else {
      for (i = 0; i < count; i++) this._spawn('meteor');
    }
  };

  ChaosOverlay.prototype._spawn = function (type, index) {
    var r = type === 'meteor' ? rand(20, 34) : type === 'duck' ? rand(26, 36) : type === 'shard' ? 10 : 44;
    var pos = this._edgePoint(r);
    var e = {
      type: type,
      x: pos.x,
      y: pos.y,
      r: r,
      vx: 0,
      vy: 0,
      rot: rand(0, TAU),
      spin: rand(-0.8, 0.8),
      alpha: 1,
      flash: 0,
      hitCd: 0,
      gravity: type === 'meteor' ? rand(40, 110) : type === 'duck' ? rand(10, 40) : 0,
      seed: rand(0, 1000),
      orbit: index || 0,
      angle: index != null ? (index / 6) * TAU : 0,
      orbitR: 150 + rand(-14, 18)
    };

    var cx = W / 2;
    var cy = H / 2;
    var ang = Math.atan2(cy - e.y, cx - e.x) + rand(-0.75, 0.75);
    var sp = type === 'shard' ? rand(90, 180) : rand(65, 145);
    e.vx = Math.cos(ang) * sp;
    e.vy = Math.sin(ang) * sp;
    if (type === 'duck' || type === 'duckfallback') e.vy = Math.abs(e.vy) * 0.5 + rand(30, 80);

    if (type === 'meteor') {
      e.points = [];
      var sides = randInt(7, 10);
      for (var p = 0; p < sides; p++) {
        var a = (p / sides) * TAU;
        var rr = r * rand(0.74, 1.08);
        e.points.push([Math.cos(a) * rr, Math.sin(a) * rr]);
      }
    }

    this.entities.push(e);
  };

  ChaosOverlay.prototype._edgePoint = function (r) {
    var side = randInt(0, 3);
    var pad = Math.max(30, r + 12);
    if (side === 0) return { x: rand(pad + 40, W - pad - 40), y: rand(28, Math.max(40, SAFE.y - 70)) };
    if (side === 1) return { x: rand(pad + 40, W - pad - 40), y: rand(SAFE.y + SAFE.h + 70, H - 28) };
    if (side === 2) return { x: rand(28, Math.max(40, SAFE.x - 70)), y: rand(pad + 40, H - pad - 40) };
    return { x: rand(SAFE.x + SAFE.w + 70, W - 28), y: rand(pad + 40, H - pad - 40) };
  };

  /* ────────────── update ────────────── */

  ChaosOverlay.prototype._loop = function (ts) {
    var dt = Math.min(0.05, (ts - this.last) / 1000 || 0.016);
    this.last = ts;
    this.time += dt;
    this._updateCompile();
    this._update(dt);
    this._draw();
    this.raf = requestAnimationFrame(this._loop);
  };

  ChaosOverlay.prototype._update = function (dt) {
    var active = this.state === 'active';
    var now = performance.now();
    var i;

    if (active) {
      if (this.comboHits > 0) {
        this.comboHits = Math.max(0, this.comboHits - dt * 2.2);
        var c = 1 + this.comboHits * 0.06;
        if (Math.abs(c - this.combo) > 0.15) {
          this.combo = c;
          this.refs.combo.textContent = '×' + Math.min(this.combo, 9.9).toFixed(1);
        }
      }
    }

    if (!active) {
      // particles still fade out is not needed; arena is cleared on exit
      return;
    }

    var player = this.opts.getPlayerRect ? this.opts.getPlayerRect() : null;
    var px = player ? player.x + player.w / 2 : W / 2;
    var py = player ? player.y + player.h / 2 : H * 0.82;

    for (i = this.entities.length - 1; i >= 0; i--) {
      var e = this.entities[i];

      if (e.type === 'shield') {
        e.angle += dt * 0.55;
        var orbR = player ? 176 : 300;
        e.x = px + Math.cos(e.angle) * orbR;
        e.y = py + Math.sin(e.angle) * orbR;
        e.alpha += ((insideSafe(e.x, e.y) ? 0.72 : 1) - e.alpha) * Math.min(1, dt * 5);
        e.rot += dt * 0.5;
        continue;
      }

      e.vy += e.gravity * dt;
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.rot += e.spin * dt;
      e.flash = Math.max(0, (e.flash || 0) - dt * 3);

      if (e.x < e.r) { e.x = e.r; e.vx = Math.abs(e.vx) * 0.86; this._spark(e.x, e.y, 'dim'); }
      if (e.x > W - e.r) { e.x = W - e.r; e.vx = -Math.abs(e.vx) * 0.86; this._spark(e.x, e.y, 'dim'); }
      if (e.y < e.r) { e.y = e.r; e.vy = Math.abs(e.vy) * 0.8; }
      if (e.y > H - e.r) { e.y = H - e.r; e.vy = -Math.abs(e.vy) * 0.55; }

      var target = insideSafe(e.x, e.y) ? 0.7 : 1;
      e.alpha += (target - e.alpha) * Math.min(1, dt * 6);

      if (player) {
        var nx = clamp(e.x, player.x, player.x + player.w);
        var ny = clamp(e.y, player.y, player.y + player.h);
        var dx = e.x - nx;
        var dy = e.y - ny;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < e.r) {
          var nX = dist ? dx / dist : 0;
          var nY = dist ? dy / dist : -1;
          var speed = Math.sqrt(e.vx * e.vx + e.vy * e.vy);
          e.vx = nX * Math.max(120, speed) + rand(-30, 30);
          e.vy = nY * Math.max(120, speed) - rand(10, 40);
          e.x = nx + nX * (e.r + 1);
          e.y = ny + nY * (e.r + 1);
          e.flash = 1;
          if (now - e.hitCd > 420) {
            e.hitCd = now;
            this._spark(e.x, e.y, e.type === 'meteor' ? 'amber' : 'purple');
            this.bumpCombo(1);
            if (this.opts.onEvent) this.opts.onEvent('impact');
          }
        }
      }
    }

    // boss behaviours
    if (this.bossObj) {
      var b = this.bossObj;
      b.t += dt;
      if (b.type === 'cat') {
        b.y = 560 + Math.sin(b.t * 0.55) * 130;
        b.x = W - 250 + Math.sin(b.t * 0.33) * 40;
        if (b.beam > 0) {
          b.beam -= dt;
          this._beamImpact(player);
        } else {
          b.beamCd -= dt;
          if (b.beamCd <= 0) {
            b.beam = 0.5;
            b.beamCd = rand(3.0, 4.2);
            b.target = { x: px, y: py };
            if (this.opts.onEvent) this.opts.onEvent('beam');
            this._beamImpact(player, true);
          }
        }
      } else if (b.type === 'tug') {
        b.tension = 0.5 + Math.sin(b.t * 1.5) * 0.5;
      }
    }

    // particles
    for (i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.985;
      p.vy *= 0.985;
      if (p.kind === 'ring') p.r += dt * 320;
    }
  };

  ChaosOverlay.prototype._beamImpact = function (player, fresh) {
    if (!this.bossObj || !this.bossObj.target) return;
    var p = player || this.opts.getPlayerRect && this.opts.getPlayerRect();
    if (!p) return;
    var px = p.x + p.w / 2;
    var py = p.y + p.h / 2;
    var b = this.bossObj;
    var dist = Math.hypot(px - b.target.x, py - b.target.y);
    if (fresh && dist < Math.max(p.w, p.h) * 1.15) {
      if (this.opts.onPlayerHit) this.opts.onPlayerHit();
      this._spark(px, py, 'amber', true);
    }
  };

  ChaosOverlay.prototype._spark = function (x, y, tone, big) {
    if (this.particles.length > 90) return;
    var color = tone === 'amber' ? '#FBBF24' : tone === 'purple' ? '#C084FC' : tone === 'green' ? '#34D399' : '#64748B';
    var n = big ? 16 : 6;
    for (var i = 0; i < n; i++) {
      var a = rand(0, TAU);
      var sp = rand(50, big ? 320 : 180);
      this.particles.push({
        kind: 'spark', x: x, y: y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: rand(0.25, 0.6), max: 0.6,
        color: color, size: rand(1.6, big ? 4 : 2.6)
      });
    }
    this.particles.push({ kind: 'ring', x: x, y: y, r: 6, life: 0.4, max: 0.4, color: color, vx: 0, vy: 0 });
  };

  /* ────────────── draw ────────────── */

  ChaosOverlay.prototype._draw = function () {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);
    if (this.state !== 'active') return;

    var i;

    // boss beam behind entities
    if (this.bossObj && this.bossObj.type === 'cat' && this.bossObj.target) {
      var b = this.bossObj;
      var t = b.target;
      if (b.beam > 0) {
        var pulse = 0.75 + Math.sin(this.time * 30) * 0.25;
        ctx.save();
        ctx.globalAlpha = 0.55 * clamp(b.beam / 0.2, 0, 1);
        var g = ctx.createLinearGradient(b.x, b.y, t.x, t.y);
        g.addColorStop(0, 'rgba(192,132,252,.15)');
        g.addColorStop(0.6, 'rgba(248,113,113,.55)');
        g.addColorStop(1, 'rgba(251,191,36,.9)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 18 * pulse;
        ctx.shadowColor = 'rgba(248,113,113,.8)';
        ctx.shadowBlur = 26;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255,240,214,.85)';
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    for (i = 0; i < this.entities.length; i++) {
      var e = this.entities[i];
      ctx.save();
      ctx.globalAlpha = e.alpha;
      if (e.flash > 0) {
        ctx.shadowColor = 'rgba(255,255,255,.9)';
        ctx.shadowBlur = 22;
      }
      if (e.type === 'duck') this._drawDuck(e);
      else if (e.type === 'meteor') this._drawMeteor(e);
      else if (e.type === 'shield') this._drawShield(e);
      else this._drawShard(e);
      ctx.restore();
    }

    if (this.bossObj) {
      if (this.bossObj.type === 'cat') this._drawCat(this.bossObj);
      else if (this.bossObj.type === 'tug') this._drawTug(this.bossObj);
    }

    for (i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      ctx.save();
      var k = clamp(p.life / p.max, 0, 1);
      ctx.globalAlpha = k;
      if (p.kind === 'ring') {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, TAU);
        ctx.stroke();
      } else {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * k + 0.4, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
  };

  ChaosOverlay.prototype._drawDuck = function (e) {
    var ctx = this.ctx;
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rot * 0.3);
    var s = e.r / 26;
    ctx.scale(s, s);
    ctx.shadowColor = 'rgba(251,191,36,.55)';
    ctx.shadowBlur = 18;
    ctx.fillStyle = '#FBBF24';
    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(2, 5, 22, 14, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-13, -10, 11, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-22, -11);
    ctx.lineTo(-34, -6);
    ctx.lineTo(-22, -2);
    ctx.closePath();
    ctx.fillStyle = '#F97316';
    ctx.shadowBlur = 0;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-16.5, -13, 2.3, 0, TAU);
    ctx.fillStyle = '#111827';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, 7, 11, 7, -0.25, 0, TAU);
    ctx.strokeStyle = 'rgba(120,53,15,.5)';
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();
  };

  ChaosOverlay.prototype._drawMeteor = function (e) {
    var ctx = this.ctx;
    var speed = Math.hypot(e.vx, e.vy) || 1;
    var tx = -e.vx / speed;
    var ty = -e.vy / speed;

    ctx.save();
    ctx.globalAlpha = e.alpha * 0.5;
    var tg = ctx.createLinearGradient(e.x, e.y, e.x + tx * 90, e.y + ty * 90);
    tg.addColorStop(0, 'rgba(251,191,36,.55)');
    tg.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.strokeStyle = tg;
    ctx.lineWidth = e.r * 0.9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.x, e.y);
    ctx.lineTo(e.x + tx * 90, e.y + ty * 90);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = e.alpha;
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rot);
    ctx.shadowColor = 'rgba(245,158,11,.6)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    for (var i = 0; i < e.points.length; i++) {
      var p = e.points[i];
      if (i === 0) ctx.moveTo(p[0], p[1]);
      else ctx.lineTo(p[0], p[1]);
    }
    ctx.closePath();
    ctx.fillStyle = '#1f2937';
    ctx.fill();
    ctx.strokeStyle = 'rgba(251,191,36,.75)';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-e.r * 0.2, -e.r * 0.24, e.r * 0.26, 0, TAU);
    ctx.fillStyle = 'rgba(245,158,11,.22)';
    ctx.fill();
    ctx.restore();
  };

  ChaosOverlay.prototype._drawShield = function (e) {
    var ctx = this.ctx;
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rot);
    ctx.strokeStyle = '#34D399';
    ctx.shadowColor = 'rgba(52,211,153,.8)';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, e.r * 0.8, -0.7, 0.7);
    ctx.stroke();
    ctx.globalAlpha = e.alpha * 0.45;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, 0, e.r, 0, TAU);
    ctx.stroke();
    ctx.restore();
  };

  ChaosOverlay.prototype._drawShard = function (e) {
    var ctx = this.ctx;
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rot);
    ctx.fillStyle = e.seed > 500 ? '#34D399' : '#C084FC';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(0, -e.r);
    ctx.lineTo(e.r * 0.7, 0);
    ctx.lineTo(0, e.r);
    ctx.lineTo(-e.r * 0.7, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  ChaosOverlay.prototype._drawCat = function (b) {
    var ctx = this.ctx;
    ctx.save();
    ctx.translate(b.x, b.y);

    // rotating outer ring
    ctx.save();
    ctx.rotate(this.time * 0.3);
    ctx.strokeStyle = 'rgba(192,132,252,.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([16, 14]);
    ctx.beginPath();
    ctx.arc(0, 0, 108, 0, TAU);
    ctx.stroke();
    ctx.restore();

    // head
    ctx.shadowColor = 'rgba(145,70,255,.65)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#170f2b';
    ctx.strokeStyle = '#C084FC';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-72, -42);
    ctx.lineTo(-58, -94);
    ctx.lineTo(-18, -64);
    ctx.quadraticCurveTo(0, -56, 18, -64);
    ctx.lineTo(58, -94);
    ctx.lineTo(72, -42);
    ctx.quadraticCurveTo(84, 24, 0, 78);
    ctx.quadraticCurveTo(-84, 24, -72, -42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // eyes
    var glow = 0.75 + Math.sin(this.time * 5) * 0.25;
    [-27, 27].forEach(function (ox) {
      ctx.save();
      ctx.shadowColor = 'rgba(52,211,153,' + glow + ')';
      ctx.shadowBlur = 22;
      ctx.fillStyle = '#34D399';
      ctx.beginPath();
      ctx.ellipse(ox, -14, 13, 16, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = '#04130d';
      ctx.beginPath();
      ctx.ellipse(ox, -14, 3.4, 14, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
    });

    // nose + whiskers
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#F9A8D4';
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.lineTo(-7, 4);
    ctx.lineTo(7, 4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(226,232,240,.45)';
    ctx.lineWidth = 1.6;
    [-1, 1].forEach(function (dir) {
      for (var k = -1; k <= 1; k++) {
        ctx.beginPath();
        ctx.moveTo(dir * 20, 14 + k * 6);
        ctx.lineTo(dir * 84, 6 + k * 18);
        ctx.stroke();
      }
    });

    // mouth
    ctx.strokeStyle = 'rgba(226,232,240,.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-14, 26);
    ctx.quadraticCurveTo(0, 38, 14, 26);
    ctx.stroke();
    ctx.restore();
  };

  ChaosOverlay.prototype._drawTug = function (b) {
    var ctx = this.ctx;
    var t = b.tension;
    var slack = 40 + (1 - t) * 70;
    var ax = 220;
    var bx = W - 220;
    var ay = 540 + Math.sin(b.t * 1.2) * 30 + (t - 0.5) * 40;
    var by = 540 - Math.sin(b.t * 1.05) * 30 - (t - 0.5) * 40;
    var mx = W / 2;
    var my = 540 + slack * 0.5;

    ctx.save();
    ctx.globalAlpha = 0.62;
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 5;
    ctx.setLineDash([14, 10]);
    ctx.lineDashOffset = -this.time * 40;
    ctx.shadowColor = 'rgba(148,163,184,.4)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(mx, my, bx, by);
    ctx.stroke();
    ctx.restore();

    var drawOrb = function (x, y, color, label) {
      ctx.save();
      ctx.translate(x, y);
      ctx.shadowColor = color;
      ctx.shadowBlur = 34;
      ctx.fillStyle = '#0a0f1e';
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 74, 0, TAU);
      ctx.fill();
      ctx.stroke();

      ctx.rotate(this.time * 0.6);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, 92, 0, TAU);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.rotate(-this.time * 0.6);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(0, -72);
      ctx.lineTo(72, 0);
      ctx.lineTo(0, 72);
      ctx.lineTo(-72, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    drawOrb(ax, ay, '#C084FC');
    drawOrb(bx, by, '#34D399');

    ctx.save();
    ctx.translate(mx, my);
    ctx.strokeStyle = 'rgba(251,191,36,.8)';
    ctx.fillStyle = 'rgba(251,191,36,.14)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, 46 + t * 10, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  ChaosOverlay.prototype.destroy = function () {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.ro) this.ro.disconnect();
    else global.removeEventListener('resize', this._onResize);
    this.mount.innerHTML = '';
  };

  global.ChaosOverlay = ChaosOverlay;
  global.ChaosOverlayGeometry = { W: W, H: H, SAFE: SAFE };
})(window);
