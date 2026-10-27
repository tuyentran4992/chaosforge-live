# Evidence — coder r2

- HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`.
- Scope diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0` (does not include untracked files).
- Scope status:
```
 M .agent-kit/specs/ARCHITECT.md
 M .agent-kit/specs/DESIGN.md
 M .agent-kit/specs/TECHSTACK.md
 M .agent-kit/specs/design-handoff/DESIGN-HANDOFF.md
 M .agent-kit/specs/design-handoff/DESIGN-MANIFEST.json
 M .agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md
?? client/cartridges/library.js
?? client/chat/irc.js
?? client/chat/parse.js
?? client/chat/simulator.js
?? client/game/arcade.js
?? client/main.js
?? client/overlay/engine.js
?? client/overlay/standalone.js
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
?? client/ui/deck.js
?? client/ui/overlay-view.js
?? client/ui/shell.js
?? client/ui/stage.js
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
?? test/ast.test.js
?? test/browser-controls.js
?? test/browser-smoke.js
?? test/chat-parse.test.js
?? test/compiler.test.js
?? test/server.test.js
```

- `npm test` (Node v24.22.1): 12 passed, 0 failed, localhost HTTP/WebSocket tests required elevated loopback.
- `npm start`: server started on port 3000 and was accessed by browser; stopped after testing.
- `playwright-cli -s=chaos run-code --filename=test/browser-smoke.js`: 45 document-width checks, no document-level horizontal overflow; judge compile DUCK, OBS tab active, panic and SFX OFF, hype enters voting then active with 500 displayed.
- `playwright-cli -s=chaos run-code --filename=test/browser-controls.js`: observed 17 cartridges in browser storage, mod approval, blocked notice, Space ignored in textarea and panic outside, and distinct room did not receive event.
- Browser smoke is not pixel comparison or proof of no clipped descendants. Screenshot: `stage-r2.png`. No real API, real Twitch or two-machine test.

## Untracked product files — SHA-256 and physical lines

