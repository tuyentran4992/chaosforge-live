# Nghị quyết Xử lý Mâu thuẫn Whitelist Thiết kế — task-sprint-03-01-code

- Thời điểm: 2026-10-28 18:03 (giờ địa phương).
- Tham chiếu: Báo cáo mâu thuẫn của `lead-code` tại `.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/conflict-design-whitelist.md` và `result.md` r2 tại `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/result.md`.

## 1. Bản chất Mâu thuẫn
- Trong `.agent-kit/specs/DESIGN.md` (mục Chính sách ToS Safety Guard 4 Lớp, Lớp 3), contract Closed-World AST Whitelist trước đó ghi giới hạn cố định ở 4 thực thể (`duck | ball | star | boss`) và 4 âm thanh synth (`quack | pop | laser | none`).
- User Story `us-009` và handoff request yêu cầu mở rộng bộ thực thể (thêm `doge`, `popcat`) và bộ âm thanh (thêm `bonk`, `bruh`, `boom`).
- Hai văn bản cùng là nguồn contract hiện hành mâu thuẫn trực tiếp về số lượng và enum cho phép. `lead-code` đã dừng và báo cáo đúng quy trình `CONFLICTS.md`.

## 2. Quyết định Xử lý của PM
1. **Chuẩn hóa & Mở rộng Whitelist trong `DESIGN.md`:**
   - PM đã cập nhật trực tiếp `.agent-kit/specs/DESIGN.md` (Lớp 3): Duy trì nguyên vẹn kiến trúc an toàn Closed-World Whitelist (tuyệt đối không render text tự do hay nạp resource ngoài), chính thức mở rộng tập enum được phép lên **6 thực thể vector 2D/sprite cố định (`duck | ball | star | boss | doge | popcat`)** và **7 âm thanh synth Web Audio (`quack | pop | laser | bonk | bruh | boom | none`)**.
   - Ghi nhận bổ sung hiệu ứng Chữ nổi reaction neon (`SKILL ISSUE!`, `RIGGED!`, `EMOTIONAL DAMAGE!`) mờ dần trong 1.5s khi Panic Clear / va chạm.
2. **Làm rõ Đường dẫn Module Kỹ thuật:**
   - Ghi nhận phát hiện chính xác của `lead-code`: Module âm thanh Web Audio trong kiến trúc mã nguồn thực tế nằm tại `client/audio/sfx.js` (thay vì `client/overlay/audio.js` như cách gọi mô tả trước đó). Coder sẽ triển khai thuật toán tổng hợp âm thanh meme trực tiếp tại `client/audio/sfx.js` (hoặc tách module phụ trợ trong `client/audio/` để đảm bảo ngân sách dòng ≤ 250).
   - Module presets/cartridges thực tế là `client/cartridges/library.js`.
3. **Phát hành Revision `r3`:**
   - Phát hành `task-sprint-03-01-code-01/r3` thay thế (`supersedes`) `r2`.
   - Tính toán và chốt snapshot Git chính xác (bao gồm `DESIGN.md`, `SPRINT.md`, `us-009.md`).
   - Bàn giao lại cho `lead-code` để dỡ bỏ trạng thái blocked và tiến hành phân bổ kỹ thuật cho `coder`.
