# Mâu thuẫn snapshot — task-sprint-03-01-code

- Người phát hiện: `lead-code`, context Codex desktop mới; instance ID không được công cụ cung cấp. Task `task-sprint-03-01-code`, handoff `task-sprint-03-01-code-01/r1`.
- PM owner: app `current` (Antigravity), session `8d7a9c53-c1b2-439b-8d6d-b4bb52b67525`, project `C:/Users/ADMIN/Desktop/Projects/hackathon`; route: `pending PM relay`. Coordinator: không có.
- Nguồn A: `.agent-kit/handoffs/task-sprint-03-01-code-01/r1/request.md`, mục Project và snapshot: toàn bộ status rỗng, diff scope rỗng.
- Nguồn B: snapshot Git quan sát thực tế được ghi trong `.agent-kit/handoffs/task-sprint-03-01-code-01/r1/ack.md`: hai file sprint/story trong scope bị sửa, cùng hai file ngoài scope và request untracked. Diff scope SHA256 `e181fdc7ae536b18b4054e04f3bbd3a0de958dbe47048ad1eac82ac53a8a077b`.
- Bất đồng: fact về snapshot, không thể đồng thời đúng. Diff hai file sprint/story chuyển status `todo` thành `in-progress`; chưa kết luận nguồn nào là snapshot PM định giao. HEAD khớp request.
- Tác động: dừng plan phụ thuộc input, dispatch, implementation và review; không sửa hay hoàn nguyên các thay đổi. Theo HANDOFF, không tiếp tục phần bị ảnh hưởng khi snapshot không khớp.
- Thẩm quyền: PM cần đối soát thay đổi hiện tại và phát revision request với snapshot thực tế, nếu đó là baseline được chủ ý giao. Chỉ người dùng/PM có thẩm quyền quyết định hướng xử lý.
- Evidence: ack nêu scope, hash và status; diff thực tế có thể kiểm lại bằng Git. Không tự đánh resolved.
- Thông báo PM: `pending relay`, chưa có bằng chứng PM nhận; thông báo user: đã nêu trong tiến độ của phiên này. Resolution/revalidation: pending.

Prompt PM: Có mâu thuẫn giữa snapshot trong request `task-sprint-03-01-code-01/r1` và trạng thái Git thực tế, ảnh hưởng toàn bộ triển khai us-009. Đọc `.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/conflict-snapshot.md` và ack, kiểm lại status/diff, bảo toàn thay đổi, rồi phát revision request mới với snapshot đúng nếu phù hợp. Không coi thông báo này là nghiệm thu.
