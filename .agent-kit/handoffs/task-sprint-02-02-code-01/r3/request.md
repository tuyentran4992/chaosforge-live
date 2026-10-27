# Request bàn giao — điền đủ trước khi gửi

Bạn giữ duy nhất role **`lead-code`** trong task này, tiếp tục trong phiên Codex của bạn (`/root`). Request `r3` này thay thế (`supersedes`) `r2` sau khi PM đã tự kiểm snapshot `freeze-r6.md` và chốt dứt điểm 3 quyết định chính sách sản phẩm/UX trong các nguồn chuẩn. Request này không cấp thêm quyền ngoài quyền người dùng đã cho.

Đọc [AGENTS.md](c:/Users/ADMIN/Desktop/Projects/hackathon/AGENTS.md), role card của bạn (`.agent-kit/roles/lead-code.md`), rồi làm theo [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md) và [CODE](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/CODE.md).

## Định danh

- Task-id: `task-sprint-02-02-code`. Handoff-id: `task-sprint-02-02-code-01`. Revision: `3` (`r3`). Supersedes: `r2` (`.agent-kit/handoffs/task-sprint-02-02-code-01/r2/request.md`).
- Người gửi: `pm`, app: `current` (Antigravity). Người nhận: `lead-code`, app: `Codex` (`/root`).
- PM owner: app `current`, session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase / sprint / story:
  - Phase: `phase-02` (`.agent-kit/specs/roadmap/phase-02/PHASE.md`)
  - Sprint: `sprint-02` (`kind: delivery`, domain: `code` — `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md`)
  - Stories:
    1. `us-006`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md`
    2. `us-007`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-007.md`
    3. `us-008`: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-008.md`

## Ba Quyết định Chính sách Chính thức của PM (Đã cập nhật vào `MISSION.md`, `DESIGN.md`, `TECHSTACK.md`, `ARCHITECT.md`, `SPRINT.md`, `us-006.md`, `us-007.md`, `us-008.md`)

1. **Phạm vi Ngôn ngữ/Ngữ nghĩa của Local Fallback & Xử lý Prompt Không Chắc Chắn (`us-007`):**
   - **Phạm vi hỗ trợ:** Khi có `OPENAI_API_KEY` + `COMPILER_ACCESS_TOKEN`, backend gọi OpenAI Structured Outputs (`json_schema` AST). Khi chạy ở chế độ **Local Fallback (`shared/synthesize.js`)**, phạm vi hỗ trợ được định nghĩa tường minh là **bộ quy tắc từ khóa & mệnh đề hữu hạn** cho **tiếng Anh** (kèm nhóm từ khóa demo đa ngôn ngữ Việt/Tây Ban Nha/Trung hiện có: `duck/vịt/pato/鸭`, `boss/trùm`, `star/ngôi sao/星`, `ball/bóng`, `shield/khiên/escudo`, `laser/laze`, `float/zero gravity/no gravity/without gravity/không trọng lực`, `reverse/invert/upside down gravity/đảo ngược trọng lực/反重力/gravedad invertida`, `silent/no sound/không âm thanh`).
   - **Loại trừ mệnh đề phủ định cấp vế câu (Clause-Level Negation):** Trước khi dò hiệu ứng dương tính trong `shared/synthesize.js`, tách câu theo ranh giới mệnh đề (`[.;,!?]` hoặc các từ nối `\b(?:but|however|yet|though|although|while|except|and|nhưng|mà)\b`) và loại bỏ/vô hiệu hóa mọi mệnh đề chứa từ phủ định/né tránh (`\b(?:no|not|never|none|nothing|neither|nor|don['’]?t|do\s+not|does\s+not|doesn['’]?t|didn['’]?t|did\s+not|won['’]?t|will\s+not|can['’]?t|cannot|shouldn['’]?t|should\s+not|wouldn['’]?t|would\s+not|mustn['’]?t|must\s+not|avoid(?:s|ed|ing)?|prevent(?:s|ed|ing)?|stop(?:s|ped|ping)?|disable(?:s|d|ing)?|forbid(?:s|den|ding)?|ban(?:s|ned|ning)?|skip(?:s|ped|ping)?|exclude(?:s|d|ing)?|without|against|refuse(?:s|d|ing)?|instead\s+of|rather\s+than)\b` hoặc `không|đừng|chớ|tránh|ngăn|cấm|sin|evita(?:r)?|no\s+usar|別|不要|禁止|避免`; riêng cụm `no gravity` / `without gravity` / `gravity free` / `gravity off` / `không trọng lực` không đứng sau động từ phủ định khác vẫn mang nghĩa `zeroGravity = true`). Đảm bảo `compile('avoid any effect with gravity upside down')`, `prevent reverse gravity`, `without upside down gravity` tuyệt đối không sinh trọng lực âm (`gravity > 0`).
   - **Tín hiệu `uncertain: boolean` & Safe Neutral Default:** Nếu sau khi loại mệnh đề phủ định mà không khớp bất kỳ từ khóa cơ chế dương tính nào trong từ điển local, `synthesize(prompt)` trả về cấu hình mặc định trung tính an toàn (`gravity: 0.5`, `collision: 'bounce'`, `spawn_zone: 'edge_ring'`, `tags` có chứa `'uncertain'`) và `compile(prompt)` trả thêm `uncertain: true` (ngược lại `uncertain: false`). Khi `uncertain: true` (hoặc `ast.tags.includes('uncertain')`), UI hiển thị rõ nhãn `LOCAL (DEFAULT)` trên `#telCompile` và `✓ AST SAFE · DEFAULT FALLBACK` trên chân khung Compiler (`[data-verified]`) để thông báo minh bạch cho streamer/giám khảo.
