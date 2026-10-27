# 2026-10-27 — Chốt ý tưởng Codex Chaos Foundry & Trình duyệt Thiết kế UI

Phạm vi/mốc/snapshot: Hoàn tất `phase-01 / sprint-01` (`us-001`, `us-002` `accepted`); mở `phase-02 / sprint-01` (`kind: design` cho `us-003`, `us-004`, `us-005`).

## Cần anh quyết

1. **Duyệt thiết kế 3 bề mặt UI của `Codex Chaos Foundry` (`phase-02 / sprint-01`):**
   - **`/overlay` (Transparent OBS Overlay `1920x1080`, 60fps):** Giữ trống `60%` vùng tâm màn hình game (*Safe Zones*); bảng *Live Poll 15s* ở góc trên phải; cửa sổ *Codex Live Compiler Terminal* ở góc dưới trái; thanh máu Boss/tên Viewer ở cạnh trên giữa.
   - **`/deck` (Streamer Control Deck):** Có nút khẩn cấp **`[SPACEBAR — PANIC CLEAR]`** (xóa sạch màn hình `< 100ms`), chế độ Auto/1-Click Approve, kho thẻ bài *Saved Cartridges* và phòng đấu *2-Streamer Versus Room* (nhập mã 4 ký tự).
   - **`/stage` (Virtual OBS Demo Stage cho Giám khảo & Sân khấu TwitchCon):** Chia đôi màn hình gồm *Built-in Arcade Game* (có Auto-Play) + lớp `/overlay` + nút **`[🔥 1-CLICK: SIMULATE 500 TWITCH VIEWERS HYPE]`** + ô nhập **Judge Live Prompt**.
2. **Xác nhận khởi tạo Git (`git init`):** Dự án hiện chưa có `.git` (nên `phase-01 / sprint-01` đang ở trạng thái `closure pending`). Anh xác nhận cho phép khởi tạo Git repo để PM tự động commit cuối mỗi sprint và chuẩn bị repo nộp Devpost nhé.

## Anh làm được gì mới

- Đã khóa chính thức [MISSION](../../specs/MISSION.md) với ý tưởng số 1 **`Codex Chaos Foundry` (`ChaosForge Live`)** và hoàn thiện toàn bộ đặc tả thiết kế tương tác tại [DESIGN](../../specs/DESIGN.md).

## Lỗi hoặc rủi ro anh sẽ gặp

- **Chưa có Git repo để commit tự động (`closure pending`):** Theo quy định an toàn, PM không tự chạy `git init` khi chưa có xác nhận của anh.

## Tiếp theo

- Ngay khi anh duyệt thiết kế 3 bề mặt UI (và xác nhận `git init`), em sẽ đóng Sprint Thiết kế (`phase-02 / sprint-01`) và mở ngay **Sprint Phát triển Code (`phase-02 / sprint-02`)** kèm đặc tả kỹ thuật qua `lead-code` để anh dùng Codex viết code và lấy **Primary Codex Session ID**.

## Nguồn

- Specs & Thiết kế: [MISSION](../../specs/MISSION.md) | [DESIGN](../../specs/DESIGN.md) | [ROADMAP](../../specs/ROADMAP.md)
- Stories & Backlog: [us-002](../../specs/roadmap/phase-01/sprints/sprint-01/stories/us-002.md) | [us-003](../../specs/roadmap/phase-02/sprints/sprint-01/stories/us-003.md) | [us-004](../../specs/roadmap/phase-02/sprints/sprint-01/stories/us-004.md) | [us-005](../../specs/roadmap/phase-02/sprints/sprint-01/stories/us-005.md) | [bl-002](../../specs/backlog/items/bl-002.md)
