# Nghị quyết xử lý lệch Snapshot — task-sprint-03-01-code

- Thời điểm: 2026-10-28 17:58 (giờ địa phương).
- Tham chiếu: Báo cáo lệch snapshot của `lead-code` tại `.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/conflict-snapshot.md` và `ack.md` tại `.agent-kit/handoffs/task-sprint-03-01-code-01/r1/ack.md`.

## 1. Nguyên nhân bất đồng
- Ở lượt phát hành `r1` (`task-sprint-03-01-code-01/r1/request.md`), file request được tạo trước khi PM cập nhật trạng thái User Story `us-009` từ `todo` sang `in-progress` trong `SPRINT.md` và `us-009.md`.
- Khi `lead-code` tiếp nhận và kiểm tra snapshot theo quy chuẩn HANDOFF, `git status` thực tế ghi nhận 2 file trong scope specs bị sửa và 2 file ngoài scope (`context.md`, `data.js`) bị sửa, với SHA256 diff là `e181fdc7ae536b18b4054e04f3bbd3a0de958dbe47048ad1eac82ac53a8a077b`, không khớp với mô tả rỗng trong `r1/request.md`.
- `lead-code` đã hành động đúng quy trình khi dừng triển khai và báo cáo mâu thuẫn cho PM.

## 2. Quyết định xử lý của PM
- Xác nhận snapshot chuẩn: Baseline thực tế là commit `HEAD` `5ad45d22fe9a0ee98f318e6d151322e9d086ade4` cùng với thay đổi trạng thái `in-progress` của `SPRINT.md` và `us-009.md` (SHA256 diff: `e181fdc7ae536b18b4054e04f3bbd3a0de958dbe47048ad1eac82ac53a8a077b`).
- Phát hành revision mới: `task-sprint-03-01-code-01/r2` thay thế (`supersedes`) `r1`.
- Ghi nhận đầy đủ hiện trạng Git thực tế, bảo lưu nguyên vẹn mọi thay đổi ngoài scope (`.agent-kit/memory/`, `.agent-kit/user/dashboard/data.js`, `.agent-kit/handoffs/`).
- Bàn giao `r2` cho `lead-code` để tiếp tục triển khai theo đúng `CODE.md`.
