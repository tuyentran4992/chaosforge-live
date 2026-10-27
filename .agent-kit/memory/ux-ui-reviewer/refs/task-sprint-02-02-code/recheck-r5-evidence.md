# UX recheck r5 — compiler evidence

Snapshot HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, tracked diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`; 72/72 product paths/hashes match before and after.

Directly invoked `compile(prompt)` from `server/compiler.js` without a transport (local mode, no network):

| Prompt | gravity | collision | source | blocked |
| --- | ---: | --- | --- | --- |
| do not reverse gravity | 0.5 | bounce | local | false |
| reverse gravity | -0.75 | bounce | local | false |
| avoid any effect with gravity upside down | -0.75 | bounce | local | false |
| do not reverse gravity but no gravity | 0 | float | local | false |

The positive and one negated examples differ as intended; the third negative wording still produces reverse gravity. `client/round/controller.js` deploys a valid, unblocked AST automatically in auto mode, and `client/main.js` saves a compiled nonblocked prompt. This is an inference from local return plus code path, not a browser observation. `shared/synthesize.js` uses finite lexical rules; no unsupported/uncertainty indication in the response contract observed. `node --test test/compiler.test.js`: 7 pass, 0 fail, mock/no network; this does not prove general semantic understanding or rendered behavior.

Poll source remains two-line clamp and full text title (`client/styles/main.css:18,29-34`, `client/overlay/engine.js:121-122`). Finding in r4 remains open; viewer of broadcast cannot interact with tooltip. No browser/OBS recheck on r6; all prior visual and interaction findings remain pending.
