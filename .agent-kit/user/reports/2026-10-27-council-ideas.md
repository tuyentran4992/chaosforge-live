# 2026-10-27 — Đề xuất Top 3 ý tưởng Codex x TwitchCon Hackathon

Phạm vi/mốc/snapshot: `phase-01 / sprint-01 / us-001`, lượt Hội đồng cố vấn `run-us-001-01` (4/4 thành viên độc lập đồng thuận Top 1).

## Cần anh quyết

Anh chọn **1 trong 3 phương án sản phẩm** dưới đây (kèm xác nhận bộ 3 bề mặt UI) để PM chốt [MISSION](../../specs/MISSION.md) và hoàn tất [us-002](../../specs/roadmap/phase-01/sprints/sprint-01/stories/us-002.md):
1. **🥇 Khuyến nghị số 1 — `Codex Chaos Foundry` (`ChaosForge Live` — 9.35/10, khả thi 6 ngày: 9/10):** *"Twitch Plays Game Dev"* — Khán giả gõ `!forge <ý tưởng>` trên Chat, bình chọn 15s, và **OpenAI Codex** biên dịch nóng (`< 2.5s`) thành bẫy vật lý 2D, Boss AI hoặc luật chơi mới chạy trực tiếp 60fps trên **OBS Overlay** (kèm cửa sổ *Codex Live Compiler Terminal*, *Built-in Arcade Arena*, *500-Viewer Crowd Simulator* và chế độ *2-Streamer Versus Room*). Bao phủ trọn cả 3 nhánh đề tài, phô diễn trực diện sức mạnh sinh code/logic của Codex trên sân khấu TwitchCon.
2. **🥈 Phương án 2 — `RaidClash Arena` (8.60/10, khả thi: 8/10):** AI Showrunner biến mọi cú Twitch Raid / Co-stream giữa 2 kênh thành Game Show đối kháng 3 phút (Tug-of-War giữa 2 cộng đồng Chat). Mạnh về Co-stream nhưng tần suất dùng khi stream solo thấp hơn Phương án 1.
3. **🥉 Phương án 3 — `LoreWeaver Live` (8.45/10, khả thi: 8.5/10):** Bàn cờ Tabletop RPG, lăn xúc xắc D20 vật lý & thanh "Biên niên sử buổi stream" tự động triệu hồi Viewer thành Boss theo nhịp Chat. Đẹp nhưng nhịp độ chậm và kén streamer hơn Phương án 1.

## Anh làm được gì mới

- Xem báo cáo phân tích độc lập từ 3 Chuyên gia (Giám khảo Hackathon, Sản phẩm Twitch, Kiến trúc AI/MVP) và 1 User Persona mô phỏng, kèm kịch bản Demo 2 phút và giải pháp chống lỗi runtime bằng **Structured AST + Deterministic 2D Physics Engine**.

## Lỗi hoặc rủi ro anh sẽ gặp

- **Rủi ro sinh code trực tiếp trên sóng live:** Nếu cho AI chạy code tự do sẽ dễ lỗi làm đơ OBS hoặc trễ >10s; Hội đồng đã chốt giải pháp dùng **Structured AST Schema + Kho nguyên tử vật lý/âm thanh có sẵn** để chạy dưới 2.5 giây và không bao giờ crash.
- **Thủ tục bắt buộc khi nộp bài:** Phải lưu **Primary Codex Session ID** (lệnh `/status` trên luồng Codex chính) để điền form Devpost trước hạn **02/11/2026 2:00 PM PST**.

## Tiếp theo

- Ngay khi anh chốt phương án (ví dụ: chọn **Top 1 `Codex Chaos Foundry`**), em sẽ cập nhật [MISSION](../../specs/MISSION.md), đóng `sprint-01` và mở ngay Sprint Thiết kế UI (`sprint-02` — `design`) cho 3 bề mặt: *OBS Overlay*, *Streamer Control Deck* và *Virtual OBS Demo Stage*.

## Nguồn

- Kết quả Hội đồng: [result.md](../../handoffs/task-us-001-council-01/r1/result.md) | Tổng hợp chi tiết: [run-us-001-01-synthesis.md](../../memory/council-lead/refs/run-us-001-01-synthesis.md)
- Specs & Stories: [MISSION](../../specs/MISSION.md) | [us-001](../../specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md) | [us-002](../../specs/roadmap/phase-01/sprints/sprint-01/stories/us-002.md) | [bl-001](../../specs/backlog/items/bl-001.md)
