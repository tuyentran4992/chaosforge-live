# Báo cáo Sprint 02 (`r2` → `r3`) — Quyết định Chính sách Local Fallback, ToS Guard & Hiển thị Poll OBS

- **Ngày:** 2026-10-27
- **Trạng thái Sprint `phase-02 / sprint-02`:** `in-progress` (`partial` trên snapshot `freeze-r6.md`; chưa nghiệm thu story và chưa đóng/commit sprint).
- **Codex Session IDs đã lưu chính thức vào hồ sơ dự án (`MISSION.md`, `SPRINT.md`, `bl-003.md`):**
  - **Primary Session ID:** `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`
  - **Chats:** `01a17d17-d86e-70b3-923a-7c4964624d75`, `01a17d17-ccf8-7fb3-8c1f-c72b3a568739`, `01a17cfe-7599-7d32-885d-bcbb2965b153`

## 1. Kết quả kiểm tra độc lập Snapshot `freeze-r6.md`

- `HEAD` (`5f7b2d31b6d765725b32745632e63d43e55d0b97`), diff SHA-256 (`095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`) và **72/72 file sản phẩm untracked** khớp 100% SHA-256; mọi file code đều `≤ 236` dòng vật lý (đạt chuẩn `≤ 250` dòng/file); 31/31 test unit/mock pass.
- Lý do chưa nghiệm thu ở `r2`: Cần quyết định của PM cho 3 vấn đề chính sách sản phẩm/UX và cần chạy kiểm thử tích hợp thực tế (server loopback, browser/OBS, 9 viewports, timing/60fps) trên snapshot mới nhất.

## 2. Ba Quyết định Chính sách Chính thức của PM (Đã cập nhật vào `DESIGN.md`, `us-006.md`, `us-007.md`, `us-008.md` và gửi `r3`)

1. **Phạm vi Ngôn ngữ/Ngữ nghĩa của Local Fallback & Xử lý Prompt Không Chắc Chắn (`us-007`):**
   - Local Fallback (`shared/synthesize.js`) hỗ trợ tập từ khóa & mệnh đề hữu hạn bằng tiếng Anh (kèm các từ khóa demo đa ngôn ngữ Việt/Tây Ban Nha/Trung hiện có).
   - Bắt buộc tách câu theo mệnh đề (`[.;,!?]` / liên từ) và loại bỏ mọi mệnh đề chứa từ phủ định/né tránh (`avoid`, `without`, `never`, `do not`, `don't`, `prevent`, `stop`, `disable`, `forbid`, `skip`, `exclude`, `against`, `not`, `no`, `không`, `đừng`, `tránh`, `sin`, `evitar`, `不要`, `禁止`...) trước khi dò hiệu ứng dương tính — đảm bảo các câu như `avoid any effect with gravity upside down` không bao giờ sinh trọng lực đảo (`gravity > 0`).
   - Khi không khớp từ khóa cơ chế dương tính nào sau khi loại mệnh đề phủ định, trả về AST mặc định trung tính an toàn (`gravity: 0.5`, `collision: 'bounce'`, `tags` chứa `'uncertain'`) kèm `uncertain: true` và hiển thị rõ nhãn `LOCAL (DEFAULT)` / `✓ AST SAFE · DEFAULT FALLBACK` trên HUD.
2. **Chính sách ToS Safety Guard 4 Lớp (`us-007`):**
   - Chuẩn hóa kiến trúc bảo vệ 4 lớp: (1) Bộ lọc từ khóa & ký tự điều khiển tĩnh (`shared/safety.js`) chạy trên prompt gốc trước mọi bước xử lý khác, chuyển sang `6. Blocked` → `RESCUE RUBBER DUCKS`; (2) Lọc `isUnsafePrompt(idea)` ngay tại `round.addIdea` trước khi đưa ý tưởng `!forge` vào bảng Poll OBS; (3) **Closed-World AST Whitelist** (`duck | ball | star | boss`, không bao giờ vẽ văn bản tự do từ prompt lên màn hình Active Chaos); (4) Chế độ `MOD APPROVAL` + phím `Space` Panic Clear `< 100ms`.
3. **Cách hiển thị Poll dài trên OBS (`340 × 352 px` — `us-006`, `us-008`):**
   - Giữ `MAX_IDEA_LENGTH = 160` nhưng **bỏ `-webkit-line-clamp: 2`** trên `.ov-idea__text`; áp dụng cỡ chữ thích ứng (`data-len="sm|md|lg"`, cơ sở `16px` tự thu gọn cho câu `49–96` và `97–160` ký tự) để hiển thị trọn vẹn văn bản cả 3 lựa chọn trong khung `340 × 352 px` mà không cắt chữ hay phụ thuộc vào hover tooltip.
