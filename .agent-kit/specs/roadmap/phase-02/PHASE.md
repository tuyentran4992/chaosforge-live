# PHASE — phase-02

Trạng thái tài liệu: Đang mở (`in-progress`). ID: `phase-02` — Thiết kế & Phát triển MVP `ChaosForge Live` (`Codex Chaos Foundry`).

Type/điều kiện: Phase phát triển sản phẩm có UI. Đã hoàn tất và duyệt `sprint-01` (`kind: design` — `done`) và `sprint-02` (`kind: delivery`, domain: `code` — `done`); hiện đang mở `sprint-03` (`kind: release-validation`) để kiểm thử QA độc lập và chuẩn bị tài liệu nộp bài Devpost.

## Mục tiêu và ranh giới

Mục tiêu phase: Thiết kế chuẩn hóa UX/UI cho 3 bề mặt tương tác (`done`), xây dựng hoàn chỉnh MVP **`ChaosForge Live` (`Codex Chaos Foundry`)** bằng OpenAI Codex (lưu Primary Codex Session ID) (`done`), và kiểm thử nghiệm thu sẵn sàng nộp bài trên Devpost trước hạn **02/11/2026 2:00 PM PST**.

Scope/out-of-scope:
- **In-scope:** Thiết kế 3 bề mặt UI (`/stage`, `/overlay`, `/deck`) + Design System (`done`), xây dựng ứng dụng web hoàn chỉnh với Deterministic 2D Physics & Audio Engine + Codex Structured AST Compiler + Twitch IRC/EventSub + 500-Viewer Crowd Simulator + 2-Streamer Raid Room (`done`), kiểm thử E2E QA, kịch bản video demo 2 phút và bộ nội dung nộp bài Devpost (`sprint-03`).
- **Out-of-scope:** Các tính năng ngoài phạm vi đã chốt tại [MISSION](../../MISSION.md#phạm-vi-và-non-goals).
Tiêu chí hành vi liên quan: Nguồn chuẩn tại [DESIGN](../../DESIGN.md) và [`.agent-kit/specs/design-handoff/`](../../design-handoff/DESIGN-HANDOFF.md).

## Phụ thuộc phase

Phụ thuộc hoàn tất `phase-01` ([PHASE.md](../phase-01/PHASE.md) — `done`).

## Index sprint

| Sprint thuộc phase-02 | Thứ tự | Loại (`kind`) | Trạng thái |
| --- | --- | --- | --- |
| [sprint-01 — Thiết kế UX/UI 3 bề mặt ChaosForge Live](sprints/sprint-01/SPRINT.md) | 1 | `design` | `done` |
| [sprint-02 — Xây dựng Core Engine, Twitch/Codex Integration & UI](sprints/sprint-02/SPRINT.md) | 2 | `delivery` (`code`) | `done` |
| [sprint-03 — Kiểm thử E2E QA, Video Demo 2 Phút & Đóng gói Bài nộp Devpost](sprints/sprint-03/SPRINT.md) | 3 | `release-validation` | **`in-progress`** |

Sprint owns goal/timebox, story index, dependencies và integration acceptance; delivery là derived từ leaf stories. Story details/acceptance/delivery nằm ở từng story.

## Tổng hợp phase

- [sprint-01](sprints/sprint-01/SPRINT.md) (`kind: design`): Đã hoàn tất nghiệm thu (`done`, cả 3 story `us-003`, `us-004`, `us-005` đạt `accepted`).
- [sprint-02](sprints/sprint-02/SPRINT.md) (`kind: delivery`, domain: `code`): Đã hoàn tất nghiệm thu (`done`, cả 3 story `us-006`, `us-007`, `us-008` đạt `accepted`, commit `c777c07` và `18a353e`).
- [sprint-03](sprints/sprint-03/SPRINT.md) (`kind: release-validation`): Đang mở (`in-progress`) gồm 2 stories: [us-009](sprints/sprint-03/stories/us-009.md) và [us-010](sprints/sprint-03/stories/us-010.md).

Quay lại [ROADMAP](../../ROADMAP.md).
