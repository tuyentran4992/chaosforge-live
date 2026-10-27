# Evidence — coder r9

- Task: `task-sprint-02-02-code`, handoff revision `r9`.
- Scope: UX improvements for Arcade keyboard navigation and Twitch CONNECT/DISCONNECT button toggle.
- `npm test` (`node --test test/*.test.js`): 36 passed, 0 failed across all 36 test cases (100% PASS).
- All 73 product files strictly <= 250 physical lines (max 236 lines in `client/main.js`).

## Key Changes Summary

1. `client/game/arcade.js`:
   - Dual key & code tracking: listens to both `event.key.toLowerCase()` and `event.code.toLowerCase()` for `w`, `a`, `s`, `d`, `keyw`, `keya`, `keys`, `keyd`, `arrowup`, `arrowdown`, `arrowleft`, `arrowright`.
   - Arrow keys & WASD scroll prevention: calls `event.preventDefault()` when `manual === true` and target is not `INPUT`, `TEXTAREA`, `SELECT`, or `BUTTON`.
   - Telex/Unikey IME compatibility: WASD inputs register immediately via `event.code` even when Vietnamese IME transforms the characters.
   - Window blur handler: clears key set on `window` blur to prevent stuck keys when switching tabs or applications.
   - Movement speed: increased ship speed from 240 px/s to 360 px/s for snappy, immediate pilot responsiveness.
   - Physical lines: 111 (<= 250).

2. `client/chat/irc.js`:
   - In `socket.onopen`: updated status notification to `onStatus('CONNECTED TO #' + name.toUpperCase())`.
   - Physical lines: 25 (<= 250).

3. `client/main.js`:
   - Twitch CONNECT / DISCONNECT toggle on `#connectTwitch`:
     - If `twitch` is active: calls `twitch.close()`, sets `twitch = null`, updates button label to `'CONNECT'`, updates `#liveStatus` to `'DISCONNECTED'`, and returns early.
     - On connect initiation: in status callback, if status starts with `'CONNECTED TO'`, updates button label to `'DISCONNECT'`; otherwise reverts to `'CONNECT'` and sets `twitch = null`.
     - In catch block: ensures button label is `'CONNECT'`, sets `twitch = null`, and displays `'INVALID CHANNEL'`.
   - Physical lines: 236 (<= 250).

4. `client/ui/crowd-tabs.js`:
   - Extracted `wireCrowdTabs()` from `client/main.js` following SRP to maintain `client/main.js` strictly at 236 lines (<= 250 lines).
   - Physical lines: 26 (<= 250).

## Product Files Freeze Inventory — SHA-256 and Physical Lines

