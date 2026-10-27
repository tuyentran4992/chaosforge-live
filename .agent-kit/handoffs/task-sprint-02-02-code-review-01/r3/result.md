# Code reviewer recheck r3

- Task `task-sprint-02-02-code`; handoff `task-sprint-02-02-code-review-01/r3`; instance Codex `/root/code_reviewer`; status `finished`. Source not modified.
- Snapshot before and after: HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`; tracked diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`; status six modified specs plus untracked product files; full 72/72 path and SHA-256 inventory matches freeze-r4. Independently counted 70 codefiles; max 236 lines. Details: `.agent-kit/memory/code-reviewer/refs/task-sprint-02-02-code/evidence-r3.md`.

## Previous findings

### A — Local synthesis semantics: **partial / open**
`shared/synthesize.js:13-22` now correctly yields `boss`, gravity `-0.75` for `Reverse gravity laser boss`, and `duck` for `vịt cao su`; independent command verified both. However the underlying acceptance is not limited to those phrases. With no OpenAI key, `synthesize('ducks with no gravity')` returns `gravity: 0.75` and `collision: bounce`; `synthesize('gravity upside down duck')` returns positive gravity `0.25`. The engine adds positive gravity to downward canvas velocity (`client/overlay/physics.js:14-17`). Expected zero gravity and upward gravity respectively; actual effects visibly contradict these plain English valid ideas. The fixed keyword set maps unknown phrasing to a hash rather than the requested effect. This remains **P1** for us-007's local deterministic response and corresponding effects; browser rendering is unverified.

### B — Guard misses multilingual unsafe keyword: **partial / open**
`shared/safety.js:3-14` now correctly blocks Chinese `炸弹`; the prior exact reproducer is fixed. Independent check also shows `isUnsafePrompt('bomba') === false` (Spanish/Portuguese for bomb) and `isUnsafePrompt('bombe') === false` (French for bomb), while English `bomb` and Chinese `炸弹` are blocked. `server/compiler.js:15-17` consequently treats those keywords as safe and may pass them to remote transport rather than deploy duckfallback. Expected multilingual unsafe keyword handling under us-007; actual coverage is a small hardcoded list. Severity **P1** remains; no finite keyword filter should be represented as complete moderation, and real API was not invoked. The fixes and new coverage need an explicit product/security decision on supported languages and behavior for uncertain prompts.

### C — Forge after panic: **fixed in controller; live Twitch pending**
`client/round/controller.js:30-35,87-95` starts voting from panic and clears previous ideas/votes. Independent direct reproduction of `clear(); addIdea('a duck')` returned `voting`; fake-timer regression also passes. Twitch and browser remain untested.

### D — Escaped poll detail silently dropped: **fixed for bounded generated snapshots in mock; network pending**
`shared/sync-contract.js:3-5`, `client/round/poll.js:3-13`, `client/sync/channel.js:25-31`, `server/rooms.js:48-52` share a 4096-code-unit bound, with three ideas of 160 code units. Independent 28-test run includes generated escaped payload accepted locally and fake-server relay/late-join tests. No actual browser or network run on this snapshot.

## Checks, coverage and limits

- Ran `$unitFiles = @(Get-ChildItem -Path test -File -Filter '*.test.js' | Where-Object { $_.Name -ne 'server.test.js' } | ForEach-Object { $_.FullName }); node --test $unitFiles`: **28 pass / 0 fail**, isolated fake socket/DOM/fetch/timers. Independently tested local synthesis, guard and panic→forge as above. No calls to OpenAI or Twitch.
- Rechecked changes affecting all four findings, shared contracts and relevant code/tests. Original r1 findings on room isolation, OBS URL, paid access, timer replacement, raid logging and renderer are covered by unit/mock and code inspection, but real network/browser/OBS and security deployment remain pending; no new claim of end-to-end acceptance.
- Did not run `server.test.js`, browser, app startup or timing tests on r4. Automatic approval review previously rejected escalation for localhost due to exhausted usage limit; no retry or workaround. Mock results cannot prove two-machine relay, <100ms panic, <2.5s compile, 60fps, visual fidelity, live Twitch, real OpenAI or zero crashes.
- Next: lead and PM decide handling of remaining language/semantics coverage; if changed, use a new frozen snapshot and recheck. Complete actual browser/network/integration and UX validation when environment permits. Do not mark sprint acceptance complete on this report.