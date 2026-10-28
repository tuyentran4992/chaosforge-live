# Request bàn giao — điền đủ trước khi gửi

Bạn giữ duy nhất role **`lead-code`** trong task này, tiếp tục trong phiên Codex của bạn. Request `r2` này thay thế (`supersedes`) `r1` sau khi PM đã đối soát trạng thái Git thực tế và xác nhận nghị quyết xử lý lệch snapshot tại `.agent-kit/memory/pm/refs/task-sprint-03-01-code/snapshot-resolution.md`. Request này không cấp thêm quyền ngoài quyền người dùng đã cho.

Đọc [AGENTS.md](c:/Users/ADMIN/Desktop/Projects/hackathon/AGENTS.md), role card của bạn (`.agent-kit/roles/lead-code.md`), rồi làm theo [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md) và [CODE](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/CODE.md).

## Định danh

- Task-id: `task-sprint-03-01-code`. Handoff-id: `task-sprint-03-01-code-01`. Revision: `2` (`r2`). Supersedes: `r1` (`.agent-kit/handoffs/task-sprint-03-01-code-01/r1/request.md`).
- Người gửi: `pm`, app: `current` (Antigravity). Người nhận: `lead-code`, app: `Codex` / `current` (chính phiên Codex của bạn / context mới).
- PM owner: app `current`, session `8d7a9c53-c1b2-439b-8d6d-b4bb52b67525`, project `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase / sprint / story:
  - Phase: `phase-02` (`.agent-kit/specs/roadmap/phase-02/PHASE.md`)
  - Sprint: `sprint-03` (`kind: delivery`, domain: `code` — `.agent-kit/specs/roadmap/phase-02/sprints/sprint-03/SPRINT.md`)
  - Story cần hoàn thành:
    - `us-009` — **Meme Chaos Pack: Thêm Thực thể Meme (Bonk Doge, Popcat), Âm thanh Troll (Vine Boom, Bonk, Bruh) & Chữ Nổi Reaction** (`.agent-kit/specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md`)
  - Pointer Sprint `design` đã duyệt: `phase-02 / sprint-01` (`.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/SPRINT.md` — `done`) và bộ thiết kế gốc tại `.agent-kit/specs/design-handoff/`.
  - Pointer Sprint `code` nền tảng: `phase-02 / sprint-02` (`.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md` — `done`).

## Project và snapshot

- Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`. Repo: Git cục bộ (`.git`), branch `master`.
- Snapshot:
  - `HEAD`: `5ad45d22fe9a0ee98f318e6d151322e9d086ade4`
  - `git status --porcelain -- .agent-kit/specs/ client/ server/ shared/ test/ package.json README.md`:
    - `M .agent-kit/specs/roadmap/phase-02/sprints/sprint-03/SPRINT.md`
    - `M .agent-kit/specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md`
  - SHA-256 của byte output `git diff HEAD -- .agent-kit/specs/ client/ server/ shared/ test/ package.json README.md`:
    `e181fdc7ae536b18b4054e04f3bbd3a0de958dbe47048ad1eac82ac53a8a077b`
  - File untracked trong scope: rỗng.
- Thay đổi của người dùng/PM đang có (ngoài scope code sản phẩm, phải giữ nguyên):
  - `M .agent-kit/memory/pm/context.md`
  - `M .agent-kit/user/dashboard/data.js`
  - `?? .agent-kit/handoffs/task-sprint-03-01-code-01/`
  - `?? .agent-kit/memory/lead-code/refs/task-sprint-03-01-code/`
  - `?? .agent-kit/memory/pm/refs/task-sprint-03-01-code/`
- Được đọc:
  - `AGENTS.md`, `.agent-kit/roles/lead-code.md`, `.agent-kit/core/WORKING.md`, `.agent-kit/core/HANDOFF.md`, `.agent-kit/core/CONFLICTS.md`, `.agent-kit/protocols/DISPATCH.md`, `.agent-kit/protocols/CONFIG.md`, `.agent-kit/config.json`, `.agent-kit/flows/CODE.md`, `.agent-kit/flows/CODE-STANDARDS.md`
  - `.agent-kit/specs/MISSION.md`, `.agent-kit/specs/DESIGN.md`, `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md`, `.agent-kit/specs/ROADMAP.md`
  - `.agent-kit/specs/roadmap/phase-02/sprints/sprint-03/SPRINT.md`, `.agent-kit/specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md`
  - `.agent-kit/memory/lead-code/`, `.agent-kit/memory/pm/refs/task-sprint-03-01-code/snapshot-resolution.md`, và toàn bộ source code/tests hiện tại tại project root (`client/`, `server/`, `shared/`, `test/`).
- Được ghi (của `lead-code` và team code theo phân quyền trong `CODE.md`):
  - `lead-code`: `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md`, `.agent-kit/memory/lead-code/`, `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/ack.md`, `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/result.md`, và các thư mục handoff con gửi `coder`, `code-reviewer`, `ux-ui-reviewer`.
  - `coder` (dưới sự điều phối của `lead-code`): Source code, assets, scripts và automated tests của sản phẩm tại project root (`client/`, `server/`, `shared/`, `test/`, `README.md`).

## Việc cần làm

