# SPRINT — phase-02 / sprint-02

Trạng thái tài liệu: Đang mở (`in-progress`). ID: `sprint-02`, thuộc [phase-02](../../PHASE.md).

Sprint kind: `delivery`. Delivery domains: `code`. Story cap: 3 / `sprint.maxStories` (6, xem [CONFIG](../../../../../protocols/CONFIG.md)).
Pointer duyệt Sprint `design`: Đã duyệt tại [phase-02 / sprint-01](../sprint-01/SPRINT.md) (`done`) và [DESIGN](../../../../DESIGN.md).

## Mục tiêu và timebox

Mục tiêu sprint: Xây dựng hoàn chỉnh sản phẩm **`ChaosForge Live` (`Codex Chaos Foundry`)** chạy thật từ bộ thiết kế chuẩn tại [`.agent-kit/specs/design-handoff/`](../../../../design-handoff/DESIGN-HANDOFF.md) với **ngôn ngữ giao diện thống nhất 100% bằng tiếng Anh (`lang="en"`)**, tích hợp bộ biên dịch AST thời gian thực bằng OpenAI / Codex, kết nối luồng Twitch Chat / EventSub song song với chế độ giả lập 500 người xem và phòng Raid 2 Streamer; đồng thời lưu lại **Primary Codex Session ID** (`/status`) phục vụ nộp bài.
Timebox: Bắt đầu 2026-10-27; hoàn tất trước khi chuyển sang `sprint-03` (`release-validation` trước hạn nộp 02/11/2026 2:00 PM PST).
Kết quả bàn giao: Ứng dụng web **`ChaosForge Live`** (100% English UI) chạy thật ở 60fps với đủ 3 bề mặt (`/stage`, `/overlay` + `overlay.html`, `/deck`) và `design-system.html`, tích hợp OpenAI Structured AST Compiler + Twitch IRC/EventSub + Cross-Tab/WebSocket Raid Room; derive từ [us-006](stories/us-006.md), [us-007](stories/us-007.md), [us-008](stories/us-008.md).

## Scope và phụ thuộc

Scope/out-of-scope cấp sprint: Triển khai toàn bộ MVP theo [MISSION](../../../../MISSION.md) và [DESIGN](../../../../DESIGN.md) (bao gồm quy định bắt buộc chuyển 100% ngôn ngữ hiển thị sang tiếng Anh); mỗi file source code mới/tách module giữ ≤ 250 dòng theo quy chuẩn code của kit.
Phụ thuộc sprint/điều kiện đầu vào: Đã hoàn tất và duyệt `phase-02 / sprint-01` ([SPRINT.md](../sprint-01/SPRINT.md)).

## Ordered story index

| Story | Thứ tự | Required trong sprint | Phụ thuộc |
| --- | --- | --- | --- |
| [us-006 — Triển khai 3 Bề mặt UI (100% English), Built-in Arcade & 2D Physics Overlay chuẩn Design Handoff](stories/us-006.md) | 1 | Required (`todo`) | Đã duyệt [us-003](../sprint-01/stories/us-003.md), [us-004](../sprint-01/stories/us-004.md), [us-005](../sprint-01/stories/us-005.md) |
| [us-007 — Tích hợp Bộ Biên dịch OpenAI Codex Structured AST, ToS Guard & Kho Cartridges](stories/us-007.md) | 2 | Required (`todo`) | Phụ thuộc [us-006](stories/us-006.md) |
| [us-008 — Tích hợp Twitch Chat/EventSub, Giả lập 500 Viewers & Đồng bộ Phòng Raid 2 Streamer](stories/us-008.md) | 3 | Required (`todo`) | Phụ thuộc [us-006](stories/us-006.md), [us-007](stories/us-007.md) |

## Acceptance tích hợp riêng

Tiêu chí tích hợp cấp sprint:
1. Toàn bộ 3 chế độ xem trong `index.html` (`#/stage`, `#/overlay`, `#/deck`), trang nguồn OBS riêng `overlay.html` và `design-system.html` khớp 100% visual contract trong [DESIGN](../../../../DESIGN.md), **sử dụng 100% tiếng Anh thống nhất**, và không tràn ngang trên ma trận 9 kích thước màn hình (`360×800` đến `1920×1080`).
2. Luồng End-to-End từ lúc bấm `🔥 1-Click: Simulate 500 Twitch Viewers Hype` (hoặc nhận chat Twitch thật / gõ vào `Judge Live Prompt`) → Voting 15s → Compiling AST `< 2.5s` → Active Chaos 60fps tôn trọng Safe Zone 60% (`1152×648`) → Phím `Space` Panic Clear `< 100ms` hoạt động trơn tru không lỗi (`0% crash`).
3. Lưu rõ **Primary Codex Session ID** (`/status`) từ phiên làm việc với Codex.

DESIGN contracts liên quan: [DESIGN](../../../../DESIGN.md). Mục đích tổng thể: [MISSION](../../../../MISSION.md).
Integration acceptance/evidence: TBD; chờ kết quả triển khai code và kiểm chứng.

## Delivery derived và evidence

Delivery summary: Đang mở (`in-progress`).
Story/findings chưa xong, limits và PM-authorized scope changes: `us-006`, `us-007`, `us-008` đang ở trạng thái `todo`.
Đối soát yêu cầu/reports và điểm đến phần chưa xử lý: Theo dõi tại [bl-003](../../../../backlog/items/bl-003.md).
Tài liệu người dùng cần lưu/index pointer: [2026-10-27-design-approved-sprint-02-opened.md](../../../../../user/reports/2026-10-27-design-approved-sprint-02-opened.md); dashboard tại [user/dashboard/data.js](../../../../../user/dashboard/data.js).
Review/latest integrated verify pointers: TBD.
Git closure derived/evidence pointer: TBD.
