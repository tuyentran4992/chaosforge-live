# Request tư vấn — điền đủ trước khi gửi

Bạn giữ role **`council-user`**. Đây là tư vấn độc lập (mô phỏng người dùng), không đọc code. Bạn không nhận lịch sử chat, không đọc memory hay report của thành viên khác, không tự quét repo.

Đọc role card của bạn (`.agent-kit/roles/council-user.md`), rồi làm theo [COUNCIL](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/COUNCIL.md) và [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md).

- Task-id / handoff-id / revision / run-id:
  - `task-id`: `task-us-001-council-u1`
  - `handoff-id`: `task-us-001-council-01-u1`
  - `revision`: `1` (`r1`)
  - `run-id`: `run-us-001-01`
  - Phase / Sprint / Story: `phase-01` / `sprint-01` / `us-001`
  - Câu hỏi: **Đội thi cần xây dựng sản phẩm gì cho cuộc thi Codex x TwitchCon Hackathon (`https://twitchcon-codex.devpost.com/`, hạn nộp 02/11/2026 — còn 6 ngày) để tối đa hóa điểm số trên cả 4 tiêu chí chấm giải (Innovation/Idea, Potential Impact, Technological Implementation với Twitch + OpenAI Codex, Design) và có cơ hội cao nhất lọt Top 5 trình diễn trên sân khấu TwitchCon San Diego / đạt Giải Nhất $10,000 USD?**
- Người gửi và PM owner:
  - Role gửi: `council-lead` (App: `current`, Session ID: `3e872cc4-7540-410f-9a95-5b3e44729c8c`)
  - PM owner: Role `pm`, App `current`, Session ID `8ff3570f-a76a-4c25-a971-d6b9354b44c8`
  - Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`
- Người nhận:
  - Role: `council-user`
  - Instance-id: `user-twitch-streamer-viewer`
  - Label: `Twitch Streamer & Active Viewer Persona (Simulated)`
  - Profile: User Persona mô phỏng (Twitch Streamer kiêm Viewer năng động): đánh giá cảm nhận thực tế khi dùng thử trên kênh stream và khi chat tương tác, điều gì gây hào hứng dùng ngay và điều gì rườm rà hoặc gây phiền khi đang live.
  - App: `current`, target: `null`, context mới.
- Memory của bạn: `.agent-kit/memory/council-user/user-twitch-streamer-viewer/context.md`; chỉ tạo hoặc ghi tại `.agent-kit/memory/council-user/user-twitch-streamer-viewer/` (nếu chưa có, khởi tạo từ mẫu `.agent-kit/templates/council-instance/context.md`) và các file ack/result của handoff này.
- Product input (đã lọc code):
  - `.agent-kit/specs/MISSION.md` — SHA256: `7234FFBBB6008FA3FE2719A1C8AB959925E62209A8DD8FA636761ECC479E4E7B`
  - `.agent-kit/specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md` — SHA256: `EB383ED563DC3824243CD1CCCC437CE2391F731202DFE02593C9F66CA98EFCFE`
  - Source code và diff không thuộc input.
- Phạm vi, tiêu chí, giả định, câu hỏi mở:
  - Scope đọc: `.agent-kit/roles/council-user.md`, `.agent-kit/flows/COUNCIL.md`, `.agent-kit/core/HANDOFF.md`, `.agent-kit/core/WORKING.md`, `.agent-kit/core/MEMORY.md`, `.agent-kit/core/CONFLICTS.md`, `.agent-kit/templates/council-instance/context.md`, `.agent-kit/templates/council-result.md`, `.agent-kit/specs/MISSION.md`, `.agent-kit/specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md`, `.agent-kit/handoffs/task-us-001-council-01-u1/r1/request.md`, và memory riêng `.agent-kit/memory/council-user/user-twitch-streamer-viewer/`.
  - Yêu cầu đầu ra trong `result.md` (từ góc nhìn User Persona mô phỏng — luôn ghi rõ nhãn "mô phỏng"):
    1. Đề xuất hoặc mô tả **3 kiểu sản phẩm/trải nghiệm cụ thể** trên 3 nhánh (Streamer Collaboration, Audience Participation, Content Enhancements) mà một Twitch Streamer và Viewer năng động thực sự khao khát dùng ngay.
    2. Với mỗi trải nghiệm, nêu rõ: Tên gọi & Hook hấp dẫn, Nỗi đau thật sự của streamer/viewer khi đang live, Cảm giác phấn khích khi tương tác (Core Loop), Điều gì khiến streamer sẵn sàng dán link Browser Source vào OBS trong 30 giây, Kịch bản thử nghiệm ngay trên sóng (kể cả khi kênh mới có vài người xem hoặc dùng chế độ thử nghiệm), Đánh giá cảm nhận trên 4 tiêu chí và những điểm gây phiền/rườm rà cần tránh tuyệt đối (ví dụ: che màn hình game, độ trễ cao, bắt viewer cài app ngoài, nguy cơ chat toxic phá stream).
    3. Xếp hạng Top 1, Top 2, Top 3 theo mức độ "muốn bật lên stream dùng ngay tối nay".
- Giao diện, demo, dữ liệu thử được phép: Không có. Không mở DevTools, source hay đổi dữ liệu thật.
- Request (chỉ đọc): `.agent-kit/handoffs/task-us-001-council-01-u1/r1/request.md`.
- Ack (bạn ghi): `.agent-kit/handoffs/task-us-001-council-01-u1/r1/ack.md`.
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/council-result.md)): `.agent-kit/handoffs/task-us-001-council-01-u1/r1/result.md`.
- Mâu thuẫn tài liệu: báo ngay theo [CONFLICTS](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/CONFLICTS.md).
