export function overlayView() {
  return `
  <section class="view" id="view-overlay" aria-label="OBS source preview"><div class="ovview">
    <div class="ovview__main"><div class="monitor-head">
      <span class="monitor-title"><i class="dot dot--live"></i>OBS SOURCE <em>TRANSPARENT · 1920×1080</em></span>
      <div class="monitor-controls"><button class="btn btn--ghost btn--xs" id="ovGuide">SAFE ZONE GUIDE</button>
        <a class="btn btn--ghost btn--xs" href="overlay.html" target="_blank" rel="noopener">OPEN SOURCE ↗</a></div>
    </div><div class="monitor monitor--ov"><div class="fauxgame" aria-hidden="true">
      <div class="fauxgame__grid"></div><div class="fauxgame__ring"></div><div class="fauxgame__ship"></div>
      <span class="fauxgame__tag">SIMULATED GAMEPLAY</span></div><div class="ov-frame" id="overlayPreview"></div></div>
      <div class="zone-list"><div class="zone-chip"><span class="zone-chip__k">TR</span><div><b>LIVE CHAOS POLL</b><em>340 × 352 · purple</em></div></div>
        <div class="zone-chip"><span class="zone-chip__k">BL</span><div><b>CODEX COMPILER</b><em>420 × 272 · green</em></div></div>
        <div class="zone-chip"><span class="zone-chip__k">TC</span><div><b>BOSS + COMBO</b><em>600 × 176 · amber</em></div></div>
        <div class="zone-chip zone-chip--safe"><span class="zone-chip__k">C</span><div><b>CENTER SAFE ZONE</b><em>1152 × 648</em></div></div></div>
      <p class="ovview__note">Use the Studio-specific URL below to link OBS to this Studio.</p>
    </div><aside class="ovview__rail"><section class="panel"><header class="panel-head">
      <span class="panel-head__l"><span class="panel-index">01</span><h2>OBS SETUP</h2></span></header>
      <ol class="spec-steps"><li><b>Add</b> a Browser Source at 1920 × 1080.</li>
        <li><b>Copy the Studio-specific URL</b> below and paste it into the Browser Source URL field.</li>
        <li><b>Keep</b> the background transparent.</li><li><b>Audio</b> is controlled from the deck.</li></ol>
      <div class="copyline"><code id="obsUrl"></code><button class="btn btn--ghost btn--xs" id="copyUrl">COPY URL</button></div>
      <p id="copyStatus" class="fineprint" aria-live="polite"></p></section>
      <section class="panel"><header class="panel-head"><span class="panel-head__l"><span class="panel-index">02</span>
        <h2>COMPONENT SPECS</h2></span></header><table class="spec-table"><tbody>
        <tr><td>Poll</td><td>340 px · top right</td></tr><tr><td>Compiler</td><td>420 px · bottom left</td></tr>
        <tr><td>Boss bar</td><td>600 px · top center</td></tr><tr><td>Safe zone</td><td>1152 × 648 (60%)</td></tr>
        <tr><td>Center opacity</td><td>0.70</td></tr><tr><td>Minimum HUD text</td><td>16 px base (auto-scales for long poll ideas)</td></tr>
        <tr><td>Poll countdown</td><td>15 seconds · 4 Hz updates</td></tr></tbody></table></section>
      <section class="panel"><header class="panel-head"><span class="panel-head__l"><span class="panel-index">03</span>
        <h2>SAFETY RULES</h2></span></header><ul class="spec-list"><li>Entities spawn outside the center rectangle.</li>
        <li>Entities fade to 70% inside the center.</li><li>Panic clears the overlay and mutes sound.</li>
        <li>Unsafe prompts use the safe rubber duck fallback.</li></ul></section>
    </aside></div></section>`;
}
