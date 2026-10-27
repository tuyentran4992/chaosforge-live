# Request bàn giao — điền đủ trước khi gửi

Bạn giữ duy nhất role **`lead-code`** trong task này, với context mới. Bạn không nhận lịch sử chat của người giao. Request này không cấp thêm quyền ngoài quyền người dùng đã cho.

Đọc [AGENTS.md](c:/Users/ADMIN/Desktop/Projects/hackathon/AGENTS.md), role card của bạn (`.agent-kit/roles/lead-code.md`), rồi làm theo [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md) và [CODE](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/CODE.md).

## Định danh

- Task-id: `task-sprint-02-02-code`. Handoff-id: `task-sprint-02-02-code-01`. Revision: `1` (`r1`). Supersedes: `none`.
- Người gửi: `pm`, app: `current` (Antigravity). Người nhận: `lead-code`, app: `Codex` (phiên mới do người dùng khởi chạy).
- PM owner: app `current`, session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase / sprint / story:
  - Phase: `phase-02` (`.agent-kit/specs/roadmap/phase-02/PHASE.md`)
  - Sprint: `sprint-02` (`kind: delivery`, domain: `code` — `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md`)
  - Stories cần hoàn thành trong sprint này:
    1. `us-006`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md`
    2. `us-007`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-007.md`
    3. `us-008`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-008.md`
  - Pointer Sprint `design` đã duyệt: `phase-02 / sprint-01` (`.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/SPRINT.md` — `done`) và bộ thiết kế gốc tại `.agent-kit/specs/design-handoff/`.

## Project và snapshot

- Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`. Repo: Git cục bộ (`.git`), branch `master`.
- Snapshot:
  - `HEAD`: `5f7b2d31b6d765725b32745632e63d43e55d0b97`
  - `git status --porcelain -- .agent-kit/specs/MISSION.md .agent-kit/specs/DESIGN.md .agent-kit/specs/TECHSTACK.md .agent-kit/specs/ARCHITECT.md .agent-kit/specs/ROADMAP.md .agent-kit/specs/design-handoff .agent-kit/specs/roadmap/phase-02`: rỗng (clean, khớp 100% với `HEAD`).
  - `git diff HEAD` trên scope trên: rỗng (SHA256 của empty diff: `E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855`).
- Thay đổi của người dùng/PM đang có (ngoài scope code sản phẩm, phải giữ nguyên):
  - `M .agent-kit/memory/pm/context.md`
  - `?? .agent-kit/handoffs/.gitkeep`
  - `?? .agent-kit/memory/pm/long-term.md`
  - `?? .agent-kit/memory/pm/refs/`
  - `?? .agent-kit/memory/pm/short-term.md`
  - `?? .agent-kit/specs/backlog/items/.gitkeep`
  - `?? .agent-kit/user/reports/.gitkeep`
- Được đọc:
  - `AGENTS.md`, `.agent-kit/roles/lead-code.md`, `.agent-kit/core/WORKING.md`, `.agent-kit/core/HANDOFF.md`, `.agent-kit/core/CONFLICTS.md`, `.agent-kit/protocols/DISPATCH.md`, `.agent-kit/protocols/CONFIG.md`, `.agent-kit/config.json`, `.agent-kit/flows/CODE.md`, `.agent-kit/flows/CODE-STANDARDS.md`
  - `.agent-kit/specs/MISSION.md`, `.agent-kit/specs/DESIGN.md`, `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md`, `.agent-kit/specs/ROADMAP.md`
  - `.agent-kit/specs/design-handoff/` (`DESIGN-HANDOFF.md`, `DESIGN-MANIFEST.json`, `index.html`, `overlay.html`, `design-system.html`, `styles.css`, `app.js`, `overlay.js`)
  - `.agent-kit/specs/roadmap/phase-02/` (`PHASE.md`, `sprints/sprint-01/`, `sprints/sprint-02/SPRINT.md`, `sprints/sprint-02/stories/us-006.md`, `us-007.md`, `us-008.md`)
  - `.agent-kit/memory/lead-code/` và toàn bộ source code/tests sản phẩm sẽ tạo ở thư mục gốc project.
