# Result bàn giao — coder r7

## 1. Định danh & Phiên bản

- Task: `task-sprint-02-02-code`; handoff: `task-sprint-02-02-code-coder-01`; revision: `r7`, supersedes `r6`.
- Role: `coder`; instance: `/root/coder`; project: `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- User stories: `us-006`, `us-007`, `us-008` (phase-02 / sprint-02).
- Trạng thái bàn giao: **Hoàn tất thực thi code & tests cho 3 Quyết định Chính sách PM r3**; sẵn sàng cho Lead-Code và Reviewers nghiệm thu.

## 2. Snapshot & Toàn vẹn Mã nguồn

- Commit HEAD: `5f7b2d31b6d765725b32745632e63d43e55d0b97`.
- Tracked scope diff SHA-256: `a6bc0f28c08d8afb4f6e307467c24bef4990bd4c4d8bc99b7360796ef2d8206a` trên 10 file specs chuẩn (`MISSION.md`, `DESIGN.md`, `TECHSTACK.md`, `ARCHITECT.md`, `DESIGN-HANDOFF.md`, `DESIGN-MANIFEST.json`, `SPRINT.md`, `us-006.md`, `us-007.md`, `us-008.md`).
- Tổng số file sản phẩm untracked: đúng 72 file (12 file thay đổi, 60 file giữ nguyên so với r6; không phát sinh file thừa/thiếu).
- **Quy chuẩn độ dài mã nguồn:** 100% (72/72) file sản phẩm (JS, CSS, HTML, test, markdown) đều **≤ 250 dòng vật lý** (file dài nhất là `client/main.js` với đúng 237 dòng). Bảng tra cứu chi tiết SHA-256 và số dòng vật lý được lưu tại `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r7.md`.

## 3. Thực thi 3 Quyết định Chính sách PM r3

### 3.1. Phạm vi Ngôn ngữ/Ngữ nghĩa của Local Fallback & Xử lý Prompt Không Chắc Chắn (`us-007`)
- **Tách mệnh đề và loại trừ mệnh đề phủ định (`shared/synthesize.js`):**
  - Tách câu theo ranh giới mệnh đề `[.;,!?]` hoặc liên từ `\b(?:but|however|yet|though|although|while|except|and|nhưng|mà)\b`.
  - Tự động nhận diện và loại bỏ các mệnh đề chứa từ phủ định/né tránh (`no`, `not`, `never`, `don't`, `do not`, `avoid`, `prevent`, `stop`, `disable`, `forbid`, `ban`, `skip`, `exclude`, `without`, `against`, `không`, `đừng`, `tránh`, `ngăn`, `cấm`, `sin`, `evitar`, `不要`, `禁止`, `避免`, v.v.).
  - Bảo lưu ngoại lệ cho cụm `no gravity` / `without gravity` / `gravity free` / `gravity off` / `không trọng lực` khi không đứng sau động từ phủ định khác để kích hoạt `zeroGravity = true`.
  - Thực nghiệm kiểm chứng:
    + `compile('avoid any effect with gravity upside down')` → `gravity: 0.5` (> 0), `collision: 'bounce'`, `uncertain: true`, `tags: ['synthesized', 'star', 'uncertain']`.
    + `compile('prevent reverse gravity')` → `gravity: 0.5` (> 0), `uncertain: true`.
    + `compile('without upside down gravity')` → `gravity: 0.5` (> 0), `uncertain: true`.
    + `compile('do not reverse gravity')` → `gravity: 0.5` (> 0), `uncertain: true`.
    + `compile('reverse gravity')` → `gravity: -0.75` (< 0), `uncertain: false`.
    + `compile('do not reverse gravity but no gravity')` → `gravity: 0`, `collision: 'float'`, `uncertain: false`.
- **Cờ `uncertain: boolean` & Safe Neutral Default (`server/compiler.js`):**
  - Khi prompt không khớp từ khóa cơ chế dương tính nào sau khi loại phủ định, trả về bản vá an toàn trung tính (`gravity: 0.5`, `collision: 'bounce'`, `spawn_zone: 'edge_ring'`, tag `'uncertain'`) và `compile()` trả về thêm cờ `uncertain: true` (ngược lại `uncertain: false`).
