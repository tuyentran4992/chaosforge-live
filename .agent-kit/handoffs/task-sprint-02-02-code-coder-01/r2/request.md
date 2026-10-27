# Coder request — delivery revision r2

Bạn tiếp tục duy nhất role `coder`, instance `/root/coder`; revision `r2` supersedes r1 sau khi bạn đã freeze và dừng ghi. Không giao agent khác. Request không cấp thêm quyền. Đọc lại role card, HANDOFF, CODE-STANDARDS và request này.

## Định danh và input

- Task `task-sprint-02-02-code`, handoff `task-sprint-02-02-code-coder-01/r2`. Người gửi `lead-code` `/root` Codex; PM owner Antigravity session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `C:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase `phase-02`, sprint `sprint-02`, stories `us-006`, `us-007`, `us-008` ở `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/`.
- Snapshot chính xác gồm HEAD, scope status, diff hash và SHA-256 11 file untracked: xem `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/request.md` mục Project và snapshot. HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, tracked scope diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`. Kiểm lại toàn bộ 11 hash, status và HEAD trước khi sửa, ghi ack `confirmed` kèm instance ID; lệch thì dừng.
- Plan `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/technical-plan.md`, SHA-256 `fb32da26c1a2876b4a03c1e5237de6217f9ddb540fe15ea41281846fc223af87`; đọc cả PM resolution `.agent-kit/memory/pm/refs/task-sprint-02-02-code/conflict-screen-file-resolution.md` và parent request r2. Ba entry đã chốt: `index.html` chứa `#/stage`, `#/overlay`, `#/deck`; `overlay.html` và `design-system.html` độc lập.
- Các thay đổi ngoài scope cần giữ: `.agent-kit/specs/backlog/`, `.agent-kit/memory/pm/`, `.agent-kit/user/` và mọi thay đổi hiện có ngoài vùng được giao. Không sửa nguồn gốc `.agent-kit/specs/design-handoff/`.
- Được đọc: các inputs parent request r2, plan và resolution, source/tests sản phẩm và role files cần thiết. Được ghi: source, assets, config, scripts, automated tests tại project root ngoài `.agent-kit/`; `.agent-kit/memory/coder/`; ack/result của handoff này. Không ghi specs, PM memory, handoff của người khác. Không commit/push/deploy/gửi ra ngoài/chi tiền.

## Delivery

Hoàn thiện toàn bộ `us-006`, `us-007`, `us-008`, acceptance tích hợp sprint và plan. Giữ, mở rộng hoặc sửa 11 file r1 phù hợp; không giả định domain hiện có là hoàn chỉnh. Cụ thể:

1. HTTP server/static routes, `/api/compile` có backend OpenAI Structured Outputs bằng env key + deadline + deterministic local fallback, schema validation; không lộ key, không `eval`, không gọi API tính phí để test nếu chưa được cấp quyền. Test transport mock.
2. UI tái hiện design handoff: token, typography, kích thước, IDs/classes/data, responsive và controls; 100% English và `lang=en` trên 3 entries. Tách HTML/DOM, CSS, JS theo SRP, mọi codefile gồm tests, scripts, config có logic và HTML/CSS/JS ≤250 dòng vật lý; không minify/ghép dòng né giới hạn.
3. Arcade auto/keyboard; 2D physics, safe zone `[384,1536] × [216,864]` ở 1920×1080, spawn edge ring, opacity 0.70 khi đi qua; Space ngoài input và nút panic xóa ngay HUD/entities + mute SFX; BroadcastChannel + WebSocket đồng bộ index ↔ OBS, tránh duplicate và xử lý late join.
4. Poll 15s, 6 states, crowd 500 chat English, Twitch IRC WebSocket handshake/PING/chat/votes/commands/emote; cartridge library lưu/triển khai; raid 4 ký tự, hai client/máy cùng server gửi nhận. Validate mọi input/payload, không render code tùy ý.
5. Thực chạy lệnh start, automated unit/integration và browser/UI checks; thử 9 viewports và các trạng thái trong khả năng công cụ, nêu evidence và phần chưa chạy. Không tuyên bố pass nếu chưa thực đo, đặc biệt 60fps, 0% crash, các latency, visual 100%, live Twitch/OpenAI. Không cần kết nối thật hay gửi prompt ngoài để kiểm mock.

Sau khi hoàn tất, freeze: ghi `result.md` theo template, HEAD, tracked diff status/hash và từng file untracked kèm SHA-256; đếm từng codefile, lệnh/test, contract, findings và giới hạn. Ghi mọi lệnh cài/start/test và phiên bản đã kiểm trong report để lead cập nhật TECHSTACK. Dừng ghi và báo lead. Không tự sửa khi reviewer đang đọc; chờ lead tổng hợp hai report.

## Files

- Request `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r2/request.md`.
- Ack `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r2/ack.md`.
- Result `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r2/result.md`.
- Evidence `.agent-kit/memory/coder/refs/task-sprint-02-02-code/`.

## Prompt relay dự phòng

Tiếp tục đúng instance `coder` `/root/coder` tại project `C:/Users/ADMIN/Desktop/Projects/hackathon`; đọc `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r2/request.md`, xác nhận snapshot, ghi ack rồi hoàn thành delivery được giao.