- Được ghi (của `lead-code` và team code theo phân quyền trong `CODE.md`):
  - `lead-code`: `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md`, `.agent-kit/memory/lead-code/`, `.agent-kit/handoffs/task-sprint-02-02-code-01/r1/ack.md`, `.agent-kit/handoffs/task-sprint-02-02-code-01/r1/result.md`, và các thư mục handoff con gửi `coder`, `code-reviewer`, `ux-ui-reviewer`.
  - `coder` (dưới sự điều phối của `lead-code`): Source code, assets, config, scripts và automated tests của sản phẩm tại project root (ngoài `.agent-kit/`). Lưu ý: giữ nguyên bản gốc trong `.agent-kit/specs/design-handoff/` làm tham chiếu, không sửa đè lên `.agent-kit/specs/design-handoff/`.

## Việc cần làm

- Mục tiêu sản phẩm:
  Xây dựng hoàn chỉnh ứng dụng sản phẩm **`ChaosForge Live` (`Codex Chaos Foundry`)** chạy thật cho cuộc thi **Codex x TwitchCon Hackathon**, xuất phát từ bộ thiết kế chuẩn tại `.agent-kit/specs/design-handoff/`, đáp ứng đầy đủ 3 User Stories:
  1. **`us-006` — 3 Bề mặt UI (`100% Unified English UI`), Built-in Arcade & 2D Physics Overlay chuẩn Design Handoff:**
     - **Bắt buộc thống nhất 100% ngôn ngữ hiển thị bằng tiếng Anh (`lang="en"`):** Chuyển toàn bộ nhãn, tiêu đề, 6 trạng thái vòng (`1. Idle · Ready`, `2. Voting · 15s`, `3. Compiling · <2.5s`, `4. Active Chaos · 30–45s`, `5. Panic Clear · <100ms`, `6. Blocked · Safe Fallback`), các nút bấm, bảng hướng dẫn OBS, thông số kỹ thuật, tên Cartridge, presets và trang `design-system.html` sang tiếng Anh chuẩn xác cho Ban Giám khảo quốc tế (không để sót văn bản tiếng Việt trên giao diện sản phẩm).
     - Giữ nguyên 100% hệ thống visual tokens (`styles.css`), đường cắt góc (`--clip-panel`, `--clip-btn`), bố cục 3 chế độ xem (`#/stage`, `#/overlay`, `#/deck`), trang nguồn OBS độc lập (`overlay.html`) và `design-system.html`; đảm bảo không tràn ngang trên 9 kích thước viewport từ `360×800` đến `1920×1080`.
     - Đảm bảo **Center 60% Safe Zone (`1152 × 648` trên `1920×1080`)**: không thực thể nào sinh trong vùng tâm, thực thể đi ngang qua vùng tâm tự giảm độ mờ còn `0.70`, và phím `Space` / nút Panic xóa sạch thực thể + tắt SFX 8-bit dưới `< 100ms`.
     - Đồng bộ trạng thái thời gian thực (`< 100ms`) giữa cửa sổ điều khiển (`index.html`) và cửa sổ nguồn OBS độc lập (`overlay.html`) qua `BroadcastChannel` + WebSocket/API.
  2. **`us-007` — Bộ Biên dịch OpenAI Codex Structured AST (`< 2.5s`), ToS Safety Guard & Kho Cartridges:**
     - Xây dựng bộ biên dịch chuyển ý tưởng `!forge` (từ Winner của Poll hoặc từ ô `Judge Live Prompt`) thành cấu trúc **JSON AST hợp lệ** (hỗ trợ gọi OpenAI API `OPENAI_API_KEY` khi được cấu hình ở backend/env, kèm bộ **Deterministic Local AST Synthesizer** tốc độ cao để luôn phản hồi `< 2.5 giây` và hoạt động mượt kể cả khi Giám khảo chấm bài không nhập API key).
     - Tuyệt đối không dùng `eval()`; kiểm tra schema AST chặt chẽ (`0% crash`), hiển thị trực quan mã AST trên khung *Codex Live Compiler (`420×272`)* kèm nhãn `AST SAFE VERIFIED`.
     - Bộ chặn ToS phát hiện prompt không an toàn, chuyển sang trạng thái `6. Blocked` và tự động nạp bản vá an toàn **`RESCUE RUBBER DUCKS` (`duckfallback`)**.
     - Quản lý kho `Saved Chaos Cartridges` (bằng tiếng Anh), cho phép lưu bản vá mới tạo và bấm triển khai lại tức thì.
  3. **`us-008` — Kết nối Twitch Chat Trực tiếp, Bộ Giả lập 500 Viewers & Phòng Đấu 2 Streamer (`Raid Room`):**
     - Tab `LIVE TWITCH`: Kết nối đọc luồng chat thời gian thực của bất kỳ kênh Twitch nào qua giao thức Twitch IRC WebSocket (`wss://irc-ws.chat.twitch.tv:443` với `justinfan` anonymous read hoặc OAuth tùy chọn), tự động bắt tin nhắn `!forge <idea>`, phiếu bầu `1 / 2 / 3`, lệnh `!shield`, `!boost` và emote `LUL`, `PogChamp`.
     - Tab `SIMULATED CROWD 500`: Nút `🔥 1-CLICK: SIMULATE 500 TWITCH VIEWERS HYPE` sinh luồng chat tiếng Anh tự nhiên, đẩy ý tưởng vào Poll và tăng nhịp vote/combo sống động.
     - Khu vực `2-STREAMER RAID ROOM`: Cho phép kết nối mã phòng 4 ký tự (mặc định `TW26`) và bấm `🚀 SEND CHAOS CARTRIDGE TO RIVAL STREAMER` để gửi bản vá sang cửa sổ/màn hình đối phương theo thời gian thực và ghi vào `#raidLog`.
