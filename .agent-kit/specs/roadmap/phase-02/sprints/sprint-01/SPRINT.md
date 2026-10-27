# SPRINT thiết kế — phase-02 / sprint-01

Trạng thái: Đã hoàn tất nghiệm thu và đóng (`done`). Type: `design`.
Product UI applicability/owner/PM: Sản phẩm **`ChaosForge Live` (`Codex Chaos Foundry`)** có 3 bề mặt UI web tương tác trực tiếp (`/stage`, `/overlay`, `/deck`) + trang Design System (`design-system.html`); người dùng đã bàn giao bộ thiết kế hoàn chỉnh và PM đã kiểm chứng nghiệm thu ngày 2026-10-27.
Goal/scope/persona/user flow và MISSION pointers: Đã chuẩn hóa toàn bộ visual system, tokens, bố cục, luồng tương tác 6 trạng thái (`idle`, `voting`, `compiling`, `active`, `panic`, `blocked`), vùng an toàn OBS (`1152×648` — 60%) và quy chuẩn **100% Unified English UI** theo [MISSION](../../../../MISSION.md) và [DESIGN](../../../../DESIGN.md).

## Ordered User Story index

| Story | Thứ tự | Required trong sprint | Phụ thuộc |
| --- | --- | --- | --- |
| [us-003 — Thiết kế Transparent OBS Browser Source Overlay (`1920×1080`)](stories/us-003.md) | 1 | Required (`accepted`) | Đã chốt [MISSION](../../../../MISSION.md) |
| [us-004 — Thiết kế Streamer Control Deck & 2-Streamer Versus Room](stories/us-004.md) | 2 | Required (`accepted`) | Đã chốt [MISSION](../../../../MISSION.md) |
| [us-005 — Thiết kế Virtual OBS Demo Stage & 500-Viewer Crowd Simulator](stories/us-005.md) | 3 | Required (`accepted`) | Đã chốt [MISSION](../../../../MISSION.md) |

## Outputs

- Bộ gói thiết kế và prototype tương tác hoàn chỉnh tại [`.agent-kit/specs/design-handoff/`](../../../design-handoff/DESIGN-HANDOFF.md):
  - `index.html` (`SHA256: BC6084F5...`) + `app.js` (`SHA256: 86585C23...`)
  - `overlay.html` (`SHA256: 2446E149...`) + `overlay.js` (`SHA256: 9DFFA421...`)
  - `design-system.html` (`SHA256: 1E1F9A5E...`) + `styles.css` (`SHA256: 4739351C...`)
  - `DESIGN-HANDOFF.md` (`SHA256: 4B124344...`) + `DESIGN-MANIFEST.json` (`SHA256: 7E0B6808...`)
- Đặc tả chuẩn hóa tại [DESIGN](../../../../DESIGN.md).

## DESIGN canonical sections và evidence/decision pointers

- Bộ file thiết kế & Visual Contract: [DESIGN — Bộ File Thiết kế Chuẩn](../../../../DESIGN.md#1-bộ-file-thiết-kế-chuẩn-visual-contract--screen-file-first)
- Quy hoạch Vùng An toàn `1152×648`: [DESIGN — Quy hoạch Vùng An toàn OBS](../../../../DESIGN.md#2-quy-hoạch-vùng-an-toàn-obs-19201080--giữa-60-trống)
- 6 Trạng thái Vòng & 100% English UI Contract: [DESIGN — Contracts hành vi cross-cutting](../../../../DESIGN.md#contracts-hành-vi-cross-cutting)

## Sprint delivery phụ thuộc và story UI được phủ

- Mở khóa cổng bắt buộc số 2 cho [phase-02 / sprint-02](../sprint-02/SPRINT.md) (`kind: delivery`, domain: `code`), phủ các story [us-006](../sprint-02/stories/us-006.md), [us-007](../sprint-02/stories/us-007.md), [us-008](../sprint-02/stories/us-008.md).

## PM acceptance/unfinished decisions

- **ĐẠT (`PASS`):** Cả 3 story `us-003`, `us-004`, `us-005` đã đạt `accepted`.
- Git closure: Xem [intent.md](../../../../../memory/pm/refs/task-sprint-02-01/closure/closure-sprint-02-01-01/intent.md) và [receipt.md](../../../../../memory/pm/refs/task-sprint-02-01/closure/closure-sprint-02-01-01/receipt.md).
