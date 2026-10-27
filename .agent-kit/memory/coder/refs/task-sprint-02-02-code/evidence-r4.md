# Evidence — coder r4

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
?? client/round/poll.js
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
?? client/ui/obs-link.js
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
?? shared/sync-contract.js
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
?? test/design-system.test.js
?? test/obs-link.test.js
?? test/overlay.test.js
?? test/physics.test.js
?? test/rooms-unit.test.js
?? test/round.test.js
?? test/server.test.js
?? test/sfx.test.js
?? test/sync-poll.test.js
```

- `Get-ChildItem test/*.test.js` except `server.test.js`, then `node --test` on that list: 28 passed, 0 failed. Socket, DOM, fetch and timers are mocked; no network.
- `node --check` for 55 JavaScript files: passed; `git diff --check`: exit 0 for tracked diff only.
- Static regex set comparison against design-handoff/index.html: original static ID names, class names and data-attribute names all appear in index.html or client/ui sources. This does not prove rendered hierarchy, semantics, geometry, interactions, or fidelity.
- Browser, app startup and localhost HTTP/WebSocket integration were not run in r4: prior automatic approval review failed due to usage limit. No retry or bypass. Prior r2/r3 browser runs and measurements are not evidence for this snapshot.
- No real OpenAI or Twitch calls, two-machine test, latency/FPS measurement, full visual/English/accessibility verification.

## Product untracked files — SHA-256 and physical lines

| File | SHA-256 | Lines | Change vs r3 |
| --- | --- | ---: | --- |
| `README.md` | `fab4d67fa55773443fc559423981a2020220cdf00d0763c3e28be47e1316893d` | 25 | unchanged |
| `client/audio/sfx.js` | `dc63a7eb8e98f9d07620dae88b7c6884bd1ec99a966f34dfcfed079c4e3ee62e` | 30 | unchanged |
| `client/cartridges/library.js` | `c103bd8449ad6336dd4cb875f4f00a053e0d4ba482b408b4df0def8d518bf4f8` | 69 | unchanged |
| `client/chat/irc.js` | `3fef4b94d693348a674aa6502aa6a77fb0527930dfd331ba5792d65298e8af54` | 24 | unchanged |
| `client/chat/parse.js` | `e89e14d55bd51e312cdfa8bbea4e917dd86509df487b2a84eddbe9fe93b95134` | 59 | unchanged |
| `client/chat/simulator.js` | `3a7a80c30dff73eb6c09ed1b41d5b31d673d734a56eae5a4d22aac76a9699e56` | 15 | unchanged |
| `client/game/arcade.js` | `e8abe5350a57ee98b5192c82d2052db1d13368d02f0bd1390e8294dab25f6f8c` | 85 | unchanged |
| `client/game/combat.js` | `7ca4e112895093ee87d677e8c26c890220e17e80f4b22d2d0ea63e3ff1783f9e` | 45 | unchanged |
| `client/main.js` | `e7798b154ffc1c9c5cf87c3a33326d6b778e47d9975d4aeaca0a51e8c281b6a9` | 236 | changed |
| `client/overlay/artwork.js` | `4a0327126575eb780bdd52e5681f7367ce13b289155b3c7e17cb43ffbb63f0e3` | 66 | unchanged |
| `client/overlay/engine.js` | `c3b6e742d2e2f49e1f428033426df42f24ec371376eb07d81eed0ee578eafcf4` | 134 | changed |
| `client/overlay/physics.js` | `0ae19c1338790cd74217af2b92d8e01400a4eb34a49c2a7cfddd3d6b0ab6b5ed` | 31 | unchanged |
| `client/overlay/standalone.js` | `c57ee72ffc20857b52cc141c99fc4fc478b521583799cf96f20862a10a7ffe50` | 15 | changed |
| `client/round/compile.js` | `3a3be306b08358e8f86701fedc93c06443ce9a2d162b8ca16acac19532e35bc5` | 17 | unchanged |
| `client/round/controller.js` | `d9788195906ac3f9670c64563eb77defc6cc1526ae3c2cdcf14910a228c460b8` | 138 | changed |
| `client/round/poll.js` | `b979394e40bf45d1fa338d5ce1ef1e91255c0b91db185afb117e3f73975570ca` | 12 | new |
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
| `client/styles/main.css` | `df742ef4b3cc0bbe16398c22eee5888929232e92b82153c5474d7f0f704ffd32` | 32 | changed |
| `client/styles/obs.css` | `295a8831ef39b73b164abd4b446b8d3303cb94a9a9682ace1fc12deb651e5927` | 21 | changed |
| `client/sync/channel.js` | `5ed13a02724090157b450b14991dc95a4a1fba1bf02a2d26e086c67c1fd8f1a4` | 61 | changed |
| `client/sync/raid.js` | `b2257d85058d79c51322b09c3d69acb6b9683665d1886b28c8229cdbdf1c4a79` | 20 | unchanged |
| `client/sync/socket.js` | `27c7be3ca3960d77314370f2d0b0be2fc5d0609696c690944e5c8c6d81c5f5bd` | 29 | unchanged |
| `client/ui/deck.js` | `431d950d7982b91835777de2fabac2f39deda8e859941d3efe7ce6d63b4fe65a` | 49 | changed |
| `client/ui/obs-link.js` | `912d89598e28e82a96e513a12eca52bf7dddf8eca3270e58b2e755429c79b3fb` | 12 | new |
| `client/ui/overlay-view.js` | `7c3bd478a61952a1e7512f474bf67911194513ffdd6afd052767e8334fae14fa` | 34 | changed |
| `client/ui/raid-controls.js` | `a3cece56f98465af90744595ccafdbb57ece5d7e284382f99d61bab58d6ba556` | 28 | unchanged |
| `client/ui/shell.js` | `e8fc78dc80096d90cf085517589c178b411c6fd8561a83d7016f36076eba6de9` | 37 | unchanged |
| `client/ui/stage.js` | `9a136276a14406de2fd2f173618b1cf39ff0fa28a3fd739974607e96ae1d608c` | 62 | changed |
| `design-system.html` | `4ad3de26b4b0ce460637130c428f7ce55b8f545e02b8f376e2190b929ec4b359` | 151 | changed |
| `index.html` | `84f7d3814a3f2a15f3cb90909683f44012861d788231ca26364277af1cbe15b3` | 19 | changed |
| `overlay.html` | `8034b796b4ec68f4dcc26a5f3838772e55702ef849d8ccf497049f239785733a` | 15 | changed |
| `package.json` | `8a6f2c2c507376bb5d1652023a3f231a585fc8a735f6e1f1b7bc964d8b623510` | 11 | unchanged |
| `server/access.js` | `7dedccd45f8befee1c10f498251f7e571cd2e4172487553328f92ff5cb00b8fb` | 31 | unchanged |
| `server/compiler.js` | `39fe207577ec9737124e5dc370d029b7cbaa7408e538900c6e7262347cc3de43` | 36 | unchanged |
| `server/http.js` | `ed9604a0748fce27d11218379495242715cd740fefe36801103f444eacc76cec` | 52 | unchanged |
| `server/index.js` | `9805f9a6774d9b28f14ae7bdbade5e39cd8457af86dfb790042a29c9f249d47f` | 18 | unchanged |
| `server/openai.js` | `9c1be75fed1c236db682168d72150765cd769b39778b13911a559ba651bd2b3d` | 35 | unchanged |
| `server/rooms.js` | `9e94a7ccf4fcd51c9e4a53312db1706d4fa70872e5b51182b20349d50167d08a` | 65 | changed |
| `server/ws.js` | `ecb1d930c05d44d97d4c4f306d0a88538e928f983cf68af3b3c06571023a3c89` | 64 | unchanged |
| `shared/ast-schema.js` | `a20bda415d6999d520e5e9f3d95536c7922c92454ae65fb9c5233e78b29bac36` | 17 | unchanged |
| `shared/ast-validate.js` | `59377546d74a39d70d93ecb4377b27fe7ee1114ce5c59c5069ffd69c41200cce` | 21 | unchanged |
| `shared/cartridges.js` | `a41c6917e2125e1096ea621155b956b10e95a4b6bdfdbd68bbb32621f11c9003` | 8 | unchanged |
| `shared/safety.js` | `2aca69bfdcb5b9f29acc0645585aba5eb71f6ee354ec8db424c5a0bca44620cf` | 15 | changed |
| `shared/sync-contract.js` | `95492c4385b6acdb8df96cf6e2ebf2718ec130f7782d579e851c32bb6d6725d6` | 5 | new |
| `shared/synthesize.js` | `7f1683d3bcc547c31c5a8fc1dc49d0ff0e27d0442b14354344a03c206cb2ddda` | 29 | changed |
| `test/access.test.js` | `3fe66e202152938073921b42f4fb291094b2e1249c4f184ccb61057dcbad2923` | 34 | unchanged |
| `test/ast.test.js` | `0f99375cb1fc091dcae9c26d86cc6865f5de42d370b98e90d997ae4b641a3f3e` | 49 | changed |
| `test/browser-controls.js` | `2932fc9bbfb243e4d1d542b554fc9fd2df1d9ce5847427a22568510633a0a18b` | 45 | unchanged |
| `test/browser-measure.js` | `545294e7ed9c01195f920ddc45ccb7af486bedc7fc3ca69e9fd12b53db4668f4` | 35 | unchanged |
| `test/browser-regression.js` | `366a10e9a14eaf16452c8ab5639e3869b6f3b5da8716a55615fb33ae0ba09295` | 64 | changed |
| `test/browser-smoke.js` | `89328b1d32e751bec281a20d6a28920759c3d249c38b224fdcc5f80b669557bb` | 43 | unchanged |
| `test/chat-parse.test.js` | `066b2313859554528fbff0aae37cd0bfedb73dde1097fdd51fca93e0fe0d0319` | 39 | unchanged |
| `test/combat.test.js` | `3020274ed81e6821e258181f56037cf6f63cbe72b620390871309d570dd830f3` | 26 | unchanged |
| `test/compiler.test.js` | `400143dc962101b8a9612c9a1d8e295ed00d29d94ad17ef80db77ed247fbe676` | 74 | changed |
| `test/design-system.test.js` | `71ec789202f6ed51950ef0171108affd6f3f04c967ab0d40b6850ddd219989f5` | 15 | new |
| `test/obs-link.test.js` | `c7f2e01c81fb604b6616f9975acd0e321cd4d4e1ef3d5b56708dfd5d3628a8d6` | 18 | new |
| `test/overlay.test.js` | `6c9fb17ad0685fbcce0991b4d87f8a22d190ab403297794f4dda1310a161e258` | 50 | new |
| `test/physics.test.js` | `00c79ba0e331a55ad15be6ae15a9e2bd030008d3e1fac4c2a2740a15ef9ef155` | 43 | unchanged |
| `test/rooms-unit.test.js` | `378484f22ed6ebcf9caa967394fcf474bf0c79fbc01672f32e855ab6db24dfd5` | 67 | changed |
| `test/round.test.js` | `36c817428b8499bdebd199e7fa533af279abd5e528f77a07af3775ff852d13d7` | 55 | changed |
| `test/server.test.js` | `af3024bb4cb654fb258f4f90e49b683068dbbe122082746ca3aef1265bac29b5` | 109 | unchanged |
| `test/sfx.test.js` | `f5fc07c2e72a2a072766bfca7f31b8036734566d62dbfcb2de397b735c3171bf` | 24 | unchanged |
| `test/sync-poll.test.js` | `fb594c9dfbfd44bbcd17db9c110a09849567fd65e5815c9311e175e42bc1e715` | 48 | new |