- Scope và ngoài scope:
  - Tuân thủ nghiêm ngặt [CODE-STANDARDS](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/CODE-STANDARDS.md) (mỗi file code sản phẩm tạo mới/tách module giữ **≤ 250 dòng vật lý**, có trách nhiệm đơn lẻ SRP, có scripts chạy/build/test rõ ràng).
  - Không sửa `MISSION.md`, `DESIGN.md`, `ROADMAP.md` hay các file gốc trong `.agent-kit/specs/design-handoff/`.
- Acceptance: Đạt toàn bộ tiêu chí trong `us-006.md`, `us-007.md`, `us-008.md` và acceptance tích hợp trong `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md`.
- Plan kỹ thuật: `lead-code` cập nhật `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md` và lập plan chi tiết tại `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/`.
- Checks và evidence cần trả:
  - Đủ quy trình `CODE.md`: Technical Plan → `coder` thực thi & đếm dòng (≤ 250 dòng/file) → Freeze snapshot → `code-reviewer` + `ux-ui-reviewer` độc lập → Sửa findings (nếu có) → `lead-code` verify bản tích hợp cuối từ checkout sạch (khởi động server/app thật, chạy automated tests, kiểm tra visual & 6 trạng thái).
- Quyền và giới hạn: Không commit Git, không push hay gửi ra ngoài (PM sẽ tự commit khi đóng sprint sau khi nghiệm thu).

## Nơi ghi kết quả

- Request (chỉ đọc): `.agent-kit/handoffs/task-sprint-02-02-code-01/r1/request.md`
- Ack (bạn ghi): `.agent-kit/handoffs/task-sprint-02-02-code-01/r1/ack.md`
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/handoff-result.md)): `.agent-kit/handoffs/task-sprint-02-02-code-01/r1/result.md`
- Evidence: `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/`
