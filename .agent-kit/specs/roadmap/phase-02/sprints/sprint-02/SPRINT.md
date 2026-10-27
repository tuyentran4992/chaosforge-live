# SPRINT — phase-02 / sprint-02

Trạng thái tài liệu: Đã hoàn tất (`done`). ID: `sprint-02`, thuộc [phase-02](../../PHASE.md).

Sprint kind: `delivery`. Delivery domains: `code`. Story cap: 3 / `sprint.maxStories` (6, xem [CONFIG](../../../../../protocols/CONFIG.md)).
Pointer duyệt Sprint `design`: Đã duyệt tại [phase-02 / sprint-01](../sprint-01/SPRINT.md) (`done`) và [DESIGN](../../../../DESIGN.md).

## Mục tiêu và timebox

Mục tiêu sprint: Xây dựng hoàn chỉnh sản phẩm **`ChaosForge Live` (`Codex Chaos Foundry`)** chạy thật từ bộ thiết kế chuẩn tại [`.agent-kit/specs/design-handoff/`](../../../../design-handoff/DESIGN-HANDOFF.md) với **ngôn ngữ giao diện thống nhất 100% bằng tiếng Anh (`lang="en"`)**, tích hợp bộ biên dịch AST thời gian thực bằng OpenAI / Codex kèm Local Fallback theo quy chuẩn mệnh đề phủ định & tín hiệu `uncertain`, kết nối luồng Twitch Chat / EventSub song song với chế độ giả lập 500 người xem và phòng Raid 2 Streamer; đồng thời lưu lại **Primary Codex Session ID** (`/status`) phục vụ nộp bài.
Timebox: Bắt đầu 2026-10-27; hoàn tất 2026-10-27 (vượt tiến độ trước hạn nộp 02/11/2026 2:00 PM PST).
Kết quả bàn giao: Ứng dụng web **`ChaosForge Live`** (100% English UI) chạy thật ở 95fps với đủ 3 bề mặt (`/stage`, `/overlay` + `overlay.html`, `/deck`) và `design-system.html`, tích hợp OpenAI Structured AST Compiler + Local Fallback Synthesizer + ToS Safety Guard 4 lớp + Twitch IRC/EventSub + Cross-Tab/WebSocket Raid Room; hoàn tất toàn bộ [us-006](stories/us-006.md), [us-007](stories/us-007.md), [us-008](stories/us-008.md).

## Scope và phụ thuộc

Scope/out-of-scope cấp sprint: Triển khai toàn bộ MVP theo [MISSION](../../../../MISSION.md) và [DESIGN](../../../../DESIGN.md) (bao gồm quy định bắt buộc 100% English UI, quy chuẩn Local Fallback Semantics & Uncertainty, Chính sách ToS Safety Guard 4 lớp, và Hiển thị đầy đủ 3 lựa chọn Poll trên OBS không dùng `-webkit-line-clamp` cắt dòng); mọi file source code của sản phẩm giữ ≤ 250 dòng vật lý theo quy chuẩn code của kit (72/72 file, max 237 dòng).
Phụ thuộc sprint/điều kiện đầu vào: Đã hoàn tất và duyệt `phase-02 / sprint-01` ([SPRINT.md](../sprint-01/SPRINT.md)).

## Ordered story index

| Story | Thứ tự | Required trong sprint | Phụ thuộc | Trạng thái nghiệm thu |
| --- | --- | --- | --- | --- |
| [us-006 — Triển khai 3 Bề mặt UI (100% English), Built-in Arcade & 2D Physics Overlay chuẩn Design Handoff](stories/us-006.md) | 1 | Required | Đã duyệt [us-003](../sprint-01/stories/us-003.md), [us-004](../sprint-01/stories/us-004.md), [us-005](../sprint-01/stories/us-005.md) | **`accepted`** |
| [us-007 — Tích hợp Bộ Biên dịch OpenAI Codex Structured AST, ToS Guard & Kho Cartridges](stories/us-007.md) | 2 | Required | Phụ thuộc [us-006](stories/us-006.md) | **`accepted`** |
| [us-008 — Tích hợp Twitch Chat/EventSub, Giả lập 500 Viewers & Đồng bộ Phòng Raid 2 Streamer](stories/us-008.md) | 3 | Required | Phụ thuộc [us-006](stories/us-006.md), [us-007](stories/us-007.md) | **`accepted`** |

