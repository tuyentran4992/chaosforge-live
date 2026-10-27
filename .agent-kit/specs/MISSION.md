# MISSION

Trạng thái: **Đã chốt (Approved)** — Sản phẩm dự thi: **`Codex Chaos Foundry` (`ChaosForge Live`)** cho cuộc thi **Codex x TwitchCon Hackathon** (`https://twitchcon-codex.devpost.com/`).

## Mục đích và vấn đề

Xây dựng **`Codex Chaos Foundry` (`ChaosForge Live`)** — nền tảng tương tác trực tiếp kiểu *"Twitch Plays Game Dev"* biến khán giả Twitch thành những người đồng sáng tạo game ngay trên sóng livestream.

- **Vấn đề của Twitch Streamer:** Các công cụ tương tác hiện có (Polls, Sound Alerts, CrowdControl) chỉ lặp lại vài hiệu ứng tĩnh nhàm chán; những lúc chờ ghép trận (queue game) hoặc Just Chatting dễ bị "chết sóng" (dead air), còn khi 2 streamer Raid/Co-stream thì thiếu trò chơi chung tức thì.
- **Vấn đề của Khán giả (Chat / Viewers):** Khán giả có vô số ý tưởng meme sáng tạo theo tình huống thực tế nhưng không có công cụ nào biến câu chat của họ thành cơ chế vật lý, Boss AI hay luật chơi mới xuất hiện ngay trên màn hình streamer trong vài giây.
- **Giải pháp đột phá với OpenAI Codex:** Khán giả gõ `!forge <ý tưởng>` trên Twitch Chat, bình chọn trong 15 giây, và **OpenAI Codex** lập tức biên dịch nóng (`< 2.5 giây`) thành một bản vá cơ chế game an toàn (**Structured AST + Deterministic 2D Physics & WebAudio Engine**) chạy trực tiếp 60fps trên **OBS Browser Source Overlay** của Streamer, kèm cửa sổ trực quan hóa mã nguồn *Codex Live Compiler Terminal*.

## Người dùng và mục tiêu

- **Twitch Streamer:** Bật overlay lên OBS trong 30 giây (1 URL duy nhất), tăng vọt lượng chat/tương tác, có nút khẩn cấp **1-Click Panic Clear (Spacebar)** để dọn màn hình tức thì khi đang combat căng thẳng, và có thể lưu các bản vá hay thành **Shareable Game Cartridges** hoặc ném sang kênh bạn bè trong **2-Streamer Versus Room**.
- **Khán giả Twitch (Chat / Viewers):** Gõ lệnh chat tự nhiên (`!forge`, `1/2/3`, `!boost`, `!shield`) hoặc spam emote (`LUL`, `PogChamp`) mà không cần cài thêm app hay rời khung chat, thấy tên mình được vinh danh làm *Chief Chaos Architect* trên màn hình.
- **Ban Giám khảo Hackathon & Sân khấu TwitchCon San Diego:** Trải nghiệm ngay sự bùng nổ trong 30 giây đầu tiên nhờ màn hình **Virtual OBS Demo Stage** tích hợp sẵn **Built-in Arcade Game** và nút **AI Twitch Crowd Simulator (500 Viewers Hype Mode)** cùng ô **Judge Live Prompt** để tự gõ và kiểm chứng khả năng biên dịch trực tiếp của Codex ngay cả khi chấm bài một mình.

## Phạm vi và non-goals

