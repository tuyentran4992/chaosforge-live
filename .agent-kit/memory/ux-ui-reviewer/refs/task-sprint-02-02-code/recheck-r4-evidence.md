# UX recheck r4 — static/mock evidence

Snapshot HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, tracked diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`; all 72 product paths/hashes matched before and after review.

Independently ran `node --test test/design-system.test.js test/overlay.test.js test/sync-poll.test.js`: 4 pass / 0 fail. Tests check static markup/CSS and fake DOM/socket; not browser geometry or rendered readability.

- `design-system.html:115-123` now includes safety alert with `PROMPT BLOCKED BY TOS GUARD` and `DEPLOYING SAFE RUBBER DUCK FALLBACK` and labeled specimen. It addresses the missing markup observed in r3; visual geometry and entire design-system fidelity remain unverified.
- `shared/sync-contract.js:4` accepts 160 code units per idea; `client/overlay/engine.js:121-122` sets full `textContent` and HTML title. `client/styles/main.css:18,29-34` fixes poll height at 352px, sets two-line clamp/max-height and overflow hidden. For any idea longer than the two visible lines, its remainder is hidden in the rendered preview; title can be hovered in an interactive browser but cannot be hovered by a Twitch/OBS video viewer. Two ideas with the same first two lines and different endings cannot be distinguished from the broadcast. Source-derived behavior; exact truncation point and layout are not measured in browser.
- The original r1 findings for artwork, poll timing/layout, raid receipt, tab semantics, prompt validation and OBS setup were not retested visually or over a real network on r5. No earlier screenshot was used as proof for r5.
