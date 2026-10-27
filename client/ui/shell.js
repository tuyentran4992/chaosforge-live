export function shell() {
  return `
    <header class="topbar">
      <a class="brand" href="#/stage" aria-label="ChaosForge Live home">
        <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 1.5 29.5 9v14L16 30.5 2.5 23V9z" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <path d="M18.6 6.5 10 17.2h4.6L13.4 25.5 22 14.8h-4.6z" fill="currentColor"/>
        </svg>
        <span class="brand__txt"><span class="brand__name">CHAOSFORGE<span>LIVE</span></span>
          <span class="brand__sub">CODEX × TWITCHCON HACKATHON · $25K</span></span>
      </a>
      <nav class="viewnav" aria-label="Views">
        <a class="viewnav__link" data-view="stage" href="#/stage"><span>01</span>STAGE</a>
        <a class="viewnav__link" data-view="overlay" href="#/overlay"><span>02</span>OVERLAY</a>
        <a class="viewnav__link" data-view="deck" href="#/deck"><span>03</span>DECK</a>
        <a class="viewnav__link viewnav__link--ds" href="design-system.html"><span>DS</span>DESIGN SYSTEM</a>
      </nav>
      <div class="topbar__right"><span class="live-pill"><i></i>LIVE</span>
        <span class="topbar__viewers"><b id="topViewers">0</b> VIEWERS</span>
        <button class="sfx-btn" id="soundBtn" aria-pressed="true"><span id="soundLabel">SFX ON</span></button>
      </div>
    </header>
    <div class="statebar">
      <span class="statebar__lead">ROUND<br>STATE</span>
      <div class="state-track" id="stateTrack" role="group" aria-label="Round states">
        ${[['idle', 'Idle', 'Ready'], ['voting', 'Voting', '15 seconds'],
          ['compiling', 'Compiling', '<2.5 seconds'], ['active', 'Active Chaos', '30–45 seconds'],
          ['panic', 'Panic Clear', '<100ms'], ['blocked', 'Blocked', 'Safe fallback']].map(([state, label, detail], i) => `
          <button class="state-chip" data-state="${state}"><span class="state-chip__n">${i + 1}</span>
            <span class="state-chip__t">${label}<em>${detail.replace('<', '&lt;')}</em></span></button>`).join('')}
        <div class="state-track__line"><i id="stateProgress"></i></div>
      </div>
      <div class="statebar__tail"><span class="state-timer" id="stateTimer">IDLE · READY</span>
        <button class="toggle" id="autoDemo" aria-pressed="false"><i></i>AUTO DEMO</button></div>
    </div>
    <main class="main" id="views"></main>`;
}
