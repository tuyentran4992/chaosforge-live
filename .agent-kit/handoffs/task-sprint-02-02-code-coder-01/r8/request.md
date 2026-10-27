# Coder request — Tinh chỉnh CSS Poll 340x352 px (r8)

Tiếp tục role `coder` instance `/root/coder`, task `task-sprint-02-02-code`, handoff `task-sprint-02-02-code-coder-01/r8` supersedes `r7`.
PM owner: Antigravity `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `c:/Users/ADMIN/Desktop/Projects/hackathon`, phase-02 / sprint-02 / us-006, us-007, us-008.

## Input Snapshot
- Commit HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`.
- Tracked spec diff SHA-256: `a6bc0f28c08d8afb4f6e307467c24bef4990bd4c4d8bc99b7360796ef2d8206a` trên 10 file specs chuẩn.
- 72 untracked product files khớp 100% SHA-256 từ `evidence-r7.md` / `freeze-r7.md`.

## Lý do và Yêu cầu chỉnh sửa trong r8
Lead-Code đã chạy kiểm thử tích hợp trực tiếp trên browser/OBS headless (Microsoft Edge) và phát hiện:
Khi hiển thị đồng thời 3 ý tưởng Poll dài tối đa 160 ký tự trong khung cố định `.ov-poll` (kích thước `340 × 352 px`, viền 1px nên `clientHeight = 350px`, `clientWidth = 338px`):
- `pollScrollHeight` đo được thực tế là **351px** (lớn hơn `clientHeight = 350px` đúng 1px).
- `pollScrollWidth` đo được thực tế là **339px** (lớn hơn `clientWidth = 338px` đúng 1px).
Điều này vi phạm tiêu chuẩn acceptance của PM: `scrollHeight <= clientHeight` và `scrollWidth <= clientWidth` trong khung `340 × 352 px`.

### Yêu cầu thực hiện:
1. Trong `client/styles/main.css`:
   - Tinh chỉnh CSS cho `.ov-idea[data-len="lg"]` và `.ov-idea__text[data-len="lg"]` (và padding/margin của `.ov-poll` nếu cần) để đảm bảo:
     + Padding của `.ov-idea[data-len="lg"]` giảm xuống (ví dụ `2px 0 2px` thay vì `3px 0 3px`), `gap: 5px`.
     + Đảm bảo `min-width: 0;` và `word-break: break-word;` hoặc `overflow-wrap: anywhere;` trên `.ov-idea__text`.
     + Đảm bảo khi cả 3 lựa chọn dài tối đa 160 ký tự, `poll.scrollHeight <= poll.clientHeight` (ví dụ `scrollHeight` khoảng 330–345px ≤ 350px) và `poll.scrollWidth <= poll.clientWidth` (≤ 338px).
     + Giữ nguyên regex kiểm tra của `test/overlay.test.js`:
       * `height: 352px;`
       * `-webkit-line-clamp: unset;`
       * `font-size: 16px;` cho `sm`
       * `font-size: 13.5px;` cho `md`
       * `font-size: 11.5px;` cho `lg`
2. Đảm bảo mọi file code đều **≤ 250 dòng vật lý**.
3. Chạy `npm test` kiểm tra 36/36 tests pass 100%.
4. Lập bảng hash SHA-256 và số dòng vật lý toàn bộ 72 file vào `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r8.md`.
5. Ghi kết quả vào `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r8/result.md` và thông báo cho Lead-Code.