2. **Chính sách ToS Safety Guard 4 Lớp (`us-007`):**
   - Chuẩn hóa **Kiến trúc An toàn Phát sóng 4 Lớp** (không tuyên bố regex tĩnh là kiểm duyệt NLP toàn cầu):
     1. Bộ lọc từ khóa & ký tự điều khiển tĩnh (`shared/safety.js`) chạy trên prompt gốc trước mọi bước xử lý khác, chuyển thẳng sang `6. Blocked` → `RESCUE RUBBER DUCKS` (`duckfallback`).
     2. **Bổ sung sàng lọc trước khi vào Poll (`client/round/controller.js`):** Trong `round.addIdea(idea)`, kiểm tra `isUnsafePrompt(idea)` và từ chối đưa ý tưởng vi phạm vào danh sách Poll công khai trên OBS.
     3. **Closed-World AST Whitelist (`shared/ast-validate.js`):** Lớp phủ vật lý khi `Active Chaos` chỉ vẽ 4 hình mẫu cố định (`duck | ball | star | boss`) và phát 4 âm thanh synth, tuyệt đối không render văn bản tự do từ prompt.
     4. Chế độ `MOD APPROVAL` và phím `Space` Panic Clear `< 100ms`.
3. **Cách hiển thị Poll dài trên OBS (`340 × 352 px` — `us-006`, `us-008`):**
   - Giữ nguyên `MAX_IDEA_LENGTH = 160` trong `shared/sync-contract.js`.
   - Trong `client/styles/main.css` / `client/overlay/engine.js`: **Bỏ `-webkit-line-clamp: 2` và `max-height: 2.44em`** trên `.ov-idea__text` để không cắt cụt phần cuối của ý tưởng dài và không phụ thuộc vào hover `title`.
   - Áp dụng cỡ chữ thích ứng theo độ dài ý tưởng (`data-len="sm|md|lg"` trên `.ov-idea__text`: cơ sở `16px` cho câu ngắn `≤ 48` ký tự; tự động thu gọn cỡ chữ/line-height và khoảng cách `.ov-idea` cho câu `49–96` và `97–160` ký tự) sao cho **toàn bộ 160 ký tự của cả 3 lựa chọn đều hiển thị đầy đủ trên màn hình trong khung `340 × 352 px` (`scrollHeight <= clientHeight`)** để khán giả OBS phân biệt được cả 3 lựa chọn ngay cả khi có chung tiền tố dài.
   - Cập nhật dòng thông số chữ HUD trong `client/ui/overlay-view.js` thành `16 px base (auto-scales for long poll ideas)` và cập nhật `README.md` (kèm ghi nhận **Primary Codex Session ID `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`** trong `README.md` và `SPRINT.md`).

## Project và snapshot

- Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`. Repo: Git cục bộ (`.git`), branch `master`.
- Snapshot tại thời điểm gửi `r3`:
  - `HEAD`: `5f7b2d31b6d765725b32745632e63d43e55d0b97`
  - `git status --porcelain -- .agent-kit/specs/MISSION.md .agent-kit/specs/DESIGN.md .agent-kit/specs/TECHSTACK.md .agent-kit/specs/ARCHITECT.md .agent-kit/specs/ROADMAP.md .agent-kit/specs/design-handoff .agent-kit/specs/roadmap/phase-02`:
    - `M .agent-kit/specs/ARCHITECT.md`
    - `M .agent-kit/specs/DESIGN.md`
    - `M .agent-kit/specs/MISSION.md`
    - `M .agent-kit/specs/TECHSTACK.md`
    - `M .agent-kit/specs/design-handoff/DESIGN-HANDOFF.md`
    - `M .agent-kit/specs/design-handoff/DESIGN-MANIFEST.json`
    - `M .agent-kit/specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md`
    - `M .agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md`
    - `M .agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-007.md`
    - `M .agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/us-008.md`
  - SHA-256 của `git diff HEAD -- .agent-kit/specs/MISSION.md .agent-kit/specs/DESIGN.md .agent-kit/specs/TECHSTACK.md .agent-kit/specs/ARCHITECT.md .agent-kit/specs/ROADMAP.md .agent-kit/specs/design-handoff .agent-kit/specs/roadmap/phase-02`:
    `a6bc0f28c08d8afb4f6e307467c24bef4990bd4c4d8bc99b7360796ef2d8206a`
  - 72 file sản phẩm untracked hiện có trong scope: Khớp 100% bảng SHA-256 tại `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r6.md` và `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/freeze-r6.md`.
- Thay đổi ngoài scope (phải giữ nguyên): `.agent-kit/specs/backlog/`, `.agent-kit/memory/pm/`, `.agent-kit/user/`.
- Được đọc: Như `r2` + `.agent-kit/memory/pm/refs/task-sprint-02-02-code/r2-review-and-r3-decisions.md`.
- Được ghi: `.agent-kit/specs/TECHSTACK.md`, `.agent-kit/specs/ARCHITECT.md`, `.agent-kit/memory/lead-code/`, `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/ack.md`, `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/result.md`, các thư mục handoff revision tiếp theo gửi `coder` (`r7`), `code-reviewer` (`r6`), `ux-ui-reviewer` (`r6`), và source code/tests sản phẩm ngoài `.agent-kit/` (do `coder` ghi).

## Việc cần làm

1. Ghi `ack.md` cho `r3`, cập nhật `technical-plan.md` theo 3 quyết định chính sách của PM.
2. Tiếp tục với **chính `coder` cũ (`/root/coder`, revision `r7`)** để thực hiện các chỉnh sửa:
   - Cập nhật `shared/synthesize.js` và `server/compiler.js`: xử lý loại trừ mệnh đề phủ định cấp vế câu (bao gồm `avoid any effect with gravity upside down` trả `gravity > 0`), bổ sung cờ `uncertain: boolean` và tag `'uncertain'` khi câu không khớp từ khóa dương tính nào, hiển thị `LOCAL (DEFAULT)` trên `#telCompile` và `✓ AST SAFE · DEFAULT FALLBACK` trên `[data-verified]`.
   - Cập nhật `client/round/controller.js`: lọc `isUnsafePrompt(idea)` trong `addIdea(idea)` trước khi đưa vào Poll.
   - Cập nhật `client/styles/main.css`, `client/overlay/engine.js`, `client/ui/overlay-view.js`: bỏ `-webkit-line-clamp: 2` trên `.ov-idea__text`, áp dụng cỡ chữ thích ứng (`data-len="sm|md|lg"`) để hiển thị đầy đủ 3 lựa chọn Poll dài tới 160 ký tự trong khung `340 × 352 px` không bị cắt chữ hay tràn khung.
   - Cập nhật `README.md` và các bài test (`test/ast.test.js`, `test/compiler.test.js`, `test/overlay.test.js`, `test/round.test.js`, `test/browser-*.js`), giữ mọi file code ≤ 250 dòng vật lý.
3. Chốt freeze snapshot mới (`freeze-r7.md`) → giao **chính hai reviewer cũ (`code-reviewer` `/root/code_reviewer` và `ux-ui-reviewer` `/root/ux_reviewer`, revision `r6`)** kiểm tra lại trên snapshot mới → khi quyền loopback khả dụng, chạy đầy đủ `npm test` (bao gồm `test/server.test.js`), khởi động sản phẩm thật, chạy kiểm thử trình duyệt/OBS, 9 kích thước viewport, đo timing (`< 2.5s` compile, `< 100ms` panic, `0.70` safe zone alpha, 60fps) và `lead-code` verify bản tích hợp mới nhất trước khi ghi `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/result.md`.

## Nơi ghi kết quả

- Request (chỉ đọc): `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/request.md`
- Ack (bạn ghi): `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/ack.md`
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/handoff-result.md)): `.agent-kit/handoffs/task-sprint-02-02-code-01/r3/result.md`
- Evidence: `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/`
