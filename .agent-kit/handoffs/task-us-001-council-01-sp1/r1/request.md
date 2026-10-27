# Request tư vấn — điền đủ trước khi gửi

Bạn giữ role **`council-specialist`**. Đây là tư vấn độc lập, không đọc code. Bạn không nhận lịch sử chat, không đọc memory hay report của thành viên khác, không tự quét repo.

Đọc role card của bạn (`.agent-kit/roles/council-specialist.md`), rồi làm theo [COUNCIL](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/COUNCIL.md) và [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md).

- Task-id / handoff-id / revision / run-id:
  - `task-id`: `task-us-001-council-sp1`
  - `handoff-id`: `task-us-001-council-01-sp1`
  - `revision`: `1` (`r1`)
  - `run-id`: `run-us-001-01`
  - Phase / Sprint / Story: `phase-01` / `sprint-01` / `us-001`
  - Câu hỏi: **Đội thi cần xây dựng sản phẩm gì cho cuộc thi Codex x TwitchCon Hackathon (`https://twitchcon-codex.devpost.com/`, hạn nộp 02/11/2026 — còn 6 ngày) để tối đa hóa điểm số trên cả 4 tiêu chí chấm giải (Innovation/Idea, Potential Impact, Technological Implementation với Twitch + OpenAI Codex, Design) và có cơ hội cao nhất lọt Top 5 trình diễn trên sân khấu TwitchCon San Diego / đạt Giải Nhất $10,000 USD?**
- Người gửi và PM owner:
  - Role gửi: `council-lead` (App: `current`, Session ID: `3e872cc4-7540-410f-9a95-5b3e44729c8c`)
  - PM owner: Role `pm`, App `current`, Session ID `8ff3570f-a76a-4c25-a971-d6b9354b44c8`
  - Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`
- Người nhận:
  - Role: `council-specialist`
  - Instance-id: `sp-hackathon-strategist`
  - Label: `Hackathon Judge & Pitch Strategist`
  - Profile: Chiến lược gia và Giám khảo Hackathon: đánh giá độ độc đáo (Innovation), khả năng gây ấn tượng tức thì trong video demo 2-3 phút và khi trình diễn live trên sân khấu TwitchCon Booth, điểm khác biệt so với các extension/bot Twitch truyền thống.
  - App: `current`, target: `null`, context mới.
- Memory của bạn: `.agent-kit/memory/council-specialist/sp-hackathon-strategist/context.md`; chỉ tạo hoặc ghi tại `.agent-kit/memory/council-specialist/sp-hackathon-strategist/` (nếu chưa có, khởi tạo từ mẫu `.agent-kit/templates/council-instance/context.md`) và các file ack/result của handoff này.
- Product input (đã lọc code):
  - `.agent-kit/specs/MISSION.md` — SHA256: `7234FFBBB6008FA3FE2719A1C8AB959925E62209A8DD8FA636761ECC479E4E7B`
  - `.agent-kit/specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md` — SHA256: `EB383ED563DC3824243CD1CCCC437CE2391F731202DFE02593C9F66CA98EFCFE`
  - Source code và diff không thuộc input.
- Phạm vi, tiêu chí, giả định, câu hỏi mở:
  - Scope đọc: `.agent-kit/roles/council-specialist.md`, `.agent-kit/flows/COUNCIL.md`, `.agent-kit/core/HANDOFF.md`, `.agent-kit/core/WORKING.md`, `.agent-kit/core/MEMORY.md`, `.agent-kit/core/CONFLICTS.md`, `.agent-kit/templates/council-instance/context.md`, `.agent-kit/templates/council-result.md`, `.agent-kit/specs/MISSION.md`, `.agent-kit/specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md`, `.agent-kit/handoffs/task-us-001-council-01-sp1/r1/request.md`, và memory riêng `.agent-kit/memory/council-specialist/sp-hackathon-strategist/`.
  - Yêu cầu đầu ra trong `result.md` (từ góc nhìn Chiến lược gia & Giám khảo Hackathon):
    1. Đề xuất ít nhất **3 phương án ý tưởng sản phẩm cụ thể, khác biệt nhau** (bao phủ hoặc kết hợp khéo léo các nhánh Streamer Collaboration / Audience Participation / Content Enhancements).
    2. Với mỗi ý tưởng, phân tích sâu: Tên gọi & Hook 1 câu, Bài toán của Streamer/Chat, Cơ chế hoạt động cốt lõi (Core Loop), Vai trò không thể thay thế của OpenAI Codex & Twitch integration, Bề mặt tương tác UI (OBS Overlay / Dashboard / Chat / Extension), Kịch bản Demo "ăn điểm" trong 2 phút (kể cả khi giám khảo chấm 1 mình không có 500 viewers thật) và khi đứng trên sân khấu TwitchCon Booth, Chấm điểm ước lượng trên 4 tiêu chí (Innovation, Impact, Tech Implementation, Design - thang 10) và Rủi ro/Tradeoff trong 6 ngày.
    3. Xếp hạng khuyến nghị của riêng bạn (Top 1, Top 2, Top 3) kèm lý do sắc bén vì sao ý tưởng Top 1 sẽ đánh bại các đối thủ chỉ làm chatbot Twitch thông thường.
- Giao diện, demo, dữ liệu thử được phép: Không có. Không mở DevTools, source hay đổi dữ liệu thật.
- Request (chỉ đọc): `.agent-kit/handoffs/task-us-001-council-01-sp1/r1/request.md`.
- Ack (bạn ghi): `.agent-kit/handoffs/task-us-001-council-01-sp1/r1/ack.md`.
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/council-result.md)): `.agent-kit/handoffs/task-us-001-council-01-sp1/r1/result.md`.
- Mâu thuẫn tài liệu: báo ngay theo [CONFLICTS](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/CONFLICTS.md).
