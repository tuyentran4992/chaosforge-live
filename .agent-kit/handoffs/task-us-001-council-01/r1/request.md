# Request tư vấn — điền đủ trước khi gửi

Bạn giữ role **`council-lead`**. Đây là tư vấn độc lập, không đọc code. Bạn không nhận lịch sử chat, không đọc memory hay report của thành viên khác trước khi thu thập theo đúng quy trình, không tự quét repo.

Đọc role card của bạn (`.agent-kit/roles/council-lead.md`), rồi làm theo [COUNCIL](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/COUNCIL.md) và [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md).

- Task-id / handoff-id / revision / run-id:
  - `task-id`: `task-us-001-council`
  - `handoff-id`: `task-us-001-council-01`
  - `revision`: `1` (`r1`)
  - `run-id`: `run-us-001-01`
  - Phase / Sprint / Story: `phase-01` / `sprint-01` / `us-001`
  - Câu hỏi sản phẩm: **Đội thi cần xây dựng sản phẩm gì cho cuộc thi Codex x TwitchCon Hackathon (`https://twitchcon-codex.devpost.com/`, hạn nộp 02/11/2026 — còn 6 ngày) để tối đa hóa điểm số trên cả 4 tiêu chí chấm giải (Innovation/Idea, Potential Impact, Technological Implementation với Twitch + OpenAI Codex, Design) và có cơ hội cao nhất lọt Top 5 trình diễn trên sân khấu TwitchCon San Diego / đạt Giải Nhất $10,000 USD?**
- Người gửi và PM owner:
  - Role gửi: `pm`
  - App: `current` (Antigravity)
  - Session ID (PM owner): `8ff3570f-a76a-4c25-a971-d6b9354b44c8`
  - Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`
- Người nhận:
  - Role: `council-lead`
  - App: `current`, target: `null` (context mới độc lập).
  - Các góc nhìn thành viên cần triệu tập (theo `config.json`: `specialistCount: 3`, `userCount: 1`):
    1. `council-specialist` #1 — **Chiến lược gia & Giám khảo Hackathon (Hackathon Judge & Pitch Strategist):** Đánh giá độ độc đáo (Innovation), khả năng gây ấn tượng tức thì trong video demo 2-3 phút và khi trình diễn live trên sân khấu TwitchCon Booth, điểm khác biệt so với các extension/bot Twitch truyền thống.
    2. `council-specialist` #2 — **Chuyên gia Sản phẩm & Tương tác Cộng đồng Twitch (Twitch Streamer & Community Product Specialist):** Đánh giá tác động thực tế (Potential Impact) và trải nghiệm/thiết kế (Design) trên 3 hướng của đề bài (Streamer Collaboration, Audience Participation, Content Enhancements); đảm bảo công cụ dễ setup trên OBS, vui nhộn, tạo khoảnh khắc viral và hoạt động tốt cả khi stream ít người xem lẫn đông người xem (hoặc có chế độ giả lập đám đông khi giám khảo chấm bài).
    3. `council-specialist` #3 — **Kiến trúc sư Giải pháp AI & Khả thi MVP (AI/Twitch Solution & Feasibility Specialist — cấp sản phẩm, không đọc code):** Đánh giá tiêu chí Technological Implementation ở góc độ khả năng tích hợp Twitch (EventSub, Chat, Extensions/Overlays) kết hợp sâu sắc với **OpenAI Codex / AI** (không chỉ gắn mác AI hời hợt) và đảm bảo hoàn thiện được MVP chạy thật mượt mà trong vòng 6 ngày.
    4. `council-user` #1 — **User Persona (Twitch Streamer kiêm Viewer năng động — mô phỏng):** Đánh giá cảm nhận thực tế khi dùng thử trên kênh stream và khi chat tương tác: cái gì làm họ hào hứng dùng ngay, cái gì rườm rà hoặc gây phiền khi đang live.
- Memory của bạn:
  - `.agent-kit/memory/council-lead/` (gồm `context.md` và `refs/`, bao gồm `.agent-kit/memory/council-lead/refs/registry.json`); chỉ tạo hoặc ghi tại đây và thư mục handoff được giao.
- Product input (đã lọc code) & Snapshot (Repo chưa khởi tạo `.git`):
  - `.agent-kit/specs/MISSION.md` — SHA256: `7234FFBBB6008FA3FE2719A1C8AB959925E62209A8DD8FA636761ECC479E4E7B`
  - `.agent-kit/specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md` — SHA256: `EB383ED563DC3824243CD1CCCC437CE2391F731202DFE02593C9F66CA98EFCFE`
  - Source code và diff không thuộc input.
- Phạm vi, tiêu chí, giả định, câu hỏi mở:
  - Scope đọc: `.agent-kit/roles/council-lead.md`, `.agent-kit/flows/COUNCIL.md`, `.agent-kit/core/HANDOFF.md`, `.agent-kit/core/WORKING.md`, `.agent-kit/core/CONFLICTS.md`, `.agent-kit/protocols/DISPATCH.md`, `.agent-kit/protocols/CONFIG.md`, `.agent-kit/config.json`, `.agent-kit/templates/council-request.md`, `.agent-kit/templates/council-result.md`, `.agent-kit/templates/council-instance/context.md`, `.agent-kit/specs/MISSION.md`, `.agent-kit/specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md`, `.agent-kit/memory/council-lead/`, và các file handoff con do `council-lead` tạo cho các thành viên hội đồng.
  - Scope ghi của `council-lead`: `.agent-kit/memory/council-lead/`, `.agent-kit/handoffs/task-us-001-council-01/r1/ack.md`, `.agent-kit/handoffs/task-us-001-council-01/r1/result.md`, và các thư mục handoff con `.agent-kit/handoffs/{member-handoff-id}/r1/request.md` gửi cho các thành viên hội đồng.
  - Yêu cầu đầu ra trong `result.md`:
    1. Tổng hợp ít nhất **3 phương án ý tưởng sản phẩm cụ thể, khác biệt nhau** (nên bao phủ hoặc kết hợp khéo léo các nhánh Streamer Collaboration / Audience Participation / Content Enhancements).
    2. Với mỗi ý tưởng, nêu rõ: Tên gọi & Hook 1 câu, Bài toán của Streamer/Chat, Cơ chế hoạt động cốt lõi (Core Loop), Vai trò không thể thay thế của OpenAI Codex & Twitch integration, Bề mặt tương tác UI (OBS Overlay / Dashboard / Chat / Extension), Kịch bản Demo "ăn điểm" trong 2 phút (kể cả khi giám khảo chấm 1 mình không có 500 viewers thật), Chấm điểm ước lượng trên 4 tiêu chí (Innovation, Impact, Tech Implementation, Design) và Rủi ro/Tradeoff trong 6 ngày.
    3. Giữ rõ ý kiến đồng thuận, ý kiến bất đồng giữa các specialist và phản hồi mô phỏng của `council-user`.
    4. Đề xuất xếp hạng khuyến nghị (Top 1, Top 2, Top 3) để PM trình người dùng quyết định.
- Giao diện, demo, dữ liệu thử được phép: Không có (chưa có sản phẩm). Không mở DevTools, source hay đổi dữ liệu thật.
- Request (chỉ đọc): `.agent-kit/handoffs/task-us-001-council-01/r1/request.md`
- Ack (bạn ghi): `.agent-kit/handoffs/task-us-001-council-01/r1/ack.md`
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/council-result.md)): `.agent-kit/handoffs/task-us-001-council-01/r1/result.md`
- Mâu thuẫn tài liệu: báo PM ngay theo [CONFLICTS](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/CONFLICTS.md).