- **Mục tiêu sản phẩm:**
  Triển khai gói tính năng **Meme Chaos Pack (`us-009`)** cho `ChaosForge Live`, tăng tối đa tính giải trí và viral mang đậm văn hóa Twitch, đáp ứng đầy đủ các yêu cầu sau:
  1. **Mở rộng AST Schema (`shared/ast-schema.js`):**
     - Mở rộng `entity` enum: bổ sung `'doge'` và `'popcat'` (thành `['duck', 'ball', 'star', 'boss', 'doge', 'popcat']`).
     - Mở rộng `sfx` enum: bổ sung `'bonk'`, `'bruh'`, `'boom'` (thành `['quack', 'pop', 'laser', 'bonk', 'bruh', 'boom', 'none']`).
     - Đảm bảo AST schema validator (`shared/ast-validate.js`) chấp nhận các giá trị mới này.
  2. **Nâng cấp Natural Language Synthesizer (`shared/synthesize.js` & `server/openai.js`):**
     - Nhận diện từ khóa thực thể meme: `doge`, `cheems`, `bonk` ➔ entity `'doge'`; `popcat`, `cat`, `mèo` ➔ entity `'popcat'`.
     - Nhận diện từ khóa âm thanh meme: `bonk` ➔ sfx `'bonk'`; `bruh` ➔ sfx `'bruh'`; `boom`, `vine boom`, `nổ` ➔ sfx `'boom'`.
     - Duy trì triệt để thuật toán loại trừ mệnh đề phủ định cấp vế câu đa ngôn ngữ (ví dụ: `bonk doge but without bonk sound` thì không sinh sfx `'bonk'`).
  3. **Đồ họa Vector 2D Canvas Meme (`client/overlay/artwork.js`):**
     - Thiết kế vector 2D thuần Canvas cho `doge` (khuôn mặt chó vàng nâu, tai tam giác, búa gõ cộp cộp hoạt họa) và `popcat` (khuôn mặt mèo trắng mồm há to tròn đóng mở theo nhịp hoạt họa).
     - Giữ nguyên hiệu năng mượt mà `≥ 60 FPS` trên canvas trong suốt `1920×1080`, tuyệt đối không dùng ảnh bitmap ngoài gây chậm hoặc lỗi load.
  4. **Tổng hợp Âm thanh Web Audio API Meme (`client/overlay/audio.js`):**
     - Thuật toán Web Audio API tổng hợp âm thanh không dùng file ngoài:
       + `bonk`: âm gõ gỗ resonance / mộc cụp.
       + `bruh`: âm trầm hạ âm đặc trưng.
       + `boom`: Vine Boom bass trầm vang có reverb.
     - Tuân thủ công tắc mute âm thanh đã có trong hệ thống.
  5. **Chữ nổi Reaction Động (Floating Meme Badges):**
     - Khi streamer bấm Spacebar Panic Clear hoặc khi va chạm: hiển thị hiệu ứng chữ nổi phóng to mờ dần (`SKILL ISSUE!`, `RIGGED!`, `EMOTIONAL DAMAGE!`) với màu sắc neon rực rỡ trong 1.5 giây.
  6. **Cartridges Meme Mẫu Sẵn Có:**
     - Bổ sung 2 Cartridge Meme vào danh sách preset trong hệ thống:
       + *"Bonk Doge Hammer Storm"*
       + *"Popcat Chorus Hype"*
  7. **Kiểm thử Tự động & Tiêu chuẩn Mã nguồn:**
     - Cập nhật và bổ sung test cases trong `test/*.test.js` để bao phủ 100% schema và synthesizer mới.
     - Đảm bảo 100% (toàn bộ) file mã nguồn tuân thủ nghiêm ngặt giới hạn **≤ 250 dòng vật lý**.

- **Scope và ngoài scope:**
  - Scope: Cập nhật các module `shared/`, `client/`, `server/`, `test/` và `README.md` để hoàn thành trọn vẹn `us-009`.
  - Ngoài scope: Không can thiệp thay đổi kiến trúc kết nối WebSocket Twitch IRC hay giao thức signaling giữa streamer deck và overlay.
- **Acceptance:**
  1. Gõ prompt tự nhiên chứa từ khóa meme (ví dụ: `!forge bonk doge storm with boom sound` hoặc `!forge popcat`) được biên dịch chính xác sang AST với entity `doge` / `popcat` và SFX tương ứng trong `< 300ms`.
  2. Màn hình Canvas Overlay hiển thị chính xác đồ họa vector 2D của `doge` và `popcat` chuyển động vật lý mượt mà (`≥ 60 FPS`), không lỗi runtime.
  3. Âm thanh Web Audio API phát chính xác âm sắc `bonk`, `bruh`, `boom`.
  4. Khi Panic Clear hoặc va chạm, hiệu ứng chữ nổi `SKILL ISSUE!`, `RIGGED!` hoặc `EMOTIONAL DAMAGE!` hiển thị mượt mà.
  5. Toàn bộ test suite tự động pass 100% và 100% file mã nguồn đều `≤ 250` dòng vật lý.
- **Plan kỹ thuật:** `lead-code` cập nhật `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md` và lập plan kỹ thuật chi tiết tại `.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/technical-plan.md`.
- **Checks và evidence cần trả:**
  - Quy trình `CODE.md`: Technical Plan → `coder` thực thi & đếm dòng (≤ 250 dòng/file) → Freeze snapshot → `code-reviewer` + `ux-ui-reviewer` độc lập → Sửa findings (nếu có) → `lead-code` verify bản tích hợp cuối từ checkout sạch (khởi động server/app thật, chạy automated tests, kiểm tra visual & 6 trạng thái).
- **Quyền và giới hạn:** Không commit Git, không push hay gửi ra ngoài (PM sẽ tự commit khi đóng sprint sau khi nghiệm thu).

## Nơi ghi kết quả

- Request (chỉ đọc): `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/request.md`
- Ack (bạn ghi): `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/ack.md`
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/handoff-result.md)): `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/result.md`
- Evidence: `.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/`
