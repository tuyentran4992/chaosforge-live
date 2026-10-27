# Code review recheck — r2

- Task `task-sprint-02-02-code`; handoff `task-sprint-02-02-code-review-01/r2`; reviewer Codex `/root/code_reviewer`; status `finished`. No source edits.
- Snapshot before and after review: HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, tracked scope diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`; status and all 65 product paths/hashes match freeze-r3, no extra/missing files. Independent line counts: 63 codefiles, max 226 lines; [evidence](../../../memory/code-reviewer/refs/task-sprint-02-02-code/evidence-r2.md).

## Recheck of previous findings

1. **Studio actions sent to rival — fixed in code, network recheck pending.** `client/sync/channel.js:47-56`, `client/sync/raid.js:9-17`, `server/rooms.js:15-21,38-46`: separate studio and raid channels; only `raid-send` goes to raid peers. Independently ran the fake-socket room test successfully; actual two-browser/two-machine transport not verified on this snapshot.
2. **OBS disconnects when raid room changes — fixed in code, browser/OBS recheck pending.** `client/main.js:33-40,219`, `client/overlay/standalone.js:5-14`: OBS URL carries stable studio ID while raid room is separate. Not exercised in browser or OBS on final snapshot; late join tested only through fake sockets.
3. **AST ignored by engine — partial/open.** `client/overlay/engine.js:61-64`, `client/overlay/physics.js:14-28`, `client/overlay/artwork.js:1-65`, `client/audio/sfx.js:1-26` now execute distinct entity, collision and sound branches; unit tests pass. However local synthesizer still does not reliably represent prompt semantics; see new finding A below. Fidelity/runtime behavior and live SFX remain unverified.
4. **Safety guard misses inflections — partial/open.** `shared/safety.js:3-13` now blocks both reported examples and normalizes width and hidden characters; tests pass. Multilingual unsafe terms remain unblocked; see finding B. Keyword moderation is inherently limited.
5. **Paid endpoint unauthenticated — fixed in code, deployment verification pending.** `server/index.js:13-17`, `server/access.js:3-29`, `server/http.js:20-34`: server binds loopback and paid calls require separate >=32-byte token with per-IP/process/concurrency limits. Independent fake-request tests pass. HTTPS reverse proxy, actual cross-machine access, real credentials and real API not tested; room codes remain explicitly unauthenticated.
6. **Old round timer clears replacement — fixed in isolated controller.** `client/round/controller.js:125-130` cancels old timer and increments generation. Fake-clock test independently passed; actual browser/remote overlay behavior remains unverified.
7. **Raid log lacks receive/delivery truth — fixed in code, real socket recheck pending.** `client/ui/raid-controls.js:12-16,22-26`, `server/rooms.js:38-44` log receiving and distinguish zero peer connections from send-to-socket count. Socket delivery count is not a client acknowledgement. Network/browser test pending.
8. **Twitch forge/poll do not start/count down — partial/open.** `client/round/controller.js:29-40,67-84` auto-starts from idle and emits 4Hz; fake-clock test passes. However it fails immediately after panic, and valid poll content can be dropped; see findings C and D. Live Twitch untested.

## New or remaining findings

### A. P1 — Local fallback does not compile the meaning of supported prompts
- **Location/evidence:** `shared/synthesize.js:10-21`, `client/overlay/physics.js:14-17`; `client/ui/stage.js` preset is `Reverse gravity laser boss`. Independent local run returned `{entity: boss, gravity: 0.5, ...}` for that preset, accelerating downwards because canvas y increases downwards. `vịt cao su` returned a star, not a duck. Synthesizer matches only a few English substrings and otherwise hashes the text.
- **Steps:** Run without API key, use that preset or the Vietnamese duck idea, and compile. **Expected:** the generated AST and effect correspond to the requested reverse gravity / rubber ducks, including multilingual valid ideas. **Actual:** valid AST can encode the opposite gravity or an unrelated entity. This violates us-007's deterministic demo/fallback and corresponding effect, despite schema validation and renderer improvements.

### B. P1 — Multilingual unsafe keywords bypass the guard
- **Location/evidence:** `shared/safety.js:2-13`, `server/compiler.js:15-17`. Independent call `isUnsafePrompt('炸弹')` returned `false` (Chinese for bomb), while English `make bombs` now returned `true`.
- **Steps:** submit `炸弹` with or without a configured remote compiler. **Expected:** unsafe keyword receives blocked state and safe duck fallback. **Actual:** safety check returns false and prompt goes to local synthesis or remote transport. This demonstrates a remaining language coverage gap for a product accepting multilingual ideas; no general claim that a keyword filter can catch all unsafe content.

### C. P2 — Forge cannot start a new round after panic
- **Location/evidence:** `client/round/controller.js:29-34,86-91`; independent network-free reproduction `round.clear(); round.addIdea('a duck'); round.state()` returned `panic`.
- **Steps:** press Panic Clear, then send a live Twitch `!forge` idea. **Expected:** the new idea enters a new voting round. **Actual:** `addIdea` starts voting only from `idle`, while panic leaves state `panic` indefinitely; the idea is queued but the poll and votes never start without a separate manual reset/start.

### D. P2 — Escaped poll text silently exceeds sync limit
- **Location/evidence:** `client/main.js:83-86`, `client/sync/channel.js:24-30`, `server/rooms.js:47-51`. Ideas are truncated to 100 characters before JSON encoding, but quotes/backslashes expand in JSON and can make the resulting detail exceed the 500-character event limit. Independent mocked-channel reproduction: 3 ideas each containing 100 quote characters produced a 649-character detail; publishing yielded zero locally accepted events.
- **Steps:** submit three legal `!forge` ideas containing many quotes/backslashes. **Expected:** three ideas, votes and countdown continue updating in Studio and OBS. **Actual:** each oversized snapshot is discarded by local sync and the relay; poll display freezes or remains empty until voting ends. Guard/parser do not reject such input. Existing 4Hz unit test does not exercise serialization/sync boundaries.

## Checks and limitations

- Independently ran `node --test test/access.test.js test/ast.test.js test/chat-parse.test.js test/combat.test.js test/compiler.test.js test/physics.test.js test/rooms-unit.test.js test/round.test.js test/sfx.test.js`: **22 pass / 0 fail**, fake transport/socket; no OpenAI/Twitch/network use. Additional small independent Node reproductions are described above.
- Did not run localhost/browser integration on this final snapshot: automatic approval review previously rejected loopback escalation because the usage limit was exhausted; did not retry or bypass the rejection. Consequently no claim for final UI fidelity, OBS, cross-device, real Twitch, remote compiler, <100ms / <2.5s or 60fps. Static code and fake tests do not substitute for those checks.
- Reviewed changed sync, room/server/access, compiler/safety, round, overlay/physics/artwork/SFX, relevant tests, all eight prior findings, and referenced story contracts. UX fidelity remains the separate UX review; no PM acceptance or claim that the whole sprint passed.
- Next: send findings to coder after both reviews stop, then recheck fixes and integrated regression on a new frozen snapshot. Loopback/browser verification remains pending until the environment permits it.