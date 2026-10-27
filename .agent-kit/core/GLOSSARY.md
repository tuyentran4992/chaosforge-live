# Thuật ngữ

| Thuật ngữ | Nghĩa |
| --- | --- |
| Role card | File `roles/{role}.md`: nhiệm vụ, file cần đọc, các bước, đầu ra, điều cấm của một role |
| Coordinator | Role điều phối một team: Lead-Code, Lead-Marketing, council-lead |
| Member | Role nhận việc từ coordinator: Coder, reviewers, Researcher, Marketer, specialist, user persona |
| Context mới | Phiên agent mới, không mang lịch sử chat của người giao; chỉ nhận request và file được trỏ tới |
| PM owner | Phiên PM đã bắt đầu việc. Kết quả luôn quay về đúng phiên này, không tạo PM mới |
| Request / Ack / Result | Ba file của một lượt bàn giao: người gửi viết request; người nhận viết ack (xác nhận nhận việc) và result |
| Revision | Số thứ tự của request trong cùng handoff. Đổi yêu cầu hoặc nguồn thì tăng revision |
| Snapshot | Dấu vân tay của input lúc giao việc; cách lập ở [HANDOFF](HANDOFF.md#snapshot) |
| Scope | Danh sách path nguồn mà task được đọc hoặc sửa |
| Freeze | Người sửa dừng ghi nguồn để người khác review trên một snapshot cố định |
| Mode `auto` / `prompt` | `auto`: gửi bằng tool thật có quyền. `prompt`: tạo prompt để người dùng dán sang app đích |
| Pending relay | Request đã sẵn sàng nhưng chưa được gửi; chờ người dùng chuyển |
| Phase / Sprint / Story | Ba cấp kế hoạch sản phẩm; xem [PLANNING](../planning/PLANNING.md) |
| Sprint thực | Sprint đã chốt trong roadmap và được triển khai thật; cập nhật kit hay task ad hoc không phải sprint thực |
| Task ad hoc | Việc ngoài roadmap; ghi "không áp dụng" cho phase, sprint, story IDs |
| Candidate | Bản sản phẩm cụ thể (URL, build, version) mà QA kiểm; với release là release candidate |
| Suite | Bộ kịch bản QA cố định, có version; luôn có nhóm cài và khởi động sạch |
| Dashboard | Trang tổng quan tương tác 3D/2D `user/dashboard/index.html` do PM trực tiếp cập nhật (dữ liệu ở `data.js`); dẫn vào báo cáo chi tiết |
| Sprint `design` | Sprint thiết kế (không phải phase); phải được PM duyệt trước sprint delivery làm UI |
| Product input | Input không chứa code dùng cho hội đồng: brief, đoạn specs, mockup, ảnh, số liệu có nguồn |
| Instance | Một specialist hoặc user persona cụ thể của hội đồng, có ID và memory riêng |
| Evidence | Bằng chứng thực: output lệnh, screenshot, diff, link nguồn, report |
| `partial` / `blocked` | Mới làm một phần / không làm được; luôn kèm lý do và thứ còn thiếu |
