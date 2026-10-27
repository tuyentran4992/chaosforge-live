# Result bàn giao — coder r8

## 1. Định danh & Phiên bản

- Task: `task-sprint-02-02-code`; handoff: `task-sprint-02-02-code-coder-01`; revision: `r8`, supersedes `r7`.
- Role: `coder`; instance: `/root/coder`; project: `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- User stories: `us-006`, `us-007`, `us-008` (phase-02 / sprint-02).
- Trạng thái bàn giao: **Hoàn tất tinh chỉnh CSS Poll 340 × 352 px và đo kiểm thực tế trên browser Edge**; sẵn sàng cho Lead-Code và Reviewers nghiệm thu.

## 2. Snapshot & Toàn vẹn Mã nguồn

- Commit HEAD: `5f7b2d31b6d765725b32745632e63d43e55d0b97`.
- Tracked scope diff SHA-256: `a6bc0f28c08d8afb4f6e307467c24bef4990bd4c4d8bc99b7360796ef2d8206a` trên 10 file specs chuẩn (`MISSION.md`, `DESIGN.md`, `TECHSTACK.md`, `ARCHITECT.md`, `DESIGN-HANDOFF.md`, `DESIGN-MANIFEST.json`, `SPRINT.md`, `us-006.md`, `us-007.md`, `us-008.md`).
- Tổng số file sản phẩm untracked: đúng 72 file (1 file thay đổi là `client/styles/main.css`, 71 file giữ nguyên so với r7).
- **Quy chuẩn độ dài mã nguồn:** 100% (72/72) file sản phẩm đều **≤ 250 dòng vật lý** (`client/styles/main.css` đạt 67 dòng, file dài nhất vẫn là `client/main.js` với 237 dòng). Bảng tra cứu SHA-256 chi tiết được lưu tại `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r8.md`.

## 3. Phân tích Nguyên nhân Gốc rễ & Giải pháp Tinh chỉnh CSS (r8)

### 3.1. Nguyên nhân Gốc rễ (Root Cause)
- Khi Lead-Code đo kiểm thực tế trên Microsoft Edge với 3 ý tưởng dài tối đa 160 ký tự, kết quả đo được:
  + `pollScrollHeight = 351px` (vượt `clientHeight = 350px` đúng 1px).
  + `pollScrollWidth = 339px` (vượt `clientWidth = 338px` đúng 1px).
- **Phát hiện:** Trong `client/styles/handoff-07.css` dòng 218:
  ```css
  .ov-poll::after { right: -1px; bottom: -1px; border-left: 0; border-top: 0; }
  ```
  Pseudo-element `::after` (dùng để vẽ góc bo/trang trí của khung poll) có tọa độ `right: -1px; bottom: -1px;` vượt ra khỏi cạnh ngoài viền 1px của container, khiến Chromium/Edge engine tính toán diện tích cuộn của `.ov-poll` tự động dãn thêm 1px ở cả chiều ngang và chiều dọc ngay cả khi chưa có nội dung dài.

### 3.2. Giải pháp Thực thi trong `client/styles/main.css`
1. **Triệt tiêu dãn biên:** Thêm quy tắc ghi đè `.ov-poll::after { right: 0; bottom: 0; }` để góc trang trí nằm khít trong khung viền container, loại bỏ hoàn toàn 1px dư thừa cơ bản.
2. **Khung chứa ổn định:** Khai báo rõ ràng `.ov-poll { box-sizing: border-box; padding: 14px 16px 12px; }`.
3. **Khoảng cách tối ưu:**
   - `.ov-poll__meta { margin-top: 5px; }`
   - `.ov-poll__list { margin: 2px 0 0; }`
4. **Bảo vệ ngắt chữ và co giãn:**
   - `.ov-idea__text` bổ sung: `overflow: hidden; min-width: 0; box-sizing: border-box; word-break: break-word;`
5. **Tinh chỉnh padding & line-height thích ứng:**
   - `.ov-idea[data-len="md"] { padding: 5px 0 5px; gap: 8px; }`
   - `.ov-idea[data-len="lg"] { padding: 1px 0 1px; gap: 5px; }`
   - `.ov-idea__text[data-len="lg"] { font-size: 11.5px; line-height: 1.15; }`
6. **Bảo lưu tuyệt đối các regex assertion trong `test/overlay.test.js`:**
   - Khung cố định: `height: 352px; overflow: hidden;`
   - Bỏ clamp: `-webkit-line-clamp: unset;`
   - Kích thước font: `font-size: 16px;` (`sm`), `font-size: 13.5px;` (`md`), `font-size: 11.5px;` (`lg`).

## 4. Đo kiểm Thực tế trên Trình duyệt Headless (Microsoft Edge)

Đo đạc tự động bằng Playwright trên Microsoft Edge thật trong môi trường máy chủ tại chỗ:
- **Kịch bản 1: 3 lựa chọn dài cực hạn (160 ký tự chuỗi liên tục không ngắt):**
  + `pollScrollHeight`: **350px** (<= `clientHeight` 350px, overflow = 0px).
  + `pollScrollWidth`: **338px** (<= `clientWidth` 338px, overflow = 0px).
- **Kịch bản 2: 3 lựa chọn văn bản tiếng Anh tự nhiên (160 ký tự có dấu cách):**
  + `pollScrollHeight`: **350px** (<= `clientHeight` 350px, overflow = 0px).
  + `pollScrollWidth`: **338px** (<= `clientWidth` 338px, overflow = 0px).
- **Hiển thị trực quan:** Cả 160 ký tự của 3 lựa chọn đều hiển thị nguyên vẹn, đầy đủ, không phát sinh bất kỳ thanh cuộn ngang/dọc nào.

## 5. Kết quả Kiểm thử Toàn bộ Hệ thống

- Chạy toàn bộ test suite (`npm test` tương đương `node --test test/*.test.js`):
  - **36 passed / 0 failed / 0 skipped** trên toàn bộ 36 ca kiểm thử.
  - Bao gồm cả các integration test của `server.test.js`, `overlay.test.js`, `compiler.test.js`, `ast.test.js`, `round.test.js`.
- Kiểm tra cú pháp tĩnh (`node --check` trên 55 file JS): **0 lỗi cú pháp**.
- Mọi tiêu chuẩn acceptance của PM (`us-006`, `us-007`, `us-008`) đều được thỏa mãn 100%.
