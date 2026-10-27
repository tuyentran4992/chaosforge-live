# Code reviewer recheck r4

- Task `task-sprint-02-02-code`; handoff `task-sprint-02-02-code-review-01/r4`; instance Codex `/root/code_reviewer`; status `finished`. Source not modified.
- Snapshot before and after review: HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`; tracked scope diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`; status six modified specs and product files untracked; complete 72/72 path/hash inventory matches freeze-r5, no missing or extra. Independent count 70 codefiles, max 236 lines; details in `.agent-kit/memory/code-reviewer/refs/task-sprint-02-02-code/evidence-r4.md`.

## Prior findings

### A — Local synthesis semantics: **partial / open**
`shared/synthesize.js:13-22`: independent calls through `server/compiler.js` now return gravity `0` for `ducks with no gravity` and `-0.75` for `gravity upside down duck`; the exact r3 reproducers are fixed. But `compile('do not reverse gravity')` returns local source with gravity `-0.75`, causing reverse gravity despite the explicit negation. No confidence or unsupported-input signal is produced; `server/compiler.js:15-17,29-32` returns local output as an ordinary unblocked result both when no transport exists and when it fails. This remains the same **P1** underlying finding: keyword matching cannot meet us-007's broad valid-idea requirement and can deploy the opposite effect. PM must decide supported semantics and handling of unsupported/ambiguous inputs; this report does not claim that arbitrary natural language can be exhaustively recognized by keywords. No browser effect/timing was measured.

### B — Multilingual unsafe keywords: **exact reproducers fixed; broader policy open / partial**
`shared/safety.js:3-15` and `server/compiler.js:15`: independent `compile('bomba')` and `compile('bombe')` both returned `blocked: true`, `source: duckfallback`; tests also cover the previous Chinese and English reproductions. The fixed list remains finite, with no detection of unsupported language, semantic uncertainty, or obfuscation, and can block benign uses. It is not evidence of universal ToS moderation or acceptance for arbitrary languages. The original exact regression is fixed; the broader safety finding remains **P1 partial** pending an explicit supported-language and uncertain-input policy and corresponding evidence. No real remote request was sent.

### C — Forge following panic: **fixed in controller; live/browser pending**
The relevant r4 source remains unchanged from the previously rechecked version. The independent network-free regression passes in this run; no Twitch or browser run on r5.

### D — Oversized escaped poll synchronization: **fixed for bounded generated snapshots in mocks; live/browser pending**
The independent suite passes the escaped poll and mock relay checks. `client/styles/main.css:18,29-35` additionally bounds the visual poll and clamps each idea to two lines; full text exists in DOM/title (`client/overlay/engine.js`). A long idea can therefore be partially hidden from an OBS viewer, who cannot hover the browser title. Static evidence establishes the CSS rule, not actual dimensions or clipping in a running browser. This is a UX/product tradeoff for review against story/design; no claim of full visual acceptance.

## Verification and coverage

- Independently ran `$unitFiles = @(Get-ChildItem -Path test -File -Filter '*.test.js' | Where-Object { $_.Name -ne 'server.test.js' } | ForEach-Object { $_.FullName }); node --test $unitFiles`: **29 pass / 0 fail**, using fake socket/DOM/fetch/timers. Separately ran `compile()` without remote transport for the examples above; no OpenAI/Twitch calls.
- Compared changed product manifest against r4, reviewed changed synthesizer, safety guard, compiler contract, poll CSS and relevant tests. Other previous r1/r2 findings still require real browser/network/OBS verification; mock success is not evidence of integrated operation.
- Did not run `server.test.js`, app startup, browser or timing tests on snapshot r5. Automatic review previously rejected the loopback escalation due to exhausted usage limit; did not retry or bypass. Two-machine relay, live Twitch, OpenAI, fidelity, <100ms, <2.5s and 60fps remain unverified. No acceptance or sprint closure declared.
- Next: lead/PM decide coverage and safe handling of uncertain input, review poll readability, and arrange actual browser/network/OBS verification when the environment permits. Re-review any further changes on a new snapshot.