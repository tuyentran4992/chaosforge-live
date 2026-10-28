# Evidence — code recheck r2

- Independent test `node --test test/meme.test.js test/overlay.test.js test/ast.test.js`: 14/14 passed. `git diff --check`: exit 0, line-ending warnings only.
- Independently executed synthesizer reproductions: `doge and bonk but without bonk sound` → doge/none; `doge and boom nhưng không boom` → doge/none; `bonk doge boom but without bonk sound` → doge/boom; `bonk doge boom but without boom sound` → doge/bonk; `doge but sin bonk` and `doge but 不要 bonk` → doge/none.
- Independent tracker exercise: same overlapping pair across two updates produces one entry; separation and re-entry produces second entry. `engine.js` calls tracker each frame for each overlay and passes contact callback to reactions.
- `main.js:24-26` still calls `remove` only on two local overlays; standalone sync callback never receives arcade hit or calls `remove`. Thus actual arcade-hit reaction on OBS standalone remains unverified and not implemented by these paths.
- Independently counted code extensions in client/server/shared/test: 73 files, max 235 `client/main.js`, none over 250. R2-affected: `shared/synthesize.js` 105, `client/overlay/engine.js` 162, `client/overlay/collisions.js` 30, `client/overlay/reactions.js` 36, `test/meme.test.js` 147, `test/overlay.test.js` 92.
- Before/after HEAD, status, raw diff SHA256 and all five untracked SHA256 match freeze-r2. No source edits.
- No unrestricted server integration rerun, visual OBS observation, FPS measurement or live audio test in this recheck; no 100% coverage claim.
