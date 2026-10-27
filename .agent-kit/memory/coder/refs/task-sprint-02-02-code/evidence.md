# Evidence — task-sprint-02-02-code, coder r1

- Node `v24.22.1`; `node --test test/*.test.js`: 9 passed, 0 failed, 0 skipped (231.8143 ms total in the final run). First run 8/9 exposed an emote boundary bug; fixed and rerun.
- `git diff --check`: exit 0; checks tracked diff only, because all new source/test files are untracked.
- SHA-256 of `git diff HEAD -- <request scope>`: `ab8e13f9bce3eaf0405b3c6f3df03ccc0f7845c641eff2774328df86585ff9e1`; untracked files are listed below separately. HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`.

| File | SHA-256 | Physical lines |
| --- | --- | ---: |
| client/chat/parse.js | e89e14d55bd51e312cdfa8bbea4e917dd86509df487b2a84eddbe9fe93b95134 | 59 |
| server/compiler.js | 39fe207577ec9737124e5dc370d029b7cbaa7408e538900c6e7262347cc3de43 | 36 |
| server/openai.js | 256e2de35a97e84647d901aa8218426dc47ca83db769f82f3abfd08c2fc78e2f | 20 |
| shared/ast-schema.js | a20bda415d6999d520e5e9f3d95536c7922c92454ae65fb9c5233e78b29bac36 | 17 |
| shared/ast-validate.js | 59377546d74a39d70d93ecb4377b27fe7ee1114ce5c59c5069ffd69c41200cce | 21 |
| shared/cartridges.js | a41c6917e2125e1096ea621155b956b10e95a4b6bdfdbd68bbb32621f11c9003 | 8 |
| shared/safety.js | c7fd7303a6b33f48ab5e4dfd64539b9a4134a7a0586dfc703ef14ad625a18ff2 | 9 |
| shared/synthesize.js | 3b482b24b0277cdf3591666d78c731869d3fc3693eb8345c70c6801f53635a86 | 25 |
| test/ast.test.js | 0597ca0f7e466ba8b1c502b6613a73127507dfe3f5055882582be725c1dc61f5 | 32 |
| test/chat-parse.test.js | 066b2313859554528fbff0aae37cd0bfedb73dde1097fdd51fca93e0fe0d0319 | 39 |
| test/compiler.test.js | 27dc09495966a1c71b7e4e8355909374c8460fa3e4cc15a28ebb50f768ab33de | 54 |
