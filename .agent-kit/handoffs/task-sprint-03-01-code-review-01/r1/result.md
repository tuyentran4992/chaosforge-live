# Result — independent code review r1

- Task `task-sprint-03-01-code`, handoff `task-sprint-03-01-code-review-01/r1`; role `code-reviewer`, instance `/root/code_reviewer`.
- Status: **finished — findings open**; đã dừng đọc snapshot. Không sửa source.
- Snapshot sau review: HEAD `5ad45d22fe9a0ee98f318e6d151322e9d086ade4`; status scope khớp freeze-r1 (15 modified, 4 untracked); SHA256 raw `git diff HEAD -- <scope>` `1a0d5f3b767e66e21db6fc45fca77f384a7ddfd7cfe716aa2dce31002eb37fea`. Bốn untracked SHA256 lần lượt `b46aaa6aa0e9d909d60d49bd2807bba530701481ce310f69335d3c4c7819753a`, `95a504cc4357bbe3acc9e693f52cceae8ef844da6d02851247c0f303766e5982`, `aba7da3d1face52df2b59d2ac94f30ae82ab549b8a0bcd3a29902d23a5e9ce94`, `f14a78c449f32c6f8f6862da63e912ed08962d4a0d9a3f6633025344196f63cf`, theo thứ tự paths trong freeze-r1. Không thấy nguồn đổi trong hai lần chụp snapshot.

## Findings

**CR-01 — P2: Phủ định hiệu ứng không thắng từ khóa cùng loại ở vế dương.** `shared/synthesize.js:66-70`. Tái hiện: gọi `synthesize('doge and bonk but without bonk sound')` hoặc `synthesize('doge and boom nhưng không boom')`. Kỳ vọng âm thanh bị loại trừ không phát; thực tế lần lượt trả `sfx: 'bonk'` và `sfx: 'boom'`. Mệnh đề phủ định được tách nhưng kiểm tra `excluded` chỉ áp dụng khi `!hasSfx`, nên từ khóa ở vế dương vẫn thắng yêu cầu loại bỏ rõ ràng. Ảnh hưởng: prompt meme thường dùng tên bonk để chỉ entity mà không muốn âm bonk vẫn phát âm bị cấm; kiểm thử mới chỉ thử `doge but without bonk` mà không có từ khóa trùng ở vế dương. Evidence: `.agent-kit/memory/code-reviewer/refs/task-sprint-03-01-code/evidence-r1.md`.

**CR-02 — P2: Va chạm thực thể không tạo reaction trên OBS standalone.** `client/overlay/engine.js:92`, `client/overlay/engine.js:105`, `client/main.js:24-26`, `client/overlay/standalone.js:9-13`. Tái hiện: deploy một patch, để arcade bắn trúng thực thể và xem OBS Browser Source standalone. Kỳ vọng reaction khi va chạm thực thể theo request; thực tế `remove()` chỉ được gọi cho hai preview tại local `main.js`, còn standalone chỉ xử lý sync panic/clear/state/reaction/deploy, trong đó `reaction` chỉ tăng combo. Không có sự kiện hit được chuyển tới standalone; nhãn reaction trong `remove()` không xuất hiện ở đó do hit. Physics còn chỉ kiểm biên, không kiểm va chạm giữa các thực thể (`client/overlay/physics.js:14-28`), nên cũng không có callback cho va chạm entity-entity. Ảnh hưởng: khán giả OBS bỏ lỡ reaction va chạm thực thể; kiểm thử mới chỉ mô phỏng va chạm biên hoặc gọi `clear(true)` trực tiếp. Cần xử lý trong giới hạn contract signaling được phép hoặc xin Lead/PM quyết định nếu cần thay đổi protocol.

## Phạm vi và checks

- Đã xem diff và source mới, schema/validator/synthesizer, artwork, physics/reactions, audio/mute, preset, luồng caller/sync, tests, story/DESIGN/plan. Không xác nhận toàn bộ sản phẩm hoặc tính đúng của audio bằng tai.
- `npm test`: **38/42 pass**, 4 server integration tests fail trong sandbox: kết nối loopback bị `EACCES` và WebSocket `ErrorEvent`; không báo suite pass. Các test meme và overlay mới đã pass. Cần chạy lại suite trong môi trường thử cho phép loopback.
- Tự đếm 72 codefiles trong `client/`, `server/`, `shared/`, `test/`; tối đa 235 dòng, không có file vượt 250. Chi tiết đếm changed files và lệnh/evidence tại `.agent-kit/memory/code-reviewer/refs/task-sprint-03-01-code/evidence-r1.md`.
- Chưa đo coverage 100%, latency, 60 FPS, render thực và âm sắc/mute lifecycle bằng thiết bị thật; các acceptance tương ứng còn cần verify. Remote provider live không được gọi.
- Next: Lead-Code tổng hợp cả hai review rồi giao Coder sửa; yêu cầu re-review độc lập trên snapshot mới.