| File | SHA-256 | Lines |
| --- | --- | ---: |
| README.md | ac6c827ed64e717dcc58cc460729499af62647d3e51f3cfcd84e2e99603d0907 | 50 |
| client/audio/sfx.js | dc63a7eb8e98f9d07620dae88b7c6884bd1ec99a966f34dfcfed079c4e3ee62e | 31 |
| client/cartridges/library.js | c103bd8449ad6336dd4cb875f4f00a053e0d4ba482b408b4df0def8d518bf4f8 | 70 |
| client/chat/irc.js | 37d502b2a6a9985be8c428fee5e6f3bf8c77bdfccd07e0099d4e0570177d1886 | 25 |
| client/chat/parse.js | e89e14d55bd51e312cdfa8bbea4e917dd86509df487b2a84eddbe9fe93b95134 | 60 |
| client/chat/simulator.js | 3a7a80c30dff73eb6c09ed1b41d5b31d673d734a56eae5a4d22aac76a9699e56 | 16 |
| client/game/arcade.js | 9a48cb35720c4828bf55536927432f3a30cdeec71c5aec6580b6a95899287dfb | 111 |
| client/game/combat.js | 7ca4e112895093ee87d677e8c26c890220e17e80f4b22d2d0ea63e3ff1783f9e | 46 |
| client/main.js | 88a028eae8451416e7e96a32f4371358fdfe3bdc539efc6a5244fc2dc099025c | 236 |
| client/overlay/artwork.js | 4a0327126575eb780bdd52e5681f7367ce13b289155b3c7e17cb43ffbb63f0e3 | 67 |
| client/overlay/engine.js | 486699f6a1cfa081d5f0cbaefe0a9a0d2cf45e0419c60f658d6f07a852a7568f | 144 |
| client/overlay/physics.js | 0ae19c1338790cd74217af2b92d8e01400a4eb34a49c2a7cfddd3d6b0ab6b5ed | 32 |
| client/overlay/standalone.js | c57ee72ffc20857b52cc141c99fc4fc478b521583799cf96f20862a10a7ffe50 | 16 |
| client/round/compile.js | 3a3be306b08358e8f86701fedc93c06443ce9a2d162b8ca16acac19532e35bc5 | 18 |
| client/round/controller.js | 597203a068c7912681712ce54ecbe2fc62dac78ca29380871851f4e55f18b272 | 140 |
| client/round/poll.js | b979394e40bf45d1fa338d5ce1ef1e91255c0b91db185afb117e3f73975570ca | 13 |
| client/styles/handoff-01.css | 0f18e4ae99126a17c2ad220bb6d4f52a8d3290ed1be43e695aac9245b9bc147c | 215 |
| client/styles/handoff-02.css | 51ecfb07b998311e43da290c88e848f0d19c648b3c1ec1ad32b7d2feb35e7de8 | 217 |
| client/styles/handoff-03.css | cb6aa5819b7283cbc0b41d865b7b57a1bcd734d6ef0b13ac542c84cbdffe6200 | 208 |
| client/styles/handoff-04.css | bf6a538dbc02440016daba99cbea1e776bad0079327979cbc7c83ec65c95a8a0 | 216 |
| client/styles/handoff-05.css | 2fccc94328f8dfc68155a0921564075913579157e2dd36084f69113278773128 | 215 |
| client/styles/handoff-06.css | 89a4af65de3f73ecf668d5a981abac688258674feeafb55e9d208c071f2a9f2a | 221 |
| client/styles/handoff-07.css | 747c8f1b7706ea1d953da2399e6ba3e283961341314c2178007458bb06ec75ff | 221 |
| client/styles/handoff-08.css | 0ff6075ebfbf131245bba53b03d05da149cc0389e69811f9e0f6c3edbc13784e | 221 |
| client/styles/handoff-09.css | b831c4796edb2891efd9ee651288f3884b66e0cd8a7f53304dfcebbe2d28c236 | 221 |
| client/styles/handoff-10.css | d0981df4265859012d339f847b1f0d2c84f5fee10ed99e65351c5f5ce75b0420 | 172 |
| client/styles/main.css | 03cbc89ccbb069aef00caf37b033101ecb43e46802a46d7988ae6fa1915ce3f9 | 68 |
| client/styles/obs.css | 295a8831ef39b73b164abd4b446b8d3303cb94a9a9682ace1fc12deb651e5927 | 22 |
| client/sync/channel.js | 5ed13a02724090157b450b14991dc95a4a1fba1bf02a2d26e086c67c1fd8f1a4 | 62 |
| client/sync/raid.js | b2257d85058d79c51322b09c3d69acb6b9683665d1886b28c8229cdbdf1c4a79 | 21 |
| client/sync/socket.js | 27c7be3ca3960d77314370f2d0b0be2fc5d0609696c690944e5c8c6d81c5f5bd | 30 |
| client/ui/crowd-tabs.js | f5c1584ff8c542cc298350735778645da96683d222e1fd60577d7ceda3dda1f8 | 26 |
| client/ui/deck.js | 431d950d7982b91835777de2fabac2f39deda8e859941d3efe7ce6d63b4fe65a | 50 |
| client/ui/obs-link.js | 912d89598e28e82a96e513a12eca52bf7dddf8eca3270e58b2e755429c79b3fb | 13 |
| client/ui/overlay-view.js | 4f770bd927cb53630300e6e8e1517269f4409e952c093306b17a8c2e0906e69f | 35 |
| client/ui/raid-controls.js | a3cece56f98465af90744595ccafdbb57ece5d7e284382f99d61bab58d6ba556 | 29 |
| client/ui/shell.js | e8fc78dc80096d90cf085517589c178b411c6fd8561a83d7016f36076eba6de9 | 38 |
| client/ui/stage.js | 9a136276a14406de2fd2f173618b1cf39ff0fa28a3fd739974607e96ae1d608c | 63 |
| design-system.html | 19a1a150299f5cd198b1d70c53fa3ee2739c7fe2cfba55ecec400f9a89270fd4 | 161 |
| index.html | 84f7d3814a3f2a15f3cb90909683f44012861d788231ca26364277af1cbe15b3 | 20 |
| overlay.html | 8034b796b4ec68f4dcc26a5f3838772e55702ef849d8ccf497049f239785733a | 16 |
| package.json | 8a6f2c2c507376bb5d1652023a3f231a585fc8a735f6e1f1b7bc964d8b623510 | 12 |
| server/access.js | 7dedccd45f8befee1c10f498251f7e571cd2e4172487553328f92ff5cb00b8fb | 32 |
| server/compiler.js | 3f319bafa1f4495a6d89497e8c4c31d8390fdb78ad84279002d2b87e8b09397b | 40 |
| server/http.js | ed9604a0748fce27d11218379495242715cd740fefe36801103f444eacc76cec | 53 |
| server/index.js | 9805f9a6774d9b28f14ae7bdbade5e39cd8457af86dfb790042a29c9f249d47f | 19 |
| server/openai.js | 9c1be75fed1c236db682168d72150765cd769b39778b13911a559ba651bd2b3d | 36 |
| server/rooms.js | 9e94a7ccf4fcd51c9e4a53312db1706d4fa70872e5b51182b20349d50167d08a | 66 |
| server/ws.js | ecb1d930c05d44d97d4c4f306d0a88538e928f983cf68af3b3c06571023a3c89 | 65 |
| shared/ast-schema.js | a20bda415d6999d520e5e9f3d95536c7922c92454ae65fb9c5233e78b29bac36 | 18 |
| shared/ast-validate.js | 59377546d74a39d70d93ecb4377b27fe7ee1114ce5c59c5069ffd69c41200cce | 22 |
| shared/cartridges.js | a41c6917e2125e1096ea621155b956b10e95a4b6bdfdbd68bbb32621f11c9003 | 9 |
| shared/safety.js | 35f0c09db52c152ba7ede2ccb2e253e7b09e47ea30ccb1ea41625e5dcb765687 | 17 |
| shared/sync-contract.js | 95492c4385b6acdb8df96cf6e2ebf2718ec130f7782d579e851c32bb6d6725d6 | 6 |
| shared/synthesize.js | 9f5bc54b0cb01884259b5a9f601865cdd26490bd5970a7a92c256af17c99a091 | 87 |
| test/access.test.js | 3fe66e202152938073921b42f4fb291094b2e1249c4f184ccb61057dcbad2923 | 35 |
| test/ast.test.js | ecde98122e40916cc1a499e675b2a850b985ac94cfccb56e9dcdadbf03c36e1a | 73 |
| test/browser-controls.js | 2932fc9bbfb243e4d1d542b554fc9fd2df1d9ce5847427a22568510633a0a18b | 46 |
| test/browser-measure.js | 545294e7ed9c01195f920ddc45ccb7af486bedc7fc3ca69e9fd12b53db4668f4 | 36 |
| test/browser-regression.js | 366a10e9a14eaf16452c8ab5639e3869b6f3b5da8716a55615fb33ae0ba09295 | 65 |
| test/browser-smoke.js | 89328b1d32e751bec281a20d6a28920759c3d249c38b224fdcc5f80b669557bb | 44 |
| test/chat-parse.test.js | 066b2313859554528fbff0aae37cd0bfedb73dde1097fdd51fca93e0fe0d0319 | 40 |
| test/combat.test.js | 3020274ed81e6821e258181f56037cf6f63cbe72b620390871309d570dd830f3 | 27 |
| test/compiler.test.js | 86c175d84ab24aca709d26b22023b15c132cf21a7bb7b83a060f7866195a7654 | 108 |
| test/design-system.test.js | 67de1300f95d7a62db0732c957c373b44462d77e509efde6fc4b2eed08167ed6 | 19 |
| test/obs-link.test.js | c7f2e01c81fb604b6616f9975acd0e321cd4d4e1ef3d5b56708dfd5d3628a8d6 | 19 |
| test/overlay.test.js | 372e57f3431a768421f089a6553ce6bcdc94ea2f2d03db654b179f709799ca40 | 77 |
| test/physics.test.js | 00c79ba0e331a55ad15be6ae15a9e2bd030008d3e1fac4c2a2740a15ef9ef155 | 44 |
| test/rooms-unit.test.js | 378484f22ed6ebcf9caa967394fcf474bf0c79fbc01672f32e855ab6db24dfd5 | 68 |
| test/round.test.js | dee99a2694f5422a6c9a062b38639dbe1972e309ad526719132c4d2a526ea2e4 | 72 |
| test/server.test.js | af3024bb4cb654fb258f4f90e49b683068dbbe122082746ca3aef1265bac29b5 | 110 |
| test/sfx.test.js | f5fc07c2e72a2a072766bfca7f31b8036734566d62dbfcb2de397b735c3171bf | 25 |
| test/sync-poll.test.js | fb594c9dfbfd44bbcd17db9c110a09849567fd65e5815c9311e175e42bc1e715 | 49 |