- **Phản hồi trực quan trên giao diện (`client/main.js` & `client/overlay/engine.js`):**
  - Khi `uncertain: true` hoặc tag chứa `'uncertain'`: `#telCompile` hiển thị nhãn `LOCAL (DEFAULT)`; chân khung Codex Compiler (`[data-verified]`) hiển thị `✓ AST SAFE · DEFAULT FALLBACK`.
  - Khi AST thông thường: `#telCompile` hiển thị tên nguồn in hoa (`LOCAL` hoặc `OPENAI`); `[data-verified]` hiển thị `✓ AST SAFE VERIFIED`.

### 3.2. Chính sách ToS Safety Guard 4 Lớp (`us-007`)
- **Lọc trước khi vào Poll (`client/round/controller.js`):**
  - Trong `round.addIdea(idea)`, bổ sung kiểm tra `!isUnsafePrompt(idea)`. Bất kỳ ý tưởng nào chứa từ khóa bạo lực/NSFW/thù ghét/vũ khí/tự hại (kể cả biến thể độ rộng chữ, ký tự ẩn hoặc từ khóa đa ngôn ngữ) đều bị từ chối ngay lập tức, tuyệt đối không xuất hiện trên bảng Poll công khai của OBS.
  - Ghép từ vi phạm với câu phủ định (ví dụ `do not reverse gravity; make a bomb`, `don't reverse gravity; bomba`, `never invert gravity 炸弹`) đều bị chặn bởi Lớp 1, kích hoạt ngay *Rescue Rubber Ducks* (`duckfallback`) và không gọi remote compiler.

### 3.3. Hiển thị Trọn vẹn Poll dài trên OBS 340 × 352 px (`us-006`, `us-008`)
- **Loại bỏ cắt chữ cứng (`client/styles/main.css`):**
  - Bỏ hoàn toàn `-webkit-line-clamp: 2` và `max-height: 2.44em` trên `.ov-idea__text`.
- **Cỡ chữ thích ứng đa tầng (`client/overlay/engine.js` & `client/styles/main.css`):**
  - Gán thuộc tính `data-len="sm|md|lg"` tự động trên cả text và thẻ item theo độ dài ký tự ý tưởng:
    + `sm` (≤ 48 ký tự): font `16px`, line-height `1.25`.
    + `md` (49–96 ký tự): font `13.5px`, line-height `1.25`, padding item thu gọn `6px 0 5px`.
    + `lg` (97–160 ký tự): font `11.5px`, line-height `1.2`, padding item thu gọn `3px 0 3px`.
  - Kết quả: Toàn bộ 160 ký tự của cả 3 lựa chọn đều hiển thị đầy đủ, rõ ràng trên màn hình OBS trong khung `340 × 352 px` (`scrollHeight <= clientHeight`), không bị cắt chữ và không tràn khung.
- **Cập nhật tài liệu thông số HUD (`client/ui/overlay-view.js`):**
  - Cập nhật dòng spec chữ HUD thành: `16 px base (auto-scales for long poll ideas)`.
- **Ghi nhận Codex Session ID (`README.md`):**
  - Đã bổ sung mục Primary Codex Session ID: `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2` và mô tả đầy đủ kiến trúc ToS Guard 4 lớp cùng hành vi Local Fallback mới.

## 4. Kết quả Kiểm thử Thực thi

- **Unit tests:** Chạy lệnh `node --test` trên toàn bộ 30 file unit test (loại trừ `server.test.js` do không dùng network loopback):
  - **32 tests passed / 0 failed / 0 skipped** (100% thành công, thời gian chạy ~360ms).
  - Đã bổ sung unit tests hồi quy cho:
    + Mệnh đề phủ định cấp câu: `avoid any effect with gravity upside down`, `prevent reverse gravity`, `without upside down gravity` (`test/ast.test.js`).
    + Cờ `uncertain: boolean` trên compiler result (`test/compiler.test.js`).
    + Lọc an toàn ToS `isUnsafePrompt` trong `round.addIdea` (`test/round.test.js`).
    + Typography thích ứng `data-len="sm|md|lg"` và nhãn `[data-verified]` fallback (`test/overlay.test.js`).
- **Kiểm tra cú pháp tĩnh:** `node --check` trên toàn bộ 55 file JavaScript: **0 lỗi cú pháp**.