| File | SHA-256 | Lines |
| --- | --- | ---: |
| `client/cartridges/library.js` | `f5b13882b26baab6f9f5523be6423689d73848133e632317918383de74b51fac` | 39 |
| `client/chat/irc.js` | `02cd2042d3ef1b39aa45ad4b58881082f3d7f6858b48b8c174eb6feabad7d8c3` | 23 |
| `client/chat/parse.js` | `e89e14d55bd51e312cdfa8bbea4e917dd86509df487b2a84eddbe9fe93b95134` | 59 |
| `client/chat/simulator.js` | `3a7a80c30dff73eb6c09ed1b41d5b31d673d734a56eae5a4d22aac76a9699e56` | 15 |
| `client/game/arcade.js` | `7aa9496b92b137bb2d46bcb8c2919dabe10b218d9be8ba9d77c81035a6927ec1` | 36 |
| `client/main.js` | `2e7ee6a45d51dc314d002149e9a3e2d029c5d626b04746117d77caee982a7057` | 208 |
| `client/overlay/engine.js` | `a2c2ba57248fd2cbb3c2e9fa2124f89ac51d1e1d7fb80fea350230e56f9f40d9` | 91 |
| `client/overlay/standalone.js` | `a8f8dd6eeb49da132f688efe2110ea8acac2d4c07ee6bbb39613af5605fa7aee` | 12 |
| `client/round/controller.js` | `e88d43decd30187ae1b9662ac8e6c7b46e028c6f2c2f74c54b20da3c6662a805` | 120 |
| `client/styles/handoff-01.css` | `0f18e4ae99126a17c2ad220bb6d4f52a8d3290ed1be43e695aac9245b9bc147c` | 214 |
| `client/styles/handoff-02.css` | `51ecfb07b998311e43da290c88e848f0d19c648b3c1ec1ad32b7d2feb35e7de8` | 216 |
| `client/styles/handoff-03.css` | `cb6aa5819b7283cbc0b41d865b7b57a1bcd734d6ef0b13ac542c84cbdffe6200` | 207 |
| `client/styles/handoff-04.css` | `bf6a538dbc02440016daba99cbea1e776bad0079327979cbc7c83ec65c95a8a0` | 215 |
| `client/styles/handoff-05.css` | `2fccc94328f8dfc68155a0921564075913579157e2dd36084f69113278773128` | 214 |
| `client/styles/handoff-06.css` | `89a4af65de3f73ecf668d5a981abac688258674feeafb55e9d208c071f2a9f2a` | 220 |
| `client/styles/handoff-07.css` | `747c8f1b7706ea1d953da2399e6ba3e283961341314c2178007458bb06ec75ff` | 220 |
| `client/styles/handoff-08.css` | `0ff6075ebfbf131245bba53b03d05da149cc0389e69811f9e0f6c3edbc13784e` | 220 |
| `client/styles/handoff-09.css` | `b831c4796edb2891efd9ee651288f3884b66e0cd8a7f53304dfcebbe2d28c236` | 220 |
| `client/styles/handoff-10.css` | `d0981df4265859012d339f847b1f0d2c84f5fee10ed99e65351c5f5ce75b0420` | 171 |
| `client/styles/main.css` | `7105af4c545bc8cd4f2ec5000888f17252d2683211e676b1b708899b4789d58f` | 15 |
| `client/styles/obs.css` | `db19dbca3e859bf824bc045f956d88475a536edd7cf5845050ab422f7d15d95d` | 10 |
| `client/sync/channel.js` | `d84ba99046167b21b0bd9d02806a502756d81ae0006101ff196ce0b1719a761c` | 80 |
| `client/ui/deck.js` | `e8fc1b21c522b1330cebe7ccb38ad0b6c6cecd7a042ac484c1b8101e60e67062` | 49 |
| `client/ui/overlay-view.js` | `d287fdfcd903488a2c26d520061dbfd4dbf7cd1b203a79dee2cecf84981ddabf` | 31 |
| `client/ui/shell.js` | `e8fc78dc80096d90cf085517589c178b411c6fd8561a83d7016f36076eba6de9` | 37 |
| `client/ui/stage.js` | `b0d99affe0235ed7382c65e47719867aa8f8a643e11f89e13b5ecdb180ce76d3` | 59 |
| `design-system.html` | `84d1c0570bc0de05182f63f3b8c0e3fa42004693a1d9ec309a9613cab06675ae` | 57 |
| `index.html` | `994ff996360ad3211c0b6916c6b543db69f45c7e9a1881e191ba3caee735f9a9` | 19 |
| `overlay.html` | `3c037ac69cbff96f688446f7c0ebd65cb3e5b9d23a51ee5d9b3ff52f64f480bd` | 14 |
| `package.json` | `8a6f2c2c507376bb5d1652023a3f231a585fc8a735f6e1f1b7bc964d8b623510` | 11 |
| `server/compiler.js` | `39fe207577ec9737124e5dc370d029b7cbaa7408e538900c6e7262347cc3de43` | 36 |
| `server/http.js` | `c8fa6510f8df8e5440b022203142f8e7187e53b899b4f5aa0948c925f414ceec` | 46 |
| `server/index.js` | `a3b2ba583d643cbf983d01c6fc1b7d59c1700de0f9b1f29ae8130dafaea9aee4` | 17 |
| `server/openai.js` | `9c1be75fed1c236db682168d72150765cd769b39778b13911a559ba651bd2b3d` | 35 |
| `server/rooms.js` | `cd770fca2cd2b6ddfe5fd0d07356ecb3cfb93d943576892049390102a3c30007` | 43 |
| `server/ws.js` | `413cd1e369156bb9c6ac2997f71473509f862e1f82d1ca3e7a8abeb39c72f25f` | 62 |
| `shared/ast-schema.js` | `a20bda415d6999d520e5e9f3d95536c7922c92454ae65fb9c5233e78b29bac36` | 17 |
| `shared/ast-validate.js` | `59377546d74a39d70d93ecb4377b27fe7ee1114ce5c59c5069ffd69c41200cce` | 21 |
| `shared/cartridges.js` | `a41c6917e2125e1096ea621155b956b10e95a4b6bdfdbd68bbb32621f11c9003` | 8 |
| `shared/safety.js` | `c7fd7303a6b33f48ab5e4dfd64539b9a4134a7a0586dfc703ef14ad625a18ff2` | 9 |
| `shared/synthesize.js` | `3b482b24b0277cdf3591666d78c731869d3fc3693eb8345c70c6801f53635a86` | 25 |
| `test/ast.test.js` | `0597ca0f7e466ba8b1c502b6613a73127507dfe3f5055882582be725c1dc61f5` | 32 |
| `test/browser-controls.js` | `2932fc9bbfb243e4d1d542b554fc9fd2df1d9ce5847427a22568510633a0a18b` | 45 |
| `test/browser-smoke.js` | `57e2ef13c6a1d4bad6113e20755783385274a6257a6bb61e4c2b8fd0ad31b584` | 43 |
| `test/chat-parse.test.js` | `066b2313859554528fbff0aae37cd0bfedb73dde1097fdd51fca93e0fe0d0319` | 39 |
| `test/compiler.test.js` | `cd77348e31d8687704136167411a366ac51ff5cfa6da5b6eb1e5122a6ac24954` | 66 |
| `test/server.test.js` | `7ca2763464b2ce8e6b89e28db52d08fdf1b039091cf324c22dbf1fd7a8f68b06` | 59 |
