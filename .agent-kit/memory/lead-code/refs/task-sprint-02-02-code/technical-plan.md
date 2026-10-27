# Technical plan — task-sprint-02-02-code

Revision `r3`, đầu vào HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, `phase-02 / sprint-02`, `us-006/007/008`. Supersedes `r2`. PM đã chốt 3 quyết định chính sách sản phẩm/UX chính thức trong các specs chuẩn:
1. Local fallback scope & clause-level negation stripping (`shared/synthesize.js`, `server/compiler.js`): tách ranh giới mệnh đề, loại trừ mệnh đề phủ định (`avoid any effect with gravity upside down` -> `gravity > 0`), cờ `uncertain: true` & tag `'uncertain'` khi không khớp từ khóa dương tính nào, hiển thị nhãn `LOCAL (DEFAULT)` trên `#telCompile` và `✓ AST SAFE · DEFAULT FALLBACK` trên footer compiler HUD `[data-verified]`.
2. Kiến trúc ToS Safety 4 Lớp: bổ sung bộ lọc `isUnsafePrompt(idea)` trong `client/round/controller.js` trước khi đưa ý tưởng vào Poll công khai trên OBS.
3. Hiển thị Poll dài trên OBS: bỏ `-webkit-line-clamp: 2` và `max-height` cố định trên `.ov-idea__text`, triển khai cỡ chữ thích ứng (`data-len="sm|md|lg"`) để hiển thị toàn bộ 160 ký tự cho cả 3 lựa chọn trong khung `340 × 352 px` (`scrollHeight <= clientHeight`) không bị cắt chữ và không tràn khung.
Ghi nhận Primary Codex Session ID `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2` vào `README.md`.

## Boundaries và line budget

Mọi file code (JS, HTML, CSS, test, script) ≤ 250 dòng vật lý, không ghép/minify để lách. Mục tiêu 180–220 dòng/file.

| Paths/boundary | Contract & Updates trong r3 |
| --- | --- |
| `server/index.js`, `server/http.js`, `server/rooms.js`, `server/ws.js` | Serve surfaces, compile endpoint, validated WebSocket và room relay; hạn chế kích thước, path traversal, lỗi rõ ràng. |
| `shared/synthesize.js`, `server/compiler.js` | Tách câu theo ranh giới mệnh đề (`[.;,!?]` hoặc từ nối `\b(?:but|however|yet|though|although|while|except|and|nhưng|mà)\b`), loại bỏ mệnh đề phủ định trước khi dò hiệu ứng dương tính. Trả `uncertain: boolean`, tag `'uncertain'` khi không khớp từ khóa dương tính nào. Giữ `gravity > 0` cho `avoid any effect with gravity upside down`. |
| `shared/ast-schema.js`, `shared/ast-validate.js`, `shared/safety.js`, `shared/cartridges.js` | AST allowlist/validation; 4-layer ToS safety architecture; closed-world AST whitelist (`duck/ball/star/boss`, synth sfx); fallback `RESCUE RUBBER DUCKS`. |
| `client/round/controller.js`, `client/round/poll.js`, `client/round/compile.js` | Lọc `isUnsafePrompt(idea)` trong `addIdea(idea)` từ chối đưa ý tưởng vi phạm vào Poll. Xử lý hiển thị `uncertain: true` thành `LOCAL (DEFAULT)` và `✓ AST SAFE · DEFAULT FALLBACK`. |
| `client/styles/main.css`, `client/overlay/engine.js`, `client/ui/overlay-view.js` | Bỏ line-clamp trên `.ov-idea__text`. Thuộc tính `data-len="sm|md|lg"` co font/line-height/padding linh hoạt để cả 3 ý tưởng 160 ký tự đều hiển thị trọn vẹn trong `340 × 352 px`. Dòng HUD chữ: `16 px base (auto-scales for long poll ideas)`. |
| `client/chat/irc.js`, `client/chat/parse.js`, `client/chat/simulator.js` | IRC handshake/PING/PRIVMSG; `!forge`, votes `1/2/3`, `!shield`, `!boost`, emote; simulator cùng event, English. |
| `client/sync/channel.js`, `client/sync/socket.js`, `client/sync/events.js` | BroadcastChannel và WebSocket, ID chống echo, sync snapshot khi reconnect; room 4 ký tự; validate payload. |
| `client/cartridges/*.js`, `client/game/*.js`, `client/audio/*.js` | Sáu trạng thái, poll 15s, active 30–45s, persistence; safe zone alpha 0.70; panic clear `< 100ms`. |
| `index.html`, `overlay.html`, `design-system.html`, `client/ui/*.js` | Studio `#/stage, #/overlay, #/deck`, OBS overlay độc lập, Design System độc lập. |
| `test/*.test.js`, `test/browser/*.js`, `README.md` | Cập nhật tests kiểm tra clause-level negation, uncertain flags, pre-poll safety, adaptive poll rendering font sizes, 340x352 scrollHeight <= clientHeight; Primary Codex Session ID `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2` ghi trong `README.md`. |

## Thứ tự và verify

1. Giao việc cho Coder (`coder`) qua subagent với handoff `r7`. Chờ Coder hoàn tất, kiểm tra bảng SHA-256 và line counts (tất cả file ≤ 250 dòng).
2. Chốt freeze snapshot `freeze-r7.md`.
3. Gửi snapshot `freeze-r7.md` độc lập cho `code-reviewer` và `ux-ui-reviewer`.
4. Sau khi cả 2 reviewer hoàn tất, Lead-Code tự thực thi kiểm thử tích hợp thực tế:
   - Chạy `npm test` bao gồm `test/server.test.js`.
   - Khởi động server thật trên localhost.
   - Kiểm tra browser/OBS thực chạy, kiểm tra 9 viewport, đo timing compile `< 2.5s`, panic clear `< 100ms`, safe zone alpha 0.70, 60fps.
5. Tổng hợp kết quả vào `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/result.md` và gửi tin nhắn hoàn thành cho PM.
