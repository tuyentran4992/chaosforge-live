# Marketing request — task-sprint-03-02-marketing-01/r1

Làm theo role card của bạn, [MARKETING](file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/flows/MARKETING.md) và [HANDOFF](file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md).

- Người gửi và PM owner: Antigravity PM, project `ChaosForge Live`.
- Người nhận: `lead-marketing`, context mới.
- Mục tiêu, audience, kênh, brand, thông điệp, CTA, acceptance:
  - **Mục tiêu:** Sản xuất gói video demo sản phẩm (dưới 3 phút, tối ưu 2:00) và bộ ảnh chụp màn hình phân giải cao (1920x1080 và tỷ lệ 3:2) để phục vụ nộp bài Devpost và đăng tải YouTube cho Codex x TwitchCon Hackathon.
  - **Audience:** Ban giám khảo Devpost, kỹ sư OpenAI Codex, cộng đồng Twitch streamers và viewers.
  - **Kênh:** Devpost Hackathon Gallery & YouTube (Unlisted/Public).
  - **Brand & Visual Tone:** Neon Cyberpunk (Emerald `#10b981`, Twitch Purple `#9146ff`, Dark Slate `#0d1117`), high energy, authentic Twitch meme culture.
  - **Thông điệp:** "ChaosForge Live transforms passive Twitch chat into active broadcast directors through real-time physics and OpenAI Codex Structured Outputs without eval()."
  - **CTA:** "Vote on Devpost & Try it live at localhost:3000!"
  - **Acceptance:**
    1. Video MP4/H.264 quay thực tế từ phiên bản sản phẩm chạy live trên cổng 3000, thời lượng 1:30 - 2:00, không giật lag.
    2. Video thể hiện đầy đủ vòng lặp 45s: 1-Click Simulate 500 Viewers, chat bầu chọn 4Hz, Codex Compiler sinh AST với badge `✓ AST SAFE VERIFIED`, Active Chaos với thực thể Doge / Popcat, va chạm sinh huy hiệu neon reaction, và thao tác Spacebar Panic Clear (<60ms).
    3. Bộ screenshot gồm tối thiểu 3 ảnh chuyên dụng: Virtual Demo Stage (`01-stage-virtual-broadcast.png`), Streamer Control Deck (`02-streamer-control-deck.png`), và OBS Transparent Overlay Guide (`03-obs-overlay-specs.png`).
    4. Không dùng claim sai sự thật hay số liệu chưa qua kiểm chứng.
- Input:
  - Fact sản phẩm: `DEVPOST_SUBMISSION.md` (sha256 đã duyệt), mã nguồn 45/45 test pass của Sprint 03 (`us-009`).
  - Kịch bản video chi tiết: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-03/DEVPOST_SUBMISSION.md#part-4-2-minute-video-demo-script`.
- Được đọc: `.agent-kit/specs/`, `client/`, `server/`, `tools/`. Được ghi: `.agent-kit/memory/lead-marketing/`, `.agent-kit/memory/marketer/`, `.agent-kit/memory/marketing-reviewer/`, `user/media/`, `assets/media/`, `.agent-kit/user/media/`. Thay đổi của người dùng cần giữ nguyên: clean working tree.
- Quyền: Tạo bản ghi video nội bộ, xuất file MP4 và ảnh PNG vào thư mục media; KHÔNG tự ý xuất bản ra ngoài hay tiêu ngân sách nếu chưa có lệnh của user.
- Story / sprint / task IDs: `sprint-03` / `us-011` / `task-sprint-03-02-marketing-01`.
- Request: [request.md](file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/handoffs/task-sprint-03-02-marketing-01/r1/request.md). Ack: [ack.md](file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/handoffs/task-sprint-03-02-marketing-01/r1/ack.md). Result: [result.md](file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/handoffs/task-sprint-03-02-marketing-01/r1/result.md).
- Mâu thuẫn: báo PM và lead ngay theo [CONFLICTS](file:///C:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/CONFLICTS.md).
