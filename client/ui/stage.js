export function stage() {
  return `
  <section class="view" id="view-stage" aria-label="Virtual OBS demo stage">
    <div class="stage-grid"><div class="stage-left">
      <div class="monitor-head"><span class="monitor-title"><i class="dot dot--live"></i>VIRTUAL BROADCAST
        <em>16:9 · 1920×1080</em></span><div class="monitor-controls">
        <div class="seg seg--pilot" id="pilotMode" role="group" aria-label="Game control">
          <button data-mode="auto" class="is-on">AUTO PILOT</button><button data-mode="manual">KEYBOARD</button>
        </div><button class="btn btn--ghost btn--xs" id="guideToggle">SAFE ZONE</button>
        <a class="btn btn--ghost btn--xs" href="overlay.html" target="_blank" rel="noopener">OPEN SOURCE ↗</a>
      </div></div>
      <div class="monitor" id="monitor"><canvas id="gameCanvas" aria-label="Arcade game"></canvas>
        <div class="ov-frame" id="stageOverlay"></div>
        <div class="game-hud" aria-hidden="true"><span><em>SCORE</em><b id="gameScore">000000</b></span>
          <span><em>HULL</em><b id="gameHull">100%</b></span><span><em>ENTITIES</em><b id="gameEntities">0</b></span></div>
        <div class="webcam" aria-hidden="true"><div class="webcam__bars" id="camBars">${'<i></i>'.repeat(24)}</div>
          <div class="webcam__meta"><span class="rec"></span>STREAMER CAM · SIMULATED</div><div class="webcam__scan"></div></div>
        <div class="monitor-tag">STREAM 01 · SAFE ZONE</div>
      </div>
      <div class="monitor-foot"><span>Entities spawn at the edge and fade to 70% in the center.</span>
        <span class="mono-label">WASD / ARROWS · SPACE = PANIC CLEAR</span></div>
      <div class="stage-actions"><span class="mono-label">ROUND CONTROL</span>
        <button class="btn btn--purple" id="startVoteBtn">START 15 SECOND VOTE</button>
        <button class="btn btn--danger-ghost" id="panicMiniBtn">🛑 PANIC CLEAR</button>
        <span class="stage-actions__hint">Or choose a round state above.</span></div>
    </div><aside class="stage-rail">
      <section class="panel crowd" aria-label="Crowd chat">
        <div class="crowd-tabs" role="tablist"><button class="crowd-tab is-on" role="tab" id="tab-sim" aria-selected="true" aria-controls="panel-sim" data-tab="sim">CROWD <span>500</span></button>
          <button class="crowd-tab" role="tab" id="tab-live" aria-selected="false" aria-controls="panel-live" tabindex="-1" data-tab="live">LIVE TWITCH</button></div>
        <div class="crowd-panel" id="panel-sim" role="tabpanel" aria-labelledby="tab-sim" data-panel="sim"><div class="crowd-top">
          <div class="crowd-stat"><span class="mono-label">VIEWERS</span><b id="viewerCount">0</b><em id="viewerDelta">idle</em></div>
          <div class="crowd-stat"><span class="mono-label">CHAT/MIN</span><b id="chatRate">0</b></div>
          <div class="crowd-stat"><span class="mono-label">VOTE PULSE</span><b id="votePulse">0/s</b></div></div>
          <button class="hype-btn" id="hypeBtn"><span class="hype-btn__ico">🔥</span><span class="hype-btn__txt">
            <b>1-CLICK: SIMULATE 500 TWITCH VIEWERS HYPE</b><em>Flood chat · start a poll · launch a round</em></span></button>
          <div class="chat-feed" id="chatFeed" aria-label="Simulated chat"><p class="chat-line chat-line--sys">CHAOSFORGE LIVE · READY FOR CHAT</p></div></div>
        <div class="crowd-panel" id="panel-live" role="tabpanel" aria-labelledby="tab-live" data-panel="live" hidden><div class="live-form">
          <label class="mono-label" for="twitchChannel">TWITCH CHANNEL</label><div class="inline-input">
            <input id="twitchChannel" placeholder="your_channel" autocomplete="off" spellcheck="false">
            <button class="btn btn--purple" id="connectTwitch">CONNECT</button></div>
          <p class="fineprint">Connect anonymously to read public chat.</p></div>
          <div class="live-status" id="liveStatus">NOT CONNECTED</div><div class="chat-feed chat-feed--empty" id="liveFeed">
            <p class="chat-empty">Live chat will appear here when the channel is connected.</p></div></div>
      </section>
      <section class="panel judge" aria-label="Judge live prompt"><header class="panel-head">
        <span class="panel-head__l"><span class="panel-index">JUDGE</span><h2>LIVE PROMPT</h2></span>
        <span class="panel-note">CODEX LIVE</span></header>
        <label class="judge-label" for="judgePrompt">⚡ ENTER ANY <code>!forge</code> IDEA TO COMPILE</label>
        <div class="judge-input"><textarea id="judgePrompt" rows="3" maxlength="160" aria-describedby="judgeError" placeholder="!forge exploding rubber ducks on LUL"></textarea>
          <p id="judgeError" role="alert" hidden>Enter an idea before compiling.</p>
          <div class="judge-input__foot"><span class="mono-label" id="judgeCount">0 / 160</span>
          <button class="btn btn--primary" id="judgeCompile">COMPILE &amp; DEPLOY &lt;2.5S</button></div></div>
        <div class="presets"><span class="mono-label">ONE-CLICK IDEAS</span><div class="preset-grid">
          <button class="preset" data-preset="duck" data-prompt="Exploding rubber ducks on LUL">🦆 Exploding rubber ducks on LUL</button>
          <button class="preset" data-preset="catBoss" data-prompt="Reverse gravity laser boss">🐱 Reverse gravity laser boss</button>
          <button class="preset" data-preset="shield" data-prompt="360 shield">🛡️ 360 shield</button>
          <button class="preset" data-preset="tug" data-prompt="Raid boss">⚔️ Raid boss</button></div></div>
        <footer class="judge-footer"><span>BUILT WITH <b>OPENAI CODEX</b></span><span>AST WITHOUT EVAL</span></footer>
      </section>
    </aside></div>
  </section>`;
}
