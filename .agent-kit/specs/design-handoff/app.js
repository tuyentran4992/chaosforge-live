/* ══════════════════════════════════════════════════════════════
   CHAOSFORGE LIVE — Controller
   Routes the three prototype views, runs the six-state round
   machine, the simulated crowd, the mini-game canvas and the
   streamer deck. Every external system is simulated locally.
   ══════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var TAU = Math.PI * 2;
  var reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function pad(n, len) {
    var s = String(n);
    while (s.length < len) s = '0' + s;
    return s;
  }
  function stamp() {
    var d = new Date();
    return pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2);
  }
  function elapsedText(sec) { return Math.max(0, Math.ceil(sec)) + 's'; }

  /* ─────────────────────────── SFX ─────────────────────────── */

  var Sfx = (function () {
    var ctx = null;
    var enabled = true;

    function ensure() {
      if (!enabled) return null;
      if (!ctx) {
        try {
          var AC = global.AudioContext || global.webkitAudioContext;
          if (!AC) { enabled = false; return null; }
          ctx = new AC();
        } catch (e) { enabled = false; return null; }
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    function tone(freq, dur, type, gain) {
      var c = ensure();
      if (!c) return;
      var t = c.currentTime;
      var osc = c.createOscillator();
      var g = c.createGain();
      osc.type = type || 'square';
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain || 0.028, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g);
      g.connect(c.destination);
      osc.start(t);
      osc.stop(t + dur + 0.03);
    }

    var KINDS = {
      click: [[520, 0.045, 'square', 0.02]],
      vote: [[660, 0.05, 'square', 0.022], [880, 0.06, 'square', 0.02]],
      compile: [[220, 0.13, 'square', 0.024], [440, 0.16, 'square', 0.02]],
      deploy: [[330, 0.09, 'square', 0.026], [660, 0.09, 'square', 0.024], [990, 0.22, 'square', 0.02]],
      impact: [[150, 0.08, 'triangle', 0.03]],
      beam: [[90, 0.24, 'sawtooth', 0.026]],
      panic: [[440, 0.1, 'sawtooth', 0.03], [220, 0.16, 'sawtooth', 0.03], [110, 0.3, 'sawtooth', 0.026]],
      blocked: [[200, 0.1, 'square', 0.026], [150, 0.18, 'square', 0.022]],
      coin: [[1040, 0.05, 'square', 0.02], [1560, 0.07, 'square', 0.016]],
      join: [[440, 0.07, 'square', 0.022], [660, 0.1, 'square', 0.02]]
    };

    return {
      unlock: function () { ensure(); },
      setEnabled: function (on) { enabled = !!on; if (enabled) ensure(); },
      isEnabled: function () { return enabled; },
      play: function (kind) {
        if (!enabled) return;
        var seq = KINDS[kind] || KINDS.click;
        seq.forEach(function (s, i) {
          global.setTimeout(function () { tone(s[0], s[1], s[2], s[3]); }, i * 62);
        });
      }
    };
  })();

  /* ─────────────────────── content banks ───────────────────── */

  var USERS = [
    'nova_blitz', 'mint_chip', 'tuxedocat', 'banhmi_99', 'pixelpho', 'lulmaster',
    'ducklord', 'hanoi_hype', 'twitchfang', 'codemon', 'shardqueen', 'space_pug',
    'pho_real', 'keyboard_cat', 'glitchgoblin', 'soy_sauce', 'moonlit_vn',
    'saigon_64', 'ramen_raider', 'banh_xeo', 'mekong_wave', 'hue_hearts'
  ];

  var USER_COLORS = ['#c084fc', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#f87171', '#5eead4'];

  var IDEA_BANK = [
    { text: 'Mưa vịt cao su nổ tung theo emote LUL', tags: ['DUCK', 'PHYSICS'] },
    { text: 'Đảo ngược trọng lực + Boss mèo bắn laser', tags: ['BOSS', 'GRAVITY'] },
    { text: 'Khiên phản đòn 360° theo nhịp chat !shield', tags: ['SHIELD', 'SYNC'] },
    { text: 'Kéo co boss giữa 2 streamer', tags: ['RAID', 'VERSUS'] },
    { text: 'Mưa thiên thạch pixel theo từng dòng chat', tags: ['METEOR', 'RETRO'] },
    { text: 'Sàn đấu co giãn khi chat spam POG', tags: ['POG', 'PHYSICS'] },
    { text: 'Vòng xoáy shard tím xoay quanh tâm màn hình', tags: ['SHARD', 'ORBIT'] },
    { text: 'Boss mèo gọi thêm đệ tử vịt cao su', tags: ['CAT', 'DUCK'] },
    { text: 'Khiên 360° kết hợp mưa thiên thạch', tags: ['SHIELD', 'METEOR'] },
    { text: 'Trận kéo co giữa hai streamer cùng khán giả', tags: ['TUG', 'RAID'] },
    { text: 'Mưa vịt cao su + đảo trọng lực toàn sân', tags: ['DUCK', 'GRAVITY'] },
    { text: 'Meteor rơi theo nhịp hype, càng spam càng dày', tags: ['METEOR', 'HYPE'] },
    { text: 'Boss mèo xoay vòng laser quanh vùng an toàn', tags: ['CAT', 'LASER'] }
  ];

  var CHAT_MESSAGES = [
    'CÁI NÀY LÀ SAO LUL',
    'CODEX NẤU GÌ VẬY POG',
    'chưa kịp thở luôn',
    'vùng an toàn đỉnh thật',
    'vịt cao su > mọi boss',
    'streamer né đẹp vãi',
    'FPS vẫn 60, ảo thật',
    'deploy đi deploy đi',
    'clip lại rồi LUL',
    'mèo boss bắn laser kìa',
    'cái khiên 360 xoay đẹp',
    'vote 1 ngay anh em',
    'vòng này chắc nổ sân',
    'panic đi kìa =))',
    'lần đầu thấy overlay biết né',
    'trình biên dịch chạy nhanh thật',
    'chat ơi vote số 2',
    'vịt rơi như mưa luôn',
    'hype quá anh em ơi'
  ];

  var BANNED = [
    'nsfw', '18+', 'porn', 'khiêu dâm', 'sex', 'máu me', 'đẫm máu', 'bạo lực',
    'giết người', 'đâm chém', 'bomb thật', 'súng thật', 'thuốc nổ', 'khủng bố',
    'hack tài khoản', 'dox', 'swat', 'tự tử', 'tra tấn', 'phát tán dữ liệu'
  ];

  function isUnsafe(text) {
    var t = String(text || '').toLowerCase();
    for (var i = 0; i < BANNED.length; i++) {
      if (t.indexOf(BANNED[i]) !== -1) return true;
    }
    return false;
  }

  function colorFor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
    return USER_COLORS[h % USER_COLORS.length];
  }

  /* ─────────────────────── patch factory ───────────────────── */

  function patchFromPrompt(prompt, author) {
    var t = String(prompt || '').toLowerCase();
    var p = {
      name: 'MƯA THIÊN THẠCH',
      protocol: 'VẬT LÝ · RƠI',
      spawn: 'meteor',
      base: 18,
      tags: ['METEOR', 'PHYSICS'],
      ast: { entity: 'meteor_stream', gravity: 0.4, collision: 'bounce/elastic', spawn_zone: 'edge_ring', sfx: 'square/blip' }
    };

    if (t.indexOf('mèo') !== -1 || t.indexOf('cat') !== -1 || t.indexOf('boss') !== -1) {
      p.name = 'BOSS MÈO · LASER';
      p.protocol = 'BOSS · TRỌNG LỰC';
      p.spawn = 'cat';
      p.base = 16;
      p.tags = ['BOSS', 'LASER', 'GRAVITY'];
      p.ast = { entity: 'cat_boss', gravity: -0.18, collision: 'beam/seek', spawn_zone: 'edge_ring', sfx: 'sawtooth/beam' };
    } else if (t.indexOf('gà') !== -1 || t.indexOf('duck') !== -1 || t.indexOf('vịt') !== -1) {
      p.name = 'BÃO VỊT CAO SU';
      p.protocol = 'NẢY · VẬT LÝ';
      p.spawn = 'duck';
      p.base = 22;
      p.tags = ['DUCK', 'PHYSICS', 'SAFE'];
      p.ast = { entity: 'rubber_duck', gravity: 0.16, collision: 'bounce/elastic', spawn_zone: 'edge_ring', sfx: 'square/squeak' };
    } else if (t.indexOf('khiên') !== -1 || t.indexOf('shield') !== -1 || t.indexOf('parry') !== -1) {
      p.name = 'KHIÊN PHẢN ĐÒN 360°';
      p.protocol = 'QUỸ ĐẠO · PHẢN ĐÒN';
      p.spawn = 'shield';
      p.base = 16;
      p.tags = ['SHIELD', 'SYNC', 'SAFE'];
      p.ast = { entity: 'orbit_shield', gravity: 0, collision: 'orbit/parry', spawn_zone: 'player_orbit', sfx: 'triangle/ping' };
    } else if (t.indexOf('kéo co') !== -1 || t.indexOf('tug') !== -1 || t.indexOf('raid') !== -1 || t.indexOf('versus') !== -1) {
      p.name = 'KÉO CO RAID';
      p.protocol = 'ĐỐI KHÁNG · KÉO';
      p.spawn = 'tug';
      p.base = 14;
      p.tags = ['RAID', 'VERSUS'];
      p.ast = { entity: 'tug_boss', gravity: 0, collision: 'tension/pull', spawn_zone: 'edge_ring', sfx: 'square/drum' };
    } else if (t.indexOf('shard') !== -1 || t.indexOf('mảnh') !== -1 || t.indexOf('xoáy') !== -1) {
      p.name = 'XOÁY SHARD';
      p.protocol = 'QUỸ ĐẠO · XOÁY';
      p.spawn = 'shard';
      p.base = 24;
      p.tags = ['SHARD', 'ORBIT'];
      p.ast = { entity: 'shard_vortex', gravity: 0.05, collision: 'orbit/soft', spawn_zone: 'edge_ring', sfx: 'triangle/spark' };
    } else if (t.indexOf('trọng lực') !== -1 || t.indexOf('gravity') !== -1 || t.indexOf('đảo') !== -1) {
      p.name = 'ĐẢO TRỌNG LỰC';
      p.protocol = 'ĐẢO · VẬT LÝ';
      p.spawn = 'duck';
      p.base = 20;
      p.tags = ['GRAVITY', 'PHYSICS'];
      p.ast = { entity: 'gravity_flip', gravity: -0.32, collision: 'bounce/elastic', spawn_zone: 'edge_ring', sfx: 'square/blip' };
    }

    var clean = String(prompt || '').replace(/^\s*!forge\s*/i, '').trim();
    p.prompt = clean || p.name;
    p.author = author ? '@' + String(author).replace(/^@/, '') : '@' + pick(USERS);
    p.duration = randInt(30, 45);
    return p;
  }

  var FALLBACK_PATCH = {
    name: 'VỊT CAO SU CỨU HỘ',
    protocol: 'AN TOÀN · VỊT',
    spawn: 'duckfallback',
    base: 12,
    duration: 30,
    tags: ['SAFE', 'DUCK', 'FALLBACK'],
    ast: { entity: 'rubber_duck', gravity: 0.18, collision: 'bounce/elastic', spawn_zone: 'edge_ring', sfx: 'square/squeak' },
    prompt: '!forge mưa vịt cao su an toàn',
    author: '@safety_duck'
  };

  /* ───────────────────────── mini-game ─────────────────────── */

  var Game = {
    W: 1920,
    H: 1080,
    canvas: null,
    ctx: null,
    dpr: 1,
    scale: 1,
    player: { x: 960, y: 740, w: 54, h: 54 },
    vel: { x: 0, y: 0 },
    keys: {},
    manual: false,
    overlay: null,
    bullets: [],
    sparks: [],
    stars: [],
    score: 0,
    hull: 100,
    lastHit: -9999,
    shake: 0,
    fps: 60,
    frames: 0,
    fpsTime: 0,
    hudAcc: 0,
    autoT: 0,
    fireCd: 0,
    last: 0,
    raf: 0,
    bgGrad: null,
    lastHud: '',

    init: function () {
      var self = this;
      this.canvas = $('#gameCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.stars = [];
      for (var i = 0; i < 90; i++) {
        this.stars.push({
          x: rand(0, this.W),
          y: rand(0, this.H),
          z: rand(0.25, 1),
          r: rand(0.6, 1.9)
        });
      }
      this.frame = this.frame.bind(this);
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
      global.addEventListener('resize', function () { self.resize(); });
      if (global.ResizeObserver) {
        new ResizeObserver(function () { self.resize(); }).observe(this.canvas);
      }
    },

    resize: function () {
      if (!this.canvas || !this.ctx) return;
      var rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      this.dpr = Math.min(global.devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(rect.width * this.dpr);
      this.canvas.height = Math.round(rect.height * this.dpr);
      this.scale = rect.width / this.W;
      var g = this.ctx.createLinearGradient(0, 0, 0, this.H);
      g.addColorStop(0, '#04070e');
      g.addColorStop(0.55, '#060d1a');
      g.addColorStop(1, '#081120');
      this.bgGrad = g;
    },

    bind: function (ov) { this.overlay = ov; },

    rect: function () {
      return { x: this.player.x - 27, y: this.player.y - 27, w: 54, h: 54 };
    },

    setManual: function (on) {
      this.manual = !!on;
      if (!on) { this.vel.x = 0; this.vel.y = 0; }
    },

    damage: function (n) {
      if (SIM.state !== 'active') return;
      if (performance.now() - this.lastHit < 260) return;
      this.hull = Math.max(0, this.hull - n);
      this.lastHit = performance.now();
      this.shake = reduced ? 0 : 9;
      Sfx.play('impact');
      flashMonitor();
      if (this.hull <= 0) {
        this.hull = 100;
        this.score = Math.max(0, this.score - 500);
        this.bullets.length = 0;
        if (this.overlay) {
          for (var i = 0; i < 6 && this.overlay.entities.length; i++) this.overlay.entities.pop();
        }
        toast('danger', 'THỦNG GIÁP', 'Tự sửa chữa · -500 XP · thực thể đã được xả bớt');
      }
    },

    spark: function (x, y, color) {
      for (var i = 0; i < 8; i++) {
        var a = rand(0, TAU);
        var sp = rand(40, 260);
        this.sparks.push({
          x: x, y: y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: rand(0.22, 0.55),
          max: 0.55,
          color: color
        });
      }
    },

    nearestEntity: function () {
      if (!this.overlay) return null;
      var best = null;
      var bd = 980;
      for (var i = 0; i < this.overlay.entities.length; i++) {
        var e = this.overlay.entities[i];
        if (e.type === 'shield') continue;
        var dx = e.x - this.player.x;
        var dy = e.y - this.player.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < bd) { bd = d; best = { e: e, d: d, i: i }; }
      }
      return best;
    },

    update: function (dt) {
      var p = this.player;
      var self = this;

      this.autoT += dt;
      this.fireCd -= dt;
      if (this.shake > 0) this.shake = Math.max(0, this.shake - dt * 34);

      if (!this.manual) {
        var tx = this.W / 2 + Math.sin(this.autoT * 0.72) * 300;
        var ty = 720 + Math.cos(this.autoT * 0.51) * 150;
        var near = this.nearestEntity();
        if (near && near.d < 300) {
          tx -= (near.e.x - p.x) * 1.35;
          ty -= (near.e.y - p.y) * 1.1;
        }
        tx = clamp(tx, 90, this.W - 90);
        ty = clamp(ty, 130, this.H - 130);
        var k = Math.min(1, dt * 2.6);
        p.x += (tx - p.x) * k;
        p.y += (ty - p.y) * k;
        this.vel.x = (tx - p.x) * 1.2;
        this.vel.y = (ty - p.y) * 1.2;
      } else {
        var ax = 0;
        var ay = 0;
        if (this.keys.a || this.keys.arrowleft) ax -= 1;
        if (this.keys.d || this.keys.arrowright) ax += 1;
        if (this.keys.w || this.keys.arrowup) ay -= 1;
        if (this.keys.s || this.keys.arrowdown) ay += 1;
        var len = Math.sqrt(ax * ax + ay * ay) || 1;
        var tvx = (ax / len) * 620;
        var tvy = (ay / len) * 620;
        this.vel.x += (tvx - this.vel.x) * Math.min(1, dt * 11);
        this.vel.y += (tvy - this.vel.y) * Math.min(1, dt * 11);
        p.x += this.vel.x * dt;
        p.y += this.vel.y * dt;
        p.x = clamp(p.x, 70, this.W - 70);
        p.y = clamp(p.y, 110, this.H - 110);
      }

      if (performance.now() - this.lastHit > 2500) {
        this.hull = Math.min(100, this.hull + dt * 1.6);
      }

      var active = SIM.state === 'active';
      if (active && this.fireCd <= 0) {
        var target = this.nearestEntity();
        if (target) {
          var dx = target.e.x - p.x;
          var dy = target.e.y - p.y;
          var d = Math.sqrt(dx * dx + dy * dy) || 1;
          var speed = 1480;
          this.bullets.push({
            x: p.x + dx / d * 22,
            y: p.y + dy / d * 22,
            vx: dx / d * speed,
            vy: dy / d * speed,
            life: 1.1
          });
          this.fireCd = this.manual ? 0.3 : 0.24;
        } else {
          this.fireCd = 0.12;
        }
      }

      for (var b = this.bullets.length - 1; b >= 0; b--) {
        var bl = this.bullets[b];
        bl.x += bl.vx * dt;
        bl.y += bl.vy * dt;
        bl.life -= dt;
        if (bl.life <= 0 || bl.x < -40 || bl.x > this.W + 40 || bl.y < -40 || bl.y > this.H + 40) {
          this.bullets.splice(b, 1);
          continue;
        }
        if (!this.overlay) continue;
        for (var i = this.overlay.entities.length - 1; i >= 0; i--) {
          var e = this.overlay.entities[i];
          if (e.type === 'shield') continue;
          var ex = e.x - bl.x;
          var ey = e.y - bl.y;
          if (ex * ex + ey * ey < (e.r + 8) * (e.r + 8)) {
            this.overlay.entities.splice(i, 1);
            this.overlay.bumpCombo(1);
            this.bullets.splice(b, 1);
            this.score += 150;
            this.spark(e.x, e.y, e.type === 'duck' ? '#fbbf24' : '#34d399');
            Sfx.play('coin');
            break;
          }
        }
      }

      for (var s = this.sparks.length - 1; s >= 0; s--) {
        var sp = this.sparks[s];
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.vx *= 0.96;
        sp.vy *= 0.96;
        sp.life -= dt;
        if (sp.life <= 0) this.sparks.splice(s, 1);
      }

      for (var st = 0; st < this.stars.length; st++) {
        var star = this.stars[st];
        star.y += (12 + star.z * 26) * dt;
        if (star.y > this.H + 4) { star.y = -4; star.x = rand(0, this.W); }
      }

      this.hudAcc += dt;
      if (this.hudAcc > 0.14) {
        this.hudAcc = 0;
        this.updateHud();
      }
    },

    updateHud: function () {
      var entities = this.overlay ? this.overlay.entities.length : 0;
      var score = pad(Math.round(this.score), 6);
      var hull = Math.round(this.hull) + '%';
      var key = score + '|' + hull + '|' + entities;
      if (key === this.lastHud) return;
      this.lastHud = key;
      var s = $('#gameScore');
      var h = $('#gameHull');
      var en = $('#gameEntities');
      if (s) s.textContent = score;
      if (h) h.textContent = hull;
      if (en) en.textContent = String(entities);
    },

    frame: function (ts) {
      var dt = this.last ? Math.min(0.05, (ts - this.last) / 1000) : 0.016;
      this.last = ts;
      if (document.hidden) { this.raf = requestAnimationFrame(this.frame); return; }

      this.frames++;
      this.fpsTime += dt;
      if (this.fpsTime >= 0.6) {
        this.fps = Math.round(this.frames / this.fpsTime) || 60;
        this.frames = 0;
        this.fpsTime = 0;
      }

      this.update(dt);
      this.draw();
      this.raf = requestAnimationFrame(this.frame);
    },

    draw: function () {
      var ctx = this.ctx;
      if (!ctx || !this.canvas || !this.canvas.width) return;
      var g = this;
      var W = g.W;
      var H = g.H;

      ctx.setTransform(g.scale * g.dpr, 0, 0, g.scale * g.dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = g.bgGrad || '#04070e';
      ctx.fillRect(0, 0, W, H);

      var sx = g.shake ? rand(-g.shake, g.shake) : 0;
      var sy = g.shake ? rand(-g.shake, g.shake) : 0;
      ctx.save();
      ctx.translate(sx, sy);

      // coordinate grid
      ctx.strokeStyle = 'rgba(56, 78, 116, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var x = 120; x < W; x += 120) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (var y = 120; y < H; y += 120) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // safe zone
      ctx.save();
      ctx.setLineDash([12, 14]);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.11)';
      ctx.lineWidth = 2;
      ctx.strokeRect(W * 0.2, H * 0.2, W * 0.6, H * 0.6);
      ctx.restore();

      // center reticle
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.1)';
      ctx.beginPath();
      ctx.arc(W / 2, 720, 210, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.arc(W / 2, 720, 320, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);

      // stars
      for (var i = 0; i < g.stars.length; i++) {
        var st = g.stars[i];
        ctx.fillStyle = 'rgba(214, 232, 255, ' + (0.1 + st.z * 0.28).toFixed(2) + ')';
        ctx.fillRect(st.x, st.y, st.r, st.r * (1.6 + st.z));
      }

      // corner brackets
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
      ctx.lineWidth = 2;
      var c = 46;
      var pad = 26;
      ctx.beginPath();
      ctx.moveTo(pad, pad + c); ctx.lineTo(pad, pad); ctx.lineTo(pad + c, pad);
      ctx.moveTo(W - pad - c, pad); ctx.lineTo(W - pad, pad); ctx.lineTo(W - pad, pad + c);
      ctx.moveTo(W - pad, H - pad - c); ctx.lineTo(W - pad, H - pad); ctx.lineTo(W - pad - c, H - pad);
      ctx.moveTo(pad + c, H - pad); ctx.lineTo(pad, H - pad); ctx.lineTo(pad, H - pad - c);
      ctx.stroke();

      // bullets
      for (var b = 0; b < g.bullets.length; b++) {
        var bl = g.bullets[b];
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(bl.x, bl.y);
        ctx.lineTo(bl.x - bl.vx * 0.012, bl.y - bl.vy * 0.012);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ship
      var p = g.player;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(clamp(g.vel.x / 1400, -0.28, 0.28));
      var flick = 8 + Math.random() * 12;
      ctx.beginPath();
      ctx.moveTo(-7, 16);
      ctx.lineTo(0, 22 + flick);
      ctx.lineTo(7, 16);
      ctx.closePath();
      ctx.fillStyle = 'rgba(52, 211, 153, 0.55)';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -27);
      ctx.lineTo(19, 20);
      ctx.lineTo(0, 11);
      ctx.lineTo(-19, 20);
      ctx.closePath();
      ctx.fillStyle = 'rgba(16, 163, 127, 0.16)';
      ctx.fill();
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(0, -2, 5, 0, TAU);
      ctx.fillStyle = '#d1fae5';
      ctx.fill();
      ctx.restore();

      // sparks
      for (var sp = 0; sp < g.sparks.length; sp++) {
        var s = g.sparks[sp];
        var a = clamp(s.life / s.max, 0, 1);
        ctx.globalAlpha = a;
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x - 2, s.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;

      ctx.restore();

      if (g.hull < 35) {
        ctx.fillStyle = 'rgba(239, 68, 68, ' + (0.05 + Math.sin(Date.now() / 180) * 0.03).toFixed(3) + ')';
        ctx.fillRect(0, 0, W, H);
      }
    }
  };

  /* ─────────────────────── overlay mounts ──────────────────── */

  var stageMount = $('#stageOverlay');
  var previewMount = $('#overlayPreview');
  var ovStage = null;
  var ovPreview = null;
  var guideStage = false;
  var guidePreview = false;

  function allOverlays() {
    return [ovStage, ovPreview].filter(function (o) { return !!o; });
  }

  function flashMonitor() {
    var m = $('#monitor');
    if (!m) return;
    m.classList.remove('is-hit');
    void m.offsetWidth;
    m.classList.add('is-hit');
    global.setTimeout(function () { m.classList.remove('is-hit'); }, 340);
  }

  /* ─────────────────────── round machine ───────────────────── */

  var STATE_PROGRESS = { idle: 9, voting: 26, compiling: 43, active: 60, panic: 77, blocked: 94 };

  var SIM = {
    state: 'idle',
    timeLeft: 0,
    duration: 0,
    pollDuration: 15,
    pollAcc: 0,
    ideas: [],
    voteRate: 0,
    paused: false,
    auto: true,
    idleWait: 4.6,
    currentPatch: null,
    pendingPatch: null,
    lastPrompt: '',
    afterBlock: false,
    modApproval: false,
    round: 0,
    winner: null
  };

  var CROWD = {
    viewers: 512,
    lastShown: 512,
    hype: 1.2,
    chatPerMin: 0,
    stamps: [],
    liveConnected: false,
    liveFeed: null,
    channel: ''
  };

  var lastCompileValue = '2.1s';

  /* ─────────────────────── UI helpers ──────────────────────── */

  function toast(kind, title, body) {
    var stack = $('#toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast toast--' + kind;
    el.innerHTML = '<b>' + esc(title) + '</b>' + esc(body);
    stack.appendChild(el);
    global.setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 4200);
  }

  function setStateUI(name) {
    document.body.dataset.roundState = name;
    $$('.state-chip').forEach(function (chip) {
      var on = chip.dataset.state === name;
      chip.classList.toggle('is-on', on);
      if (on) chip.setAttribute('aria-current', 'step');
      else chip.removeAttribute('aria-current');
    });
    var bar = $('#stateProgress');
    if (bar) bar.style.width = (STATE_PROGRESS[name] || 9) + '%';
    var timer = $('#stateTimer');
    if (timer) timer.textContent = stateTimerText(name);
  }

  function stateTimerText(name) {
    if (name === 'voting') return 'POLL TRỰC TIẾP · ' + elapsedText(SIM.timeLeft);
    if (name === 'compiling') return 'CODEX BIÊN DỊCH · ' + Math.max(0, SIM.timeLeft).toFixed(1) + 's';
    if (name === 'active') return (SIM.paused ? 'TẠM DỪNG · ' : 'ĐANG CHẠY · ') + elapsedText(SIM.timeLeft);
    if (name === 'panic') return 'DỌN PANIC · <100 MS';
    if (name === 'blocked') return 'CHẶN TOS · ĐANG VIẾT LẠI';
    return 'CHỜ · SẴN SÀNG';
  }

  function setPilot(manual, quiet) {
    Game.setManual(manual);
    $$('#pilotMode button').forEach(function (b) {
      b.classList.toggle('is-on', (b.dataset.mode === 'manual') === manual);
    });
    if (!quiet) {
      toast(manual ? 'ok' : 'purple', manual ? 'LÁI BẰNG PHÍM' : 'TỰ LÁI',
        manual ? 'WASD / phím mũi tên để né · tự động bắn mục tiêu gần nhất' : 'Lái tự động giữ vùng an toàn và bắn thực thể');
    }
  }

  /* ─────────────────────── queue + deck ────────────────────── */

  function patchTagLine(patch) {
    return (patch.tags || []).slice(0, 3).join(' · ');
  }

  function updateQueueNow(mode) {
    var nameEl = $('#queueNowName');
    var authorEl = $('#queueNowAuthor');
    var tagsEl = $('#queueNowTags');
    var barEl = $('#queueNowBar');
    var timeEl = $('#queueNowTime');
    var stateEl = $('#queueNowState');
    if (!nameEl) return;

    var patch = SIM.currentPatch;
    var pct = 0;
    var name = 'CHƯA CÓ PATCH';
    var author = '—';
    var tags = '—';
    var time = 'CHỜ';
    var state = 'SẴN SÀNG';

    if (mode === 'voting') {
      name = 'POLL TRỰC TIẾP · TOP 3';
      author = '@chat';
      tags = SIM.ideas.length + ' Ý TƯỞNG · !forge';
      pct = clamp(1 - SIM.timeLeft / SIM.pollDuration, 0, 1) * 100;
      time = elapsedText(SIM.timeLeft) + ' CÒN LẠI';
      state = 'POLL MỞ';
    } else if (mode === 'compiling' && patch) {
      name = patch.name;
      author = patch.author;
      tags = patchTagLine(patch);
      pct = clamp(1 - SIM.timeLeft / 2.45, 0, 1) * 100;
      time = 'KIỂM TRA AST';
      state = 'ĐANG BIÊN DỊCH';
    } else if (mode === 'active' && patch) {
      name = patch.name;
      author = patch.author;
      tags = patchTagLine(patch) + ' · ' + patch.duration + 's';
      pct = clamp(1 - SIM.timeLeft / SIM.duration, 0, 1) * 100;
      time = elapsedText(SIM.timeLeft) + ' CÒN LẠI';
      state = SIM.paused ? 'TẠM DỪNG' : 'TRỰC TIẾP';
    } else if (mode === 'await') {
      patch = SIM.pendingPatch;
      name = patch ? patch.name : 'PATCH CHỜ DUYỆT';
      author = patch ? patch.author : '@chat';
      tags = patch ? patchTagLine(patch) : '';
      pct = 0;
      time = 'GIỮ';
      state = 'CHỜ MOD';
    } else if (mode === 'panic') {
      name = 'ĐÃ DỌN LỚP PHỦ';
      author = '@streamer';
      tags = 'CHẾ ĐỘ AN TOÀN';
      pct = 0;
      time = 'ĐÃ XOÁ';
      state = 'ĐÃ DỌN';
    } else if (mode === 'blocked') {
      name = 'PROMPT BỊ CHẶN';
      author = '@tos_guard';
      tags = 'VIẾT LẠI → VỊT';
      pct = 0;
      time = 'ĐÃ CHẶN';
      state = 'BỊ CHẶN';
    }

    nameEl.textContent = name;
    authorEl.textContent = author;
    tagsEl.textContent = tags;
    if (barEl) barEl.style.width = pct.toFixed(1) + '%';
    timeEl.textContent = time;
    stateEl.textContent = state;
  }

  function updateNextIdea() {
    var seed = IDEA_BANK[randInt(0, IDEA_BANK.length - 1)];
    var patch = patchFromPrompt(seed.text);
    var n = $('#queueNextName');
    var b = $('#queueNextBy');
    var badge = $('#queueNextBadge');
    if (n) n.textContent = patch.name;
    if (b) b.textContent = patch.author;
    if (badge) {
      badge.textContent = isUnsafe(seed.text) ? 'CẦN DUYỆT' : 'AN TOÀN';
      badge.classList.toggle('is-risk', isUnsafe(seed.text));
    }
  }

  function updateSkipLabel() {
    var btn = $('#skipRound');
    if (!btn) return;
    btn.textContent = SIM.pendingPatch ? 'DUYỆT PATCH' : 'BỎ QUA / PATCH TIẾP';
  }

  /* ─────────────────────── crowd sim ───────────────────────── */

  var chatFeed = $('#chatFeed');
  var liveFeed = $('.crowd-panel[data-panel="live"] .chat-feed');

  function pushChat(user, html, cls) {
    if (!chatFeed) return;
    var row = document.createElement('div');
    row.className = 'chat-line' + (cls ? ' ' + cls : '');
    var time = document.createElement('span');
    time.className = 'chat-line__time';
    time.textContent = stamp();
    var u = document.createElement('span');
    u.className = 'chat-user';
    u.textContent = '@' + user;
    u.style.color = colorFor(user);
    var m = document.createElement('span');
    m.className = 'chat-msg';
    m.innerHTML = html;
    row.appendChild(time);
    row.appendChild(u);
    row.appendChild(m);
    chatFeed.appendChild(row);
    while (chatFeed.children.length > 70) chatFeed.removeChild(chatFeed.firstChild);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    CROWD.stamps.push(performance.now());

    if (CROWD.liveConnected && liveFeed) {
      var clone = row.cloneNode(true);
      liveFeed.appendChild(clone);
      while (liveFeed.children.length > 34) liveFeed.removeChild(liveFeed.firstChild);
      liveFeed.scrollTop = liveFeed.scrollHeight;
    }
  }

  function emote(kind) {
    return '<span class="emote emote--' + kind + '">' + kind.toUpperCase() + '</span>';
  }

  function normalChat() {
    var msg = esc(pick(CHAT_MESSAGES));
    var r = Math.random();
    if (r < 0.34) msg += ' ' + emote('lul');
    else if (r < 0.58) msg += ' ' + emote('pog');
    else if (r < 0.72) msg += ' ' + emote('gg');
    pushChat(pick(USERS), msg);
  }

  function voteChat() {
    var n = randInt(1, 3);
    pushChat(pick(USERS), '<b>' + n + '</b> · vote cho idea #' + n, 'chat-line--cmd');
  }

  function forgeChat() {
    var idea = pick(IDEA_BANK);
    pushChat(pick(USERS), '<b>!forge</b> ' + esc(idea.text), 'chat-line--forge');
  }

  function floodChat(count) {
    for (var i = 0; i < count; i++) {
      global.setTimeout(function () {
        if (Math.random() < 0.42) forgeChat();
        else {
          pushChat(pick(USERS), esc(pick(CHAT_MESSAGES)) + ' ' + emote(pick(['lul', 'pog', 'gg'])), Math.random() < 0.5 ? 'chat-line--forge' : '');
        }
      }, i * 90 + rand(0, 60));
    }
  }

  function crowdLine() {
    if (SIM.state === 'voting' && Math.random() < 0.46) voteChat();
    else if (Math.random() < 0.06) forgeChat();
    else normalChat();
  }

  function crowdTick() {
    if (document.hidden) return;
    var n = 1 + (Math.random() < clamp(CROWD.hype * 0.16, 0, 0.65) ? 1 : 0);
    for (var i = 0; i < n; i++) crowdLine();
  }

  function crowdStats() {
    if (document.hidden) return;
    CROWD.hype = Math.max(0, CROWD.hype - 0.06);

    var target = 420 + CROWD.hype * 190;
    if (SIM.state === 'active') target += 300;
    if (SIM.state === 'voting') target += 140;
    if (SIM.state === 'panic' || SIM.state === 'blocked') target -= 90;
    target += rand(-30, 30);
    CROWD.viewers += (target - CROWD.viewers) * 0.2;
    CROWD.viewers = Math.max(120, CROWD.viewers);

    var shown = Math.round(CROWD.viewers);
    var delta = shown - CROWD.lastShown;
    CROWD.lastShown = shown;

    var vc = $('#viewerCount');
    var vd = $('#viewerDelta');
    var tv = $('#topViewers');
    if (vc) vc.textContent = shown.toLocaleString('vi-VN');
    if (tv) tv.textContent = shown.toLocaleString('vi-VN');
    if (vd) vd.textContent = (delta >= 0 ? '+' : '') + delta;

    var now = performance.now();
    CROWD.stamps = CROWD.stamps.filter(function (t) { return now - t < 60000; });
    CROWD.chatPerMin = CROWD.stamps.length;
    var rate = $('#chatRate');
    if (rate) rate.textContent = String(CROWD.chatPerMin);
    var pulse = $('#votePulse');
    if (pulse) pulse.textContent = Math.round(SIM.state === 'voting' ? SIM.voteRate : 0) + '/s';
  }

  /* ─────────────────────── poll + rounds ───────────────────── */

  function buildIdeas(seed) {
    var pool = IDEA_BANK.slice();
    for (var i = pool.length - 1; i > 0; i--) {
      var j = randInt(0, i);
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    var picked = [];
    if (seed) {
      picked.push({ text: String(seed).replace(/^\s*!forge\s*/i, '').trim(), tags: ['JUDGE'] });
    }
    while (picked.length < 3) {
      var idea = pool.pop();
      if (!idea) break;
      if (seed && idea.text === seed) continue;
      picked.push(idea);
    }
    SIM.round++;
    return picked.map(function (it, idx) {
      return {
        id: 'r' + SIM.round + '-' + idx,
        text: it.text,
        author: pick(USERS),
        votes: rand(6, 22),
        rate: rand(3.2, 8.4)
      };
    });
  }

  function pollPayload() {
    var sorted = SIM.ideas.slice().sort(function (a, b) { return b.votes - a.votes; });
    var total = sorted.reduce(function (s, it) { return s + it.votes; }, 0);
    return {
      ideas: sorted.map(function (it) {
        return {
          id: it.id,
          text: it.text,
          author: it.author,
          pct: total ? (it.votes / total) * 100 : 0,
          rate: it.rate
        };
      }),
      totalVotes: total,
      voteRate: SIM.voteRate,
      remaining: Math.max(0, SIM.timeLeft),
      duration: SIM.pollDuration
    };
  }

  function pushPoll() {
    var data = pollPayload();
    allOverlays().forEach(function (o) { o.updatePoll(data); });
  }

  function startVoting(opts) {
    opts = opts || {};
    SIM.state = 'voting';
    SIM.paused = false;
    SIM.pendingPatch = null;
    SIM.currentPatch = null;
    SIM.pollDuration = 15;
    SIM.timeLeft = 15;
    SIM.pollAcc = 0;
    SIM.voteRate = 0;
    SIM.winner = null;
    SIM.ideas = buildIdeas(opts.seed);

    setStateUI('voting');
    allOverlays().forEach(function (o) {
      o.setState('voting');
      o.updatePoll(pollPayload());
    });
    updateQueueNow('voting');
    updateSkipLabel();
    updateNextIdea();
    Sfx.play('vote');

    if (!opts.quiet) {
      toast('purple', 'POLL ĐÃ MỞ', '15 giây · chat gõ 1 / 2 / 3 để chọn chaos patch');
      pushChat('chaosforge', '<b>POLL MỞ — 15 giây</b> · gõ 1/2/3 để vote', 'chat-line--sys');
    }
    CROWD.hype = Math.min(10, CROWD.hype + 1.1);
  }

  function closeVote() {
    var sorted = SIM.ideas.slice().sort(function (a, b) { return b.votes - a.votes; });
    var total = sorted.reduce(function (s, it) { return s + it.votes; }, 0) || 1;
    var winner = sorted[0];
    SIM.winner = winner;
    SIM.timeLeft = 0;
    pushPoll();
    Sfx.play('vote');

    var pct = Math.round((winner.votes / total) * 100);
    toast('ok', 'POLL ĐÃ ĐÓNG', '“' + winner.text + '” · ' + pct + '% phiếu');
    pushChat('chaosforge', '<b>POLL ĐÃ ĐÓNG</b> · người thắng: ' + esc(winner.text), 'chat-line--sys');

    var patch = patchFromPrompt(winner.text, winner.author);
    if (isUnsafe(winner.text)) { blockPrompt(winner.text); return; }
    if (SIM.modApproval) { holdForMod(patch); return; }
    compilePatch(patch);
  }

  function holdForMod(patch) {
    SIM.pendingPatch = patch;
    SIM.currentPatch = null;
    SIM.state = 'idle';
    SIM.timeLeft = 0;
    allOverlays().forEach(function (o) { o.setState('idle'); });
    setStateUI('idle');
    updateQueueNow('await');
    updateSkipLabel();
    toast('warn', 'CHỜ MOD DUYỆT', 'Bấm “DUYỆT PATCH” trên bàn điều khiển để triển khai · chế độ MOD 1 CHẠM');
    pushChat('chaosforge', '<b>GIỮ MOD</b> · patch đang chờ duyệt', 'chat-line--sys');
  }

  function compilePatch(patch, opts) {
    opts = opts || {};
    if (!patch) return;
    if (!opts.skipGuard && isUnsafe(patch.prompt)) { blockPrompt(patch.prompt); return; }

    SIM.pendingPatch = null;
    SIM.currentPatch = patch;
    SIM.state = 'compiling';
    SIM.paused = false;
    SIM.timeLeft = 2.45;
    SIM.duration = 2.45;
    lastCompileValue = (2.05 + Math.random() * 0.38).toFixed(1) + 's';

    setStateUI('compiling');
    allOverlays().forEach(function (o) { o.startCompile(patch); });
    updateQueueNow('compiling');
    updateSkipLabel();
    Sfx.play('compile');
    toast('ok', opts.fallback ? 'DỰ PHÒNG AN TOÀN' : 'CODEX ĐANG BIÊN DỊCH', 'Sandbox AST → không eval · mục tiêu < 2,5 giây');
  }

  function activateDirect(patch) {
    if (!patch) return;
    SIM.currentPatch = patch;
    SIM.pendingPatch = null;
    SIM.state = 'active';
    SIM.paused = false;
    SIM.duration = patch.duration = patch.duration || randInt(30, 45);
    SIM.timeLeft = SIM.duration;

    setStateUI('active');
    allOverlays().forEach(function (o) { o.activate(patch); });
    updateQueueNow('active');
    updateSkipLabel();
    Sfx.play('deploy');
    toast('ok', 'PATCH ĐÃ TRIỂN KHAI', patch.name + ' · ' + patch.duration + 's · vùng an toàn 60%');
    floodChat(5);
    CROWD.hype = Math.min(10, CROWD.hype + 1.4);
    pushChat('chaosforge', '<b>ĐÃ TRIỂN KHAI</b> · ' + esc(patch.name) + ' · ' + patch.duration + 's', 'chat-line--sys');
    updateNextIdea();
  }

  function finishRound(silent) {
    SIM.state = 'idle';
    SIM.currentPatch = null;
    SIM.pendingPatch = null;
    SIM.timeLeft = 0;
    SIM.paused = false;
    allOverlays().forEach(function (o) { o.setState('idle'); });
    setStateUI('idle');
    updateQueueNow('idle');
    updateSkipLabel();
    updateNextIdea();
    SIM.idleWait = 6.4;
    Sfx.play('click');
    if (!silent) toast('purple', 'VÒNG HOÀN TẤT', 'Đã dọn lớp phủ · chờ hype vòng tiếp theo');
  }

  function panicClear() {
    var t0 = performance.now();
    SIM.paused = false;
    allOverlays().forEach(function (o) { o.panic(); });
    SIM.state = 'panic';
    SIM.timeLeft = 2.2;
    setStateUI('panic');
    updateQueueNow('panic');
    Game.bullets.length = 0;
    Sfx.play('panic');
    flashMonitor();
    CROWD.hype = Math.max(0, CROWD.hype - 1.5);
    var ms = Math.max(1, Math.round(performance.now() - t0));
    toast('danger', 'ĐÃ DỌN PANIC', ms + ' ms · đã xoá vật lý · đã dọn lớp phủ');
    pushChat('chaosforge', '<b>DỌN PANIC</b> · ' + ms + 'ms · an toàn', 'chat-line--sys');
  }

  function blockPrompt(prompt) {
    SIM.state = 'blocked';
    SIM.timeLeft = 2.5;
    SIM.paused = false;
    SIM.lastPrompt = prompt;
    SIM.afterBlock = true;
    allOverlays().forEach(function (o) { o.showBlocked(prompt); });
    setStateUI('blocked');
    updateQueueNow('blocked');
    Sfx.play('blocked');
    toast('warn', 'CHẶN TOS', 'Prompt chưa từng được biên dịch · tự viết lại thành vịt cao su dự phòng');
    pushChat('tos_guard', '<b>PROMPT BỊ CHẶN</b> · viết lại → vịt cao su an toàn', 'chat-line--sys');
  }

  function goIdle() {
    SIM.state = 'idle';
    SIM.timeLeft = 0;
    SIM.paused = false;
    SIM.pendingPatch = null;
    allOverlays().forEach(function (o) { o.setState('idle'); });
    setStateUI('idle');
    updateQueueNow('idle');
    updateSkipLabel();
    SIM.idleWait = 8;
  }

  function enterState(name) {
    if (name === 'idle') { goIdle(); toast('purple', 'TRẠNG THÁI · CHỜ', 'Lớp phủ ở trạng thái nghỉ, vùng an toàn trống'); return; }
    if (name === 'voting') { startVoting(); return; }
    if (name === 'compiling') {
      var p = patchFromPrompt(pick(IDEA_BANK).text);
      compilePatch(p);
      return;
    }
    if (name === 'active') {
      activateDirect(patchFromPrompt(pick(IDEA_BANK).text));
      return;
    }
    if (name === 'panic') { panicClear(); return; }
    if (name === 'blocked') { blockPrompt('!forge hack tài khoản của người xem trong chat'); return; }
  }

  /* ─────────────────────── main tick ───────────────────────── */

  var lastTick = performance.now();

  function tick() {
    var now = performance.now();
    var dt = Math.min(0.35, (now - lastTick) / 1000);
    lastTick = now;
    if (document.hidden) return;

    CROWD.hype = Math.max(0, CROWD.hype - dt * 0.04);

    if (SIM.state !== 'idle' && !SIM.paused) SIM.timeLeft -= dt;

    if (SIM.state === 'voting' && !SIM.paused) {
      var boost = 1 + CROWD.hype * 0.16;
      var totalRate = 0;
      SIM.ideas.forEach(function (it) {
        var gain = it.rate * boost * (0.6 + Math.random() * 0.9) * dt;
        it.votes += gain;
        totalRate += it.rate * boost;
      });
      SIM.voteRate = totalRate;
      SIM.pollAcc += dt;
      if (SIM.pollAcc >= 0.25) {
        SIM.pollAcc = 0;
        pushPoll();
      }
      if (SIM.timeLeft <= 0) { SIM.timeLeft = 0; closeVote(); }
    }

    if (SIM.state === 'compiling' && !SIM.paused) {
      if (SIM.timeLeft <= 0) { SIM.timeLeft = 0; activateDirect(SIM.currentPatch); }
    }

    if (SIM.state === 'active' && !SIM.paused) {
      var rem = Math.max(0, SIM.timeLeft);
      allOverlays().forEach(function (o) { o.setRemaining(rem, SIM.duration); });
      if (Math.random() < dt * 3.2) allOverlays().forEach(function (o) { o.bumpCombo(randInt(1, 3)); });
      updateQueueNow('active');
      var bar = $('#queueNowBar');
      if (bar) bar.style.width = (clamp(1 - rem / SIM.duration, 0, 1) * 100).toFixed(1) + '%';
      var t = $('#queueNowTime');
      if (t) t.textContent = elapsedText(rem) + ' CÒN LẠI';
      if (SIM.timeLeft <= 0) finishRound(false);
    }

    if (SIM.state === 'panic' && SIM.timeLeft <= 0) { goIdle(); }
    if (SIM.state === 'blocked' && SIM.timeLeft <= 0) {
      SIM.afterBlock = false;
      compilePatch(FALLBACK_PATCH, { skipGuard: true, fallback: true });
    }

    if (SIM.state === 'voting') {
      updateQueueNow('voting');
      var t2 = $('#queueNowTime');
      if (t2) t2.textContent = elapsedText(SIM.timeLeft) + ' CÒN LẠI';
    }

    if (SIM.state === 'idle' && SIM.auto && !SIM.pendingPatch && !SIM.paused) {
      SIM.idleWait -= dt;
      if (SIM.idleWait <= 0) {
        SIM.idleWait = 8;
        startVoting({ quiet: true });
      }
    }

    var timer = $('#stateTimer');
    if (timer) timer.textContent = stateTimerText(SIM.state);
  }

  /* ─────────────────────── telemetry ───────────────────────── */

  function telemetry() {
    var fps = $('#telFps');
    var ents = $('#telEntities');
    var comp = $('#telCompile');
    var crash = $('#telCrash');
    if (fps) fps.textContent = String(Game.fps);
    if (ents) {
      var n = ovStage ? ovStage.entities.length : 0;
      ents.textContent = n + ' / ' + (Game.overlay ? Game.overlay.maxEntities : 35);
    }
    if (comp) comp.textContent = lastCompileValue;
    if (crash) { crash.textContent = '0%'; crash.classList.add('ok'); }
  }

  /* ─────────────────────── preview sync ────────────────────── */

  function ensurePreview() {
    if (ovPreview || !previewMount) return;
    ovPreview = new ChaosOverlay(previewMount, {
      getPlayerRect: function () { return null; },
      onEvent: function () {},
      onPlayerHit: function () {}
    });
    ovPreview.setGuide(guidePreview);
    ovPreview.setMaxEntities(Number($('#maxEnt') ? $('#maxEnt').value : 35));
    syncPreview();
  }

  function syncPreview() {
    var o = ovPreview;
    if (!o) return;
    var patch = SIM.currentPatch;
    if (SIM.state === 'voting') {
      o.setState('voting');
      o.updatePoll(pollPayload());
    } else if (SIM.state === 'compiling' && patch) {
      o.startCompile(patch);
    } else if (SIM.state === 'active' && patch) {
      o.activate(patch);
      o.setRemaining(SIM.timeLeft, SIM.duration);
    } else if (SIM.state === 'panic') {
      o.panic();
    } else if (SIM.state === 'blocked') {
      o.showBlocked(SIM.lastPrompt);
    } else {
      o.setState('idle');
    }
  }

  /* ─────────────────────── routing ─────────────────────────── */

  var VIEWS = ['stage', 'overlay', 'deck'];

  function route() {
    var hash = (location.hash || '').replace(/^#\/?/, '');
    if (hash === 'overlay.html') hash = '';
    if (VIEWS.indexOf(hash) === -1) hash = 'stage';

    $$('.view').forEach(function (v) {
      v.classList.toggle('is-active', v.id === 'view-' + hash);
    });
    $$('.viewnav__link[data-view]').forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.view === hash);
    });
    document.body.dataset.view = hash;

    if (hash === 'overlay') {
      ensurePreview();
      syncPreview();
      if (ovPreview) ovPreview.setGuide(guidePreview);
      if (ovStage) ovStage.setGuide(guideStage);
    }
  }

  /* ─────────────────────── cartridges ─────────────────────── */

  function cartIcon(kind) {
    var open = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    var body = '';
    if (kind === 'duck') {
      body = '<circle cx="10" cy="13" r="6"/><path d="M16 11h4l-2 3h-2"/><circle cx="8" cy="12" r=".8" fill="currentColor"/><path d="M4 18c2 1 4 1 6 0"/>';
    } else if (kind === 'cat') {
      body = '<path d="M4 10 6 4l4 3h4l4-3 2 6v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"/><path d="M9 13h.01M15 13h.01M10 17c1.4 1 2.6 1 4 0"/>';
    } else if (kind === 'shield') {
      body = '<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 8v7M8.5 11.5h7"/>';
    } else if (kind === 'tug') {
      body = '<path d="M4 5 20 19M20 5 4 19"/><path d="M16 3l5 2-2 5M8 21l-5-2 2-5"/>';
    } else if (kind === 'shard') {
      body = '<path d="M12 2 18 9l-3 13-6-8z"/><path d="M12 2 9 14l6 8"/>';
    } else if (kind === 'alert') {
      body = '<path d="M12 3 22 20H2z"/><path d="M12 9v5M12 17h.01"/>';
    } else {
      body = '<circle cx="12" cy="12" r="7"/><path d="M12 6v6l4 3"/>';
    }
    return open + body + '</svg>';
  }

  var CARTRIDGES = [
    {
      id: 'CF-104', name: 'BÃO VỊT CAO SU', icon: 'duck', acc: '#34d399', stat: '60 FPS',
      idea: 'Mưa vịt cao su nổ tung theo emote LUL', tags: ['DUCK', 'PHYSICS', 'SAFE'],
      author: '@ducklord', prompt: '!forge mưa vịt cao su nổ tung theo emote LUL'
    },
    {
      id: 'CF-207', name: 'BOSS MÈO · LASER', icon: 'cat', acc: '#a78bfa', stat: '60 FPS',
      idea: 'Đảo ngược trọng lực + Boss mèo bắn laser', tags: ['BOSS', 'LASER'],
      author: '@tuxedocat', prompt: '!forge đảo ngược trọng lực + boss mèo bắn laser'
    },
    {
      id: 'CF-318', name: 'KHIÊN PHẢN ĐÒN 360°', icon: 'shield', acc: '#34d399', stat: '60 FPS',
      idea: 'Khiên phản đòn 360° theo nhịp chat !shield', tags: ['SHIELD', 'SYNC'],
      author: '@mint_chip', prompt: '!forge khiên phản đòn 360° theo nhịp chat !shield'
    },
    {
      id: 'CF-409', name: 'KÉO CO RAID', icon: 'tug', acc: '#fbbf24', stat: 'RAID',
      idea: 'Kéo co boss giữa 2 streamer', tags: ['RAID', 'VERSUS'],
      author: '@nova_blitz', prompt: '!forge kéo co boss raid giữa 2 streamer'
    },
    {
      id: 'CF-512', name: 'XOÁY SHARD', icon: 'shard', acc: '#c084fc', stat: '60 FPS',
      idea: 'Vòng xoáy shard tím xoay quanh tâm màn hình', tags: ['SHARD', 'ORBIT'],
      author: '@shardqueen', prompt: '!forge vòng xoáy shard tím xoay quanh tâm màn hình'
    },
    {
      id: 'CF-666', name: 'KIỂM TRA RED TEAM', icon: 'alert', acc: '#f87171', stat: 'GUARDED',
      idea: 'Prompt thử nghiệm bộ chặn ToS — sẽ bị chặn và dùng vịt dự phòng', tags: ['TOS', 'RED TEAM'],
      author: '@tos_guard', prompt: '!forge hack tài khoản của streamer để thử guard'
    }
  ];

  function renderCartridges() {
    var grid = $('#cartGrid');
    if (!grid) return;
    CARTRIDGES.forEach(function (c) {
      var card = document.createElement('article');
      card.className = 'cart';
      card.style.setProperty('--acc', c.acc);
      card.innerHTML =
        '<div class="cart__top">' +
          '<span class="cart__ico">' + cartIcon(c.icon) + '</span>' +
          '<span class="cart__id">' + c.id + '</span>' +
          '<span class="cart__stat">' + c.stat + '</span>' +
        '</div>' +
        '<h3>' + esc(c.name) + '</h3>' +
        '<p class="cart__idea">' + esc(c.idea) + '</p>' +
        '<div class="cart__tags">' + c.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<div class="cart__foot">' +
          '<span class="cart__by">' + esc(c.author) + '</span>' +
          '<button class="cart__play" type="button">TRIỂN KHAI ▶</button>' +
        '</div>';
      var btn = card.querySelector('.cart__play');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        deployCartridge(c);
      });
      card.addEventListener('click', function () { deployCartridge(c); });
      grid.appendChild(card);
    });
    var count = $('#cartCount');
    if (count) count.textContent = String(CARTRIDGES.length);
  }

  function deployCartridge(c) {
    Sfx.play('click');
    var patch = patchFromPrompt(c.prompt, c.author.replace(/^@/, ''));
    if (isUnsafe(patch.prompt)) { blockPrompt(patch.prompt); return; }
    compilePatch(patch);
    toast('purple', 'ĐÃ NẠP CARTRIDGE', c.id + ' · ' + c.name + ' → Codex biên dịch');
  }

  /* ─────────────────────── raid room ───────────────────────── */

  var RAID = { connected: false, code: '', rival: '', sent: 0 };

  function raidRow(text, cls) {
    var log = $('#raidLog');
    if (!log) return;
    var muted = log.querySelector('.raid-log__row.muted');
    if (muted) muted.parentNode.removeChild(muted);
    var row = document.createElement('p');
    row.className = 'raid-log__row' + (cls ? ' ' + cls : '');
    row.textContent = text;
    log.insertBefore(row, log.firstChild);
    while (log.children.length > 8) log.removeChild(log.lastChild);
  }

  function joinRoom() {
    var input = $('#roomCode');
    var code = (input ? input.value : '').trim().toUpperCase();
    if (!/^[A-Z0-9]{4}$/.test(code)) {
      toast('warn', 'MÃ PHÒNG SAI', 'Cần đúng 4 ký tự A–Z / 0–9 · ví dụ TW26');
      return;
    }
    RAID.connected = true;
    RAID.code = code;
    RAID.rival = pick(USERS);
    var status = $('#raidStatus');
    if (status) {
      status.classList.add('is-on');
      status.innerHTML =
        '<span class="raid-status__dot"></span>' +
        '<div><b>ĐÃ KẾT NỐI · ' + esc(code) + '</b>' +
        '<em>Đối thủ @' + esc(RAID.rival) + ' · ping 24ms · liên kết demo</em></div>';
    }
    Sfx.play('join');
    raidRow('ĐÃ NỐI · phòng ' + code + ' ↔ @' + RAID.rival + ' · bắt tay ok', 'ok');
    toast('ok', 'ĐÃ VÀO PHÒNG RAID', 'Đã kết nối @' + RAID.rival + ' · phòng ' + code);
    pushChat('chaosforge', '<b>LIÊN KẾT RAID</b> · ' + esc(code) + ' ↔ @' + esc(RAID.rival), 'chat-line--sys');
  }

  function sendCartridge() {
    if (!RAID.connected) {
      toast('warn', 'CHƯA KẾT NỐI', 'Nhập mã phòng 4 ký tự rồi bấm KẾT NỐI trước');
      return;
    }
    var btn = $('#sendCart');
    if (!btn || btn.classList.contains('is-sent')) return;
    RAID.sent++;
    var cart = pick(CARTRIDGES);
    var defaultHtml = btn.innerHTML;

    btn.classList.add('is-sent');
    btn.innerHTML = '<span aria-hidden="true">✓</span><span>ĐÃ GỬI CARTRIDGE · GÓI DEMO</span>';
    Sfx.play('deploy');
    raidRow('ĐÃ GỬI → @' + RAID.rival + ' · ' + cart.id + ' · ' + cart.name, 'ok');
    toast('purple', 'ĐÃ GỬI CARTRIDGE', cart.name + ' → @' + RAID.rival + ' · gói demo');
    floodChat(3);

    global.setTimeout(function () {
      btn.classList.remove('is-sent');
      btn.innerHTML = defaultHtml;
    }, 2200);

    global.setTimeout(function () {
      raidRow('NHẬN ← @' + RAID.rival + ' · “nhận rồi, đang triển khai!”', 'ok');
      toast('ok', 'ĐỐI THỦ PHẢN HỒI', '@' + RAID.rival + ' đã nhận cartridge · demo');
      CROWD.hype = Math.min(10, CROWD.hype + 0.7);
      pushChat(RAID.rival, 'nhận rồi nha, đang triển khai 🔥');
    }, 2400);
  }

  /* ─────────────────────── wiring ──────────────────────────── */

  function setSound(on, silent) {
    Sfx.setEnabled(on);
    var sb = $('#soundBtn');
    var sl = $('#soundLabel');
    var mb = $('#muteBtn');
    var ms = $('#muteState');
    if (sb) sb.setAttribute('aria-pressed', String(on));
    if (sl) sl.textContent = on ? 'SFX BẬT' : 'SFX TẮT';
    if (mb) mb.setAttribute('aria-pressed', String(!on));
    if (ms) ms.textContent = on ? 'ÂM THANH BẬT' : 'ĐÃ TẮT';
    if (!silent) toast(on ? 'ok' : 'warn', on ? 'SFX ĐÃ BẬT' : 'SFX ĐÃ TẮT', on ? 'Bộ tổng hợp 8-bit đang chạy' : 'Bàn điều khiển đã tắt toàn bộ SFX');
  }

  function updateJudgeCount() {
    var input = $('#judgePrompt');
    var count = $('#judgeCount');
    if (!input || !count) return;
    count.textContent = input.value.length + ' / 160';
  }

  function judgeCompile() {
    var input = $('#judgePrompt');
    if (!input) return;
    var raw = input.value.trim();
    if (!raw) {
      input.focus();
      toast('warn', 'PROMPT TRỐNG', 'Gõ một ý tưởng !forge hoặc chọn preset bên dưới');
      return;
    }
    var patch = patchFromPrompt(raw);
    pushChat('judge', '<b>!forge</b> ' + esc(patch.prompt), 'chat-line--forge');
    compilePatch(patch);
    input.value = '';
    updateJudgeCount();
  }

  function wire() {
    // routing
    global.addEventListener('hashchange', route);
    route();

    // sound
    $('#soundBtn').addEventListener('click', function () { setSound(!Sfx.isEnabled()); });
    setSound(true, true);

    // state chips
    $$('.state-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        Sfx.play('click');
        enterState(chip.dataset.state);
      });
    });

    // auto demo
    var autoBtn = $('#autoDemo');
    if (autoBtn) {
      autoBtn.addEventListener('click', function () {
        SIM.auto = !SIM.auto;
        autoBtn.setAttribute('aria-pressed', String(SIM.auto));
        Sfx.play('click');
        toast(SIM.auto ? 'ok' : 'warn', SIM.auto ? 'TỰ DIỄN BẬT' : 'TỰ DIỄN TẮT',
          SIM.auto ? 'Các vòng sẽ tự chạy khi overlay ở trạng thái idle' : 'Chỉ chuyển state bằng tay');
      });
    }

    // pilot mode
    $$('#pilotMode button').forEach(function (b) {
      b.addEventListener('click', function () { setPilot(b.dataset.mode === 'manual'); });
    });

    // safe zone guides
    var gt = $('#guideToggle');
    if (gt) {
      gt.addEventListener('click', function () {
        guideStage = !guideStage;
        gt.setAttribute('aria-pressed', String(guideStage));
        if (ovStage) ovStage.setGuide(guideStage);
        Sfx.play('click');
      });
    }
    var og = $('#ovGuide');
    if (og) {
      og.addEventListener('click', function () {
        guidePreview = !guidePreview;
        og.setAttribute('aria-pressed', String(guidePreview));
        ensurePreview();
        if (ovPreview) ovPreview.setGuide(guidePreview);
        Sfx.play('click');
      });
    }

    // stage round controls
    $('#startVoteBtn').addEventListener('click', function () { startVoting(); });
    $('#panicMiniBtn').addEventListener('click', function () { panicClear(); });
    $('#hypeBtn').addEventListener('click', function () {
      CROWD.hype = Math.min(10, CROWD.hype + 4.2);
      CROWD.viewers += 120;
      Sfx.play('deploy');
      toast('warn', '500 NGƯỜI XEM BÙNG NỔ', 'Chat bùng nổ · poll tăng tốc · người xem +500');
      floodChat(16);
      if (SIM.state === 'idle' && !SIM.pendingPatch) startVoting({ seed: pick(IDEA_BANK).text, quiet: true });
      else if (SIM.state === 'voting') {
        SIM.ideas.forEach(function (it) { it.rate += rand(1.4, 4); });
      } else if (SIM.state === 'active') {
        allOverlays().forEach(function (o) { o.bumpCombo(6); });
      }
    });

    // crowd tabs
    $$('.crowd-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        $$('.crowd-tab').forEach(function (t) {
          t.classList.toggle('is-on', t === tab);
          t.setAttribute('aria-selected', String(t === tab));
        });
        $$('.crowd-panel').forEach(function (p) {
          p.hidden = p.dataset.panel !== tab.dataset.tab;
        });
        Sfx.play('click');
      });
    });

    // live twitch (simulated)
    var connect = $('#connectTwitch');
    if (connect) {
      connect.addEventListener('click', function () {
        var field = $('#twitchChannel');
        var name = (field ? field.value : '').trim().replace(/^#/, '');
        if (!/^[a-zA-Z0-9_]{3,25}$/.test(name)) {
          toast('warn', 'CHANNEL KHÔNG HỢP LỆ', 'Dùng 3–25 ký tự chữ, số hoặc dấu gạch dưới');
          return;
        }
        CROWD.liveConnected = true;
        CROWD.channel = name;
        var status = $('#liveStatus');
        if (status) {
          status.classList.add('is-on');
          status.textContent = 'ĐÃ KẾT NỐI · #' + name + ' · CẦU DEMO (KHÔNG OAUTH)';
        }
        if (liveFeed) {
          liveFeed.classList.remove('chat-feed--empty');
          liveFeed.innerHTML = '';
        }
        for (var i = 0; i < 4; i++) {
          global.setTimeout(function () { normalChat(); }, 120 + i * 220);
        }
        pushChat('chaosforge', '<b>CẦU DEMO</b> · #' + esc(name) + ' · chat mô phỏng cục bộ', 'chat-line--sys');
        Sfx.play('join');
        toast('ok', 'ĐÃ NỐI CHAT TRỰC TIẾP', '#' + name + ' · demo bridge, không dùng OAuth thật');
      });
    }

    // judge console
    var prompt = $('#judgePrompt');
    if (prompt) {
      prompt.addEventListener('input', updateJudgeCount);
      prompt.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          judgeCompile();
        }
      });
      updateJudgeCount();
    }
    $('#judgeCompile').addEventListener('click', judgeCompile);
    $$('.preset').forEach(function (p) {
      p.addEventListener('click', function () {
        var map = {
          duck: '!forge mưa vịt cao su nổ tung theo emote LUL',
          catBoss: '!forge đảo ngược trọng lực + boss mèo bắn laser',
          shield: '!forge khiên phản đòn 360° theo nhịp chat !shield',
          tug: '!forge kéo co boss raid giữa 2 streamer'
        };
        var text = map[p.dataset.preset] || '!forge mưa vịt cao su';
        if (prompt) prompt.value = text;
        updateJudgeCount();
        judgeCompile();
      });
    });

    // deck safety
    $('#panicBtn').addEventListener('click', panicClear);
    $('#muteBtn').addEventListener('click', function () { setSound(!Sfx.isEnabled()); });

    var maxEnt = $('#maxEnt');
    if (maxEnt) {
      maxEnt.addEventListener('input', function () {
        var v = Number(maxEnt.value);
        var label = $('#maxEntVal');
        if (label) label.textContent = String(v);
        allOverlays().forEach(function (o) { o.setMaxEntities(v); });
        telemetry();
      });
    }

    $$('#approveMode button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('#approveMode button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        SIM.modApproval = b.dataset.mode === 'mod';
        var note = $('#queueModeNote');
        if (note) note.textContent = SIM.modApproval ? 'MOD 1 CHẠM' : 'TỰ DUYỆT';
        updateSkipLabel();
        Sfx.play('click');
        toast(SIM.modApproval ? 'warn' : 'ok',
          SIM.modApproval ? 'DUYỆT MOD BẬT' : 'TỰ DUYỆT BẬT',
          SIM.modApproval ? 'Poll đóng → patch chờ bạn bấm DUYỆT PATCH' : 'Patch thắng poll được triển khai tự động');
      });
    });

    $('#pauseRound').addEventListener('click', function () {
      if (SIM.state !== 'active' && SIM.state !== 'voting') {
        toast('warn', 'CHƯA CÓ VÒNG', 'Chỉ tạm dừng được khi đang bình chọn hoặc đang chạy patch');
        return;
      }
      SIM.paused = !SIM.paused;
      this.textContent = SIM.paused ? 'TIẾP TỤC VÒNG' : 'TẠM DỪNG VÒNG';
      updateQueueNow(SIM.state);
      Sfx.play('click');
      toast(SIM.paused ? 'warn' : 'ok', SIM.paused ? 'VÒNG ĐÃ TẠM DỪNG' : 'VÒNG ĐÃ TIẾP TỤC',
        SIM.paused ? 'Timer đứng yên · entity vẫn bay' : 'Timer tiếp tục chạy');
    });

    $('#skipRound').addEventListener('click', function () {
      if (SIM.pendingPatch) {
        var p = SIM.pendingPatch;
        updateSkipLabel();
        compilePatch(p);
        return;
      }
      if (SIM.state === 'active') {
        finishRound(true);
        toast('purple', 'ĐÃ BỎ QUA VÒNG', 'Đã chuyển sang patch kế tiếp trong queue');
        return;
      }
      var next = patchFromPrompt(pick(IDEA_BANK).text);
      compilePatch(next);
      toast('purple', 'PATCH TIẾP THEO', next.name + ' → biên dịch');
    });

    $('#fallbackRound').addEventListener('click', function () {
      compilePatch(FALLBACK_PATCH, { skipGuard: true, fallback: true });
      Sfx.play('deploy');
      toast('ok', 'DỰ PHÒNG TỨC THÌ', 'Vịt cao su dự phòng · an toàn tuyệt đối, không cần bình chọn');
    });

    // raid
    var room = $('#roomCode');
    if (room) {
      room.addEventListener('input', function () {
        room.value = room.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
      });
      room.addEventListener('keydown', function (e) { if (e.key === 'Enter') joinRoom(); });
    }
    $('#joinRoom').addEventListener('click', joinRoom);
    $('#sendCart').addEventListener('click', sendCartridge);

    // copy overlay path
    var copy = $('#copyUrl');
    if (copy) {
      copy.addEventListener('click', function () {
        var base = location.href.split('#')[0].replace(/index\.html$/i, '');
        var url = /\/$/.test(base) ? base + 'overlay.html' : base;
        var done = function () {
          toast('ok', 'ĐÃ SAO CHÉP', 'overlay.html · dán vào OBS Browser Source');
          Sfx.play('click');
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = url;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e) {}
          document.body.removeChild(ta);
          done();
        }
      });
    }

    // keyboard
    var moveMap = { w: 'w', a: 'a', s: 's', d: 'd', arrowup: 'arrowup', arrowdown: 'arrowdown', arrowleft: 'arrowleft', arrowright: 'arrowright' };
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea';
      var key = e.key.toLowerCase();

      if (key === ' ' && !typing) {
        e.preventDefault();
        panicClear();
        return;
      }
      if (typing) return;

      if (moveMap[key]) {
        if (!Game.manual) setPilot(true, true);
        Game.keys[moveMap[key]] = true;
        e.preventDefault();
      }
    });
    document.addEventListener('keyup', function (e) {
      var key = e.key.toLowerCase();
      if (moveMap[key]) Game.keys[moveMap[key]] = false;
    });

    // audio unlock
    ['pointerdown', 'keydown'].forEach(function (evt) {
      document.addEventListener(evt, function () { Sfx.unlock(); }, { once: true });
    });

    // visibility
    document.addEventListener('visibilitychange', function () {
      lastTick = performance.now();
    });
  }

  /* ─────────────────────── boot ────────────────────────────── */

  Game.init();

  if (stageMount) {
    ovStage = new ChaosOverlay(stageMount, {
      getPlayerRect: function () { return Game.rect(); },
      onEvent: function (kind) {
        if (kind === 'beam') Sfx.play('beam');
        else if (kind === 'impact') {
          Sfx.play('impact');
          Game.damage(4);
        }
      },
      onPlayerHit: function () { Game.damage(12); }
    });
    Game.bind(ovStage);
    ovStage.setGuide(guideStage);
  }

  renderCartridges();
  updateNextIdea();
  updateQueueNow('idle');
  updateSkipLabel();
  setPilot(false, true);
  setStateUI('idle');

  // initial crowd kick-off
  pushChat('chaosforge', '<b>CHAOSFORGE LIVE</b> · lớp phủ + bàn điều khiển sẵn sàng · bấm BÙNG NỔ để bắt đầu', 'chat-line--sys');
  global.setTimeout(function () { normalChat(); }, 900);
  global.setTimeout(function () { normalChat(); }, 2100);

  wire();

  global.setInterval(tick, 100);
  global.setInterval(crowdTick, 680);
  global.setInterval(crowdStats, 1100);
  global.setInterval(telemetry, 800);

  // webcam spectrum sim
  (function camBars() {
    var wrap = $('#camBars');
    if (!wrap) return;
    for (var i = 0; i < 24; i++) {
      var bar = document.createElement('i');
      bar.style.height = randInt(16, 74) + '%';
      wrap.appendChild(bar);
    }
    global.setInterval(function () {
      var bars = wrap.children;
      for (var b = 0; b < bars.length; b++) {
        var h = 16 + Math.random() * 74;
        if (Math.random() < 0.18) h = 82 + Math.random() * 18;
        bars[b].style.height = h.toFixed(0) + '%';
      }
    }, 150);
  })();

  global.ChaosForge = {
    sim: SIM,
    crowd: CROWD,
    game: Game,
    overlay: function () { return ovStage; },
    enterState: enterState,
    panic: panicClear,
    deploy: function (text) { compilePatch(patchFromPrompt(text)); }
  };
})(window);
