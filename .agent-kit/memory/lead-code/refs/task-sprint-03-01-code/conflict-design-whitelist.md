# Mâu thuẫn thiết kế whitelist — task-sprint-03-01-code

- Người phát hiện: `lead-code`, phiên Codex hiện tại; task `task-sprint-03-01-code`, handoff `task-sprint-03-01-code-01/r2`.
- PM owner: app `current` (Antigravity), session `8d7a9c53-c1b2-439b-8d6d-b4bb52b67525`, project `C:/Users/ADMIN/Desktop/Projects/hackathon`; thông báo `pending PM relay`; coordinator: không có.
- Nguồn A: `.agent-kit/specs/DESIGN.md`, mục “Chính sách ToS Safety Guard 4 Lớp”, lớp 3: lớp phủ “chỉ vẽ 4 thực thể” `duck | ball | star | boss` và “4 âm thanh synth”, tuyệt đối không render nội dung ngoài whitelist.
- Nguồn B: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md`, mục Scope và acceptance; `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/request.md`, mục tiêu và acceptance: bổ sung entity `doge`, `popcat` và SFX `bonk`, `bruh`, `boom`.
- Bất đồng: cả hai nguồn hiện hành đều là contract áp dụng cho overlay và whitelist; danh sách cố định bốn thực thể/âm thanh không thể đồng thời chứa các giá trị mới. Story không ghi DESIGN cũ là đã supersede. Cơ chế closed-world vẫn có thể giữ, nhưng tự đổi contract là quyết định nguồn chuẩn thuộc PM.
- Tác động: triển khai schema/validator, synthesizer, rendering, SFX và hai preset mới bị ảnh hưởng; dừng dispatch code phụ thuộc và không tự sửa DESIGN hoặc chọn nguồn. Technical plan có thể chuẩn bị nhưng chưa là phê duyệt contract. Reaction phụ thuộc flow tích hợp cùng snapshot nên chưa giao tách rời.
- Quyền: request cho phép lead-code sửa TECHSTACK/ARCHITECT, không cho phép sửa DESIGN. Nghị quyết PM về snapshot không giải quyết whitelist.
- Evidence: các pointer trên; snapshot r2 confirmed tại `.agent-kit/handoffs/task-sprint-03-01-code-01/r2/ack.md`.
- Thông báo PM: `pending relay`; người dùng đã được báo ở cập nhật phiên này. Resolution/revalidation: pending.

Prompt PM: DESIGN hiện hành giới hạn overlay ở bốn thực thể và bốn âm thanh, trong khi us-009 và request r2 yêu cầu mở rộng. Hãy đọc `.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/conflict-design-whitelist.md`, đối soát và cập nhật nguồn chuẩn/ban hành revision phù hợp, bảo toàn closed-world và trạng thái Git; sau đó cho lead-code tiếp tục. Không coi thông báo này là nghiệm thu.
