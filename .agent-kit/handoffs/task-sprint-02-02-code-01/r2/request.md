# Request bàn giao — điền đủ trước khi gửi

Bạn giữ duy nhất role **`lead-code`** trong task này, tiếp tục trong phiên làm việc của bạn (hoặc context mới). Request `r2` này thay thế (`supersedes`) `r1` sau khi PM đã giải quyết dứt điểm mâu thuẫn `conflict-screen-file.md`. Request này không cấp thêm quyền ngoài quyền người dùng đã cho.

Đọc [AGENTS.md](c:/Users/ADMIN/Desktop/Projects/hackathon/AGENTS.md), role card của bạn (`.agent-kit/roles/lead-code.md`), rồi làm theo [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md) và [CODE](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/CODE.md).

## Định danh

- Task-id: `task-sprint-02-02-code`. Handoff-id: `task-sprint-02-02-code-01`. Revision: `2` (`r2`). Supersedes: `r1` (`.agent-kit/handoffs/task-sprint-02-02-code-01/r1/request.md`).
- Người gửi: `pm`, app: `current` (Antigravity). Người nhận: `lead-code`, app: `Codex`.
- PM owner: app `current`, session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase / sprint / story:
  - Phase: `phase-02` (`.agent-kit/specs/roadmap/phase-02/PHASE.md`)
  - Sprint: `sprint-02` (`kind: delivery`, domain: `code` — `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md`)
  - Stories:
    1. `us-006`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md`
    2. `us-007`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-007.md`
    3. `us-008`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-008.md`

## Giải quyết mâu thuẫn `conflict-screen-file.md` (Quyết định chính thức của PM)

PM đã kiểm tra báo cáo `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/conflict-screen-file.md` và cập nhật đồng bộ tất cả các nguồn chuẩn (`.agent-kit/specs/DESIGN.md`, `.agent-kit/specs/design-handoff/DESIGN-MANIFEST.json`, `.agent-kit/specs/design-handoff/DESIGN-HANDOFF.md`, `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md`, `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md`):
1. **Bãi bỏ (`supersede`) hoàn toàn** câu boilerplate tự sinh lúc export (*"index.html is a launcher/overview only; it must not be treated as the combined final UI"*) trong `DESIGN-MANIFEST.json` và `DESIGN-HANDOFF.md`.
2. **Kiến trúc Entry / Route chuẩn duy nhất cho sản phẩm:**
   - **`index.html`:** Ứng dụng Studio chính tích hợp `topbar`, `statebar` và **3 chế độ xem chuyển đổi qua hash route (`#/stage` → `#view-stage`, `#/overlay` → `#view-overlay`, `#/deck` → `#view-deck`)**.
   - **`overlay.html`:** Trang nguồn OBS Browser Source trong suốt độc lập (`1920×1080`).
   - **`design-system.html`:** Trang tài liệu Design System v1.0 độc lập.
3. **Cách tuân thủ giới hạn ≤ 250 dòng vật lý / file (`CODE-STANDARDS.md`):**
   - Được phép tách CSS thành các file theo trách nhiệm trong `client/styles/*.css` và tách phần dựng DOM / logic của các view/section lớn thành các ES modules trong `client/ui/*.js` (hoặc tương đương), miễn là mọi file `.html`, `.css`, `.js` của sản phẩm đều **≤ 250 dòng vật lý** và DOM sau khi render giữ đúng các `id`, `class`, `data-*`, tokens và bố cục thị giác của Design Handoff (với **100% văn bản giao diện bằng tiếng Anh**).

## Project và snapshot

- Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`. Repo: Git cục bộ (`.git`), branch `master`.
- Snapshot tại thời điểm gửi `r2`:
  - `HEAD`: `5f7b2d31b6d765725b32745632e63d43e55d0b97`
  - `git status --porcelain -- .agent-kit/specs/MISSION.md .agent-kit/specs/DESIGN.md .agent-kit/specs/TECHSTACK.md .agent-kit/specs/ARCHITECT.md .agent-kit/specs/ROADMAP.md .agent-kit/specs/design-handoff .agent-kit/specs/roadmap/phase-02 shared server client test`:
    - `M .agent-kit/specs/ARCHITECT.md`
    - `M .agent-kit/specs/DESIGN.md`
    - `M .agent-kit/specs/TECHSTACK.md`
    - `M .agent-kit/specs/design-handoff/DESIGN-HANDOFF.md`
    - `M .agent-kit/specs/design-handoff/DESIGN-MANIFEST.json`
    - `M .agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md`
    - `?? client/`
    - `?? server/`
    - `?? shared/`
    - `?? test/`
  - SHA-256 của `git diff HEAD -- .agent-kit/specs/MISSION.md .agent-kit/specs/DESIGN.md .agent-kit/specs/TECHSTACK.md .agent-kit/specs/ARCHITECT.md .agent-kit/specs/ROADMAP.md .agent-kit/specs/design-handoff .agent-kit/specs/roadmap/phase-02`:
    `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`
  - Các file untracked hiện có trong scope (do `coder` đã tạo ở lượt trước, giữ nguyên để làm tiếp):
    - `shared/ast-schema.js`: `a20bda415d6999d520e5e9f3d95536c7922c92454ae65fb9c5233e78b29bac36`
    - `shared/ast-validate.js`: `59377546d74a39d70d93ecb4377b27fe7ee1114ce5c59c5069ffd69c41200cce`
    - `shared/cartridges.js`: `a41c6917e2125e1096ea621155b956b10e95a4b6bdfdbd68bbb32621f11c9003`
    - `shared/safety.js`: `c7fd7303a6b33f48ab5e4dfd64539b9a4134a7a0586dfc703ef14ad625a18ff2`
    - `shared/synthesize.js`: `3b482b24b0277cdf3591666d78c731869d3fc3693eb8345c70c6801f53635a86`
    - `server/compiler.js`: `39fe207577ec9737124e5dc370d029b7cbaa7408e538900c6e7262347cc3de43`
    - `server/openai.js`: `256e2de35a97e84647d901aa8218426dc47ca83db769f82f3abfd08c2fc78e2f`
    - `client/chat/parse.js`: `e89e14d55bd51e312cdfa8bbea4e917dd86509df487b2a84eddbe9fe93b95134`
    - `test/ast.test.js`: `0597ca0f7e466ba8b1c502b6613a73127507dfe3f5055882582be725c1dc61f5`
    - `test/chat-parse.test.js`: `066b2313859554528fbff0aae37cd0bfedb73dde1097fdd51fca93e0fe0d0319`
    - `test/compiler.test.js`: `27dc09495966a1c71b7e4e8355909374c8460fa3e4cc15a28ebb50f768ab33de`
- Thay đổi ngoài scope (phải giữ nguyên): `.agent-kit/specs/backlog/`, `.agent-kit/memory/pm/`, `.agent-kit/user/`.
- Được đọc: Như `r1` + `.agent-kit/memory/pm/refs/task-sprint-02-02-code/conflict-screen-file-resolution.md`.
- Được ghi: `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md`, `.agent-kit/memory/lead-code/`, `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/ack.md`, `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/result.md`, các thư mục handoff con gửi `coder`, `code-reviewer`, `ux-ui-reviewer`, và source code/tests sản phẩm ngoài `.agent-kit/` (do `coder` ghi).

## Việc cần làm

1. Ghi `ack.md` cho `r2`, đóng báo cáo mâu thuẫn `conflict-screen-file.md` (do các nguồn chuẩn đã nhất quán 100%) và cập nhật `technical-plan.md`.
2. Giao tiếp cho chính `coder` đã làm `r1` hoàn thiện toàn bộ phần còn lại của `us-006`, `us-007`, `us-008`:
   - Server HTTP + WebSocket / Room relay + `/api/compile` (`server/*`).
   - 3 HTML entries (`index.html` với `#/stage`, `#/overlay`, `#/deck`; `overlay.html`; `design-system.html`), tách CSS (`client/styles/*.css`) và JS (`client/*`), **100% Unified English UI**, giữ nguyên mọi file code ≤ 250 dòng vật lý.
   - Built-in Arcade + 2D Physics Overlay (Center 60% Safe Zone `[384,1536] × [216,864]` giảm opacity còn `0.70`, Panic Clear `< 100ms`), 500-Viewer Crowd Simulator, Twitch IRC WebSocket, Cartridge Library, và 2-Streamer Raid Room.
   - Automated tests (unit + integration + browser/UI checks).
3. Chốt freeze snapshot → chạy đủ `code-reviewer` và `ux-ui-reviewer` độc lập → sửa findings (nếu có) → `lead-code` verify bản tích hợp mới nhất và ghi `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/result.md`.

## Nơi ghi kết quả

- Request (chỉ đọc): `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/request.md`
- Ack (bạn ghi): `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/ack.md`
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/handoff-result.md)): `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/result.md`
- Evidence: `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/`
