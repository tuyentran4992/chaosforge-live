# Request tư vấn — điền đủ trước khi gửi

Bạn giữ role **{council-role}**. Đây là tư vấn độc lập, không đọc code. Bạn không nhận lịch sử chat, không đọc memory hay report của thành viên khác, không tự quét repo.

Đọc role card của bạn, rồi làm theo [COUNCIL]({runtime-path}/.agent-kit/flows/COUNCIL.md) và [HANDOFF]({runtime-path}/.agent-kit/core/HANDOFF.md).

- Task-id / handoff-id / revision / run-id: {IDs}. Câu hỏi: {câu hỏi sản phẩm}.
- Người gửi và PM owner: {app, session, project}.
- Người nhận: {role, instance-id (nếu là member), label, profile, app, target}, context mới.
- Memory của bạn: {path}; chỉ tạo hoặc ghi tại đây.
- Product input (đã lọc code): {danh sách path và sha256 hoặc version}. Source code và diff không thuộc input.
- Phạm vi, tiêu chí, giả định, câu hỏi mở: {...}.
- Giao diện, demo, dữ liệu thử được phép: {nếu có}. Không mở DevTools, source hay đổi dữ liệu thật.
- Request (chỉ đọc): {path}. Ack (bạn ghi): {path}. Result (bạn ghi, theo [mẫu]({runtime-path}/.agent-kit/templates/council-result.md)): {path}.
- Mâu thuẫn tài liệu: báo PM ngay theo [CONFLICTS]({runtime-path}/.agent-kit/core/CONFLICTS.md).