## Acceptance tích hợp riêng

Tiêu chí tích hợp cấp sprint:
1. **[PASS]** Toàn bộ 3 chế độ xem trong `index.html` (`#/stage`, `#/overlay`, `#/deck`), trang nguồn OBS riêng `overlay.html` và `design-system.html` khớp 100% visual contract trong [DESIGN](../../../../DESIGN.md), **sử dụng 100% tiếng Anh thống nhất**, hiển thị đầy đủ 3 lựa chọn Poll trên OBS (tự co cỡ chữ cho câu dài tới 160 ký tự mà không cắt cụt bằng line-clamp và không tràn khung `340×352`), và không tràn ngang trên ma trận 9 kích thước màn hình (`360×800` đến `1920×1080` — 45/45 viewport checks pass).
2. **[PASS]** Luồng End-to-End từ lúc bấm `🔥 1-Click: Simulate 500 Twitch Viewers Hype` (hoặc nhận chat Twitch thật / gõ vào `Judge Live Prompt`) → Voting 15s → Compiling AST trong `295ms` (< 2.5s) (hỗ trợ loại trừ mệnh đề phủ định như `avoid any effect with gravity upside down` không sinh trọng lực âm, kèm cờ `uncertain: true` & nhãn `LOCAL (DEFAULT)` / `✓ AST SAFE · DEFAULT FALLBACK` khi rơi về mặc định trung tính) → Active Chaos 95fps tôn trọng Safe Zone 60% (`1152×648`, alpha đúng `0.70`) → Phím `Space` Panic Clear trong `59.8ms` (< 100ms) hoạt động trơn tru không lỗi (`0% crash`, 0 pixel màu còn sót lại).
3. **[PASS]** Lưu rõ **Primary Codex Session ID** (`/status`) từ phiên làm việc với Codex:
   - **Primary Codex Session ID (`Session`):** `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`
   - **Additional Codex Chat IDs (`Chats`):** `01a17d17-d86e-70b3-923a-7c4964624d75`, `01a17d17-ccf8-7fb3-8c1f-c72b3a568739`, `01a17cfe-7599-7d32-885d-bcbb2965b153`.

DESIGN contracts liên quan: [DESIGN](../../../../DESIGN.md). Mục đích tổng thể: [MISSION](../../../../MISSION.md).
Integration acceptance/evidence: Đạt nghiệm thu 100% trên snapshot `freeze-r7.md` (36/36 tests passed, Code Reviewer PASS, UX/UI Reviewer PASS, 4 Playwright browser integration checks PASS).

## Delivery derived và evidence

Delivery summary: Đã hoàn tất và nghiệm thu toàn bộ (`done`).
Story/findings chưa xong, limits và PM-authorized scope changes: 0 finding tồn đọng; toàn bộ 3 stories đạt `accepted`.
Đối soát yêu cầu/reports và điểm đến phần chưa xử lý: [bl-003](../../../../backlog/items/bl-003.md) (`resolved`).
Tài liệu người dùng cần lưu/index pointer: [2026-10-27-sprint-02-code-completed.md](../../../../../user/reports/2026-10-27-sprint-02-code-completed.md); dashboard tại [user/dashboard/data.js](../../../../../user/dashboard/data.js).
Review/latest integrated verify pointers:
- Handoff Result: `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/result.md`
- Code Review: `.agent-kit/handoffs/task-sprint-02-02-code-review-01/r7/result.md`
- UX/UI Review: `.agent-kit/handoffs/task-sprint-02-02-ux-review-01/r6/result.md`
- Live verify: `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/live-verification-r3.json`
Git closure derived/evidence pointer: [closure-sprint-02-02-01](../../../../memory/pm/refs/task-sprint-02-02/closure/closure-sprint-02-02-01/).
