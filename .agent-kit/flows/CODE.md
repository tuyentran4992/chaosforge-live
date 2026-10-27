# Flow team code

PM → Lead-Code → một Coder → freeze → Code Reviewer + UX/UI Reviewer → Lead-Code tổng hợp → Coder sửa → kiểm lại → Lead-Code verify bản mới nhất → PM.

## Ai làm gì

| Role | Làm | Không làm |
| --- | --- | --- |
| PM | Product brief: mục tiêu, giá trị, acceptance, quyền | Chọn module, file, line budget; chia technical task |
| Lead-Code | Technical plan, giao việc, freeze, tổng hợp, verify cuối | Quyết nghiệp vụ, acceptance; sửa nguồn (kể cả khi Coder chưa chạy) |
| Coder | Là người duy nhất sửa nguồn, đếm dòng, chạy checks | Tự mở scope, tự đóng finding |
| Code Reviewer | Đọc code: đúng sai, API, contract, SRP, giới hạn 250 dòng, tests | Sửa nguồn |
| UX/UI Reviewer | Chạy và xem UI, flow của phần thay đổi so với DESIGN và story | Sửa nguồn; coi build pass là visual pass; hồi quy toàn sản phẩm (việc của QA) |

Mỗi role một context mới, độc lập với nhau. Member không giao việc tiếp cho agent khác.

## Các bước

1. **Plan.** Lead-Code đọc roadmap → phase → sprint → stories liên quan. Viết plan tại `.agent-kit/memory/lead-code/refs/{task-id}/`: task, path, contract, line budget theo [CODE-STANDARDS](CODE-STANDARDS.md), cách verify.
2. **Code.** Giao đúng một Coder theo [DISPATCH](../protocols/DISPATCH.md). Coder ack, sửa, chạy checks, đếm dòng, freeze, trả result.
3. **Freeze.** Lead-Code kiểm result, chốt một snapshot chung cho cả hai reviewer.
4. **Review.** Gửi hai request riêng, cùng snapshot. Chạy song song nếu được; không thì lần lượt và báo `queued`.
5. **Tổng hợp.** Chờ đủ cả hai report. Report đầu sạch không đủ để đóng.
6. **Sửa.** Chuyển findings cho chính Coder cũ, chỉ sau khi cả hai reviewer đã xong hoặc xác nhận dừng đọc.
7. **Kiểm lại.** Bản sửa là revision mới. Xét ảnh hưởng tới cả hai domain; gửi chính reviewer cũ kiểm lại phần bị ảnh hưởng.
8. **Verify.** Lead-Code verify bản tích hợp mới nhất sau mọi lần sửa: hành vi, checks, số dòng, coverage của cả hai report, và chạy sản phẩm từ checkout sạch (khởi động không lỗi).
9. **Trả PM.** Result kèm prompt resume PM theo [DISPATCH](../protocols/DISPATCH.md#trả-về-pm-owner).

## Quy tắc review

- Reviewer tự đọc nguồn, spec, story; không lấy kết luận của Coder hay reviewer kia làm sự thật.
- Finding gồm: mức độ, vị trí (file/dòng hoặc màn hình/flow), các bước, expected/actual, tác động, evidence.
- Report ghi rõ phạm vi đã xem, phần chưa xem và trạng thái `finished` hoặc `stopped`.
- UX/UI chưa xem được UI hay flow liên quan: `partial` hoặc `blocked`, nêu evidence còn thiếu.
- UX/UI `N/A` chỉ khi thay đổi thật sự không có UI hay flow (ví dụ chỉ Markdown/JSON); vẫn là report riêng có lý do.
- Review sạch không có nghĩa tests pass. Build pass không có nghĩa giao diện đạt.
- Nguồn đổi trong lúc review: dừng kết luận bị ảnh hưởng, báo Lead-Code.

## Cổng liên quan

- Có UI: cần sprint `design` phủ story đó đã được PM duyệt và pointer DESIGN trước khi code UI. Thiếu thì báo PM.
- Lead-Code không kích hoạt QA. Chỉ báo PM có candidate để PM quyết định.
- Câu hỏi về sản phẩm hay UI chuyển PM. PM đổi scope thì gửi revision mới.
