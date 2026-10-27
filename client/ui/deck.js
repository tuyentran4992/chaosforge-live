export function deck() {
  return `
  <section class="view" id="view-deck" aria-label="Streamer control deck"><div class="deck-grid">
    <section class="panel panel--safety" aria-label="Emergency controls">
      <button class="panic-btn" id="panicBtn"><span class="panic-btn__icon">🛑</span><span class="panic-btn__body">
        <span class="panic-btn__key">SPACEBAR</span><span class="panic-btn__main">PANIC CLEAR</span>
        <span class="panic-btn__sub">CLEAR PHYSICS + MUTE SFX</span></span><span class="panic-btn__pulse"></span></button>
      <div class="safety-controls"><button class="ctl" id="muteBtn" aria-pressed="false"><span class="ctl__ico">◼◼</span>
        <span class="ctl__txt"><b>MUTE 8-BIT SFX</b><em id="muteState">SOUND ON</em></span></button>
        <label class="range-ctl" for="maxEnt"><span class="range-ctl__top">MAX PHYSICS ENTITIES <b id="maxEntVal">35</b></span>
          <input type="range" id="maxEnt" min="15" max="50" step="5" value="35">
          <span class="range-ctl__scale"><i>15 · SAFE</i><i>50 · CHAOS</i></span></label>
        <div class="approve"><span class="ctl-label">APPROVAL MODE</span><div class="seg seg--approve" id="approveMode">
          <button data-mode="auto" class="is-on">AUTO<em>Safety filter</em></button>
          <button data-mode="mod">MOD 1-CLICK<em>Approve</em></button></div></div></div>
    </section>
    <section class="panel queue" aria-label="Live round queue"><header class="panel-head">
      <span class="panel-head__l"><span class="panel-index">01</span><h2>LIVE ROUND QUEUE</h2></span>
      <span class="panel-note" id="queueModeNote">AUTO APPROVE</span></header>
      <div class="queue-now"><span class="mono-label">NOW PLAYING</span><div class="queue-patch">
        <div class="queue-patch__name" id="queueNowName">NO PATCH</div><div class="queue-patch__meta">
        <span id="queueNowAuthor">—</span><span id="queueNowTags">—</span></div>
        <div class="queue-patch__bar"><i id="queueNowBar"></i></div><div class="queue-patch__foot">
          <span id="queueNowTime">IDLE</span><span id="queueNowState">READY</span></div></div></div>
      <div class="queue-next"><span class="mono-label">NEXT · MOD QUEUE</span><div class="queue-next__row">
        <b id="queueNextName">WAITING FOR IDEAS</b><span id="queueNextBy">—</span><span class="queue-next__badge" id="queueNextBadge">SAFE</span></div></div>
      <div class="queue-actions"><button class="btn btn--primary" id="approveNext">APPROVE PATCH</button>
        <button class="btn btn--ghost" id="pauseRound">PAUSE ROUND</button>
        <button class="btn btn--ghost" id="skipRound">SKIP ROUND</button>
        <button class="btn btn--amber-ghost" id="fallbackRound">SAFE FALLBACK</button></div>
      <div class="telemetry"><span><em>FPS</em><b id="telFps">—</b></span><span><em>ENTITIES</em><b id="telEntities">0 / 35</b></span>
        <span><em>COMPILE</em><b id="telCompile">—</b></span><span><em>ERRORS</em><b class="ok" id="telCrash">—</b></span></div>
    </section>
    <section class="panel raid" aria-label="Two streamer raid room"><header class="panel-head">
      <span class="panel-head__l"><span class="panel-index">02</span><h2>2-STREAMER RAID</h2></span><span class="panel-note">RAID ROOM</span></header>
      <div class="raid-connect"><label class="mono-label" for="roomCode">ROOM CODE</label>
        <div class="inline-input inline-input--code"><input id="roomCode" maxlength="4" value="TW26" autocomplete="off">
          <button class="btn btn--purple" id="joinRoom">CONNECT</button></div></div>
      <div class="raid-status" id="raidStatus"><span class="raid-status__dot"></span><div><b>NOT CONNECTED</b>
        <em>Enter a four-character room code.</em></div></div>
      <button class="send-btn" id="sendCart"><span>🚀</span><span>SEND CHAOS CARTRIDGE TO RIVAL STREAMER</span></button>
      <div class="raid-log" id="raidLog" aria-live="polite"><p class="raid-log__row muted">No raid events yet.</p></div>
    </section>
    <section class="panel cartridges" aria-label="Saved chaos cartridges"><header class="panel-head">
      <span class="panel-head__l"><span class="panel-index">03</span><h2>SAVED CHAOS CARTRIDGES</h2></span>
      <span class="panel-note"><b id="cartCount">0</b> LOADED · LOCAL LIBRARY</span></header><div class="cart-grid" id="cartGrid"></div>
    </section>
  </div></section>`;
}
