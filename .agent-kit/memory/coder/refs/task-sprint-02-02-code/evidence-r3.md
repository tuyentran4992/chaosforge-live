# Evidence — coder r3

- HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`.
- Tracked scope diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`; excludes untracked files.
- Scope status:
```
 M .agent-kit/specs/ARCHITECT.md
 M .agent-kit/specs/DESIGN.md
 M .agent-kit/specs/TECHSTACK.md
 M .agent-kit/specs/design-handoff/DESIGN-HANDOFF.md
 M .agent-kit/specs/design-handoff/DESIGN-MANIFEST.json
 M .agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md
?? client/audio/sfx.js
?? client/cartridges/library.js
?? client/chat/irc.js
?? client/chat/parse.js
?? client/chat/simulator.js
?? client/game/arcade.js
?? client/game/combat.js
?? client/main.js
?? client/overlay/artwork.js
?? client/overlay/engine.js
?? client/overlay/physics.js
?? client/overlay/standalone.js
?? client/round/compile.js
?? client/round/controller.js
?? client/styles/handoff-01.css
?? client/styles/handoff-02.css
?? client/styles/handoff-03.css
?? client/styles/handoff-04.css
?? client/styles/handoff-05.css
?? client/styles/handoff-06.css
?? client/styles/handoff-07.css
?? client/styles/handoff-08.css
?? client/styles/handoff-09.css
?? client/styles/handoff-10.css
?? client/styles/main.css
?? client/styles/obs.css
?? client/sync/channel.js
?? client/sync/raid.js
?? client/sync/socket.js
?? client/ui/deck.js
?? client/ui/overlay-view.js
?? client/ui/raid-controls.js
?? client/ui/shell.js
?? client/ui/stage.js
?? server/access.js
?? server/compiler.js
?? server/http.js
?? server/index.js
?? server/openai.js
?? server/rooms.js
?? server/ws.js
?? shared/ast-schema.js
?? shared/ast-validate.js
?? shared/cartridges.js
?? shared/safety.js
?? shared/synthesize.js
?? test/access.test.js
?? test/ast.test.js
?? test/browser-controls.js
?? test/browser-measure.js
?? test/browser-regression.js
?? test/browser-smoke.js
?? test/chat-parse.test.js
?? test/combat.test.js
?? test/compiler.test.js
?? test/physics.test.js
?? test/rooms-unit.test.js
?? test/round.test.js
?? test/server.test.js
?? test/sfx.test.js
```

- `node --test test/access.test.js test/ast.test.js test/chat-parse.test.js test/combat.test.js test/compiler.test.js test/physics.test.js test/rooms-unit.test.js test/round.test.js test/sfx.test.js`: 22 passed, 0 failed, no real network; socket and paid transport are mocked.
- `node --check` for 48 JavaScript files: passed; `git diff --check`: exit 0 for tracked diff only.
- Before final modifications, `npm test` passed 17 tests using approved localhost. Earlier browser regression observed separate studio/raid, explicit SEND, OBS after room change, 15→14 countdown, tabs and prompt validation. Earlier browser smoke had 45 document-level width checks with no overflow. These are not tests of the final snapshot.
- Before final modifications, one Chromium/localhost trial measured local compile 85 ms and panic plus canvas readback 51.6 ms; instrumented canvas saw alpha 0.70. This is one measurement and not a full latency or FPS guarantee.
- Re-running `npm test` with localhost on the final snapshot was not executed: automatic approval review failed due to usage limit. No real OpenAI/Twitch, two-machine or full visual verification.

## Product untracked files — SHA-256 and physical lines

