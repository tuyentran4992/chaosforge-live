# PHASE — phase-02

Trạng thái tài liệu: Đang mở (`in-progress`). ID: `phase-02` — Thiết kế & Phát triển MVP `ChaosForge Live` (`Codex Chaos Foundry`).

Type/điều kiện: Phase phát triển sản phẩm có UI. Đã hoàn tất và duyệt `sprint-01` (`kind: design` — `done`); hiện đang chạy `sprint-02` (`kind: delivery`, domain: `code`) trước khi kiểm thử QA tại `sprint-03` (`kind: release-validation`).

## Mục tiêu và ranh giới

Mục tiêu phase: Thiết kế chuẩn hóa UX/UI cho 3 bề mặt tương tác (`done`), xây dựng hoàn chỉnh MVP **`ChaosForge Live` (`Codex Chaos Foundry`)** bằng OpenAI Codex (lưu Primary Codex Session ID), và kiểm thử nghiệm thu sẵn sàng nộp bài trên Devpost trước hạn **02/11/2026 2:00 PM PST**.

Scope/out-of-scope:
- **In-scope:** Thiết kế 3 bề mặt UI (`/stage`, `/overlay`, `/deck`) + Design System (`done`), xây dựng ứng dụng web hoàn chỉnh với Deterministic 2D Physics & Audio Engine + Codex Structured AST Compiler + Twitch IRC/EventSub + 500-Viewer Crowd Simulator + 2-Streamer Raid Room (`sprint-02`), kiểm thử E2E QA (`sprint-03`).
- **Out-of-scope:** Các tính năng ngoài phạm vi đã chốt tại [MISSION](../../MISSION.md#phạm-vi-và-non-goals).
Tiêu chí hành vi liên quan: Nguồn chuẩn tại [DESIGN](../../DESIGN.md) và [`.agent-kit/specs/design-handoff/`](../../design-handoff/DESIGN-HANDOFF.md).

## Phụ thuộc phase

Phụ thuộc hoàn tất `phase-01` ([PHASE.md](../phase-01/PHASE.md) — `done`).

## Index sprint

| Sprint thuộc phase-02 | Thứ tự | Loại (`kind`) | Trạng thái |
| --- | --- | --- | --- |
| [sprint-01 — Thiết kế UX/UI 3 bề mặt ChaosForge Live](sprints/sprint-01/SPRINT.md) | 1 | `design` | `done` |
| [sprint-02 — Xây dựng Core Engine, Twitch/Codex Integration & UI](sprints/sprint-02/SPRINT.md) | 2 | `delivery` (`code`) | `in-progress` |
| sprint-03 — Kiểm thử E2E QA & Đóng gói bài nộp Devpost (mở sau `sprint-02`) | 3 | `release-validation` | `planned` |

Sprint owns goal/timebox, story index, dependencies và integration acceptance; delivery là derived từ leaf stories. Story details/acceptance/delivery nằm ở từng story.

## Tổng hợp phase

- [sprint-01](sprints/sprint-01/SPRINT.md) (`kind: design`): Đã hoàn tất nghiệm thu (`done`, cả 3 story `us-003`, `us-004`, `us-005` đạt `accepted` với bộ gói thiết kế tại `.agent-kit/specs/design-handoff/`).
- [sprint-02](sprints/sprint-02/SPRINT.md) (`kind: delivery`, domain: `code`): Đang mở (`in-progress`) với 3 stories ([us-006](sprints/sprint-02/stories/us-006.md), [us-007](sprints/sprint-02/stories/us-007.md), [us-008](sprints/sprint-02/stories/us-008.md)).

Quay lại [ROADMAP](../../ROADMAP.md).
