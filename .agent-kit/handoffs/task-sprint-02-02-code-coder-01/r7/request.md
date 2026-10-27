# Coder request — Thực thi 3 Quyết định Chính sách PM r3 (r7)

Tiếp tục role `coder` instance `/root/coder`, task `task-sprint-02-02-code`, handoff `task-sprint-02-02-code-coder-01/r7` supersedes `r6`.
PM owner: Antigravity `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `c:/Users/ADMIN/Desktop/Projects/hackathon`, phase-02 / sprint-02 / us-006, us-007, us-008.

## Input Snapshot
- HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`.
- Tracked scoped diff SHA-256: `a6bc0f28c08d8afb4f6e307467c24bef4990bd4c4d8bc99b7360796ef2d8206a` trên 10 file specs (`MISSION.md`, `DESIGN.md`, `TECHSTACK.md`, `ARCHITECT.md`, `design-handoff/DESIGN-HANDOFF.md`, `design-handoff/DESIGN-MANIFEST.json`, `roadmap/phase-02/sprints/sprint-02/SPRINT.md`, `us-006.md`, `us-007.md`, `us-008.md`).
- 72 untracked product files khớp 100% SHA-256 từ `evidence-r6.md` / `freeze-r6.md`.
- Kiểm tra tính toàn vẹn snapshot và ghi ack trước khi sửa; nếu lệch dừng báo Lead-Code.

## Nhiệm vụ Coder trong r7

Thực hiện trọn vẹn 3 quyết định chính sách chính thức của PM (đã cập nhật vào specs chuẩn):

### 1. Phạm vi Ngôn ngữ/Ngữ nghĩa của Local Fallback & Xử lý Prompt Không Chắc Chắn (`us-007`)
- **Tách mệnh đề và loại trừ mệnh đề phủ định (`shared/synthesize.js` & `server/compiler.js`):**
  - Trước khi dò hiệu ứng dương tính trong `shared/synthesize.js`, tách câu theo ranh giới mệnh đề (`[.;,!?]` hoặc các từ nối `\b(?:but|however|yet|though|although|while|except|and|nhưng|mà)\b`).
  - Loại bỏ / vô hiệu hóa các mệnh đề chứa từ phủ định/né tránh:
    `\b(?:no|not|never|none|nothing|neither|nor|don['’]?t|do\s+not|does\s+not|doesn['’]?t|didn['’]?t|did\s+not|won['’]?t|will\s+not|can['’]?t|cannot|shouldn['’]?t|should\s+not|wouldn['’]?t|would\s+not|mustn['’]?t|must\s+not|avoid(?:s|ed|ing)?|prevent(?:s|ed|ing)?|stop(?:s|ped|ping)?|disable(?:s|d|ing)?|forbid(?:s|den|ding)?|ban(?:s|ned|ning)?|skip(?:s|ped|ping)?|exclude(?:s|d|ing)?|without|against|refuse(?:s|d|ing)?|instead\s+of|rather\s+than)\b`
    hoặc `không|đừng|chớ|tránh|ngăn|cấm|sin|evita(?:r)?|no\s+usar|別|不要|禁止|避免`.
  - Riêng cụm `no gravity` / `without gravity` / `gravity free` / `gravity off` / `không trọng lực` không đứng sau động từ phủ định khác vẫn mang nghĩa `zeroGravity = true`.
  - Đảm bảo `compile('avoid any effect with gravity upside down')`, `prevent reverse gravity`, `without upside down gravity` tuyệt đối không sinh trọng lực âm (`gravity > 0`).
- **Tín hiệu `uncertain: boolean` & Safe Neutral Default:**
  - Nếu sau khi loại mệnh đề phủ định mà không khớp bất kỳ từ khóa cơ chế dương tính nào trong từ điển local, `synthesize(prompt)` trả về cấu hình mặc định trung tính an toàn (`gravity: 0.5`, `collision: 'bounce'`, `spawn_zone: 'edge_ring'`, `tags` có chứa `'uncertain'`) và `compile(prompt)` trả thêm `uncertain: true` (ngược lại `uncertain: false`).
  - Khi `uncertain: true` (hoặc `ast.tags.includes('uncertain')`), UI compiler hiển thị rõ nhãn `LOCAL (DEFAULT)` trên `#telCompile` và `✓ AST SAFE · DEFAULT FALLBACK` trên chân khung Compiler (`[data-verified]`).

### 2. Chính sách ToS Safety Guard 4 Lớp (`us-007`)
- Bổ sung sàng lọc trước khi vào Poll (`client/round/controller.js`): Trong `round.addIdea(idea)`, kiểm tra `isUnsafePrompt(idea)` và từ chối đưa ý tưởng vi phạm vào danh sách Poll công khai trên OBS.

### 3. Cách hiển thị Poll dài trên OBS (`340 × 352 px` — `us-006`, `us-008`)
- Giữ nguyên `MAX_IDEA_LENGTH = 160` trong `shared/sync-contract.js`.
- Trong `client/styles/main.css` / `client/overlay/engine.js`:
  - **Bỏ `-webkit-line-clamp: 2` và `max-height: 2.44em`** trên `.ov-idea__text` để không cắt cụt phần cuối của ý tưởng dài và không phụ thuộc vào hover `title`.
  - Áp dụng cỡ chữ thích ứng theo độ dài ý tưởng (`data-len="sm|md|lg"` trên `.ov-idea__text`: cơ sở `16px` cho câu ngắn `≤ 48` ký tự; tự động thu gọn cỡ chữ/line-height và khoảng cách `.ov-idea` cho câu `49–96` và `97–160` ký tự) sao cho **toàn bộ 160 ký tự của cả 3 lựa chọn đều hiển thị đầy đủ trên màn hình trong khung `340 × 352 px` (`scrollHeight <= clientHeight`)** để khán giả OBS phân biệt được cả 3 lựa chọn ngay cả khi có chung tiền tố dài.
- Cập nhật dòng thông số chữ HUD trong `client/ui/overlay-view.js` thành `16 px base (auto-scales for long poll ideas)`.
- Cập nhật `README.md` (ghi nhận Primary Codex Session ID `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`).

### 4. Tiêu chuẩn Mã nguồn & Kiểm thử
- **MỌI file code (JS, CSS, HTML, test, etc.) BẮT BUỘC ≤ 250 dòng vật lý.**
- Cập nhật và bổ sung regression tests (`test/ast.test.js`, `test/compiler.test.js`, `test/overlay.test.js`, `test/round.test.js`, v.v.).
- Chạy unit tests: `node --test test/*.test.js` (hoặc loại trừ server.test.js nếu chưa có network).
- Đếm số dòng vật lý tất cả các file code, lập bảng SHA-256 chi tiết vào `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r7.md`.
- Trả kết quả về `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r7/result.md`.