| File | SHA-256 | Lines | Change vs r2 |
| --- | --- | ---: | --- |
| `README.md` | `fab4d67fa55773443fc559423981a2020220cdf00d0763c3e28be47e1316893d` | 25 | new |
| `client/audio/sfx.js` | `dc63a7eb8e98f9d07620dae88b7c6884bd1ec99a966f34dfcfed079c4e3ee62e` | 30 | new |
| `client/cartridges/library.js` | `c103bd8449ad6336dd4cb875f4f00a053e0d4ba482b408b4df0def8d518bf4f8` | 69 | changed |
| `client/chat/irc.js` | `3fef4b94d693348a674aa6502aa6a77fb0527930dfd331ba5792d65298e8af54` | 24 | changed |
| `client/chat/parse.js` | `e89e14d55bd51e312cdfa8bbea4e917dd86509df487b2a84eddbe9fe93b95134` | 59 | unchanged |
| `client/chat/simulator.js` | `3a7a80c30dff73eb6c09ed1b41d5b31d673d734a56eae5a4d22aac76a9699e56` | 15 | unchanged |
| `client/game/arcade.js` | `e8abe5350a57ee98b5192c82d2052db1d13368d02f0bd1390e8294dab25f6f8c` | 85 | changed |
| `client/game/combat.js` | `7ca4e112895093ee87d677e8c26c890220e17e80f4b22d2d0ea63e3ff1783f9e` | 45 | new |
| `client/main.js` | `46a125a00bdc689cfa0c08dd0254a875e757b88577a05c77742c215dc223cdd6` | 226 | changed |
| `client/overlay/artwork.js` | `4a0327126575eb780bdd52e5681f7367ce13b289155b3c7e17cb43ffbb63f0e3` | 66 | new |
| `client/overlay/engine.js` | `d00ddfc7560001d1de50e00530c99ef12467d9ed1a56536e91ccc99002927252` | 108 | changed |
| `client/overlay/physics.js` | `0ae19c1338790cd74217af2b92d8e01400a4eb34a49c2a7cfddd3d6b0ab6b5ed` | 31 | new |
| `client/overlay/standalone.js` | `c61db82b57dcbe571d6045ab541913dc288403f97cf64a5e35108b2e10c9f561` | 14 | changed |
| `client/round/compile.js` | `3a3be306b08358e8f86701fedc93c06443ce9a2d162b8ca16acac19532e35bc5` | 17 | new |
| `client/round/controller.js` | `b0e05f1ec42a166132f70e66978e511af06a76d7f33e0a43e778a177ba1f0525` | 135 | changed |
| `client/styles/handoff-01.css` | `0f18e4ae99126a17c2ad220bb6d4f52a8d3290ed1be43e695aac9245b9bc147c` | 214 | unchanged |
| `client/styles/handoff-02.css` | `51ecfb07b998311e43da290c88e848f0d19c648b3c1ec1ad32b7d2feb35e7de8` | 216 | unchanged |
| `client/styles/handoff-03.css` | `cb6aa5819b7283cbc0b41d865b7b57a1bcd734d6ef0b13ac542c84cbdffe6200` | 207 | unchanged |
| `client/styles/handoff-04.css` | `bf6a538dbc02440016daba99cbea1e776bad0079327979cbc7c83ec65c95a8a0` | 215 | unchanged |
| `client/styles/handoff-05.css` | `2fccc94328f8dfc68155a0921564075913579157e2dd36084f69113278773128` | 214 | unchanged |
| `client/styles/handoff-06.css` | `89a4af65de3f73ecf668d5a981abac688258674feeafb55e9d208c071f2a9f2a` | 220 | unchanged |
| `client/styles/handoff-07.css` | `747c8f1b7706ea1d953da2399e6ba3e283961341314c2178007458bb06ec75ff` | 220 | unchanged |
| `client/styles/handoff-08.css` | `0ff6075ebfbf131245bba53b03d05da149cc0389e69811f9e0f6c3edbc13784e` | 220 | unchanged |
| `client/styles/handoff-09.css` | `b831c4796edb2891efd9ee651288f3884b66e0cd8a7f53304dfcebbe2d28c236` | 220 | unchanged |
| `client/styles/handoff-10.css` | `d0981df4265859012d339f847b1f0d2c84f5fee10ed99e65351c5f5ce75b0420` | 171 | unchanged |
| `client/styles/main.css` | `7231a6461424fbd731a6b3d2b85c63ae15bbe62830d80c9c55c1456197dde51f` | 23 | changed |
| `client/styles/obs.css` | `db19dbca3e859bf824bc045f956d88475a536edd7cf5845050ab422f7d15d95d` | 10 | unchanged |
| `client/sync/channel.js` | `f332cd5fa0317623794fba9711e6238ea0a5fca3acda2f64c4da012b227d3289` | 60 | changed |
| `client/sync/raid.js` | `b2257d85058d79c51322b09c3d69acb6b9683665d1886b28c8229cdbdf1c4a79` | 20 | new |
| `client/sync/socket.js` | `27c7be3ca3960d77314370f2d0b0be2fc5d0609696c690944e5c8c6d81c5f5bd` | 29 | new |
| `client/ui/deck.js` | `e8fc1b21c522b1330cebe7ccb38ad0b6c6cecd7a042ac484c1b8101e60e67062` | 49 | unchanged |
| `client/ui/overlay-view.js` | `d287fdfcd903488a2c26d520061dbfd4dbf7cd1b203a79dee2cecf84981ddabf` | 31 | unchanged |
| `client/ui/raid-controls.js` | `a3cece56f98465af90744595ccafdbb57ece5d7e284382f99d61bab58d6ba556` | 28 | new |
| `client/ui/shell.js` | `e8fc78dc80096d90cf085517589c178b411c6fd8561a83d7016f36076eba6de9` | 37 | unchanged |
| `client/ui/stage.js` | `0816cdec147c833c35e4af040e7bcae1b2e6f22b59ef5934ff49412ccae294d7` | 60 | changed |
| `design-system.html` | `a95f8c7a87abdbd08acea2bde7b8db6ed9613216dc650651d5b96a5b645869ae` | 85 | changed |
| `index.html` | `994ff996360ad3211c0b6916c6b543db69f45c7e9a1881e191ba3caee735f9a9` | 19 | unchanged |
| `overlay.html` | `3c037ac69cbff96f688446f7c0ebd65cb3e5b9d23a51ee5d9b3ff52f64f480bd` | 14 | unchanged |
| `package.json` | `8a6f2c2c507376bb5d1652023a3f231a585fc8a735f6e1f1b7bc964d8b623510` | 11 | unchanged |
| `server/access.js` | `7dedccd45f8befee1c10f498251f7e571cd2e4172487553328f92ff5cb00b8fb` | 31 | new |
| `server/compiler.js` | `39fe207577ec9737124e5dc370d029b7cbaa7408e538900c6e7262347cc3de43` | 36 | unchanged |
| `server/http.js` | `ed9604a0748fce27d11218379495242715cd740fefe36801103f444eacc76cec` | 52 | changed |
| `server/index.js` | `9805f9a6774d9b28f14ae7bdbade5e39cd8457af86dfb790042a29c9f249d47f` | 18 | changed |
| `server/openai.js` | `9c1be75fed1c236db682168d72150765cd769b39778b13911a559ba651bd2b3d` | 35 | unchanged |
| `server/rooms.js` | `797eb833cb78ce1b49ea08d68a895da23ad695dd4333f1c71c8a0c51bfbf144b` | 64 | changed |
| `server/ws.js` | `ecb1d930c05d44d97d4c4f306d0a88538e928f983cf68af3b3c06571023a3c89` | 64 | changed |
| `shared/ast-schema.js` | `a20bda415d6999d520e5e9f3d95536c7922c92454ae65fb9c5233e78b29bac36` | 17 | unchanged |
| `shared/ast-validate.js` | `59377546d74a39d70d93ecb4377b27fe7ee1114ce5c59c5069ffd69c41200cce` | 21 | unchanged |
| `shared/cartridges.js` | `a41c6917e2125e1096ea621155b956b10e95a4b6bdfdbd68bbb32621f11c9003` | 8 | unchanged |
| `shared/safety.js` | `3c25fa372b4fcf0f3566af995c3c99b557187cd3d42596dedbdebf1619c349a9` | 14 | changed |
| `shared/synthesize.js` | `3b482b24b0277cdf3591666d78c731869d3fc3693eb8345c70c6801f53635a86` | 25 | unchanged |
| `test/access.test.js` | `3fe66e202152938073921b42f4fb291094b2e1249c4f184ccb61057dcbad2923` | 34 | new |
| `test/ast.test.js` | `0597ca0f7e466ba8b1c502b6613a73127507dfe3f5055882582be725c1dc61f5` | 32 | unchanged |
| `test/browser-controls.js` | `2932fc9bbfb243e4d1d542b554fc9fd2df1d9ce5847427a22568510633a0a18b` | 45 | unchanged |
| `test/browser-measure.js` | `545294e7ed9c01195f920ddc45ccb7af486bedc7fc3ca69e9fd12b53db4668f4` | 35 | new |
| `test/browser-regression.js` | `ca27f69ab38e4e0eb38b3880543163a283f0f700a70127e4089c8375c428d28a` | 54 | new |
| `test/browser-smoke.js` | `89328b1d32e751bec281a20d6a28920759c3d249c38b224fdcc5f80b669557bb` | 43 | changed |
| `test/chat-parse.test.js` | `066b2313859554528fbff0aae37cd0bfedb73dde1097fdd51fca93e0fe0d0319` | 39 | unchanged |
| `test/combat.test.js` | `3020274ed81e6821e258181f56037cf6f63cbe72b620390871309d570dd830f3` | 26 | new |
| `test/compiler.test.js` | `6343c80c077c2853492c3e5a82b2ed329d4b5448919f23cdfa6095eaca6212a7` | 74 | changed |
| `test/physics.test.js` | `00c79ba0e331a55ad15be6ae15a9e2bd030008d3e1fac4c2a2740a15ef9ef155` | 43 | new |
| `test/rooms-unit.test.js` | `8f1d6059b7badf848dc3ed19fb70d172e03c4c0d27b4b246e504dfd7a8ef4f79` | 59 | new |
| `test/round.test.js` | `e383f5029cfd1c94a710e691c76a927dcb78b99e8d521e316318a42925257845` | 40 | new |
| `test/server.test.js` | `af3024bb4cb654fb258f4f90e49b683068dbbe122082746ca3aef1265bac29b5` | 109 | changed |
| `test/sfx.test.js` | `f5fc07c2e72a2a072766bfca7f31b8036734566d62dbfcb2de397b735c3171bf` | 24 | new |