### Trong phạm vi (MVP 6 ngày — Hạn chót 02/11/2026 2:00 PM PST)
1. **Core Loop 4 bước (45–60s/vòng):**
   - *Chat Pitch & Live Poll (15s):* Nhận lệnh `!forge <ý tưởng>` từ Twitch Chat thật (IRC/EventSub) hoặc Crowd Simulator, chọn 3 phương án lên bảng bình chọn `1 / 2 / 3`.
   - *Codex Safe-Runtime Compiler (`< 2.5s`):* Biên dịch ý tưởng thắng cuộc qua **OpenAI Structured Outputs (`json_schema` AST)** kết hợp kho ~25 nguyên tử hành vi vật lý 2D (trọng lực, nảy, mưa vật thể, laser, khiên, đảo chiều...), bộ tổng hợp âm thanh 8-bit (WebAudio Synth) và 10 *Pre-warmed Cartridges* dự phòng; hiển thị cửa sổ *Codex Live Compiler Terminal* trên màn hình.
   - *Live Execution & Crowd Control (30–45s):* Chạy hiệu ứng/Boss/mini-game 60fps trên OBS Overlay; bắt nhịp độ spam emote và lệnh chat (`!boost`, `!heal`, `!fire`) để điều khiển thời gian thực.
   - *2-Streamer Versus / Raid Mode & Cartridge Library:* Lưu bản vá thành thẻ bài (*Cartridge*) và gửi thử thách sang phòng streamer thứ 2 qua mã phòng.
2. **Quản lý Codex Session ID hợp lệ:** Sử dụng OpenAI Codex để xây dựng dự án; lưu lại **Primary Codex Session ID** (lệnh `/status` trên luồng build chính) để điền form Devpost kèm danh sách các Session ID phụ trong phần mô tả dự án.

### Ngoài phạm vi (Non-goals)
- Không dùng `eval()` chạy mã JavaScript tự do không kiểm soát để tránh tuyệt đối lỗi crash OBS hoặc vi phạm điều khoản an toàn của Twitch.
- Không yêu cầu người xem cài đặt tiện ích mở rộng hay đăng nhập tài khoản bên thứ ba mới được tương tác.
- Không can thiệp vào bộ nhớ (memory hook) của các tựa game PC có chống gian lận (Anti-Cheat); mọi tương tác diễn ra an toàn trên lớp OBS Browser Source Overlay và Built-in Stream Arcade Arena.

## Thước đo thành công

- **Innovation & Tech Implementation:** Thời gian từ lúc kết thúc vote đến khi bản vá chạy trên màn hình đạt `< 2.5 giây`; tỷ lệ crash OBS = `0%` (nhờ kiến trúc AST + Fallback Cartridges).
- **Potential Impact & Design:** Giao diện giữ mượt `60fps`, tuân thủ vùng an toàn (*Safe Zones*) không che khuất tâm màn hình, nút *Panic Clear* phản hồi `< 100ms`, và chế độ *500-Viewer Crowd Simulator* hoạt động chỉ với 1 cú click để phục vụ chấm giải online lẫn trình diễn tại sân khấu TwitchCon San Diego.

## Bề mặt tương tác sản phẩm

**Có UI (Web Application đa bề mặt, bắt buộc qua Sprint `design` trước khi code UI):**
1. **Transparent OBS Browser Source Overlay (`1920x1080`):** Hiển thị bảng Live Poll góc trên, cửa sổ *Codex Live Compiler Terminal* góc dưới, lớp vật lý 2D / Boss AI trong vùng an toàn (*Safe Zones*), thanh máu/năng lượng theo tốc độ chat và bảng vinh danh Viewer.
2. **Streamer Control Deck (Web Dashboard / OBS Custom Dock):** Bảng điều khiển cho streamer gồm nút khẩn cấp **`[SPACEBAR — PANIC CLEAR]`**, chế độ duyệt (Auto / 1-Click Approve), kho băng game (*Saved Cartridges*), phòng đấu *2-Streamer Versus Room* và công tắc bật **AI Twitch Crowd Simulator**.
3. **Virtual OBS Demo Stage (Split-Screen cho Giám khảo & Sân khấu TwitchCon):** Màn hình tất-cả-trong-một hiển thị luồng giả lập Streamer (kèm *Built-in Mini-Game Arcade* điều khiển được ngay trên web) + lớp OBS Overlay + khung *Twitch Chat 500-Viewer Simulator* + ô nhập **Judge Live Prompt** để thử nghiệm tức thì mà không cần cài đặt OBS.
