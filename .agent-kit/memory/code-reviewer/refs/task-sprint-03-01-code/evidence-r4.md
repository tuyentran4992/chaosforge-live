# Evidence — code recheck r4

- `node --test test/meme.test.js test/overlay.test.js test/ast.test.js`: 15/15 passed.
- Independently executed assertions: collision at t=0 and 1499; draw t=1499/1500/2999/3000 gives first, second, second, then no badge. Three further collisions during one active badge coalesce to one pending reaction. Panic replaces active and clears pending; clear removes both. A frame delayed to t=5000 starts pending then shows it until t=6500, so latency follows frame scheduling.
- `reactions.js:7,13-25` stores only Boolean pending; distinct events in an active interval coalesce. Acceptance of this tradeoff has not been established.
- `main.js:26` still calls `remove` locally; `standalone.js:12` sync reaction increments combo, not arcade hit. CR-02 OBS arcade-hit portion unchanged.
- Independent count: 73 code files with code extensions under client/server/shared/test, max 235 `client/main.js`, none above 250. R4 changed code: `client/overlay/reactions.js` 42 lines and `test/meme.test.js` 165 lines.
- Before/after HEAD, scope status, raw diff SHA256 and all five untracked SHA256 match freeze-r4. No source edits.
- Real browser/OBS visuals, FPS, audio, full suite with unrestricted loopback and 100% coverage not verified in this recheck.
