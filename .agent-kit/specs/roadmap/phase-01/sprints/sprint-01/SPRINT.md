# SPRINT — phase-01 / sprint-01

Trạng thái tài liệu: Đã hoàn tất nghiệm thu và đóng (`done`). ID: `sprint-01`, thuộc [phase-01](../../PHASE.md).

Sprint kind: `delivery` (khám phá sản phẩm & tư vấn hội đồng, chưa viết code). Delivery domains: tư vấn sản phẩm qua Hội đồng (`council-lead`). Story cap: 2 / `sprint.maxStories` (6, xem [CONFIG](../../../../../protocols/CONFIG.md)).

## Mục tiêu và timebox

Mục tiêu sprint: Phân tích đề bài **Codex x TwitchCon Hackathon** từ link của người dùng, triệu tập Hội đồng cố vấn (`council-lead`) đề xuất & phản biện các phương án dự thi ([us-001](stories/us-001.md)), và chốt 1 ý tưởng sản phẩm kèm bề mặt tương tác UI, kịch bản demo & scope MVP 6 ngày vào [MISSION](../../../../MISSION.md) ([us-002](stories/us-002.md)).
Timebox: 2026-10-27 (hoàn tất trong ngày).
Kết quả bàn giao: Bản phân tích thể lệ/tiêu chí hackathon, báo cáo tổng hợp từ Hội đồng cố vấn (`council-lead`), và quyết định chốt ý tưởng **`Codex Chaos Foundry` (`ChaosForge Live`)** + 3 bề mặt UI trong [MISSION](../../../../MISSION.md); derive từ [us-001](stories/us-001.md) và [us-002](stories/us-002.md).

## Scope và phụ thuộc

Scope/out-of-scope cấp sprint: Chỉ thực hiện nghiên cứu đề bài, lấy ý kiến Hội đồng cố vấn và chốt ý tưởng/scope MVP; không viết code sản phẩm và chưa làm UI (bước thiết kế UI chuyển sang `phase-02 / sprint-01`).
Phụ thuộc sprint/điều kiện đầu vào: Đã nhận link hackathon `https://twitchcon-codex.devpost.com/` từ người dùng.

## Ordered story index

| Story | Thứ tự | Required trong sprint | Phụ thuộc |
| --- | --- | --- | --- |
| [us-001 — Phân tích Codex x TwitchCon Hackathon & Hội đồng đề xuất ý tưởng](stories/us-001.md) | 1 | Required (`accepted`) | Đã có link hackathon từ người dùng |
| [us-002 — Chốt ý tưởng dự thi, bề mặt UI & phạm vi MVP 6 ngày](stories/us-002.md) | 2 | Required (`accepted`) | Đã có kết quả Hội đồng từ [us-001](stories/us-001.md) và quyết định chốt Phương án 1 của người dùng |

## Acceptance tích hợp riêng

Tiêu chí tích hợp cấp sprint: Kết quả tư vấn của Hội đồng ở [us-001](stories/us-001.md) đã dẫn tới quyết định chốt ý tưởng **`Codex Chaos Foundry` (`ChaosForge Live`)** ở [us-002](stories/us-002.md), được đồng bộ hoàn chỉnh vào [MISSION](../../../../MISSION.md) làm đầu vào cho `phase-02 / sprint-01` (`design`).
DESIGN contracts liên quan: Đã xác định 3 bề mặt UI tại [MISSION](../../../../MISSION.md); thiết kế chi tiết tại [DESIGN](../../../../DESIGN.md).
Integration acceptance/evidence: **ĐẠT (`PASS`)** — cả `us-001` và `us-002` đều `accepted` và đồng bộ với [MISSION](../../../../MISSION.md).

## Delivery derived và evidence

Delivery summary: Hoàn tất (`done`); cả 2 story required ([us-001](stories/us-001.md) và [us-002](stories/us-002.md)) đã đạt `accepted`.
Story/findings chưa xong, limits và PM-authorized scope changes: Không còn story chưa xong trong sprint này.
Đối soát yêu cầu/reports và điểm đến phần chưa xử lý: [bl-001](../../../../backlog/items/bl-001.md) đã `resolved`.
Tài liệu người dùng cần lưu/index pointer: [2026-10-27-council-ideas.md](../../../../../user/reports/2026-10-27-council-ideas.md); dashboard tại [user/dashboard/data.js](../../../../../user/dashboard/data.js).
Review/latest integrated verify pointers: Hồ sơ Hội đồng cố vấn tại [result.md](../../../../../handoffs/task-us-001-council-01/r1/result.md) và bản chốt [MISSION](../../../../MISSION.md).
Git closure derived/evidence pointer: Xem [intent.md](../../../../../memory/pm/refs/task-sprint-01/closure/closure-sprint-01-01/intent.md) và [receipt.md](../../../../../memory/pm/refs/task-sprint-01/closure/closure-sprint-01-01/receipt.md).
